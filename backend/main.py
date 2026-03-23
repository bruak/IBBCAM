"""
FastAPI application entry point.
- Serves the API endpoints under /api
- Serves the CAM/ frontend at /
- Starts background health checks and the shared TKM client on startup
"""
import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from backend import analytics, health, parser, previews, state, tkm_client
from backend.router_analytics import router as analytics_router
from backend.router_cameras import router as cameras_router
from backend.router_health import router as health_router
from backend.router_meta import router as meta_router
from backend.router_popular import router as popular_router
from backend.router_previews import router as previews_router
from backend.router_tkm import router as tkm_router

logging.basicConfig(level=logging.INFO)

FRONTEND_DIR = Path(__file__).parent.parent / "CAM"
ERROR_500_PAGE = FRONTEND_DIR / "500.html"


@asynccontextmanager
async def lifespan(app: FastAPI):
    analytics.init_db()
    cameras = parser.load_cameras()
    state.seed_from_cameras(cameras)
    previews.seed_from_cameras(cameras)
    await health.start_background_health_checks()
    await previews.start_background_preview_generation()
    await tkm_client.init_client()
    yield
    await health.stop_background_health_checks()
    await previews.stop_background_preview_generation()
    await tkm_client.close_client()


app = FastAPI(title="IBB Kamera API", lifespan=lifespan)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logging.exception("Unhandled application error", exc_info=exc)
    if request.url.path.startswith("/api"):
        return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})
    if ERROR_500_PAGE.exists():
        return FileResponse(ERROR_500_PAGE, status_code=500)
    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})


app.include_router(analytics_router)
app.include_router(cameras_router, prefix="/api")
app.include_router(health_router, prefix="/api")
app.include_router(meta_router, prefix="/api")
app.include_router(popular_router, prefix="/api")
app.include_router(previews_router, prefix="/api")
app.include_router(tkm_router, prefix="/api")

app.mount("/previews", StaticFiles(directory=str(previews.PREVIEW_DIR), check_dir=False), name="previews")

# Serve frontend at / — html=True enables index.html fallback for /
app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="static")
