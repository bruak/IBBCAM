## Overview

This change moves camera health verification to the backend and adds a simple user location display on the map.

## Goals

- Reduce browser-side work by removing client-side snapshot probing.
- Use bounded backend threads for snapshot checks without introducing multi-process state issues.
- Load camera data from `/api/cameras` instead of embedding `cameras.js`.
- Add a "Konumum" control that centers the map and displays the user's current position.

## Backend Design

- Keep a single FastAPI process with shared in-memory state.
- Replace direct client-side probing with server-side snapshot checks.
- Run blocking snapshot probes in a bounded `ThreadPoolExecutor`.
- Reuse one sync `httpx.Client` per worker thread to avoid recreating connections for every probe.
- Keep `/api/health` as the single frontend source of truth.

## Frontend Design

- Fetch camera data from `/api/cameras` during app startup.
- Seed local status from source data, then poll `/api/health` on an interval.
- Remove browser `Image()`-based health checks.
- Add a floating map action button for geolocation.
- On success, render a marker and accuracy circle and move the map to the user position.

## Error Handling

- If `/api/cameras` fails, show a load error and skip map list rendering.
- If `/api/health` fails, keep the last known health state and retry on the next interval.
- If geolocation is denied or unavailable, keep the map unchanged and show a short button status.

## Validation

- Run the existing backend test suite.
- Keep async-client probe tests working while production uses the thread-based path.
