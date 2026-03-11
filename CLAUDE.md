# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Istanbul (IBB) city camera viewer — a static web app that displays thousands of traffic/city cameras on a dark-themed Leaflet map with live HLS streaming support. The UI language is Turkish.

## Data Pipeline

Camera data flows through a conversion pipeline:

1. `list.xml` — raw XML export containing `<CameraIdentityCard>` entries with fields like CameraNo, CameraName, XCoord, YCoord, IsActive, WowzaStreamSSL, CameraCaptureImage, etc.
2. `CAM/convert.py` — regex-based XML-to-JSON converter (no external dependencies, uses stdlib only)
3. `CAM/cameras.js` — generated output (`const cameras = [...]`), loaded as a script tag

**To regenerate camera data after updating list.xml:**
```bash
cd CAM && python3 convert.py
```

## Architecture

The app is a single-page static site in `CAM/` with no build step or package manager:

- `index.html` — entry point, loads CDN dependencies (Leaflet, Leaflet.MarkerCluster, HLS.js) and local scripts
- `app.js` — all application logic: map initialization (CartoDB Dark Matter tiles, centered on Istanbul), marker clustering, sidebar list with search/filter, and video modal with HLS.js streaming + fallback to capture image
- `style.css` — dark-mode-only design using CSS custom properties (prefixed `--bg-`, `--accent-`, `--text-`)
- `cameras.js` — generated data file (do not edit manually)

Key implementation details:
- Sidebar list renders max 100 items for performance; users must search to find others
- Camera coordinates: `XCoord` = longitude, `YCoord` = latitude
- Cameras with invalid (zero/empty) coordinates are filtered out on load
- `openCameraModal` is exposed on `window` for use in Leaflet popup onclick handlers
- HLS streams use `WowzaStreamSSL` (preferred) or `WowzaStream` fields; falls back to `CameraCaptureImage` static snapshot

## Running the App

Open `CAM/index.html` directly in a browser, or serve via any static HTTP server:
```bash
cd CAM && python3 -m http.server 8000
```
