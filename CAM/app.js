document.addEventListener("DOMContentLoaded", async () => {
    // --- HTML Escaping (XSS protection) ---
    function esc(str) {
        if (!str) return "";
        const div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // --- Favorites (localStorage) ---
    const FAV_KEY = "ibbcam_favorites";

    function loadFavorites() {
        try {
            return new Set(JSON.parse(localStorage.getItem(FAV_KEY)) || []);
        } catch {
            return new Set();
        }
    }

    function saveFavorites() {
        localStorage.setItem(FAV_KEY, JSON.stringify([...favorites]));
    }

    function toggleFavorite(cameraNo) {
        const key = String(cameraNo);
        if (favorites.has(key)) {
            favorites.delete(key);
        } else {
            favorites.add(key);
        }
        saveFavorites();
        applyFilters();
    }

    function isFavorite(cameraNo) {
        return favorites.has(String(cameraNo));
    }

    const favorites = loadFavorites();

    // --- Map Setup ---
    const map = L.map("map", {
        zoomControl: false
    }).setView([41.015, 28.979], 11);

    L.control.zoom({ position: "topright" }).addTo(map);

    // --- Map Layers ---
    const darkLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap &copy; CARTO",
        subdomains: "abcd",
        maxZoom: 20
    });

    const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
    });

    const satelliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "&copy; Esri",
        maxZoom: 18
    });

    const markers = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false
    });

    // --- TKM Overlay Layers ---
    const announcementLayer = L.layerGroup();
    const parkingLayer = L.markerClusterGroup({ chunkedLoading: true, maxClusterRadius: 60, showCoverageOnHover: false });
    const weatherLayer = L.layerGroup();
    const evStationLayer = L.layerGroup();
    const junctionLayer = L.markerClusterGroup({ chunkedLoading: true, maxClusterRadius: 80, showCoverageOnHover: false });
    const bicycleLayer = L.layerGroup();
    const havaistLayer = L.layerGroup();
    const vmsPointLayer = L.layerGroup();
    const travelTimeLayer = L.layerGroup();

    darkLayer.addTo(map);
    announcementLayer.addTo(map);

    L.control.layers({
        "Karanlık": darkLayer,
        "Sokak": streetLayer,
        "Uydu": satelliteLayer
    }, {
        "Kameralar": markers,
        "Duyurular": announcementLayer,
        "Seyahat Süreleri": travelTimeLayer,
        "Otoparklar": parkingLayer,
        "Hava Durumu": weatherLayer,
        "Şarj İstasyonları": evStationLayer,
        "Kavşaklar": junctionLayer,
        "VMS Tabelaları": vmsPointLayer,
        "Bisiklet": bicycleLayer,
        "HAVAİST": havaistLayer
    }, { position: "topright", collapsed: true }).addTo(map);

    // --- Constants ---
    const HEALTH_POLL_INTERVAL_MS = 30 * 1000;

    // --- Data ---
    let allCameras = [];

    let currentFilter = "all";
    let currentDistrict = "";
    let searchQuery = "";
    let hls = null;
    let healthCheckInProgress = false;
    let refreshQueued = false;
    let currentModalCameraNo = null;
    let travelTimePointIndex = null;
    let userLocationMarker = null;
    let userLocationAccuracyCircle = null;

    const healthStateByCamera = new Map();
    const cameraByNo = new Map();

    // --- DOM Elements ---
    const cameraListEl = document.getElementById("cameraList");
    const searchInput = document.getElementById("searchInput");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const healthSummaryEl = document.getElementById("healthSummary");
    const districtSelect = document.getElementById("districtSelect");
    const sidebarEl = document.getElementById("sidebar");
    const mobileSheetBar = document.querySelector(".mobile-sheet-bar");
    const mobileSheetToggle = document.getElementById("mobileSheetToggle");
    const mobileSheetToggleLabel = document.getElementById("mobileSheetToggleLabel");
    const mobileSheetBackdrop = document.getElementById("mobileSheetBackdrop");
    const mobileSheetSummaryEl = document.getElementById("mobileSheetSummary");

    const modal = document.getElementById("videoModal");
    const closeModalBtn = document.getElementById("closeModal");
    const videoPlayer = document.getElementById("videoPlayer");
    const fallbackImage = document.getElementById("fallbackImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDetails = document.getElementById("modalDetails");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const favModalBtn = document.getElementById("favModalBtn");
    const shareBtn = document.getElementById("shareBtn");
    const playerWrapper = document.getElementById("playerWrapper");
    const locateMeBtn = document.getElementById("locateMeBtn");
    const locateMeLabel = document.getElementById("locateMeLabel");
    const MOBILE_BREAKPOINT = 768;
    let mobilePanelOpen = false;
    let mapResizeTimeout = 0;

    // --- District Extraction ---
    function extractDistricts() {
        districtSelect.innerHTML = '<option value="">Tum Ilceler</option>';
        const districtSet = new Set();
        allCameras.forEach((camera) => {
            const name = camera.CameraName || "";
            const parts = name.split(/[-–]/);
            if (parts.length > 1) {
                const district = parts[0].trim();
                if (district.length > 1 && district.length < 30) {
                    districtSet.add(district);
                }
            }
        });
        const sorted = [...districtSet].sort((a, b) => a.localeCompare(b, "tr"));
        sorted.forEach((d) => {
            const opt = document.createElement("option");
            opt.value = d;
            opt.textContent = d;
            districtSelect.appendChild(opt);
        });
    }

    function isMobileLayout() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function scheduleMapResize(delay = 180) {
        window.clearTimeout(mapResizeTimeout);
        mapResizeTimeout = window.setTimeout(() => {
            map.invalidateSize();
        }, delay);
    }

    function syncMobilePanelUi() {
        const expanded = isMobileLayout() && mobilePanelOpen;
        document.body.classList.toggle("mobile-panel-open", expanded);

        if (sidebarEl) {
            sidebarEl.classList.toggle("mobile-open", expanded);
        }

        if (mobileSheetToggle) {
            mobileSheetToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
            mobileSheetToggle.title = expanded ? "Haritaya don" : "Kamera listesini ac";
        }

        if (mobileSheetToggleLabel) {
            mobileSheetToggleLabel.innerText = expanded ? "Harita" : "Liste";
        }
    }

    function setMobilePanelOpen(nextOpen, options = {}) {
        if (!isMobileLayout()) {
            mobilePanelOpen = false;
            syncMobilePanelUi();
            return;
        }

        mobilePanelOpen = nextOpen;
        syncMobilePanelUi();
        scheduleMapResize(options.immediate ? 0 : 220);
    }

    function syncResponsiveLayout() {
        if (!isMobileLayout()) {
            mobilePanelOpen = false;
        }

        syncMobilePanelUi();
        scheduleMapResize(60);
    }

    function updateMobileSheetSummary(filteredCameras) {
        if (!mobileSheetSummaryEl) {
            return;
        }

        const onlineCount = filteredCameras.reduce((count, camera) => {
            return count + (getStatusPresentation(camera).filter === "online" ? 1 : 0);
        }, 0);

        const summaryParts = [`${filteredCameras.length} kamera`];
        if (searchQuery || currentDistrict || currentFilter !== "all") {
            summaryParts.push("filtreli");
        }
        if (onlineCount > 0) {
            summaryParts.push(`${onlineCount} canli`);
        }

        mobileSheetSummaryEl.innerText = summaryParts.join(" / ");
    }

    function indexCameras() {
        cameraByNo.clear();
        allCameras.forEach((camera) => {
            cameraByNo.set(String(camera.CameraNo), camera);
        });
    }

    async function loadCameras() {
        const res = await fetch("/api/cameras");
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        allCameras = (Array.isArray(data) ? data : []).filter((camera) => parseFloat(camera.XCoord) && parseFloat(camera.YCoord));
        indexCameras();
        extractDistricts();
        seedHealthState();
        applyFilters();
    }

    function setLocateButtonState(label, disabled = false) {
        if (locateMeLabel) {
            locateMeLabel.innerText = label;
        }
        if (locateMeBtn) {
            locateMeBtn.disabled = disabled;
        }
    }

    function renderUserLocation(latitude, longitude, accuracy) {
        const latlng = [latitude, longitude];

        if (!userLocationMarker) {
            userLocationMarker = L.marker(latlng, {
                icon: L.divIcon({
                    className: "user-location-icon",
                    html: '<div class="user-location-marker"></div>',
                    iconSize: [18, 18],
                    iconAnchor: [9, 9]
                })
            }).addTo(map);
        } else {
            userLocationMarker.setLatLng(latlng);
        }

        if (!userLocationAccuracyCircle) {
            userLocationAccuracyCircle = L.circle(latlng, {
                radius: Math.max(accuracy || 0, 15),
                color: "#38bdf8",
                weight: 1,
                fillColor: "#38bdf8",
                fillOpacity: 0.14
            }).addTo(map);
        } else {
            userLocationAccuracyCircle.setLatLng(latlng);
            userLocationAccuracyCircle.setRadius(Math.max(accuracy || 0, 15));
        }

        map.flyTo(latlng, Math.max(map.getZoom(), 15), { animate: true, duration: 1.2 });
    }

    function requestUserLocation() {
        if (!navigator.geolocation) {
            setLocateButtonState("Destek yok");
            window.setTimeout(() => setLocateButtonState("Konumum"), 2000);
            return;
        }

        setLocateButtonState("Bulunuyor...", true);
        navigator.geolocation.getCurrentPosition((position) => {
            renderUserLocation(
                position.coords.latitude,
                position.coords.longitude,
                position.coords.accuracy
            );
            setLocateButtonState("Konumum", false);
        }, () => {
            setLocateButtonState("Alinamadi", false);
            window.setTimeout(() => setLocateButtonState("Konumum"), 2200);
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        });
    }

    try {
        await loadCameras();
    } catch (error) {
        if (healthSummaryEl) {
            healthSummaryEl.innerText = `Kamera verileri yuklenemedi: ${error.message}`;
        }
    }

    syncResponsiveLayout();
    await startHealthChecks();
    window.setInterval(startHealthChecks, HEALTH_POLL_INTERVAL_MS);
    handleHashCamera();

    // --- TKM Data Init ---
    fetchTrafficIndex();
    setInterval(fetchTrafficIndex, 60000);
    fetchAnnouncements();
    setInterval(fetchAnnouncements, 120000);
    fetchBridges();
    setInterval(fetchBridges, 60000);
    fetchParking();
    setInterval(fetchParking, 120000);
    fetchWeather();
    setInterval(fetchWeather, 300000);
    fetchEvStations();
    setInterval(fetchEvStations, 3600000);
    fetchJunctions();
    setInterval(fetchJunctions, 3600000);
    fetchVmsPoints();
    setInterval(fetchVmsPoints, 3600000);
    fetchTravelTimes();
    setInterval(fetchTravelTimes, 120000);
    fetchBicycle();
    setInterval(fetchBicycle, 3600000);
    fetchHavaist();
    setInterval(fetchHavaist, 3600000);

    // --- Event Listeners ---
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

    districtSelect.addEventListener("change", () => {
        currentDistrict = districtSelect.value;
        applyFilters();
    });

    if (mobileSheetToggle) {
        mobileSheetToggle.addEventListener("click", () => {
            setMobilePanelOpen(!mobilePanelOpen);
        });
    }

    if (mobileSheetBar) {
        mobileSheetBar.addEventListener("click", (event) => {
            if (event.target.closest("#mobileSheetToggle")) {
                return;
            }

            if (!mobilePanelOpen) {
                setMobilePanelOpen(true);
            }
        });
    }

    if (mobileSheetBackdrop) {
        mobileSheetBackdrop.addEventListener("click", () => {
            setMobilePanelOpen(false);
        });
    }

    if (locateMeBtn) {
        locateMeBtn.addEventListener("click", requestUserLocation);
    }

    window.addEventListener("resize", syncResponsiveLayout);
    window.addEventListener("orientationchange", () => scheduleMapResize(120));

    map.on("click", () => {
        if (isMobileLayout() && mobilePanelOpen) {
            setMobilePanelOpen(false);
        }
    });

    closeModalBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("show")) {
            closeModal();
            return;
        }

        if (event.key === "Escape" && isMobileLayout() && mobilePanelOpen) {
            setMobilePanelOpen(false);
        }
    });

    // Fullscreen
    fullscreenBtn.addEventListener("click", () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            playerWrapper.requestFullscreen().catch(() => {});
        }
    });

    document.addEventListener("fullscreenchange", () => {
        fullscreenBtn.title = document.fullscreenElement ? "Tam ekrandan çık" : "Tam ekran";
    });

    // Favorite from modal
    favModalBtn.addEventListener("click", () => {
        if (currentModalCameraNo) {
            toggleFavorite(currentModalCameraNo);
            updateModalFavButton();
        }
    });

    // Share
    shareBtn.addEventListener("click", () => {
        if (!currentModalCameraNo) return;
        const url = window.location.origin + window.location.pathname + "#camera=" + currentModalCameraNo;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                shareBtn.title = "Kopyalandı!";
                setTimeout(() => { shareBtn.title = "Paylaş"; }, 2000);
            });
        }
    });

    // URL hash
    window.addEventListener("hashchange", handleHashCamera);

    // Cleanup HLS on page unload
    window.addEventListener("beforeunload", () => {
        if (hls) {
            hls.destroy();
            hls = null;
        }
    });

    // --- Health State ---
    function seedHealthState() {
        healthStateByCamera.clear();
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

    function normalizeCheckedAt(value) {
        const numeric = Number(value || 0);
        if (!numeric) {
            return 0;
        }
        return numeric < 1000000000000 ? numeric * 1000 : numeric;
    }

    function applyBackendHealthState(payload) {
        Object.entries(payload || {}).forEach(([cameraNo, entry]) => {
            const camera = cameraByNo.get(String(cameraNo));
            const source = camera && camera.IsActive !== "true" ? "source" : "runtime";

            setHealthState(cameraNo, {
                status: entry && entry.status ? entry.status : "offline",
                source,
                reason: entry && entry.reason ? entry.reason : "Durum bilgisi alinamadi.",
                checkedAt: normalizeCheckedAt(entry && entry.checkedAt)
            });
        });
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
                icon: "●",
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
                icon: "◌",
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
            icon: "✕",
            reason: health.reason
        };
    }

    // --- Counts & Stats ---
    function updateCounts() {
        const counts = {
            all: allCameras.length,
            online: 0,
            offline: 0,
            checking: 0,
            favorites: 0
        };

        let runtimeOfflineCount = 0;

        allCameras.forEach((camera) => {
            const presentation = getStatusPresentation(camera);
            counts[presentation.filter] += 1;

            if (isFavorite(camera.CameraNo)) {
                counts.favorites += 1;
            }

            const health = getHealthState(camera);
            if (health.status === "offline" && health.source === "runtime") {
                runtimeOfflineCount += 1;
            }
        });

        document.getElementById("count-all").innerText = counts.all;
        document.getElementById("count-active").innerText = counts.online;
        document.getElementById("count-passive").innerText = counts.offline;
        document.getElementById("count-favorites").innerText = counts.favorites;

        // Stats bar
        document.getElementById("stat-total").innerText = counts.all;
        document.getElementById("stat-online").innerText = counts.online;
        document.getElementById("stat-offline").innerText = counts.offline;
        document.getElementById("stat-checking").innerText = counts.checking;

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

    // --- Filtering ---
    function getFilteredCameras() {
        let filtered = allCameras;

        if (currentFilter === "favorites") {
            filtered = filtered.filter((camera) => isFavorite(camera.CameraNo));
        } else if (currentFilter !== "all") {
            filtered = filtered.filter((camera) => getStatusPresentation(camera).filter === currentFilter);
        }

        if (currentDistrict) {
            filtered = filtered.filter((camera) => {
                const name = camera.CameraName || "";
                return name.startsWith(currentDistrict + " -") || name.startsWith(currentDistrict + " –");
            });
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
        updateMobileSheetSummary(filtered);
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

    // --- Health Checks ---
    async function startHealthChecks() {
        if (healthCheckInProgress) {
            return;
        }

        healthCheckInProgress = true;
        try {
            const res = await fetch("/api/health", { cache: "no-store" });
            if (!res.ok) {
                return;
            }

            const payload = await res.json();
            applyBackendHealthState(payload);
            scheduleRefresh();
        } catch {
            // Keep the last known state and retry on the next interval.
        } finally {
            healthCheckInProgress = false;
        }

        return;

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

    // --- Map Rendering ---
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
                <div class="popup-title">${esc(camera.CameraName)}</div>
                <img src="${esc(camera.CameraCaptureImage)}" class="popup-img" onerror="this.src='https://via.placeholder.com/320x180?text=No+Image'" />
                <div style="font-size: 11px; color: #aaa;">Model: ${esc(camera.CameraModel) || "-"}</div>
                <div style="font-size: 11px; color: #aaa;">Durum: ${esc(presentation.label)}</div>
                <div style="font-size: 11px; color: #aaa;">Not: ${esc(presentation.reason)}</div>
                <button class="popup-btn" onclick="openCameraModal('${esc(String(camera.CameraNo))}')">Görüntüle</button>
            `;

            marker.bindPopup(popupHtml, { minWidth: 220 });
            newMarkers.push(marker);
        });

        markers.addLayers(newMarkers);
        map.addLayer(markers);
    }

    // --- List Rendering ---
    function renderList(camerasToRender) {
        cameraListEl.innerHTML = "";

        const visibleCameras = camerasToRender.slice(0, 100);

        if (camerasToRender.length === 0) {
            cameraListEl.innerHTML = '<div class="empty-state">Kamera bulunamadı...</div>';
            return;
        }

        visibleCameras.forEach((camera) => {
            const presentation = getStatusPresentation(camera);
            const fav = isFavorite(camera.CameraNo);
            const item = document.createElement("div");
            item.className = "camera-item";

            item.innerHTML = `
                <div class="camera-thumb" style="background-image: url('${esc(camera.CameraCaptureImage)}');">
                    <div class="status-dot ${presentation.dotClass}" title="${esc(presentation.label)}"></div>
                </div>
                <div class="camera-info">
                    <div class="camera-name" title="${esc(camera.CameraName)}">${esc(camera.CameraName)}</div>
                    <div class="camera-meta">
                        <div class="meta-row">
                            <span style="color:var(--text-primary)">No:</span> ${esc(camera.CameraNo)}
                        </div>
                        <div class="meta-row">
                            <span>Durum:</span>
                            <span class="status-text ${presentation.textClass}" title="${esc(presentation.reason)}">
                                <span class="status-icon">${presentation.icon}</span> ${esc(presentation.label)}
                            </span>
                        </div>
                        <div class="meta-row">
                            <span>Res:</span> ${esc(camera.Resolution) || "N/A"}
                        </div>
                    </div>
                </div>
                <button class="fav-btn ${fav ? "fav-active" : ""}" title="${fav ? "Favorilerden çıkar" : "Favorilere ekle"}" data-camera-no="${esc(camera.CameraNo)}">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="${fav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </button>
            `;

            // Favorite button click (stop propagation)
            const favBtn = item.querySelector(".fav-btn");
            favBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleFavorite(camera.CameraNo);
            });

            item.addEventListener("click", () => {
                map.flyTo([parseFloat(camera.YCoord), parseFloat(camera.XCoord)], 16, { animate: true, duration: 1.5 });
                if (isMobileLayout()) {
                    setMobilePanelOpen(false);
                }
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

    // --- Modal ---
    function updateModalFavButton() {
        if (!currentModalCameraNo) return;
        const fav = isFavorite(currentModalCameraNo);
        favModalBtn.classList.toggle("fav-active", fav);
        favModalBtn.title = fav ? "Favorilerden çıkar" : "Favorilere ekle";
        const svg = favModalBtn.querySelector("svg");
        svg.setAttribute("fill", fav ? "currentColor" : "none");
    }

    window.openCameraModal = function(cameraNo) {
        const camera = allCameras.find((item) => item.CameraNo === String(cameraNo));
        if (!camera) {
            return;
        }

        if (isMobileLayout()) {
            setMobilePanelOpen(false);
        }

        currentModalCameraNo = String(cameraNo);
        const presentation = getStatusPresentation(camera);

        // Update URL hash
        window.history.replaceState(null, "", "#camera=" + cameraNo);

        modalTitle.innerText = camera.CameraName;
        updateModalFavButton();

        modalDetails.innerHTML = `
            <div class="detail-item">
                <div class="detail-label">Marka</div>
                <div class="detail-value">${esc(camera.CameraBrand) || "Bilinmiyor"}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Model</div>
                <div class="detail-value">${esc(camera.CameraModel) || "Bilinmiyor"}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Çözünürlük</div>
                <div class="detail-value">${esc(camera.Resolution) || "-"}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Kaynak Durumu</div>
                <div class="detail-value">${esc(camera.State) || (camera.IsActive === "true" ? "Aktif" : "Pasif")}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Otomatik Kontrol</div>
                <div class="detail-value status-text ${presentation.textClass}">
                    <span class="status-icon">${presentation.icon}</span> ${esc(presentation.label)}
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Kontrol Notu</div>
                <div class="detail-value">${esc(presentation.reason)}</div>
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
        currentModalCameraNo = null;

        if (hls) {
            hls.destroy();
            hls = null;
        }

        videoPlayer.src = "";

        // Exit fullscreen if active
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }

        // Clear hash
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    // --- URL Hash Camera ---
    function handleHashCamera() {
        const hash = window.location.hash;
        const match = hash.match(/^#camera=(.+)$/);
        if (match) {
            const cameraNo = match[1];
            const camera = allCameras.find((c) => c.CameraNo === String(cameraNo));
            if (camera) {
                map.flyTo([parseFloat(camera.YCoord), parseFloat(camera.XCoord)], 16, { animate: true, duration: 1.5 });
                setTimeout(() => openCameraModal(cameraNo), 500);
            }
        }
    }

    // ========================================
    // TKM API Integration
    // ========================================

    function trafficColor(val) {
        if (val == null || val === "--") return "var(--text-secondary)";
        const n = Number(val);
        if (n < 40) return "var(--accent-green, #10b981)";
        if (n < 70) return "var(--accent-amber, #f59e0b)";
        return "var(--accent-red, #ef4444)";
    }

    // --- Traffic Index ---
    async function fetchTrafficIndex() {
        try {
            const res = await fetch("/api/traffic-index");
            if (!res.ok) return;
            const data = await res.json();

            const elTotal = document.getElementById("stat-traffic");
            const elAn = document.getElementById("stat-traffic-an");
            const elAv = document.getElementById("stat-traffic-av");

            if (elTotal && data.total != null) {
                elTotal.textContent = data.total;
                elTotal.style.color = trafficColor(data.total);
            }
            if (elAn && data.anadolu != null) {
                elAn.textContent = data.anadolu;
                elAn.style.color = trafficColor(data.anadolu);
            }
            if (elAv && data.avrupa != null) {
                elAv.textContent = data.avrupa;
                elAv.style.color = trafficColor(data.avrupa);
            }
        } catch { /* silently ignore */ }
    }

    // --- Announcements ---
    function announcementIcon(priority) {
        const colors = { "1": "#ef4444", "2": "#f59e0b", "3": "#3b82f6" };
        const color = colors[String(priority)] || "#f59e0b";
        return L.divIcon({
            className: "announcement-icon",
            html: `<div style="width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-bottom:14px solid ${color};filter:drop-shadow(0 0 4px ${color});"></div>`,
            iconSize: [16, 14],
            iconAnchor: [8, 14]
        });
    }

    async function fetchAnnouncements() {
        try {
            const res = await fetch("/api/announcements");
            if (!res.ok) return;
            const data = await res.json();
            if (!Array.isArray(data)) return;

            announcementLayer.clearLayers();

            data.forEach((ann) => {
                const lat = parseFloat(ann.yKoordinat || ann.YKoordinat || 0);
                const lng = parseFloat(ann.xKoordinat || ann.XKoordinat || 0);
                if (!lat || !lng) return;

                const marker = L.marker([lat, lng], { icon: announcementIcon(ann.Oncelik) });

                let popupHtml = `<div class="popup-title" style="color:#f59e0b;">${esc(ann.Baslik || "Duyuru")}</div>`;
                popupHtml += `<div style="font-size:12px;color:#ccc;margin:4px 0;">${esc(ann.Metin || "")}</div>`;
                if (ann.GirisTarihi) {
                    popupHtml += `<div style="font-size:11px;color:#888;">Tarih: ${esc(ann.GirisTarihi)}</div>`;
                }
                if (ann.KameraId && ann.KameraId !== "0" && ann.KameraId !== 0) {
                    popupHtml += `<button class="popup-btn" onclick="openCameraModal('${esc(String(ann.KameraId))}')">Kamerayı Göster</button>`;
                }

                marker.bindPopup(popupHtml, { minWidth: 200 });
                announcementLayer.addLayer(marker);
            });
        } catch { /* silently ignore */ }
    }

    // --- Bridges Status ---
    async function fetchBridges() {
        try {
            const res = await fetch("/api/bridges");
            if (!res.ok) return;
            const data = await res.json();
            if (!Array.isArray(data)) return;

            const panel = document.getElementById("bridgesPanel");
            if (!panel) return;

            if (data.length === 0) {
                panel.innerHTML = "";
                return;
            }

            let html = '<div class="bridges-title">Köprü / Güzergah Durumu</div><div class="bridges-grid">';
            data.forEach((b) => {
                const name = esc(b.RouteName || b.RouteId || "?");
                const status = String(b.Cong || b.Status || "?");
                let statusClass = "bridge-normal";
                const statusUpper = status.toUpperCase();
                if (statusUpper.includes("YOĞUN") || statusUpper.includes("YOGUN") || statusUpper.includes("3") || statusUpper.includes("4")) {
                    statusClass = "bridge-heavy";
                } else if (statusUpper.includes("ORTA") || statusUpper.includes("2")) {
                    statusClass = "bridge-moderate";
                } else if (statusUpper.includes("AKICI") || statusUpper.includes("1") || statusUpper.includes("0")) {
                    statusClass = "bridge-light";
                }
                html += `<div class="bridge-item"><span class="bridge-name">${name}</span><span class="bridge-status ${statusClass}">${esc(status)}</span></div>`;
            });
            html += "</div>";
            panel.innerHTML = html;
        } catch { /* silently ignore */ }
    }

    // --- Parking ---
    function parkingIcon(availableRate) {
        let color = "#6b7280"; // gray default
        if (availableRate != null) {
            const rate = Number(availableRate);
            if (rate > 50) color = "#10b981";
            else if (rate > 20) color = "#f59e0b";
            else color = "#ef4444";
        }
        return L.divIcon({
            className: "parking-icon",
            html: `<div style="background:${color};color:#fff;font-weight:bold;font-size:10px;width:20px;height:20px;border-radius:3px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.3);">P</div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
    }

    async function fetchParking() {
        try {
            const res = await fetch("/api/parking");
            if (!res.ok) return;
            const data = await res.json();
            if (!Array.isArray(data)) return;

            parkingLayer.clearLayers();

            data.forEach((p) => {
                const lat = parseFloat(p.PLotLatitude || 0);
                const lng = parseFloat(p.PLotLongitude || 0);
                if (!lat || !lng) return;

                const marker = L.marker([lat, lng], { icon: parkingIcon(p.PLotAvailableRate) });
                const cap = p.PLotCapasity || "?";
                const avail = p.PLotAvailableCount || "?";
                const rate = p.PLotAvailableRate != null ? p.PLotAvailableRate + "%" : "?";
                let popupHtml = `<div class="popup-title" style="color:#10b981;">${esc(p.PLotName || "Otopark")}</div>`;
                popupHtml += `<div style="font-size:12px;color:#ccc;">Kapasite: ${esc(String(cap))}</div>`;
                popupHtml += `<div style="font-size:12px;color:#ccc;">Boş: ${esc(String(avail))} (${esc(String(rate))})</div>`;
                if (p.PWorkingHours) popupHtml += `<div style="font-size:11px;color:#888;">Saat: ${esc(p.PWorkingHours)}</div>`;
                marker.bindPopup(popupHtml, { minWidth: 180 });
                parkingLayer.addLayer(marker);
            });
        } catch { /* silently ignore */ }
    }

    // --- Weather ---
    async function fetchWeather() {
        try {
            const res = await fetch("/api/weather");
            if (!res.ok) return;
            const data = await res.json();
            if (!Array.isArray(data)) return;

            weatherLayer.clearLayers();

            data.forEach((w) => {
                const lat = parseFloat(w.LAT || w.Lat || w.lat || 0);
                const lng = parseFloat(w.LONG || w.Long || w.lng || w.lon || 0);
                if (!lat || !lng) return;

                const temp = w.HAVA_SICAKLIGI || w.HavaSicakligi || w.Temperature || "?";
                const icon = L.divIcon({
                    className: "weather-icon",
                    html: `<div style="background:rgba(59,130,246,0.8);color:#fff;font-size:10px;font-weight:bold;padding:2px 4px;border-radius:4px;white-space:nowrap;">${esc(String(temp))}°</div>`,
                    iconSize: [36, 20],
                    iconAnchor: [18, 10]
                });
                const marker = L.marker([lat, lng], { icon });

                let popupHtml = `<div class="popup-title" style="color:#3b82f6;">Hava Durumu</div>`;
                popupHtml += `<div style="font-size:12px;color:#ccc;">Sıcaklık: ${esc(String(temp))}°C</div>`;
                const wind = w.RUZGAR_HIZI || w.RuzgarHizi || w.WindSpeed;
                if (wind) popupHtml += `<div style="font-size:12px;color:#ccc;">Rüzgar: ${esc(String(wind))} km/h</div>`;
                const humidity = w.NEM || w.Nem || w.Humidity;
                if (humidity) popupHtml += `<div style="font-size:12px;color:#ccc;">Nem: ${esc(String(humidity))}%</div>`;
                const road = w.ASFALT_DURUMU || w.AsfaltDurumu;
                if (road) popupHtml += `<div style="font-size:12px;color:#ccc;">Yol: ${esc(String(road))}</div>`;

                marker.bindPopup(popupHtml, { minWidth: 160 });
                weatherLayer.addLayer(marker);
            });
        } catch { /* silently ignore */ }
    }

    // --- EV Charge Stations ---
    async function fetchEvStations() {
        try {
            const res = await fetch("/api/ev-stations");
            if (!res.ok) return;
            const data = await res.json();
            if (!Array.isArray(data)) return;

            evStationLayer.clearLayers();

            data.forEach((s) => {
                const lat = parseFloat(s.Ycoord || s.YCoord || s.ycoord || 0);
                const lng = parseFloat(s.Xcoord || s.XCoord || s.xcoord || 0);
                if (!lat || !lng) return;

                const icon = L.divIcon({
                    className: "ev-icon",
                    html: `<div style="background:#22c55e;color:#fff;font-size:12px;font-weight:bold;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.3);">⚡</div>`,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });
                const marker = L.marker([lat, lng], { icon });

                let popupHtml = `<div class="popup-title" style="color:#22c55e;">${esc(s.StationName || "Şarj İstasyonu")}</div>`;
                if (s.Address) popupHtml += `<div style="font-size:12px;color:#ccc;">${esc(s.Address)}</div>`;
                if (s.SocketInfo) popupHtml += `<div style="font-size:11px;color:#888;">Soket: ${esc(s.SocketInfo)}</div>`;
                if (s.Weekdays) popupHtml += `<div style="font-size:11px;color:#888;">Hafta içi: ${esc(s.Weekdays)}</div>`;
                if (s.Weekend) popupHtml += `<div style="font-size:11px;color:#888;">Hafta sonu: ${esc(s.Weekend)}</div>`;

                marker.bindPopup(popupHtml, { minWidth: 180 });
                evStationLayer.addLayer(marker);
            });
        } catch { /* silently ignore */ }
    }

    // --- Junctions ---
    async function fetchJunctions() {
        try {
            const res = await fetch("/api/junctions");
            if (!res.ok) return;
            const data = await res.json();
            if (!Array.isArray(data)) return;

            junctionLayer.clearLayers();

            data.forEach((j) => {
                const lat = parseFloat(j.YCoord || j.ycoord || 0);
                const lng = parseFloat(j.XCoord || j.xcoord || 0);
                if (!lat || !lng) return;

                const icon = L.divIcon({
                    className: "junction-icon",
                    html: `<div style="background:#8b5cf6;color:#fff;font-size:9px;font-weight:bold;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.3);">K</div>`,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8]
                });
                const marker = L.marker([lat, lng], { icon });

                let popupHtml = `<div class="popup-title" style="color:#8b5cf6;">${esc(j.JunctionName || "Kavşak")}</div>`;
                if (j.JunctionNo) popupHtml += `<div style="font-size:11px;color:#888;">No: ${esc(String(j.JunctionNo))}</div>`;
                if (j.JunctionType) popupHtml += `<div style="font-size:11px;color:#888;">Tip: ${esc(String(j.JunctionType))}</div>`;

                marker.bindPopup(popupHtml, { minWidth: 160 });
                junctionLayer.addLayer(marker);
            });
        } catch { /* silently ignore */ }
    }

    // --- Bicycle Stations ---
    async function fetchBicycle() {
        try {
            const res = await fetch("/api/bicycle");
            if (!res.ok) return;
            const data = await res.json();
            if (!Array.isArray(data)) return;

            bicycleLayer.clearLayers();

            data.forEach((b) => {
                const lat = parseFloat(b.LAT || b.Lat || b.YCoord || b.lat || 0);
                const lng = parseFloat(b.LONG || b.Long || b.XCoord || b.lng || b.lon || 0);
                if (!lat || !lng) return;

                const icon = L.divIcon({
                    className: "bicycle-icon",
                    html: `<div style="background:#06b6d4;color:#fff;font-size:10px;font-weight:bold;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.3);">B</div>`,
                    iconSize: [18, 18],
                    iconAnchor: [9, 9]
                });
                const marker = L.marker([lat, lng], { icon });

                const name = b.StationName || b.Name || b.name || "Bisiklet İstasyonu";
                let popupHtml = `<div class="popup-title" style="color:#06b6d4;">${esc(name)}</div>`;

                marker.bindPopup(popupHtml, { minWidth: 140 });
                bicycleLayer.addLayer(marker);
            });
        } catch { /* silently ignore */ }
    }

    // --- HAVAIST Stations ---
    async function fetchHavaist() {
        try {
            const res = await fetch("/api/havaist");
            if (!res.ok) return;
            const data = await res.json();
            if (!Array.isArray(data)) return;

            havaistLayer.clearLayers();

            data.forEach((h) => {
                const lat = parseFloat(h.LAT || h.Lat || h.YCoord || h.lat || 0);
                const lng = parseFloat(h.LONG || h.Long || h.XCoord || h.lng || h.lon || 0);
                if (!lat || !lng) return;

                const icon = L.divIcon({
                    className: "havaist-icon",
                    html: `<div style="background:#ec4899;color:#fff;font-size:9px;font-weight:bold;width:20px;height:20px;border-radius:3px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.3);">H</div>`,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });
                const marker = L.marker([lat, lng], { icon });

                const name = h.StationName || h.Name || h.name || "HAVAİST Durağı";
                let popupHtml = `<div class="popup-title" style="color:#ec4899;">${esc(name)}</div>`;

                marker.bindPopup(popupHtml, { minWidth: 140 });
                havaistLayer.addLayer(marker);
            });
        } catch { /* silently ignore */ }
    }

    function normalizeLookup(value) {
        return String(value || "")
            .toLocaleUpperCase("tr")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^A-Z0-9]/g, "");
    }

    function parseTravelMinutes(value) {
        if (value == null || value === "") {
            return null;
        }

        if (typeof value === "number") {
            return value > 180 ? Math.round(value / 60) : Math.round(value);
        }

        const raw = String(value).trim();
        if (!raw) {
            return null;
        }

        const match = raw.match(/(\d+)/);
        if (!match) {
            return null;
        }

        const minutes = Number(match[1]);
        if (raw.toLowerCase().includes("sn") || raw.toLowerCase().includes("sec")) {
            return Math.round(minutes / 60);
        }
        return minutes;
    }

    function travelTimeColor(value) {
        const minutes = parseTravelMinutes(value);
        if (minutes == null) return "#60a5fa";
        if (minutes >= 30) return "#ef4444";
        if (minutes >= 15) return "#f59e0b";
        return "#10b981";
    }

    function vmsCongestionLabel(code) {
        const mapping = {
            1: "Akici",
            2: "Yavas",
            3: "Yogun",
            4: "Cok yogun"
        };
        return mapping[Number(code)] || "Bilinmiyor";
    }

    function vmsCongestionColor(code) {
        const mapping = {
            1: "#10b981",
            2: "#f59e0b",
            3: "#ef4444",
            4: "#b91c1c"
        };
        return mapping[Number(code)] || "#94a3b8";
    }

    function formatTravelTime(value) {
        const minutes = parseTravelMinutes(value);
        return minutes == null ? "Veri yok" : `${minutes} dk`;
    }

    async function ensureTravelTimePointIndex() {
        if (travelTimePointIndex) {
            return travelTimePointIndex;
        }

        const res = await fetch("/api/travel-time-points");
        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
            return null;
        }

        const index = new Map();
        data.forEach((point) => {
            const lat = parseFloat(point.LT || 0);
            const lng = parseFloat(point.LN || 0);
            if (!lat || !lng) {
                return;
            }

            const key = normalizeLookup(point.SA);
            if (key && !index.has(key)) {
                index.set(key, {
                    lat,
                    lng,
                    district: point.IC || "",
                    name: point.SA || ""
                });
            }
        });

        travelTimePointIndex = index;
        return travelTimePointIndex;
    }

    function findTravelTimePoint(name, pointIndex) {
        const key = normalizeLookup(name);
        if (!key || !pointIndex) {
            return null;
        }

        if (pointIndex.has(key)) {
            return pointIndex.get(key);
        }

        for (const [candidate, point] of pointIndex.entries()) {
            if (candidate.includes(key) || key.includes(candidate)) {
                return point;
            }
        }

        return null;
    }

    function createVmsIcon() {
        return L.divIcon({
            className: "vms-icon",
            html: '<div style="background:#f97316;color:#fff;font-size:10px;font-weight:bold;width:22px;height:22px;border-radius:4px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.35);">V</div>',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
        });
    }

    async function loadVmsData(vmsNo, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            return;
        }

        container.innerHTML = '<div class="vms-message-empty">Yukleniyor...</div>';

        try {
            const res = await fetch(`/api/vms-data/${encodeURIComponent(vmsNo)}`);
            if (!res.ok) {
                container.innerHTML = '<div class="vms-message-empty">VMS verisi alinamadi.</div>';
                return;
            }

            const data = await res.json();
            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = '<div class="vms-message-empty">Aktif mesaj yok.</div>';
                return;
            }

            container.innerHTML = data.map((item) => {
                const code = item.CONG_CODE;
                const label = vmsCongestionLabel(code);
                const color = vmsCongestionColor(code);
                const route = esc(item.ROUTE_NAME_VMS || item.SYSTEM_NAME_VIEW || "VMS");
                const system = esc(String(item.SYSTEM_NO || ""));
                return `
                    <div class="vms-message">
                        <div class="vms-message-title">${route}</div>
                        <div class="vms-message-meta">
                            <span class="vms-badge" style="background:${color};">${esc(label)}</span>
                            <span>Sistem #${system || "-"}</span>
                        </div>
                    </div>
                `;
            }).join("");
        } catch {
            container.innerHTML = '<div class="vms-message-empty">VMS verisi alinamadi.</div>';
        }
    }

    async function fetchVmsPoints() {
        try {
            const res = await fetch("/api/vms-points");
            if (!res.ok) return;
            const data = await res.json();
            if (!Array.isArray(data)) return;

            vmsPointLayer.clearLayers();

            data.forEach((point) => {
                const lat = parseFloat(point.Lat || 0);
                const lng = parseFloat(point.Long || 0);
                if (!lat || !lng) return;

                const vmsNo = String(point.VmsNo || "");
                const contentId = `vms-${vmsNo.replace(/[^a-zA-Z0-9_-]/g, "")}`;
                const marker = L.marker([lat, lng], { icon: createVmsIcon() });

                let popupHtml = `<div class="popup-title" style="color:#f97316;">${esc(point.VmsName || "VMS Tabelasi")}</div>`;
                if (point.Road) popupHtml += `<div style="font-size:12px;color:#ccc;">${esc(point.Road)}</div>`;
                if (point.District) popupHtml += `<div style="font-size:11px;color:#888;">Ilce: ${esc(point.District)}</div>`;
                popupHtml += `<div id="${contentId}" class="vms-message-list"><div class="vms-message-empty">Yukleniyor...</div></div>`;

                marker.bindPopup(popupHtml, { minWidth: 220 });
                marker.on("popupopen", () => {
                    loadVmsData(vmsNo, contentId);
                });

                vmsPointLayer.addLayer(marker);
            });
        } catch { /* silently ignore */ }
    }

    async function fetchTravelTimes() {
        try {
            const [routesRes, pointIndex] = await Promise.all([
                fetch("/api/travel-times"),
                ensureTravelTimePointIndex()
            ]);

            if (!routesRes.ok || !pointIndex) return;

            const data = await routesRes.json();
            if (!Array.isArray(data)) return;

            travelTimeLayer.clearLayers();
            const renderedPoints = new Set();

            data.forEach((direction) => {
                const wayList = Array.isArray(direction.WayList) ? direction.WayList : [];
                wayList.forEach((way) => {
                    const routeList = Array.isArray(way.RouteList) ? way.RouteList : [];
                    routeList.forEach((route) => {
                        const fromPoint = findTravelTimePoint(route.Source, pointIndex);
                        const toPoint = findTravelTimePoint(route.Destination, pointIndex);
                        if (!fromPoint || !toPoint) {
                            return;
                        }

                        const color = travelTimeColor(route.TravelTime);
                        const polyline = L.polyline(
                            [[fromPoint.lat, fromPoint.lng], [toPoint.lat, toPoint.lng]],
                            {
                                color,
                                weight: 3,
                                opacity: 0.85,
                                dashArray: route.TravelTime ? null : "7 6"
                            }
                        );

                        const wayName = esc(way.Way || direction.Direction || "Guzergah");
                        const source = esc(route.Source || "-");
                        const destination = esc(route.Destination || "-");
                        const distance = esc(route.Distance || "-");
                        const updatedAt = esc(route.Date || "-");
                        polyline.bindPopup(`
                            <div class="popup-title" style="color:${color};">${wayName}</div>
                            <div style="font-size:12px;color:#ccc;">${source} -> ${destination}</div>
                            <div style="font-size:12px;color:#ccc;">Sure: ${esc(formatTravelTime(route.TravelTime))}</div>
                            <div style="font-size:12px;color:#ccc;">Mesafe: ${distance} km</div>
                            <div style="font-size:11px;color:#888;">Guncelleme: ${updatedAt}</div>
                        `, { minWidth: 220 });
                        travelTimeLayer.addLayer(polyline);

                        [fromPoint, toPoint].forEach((point) => {
                            const pointKey = `${point.lat}:${point.lng}`;
                            if (renderedPoints.has(pointKey)) {
                                return;
                            }

                            renderedPoints.add(pointKey);
                            const circle = L.circleMarker([point.lat, point.lng], {
                                radius: 4,
                                color,
                                weight: 1,
                                fillColor: color,
                                fillOpacity: 0.75
                            });
                            circle.bindPopup(`
                                <div class="popup-title">${esc(point.name || "Olcum Noktasi")}</div>
                                <div style="font-size:11px;color:#888;">${esc(point.district || "")}</div>
                            `);
                            travelTimeLayer.addLayer(circle);
                        });
                    });
                });
            });
        } catch { /* silently ignore */ }
    }
});
