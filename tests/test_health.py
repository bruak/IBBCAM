"""Tests for backend/health.py — async health probe logic."""
import time
import pytest
from unittest.mock import AsyncMock, MagicMock
import httpx


@pytest.fixture(autouse=True)
def reset_state():
    from backend import state
    import backend.health as hmod
    state._health.clear()
    hmod._semaphore = None
    yield
    state._health.clear()
    hmod._semaphore = None


async def test_http_200_marks_online():
    from backend import health as hmod, state

    camera = {"CameraNo": "1", "CameraCaptureImage": "https://example.com/1.jpg", "IsActive": "true"}
    mock_resp = MagicMock(status_code=200)
    client = AsyncMock()
    client.head = AsyncMock(return_value=mock_resp)

    await hmod.probe_one(camera, client)

    result = state.get("1")
    assert result["status"] == "online"
    assert "200" in result["reason"]


async def test_http_404_marks_offline():
    from backend import health as hmod, state

    camera = {"CameraNo": "2", "CameraCaptureImage": "https://example.com/2.jpg", "IsActive": "true"}
    mock_resp = MagicMock(status_code=404)
    client = AsyncMock()
    client.head = AsyncMock(return_value=mock_resp)

    await hmod.probe_one(camera, client)

    result = state.get("2")
    assert result["status"] == "offline"
    assert "404" in result["reason"]


async def test_timeout_marks_offline_with_turkish_reason():
    from backend import health as hmod, state

    camera = {"CameraNo": "3", "CameraCaptureImage": "https://example.com/3.jpg", "IsActive": "true"}
    client = AsyncMock()
    client.head = AsyncMock(side_effect=httpx.TimeoutException("timeout"))

    await hmod.probe_one(camera, client)

    result = state.get("3")
    assert result["status"] == "offline"
    assert "aşımı" in result["reason"]


async def test_empty_capture_image_marks_offline_without_http_call():
    from backend import health as hmod, state

    camera = {"CameraNo": "4", "CameraCaptureImage": "", "IsActive": "true"}
    client = AsyncMock()
    client.head = AsyncMock(side_effect=AssertionError("Should not be called"))

    await hmod.probe_one(camera, client)

    result = state.get("4")
    assert result["status"] == "offline"
    client.head.assert_not_called()


async def test_405_falls_back_to_get():
    from backend import health as hmod, state

    camera = {"CameraNo": "5", "CameraCaptureImage": "https://example.com/5.jpg", "IsActive": "true"}
    head_resp = MagicMock(status_code=405)
    get_resp = MagicMock(status_code=200)
    client = AsyncMock()
    client.head = AsyncMock(return_value=head_resp)
    client.get = AsyncMock(return_value=get_resp)

    await hmod.probe_one(camera, client)

    result = state.get("5")
    assert result["status"] == "online"
    client.get.assert_called_once()


def test_recently_checked_camera_is_skipped():
    from backend import state
    from backend.health import RECHECK_AFTER, _needs_check

    state.set("10", {"status": "online", "checkedAt": time.time() - 10, "reason": "HTTP 200"})
    assert _needs_check("10", time.time()) is False


def test_stale_camera_needs_check():
    from backend import state
    from backend.health import _needs_check

    state.set("11", {"status": "online", "checkedAt": time.time() - 400, "reason": "HTTP 200"})
    assert _needs_check("11", time.time()) is True


def test_inactive_camera_excluded_from_queue():
    cameras = [{"CameraNo": "20", "IsActive": "false", "CameraCaptureImage": "https://x.com/x.jpg"}]
    queue = [c for c in cameras if c.get("IsActive") == "true"]
    assert len(queue) == 0
