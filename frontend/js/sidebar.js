/**
 * Sidebar: virtual list, search, filter, sort, health summary.
 * Virtual list renders only visible items using fixed item height + scroll offset,
 * so all 1500+ cameras can be listed without DOM overhead.
 */

import { open as openModal } from "./modal.js";
import { flyTo } from "./map.js";

const ITEM_H = 88;  // px — must match CSS .camera-item height
const BUFFER = 5;   // extra items to render above/below viewport

let _allCameras = [];
let _filtered   = [];
let _healthMap  = {};
let _currentFilter = "all";
let _searchQuery   = "";
let _sortBy        = "name";
let _renderQueued  = false;

const _listEl         = document.getElementById("cameraList");
const _searchInput    = document.getElementById("searchInput");
const _healthSummary  = document.getElementById("healthSummary");
const _sortSelect     = document.getElementById("sortSelect");

// Virtual list spacer elements
const _topSpacer    = document.createElement("div");
const _bottomSpacer = document.createElement("div");
_listEl.appendChild(_topSpacer);
_listEl.appendChild(_bottomSpacer);

export function init(cameras) {
    _allCameras = cameras;

    _searchInput.addEventListener("input", (e) => {
        _searchQuery = e.target.value.toLowerCase();
        _listEl.scrollTop = 0;
        _scheduleRender();
    });

    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
            _currentFilter = e.currentTarget.dataset.status;
            _listEl.scrollTop = 0;
            _scheduleRender();
        });
    });

    _sortSelect.addEventListener("change", (e) => {
        _sortBy = e.target.value;
        _listEl.scrollTop = 0;
        _scheduleRender();
    });

    _listEl.addEventListener("scroll", _scheduleRender);

    _scheduleRender();
}

export function updateHealth(healthMap) {
    _healthMap = healthMap;
    _scheduleRender();
}

function _scheduleRender() {
    if (_renderQueued) return;
    _renderQueued = true;
    requestAnimationFrame(() => {
        _renderQueued = false;
        _applyFilters();
    });
}

function _applyFilters() {
    let filtered = _allCameras;

    if (_currentFilter !== "all") {
        filtered = filtered.filter((cam) => _getStatus(cam) === _currentFilter);
    }

    if (_searchQuery) {
        filtered = filtered.filter((cam) => {
            const text = [cam.CameraName, cam.CameraBrand, cam.CameraModel, cam.State]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            return text.includes(_searchQuery);
        });
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
        if (_sortBy === "name") {
            return a.CameraName.localeCompare(b.CameraName, "tr");
        }
        const ORDER_ONLINE  = { online: 0, checking: 1, offline: 2 };
        const ORDER_OFFLINE = { offline: 0, checking: 1, online: 2 };
        const order = _sortBy === "online" ? ORDER_ONLINE : ORDER_OFFLINE;
        return (order[_getStatus(a)] ?? 3) - (order[_getStatus(b)] ?? 3);
    });

    _filtered = filtered;
    _updateCounts();
    _updateHealthSummary();
    _renderWindow();
}

function _renderWindow() {
    const scrollTop = _listEl.scrollTop;
    const viewH     = _listEl.clientHeight || 400;
    const total     = _filtered.length;

    const firstIdx = Math.max(0, Math.floor(scrollTop / ITEM_H) - BUFFER);
    const lastIdx  = Math.min(total - 1, Math.ceil((scrollTop + viewH) / ITEM_H) + BUFFER);

    _topSpacer.style.height    = `${firstIdx * ITEM_H}px`;
    _bottomSpacer.style.height = `${Math.max(0, (total - 1 - lastIdx)) * ITEM_H}px`;

    // Remove previously rendered items (between spacers)
    while (_topSpacer.nextSibling && _topSpacer.nextSibling !== _bottomSpacer) {
        _listEl.removeChild(_topSpacer.nextSibling);
    }

    if (total === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = "Kamera bulunamadı...";
        _listEl.insertBefore(empty, _bottomSpacer);
        return;
    }

    const fragment = document.createDocumentFragment();
    for (let i = firstIdx; i <= lastIdx && i < total; i++) {
        fragment.appendChild(_createItem(_filtered[i]));
    }
    _listEl.insertBefore(fragment, _bottomSpacer);
}

function _createItem(camera) {
    const status   = _getStatus(camera);
    const dotClass = status === "online" ? "active" : status === "checking" ? "checking" : "passive";
    const txtClass = status === "online" ? "online" : status === "checking" ? "checking" : "offline";
    const label    = status === "online" ? "Çalışıyor" : status === "checking" ? "Kontrol ediliyor" : "Kapalı";
    const health   = _healthMap[String(camera.CameraNo)];
    const reason   = health ? health.reason : "";

    const item = document.createElement("div");
    item.className = "camera-item";
    item.setAttribute("role", "listitem");
    item.style.cssText = `height:${ITEM_H}px;box-sizing:border-box;`;

    item.innerHTML = `
        <div class="camera-thumb" style="background-image:url('${camera.CameraCaptureImage || ""}')">
            <div class="status-dot ${dotClass}" title="${_esc(reason)}"></div>
        </div>
        <div class="camera-info">
            <div class="camera-name" title="${_esc(camera.CameraName)}">${_esc(camera.CameraName)}</div>
            <div class="camera-meta">
                <div class="meta-row">
                    <span style="color:var(--text-primary)">No:</span> ${_esc(camera.CameraNo)}
                </div>
                <div class="meta-row">
                    <span>Durum:</span>
                    <span class="status-text ${txtClass}" title="${_esc(reason)}">${label}</span>
                </div>
                <div class="meta-row">
                    <span>Res:</span> ${_esc(camera.Resolution) || "N/A"}
                </div>
            </div>
        </div>
    `;

    item.addEventListener("click", () => {
        flyTo(parseFloat(camera.YCoord), parseFloat(camera.XCoord));
        openModal(camera.CameraNo);
    });

    return item;
}

function _getStatus(camera) {
    const health = _healthMap[String(camera.CameraNo)];
    if (health) return health.status;
    return camera.IsActive === "true" ? "checking" : "offline";
}

function _updateCounts() {
    const counts = { all: _allCameras.length, online: 0, offline: 0, checking: 0 };
    _allCameras.forEach((cam) => {
        const s = _getStatus(cam);
        counts[s] = (counts[s] || 0) + 1;
    });
    document.getElementById("count-all").textContent    = counts.all;
    document.getElementById("count-active").textContent = counts.online;
    document.getElementById("count-passive").textContent = counts.offline;
}

function _updateHealthSummary() {
    const checking = _allCameras.filter((c) => _getStatus(c) === "checking").length;
    const runtimeOffline = _allCameras.filter((c) => {
        const h = _healthMap[String(c.CameraNo)];
        return h && h.status === "offline" && c.IsActive === "true";
    }).length;

    if (checking > 0) {
        _healthSummary.textContent = `${checking} kamera doğrulanıyor...`;
    } else if (runtimeOffline > 0) {
        _healthSummary.textContent =
            `${runtimeOffline} aktif görünen kamera erişilemiyor. Her 5 dakikada bir yenilenir.`;
    } else {
        _healthSummary.textContent = "Tüm aktif kameralar doğrulandı.";
    }
}

function _esc(str) {
    if (!str) return str || "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
