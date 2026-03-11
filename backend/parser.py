"""
XML parser for IBB camera list.
Reads list.xml, strips sensitive fields, and returns whitelisted camera data.
"""
from pathlib import Path
import xml.etree.ElementTree as ET
import re

NS = "http://schemas.datacontract.org/2004/07/TKMWebApi.Controllers.Camera.Models"

WHITELIST = {
    "CameraNo", "CameraName", "XCoord", "YCoord", "IsActive", "State",
    "CameraCaptureImage", "CameraModel", "CameraBrand", "Resolution",
    "WowzaStreamSSL", "WowzaStream",
}

# These tags are stripped from the XML *before* parsing to avoid malformed XML
# (some RTSPURL values contain unescaped & characters with embedded credentials)
EXCLUDE_TAGS = [
    "IPAddress", "RTSPURL", "CameraCaptureDate",
    "CropBottomRightX", "CropBottomRightY", "CropTopLeftX", "CropTopLeftY",
    "Format", "TunnelCamera",
]

_XML_PATH = Path(__file__).parent.parent / "list.xml"
_cameras_cache: list[dict] | None = None


def _strip_excluded_tags(xml_content: str) -> str:
    """Remove excluded element tags before ET parsing to sidestep malformed XML."""
    for tag in EXCLUDE_TAGS:
        xml_content = re.sub(
            rf"<{tag}[^>]*/?>.*?</{tag}>|<{tag}[^>]*/>",
            "",
            xml_content,
            flags=re.DOTALL,
        )
    return xml_content


def parse_xml_string(xml_content: str) -> list[dict]:
    """Parse an XML string and return a list of whitelisted camera dicts."""
    # Strip browser-injected non-XML header line (present when file is saved from browser)
    start = xml_content.find("<ArrayOf")
    if start == -1:
        start = xml_content.find("<?xml")
    if start > 0:
        xml_content = xml_content[start:]

    xml_content = _strip_excluded_tags(xml_content)

    root = ET.fromstring(xml_content)
    cameras: list[dict] = []
    tag_card = f"{{{NS}}}CameraIdentityCard"

    for card in root.iter(tag_card):
        cam: dict = {}
        for child in card:
            local = child.tag.split("}")[-1] if "}" in child.tag else child.tag
            if local in WHITELIST:
                cam[local] = (child.text or "").strip()

        # Fill missing whitelist fields with empty string
        for field in WHITELIST:
            cam.setdefault(field, "")

        # Filter cameras with zero or missing coordinates
        try:
            x = float(cam.get("XCoord") or "0")
            y = float(cam.get("YCoord") or "0")
            if x == 0.0 or y == 0.0:
                continue
        except (ValueError, TypeError):
            continue

        cameras.append(cam)

    return cameras


def load_cameras() -> list[dict]:
    """Load and cache cameras from list.xml. Returns cached result on subsequent calls."""
    global _cameras_cache
    if _cameras_cache is not None:
        return _cameras_cache

    with open(_XML_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    _cameras_cache = parse_xml_string(content)
    return _cameras_cache


def invalidate_cache() -> None:
    """Clear the camera cache so it will be reloaded on the next call to load_cameras()."""
    global _cameras_cache
    _cameras_cache = None
