"""
Shared in-memory health state store.
Keyed by CameraNo (string). Each entry: {status, checkedAt, reason}.
asyncio is single-threaded so no locking is needed.
"""
import time

_health: dict[str, dict] = {}


def get(camera_no: str) -> dict | None:
    return _health.get(str(camera_no))


def set(camera_no: str, entry: dict) -> None:
    _health[str(camera_no)] = entry


def get_all() -> dict:
    return dict(_health)


def seed_from_cameras(cameras: list[dict]) -> None:
    """Seed initial state for all cameras. Active → checking, inactive → offline."""
    for cam in cameras:
        no = str(cam.get("CameraNo", ""))
        if not no or no in _health:
            continue
        if cam.get("IsActive") == "true":
            _health[no] = {
                "status": "checking",
                "checkedAt": 0.0,
                "reason": "Kontrol başlatılıyor",
            }
        else:
            _health[no] = {
                "status": "offline",
                "checkedAt": time.time(),
                "reason": cam.get("State") or "Kaynak veride pasif olarak işaretli",
            }
