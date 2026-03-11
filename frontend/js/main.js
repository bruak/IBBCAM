/**
 * Application entry point.
 * Fetches camera data from /api/cameras, initializes all modules,
 * and distributes health updates from the backend poll.
 */

import * as modal      from "./modal.js";
import * as map        from "./map.js";
import * as sidebar    from "./sidebar.js";
import * as healthPoll from "./health-poll.js";

async function main() {
    let cameras = [];

    try {
        const res = await fetch("/api/cameras");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        cameras = await res.json();
    } catch (err) {
        const el = document.getElementById("healthSummary");
        if (el) el.textContent = `Veri yüklenemedi: ${err.message}`;
        return;
    }

    // Initialize all modules (order matters: modal first so map/sidebar can import it)
    modal.init(cameras);
    map.init(cameras);
    sidebar.init(cameras);

    // Distribute health updates to all modules
    document.addEventListener("camerahealth", (e) => {
        const healthMap = e.detail;
        modal.updateHealth(healthMap);
        map.updateHealth(healthMap);
        sidebar.updateHealth(healthMap);
    });

    // Start health polling — seeds initial state then polls /api/health every 30s
    // Must be called AFTER the 'camerahealth' listener is registered above
    healthPoll.start(cameras);
}

main();
