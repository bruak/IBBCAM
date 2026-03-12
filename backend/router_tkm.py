"""
TKM proxy endpoints.
Each route fetches data from the upstream IBB TKM API via tkm_client
and returns normalized JSON to the frontend.
"""
from fastapi import APIRouter
from fastapi.responses import JSONResponse

from backend import tkm_client

router = APIRouter()

TTL_TRAFFIC = 60
TTL_ANNOUNCEMENTS = 120
TTL_BRIDGES = 60
TTL_PARKING = 120
TTL_WEATHER = 300
TTL_STATIC = 3600
TTL_VMS_DATA = 60
TTL_TRAVEL = 120
TTL_CAMERA = 300


def _error_response(endpoint: str) -> JSONResponse:
    return JSONResponse(
        {"error": "Veri alinamadi", "endpoint": endpoint},
        status_code=502,
    )


def _list_response(data, ttl: int) -> JSONResponse:
    return JSONResponse(
        data if isinstance(data, list) else [],
        headers={"Cache-Control": f"max-age={ttl}"},
    )


@router.get("/traffic-index")
async def traffic_index() -> JSONResponse:
    data = await tkm_client.fetch_cached("Citix/v1/TrafficIndex", TTL_TRAFFIC)
    if data is None:
        return _error_response("traffic-index")
    return JSONResponse(
        {
            "total": data.get("TI"),
            "anadolu": data.get("TI_An"),
            "avrupa": data.get("TI_Av"),
        },
        headers={"Cache-Control": f"max-age={TTL_TRAFFIC}"},
    )


@router.get("/announcements")
async def announcements() -> JSONResponse:
    data = await tkm_client.fetch_cached("Citix/v1/CurrentAnnouncement", TTL_ANNOUNCEMENTS)
    if data is None:
        return _error_response("announcements")
    return _list_response(data, TTL_ANNOUNCEMENTS)


@router.get("/bridges")
async def bridges() -> JSONResponse:
    data = await tkm_client.fetch_cached("IntensityMap/v1/BridgesStatus", TTL_BRIDGES)
    if data is None:
        return _error_response("bridges")
    return _list_response(data, TTL_BRIDGES)


@router.get("/parking")
async def parking() -> JSONResponse:
    data = await tkm_client.fetch_cached("Citix/v1/Parking", TTL_PARKING)
    if data is None:
        return _error_response("parking")
    if not isinstance(data, list):
        return _list_response([], TTL_PARKING)

    filtered = [
        item
        for item in data
        if _has_coord(item.get("PLotLatitude")) and _has_coord(item.get("PLotLongitude"))
    ]
    return JSONResponse(filtered, headers={"Cache-Control": f"max-age={TTL_PARKING}"})


@router.get("/weather")
async def weather() -> JSONResponse:
    data = await tkm_client.fetch_cached("IntensityMap/v1/Weather", TTL_WEATHER)
    if data is None:
        return _error_response("weather")
    return _list_response(data, TTL_WEATHER)


@router.get("/ev-stations")
async def ev_stations() -> JSONResponse:
    data = await tkm_client.fetch_cached("IntensityMap/v1/ElectChargeStations", TTL_STATIC)
    if data is None:
        return _error_response("ev-stations")
    return _list_response(data, TTL_STATIC)


@router.get("/junctions")
async def junctions() -> JSONResponse:
    data = await tkm_client.fetch_cached("IntensityMap/v1/Junction", TTL_STATIC)
    if data is None:
        return _error_response("junctions")
    return _list_response(data, TTL_STATIC)


@router.get("/vms-points")
async def vms_points() -> JSONResponse:
    data = await tkm_client.fetch_cached("IntensityMap/v1/VmsPoint", TTL_STATIC)
    if data is None:
        return _error_response("vms-points")
    return _list_response(data, TTL_STATIC)


@router.get("/vms-data/{vms_no}")
async def vms_data(vms_no: str) -> JSONResponse:
    endpoint = f"IntensityMap/v1/VmsData/{vms_no}"
    data = await tkm_client.fetch_cached(endpoint, TTL_VMS_DATA)
    if data is None:
        return _error_response(f"vms-data/{vms_no}")
    return JSONResponse(data, headers={"Cache-Control": f"max-age={TTL_VMS_DATA}"})


@router.get("/havaist")
async def havaist() -> JSONResponse:
    data = await tkm_client.fetch_cached("IntensityMap/v1/HavaIstStations", TTL_STATIC)
    if data is None:
        return _error_response("havaist")
    return _list_response(data, TTL_STATIC)


@router.get("/bicycle")
async def bicycle() -> JSONResponse:
    data = await tkm_client.fetch_cached("IntensityMap/v1/Bicycle", TTL_STATIC)
    if data is None:
        return _error_response("bicycle")
    return _list_response(data, TTL_STATIC)


@router.get("/travel-times")
async def travel_times() -> JSONResponse:
    data = await tkm_client.fetch_cached("IntensityMap/v1/RouteTravelTime", TTL_TRAVEL)
    if data is None:
        return _error_response("travel-times")
    return _list_response(data, TTL_TRAVEL)


@router.get("/travel-time-points")
async def travel_time_points() -> JSONResponse:
    data = await tkm_client.fetch_cached("IntensityMap/v1/TravelTimePoint", TTL_STATIC)
    if data is None:
        return _error_response("travel-time-points")
    return _list_response(data, TTL_STATIC)


@router.get("/poi")
async def poi() -> JSONResponse:
    data = await tkm_client.fetch_cached("IntensityMap/v1/POI", TTL_STATIC)
    if data is None:
        return _error_response("poi")
    return _list_response(data, TTL_STATIC)


@router.get("/tkm-cameras")
async def tkm_cameras() -> JSONResponse:
    data = await tkm_client.fetch_cached("Citix/v1/Camera", TTL_CAMERA)
    if data is None:
        return _error_response("tkm-cameras")
    return _list_response(data, TTL_CAMERA)


def _has_coord(value) -> bool:
    if value is None or value == "" or value == "0":
        return False
    try:
        return float(value) != 0.0
    except (TypeError, ValueError):
        return False
