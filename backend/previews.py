"""
Background preview generator.
Captures JPEG thumbnails from live HLS streams and caches them on disk.
"""
from __future__ import annotations

import asyncio
import logging
import shutil
import time
from contextlib import suppress
from pathlib import Path

from backend import parser

logger = logging.getLogger(__name__)

DATA_DIR = Path(__file__).parent / "data"
PREVIEW_DIR = DATA_DIR / "previews"
WORKER_INTERVAL = 30
CAPTURE_TIMEOUT = 12.0
CONCURRENCY = 4
PRIORITY_FRESHNESS = 300
BACKGROUND_FRESHNESS = 900
PRIORITY_TOUCH_TTL = 1800

_preview_state: dict[str, dict] = {}
_stream_camera_nos: set[str] = set()
_priority_until: dict[str, float] = {}
_background_task: asyncio.Task | None = None
_semaphore: asyncio.Semaphore | None = None
_wakeup_event: asyncio.Event | None = None
_ffmpeg_path: str | None = None
_ffmpeg_checked = False
_ffmpeg_warning_logged = False


def _now() -> float:
    return time.time()


def ensure_storage() -> None:
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)


def preview_path(camera_no: str) -> Path:
    return PREVIEW_DIR / f"{camera_no}.jpg"


def _priority_expired(camera_no: str, now: float) -> bool:
    return _priority_until.get(camera_no, 0.0) < now


def _prune_priority(now: float) -> None:
    expired = [camera_no for camera_no in _priority_until if _priority_expired(camera_no, now)]
    for camera_no in expired:
        _priority_until.pop(camera_no, None)


def _get_semaphore() -> asyncio.Semaphore:
    global _semaphore
    if _semaphore is None:
        _semaphore = asyncio.Semaphore(CONCURRENCY)
    return _semaphore


def _get_wakeup_event() -> asyncio.Event:
    global _wakeup_event
    if _wakeup_event is None:
        _wakeup_event = asyncio.Event()
    return _wakeup_event


def _build_state(
    status: str,
    *,
    updated_at: float = 0.0,
    checked_at: float = 0.0,
    reason: str,
    stale: bool = False,
) -> dict:
    return {
        "status": status,
        "updatedAt": float(updated_at or 0.0),
        "checkedAt": float(checked_at or 0.0),
        "reason": reason,
        "stale": bool(stale),
    }


def _ffmpeg_bin() -> str | None:
    global _ffmpeg_checked, _ffmpeg_path, _ffmpeg_warning_logged

    if not _ffmpeg_checked:
        _ffmpeg_checked = True
        _ffmpeg_path = shutil.which("ffmpeg")
        if _ffmpeg_path is None and not _ffmpeg_warning_logged:
            _ffmpeg_warning_logged = True
            logger.warning("Preview worker disabled: ffmpeg not found in PATH")

    return _ffmpeg_path


def ffmpeg_available() -> bool:
    return _ffmpeg_bin() is not None


def _stream_url(camera: dict) -> str:
    return camera.get("WowzaStreamSSL") or camera.get("WowzaStream") or ""


def _existing_preview_timestamp(camera_no: str) -> float:
    path = preview_path(camera_no)
    if not path.exists():
        return 0.0
    try:
        return path.stat().st_mtime
    except OSError:
        return 0.0


def seed_from_cameras(cameras: list[dict]) -> None:
    ensure_storage()
    now = _now()
    active_stream_cameras: set[str] = set()

    for camera in cameras:
        camera_no = str(camera.get("CameraNo", "")).strip()
        if not camera_no:
            continue

        has_stream = bool(_stream_url(camera))
        is_active = camera.get("IsActive") == "true"
        cached_at = _existing_preview_timestamp(camera_no)

        if has_stream and is_active:
            active_stream_cameras.add(camera_no)

            if cached_at:
                stale = (now - cached_at) > BACKGROUND_FRESHNESS
                _preview_state.setdefault(
                    camera_no,
                    _build_state(
                        "stale" if stale else "ready",
                        updated_at=cached_at,
                        checked_at=cached_at,
                        reason="Onbellekte onizleme bulundu",
                        stale=stale,
                    ),
                )
                continue

            if ffmpeg_available():
                _preview_state.setdefault(
                    camera_no,
                    _build_state("generating", reason="Onizleme hazirlaniyor"),
                )
            else:
                _preview_state.setdefault(
                    camera_no,
                    _build_state("unavailable", checked_at=now, reason="ffmpeg bulunamadi"),
                )
            continue

        if not has_stream:
            reason = "Canli yayin URL yok"
        elif not is_active:
            reason = "Kamera pasif"
        else:
            reason = "Onizleme kullanilamiyor"

        _preview_state.setdefault(
            camera_no,
            _build_state("unavailable", checked_at=now, reason=reason),
        )

    _stream_camera_nos.clear()
    _stream_camera_nos.update(active_stream_cameras)
    _prune_priority(now)


def _camera_priority(camera_no: str, now: float) -> bool:
    return not _priority_expired(camera_no, now)


def _freshness_for(camera_no: str, now: float) -> int:
    return PRIORITY_FRESHNESS if _camera_priority(camera_no, now) else BACKGROUND_FRESHNESS


def _needs_capture(camera_no: str, now: float) -> bool:
    state = _preview_state.get(camera_no) or {}
    checked_at = float(state.get("checkedAt", 0.0) or 0.0)
    file_exists = preview_path(camera_no).exists()

    if not file_exists and checked_at == 0.0:
        return True

    freshness = _freshness_for(camera_no, now)
    return (now - checked_at) >= freshness


def _queue_generating(camera_no: str) -> None:
    if preview_path(camera_no).exists():
        return

    current = _preview_state.get(camera_no) or {}
    _preview_state[camera_no] = _build_state(
        "generating",
        updated_at=current.get("updatedAt", 0.0),
        checked_at=current.get("checkedAt", 0.0),
        reason="Onizleme kuyruga alindi",
    )


def touch(camera_nos: list[str], *, source: str = "frontend") -> list[str]:
    if not _stream_camera_nos:
        seed_from_cameras(parser.load_cameras())

    now = _now()
    accepted: list[str] = []
    seen: set[str] = set()

    for raw_camera_no in camera_nos:
        camera_no = str(raw_camera_no).strip()
        if not camera_no or camera_no in seen or camera_no not in _stream_camera_nos:
            continue
        seen.add(camera_no)
        accepted.append(camera_no)
        _priority_until[camera_no] = now + PRIORITY_TOUCH_TTL
        _queue_generating(camera_no)

    if accepted:
        logger.debug("Preview touch from %s for %d cameras", source, len(accepted))
        if _wakeup_event is not None:
            _wakeup_event.set()

    return accepted


def get(camera_no: str) -> dict | None:
    entry = _preview_state.get(str(camera_no))
    return dict(entry) if entry else None


def get_public_state(camera_no: str) -> dict:
    camera_no = str(camera_no)
    entry = _preview_state.get(camera_no) or _build_state("unavailable", reason="Onizleme bilgisi yok")
    status = entry.get("status", "unavailable")
    updated_at = float(entry.get("updatedAt", 0.0) or 0.0)
    stale = bool(entry.get("stale", False) or status == "stale")
    path = preview_path(camera_no)
    url = None

    if status in {"ready", "stale"} and path.exists():
        url = f"/previews/{camera_no}.jpg?v={int(updated_at * 1000)}"
    elif status in {"ready", "stale"}:
        status = "unavailable"
        stale = False
        updated_at = 0.0

    return {
        "status": status,
        "url": url,
        "updatedAt": updated_at,
        "stale": stale,
        "reason": entry.get("reason", "Onizleme kullanilamiyor"),
    }


def _capture_failure(camera_no: str, reason: str, checked_at: float) -> None:
    cached_at = _existing_preview_timestamp(camera_no)
    path = preview_path(camera_no)

    if cached_at and path.exists():
        _preview_state[camera_no] = _build_state(
            "stale",
            updated_at=cached_at,
            checked_at=checked_at,
            reason=f"Yeni kare alinamadi: {reason}",
            stale=True,
        )
        return

    _preview_state[camera_no] = _build_state(
        "unavailable",
        checked_at=checked_at,
        reason=reason,
    )


async def capture_one(camera: dict) -> None:
    camera_no = str(camera.get("CameraNo", "")).strip()
    stream_url = _stream_url(camera)
    checked_at = _now()

    if not camera_no:
        return

    if not stream_url:
        _capture_failure(camera_no, "Canli yayin URL yok", checked_at)
        return

    ffmpeg_bin = _ffmpeg_bin()
    if ffmpeg_bin is None:
        _capture_failure(camera_no, "ffmpeg bulunamadi", checked_at)
        return

    ensure_storage()
    final_path = preview_path(camera_no)
    temp_path = final_path.with_suffix(".jpg.tmp")

    with suppress(OSError):
        temp_path.unlink()

    args = [
        ffmpeg_bin,
        "-nostdin",
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        stream_url,
        "-frames:v",
        "1",
        "-q:v",
        "2",
        "-f",
        "image2",
        str(temp_path),
    ]

    async with _get_semaphore():
        process = await asyncio.create_subprocess_exec(
            *args,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )

        try:
            _, stderr = await asyncio.wait_for(process.communicate(), timeout=CAPTURE_TIMEOUT)
        except asyncio.TimeoutError:
            process.kill()
            with suppress(ProcessLookupError):
                await process.wait()
            _capture_failure(camera_no, f"ffmpeg zaman asimi ({int(CAPTURE_TIMEOUT)}s)", _now())
            with suppress(OSError):
                temp_path.unlink()
            return

    error_output = stderr.decode("utf-8", errors="ignore").strip()
    if process.returncode != 0 or not temp_path.exists() or temp_path.stat().st_size == 0:
        reason = error_output.splitlines()[0] if error_output else f"ffmpeg cikis kodu {process.returncode}"
        _capture_failure(camera_no, reason, _now())
        with suppress(OSError):
            temp_path.unlink()
        return

    temp_path.replace(final_path)
    updated_at = _existing_preview_timestamp(camera_no) or _now()
    _preview_state[camera_no] = _build_state(
        "ready",
        updated_at=updated_at,
        checked_at=updated_at,
        reason="Canli yayindan onizleme alindi",
        stale=False,
    )


async def _run_once() -> None:
    if not ffmpeg_available():
        return

    cameras = parser.load_cameras()
    seed_from_cameras(cameras)
    now = _now()
    priority_queue: list[dict] = []
    background_queue: list[dict] = []

    for camera in cameras:
        camera_no = str(camera.get("CameraNo", "")).strip()
        if camera_no not in _stream_camera_nos:
            continue
        if not _needs_capture(camera_no, now):
            continue
        if _camera_priority(camera_no, now):
            priority_queue.append(camera)
        else:
            background_queue.append(camera)

    queue = priority_queue + background_queue
    if not queue:
        return

    logger.info("Preview worker: refreshing %d previews", len(queue))
    for camera in queue:
        _queue_generating(str(camera.get("CameraNo", "")))

    await asyncio.gather(*[capture_one(camera) for camera in queue], return_exceptions=True)


async def run_loop() -> None:
    while True:
        try:
            await _run_once()
        except asyncio.CancelledError:
            raise
        except Exception:
            logger.exception("Unhandled error in preview worker")

        wakeup_event = _get_wakeup_event()
        try:
            await asyncio.wait_for(wakeup_event.wait(), timeout=WORKER_INTERVAL)
        except asyncio.TimeoutError:
            pass
        finally:
            wakeup_event.clear()


async def start_background_preview_generation() -> None:
    global _background_task

    seed_from_cameras(parser.load_cameras())
    if not ffmpeg_available():
        return

    if _background_task and not _background_task.done():
        return

    _background_task = asyncio.create_task(run_loop())


async def stop_background_preview_generation() -> None:
    global _background_task, _semaphore, _wakeup_event

    task = _background_task
    _background_task = None
    if task is not None:
        task.cancel()
        with suppress(asyncio.CancelledError):
            await task

    _semaphore = None
    _wakeup_event = None
