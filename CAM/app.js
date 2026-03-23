document.addEventListener("DOMContentLoaded", async () => {
    const esc = (value) => {
        const div = document.createElement("div");
        div.textContent = value ?? "";
        return div.innerHTML;
    };

    const scheduleDeferredTask = (task, delay = 0) => {
        window.setTimeout(() => {
            if ("requestIdleCallback" in window) {
                window.requestIdleCallback(() => task(), { timeout: 1500 });
                return;
            }
            task();
        }, delay);
    };

    const map = L.map("map", {
        zoomControl: true,
        tap: false
    }).setView([41.015, 28.979], 11);

    const mapThemeStorageKey = "ibbcam-map-theme";
    const baseLayerConfigs = {
        light: {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            options: {
                attribution: "&copy; OpenStreetMap contributors",
                maxZoom: 19
            }
        },
        dark: {
            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            options: {
                attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
                maxZoom: 20,
                subdomains: "abcd"
            }
        }
    };
    let activeBaseLayer = null;
    let currentMapTheme = "dark";
    let mapThemeToggleBtn = null;

    function loadStoredMapTheme() {
        try {
            const stored = window.localStorage.getItem(mapThemeStorageKey);
            return stored === "light" || stored === "dark" ? stored : "dark";
        } catch {
            return "dark";
        }
    }

    function persistMapTheme(theme) {
        try {
            window.localStorage.setItem(mapThemeStorageKey, theme);
        } catch {
            // ignore storage issues
        }
    }

    function applyMapTheme(theme) {
        const nextTheme = theme === "light" ? "light" : "dark";
        const config = baseLayerConfigs[nextTheme];
        if (!config) return;

        if (activeBaseLayer) {
            map.removeLayer(activeBaseLayer);
        }

        activeBaseLayer = L.tileLayer(config.url, config.options).addTo(map);
        currentMapTheme = nextTheme;
        persistMapTheme(nextTheme);

        if (mapThemeToggleBtn) {
            const isDark = nextTheme === "dark";
            mapThemeToggleBtn.textContent = isDark ? "Açık Harita" : "Koyu Harita";
            mapThemeToggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
            mapThemeToggleBtn.setAttribute("title", isDark ? "Açık haritaya geç" : "Koyu haritaya geç");
        }
    }

    const mapThemeControl = L.control({ position: "topleft" });
    mapThemeControl.onAdd = () => {
        const button = L.DomUtil.create("button", "map-theme-control");
        button.type = "button";
        button.setAttribute("aria-label", "Harita temasını değiştir");
        L.DomEvent.disableClickPropagation(button);
        L.DomEvent.disableScrollPropagation(button);
        L.DomEvent.on(button, "click", () => {
            applyMapTheme(currentMapTheme === "dark" ? "light" : "dark");
        });
        mapThemeToggleBtn = button;
        return button;
    };
    mapThemeControl.addTo(map);
    applyMapTheme(loadStoredMapTheme());

    const markers = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 48,
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true
    });
    map.addLayer(markers);

    // Radar layer
    const radarMinZoom = 13;
    const radarStorageKey = "ibbcam-radar-visible";
    let radarVisible = false;
    let shouldRestoreRadarVisibility = false;
    try { shouldRestoreRadarVisibility = localStorage.getItem(radarStorageKey) === "true"; } catch {}
    const radarLayer = L.featureGroup();

    let radarToggleBtn = null;
    const radarControl = L.control({ position: "topleft" });
    radarControl.onAdd = () => {
        const btn = L.DomUtil.create("button", "map-theme-control radar-toggle-btn");
        btn.type = "button";
        btn.setAttribute("aria-label", "Hız radarlarını göster/gizle");
        L.DomEvent.disableClickPropagation(btn);
        L.DomEvent.disableScrollPropagation(btn);
        L.DomEvent.on(btn, "click", () => toggleRadarLayer());
        radarToggleBtn = btn;
        updateRadarToggleBtn();
        return btn;
    };
    radarControl.addTo(map);

    function updateRadarToggleBtn() {
        if (!radarToggleBtn) return;
        const waitingForZoom = radarVisible && map.getZoom() < radarMinZoom;
        radarToggleBtn.textContent = !radarVisible
            ? "Radarları Göster"
            : (waitingForZoom ? "Radarlar Açık (Yakınlaş)" : "Radarları Gizle");
        radarToggleBtn.setAttribute("aria-pressed", radarVisible ? "true" : "false");
        radarToggleBtn.setAttribute(
            "title",
            !radarVisible
                ? "Hız radarlarını göster"
                : (waitingForZoom
                    ? `Radarlar ${radarMinZoom}+ yakınlaştırmada görünür`
                    : "Hız radarlarını gizle")
        );
    }

    let radarsLoaded = false;
    let radarLoadPromise = null;

    async function ensureRadarsLoaded() {
        if (radarsLoaded) return;
        if (!radarLoadPromise) {
            radarLoadPromise = (async () => {
                const res = await fetch("/radars.json");
                if (!res.ok) throw new Error(`/radars.json HTTP ${res.status}`);
                const radars = await res.json();
                const icon = L.divIcon({
                    className: "radar-marker",
                    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                        <polygon points="12,2 22,20 2,20" fill="#facc15" stroke="#92400e" stroke-width="1.5" stroke-linejoin="round"/>
                        <text x="12" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#78350f">!</text>
                    </svg>`,
                    iconSize: [22, 22],
                    iconAnchor: [11, 20],
                    popupAnchor: [0, -22]
                });
                radars.forEach((radar) => {
                    const lat = Number.parseFloat(radar?.lat);
                    const lon = Number.parseFloat(radar?.lon);
                    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
                    const marker = L.marker([lat, lon], { icon });
                    marker.bindPopup(
                        `<div class="radar-popup"><strong>Hız Radarı</strong><p>${esc(radar.name)}</p></div>`,
                        { maxWidth: 280 }
                    );
                    radarLayer.addLayer(marker);
                });
                radarsLoaded = true;
            })().catch((error) => {
                radarLoadPromise = null;
                throw error;
            });
        }
        await radarLoadPromise;
    }

    async function syncRadarLayer() {
        if (!radarVisible || map.getZoom() < radarMinZoom) {
            map.removeLayer(radarLayer);
            updateRadarToggleBtn();
            return;
        }

        try {
            await ensureRadarsLoaded();
            if (radarVisible && map.getZoom() >= radarMinZoom) {
                map.addLayer(radarLayer);
            }
        } catch (err) {
            console.error("Radar verisi yüklenemedi:", err);
            radarVisible = false;
            try { localStorage.setItem(radarStorageKey, false); } catch {}
            map.removeLayer(radarLayer);
        }
        updateRadarToggleBtn();
    }

    function toggleRadarLayer() {
        shouldRestoreRadarVisibility = false;
        radarVisible = !radarVisible;
        try { localStorage.setItem(radarStorageKey, radarVisible); } catch {}
        syncRadarLayer();
    }

    map.on("zoomend", () => {
        if (!radarVisible && !map.hasLayer(radarLayer)) return;
        syncRadarLayer();
    });

    const mobileSheet = document.getElementById("mobileSheet");
    const sheetToggleBtn = document.getElementById("sheetToggleBtn");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const sheetGrab = document.getElementById("sheetGrab");
    const sheetHeader = document.getElementById("sheetHeader");
    const popularTabBtn = document.getElementById("popularTabBtn");
    const listTabBtn = document.getElementById("listTabBtn");
    const panelSections = Array.from(document.querySelectorAll("[data-panel]"));
    const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));

    const cameraListEl = document.getElementById("cameraList");
    const popularListEl = document.getElementById("popularList");
    const searchInput = document.getElementById("searchInput");
    const healthSummaryEl = document.getElementById("healthSummary");
    const listCountEl = document.getElementById("listCount");
    const refreshPopularBtn = document.getElementById("refreshPopularBtn");

    const modal = document.getElementById("videoModal");
    const modalContent = modal.querySelector(".modal-content");
    const modalHeader = document.getElementById("modalHeader");
    const closeModalBtn = document.getElementById("closeModal");
    const modalTitle = document.getElementById("modalTitle");
    const fallbackImage = document.getElementById("fallbackImage");
    const liveVideo = document.getElementById("liveVideo");
    const playerWrapper = document.getElementById("playerWrapper");
    const playerStatus = document.getElementById("playerStatus");
    const playerEmpty = document.getElementById("playerEmpty");
    const retryStreamBtn = document.getElementById("retryStreamBtn");

    let allCameras = [];
    let searchQuery = "";
    let currentModalCameraNo = null;
    let activeMobileTab = "popular";
    let currentHls = null;
    let hasFitToMarkers = false;
    let playbackTimeoutId = 0;
    let playbackAttemptToken = 0;
    let previewTouchTimeoutId = 0;
    let searchDebounceId = 0;
    let renderedCameraCount = 0;
    let currentListSignature = "";
    let currentFilteredCameras = [];
    let currentMobileSheetState = "collapsed";
    let dragStartY = 0;
    let dragDeltaY = 0;
    let modalDragStartY = 0;
    let modalDragDeltaY = 0;
    const markerHoverPopupDelay = 1000;
    const mobileSearchDebounceDelay = 150;
    const mobileListInitialCount = 60;
    const mobileListIncrement = 30;
    const mobilePreviewTouchCount = 20;
    const desktopListCount = 150;
    const desktopPreviewTouchCount = 30;
    const mobileSheetStates = ["collapsed", "half", "full"];
    const cameraByNo = new Map();
    const healthByCamera = new Map();
    const queuedPreviewCameraNos = new Set();
    const videoEventListeners = [];
    const hlsEventListeners = [];
    let previewTouchEnabled = false;
    let analyticsSent = false;

    function isMobileLayout() {
        return window.matchMedia("(max-width: 960px)").matches;
    }

    function isCompactMobile() {
        return window.matchMedia("(max-width: 640px)").matches;
    }

    function updateMobileMenuButton(expanded) {
        if (!mobileMenuBtn) return;
        mobileMenuBtn.hidden = !isMobileLayout() || expanded;
        mobileMenuBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
    }

    function setMobileSheetState(state) {
        if (!mobileSheet || !sheetToggleBtn || !isMobileLayout()) return;
        const nextState = mobileSheetStates.includes(state) ? state : "collapsed";
        currentMobileSheetState = nextState;
        mobileSheet.dataset.sheetState = nextState;
        mobileSheet.classList.toggle("expanded", nextState !== "collapsed");
        sheetToggleBtn.setAttribute("aria-expanded", nextState === "full" ? "true" : "false");
        sheetToggleBtn.textContent = nextState === "collapsed" ? "Listeyi Aç" : "Haritayı Göster";
        updateMobileMenuButton(nextState !== "collapsed");
        window.setTimeout(() => map.invalidateSize(), 220);
    }

    function shiftMobileSheetState(direction) {
        const currentIndex = Math.max(0, mobileSheetStates.indexOf(currentMobileSheetState));
        const nextIndex = Math.min(mobileSheetStates.length - 1, Math.max(0, currentIndex + direction));
        setMobileSheetState(mobileSheetStates[nextIndex]);
    }

    function toggleMobileSheet() {
        if (!isMobileLayout()) return;
        setMobileSheetState(currentMobileSheetState === "collapsed" ? "half" : "collapsed");
    }

    function syncSheetForViewport() {
        if (!mobileSheet || !sheetToggleBtn) return;
        if (isMobileLayout()) {
            if (!mobileSheetStates.includes(currentMobileSheetState)) {
                currentMobileSheetState = "collapsed";
            }
            setMobileSheetState(currentMobileSheetState);
        } else {
            mobileSheet.classList.remove("expanded");
            delete mobileSheet.dataset.sheetState;
            sheetToggleBtn.setAttribute("aria-expanded", "false");
            sheetToggleBtn.textContent = "Listeyi Aç";
            panelSections.forEach((section) => section.classList.add("active"));
            updateMobileMenuButton(false);
        }
        window.setTimeout(() => map.invalidateSize(), 120);
    }

    function setActiveTab(tabName) {
        activeMobileTab = tabName;
        panelSections.forEach((section) => {
            const isMatch = section.dataset.panel === tabName;
            if (isMobileLayout()) {
                section.classList.toggle("active", isMatch);
            } else {
                section.classList.add("active");
            }
        });
        tabButtons.forEach((button) => {
            const isActive = button.dataset.tab === tabName;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-selected", isActive ? "true" : "false");
        });
    }

    function normalizeCheckedAt(value) {
        const numeric = Number(value || 0);
        if (!numeric) return 0;
        return numeric < 1000000000000 ? numeric * 1000 : numeric;
    }

    function normalizeProbe(entry, fallbackStatus, fallbackReason) {
        return {
            status: entry?.status || fallbackStatus,
            reason: entry?.reason || fallbackReason,
            checkedAt: normalizeCheckedAt(entry?.checkedAt)
        };
    }

    function normalizePreview(entry) {
        return {
            status: entry?.status || "unavailable",
            url: entry?.url || "",
            updatedAt: normalizeCheckedAt(entry?.updatedAt),
            stale: Boolean(entry?.stale),
            reason: entry?.reason || "Önizleme kullanılamıyor."
        };
    }

    function getHealth(camera) {
        return healthByCamera.get(String(camera.CameraNo)) || null;
    }

    function getPreviewHealth(camera) {
        const health = getHealth(camera);
        return health?.preview || {
            status: "unavailable",
            url: "",
            updatedAt: 0,
            stale: false,
            reason: "Önizleme henüz hazır değil."
        };
    }

    function getStreamHealth(camera) {
        const health = getHealth(camera);
        const hasStream = Boolean(health?.hasStream ?? getPreferredStreamUrl(camera));
        return health?.stream || {
            status: hasStream ? (health?.status === "checking" ? "checking" : "unknown") : "unavailable",
            reason: hasStream ? "Canlı yayın doğrulanmayı bekliyor." : "Canlı yayın bağlantısı yok.",
            checkedAt: normalizeCheckedAt(health?.checkedAt)
        };
    }

    function getSnapshotHealth(camera) {
        const health = getHealth(camera);
        const hasSnapshot = Boolean(health?.hasSnapshot ?? camera.CameraCaptureImage);
        return health?.snapshot || {
            status: hasSnapshot ? (health?.status === "checking" ? "checking" : "unknown") : "unavailable",
            reason: hasSnapshot ? "Son görüntü doğrulanmayı bekliyor." : "Son görüntü bağlantısı yok.",
            checkedAt: normalizeCheckedAt(health?.checkedAt)
        };
    }

    function getSafePreviewUrl(camera) {
        const preview = getPreviewHealth(camera);
        if ((preview.status === "ready" || preview.status === "stale") && preview.url) {
            return preview.url;
        }
        return getSnapshotHealth(camera).status === "online" ? (camera.CameraCaptureImage || "") : "";
    }

    function formatPreviewAge(updatedAt) {
        const diffMinutes = Math.max(1, Math.round((Date.now() - updatedAt) / 60000));
        if (diffMinutes < 60) return `${diffMinutes} dk önce`;

        const diffHours = Math.round(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours} sa önce`;

        const diffDays = Math.round(diffHours / 24);
        return `${diffDays} gün önce`;
    }

    function getPreviewAgeLabel(camera) {
        const preview = getPreviewHealth(camera);
        if (!preview.stale || !preview.updatedAt) return "";
        return formatPreviewAge(preview.updatedAt);
    }

    function getMediaSummary(camera) {
        const stream = getStreamHealth(camera);
        const snapshot = getSnapshotHealth(camera);

        if (stream.status === "online") return "Canlı yayın hazır";
        if (snapshot.status === "online") return "Son görüntü hazır";
        if (stream.status === "checking" || snapshot.status === "checking") return "Görüntü kontrol ediliyor";
        return "Doğrulanmış görüntü yok";
    }

    function getBadgeLabel(presentation) {
        if (!isCompactMobile()) return presentation.label;

        if (presentation.className === "online") return "Canlı";
        if (presentation.className === "image-only") return "Son görüntü";
        if (presentation.className === "checking") return "Kontrol";
        return "Kapalı";
    }

    function getPopularMeta(camera, presentation) {
        const openCount = Number(camera.openCount || 0);
        if (isCompactMobile()) return `${openCount} açılış`;
        return `${openCount} açılış - ${presentation.label}`;
    }

    function getPresentation(camera) {
        const health = getHealth(camera);
        const streamUrl = getPreferredStreamUrl(camera);
        if (health?.status === "online") {
            return { label: "Canlı yayın", className: "online", color: "#16a34a", note: health.reason || "Canlı yayın erişilebilir." };
        }
        if (health?.status === "image_only") {
            return {
                label: streamUrl ? "Son görüntü var" : "Fotoğraf var",
                className: "image-only",
                color: "#d97706",
                note: health?.reason || "Canlı yayın yok, son görüntü gösterilebilir."
            };
        }
        if (health?.status === "checking" || (!health && camera.IsActive === "true")) {
            return { label: "Kontrol ediliyor", className: "checking", color: "#f59e0b", note: health?.reason || "Durum kontrol ediliyor." };
        }
        return {
            label: camera.IsActive === "true" ? "Kapalı / erişilemiyor" : (camera.State || "Kapalı"),
            className: "offline",
            color: "#dc2626",
            note: health?.reason || "Şu anda görüntü alınamıyor."
        };
    }

    function createMarkerIcon(camera) {
        const presentation = getPresentation(camera);
        return L.divIcon({
            className: "camera-pin",
            html: `<span class="camera-pin-dot" style="background:${presentation.color}"></span>`,
            iconSize: [18, 18],
            iconAnchor: [9, 9],
            popupAnchor: [0, -10]
        });
    }

    function applyHealth(payload) {
        Object.entries(payload || {}).forEach(([cameraNo, entry]) => {
            const hasStream = Object.prototype.hasOwnProperty.call(entry || {}, "hasStream")
                ? Boolean(entry?.hasStream)
                : null;
            const hasSnapshot = Object.prototype.hasOwnProperty.call(entry || {}, "hasSnapshot")
                ? Boolean(entry?.hasSnapshot)
                : null;
            healthByCamera.set(String(cameraNo), {
                status: entry?.status || "offline",
                reason: entry?.reason || "Durum bilgisi alınamadı.",
                checkedAt: normalizeCheckedAt(entry?.checkedAt),
                hasStream,
                hasSnapshot,
                stream: normalizeProbe(
                    entry?.stream,
                    hasStream ? "offline" : "unavailable",
                    hasStream ? "Canlı yayın doğrulanamadı." : "Canlı yayın bağlantısı yok."
                ),
                snapshot: normalizeProbe(
                    entry?.snapshot,
                    hasSnapshot ? "offline" : "unavailable",
                    hasSnapshot ? "Son görüntü doğrulanamadı." : "Son görüntü bağlantısı yok."
                ),
                preview: normalizePreview(entry?.preview)
            });
        });
    }

    function updateSummary(cameras) {
        let online = 0;
        let imageOnly = 0;
        let offline = 0;

        cameras.forEach((camera) => {
            const state = getPresentation(camera).className;
            if (state === "online") online += 1;
            else if (state === "image-only") imageOnly += 1;
            else if (state === "offline") offline += 1;
        });

        document.getElementById("statTotal").textContent = cameras.length;
        document.getElementById("statLive").textContent = online;
        document.getElementById("statImageOnly").textContent = imageOnly;
        document.getElementById("statOffline").textContent = offline;

        const checking = cameras.length - online - imageOnly - offline;
        healthSummaryEl.textContent = checking > 0
            ? (isMobileLayout() ? `${checking} kamera kontrol ediliyor.` : `${checking} kamera hâlâ kontrol ediliyor.`)
            : (isMobileLayout()
                ? `${online} canlı, ${imageOnly} son görüntü, ${offline} kapalı.`
                : `${online} canlı yayın açık, ${imageOnly} kamerada yalnızca son görüntü var, ${offline} kamera kapalı görünüyor.`);
    }

    function filteredCameras() {
        if (!searchQuery) return allCameras;
        return allCameras.filter((camera) => {
            const text = [camera.CameraName, camera.CameraNo]
                .filter(Boolean)
                .join(" ")
                .toLocaleLowerCase("tr");
            return text.includes(searchQuery);
        });
    }

    function renderMarkers(cameras) {
        markers.clearLayers();
        const bounds = [];

        cameras.forEach((camera) => {
            const lat = parseFloat(camera.YCoord);
            const lng = parseFloat(camera.XCoord);
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

            const presentation = getPresentation(camera);
            const marker = L.marker([lat, lng], { icon: createMarkerIcon(camera), title: camera.CameraName || "Kamera" });
            let hoverPopupTimeoutId = 0;
            marker.bindPopup(`
                <div class="popup-card">
                    <strong>${esc(camera.CameraName)}</strong>
                    ${getPreviewMarkup(camera, "popup-img", "Önizleme yok")}
                    <div class="popup-meta">
                        <span class="status-badge ${presentation.className}">${esc(presentation.label)}</span>
                        <span class="camera-meta">${esc(getMediaSummary(camera))}</span>
                    </div>
                    <p>${esc(presentation.note)}</p>
                    <button class="popup-btn" onclick="window.openCameraModal('${esc(String(camera.CameraNo))}')">Görüntüyü Aç</button>
                </div>
            `);
            marker.on("mouseover", () => {
                if (isMobileLayout() || hoverPopupTimeoutId || marker.isPopupOpen()) return;
                hoverPopupTimeoutId = window.setTimeout(() => {
                    hoverPopupTimeoutId = 0;
                    if (modal.classList.contains("show")) return;
                    marker.openPopup();
                }, markerHoverPopupDelay);
            });
            marker.on("mouseout", () => {
                if (!hoverPopupTimeoutId) return;
                window.clearTimeout(hoverPopupTimeoutId);
                hoverPopupTimeoutId = 0;
            });
            marker.on("popupclose", () => {
                if (!hoverPopupTimeoutId) return;
                window.clearTimeout(hoverPopupTimeoutId);
                hoverPopupTimeoutId = 0;
            });
            marker.on("click", () => {
                if (isMobileLayout()) {
                    marker.openPopup();
                    setMobileSheetState("collapsed");
                    return;
                }
                window.openCameraModal(camera.CameraNo);
            });
            markers.addLayer(marker);
            bounds.push([lat, lng]);
        });

        if (!hasFitToMarkers && bounds.length) {
            hasFitToMarkers = true;
            window.setTimeout(() => {
                map.fitBounds(bounds, {
                    padding: isMobileLayout() ? [24, 24] : [36, 36],
                    maxZoom: 14
                });
            }, 80);
        }
    }

    function getPreviewMarkup(camera, className, emptyLabel = "Önizleme yok") {
        const previewUrl = getSafePreviewUrl(camera);
        const staleLabel = previewUrl ? getPreviewAgeLabel(camera) : "";
        if (previewUrl) {
            return `
                <div class="preview-shell">
                    <img class="${className}" src="${esc(previewUrl)}" alt="${esc(camera.CameraName)}" loading="lazy">
                    ${staleLabel ? `<span class="preview-age">${esc(staleLabel)}</span>` : ""}
                </div>
            `;
        }
        return `
            <div class="preview-shell">
                <div class="${className} preview-placeholder" aria-hidden="true"><span>${esc(emptyLabel)}</span></div>
            </div>
        `;
    }

    function getVisibleListLimit(totalCount, reset) {
        const initialCount = isMobileLayout() ? mobileListInitialCount : desktopListCount;
        if (reset || renderedCameraCount === 0) {
            renderedCameraCount = Math.min(totalCount, initialCount);
        } else {
            renderedCameraCount = Math.min(totalCount, Math.max(renderedCameraCount, initialCount));
        }
        return renderedCameraCount;
    }

    function getListSignature(cameras) {
        return `${isMobileLayout() ? "mobile" : "desktop"}:${cameras.map((camera) => camera.CameraNo).join(",")}`;
    }

    function queuePreviewTouch(cameraNos) {
        const items = Array.isArray(cameraNos) ? cameraNos : [cameraNos];
        items.forEach((cameraNo) => {
            const camera = cameraByNo.get(String(cameraNo));
            if (!camera || !getPreferredStreamUrl(camera)) return;
            queuedPreviewCameraNos.add(String(camera.CameraNo));
        });

        schedulePreviewTouchFlush();
    }

    function schedulePreviewTouchFlush(delay = 10000) {
        if (!previewTouchEnabled || !queuedPreviewCameraNos.size || previewTouchTimeoutId) return;
        previewTouchTimeoutId = window.setTimeout(() => {
            flushPreviewTouchQueue();
        }, delay);
    }

    async function flushPreviewTouchQueue() {
        if (previewTouchTimeoutId) {
            window.clearTimeout(previewTouchTimeoutId);
            previewTouchTimeoutId = 0;
        }

        const queued = Array.from(queuedPreviewCameraNos);
        queuedPreviewCameraNos.clear();
        if (!queued.length) return;

        for (let index = 0; index < queued.length; index += 50) {
            const chunk = queued.slice(index, index + 50);
            try {
                const response = await fetch("/api/previews/touch", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ cameraNos: chunk })
                });
                if (!response.ok) {
                    chunk.forEach((cameraNo) => queuedPreviewCameraNos.add(cameraNo));
                }
            } catch {
                chunk.forEach((cameraNo) => queuedPreviewCameraNos.add(cameraNo));
            }
        }

        schedulePreviewTouchFlush();
    }

    function renderCameraList(cameras, options = {}) {
        const { reset = false, preserveScroll = false } = options;
        const previousScrollTop = preserveScroll ? cameraListEl.scrollTop : 0;
        cameraListEl.innerHTML = "";
        listCountEl.textContent = String(cameras.length);

        if (!cameras.length) {
            cameraListEl.innerHTML = '<div class="empty-card">Aramaya uygun kamera bulunamadı.</div>';
            return;
        }

        const visibleLimit = getVisibleListLimit(cameras.length, reset);
        const desktopCap = isMobileLayout() ? cameras.length : desktopListCount;
        const visibleItems = cameras.slice(0, Math.min(visibleLimit, desktopCap));
        const previewTouchLimit = isMobileLayout() ? mobilePreviewTouchCount : desktopPreviewTouchCount;
        queuePreviewTouch(visibleItems.slice(0, previewTouchLimit).map((camera) => camera.CameraNo));

        visibleItems.forEach((camera) => {
            const presentation = getPresentation(camera);
            const item = document.createElement("button");
            item.type = "button";
            item.className = "camera-card";
            item.innerHTML = `
                ${getPreviewMarkup(camera, "camera-thumb", "Görüntü yok")}
                <div class="camera-card-body">
                    <strong>${esc(camera.CameraName)}</strong>
                    <span class="camera-meta">${esc(getMediaSummary(camera))}</span>
                    <span class="status-badge ${presentation.className}">${esc(getBadgeLabel(presentation))}</span>
                </div>
            `;
            item.addEventListener("click", () => {
                const lat = parseFloat(camera.YCoord);
                const lng = parseFloat(camera.XCoord);
                if (Number.isFinite(lat) && Number.isFinite(lng)) {
                    map.flyTo([lat, lng], 16, { animate: true, duration: 1.2 });
                }
                if (isMobileLayout()) {
                    searchInput.blur();
                }
                window.openCameraModal(camera.CameraNo);
            });
            cameraListEl.appendChild(item);
        });

        if (cameras.length > visibleItems.length) {
            const more = document.createElement("div");
            more.className = "empty-card more-note";
            more.textContent = isMobileLayout()
                ? `Kaydırdıkça daha fazla kamera yüklenir. Gösterilen: ${visibleItems.length} / ${cameras.length}`
                : `Daha fazla sonuç için arama yapın. Gösterilen: ${visibleItems.length} / ${cameras.length}`;
            cameraListEl.appendChild(more);
        }

        if (preserveScroll) {
            cameraListEl.scrollTop = previousScrollTop;
        }
    }

    async function refreshPopular() {
        try {
            const res = await fetch("/api/popular-cameras?limit=6", { cache: "no-store" });
            if (!res.ok) throw new Error("popular");
            const data = await res.json();
            if (!Array.isArray(data) || !data.length) {
                popularListEl.innerHTML = '<div class="empty-card">Henüz açılan kamera verisi yok.</div>';
                return;
            }

            popularListEl.innerHTML = "";
            queuePreviewTouch(data.map((camera) => camera.CameraNo));
            data.forEach((camera, index) => {
                const presentation = getPresentation(camera);
                const card = document.createElement("button");
                card.type = "button";
                card.className = "popular-card";
                card.innerHTML = `
                    <span class="popular-rank">#${index + 1}</span>
                    ${getPreviewMarkup(camera, "popular-thumb", "Önizleme yok")}
                    <div class="popular-text">
                        <strong>${esc(camera.CameraName)}</strong>
                        <span>${esc(getPopularMeta(camera, presentation))}</span>
                    </div>
                `;
                card.addEventListener("click", () => {
                    if (isMobileLayout()) {
                        searchInput.blur();
                    }
                    window.openCameraModal(camera.CameraNo);
                });
                popularListEl.appendChild(card);
            });
        } catch {
            popularListEl.innerHTML = '<div class="empty-card">Popüler kamera verisi alınamadı.</div>';
        }
    }

    async function loadCameras() {
        const res = await fetch("/api/cameras");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        allCameras = (Array.isArray(data) ? data : []).filter((camera) => Number.isFinite(parseFloat(camera.XCoord)) && Number.isFinite(parseFloat(camera.YCoord)));
        cameraByNo.clear();
        allCameras.forEach((camera) => cameraByNo.set(String(camera.CameraNo), camera));
    }

    async function refreshHealth() {
        try {
            const res = await fetch("/api/health", { cache: "no-store" });
            if (!res.ok) return;
            applyHealth(await res.json());
            render();
        } catch {
            // keep last known state
        }
    }

    function render() {
        const filtered = filteredCameras();
        const nextListSignature = getListSignature(filtered);
        const shouldResetList = nextListSignature !== currentListSignature;
        currentListSignature = nextListSignature;
        currentFilteredCameras = filtered;
        updateSummary(allCameras);
        renderMarkers(filtered);
        renderCameraList(filtered, { reset: shouldResetList, preserveScroll: !shouldResetList });
    }

    function getPreferredStreamUrl(camera) {
        return camera.WowzaStreamSSL || camera.WowzaStream || "";
    }

    function fillModal(camera) {
        modalTitle.textContent = camera.CameraName || "Kamera";
    }

    function clearPlaybackTimeout() {
        if (!playbackTimeoutId) return;
        window.clearTimeout(playbackTimeoutId);
        playbackTimeoutId = 0;
    }

    function addVideoListener(type, handler, options) {
        liveVideo.addEventListener(type, handler, options);
        videoEventListeners.push({ type, handler, options });
    }

    function clearPlaybackListeners() {
        while (videoEventListeners.length) {
            const listener = videoEventListeners.pop();
            liveVideo.removeEventListener(listener.type, listener.handler, listener.options);
        }
        while (hlsEventListeners.length) {
            const listener = hlsEventListeners.pop();
            listener.instance.off(listener.type, listener.handler);
        }
    }

    function addHlsListener(instance, type, handler) {
        instance.on(type, handler);
        hlsEventListeners.push({ instance, type, handler });
    }

    function destroyLivePlayer() {
        clearPlaybackTimeout();
        playbackAttemptToken += 1;
        clearPlaybackListeners();
        if (currentHls) {
            currentHls.destroy();
            currentHls = null;
        }
        liveVideo.pause();
        liveVideo.hidden = true;
        liveVideo.autoplay = false;
        liveVideo.removeAttribute("autoplay");
        liveVideo.removeAttribute("src");
        liveVideo.srcObject = null;
        liveVideo.load();
        liveVideo.poster = "";
        fallbackImage.hidden = true;
        fallbackImage.removeAttribute("src");
        playerEmpty.hidden = true;
        playerWrapper.classList.add("image-only");
    }

    function showUnavailable(note = "Bu kamera için doğrulanmış görüntü yok") {
        destroyLivePlayer();
        playerEmpty.hidden = false;
        playerEmpty.textContent = note;
        playerStatus.textContent = "Görüntü kullanılamıyor";
    }

    function showFallback(imageSource, note = "Son görüntü gösteriliyor") {
        if (!imageSource) {
            showUnavailable(note);
            return;
        }
        destroyLivePlayer();
        playerEmpty.hidden = true;
        fallbackImage.hidden = false;
        fallbackImage.src = imageSource;
        playerStatus.textContent = note;
    }

    async function startLivePlayback(camera, options = {}) {
        const { forceLiveCheck = false } = options;
        const streamUrl = getPreferredStreamUrl(camera);
        const previewUrl = getSafePreviewUrl(camera);
        const stream = getStreamHealth(camera);

        if (!streamUrl) {
            if (previewUrl) {
                showFallback(previewUrl, "Bu kamerada canlı yayın yok, son görüntü gösteriliyor");
                fillModal(camera, { isLive: false, note: "Bu kamera için yalnızca doğrulanmış son görüntü mevcut." });
            } else {
                showUnavailable("Bu kamerada canlı yayın bağlantısı ve doğrulanmış son görüntü yok.");
                fillModal(camera, { isLive: false, note: "Bu kamera için doğrulanmış görüntü bulunamadı." });
            }
            return;
        }

        if (!forceLiveCheck && stream.status === "offline") {
            if (previewUrl) {
                showFallback(previewUrl, "Canlı yayın şu anda kapalı, son görüntü gösteriliyor");
            } else {
                showUnavailable("Canlı yayın şu anda kapalı ve son görüntü de alınamıyor.");
            }
            fillModal(camera, { isLive: false, note: "Sunucu kontrolü canlı yayının şu anda kapalı olduğunu gösteriyor." });
            return;
        }

        destroyLivePlayer();
        playerEmpty.hidden = true;
        liveVideo.hidden = false;
        liveVideo.poster = previewUrl;
        liveVideo.muted = true;
        liveVideo.autoplay = true;
        playerWrapper.classList.remove("image-only");
        playerStatus.textContent = "Canlı yayın yükleniyor...";
        const attemptToken = playbackAttemptToken;
        let playbackReady = false;
        let playbackStarting = false;

        const onVideoError = (note = "Canlı yayın şu anda açılamadı.") => {
            if (attemptToken !== playbackAttemptToken || playbackReady) return;
            playbackReady = true;
            playbackStarting = false;
            clearPlaybackTimeout();
            if (previewUrl) {
                showFallback(previewUrl, "Canlı yayın açılamadı, son görüntü gösteriliyor");
            } else {
                showUnavailable("Canlı yayın açılamadı ve doğrulanmış son görüntü yok.");
            }
            fillModal(camera, { isLive: false, note });
        };

        const onVideoReady = async () => {
            if (attemptToken !== playbackAttemptToken || playbackReady || playbackStarting) return;
            playbackStarting = true;
            clearPlaybackTimeout();
            playerEmpty.hidden = true;
            try {
                await liveVideo.play();
            } catch {
                playbackStarting = false;
                onVideoError("Tarayıcı canlı yayını otomatik başlatamadı.");
                return;
            }
            if (attemptToken !== playbackAttemptToken || playbackReady) return;
            playbackReady = true;
            playbackStarting = false;
            playerStatus.textContent = "Canlı yayın";
            fillModal(camera, { isLive: true, note: "Canlı yayın açıldı." });
        };

        addVideoListener("error", () => onVideoError("Tarayıcı canlı yayını açamadı."));
        addVideoListener("loadedmetadata", onVideoReady);
        addVideoListener("canplay", onVideoReady);
        playbackTimeoutId = window.setTimeout(() => {
            onVideoError("Canlı yayın zamanında yüklenmedi.");
        }, 10000);

        try {
            if (liveVideo.canPlayType("application/vnd.apple.mpegurl")) {
                liveVideo.src = streamUrl;
                liveVideo.load();
            } else if (window.Hls?.isSupported()) {
                currentHls = new window.Hls({ enableWorker: true, lowLatencyMode: true });
                currentHls.loadSource(streamUrl);
                currentHls.attachMedia(liveVideo);
                addHlsListener(currentHls, window.Hls.Events.MANIFEST_PARSED, onVideoReady);
                addHlsListener(currentHls, window.Hls.Events.ERROR, (_, data) => {
                    if (data?.fatal) onVideoError("HLS akışı alınamadı.");
                });
            } else {
                onVideoError("Bu tarayıcı canlı yayın formatını desteklemiyor.");
                return;
            }
        } catch {
            onVideoError("Canlı yayın başlatılırken beklenmeyen bir hata oluştu.");
        }
    }

    function closeModal() {
        modal.classList.remove("show");
        currentModalCameraNo = null;
        destroyLivePlayer();
        modalContent.style.transform = "";
        modalContent.style.transition = "";
        playerStatus.textContent = "Son görüntü gösteriliyor";
        updateMobileMenuButton(currentMobileSheetState !== "collapsed");
        if (isMobileLayout()) {
            setMobileSheetState(currentMobileSheetState);
        }
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.openCameraModal = async (cameraNo) => {
        const camera = cameraByNo.get(String(cameraNo));
        if (!camera) return;

        currentModalCameraNo = String(cameraNo);
        fillModal(camera);
        map.closePopup();
        if (searchDebounceId) {
            window.clearTimeout(searchDebounceId);
            searchDebounceId = 0;
        }
        searchInput.blur();
        modal.classList.add("show");
        modalContent.style.transform = "";
        modalContent.style.transition = "";
        window.history.replaceState(null, "", `#camera=${encodeURIComponent(cameraNo)}`);
        queuePreviewTouch([cameraNo]);

        fetch(`/api/camera-open/${encodeURIComponent(cameraNo)}`, { method: "POST" })
            .then(() => refreshPopular())
            .catch(() => {});

        await startLivePlayback(camera);
    };

    function handleHashCamera() {
        const match = window.location.hash.match(/^#camera=(.+)$/);
        if (!match) return;
        const cameraNo = decodeURIComponent(match[1]);
        const camera = cameraByNo.get(String(cameraNo));
        if (!camera) return;
        const lat = parseFloat(camera.YCoord);
        const lng = parseFloat(camera.XCoord);
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
            map.flyTo([lat, lng], 16, { animate: true, duration: 1.2 });
        }
        window.setTimeout(() => window.openCameraModal(cameraNo), 250);
    }

    function sendAnalyticsBeacon() {
        if (analyticsSent) return;
        analyticsSent = true;
        const payload = JSON.stringify({ referrer: document.referrer });

        try {
            if (navigator.sendBeacon) {
                const accepted = navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
                if (accepted) return;
            }
        } catch {
            // fall through to fetch
        }

        fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true
        }).catch(() => {});
    }

    function restoreRadarLayerVisibility() {
        if (!shouldRestoreRadarVisibility) return;
        shouldRestoreRadarVisibility = false;
        radarVisible = true;
        syncRadarLayer();
    }

    function schedulePostInitialWork() {
        scheduleDeferredTask(() => {
            previewTouchEnabled = true;
            schedulePreviewTouchFlush(1200);
            refreshHealth();
            refreshPopular();
            restoreRadarLayerVisibility();
            handleHashCamera();
            sendAnalyticsBeacon();
            window.setInterval(refreshHealth, 30000);
            window.setInterval(refreshPopular, 60000);
        }, 0);
    }

    searchInput.addEventListener("focus", () => {
        if (isMobileLayout()) {
            setActiveTab("list");
            setMobileSheetState("full");
        }
    });

    function applySearchQuery(value) {
        searchQuery = String(value || "").toLocaleLowerCase("tr").trim();
        if (isMobileLayout()) {
            setActiveTab("list");
            setMobileSheetState("full");
            hasFitToMarkers = false;
        }
        render();
    }

    searchInput.addEventListener("input", (event) => {
        const nextValue = event.target.value || "";
        if (!isMobileLayout()) {
            applySearchQuery(nextValue);
            return;
        }

        if (searchDebounceId) {
            window.clearTimeout(searchDebounceId);
        }
        searchDebounceId = window.setTimeout(() => {
            searchDebounceId = 0;
            applySearchQuery(nextValue);
        }, mobileSearchDebounceDelay);
    });

    sheetToggleBtn.addEventListener("click", () => {
        toggleMobileSheet();
    });

    mobileMenuBtn?.addEventListener("click", () => {
        setMobileSheetState("half");
    });

    popularTabBtn.addEventListener("click", () => {
        setActiveTab("popular");
        if (isMobileLayout()) setMobileSheetState("half");
    });

    listTabBtn.addEventListener("click", () => {
        setActiveTab("list");
        if (isMobileLayout()) setMobileSheetState("full");
    });

    const startSheetDrag = (clientY) => {
        dragStartY = clientY;
        dragDeltaY = 0;
    };
    const moveSheetDrag = (clientY) => {
        dragDeltaY = clientY - dragStartY;
    };
    const endSheetDrag = () => {
        if (Math.abs(dragDeltaY) < 28) {
            dragStartY = 0;
            dragDeltaY = 0;
            return;
        }
        if (dragDeltaY < 0) shiftMobileSheetState(1);
        if (dragDeltaY > 0) shiftMobileSheetState(-1);
        dragStartY = 0;
        dragDeltaY = 0;
    };

    function bindSheetDrag(element, options = {}) {
        if (!element) return;
        const { ignoreInteractive = false } = options;

        element.addEventListener("touchstart", (event) => {
            if (!isMobileLayout()) return;
            if (ignoreInteractive && event.target.closest("button, input, label")) return;
            startSheetDrag(event.touches[0].clientY);
        }, { passive: true });
        element.addEventListener("touchmove", (event) => {
            if (!dragStartY) return;
            moveSheetDrag(event.touches[0].clientY);
        }, { passive: true });
        element.addEventListener("touchend", endSheetDrag);
        element.addEventListener("touchcancel", endSheetDrag);
        element.addEventListener("pointerdown", (event) => {
            if (!isMobileLayout()) return;
            if (ignoreInteractive && event.target.closest("button, input, label")) return;
            startSheetDrag(event.clientY);
        });
        element.addEventListener("pointermove", (event) => {
            if (!dragStartY) return;
            moveSheetDrag(event.clientY);
        });
        element.addEventListener("pointerup", endSheetDrag);
        element.addEventListener("pointercancel", endSheetDrag);
    }

    bindSheetDrag(sheetGrab);
    bindSheetDrag(sheetHeader, { ignoreInteractive: true });

    function startModalDrag(clientY) {
        modalDragStartY = clientY;
        modalDragDeltaY = 0;
        modalContent.style.transition = "none";
    }

    function moveModalDrag(clientY) {
        modalDragDeltaY = Math.max(0, clientY - modalDragStartY);
        modalContent.style.transform = `translateY(${modalDragDeltaY}px)`;
    }

    function endModalDrag() {
        if (!modalDragStartY) return;
        const shouldClose = modalDragDeltaY > 90;
        modalDragStartY = 0;
        modalDragDeltaY = 0;
        modalContent.style.transition = "transform 0.18s ease";

        if (shouldClose) {
            modalContent.style.transform = "translateY(100%)";
            window.setTimeout(() => {
                modalContent.style.transform = "";
                modalContent.style.transition = "";
                closeModal();
            }, 180);
            return;
        }

        modalContent.style.transform = "";
        window.setTimeout(() => {
            modalContent.style.transition = "";
        }, 180);
    }

    modalHeader?.addEventListener("touchstart", (event) => {
        if (!isMobileLayout() || !modal.classList.contains("show")) return;
        if (event.target.closest("button")) return;
        startModalDrag(event.touches[0].clientY);
    }, { passive: true });
    modalHeader?.addEventListener("touchmove", (event) => {
        if (!modalDragStartY) return;
        moveModalDrag(event.touches[0].clientY);
    }, { passive: true });
    modalHeader?.addEventListener("touchend", endModalDrag);
    modalHeader?.addEventListener("touchcancel", endModalDrag);
    modalHeader?.addEventListener("pointerdown", (event) => {
        if (!isMobileLayout() || !modal.classList.contains("show")) return;
        if (event.target.closest("button")) return;
        startModalDrag(event.clientY);
    });
    modalHeader?.addEventListener("pointermove", (event) => {
        if (!modalDragStartY) return;
        moveModalDrag(event.clientY);
    });
    modalHeader?.addEventListener("pointerup", endModalDrag);
    modalHeader?.addEventListener("pointercancel", endModalDrag);

    cameraListEl.addEventListener("scroll", () => {
        if (!isMobileLayout()) return;
        if (renderedCameraCount >= currentFilteredCameras.length) return;
        if (cameraListEl.scrollTop + cameraListEl.clientHeight < cameraListEl.scrollHeight - 120) return;
        renderedCameraCount = Math.min(currentFilteredCameras.length, renderedCameraCount + mobileListIncrement);
        renderCameraList(currentFilteredCameras, { preserveScroll: true });
    });

    refreshPopularBtn.addEventListener("click", refreshPopular);
    retryStreamBtn.addEventListener("click", () => {
        if (!currentModalCameraNo) return;
        const camera = cameraByNo.get(String(currentModalCameraNo));
        if (!camera) return;
        startLivePlayback(camera, { forceLiveCheck: true });
    });
    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("show")) closeModal();
    });
    window.addEventListener("hashchange", handleHashCamera);
    window.addEventListener("resize", syncSheetForViewport);

    setActiveTab(activeMobileTab);

    try {
        await loadCameras();
        render();
        syncSheetForViewport();
        schedulePostInitialWork();
    } catch (error) {
        healthSummaryEl.textContent = `Kamera verileri yüklenemedi: ${error.message}`;
        cameraListEl.innerHTML = '<div class="empty-card">Uygulama veriye erişemedi.</div>';
    }

    window.setTimeout(() => map.invalidateSize(), 120);
});
