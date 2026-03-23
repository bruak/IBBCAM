from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from backend.analytics import get_stats, record_pageview

router = APIRouter()


@router.post("/api/track")
async def track(request: Request):
    ip = request.headers.get("X-Forwarded-For", request.client.host).split(",")[0].strip()
    ua = request.headers.get("User-Agent", "")
    body = await request.json() if request.headers.get("content-type", "").startswith("application/json") else {}
    referrer = body.get("referrer", request.headers.get("Referer", ""))
    await record_pageview(ip, ua, referrer)
    return JSONResponse({"ok": True})


@router.get("/api/stats")
async def stats():
    return await get_stats()
