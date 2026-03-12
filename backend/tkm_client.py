"""
Shared httpx client and TTL cache for IBB TKM API calls.
All TKM proxy endpoints use this module to fetch data from upstream.
"""
import logging
import time
from typing import Any

import httpx

logger = logging.getLogger(__name__)

TKM_BASE = "https://tkmservices.ibb.gov.tr/Web/api"

_client: httpx.AsyncClient | None = None
_cache: dict[str, tuple[float, Any]] = {}  # {endpoint: (expires_at, data)}


async def init_client() -> None:
    global _client
    _client = httpx.AsyncClient(
        headers={
            "Referer": "https://tkmservices.ibb.gov.tr/",
            "Accept": "application/json",
        },
        verify=False,
        timeout=10.0,
        follow_redirects=False,
    )


async def close_client() -> None:
    global _client
    if _client:
        await _client.aclose()
        _client = None


async def fetch_cached(endpoint: str, ttl: int) -> Any | None:
    """Fetch data from TKM API with TTL caching.

    Returns cached data if fresh. On upstream failure, returns stale
    cache if available, otherwise None.
    """
    now = time.time()

    # Return fresh cache
    if endpoint in _cache:
        expires_at, data = _cache[endpoint]
        if now < expires_at:
            return data

    # Fetch from upstream
    if _client is None:
        logger.warning("TKM client not initialized")
        return _get_stale(endpoint)

    url = f"{TKM_BASE}/{endpoint}"
    try:
        resp = await _client.get(url)

        # 302 = auth regression, treat as failure
        if resp.status_code in (301, 302, 303, 307, 308):
            logger.warning("TKM %s returned redirect %d (auth required?)", endpoint, resp.status_code)
            return _get_stale(endpoint)

        if resp.status_code >= 400:
            logger.warning("TKM %s returned HTTP %d", endpoint, resp.status_code)
            return _get_stale(endpoint)

        data = resp.json()
        _cache[endpoint] = (now + ttl, data)
        return data

    except (httpx.TimeoutException, httpx.ConnectError) as exc:
        logger.warning("TKM %s network error: %s", endpoint, type(exc).__name__)
        return _get_stale(endpoint)
    except Exception as exc:
        logger.warning("TKM %s unexpected error: %s", endpoint, exc)
        return _get_stale(endpoint)


def _get_stale(endpoint: str) -> Any | None:
    """Return stale cached data if available."""
    if endpoint in _cache:
        _, data = _cache[endpoint]
        logger.info("Serving stale cache for %s", endpoint)
        return data
    return None
