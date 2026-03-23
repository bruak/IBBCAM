from fastapi import APIRouter, Body, HTTPException
from fastapi.responses import Response

from backend import previews

router = APIRouter()


@router.post("/previews/touch")
async def touch_previews(payload: dict = Body(...)) -> Response:
    raw_camera_nos = payload.get("cameraNos")
    if not isinstance(raw_camera_nos, list):
        raise HTTPException(status_code=422, detail="cameraNos must be an array")

    deduped: list[str] = []
    seen: set[str] = set()
    for item in raw_camera_nos:
        camera_no = str(item).strip()
        if not camera_no or camera_no in seen:
            continue
        seen.add(camera_no)
        deduped.append(camera_no)

    if len(deduped) > 50:
        raise HTTPException(status_code=422, detail="cameraNos accepts at most 50 unique items")

    previews.touch(deduped, source="frontend")
    return Response(status_code=204)
