"""
Lightweight page-view analytics stored in SQLite.
Tracks: timestamp, device type, browser, referrer, hashed IP.
No personal data is stored — IPs are SHA-256 hashed.
"""
import asyncio
import hashlib
import re
import sqlite3
import time
from pathlib import Path

_DB_PATH = Path(__file__).parent / "data" / "analytics.db"


# ---------------------------------------------------------------------------
# Database setup
# ---------------------------------------------------------------------------

def _get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    _DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with _get_conn() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS pageviews (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                ts          INTEGER NOT NULL,
                ip_hash     TEXT,
                device_type TEXT,
                browser     TEXT,
                referrer    TEXT
            )
        """)
        conn.execute("CREATE INDEX IF NOT EXISTS idx_ts ON pageviews(ts)")
        conn.commit()


# ---------------------------------------------------------------------------
# User-agent parsing (no external deps)
# ---------------------------------------------------------------------------

def _parse_ua(ua: str) -> tuple[str, str]:
    """Return (device_type, browser) from User-Agent string."""
    ua_lower = ua.lower()

    # Device
    if re.search(r"ipad|tablet|kindle|playbook|silk|(android(?!.*mobile))", ua_lower):
        device = "tablet"
    elif re.search(r"mobile|android|iphone|ipod|blackberry|windows phone|opera mini", ua_lower):
        device = "mobile"
    else:
        device = "desktop"

    # Browser
    if "edg/" in ua_lower or "edge/" in ua_lower:
        browser = "Edge"
    elif "opr/" in ua_lower or "opera" in ua_lower:
        browser = "Opera"
    elif "chrome/" in ua_lower and "chromium" not in ua_lower:
        browser = "Chrome"
    elif "firefox/" in ua_lower:
        browser = "Firefox"
    elif "safari/" in ua_lower and "chrome" not in ua_lower:
        browser = "Safari"
    elif "samsung" in ua_lower:
        browser = "Samsung Browser"
    else:
        browser = "Diğer"

    return device, browser


# ---------------------------------------------------------------------------
# Write
# ---------------------------------------------------------------------------

def _record_sync(ip: str, ua: str, referrer: str) -> None:
    ip_hash = hashlib.sha256(ip.encode()).hexdigest()[:16]
    device, browser = _parse_ua(ua)
    ts = int(time.time())
    with _get_conn() as conn:
        conn.execute(
            "INSERT INTO pageviews (ts, ip_hash, device_type, browser, referrer) VALUES (?,?,?,?,?)",
            (ts, ip_hash, device, browser, referrer[:500] if referrer else ""),
        )
        conn.commit()


async def record_pageview(ip: str, ua: str, referrer: str) -> None:
    await asyncio.to_thread(_record_sync, ip, ua, referrer)


# ---------------------------------------------------------------------------
# Read / aggregation
# ---------------------------------------------------------------------------

def _stats_sync() -> dict:
    now = int(time.time())
    day_start = now - now % 86400  # UTC midnight
    week_ago = now - 7 * 86400
    month_ago = now - 30 * 86400

    with _get_conn() as conn:
        # Total
        total = conn.execute("SELECT COUNT(*) FROM pageviews").fetchone()[0]
        today = conn.execute(
            "SELECT COUNT(*) FROM pageviews WHERE ts >= ?", (day_start,)
        ).fetchone()[0]

        # Unique visitors (by hashed IP, last 30 days)
        unique_30d = conn.execute(
            "SELECT COUNT(DISTINCT ip_hash) FROM pageviews WHERE ts >= ?", (month_ago,)
        ).fetchone()[0]

        # By hour (last 7 days, UTC)
        rows = conn.execute(
            "SELECT (ts / 3600) % 24 AS hour, COUNT(*) AS cnt "
            "FROM pageviews WHERE ts >= ? GROUP BY hour ORDER BY hour",
            (week_ago,),
        ).fetchall()
        by_hour = [{"hour": r["hour"], "count": r["cnt"]} for r in rows]

        # By device (last 30 days)
        rows = conn.execute(
            "SELECT device_type, COUNT(*) AS cnt FROM pageviews "
            "WHERE ts >= ? GROUP BY device_type ORDER BY cnt DESC",
            (month_ago,),
        ).fetchall()
        by_device = {r["device_type"]: r["cnt"] for r in rows}

        # By browser (last 30 days)
        rows = conn.execute(
            "SELECT browser, COUNT(*) AS cnt FROM pageviews "
            "WHERE ts >= ? GROUP BY browser ORDER BY cnt DESC",
            (month_ago,),
        ).fetchall()
        by_browser = {r["browser"]: r["cnt"] for r in rows}

        # Daily trend (last 30 days, UTC dates)
        rows = conn.execute(
            "SELECT date(ts, 'unixepoch') AS day, COUNT(*) AS cnt "
            "FROM pageviews WHERE ts >= ? GROUP BY day ORDER BY day",
            (month_ago,),
        ).fetchall()
        by_day = [{"date": r["day"], "count": r["cnt"]} for r in rows]

    return {
        "total_views": total,
        "today_views": today,
        "unique_visitors_30d": unique_30d,
        "by_hour": by_hour,
        "by_device": by_device,
        "by_browser": by_browser,
        "by_day": by_day,
    }


async def get_stats() -> dict:
    return await asyncio.to_thread(_stats_sync)
