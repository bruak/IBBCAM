document.addEventListener("DOMContentLoaded", () => {
    const map = L.map("map", {
        zoomControl: false
    }).setView([41.015, 28.979], 11);

    L.control.zoom({ position: "topright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap &copy; CARTO",
        subdomains: "abcd",
        maxZoom: 20
    }).addTo(map);

    const HEALTH_CHECK_TIMEOUT_MS = 8000;
    const HEALTH_RECHECK_INTERVAL_MS = 5 * 60 * 1000;
    const HEALTH_CHECK_CONCURRENCY = 6;

    let allCameras = typeof cameras !== "undefined" ? cameras : [];
    allCameras = allCameras.filter((camera) => parseFloat(camera.XCoord) && parseFloat(camera.YCoord));

    let currentFilter = "all";
    let searchQuery = "";
    let hls = null;
    let healthCheckInProgress = false;
    let refreshQueued = false;

    const healthStateByCamera = new Map();

    const markers = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false
    });

    const cameraListEl = document.getElementById("cameraList");
    const searchInput = document.getElementById("searchInput");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const healthSummaryEl = document.getElementById("healthSummary");

    const modal = document.getElementById("videoModal");
    const closeModalBtn = document.getElementById("closeModal");
    const videoPlayer = document.getElementById("videoPlayer");
    const fallbackImage = document.getElementById("fallbackImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDetails = document.getElementById("modalDetails");

    seedHealthState();
    applyFilters();
    startHealthChecks();
    window.setInterval(startHealthChecks, HEALTH_RECHECK_INTERVAL_MS);

    searchInput.addEventListener("input", (event) => {
        searchQuery = event.target.value.toLowerCase();
        applyFilters();
    });

    filterBtns.forEach((button) => {
        button.addEventListener("click", (event) => {
            filterBtns.forEach((item) => item.classList.remove("active"));
            event.currentTarget.classList.add("active");
            currentFilter = event.currentTarget.getAttribute("data-status");
            applyFilters();
        });
    });

    closeModalBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function seedHealthState() {
        allCameras.forEach((camera) => {
            if (camera.IsActive === "true") {
                setHealthState(camera.CameraNo, {
                    status: "checking",
                    source: "runtime",
                    label: "Kontrol ediliyor",
                    reason: "Kaynak aktif görünüyor, erişim doğrulanıyor.",
                    checkedAt: 0
                });
                return;
            }

            setHealthState(camera.CameraNo, {
                status: "offline",
                source: "source",
                label: camera.State || "Kapalı",
                reason: "Kaynak veride pasif olarak işaretli.",
                checkedAt: Date.now()
            });
        });
    }

    function setHealthState(cameraNo, nextState) {
        healthStateByCamera.set(String(cameraNo), {
            updatedAt: Date.now(),
            ...nextState
        });
    }

    function getHealthState(camera) {
        return healthStateByCamera.get(String(camera.CameraNo)) || {
            status: camera.IsActive === "true" ? "checking" : "offline",
            source: camera.IsActive === "true" ? "runtime" : "source",
            label: camera.IsActive === "true" ? "Kontrol ediliyor" : (camera.State || "Kapalı"),
            reason: camera.IsActive === "true"
                ? "Kaynak aktif görünüyor, erişim doğrulanıyor."
                : "Kaynak veride pasif olarak işaretli.",
            checkedAt: 0
        };
    }

    function getStatusPresentation(camera) {
        const health = getHealthState(camera);

        if (health.status === "online") {
            return {
                filter: "online",
                dotClass: "active",
                textClass: "online",
                markerColor: "#10b981",
                shadowColor: "rgba(16, 185, 129, 0.4)",
                label: "Çalışıyor",
                reason: health.reason
            };
        }

        if (health.status === "checking") {
            return {
                filter: "checking",
                dotClass: "checking",
                textClass: "checking",
                markerColor: "#f59e0b",
                shadowColor: "rgba(245, 158, 11, 0.4)",
                label: "Kontrol ediliyor",
                reason: health.reason
            };
        }

        return {
            filter: "offline",
            dotClass: "passive",
            textClass: "offline",
            markerColor: "#ef4444",
            shadowColor: "rgba(239, 68, 68, 0.4)",
            label: health.source === "runtime" ? "Kapalı/erişilemiyor" : (camera.State || "Kapalı"),
            reason: health.reason
        };
    }

    function updateCounts() {
        const counts = {
            all: allCameras.length,
            online: 0,
            offline: 0,
            checking: 0
        };

        let runtimeOfflineCount = 0;

        allCameras.forEach((camera) => {
            const presentation = getStatusPresentation(camera);
            counts[presentation.filter] += 1;

            const health = getHealthState(camera);
            if (health.status === "offline" && health.source === "runtime") {
                runtimeOfflineCount += 1;
            }
        });

        document.getElementById("count-all").innerText = counts.all;
        document.getElementById("count-active").innerText = counts.online;
        document.getElementById("count-passive").innerText = counts.offline;

        if (!healthSummaryEl) {
            return;
        }

        if (counts.checking > 0) {
            healthSummaryEl.innerText = `${counts.checking} kamera doğrulanıyor. ${runtimeOfflineCount} aktif görünen kamera erişilemiyor olarak işaretlendi.`;
            return;
        }

        healthSummaryEl.innerText = runtimeOfflineCount > 0
            ? `${runtimeOfflineCount} aktif görünen kamera erişilemiyor olarak işaretlendi. Kontrol otomatik olarak her 5 dakikada bir yenilenir.`
            : "Aktif görünen kameralar doğrulandı. Kontrol otomatik olarak her 5 dakikada bir yenilenir.";
    }

    function getFilteredCameras() {
        let filtered = allCameras;

        if (currentFilter !== "all") {
            filtered = filtered.filter((camera) => getStatusPresentation(camera).filter === currentFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter((camera) => {
                const presentation = getStatusPresentation(camera);
                const searchableText = [
                    camera.CameraName,
                    camera.CameraBrand,
                    camera.CameraModel,
                    presentation.label,
                    camera.State
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(searchQuery);
            });
        }

        return filtered;
    }

    function applyFilters() {
        const filtered = getFilteredCameras();
        updateCounts();
        renderMarkers(filtered);
        renderList(filtered);
    }

    function scheduleRefresh() {
        if (refreshQueued) {
            return;
        }

        refreshQueued = true;
        window.requestAnimationFrame(() => {
            refreshQueued = false;
            applyFilters();
        });
    }

    function shouldCheckCamera(camera) {
        if (camera.IsActive !== "true") {
            return false;
        }

        const health = getHealthState(camera);
        return !health.checkedAt || (Date.now() - health.checkedAt) >= HEALTH_RECHECK_INTERVAL_MS;
    }

    async function startHealthChecks() {
        if (healthCheckInProgress) {
            return;
        }

        const queue = allCameras.filter(shouldCheckCamera);
        if (!queue.length) {
            scheduleRefresh();
            return;
        }

        healthCheckInProgress = true;

        queue.forEach((camera) => {
            const health = getHealthState(camera);
            setHealthState(camera.CameraNo, {
                status: "checking",
                source: "runtime",
                label: "Kontrol ediliyor",
                reason: health.checkedAt
                    ? "Erişim yeniden doğrulanıyor."
                    : "Kaynak aktif görünüyor, erişim doğrulanıyor.",
                checkedAt: health.checkedAt || 0
            });
        });

        scheduleRefresh();

        let cursor = 0;
        const workerCount = Math.min(HEALTH_CHECK_CONCURRENCY, queue.length);
        const workers = Array.from({ length: workerCount }, async () => {
            while (cursor < queue.length) {
                const camera = queue[cursor];
                cursor += 1;
                await checkCameraHealth(camera);
            }
        });

        await Promise.all(workers);
        healthCheckInProgress = false;
        scheduleRefresh();
    }

    async function checkCameraHealth(camera) {
        const isReachable = await probeSnapshot(camera.CameraCaptureImage);

        if (isReachable) {
            setHealthState(camera.CameraNo, {
                status: "online",
                source: "runtime",
                label: "Çalışıyor",
                reason: "Anlık görüntü endpoint'i yanıt verdi.",
                checkedAt: Date.now()
            });
        } else {
            setHealthState(camera.CameraNo, {
                status: "offline",
                source: "runtime",
                label: "Kapalı/erişilemiyor",
                reason: "Kaynak aktif görünse de anlık görüntü alınamadı.",
                checkedAt: Date.now()
            });
        }

        scheduleRefresh();
    }

    function probeSnapshot(imageUrl) {
        if (!imageUrl) {
            return Promise.resolve(false);
        }

        return new Promise((resolve) => {
            const img = new Image();
            let settled = false;

            const finish = (result) => {
                if (settled) {
                    return;
                }

                settled = true;
                window.clearTimeout(timeoutId);
                img.onload = null;
                img.onerror = null;
                resolve(result);
            };

            const timeoutId = window.setTimeout(() => finish(false), HEALTH_CHECK_TIMEOUT_MS);

            img.onload = () => finish(img.naturalWidth > 0 && img.naturalHeight > 0);
            img.onerror = () => finish(false);
            img.referrerPolicy = "no-referrer";
            img.src = withCacheBuster(imageUrl);
        });
    }

    function withCacheBuster(rawUrl) {
        try {
            const url = new URL(rawUrl, window.location.href);
            url.searchParams.set("_healthCheck", Date.now().toString());
            return url.toString();
        } catch (error) {
            const separator = rawUrl.includes("?") ? "&" : "?";
            return `${rawUrl}${separator}_healthCheck=${Date.now()}`;
        }
    }

    function createIcon(presentation) {
        return L.divIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: ${presentation.markerColor}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${presentation.shadowColor};"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });
    }

    function renderMarkers(camerasToRender) {
        markers.clearLayers();
        const newMarkers = [];

        camerasToRender.forEach((camera) => {
            const presentation = getStatusPresentation(camera);
            const marker = L.marker([parseFloat(camera.YCoord), parseFloat(camera.XCoord)], {
                icon: createIcon(presentation)
            });

            const popupHtml = `
                <div class="popup-title">${camera.CameraName}</div>
                <img src="${camera.CameraCaptureImage}" class="popup-img" onerror="this.src='https://via.placeholder.com/320x180?text=No+Image'" />
                <div style="font-size: 11px; color: #aaa;">Model: ${camera.CameraModel || "-"}</div>
                <div style="font-size: 11px; color: #aaa;">Durum: ${presentation.label}</div>
                <div style="font-size: 11px; color: #aaa;">Not: ${presentation.reason}</div>
                <button class="popup-btn" onclick="openCameraModal('${camera.CameraNo}')">Görüntüle</button>
            `;

            marker.bindPopup(popupHtml, { minWidth: 220 });
            newMarkers.push(marker);
        });

        markers.addLayers(newMarkers);
        map.addLayer(markers);
    }

    function renderList(camerasToRender) {
        cameraListEl.innerHTML = "";

        const visibleCameras = camerasToRender.slice(0, 100);

        if (camerasToRender.length === 0) {
            cameraListEl.innerHTML = '<div class="empty-state">Kamera bulunamadı...</div>';
            return;
        }

        visibleCameras.forEach((camera) => {
            const presentation = getStatusPresentation(camera);
            const item = document.createElement("div");
            item.className = "camera-item";

            item.innerHTML = `
                <div class="camera-thumb" style="background-image: url('${camera.CameraCaptureImage}');">
                    <div class="status-dot ${presentation.dotClass}"></div>
                </div>
                <div class="camera-info">
                    <div class="camera-name" title="${camera.CameraName}">${camera.CameraName}</div>
                    <div class="camera-meta">
                        <div class="meta-row">
                            <span style="color:var(--text-primary)">No:</span> ${camera.CameraNo}
                        </div>
                        <div class="meta-row">
                            <span>Durum:</span>
                            <span class="status-text ${presentation.textClass}" title="${presentation.reason}">${presentation.label}</span>
                        </div>
                        <div class="meta-row">
                            <span>Res:</span> ${camera.Resolution || "N/A"}
                        </div>
                    </div>
                </div>
            `;

            item.addEventListener("click", () => {
                map.flyTo([parseFloat(camera.YCoord), parseFloat(camera.XCoord)], 16, { animate: true, duration: 1.5 });
                openCameraModal(camera.CameraNo);
            });

            cameraListEl.appendChild(item);
        });

        if (camerasToRender.length > 100) {
            const more = document.createElement("div");
            more.style.textAlign = "center";
            more.style.padding = "10px";
            more.style.fontSize = "0.8rem";
            more.style.color = "var(--text-secondary)";
            more.innerText = `+${camerasToRender.length - 100} daha var (Lütfen arama yapın)`;
            cameraListEl.appendChild(more);
        }
    }

    window.openCameraModal = function(cameraNo) {
        const camera = allCameras.find((item) => item.CameraNo === String(cameraNo));
        if (!camera) {
            return;
        }

        const presentation = getStatusPresentation(camera);

        modalTitle.innerText = camera.CameraName;
        modalDetails.innerHTML = `
            <div class="detail-item">
                <div class="detail-label">Marka</div>
                <div class="detail-value">${camera.CameraBrand || "Bilinmiyor"}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Model</div>
                <div class="detail-value">${camera.CameraModel || "Bilinmiyor"}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Çözünürlük</div>
                <div class="detail-value">${camera.Resolution || "-"}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Kaynak Durumu</div>
                <div class="detail-value">${camera.State || (camera.IsActive === "true" ? "Aktif" : "Pasif")}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Otomatik Kontrol</div>
                <div class="detail-value status-text ${presentation.textClass}">${presentation.label}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Kontrol Notu</div>
                <div class="detail-value">${presentation.reason}</div>
            </div>
        `;

        videoPlayer.style.display = "none";
        fallbackImage.style.display = "none";

        if (hls) {
            hls.destroy();
            hls = null;
        }

        const streamUrl = camera.WowzaStreamSSL || camera.WowzaStream;

        if (streamUrl && streamUrl.endsWith(".m3u8")) {
            videoPlayer.style.display = "block";

            if (Hls.isSupported()) {
                hls = new Hls();
                hls.loadSource(streamUrl);
                hls.attachMedia(videoPlayer);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoPlayer.play().catch((error) => console.log("Autoplay blocked", error));
                });

                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        showFallback(camera.CameraCaptureImage);
                    }
                });
            } else if (videoPlayer.canPlayType("application/vnd.apple.mpegurl")) {
                videoPlayer.src = streamUrl;
                videoPlayer.play().catch((error) => console.log("Autoplay blocked", error));
            } else {
                showFallback(camera.CameraCaptureImage);
            }
        } else {
            showFallback(camera.CameraCaptureImage);
        }

        modal.classList.add("show");
    };

    function showFallback(imageSource) {
        if (hls) {
            hls.destroy();
            hls = null;
        }

        videoPlayer.style.display = "none";
        fallbackImage.style.display = "block";
        fallbackImage.src = imageSource || "https://via.placeholder.com/800x450?text=Görüntü+Yok";
    }

    function closeModal() {
        modal.classList.remove("show");

        if (hls) {
            hls.destroy();
            hls = null;
        }

        videoPlayer.src = "";
    }
});
