"""
FastAPI application entry point.
- Serves /api/cameras and /api/health endpoints
- Serves the frontend/ directory as static files at /
- Starts the background health check loop on startup
"""
import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from backend import health, parser, state
from backend.router_cameras import router as cameras_router
from backend.router_health import router as health_router

logging.basicConfig(level=logging.INFO)

FRONTEND_DIR = Path(__file__).parent.parent / "frontend"


@asynccontextmanager
async def lifespan(app: FastAPI):
    cameras = parser.load_cameras()
    state.seed_from_cameras(cameras)
    await health.start_background_health_checks()
    yield


app = FastAPI(title="IBB Kamera API", lifespan=lifespan)

app.include_router(cameras_router, prefix="/api")
app.include_router(health_router, prefix="/api")

# Serve frontend at / — html=True enables index.html fallback for /
app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="static")
