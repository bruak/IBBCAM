"""Minimal persisted store for globally popular cameras."""
from __future__ import annotations

import json
from pathlib import Path
from tempfile import NamedTemporaryFile

DATA_DIR = Path(__file__).parent / "data"
POPULAR_CAMERAS_PATH = DATA_DIR / "popular_cameras.json"
DEFAULT_LIMIT = 20


def _ensure_storage() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not POPULAR_CAMERAS_PATH.exists():
        POPULAR_CAMERAS_PATH.write_text("{}\n", encoding="utf-8")


def _load_counts() -> dict[str, int]:
    _ensure_storage()
    try:
        raw = json.loads(POPULAR_CAMERAS_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}

    if not isinstance(raw, dict):
        return {}

    counts: dict[str, int] = {}
    for key, value in raw.items():
        try:
            count = int(value)
        except (TypeError, ValueError):
            continue
        if count > 0:
            counts[str(key)] = count
    return counts


def _save_counts(counts: dict[str, int]) -> None:
    _ensure_storage()
    target_dir = POPULAR_CAMERAS_PATH.parent
    target_dir.mkdir(parents=True, exist_ok=True)
    with NamedTemporaryFile("w", encoding="utf-8", dir=target_dir, delete=False) as tmp:
        json.dump(counts, tmp, ensure_ascii=False, indent=2, sort_keys=True)
        tmp.write("\n")
        temp_path = Path(tmp.name)
    temp_path.replace(POPULAR_CAMERAS_PATH)


def record_open(camera_no: str) -> int:
    key = str(camera_no)
    counts = _load_counts()
    counts[key] = counts.get(key, 0) + 1
    _save_counts(counts)
    return counts[key]


def get_popular_cameras(cameras: list[dict], limit: int = DEFAULT_LIMIT) -> list[dict]:
    counts = _load_counts()
    if not counts:
        return []

    camera_index = {str(cam.get("CameraNo", "")): cam for cam in cameras}
    items: list[dict] = []
    for camera_no, open_count in sorted(counts.items(), key=lambda item: (-item[1], item[0])):
        cam = camera_index.get(camera_no)
        if not cam:
            continue
        items.append({**cam, "openCount": open_count})
        if len(items) >= limit:
            break
    return items
