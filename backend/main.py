"""
FastAPI application entry point.
- Serves the API endpoints under /api
- Serves the CAM/ frontend at /
- Starts background health checks and the shared TKM client on startup
"""
import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from backend import health, parser, state, tkm_client
from backend.router_cameras import router as cameras_router
from backend.router_health import router as health_router
from backend.router_meta import router as meta_router
from backend.router_tkm import router as tkm_router

logging.basicConfig(level=logging.INFO)

FRONTEND_DIR = Path(__file__).parent.parent / "CAM"


@asynccontextmanager
async def lifespan(app: FastAPI):
    cameras = parser.load_cameras()
    state.seed_from_cameras(cameras)
    await health.start_background_health_checks()
    await tkm_client.init_client()
    yield
    await health.stop_background_health_checks()
    await tkm_client.close_client()


app = FastAPI(title="IBB Kamera API", lifespan=lifespan)

app.include_router(cameras_router, prefix="/api")
app.include_router(health_router, prefix="/api")
app.include_router(meta_router, prefix="/api")
app.include_router(tkm_router, prefix="/api")

# Serve frontend at / — html=True enables index.html fallback for /
app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="static")
