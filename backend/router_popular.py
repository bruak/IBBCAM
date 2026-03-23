from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse

from backend import parser, popular, previews

router = APIRouter()


@router.get("/popular-cameras")
async def get_popular_cameras(limit: int = Query(default=popular.DEFAULT_LIMIT, ge=1, le=50)) -> JSONResponse:
    items = popular.get_popular_cameras(parser.load_cameras(), limit=limit)
    previews.touch([str(item.get("CameraNo", "")) for item in items], source="popular")
    return JSONResponse(content=items)


@router.post("/camera-open/{camera_no}")
async def record_camera_open(camera_no: str) -> JSONResponse:
    cameras = parser.load_cameras()
    camera = next((cam for cam in cameras if str(cam.get("CameraNo")) == str(camera_no)), None)
    if camera is None:
        raise HTTPException(status_code=404, detail="Camera not found")

    open_count = popular.record_open(camera_no)
    return JSONResponse({"cameraNo": str(camera_no), "openCount": open_count})
