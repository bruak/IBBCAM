/**
 * Backend health poller.
 * Fetches /api/health every POLL_INTERVAL ms and dispatches a
 * 'camerahealth' CustomEvent on document with the health map as detail.
 */

const POLL_INTERVAL = 30_000; // 30 seconds

export function start(cameras) {
    // Seed initial state from camera list so UI shows correct status before first poll
    const initial = {};
    cameras.forEach((cam) => {
        initial[cam.CameraNo] = {
            status: cam.IsActive === "true" ? "checking" : "offline",
            checkedAt: 0,
            reason: cam.IsActive === "true" ? "Kontrol başlatılıyor" : (cam.State || "Pasif"),
        };
    });
    _dispatch(initial);

    // Start polling
    _poll();
    setInterval(_poll, POLL_INTERVAL);
}

async function _poll() {
    try {
        const res = await fetch("/api/health");
        if (!res.ok) return;
        const data = await res.json();
        _dispatch(data);
    } catch {
        // Network error — stay silent, keep existing state
    }
}

function _dispatch(healthMap) {
    document.dispatchEvent(new CustomEvent("camerahealth", { detail: healthMap }));
}
