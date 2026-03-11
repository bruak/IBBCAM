"""
Background async health checker.
Probes camera snapshot URLs server-side using HTTP HEAD requests,
eliminating the need for client-side image probing.
"""
import asyncio
import logging
import time

import httpx

from backend import parser, state

logger = logging.getLogger(__name__)

CHECK_INTERVAL = 30        # seconds between loop iterations
PROBE_TIMEOUT = 8.0        # seconds per individual probe
RECHECK_AFTER = 300        # re-probe cameras not checked in the last 5 minutes
CONCURRENCY = 10           # max simultaneous HTTP probes

_semaphore: asyncio.Semaphore | None = None


def _get_semaphore() -> asyncio.Semaphore:
    global _semaphore
    if _semaphore is None:
        _semaphore = asyncio.Semaphore(CONCURRENCY)
    return _semaphore


async def probe_one(camera: dict, client: httpx.AsyncClient) -> None:
    """Probe a single camera's snapshot URL and update state."""
    url = camera.get("CameraCaptureImage", "")
    camera_no = str(camera.get("CameraNo", ""))

    if not url:
        state.set(camera_no, {
            "status": "offline",
            "checkedAt": time.time(),
            "reason": "Görüntü URL yok",
        })
        return

    async with _get_semaphore():
        try:
            resp = await client.head(url, timeout=PROBE_TIMEOUT, follow_redirects=True)

            # Some servers respond 405 to HEAD but accept GET
            if resp.status_code == 405:
                resp = await client.get(url, timeout=PROBE_TIMEOUT, follow_redirects=True)

            if resp.status_code < 400:
                state.set(camera_no, {
                    "status": "online",
                    "checkedAt": time.time(),
                    "reason": f"HTTP {resp.status_code}",
                })
            else:
                state.set(camera_no, {
                    "status": "offline",
                    "checkedAt": time.time(),
                    "reason": f"HTTP {resp.status_code}",
                })

        except httpx.TimeoutException:
            state.set(camera_no, {
                "status": "offline",
                "checkedAt": time.time(),
                "reason": "Zaman aşımı (8s)",
            })
        except httpx.ConnectError:
            state.set(camera_no, {
                "status": "offline",
                "checkedAt": time.time(),
                "reason": "Bağlantı hatası",
            })
        except Exception as exc:
            state.set(camera_no, {
                "status": "offline",
                "checkedAt": time.time(),
                "reason": f"Hata: {type(exc).__name__}",
            })


async def run_loop() -> None:
    """Main health check loop. Runs forever, never raises."""
    # verify=False because some IBB snapshot endpoints have self-signed certs
    async with httpx.AsyncClient(
        headers={"Referer": "https://tkmservices.ibb.gov.tr/"},
        verify=False,
        timeout=PROBE_TIMEOUT,
    ) as client:
        while True:
            try:
                await _run_once(client)
            except Exception:
                logger.exception("Unhandled error in health check loop")
            await asyncio.sleep(CHECK_INTERVAL)


async def _run_once(client: httpx.AsyncClient) -> None:
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

    # Mark queued cameras as 'checking'
    for cam in queue:
        no = str(cam.get("CameraNo", ""))
        current = state.get(no)
        state.set(no, {
            "status": "checking",
            "checkedAt": current.get("checkedAt", 0.0) if current else 0.0,
            "reason": "Kontrol ediliyor",
        })

    await asyncio.gather(*[probe_one(cam, client) for cam in queue], return_exceptions=True)
    logger.info("Health check complete: %d cameras checked", len(queue))


def _needs_check(camera_no: str, now: float) -> bool:
    entry = state.get(camera_no)
    if not entry:
        return True
    return (now - entry.get("checkedAt", 0.0)) >= RECHECK_AFTER


async def start_background_health_checks() -> None:
    asyncio.create_task(run_loop())
