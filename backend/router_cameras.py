from fastapi import APIRouter
from fastapi.responses import JSONResponse

from backend import parser

router = APIRouter()


@router.get("/cameras")
async def get_cameras() -> JSONResponse:
    """Return all cameras with whitelisted fields only. Sensitive fields are never included."""
    return JSONResponse(content=parser.load_cameras())
