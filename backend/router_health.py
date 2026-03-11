from fastapi import APIRouter
from fastapi.responses import JSONResponse

from backend import state

router = APIRouter()


@router.get("/health")
async def get_health() -> JSONResponse:
    """Return current health state for all cameras keyed by CameraNo."""
    return JSONResponse(content=state.get_all())
