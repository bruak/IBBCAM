/**
 * Leaflet map module.
 * Exposes init(cameras), updateHealth(healthMap), renderFiltered(cameras), flyTo(lat,lng).
 */

import { open as openModal } from "./modal.js";

/* global L */

let _map = null;
let _markers = null;
let _cameras = [];
let _healthMap = {};

export function init(cameras) {
    _cameras = cameras;

    _map = L.map("map", { zoomControl: false }).setView([41.015, 28.979], 11);
    L.control.zoom({ position: "topright" }).addTo(_map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap &copy; CARTO",
        subdomains: "abcd",
        maxZoom: 20,
    }).addTo(_map);

    _markers = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
    });
    _map.addLayer(_markers);

    // Delegated click handler for popup "Görüntüle" buttons
    _map.getContainer().addEventListener("click", (e) => {
        const btn = e.target.closest("[data-camera-no]");
        if (btn) openModal(btn.dataset.cameraNo);
    });

    _renderMarkers(cameras);

    return _map;
}

export function updateHealth(healthMap) {
    _healthMap = healthMap;
    _renderMarkers(_cameras);
}

export function renderFiltered(cameras) {
    _cameras = cameras;
    _renderMarkers(cameras);
}

export function flyTo(lat, lng) {
    if (_map) _map.flyTo([lat, lng], 16, { animate: true, duration: 1.5 });
}

function _renderMarkers(cameras) {
    if (!_markers) return;
    _markers.clearLayers();

    const newMarkers = cameras.map((camera) => {
        const pres = _getPresentation(camera);
        const marker = L.marker(
            [parseFloat(camera.YCoord), parseFloat(camera.XCoord)],
            { icon: _createIcon(pres) }
        );

        const imgSrc = camera.CameraCaptureImage || "";
        marker.bindPopup(
            `<div class="popup-title">${_esc(camera.CameraName)}</div>
             ${imgSrc ? `<img src="${imgSrc}" class="popup-img" loading="lazy" alt="">` : ""}
             <div style="font-size:11px;color:#aaa">Model: ${_esc(camera.CameraModel) || "—"}</div>
             <div style="font-size:11px;color:#aaa">Durum: ${pres.label}</div>
             <button class="popup-btn" data-camera-no="${_esc(camera.CameraNo)}">Görüntüle</button>`,
            { minWidth: 220 }
        );

        return marker;
    });

    _markers.addLayers(newMarkers);
}

function _getPresentation(camera) {
    const health = _healthMap[String(camera.CameraNo)];
    const status = health ? health.status : (camera.IsActive === "true" ? "checking" : "offline");

    if (status === "online") {
        return { label: "Çalışıyor",        markerColor: "#10b981", shadowColor: "rgba(16,185,129,0.4)" };
    }
    if (status === "checking") {
        return { label: "Kontrol ediliyor", markerColor: "#f59e0b", shadowColor: "rgba(245,158,11,0.4)" };
    }
    return     { label: "Kapalı",           markerColor: "#ef4444", shadowColor: "rgba(239,68,68,0.4)" };
}

function _createIcon(pres) {
    return L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background:${pres.markerColor};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 10px ${pres.shadowColor}"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    });
}

function _esc(str) {
    if (!str) return str || "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
