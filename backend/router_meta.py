from fastapi import APIRouter

router = APIRouter()


@router.get("/healthz", include_in_schema=False)
async def healthz() -> dict[str, str]:
    """Lightweight liveness endpoint for container/platform health checks."""
    return {"status": "ok"}
