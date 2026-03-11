"""Tests for backend/parser.py — XML parsing and field whitelist enforcement."""
import pytest
from backend.parser import parse_xml_string

NS_ATTRS = (
    'xmlns:i="http://www.w3.org/2001/XMLSchema-instance" '
    'xmlns="http://schemas.datacontract.org/2004/07/TKMWebApi.Controllers.Camera.Models"'
)


def wrap(inner: str) -> str:
    return f"<ArrayOfCameraIdentityCard {NS_ATTRS}>{inner}</ArrayOfCameraIdentityCard>"


FULL_CAMERA = """
<CameraIdentityCard>
  <CameraBrand>Hikvision</CameraBrand>
  <CameraCaptureDate>2026-01-01T00:00:00</CameraCaptureDate>
  <CameraCaptureImage>https://example.com/cam?cno=2</CameraCaptureImage>
  <CameraModel>DS-2CD</CameraModel>
  <CameraName>TEST KAMERA</CameraName>
  <CameraNo>2</CameraNo>
  <CropBottomRightX>300</CropBottomRightX>
  <CropBottomRightY>250</CropBottomRightY>
  <CropTopLeftX>10</CropTopLeftX>
  <CropTopLeftY>15</CropTopLeftY>
  <Format>H.264</Format>
  <IPAddress>10.10.32.200</IPAddress>
  <IsActive>true</IsActive>
  <RTSPURL>rtsp://admin:password@10.10.32.200/Streaming/Channels/102</RTSPURL>
  <Resolution>800x448</Resolution>
  <State>Aktif</State>
  <TunnelCamera>false</TunnelCamera>
  <WowzaStream>http://example.com/live/2.stream/playlist.m3u8</WowzaStream>
  <WowzaStreamSSL>https://example.com/hls/2.stream/playlist.m3u8</WowzaStreamSSL>
  <XCoord>28.96274764</XCoord>
  <YCoord>41.08630782</YCoord>
</CameraIdentityCard>
"""

ZERO_COORD_CAMERA = """
<CameraIdentityCard>
  <CameraName>ZERO COORD</CameraName>
  <CameraNo>99</CameraNo>
  <IsActive>true</IsActive>
  <XCoord>0</XCoord>
  <YCoord>0</YCoord>
  <WowzaStreamSSL/>
  <WowzaStream/>
</CameraIdentityCard>
"""

EMPTY_COORD_CAMERA = """
<CameraIdentityCard>
  <CameraName>EMPTY COORD</CameraName>
  <CameraNo>100</CameraNo>
  <IsActive>true</IsActive>
  <XCoord/>
  <YCoord/>
  <WowzaStreamSSL/>
  <WowzaStream/>
</CameraIdentityCard>
"""

RTSP_AMPERSAND_CAMERA = """
<CameraIdentityCard>
  <CameraName>AMPERSAND TEST</CameraName>
  <CameraNo>3</CameraNo>
  <IsActive>true</IsActive>
  <RTSPURL>rtsp://host/path?a=1&amp;resolution=640x480</RTSPURL>
  <XCoord>28.9</XCoord>
  <YCoord>41.0</YCoord>
  <WowzaStreamSSL/>
  <WowzaStream/>
</CameraIdentityCard>
"""

SELF_CLOSING_STREAM_CAMERA = """
<CameraIdentityCard>
  <CameraName>SELF CLOSING</CameraName>
  <CameraNo>4</CameraNo>
  <IsActive>true</IsActive>
  <XCoord>28.9</XCoord>
  <YCoord>41.0</YCoord>
  <WowzaStreamSSL/>
  <WowzaStream/>
</CameraIdentityCard>
"""


def test_whitelist_fields_present():
    result = parse_xml_string(wrap(FULL_CAMERA))
    assert len(result) == 1
    cam = result[0]
    assert cam["CameraNo"] == "2"
    assert cam["CameraName"] == "TEST KAMERA"
    assert cam["XCoord"] == "28.96274764"
    assert cam["YCoord"] == "41.08630782"
    assert cam["WowzaStreamSSL"] == "https://example.com/hls/2.stream/playlist.m3u8"
    assert cam["WowzaStream"] == "http://example.com/live/2.stream/playlist.m3u8"
    assert cam["Resolution"] == "800x448"
    assert cam["IsActive"] == "true"
    assert cam["State"] == "Aktif"


def test_sensitive_fields_absent():
    result = parse_xml_string(wrap(FULL_CAMERA))
    cam = result[0]
    assert "IPAddress" not in cam
    assert "RTSPURL" not in cam


def test_all_excluded_fields_absent():
    result = parse_xml_string(wrap(FULL_CAMERA))
    cam = result[0]
    excluded = [
        "CameraCaptureDate", "CropBottomRightX", "CropBottomRightY",
        "CropTopLeftX", "CropTopLeftY", "Format", "TunnelCamera",
    ]
    for field in excluded:
        assert field not in cam, f"Field '{field}' should be excluded"


def test_zero_coord_filtered():
    result = parse_xml_string(wrap(ZERO_COORD_CAMERA))
    assert len(result) == 0


def test_empty_coord_filtered():
    result = parse_xml_string(wrap(EMPTY_COORD_CAMERA))
    assert len(result) == 0


def test_rtspurl_ampersand_no_crash():
    """RTSPURL with unescaped & is stripped before ET parse — must not crash."""
    result = parse_xml_string(wrap(RTSP_AMPERSAND_CAMERA))
    assert len(result) == 1
    assert "RTSPURL" not in result[0]


def test_self_closing_empty_tag_is_empty_string():
    result = parse_xml_string(wrap(SELF_CLOSING_STREAM_CAMERA))
    assert len(result) == 1
    assert result[0]["WowzaStreamSSL"] == ""
    assert result[0]["WowzaStream"] == ""


def test_browser_header_stripped():
    header = "This XML file does not appear to have any style information associated with it.\n"
    result = parse_xml_string(header + wrap(FULL_CAMERA))
    assert len(result) == 1
    assert result[0]["CameraNo"] == "2"


def test_correct_camera_count_with_mixed_coords():
    """Only camera with valid coords survives."""
    result = parse_xml_string(wrap(FULL_CAMERA + ZERO_COORD_CAMERA))
    assert len(result) == 1


def test_wowza_values_preserved():
    result = parse_xml_string(wrap(FULL_CAMERA))
    cam = result[0]
    assert "http://example.com/live/2.stream/playlist.m3u8" == cam["WowzaStream"]
    assert "https://example.com/hls/2.stream/playlist.m3u8" == cam["WowzaStreamSSL"]
