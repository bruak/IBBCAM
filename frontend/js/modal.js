/**
 * Camera detail modal: HLS video player with typed error messages and snapshot fallback.
 * Exposes init(cameras), open(cameraNo), close(), updateHealth(healthMap).
 */

let _cameras = [];
let _healthMap = {};
let _hls = null;

const _modal        = document.getElementById("videoModal");
const _videoPlayer  = document.getElementById("videoPlayer");
const _fallbackImg  = document.getElementById("fallbackImage");
const _streamError  = document.getElementById("streamError");
const _modalTitle   = document.getElementById("modalTitle");
const _modalDetails = document.getElementById("modalDetails");

export function init(cameras) {
    _cameras = cameras;

    document.getElementById("closeModal").addEventListener("click", close);

    _modal.addEventListener("click", (e) => {
        if (e.target === _modal) close();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !_modal.hidden) close();
    });
}

export function updateHealth(healthMap) {
    _healthMap = healthMap;
}

export function open(cameraNo) {
    const camera = _cameras.find((c) => c.CameraNo === String(cameraNo));
    if (!camera) return;

    const health = _healthMap[String(cameraNo)] || { status: "checking", reason: "" };

    _modalTitle.textContent = camera.CameraName;
    _renderDetails(camera, health);

    // Reset player state
    _clearPlayer();

    const streamUrl =
        camera.WowzaStreamSSL ||
        (window.location.protocol === "http:" ? camera.WowzaStream : null);

    if (streamUrl && streamUrl.endsWith(".m3u8")) {
        _videoPlayer.style.display = "block";
        _startHls(streamUrl, camera.CameraCaptureImage);
    } else {
        _showFallback(camera.CameraCaptureImage);
    }

    _modal.hidden = false;
    _modal.classList.add("show");
    document.getElementById("closeModal").focus();
}

export function close() {
    _modal.hidden = true;
    _modal.classList.remove("show");
    _clearPlayer();
}

function _clearPlayer() {
    if (_hls) { _hls.destroy(); _hls = null; }
    _videoPlayer.removeAttribute("src");
    _videoPlayer.style.display = "none";
    _fallbackImg.hidden = true;
    _streamError.hidden = true;
}

function _startHls(streamUrl, fallbackSrc) {
    /* global Hls */
    if (typeof Hls !== "undefined" && Hls.isSupported()) {
        _hls = new Hls();
        _hls.loadSource(streamUrl);
        _hls.attachMedia(_videoPlayer);

        _hls.on(Hls.Events.MANIFEST_PARSED, () => {
            _videoPlayer.play().catch(() => {});
        });

        _hls.on(Hls.Events.ERROR, (_, data) => {
            if (!data.fatal) return;
            let msg = "Canlı yayın yüklenemedi — anlık görüntü gösteriliyor";
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                msg = "Ağ hatası veya CORS sorunu — anlık görüntü gösteriliyor";
            } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                msg = "Medya formatı desteklenmiyor — anlık görüntü gösteriliyor";
            }
            _showFallback(fallbackSrc, msg);
        });

    } else if (_videoPlayer.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS (Safari)
        _videoPlayer.src = streamUrl;
        _videoPlayer.play().catch(() => {});
    } else {
        _showFallback(fallbackSrc, "HLS desteği yok — anlık görüntü gösteriliyor");
    }
}

function _showFallback(src, errorMsg = null) {
    if (_hls) { _hls.destroy(); _hls = null; }
    _videoPlayer.style.display = "none";
    _fallbackImg.hidden = false;
    _fallbackImg.src = src || "";
    if (errorMsg) {
        _streamError.hidden = false;
        _streamError.textContent = errorMsg;
    }
}

function _renderDetails(camera, health) {
    const statusClass =
        health.status === "online" ? "online" :
        health.status === "checking" ? "checking" : "offline";
    const statusLabel =
        health.status === "online" ? "Çalışıyor" :
        health.status === "checking" ? "Kontrol ediliyor" : "Kapalı/erişilemiyor";

    _modalDetails.innerHTML = `
        <div class="detail-item">
            <div class="detail-label">Marka</div>
            <div class="detail-value">${_esc(camera.CameraBrand) || "Bilinmiyor"}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Model</div>
            <div class="detail-value">${_esc(camera.CameraModel) || "Bilinmiyor"}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Çözünürlük</div>
            <div class="detail-value">${_esc(camera.Resolution) || "—"}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Kaynak Durumu</div>
            <div class="detail-value">${_esc(camera.State) || (camera.IsActive === "true" ? "Aktif" : "Pasif")}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Otomatik Kontrol</div>
            <div class="detail-value status-text ${statusClass}">${statusLabel}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Kontrol Notu</div>
            <div class="detail-value">${_esc(health.reason) || "—"}</div>
        </div>
    `;
}

function _esc(str) {
    if (!str) return str || "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
