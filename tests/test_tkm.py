"""Tests for the TKM proxy router and shared cache client."""
import time
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from backend import tkm_client

MOCK_CAMERAS = [
    {
        "CameraNo": "1",
        "CameraName": "TEST KAMERA",
        "XCoord": "28.9",
        "YCoord": "41.0",
        "IsActive": "true",
        "State": "Aktif",
        "CameraCaptureImage": "https://example.com/cam.jpg",
    }
]


@pytest.fixture(autouse=True)
def reset_tkm_state():
    tkm_client._cache.clear()
    tkm_client._client = None
    yield
    tkm_client._cache.clear()
    tkm_client._client = None


@pytest.fixture
def client():
    with (
        patch("backend.parser.load_cameras", return_value=MOCK_CAMERAS),
        patch("backend.state.seed_from_cameras"),
        patch("backend.health.start_background_health_checks", new=AsyncMock(return_value=None)),
        patch("backend.tkm_client.init_client", new=AsyncMock(return_value=None)),
        patch("backend.tkm_client.close_client", new=AsyncMock(return_value=None)),
    ):
        from fastapi.testclient import TestClient
        from backend.main import app

        with TestClient(app, raise_server_exceptions=True) as test_client:
            yield test_client


def test_traffic_index_normalizes_fields(client):
    payload = {"TI": 67, "TI_An": 71, "TI_Av": 62}

    with patch("backend.router_tkm.tkm_client.fetch_cached", new=AsyncMock(return_value=payload)):
        resp = client.get("/api/traffic-index")

    assert resp.status_code == 200
    assert resp.json() == {"total": 67, "anadolu": 71, "avrupa": 62}
    assert resp.headers["cache-control"] == "max-age=60"


def test_parking_filters_invalid_coordinates(client):
    payload = [
        {"PLotName": "Valid", "PLotLatitude": "41.1", "PLotLongitude": "29.0"},
        {"PLotName": "Zero", "PLotLatitude": "0", "PLotLongitude": "29.0"},
        {"PLotName": "Empty", "PLotLatitude": "", "PLotLongitude": ""},
    ]

    with patch("backend.router_tkm.tkm_client.fetch_cached", new=AsyncMock(return_value=payload)):
        resp = client.get("/api/parking")

    assert resp.status_code == 200
    assert resp.json() == [{"PLotName": "Valid", "PLotLatitude": "41.1", "PLotLongitude": "29.0"}]


def test_travel_time_points_proxy_passes_list(client):
    payload = [{"SN": 73, "SA": "10. Yil Cad. 1", "IC": "Fatih", "LT": "40.99", "LN": "28.92"}]

    with patch("backend.router_tkm.tkm_client.fetch_cached", new=AsyncMock(return_value=payload)):
        resp = client.get("/api/travel-time-points")

    assert resp.status_code == 200
    assert resp.json() == payload
    assert resp.headers["cache-control"] == "max-age=3600"


def test_tkm_route_returns_502_when_upstream_fails(client):
    with patch("backend.router_tkm.tkm_client.fetch_cached", new=AsyncMock(return_value=None)):
        resp = client.get("/api/bridges")

    assert resp.status_code == 502
    assert resp.json()["endpoint"] == "bridges"


@pytest.mark.asyncio
async def test_fetch_cached_uses_fresh_cache_without_http_call():
    tkm_client._cache["endpoint"] = (time.time() + 60, {"ok": True})
    tkm_client._client = AsyncMock()

    result = await tkm_client.fetch_cached("endpoint", 60)

    assert result == {"ok": True}
    tkm_client._client.get.assert_not_called()


@pytest.mark.asyncio
async def test_fetch_cached_stores_success_response():
    response = MagicMock(status_code=200)
    response.json.return_value = {"items": [1, 2, 3]}
    mock_client = AsyncMock()
    mock_client.get = AsyncMock(return_value=response)
    tkm_client._client = mock_client

    first = await tkm_client.fetch_cached("sample", 60)
    second = await tkm_client.fetch_cached("sample", 60)

    assert first == {"items": [1, 2, 3]}
    assert second == {"items": [1, 2, 3]}
    mock_client.get.assert_awaited_once()


@pytest.mark.asyncio
async def test_fetch_cached_returns_stale_on_redirect():
    tkm_client._cache["redirected"] = (time.time() - 5, {"stale": True})
    response = MagicMock(status_code=302)
    mock_client = AsyncMock()
    mock_client.get = AsyncMock(return_value=response)
    tkm_client._client = mock_client

    result = await tkm_client.fetch_cached("redirected", 60)

    assert result == {"stale": True}


@pytest.mark.asyncio
async def test_fetch_cached_returns_stale_on_json_error():
    tkm_client._cache["broken-json"] = (time.time() - 5, {"stale": True})
    response = MagicMock(status_code=200)
    response.json.side_effect = ValueError("bad json")
    mock_client = AsyncMock()
    mock_client.get = AsyncMock(return_value=response)
    tkm_client._client = mock_client

    result = await tkm_client.fetch_cached("broken-json", 60)

    assert result == {"stale": True}
