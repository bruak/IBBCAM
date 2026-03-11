"""Integration tests for the FastAPI API endpoints."""
import pytest
from unittest.mock import AsyncMock, patch

MOCK_CAMERAS = [
    {
        "CameraNo": "1",
        "CameraName": "TEST KAMERA",
        "XCoord": "28.9",
        "YCoord": "41.0",
        "IsActive": "true",
        "State": "Aktif",
        "CameraCaptureImage": "https://example.com/cam.jpg",
        "CameraModel": "DS-2CD",
        "CameraBrand": "Hikvision",
        "Resolution": "800x448",
        "WowzaStreamSSL": "",
        "WowzaStream": "",
    }
]

MOCK_HEALTH = {
    "1": {"status": "online", "checkedAt": 1700000000.0, "reason": "HTTP 200"}
}


@pytest.fixture
def client():
    async def _noop_health():
        pass

    with (
        patch("backend.parser.load_cameras", return_value=MOCK_CAMERAS),
        patch("backend.state.seed_from_cameras"),
        patch("backend.health.start_background_health_checks", new=AsyncMock(return_value=None)),
        patch("backend.state.get_all", return_value=MOCK_HEALTH),
    ):
        from fastapi.testclient import TestClient
        from backend.main import app

        with TestClient(app, raise_server_exceptions=True) as c:
            yield c


def test_cameras_returns_200(client):
    resp = client.get("/api/cameras")
    assert resp.status_code == 200


def test_cameras_returns_list(client):
    resp = client.get("/api/cameras")
    data = resp.json()
    assert isinstance(data, list)
    assert len(data) == 1


def test_cameras_no_sensitive_fields(client):
    resp = client.get("/api/cameras")
    for cam in resp.json():
        assert "IPAddress" not in cam, "IPAddress must never be sent to the client"
        assert "RTSPURL" not in cam, "RTSPURL must never be sent to the client"


def test_cameras_required_fields_present(client):
    resp = client.get("/api/cameras")
    for cam in resp.json():
        for field in ("CameraNo", "CameraName", "XCoord", "YCoord"):
            assert field in cam


def test_health_returns_200(client):
    resp = client.get("/api/health")
    assert resp.status_code == 200


def test_health_response_shape(client):
    resp = client.get("/api/health")
    data = resp.json()
    assert isinstance(data, dict)
    entry = data.get("1")
    assert entry is not None
    assert "status" in entry
    assert "checkedAt" in entry
    assert "reason" in entry


def test_root_serves_html(client):
    resp = client.get("/")
    assert resp.status_code == 200
    assert "text/html" in resp.headers.get("content-type", "")


def test_main_js_served(client):
    resp = client.get("/js/main.js")
    assert resp.status_code == 200
