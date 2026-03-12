"""
Background health checker.
Probes camera snapshot URLs server-side and updates shared health state.
Production probes run in a bounded thread pool so the browser does not need
to perform snapshot checks itself.
"""
import asyncio
import logging
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from contextlib import suppress

import httpx

from backend import parser, state

logger = logging.getLogger(__name__)

CHECK_INTERVAL = 30        # seconds between loop iterations
PROBE_TIMEOUT = 8.0        # seconds per individual probe
RECHECK_AFTER = 300        # re-probe cameras not checked in the last 5 minutes
CONCURRENCY = 10           # max simultaneous probe workers

_semaphore: asyncio.Semaphore | None = None
_executor: ThreadPoolExecutor | None = None
_thread_local = threading.local()
_thread_clients: list[httpx.Client] = []
_thread_clients_lock = threading.Lock()
_background_task: asyncio.Task | None = None


def _get_semaphore() -> asyncio.Semaphore:
    global _semaphore
    if _semaphore is None:
        _semaphore = asyncio.Semaphore(CONCURRENCY)
    return _semaphore


def _get_executor() -> ThreadPoolExecutor:
    global _executor
    if _executor is None:
        _executor = ThreadPoolExecutor(
            max_workers=CONCURRENCY,
            thread_name_prefix="camera-probe",
        )
    return _executor


def _get_sync_client() -> httpx.Client:
    client = getattr(_thread_local, "client", None)
    if client is None:
        client = httpx.Client(
            headers={"Referer": "https://tkmservices.ibb.gov.tr/"},
            verify=False,
            timeout=PROBE_TIMEOUT,
            follow_redirects=True,
        )
        _thread_local.client = client
        with _thread_clients_lock:
            _thread_clients.append(client)
    return client


def _probe_sync(url: str) -> dict:
    client = _get_sync_client()
    checked_at = time.time()

    try:
        resp = client.head(url)
        if resp.status_code == 405:
            resp = client.get(url)

        if resp.status_code < 400:
            return {
                "status": "online",
                "checkedAt": checked_at,
                "reason": f"HTTP {resp.status_code}",
            }

        return {
            "status": "offline",
            "checkedAt": checked_at,
            "reason": f"HTTP {resp.status_code}",
        }
    except httpx.TimeoutException:
        return {
            "status": "offline",
            "checkedAt": checked_at,
            "reason": "Zaman asimi (8s)",
        }
    except httpx.ConnectError:
        return {
            "status": "offline",
            "checkedAt": checked_at,
            "reason": "Baglanti hatasi",
        }
    except Exception as exc:
        return {
            "status": "offline",
            "checkedAt": checked_at,
            "reason": f"Hata: {type(exc).__name__}",
        }


async def _probe_with_async_client(url: str, client: httpx.AsyncClient) -> dict:
    checked_at = time.time()

    async with _get_semaphore():
        try:
            resp = await client.head(url, timeout=PROBE_TIMEOUT, follow_redirects=True)

            if resp.status_code == 405:
                resp = await client.get(url, timeout=PROBE_TIMEOUT, follow_redirects=True)

            if resp.status_code < 400:
                return {
                    "status": "online",
                    "checkedAt": checked_at,
                    "reason": f"HTTP {resp.status_code}",
                }

            return {
                "status": "offline",
                "checkedAt": checked_at,
                "reason": f"HTTP {resp.status_code}",
            }
        except httpx.TimeoutException:
            return {
                "status": "offline",
                "checkedAt": checked_at,
                "reason": "Zaman asimi (8s)",
            }
        except httpx.ConnectError:
            return {
                "status": "offline",
                "checkedAt": checked_at,
                "reason": "Baglanti hatasi",
            }
        except Exception as exc:
            return {
                "status": "offline",
                "checkedAt": checked_at,
                "reason": f"Hata: {type(exc).__name__}",
            }


async def probe_one(camera: dict, client: httpx.AsyncClient | None = None) -> None:
    """Probe a single camera's snapshot URL and update state."""
    url = camera.get("CameraCaptureImage", "")
    camera_no = str(camera.get("CameraNo", ""))

    if not url:
        state.set(camera_no, {
            "status": "offline",
            "checkedAt": time.time(),
            "reason": "Goruntu URL yok",
        })
        return

    if client is not None:
        result = await _probe_with_async_client(url, client)
    else:
        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(_get_executor(), _probe_sync, url)

    state.set(camera_no, result)


async def run_loop() -> None:
    """Main health check loop. Runs forever, never raises."""
    while True:
        try:
            await _run_once()
        except asyncio.CancelledError:
            raise
        except Exception:
            logger.exception("Unhandled error in health check loop")
        await asyncio.sleep(CHECK_INTERVAL)


async def _run_once() -> None:
    cameras = parser.load_cameras()
    now = time.time()

    queue = [
        cam for cam in cameras
        if cam.get("IsActive") == "true"
        and _needs_check(str(cam.get("CameraNo", "")), now)
    ]

    if not queue:
        return

    logger.info("Health check: probing %d cameras", len(queue))

    for cam in queue:
        no = str(cam.get("CameraNo", ""))
        current = state.get(no)
        state.set(no, {
            "status": "checking",
            "checkedAt": current.get("checkedAt", 0.0) if current else 0.0,
            "reason": "Kontrol ediliyor",
        })

    await asyncio.gather(*[probe_one(cam) for cam in queue], return_exceptions=True)
    logger.info("Health check complete: %d cameras checked", len(queue))


def _needs_check(camera_no: str, now: float) -> bool:
    entry = state.get(camera_no)
    if not entry:
        return True
    return (now - entry.get("checkedAt", 0.0)) >= RECHECK_AFTER


async def start_background_health_checks() -> None:
    global _background_task
    if _background_task and not _background_task.done():
        return
    _background_task = asyncio.create_task(run_loop())


def _close_thread_clients() -> None:
    with _thread_clients_lock:
        clients = list(_thread_clients)
        _thread_clients.clear()

    for client in clients:
        with suppress(Exception):
            client.close()


def _shutdown_executor() -> None:
    global _executor
    executor = _executor
    _executor = None
    if executor is not None:
        executor.shutdown(wait=True, cancel_futures=True)


async def stop_background_health_checks() -> None:
    global _background_task

    task = _background_task
    _background_task = None
    if task is not None:
        task.cancel()
        with suppress(asyncio.CancelledError):
            await task

    await asyncio.to_thread(_shutdown_executor)
    _close_thread_clients()
