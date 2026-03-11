# TKM Services API Canlı İstek ve Çıktı Dokümanı

Bu dosya, [TKM_SERVICES_API_DOKUMANTASYONU.md](/mnt/c/Users/Burak/Desktop/ibbkamera/TKM_SERVICES_API_DOKUMANTASYONU.md) içindeki tüm endpointler esas alınarak üretildi. Her endpoint için canlı probe sonucu, kullanılabilecek örnek istek ve mümkün olduğunda örnek çıktı yer alır.

## Kapsam

- Toplam endpoint: 203
- GET endpoint: 145
- POST endpoint: 58
- Canlı probe zamanı: 2026-03-11T17:22:40.979622+03:00
- Hedef host: `https://tkmservices.ibb.gov.tr/Web/`

## Güvenlik ve test yaklaşımı

- `GET` endpointler gerçek `GET` isteği ile canlı test edildi.
- `POST` endpointler için gerçek `POST` isteği atılmadı. Sebep: bu uçların önemli kısmı üretim sistemine kayıt açıyor, durum değiştiriyor veya kullanıcı/olay verisi yazıyor. Üretim ortamına yanlış veri göndermemek için bunlarda yalnızca `OPTIONS` ile non-destructive probe yapıldı.
- `POST` endpointlerde yine de help sayfasındaki örnek request/response gövdeleri ayrı ayrı yazıldı; bunlar canlı çalıştırılmadı.
- Parametreli URL’lerde aşağıdaki örnek değerler kullanıldı.

| Yer tutucu | Kullanılan örnek değer |
| --- | --- |
| `{lang}` | `tr` |
| `{id}` / `{Id}` / `{camId}` / `{cameraNo}` / `{displayID}` / `{VmsId}` / `{MsgId}` | `1` |
| `{flag}` | `0` |
| `{minute}` | `5` |
| `{ZoomLevel}` | `10` |
| `{day}` | `1` |
| `{period}` | `60` |
| `{begin_EPOC}` / `{end_EPOC}` | `probe anındaki Unix epoch` |
| `{sid}` / `{s}` / `{slCode}` / `{vmsNo}` / `{dspno}` | `1` veya örnek sensör değeri |

## Canlı sonuç özeti

| HTTP durum | Adet | Yorum |
| --- | ---: | --- |
| `200` | 57 | Başarılı canlı yanıt alındı. |
| `302` | 64 | Login yönlendirmesi döndü. |
| `401` | 19 | Yetkisiz erişim döndü. |
| `405` | 58 | OPTIONS probe kabul edilmedi. |
| `415` | 3 | Unsupported media type döndü. |
| `500` | 1 | Sunucu iç hata döndü. |
| `None` | 1 | Timeout veya istemci hatası oluştu. |

| Method | HTTP durum dağılımı |
| --- | --- |
| `GET` | `200`: 57, `302`: 64, `401`: 19, `415`: 3, `500`: 1, `None`: 1 |
| `POST` | `405`: 58 |

## Endpoint bazlı kullanım ve çıktılar

## SystemFailures

### `POST /api/SystemFailures/v1/InsertSystemFailure`

- Açıklama: SATA yazılımından gelen arızaların kayıt işlemini yapar.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-SystemFailures-v1-InsertSystemFailure>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/SystemFailures/v1/InsertSystemFailure`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/SystemFailures/v1/InsertSystemFailure'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/SystemFailures/v1/InsertSystemFailure' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "SATAArizaId": 1,
  "SATAArizaTarihi": "2026-03-11T17:15:49.6995913+03:00",
  "SistemId": 3,
  "Aciklama": "sample string 4",
  "AltKategoriId": 5,
  "AltKategoriAdi": "sample string 6",
  "UstKategoriId": 7,
  "UstKategoriAdi": "sample string 8",
  "BildirimTipiId": 9,
  "BildirimTipiAdi": "sample string 10",
  "ProjeId": 11,
  "ProjeAdi": "sample string 12",
  "OlusturulmaTarihi": "2026-03-11T17:15:49.6995913+03:00"
}'
```
- Help request modeli: `FailureModel`
- Help request alanları: `SATAArizaId` (integer), `SATAArizaTarihi` (date), `SistemId` (integer), `Aciklama` (string), `AltKategoriId` (integer), `AltKategoriAdi` (string), `UstKategoriId` (integer), `UstKategoriAdi` (string), `BildirimTipiId` (integer), `BildirimTipiAdi` (string), `ProjeId` (integer), `ProjeAdi` (string), `OlusturulmaTarihi` (date)
- Help örnek request gövdesi:
```json
{
  "SATAArizaId": 1,
  "SATAArizaTarihi": "2026-03-11T17:15:49.6995913+03:00",
  "SistemId": 3,
  "Aciklama": "sample string 4",
  "AltKategoriId": 5,
  "AltKategoriAdi": "sample string 6",
  "UstKategoriId": 7,
  "UstKategoriAdi": "sample string 8",
  "BildirimTipiId": 9,
  "BildirimTipiAdi": "sample string 10",
  "ProjeId": 11,
  "ProjeAdi": "sample string 12",
  "OlusturulmaTarihi": "2026-03-11T17:15:49.6995913+03:00"
}
```
- Help response modeli: `FailureInsertResponse`
- Help response alanları: `Durum` (integer), `SATAArizaId` (integer), `ITSArizaId` (integer), `Mesaj` (string)
- Help örnek response gövdesi:
```json
{
  "Durum": 1,
  "SATAArizaId": 2,
  "ITSArizaId": 3,
  "Mesaj": "sample string 4"
}
```

### `POST /api/SystemFailures/v1/InsertSystemFailureResponse`

- Açıklama: SATA yazılımından gelen arıza çözümlerinin kayıt işlemini yapar.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-SystemFailures-v1-InsertSystemFailureResponse>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/SystemFailures/v1/InsertSystemFailureResponse`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/SystemFailures/v1/InsertSystemFailureResponse'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/SystemFailures/v1/InsertSystemFailureResponse' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "ITSArizaId": 1,
  "CozumKategoriId": 2,
  "CozumKategoriAdi": "sample string 3",
  "UstKategoriId": 4,
  "UstKategoriAdi": "sample string 5",
  "AltKategoriId": 6,
  "AltKategoriAdi": "sample string 7",
  "BildirimTipiId": 8,
  "ProjeId": 9,
  "ProjeAdi": "sample string 10",
  "YanitAciklamasi": "sample string 11",
  "YanitTarihi": "2026-03-11T17:15:49.6995913+03:00"
}'
```
- Help request modeli: `FailureAnswerModel`
- Help request alanları: `ITSArizaId` (integer), `CozumKategoriId` (integer), `CozumKategoriAdi` (string), `UstKategoriId` (integer), `UstKategoriAdi` (string), `AltKategoriId` (integer), `AltKategoriAdi` (string), `BildirimTipiId` (integer), `ProjeId` (integer), `ProjeAdi` (string), `YanitAciklamasi` (string), `YanitTarihi` (date)
- Help örnek request gövdesi:
```json
{
  "ITSArizaId": 1,
  "CozumKategoriId": 2,
  "CozumKategoriAdi": "sample string 3",
  "UstKategoriId": 4,
  "UstKategoriAdi": "sample string 5",
  "AltKategoriId": 6,
  "AltKategoriAdi": "sample string 7",
  "BildirimTipiId": 8,
  "ProjeId": 9,
  "ProjeAdi": "sample string 10",
  "YanitAciklamasi": "sample string 11",
  "YanitTarihi": "2026-03-11T17:15:49.6995913+03:00"
}
```
- Help response modeli: `FailureAnswerResponse`
- Help response alanları: `Durum` (integer), `ITSArizaId` (integer), `Mesaj` (string)
- Help örnek response gövdesi:
```json
{
  "Durum": 1,
  "ITSArizaId": 2,
  "Mesaj": "sample string 3"
}
```

## GIS

### `GET /api/gis/v1/camera`

- Açıklama: Kamera listesi, GeoJson formatında
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-gis-v1-camera>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/gis/v1/camera`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/gis/v1/camera'
```
- Canlı örnek çıktı:
```json
"{ \"type\": \"FeatureCollection\", \"features\":[{\"type\":\"Feature\",\"properties\":{\"CameraNo\":1,\"CameraName\":\"ACIBADEM SARAYARDI CAD.\",\"VideoURL\":\"\"},\"geometry\":{\"type\": \"Point\",\"coordinates\":[29.0358434,40.9965959]}},{\"type\":\"Feature\",\"properties\":{\"CameraNo\":2,\"CameraName\":\"AKOM\",\"VideoURL\":\"https:\\/\\/hls.ibb.gov.tr\\/tkm4\\/hls\\/2.stream\\/playlist.m3u8\"},\"geometry\":{\"type\": \"Point\",\"coordinates\":[28.96274764,41.08630782]}},{\"type\":\"Feature\",\"properties\":{\"CameraNo\":3,\"CameraName\":\"AKSARAY\",\"VideoURL\":\"https:\\/\\/hls.ibb.gov.tr\\/tkm4\\/hls\\/3.stream\\/playlist.m3u8\"},\"geometry\":{\"type\": \"Point\",\"coordinates\":[28.95382145,41.00983033]}},{\"type\":\"Feature\",\"properties\":{\"CameraNo\":4,\"CameraName\":\"ALİBEYKÖY MEYDANI\",\"VideoURL\":\"https:\\/\\/hls.ibb.gov.tr\\/tkm2\\/hls\\/4.stream\\/playlist.m3u8\"},\"geometry\":{\"type\": \"Point\",\"coordinates\":[28.94778426,41.07454609]}},{\"type\":\"Feature\",\"properties\":{\"CameraNo\":6,\"CameraName\":\"ALTUNİZADE TÜNEL 1\",\"VideoURL\":\"https:\\/\\/hls.ibb.gov.tr\\/tkm2\\/hls\\/6.stream\\/playlist.m3u8\"},\"geometry\":{\"type\": \"Point\",\"coordinates\":[29.0536348,41.02385711]}},{\"type\":\"Feature\",\"properties\":{\"CameraNo\":5,\"CameraName\":\"ALTUNİZADE TÜNEL \",\"VideoURL\":\"https:\\/\\/hls.ibb.gov.tr\\/tkm2\\/hls\\/5.stream\\/playlist.m3u8\"},\"geometry\":{\"type\": \"Point\",\"coordinates\":[29.0536348,41.02385711]}},{\"type\":\"Feature\",\"properties\":{\"CameraNo\":8,\"CameraName\":\"S. YOLU ATAKÖY 1\",\"VideoURL\":\"https:\\/\\/hls.ibb.gov.tr\\/tkm1\\/hls\\/8.stream\\/playlist.m3u8\"},\"geometry\":{\"type\": \"Point\",\"coordinates\":[28.86594073,40.97697373]}},{\"type\":\"Feature\",\"properties\":{\"CameraNo\":9,\"CameraName\":\"S. YOLU ATAKÖY 2\",\"VideoURL\":\"https:\\/\\/hls.ibb.gov.tr\\/tkm1\\/hls\\/9.stream\\/playlist.m3u8\"},\"geometry\":{\"type\": \"Point\",\"coordinates\":[28.85223472,40.97640653]}},{\"type\":\"Feature\",\"properties\":{\"CameraNo\":10,\"CameraName\":\"ATAKÖY 9. KISIM\",\"VideoURL\":\"https:\\/\\/hls.ibb.gov.tr\\/tkm1\\/hls\\/10.stream\\/playlist.m3u8\"},\"geometry\":{\"type\": \"Point\",\"coordinates\":[28.85260466,40.98642234]}},{\"type\":\"Feature\",\"properties\":{\"CameraNo\":12,\"CameraName\":\"S. YOLU GALERİA\",\"VideoURL\":\"https:\\/\\/hls.ibb.}"
```
- Help response modeli: Belirtilmemiş.
- Help örnek response gövdesi:
```json
"sample string 1"
```

## Park

### `GET /api/Park/v1/DashParkingLotCount`

- Açıklama: APS'de kayıtlı toplam otopark sayısı
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-DashParkingLotCount>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/DashParkingLotCount`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fDashParkingLotCount`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/DashParkingLotCount'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fDashParkingLotCount">here</a>.</h2>
</body></html>
```
- Help response modeli: `Result_INT`
- Help response alanları: `Res` (integer)
- Help örnek response gövdesi:
```json
{
  "Res": 1
}
```

### `GET /api/Park/v1/DashParkingLotSortCount`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-DashParkingLotSortCount>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/DashParkingLotSortCount`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fDashParkingLotSortCount`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/DashParkingLotSortCount'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fDashParkingLotSortCount">here</a>.</h2>
</body></html>
```
- Help response modeli: `ParkSortCount[]`
- Help response alanları: `ParkSort` (string): Parking Sort Name, `Capacity` (integer): Capacity of the parking sort, `Available` (integer): Available of the parking sort
- Help örnek response gövdesi:
```json
[
  {
    "ParkSort": "sample string 1",
    "Capacity": 2,
    "Available": 3
  },
  {
    "ParkSort": "sample string 1",
    "Capacity": 2,
    "Available": 3
  }
]
```

### `GET /api/Park/v1/GetApsInfos`

- Açıklama: Trafik Müdürlüğünün sahada kullandığı APS'lerdeki otopark doluluk bilgilerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-GetApsInfos>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetApsInfos`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fGetApsInfos`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetApsInfos'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fGetApsInfos">here</a>.</h2>
</body></html>
```
- Help response modeli: `ParkingAps[]`
- Help response alanları: `PApsId` (integer), `PApsName` (string), `PApsLatitude` (string), `PApsLongitude` (string), `PLotsIds` (string), `PApsImage` (string), `ApsPLots` (Collection of ParkInfo)
- Help örnek response gövdesi:
```json
[
  {
    "PApsId": 1,
    "PApsName": "sample string 2",
    "PApsLatitude": "sample string 3",
    "PApsLongitude": "sample string 4",
    "PLotsIds": "sample string 5",
    "PApsImage": "sample string 6",
    "ApsPLots": [
      {
        "PLotId": 1,
        "PLotName": "sample string 2",
        "PLotCapasity": 3,
        "PLotAvailableCount": 4,
        "PLotLatitude": "sample string 5",
        "PLotLongitude": "sample string 6",
        "PStatus": "sample string 7",
        "PApsContact": "sample string 8",
        "PWorkingHours": "sample string 9"
      },
      {
        "PLotId": 1,
        "PLotName": "sample string 2",
        "PLotCapasity": 3,
        "PLotAvailableCount": 4,
        "PLotLatitude": "sample string 5",
        "PLotLongitude": "sample string 6",
        "PStatus": "sample string 7",
        "PApsContact": "sample string 8",
        "PWorkingHours": "sample string 9"
      }
    ]
  },
  {
    "PApsId": 1,
    "PApsName": "sample string 2",
    "PApsLatitude": "sample string 3",
    "PApsLongitude": "sample string 4",
    "PLotsIds": "sample string 5",
    "PApsImage": "sample string 6",
    "ApsPLots": [
      {
        "PLotId": 1,
        "PLotName": "sample string 2",
        "PLotCapasity": 3,
        "PLotAvailableCount": 4,
        "PLotLatitude": "sample string 5",
        "PLotLongitude": "sample string 6",
        "PStatus": "sample string 7",
        "PApsContact": "sample string 8",
        "PWorkingHours": "sample string 9"
      },
      {
        "PLotId": 1,
        "PLotName": "sample string 2",
        "PLotCapasity": 3,
        "PLotAvailableCount": 4,
        "PLotLatitude": "sample string 5",
        "PLotLongitude": "sample string 6",
        "PStatus": "sample string 7",
        "PApsContact": "sample string 8",
        "PWorkingHours": "sample string 9"
      }
    ]
  }
]
```

### `GET /api/Park/v1/GetBeyogluParkInfos`

- Açıklama: Trafik Müdürlüğünün anlaşmalı olduğu Beyoğlu ilçesinde bulunan otoparkların doluluk oranlarının bilgilerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-GetBeyogluParkInfos>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetBeyogluParkInfos`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fGetBeyogluParkInfos`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetBeyogluParkInfos'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fGetBeyogluParkInfos">here</a>.</h2>
</body></html>
```
- Help response modeli: `ParkInfo[]`
- Help response alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotAvailableCount": 4,
    "PLotLatitude": "sample string 5",
    "PLotLongitude": "sample string 6",
    "PStatus": "sample string 7",
    "PApsContact": "sample string 8",
    "PWorkingHours": "sample string 9"
  },
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotAvailableCount": 4,
    "PLotLatitude": "sample string 5",
    "PLotLongitude": "sample string 6",
    "PStatus": "sample string 7",
    "PApsContact": "sample string 8",
    "PWorkingHours": "sample string 9"
  }
]
```

### `GET /api/Park/v1/GetParkInfo/{flag}/{id}`

- Açıklama: Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-GetParkInfo-flag-id>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetParkInfo/0/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fGetParkInfo%2f0%2f1`
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetParkInfo/0/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fGetParkInfo%2f0%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `ParkInfo[]`
- Help response alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotAvailableCount": 4,
    "PLotLatitude": "sample string 5",
    "PLotLongitude": "sample string 6",
    "PStatus": "sample string 7",
    "PApsContact": "sample string 8",
    "PWorkingHours": "sample string 9"
  },
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotAvailableCount": 4,
    "PLotLatitude": "sample string 5",
    "PLotLongitude": "sample string 6",
    "PStatus": "sample string 7",
    "PApsContact": "sample string 8",
    "PWorkingHours": "sample string 9"
  }
]
```

### `GET /api/Park/v1/GetParkInfos/{flag}/{id}`

- Açıklama: Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-GetParkInfos-flag-id>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetParkInfos/0/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fGetParkInfos%2f0%2f1`
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetParkInfos/0/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv1%2fGetParkInfos%2f0%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `ParkInfo[]`
- Help response alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotAvailableCount": 4,
    "PLotLatitude": "sample string 5",
    "PLotLongitude": "sample string 6",
    "PStatus": "sample string 7",
    "PApsContact": "sample string 8",
    "PWorkingHours": "sample string 9"
  },
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotAvailableCount": 4,
    "PLotLatitude": "sample string 5",
    "PLotLongitude": "sample string 6",
    "PStatus": "sample string 7",
    "PApsContact": "sample string 8",
    "PWorkingHours": "sample string 9"
  }
]
```

### `POST /api/Park/v1/SetParkInfo/{Id}/{Availability}`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Park-v1-SetParkInfo-Id-Availability>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/SetParkInfo/1/sample`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: `Id` (integer, Required), `Availability` (integer, Required)
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/SetParkInfo/1/sample'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/SetParkInfo/1/sample'
```
- Help request modeli: Belirtilmemiş.
- Help response modeli: Belirtilmemiş.
- Help örnek response gövdesi:
```json
"sample string 1"
```

### `GET /api/Park/v2/GetParkInfo/{flag}/{id}`

- Açıklama: Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v2-GetParkInfo-flag-id>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v2/GetParkInfo/0/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv2%2fGetParkInfo%2f0%2f1`
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Park/v2/GetParkInfo/0/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPark%2fv2%2fGetParkInfo%2f0%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `ParkInfo_v2[]`
- Help response alanları: `PLotSort` (string), `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PLotSort": "sample string 1",
    "PLotId": 2,
    "PLotName": "sample string 3",
    "PLotCapasity": 4,
    "PLotAvailableCount": 5,
    "PLotLatitude": "sample string 6",
    "PLotLongitude": "sample string 7",
    "PStatus": "sample string 8",
    "PApsContact": "sample string 9",
    "PWorkingHours": "sample string 10"
  },
  {
    "PLotSort": "sample string 1",
    "PLotId": 2,
    "PLotName": "sample string 3",
    "PLotCapasity": 4,
    "PLotAvailableCount": 5,
    "PLotLatitude": "sample string 6",
    "PLotLongitude": "sample string 7",
    "PStatus": "sample string 8",
    "PApsContact": "sample string 9",
    "PWorkingHours": "sample string 10"
  }
]
```

## IntensityMap

### `GET /api/IntensityMap/Anaylze/v1/VehicleDestination/{idsen}/{begin_EPOC}/{end_EPOC}`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-Anaylze-v1-VehicleDestination-idsen-begin_EPOC-end_EPOC>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/Anaylze/v1/VehicleDestination/1/1773235341/1773238941`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `idsen` (integer, Required), `begin_EPOC` (integer, Required), `end_EPOC` (integer, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/Anaylze/v1/VehicleDestination/1/1773235341/1773238941'
```
- Canlı örnek çıktı:
```json
[]
```
- Help response modeli: `Analyze_VehicleDestination[]`
- Help response alanları: `idsen` (integer): Aracın başlangıç sensöründen gittiği sensör, `sendesc` (string): Sensör Noktası Açıklaması, `all_vcount` (integer): hedef sensördeki tüm araç sayımı, `tracked_vcount` (integer): hedef sensörde, başlangıç sensöründe de varolan araçların sayımı, `rate` (decimal number): hedef sensörde, başlangıç sensöründe de varolan araçların oranı, `lat` (string), `lon` (string)
- Help örnek response gövdesi:
```json
[
  {
    "idsen": 1,
    "sendesc": "sample string 2",
    "all_vcount": 3,
    "tracked_vcount": 4,
    "rate": 5.1,
    "lat": "sample string 6",
    "lon": "sample string 7"
  },
  {
    "idsen": 1,
    "sendesc": "sample string 2",
    "all_vcount": 3,
    "tracked_vcount": 4,
    "rate": 5.1,
    "lat": "sample string 6",
    "lon": "sample string 7"
  }
]
```

### `GET /api/IntensityMap/Anaylze/v1/VehicleTracking/{idsen}/{begin_EPOC}/{end_EPOC}`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-Anaylze-v1-VehicleTracking-idsen-begin_EPOC-end_EPOC>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/Anaylze/v1/VehicleTracking/1/1773235341/1773238941`
- Canlı test metodu: `GET`
- Canlı sonuç: `None`
- Sonuç yorumu: İstek zaman aşımı veya ağ hatasıyla sonuçlandı.
- Probe hata detayı: `TimeoutError('The read operation timed out')`
- Yol/query parametreleri: `idsen` (integer, Required), `begin_EPOC` (integer, Required), `end_EPOC` (integer, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/Anaylze/v1/VehicleTracking/1/1773235341/1773238941'
```
- Canlı örnek çıktı: Gövde alınamadı veya boş döndü.
- Help response modeli: `Analyze_VehicleDestination[]`
- Help response alanları: `idsen` (integer): Aracın başlangıç sensöründen gittiği sensör, `sendesc` (string): Sensör Noktası Açıklaması, `all_vcount` (integer): hedef sensördeki tüm araç sayımı, `tracked_vcount` (integer): hedef sensörde, başlangıç sensöründe de varolan araçların sayımı, `rate` (decimal number): hedef sensörde, başlangıç sensöründe de varolan araçların oranı, `lat` (string), `lon` (string)
- Help örnek response gövdesi:
```json
[
  {
    "idsen": 1,
    "sendesc": "sample string 2",
    "all_vcount": 3,
    "tracked_vcount": 4,
    "rate": 5.1,
    "lat": "sample string 6",
    "lon": "sample string 7"
  },
  {
    "idsen": 1,
    "sendesc": "sample string 2",
    "all_vcount": 3,
    "tracked_vcount": 4,
    "rate": 5.1,
    "lat": "sample string 6",
    "lon": "sample string 7"
  }
]
```

### `GET /api/IntensityMap/v1/Bicycle`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Bicycle>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Bicycle`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Bicycle'
```
- Canlı örnek çıktı:
```json
{
  "BR_Data": [],
  "BS_Data": []
}
```
- Help response modeli: `Bicycle`
- Help response alanları: `BR_Data` (Collection of BicycleRoad), `BS_Data` (Collection of BicycleStation)
- Help örnek response gövdesi:
```json
{
  "BR_Data": [
    {
      "I": 1,
      "T": 2,
      "G": "sample string 3",
      "L": "sample string 4"
    },
    {
      "I": 1,
      "T": 2,
      "G": "sample string 3",
      "L": "sample string 4"
    }
  ],
  "BS_Data": [
    {
      "I": 1,
      "N": "sample string 2",
      "A": "sample string 3",
      "C": 4,
      "AC": 5,
      "Ly": "sample string 6",
      "Lx": "sample string 7",
      "S": true
    },
    {
      "I": 1,
      "N": "sample string 2",
      "A": "sample string 3",
      "C": 4,
      "AC": 5,
      "Ly": "sample string 6",
      "Lx": "sample string 7",
      "S": true
    }
  ]
}
```

### `GET /api/IntensityMap/v1/BridgesStatus`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-BridgesStatus>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/BridgesStatus`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/BridgesStatus'
```
- Canlı örnek çıktı:
```json
[
  {
    "RouteId": 10,
    "RouteName": "ÇAĞLAYAN",
    "Status": "AKICI",
    "OrderNo": 1,
    "GroupId": 1
  }
]
```
- Help response modeli: `BridgeRouteStatusModel[]`
- Help response alanları: `RouteId` (integer), `RouteName` (string), `Status` (string), `OrderNo` (integer), `GroupId` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "RouteId": 1,
    "RouteName": "sample string 2",
    "Status": "sample string 3",
    "OrderNo": 4,
    "GroupId": 5
  },
  {
    "RouteId": 1,
    "RouteName": "sample string 2",
    "Status": "sample string 3",
    "OrderNo": 4,
    "GroupId": 5
  }
]
```

### `GET /api/IntensityMap/v1/Camera`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Camera>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Camera`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Camera'
```
- Canlı örnek çıktı:
```json
[{"Group":[],"ID":2,"Name":"AKOM","XCoord":"28.96274764","YCoord":"41.08630782","VideoURL":"https://hls.ibb.gov.tr/tkm4/hls/2.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm4/hls/2.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=2","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=2","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=2"]},{"Group":[],"ID":3,"Name":"AKSARAY","XCoord":"28.95382145","YCoord":"41.00983033","VideoURL":"https://hls.ibb.gov.tr/tkm4/hls/3.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm4/hls/3.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=3","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=3","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=3"]},{"Group":[],"ID":4,"Name":"ALİBEYKÖY MEYDANI","XCoord":"28.94778426","YCoord":"41.07454609","VideoURL":"https://hls.ibb.gov.tr/tkm2/hls/4.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm2/hls/4.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=4","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=4","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=4"]},{"Group":[],"ID":6,"Name":"ALTUNİZADE TÜNEL 1","XCoord":"29.0536348","YCoord":"41.02385711","VideoURL":"https://hls.ibb.gov.tr/tkm2/hls/6.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm2/hls/6.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=6","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=6","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=6"]},{"Group":[],"ID":5,"Name":"ALTUNİZADE TÜNEL ","XCoord":"29.0536348","YCoord":"41.02385711","VideoURL":"https://hls.ibb.gov.tr/tkm2/hls/5.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm2/hls/5.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=5","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=5","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=5"]},{"Group":[],"ID":8,"Name":"S. YOLU ATAKÖY 1","XCoord":"28.86594073","YCoord":"40.97697373","VideoURL":"https://hls.ibb.gov.tr/tkm1/hls/8.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm1/hls/8.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=8","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=8","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=8"]},{"Group":[],"ID":9,"Name":"S. YOLU ATAKÖY 2","XCoord":"28.85223472","YCoord":"40.97640653","VideoURL":"https://hls.ibb.gov.tr/tkm1/hls/9.s
```
- Help response modeli: `CameraGroupedList[]`
- Help response alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Help örnek response gövdesi:
```json
[
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  },
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  }
]
```

### `GET /api/IntensityMap/v1/Camera/URL`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Camera-URL>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Camera/URL`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Camera/URL'
```
- Canlı örnek çıktı:
```json
[{"ID":2,"Name":"AKOM","XCoord":"28.96274764","YCoord":"41.08630782","VideoURL":"http://ibb-media4.ibb.gov.tr:1935/live/2.stream/playlist.m3u8","VideoURL_rtsp":"rtsp://admin:Tkm2953kam@10.10.32.200/Streaming/Channels/102","VideoURL_app_live":"http://ibb-media4.ibb.gov.tr:1935/live/2.stream/playlist.m3u8","VideoURL_app_hls":"http://ibb-media4.ibb.gov.tr:1935/hls/2.stream/playlist.m3u8","VideoURL_streamlock":"https://601a43eea2819.streamlock.net/hls/2.stream/playlist.m3u8","VideoURL_ibbstream":"https://hls.ibb.gov.tr/tkm4/hls/2.stream/playlist.m3u8"},{"ID":3,"Name":"AKSARAY","XCoord":"28.95382145","YCoord":"41.00983033","VideoURL":"http://ibb-media4.ibb.gov.tr:1935/live/3.stream/playlist.m3u8","VideoURL_rtsp":"rtsp://admin:Tkm2953kam@10.10.26.222/Streaming/Channels/101","VideoURL_app_live":"http://ibb-media4.ibb.gov.tr:1935/live/3.stream/playlist.m3u8","VideoURL_app_hls":"http://ibb-media4.ibb.gov.tr:1935/hls/3.stream/playlist.m3u8","VideoURL_streamlock":"https://601a43eea2819.streamlock.net/hls/3.stream/playlist.m3u8","VideoURL_ibbstream":"https://hls.ibb.gov.tr/tkm4/hls/3.stream/playlist.m3u8"},{"ID":4,"Name":"ALİBEYKÖY MEYDANI","XCoord":"28.94778426","YCoord":"41.07454609","VideoURL":"http://ibb-media2.ibb.gov.tr:1935/live/4.stream/playlist.m3u8","VideoURL_rtsp":"rtsp://10.10.32.13/stream1m","VideoURL_app_live":"http://ibb-media2.ibb.gov.tr:1935/live/4.stream/playlist.m3u8","VideoURL_app_hls":"http://ibb-media2.ibb.gov.tr:1935/hls/4.stream/playlist.m3u8","VideoURL_streamlock":"https://601a5ce60b9a1.streamlock.net/hls/4.stream/playlist.m3u8","VideoURL_ibbstream":"https://hls.ibb.gov.tr/tkm2/hls/4.stream/playlist.m3u8"},{"ID":6,"Name":"ALTUNİZADE TÜNEL 1","XCoord":"29.0536348","YCoord":"41.02385711","VideoURL":"http://ibb-media2.ibb.gov.tr:1935/hls/6.stream/playlist.m3u8","VideoURL_rtsp":"rtsp://admin:Tkm2953kam@10.11.70.38/Streaming/Channels/101","VideoURL_app_live":"http://ibb-media2.ibb.gov.tr:1935/hls/6.stream/playlist.m3u8","VideoURL_app_hls":"http://ibb-media2.ibb.gov.tr:1935/hls/6.stream/playlist.m3u8","VideoURL_streamlock":"https://601a5ce60b9a1.streamlock.net/hls/6.stream/playlist.m3u8","VideoURL_ibbstream":"https://hls.ibb.gov.tr/tkm2/hls/6.stream/playlist.m3u8"},{"ID":5,"Name":"ALTUNİZADE TÜNEL ","XCoord":"29.0536348","YCoord":"41.02385711","VideoURL":"http://ibb-media2.ibb.gov.tr:1935/live/5.stream/playlist.m3u8","VideoURL_rtsp":"rtsp://10.11.70.37/stream2m","VideoURL_app_live":"http://ibb-media2.ibb.gov.tr:1935/live/5.stream/playlist.m3u8","VideoURL_app_hls":"http://ibb-media2.ibb.gov.tr:1935/hls/5.stream/playlist.m3u8","VideoURL_streamlock":"https://601a5ce60b9a1.streamlock.net/hls/5.stream/playlist.m3u8","VideoURL_ibbstream":"https://hls.ibb.gov.tr/tkm2/hls/5.stream/playlist.m3u8"},{"ID":8,"Name":"S. YOLU ATAKÖY 1","XCoord":"28.86594073","YCoord":"40.97697373","VideoURL":"http://ibb-media1.ibb.gov.tr:1935/hls/8.stream/playlist.m3u8","VideoURL_rtsp":"rtsp://admin:Tkm2953kam@10.10.14.3/Streaming/Channels/101","VideoURL_app_live":"http
```
- Help response modeli: `CameraURL[]`
- Help response alanları: `ID` (integer), `Name` (string), `XCoord` (string), `YCoord` (string), `VideoURL` (string), `VideoURL_rtsp` (string), `VideoURL_app_live` (string), `VideoURL_app_hls` (string), `VideoURL_streamlock` (string), `VideoURL_ibbstream` (string)
- Help örnek response gövdesi:
```json
[
  {
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_rtsp": "sample string 6",
    "VideoURL_app_live": "sample string 7",
    "VideoURL_app_hls": "sample string 8",
    "VideoURL_streamlock": "sample string 9",
    "VideoURL_ibbstream": "sample string 10"
  },
  {
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_rtsp": "sample string 6",
    "VideoURL_app_live": "sample string 7",
    "VideoURL_app_hls": "sample string 8",
    "VideoURL_streamlock": "sample string 9",
    "VideoURL_ibbstream": "sample string 10"
  }
]
```

### `GET /api/IntensityMap/v1/CurrentAnnouncement`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-CurrentAnnouncement>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/CurrentAnnouncement`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/CurrentAnnouncement'
```
- Canlı örnek çıktı:
```json
[{"Id":1412103,"Metin":"Kayaşehir-Habibler Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Bölgedeki trafik yoğunlaşmaktadır.","MetinIng":"Kayaşehir-Habibler direction right lane vehicle breakdown. Traffic is increasing.","Tipi":32,"BitisTarihi":"2026-03-11T17:51:00","Link":"","Baslik":"Kayaşehir-Habibler Yönü, sağ şerit araç arızası. Bölgedeki trafik yoğunlaşmaktadır.","BaslikIng":"Kayaşehir-Habibler direction, right lane araç arızası. Bölgedeki trafik yoğunlaşmaktadır.","Koordinat":"41.146513,28.792742","Oncelik":1,"KameraId":596,"GirisTarihi":"2026-03-11T17:21:55","xKoordinat":"28.792742","yKoordinat":"41.146513","TimeDiff":1},{"Id":1412102,"Metin":"D100 Büyükçekmece-Beylikdüzü Yönü, sol şerit trafik kazası (hasarlı) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","MetinIng":"D100 Büyükçekmece-Beylikdüzü Yönü right lane traffic accident (damaged). 3 lane closed to traffic. Responding to accident.","Tipi":16,"BitisTarihi":"2026-03-11T17:46:00","Link":"","Baslik":"D100 Büyükçekmece-Beylikdüzü Yönü, sol şerit trafik kazası (hasarlı).","BaslikIng":"D100 Büyükçekmece-Beylikdüzü direction, left lane traffic accident (damaged).","Koordinat":"41.021081,28.582611","Oncelik":1,"KameraId":602,"GirisTarihi":"2026-03-11T17:17:16","xKoordinat":"28.582611","yKoordinat":"41.021081","TimeDiff":5},{"Id":1412101,"Metin":"D100 Avcılar Gümüşpala-Hacışerif Yönü, sol şerit trafik kazası (zincirleme) nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","MetinIng":"D100 Avcılar Gümüşpala-Hacışerif Yönü right lane traffic accident (pile up). No lanes are affected. Field staff was directed.","Tipi":16,"BitisTarihi":"2026-03-11T17:59:00","Link":"","Baslik":"D100 Avcılar Gümüşpala-Hacışerif Yönü, sol şerit trafik kazası (zincirleme) nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","BaslikIng":"D100 Avcılar Gümüşpala-Hacışerif direction, left lane traffic accident (pile up) nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","Koordinat":"40.979955,28.750492","Oncelik":1,"KameraId":415,"GirisTarihi":"2026-03-11T17:03:44","xKoordinat":"28.750492","yKoordinat":"40.979955","TimeDiff":19},{"Id":1412100,"Metin":"Sahil Yolu Yeşilyurt-Ataköy Yönü, sol şerit trafik kazası (zincirleme) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","MetinIng":"Sahil Yolu Yeşilyurt-Ataköy Yönü right lane traffic accident (pile up). 3 lane closed to traffic. Responding to accident.","Tipi":16,"BitisTarihi":"2026-03-11T17:59:00","Link":"","Baslik":"Sahil Yolu Yeşilyurt-Ataköy Yönü, sol şerit trafik kazası (zincirleme) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","BaslikIng":"Sahil Yolu Yeşilyurt-Ataköy direction, left lane traffic accident (pile up) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","Koordinat":"40.963021,28.824752","Oncelik":1,"KameraId":633,"GirisTarihi":"2026-03-11T16:56:16","xKoordinat":"28.824752","yKoordinat":"40.963021","TimeDiff":26},{"Id":1412099,"Metin":"Bağlantı Yolu Yıldırım-Bayrampaşa Otogar A
```
- Help response modeli: `AnnouncementModel[]`
- Help response alanları: `Id` (integer), `Metin` (string), `MetinIng` (string), `Tipi` (integer), `BitisTarihi` (date), `Link` (string), `Baslik` (string), `BaslikIng` (string), `Koordinat` (string), `Oncelik` (integer), `KameraId` (integer), `GirisTarihi` (date), `xKoordinat` (string), `yKoordinat` (string), `TimeDiff` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "Id": 1,
    "Metin": "sample string 2",
    "MetinIng": "sample string 3",
    "Tipi": 4,
    "BitisTarihi": "2026-03-11T17:15:49.8558435+03:00",
    "Link": "sample string 6",
    "Baslik": "sample string 7",
    "BaslikIng": "sample string 8",
    "Koordinat": "sample string 9",
    "Oncelik": 10,
    "KameraId": 11,
    "GirisTarihi": "2026-03-11T17:15:49.8558435+03:00",
    "xKoordinat": "sample string 13",
    "yKoordinat": "sample string 14",
    "TimeDiff": 15
  },
  {
    "Id": 1,
    "Metin": "sample string 2",
    "MetinIng": "sample string 3",
    "Tipi": 4,
    "BitisTarihi": "2026-03-11T17:15:49.8558435+03:00",
    "Link": "sample string 6",
    "Baslik": "sample string 7",
    "BaslikIng": "sample string 8",
    "Koordinat": "sample string 9",
    "Oncelik": 10,
    "KameraId": 11,
    "GirisTarihi": "2026-03-11T17:15:49.8558435+03:00",
    "xKoordinat": "sample string 13",
    "yKoordinat": "sample string 14",
    "TimeDiff": 15
  }
]
```

### `GET /api/IntensityMap/v1/ElectChargeStations`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-ElectChargeStations>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/ElectChargeStations`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/ElectChargeStations'
```
- Canlı örnek çıktı:
```json
[{"StationNo":10000,"StationName":"Eşarj - Akasya AVM, Acıbadem","Xcoord":"29.054344","Ycoord":"41.000813","Weekdays":"10:00-22:00","Weekend":"10:00-22:00","StationModel":"22kW","SocketInfo":"AC3-380V-32A","Address":"Ankara Devlet Yolu, Haydar Paşa Yönü, 4. km, Acıbadem Mah., Çeçen Sokak, Üsküdar"},{"StationNo":10001,"StationName":"Eşarj - Akbatı AVM, Esenyurt","Xcoord":"28.667032","Ycoord":"41.055676","Weekdays":"10:00-22:00","Weekend":"10:00-22:00","StationModel":"22kW","SocketInfo":"AC3-380V-32A","Address":"Akbatı Alışveriş ve Yaşam Merkezi, Sanayi Mah. 1655 Sok. No:6, Esenyurt"},{"StationNo":10002,"StationName":"Eşarj - ASF Otomotiv, Kartal","Xcoord":"29.17877","Ycoord":"40.917294","Weekdays":"24 Saat","Weekend":"24 Saat","StationModel":"22kW","SocketInfo":"AC3-380V-32A","Address":"E-5 Yanyol Pamukkale Sok. No: 2, Soğanlık, Kartal"},{"StationNo":10004,"StationName":"Eşarj - Buyaka AVM, Ümraniye","Xcoord":"29.127829","Ycoord":"41.026535","Weekdays":"10:00-22:00","Weekend":"10:00-22:00","StationModel":"45kW,22kW","SocketInfo":"DC-500V-125A, DC-500V-120A, AC3-380V-32A","Address":"Fatih Sultan Mehmet Mah. Balkan Cad. No:56, Ümraniye"},{"StationNo":10006,"StationName":"Eşarj - Flyinn AVM, Florya","Xcoord":"28.804192","Ycoord":"40.972824","Weekdays":"10:00-22:00","Weekend":"10:00-22:00","StationModel":"22kW","SocketInfo":"AC3-380V-32A","Address":"Şenlikköy Mah. Harman Sok. No:48, Florya"},{"StationNo":10007,"StationName":"Eşarj - Gayrettepe Taşyapı - Özgün Katlı Otopark","Xcoord":"29.002472","Ycoord":"41.064011","Weekdays":"24 Saat","Weekend":"24 Saat","StationModel":"22kW","SocketInfo":"AC3-380V-32A","Address":"Gayrettepe Mah., Girne Sok., No:1, Beşiktaş"},{"StationNo":10008,"StationName":"Eşarj - Hilton İstanbul Bomonti Hotel and Conference Center","Xcoord":"28.979471","Ycoord":"41.058296","Weekdays":"24 Saat","Weekend":"24 Saat","StationModel":"22kW","SocketInfo":"AC3-380V-32A","Address":"Silahşör Cad. No:42, Bomonti, Şişli"},{"StationNo":10009,"StationName":"Eşarj - İspark, Balmumcu","Xcoord":"29.010958","Ycoord":"41.063892","Weekdays":"24 Saat","Weekend":"24 Saat","StationModel":"22kW","SocketInfo":"AC3-380V-32A","Address":"İrfan Baştuğ Paşa Cad. Balmumcu, Beşiktaş"},{"StationNo":10010,"StationName":"Eşarj - Kanyon AVM, Levent","Xcoord":"29.01131","Ycoord":"41.078184","Weekdays":"10:00-22:00","Weekend":"10:00-22:00","StationModel":"22kW","SocketInfo":"AC3-380V-32A","Address":"Kanyon Alışveriş Merkezi, Esentepe Mah. Büyükdere Caddesi, No:185, Esentepe, Şişli"},{"StationNo":10011,"StationName":"Eşarj - Maltepe Park AVM, İstanbul","Xcoord":"29.164553","Ycoord":"40.919983","Weekdays":"10:00-22:00","Weekend":"10:00-22:00","StationModel":"22kW","SocketInfo":"AC3-380V-32A","Address":"Cevizli Mah., Tugay Yolu, No:67, Maltepe"},{"StationNo":10012,"StationName":"Eşarj - Optimum, Ataşehir","Xcoord":"29.085714","Ycoord":"40.988682","Weekdays":"10:00-22:00","Weekend":"10:00-22:00","StationModel":"22kW","SocketInfo":"AC3-380V-32A","Address":"Yenisahra Mah. 
```
- Help response modeli: `ElectChargeStationsModel[]`
- Help response alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string), `Weekdays` (string), `Weekend` (string), `StationModel` (string), `SocketInfo` (string), `Address` (string)
- Help örnek response gövdesi:
```json
[
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4",
    "Weekdays": "sample string 5",
    "Weekend": "sample string 6",
    "StationModel": "sample string 7",
    "SocketInfo": "sample string 8",
    "Address": "sample string 9"
  },
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4",
    "Weekdays": "sample string 5",
    "Weekend": "sample string 6",
    "StationModel": "sample string 7",
    "SocketInfo": "sample string 8",
    "Address": "sample string 9"
  }
]
```

### `GET /api/IntensityMap/v1/HavaIstStations`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-HavaIstStations>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/HavaIstStations`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/HavaIstStations'
```
- Canlı örnek çıktı:
```json
[{"StationNo":1,"StationName":"ARNAVUTKÖY BELEDİYE","Xcoord":"28.7208579999687","Ycoord":"41.185158001469603"},{"StationNo":2,"StationName":"ARNAVUTKÖY PERONLAR","Xcoord":"28.750063971156901","Ycoord":"41.178379970684901"},{"StationNo":3,"StationName":"ARNAVUTKÖY BELEDİYESİ","Xcoord":"28.7206039999697","Ycoord":"41.185303001470203"},{"StationNo":4,"StationName":"TAŞOLUK PERONLAR","Xcoord":"28.714277999969401","Ycoord":"41.2103670014748"},{"StationNo":5,"StationName":"İSTANBUL HAVALİMANI","Xcoord":"28.739410020034999","Ycoord":"41.260300018336501"},{"StationNo":6,"StationName":"KOZYATAĞI METRO","Xcoord":"29.099218999980302","Ycoord":"40.976064001432597"},{"StationNo":7,"StationName":"KOZYATAĞI METRO","Xcoord":"29.099238999980301","Ycoord":"40.975718001432497"},{"StationNo":8,"StationName":"MAHMUTBEY METRO","Xcoord":"28.830635999973499","Ycoord":"41.054848001446601"},{"StationNo":9,"StationName":"15 TEMMUZ MAH.","Xcoord":"28.820109999999701","Ycoord":"41.045137999999803"},{"StationNo":10,"StationName":"15 TEMMUZ MAH.","Xcoord":"28.821024999973201","Ycoord":"41.044371001444603"},{"StationNo":11,"StationName":"ŞİRİNEVLER","Xcoord":"28.8446929999741","Ycoord":"40.992086001435297"},{"StationNo":12,"StationName":"KULELİ","Xcoord":"28.835026995098701","Ycoord":"40.992685016293997"},{"StationNo":13,"StationName":"ŞİRİNEVLER","Xcoord":"28.845105038368601","Ycoord":"40.991471986080001"},{"StationNo":14,"StationName":"ATAKÖY 4.KISIM","Xcoord":"28.856917999974399","Ycoord":"40.985085001434001"},{"StationNo":15,"StationName":"ATAKÖY 4.KISIM","Xcoord":"28.8568559999744","Ycoord":"40.985678001434103"},{"StationNo":16,"StationName":"KULELİ","Xcoord":"28.836056999973898","Ycoord":"40.9919080014351"},{"StationNo":17,"StationName":"BAKIRKÖY İDO İSKELESİ","Xcoord":"28.876182999975001","Ycoord":"40.974504001432102"},{"StationNo":18,"StationName":"BAKIRKÖY İDO İSKELESİ","Xcoord":"28.876211999974998","Ycoord":"40.974112001431997"},{"StationNo":19,"StationName":"BAHÇEŞEHİR MERKEZ","Xcoord":"28.687682999969301","Ycoord":"41.062218001447597"},{"StationNo":20,"StationName":"MERKEZ KAYAŞEHİR","Xcoord":"28.7587349999712","Ycoord":"41.107021001455998"},{"StationNo":21,"StationName":"MERKEZ KAYAŞEHİR","Xcoord":"28.758947999971198","Ycoord":"41.107239001456001"},{"StationNo":22,"StationName":"DEMİRCİLER SİTESİ","Xcoord":"28.806820046683999","Ycoord":"41.064536044941597"},{"StationNo":23,"StationName":"DEMİRCİLER SİTESİ","Xcoord":"28.805314999972701","Ycoord":"41.064704001448298"},{"StationNo":24,"StationName":"BAŞAKŞEHİR METROKENT","Xcoord":"28.8009959999724","Ycoord":"41.108330001456203"},{"StationNo":25,"StationName":"OTOGAR YOLU","Xcoord":"28.891491999975099","Ycoord":"41.0369500014435"},{"StationNo":26,"StationName":"OTOGAR","Xcoord":"28.894035981031099","Ycoord":"41.040763003888699"},{"StationNo":27,"StationName":"4.LEVENT","Xcoord":"29.007013009391301","Ycoord":"41.087517009120802"},{"StationNo":28,"StationName":"ZİNCİRLİKUYU METROBÜS","Xcoord":"29.0140370118975","Ycoord":
```
- Help response modeli: `HavaIstStationsModel[]`
- Help response alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string)
- Help örnek response gövdesi:
```json
[
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4"
  },
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4"
  }
]
```

### `GET /api/IntensityMap/v1/Junction`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Junction>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Junction`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Junction'
```
- Canlı örnek çıktı:
```json
[{"JunctionNo":2001,"JunctionName":"AVCILAR İETT","CountyId":14,"JunctionType":0,"XCoord":"28.723816573619843","YCoord":"40.98635112963187","JunctionNewNo":"02-001"},{"JunctionNo":2002,"JunctionName":"İ. ÜNİVERSİTESİ AVCILAR KAMPÜSÜ","CountyId":14,"JunctionType":0,"XCoord":"28.7221949","YCoord":"40.9888212","JunctionNewNo":"02-002"},{"JunctionNo":2003,"JunctionName":"ORTANCA SOKAK","CountyId":14,"JunctionType":1,"XCoord":"28.719136118888855","YCoord":"40.99056238773209","JunctionNewNo":"02-003"},{"JunctionNo":2004,"JunctionName":"AVCILAR BORUSAN","CountyId":14,"JunctionType":0,"XCoord":"28.71734851","YCoord":"40.99274889","JunctionNewNo":"02-004"},{"JunctionNo":2005,"JunctionName":"AVCILAR BAĞCI SOKAK","CountyId":14,"JunctionType":0,"XCoord":"28.71579269","YCoord":"40.99470213","JunctionNewNo":"02-005"},{"JunctionNo":2006,"JunctionName":"AVCILAR URAN CAD.","CountyId":14,"JunctionType":0,"XCoord":"28.71372738","YCoord":"40.99772958","JunctionNewNo":"02-006"},{"JunctionNo":2007,"JunctionName":"AVCILAR MAREŞAL CADDESİ","CountyId":14,"JunctionType":0,"XCoord":"28.71160404","YCoord":"41.00116641","JunctionNewNo":"02-007"},{"JunctionNo":2008,"JunctionName":"ORHANGAZİ YAYA","CountyId":14,"JunctionType":0,"XCoord":"28.7099238","YCoord":"41.00269445","JunctionNewNo":"02-008"},{"JunctionNo":2009,"JunctionName":"BEYOĞLU SOKAK","CountyId":14,"JunctionType":0,"XCoord":"28.7069093","YCoord":"41.00511379","JunctionNewNo":"02-009"},{"JunctionNo":2010,"JunctionName":"AVCILAR YILDIRIM BEYAZIT CAD.","CountyId":14,"JunctionType":0,"XCoord":"28.7047682","YCoord":"41.00699533","JunctionNewNo":"02-010"},{"JunctionNo":2011,"JunctionName":"KAZIM KARABEKİR CAD","CountyId":14,"JunctionType":1,"XCoord":"28.70143818","YCoord":"41.00982181","JunctionNewNo":"02-011"},{"JunctionNo":2012,"JunctionName":"AVCILAR FİRİZKÖY SANAYİ SİTESİ","CountyId":14,"JunctionType":1,"XCoord":"28.69683086872101","YCoord":"41.0124262354501","JunctionNewNo":"02-012"},{"JunctionNo":2013,"JunctionName":"AVCILAR İTFAİYE","CountyId":14,"JunctionType":0,"XCoord":"28.71264565","YCoord":"40.99352332","JunctionNewNo":"02-013"},{"JunctionNo":2015,"JunctionName":"Y.BEYAZID CAD-İSTİKLAL CAD..","CountyId":14,"JunctionType":0,"XCoord":"28.70115888","YCoord":"41.00341195","JunctionNewNo":"02-015"},{"JunctionNo":2016,"JunctionName":"KARADUT SOKAK","CountyId":14,"JunctionType":0,"XCoord":"28.70225377","YCoord":"41.00452209","JunctionNewNo":"02-016"},{"JunctionNo":2017,"JunctionName":"AVCILAR HASAN ÖNAL CAD","CountyId":14,"JunctionType":0,"XCoord":"28.70351646","YCoord":"41.0163869","JunctionNewNo":"02-017"},{"JunctionNo":2018,"JunctionName":"GÜMÜŞPALA İLKOKULU","CountyId":14,"JunctionType":0,"XCoord":"28.73497433","YCoord":"40.98116983","JunctionNewNo":"02-018"},{"JunctionNo":2019,"JunctionName":"AVCILAR İBB SOSYAL TESİSL","CountyId":14,"JunctionType":0,"XCoord":"28.74279788","YCoord":"40.97649505","JunctionNewNo":"02-019"},{"JunctionNo":2020,"JunctionName":"AVCILAR FATİH CADDESİ","CountyId":14,"JunctionType":0,"XC
```
- Help response modeli: `JunctionModel[]`
- Help response alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `CountyId` (integer): JunctionNo : Sinyalize Ilce Numarası, `JunctionType` (integer): JunctionType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara)
- Help örnek response gövdesi:
```json
[
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "CountyId": 3,
    "JunctionType": 4,
    "XCoord": "sample string 5",
    "YCoord": "sample string 6",
    "JunctionNewNo": "sample string 7"
  },
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "CountyId": 3,
    "JunctionType": 4,
    "XCoord": "sample string 5",
    "YCoord": "sample string 6",
    "JunctionNewNo": "sample string 7"
  }
]
```

### `POST /api/IntensityMap/v1/MultiRouting`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-IntensityMap-v1-MultiRouting>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/MultiRouting`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/MultiRouting'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/MultiRouting' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "CommaSeperatedSensorList": "sample string 1",
  "Method": 64,
  "Quality": 64
}'
```
- Help request modeli: `TravelTimeMultipleRequestModel`
- Help request alanları: `CommaSeperatedSensorList` (string, Required), `Method` (byte, Required), `Quality` (byte, Required)
- Help örnek request gövdesi:
```json
{
  "CommaSeperatedSensorList": "sample string 1",
  "Method": 64,
  "Quality": 64
}
```
- Help response modeli: `TravelTimeModel`
- Help response alanları: `RouteList` (Collection of TravelTimeRoute), `GeoList` (Collection of TravelTimeSegment), `Color` (string), `Distance` (decimal number), `TravelTime` (decimal number)
- Help örnek response gövdesi:
```json
{
  "RouteList": [
    {
      "RouteID": "sample string 1",
      "RouteName": "sample string 2"
    },
    {
      "RouteID": "sample string 1",
      "RouteName": "sample string 2"
    }
  ],
  "GeoList": [
    {
      "vctID": 1,
      "Geo": "sample string 2"
    },
    {
      "vctID": 1,
      "Geo": "sample string 2"
    }
  ],
  "Color": "sample string 1",
  "Distance": 2.1,
  "TravelTime": 3.1
}
```

### `GET /api/IntensityMap/v1/Parking`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Parking>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Parking`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Parking'
```
- Canlı örnek çıktı:
```json
[{"PLotId":1,"PLotName":"VALİ KONAĞI CADDESİ 5 (İSPARK)","PLotCapasity":30,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":false,"PLotAvailableCount":13,"PLotAvailableRate":43,"PLotUpToDateStatus":-120,"PLotDate":"2025-06-14T18:08:17","PLotLatitude":"41.0479","PLotLongitude":"28.9875","PLotLocation":"0028 Şişli Vali Konağı Caddesi","PLotAddress":"Tesis Önü","PLotDistrict":"","PWorkingHours":"08:00-19:00"},{"PLotId":2,"PLotName":"VALİ KONAĞI CADDESİ 4 (İSPARK)","PLotCapasity":50,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":true,"PLotAvailableCount":1,"PLotAvailableRate":2,"PLotUpToDateStatus":0,"PLotDate":"2026-03-11T17:22:22","PLotLatitude":"41.0478","PLotLongitude":"28.9874","PLotLocation":"0028 Şişli Vali Konağı Caddesi","PLotAddress":"VALİ KONAĞI CADDESİ","PLotDistrict":"","PWorkingHours":"08:00-19:00"},{"PLotId":3,"PLotName":"VALİ KONAĞI CADDESİ 3 (İSPARK)","PLotCapasity":50,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":false,"PLotAvailableCount":50,"PLotAvailableRate":100,"PLotUpToDateStatus":-120,"PLotDate":"2025-11-28T23:39:58","PLotLatitude":"41.0553295330499","PLotLongitude":"28.9957386934589","PLotLocation":"0028 Şişli Vali Konağı Caddesi","PLotAddress":"VALİ KONAĞI CADDESİ","PLotDistrict":"ŞİŞLİ","PWorkingHours":"08:00-19:00"},{"PLotId":4,"PLotName":"VALİ KONAĞI CADDESİ 2 (İSPARK)","PLotCapasity":50,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":true,"PLotAvailableCount":10,"PLotAvailableRate":20,"PLotUpToDateStatus":-120,"PLotDate":"2016-11-19T15:50:31","PLotLatitude":"41.0548022013965","PLotLongitude":"28.9951683107361","PLotLocation":"0028 Şişli Vali Konağı Caddesi","PLotAddress":"ARAS KARGO ","PLotDistrict":"ŞİŞLİ","PWorkingHours":"08:00-19:00"},{"PLotId":5,"PLotName":"VALİ KONAĞI CADDESİ 1 (İSPARK)","PLotCapasity":50,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":true,"PLotAvailableCount":0,"PLotAvailableRate":100,"PLotUpToDateStatus":-120,"PLotDate":"2016-12-17T18:56:25","PLotLatitude":"41.0541925230339","PLotLongitude":"28.9944408349023","PLotLocation":"0028 Şişli Vali Konağı Caddesi","PLotAddress":"HÜRTUR ÖNÜ","PLotDistrict":"","PWorkingHours":"08:00-19:00"},{"PLotId":12,"PLotName":"BEYOĞLU İNÖNÜ CADDESİ 2 (İSPARK)","PLotCapasity":30,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":true,"PLotAvailableCount":30,"PLotAvailableRate":100,"PLotUpToDateStatus":-120,"PLotDate":"2025-03-10T08:00:17","PLotLatitude":"41.0370569334272","PLotLongitude":"28.9917734743058","PLotLocation":"0277 İnönü Caddesi","PLotAddress":"BEYOĞLU","PLotDistrict":"BEYOĞLU","PWorkingHours":"08:00-20:00"},{"PLotId":13,"PLotName":"BEYOĞLU İNÖNÜ CADDESİ 4 (İSPARK)","PLotCapasity":30,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":true,"PLotAvailableCount":10,"PLotAvailableRate":33,
```
- Help response modeli: `ParkingInfo[]`
- Help response alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotSortId` (integer), `PLotSort` (string), `PLotIspark` (boolean), `PLotComp` (string), `PLotIsOpen` (boolean), `PLotAvailableCount` (integer), `PLotAvailableRate` (integer), `PLotUpToDateStatus` (integer), `PLotDate` (date), `PLotLatitude` (string), `PLotLongitude` (string), `PLotLocation` (string), `PLotAddress` (string), `PLotDistrict` (string), `PWorkingHours` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotSortId": 4,
    "PLotSort": "sample string 5",
    "PLotIspark": true,
    "PLotComp": "sample string 7",
    "PLotIsOpen": true,
    "PLotAvailableCount": 9,
    "PLotAvailableRate": 10,
    "PLotUpToDateStatus": 11,
    "PLotDate": "2026-03-11T17:15:49.918345+03:00",
    "PLotLatitude": "sample string 13",
    "PLotLongitude": "sample string 14",
    "PLotLocation": "sample string 15",
    "PLotAddress": "sample string 16",
    "PLotDistrict": "sample string 17",
    "PWorkingHours": "sample string 18"
  },
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotSortId": 4,
    "PLotSort": "sample string 5",
    "PLotIspark": true,
    "PLotComp": "sample string 7",
    "PLotIsOpen": true,
    "PLotAvailableCount": 9,
    "PLotAvailableRate": 10,
    "PLotUpToDateStatus": 11,
    "PLotDate": "2026-03-11T17:15:49.918345+03:00",
    "PLotLatitude": "sample string 13",
    "PLotLongitude": "sample string 14",
    "PLotLocation": "sample string 15",
    "PLotAddress": "sample string 16",
    "PLotDistrict": "sample string 17",
    "PWorkingHours": "sample string 18"
  }
]
```

### `GET /api/IntensityMap/v1/POI`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-POI>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/POI`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/POI'
```
- Canlı örnek çıktı:
```json
[{"ID":50,"TI":1,"TN":"Hastane","PN":"Pendik Devlet Hastanesi","LT":"40.87725464","LN":"29.22966111","PU":"","SM":true},{"ID":51,"TI":1,"TN":"Hastane","PN":"Deri Ve Tenasül Hastalıkları Hastanesi","LT":"41.00646353","LN":"28.98471048","PU":"","SM":true},{"ID":52,"TI":1,"TN":"Hastane","PN":"Beşiktaş Verem Savaş Dispanseri","LT":"41.04294613","LN":"29.00292903","PU":"","SM":true},{"ID":53,"TI":1,"TN":"Hastane","PN":"Kumkapı Verem Savaş Dispanseri","LT":"41.00621322","LN":"28.95966966","PU":"","SM":true},{"ID":54,"TI":1,"TN":"Hastane","PN":"Sultanahmet Verem Savaş Dispanseri","LT":"41.00683349","LN":"28.97260432","PU":"","SM":true},{"ID":55,"TI":1,"TN":"Hastane","PN":"T.C.D.D. Yakacık Hastanesi","LT":"40.91826017","LN":"29.22005662","PU":"","SM":true},{"ID":56,"TI":1,"TN":"Hastane","PN":"İstanbul Esnaf Hastanesi","LT":"41.01406872","LN":"28.96207818","PU":"","SM":true},{"ID":57,"TI":1,"TN":"Hastane","PN":"S.S.Y.B.Verem Savaş Daire Başkanlığı","LT":"41.02060941","LN":"28.95748146","PU":"","SM":true},{"ID":58,"TI":1,"TN":"Hastane","PN":"Güngören Verem Savaş Dispanseri","LT":"41.0256975","LN":"28.87059318","PU":"","SM":true},{"ID":59,"TI":1,"TN":"Hastane","PN":"Acil Yardım Ve Kurtarma İstasyonu","LT":"41.01145444","LN":"28.83459214","PU":"","SM":true},{"ID":60,"TI":1,"TN":"Hastane","PN":"Türkiye Denizcilik İşletmeleri Hastanesi","LT":"41.02408401","LN":"28.97949379","PU":"","SM":true},{"ID":61,"TI":1,"TN":"Hastane","PN":"Şişli Verem Savaş Dispanseri","LT":"41.05274889","LN":"28.98097787","PU":"","SM":true},{"ID":62,"TI":1,"TN":"Hastane","PN":"Şehremini Verem  Dispanseri","LT":"41.01662799","LN":"28.93369637","PU":"","SM":true},{"ID":63,"TI":1,"TN":"Hastane","PN":"Adalet Bakanlığı Adli Tıp Kurumu","LT":"41.00525027","LN":"28.93702966","PU":"","SM":true},{"ID":64,"TI":1,"TN":"Hastane","PN":"Bakırköy Devlet Hastanesi","LT":"40.99386437","LN":"28.86480246","PU":"","SM":true},{"ID":65,"TI":1,"TN":"Hastane","PN":"Bakırköy Ruh Ve Sinir Hastalıkları Hastanesi","LT":"40.98694577","LN":"28.86082154","PU":"","SM":true},{"ID":66,"TI":1,"TN":"Hastane","PN":"Baltalimanı Kemik Hastalıkları Hastanesi","LT":"41.09637156","LN":"29.05345778","PU":"","SM":true},{"ID":67,"TI":1,"TN":"Hastane","PN":"Beykoz Çocuk Göğüs Hastalıkları Hastanesi","LT":"41.13798138","LN":"29.0814205","PU":"","SM":true},{"ID":68,"TI":1,"TN":"Hastane","PN":"Beykoz Devlet Hastanesi","LT":"41.11060973","LN":"29.08609995","PU":"","SM":true},{"ID":69,"TI":1,"TN":"Hastane","PN":"Beyoğlu Göz Eğitim Ve Araştırma Hastanesi","LT":"41.02474564","LN":"28.9738954","PU":"","SM":true},{"ID":70,"TI":1,"TN":"Hastane","PN":"Çamlıca Göğüs Hastalıkları Askeri Hastanesi","LT":"41.00762433","LN":"29.05558486","PU":"","SM":true},{"ID":71,"TI":1,"TN":"Hastane","PN":"Dz. Kuv. K. İstanbul Deniz Hastanesi","LT":"41.03318038","LN":"28.96357362","PU":"","SM":true},{"ID":72,"TI":1,"TN":"Hastane","PN":"Fatih Verem Savaş Dispanseri","LT":"41.02551615","LN":"28.94062746","PU":"","SM":true},{"ID":73,"TI":1,"TN":"Hastane","PN":"Gül
```
- Help response modeli: `POI[]`
- Help response alanları: `ID` (integer), `TI` (integer), `TN` (string), `PN` (string), `LT` (string), `LN` (string), `PU` (string), `SM` (boolean)
- Help örnek response gövdesi:
```json
[
  {
    "ID": 1,
    "TI": 2,
    "TN": "sample string 3",
    "PN": "sample string 4",
    "LT": "sample string 5",
    "LN": "sample string 6",
    "PU": "sample string 7",
    "SM": true
  },
  {
    "ID": 1,
    "TI": 2,
    "TN": "sample string 3",
    "PN": "sample string 4",
    "LT": "sample string 5",
    "LN": "sample string 6",
    "PU": "sample string 7",
    "SM": true
  }
]
```

### `GET /api/IntensityMap/v1/RouteTravelTime`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-RouteTravelTime>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/RouteTravelTime`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/RouteTravelTime'
```
- Canlı örnek çıktı:
```json
[{"DirectionId":1,"Direction":"Avrupa - Anadolu","WayList":[{"WayCode":"1_1","WayId":1,"Way":"D100","RouteList":[{"RouteCode":"129_126","Source":"Beylikdüzü","Destination":"Avcılar","TravelTime":"","Distance":"7,90","Date":"2026-03-11T17:21:55"},{"RouteCode":"126_3","Source":"Avcılar","Destination":"Sefaköy","TravelTime":"","Distance":"9,30","Date":"2026-03-11T17:21:55"},{"RouteCode":"3_120","Source":"Sefaköy","Destination":"Şirinevler","TravelTime":"","Distance":"4,10","Date":"2026-03-11T17:21:55"},{"RouteCode":"120_117","Source":"Şirinevler","Destination":"Topkapı","TravelTime":"","Distance":"7,20","Date":"2026-03-11T17:21:55"},{"RouteCode":"117_110","Source":"Topkapı","Destination":"Çağlayan","TravelTime":"","Distance":"6,60","Date":"2026-03-11T17:21:55"},{"RouteCode":"110_108","Source":"Çağlayan","Destination":"Zincirlikuyu","TravelTime":"","Distance":"2,70","Date":"2026-03-11T17:21:55"},{"RouteCode":"108_76","Source":"Zincirlikuyu","Destination":"Altunizade","TravelTime":"","Distance":"6,40","Date":"2026-03-11T17:21:55"},{"RouteCode":"76_81","Source":"Altunizade","Destination":"Söğütlüçeşme","TravelTime":"","Distance":"4,90","Date":"2026-03-11T17:21:55"},{"RouteCode":"79_37","Source":"Uzunçayır","Destination":"Kozyatağı","TravelTime":"","Distance":"5,30","Date":"2026-03-11T17:21:55"},{"RouteCode":"37_66","Source":"Kozyatağı","Destination":"Kartal","TravelTime":"","Distance":"12,80","Date":"2026-03-11T17:21:55"}]},{"WayCode":"1_2","WayId":2,"Way":"TEM","RouteList":[{"RouteCode":"152_146","Source":"Selimpaşa","Destination":"Bahçeşehir","TravelTime":"","Distance":"31,90","Date":"2026-03-11T17:21:55"},{"RouteCode":"146_7","Source":"Bahçeşehir","Destination":"Mahmutbey Gişeler","TravelTime":"","Distance":"9,60","Date":"2026-03-11T17:21:55"},{"RouteCode":"7_269","Source":"Mahmutbey Gişeler","Destination":"Tekstilkent","TravelTime":"","Distance":"6,60","Date":"2026-03-11T17:21:55"},{"RouteCode":"7_169","Source":"Mahmutbey Gişeler","Destination":"Topkapı","TravelTime":"","Distance":"11,10","Date":"2026-03-11T17:21:55"},{"RouteCode":"269_16","Source":"Tekstilkent","Destination":"Hasdal","TravelTime":"","Distance":"9,00","Date":"2026-03-11T17:21:55"},{"RouteCode":"16_23","Source":"Hasdal","Destination":"FSM Avrupa Çıkışı","TravelTime":"","Distance":"7,50","Date":"2026-03-11T17:21:55"},{"RouteCode":"23_24","Source":"FSM Avrupa Çıkışı","Destination":"Kavacık","TravelTime":"","Distance":"2,70","Date":"2026-03-11T17:21:55"},{"RouteCode":"24_208","Source":"Kavacık","Destination":"Kozyatağı","TravelTime":"","Distance":"14,90","Date":"2026-03-11T17:21:55"},{"RouteCode":"24_34","Source":"Kavacık","Destination":"Ataşehir","TravelTime":"","Distance":"12,90","Date":"2026-03-11T17:21:55"},{"RouteCode":"76_36","Source":"Altunizade","Destination":"Ataşehir","TravelTime":"","Distance":"6,60","Date":"2026-03-11T17:21:55"},{"RouteCode":"36_52","Source":"Ataşehir","Destination":"Çamlıca Gişeler","TravelTime":"","Distance":"4,80","Date":"2026-03-11T17:21:55"},{"RouteCod
```
- Help response modeli: `RouteTravelTime[]`
- Help response alanları: `DirectionId` (integer), `Direction` (string), `WayList` (Collection of WayItem)
- Help örnek response gövdesi:
```json
[
  {
    "DirectionId": 1,
    "Direction": "sample string 2",
    "WayList": [
      {
        "WayCode": "sample string 1",
        "WayId": 2,
        "Way": "sample string 3",
        "RouteList": [
          {
            "RouteCode": "sample string 1",
            "Source": "sample string 2",
            "Destination": "sample string 3",
            "TravelTime": "sample string 4",
            "Distance": "sample string 5",
            "Date": "2026-03-11T17:15:49.918345+03:00"
          },
          {
            "RouteCode": "sample string 1",
            "Source": "sample string 2",
            "Destination": "sample string 3",
            "TravelTime": "sample string 4",
            "Distance": "sample string 5",
            "Date": "2026-03-11T17:15:49.918345+03:00"
          }
        ]
      },
      {
        "WayCode": "sample string 1",
        "WayId": 2,
        "Way": "sample string 3",
        "RouteList": [
          {
            "RouteCode": "sample string 1",
            "Source": "sample string 2",
            "Destination": "sample string 3",
            "TravelTime": "sample string 4",
            "Distance": "sample string 5",
            "Date": "2026-03-11T17:15:49.918345+03:00"
          },
          {
            "RouteCode": "sample string 1",
            "Source": "sample string 2",
            "Destination": "sample string 3",
            "TravelTime": "sample string 4",
            "Distance": "sample string 5",
            "Date": "2026-03-11T17:15:49.918345+03:00"
          }
        ]
      }
    ]
  },
  {
    "DirectionId": 1,
    "Direction": "sample string 2",
    "WayList": [
      {
        "WayCode": "sample string 1",
        "WayId": 2,
        "Way": "sample string 3",
        "RouteList": [
          {
            "RouteCode": "sample string 1",
            "Source": "sample string 2",
            "Destination": "sample string 3",
            "TravelTime": "sample string 4",
            "Distance": "sample string 5",
            "Date": "2026-03-11T17:15:49.918345+03:00"
          },
          {
            "RouteCode": "sample string 1",
            "Source": "sample string 2",
            "Destination": "sample string 3",
            "TravelTime": "sample string 4",
            "Distance": "sample string 5",
            "Date": "2026-03-11T17:15:49.918345+03:00"
          }
        ]
      },
      {
        "WayCode": "sample string 1",
        "WayId": 2,
        "Way": "sample string 3",
        "RouteList": [
          {
            "RouteCode": "sample string 1",
            "Source": "sample string 2",
            "Destination": "sample string 3",
            "TravelTime": "sample string 4",
            "Distance": "sample string 5",
            "Date": "2026-03-11T17:15:49.918345+03:00"
          },
          {
            "RouteCode": "sample string 1",
            "Source": "sample string 2",
            "Destination": "sample string 3",
            "TravelTime": "sample string 4",
            "Distance": "sample string 5",
            "Date": "2026-03-11T17:15:49.918345+03:00"
          }
        ]
      }
    ]
  }
]
```

### `POST /api/IntensityMap/v1/Routing`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-IntensityMap-v1-Routing>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Routing`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Routing'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Routing' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Source": 1,
  "Destination": 2,
  "Method": 64,
  "Quality": 64
}'
```
- Help request modeli: `TravelTimeRequestModel`
- Help request alanları: `Source` (integer, Required), `Destination` (integer, Required), `Method` (byte, Required), `Quality` (byte, Required)
- Help örnek request gövdesi:
```json
{
  "Source": 1,
  "Destination": 2,
  "Method": 64,
  "Quality": 64
}
```
- Help response modeli: `TravelTimeModel`
- Help response alanları: `RouteList` (Collection of TravelTimeRoute), `GeoList` (Collection of TravelTimeSegment), `Color` (string), `Distance` (decimal number), `TravelTime` (decimal number)
- Help örnek response gövdesi:
```json
{
  "RouteList": [
    {
      "RouteID": "sample string 1",
      "RouteName": "sample string 2"
    },
    {
      "RouteID": "sample string 1",
      "RouteName": "sample string 2"
    }
  ],
  "GeoList": [
    {
      "vctID": 1,
      "Geo": "sample string 2"
    },
    {
      "vctID": 1,
      "Geo": "sample string 2"
    }
  ],
  "Color": "sample string 1",
  "Distance": 2.1,
  "TravelTime": 3.1
}
```

### `GET /api/IntensityMap/v1/StaticLayerVersion/{slCode}`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-StaticLayerVersion-slCode>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/StaticLayerVersion/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `slCode` (string, Default value is)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/StaticLayerVersion/1'
```
- Canlı örnek çıktı:
```json
[]
```
- Help response modeli: `StaticLayerVersion[]`
- Help response alanları: `VersionNo` (integer), `TypeCode` (string), `VersionDate` (date)
- Help örnek response gövdesi:
```json
[
  {
    "VersionNo": 1,
    "TypeCode": "sample string 2",
    "VersionDate": "2026-03-11T17:15:49.918345+03:00"
  },
  {
    "VersionNo": 1,
    "TypeCode": "sample string 2",
    "VersionDate": "2026-03-11T17:15:49.918345+03:00"
  }
]
```

### `GET /api/IntensityMap/v1/StaticLayerVersion?slCode={slCode}`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-StaticLayerVersion_slCode>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/StaticLayerVersion?slCode=1`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `slCode` (string, Default value is)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/StaticLayerVersion?slCode=1'
```
- Canlı örnek çıktı:
```json
[]
```
- Help response modeli: `StaticLayerVersion[]`
- Help response alanları: `VersionNo` (integer), `TypeCode` (string), `VersionDate` (date)
- Help örnek response gövdesi:
```json
[
  {
    "VersionNo": 1,
    "TypeCode": "sample string 2",
    "VersionDate": "2026-03-11T17:15:49.918345+03:00"
  },
  {
    "VersionNo": 1,
    "TypeCode": "sample string 2",
    "VersionDate": "2026-03-11T17:15:49.918345+03:00"
  }
]
```

### `POST /api/IntensityMap/v1/ToolBoxMetric`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-IntensityMap-v1-ToolBoxMetric>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/ToolBoxMetric`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/ToolBoxMetric'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/ToolBoxMetric' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "ToolClickID": 1,
  "ToolID": 2,
  "ClickerSource": "sample string 3",
  "LayoutMode": 64,
  "ClickDate": "2026-03-11T17:15:49.9652264+03:00"
}'
```
- Help request modeli: `ToolClickMetric`
- Help request alanları: `ToolClickID` (integer), `ToolID` (integer), `ClickerSource` (string), `LayoutMode` (byte), `ClickDate` (date)
- Help örnek request gövdesi:
```json
{
  "ToolClickID": 1,
  "ToolID": 2,
  "ClickerSource": "sample string 3",
  "LayoutMode": 64,
  "ClickDate": "2026-03-11T17:15:49.9652264+03:00"
}
```
- Help response modeli: Belirtilmemiş.
- Help örnek response gövdesi:
```json
"sample string 1"
```

### `GET /api/IntensityMap/v1/TravelTimePoint`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-TravelTimePoint>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/TravelTimePoint`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/TravelTimePoint'
```
- Canlı örnek çıktı:
```json
[{"SN":73,"SA":"10. Yil Cad. 1","IC":"Fatih","LT":"40.99507976","LN":"28.92096036"},{"SN":194,"SA":"10. Yil Cad. 2","IC":"Fatih","LT":"41.01153925","LN":"28.92177675"},{"SN":171,"SA":"Ahmediye","IC":"Fatih","LT":"41.01165448","LN":"28.94763048"},{"SN":221,"SA":"Akaretler","IC":"Beşiktaş","LT":"41.04175023","LN":"29.00434653"},{"SN":349,"SA":"Alemdag","IC":"Çekmeköy","LT":"41.04218928","LN":"29.27382015"},{"SN":283,"SA":"Alibeyköy","IC":"Eyüpsultan","LT":"41.08370998","LN":"28.95197975"},{"SN":123,"SA":"Altunizade","IC":"Üsküdar","LT":"41.02744924","LN":"29.04607291"},{"SN":257,"SA":"Altunizade","IC":"Üsküdar","LT":"41.02243213","LN":"29.04734233"},{"SN":353,"SA":"Arnavutköy - Habipler Hiz K.Çikis","IC":"Sultangazi","LT":"41.11513706","LN":"28.8448752"},{"SN":290,"SA":"Arnavutköy Devlet Hastanesi","IC":"Arnavutköy","LT":"41.17864996","LN":"28.74688282"},{"SN":242,"SA":"Ataköy 5.Kisim Kav.","IC":"Bakırköy","LT":"40.97637004","LN":"28.85224361"},{"SN":36,"SA":"Atasehir","IC":"Ataşehir","LT":"40.99788675","LN":"29.10964852"},{"SN":333,"SA":"Aydemir Canefe Viyadüğü","IC":"Beykoz","LT":"41.10758438","LN":"29.10916684"},{"SN":359,"SA":"B.Sahilyolu Caddebostan Kadiköy","IC":"Kadıköy","LT":"40.96395834","LN":"29.06514652"},{"SN":315,"SA":"Bagdat Cad. Erenköy","IC":"Kadıköy","LT":"40.96606291","LN":"29.06997262"},{"SN":322,"SA":"Bagdat Cad. Göztepe","IC":"Kadıköy","LT":"40.97148072","LN":"29.05985257"},{"SN":314,"SA":"Baglarbasi","IC":"Üsküdar","LT":"41.0237067","LN":"29.03806307"},{"SN":323,"SA":"Bağdat Cad. Suadiye","IC":"Kadıköy","LT":"40.95857597","LN":"29.08430028"},{"SN":25,"SA":"Bakirköy Sahil","IC":"Bakırköy","LT":"40.97393056","LN":"28.875628"},{"SN":206,"SA":"Bakirköy Tashan","IC":"Bakırköy","LT":"40.98188","LN":"28.88478333"},{"SN":226,"SA":"Balat Hastanesi Önü","IC":"Fatih","LT":"41.03906406","LN":"28.94454493"},{"SN":346,"SA":"Baltalimanı","IC":"Sarıyer","LT":"41.09812996","LN":"29.05276199"},{"SN":214,"SA":"Baltalimani Katilim","IC":"Sarıyer","LT":"41.09606553","LN":"29.04832551"},{"SN":210,"SA":"Basaksehir","IC":"Başakşehir","LT":"41.06794395","LN":"28.81010881"},{"SN":2,"SA":"Basin Ekspres Kuyumcu Kent","IC":"Bahçelievler","LT":"40.99967817","LN":"28.81730776"},{"SN":332,"SA":"Bastabya","IC":"Esenler","LT":"41.08972568","LN":"28.86450895"},{"SN":393,"SA":"Başakşehir 4. Etap 1. Kısım","IC":"Başakşehir","LT":"41.1092","LN":"28.8154"},{"SN":116,"SA":"Bayrampasa Hali Önü","IC":"Bayrampaşa","LT":"41.05091632","LN":"28.88568726"},{"SN":320,"SA":"Bayrampasa Yildirim","IC":"Bayrampaşa","LT":"41.06721157","LN":"28.88147163"},{"SN":169,"SA":"Bayrampaşa","IC":"Bayrampaşa","LT":"41.032356","LN":"28.920355"},{"SN":218,"SA":"Bebek","IC":"Beşiktaş","LT":"41.05326529","LN":"29.03353006"},{"SN":199,"SA":"Besiktas TEM Bagl. Yolu","IC":"Beşiktaş","LT":"41.08585461","LN":"29.01416293"},{"SN":264,"SA":"Beylerbeyi Iskele","IC":"Üsküdar","LT":"41.04443224","LN":"29.04609448"},{"SN":204,"SA":"Bogaziçi Imar Müdürlügü","IC":"Şişli","LT":"41.13601848","LN":"29.025085
```
- Help response modeli: `BTSensor[]`
- Help response alanları: `SN` (integer), `SA` (string), `IC` (string), `LT` (string), `LN` (string)
- Help örnek response gövdesi:
```json
[
  {
    "SN": 1,
    "SA": "sample string 2",
    "IC": "sample string 3",
    "LT": "sample string 4",
    "LN": "sample string 5"
  },
  {
    "SN": 1,
    "SA": "sample string 2",
    "IC": "sample string 3",
    "LT": "sample string 4",
    "LN": "sample string 5"
  }
]
```

### `GET /api/IntensityMap/v1/VmsData/{vmsNo}`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-VmsData-vmsNo>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsData/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `vmsNo` (integer, Default value is 0)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsData/1'
```
- Canlı örnek çıktı:
```json
[
  {
    "SYSTEM_ID": 21,
    "COLUMN_NUMBER": 0,
    "SYSTEM_NAME_VIEW": "AKOM",
    "SYSTEM_NO": 1,
    "ROUTE_NAME_VMS": "HALİÇ",
    "TRF_MSG_ID": 1,
    "CONG_CODE": 1,
    "VIRTUAL_SEG_ID": 11755
  }
]
```
- Help response modeli: `VmsStatusModel[]`
- Help response alanları: `SYSTEM_ID` (integer), `COLUMN_NUMBER` (integer), `SYSTEM_NAME_VIEW` (string), `SYSTEM_NO` (integer), `ROUTE_NAME_VMS` (string), `TRF_MSG_ID` (integer), `CONG_CODE` (integer), `VIRTUAL_SEG_ID` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "SYSTEM_ID": 1,
    "COLUMN_NUMBER": 2,
    "SYSTEM_NAME_VIEW": "sample string 3",
    "SYSTEM_NO": 4,
    "ROUTE_NAME_VMS": "sample string 5",
    "TRF_MSG_ID": 6,
    "CONG_CODE": 7,
    "VIRTUAL_SEG_ID": 8
  },
  {
    "SYSTEM_ID": 1,
    "COLUMN_NUMBER": 2,
    "SYSTEM_NAME_VIEW": "sample string 3",
    "SYSTEM_NO": 4,
    "ROUTE_NAME_VMS": "sample string 5",
    "TRF_MSG_ID": 6,
    "CONG_CODE": 7,
    "VIRTUAL_SEG_ID": 8
  }
]
```

### `GET /api/IntensityMap/v1/VmsData?vmsNo={vmsNo}`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-VmsData_vmsNo>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsData?vmsNo=1`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `vmsNo` (integer, Default value is 0)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsData?vmsNo=1'
```
- Canlı örnek çıktı:
```json
[
  {
    "SYSTEM_ID": 21,
    "COLUMN_NUMBER": 0,
    "SYSTEM_NAME_VIEW": "AKOM",
    "SYSTEM_NO": 1,
    "ROUTE_NAME_VMS": "HALİÇ",
    "TRF_MSG_ID": 1,
    "CONG_CODE": 1,
    "VIRTUAL_SEG_ID": 11755
  }
]
```
- Help response modeli: `VmsStatusModel[]`
- Help response alanları: `SYSTEM_ID` (integer), `COLUMN_NUMBER` (integer), `SYSTEM_NAME_VIEW` (string), `SYSTEM_NO` (integer), `ROUTE_NAME_VMS` (string), `TRF_MSG_ID` (integer), `CONG_CODE` (integer), `VIRTUAL_SEG_ID` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "SYSTEM_ID": 1,
    "COLUMN_NUMBER": 2,
    "SYSTEM_NAME_VIEW": "sample string 3",
    "SYSTEM_NO": 4,
    "ROUTE_NAME_VMS": "sample string 5",
    "TRF_MSG_ID": 6,
    "CONG_CODE": 7,
    "VIRTUAL_SEG_ID": 8
  },
  {
    "SYSTEM_ID": 1,
    "COLUMN_NUMBER": 2,
    "SYSTEM_NAME_VIEW": "sample string 3",
    "SYSTEM_NO": 4,
    "ROUTE_NAME_VMS": "sample string 5",
    "TRF_MSG_ID": 6,
    "CONG_CODE": 7,
    "VIRTUAL_SEG_ID": 8
  }
]
```

### `GET /api/IntensityMap/v1/VmsPoint`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-VmsPoint>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsPoint`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsPoint'
```
- Canlı örnek çıktı:
```json
[{"VmsNo":"1","VmsName":"AKOM","Lat":"41.0788408","Long":"28.9591897","District":"Eyüpsultan","Road":"OKMEYDANI BAĞLANTI YOLU","Width":288,"Height":192},{"VmsNo":"2","VmsName":"BARBAROS","Lat":"41.0483","Long":"29.0082","District":"Beşiktaş","Road":"BARBAROS BULVARI","Width":576,"Height":192},{"VmsNo":"3","VmsName":"ATIŞALANI","Lat":"41.0508","Long":"28.8717","District":"Esenler","Road":"E-6 BAĞLANTI YOLU","Width":256,"Height":80},{"VmsNo":"4","VmsName":"MERTER D100","Lat":"41.0111803066","Long":"28.9028131505","District":"Zeytinburnu","Road":"Cevizlibağ D100","Width":384,"Height":192},{"VmsNo":"9","VmsName":"HAVAALANI","Lat":"40.9875667","Long":"28.81912189","District":"Bakırköy","Road":"Havaalanı E5 Bağlantı Yolu","Width":0,"Height":0},{"VmsNo":"10","VmsName":"KARTAL","Lat":"40.90256118774414","Long":"29.217042922973633","District":"Kartal","Road":"E5 Kartal mevkii","Width":576,"Height":192},{"VmsNo":"11","VmsName":"KOZYATAĞI","Lat":"40.9760974","Long":"29.098867","District":"Kadıköy","Road":"Kozyatağı E5","Width":576,"Height":192},{"VmsNo":"12","VmsName":"KOZYATAĞI MERKEZ","Lat":"40.98067092895508","Long":"29.087987899780273","District":"Kadıköy","Road":"Yeni Sahrayıcedit","Width":384,"Height":192},{"VmsNo":"13","VmsName":"KÜÇÜKÇEKMECE","Lat":"40.9852","Long":"28.7668","District":"Küçükçekmece","Road":"Küçükçekmece D100","Width":384,"Height":192},{"VmsNo":"14","VmsName":"MAHMUTBEY","Lat":"41.060356","Long":"28.843172","District":"Bağcılar","Road":"Kanal D Önü Tem Katılımı","Width":384,"Height":192},{"VmsNo":"15","VmsName":"MASLAK","Lat":"41.1031","Long":"29.0107","District":"Sarıyer","Road":"Maslak Kol Ordu Tem Katılım","Width":384,"Height":192},{"VmsNo":"16","VmsName":"OKMEYDANI","Lat":"41.05184859","Long":"28.95153886","District":"Beyoğlu","Road":"E-5 OKMEYDANI","Width":672,"Height":288},{"VmsNo":"17","VmsName":"OTOGAR","Lat":"41.0365562","Long":"28.8924842","District":"Esenler","Road":"Otogar Karşısı","Width":576,"Height":192},{"VmsNo":"19","VmsName":"TEPEÜSTÜ","Lat":"41.027740478515625","Long":"29.12812042236328","District":"Ümraniye","Road":"Ümraniye FSM Bağlantı Yolu","Width":384,"Height":192},{"VmsNo":"20","VmsName":"UNKAPANI","Lat":"41.020741","Long":"28.959699","District":"Fatih","Road":"Unkapanı İMÇ Önü","Width":384,"Height":192},{"VmsNo":"21","VmsName":"VATAN CADDESİ","Lat":"41.023340","Long":"28.931135","District":"Fatih","Road":"Vatan Caddesi","Width":384,"Height":192},{"VmsNo":"22","VmsName":"BAKIRKÖY","Lat":"40.974801","Long":"28.878235","District":"Bakırköy","Road":"Sahilyolu Zeytinburnu","Width":576,"Height":192},{"VmsNo":"23","VmsName":"PİYALEPAŞA","Lat":"41.0383","Long":"28.9688","District":"Beyoğlu","Road":"KASIMPAŞA- E5","Width":384,"Height":192},{"VmsNo":"24","VmsName":"EDİRNEKAPI","Lat":"41.030343","Long":"28.936967","District":"Fatih","Road":"Derviş Ali Mah.Fevzipaşa cad.","Width":384,"Height":192},{"VmsNo":"25","VmsName":"AVCILAR","Lat":"40.9914","Long":"28.7184","District":"Avcılar","Road":"Üniversite mah. Firuzköy Bu
```
- Help response modeli: `VmsPoint[]`
- Help response alanları: `VmsNo` (string), `VmsName` (string), `Lat` (string), `Long` (string), `District` (string), `Road` (string), `Width` (integer), `Height` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "VmsNo": "sample string 1",
    "VmsName": "sample string 2",
    "Lat": "sample string 3",
    "Long": "sample string 4",
    "District": "sample string 5",
    "Road": "sample string 6",
    "Width": 7,
    "Height": 8
  },
  {
    "VmsNo": "sample string 1",
    "VmsName": "sample string 2",
    "Lat": "sample string 3",
    "Long": "sample string 4",
    "District": "sample string 5",
    "Road": "sample string 6",
    "Width": 7,
    "Height": 8
  }
]
```

### `GET /api/IntensityMap/v1/Weather`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Weather>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Weather`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Weather'
```
- Canlı örnek çıktı:
```json
[{"ISTASYON_ID":47,"ISTASYON_ADI":"212_AVM","LAT":"41.049","LONG":"28.813","RUZGAR_HIZI":-999,"HAVA_SICAKLIGI":-999.0,"HISSEDILEN_SICAKLIK":-999.0,"ASFALT_SICAKLIGI":-999.0,"ASFALT_DURUMU":-999,"ASFALT_DURUMUTR":"","ASFALT_DURUMUEN":"","DONMA_SICAKLIGI":-999,"BAGIL_NEM":-999,"GORUS_UZAKLIGI":-999,"GUNLUK_TOPLAM_YAGIS":-999,"HAVA_DURUMU_ID":-999,"HAVA_DURUMU":"","RUZGAR_YONU":-999.0,"ZAMAN":"2026-03-11T17:22:22.7328482+03:00"},{"ISTASYON_ID":19,"ISTASYON_ADI":"AHL_BAKIRKOY ","LAT":"40.993275","LONG":"28.8176527777778","RUZGAR_HIZI":-999,"HAVA_SICAKLIGI":-999.0,"HISSEDILEN_SICAKLIK":-999.0,"ASFALT_SICAKLIGI":-999.0,"ASFALT_DURUMU":-999,"ASFALT_DURUMUTR":"","ASFALT_DURUMUEN":"","DONMA_SICAKLIGI":-999,"BAGIL_NEM":-999,"GORUS_UZAKLIGI":-999,"GUNLUK_TOPLAM_YAGIS":-999,"HAVA_DURUMU_ID":-999,"HAVA_DURUMU":"","RUZGAR_YONU":-999.0,"ZAMAN":"2026-03-11T17:22:22.7328482+03:00"},{"ISTASYON_ID":70,"ISTASYON_ADI":"AHL_MGM","LAT":"40.9819","LONG":"28.8208","RUZGAR_HIZI":-999,"HAVA_SICAKLIGI":-999.0,"HISSEDILEN_SICAKLIK":-999.0,"ASFALT_SICAKLIGI":-999.0,"ASFALT_DURUMU":-999,"ASFALT_DURUMUTR":"","ASFALT_DURUMUEN":"","DONMA_SICAKLIGI":-999,"BAGIL_NEM":-999,"GORUS_UZAKLIGI":-999,"GUNLUK_TOPLAM_YAGIS":-999,"HAVA_DURUMU_ID":-999,"HAVA_DURUMU":"","RUZGAR_YONU":-999.0,"ZAMAN":"2026-03-11T17:22:22.7328482+03:00"},{"ISTASYON_ID":31,"ISTASYON_ADI":"AKOM","LAT":"41.1","LONG":"28.9666666666667","RUZGAR_HIZI":-999,"HAVA_SICAKLIGI":-999.0,"HISSEDILEN_SICAKLIK":-999.0,"ASFALT_SICAKLIGI":-999.0,"ASFALT_DURUMU":-999,"ASFALT_DURUMUTR":"","ASFALT_DURUMUEN":"","DONMA_SICAKLIGI":-999,"BAGIL_NEM":-999,"GORUS_UZAKLIGI":-999,"GUNLUK_TOPLAM_YAGIS":-999,"HAVA_DURUMU_ID":-999,"HAVA_DURUMU":"","RUZGAR_YONU":-999.0,"ZAMAN":"2026-03-11T17:22:22.7328482+03:00"},{"ISTASYON_ID":119,"ISTASYON_ADI":"ALEMDAR","LAT":"41.0414416666667","LONG":"29.2737166666667","RUZGAR_HIZI":-999,"HAVA_SICAKLIGI":-999.0,"HISSEDILEN_SICAKLIK":-999.0,"ASFALT_SICAKLIGI":-999.0,"ASFALT_DURUMU":-999,"ASFALT_DURUMUTR":"","ASFALT_DURUMUEN":"","DONMA_SICAKLIGI":-999,"BAGIL_NEM":-999,"GORUS_UZAKLIGI":-999,"GUNLUK_TOPLAM_YAGIS":-999,"HAVA_DURUMU_ID":-999,"HAVA_DURUMU":"","RUZGAR_YONU":-999.0,"ZAMAN":"2026-03-11T17:22:22.7328482+03:00"},{"ISTASYON_ID":64,"ISTASYON_ADI":"ALIBAHADIR","LAT":"41.187472","LONG":"29.214028","RUZGAR_HIZI":-999,"HAVA_SICAKLIGI":-999.0,"HISSEDILEN_SICAKLIK":-999.0,"ASFALT_SICAKLIGI":-999.0,"ASFALT_DURUMU":-999,"ASFALT_DURUMUTR":"","ASFALT_DURUMUEN":"","DONMA_SICAKLIGI":-999,"BAGIL_NEM":-999,"GORUS_UZAKLIGI":-999,"GUNLUK_TOPLAM_YAGIS":-999,"HAVA_DURUMU_ID":-999,"HAVA_DURUMU":"","RUZGAR_YONU":-999.0,"ZAMAN":"2026-03-11T17:22:22.7328482+03:00"},{"ISTASYON_ID":16,"ISTASYON_ADI":"ARNAVUTKOY","LAT":"41.1748055555556","LONG":"28.7535916666667","RUZGAR_HIZI":-999,"HAVA_SICAKLIGI":-999.0,"HISSEDILEN_SICAKLIK":-999.0,"ASFALT_SICAKLIGI":-999.0,"ASFALT_DURUMU":-999,"ASFALT_DURUMUTR":"","ASFALT_DURUMUEN":"","DONMA_SICAKLIGI":-999,"BAGIL_NEM":-999,"GORUS_UZAKLIGI":-999,"GUNLUK_TOPLAM_YAGIS":-999,"HAVA_DURUMU_ID":-999,
```
- Help response modeli: `WeatherDataModel[]`
- Help response alanları: `ISTASYON_ID` (integer), `ISTASYON_ADI` (string), `LAT` (string), `LONG` (string), `RUZGAR_HIZI` (integer), `HAVA_SICAKLIGI` (decimal number), `HISSEDILEN_SICAKLIK` (decimal number), `ASFALT_SICAKLIGI` (decimal number), `ASFALT_DURUMU` (integer), `ASFALT_DURUMUTR` (string), `ASFALT_DURUMUEN` (string), `DONMA_SICAKLIGI` (integer), `BAGIL_NEM` (integer), `GORUS_UZAKLIGI` (integer), `GUNLUK_TOPLAM_YAGIS` (integer), `HAVA_DURUMU_ID` (integer), `HAVA_DURUMU` (string), `RUZGAR_YONU` (decimal number), `ZAMAN` (date)
- Help örnek response gövdesi:
```json
[
  {
    "ISTASYON_ID": 1,
    "ISTASYON_ADI": "sample string 2",
    "LAT": "sample string 3",
    "LONG": "sample string 4",
    "RUZGAR_HIZI": 5,
    "HAVA_SICAKLIGI": 6.1,
    "HISSEDILEN_SICAKLIK": 7.1,
    "ASFALT_SICAKLIGI": 8.1,
    "ASFALT_DURUMU": 9,
    "ASFALT_DURUMUTR": "sample string 10",
    "ASFALT_DURUMUEN": "sample string 11",
    "DONMA_SICAKLIGI": 12,
    "BAGIL_NEM": 13,
    "GORUS_UZAKLIGI": 14,
    "GUNLUK_TOPLAM_YAGIS": 15,
    "HAVA_DURUMU_ID": 16,
    "HAVA_DURUMU": "sample string 17",
    "RUZGAR_YONU": 18.1,
    "ZAMAN": "2026-03-11T17:15:49.7464745+03:00"
  },
  {
    "ISTASYON_ID": 1,
    "ISTASYON_ADI": "sample string 2",
    "LAT": "sample string 3",
    "LONG": "sample string 4",
    "RUZGAR_HIZI": 5,
    "HAVA_SICAKLIGI": 6.1,
    "HISSEDILEN_SICAKLIK": 7.1,
    "ASFALT_SICAKLIGI": 8.1,
    "ASFALT_DURUMU": 9,
    "ASFALT_DURUMUTR": "sample string 10",
    "ASFALT_DURUMUEN": "sample string 11",
    "DONMA_SICAKLIGI": 12,
    "BAGIL_NEM": 13,
    "GORUS_UZAKLIGI": 14,
    "GUNLUK_TOPLAM_YAGIS": 15,
    "HAVA_DURUMU_ID": 16,
    "HAVA_DURUMU": "sample string 17",
    "RUZGAR_YONU": 18.1,
    "ZAMAN": "2026-03-11T17:15:49.7464745+03:00"
  }
]
```

### `GET /api/IntensityMap/v2/Piers`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v2-Piers>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/Piers`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/Piers'
```
- Canlı örnek çıktı:
```json
[{"ID":17,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Anadolu Hisarı","AH":"","AD":"","LT":"41.0872","LN":"29.0661","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":18,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Anadolu Kavağı","AH":"","AD":"","LT":"41.1759","LN":"29.087","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":19,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Arnavutköy","AH":"","AD":"","LT":"41.0677","LN":"29.0452","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":20,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Avcılar","AH":"","AD":"","LT":"40.9712","LN":"28.7167","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":21,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Ayvansaray","AH":"","AD":"","LT":"41.036","LN":"28.9488","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":22,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"B.Hayrettin Paşa","AH":"","AD":"","LT":"41.04","LN":"29.0042","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":23,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Bakırköy","AH":"","AD":"","LT":"40.9723","LN":"28.8786","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":24,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Balat","AH":"","AD":"","LT":"41.0334","LN":"28.95","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":25,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Bebek","AH":"","AD":"","LT":"41.0792","LN":"29.0467","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":26,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Beşiktaş","AH":"","AD":"","LT":"41.0425","LN":"29.0117","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":27,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Beykoz","AH":"","AD":"","LT":"41.1319","LN":"29.0925","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":28,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Beylerbeyi","AH":"","AD":"","LT":"41.0452","LN":"29.0447","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":29,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Bostancı","AH":"","AD":"","LT":"40.952","LN":"29.0955","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":62,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Burgazada","AH":"","AD":"","LT":"40.8811","LN":"29.0705","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":65,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Büyükada","AH":"","AD":"","LT":"40.875","LN":"29.1281","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":30,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Büyükdere","AH":"","AD":"","LT":"41.1598","LN":"29.0439","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":31,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Çengelköy","AH":"","AD":"","LT":"41.0512","LN":"29.052","CF":false,"MR":false,"MN":false,"FR":false,"PR":false,"PL":0},{"ID":32,"PC":1,"OP":"İstanbul Şehir Hatları","NM":"Çubuklu","AH":"","AD":"","LT"
```
- Help response modeli: `PiersModel_v2[]`
- Help response alanları: `ID` (integer), `PC` (integer), `OP` (string), `NM` (string), `AH` (string), `AD` (string), `LT` (string), `LN` (string), `CF` (boolean), `MR` (boolean), `MN` (boolean), `FR` (boolean), `PR` (boolean), `PL` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "ID": 1,
    "PC": 2,
    "OP": "sample string 3",
    "NM": "sample string 4",
    "AH": "sample string 5",
    "AD": "sample string 6",
    "LT": "sample string 7",
    "LN": "sample string 8",
    "CF": true,
    "MR": true,
    "MN": true,
    "FR": true,
    "PR": true,
    "PL": 14
  },
  {
    "ID": 1,
    "PC": 2,
    "OP": "sample string 3",
    "NM": "sample string 4",
    "AH": "sample string 5",
    "AD": "sample string 6",
    "LT": "sample string 7",
    "LN": "sample string 8",
    "CF": true,
    "MR": true,
    "MN": true,
    "FR": true,
    "PR": true,
    "PL": 14
  }
]
```

### `GET /api/IntensityMap/v2/VmsData/{dspno}`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v2-VmsData-dspno>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/VmsData/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `dspno` (integer, Default value is 0)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/VmsData/1'
```
- Canlı örnek çıktı:
```json
[]
```
- Help response modeli: `VMSDisplayMessageItem[]`
- Help response alanları: `Id` (integer), `Code` (string), `Name` (string), `TypeId` (integer), `TypeName` (string), `MsgOrder` (string), `ImageBase64` (string)
- Help örnek response gövdesi:
```json
[
  {
    "Id": 1,
    "Code": "sample string 2",
    "Name": "sample string 3",
    "TypeId": 4,
    "TypeName": "sample string 5",
    "MsgOrder": "sample string 6",
    "ImageBase64": "sample string 7"
  },
  {
    "Id": 1,
    "Code": "sample string 2",
    "Name": "sample string 3",
    "TypeId": 4,
    "TypeName": "sample string 5",
    "MsgOrder": "sample string 6",
    "ImageBase64": "sample string 7"
  }
]
```

### `GET /api/IntensityMap/v2/VmsPoint`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v2-VmsPoint>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/VmsPoint`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/VmsPoint'
```
- Canlı örnek çıktı:
```json
[{"Id":75,"Code":"LCS027","Name":"ALTUNİZADE (KY)","X":"29.05114666","Y":"41.01916449","TypeId":3,"TypeName":"DTI"},{"Id":28,"Code":"LCS037","Name":"AUTOPİA ÖNÜ (GY-6.6)_SÖKÜLDÜ","X":"28.63459289","Y":"41.01788651","TypeId":3,"TypeName":"DTI"},{"Id":74,"Code":"LCS028","Name":"AVCILAR KAMPÜS (KY-15.4)","X":"28.72530661","Y":"40.98422106","TypeId":3,"TypeName":"DTI"},{"Id":20,"Code":"LCS045","Name":"BAUMAX ÖNÜ (GY-13.2)__SÖKÜLDÜ 20.01.2026","X":"28.70417476","Y":"40.99603055","TypeId":3,"TypeName":"DTI"},{"Id":62,"Code":"LCS005","Name":"BAYRAMPAŞA YOL AYIRIMI (KYY-35.5)","X":"28.92365456","Y":"41.03093834","TypeId":3,"TypeName":"DTI"},{"Id":35,"Code":"LCS076","Name":"BEYLERBEYİ 1- Veri göndermeyin!","X":"41.0404898","Y":"29.0410538","TypeId":3,"TypeName":"DTI"},{"Id":51,"Code":"LCS077","Name":"BEYLERBEYİ 2- Veri göndermeyin!","X":"41.04006576538086","Y":"29.039522171020508","TypeId":3,"TypeName":"DTI"},{"Id":80,"Code":"LCS022","Name":"BEYLİKDÜZÜ (GY-6.5)","X":"28.63274753","Y":"41.01861505","TypeId":3,"TypeName":"DTI"},{"Id":63,"Code":"LCS011","Name":"CEMAL KAMACI (GY-39.1)","X":"28.95604525","Y":"41.05323841","TypeId":3,"TypeName":"DTI"},{"Id":55,"Code":"LCS006","Name":"CEVİZLİBAĞ SON 4'LÜ (KY-34.2)","X":"28.91794682","Y":"41.02101514","TypeId":3,"TypeName":"DTI"},{"Id":57,"Code":"LCS009","Name":"CİTROEN KARŞISI (GY-41.0)","X":"28.97071736","Y":"41.06543138","TypeId":3,"TypeName":"DTI"},{"Id":46,"Code":"LCS066","Name":"ÇEKMEKÖY 1 ÇIKIŞ","X":"29.176161","Y":"41.024973","TypeId":3,"TypeName":"DTI"},{"Id":43,"Code":"LCS065","Name":"ÇEKMEKÖY 1 GİRİŞ","X":"29.136129","Y":"41.031495","TypeId":3,"TypeName":"DTI"},{"Id":44,"Code":"LCS068","Name":"ÇEKMEKÖY 2 ÇIKIŞ","X":"29.135842","Y":"41.031726","TypeId":3,"TypeName":"DTI"},{"Id":45,"Code":"LCS067","Name":"ÇEKMEKÖY 2 GİRİŞ","X":"29.176224","Y":"41.025358","TypeId":3,"TypeName":"DTI"},{"Id":87,"Code":"LCS029","Name":"DOUBLE TREE O. KARŞISI (KY-13.6)","X":"28.70786548","Y":"40.99424499","TypeId":3,"TypeName":"DTI"},{"Id":56,"Code":"LCS004","Name":"EDİRNEKAPI (KY-35.7)","X":"28.92679811","Y":"41.03228182","TypeId":3,"TypeName":"DTI"},{"Id":60,"Code":"LCS001","Name":"FSM_AKOM AYIRIMI (KY-40.0)_SÖKÜLDÜ","X":"28.96371067","Y":"41.05851268","TypeId":3,"TypeName":"DTI"},{"Id":71,"Code":"LCS015","Name":"GAYRETTEPE (KY-44.1)","X":"29.00673062","Y":"41.06704704","TypeId":3,"TypeName":"DTI"},{"Id":73,"Code":"LCS030","Name":"GELİŞİM ÜN. KARŞISI (GY-12.8)","X":"28.70026946","Y":"40.99841931","TypeId":3,"TypeName":"DTI"},{"Id":58,"Code":"LCS002","Name":"GÖÇMEN KONUTLARI (KY-39.5)","X":"28.95779908","Y":"41.05701805","TypeId":3,"TypeName":"DTI"},{"Id":84,"Code":"LCS018","Name":"HALICIOĞLU (GY-38.4)2","X":"28.94826482","Y":"41.04997967","TypeId":3,"TypeName":"DTI"},{"Id":67,"Code":"LCS013","Name":"HALİÇ GİRİŞ 1 (GY-36.3)","X":"28.93266","Y":"41.03521","TypeId":3,"TypeName":"DTI"},{"Id":66,"Code":"LCS012","Name":"HALİÇ GİRİŞ 2 (GY-36.4)","X":"28.93418521","Y":"41.03618071","TypeId":3,"TypeName":"DTI"},{"Id":82,"Code":"LCS0
```
- Help response modeli: `VMSDisplayItem[]`
- Help response alanları: `Id` (integer), `Code` (string), `Name` (string), `X` (string), `Y` (string), `TypeId` (integer), `TypeName` (string)
- Help örnek response gövdesi:
```json
[
  {
    "Id": 1,
    "Code": "sample string 2",
    "Name": "sample string 3",
    "X": "sample string 4",
    "Y": "sample string 5",
    "TypeId": 6,
    "TypeName": "sample string 7"
  },
  {
    "Id": 1,
    "Code": "sample string 2",
    "Name": "sample string 3",
    "X": "sample string 4",
    "Y": "sample string 5",
    "TypeId": 6,
    "TypeName": "sample string 7"
  }
]
```

## EDS

### `GET /api/EDS/v1/DashEdsCount`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-EDS-v1-DashEdsCount>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/EDS/v1/DashEdsCount`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fEDS%2fv1%2fDashEdsCount`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/EDS/v1/DashEdsCount'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fEDS%2fv1%2fDashEdsCount">here</a>.</h2>
</body></html>
```
- Help response modeli: `Result_INT`
- Help response alanları: `Res` (integer)
- Help örnek response gövdesi:
```json
{
  "Res": 1
}
```

## YDSData

### `GET /api/YDSData/v1/YDSData/{displayID}`

- Açıklama: Girilen YDS No'ya göre 5 parametre döndürür.
            1.parametre: Alt alta toplam kaç mesajın görüntüleneceği gösteren sayı.
            2.parametre: YDS numarasıdır.Servis bu değeri parametre olarak almaktadır.
            3.parametre: Detay penceresinde görüntülenecek mesajlardır. 
            4.parametre: Mesajların karşısında görüntülenecek seyahat süresi bilgisidir. 
            5.parametre: Mesaja basıldığında yönleneceği vSegment’in numarasıdır.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-YDSData-v1-YDSData-displayID>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/YDSData/v1/YDSData/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fYDSData%2fv1%2fYDSData%2f1`
- Yol/query parametreleri: `displayID` (integer, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/YDSData/v1/YDSData/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fYDSData%2fv1%2fYDSData%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `YDSDisplayDataModel[]`
- Help response alanları: `Count` (integer), `DisplayId` (integer), `Message` (string), `TravelTime` (string), `VSegID` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "Count": 1,
    "DisplayId": 2,
    "Message": "sample string 3",
    "TravelTime": "sample string 4",
    "VSegID": 5
  },
  {
    "Count": 1,
    "DisplayId": 2,
    "Message": "sample string 3",
    "TravelTime": "sample string 4",
    "VSegID": 5
  }
]
```

## SensorStatistic

### `GET /api/SensorStatistic/v1/DashSensorCount`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-SensorStatistic-v1-DashSensorCount>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/DashSensorCount`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSensorStatistic%2fv1%2fDashSensorCount`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/DashSensorCount'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSensorStatistic%2fv1%2fDashSensorCount">here</a>.</h2>
</body></html>
```
- Help response modeli: `Result_INT`
- Help response alanları: `Res` (integer)
- Help örnek response gövdesi:
```json
{
  "Res": 1
}
```

### `GET /api/SensorStatistic/v1/RtmsData`

- Açıklama: Bu servis Rtms numarası ve tarihe göre filtrelenmiş şekilde RTMS verilerini getirir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-SensorStatistic-v1-RtmsData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/RtmsData`
- Canlı test metodu: `GET`
- Canlı sonuç: `415`
- Sonuç yorumu: Endpoint unsupported media type döndürdü; ek header/content beklentisi olabilir.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/RtmsData'
```
- Canlı örnek çıktı:
```json
{
  "Message": "The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource."
}
```
- Help request modeli: `RTMSDataRequestModel`
- Help request alanları: `RtmsNo` (integer, Required), `startDate` (date, Required), `endDate` (date, Required)
- Help örnek request gövdesi:
```json
{
  "RtmsNo": 1,
  "startDate": "2026-03-11T17:15:50.0277205+03:00",
  "endDate": "2026-03-11T17:15:50.0277205+03:00"
}
```
- Help response modeli: `RtmsDataModel[]`
- Help response alanları: `MsgTime` (date), `RtmsNo` (integer), `S1` (integer), `S2` (integer), `S3` (integer), `S4` (integer), `S5` (integer), `S6` (integer), `S7` (integer), `S8` (integer), `SGelisGraf` (integer), `SGidisGraf` (integer), `V1` (integer), `V2` (integer), `V3` (integer), `V4` (integer), `V5` (integer), `V6` (integer), `V7` (integer), `V8` (integer), `O1` (integer), `O2` (integer), `O3` (integer), `O4` (integer), `O5` (integer), `O6` (integer), `O7` (integer), `O8` (integer), `OGelisGraf` (integer), `OGidisGraf` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "MsgTime": "2026-03-11T17:15:50.0277205+03:00",
    "RtmsNo": 2,
    "S1": 3,
    "S2": 4,
    "S3": 5,
    "S4": 6,
    "S5": 7,
    "S6": 8,
    "S7": 9,
    "S8": 10,
    "SGelisGraf": 11,
    "SGidisGraf": 12,
    "V1": 13,
    "V2": 14,
    "V3": 15,
    "V4": 16,
    "V5": 17,
    "V6": 18,
    "V7": 19,
    "V8": 20,
    "O1": 21,
    "O2": 22,
    "O3": 23,
    "O4": 24,
    "O5": 25,
    "O6": 26,
    "O7": 27,
    "O8": 28,
    "OGelisGraf": 29,
    "OGidisGraf": 30
  },
  {
    "MsgTime": "2026-03-11T17:15:50.0277205+03:00",
    "RtmsNo": 2,
    "S1": 3,
    "S2": 4,
    "S3": 5,
    "S4": 6,
    "S5": 7,
    "S6": 8,
    "S7": 9,
    "S8": 10,
    "SGelisGraf": 11,
    "SGidisGraf": 12,
    "V1": 13,
    "V2": 14,
    "V3": 15,
    "V4": 16,
    "V5": 17,
    "V6": 18,
    "V7": 19,
    "V8": 20,
    "O1": 21,
    "O2": 22,
    "O3": 23,
    "O4": 24,
    "O5": 25,
    "O6": 26,
    "O7": 27,
    "O8": 28,
    "OGelisGraf": 29,
    "OGidisGraf": 30
  }
]
```

### `POST /api/SensorStatistic/v1/SensorData`

- Açıklama: Bu sayfa yoğunluk haritasında SENSÖR İSTATİSTİKLERİNİN tutulduğu sayfaya VERİ GÖNDEREN sayfadır...
            İstenilen sensörün istenilen zaman aralığındaki (verilen tarihten itibaren son bir saatlik) verilerini (geliş ve varsa gidiş yönündeki hızlarının ortalamsını)gönderiyor..
            Sayfada istenen 2 parametre var s ve sd....bu parametreler s=sensorNo(örn  s=60) ve sd=tarih(örn sd=201006211322 yilaygunsaatdakika)]
            Sadece s parametresi yollanmış ise (sd yok ise) ve s!=0 ise bu sensörün hem anlık hemde arşiv (ay-yıl) arşiv verisini yolluyoruz...
            Eğer sd parametresi(tarih) verilmiş ise ui5d ve pi1he parametreleri de isteniyor...
            s=0 ise önceden tüm sensör verileri yollanıyordu..artık tüm sensör verileri yollanmıyor hata oluşuyor..
            projede gerekli hata kodlarının açılımları mevcuttur. örneğin "err=100" şeklinde aratıp istenen hata kondunun açılımını görebilirsiniz..
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-SensorStatistic-v1-SensorData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/SensorData`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/SensorData'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/SensorData' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Ui5d": "sample string 1",
  "Pi1he": "sample string 2",
  "SensorNo": "sample string 3",
  "StartDate": "sample string 4"
}'
```
- Help request modeli: `SensorStatisticModel`
- Help request alanları: `Ui5d` (string), `Pi1he` (string), `SensorNo` (string), `StartDate` (string)
- Help örnek request gövdesi:
```json
{
  "Ui5d": "sample string 1",
  "Pi1he": "sample string 2",
  "SensorNo": "sample string 3",
  "StartDate": "sample string 4"
}
```
- Help response modeli: Belirtilmemiş.
- Help örnek response gövdesi:
```json
"sample string 1"
```

## UDBDashboard

### `GET /api/UDBDashboard/Camera/v1/All`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Camera-v1-All>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Camera/v1/All`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Camera/v1/All'
```
- Canlı örnek çıktı:
```json
[{"ID":2,"Name":"AKOM","XCoord":"28.96274764","YCoord":"41.08630782","VideoURL":"http://ibb-media4.ibb.gov.tr:1935/live/2.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm4/hls/2.stream/playlist.m3u8","GroupId":""},{"ID":3,"Name":"AKSARAY","XCoord":"28.95382145","YCoord":"41.00983033","VideoURL":"http://ibb-media4.ibb.gov.tr:1935/live/3.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm4/hls/3.stream/playlist.m3u8","GroupId":""},{"ID":4,"Name":"ALİBEYKÖY MEYDANI","XCoord":"28.94778426","YCoord":"41.07454609","VideoURL":"http://ibb-media2.ibb.gov.tr:1935/live/4.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm2/hls/4.stream/playlist.m3u8","GroupId":""},{"ID":6,"Name":"ALTUNİZADE TÜNEL 1","XCoord":"29.0536348","YCoord":"41.02385711","VideoURL":"http://ibb-media2.ibb.gov.tr:1935/hls/6.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm2/hls/6.stream/playlist.m3u8","GroupId":""},{"ID":5,"Name":"ALTUNİZADE TÜNEL ","XCoord":"29.0536348","YCoord":"41.02385711","VideoURL":"http://ibb-media2.ibb.gov.tr:1935/live/5.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm2/hls/5.stream/playlist.m3u8","GroupId":""},{"ID":8,"Name":"S. YOLU ATAKÖY 1","XCoord":"28.86594073","YCoord":"40.97697373","VideoURL":"http://ibb-media1.ibb.gov.tr:1935/hls/8.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm1/hls/8.stream/playlist.m3u8","GroupId":""},{"ID":9,"Name":"S. YOLU ATAKÖY 2","XCoord":"28.85223472","YCoord":"40.97640653","VideoURL":"http://ibb-media1.ibb.gov.tr:1935/live/9.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm1/hls/9.stream/playlist.m3u8","GroupId":""},{"ID":10,"Name":"ATAKÖY 9. KISIM","XCoord":"28.85260466","YCoord":"40.98642234","VideoURL":"http://ibb-media1.ibb.gov.tr:1935/live/10.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm1/hls/10.stream/playlist.m3u8","GroupId":""},{"ID":12,"Name":"S. YOLU GALERİA","XCoord":"28.86642515","YCoord":"40.97544842","VideoURL":"http://ibb-media4.ibb.gov.tr:1935/live/12.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm4/hls/12.stream/playlist.m3u8","GroupId":""},{"ID":13,"Name":"ATATÜRK HAVALİMANI","XCoord":"28.823428","YCoord":"40.98268","VideoURL":"http://ibb-media1.ibb.gov.tr:1935/live/13.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm1/hls/13.stream/playlist.m3u8","GroupId":""},{"ID":14,"Name":"AYVANSARAY","XCoord":"28.9383151","YCoord":"41.04159158","VideoURL":"http://ibb-media4.ibb.gov.tr:1935/live/14.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm4/hls/14.stream/playlist.m3u8","GroupId":""},{"ID":17,"Name":"BAĞDAT CD. ETHEM EFENDİ","XCoord":"29.06997005","YCoord":"40.96602377","VideoURL":"http://ibb-media2.ibb.gov.tr:1935/live/17.stream/playlist.m3u8","SSLVideoURL":"https://hls.ibb.gov.tr/tkm2/hls/17.stream/playlist.m3u8","GroupId":""},{"ID":18,"Name":"BAĞDAT CD. FENERYOLU","XCoord":"29.0480899","YCoord":"40.97709609","VideoURL":"http://ibb-media4.ibb.gov.tr:1935/
```
- Help response modeli: `CameraBase[]`
- Help response alanları: `ID` (integer): Camera ID, `Name` (string): Camera Name (Location), `XCoord` (string): X Coordinate of camera, `YCoord` (string): Y Coordinate of camera, `VideoURL` (string): Live camera Video URL, `SSLVideoURL` (string): GroupID, `GroupId` (string): GroupID
- Help örnek response gövdesi:
```json
[
  {
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "SSLVideoURL": "sample string 6",
    "GroupId": "sample string 7"
  },
  {
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "SSLVideoURL": "sample string 6",
    "GroupId": "sample string 7"
  }
]
```

### `GET /api/UDBDashboard/Cekici/v1/CekiciCalismalari`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Cekici-v1-CekiciCalismalari>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Cekici/v1/CekiciCalismalari`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Cekici/v1/CekiciCalismalari'
```
- Canlı örnek çıktı:
```json
[{"DuyuruBaslik":"D100 Beylikdüzü-Haramidere, sağ şerit araç arızası. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.651994","YCoor":"41.011360"},{"DuyuruBaslik":"D100 Merter-İncirli Yönü, orta şerit araç arızası. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.887901","YCoor":"41.002409"},{"DuyuruBaslik":"D100 Küçükçekmece-Florya  Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.768740","YCoor":"40.986198"},{"DuyuruBaslik":"D100 Sefaköy-Florya Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.79806036","YCoor":"40.99871884"},{"DuyuruBaslik":"D100 Haliç (Yan Köprü) Otakçılar Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.94932035","YCoor":"41.05160018"},{"DuyuruBaslik":"Basın Ekspres İkitelli-Güneşli Yönü, sağ şerit araç arızası. Ekip sevk edildi.","XCoor":"28.808074","YCoor":"41.048783"},{"DuyuruBaslik":"D100 15 Temmuz Şehitler Köprüsü Avrupa-Anadolu Yönü, sol şerit trafik kazası (hasarlı) nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","XCoor":"29.032492","YCoor":"41.046976"},{"DuyuruBaslik":"D100 Küçükçekmece-Florya  Yönü, - araç arızası. Arızalanan araç kaldırıldı.  Bölgede yoğun trafik devam etmektedir.","XCoor":"28.769016","YCoor":"40.986611"},{"DuyuruBaslik":"D100 Hacışerif-Ambarlı Yönü, sağ şerit araç arızası. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.736773","YCoor":"40.977838"},{"DuyuruBaslik":"D100 Haliç (Orta Köprü)-Topkapı Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.942545","YCoor":"41.044888"},{"DuyuruBaslik":"D100 Küçükçekmece-Hacışerif Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.756629","YCoor":"40.982087"},{"DuyuruBaslik":"D100 Haliç (Orta Köprü) Otakçılar Yönü, araç arızası. Arızalanan araç emniyet şeridine alındı. Bölgede yoğun trafik devam etmektedir.","XCoor":"28.939403","YCoor":"41.040749"},{"DuyuruBaslik":"D100 Avcılar Gümüşpala-Hacışerif, meydana gelen trafik kazası kaldırıldı. Bölgede yoğunluk devam etmektedir..","XCoor":"28.74782372","YCoor":"40.97860364"},{"DuyuruBaslik":"D100 Hürriyet Tepesi-Çağlayan Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.981862","YCoor":"41.067589"},{"DuyuruBaslik":"D100 Çobançeşme-Sefaköy Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.814454","YCoor":"40.995984"},{"DuyuruBaslik":"Bağlantı Yolu AKOM-TEM Hasdal Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","XCoor":"28.961261","YCoor":"41.086889"},{"DuyuruBaslik":"D100 Sefaköy-Florya Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Bölgedeki trafik yoğunlaşmaktadır.","XCoor":"28.805146","YCoor":"41.000776"},{"DuyuruBaslik":"D100 Avcıl
```
- Help response modeli: `CekiciCalismalariModel[]`
- Help response alanları: `DuyuruBaslik` (string), `XCoor` (string), `YCoor` (string)
- Help örnek response gövdesi:
```json
[
  {
    "DuyuruBaslik": "sample string 1",
    "XCoor": "sample string 2",
    "YCoor": "sample string 3"
  },
  {
    "DuyuruBaslik": "sample string 1",
    "XCoor": "sample string 2",
    "YCoor": "sample string 3"
  }
]
```

### `GET /api/UDBDashboard/Duyuru/v1/KazaBilgileri`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Duyuru-v1-KazaBilgileri>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Duyuru/v1/KazaBilgileri`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Duyuru/v1/KazaBilgileri'
```
- Canlı örnek çıktı:
```json
[{"DuyuruId":1412102,"DuyuruBaslik":"D100 Büyükçekmece-Beylikdüzü Yönü, sol şerit trafik kazası (hasarlı).","GirisTarihi":"2026-03-11T17:17:16","XCoor":"28.582611","YCoor":"41.021081"},{"DuyuruId":1412101,"DuyuruBaslik":"D100 Avcılar Gümüşpala-Hacışerif Yönü, sol şerit trafik kazası (zincirleme) nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","GirisTarihi":"2026-03-11T17:03:44","XCoor":"28.750492","YCoor":"40.979955"},{"DuyuruId":1412100,"DuyuruBaslik":"Sahil Yolu Yeşilyurt-Ataköy Yönü, sol şerit trafik kazası (zincirleme) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","GirisTarihi":"2026-03-11T16:56:16","XCoor":"28.824752","YCoor":"40.963021"},{"DuyuruId":1412099,"DuyuruBaslik":"Bağlantı Yolu Yıldırım-Bayrampaşa Otogar Arası, sağ şerit trafik kazası (hasarlı) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","GirisTarihi":"2026-03-11T16:53:45","XCoor":"28.876383","YCoor":"41.073764"},{"DuyuruId":1412098,"DuyuruBaslik":"Bağlantı Yolu Yıldırım-TEM Metris Yönü, sol şerit trafik kazası (hasarlı).","GirisTarihi":"2026-03-11T16:53:19","XCoor":"28.874856","YCoor":"41.076138"},{"DuyuruId":1412096,"DuyuruBaslik":"D100 15 Temmuz Şehitler Köprüsü Anadolu-Avrupa  Yönü, sol şerit trafik kazası (hasarlı).","GirisTarihi":"2026-03-11T16:23:35","XCoor":"29.032989","YCoor":"41.046699"},{"DuyuruId":1412093,"DuyuruBaslik":"Şile Yolu Madenler-Taşdelen Yönü, meydana gelen  trafik kazası kaldırıldı. Bölgede yoğunluk devam etmektedir..","GirisTarihi":"2026-03-11T16:03:19","XCoor":"29.188336","YCoor":"41.014232"},{"DuyuruId":1412092,"DuyuruBaslik":"D100 Haliç (Orta Köprü) Okmeydanı Yönü, sol şerit trafik kazası (hasarlı).","GirisTarihi":"2026-03-11T16:00:36","XCoor":"28.940342","YCoor":"41.041600"},{"DuyuruId":1412090,"DuyuruBaslik":"D100 Beylikdüzü-Büyükçekmece Yönü, sağ şerit trafik kazası (yaralanmalı) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","GirisTarihi":"2026-03-11T15:46:48","XCoor":"28.624380","YCoor":"41.023181"},{"DuyuruId":1412088,"DuyuruBaslik":"Sahil Yolu Bakırköy-Ataköy Yönü, sağ şerit trafik kazası (yaralanmalı).","GirisTarihi":"2026-03-11T15:38:47","XCoor":"28.870938","YCoor":"40.975033"},{"DuyuruId":1412083,"DuyuruBaslik":"D100 Küçükçekmece-Hacışerif Yönü, sağ şerit trafik kazası (hasarlı) nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","GirisTarihi":"2026-03-11T14:49:15","XCoor":"28.764939","YCoor":"40.985121"},{"DuyuruId":1412081,"DuyuruBaslik":"Bağlantı Yolu Esenyurt-Bahçeşehir Yönü, sağ şerit trafik kazası (hasarlı) nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","GirisTarihi":"2026-03-11T14:34:55","XCoor":"28.69106276","YCoor":"41.04402163"},{"DuyuruId":1412080,"DuyuruBaslik":"D100 Küçükyalı-Maltepe Yönü, meydana gelen trafik kazası kaldırıldı. Bölgede yoğunluk devam etmektedir..","GirisTarihi":"2026-03-11T14:33:26","XCoor":"29.12251765","YCoor":"40.94945323"},{"DuyuruId":1412079,"DuyuruBaslik":"D100 Kaynarca-Pendik Yönü, meydana gelen trafik kazası kaldırıldı. Bölgede yoğunluk devam 
```
- Help response modeli: `KazaBilgileriModel[]`
- Help response alanları: `DuyuruId` (integer), `DuyuruBaslik` (string), `GirisTarihi` (date), `XCoor` (string), `YCoor` (string)
- Help örnek response gövdesi:
```json
[
  {
    "DuyuruId": 1,
    "DuyuruBaslik": "sample string 2",
    "GirisTarihi": "2026-03-11T17:15:50.0277205+03:00",
    "XCoor": "sample string 4",
    "YCoor": "sample string 5"
  },
  {
    "DuyuruId": 1,
    "DuyuruBaslik": "sample string 2",
    "GirisTarihi": "2026-03-11T17:15:50.0277205+03:00",
    "XCoor": "sample string 4",
    "YCoor": "sample string 5"
  }
]
```

### `GET /api/UDBDashboard/Envanter/v1/EnvanterSayilari`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Envanter-v1-EnvanterSayilari>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Envanter/v1/EnvanterSayilari`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Envanter/v1/EnvanterSayilari'
```
- Canlı örnek çıktı:
```json
[
  {
    "Sayi": "14",
    "Ekipman": "APS"
  }
]
```
- Help response modeli: `EnvanterSayilariModel[]`
- Help response alanları: `Sayi` (string), `Ekipman` (string)
- Help örnek response gövdesi:
```json
[
  {
    "Sayi": "sample string 1",
    "Ekipman": "sample string 2"
  },
  {
    "Sayi": "sample string 1",
    "Ekipman": "sample string 2"
  }
]
```

### `GET /api/UDBDashboard/Junction/v1/All`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Junction-v1-All>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Junction/v1/All`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Junction/v1/All'
```
- Canlı örnek çıktı:
```json
[{"JunctionNo":2001,"JunctionName":"AVCILAR İETT","CountyId":14,"JunctionType":0,"XCoord":"28.723816573619843","YCoord":"40.98635112963187","JunctionNewNo":"02-001"},{"JunctionNo":2002,"JunctionName":"İ. ÜNİVERSİTESİ AVCILAR KAMPÜSÜ","CountyId":14,"JunctionType":0,"XCoord":"28.7221949","YCoord":"40.9888212","JunctionNewNo":"02-002"},{"JunctionNo":2003,"JunctionName":"ORTANCA SOKAK","CountyId":14,"JunctionType":1,"XCoord":"28.719136118888855","YCoord":"40.99056238773209","JunctionNewNo":"02-003"},{"JunctionNo":2004,"JunctionName":"AVCILAR BORUSAN","CountyId":14,"JunctionType":0,"XCoord":"28.71734851","YCoord":"40.99274889","JunctionNewNo":"02-004"},{"JunctionNo":2005,"JunctionName":"AVCILAR BAĞCI SOKAK","CountyId":14,"JunctionType":0,"XCoord":"28.71579269","YCoord":"40.99470213","JunctionNewNo":"02-005"},{"JunctionNo":2006,"JunctionName":"AVCILAR URAN CAD.","CountyId":14,"JunctionType":0,"XCoord":"28.71372738","YCoord":"40.99772958","JunctionNewNo":"02-006"},{"JunctionNo":2007,"JunctionName":"AVCILAR MAREŞAL CADDESİ","CountyId":14,"JunctionType":0,"XCoord":"28.71160404","YCoord":"41.00116641","JunctionNewNo":"02-007"},{"JunctionNo":2008,"JunctionName":"ORHANGAZİ YAYA","CountyId":14,"JunctionType":0,"XCoord":"28.7099238","YCoord":"41.00269445","JunctionNewNo":"02-008"},{"JunctionNo":2009,"JunctionName":"BEYOĞLU SOKAK","CountyId":14,"JunctionType":0,"XCoord":"28.7069093","YCoord":"41.00511379","JunctionNewNo":"02-009"},{"JunctionNo":2010,"JunctionName":"AVCILAR YILDIRIM BEYAZIT CAD.","CountyId":14,"JunctionType":0,"XCoord":"28.7047682","YCoord":"41.00699533","JunctionNewNo":"02-010"},{"JunctionNo":2011,"JunctionName":"KAZIM KARABEKİR CAD","CountyId":14,"JunctionType":1,"XCoord":"28.70143818","YCoord":"41.00982181","JunctionNewNo":"02-011"},{"JunctionNo":2012,"JunctionName":"AVCILAR FİRİZKÖY SANAYİ SİTESİ","CountyId":14,"JunctionType":1,"XCoord":"28.69683086872101","YCoord":"41.0124262354501","JunctionNewNo":"02-012"},{"JunctionNo":2013,"JunctionName":"AVCILAR İTFAİYE","CountyId":14,"JunctionType":0,"XCoord":"28.71264565","YCoord":"40.99352332","JunctionNewNo":"02-013"},{"JunctionNo":2015,"JunctionName":"Y.BEYAZID CAD-İSTİKLAL CAD..","CountyId":14,"JunctionType":0,"XCoord":"28.70115888","YCoord":"41.00341195","JunctionNewNo":"02-015"},{"JunctionNo":2016,"JunctionName":"KARADUT SOKAK","CountyId":14,"JunctionType":0,"XCoord":"28.70225377","YCoord":"41.00452209","JunctionNewNo":"02-016"},{"JunctionNo":2017,"JunctionName":"AVCILAR HASAN ÖNAL CAD","CountyId":14,"JunctionType":0,"XCoord":"28.70351646","YCoord":"41.0163869","JunctionNewNo":"02-017"},{"JunctionNo":2018,"JunctionName":"GÜMÜŞPALA İLKOKULU","CountyId":14,"JunctionType":0,"XCoord":"28.73497433","YCoord":"40.98116983","JunctionNewNo":"02-018"},{"JunctionNo":2019,"JunctionName":"AVCILAR İBB SOSYAL TESİSL","CountyId":14,"JunctionType":0,"XCoord":"28.74279788","YCoord":"40.97649505","JunctionNewNo":"02-019"},{"JunctionNo":2020,"JunctionName":"AVCILAR FATİH CADDESİ","CountyId":14,"JunctionType":0,"XC
```
- Help response modeli: `JunctionModel[]`
- Help response alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `CountyId` (integer): JunctionNo : Sinyalize Ilce Numarası, `JunctionType` (integer): JunctionType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara)
- Help örnek response gövdesi:
```json
[
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "CountyId": 3,
    "JunctionType": 4,
    "XCoord": "sample string 5",
    "YCoord": "sample string 6",
    "JunctionNewNo": "sample string 7"
  },
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "CountyId": 3,
    "JunctionType": 4,
    "XCoord": "sample string 5",
    "YCoord": "sample string 6",
    "JunctionNewNo": "sample string 7"
  }
]
```

### `GET /api/UDBDashboard/Tunnel/v1/TunnelIsletme`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Tunnel-v1-TunnelIsletme>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Tunnel/v1/TunnelIsletme`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Tunnel/v1/TunnelIsletme'
```
- Canlı örnek çıktı:
```json
[{"ID":1,"Name":"Kağıthane - Piyalepaşa Tüneli","Type":"Tünel","Geom":"[[41.0634376963455,28.9545429239916],[41.06337691615384,28.9545857366476],[41.06297579926261,28.95490254400093],[41.06266262799421,28.95513592081945],[41.06243155799655,28.95533004596106],[41.06211416368863,28.95562697803923],[41.0619249143891,28.95575447963093],[41.06171944428605,28.95591014262731],[41.06155082350159,28.95603539543087],[41.06117828568517,28.95643172784159],[41.06025422244542,28.95744502087834],[41.06070173161027,28.9569157356182],[41.06036392595759,28.95732735988677],[41.06008646207036,28.95762770032379],[41.05979768671742,28.95804965696376],[41.05904726502299,28.95916328655766],[41.05815737842875,28.9608443351429],[41.05778774858988,28.96168677867521],[41.05757096169062,28.96213346342438],[41.05747146318446,28.96238723686937],[41.05707730267213,28.96320098583729],[41.0564671987558,28.96469584814876],[41.05633056413329,28.96500249806907],[41.05603188553833,28.96585052415306],[41.05582621024884,28.96628954966242],[41.05567418848728,28.96666735335191],[41.05538458709573,28.96725548614424],[41.05517483685505,28.96766035178232],[41.05498653316376,28.96799551528245],[41.05490650464238,28.96816366271427],[41.05462576930235,28.9687325939345],[41.0545282041222,28.96894414647271],[41.05429737113949,28.9694609109731],[41.05443955457162,28.96977450722289],[41.05468090257345,28.9692327829889],[41.05484613879221,28.96884898136841],[41.05492743267704,28.96864502584678],[41.05504031549159,28.96839235959476],[41.05519793116027,28.96805745607255],[41.05537313067185,28.96771937917973],[41.05568274596475,28.96718864928415],[41.05614664322914,28.96631245715085],[41.05626557869078,28.9660787256723],[41.05639407386026,28.96580112875862],[41.05698992345099,28.96424480247289],[41.05708449787759,28.96403173848722],[41.0578883255546,28.96239982807456],[41.05867145906633,28.96088145162812],[41.05926292553369,28.95979297743886],[41.06004707121904,28.95842110960914],[41.0603864391365,28.95790537866495],[41.06101826761583,28.95707739987459],[41.0610646987272,28.9570241461692],[41.06117626909569,28.95691131630309],[41.06356258604448,28.9548100390624]]"},{"ID":2,"Name":"Bomonti - Dolmabahçe Tüneli","Type":"Tünel","Geom":"[[41.0585200005506,28.97603176607633],[41.05832905699153,28.97632207426138],[41.05215815406052,28.98150681873369],[41.04435752038649,28.98699192712029],[41.04383443973326,28.98744105553665],[41.04299416519351,28.98844312031918],[41.04223422931607,28.99092004022038],[41.04188708070547,28.99281765954394],[41.04216561172244,28.99265836347336],[41.04219569751702,28.99253984640596],[41.04325432152207,28.98873254664111],[41.04470430095468,28.98750214538954],[41.04847325177627,28.98465934850847],[41.05202406064659,28.98214588985528],[41.05385643616965,28.98074548706808],[41.05883708162605,28.97638841663546],[41.0510452905917,28.98218711025521],[41.05104463510371,28.97748987963916]]"},{"ID":3,"Name":"Sarıyer - Çayırbaşı Tüneli","Type":"Tünel","Geom":"[[41.15786243362384,29.02643309
```
- Help response modeli: `TunelIsletmeModel[]`
- Help response alanları: `ID` (integer), `Name` (string), `Type` (string), `Geom` (string)
- Help örnek response gövdesi:
```json
[
  {
    "ID": 1,
    "Name": "sample string 2",
    "Type": "sample string 3",
    "Geom": "sample string 4"
  },
  {
    "ID": 1,
    "Name": "sample string 2",
    "Type": "sample string 3",
    "Geom": "sample string 4"
  }
]
```

## ElectChargeStations

### `GET /api/ElectChargeStations/v1/ElectChargeStations`

- Açıklama: Elektrikli şarj istasyonlarını döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-ElectChargeStations-v1-ElectChargeStations>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/ElectChargeStations/v1/ElectChargeStations`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fElectChargeStations%2fv1%2fElectChargeStations`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/ElectChargeStations/v1/ElectChargeStations'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fElectChargeStations%2fv1%2fElectChargeStations">here</a>.</h2>
</body></html>
```
- Help response modeli: `ElectChargeStationsModel[]`
- Help response alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string), `Weekdays` (string), `Weekend` (string), `StationModel` (string), `SocketInfo` (string), `Address` (string)
- Help örnek response gövdesi:
```json
[
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4",
    "Weekdays": "sample string 5",
    "Weekend": "sample string 6",
    "StationModel": "sample string 7",
    "SocketInfo": "sample string 8",
    "Address": "sample string 9"
  },
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4",
    "Weekdays": "sample string 5",
    "Weekend": "sample string 6",
    "StationModel": "sample string 7",
    "SocketInfo": "sample string 8",
    "Address": "sample string 9"
  }
]
```

## Chart

### `GET /api/Chart/v1/TrafficIndexBarChart`

- Açıklama: Trafik indeksin o gününü önceki hafta aynı gün ile karşılaştırarak grafiğini PNG formatında verir
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Chart-v1-TrafficIndexBarChart>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Chart/v1/TrafficIndexBarChart`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `image/png`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Chart/v1/TrafficIndexBarChart'
```
- Canlı örnek çıktı:
```xml
<binary 8192 bytes omitted>
```
- Help response modeli: Belirtilmemiş.

### `GET /api/Chart/v1/TrafficIndexIndicator`

- Açıklama: Trafik indeksin o gününü önceki hafta aynı gün ile karşılaştırarak grafiğini PNG formatında verir
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Chart-v1-TrafficIndexIndicator>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Chart/v1/TrafficIndexIndicator`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `image/png`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Chart/v1/TrafficIndexIndicator'
```
- Canlı örnek çıktı:
```xml
<binary 5087 bytes omitted>
```
- Help response modeli: `HttpResponseMessage`
- Help response alanları: `Version` (Version), `Content` (HttpContent), `StatusCode` (HttpStatusCode), `ReasonPhrase` (string), `Headers` (Collection of             Object), `RequestMessage` (HttpRequestMessage), `IsSuccessStatusCode` (boolean)

## Travel

### `GET /api/Travel/v1/GetAll/{minute}`

- Açıklama: Belirlenmiş olan güzergahların (tabloda tutulmaktadır) seyahat sürelerini aldığı parametre kadar güncel olacak şekilde döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Travel-v1-GetAll-minute>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetAll/5`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTravel%2fv1%2fGetAll%2f5`
- Yol/query parametreleri: `minute` (integer, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetAll/5'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTravel%2fv1%2fGetAll%2f5">here</a>.</h2>
</body></html>
```
- Help response modeli: `TravelModel[]`
- Help response alanları: `DirectionId` (integer), `WayId` (integer), `Id` (integer), `Distance` (decimal number), `TravelTime` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "DirectionId": 1,
    "WayId": 2,
    "Id": 3,
    "Distance": 4.1,
    "TravelTime": 5
  },
  {
    "DirectionId": 1,
    "WayId": 2,
    "Id": 3,
    "Distance": 4.1,
    "TravelTime": 5
  }
]
```

### `GET /api/Travel/v1/GetFCDTravelTime/{msgid}`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Travel-v1-GetFCDTravelTime-msgid>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetFCDTravelTime/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTravel%2fv1%2fGetFCDTravelTime%2f1`
- Yol/query parametreleri: `msgid` (string, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetFCDTravelTime/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTravel%2fv1%2fGetFCDTravelTime%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `FcdRouteTravelTimeResult`
- Help response alanları: `Date` (date), `TravelTime` (integer): Saniye cinsinden seyahat süresi, `SystemMessageId` (integer): SYSTEM_TYPE değeri 5 ise DisplayMessageId; 2 ise TRF_MSG_ID, `SystemId` (integer): SYSTEM_TYPE değeri 5 ise YDSNo; 2 ise SYSTEM_ID, `MessageId` (integer): SYSTEM_TYPE değeri 5 ise MESSAGE_ID; 2 ise RouteId, `SystemType` (byte): 5:YDS; 2:VMS;, `RouteName` (string), `RouteLength` (integer), `RouteFrom` (string), `RouteTo` (string), `ColorClassId` (integer), `ColorClassName` (string), `MsgIdentifier` (string): SystemType,, SystemMessageId, SystemId, MessageId birleşiminden oluşan benzersiz rota IDsi
            Format: R[3][4][4][4]
- Help örnek response gövdesi:
```json
{
  "Date": "2026-03-11T17:15:50.0745963+03:00",
  "TravelTime": 2,
  "SystemMessageId": 3,
  "SystemId": 4,
  "MessageId": 5,
  "SystemType": 64,
  "RouteName": "sample string 7",
  "RouteLength": 8,
  "RouteFrom": "sample string 9",
  "RouteTo": "sample string 10",
  "ColorClassId": 11,
  "ColorClassName": "sample string 12",
  "MsgIdentifier": "sample string 13"
}
```

### `GET /api/Travel/v1/GetFCDTravelTimes/{type}?sid={sid}`

- Açıklama: Yalnızca Belirli Rotalar için seyahat sürelerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Travel-v1-GetFCDTravelTimes-type_sid>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetFCDTravelTimes/1?sid=1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTravel%2fv1%2fGetFCDTravelTimes%2f1%3fsid%3d1&sid=1`
- Yol/query parametreleri: `type` (byte, Required): 101: Avrasya Tünel
                    102: YSS Köprüsü, `sid` (integer)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetFCDTravelTimes/1?sid=1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTravel%2fv1%2fGetFCDTravelTimes%2f1%3fsid%3d1&amp;sid=1">here</a>.</h2>
</body></html>
```
- Help response modeli: `FcdRouteTravelTimeResult[]`
- Help response alanları: `Date` (date), `TravelTime` (integer): Saniye cinsinden seyahat süresi, `SystemMessageId` (integer): SYSTEM_TYPE değeri 5 ise DisplayMessageId; 2 ise TRF_MSG_ID, `SystemId` (integer): SYSTEM_TYPE değeri 5 ise YDSNo; 2 ise SYSTEM_ID, `MessageId` (integer): SYSTEM_TYPE değeri 5 ise MESSAGE_ID; 2 ise RouteId, `SystemType` (byte): 5:YDS; 2:VMS;, `RouteName` (string), `RouteLength` (integer), `RouteFrom` (string), `RouteTo` (string), `ColorClassId` (integer), `ColorClassName` (string), `MsgIdentifier` (string): SystemType,, SystemMessageId, SystemId, MessageId birleşiminden oluşan benzersiz rota IDsi
            Format: R[3][4][4][4]
- Help örnek response gövdesi:
```json
[
  {
    "Date": "2026-03-11T17:15:50.0745963+03:00",
    "TravelTime": 2,
    "SystemMessageId": 3,
    "SystemId": 4,
    "MessageId": 5,
    "SystemType": 64,
    "RouteName": "sample string 7",
    "RouteLength": 8,
    "RouteFrom": "sample string 9",
    "RouteTo": "sample string 10",
    "ColorClassId": 11,
    "ColorClassName": "sample string 12",
    "MsgIdentifier": "sample string 13"
  },
  {
    "Date": "2026-03-11T17:15:50.0745963+03:00",
    "TravelTime": 2,
    "SystemMessageId": 3,
    "SystemId": 4,
    "MessageId": 5,
    "SystemType": 64,
    "RouteName": "sample string 7",
    "RouteLength": 8,
    "RouteFrom": "sample string 9",
    "RouteTo": "sample string 10",
    "ColorClassId": 11,
    "ColorClassName": "sample string 12",
    "MsgIdentifier": "sample string 13"
  }
]
```

### `POST /api/Travel/v1/GetTravelTime`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Travel-v1-GetTravelTime>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetTravelTime`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetTravelTime'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetTravelTime' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Source": 1,
  "Destination": 2,
  "Method": 64,
  "Quality": 64
}'
```
- Help request modeli: `TravelTimeRequestModel`
- Help request alanları: `Source` (integer, Required), `Destination` (integer, Required), `Method` (byte, Required), `Quality` (byte, Required)
- Help örnek request gövdesi:
```json
{
  "Source": 1,
  "Destination": 2,
  "Method": 64,
  "Quality": 64
}
```
- Help response modeli: `TravelTimeModel`
- Help response alanları: `RouteList` (Collection of TravelTimeRoute), `GeoList` (Collection of TravelTimeSegment), `Color` (string), `Distance` (decimal number), `TravelTime` (decimal number)
- Help örnek response gövdesi:
```json
{
  "RouteList": [
    {
      "RouteID": "sample string 1",
      "RouteName": "sample string 2"
    },
    {
      "RouteID": "sample string 1",
      "RouteName": "sample string 2"
    }
  ],
  "GeoList": [
    {
      "vctID": 1,
      "Geo": "sample string 2"
    },
    {
      "vctID": 1,
      "Geo": "sample string 2"
    }
  ],
  "Color": "sample string 1",
  "Distance": 2.1,
  "TravelTime": 3.1
}
```

## TrafficData

### `GET /api/TrafficData/v1/ComTrafficIndex`

- Açıklama: 1 önceki günün son 4 hafta içerisindeki trafik index değeri geçen yılla birlikte verilir. Toplamda 8 index değeri basılmış olur. 1-99 arasında değişen bir değer olup, 1=>Açık Trafik, 99=>Çok Yoğun Trafik anlamına geliyor.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-ComTrafficIndex>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/ComTrafficIndex`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/ComTrafficIndex'
```
- Canlı örnek çıktı:
```json
[
  {
    "Time": "00:00",
    "Day": "Salı",
    "TI_A_H1": 2,
    "TI_A_H2": 7,
    "TI_A_H3": 5,
    "TI_A_H4": 2,
    "TI_H1": 1,
    "TI_H2": 2,
    "TI_H3": 8,
    "Yesterday": 5
  }
]
```
- Help response modeli: `ComparativeTrafficIndex[]`
- Help response alanları: `Time` (string): Saat, `Day` (string): Gün, `TI_A_H1` (integer): Bir önceki sene 3 hafta öncesinin trafik indeksi, `TI_A_H2` (integer): Bir önceki sene 2 hafta öncesinin trafik indeksi, `TI_A_H3` (integer): Bir önceki sene 3 hafta öncesinin trafik indeksi, `TI_A_H4` (integer): Bir önceki senenin trafik indeksi, `TI_H1` (integer): 1 hafta öncesinin trafik indeksi, `TI_H2` (integer): 2 hafta öncesinin trafik indeksi, `TI_H3` (integer): 3 hafta öncesinin trafik indeksi, `Yesterday` (integer): Bir önceki günün trafik indeksi
- Help örnek response gövdesi:
```json
[
  {
    "Time": "sample string 1",
    "Day": "sample string 2",
    "TI_A_H1": 3,
    "TI_A_H2": 4,
    "TI_A_H3": 5,
    "TI_A_H4": 6,
    "TI_H1": 7,
    "TI_H2": 8,
    "TI_H3": 9,
    "Yesterday": 10
  },
  {
    "Time": "sample string 1",
    "Day": "sample string 2",
    "TI_A_H1": 3,
    "TI_A_H2": 4,
    "TI_A_H3": 5,
    "TI_A_H4": 6,
    "TI_H1": 7,
    "TI_H2": 8,
    "TI_H3": 9,
    "Yesterday": 10
  }
]
```

### `GET /api/TrafficData/v1/ComTrafficIndexWeekDayNo/{DayNo}`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-ComTrafficIndexWeekDayNo-DayNo>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/ComTrafficIndexWeekDayNo/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `DayNo` (byte, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/ComTrafficIndexWeekDayNo/1'
```
- Canlı örnek çıktı:
```json
[{"TrafficIndex":66,"TrafficIndexDate":"2024-03-11T00:00:00","TrafficIndexHour":"17:00","DayNo":1},{"TrafficIndex":70,"TrafficIndexDate":"2024-03-11T00:00:00","TrafficIndexHour":"18:00","DayNo":1},{"TrafficIndex":30,"TrafficIndexDate":"2024-03-11T00:00:00","TrafficIndexHour":"19:00","DayNo":1},{"TrafficIndex":5,"TrafficIndexDate":"2024-03-11T00:00:00","TrafficIndexHour":"20:00","DayNo":1},{"TrafficIndex":4,"TrafficIndexDate":"2024-03-11T00:00:00","TrafficIndexHour":"21:00","DayNo":1},{"TrafficIndex":4,"TrafficIndexDate":"2024-03-11T00:00:00","TrafficIndexHour":"22:00","DayNo":1},{"TrafficIndex":2,"TrafficIndexDate":"2024-03-11T00:00:00","TrafficIndexHour":"23:00","DayNo":1},{"TrafficIndex":15,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"00:00","DayNo":1},{"TrafficIndex":1,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"01:00","DayNo":1},{"TrafficIndex":1,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"02:00","DayNo":1},{"TrafficIndex":1,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"03:00","DayNo":1},{"TrafficIndex":1,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"04:00","DayNo":1},{"TrafficIndex":1,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"05:00","DayNo":1},{"TrafficIndex":16,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"06:00","DayNo":1},{"TrafficIndex":43,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"07:00","DayNo":1},{"TrafficIndex":56,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"08:00","DayNo":1},{"TrafficIndex":51,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"09:00","DayNo":1},{"TrafficIndex":37,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"10:00","DayNo":1},{"TrafficIndex":34,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"11:00","DayNo":1},{"TrafficIndex":38,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"12:00","DayNo":1},{"TrafficIndex":36,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"13:00","DayNo":1},{"TrafficIndex":38,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"14:00","DayNo":1},{"TrafficIndex":45,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"15:00","DayNo":1},{"TrafficIndex":54,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"16:00","DayNo":1},{"TrafficIndex":66,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"17:00","DayNo":1},{"TrafficIndex":73,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"18:00","DayNo":1},{"TrafficIndex":30,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"19:00","DayNo":1},{"TrafficIndex":7,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"20:00","DayNo":1},{"TrafficIndex":8,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"21:00","DayNo":1},{"TrafficIndex":9,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficIndexHour":"22:00","DayNo":1},{"TrafficIndex":5,"TrafficIndexDate":"2024-03-18T00:00:00","TrafficInde
```
- Help response modeli: `TrafficIndexWeekDayNo[]`
- Help response alanları: `TrafficIndex` (byte), `TrafficIndexDate` (date), `TrafficIndexHour` (string), `DayNo` (byte): Haftanın günü. Pazartesi: 1
- Help örnek response gövdesi:
```json
[
  {
    "TrafficIndex": 64,
    "TrafficIndexDate": "2026-03-11T17:15:50.1683881+03:00",
    "TrafficIndexHour": "sample string 3",
    "DayNo": 64
  },
  {
    "TrafficIndex": 64,
    "TrafficIndexDate": "2026-03-11T17:15:50.1683881+03:00",
    "TrafficIndexHour": "sample string 3",
    "DayNo": 64
  }
]
```

### `GET /api/TrafficData/v1/FusedDataManuelSpeed`

- Açıklama: Çağrı merkezi tarafından manuel olarak girilmiş Hız değerlerinirini döndürür. (Son sekiz saat döner)
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-FusedDataManuelSpeed>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/FusedDataManuelSpeed`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv1%2fFusedDataManuelSpeed`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/FusedDataManuelSpeed'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv1%2fFusedDataManuelSpeed">here</a>.</h2>
</body></html>
```
- Help response modeli: `FusedDataManuelSpeed[]`
- Help response alanları: `VSegDirId` (integer), `Speed` (integer), `ExpirationDate` (date)
- Help örnek response gövdesi:
```json
[
  {
    "VSegDirId": 1,
    "Speed": 2,
    "ExpirationDate": "2026-03-11T17:15:50.1527502+03:00"
  },
  {
    "VSegDirId": 1,
    "Speed": 2,
    "ExpirationDate": "2026-03-11T17:15:50.1527502+03:00"
  }
]
```

### `GET /api/TrafficData/v1/IntensityMap/ScreenShot`

- Açıklama: Anlık Yoğunluk Haritasının Ekran Görüntüsünü PNG formatında verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-IntensityMap-ScreenShot>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/IntensityMap/ScreenShot`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `image/png`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/IntensityMap/ScreenShot'
```
- Canlı örnek çıktı:
```xml
<binary 8192 bytes omitted>
```
- Help response modeli: `HttpResponseMessage`
- Help response alanları: `Version` (Version), `Content` (HttpContent), `StatusCode` (HttpStatusCode), `ReasonPhrase` (string), `Headers` (Collection of             Object), `RequestMessage` (HttpRequestMessage), `IsSuccessStatusCode` (boolean)

### `GET /api/TrafficData/v1/PredictionsData`

- Açıklama: TDMS veritabanındaki uspLatestPredictionsSelect storeprocedure kullanarak,data döndürüyor. Segmentlerin 15-30-45-60 dakika sonraki tahmini Segment No, Hız, Renk olarak geri döndürür.
            5 Dakikalık Cache
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-PredictionsData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/PredictionsData`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv1%2fPredictionsData`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/PredictionsData'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv1%2fPredictionsData">here</a>.</h2>
</body></html>
```
- Help response modeli: `PredictionDataModel[]`
- Help response alanları: `VSegID` (integer): Segmentin ID, `Prediction` (integer), `Q` (integer), `ColorIndex` (integer): Segmentin Hız rengi
- Help örnek response gövdesi:
```json
[
  {
    "VSegID": 1,
    "Prediction": 2,
    "Q": 3,
    "ColorIndex": 4
  },
  {
    "VSegID": 1,
    "Prediction": 2,
    "Q": 3,
    "ColorIndex": 4
  }
]
```

### `GET /api/TrafficData/v1/SegmentBlocking`

- Açıklama: Çağrı merkezi tarafından manuel olarak girilmiş Hız değerlerinirini döndürür. (Son sekiz saat döner)
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-SegmentBlocking>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/SegmentBlocking`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv1%2fSegmentBlocking`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/SegmentBlocking'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv1%2fSegmentBlocking">here</a>.</h2>
</body></html>
```
- Help response modeli: `FusedDataException[]`
- Help response alanları: `SegmentID` (integer), `vSegID` (integer), `vSegDir` (byte), `Speed` (byte), `Description` (string), `Deployment` (date), `Expiration` (date)
- Help örnek response gövdesi:
```json
[
  {
    "SegmentID": 1,
    "vSegID": 2,
    "vSegDir": 64,
    "Speed": 64,
    "Description": "sample string 5",
    "Deployment": "2026-03-11T17:15:50.137103+03:00",
    "Expiration": "2026-03-11T17:15:50.137103+03:00"
  },
  {
    "SegmentID": 1,
    "vSegID": 2,
    "vSegDir": 64,
    "Speed": 64,
    "Description": "sample string 5",
    "Deployment": "2026-03-11T17:15:50.137103+03:00",
    "Expiration": "2026-03-11T17:15:50.137103+03:00"
  }
]
```

### `GET /api/TrafficData/v1/SegmentData`

- Açıklama: Trafik yoğunluk haritasında bulunan yollara ait olan anlık ortalama hız bilgilerini döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-SegmentData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/SegmentData`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv1%2fSegmentData`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/SegmentData'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv1%2fSegmentData">here</a>.</h2>
</body></html>
```
- Help response modeli: `TrafficDataModel[]`
- Help response alanları: `Src` (string), `SegmentID` (integer): Segment ID, `Speed` (integer): Segmentin Hız, `ColorIndex` (integer): Segmentin Hız rengi, `LastDate` (string)
- Help örnek response gövdesi:
```json
[
  {
    "Src": "sample string 1",
    "SegmentID": 2,
    "Speed": 3,
    "ColorIndex": 4,
    "LastDate": "sample string 5"
  },
  {
    "Src": "sample string 1",
    "SegmentID": 2,
    "Speed": 3,
    "ColorIndex": 4,
    "LastDate": "sample string 5"
  }
]
```

### `GET /api/TrafficData/v1/Segments`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-Segments>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/Segments`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/Segments'
```
- Canlı örnek çıktı:
```json
[{"segID":1,"vSegID":1,"segGeometry":"29.025498 41.005778;29.0255926 41.005671;29.0257729 41.0054669;29.0258513 41.0053782;29.026174 41.0049902;29.0265094 41.0045986;29.0269779 41.0040441;29.0273085 41.0036591;29.0273516 41.0036089;29.0278177 41.0030562;29.0280582 41.0027781;29.0281452 41.0026678;29.0281582 41.0026512;29.0282414 41.0025139;29.0282846 41.0024427;29.028466 41.002156","ZoomLevels":[1,2,3,4]},{"segID":10001,"vSegID":1,"segGeometry":"29.0284713 41.0023049;29.0283181 41.0025554;29.0282319 41.0027103;29.0281683 41.0028248;29.0279607 41.0030841;29.02762 41.0034929;29.0274306 41.003714;29.0273589 41.0037976;29.0268237 41.0044373;29.026491 41.0048195;29.0259834 41.0054208;29.0258077 41.005629;29.0256958 41.0057616;29.025606 41.005868","ZoomLevels":[1,2,3,4]},{"segID":2,"vSegID":2,"segGeometry":"29.0308623 40.997796;29.0309526 40.9976455;29.0313372 40.9969364;29.0317847 40.9962153;29.031941 40.9959635;29.0322876 40.9954851;29.032418 40.9952881;29.0325277 40.9950875;29.0326934 40.9946363;29.0327089 40.9945941;29.0327326 40.9945298;29.0327407 40.9945106;29.0329563 40.994003;29.033043 40.99382;29.033054 40.993804;29.0331195 40.9937038;29.0332804 40.9934573;29.0334763 40.9932199;29.0336904 40.9930088;29.0339369 40.9928054;29.0344748 40.9924303;29.0348966 40.992132;29.0353453 40.9917216;29.0354512 40.9915962;29.0356691 40.9913382;29.035895 40.990952;29.0360344 40.990424;29.0360642 40.9903111;29.0363049 40.9899837","ZoomLevels":[1,2,3,4]},{"segID":10002,"vSegID":2,"segGeometry":"29.0366822 40.9900462;29.036553 40.990272;29.0360647 40.9909555;29.0356806 40.9914958;29.0354752 40.9917606;29.0352679 40.9919656;29.0349149 40.9922456;29.0345935 40.992501;29.0345868 40.9925063;29.0343141 40.9926933;29.0341034 40.9928877;29.0339364 40.9930656;29.0335448 40.9933273;29.0334417 40.9934352;29.033294 40.9936424;29.033165 40.993889;29.0329693 40.9943024;29.0328618 40.9945984;29.0328284 40.9946905;29.0327821 40.9948178;29.0325958 40.99529;29.032419 40.9955454;29.0318056 40.9964067;29.0314658 40.9969577;29.0312156 40.9973988;29.0310798 40.9976692;29.0310347 40.9977699;29.0310383 40.9979095;29.031071 40.998027","ZoomLevels":[1,2,3,4]},{"segID":3,"vSegID":3,"segGeometry":"29.0363049 40.9899837;29.0367758 40.9895781;29.0369729 40.9893853;29.0372308 40.9890758;29.0372951 40.9889683;29.037453 40.9887043;29.0379355 40.988011;29.0381768 40.9875019;29.0385416 40.9865721;29.0387722 40.9859836;29.0388265 40.9858317;29.0389385 40.9855189;29.0391192 40.9849788;29.0393521 40.9844729;29.0394992 40.9841365;29.0395209 40.9840871;29.0396967 40.9838754;29.0397294 40.9838325;29.0399416 40.9835542;29.0399916 40.9834689;29.0402196 40.9830805;29.04089 40.9820159;29.0409204 40.9819636;29.0413819 40.9812863;29.0414984 40.9811014;29.0415406 40.9809626;29.0415354 40.9808523","ZoomLevels":[1,2,3,4,5]},{"segID":10003,"vSegID":3,"segGeometry":"29.041878 40.9809582;29.0416416 40.9812034;29.0413797 40.98154;29.0409432 40.9821496;29.0405265 40.9827894;29.0399715 40.9837268;29.0397206 40.984086
```
- Help response modeli: `VSegmentResponse[]`
- Help response alanları: `segID` (integer), `vSegID` (integer), `segGeometry` (string), `ZoomLevels` (Collection of integer)
- Help örnek response gövdesi:
```json
[
  {
    "segID": 1,
    "vSegID": 2,
    "segGeometry": "sample string 3",
    "ZoomLevels": [
      1,
      2
    ]
  },
  {
    "segID": 1,
    "vSegID": 2,
    "segGeometry": "sample string 3",
    "ZoomLevels": [
      1,
      2
    ]
  }
]
```

### `GET /api/TrafficData/v1/TrafficIndex`

- Açıklama: İstanbul geneli için trafik indeks değerini döndürür. 1-99 arasında değişen bir değer olup, 1=>Açık Trafik, 99=>Çok Yoğun Trafik anlamına geliyor.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TrafficIndex>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex'
```
- Canlı örnek çıktı:
```json
{
  "Result": 78
}
```
- Help response modeli: `ResponseTrafficIndex`
- Help response alanları: `Result` (byte)
- Help örnek response gövdesi:
```json
{
  "Result": 64
}
```

### `GET /api/TrafficData/v1/TrafficIndex_Sc1_Cont`

- Açıklama: İstanbul Genel Trafik İndeks'ini 3 kırılımda döndürür: "":Genel, "An":Anadolu, "Av":Avrupa
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TrafficIndex_Sc1_Cont>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex_Sc1_Cont`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex_Sc1_Cont'
```
- Canlı örnek çıktı:
```json
{
  "TI": 78,
  "TI_An": 78,
  "TI_Av": 80
}
```
- Help response modeli: `ResponseTrafficIndex_Sc1_Cont`
- Help response alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Help örnek response gövdesi:
```json
{
  "TI": 64,
  "TI_An": 64,
  "TI_Av": 64
}
```

### `GET /api/TrafficData/v1/TrafficIndex_Sc1_Cont_Report`

- Açıklama: Özel bir veri setinden veri çekerek YHarita6'ya sunar. Geçmiş görünümleri elde etmede kullanılıyor
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TrafficIndex_Sc1_Cont_Report>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex_Sc1_Cont_Report`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex_Sc1_Cont_Report'
```
- Canlı örnek çıktı:
```json
{
  "TI": 39,
  "TI_An": 39,
  "TI_Av": 39
}
```
- Help response modeli: `ResponseTrafficIndex_Sc1_Cont`
- Help response alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Help örnek response gövdesi:
```json
{
  "TI": 64,
  "TI_An": 64,
  "TI_Av": 64
}
```

### `GET /api/TrafficData/v1/TrafficIndexHistory/{day}/{period}`

- Açıklama: Trafik indeks değerinin geçmişini döndürür. 1-99 arasında değişen bir değer olup, 1=>Açık Trafik, 99=>Çok Yoğun Trafik anlamına geliyor.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TrafficIndexHistory-day-period>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndexHistory/1/60`
- Canlı test metodu: `GET`
- Canlı sonuç: `500`
- Sonuç yorumu: Endpoint sunucu iç hata döndürdü.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `day` (integer, Required): Son kaç günün verisi gösterilecek?, `period` (string, Required): Veri ortalamalarının periyodu. Y:Yıl; M:Ay; D:Gün; H:Saat; 5M:5Dakika
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndexHistory/1/60'
```
- Canlı örnek çıktı:
```json
{
  "Message": "Unwanted error in service operation.Please contact the UYM software team.",
  "InternalServerError": 500,
  "Version": {
    "_Major": 1,
    "_Minor": 1,
    "_Build": -1,
    "_Revision": -1
  }
}
```
- Help response modeli: `ResponseTrafficIndexHistory[]`
- Help response alanları: `TrafficIndex` (byte), `TrafficIndexDate` (date)
- Help örnek response gövdesi:
```json
[
  {
    "TrafficIndex": 64,
    "TrafficIndexDate": "2026-03-11T17:15:50.137103+03:00"
  },
  {
    "TrafficIndex": 64,
    "TrafficIndexDate": "2026-03-11T17:15:50.137103+03:00"
  }
]
```

### `GET /api/TrafficData/v1/TunnelSegments`

- Açıklama: Tünel segmentlerini verir
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TunnelSegments>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TunnelSegments`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TunnelSegments'
```
- Canlı örnek çıktı:
```json
[
  292
]
```
- Help response modeli: Belirtilmemiş.
- Help örnek response gövdesi:
```json
[
  1,
  2
]
```

### `GET /api/TrafficData/v1/VMSSegmentData/{VmsId}/{MsgId}`

- Açıklama: Yeni Ekran Yönetim Yazılımında Okmeydanı VMS gibi grafiksel panolar için segment  listesini döndürür
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-VMSSegmentData-VmsId-MsgId>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/VMSSegmentData/1/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv1%2fVMSSegmentData%2f1%2f1`
- Yol/query parametreleri: `VmsId` (integer, Required), `MsgId` (integer, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/VMSSegmentData/1/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv1%2fVMSSegmentData%2f1%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `TrafficDataModel[]`
- Help response alanları: `Src` (string), `SegmentID` (integer): Segment ID, `Speed` (integer): Segmentin Hız, `ColorIndex` (integer): Segmentin Hız rengi, `LastDate` (string)
- Help örnek response gövdesi:
```json
[
  {
    "Src": "sample string 1",
    "SegmentID": 2,
    "Speed": 3,
    "ColorIndex": 4,
    "LastDate": "sample string 5"
  },
  {
    "Src": "sample string 1",
    "SegmentID": 2,
    "Speed": 3,
    "ColorIndex": 4,
    "LastDate": "sample string 5"
  }
]
```

### `GET /api/TrafficData/v1/xml/speeds`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-xml-speeds>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/xml/speeds`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/xml; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/xml/speeds'
```
- Canlı örnek çıktı:
```xml
<?xml version="1.0"?><speed><route id="17" reverse="89" through="99" name="D100 Çağlayan" from="Çağlayan" to="Haliç Köp." road_type="2" xcoord="28,98339067" ycoord="41,06754624" /><route id="33" reverse="84" through="88" name="D100 Küçükçekmece" from="Florya" to="Avcılar" road_type="2" xcoord="28,7671184" ycoord="40,98603562" /><route id="36" reverse="37" through="75" name="Yenikapı Sahil Yolu" from="Sarayburnu" to="Yedikule" road_type="1" xcoord="28,95207211" ycoord="41,00259667" /><route id="38" reverse="51" through="75" name="Güneşli B. Ekspres Yolu" from="İkitelli" to="Yenibosna" road_type="2" xcoord="28,80777032" ycoord="41,04859281" /><route id="63" reverse="47" through="41" name="Ümraniye" from="Ümraniye" to="Kavacık" road_type="4" xcoord="29,12106687" ycoord="41,05157944" /><route id="65" reverse="19" through="39" name="Ümraniye Elmalı" from="Kavacık" to="Küçükbakkalköy" road_type="4" xcoord="29,11033642" ycoord="41,065814" /><route id="70" reverse="17" through="8" name="D100 Gülsuyu" from="Bostancı" to="Kartal" road_type="2" xcoord="29,15252266" ycoord="40,92487019" /><route id="73" reverse="24" through="71" name="TEM Çakmak Köprüsü" from="Küçükbakkalköy" to="Kavacık" road_type="4" xcoord="29,12107964" ycoord="41,02380105" /><route id="75" reverse="28" through="8" name="D100 Maltepe" from="Kartal" to="Bostancı" road_type="2" xcoord="29,14049783" ycoord="40,93483926" /><route id="76" reverse="13" through="11" name="D100 Kartal" from="Pendik" to="Bostancı" road_type="2" xcoord="29,19356182" ycoord="40,912342" /><route id="102" reverse="45" through="62" name="TEM Samandıra" from="Sultanbeyli" to="Kartal" road_type="4" xcoord="29,225656" ycoord="40,9775298" /><route id="113" reverse="25" through="64" name="D100 Güzelyalı" from="Kaynarca" to="İçmeler" road_type="2" xcoord="29,27841453" ycoord="40,86135254" /><route id="115" reverse="57" through="71" name="Kadıköy Hasanpaşa" from="Çamlıca" to="Kadıköy" road_type="2" xcoord="29,05096856" ycoord="40,9954935" /><route id="119" reverse="51" through="28" name="Küçükyalı Sahil Yolu" from="Maltepe" to="Bostancı" road_type="1" xcoord="29,10135356" ycoord="40,94774144" /><route id="120" reverse="26" through="26" name="Maltepe Sahil Yolu" from="Kartal" to="Bostancı" road_type="1" xcoord="29,12070416" ycoord="40,92948539" /><route id="121" reverse="14" through="26" name="Kartal Sahil Yolu" from="Maltepe" to="Pendik" road_type="1" xcoord="29,16796608" ycoord="40,89472726" /><route id="122" reverse="15" through="23" name="Bağdat Cad. Girişi" from="Bostancı" to="Göztepe" road_type="5" xcoord="29,08420021" ycoord="40,95837583" /><route id="123" reverse="32" through="17" name="Bağdat Cad. Göztepe Parkı" from="Göztepe" to="Kadıköy" road_type="5" xcoord="29,05972693" ycoord="40,97127131" /><route id="124" reverse="32" through="17" name="Üsküdar Sahil Yolu" from="Boğaziçi Köp." to="Üsküdar" road_type="5" xcoord="29,03403306" ycoord="41,03943823" /><route id="125" reverse="17" through="86" name="Beylerbeyi Sahil 
```
- Help response modeli: `HttpResponseMessage`
- Help response alanları: `Version` (Version), `Content` (HttpContent), `StatusCode` (HttpStatusCode), `ReasonPhrase` (string), `Headers` (Collection of             Object), `RequestMessage` (HttpRequestMessage), `IsSuccessStatusCode` (boolean)

### `GET /api/TrafficData/v2/ComTrafficIndex`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v2-ComTrafficIndex>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v2/ComTrafficIndex`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v2/ComTrafficIndex'
```
- Canlı örnek çıktı:
```json
[
  {
    "HAFTA_GUN_ADI": "Çarşamba",
    "SAAT": "00:00",
    "BUGUN": 13,
    "GECEN_HAFTA_BUGUN": 3,
    "GECEN_YIL_BUGUN": 5,
    "GECEN_YIL_1_HAFTA_ONCE_BUGUN": 3
  }
]
```
- Help response modeli: `ComparativeTrafficIndex_v2[]`
- Help response alanları: `HAFTA_GUN_ADI` (string), `SAAT` (string), `BUGUN` (integer), `GECEN_HAFTA_BUGUN` (integer), `GECEN_YIL_BUGUN` (integer), `GECEN_YIL_1_HAFTA_ONCE_BUGUN` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "HAFTA_GUN_ADI": "sample string 1",
    "SAAT": "sample string 2",
    "BUGUN": 3,
    "GECEN_HAFTA_BUGUN": 4,
    "GECEN_YIL_BUGUN": 5,
    "GECEN_YIL_1_HAFTA_ONCE_BUGUN": 6
  },
  {
    "HAFTA_GUN_ADI": "sample string 1",
    "SAAT": "sample string 2",
    "BUGUN": 3,
    "GECEN_HAFTA_BUGUN": 4,
    "GECEN_YIL_BUGUN": 5,
    "GECEN_YIL_1_HAFTA_ONCE_BUGUN": 6
  }
]
```

### `GET /api/TrafficData/v2/Segments`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v2-Segments>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v2/Segments`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv2%2fSegments`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v2/Segments'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fTrafficData%2fv2%2fSegments">here</a>.</h2>
</body></html>
```
- Help response modeli: `VSegmentResponseV2[]`
- Help response alanları: `SegmentID` (integer), `vSegID` (integer), `SegGeometry` (string), `ZoomLevels` (Collection of integer)
- Help örnek response gövdesi:
```json
[
  {
    "SegmentID": 1,
    "vSegID": 2,
    "SegGeometry": "sample string 3",
    "ZoomLevels": [
      1,
      2
    ]
  },
  {
    "SegmentID": 1,
    "vSegID": 2,
    "SegGeometry": "sample string 3",
    "ZoomLevels": [
      1,
      2
    ]
  }
]
```

### `GET /api/TrafficData/v3/SegmentData`

- Açıklama: Trafik yoğunluk haritasında bulunan yollara ait olan anlık ortalama hız bilgilerini döndürür. YHarita v6 için geliştirildi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v3-SegmentData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/SegmentData`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/SegmentData'
```
- Canlı örnek çıktı:
```json
{"Date":"2026-03-11T17:22:23.6234681+03:00","Data":[{"S":1,"V":38,"C":3},{"S":2,"V":17,"C":4},{"S":3,"V":8,"C":5},{"S":4,"V":8,"C":5},{"S":5,"V":17,"C":3},{"S":6,"V":24,"C":3},{"S":7,"V":34,"C":3},{"S":8,"V":48,"C":2},{"S":9,"V":34,"C":3},{"S":10,"V":24,"C":3},{"S":11,"V":18,"C":4},{"S":12,"V":22,"C":3},{"S":13,"V":19,"C":3},{"S":14,"V":24,"C":3},{"S":15,"V":21,"C":3},{"S":16,"V":50,"C":3},{"S":17,"V":99,"C":1},{"S":18,"V":97,"C":2},{"S":19,"V":77,"C":3},{"S":20,"V":87,"C":2},{"S":21,"V":92,"C":2},{"S":22,"V":100,"C":2},{"S":23,"V":40,"C":3},{"S":24,"V":21,"C":4},{"S":25,"V":23,"C":4},{"S":26,"V":35,"C":3},{"S":27,"V":34,"C":3},{"S":28,"V":45,"C":3},{"S":29,"V":51,"C":3},{"S":30,"V":51,"C":3},{"S":31,"V":25,"C":4},{"S":32,"V":70,"C":2},{"S":33,"V":88,"C":1},{"S":34,"V":83,"C":1},{"S":35,"V":79,"C":1},{"S":36,"V":75,"C":2},{"S":37,"V":73,"C":2},{"S":38,"V":75,"C":2},{"S":39,"V":28,"C":3},{"S":40,"V":31,"C":3},{"S":41,"V":15,"C":4},{"S":42,"V":50,"C":2},{"S":43,"V":38,"C":3},{"S":44,"V":32,"C":3},{"S":45,"V":20,"C":3},{"S":46,"V":6,"C":5},{"S":47,"V":44,"C":3},{"S":48,"V":44,"C":3},{"S":49,"V":44,"C":1},{"S":50,"V":66,"C":2},{"S":51,"V":77,"C":1},{"S":52,"V":46,"C":3},{"S":53,"V":54,"C":3},{"S":54,"V":72,"C":1},{"S":55,"V":84,"C":1},{"S":56,"V":60,"C":2},{"S":57,"V":21,"C":4},{"S":58,"V":8,"C":5},{"S":59,"V":10,"C":4},{"S":60,"V":52,"C":1},{"S":61,"V":20,"C":3},{"S":62,"V":10,"C":5},{"S":63,"V":41,"C":2},{"S":64,"V":49,"C":2},{"S":65,"V":39,"C":2},{"S":66,"V":56,"C":1},{"S":67,"V":35,"C":2},{"S":68,"V":44,"C":2},{"S":69,"V":43,"C":3},{"S":70,"V":8,"C":5},{"S":71,"V":8,"C":5},{"S":72,"V":5,"C":5},{"S":73,"V":71,"C":1},{"S":74,"V":35,"C":2},{"S":75,"V":8,"C":5},{"S":76,"V":11,"C":4},{"S":77,"V":20,"C":3},{"S":78,"V":26,"C":1},{"S":79,"V":48,"C":1},{"S":80,"V":30,"C":3},{"S":81,"V":44,"C":2},{"S":82,"V":43,"C":1},{"S":83,"V":21,"C":3},{"S":84,"V":59,"C":2},{"S":85,"V":33,"C":3},{"S":86,"V":19,"C":3},{"S":87,"V":12,"C":3},{"S":88,"V":23,"C":2},{"S":89,"V":22,"C":2},{"S":90,"V":26,"C":1},{"S":91,"V":21,"C":2},{"S":92,"V":29,"C":1},{"S":93,"V":24,"C":2},{"S":94,"V":17,"C":3},{"S":95,"V":20,"C":3},{"S":96,"V":23,"C":3},{"S":97,"V":26,"C":3},{"S":98,"V":28,"C":1},{"S":99,"V":24,"C":2},{"S":100,"V":27,"C":1},{"S":101,"V":28,"C":1},{"S":102,"V":62,"C":1},{"S":103,"V":17,"C":3},{"S":104,"V":29,"C":1},{"S":105,"V":31,"C":1},{"S":106,"V":22,"C":2},{"S":107,"V":21,"C":2},{"S":108,"V":25,"C":2},{"S":109,"V":0,"C":0},{"S":110,"V":25,"C":3},{"S":111,"V":39,"C":3},{"S":112,"V":25,"C":3},{"S":113,"V":64,"C":1},{"S":114,"V":68,"C":1},{"S":115,"V":71,"C":1},{"S":116,"V":46,"C":3},{"S":117,"V":18,"C":4},{"S":118,"V":7,"C":5},{"S":119,"V":28,"C":4},{"S":120,"V":26,"C":4},{"S":121,"V":26,"C":4},{"S":122,"V":23,"C":4},{"S":123,"V":17,"C":5},{"S":124,"V":17,"C":5},{"S":125,"V":86,"C":1},{"S":126,"V":70,"C":2},{"S":127,"V":61,"C":2},{"S":128,"V":51,"C":1},{"S":129,"V":71,"C":1},{"S":130,"V":76,"C":1},{"S":131,"V":68,"C":1},{"S":132,"V":80,"C":1},{"S":133,"V":80,"C":1},{"S":1
```
- Help response modeli: `TrafficDataModelV3`
- Help response alanları: `Date` (date), `Data` (Collection of TrafficDataModelItemV3), `InfoHead` (string), `InfoDetail` (string)
- Help örnek response gövdesi:
```json
{
  "Date": "2026-03-11T17:15:50.0745963+03:00",
  "Data": [
    {
      "S": 1,
      "V": 2,
      "C": 3
    },
    {
      "S": 1,
      "V": 2,
      "C": 3
    }
  ],
  "InfoHead": "sample string 2",
  "InfoDetail": "sample string 3"
}
```

### `GET /api/TrafficData/v3/SegmentData_Report`

- Açıklama: Özel bir veri setinden veri çekerek YHarita6'ya sunar. Geçmiş görünümleri elde etmede kullanılıyor
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v3-SegmentData_Report>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/SegmentData_Report`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/SegmentData_Report'
```
- Canlı örnek çıktı:
```json
{"Date":"2026-03-11T17:22:23.7016+03:00","Data":[{"S":14390,"V":20,"C":3},{"S":3144,"V":22,"C":3},{"S":10946,"V":54,"C":1},{"S":7502,"V":81,"C":2},{"S":5865,"V":19,"C":3},{"S":13264,"V":22,"C":3},{"S":4128,"V":13,"C":3},{"S":13247,"V":43,"C":1},{"S":11472,"V":77,"C":2},{"S":2270,"V":13,"C":3},{"S":7097,"V":14,"C":3},{"S":7222,"V":24,"C":2},{"S":11489,"V":98,"C":1},{"S":16010,"V":38,"C":1},{"S":3710,"V":16,"C":3},{"S":3602,"V":17,"C":3},{"S":13705,"V":18,"C":3},{"S":4007,"V":19,"C":3},{"S":6696,"V":21,"C":3},{"S":4058,"V":22,"C":3},{"S":7485,"V":99,"C":1},{"S":4533,"V":21,"C":3},{"S":14248,"V":24,"C":3},{"S":12933,"V":19,"C":3},{"S":2813,"V":22,"C":3},{"S":2796,"V":13,"C":3},{"S":4864,"V":16,"C":3},{"S":3252,"V":23,"C":3},{"S":15885,"V":21,"C":3},{"S":3812,"V":16,"C":3},{"S":6713,"V":29,"C":2},{"S":12984,"V":18,"C":3},{"S":16674,"V":21,"C":3},{"S":17079,"V":27,"C":2},{"S":14916,"V":21,"C":3},{"S":6111,"V":16,"C":3},{"S":3424,"V":31,"C":2},{"S":6486,"V":59,"C":1},{"S":3407,"V":26,"C":2},{"S":7292,"V":24,"C":2},{"S":3585,"V":24,"C":3},{"S":4075,"V":24,"C":3},{"S":3670,"V":17,"C":3},{"S":14704,"V":27,"C":2},{"S":6571,"V":19,"C":3},{"S":13807,"V":12,"C":3},{"S":13459,"V":26,"C":2},{"S":7171,"V":21,"C":3},{"S":4270,"V":15,"C":3},{"S":12195,"V":17,"C":3},{"S":2864,"V":30,"C":2},{"S":4321,"V":15,"C":3},{"S":3795,"V":14,"C":3},{"S":5585,"V":21,"C":3},{"S":14653,"V":20,"C":3},{"S":2338,"V":14,"C":3},{"S":13968,"V":19,"C":3},{"S":5322,"V":17,"C":3},{"S":7114,"V":19,"C":3},{"S":17011,"V":16,"C":3},{"S":17096,"V":13,"C":3},{"S":16097,"V":23,"C":3},{"S":2355,"V":14,"C":3},{"S":12863,"V":28,"C":2},{"S":5197,"V":18,"C":3},{"S":15425,"V":17,"C":3},{"S":5339,"V":13,"C":3},{"S":16869,"V":16,"C":3},{"S":13372,"V":20,"C":3},{"S":13915,"V":15,"C":3},{"S":1632,"V":46,"C":3},{"S":20,"V":57,"C":2},{"S":16623,"V":19,"C":3},{"S":13510,"V":27,"C":2},{"S":4408,"V":17,"C":3},{"S":16833,"V":16,"C":3},{"S":16165,"V":27,"C":2},{"S":16954,"V":17,"C":3},{"S":16886,"V":14,"C":3},{"S":4584,"V":14,"C":3},{"S":6028,"V":14,"C":3},{"S":981,"V":61,"C":2},{"S":4213,"V":19,"C":3},{"S":298,"V":18,"C":3},{"S":315,"V":38,"C":3},{"S":13514,"V":29,"C":2},{"S":10085,"V":27,"C":2},{"S":10087,"V":19,"C":3},{"S":313,"V":31,"C":4},{"S":245,"V":67,"C":1},{"S":2739,"V":43,"C":1},{"S":2741,"V":44,"C":1},{"S":1687,"V":94,"C":1},{"S":11442,"V":81,"C":1},{"S":16498,"V":77,"C":1},{"S":11137,"V":26,"C":2},{"S":3146,"V":21,"C":3},{"S":160,"V":50,"C":2},{"S":10138,"V":35,"C":2},{"S":10068,"V":68,"C":1},{"S":1229,"V":45,"C":1},{"S":11987,"V":33,"C":2},{"S":12002,"V":36,"C":1},{"S":2213,"V":13,"C":3},{"S":2145,"V":29,"C":2},{"S":12072,"V":30,"C":2},{"S":1299,"V":41,"C":1},{"S":1297,"V":22,"C":2},{"S":11985,"V":31,"C":2},{"S":1161,"V":31,"C":2},{"S":11156,"V":33,"C":2},{"S":1144,"V":65,"C":1},{"S":1214,"V":41,"C":1},{"S":1212,"V":54,"C":1},{"S":10070,"V":32,"C":3},{"S":4743,"V":21,"C":3},{"S":4656,"V":53,"C":1},{"S":4588,"V":47,"C":1},{"S":10155,"V":90,"C":1},{"S":15955,"V":24,"C":3},{"S":11139,"V":32,"C":2},{"S
```
- Help response modeli: `TrafficDataModelV3`
- Help response alanları: `Date` (date), `Data` (Collection of TrafficDataModelItemV3), `InfoHead` (string), `InfoDetail` (string)
- Help örnek response gövdesi:
```json
{
  "Date": "2026-03-11T17:15:50.0902211+03:00",
  "Data": [
    {
      "S": 1,
      "V": 2,
      "C": 3
    },
    {
      "S": 1,
      "V": 2,
      "C": 3
    }
  ],
  "InfoHead": "sample string 2",
  "InfoDetail": "sample string 3"
}
```

### `GET /api/TrafficData/v3/Segments/{ZoomLevel}`

- Açıklama: YHarita v6 için geliştirildi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v3-Segments-ZoomLevel>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/Segments/10`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `ZoomLevel` (integer, Required): 1
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/Segments/10'
```
- Canlı örnek çıktı:
```json
[]
```
- Help response modeli: `VSegmentResponseV3[]`
- Help response alanları: `S` (integer): SegmentID, `G` (string): SegGeometry, `Z` (string): İlçe (Zone - District)
- Help örnek response gövdesi:
```json
[
  {
    "S": 1,
    "G": "sample string 2",
    "Z": "sample string 3"
  },
  {
    "S": 1,
    "G": "sample string 2",
    "Z": "sample string 3"
  }
]
```

### `GET /api/TrafficData/v4/SegmentData`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v4-SegmentData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v4/SegmentData`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v4/SegmentData'
```
- Canlı örnek çıktı:
```json
{"Date":"2026-03-11T17:22:12.7144331+03:00","Data":[{"T":"BM","S":1,"V":38,"C":3,"D":"17:20"},{"T":"BM","S":2,"V":17,"C":4,"D":"17:20"},{"T":"BM","S":3,"V":8,"C":5,"D":"17:20"},{"T":"BM","S":4,"V":8,"C":5,"D":"17:20"},{"T":"BM","S":5,"V":17,"C":3,"D":"17:20"},{"T":"BM","S":6,"V":24,"C":3,"D":"17:20"},{"T":"BM","S":7,"V":34,"C":3,"D":"17:20"},{"T":"BM","S":8,"V":48,"C":2,"D":"17:20"},{"T":"BM","S":9,"V":34,"C":3,"D":"17:20"},{"T":"BM","S":10,"V":24,"C":3,"D":"17:20"},{"T":"BM","S":11,"V":18,"C":4,"D":"17:20"},{"T":"BM","S":12,"V":22,"C":3,"D":"17:20"},{"T":"BM","S":13,"V":19,"C":3,"D":"17:20"},{"T":"BM","S":14,"V":24,"C":3,"D":"17:20"},{"T":"BM","S":15,"V":21,"C":3,"D":"17:20"},{"T":"BM","S":16,"V":50,"C":3,"D":"17:20"},{"T":"FD","S":17,"V":99,"C":1,"D":"17:22"},{"T":"BM","S":18,"V":97,"C":2,"D":"17:20"},{"T":"BM","S":19,"V":77,"C":3,"D":"17:20"},{"T":"BM","S":20,"V":87,"C":2,"D":"17:20"},{"T":"BM","S":21,"V":92,"C":2,"D":"17:20"},{"T":"BM","S":22,"V":100,"C":2,"D":"17:20"},{"T":"BM","S":23,"V":40,"C":3,"D":"17:20"},{"T":"BM","S":24,"V":21,"C":4,"D":"17:20"},{"T":"BM","S":25,"V":23,"C":4,"D":"17:20"},{"T":"BM","S":26,"V":35,"C":3,"D":"17:20"},{"T":"BM","S":27,"V":34,"C":3,"D":"17:20"},{"T":"BM","S":28,"V":45,"C":3,"D":"17:20"},{"T":"FD","S":29,"V":51,"C":3,"D":"17:22"},{"T":"FD","S":30,"V":51,"C":3,"D":"17:22"},{"T":"BM","S":31,"V":25,"C":4,"D":"17:20"},{"T":"BM","S":32,"V":70,"C":2,"D":"17:20"},{"T":"FD","S":33,"V":88,"C":1,"D":"17:22"},{"T":"BM","S":34,"V":83,"C":1,"D":"17:20"},{"T":"FD","S":35,"V":79,"C":1,"D":"17:22"},{"T":"FD","S":36,"V":75,"C":2,"D":"17:22"},{"T":"FD","S":37,"V":73,"C":2,"D":"17:22"},{"T":"FD","S":38,"V":75,"C":2,"D":"17:22"},{"T":"BM","S":39,"V":28,"C":3,"D":"17:20"},{"T":"BM","S":40,"V":31,"C":3,"D":"17:20"},{"T":"BM","S":41,"V":15,"C":4,"D":"17:20"},{"T":"BM","S":42,"V":50,"C":2,"D":"17:20"},{"T":"BM","S":43,"V":38,"C":3,"D":"17:20"},{"T":"BM","S":44,"V":32,"C":3,"D":"17:20"},{"T":"BM","S":45,"V":20,"C":3,"D":"17:20"},{"T":"BM","S":46,"V":6,"C":5,"D":"17:20"},{"T":"BM","S":47,"V":44,"C":3,"D":"17:20"},{"T":"BM","S":48,"V":44,"C":3,"D":"17:20"},{"T":"FD","S":49,"V":44,"C":1,"D":"17:22"},{"T":"BM","S":50,"V":66,"C":2,"D":"17:20"},{"T":"BM","S":51,"V":77,"C":1,"D":"17:20"},{"T":"BM","S":52,"V":46,"C":3,"D":"17:20"},{"T":"BM","S":53,"V":54,"C":3,"D":"17:20"},{"T":"BM","S":54,"V":72,"C":1,"D":"17:20"},{"T":"FD","S":55,"V":84,"C":1,"D":"17:22"},{"T":"BM","S":56,"V":60,"C":2,"D":"17:20"},{"T":"BM","S":57,"V":21,"C":4,"D":"17:20"},{"T":"BM","S":58,"V":8,"C":5,"D":"17:20"},{"T":"BM","S":59,"V":10,"C":4,"D":"17:20"},{"T":"BM","S":60,"V":52,"C":1,"D":"17:20"},{"T":"BM","S":61,"V":20,"C":3,"D":"17:20"},{"T":"FD","S":62,"V":10,"C":5,"D":"17:22"},{"T":"FD","S":63,"V":41,"C":2,"D":"17:22"},{"T":"FD","S":64,"V":49,"C":2,"D":"17:22"},{"T":"FD","S":65,"V":39,"C":2,"D":"17:22"},{"T":"BM","S":66,"V":56,"C":1,"D":"17:20"},{"T":"BM","S":67,"V":35,"C":2,"D":"17:20"},{"T":"BM","S":68,"V":44,"C":2,"D":"17:20"},{"T":"BM","S":69,"V":43,"C":3,"D":"1
```
- Help response modeli: `TrafficDataModelV4`
- Help response alanları: `Date` (date), `Data` (Collection of TrafficDataModelItemV4)
- Help örnek response gövdesi:
```json
{
  "Date": "2026-03-11T17:15:50.0902211+03:00",
  "Data": [
    {
      "T": "sample string 1",
      "S": 2,
      "V": 3,
      "C": 4,
      "D": "sample string 5"
    },
    {
      "T": "sample string 1",
      "S": 2,
      "V": 3,
      "C": 4,
      "D": "sample string 5"
    }
  ]
}
```

## VmsData

### `GET /api/VmsData/v1/BridgesStatus`

- Açıklama: Tüm trafik VMS mesajlarının trafik durumu bilgisini döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-VmsData-v1-BridgesStatus>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/BridgesStatus`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fVmsData%2fv1%2fBridgesStatus`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/BridgesStatus'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fVmsData%2fv1%2fBridgesStatus">here</a>.</h2>
</body></html>
```
- Help response modeli: `RouteStatusModel[]`
- Help response alanları: `RouteId` (integer), `Cong` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "RouteId": 1,
    "Cong": 2
  },
  {
    "RouteId": 1,
    "Cong": 2
  }
]
```

### `GET /api/VmsData/v1/BridgesStatusForMobile`

- Açıklama: CepTrafik köprü güzergahlarının trafik durumu bilgisini döndürür.
            GrupId:1--> 15 Temmuz Şehitler Köprüsü (Avrupa --> Anadolu)
            GrupId:2 --> FSM (Avrupa --> Anadolu)
            GrupId:3 --> YSS (Avrupa --> Anadolu)
            GrupId:4 --> Avrasya Tüneli (Avrupa --> Anadolu)
            GrupId:5--> 15 Temmuz Şehitler Köprüsü (Anadolu --> Avrupa)
            GrupId:6 --> FSM (Anadolu --> Avrupa)
            GrupId:7 --> YSS (Anadolu --> Avrupa)
            GrupId:8 --> Avrasya Tüneli (Anadolu --> Avrupa)
            Not: 69 numaralı route 15 Temmuz Şehitler Köprüsü (Anadolu --> Avrupa) ve  Avrasya Tüneli (Anadolu --> Avrupa) güzergahlarında kullanılmaktadır.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-VmsData-v1-BridgesStatusForMobile>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/BridgesStatusForMobile`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fVmsData%2fv1%2fBridgesStatusForMobile`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/BridgesStatusForMobile'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fVmsData%2fv1%2fBridgesStatusForMobile">here</a>.</h2>
</body></html>
```
- Help response modeli: `BridgeRouteStatusModel[]`
- Help response alanları: `RouteId` (integer), `RouteName` (string), `Status` (string), `OrderNo` (integer), `GroupId` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "RouteId": 1,
    "RouteName": "sample string 2",
    "Status": "sample string 3",
    "OrderNo": 4,
    "GroupId": 5
  },
  {
    "RouteId": 1,
    "RouteName": "sample string 2",
    "Status": "sample string 3",
    "OrderNo": 4,
    "GroupId": 5
  }
]
```

### `GET /api/VmsData/v1/DashVmsCount`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-VmsData-v1-DashVmsCount>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/DashVmsCount`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fVmsData%2fv1%2fDashVmsCount`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/DashVmsCount'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fVmsData%2fv1%2fDashVmsCount">here</a>.</h2>
</body></html>
```
- Help response modeli: `Result_INT`
- Help response alanları: `Res` (integer)
- Help örnek response gövdesi:
```json
{
  "Res": 1
}
```

### `GET /api/VmsData/v1/VmsData/{VmsId}`

- Açıklama: Tüm trafik VMS mesajlarının VmsId ye göre trafik durumu bilgisini döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-VmsData-v1-VmsData-VmsId>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/VmsData/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fVmsData%2fv1%2fVmsData%2f1`
- Yol/query parametreleri: `VmsId` (integer, Default value is 0)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/VmsData/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fVmsData%2fv1%2fVmsData%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `VmsStatusModel[]`
- Help response alanları: `SYSTEM_ID` (integer), `COLUMN_NUMBER` (integer), `SYSTEM_NAME_VIEW` (string), `SYSTEM_NO` (integer), `ROUTE_NAME_VMS` (string), `TRF_MSG_ID` (integer), `CONG_CODE` (integer), `VIRTUAL_SEG_ID` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "SYSTEM_ID": 1,
    "COLUMN_NUMBER": 2,
    "SYSTEM_NAME_VIEW": "sample string 3",
    "SYSTEM_NO": 4,
    "ROUTE_NAME_VMS": "sample string 5",
    "TRF_MSG_ID": 6,
    "CONG_CODE": 7,
    "VIRTUAL_SEG_ID": 8
  },
  {
    "SYSTEM_ID": 1,
    "COLUMN_NUMBER": 2,
    "SYSTEM_NAME_VIEW": "sample string 3",
    "SYSTEM_NO": 4,
    "ROUTE_NAME_VMS": "sample string 5",
    "TRF_MSG_ID": 6,
    "CONG_CODE": 7,
    "VIRTUAL_SEG_ID": 8
  }
]
```

## Mobile

### `POST /api/Mobile/v1/AndroidConfiguration`

- Açıklama: Android kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-AndroidConfiguration>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/AndroidConfiguration`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/AndroidConfiguration'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/AndroidConfiguration' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "Id": "sample string 2",
  "IdType": "sample string 3",
  "Brand": "sample string 4",
  "Model": "sample string 5",
  "Sdk": 6,
  "AppVersion": "sample string 7",
  "DeviceToken": "sample string 8",
  "isPushEnabled": 9,
  "LocationPermission": 10,
  "XCoord": 11.1,
  "YCoord": 12.1
}'
```
- Help request modeli: `AndroidConfigurationModel`
- Help request alanları: `UserId` (integer, Required): Iphone user id, `Id` (string, Required): Android  id, `IdType` (string, Required): Android idType, `Brand` (string, Required): Android marka, `Model` (string, Required): Android model, `Sdk` (integer, Required): Anroid sdk, `AppVersion` (string, Required): Uygulama versiyonu, `DeviceToken` (string, Required): Android deviceToken, `isPushEnabled` (integer, Required): push Notifikasyon izni, `LocationPermission` (integer, Required): Konum kullanabilme izni, `XCoord` (decimal number): X koordinatı, `YCoord` (decimal number): Y koordinatı
- Help örnek request gövdesi:
```json
{
  "UserId": 1,
  "Id": "sample string 2",
  "IdType": "sample string 3",
  "Brand": "sample string 4",
  "Model": "sample string 5",
  "Sdk": 6,
  "AppVersion": "sample string 7",
  "DeviceToken": "sample string 8",
  "isPushEnabled": 9,
  "LocationPermission": 10,
  "XCoord": 11.1,
  "YCoord": 12.1
}
```
- Help response modeli: `ResponseUser`
- Help response alanları: `UserId` (integer)
- Help örnek response gövdesi:
```json
{
  "UserId": 1
}
```

### `POST /api/Mobile/v1/AndroidLoc`

- Açıklama: Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (Android için)
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-AndroidLoc>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/AndroidLoc`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/AndroidLoc'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/AndroidLoc' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "xCoord": 2.1,
  "yCoord": 3.1,
  "rawSpeed": 64,
  "degree": 5.1,
  "accuracy": 6.1,
  "rawDate": "2026-03-11T17:15:50.2152676+03:00",
  "segID": 1,
  "segAngle": 1,
  "segDir": 1
}'
```
- Help request modeli: `Android_Raw`
- Help request alanları: `UserId` (integer), `xCoord` (decimal number), `yCoord` (decimal number), `rawSpeed` (byte), `degree` (decimal number), `accuracy` (decimal number), `rawDate` (date), `segID` (integer), `segAngle` (integer), `segDir` (integer)
- Help örnek request gövdesi:
```json
{
  "UserId": 1,
  "xCoord": 2.1,
  "yCoord": 3.1,
  "rawSpeed": 64,
  "degree": 5.1,
  "accuracy": 6.1,
  "rawDate": "2026-03-11T17:15:50.2152676+03:00",
  "segID": 1,
  "segAngle": 1,
  "segDir": 1
}
```
- Help response modeli: `ResponseLocationResult`
- Help response alanları: `Result` (string)
- Help örnek response gövdesi:
```json
{
  "Result": "sample string 1"
}
```

### `POST /api/Mobile/v1/IphoneConfiguration`

- Açıklama: Iphone kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-IphoneConfiguration>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/IphoneConfiguration`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/IphoneConfiguration'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/IphoneConfiguration' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "UDId": "sample string 2",
  "Model": "sample string 3",
  "OsVersion": "sample string 4",
  "AppVersion": "sample string 5",
  "LocationPermission": 6,
  "DeviceToken": "sample string 7",
  "isPushEnabled": 8,
  "XCoord": 9.1,
  "YCoord": 10.1
}'
```
- Help request modeli: `IphoneConfigurationModel`
- Help request alanları: `UserId` (integer, Required): Iphone user id, `UDId` (string, Required): Iphone UDId, `Model` (string, Required): Iphone Model, `OsVersion` (string, Required): Iphone Operation System Versiyonu, `AppVersion` (string, Required): Uygulama versiyonu, `LocationPermission` (integer, Required): Konum kullanabilme izni, `DeviceToken` (string, Required): Iphone deviceToken, `isPushEnabled` (integer, Required): push Notifikasyon izni, `XCoord` (decimal number): X koordinatı, `YCoord` (decimal number): Y koordinatı
- Help örnek request gövdesi:
```json
{
  "UserId": 1,
  "UDId": "sample string 2",
  "Model": "sample string 3",
  "OsVersion": "sample string 4",
  "AppVersion": "sample string 5",
  "LocationPermission": 6,
  "DeviceToken": "sample string 7",
  "isPushEnabled": 8,
  "XCoord": 9.1,
  "YCoord": 10.1
}
```
- Help response modeli: `ResponseUser`
- Help response alanları: `UserId` (integer)
- Help örnek response gövdesi:
```json
{
  "UserId": 1
}
```

### `POST /api/Mobile/v1/IphoneLoc`

- Açıklama: Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (IPhone için).
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-IphoneLoc>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/IphoneLoc`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/IphoneLoc'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/IphoneLoc' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserID": 1,
  "UDID": "sample string 2",
  "xCoord": 3.1,
  "yCoord": 4.1,
  "rawSpeed": 64,
  "degree": 6.1,
  "horizontalAcc": 7.1,
  "verticalAcc": 8.1,
  "rawDate": "2026-03-11T17:15:50.2308644+03:00",
  "segID": 1,
  "segAngle": 1,
  "segDir": 1
}'
```
- Help request modeli: `Iphone_Raw`
- Help request alanları: `UserID` (integer), `UDID` (string), `xCoord` (decimal number), `yCoord` (decimal number), `rawSpeed` (byte), `degree` (decimal number), `horizontalAcc` (decimal number), `verticalAcc` (decimal number), `rawDate` (date), `segID` (integer), `segAngle` (integer), `segDir` (integer)
- Help örnek request gövdesi:
```json
{
  "UserID": 1,
  "UDID": "sample string 2",
  "xCoord": 3.1,
  "yCoord": 4.1,
  "rawSpeed": 64,
  "degree": 6.1,
  "horizontalAcc": 7.1,
  "verticalAcc": 8.1,
  "rawDate": "2026-03-11T17:15:50.2308644+03:00",
  "segID": 1,
  "segAngle": 1,
  "segDir": 1
}
```
- Help response modeli: `ResponseLocationResult`
- Help response alanları: `Result` (string)
- Help örnek response gövdesi:
```json
{
  "Result": "sample string 1"
}
```

### `POST /api/Mobile/v1/SaveSession/Get/{loginId}`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-SaveSession-Get-loginId>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Get/1`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: `loginId` (globally unique identifier)
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Get/1'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Get/1'
```
- Help request modeli: Belirtilmemiş.
- Help response modeli: `UserSession[]`
- Help response alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Help örnek response gövdesi:
```json
[
  {
    "LoginID": "e0ed4906-056c-4940-ac13-6bd7affcba37",
    "UserID": 2,
    "MobileUserType": 64,
    "LoginDate": "2026-03-11T17:15:50.2308644+03:00",
    "LoginX": "sample string 5",
    "LoginY": "sample string 6",
    "LogoutDate": "2026-03-11T17:15:50.2308644+03:00",
    "LogoutX": "sample string 7",
    "LogoutY": "sample string 8"
  },
  {
    "LoginID": "e0ed4906-056c-4940-ac13-6bd7affcba37",
    "UserID": 2,
    "MobileUserType": 64,
    "LoginDate": "2026-03-11T17:15:50.2308644+03:00",
    "LoginX": "sample string 5",
    "LoginY": "sample string 6",
    "LogoutDate": "2026-03-11T17:15:50.2308644+03:00",
    "LogoutX": "sample string 7",
    "LogoutY": "sample string 8"
  }
]
```

### `POST /api/Mobile/v1/SaveSession/Get?loginId={loginId}`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-SaveSession-Get_loginId>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Get?loginId=1`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: `loginId` (globally unique identifier)
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Get?loginId=1'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Get?loginId=1'
```
- Help request modeli: Belirtilmemiş.
- Help response modeli: `UserSession[]`
- Help response alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Help örnek response gövdesi:
```json
[
  {
    "LoginID": "a682fe26-18d3-498b-9596-4df5116f7116",
    "UserID": 2,
    "MobileUserType": 64,
    "LoginDate": "2026-03-11T17:15:50.2308644+03:00",
    "LoginX": "sample string 5",
    "LoginY": "sample string 6",
    "LogoutDate": "2026-03-11T17:15:50.2308644+03:00",
    "LogoutX": "sample string 7",
    "LogoutY": "sample string 8"
  },
  {
    "LoginID": "a682fe26-18d3-498b-9596-4df5116f7116",
    "UserID": 2,
    "MobileUserType": 64,
    "LoginDate": "2026-03-11T17:15:50.2308644+03:00",
    "LoginX": "sample string 5",
    "LoginY": "sample string 6",
    "LogoutDate": "2026-03-11T17:15:50.2308644+03:00",
    "LogoutX": "sample string 7",
    "LogoutY": "sample string 8"
  }
]
```

### `POST /api/Mobile/v1/SaveSession/Login`

- Açıklama: CepTrafik uygulamasında her client oturumu açıldığında kayıt atar. Yoğun kullanımlı günlerde yükü görmek için eklendi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-SaveSession-Login>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Login`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Login'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Login'
```
- Help request modeli: Belirtilmemiş.
- Help response modeli: Belirtilmemiş.

### `POST /api/Mobile/v1/SaveSession/Logout`

- Açıklama: CepTrafik uygulamasında client oturumu kapatma
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-SaveSession-Logout>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Logout`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Logout'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Logout' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "LoginID": "0eddad58-29d5-479c-a818-54d4abae7c90",
  "UserID": 2,
  "MobileUserType": 64,
  "LoginDate": "2026-03-11T17:15:50.2308644+03:00",
  "LoginX": "sample string 5",
  "LoginY": "sample string 6",
  "LogoutDate": "2026-03-11T17:15:50.2308644+03:00",
  "LogoutX": "sample string 7",
  "LogoutY": "sample string 8"
}'
```
- Help request modeli: `UserSession`
- Help request alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Help örnek request gövdesi:
```json
{
  "LoginID": "0eddad58-29d5-479c-a818-54d4abae7c90",
  "UserID": 2,
  "MobileUserType": 64,
  "LoginDate": "2026-03-11T17:15:50.2308644+03:00",
  "LoginX": "sample string 5",
  "LoginY": "sample string 6",
  "LogoutDate": "2026-03-11T17:15:50.2308644+03:00",
  "LogoutX": "sample string 7",
  "LogoutY": "sample string 8"
}
```
- Help response modeli: `UserSessionResult`
- Help response alanları: `Result` (string)
- Help örnek response gövdesi:
```json
{
  "Result": "sample string 1"
}
```

## MobileExtensions

### `GET /api/MobileExtensions/v1/ActiveIcon`

- Açıklama: Aktif ikon bilgisini döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-MobileExtensions-v1-ActiveIcon>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/ActiveIcon`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fMobileExtensions%2fv1%2fActiveIcon`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/ActiveIcon'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fMobileExtensions%2fv1%2fActiveIcon">here</a>.</h2>
</body></html>
```
- Help response modeli: `ActiveIcon[]`
- Help response alanları: `Id` (integer), `Name` (string)
- Help örnek response gövdesi:
```json
[
  {
    "Id": 1,
    "Name": "sample string 2"
  },
  {
    "Id": 1,
    "Name": "sample string 2"
  }
]
```

### `POST /api/MobileExtensions/v1/DeleteUser`

- Açıklama: Uygulamaya giriş yapmış kullanıcı bilgilerini siler
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-DeleteUser>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DeleteUser`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DeleteUser'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DeleteUser' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "OS": "sample string 4",
  "OSVersion": "sample string 5",
  "DeviceModel": "sample string 6",
  "DeviceNetwork": "sample string 7",
  "DeviceCountry": "sample string 8",
  "DeviceLanguage": "sample string 9",
  "DeviceChargingStatus": 10,
  "AppName": "sample string 11",
  "AppVersion": "sample string 12",
  "LastLocation": "sample string 13",
  "Platform": "sample string 14"
}'
```
- Help request modeli: `UserSave`
- Help request alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `AppBundleID` (string, Required): Application Bundle ID, `OS` (string, Required): Operating System, `OSVersion` (string, Required): Operating System Version, `DeviceModel` (string, Required): Device Model, `DeviceNetwork` (string, Required): Device Network, `DeviceCountry` (string, Required): Device Country, `DeviceLanguage` (string, Required): Device Language, `DeviceChargingStatus` (integer, Required): Device Charging Status, `AppName` (string, Required): Application Name, `AppVersion` (string, Required): Application Version, `LastLocation` (string, Required): Last Location, `Platform` (string, Required): Platform
- Help örnek request gövdesi:
```json
{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "OS": "sample string 4",
  "OSVersion": "sample string 5",
  "DeviceModel": "sample string 6",
  "DeviceNetwork": "sample string 7",
  "DeviceCountry": "sample string 8",
  "DeviceLanguage": "sample string 9",
  "DeviceChargingStatus": 10,
  "AppName": "sample string 11",
  "AppVersion": "sample string 12",
  "LastLocation": "sample string 13",
  "Platform": "sample string 14"
}
```
- Help response modeli: `UserSaveResult`
- Help response alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Help örnek response gövdesi:
```json
{
  "ID": 1,
  "State": 2,
  "Message": "sample string 3",
  "UDID": "sample string 4"
}
```

### `POST /api/MobileExtensions/v1/DetailedUsersInformationDelete`

- Açıklama: Kullanıci siler.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-DetailedUsersInformationDelete>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DetailedUsersInformationDelete`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DetailedUsersInformationDelete'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DetailedUsersInformationDelete' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "MobileUserId": 1,
  "MobileUserType": 2,
  "Name": "sample string 3",
  "Surname": "sample string 4",
  "MobilePhone": "sample string 5",
  "Email": "sample string 6",
  "SocialMediaAccountType": 7,
  "SocialMediaAccount": "sample string 8"
}'
```
- Help request modeli: `DetailedUsersInformation`
- Help request alanları: `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi, `Name` (string, Required): Adı, `Surname` (string, Required): Soyadı, `MobilePhone` (string, Required): Cep Tel, `Email` (string, Required): E-posta, `SocialMediaAccountType` (integer, Required): Sosyal Medya Hesabı, `SocialMediaAccount` (string, Required): Sosyal Medya Hesabı
- Help örnek request gövdesi:
```json
{
  "MobileUserId": 1,
  "MobileUserType": 2,
  "Name": "sample string 3",
  "Surname": "sample string 4",
  "MobilePhone": "sample string 5",
  "Email": "sample string 6",
  "SocialMediaAccountType": 7,
  "SocialMediaAccount": "sample string 8"
}
```
- Help response modeli: `DetailedUsersInformationInsertResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/DetailedUsersInformationInsert`

- Açıklama: Kullanıcıların detaylı bilgilerini kaydeden procedure.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-DetailedUsersInformationInsert>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DetailedUsersInformationInsert`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DetailedUsersInformationInsert'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DetailedUsersInformationInsert' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "MobileUserId": 1,
  "MobileUserType": 2,
  "Name": "sample string 3",
  "Surname": "sample string 4",
  "MobilePhone": "sample string 5",
  "Email": "sample string 6",
  "SocialMediaAccountType": 7,
  "SocialMediaAccount": "sample string 8"
}'
```
- Help request modeli: `DetailedUsersInformation`
- Help request alanları: `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi, `Name` (string, Required): Adı, `Surname` (string, Required): Soyadı, `MobilePhone` (string, Required): Cep Tel, `Email` (string, Required): E-posta, `SocialMediaAccountType` (integer, Required): Sosyal Medya Hesabı, `SocialMediaAccount` (string, Required): Sosyal Medya Hesabı
- Help örnek request gövdesi:
```json
{
  "MobileUserId": 1,
  "MobileUserType": 2,
  "Name": "sample string 3",
  "Surname": "sample string 4",
  "MobilePhone": "sample string 5",
  "Email": "sample string 6",
  "SocialMediaAccountType": 7,
  "SocialMediaAccount": "sample string 8"
}
```
- Help response modeli: `DetailedUsersInformationInsertResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/FavoriteAddressDelete`

- Açıklama: Kullanıcıların favori adresleri silinir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-FavoriteAddressDelete>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/FavoriteAddressDelete`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/FavoriteAddressDelete'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/FavoriteAddressDelete' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "FavoriteAddressId": 1
}'
```
- Help request modeli: `FavoriteAddressDeleteModel`
- Help request alanları: `FavoriteAddressId` (integer)
- Help örnek request gövdesi:
```json
{
  "FavoriteAddressId": 1
}
```
- Help response modeli: `FavoriteAddressDeleteResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/FavoriteAddressInsert`

- Açıklama: Kullanıcıların favori adresleri eklenir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-FavoriteAddressInsert>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/FavoriteAddressInsert`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/FavoriteAddressInsert'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/FavoriteAddressInsert' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "UserType": 2,
  "FavoriteAddressType": 3,
  "Title": "sample string 4",
  "Address": "sample string 5",
  "XCoord": 6.1,
  "YCoord": 7.1,
  "OrderId": 8,
  "EntityId": 9
}'
```
- Help request modeli: `FavoriteAddressInformation`
- Help request alanları: `UserId` (integer): IphoneUsers veya AndroidUsers id'lerini alır, `UserType` (integer): IphoneUsers=1 AndroidUsers=0, `FavoriteAddressType` (integer): Home:1, Work:2, Other:3, Camera:4, Park:5, `Title` (string): Favori adres başlığı, `Address` (string): Kullanıcının adresi, `XCoord` (decimal number): Favori adresin X koordinatı, `YCoord` (decimal number): Favori adresin Y koordinatı, `OrderId` (integer): Favori adres sıralaması, `EntityId` (integer): Camera - Otopark ID
- Help örnek request gövdesi:
```json
{
  "UserId": 1,
  "UserType": 2,
  "FavoriteAddressType": 3,
  "Title": "sample string 4",
  "Address": "sample string 5",
  "XCoord": 6.1,
  "YCoord": 7.1,
  "OrderId": 8,
  "EntityId": 9
}
```
- Help response modeli: `FavoriteAddressInsertResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/HearingImpairedInsert`

- Açıklama: İşitme Engelli Kullanıcı bilgileri kaydedilir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-HearingImpairedInsert>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/HearingImpairedInsert`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/HearingImpairedInsert'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/HearingImpairedInsert' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "MobileUserId": 1,
  "MobileUserType": 2,
  "Name": "sample string 3",
  "Surname": "sample string 4",
  "IdentityNumber": 5,
  "YearOfBirth": 6,
  "Mobile": "sample string 7",
  "Email": "sample string 8"
}'
```
- Help request modeli: `HearingImpairedInformation`
- Help request alanları: `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi, `Name` (string, Required): Adı, `Surname` (string, Required): Soyadı, `IdentityNumber` (integer, Required): TC Kimlik No, `YearOfBirth` (integer, Required): Doğum Yılı., `Mobile` (string, Required): Cep Tel., `Email` (string, Required): E-posta.
- Help örnek request gövdesi:
```json
{
  "MobileUserId": 1,
  "MobileUserType": 2,
  "Name": "sample string 3",
  "Surname": "sample string 4",
  "IdentityNumber": 5,
  "YearOfBirth": 6,
  "Mobile": "sample string 7",
  "Email": "sample string 8"
}
```
- Help response modeli: `HearingImpairedInsertResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/HearingImpairedStatus`

- Açıklama: İşitme engelli kullanıcıların durumunu kontrol etmek için kullanılmaktadır.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-HearingImpairedStatus>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/HearingImpairedStatus`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/HearingImpairedStatus'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/HearingImpairedStatus' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "UserType": 64
}'
```
- Help request modeli: `RequestHearingImpairedUser`
- Help request alanları: `UserId` (integer), `UserType` (byte)
- Help örnek request gövdesi:
```json
{
  "UserId": 1,
  "UserType": 64
}
```
- Help response modeli: `ResponseHearingImpairedStatus`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/InsertFeedback`

- Açıklama: Mobil Kullanıcı bildirimlerini kaydeden api.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-InsertFeedback>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/InsertFeedback`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/InsertFeedback'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/InsertFeedback' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "FeedbackType": 1,
  "Description": "sample string 2",
  "XCoord": "sample string 3",
  "YCoord": "sample string 4",
  "MobileUserId": 5,
  "MobileUserType": 6
}'
```
- Help request modeli: `MobileUserFeedbackModel`
- Help request alanları: `FeedbackType` (integer, Required): Geri Bildirim Tipi, `Description` (string, Required): Açıklama, `XCoord` (string, Required): X Koordinatı., `YCoord` (string, Required): Y Koordinatı., `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi
- Help örnek request gövdesi:
```json
{
  "FeedbackType": 1,
  "Description": "sample string 2",
  "XCoord": "sample string 3",
  "YCoord": "sample string 4",
  "MobileUserId": 5,
  "MobileUserType": 6
}
```
- Help response modeli: `MobileUserFeedbackInsertResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/SaveAndroidUserApp`

- Açıklama: Uygulama kullanıcılarının telefonlarında yer alan diğer uygulamaları kaydeder.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-SaveAndroidUserApp>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveAndroidUserApp`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveAndroidUserApp'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveAndroidUserApp' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "AppName": "sample string 4"
}'
```
- Help request modeli: `AndroidUserAppSave`
- Help request alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `AppBundleID` (string, Required): Application Bundle ID, `AppName` (string, Required): Application Name
- Help örnek request gövdesi:
```json
{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "AppName": "sample string 4"
}
```
- Help response modeli: `AndroidUserAppSaveResult`
- Help response alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Help örnek response gövdesi:
```json
{
  "ID": 1,
  "State": 2,
  "Message": "sample string 3",
  "UDID": "sample string 4"
}
```

### `POST /api/MobileExtensions/v1/SaveAndroidUserAppList`

- Açıklama: Uygulama kullanıcılarının telefonlarında yer alan diğer uygulamaları liste şeklinde kaydeder.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-SaveAndroidUserAppList>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveAndroidUserAppList`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveAndroidUserAppList'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveAndroidUserAppList' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "androidUser": {
    "UDID": "sample string 1",
    "UserTokenOrID": "sample string 2",
    "AppList": [
      {
        "AppBundleID": "sample string 1",
        "AppName": "sample string 2"
      },
      {
        "AppBundleID": "sample string 1",
        "AppName": "sample string 2"
      }
    ]
  },
  "appList": [
    {
      "AppBundleID": "sample string 1",
      "AppName": "sample string 2"
    },
    {
      "AppBundleID": "sample string 1",
      "AppName": "sample string 2"
    }
  ]
}'
```
- Help request modeli: `AndroidUserAppViewModels`
- Help request alanları: `androidUser` (AndroidUser), `appList` (Collection of AppList)
- Help örnek request gövdesi:
```json
{
  "androidUser": {
    "UDID": "sample string 1",
    "UserTokenOrID": "sample string 2",
    "AppList": [
      {
        "AppBundleID": "sample string 1",
        "AppName": "sample string 2"
      },
      {
        "AppBundleID": "sample string 1",
        "AppName": "sample string 2"
      }
    ]
  },
  "appList": [
    {
      "AppBundleID": "sample string 1",
      "AppName": "sample string 2"
    },
    {
      "AppBundleID": "sample string 1",
      "AppName": "sample string 2"
    }
  ]
}
```
- Help response modeli: `AndroidUserAppSaveResult`
- Help response alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Help örnek response gövdesi:
```json
{
  "ID": 1,
  "State": 2,
  "Message": "sample string 3",
  "UDID": "sample string 4"
}
```

### `POST /api/MobileExtensions/v1/SaveLocation`

- Açıklama: Kullanıcıların konum ve hız bilgileri kaydedilir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-SaveLocation>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveLocation`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveLocation'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveLocation' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "Latitude": 3.1,
  "Longitude": 4.1,
  "SpeedValue": 5,
  "AppBundleID": "sample string 6"
}'
```
- Help request modeli: `LocationSave`
- Help request alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `Latitude` (decimal number, Required): Latitude, `Longitude` (decimal number, Required): Longitude, `SpeedValue` (integer, Required): SpeedValue, `AppBundleID` (string, Required): Apple Bundle ID
- Help örnek request gövdesi:
```json
{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "Latitude": 3.1,
  "Longitude": 4.1,
  "SpeedValue": 5,
  "AppBundleID": "sample string 6"
}
```
- Help response modeli: `LocationSaveResult`
- Help response alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Help örnek response gövdesi:
```json
{
  "ID": 1,
  "State": 2,
  "Message": "sample string 3",
  "UDID": "sample string 4"
}
```

### `POST /api/MobileExtensions/v1/SaveUser`

- Açıklama: Uygulamaya giriş yapmış kullanıcıların cihaz bilgileri ve uygulama özellikleri kaydedilir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-SaveUser>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveUser`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveUser'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveUser' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "OS": "sample string 4",
  "OSVersion": "sample string 5",
  "DeviceModel": "sample string 6",
  "DeviceNetwork": "sample string 7",
  "DeviceCountry": "sample string 8",
  "DeviceLanguage": "sample string 9",
  "DeviceChargingStatus": 10,
  "AppName": "sample string 11",
  "AppVersion": "sample string 12",
  "LastLocation": "sample string 13",
  "Platform": "sample string 14"
}'
```
- Help request modeli: `UserSave`
- Help request alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `AppBundleID` (string, Required): Application Bundle ID, `OS` (string, Required): Operating System, `OSVersion` (string, Required): Operating System Version, `DeviceModel` (string, Required): Device Model, `DeviceNetwork` (string, Required): Device Network, `DeviceCountry` (string, Required): Device Country, `DeviceLanguage` (string, Required): Device Language, `DeviceChargingStatus` (integer, Required): Device Charging Status, `AppName` (string, Required): Application Name, `AppVersion` (string, Required): Application Version, `LastLocation` (string, Required): Last Location, `Platform` (string, Required): Platform
- Help örnek request gövdesi:
```json
{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "OS": "sample string 4",
  "OSVersion": "sample string 5",
  "DeviceModel": "sample string 6",
  "DeviceNetwork": "sample string 7",
  "DeviceCountry": "sample string 8",
  "DeviceLanguage": "sample string 9",
  "DeviceChargingStatus": 10,
  "AppName": "sample string 11",
  "AppVersion": "sample string 12",
  "LastLocation": "sample string 13",
  "Platform": "sample string 14"
}
```
- Help response modeli: `UserSaveResult`
- Help response alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Help örnek response gövdesi:
```json
{
  "ID": 1,
  "State": 2,
  "Message": "sample string 3",
  "UDID": "sample string 4"
}
```

### `POST /api/MobileExtensions/v1/UserFavoriteAddressList`

- Açıklama: Kullanıcıların favori adresleri listelenir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-UserFavoriteAddressList>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/UserFavoriteAddressList`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/UserFavoriteAddressList'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/UserFavoriteAddressList' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "FavoriteAdressUserInf": {
    "UserId": 1,
    "FavoriteAddressTypeList": [
      {
        "FavoriteAddressType": 1
      },
      {
        "FavoriteAddressType": 1
      }
    ]
  },
  "FavoriteAddressTypeList": [
    {
      "FavoriteAddressType": 1
    },
    {
      "FavoriteAddressType": 1
    }
  ]
}'
```
- Help request modeli: `FavoriteAddressRequestViewModels`
- Help request alanları: `FavoriteAdressUserInf` (FavoriteAdressUserInf), `FavoriteAddressTypeList` (Collection of FavoriteAddressTypeList)
- Help örnek request gövdesi:
```json
{
  "FavoriteAdressUserInf": {
    "UserId": 1,
    "FavoriteAddressTypeList": [
      {
        "FavoriteAddressType": 1
      },
      {
        "FavoriteAddressType": 1
      }
    ]
  },
  "FavoriteAddressTypeList": [
    {
      "FavoriteAddressType": 1
    },
    {
      "FavoriteAddressType": 1
    }
  ]
}
```
- Help response modeli: `FavoriteAddressResponse[]`
- Help response alanları: `Title` (string): Favori adres başlığı, `Address` (string): Kullanıcının adresi, `XCoord` (decimal number): Favori adresin X koordinatı, `YCoord` (decimal number): Favori adresin Y koordinatı
- Help örnek response gövdesi:
```json
[
  {
    "Title": "sample string 1",
    "Address": "sample string 2",
    "XCoord": 3.1,
    "YCoord": 4.1
  },
  {
    "Title": "sample string 1",
    "Address": "sample string 2",
    "XCoord": 3.1,
    "YCoord": 4.1
  }
]
```

## UYMPortal

### `GET /api/UYMPortal/v1/Bicycle`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-Bicycle>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Bicycle`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fBicycle`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Bicycle'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fBicycle">here</a>.</h2>
</body></html>
```
- Help response modeli: `Bicycle`
- Help response alanları: `BR_Data` (Collection of BicycleRoad), `BS_Data` (Collection of BicycleStation)
- Help örnek response gövdesi:
```json
{
  "BR_Data": [
    {
      "I": 1,
      "T": 2,
      "G": "sample string 3",
      "L": "sample string 4"
    },
    {
      "I": 1,
      "T": 2,
      "G": "sample string 3",
      "L": "sample string 4"
    }
  ],
  "BS_Data": [
    {
      "I": 1,
      "N": "sample string 2",
      "A": "sample string 3",
      "C": 4,
      "AC": 5,
      "Ly": "sample string 6",
      "Lx": "sample string 7",
      "S": true
    },
    {
      "I": 1,
      "N": "sample string 2",
      "A": "sample string 3",
      "C": 4,
      "AC": 5,
      "Ly": "sample string 6",
      "Lx": "sample string 7",
      "S": true
    }
  ]
}
```

### `GET /api/UYMPortal/v1/Camera`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-Camera>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Camera`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fCamera`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Camera'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fCamera">here</a>.</h2>
</body></html>
```
- Help response modeli: `CameraGroupedList[]`
- Help response alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Help örnek response gövdesi:
```json
[
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  },
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  }
]
```

### `GET /api/UYMPortal/v1/CurrentAnnouncement`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-CurrentAnnouncement>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/CurrentAnnouncement`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fCurrentAnnouncement`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/CurrentAnnouncement'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fCurrentAnnouncement">here</a>.</h2>
</body></html>
```
- Help response modeli: `AnnouncementModel[]`
- Help response alanları: `Id` (integer), `Metin` (string), `MetinIng` (string), `Tipi` (integer), `BitisTarihi` (date), `Link` (string), `Baslik` (string), `BaslikIng` (string), `Koordinat` (string), `Oncelik` (integer), `KameraId` (integer), `GirisTarihi` (date), `xKoordinat` (string), `yKoordinat` (string), `TimeDiff` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "Id": 1,
    "Metin": "sample string 2",
    "MetinIng": "sample string 3",
    "Tipi": 4,
    "BitisTarihi": "2026-03-11T17:15:50.3402273+03:00",
    "Link": "sample string 6",
    "Baslik": "sample string 7",
    "BaslikIng": "sample string 8",
    "Koordinat": "sample string 9",
    "Oncelik": 10,
    "KameraId": 11,
    "GirisTarihi": "2026-03-11T17:15:50.3402273+03:00",
    "xKoordinat": "sample string 13",
    "yKoordinat": "sample string 14",
    "TimeDiff": 15
  },
  {
    "Id": 1,
    "Metin": "sample string 2",
    "MetinIng": "sample string 3",
    "Tipi": 4,
    "BitisTarihi": "2026-03-11T17:15:50.3402273+03:00",
    "Link": "sample string 6",
    "Baslik": "sample string 7",
    "BaslikIng": "sample string 8",
    "Koordinat": "sample string 9",
    "Oncelik": 10,
    "KameraId": 11,
    "GirisTarihi": "2026-03-11T17:15:50.3402273+03:00",
    "xKoordinat": "sample string 13",
    "yKoordinat": "sample string 14",
    "TimeDiff": 15
  }
]
```

### `GET /api/UYMPortal/v1/ElectChargeStations`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-ElectChargeStations>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/ElectChargeStations`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fElectChargeStations`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/ElectChargeStations'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fElectChargeStations">here</a>.</h2>
</body></html>
```
- Help response modeli: `ElectChargeStationsModel[]`
- Help response alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string), `Weekdays` (string), `Weekend` (string), `StationModel` (string), `SocketInfo` (string), `Address` (string)
- Help örnek response gövdesi:
```json
[
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4",
    "Weekdays": "sample string 5",
    "Weekend": "sample string 6",
    "StationModel": "sample string 7",
    "SocketInfo": "sample string 8",
    "Address": "sample string 9"
  },
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4",
    "Weekdays": "sample string 5",
    "Weekend": "sample string 6",
    "StationModel": "sample string 7",
    "SocketInfo": "sample string 8",
    "Address": "sample string 9"
  }
]
```

### `GET /api/UYMPortal/v1/Junction`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-Junction>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Junction`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fJunction`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Junction'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fJunction">here</a>.</h2>
</body></html>
```
- Help response modeli: `JunctionModel[]`
- Help response alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `CountyId` (integer): JunctionNo : Sinyalize Ilce Numarası, `JunctionType` (integer): JunctionType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara)
- Help örnek response gövdesi:
```json
[
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "CountyId": 3,
    "JunctionType": 4,
    "XCoord": "sample string 5",
    "YCoord": "sample string 6",
    "JunctionNewNo": "sample string 7"
  },
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "CountyId": 3,
    "JunctionType": 4,
    "XCoord": "sample string 5",
    "YCoord": "sample string 6",
    "JunctionNewNo": "sample string 7"
  }
]
```

### `GET /api/UYMPortal/v1/Parking`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-Parking>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Parking`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fParking`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Parking'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fParking">here</a>.</h2>
</body></html>
```
- Help response modeli: `ParkingInfo[]`
- Help response alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotSortId` (integer), `PLotSort` (string), `PLotIspark` (boolean), `PLotComp` (string), `PLotIsOpen` (boolean), `PLotAvailableCount` (integer), `PLotAvailableRate` (integer), `PLotUpToDateStatus` (integer), `PLotDate` (date), `PLotLatitude` (string), `PLotLongitude` (string), `PLotLocation` (string), `PLotAddress` (string), `PLotDistrict` (string), `PWorkingHours` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotSortId": 4,
    "PLotSort": "sample string 5",
    "PLotIspark": true,
    "PLotComp": "sample string 7",
    "PLotIsOpen": true,
    "PLotAvailableCount": 9,
    "PLotAvailableRate": 10,
    "PLotUpToDateStatus": 11,
    "PLotDate": "2026-03-11T17:15:50.3558554+03:00",
    "PLotLatitude": "sample string 13",
    "PLotLongitude": "sample string 14",
    "PLotLocation": "sample string 15",
    "PLotAddress": "sample string 16",
    "PLotDistrict": "sample string 17",
    "PWorkingHours": "sample string 18"
  },
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotSortId": 4,
    "PLotSort": "sample string 5",
    "PLotIspark": true,
    "PLotComp": "sample string 7",
    "PLotIsOpen": true,
    "PLotAvailableCount": 9,
    "PLotAvailableRate": 10,
    "PLotUpToDateStatus": 11,
    "PLotDate": "2026-03-11T17:15:50.3558554+03:00",
    "PLotLatitude": "sample string 13",
    "PLotLongitude": "sample string 14",
    "PLotLocation": "sample string 15",
    "PLotAddress": "sample string 16",
    "PLotDistrict": "sample string 17",
    "PWorkingHours": "sample string 18"
  }
]
```

### `GET /api/UYMPortal/v1/POI`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-POI>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/POI`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fPOI`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/POI'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fPOI">here</a>.</h2>
</body></html>
```
- Help response modeli: `POI[]`
- Help response alanları: `ID` (integer), `TI` (integer), `TN` (string), `PN` (string), `LT` (string), `LN` (string), `PU` (string), `SM` (boolean)
- Help örnek response gövdesi:
```json
[
  {
    "ID": 1,
    "TI": 2,
    "TN": "sample string 3",
    "PN": "sample string 4",
    "LT": "sample string 5",
    "LN": "sample string 6",
    "PU": "sample string 7",
    "SM": true
  },
  {
    "ID": 1,
    "TI": 2,
    "TN": "sample string 3",
    "PN": "sample string 4",
    "LT": "sample string 5",
    "LN": "sample string 6",
    "PU": "sample string 7",
    "SM": true
  }
]
```

### `GET /api/UYMPortal/v1/TrafficIndex_Sc1_Cont`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-TrafficIndex_Sc1_Cont>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/TrafficIndex_Sc1_Cont`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fTrafficIndex_Sc1_Cont`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/TrafficIndex_Sc1_Cont'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv1%2fTrafficIndex_Sc1_Cont">here</a>.</h2>
</body></html>
```
- Help response modeli: `ResponseTrafficIndex_Sc1_Cont`
- Help response alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Help örnek response gövdesi:
```json
{
  "TI": 64,
  "TI_An": 64,
  "TI_Av": 64
}
```

### `GET /api/UYMPortal/v2/Piers`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v2-Piers>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v2/Piers`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv2%2fPiers`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v2/Piers'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv2%2fPiers">here</a>.</h2>
</body></html>
```
- Help response modeli: Belirtilmemiş.

### `GET /api/UYMPortal/v4/SegmentData`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v4-SegmentData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v4/SegmentData`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv4%2fSegmentData`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v4/SegmentData'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fUYMPortal%2fv4%2fSegmentData">here</a>.</h2>
</body></html>
```
- Help response modeli: `TrafficDataModelV4`
- Help response alanları: `Date` (date), `Data` (Collection of TrafficDataModelItemV4)
- Help örnek response gövdesi:
```json
{
  "Date": "2026-03-11T17:15:50.3558554+03:00",
  "Data": [
    {
      "T": "sample string 1",
      "S": 2,
      "V": 3,
      "C": 4,
      "D": "sample string 5"
    },
    {
      "T": "sample string 1",
      "S": 2,
      "V": 3,
      "C": 4,
      "D": "sample string 5"
    }
  ]
}
```

## Piers

### `GET /api/Piers/v1/Piers`

- Açıklama: İskeleleri döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Piers-v1-Piers>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Piers/v1/Piers`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPiers%2fv1%2fPiers`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Piers/v1/Piers'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fPiers%2fv1%2fPiers">here</a>.</h2>
</body></html>
```
- Help response modeli: `PiersModel[]`
- Help response alanları: `PierNo` (integer), `PierName` (string), `Xcoord` (string), `Ycoord` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PierNo": 1,
    "PierName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4"
  },
  {
    "PierNo": 1,
    "PierName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4"
  }
]
```

## Site

### `GET /api/Site/v1/Contacts`

- Açıklama: UYM Web sitesi için telefon, eposta, webadres, beyazmasa_eposta gibi iletişim bilgilerini verir
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Site-v1-Contacts>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Site/v1/Contacts`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSite%2fv1%2fContacts`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Site/v1/Contacts'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSite%2fv1%2fContacts">here</a>.</h2>
</body></html>
```
- Help response modeli: `WebSiteContact[]`
- Help response alanları: `Type` (string): İletişim bilgisi tipi:  telefon, eposta, webadres, beyazmasa_eposta, `Value` (string): İletişim bilgisi
- Help örnek response gövdesi:
```json
[
  {
    "Type": "sample string 1",
    "Value": "sample string 2"
  },
  {
    "Type": "sample string 1",
    "Value": "sample string 2"
  }
]
```

### `GET /api/Site/v1/Links`

- Açıklama: UYM Web sitesi sayfa linkleri
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Site-v1-Links>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Site/v1/Links`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSite%2fv1%2fLinks`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Site/v1/Links'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSite%2fv1%2fLinks">here</a>.</h2>
</body></html>
```
- Help response modeli: `WebSiteLink[]`
- Help response alanları: `LinkId` (integer), `LinkName` (string): Link başlığı, `Language` (string): Ait olduğu site dili: tr/en, `LinkQueue` (string): Listelenme sırası, `SEO` (string): SEO uyumlu sayfa ismi, `ParentLinkId` (integer): 0 ise ana linktir. >0 ise alt linki olduğu link, `LinkURL` (string): Domain'den sonraki URL parçası. Başına https://uym.ibb.gov.tr eklenir
- Help örnek response gövdesi:
```json
[
  {
    "LinkId": 1,
    "LinkName": "sample string 2",
    "Language": "sample string 3",
    "LinkQueue": "sample string 4",
    "SEO": "sample string 5",
    "ParentLinkId": 6,
    "LinkURL": "sample string 7"
  },
  {
    "LinkId": 1,
    "LinkName": "sample string 2",
    "Language": "sample string 3",
    "LinkQueue": "sample string 4",
    "SEO": "sample string 5",
    "ParentLinkId": 6,
    "LinkURL": "sample string 7"
  }
]
```

### `GET /api/Site/v1/PLinks/{pLinkId}`

- Açıklama: UYM Web sitesi sayfa linkleri için Üst link Id'ye göre listeleme
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Site-v1-PLinks-pLinkId>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Site/v1/PLinks/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSite%2fv1%2fPLinks%2f1`
- Yol/query parametreleri: `pLinkId` (integer, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Site/v1/PLinks/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSite%2fv1%2fPLinks%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `WebSiteLink[]`
- Help response alanları: `LinkId` (integer), `LinkName` (string): Link başlığı, `Language` (string): Ait olduğu site dili: tr/en, `LinkQueue` (string): Listelenme sırası, `SEO` (string): SEO uyumlu sayfa ismi, `ParentLinkId` (integer): 0 ise ana linktir. >0 ise alt linki olduğu link, `LinkURL` (string): Domain'den sonraki URL parçası. Başına https://uym.ibb.gov.tr eklenir
- Help örnek response gövdesi:
```json
[
  {
    "LinkId": 1,
    "LinkName": "sample string 2",
    "Language": "sample string 3",
    "LinkQueue": "sample string 4",
    "SEO": "sample string 5",
    "ParentLinkId": 6,
    "LinkURL": "sample string 7"
  },
  {
    "LinkId": 1,
    "LinkName": "sample string 2",
    "Language": "sample string 3",
    "LinkQueue": "sample string 4",
    "SEO": "sample string 5",
    "ParentLinkId": 6,
    "LinkURL": "sample string 7"
  }
]
```

### `GET /api/Site/v1/SocialNetworkAccounts`

- Açıklama: UYM sosyal medya hesapları listesi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Site-v1-SocialNetworkAccounts>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Site/v1/SocialNetworkAccounts`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSite%2fv1%2fSocialNetworkAccounts`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Site/v1/SocialNetworkAccounts'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSite%2fv1%2fSocialNetworkAccounts">here</a>.</h2>
</body></html>
```
- Help response modeli: `SocialNetworkAccount[]`
- Help response alanları: `SNType` (string): Sosyal medya türü: Twitter, Instagram, Youtube, `Link` (string): Sosyal medya linki
- Help örnek response gövdesi:
```json
[
  {
    "SNType": "sample string 1",
    "Link": "sample string 2"
  },
  {
    "SNType": "sample string 1",
    "Link": "sample string 2"
  }
]
```

### `GET /api/Site/v1/WebSiteContent/{linkId}`

- Açıklama: UYM Web sitesi sayfa linklerinin içeriklerini verir
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Site-v1-WebSiteContent-linkId>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Site/v1/WebSiteContent/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSite%2fv1%2fWebSiteContent%2f1`
- Yol/query parametreleri: `linkId` (integer, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Site/v1/WebSiteContent/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fSite%2fv1%2fWebSiteContent%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `WebSiteContent[]`
- Help response alanları: `PageTitle` (string), `Queue` (string), `LinkId` (string), `HTMLContent` (string), `Language` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PageTitle": "sample string 1",
    "Queue": "sample string 2",
    "LinkId": "sample string 3",
    "HTMLContent": "sample string 4",
    "Language": "sample string 5"
  },
  {
    "PageTitle": "sample string 1",
    "Queue": "sample string 2",
    "LinkId": "sample string 3",
    "HTMLContent": "sample string 4",
    "Language": "sample string 5"
  }
]
```

## CepTrafik

### `GET /api/CepTrafik/Announcement/v1/Current`

- Açıklama: ENG: Get current announcements from server. Returns null if there's a server error.
            Type : 16 Accident - 17Maintenance and Repair Work - 18	Road closed to traffic. - 19 Weather conditions that affect the road. - 20 New kamera - 21 New sensor - 23 Heavy traffic. - 24 News - 26 Junction status - 30 IDO schedule notice - 31 Other... - 32 Vehicle breakdown - 33	Controlled closing (protocol) - 34 Road Construction Work - 35 Landscaping - 36	Vehicle fire - 37 Manufacturing Work - 38 Infrastructure Work - 39 City lines expedition notice
            Priority: 1 High -  2 Middle - 3 Low
            TR: Güncel duyuru listesini döndürür.Sunucu hatası olması durumunda null döndürür.
            Duyuru Tipleri : 16 Kaza Bildirimi - 17	Bakım-Onarım Çalışması - 18	Yolun Trafiğe Kapanması - 19 Yolu Etkileyen Hava Koşulu - 20 Yeni Kamera - 21 Yeni Sensör - 23 Yoğun Trafik - 24 Haber - 26	Kavşak Durumları - 30 İDO Sefer Bildirisi - 31 Diğer - 32 Araç Arızası - 33	Kontrollü Kapama(Protokol) - 34	Yol Yapım Çalışması - 35 Çevre Düzenlemesi - 36	Araç Yangını - 37 İmalat Çalışması - 38	Alt Yapı Çalışması - 39	Şehir Hatları Sefer Bildirisi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Announcement-v1-Current>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Announcement/v1/Current`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Announcement/v1/Current'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `AnnouncementModel[]`
- Help response alanları: `Id` (integer), `Metin` (string), `MetinIng` (string), `Tipi` (integer), `BitisTarihi` (date), `Link` (string), `Baslik` (string), `BaslikIng` (string), `Koordinat` (string), `Oncelik` (integer), `KameraId` (integer), `GirisTarihi` (date), `xKoordinat` (string), `yKoordinat` (string), `TimeDiff` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "Id": 1,
    "Metin": "sample string 2",
    "MetinIng": "sample string 3",
    "Tipi": 4,
    "BitisTarihi": "2026-03-11T17:15:50.4339883+03:00",
    "Link": "sample string 6",
    "Baslik": "sample string 7",
    "BaslikIng": "sample string 8",
    "Koordinat": "sample string 9",
    "Oncelik": 10,
    "KameraId": 11,
    "GirisTarihi": "2026-03-11T17:15:50.4339883+03:00",
    "xKoordinat": "sample string 13",
    "yKoordinat": "sample string 14",
    "TimeDiff": 15
  },
  {
    "Id": 1,
    "Metin": "sample string 2",
    "MetinIng": "sample string 3",
    "Tipi": 4,
    "BitisTarihi": "2026-03-11T17:15:50.4339883+03:00",
    "Link": "sample string 6",
    "Baslik": "sample string 7",
    "BaslikIng": "sample string 8",
    "Koordinat": "sample string 9",
    "Oncelik": 10,
    "KameraId": 11,
    "GirisTarihi": "2026-03-11T17:15:50.4339883+03:00",
    "xKoordinat": "sample string 13",
    "yKoordinat": "sample string 14",
    "TimeDiff": 15
  }
]
```

### `GET /api/CepTrafik/Camera/v1/All`

- Açıklama: Tüm kamera listesi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Camera-v1-All>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/All`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/All'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `CameraBase[]`
- Help response alanları: `ID` (integer): Camera ID, `Name` (string): Camera Name (Location), `XCoord` (string): X Coordinate of camera, `YCoord` (string): Y Coordinate of camera, `VideoURL` (string): Live camera Video URL, `SSLVideoURL` (string): GroupID, `GroupId` (string): GroupID
- Help örnek response gövdesi:
```json
[
  {
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "SSLVideoURL": "sample string 6",
    "GroupId": "sample string 7"
  },
  {
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "SSLVideoURL": "sample string 6",
    "GroupId": "sample string 7"
  }
]
```

### `GET /api/CepTrafik/Camera/v1/CameraGroup`

- Açıklama: Gruplanmış kamera listesi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Camera-v1-CameraGroup>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/CameraGroup`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/CameraGroup'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `CameraGroupedList[]`
- Help response alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Help örnek response gövdesi:
```json
[
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  },
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  }
]
```

### `GET /api/CepTrafik/Camera/v1/GetCamera/{camId}`

- Açıklama: ENG: Returns the details of the specified camera. Returns null if there's a server error or request with an invalid camera ID. (Image Path :https://cdn-uym.ibb.gov.tr/endura/{kameraId}/{resimAdi})
             TR: ID'si verilen kameranın son 3 görüntüsünü dondurur (Resim Path :https://cdn-uym.ibb.gov.tr/endura/{kameraId}/{resimAdi}). Sunucu  hatası olması durumunda null döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Camera-v1-GetCamera-camId>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/GetCamera/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: `camId` (integer, Required): Resim alınacak Kamera ID
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/GetCamera/1'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `CameraModel`
- Help response alanları: `Tarih` (date): Resmin üretildiği tarih, `Images` (Collection of string): Resim Listesi
- Help örnek response gövdesi:
```json
{
  "Tarih": "2026-03-11T17:15:50.5121034+03:00",
  "Images": [
    "sample string 1",
    "sample string 2"
  ]
}
```

### `GET /api/CepTrafik/ElectChargeStations/v1/ElectChargeStations`

- Açıklama: Elektrikli şarj istasyonlarını döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-ElectChargeStations-v1-ElectChargeStations>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/ElectChargeStations/v1/ElectChargeStations`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/ElectChargeStations/v1/ElectChargeStations'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `ElectChargeStationsModel[]`
- Help response alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string), `Weekdays` (string), `Weekend` (string), `StationModel` (string), `SocketInfo` (string), `Address` (string)
- Help örnek response gövdesi:
```json
[
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4",
    "Weekdays": "sample string 5",
    "Weekend": "sample string 6",
    "StationModel": "sample string 7",
    "SocketInfo": "sample string 8",
    "Address": "sample string 9"
  },
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4",
    "Weekdays": "sample string 5",
    "Weekend": "sample string 6",
    "StationModel": "sample string 7",
    "SocketInfo": "sample string 8",
    "Address": "sample string 9"
  }
]
```

### `GET /api/CepTrafik/HavaIstStations/v1/HavaIstStations`

- Açıklama: Havaist duraklarını döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-HavaIstStations-v1-HavaIstStations>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/HavaIstStations/v1/HavaIstStations`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/HavaIstStations/v1/HavaIstStations'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `HavaIstStationsModel[]`
- Help response alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string)
- Help örnek response gövdesi:
```json
[
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4"
  },
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4"
  }
]
```

### `GET /api/CepTrafik/Junction/v1/All`

- Açıklama: İstanbul’daki sinyalize kavşakların listesini koordinatlı bir şekilde listeler.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Junction-v1-All>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Junction/v1/All`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Junction/v1/All'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `JunctionModel[]`
- Help response alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `CountyId` (integer): JunctionNo : Sinyalize Ilce Numarası, `JunctionType` (integer): JunctionType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara)
- Help örnek response gövdesi:
```json
[
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "CountyId": 3,
    "JunctionType": 4,
    "XCoord": "sample string 5",
    "YCoord": "sample string 6",
    "JunctionNewNo": "sample string 7"
  },
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "CountyId": 3,
    "JunctionType": 4,
    "XCoord": "sample string 5",
    "YCoord": "sample string 6",
    "JunctionNewNo": "sample string 7"
  }
]
```

### `POST /api/CepTrafik/Junction/v1/InsertFailure`

- Açıklama: Sinyal arızalarını kaydeder.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Junction-v1-InsertFailure>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Junction/v1/InsertFailure`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Junction/v1/InsertFailure'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Junction/v1/InsertFailure' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "JunctionNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "Message": "sample string 4"
}'
```
- Help request modeli: `JunctionFailureModel`
- Help request alanları: `JunctionNo` (integer, Required): Hatalı sinyalizasyon numarası, `NotifierType` (integer, Required): Platform için eğer cep trafik ise -1, Web ise -2 gelmelidir., `FailureType` (integer, Required): Vatandaştan gelen arıza bildirimini ifade etmektedir., `Message` (string, Required): Kullanıcıdan alınan mesajı ifade etmektedir.
- Help örnek request gövdesi:
```json
{
  "JunctionNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "Message": "sample string 4"
}
```
- Help response modeli: `JunctionFailureResponse`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/Mobile/v1/AndroidConfiguration`

- Açıklama: Android kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-AndroidConfiguration>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/AndroidConfiguration`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/AndroidConfiguration'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/AndroidConfiguration' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "Id": "sample string 2",
  "IdType": "sample string 3",
  "Brand": "sample string 4",
  "Model": "sample string 5",
  "Sdk": 6,
  "AppVersion": "sample string 7",
  "DeviceToken": "sample string 8",
  "isPushEnabled": 9,
  "LocationPermission": 10,
  "XCoord": 11.1,
  "YCoord": 12.1
}'
```
- Help request modeli: `AndroidConfigurationModel`
- Help request alanları: `UserId` (integer, Required): Iphone user id, `Id` (string, Required): Android  id, `IdType` (string, Required): Android idType, `Brand` (string, Required): Android marka, `Model` (string, Required): Android model, `Sdk` (integer, Required): Anroid sdk, `AppVersion` (string, Required): Uygulama versiyonu, `DeviceToken` (string, Required): Android deviceToken, `isPushEnabled` (integer, Required): push Notifikasyon izni, `LocationPermission` (integer, Required): Konum kullanabilme izni, `XCoord` (decimal number): X koordinatı, `YCoord` (decimal number): Y koordinatı
- Help örnek request gövdesi:
```json
{
  "UserId": 1,
  "Id": "sample string 2",
  "IdType": "sample string 3",
  "Brand": "sample string 4",
  "Model": "sample string 5",
  "Sdk": 6,
  "AppVersion": "sample string 7",
  "DeviceToken": "sample string 8",
  "isPushEnabled": 9,
  "LocationPermission": 10,
  "XCoord": 11.1,
  "YCoord": 12.1
}
```
- Help response modeli: `ResponseUser`
- Help response alanları: `UserId` (integer)
- Help örnek response gövdesi:
```json
{
  "UserId": 1
}
```

### `POST /api/CepTrafik/Mobile/v1/AndroidLoc`

- Açıklama: Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (Android için)
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-AndroidLoc>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/AndroidLoc`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/AndroidLoc'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/AndroidLoc' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "xCoord": 2.1,
  "yCoord": 3.1,
  "rawSpeed": 64,
  "degree": 5.1,
  "accuracy": 6.1,
  "rawDate": "2026-03-11T17:15:50.5121034+03:00",
  "segID": 1,
  "segAngle": 1,
  "segDir": 1
}'
```
- Help request modeli: `Android_Raw`
- Help request alanları: `UserId` (integer), `xCoord` (decimal number), `yCoord` (decimal number), `rawSpeed` (byte), `degree` (decimal number), `accuracy` (decimal number), `rawDate` (date), `segID` (integer), `segAngle` (integer), `segDir` (integer)
- Help örnek request gövdesi:
```json
{
  "UserId": 1,
  "xCoord": 2.1,
  "yCoord": 3.1,
  "rawSpeed": 64,
  "degree": 5.1,
  "accuracy": 6.1,
  "rawDate": "2026-03-11T17:15:50.5121034+03:00",
  "segID": 1,
  "segAngle": 1,
  "segDir": 1
}
```
- Help response modeli: `ResponseLocationResult`
- Help response alanları: `Result` (string)
- Help örnek response gövdesi:
```json
{
  "Result": "sample string 1"
}
```

### `POST /api/CepTrafik/Mobile/v1/IphoneConfiguration`

- Açıklama: Iphone kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-IphoneConfiguration>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/IphoneConfiguration`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/IphoneConfiguration'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/IphoneConfiguration' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "UDId": "sample string 2",
  "Model": "sample string 3",
  "OsVersion": "sample string 4",
  "AppVersion": "sample string 5",
  "LocationPermission": 6,
  "DeviceToken": "sample string 7",
  "isPushEnabled": 8,
  "XCoord": 9.1,
  "YCoord": 10.1
}'
```
- Help request modeli: `IphoneConfigurationModel`
- Help request alanları: `UserId` (integer, Required): Iphone user id, `UDId` (string, Required): Iphone UDId, `Model` (string, Required): Iphone Model, `OsVersion` (string, Required): Iphone Operation System Versiyonu, `AppVersion` (string, Required): Uygulama versiyonu, `LocationPermission` (integer, Required): Konum kullanabilme izni, `DeviceToken` (string, Required): Iphone deviceToken, `isPushEnabled` (integer, Required): push Notifikasyon izni, `XCoord` (decimal number): X koordinatı, `YCoord` (decimal number): Y koordinatı
- Help örnek request gövdesi:
```json
{
  "UserId": 1,
  "UDId": "sample string 2",
  "Model": "sample string 3",
  "OsVersion": "sample string 4",
  "AppVersion": "sample string 5",
  "LocationPermission": 6,
  "DeviceToken": "sample string 7",
  "isPushEnabled": 8,
  "XCoord": 9.1,
  "YCoord": 10.1
}
```
- Help response modeli: `ResponseUser`
- Help response alanları: `UserId` (integer)
- Help örnek response gövdesi:
```json
{
  "UserId": 1
}
```

### `POST /api/CepTrafik/Mobile/v1/IphoneLoc`

- Açıklama: Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (IPhone için)
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-IphoneLoc>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/IphoneLoc`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/IphoneLoc'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/IphoneLoc' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserID": 1,
  "UDID": "sample string 2",
  "xCoord": 3.1,
  "yCoord": 4.1,
  "rawSpeed": 64,
  "degree": 6.1,
  "horizontalAcc": 7.1,
  "verticalAcc": 8.1,
  "rawDate": "2026-03-11T17:15:50.5121034+03:00",
  "segID": 1,
  "segAngle": 1,
  "segDir": 1
}'
```
- Help request modeli: `Iphone_Raw`
- Help request alanları: `UserID` (integer), `UDID` (string), `xCoord` (decimal number), `yCoord` (decimal number), `rawSpeed` (byte), `degree` (decimal number), `horizontalAcc` (decimal number), `verticalAcc` (decimal number), `rawDate` (date), `segID` (integer), `segAngle` (integer), `segDir` (integer)
- Help örnek request gövdesi:
```json
{
  "UserID": 1,
  "UDID": "sample string 2",
  "xCoord": 3.1,
  "yCoord": 4.1,
  "rawSpeed": 64,
  "degree": 6.1,
  "horizontalAcc": 7.1,
  "verticalAcc": 8.1,
  "rawDate": "2026-03-11T17:15:50.5121034+03:00",
  "segID": 1,
  "segAngle": 1,
  "segDir": 1
}
```
- Help response modeli: `ResponseLocationResult`
- Help response alanları: `Result` (string)
- Help örnek response gövdesi:
```json
{
  "Result": "sample string 1"
}
```

### `POST /api/CepTrafik/Mobile/v1/SaveSession/Get/{loginId}`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-SaveSession-Get-loginId>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Get/1`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: `loginId` (globally unique identifier)
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Get/1'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Get/1'
```
- Help request modeli: Belirtilmemiş.
- Help response modeli: `UserSession[]`
- Help response alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Help örnek response gövdesi:
```json
[
  {
    "LoginID": "9d574692-045a-4006-8b26-b9e311bcc1d7",
    "UserID": 2,
    "MobileUserType": 64,
    "LoginDate": "2026-03-11T17:15:50.5746358+03:00",
    "LoginX": "sample string 5",
    "LoginY": "sample string 6",
    "LogoutDate": "2026-03-11T17:15:50.5746358+03:00",
    "LogoutX": "sample string 7",
    "LogoutY": "sample string 8"
  },
  {
    "LoginID": "9d574692-045a-4006-8b26-b9e311bcc1d7",
    "UserID": 2,
    "MobileUserType": 64,
    "LoginDate": "2026-03-11T17:15:50.5746358+03:00",
    "LoginX": "sample string 5",
    "LoginY": "sample string 6",
    "LogoutDate": "2026-03-11T17:15:50.5746358+03:00",
    "LogoutX": "sample string 7",
    "LogoutY": "sample string 8"
  }
]
```

### `POST /api/CepTrafik/Mobile/v1/SaveSession/Get?loginId={loginId}`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-SaveSession-Get_loginId>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Get?loginId=1`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: `loginId` (globally unique identifier)
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Get?loginId=1'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Get?loginId=1'
```
- Help request modeli: Belirtilmemiş.
- Help response modeli: `UserSession[]`
- Help response alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Help örnek response gövdesi:
```json
[
  {
    "LoginID": "26e5c2b7-81a5-4c72-9121-1f7d333c0e77",
    "UserID": 2,
    "MobileUserType": 64,
    "LoginDate": "2026-03-11T17:15:50.5277264+03:00",
    "LoginX": "sample string 5",
    "LoginY": "sample string 6",
    "LogoutDate": "2026-03-11T17:15:50.5277264+03:00",
    "LogoutX": "sample string 7",
    "LogoutY": "sample string 8"
  },
  {
    "LoginID": "26e5c2b7-81a5-4c72-9121-1f7d333c0e77",
    "UserID": 2,
    "MobileUserType": 64,
    "LoginDate": "2026-03-11T17:15:50.5277264+03:00",
    "LoginX": "sample string 5",
    "LoginY": "sample string 6",
    "LogoutDate": "2026-03-11T17:15:50.5277264+03:00",
    "LogoutX": "sample string 7",
    "LogoutY": "sample string 8"
  }
]
```

### `POST /api/CepTrafik/Mobile/v1/SaveSession/Login`

- Açıklama: CepTrafik uygulamasında her client oturumu açıldığında kayıt atar. Yoğun kullanımlı günlerde yükü görmek için eklendi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-SaveSession-Login>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Login`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Login'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Login' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "LoginID": "749e248a-a3bb-4ab7-86b9-069c4b2fb334",
  "UserID": 2,
  "MobileUserType": 64,
  "LoginDate": "2026-03-11T17:15:50.5434435+03:00",
  "LoginX": "sample string 5",
  "LoginY": "sample string 6",
  "LogoutDate": "2026-03-11T17:15:50.5434435+03:00",
  "LogoutX": "sample string 7",
  "LogoutY": "sample string 8"
}'
```
- Help request modeli: `UserSession`
- Help request alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Help örnek request gövdesi:
```json
{
  "LoginID": "749e248a-a3bb-4ab7-86b9-069c4b2fb334",
  "UserID": 2,
  "MobileUserType": 64,
  "LoginDate": "2026-03-11T17:15:50.5434435+03:00",
  "LoginX": "sample string 5",
  "LoginY": "sample string 6",
  "LogoutDate": "2026-03-11T17:15:50.5434435+03:00",
  "LogoutX": "sample string 7",
  "LogoutY": "sample string 8"
}
```
- Help response modeli: `UserSessionResult`
- Help response alanları: `Result` (string)
- Help örnek response gövdesi:
```json
{
  "Result": "sample string 1"
}
```

### `POST /api/CepTrafik/Mobile/v1/SaveSession/Logout`

- Açıklama: CepTrafik uygulamasında client oturumu kapatma
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-SaveSession-Logout>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Logout`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Logout'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Logout' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "LoginID": "eda1b57a-0112-4154-b9d4-ca6541572b3c",
  "UserID": 2,
  "MobileUserType": 64,
  "LoginDate": "2026-03-11T17:15:50.5277264+03:00",
  "LoginX": "sample string 5",
  "LoginY": "sample string 6",
  "LogoutDate": "2026-03-11T17:15:50.5277264+03:00",
  "LogoutX": "sample string 7",
  "LogoutY": "sample string 8"
}'
```
- Help request modeli: `UserSession`
- Help request alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Help örnek request gövdesi:
```json
{
  "LoginID": "eda1b57a-0112-4154-b9d4-ca6541572b3c",
  "UserID": 2,
  "MobileUserType": 64,
  "LoginDate": "2026-03-11T17:15:50.5277264+03:00",
  "LoginX": "sample string 5",
  "LoginY": "sample string 6",
  "LogoutDate": "2026-03-11T17:15:50.5277264+03:00",
  "LogoutX": "sample string 7",
  "LogoutY": "sample string 8"
}
```
- Help response modeli: `UserSessionResult`
- Help response alanları: `Result` (string)
- Help örnek response gövdesi:
```json
{
  "Result": "sample string 1"
}
```

### `GET /api/CepTrafik/MobileExtensions/v1/ActiveIcon`

- Açıklama: Aktif ikon bilgisini döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-MobileExtensions-v1-ActiveIcon>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/ActiveIcon`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/ActiveIcon'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `ActiveIcon[]`
- Help response alanları: `Id` (integer), `Name` (string)
- Help örnek response gövdesi:
```json
[
  {
    "Id": 1,
    "Name": "sample string 2"
  },
  {
    "Id": 1,
    "Name": "sample string 2"
  }
]
```

### `POST /api/CepTrafik/MobileExtensions/v1/DetailedUsersInformationInsert`

- Açıklama: Kullanıcıların detaylı bilgilerini kaydeden procedure.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-DetailedUsersInformationInsert>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/DetailedUsersInformationInsert`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/DetailedUsersInformationInsert'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/DetailedUsersInformationInsert' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "MobileUserId": 1,
  "MobileUserType": 2,
  "Name": "sample string 3",
  "Surname": "sample string 4",
  "MobilePhone": "sample string 5",
  "Email": "sample string 6",
  "SocialMediaAccountType": 7,
  "SocialMediaAccount": "sample string 8"
}'
```
- Help request modeli: `DetailedUsersInformation`
- Help request alanları: `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi, `Name` (string, Required): Adı, `Surname` (string, Required): Soyadı, `MobilePhone` (string, Required): Cep Tel, `Email` (string, Required): E-posta, `SocialMediaAccountType` (integer, Required): Sosyal Medya Hesabı, `SocialMediaAccount` (string, Required): Sosyal Medya Hesabı
- Help örnek request gövdesi:
```json
{
  "MobileUserId": 1,
  "MobileUserType": 2,
  "Name": "sample string 3",
  "Surname": "sample string 4",
  "MobilePhone": "sample string 5",
  "Email": "sample string 6",
  "SocialMediaAccountType": 7,
  "SocialMediaAccount": "sample string 8"
}
```
- Help response modeli: `DetailedUsersInformationInsertResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/FavoriteAddressDelete`

- Açıklama: Kullanıcıların favori adresleri silinir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-FavoriteAddressDelete>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/FavoriteAddressDelete`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/FavoriteAddressDelete'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/FavoriteAddressDelete' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "FavoriteAddressId": 1
}'
```
- Help request modeli: `FavoriteAddressDeleteModel`
- Help request alanları: `FavoriteAddressId` (integer)
- Help örnek request gövdesi:
```json
{
  "FavoriteAddressId": 1
}
```
- Help response modeli: `FavoriteAddressDeleteResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/FavoriteAddressInsert`

- Açıklama: Kullanıcıların favori adresleri eklenir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-FavoriteAddressInsert>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/FavoriteAddressInsert`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/FavoriteAddressInsert'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/FavoriteAddressInsert' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "UserType": 2,
  "FavoriteAddressType": 3,
  "Title": "sample string 4",
  "Address": "sample string 5",
  "XCoord": 6.1,
  "YCoord": 7.1,
  "OrderId": 8,
  "EntityId": 9
}'
```
- Help request modeli: `FavoriteAddressInformation`
- Help request alanları: `UserId` (integer): IphoneUsers veya AndroidUsers id'lerini alır, `UserType` (integer): IphoneUsers=1 AndroidUsers=0, `FavoriteAddressType` (integer): Home:1, Work:2, Other:3, Camera:4, Park:5, `Title` (string): Favori adres başlığı, `Address` (string): Kullanıcının adresi, `XCoord` (decimal number): Favori adresin X koordinatı, `YCoord` (decimal number): Favori adresin Y koordinatı, `OrderId` (integer): Favori adres sıralaması, `EntityId` (integer): Camera - Otopark ID
- Help örnek request gövdesi:
```json
{
  "UserId": 1,
  "UserType": 2,
  "FavoriteAddressType": 3,
  "Title": "sample string 4",
  "Address": "sample string 5",
  "XCoord": 6.1,
  "YCoord": 7.1,
  "OrderId": 8,
  "EntityId": 9
}
```
- Help response modeli: `FavoriteAddressInsertResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/HearingImpairedInsert`

- Açıklama: İşitme Engelli Kullanıcı bilgileri kaydedilir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-HearingImpairedInsert>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/HearingImpairedInsert`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/HearingImpairedInsert'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/HearingImpairedInsert' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "MobileUserId": 1,
  "MobileUserType": 2,
  "Name": "sample string 3",
  "Surname": "sample string 4",
  "IdentityNumber": 5,
  "YearOfBirth": 6,
  "Mobile": "sample string 7",
  "Email": "sample string 8"
}'
```
- Help request modeli: `HearingImpairedInformation`
- Help request alanları: `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi, `Name` (string, Required): Adı, `Surname` (string, Required): Soyadı, `IdentityNumber` (integer, Required): TC Kimlik No, `YearOfBirth` (integer, Required): Doğum Yılı., `Mobile` (string, Required): Cep Tel., `Email` (string, Required): E-posta.
- Help örnek request gövdesi:
```json
{
  "MobileUserId": 1,
  "MobileUserType": 2,
  "Name": "sample string 3",
  "Surname": "sample string 4",
  "IdentityNumber": 5,
  "YearOfBirth": 6,
  "Mobile": "sample string 7",
  "Email": "sample string 8"
}
```
- Help response modeli: `HearingImpairedInsertResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/HearingImpairedStatus`

- Açıklama: İşitme engelli kullanıcıların durumunu kontrol etmek için kullanılmaktadır.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-HearingImpairedStatus>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/HearingImpairedStatus`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/HearingImpairedStatus'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/HearingImpairedStatus' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "UserType": 64
}'
```
- Help request modeli: `RequestHearingImpairedUser`
- Help request alanları: `UserId` (integer), `UserType` (byte)
- Help örnek request gövdesi:
```json
{
  "UserId": 1,
  "UserType": 64
}
```
- Help response modeli: `ResponseHearingImpairedStatus`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/InsertFeedback`

- Açıklama: Mobil Kullanıcı bildirimlerini kaydeden api.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-InsertFeedback>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/InsertFeedback`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/InsertFeedback'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/InsertFeedback' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "FeedbackType": 1,
  "Description": "sample string 2",
  "XCoord": "sample string 3",
  "YCoord": "sample string 4",
  "MobileUserId": 5,
  "MobileUserType": 6
}'
```
- Help request modeli: `MobileUserFeedbackModel`
- Help request alanları: `FeedbackType` (integer, Required): Geri Bildirim Tipi, `Description` (string, Required): Açıklama, `XCoord` (string, Required): X Koordinatı., `YCoord` (string, Required): Y Koordinatı., `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi
- Help örnek request gövdesi:
```json
{
  "FeedbackType": 1,
  "Description": "sample string 2",
  "XCoord": "sample string 3",
  "YCoord": "sample string 4",
  "MobileUserId": 5,
  "MobileUserType": 6
}
```
- Help response modeli: `MobileUserFeedbackInsertResult`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/SaveAndroidUserApp`

- Açıklama: Uygulama kullanıcılarının telefonlarında yer alan diğer uygulamaları kaydeder.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-SaveAndroidUserApp>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveAndroidUserApp`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveAndroidUserApp'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveAndroidUserApp' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "AppName": "sample string 4"
}'
```
- Help request modeli: `AndroidUserAppSave`
- Help request alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `AppBundleID` (string, Required): Application Bundle ID, `AppName` (string, Required): Application Name
- Help örnek request gövdesi:
```json
{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "AppName": "sample string 4"
}
```
- Help response modeli: `AndroidUserAppSaveResult`
- Help response alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Help örnek response gövdesi:
```json
{
  "ID": 1,
  "State": 2,
  "Message": "sample string 3",
  "UDID": "sample string 4"
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/SaveAndroidUserAppList`

- Açıklama: Uygulama kullanıcılarının telefonlarında yer alan diğer uygulamaları liste şeklinde kaydeder.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-SaveAndroidUserAppList>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveAndroidUserAppList`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveAndroidUserAppList'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveAndroidUserAppList' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "androidUser": {
    "UDID": "sample string 1",
    "UserTokenOrID": "sample string 2",
    "AppList": [
      {
        "AppBundleID": "sample string 1",
        "AppName": "sample string 2"
      },
      {
        "AppBundleID": "sample string 1",
        "AppName": "sample string 2"
      }
    ]
  },
  "appList": [
    {
      "AppBundleID": "sample string 1",
      "AppName": "sample string 2"
    },
    {
      "AppBundleID": "sample string 1",
      "AppName": "sample string 2"
    }
  ]
}'
```
- Help request modeli: `AndroidUserAppViewModels`
- Help request alanları: `androidUser` (AndroidUser), `appList` (Collection of AppList)
- Help örnek request gövdesi:
```json
{
  "androidUser": {
    "UDID": "sample string 1",
    "UserTokenOrID": "sample string 2",
    "AppList": [
      {
        "AppBundleID": "sample string 1",
        "AppName": "sample string 2"
      },
      {
        "AppBundleID": "sample string 1",
        "AppName": "sample string 2"
      }
    ]
  },
  "appList": [
    {
      "AppBundleID": "sample string 1",
      "AppName": "sample string 2"
    },
    {
      "AppBundleID": "sample string 1",
      "AppName": "sample string 2"
    }
  ]
}
```
- Help response modeli: `AndroidUserAppSaveResult`
- Help response alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Help örnek response gövdesi:
```json
{
  "ID": 1,
  "State": 2,
  "Message": "sample string 3",
  "UDID": "sample string 4"
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/SaveLocation`

- Açıklama: Kullanıcıların konum ve hız bilgileri kaydedilir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-SaveLocation>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveLocation`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveLocation'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveLocation' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "Latitude": 3.1,
  "Longitude": 4.1,
  "SpeedValue": 5,
  "AppBundleID": "sample string 6"
}'
```
- Help request modeli: `LocationSave`
- Help request alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `Latitude` (decimal number, Required): Latitude, `Longitude` (decimal number, Required): Longitude, `SpeedValue` (integer, Required): SpeedValue, `AppBundleID` (string, Required): Apple Bundle ID
- Help örnek request gövdesi:
```json
{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "Latitude": 3.1,
  "Longitude": 4.1,
  "SpeedValue": 5,
  "AppBundleID": "sample string 6"
}
```
- Help response modeli: `LocationSaveResult`
- Help response alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Help örnek response gövdesi:
```json
{
  "ID": 1,
  "State": 2,
  "Message": "sample string 3",
  "UDID": "sample string 4"
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/SaveUser`

- Açıklama: Uygulamaya giriş yapmış kullanıcıların cihaz bilgileri ve uygulama özellikleri kaydedilir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-SaveUser>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveUser`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveUser'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveUser' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "OS": "sample string 4",
  "OSVersion": "sample string 5",
  "DeviceModel": "sample string 6",
  "DeviceNetwork": "sample string 7",
  "DeviceCountry": "sample string 8",
  "DeviceLanguage": "sample string 9",
  "DeviceChargingStatus": 10,
  "AppName": "sample string 11",
  "AppVersion": "sample string 12",
  "LastLocation": "sample string 13",
  "Platform": "sample string 14"
}'
```
- Help request modeli: `UserSave`
- Help request alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `AppBundleID` (string, Required): Application Bundle ID, `OS` (string, Required): Operating System, `OSVersion` (string, Required): Operating System Version, `DeviceModel` (string, Required): Device Model, `DeviceNetwork` (string, Required): Device Network, `DeviceCountry` (string, Required): Device Country, `DeviceLanguage` (string, Required): Device Language, `DeviceChargingStatus` (integer, Required): Device Charging Status, `AppName` (string, Required): Application Name, `AppVersion` (string, Required): Application Version, `LastLocation` (string, Required): Last Location, `Platform` (string, Required): Platform
- Help örnek request gövdesi:
```json
{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "OS": "sample string 4",
  "OSVersion": "sample string 5",
  "DeviceModel": "sample string 6",
  "DeviceNetwork": "sample string 7",
  "DeviceCountry": "sample string 8",
  "DeviceLanguage": "sample string 9",
  "DeviceChargingStatus": 10,
  "AppName": "sample string 11",
  "AppVersion": "sample string 12",
  "LastLocation": "sample string 13",
  "Platform": "sample string 14"
}
```
- Help response modeli: `UserSaveResult`
- Help response alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Help örnek response gövdesi:
```json
{
  "ID": 1,
  "State": 2,
  "Message": "sample string 3",
  "UDID": "sample string 4"
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/UserFavoriteAddressList`

- Açıklama: Kullanıcıların favori adresleri listelenir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-UserFavoriteAddressList>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/UserFavoriteAddressList`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/UserFavoriteAddressList'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/UserFavoriteAddressList' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "FavoriteAdressUserInf": {
    "UserId": 1,
    "FavoriteAddressTypeList": [
      {
        "FavoriteAddressType": 1
      },
      {
        "FavoriteAddressType": 1
      }
    ]
  },
  "FavoriteAddressTypeList": [
    {
      "FavoriteAddressType": 1
    },
    {
      "FavoriteAddressType": 1
    }
  ]
}'
```
- Help request modeli: `FavoriteAddressRequestViewModels`
- Help request alanları: `FavoriteAdressUserInf` (FavoriteAdressUserInf), `FavoriteAddressTypeList` (Collection of FavoriteAddressTypeList)
- Help örnek request gövdesi:
```json
{
  "FavoriteAdressUserInf": {
    "UserId": 1,
    "FavoriteAddressTypeList": [
      {
        "FavoriteAddressType": 1
      },
      {
        "FavoriteAddressType": 1
      }
    ]
  },
  "FavoriteAddressTypeList": [
    {
      "FavoriteAddressType": 1
    },
    {
      "FavoriteAddressType": 1
    }
  ]
}
```
- Help response modeli: `FavoriteAddressResponse[]`
- Help response alanları: `Title` (string): Favori adres başlığı, `Address` (string): Kullanıcının adresi, `XCoord` (decimal number): Favori adresin X koordinatı, `YCoord` (decimal number): Favori adresin Y koordinatı
- Help örnek response gövdesi:
```json
[
  {
    "Title": "sample string 1",
    "Address": "sample string 2",
    "XCoord": 3.1,
    "YCoord": 4.1
  },
  {
    "Title": "sample string 1",
    "Address": "sample string 2",
    "XCoord": 3.1,
    "YCoord": 4.1
  }
]
```

### `GET /api/CepTrafik/Park/v1/GetApsInfos`

- Açıklama: Trafik Müdürlüğünün sahada kullandığı APS'lerdeki otopark doluluk bilgilerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Park-v1-GetApsInfos>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetApsInfos`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetApsInfos'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `ParkingAps[]`
- Help response alanları: `PApsId` (integer), `PApsName` (string), `PApsLatitude` (string), `PApsLongitude` (string), `PLotsIds` (string), `PApsImage` (string), `ApsPLots` (Collection of ParkInfo)
- Help örnek response gövdesi:
```json
[
  {
    "PApsId": 1,
    "PApsName": "sample string 2",
    "PApsLatitude": "sample string 3",
    "PApsLongitude": "sample string 4",
    "PLotsIds": "sample string 5",
    "PApsImage": "sample string 6",
    "ApsPLots": [
      {
        "PLotId": 1,
        "PLotName": "sample string 2",
        "PLotCapasity": 3,
        "PLotAvailableCount": 4,
        "PLotLatitude": "sample string 5",
        "PLotLongitude": "sample string 6",
        "PStatus": "sample string 7",
        "PApsContact": "sample string 8",
        "PWorkingHours": "sample string 9"
      },
      {
        "PLotId": 1,
        "PLotName": "sample string 2",
        "PLotCapasity": 3,
        "PLotAvailableCount": 4,
        "PLotLatitude": "sample string 5",
        "PLotLongitude": "sample string 6",
        "PStatus": "sample string 7",
        "PApsContact": "sample string 8",
        "PWorkingHours": "sample string 9"
      }
    ]
  },
  {
    "PApsId": 1,
    "PApsName": "sample string 2",
    "PApsLatitude": "sample string 3",
    "PApsLongitude": "sample string 4",
    "PLotsIds": "sample string 5",
    "PApsImage": "sample string 6",
    "ApsPLots": [
      {
        "PLotId": 1,
        "PLotName": "sample string 2",
        "PLotCapasity": 3,
        "PLotAvailableCount": 4,
        "PLotLatitude": "sample string 5",
        "PLotLongitude": "sample string 6",
        "PStatus": "sample string 7",
        "PApsContact": "sample string 8",
        "PWorkingHours": "sample string 9"
      },
      {
        "PLotId": 1,
        "PLotName": "sample string 2",
        "PLotCapasity": 3,
        "PLotAvailableCount": 4,
        "PLotLatitude": "sample string 5",
        "PLotLongitude": "sample string 6",
        "PStatus": "sample string 7",
        "PApsContact": "sample string 8",
        "PWorkingHours": "sample string 9"
      }
    ]
  }
]
```

### `GET /api/CepTrafik/Park/v1/GetParkInfo/{flag}/{id}`

- Açıklama: Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Park-v1-GetParkInfo-flag-id>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetParkInfo/0/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetParkInfo/0/1'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `ParkInfo[]`
- Help response alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotAvailableCount": 4,
    "PLotLatitude": "sample string 5",
    "PLotLongitude": "sample string 6",
    "PStatus": "sample string 7",
    "PApsContact": "sample string 8",
    "PWorkingHours": "sample string 9"
  },
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotAvailableCount": 4,
    "PLotLatitude": "sample string 5",
    "PLotLongitude": "sample string 6",
    "PStatus": "sample string 7",
    "PApsContact": "sample string 8",
    "PWorkingHours": "sample string 9"
  }
]
```

### `GET /api/CepTrafik/Park/v1/GetParkInfos/{flag}/{id}`

- Açıklama: Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Park-v1-GetParkInfos-flag-id>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetParkInfos/0/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetParkInfos/0/1'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `ParkInfo[]`
- Help response alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotAvailableCount": 4,
    "PLotLatitude": "sample string 5",
    "PLotLongitude": "sample string 6",
    "PStatus": "sample string 7",
    "PApsContact": "sample string 8",
    "PWorkingHours": "sample string 9"
  },
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotAvailableCount": 4,
    "PLotLatitude": "sample string 5",
    "PLotLongitude": "sample string 6",
    "PStatus": "sample string 7",
    "PApsContact": "sample string 8",
    "PWorkingHours": "sample string 9"
  }
]
```

### `GET /api/CepTrafik/Park/v2/GetParkInfo/{flag}/{id}`

- Açıklama: Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Park-v2-GetParkInfo-flag-id>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v2/GetParkInfo/0/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v2/GetParkInfo/0/1'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `ParkInfo_v2[]`
- Help response alanları: `PLotSort` (string), `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PLotSort": "sample string 1",
    "PLotId": 2,
    "PLotName": "sample string 3",
    "PLotCapasity": 4,
    "PLotAvailableCount": 5,
    "PLotLatitude": "sample string 6",
    "PLotLongitude": "sample string 7",
    "PStatus": "sample string 8",
    "PApsContact": "sample string 9",
    "PWorkingHours": "sample string 10"
  },
  {
    "PLotSort": "sample string 1",
    "PLotId": 2,
    "PLotName": "sample string 3",
    "PLotCapasity": 4,
    "PLotAvailableCount": 5,
    "PLotLatitude": "sample string 6",
    "PLotLongitude": "sample string 7",
    "PStatus": "sample string 8",
    "PApsContact": "sample string 9",
    "PWorkingHours": "sample string 10"
  }
]
```

### `GET /api/CepTrafik/Piers/v1/Piers`

- Açıklama: İskeleleri döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Piers-v1-Piers>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Piers/v1/Piers`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Piers/v1/Piers'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `PiersModel[]`
- Help response alanları: `PierNo` (integer), `PierName` (string), `Xcoord` (string), `Ycoord` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PierNo": 1,
    "PierName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4"
  },
  {
    "PierNo": 1,
    "PierName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4"
  }
]
```

### `GET /api/CepTrafik/TrafficData/v1/SegmentData`

- Açıklama: Trafik yoğunluk haritasında bulunan yollara ait olan anlık ortalama hız bilgilerini döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-TrafficData-v1-SegmentData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/SegmentData`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/SegmentData'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `TrafficDataModel[]`
- Help response alanları: `Src` (string), `SegmentID` (integer): Segment ID, `Speed` (integer): Segmentin Hız, `ColorIndex` (integer): Segmentin Hız rengi, `LastDate` (string)
- Help örnek response gövdesi:
```json
[
  {
    "Src": "sample string 1",
    "SegmentID": 2,
    "Speed": 3,
    "ColorIndex": 4,
    "LastDate": "sample string 5"
  },
  {
    "Src": "sample string 1",
    "SegmentID": 2,
    "Speed": 3,
    "ColorIndex": 4,
    "LastDate": "sample string 5"
  }
]
```

### `GET /api/CepTrafik/TrafficData/v1/Segments`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-TrafficData-v1-Segments>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/Segments`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/Segments'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `VSegmentResponse[]`
- Help response alanları: `segID` (integer), `vSegID` (integer), `segGeometry` (string), `ZoomLevels` (Collection of integer)
- Help örnek response gövdesi:
```json
[
  {
    "segID": 1,
    "vSegID": 2,
    "segGeometry": "sample string 3",
    "ZoomLevels": [
      1,
      2
    ]
  },
  {
    "segID": 1,
    "vSegID": 2,
    "segGeometry": "sample string 3",
    "ZoomLevels": [
      1,
      2
    ]
  }
]
```

### `GET /api/CepTrafik/TrafficData/v1/TrafficIndex`

- Açıklama: İstanbul geneli için trafik indeks değerini döndürür. 1-99 arasında değişen bir değer olup, 1=>Açık Trafik, 99=>Çok Yoğun Trafik anlamına geliyor.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-TrafficData-v1-TrafficIndex>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/TrafficIndex`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/TrafficIndex'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `ResponseTrafficIndex`
- Help response alanları: `Result` (byte)
- Help örnek response gövdesi:
```json
{
  "Result": 64
}
```

### `GET /api/CepTrafik/TrafficData/v1/TrafficIndex_Sc1_Cont`

- Açıklama: İstanbul Genel Trafik İndeks'ini 3 kırılımda verir: "":Genel, "An":Anadolu, "Av":Avrupa
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-TrafficData-v1-TrafficIndex_Sc1_Cont>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/TrafficIndex_Sc1_Cont`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/TrafficIndex_Sc1_Cont'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `ResponseTrafficIndex_Sc1_Cont`
- Help response alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Help örnek response gövdesi:
```json
{
  "TI": 64,
  "TI_An": 64,
  "TI_Av": 64
}
```

### `GET /api/CepTrafik/TrafficData/v2/TrafficIndex`

- Açıklama: İstanbul Genel Trafik İndeks'ini 3 kırılımda verir: "":Genel, "An":Anadolu, "Av":Avrupa
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-TrafficData-v2-TrafficIndex>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v2/TrafficIndex`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v2/TrafficIndex'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `ResponseTrafficIndex_Sc1_Cont`
- Help response alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Help örnek response gövdesi:
```json
{
  "TI": 64,
  "TI_An": 64,
  "TI_Av": 64
}
```

### `GET /api/CepTrafik/VmsData/v1/BridgesStatusForMobile`

- Açıklama: CepTrafik köprü güzergahlarının trafik durumu bilgisini döndürür.
            GrupId:1--> 15 Temmuz Şehitler Köprüsü (Avrupa --> Anadolu)
            GrupId:2 --> FSM (Avrupa --> Anadolu)
            GrupId:3 --> YSS (Avrupa --> Anadolu)
            GrupId:4 --> Avrasya Tüneli (Avrupa --> Anadolu)
            GrupId:5--> 15 Temmuz Şehitler Köprüsü (Anadolu --> Avrupa)
            GrupId:6 --> FSM (Anadolu --> Avrupa)
            GrupId:7 --> YSS (Anadolu --> Avrupa)
            GrupId:8 --> Avrasya Tüneli (Anadolu --> Avrupa)
            Not: 69 numaralı route 15 Temmuz Şehitler Köprüsü (Anadolu --> Avrupa) ve  Avrasya Tüneli (Anadolu --> Avrupa) güzergahlarında kullanılmaktadır.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-VmsData-v1-BridgesStatusForMobile>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/VmsData/v1/BridgesStatusForMobile`
- Canlı test metodu: `GET`
- Canlı sonuç: `401`
- Sonuç yorumu: Endpoint yetkisiz erişim döndürdü.
- Content-Type: `text/plain; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/VmsData/v1/BridgesStatusForMobile'
```
- Canlı örnek çıktı:
```text
Unauthorized Request
```
- Help response modeli: `BridgeRouteStatusModel[]`
- Help response alanları: `RouteId` (integer), `RouteName` (string), `Status` (string), `OrderNo` (integer), `GroupId` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "RouteId": 1,
    "RouteName": "sample string 2",
    "Status": "sample string 3",
    "OrderNo": 4,
    "GroupId": 5
  },
  {
    "RouteId": 1,
    "RouteName": "sample string 2",
    "Status": "sample string 3",
    "OrderNo": 4,
    "GroupId": 5
  }
]
```

## HavaistStations

### `GET /api/HavaIstStations/v1/HavaIstStations`

- Açıklama: Havaist duraklarını döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-HavaIstStations-v1-HavaIstStations>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/HavaIstStations/v1/HavaIstStations`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fHavaIstStations%2fv1%2fHavaIstStations`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/HavaIstStations/v1/HavaIstStations'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fHavaIstStations%2fv1%2fHavaIstStations">here</a>.</h2>
</body></html>
```
- Help response modeli: `HavaIstStationsModel[]`
- Help response alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string)
- Help örnek response gövdesi:
```json
[
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4"
  },
  {
    "StationNo": 1,
    "StationName": "sample string 2",
    "Xcoord": "sample string 3",
    "Ycoord": "sample string 4"
  }
]
```

## Announcement

### `GET /api/Announcement/v1/Current`

- Açıklama: ENG: Get current announcements from server. Returns null if there's a server error.
            Type : 16 Accident - 17Maintenance and Repair Work - 18	Road closed to traffic. - 19 Weather conditions that affect the road. - 20 New kamera - 21 New sensor - 23 Heavy traffic. - 24 News - 26 Junction status - 30 IDO schedule notice - 31 Other... - 32 Vehicle breakdown - 33	Controlled closing (protocol) - 34 Road Construction Work - 35 Landscaping - 36	Vehicle fire - 37 Manufacturing Work - 38 Infrastructure Work - 39 City lines expedition notice
            Priority: 1 High -  2 Middle - 3 Low
            TR: Güncel duyuru listesini döndürür.Sunucu hatası olması durumunda null döndürür.
            Duyuru Tipleri : 16 Kaza Bildirimi - 17	Bakım-Onarım Çalışması - 18	Yolun Trafiğe Kapanması - 19 Yolu Etkileyen Hava Koşulu - 20 Yeni Kamera - 21 Yeni Sensör - 23 Yoğun Trafik - 24 Haber - 26	Kavşak Durumları - 30 İDO Sefer Bildirisi - 31 Diğer - 32 Araç Arızası - 33	Kontrollü Kapama(Protokol) - 34	Yol Yapım Çalışması - 35 Çevre Düzenlemesi - 36	Araç Yangını - 37 İmalat Çalışması - 38	Alt Yapı Çalışması - 39	Şehir Hatları Sefer Bildirisi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Announcement-v1-Current>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Current`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAnnouncement%2fv1%2fCurrent`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Current'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAnnouncement%2fv1%2fCurrent">here</a>.</h2>
</body></html>
```
- Help response modeli: `AnnouncementModel[]`
- Help response alanları: `Id` (integer), `Metin` (string), `MetinIng` (string), `Tipi` (integer), `BitisTarihi` (date), `Link` (string), `Baslik` (string), `BaslikIng` (string), `Koordinat` (string), `Oncelik` (integer), `KameraId` (integer), `GirisTarihi` (date), `xKoordinat` (string), `yKoordinat` (string), `TimeDiff` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "Id": 1,
    "Metin": "sample string 2",
    "MetinIng": "sample string 3",
    "Tipi": 4,
    "BitisTarihi": "2026-03-11T17:15:50.652743+03:00",
    "Link": "sample string 6",
    "Baslik": "sample string 7",
    "BaslikIng": "sample string 8",
    "Koordinat": "sample string 9",
    "Oncelik": 10,
    "KameraId": 11,
    "GirisTarihi": "2026-03-11T17:15:50.652743+03:00",
    "xKoordinat": "sample string 13",
    "yKoordinat": "sample string 14",
    "TimeDiff": 15
  },
  {
    "Id": 1,
    "Metin": "sample string 2",
    "MetinIng": "sample string 3",
    "Tipi": 4,
    "BitisTarihi": "2026-03-11T17:15:50.652743+03:00",
    "Link": "sample string 6",
    "Baslik": "sample string 7",
    "BaslikIng": "sample string 8",
    "Koordinat": "sample string 9",
    "Oncelik": 10,
    "KameraId": 11,
    "GirisTarihi": "2026-03-11T17:15:50.652743+03:00",
    "xKoordinat": "sample string 13",
    "yKoordinat": "sample string 14",
    "TimeDiff": 15
  }
]
```

### `POST /api/Announcement/v1/SignalFailureWrite`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Announcement-v1-SignalFailureWrite>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/SignalFailureWrite`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/SignalFailureWrite'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/SignalFailureWrite' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "SignalNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "MESSAGE": "sample string 4"
}'
```
- Help request modeli: `SignalFailureWriteModel`
- Help request alanları: `SignalNo` (integer, Required): Hatalı sinyalizasyon numarası, `NotifierType` (integer, Required): Platform için eğer cep trafik ise -1, Web ise -2 gelmelidir., `FailureType` (integer, Required): Vatandaştan gelen arıza bildirimini ifade etmektedir., `MESSAGE` (string, Required): Kullanıcıdan alınan mesajı ifade etmektedir.
- Help örnek request gövdesi:
```json
{
  "SignalNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "MESSAGE": "sample string 4"
}
```
- Help response modeli: `ResponseSignalFailure`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `GET /api/Announcement/v1/Transportation/IETT/VehicleInfo`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Announcement-v1-Transportation-IETT-VehicleInfo>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/IETT/VehicleInfo`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAnnouncement%2fv1%2fTransportation%2fIETT%2fVehicleInfo`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/IETT/VehicleInfo'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAnnouncement%2fv1%2fTransportation%2fIETT%2fVehicleInfo">here</a>.</h2>
</body></html>
```
- Help response modeli: `IETTVehicleModel[]`
- Help response alanları: `VehicleDoorCode` (string), `VehicleId` (integer), `RouteCode` (string), `LineCodeOfRoute` (string), `UpdatedStartTime` (date), `UpdatedTime` (date), `OrerTime` (date), `TaskSituationCode` (string), `LineCodeOfRouteIfDepar` (string), `Latitude` (decimal number), `Longitude` (decimal number), `Speed` (decimal number), `CreatedDate` (date), `LocationRecordedTime` (date), `TaskTypeCode` (string), `SecondsSinceLastLocation` (integer), `UpdatedTimeDeviationInMinutes` (integer), `ActualTimeDeviationInMinutes` (integer), `Priority` (integer), `DataSource` (string)
- Help örnek response gövdesi:
```json
[
  {
    "VehicleDoorCode": "sample string 1",
    "VehicleId": 2,
    "RouteCode": "sample string 3",
    "LineCodeOfRoute": "sample string 4",
    "UpdatedStartTime": "2026-03-11T17:15:50.6683575+03:00",
    "UpdatedTime": "2026-03-11T17:15:50.6683575+03:00",
    "OrerTime": "2026-03-11T17:15:50.6683575+03:00",
    "TaskSituationCode": "sample string 5",
    "LineCodeOfRouteIfDepar": "sample string 6",
    "Latitude": 1.1,
    "Longitude": 1.1,
    "Speed": 1.1,
    "CreatedDate": "2026-03-11T17:15:50.6683575+03:00",
    "LocationRecordedTime": "2026-03-11T17:15:50.6683575+03:00",
    "TaskTypeCode": "sample string 8",
    "SecondsSinceLastLocation": 1,
    "UpdatedTimeDeviationInMinutes": 1,
    "ActualTimeDeviationInMinutes": 1,
    "Priority": 1,
    "DataSource": "sample string 9"
  },
  {
    "VehicleDoorCode": "sample string 1",
    "VehicleId": 2,
    "RouteCode": "sample string 3",
    "LineCodeOfRoute": "sample string 4",
    "UpdatedStartTime": "2026-03-11T17:15:50.6683575+03:00",
    "UpdatedTime": "2026-03-11T17:15:50.6683575+03:00",
    "OrerTime": "2026-03-11T17:15:50.6683575+03:00",
    "TaskSituationCode": "sample string 5",
    "LineCodeOfRouteIfDepar": "sample string 6",
    "Latitude": 1.1,
    "Longitude": 1.1,
    "Speed": 1.1,
    "CreatedDate": "2026-03-11T17:15:50.6683575+03:00",
    "LocationRecordedTime": "2026-03-11T17:15:50.6683575+03:00",
    "TaskTypeCode": "sample string 8",
    "SecondsSinceLastLocation": 1,
    "UpdatedTimeDeviationInMinutes": 1,
    "ActualTimeDeviationInMinutes": 1,
    "Priority": 1,
    "DataSource": "sample string 9"
  }
]
```

### `GET /api/Announcement/v1/Transportation/IETT/{lang}`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Announcement-v1-Transportation-IETT-lang>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/IETT/tr`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `lang` (string, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/IETT/tr'
```
- Canlı örnek çıktı:
```json
[{"UlasimDuyuruId":774556,"UlasimMod":1,"KaynakID":"CEVATPASA - AKSARAY_Günlük_202506232325","Dil":"TR","Hat":"CEVATPASA - AKSARAY","Tip":"Günlük","Baslik":"","Icerik":"CEVATPASA SON DURAKTA ARAÇ PARKLANMASI NEDENI ILE KAPALIDIR.ARAÇLARIMIZ HAFIZ SOKAK DURAGINDA BITIS YAPIP KAPTAN AHMET ERDOGAN DURAGINDA SAATLERINE KALKIS YAPACAKTIR\t","DuyuruLink":"","Resim":"","Icerik_Video":[""],"Icerik_Resimler":[""],"BaslangicTarihi":"2025-06-23T23:25:00","BitisTarihi":null,"KayitTarihi":"2025-06-23T16:14:11","TimeDiff":375477},{"UlasimDuyuruId":774557,"UlasimMod":1,"KaynakID":"CEVATPASA - MECIDIYEKÖY_Günlük_202506232325","Dil":"TR","Hat":"CEVATPASA - MECIDIYEKÖY","Tip":"Günlük","Baslik":"","Icerik":"CEVATPASA SON DURAKTA ARAÇ PARKLANMASI NEDENI ILE KAPALIDIR.ARAÇLARIMIZ HAFIZ SOKAK DURAGINDA BITIS YAPIP KAPTAN AHMET ERDOGAN DURAGINDA SAATLERINE KALKIS YAPACAKTIR\t","DuyuruLink":"","Resim":"","Icerik_Video":[""],"Icerik_Resimler":[""],"BaslangicTarihi":"2025-06-23T23:25:00","BitisTarihi":null,"KayitTarihi":"2025-06-23T16:14:11","TimeDiff":375477},{"UlasimDuyuruId":774558,"UlasimMod":1,"KaynakID":"CEVATPASA - TAKSIM_Günlük_202506232325","Dil":"TR","Hat":"CEVATPASA - TAKSIM","Tip":"Günlük","Baslik":"","Icerik":"CEVATPASA SON DURAKTA ARAÇ PARKLANMASI NEDENI ILE KAPALIDIR.ARAÇLARIMIZ HAFIZ SOKAK DURAGINDA BITIS YAPIP KAPTAN AHMET ERDOGAN DURAGINDA SAATLERINE KALKIS YAPACAKTIR\t","DuyuruLink":"","Resim":"","Icerik_Video":[""],"Icerik_Resimler":[""],"BaslangicTarihi":"2025-06-23T23:25:00","BitisTarihi":null,"KayitTarihi":"2025-06-23T16:14:12","TimeDiff":375477},{"UlasimDuyuruId":774554,"UlasimMod":1,"KaynakID":"CEVATPASA - EMINÖNÜ_Günlük_202506232325","Dil":"TR","Hat":"CEVATPASA - EMINÖNÜ","Tip":"Günlük","Baslik":"","Icerik":"CEVATPASA SON DURAKTA ARAÇ PARKLANMASI NEDENI ILE KAPALIDIR.ARAÇLARIMIZ HAFIZ SOKAK DURAGINDA BITIS YAPIP KAPTAN AHMET ERDOGAN DURAGINDA SAATLERINE KALKIS YAPACAKTIR\t","DuyuruLink":"","Resim":"","Icerik_Video":[""],"Icerik_Resimler":[""],"BaslangicTarihi":"2025-06-23T23:25:00","BitisTarihi":null,"KayitTarihi":"2025-06-23T16:14:10","TimeDiff":375477},{"UlasimDuyuruId":774646,"UlasimMod":1,"KaynakID":"IETT IKITELLI GARAJI-TAKSIM_Günlük_202506232317","Dil":"TR","Hat":"IETT IKITELLI GARAJI-TAKSIM","Tip":"Günlük","Baslik":"","Icerik":"ATISALANI YANYOL ASFALT ÇALISMASI NEDENIYLE KAPALI OLDUGUNDAN HATTIMIZIN ARAÇLARI METROKENT YÖNÜNE TOPKAPI ALT GEÇIT DURAGINDAN GÜZERGAH DISINA ÇIKARAK ULUDAG CADDESI DURAGINDAN GÜZERGAHA GIRER.\t","DuyuruLink":"","Resim":"","Icerik_Video":[""],"Icerik_Resimler":[""],"BaslangicTarihi":"2025-06-23T23:17:00","BitisTarihi":null,"KayitTarihi":"2025-06-23T16:15:12","TimeDiff":375485},{"UlasimDuyuruId":774645,"UlasimMod":1,"KaynakID":"IETT IKITELLI GARAJI-TAKSIM_Günlük_202506232232","Dil":"TR","Hat":"IETT IKITELLI GARAJI-TAKSIM","Tip":"Günlük","Baslik":"","Icerik":"ATISALANI YANYOL ASFALT ÇALISMASI NEDENIYLE KAPALI OLDUGUNDAN HATTIMIZIN ARAÇLARI METROKENT YÖNÜNE TOPKAPI ALT GEÇIT DURAGINDAN GÜZERGAH DISINA ÇIKARAK ULUDAG 
```
- Help response modeli: `AnnouncementTransportationModel[]`
- Help response alanları: `UlasimDuyuruId` (integer), `UlasimMod` (byte), `KaynakID` (string), `Dil` (string), `Hat` (string), `Tip` (string), `Baslik` (string), `Icerik` (string), `DuyuruLink` (string), `Resim` (string), `Icerik_Video` (Collection of string), `Icerik_Resimler` (Collection of string), `BaslangicTarihi` (date), `BitisTarihi` (date), `KayitTarihi` (date), `TimeDiff` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "UlasimDuyuruId": 1,
    "UlasimMod": 64,
    "KaynakID": "sample string 3",
    "Dil": "sample string 4",
    "Hat": "sample string 5",
    "Tip": "sample string 6",
    "Baslik": "sample string 7",
    "Icerik": "sample string 8",
    "DuyuruLink": "sample string 9",
    "Resim": "sample string 10",
    "Icerik_Video": [
      "sample string 1",
      "sample string 2"
    ],
    "Icerik_Resimler": [
      "sample string 1",
      "sample string 2"
    ],
    "BaslangicTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "BitisTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "KayitTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "TimeDiff": 13
  },
  {
    "UlasimDuyuruId": 1,
    "UlasimMod": 64,
    "KaynakID": "sample string 3",
    "Dil": "sample string 4",
    "Hat": "sample string 5",
    "Tip": "sample string 6",
    "Baslik": "sample string 7",
    "Icerik": "sample string 8",
    "DuyuruLink": "sample string 9",
    "Resim": "sample string 10",
    "Icerik_Video": [
      "sample string 1",
      "sample string 2"
    ],
    "Icerik_Resimler": [
      "sample string 1",
      "sample string 2"
    ],
    "BaslangicTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "BitisTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "KayitTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "TimeDiff": 13
  }
]
```

### `GET /api/Announcement/v1/Transportation/METRO/{lang}`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Announcement-v1-Transportation-METRO-lang>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/METRO/tr`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAnnouncement%2fv1%2fTransportation%2fMETRO%2ftr`
- Yol/query parametreleri: `lang` (string, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/METRO/tr'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAnnouncement%2fv1%2fTransportation%2fMETRO%2ftr">here</a>.</h2>
</body></html>
```
- Help response modeli: `AnnouncementTransportationModel[]`
- Help response alanları: `UlasimDuyuruId` (integer), `UlasimMod` (byte), `KaynakID` (string), `Dil` (string), `Hat` (string), `Tip` (string), `Baslik` (string), `Icerik` (string), `DuyuruLink` (string), `Resim` (string), `Icerik_Video` (Collection of string), `Icerik_Resimler` (Collection of string), `BaslangicTarihi` (date), `BitisTarihi` (date), `KayitTarihi` (date), `TimeDiff` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "UlasimDuyuruId": 1,
    "UlasimMod": 64,
    "KaynakID": "sample string 3",
    "Dil": "sample string 4",
    "Hat": "sample string 5",
    "Tip": "sample string 6",
    "Baslik": "sample string 7",
    "Icerik": "sample string 8",
    "DuyuruLink": "sample string 9",
    "Resim": "sample string 10",
    "Icerik_Video": [
      "sample string 1",
      "sample string 2"
    ],
    "Icerik_Resimler": [
      "sample string 1",
      "sample string 2"
    ],
    "BaslangicTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "BitisTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "KayitTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "TimeDiff": 13
  },
  {
    "UlasimDuyuruId": 1,
    "UlasimMod": 64,
    "KaynakID": "sample string 3",
    "Dil": "sample string 4",
    "Hat": "sample string 5",
    "Tip": "sample string 6",
    "Baslik": "sample string 7",
    "Icerik": "sample string 8",
    "DuyuruLink": "sample string 9",
    "Resim": "sample string 10",
    "Icerik_Video": [
      "sample string 1",
      "sample string 2"
    ],
    "Icerik_Resimler": [
      "sample string 1",
      "sample string 2"
    ],
    "BaslangicTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "BitisTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "KayitTarihi": "2026-03-11T17:15:50.6683575+03:00",
    "TimeDiff": 13
  }
]
```

## Scm

### `GET /api/Scm/TrafficData/v1/ComTrafficIndex`

- Açıklama: 1 önceki günün son 4 hafta içerisindeki trafik index değeri geçen yılla birlikte verilir. Toplamda 8 index değeri basılmış olur. 1-99 arasında değişen bir değer olup, 1=>Açık Trafik, 99=>Çok Yoğun Trafik anlamına geliyor.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Scm-TrafficData-v1-ComTrafficIndex>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Scm/TrafficData/v1/ComTrafficIndex`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fScm%2fTrafficData%2fv1%2fComTrafficIndex`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Scm/TrafficData/v1/ComTrafficIndex'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fScm%2fTrafficData%2fv1%2fComTrafficIndex">here</a>.</h2>
</body></html>
```
- Help response modeli: `ComparativeTrafficIndex[]`
- Help response alanları: `Time` (string): Saat, `Day` (string): Gün, `TI_A_H1` (integer): Bir önceki sene 3 hafta öncesinin trafik indeksi, `TI_A_H2` (integer): Bir önceki sene 2 hafta öncesinin trafik indeksi, `TI_A_H3` (integer): Bir önceki sene 3 hafta öncesinin trafik indeksi, `TI_A_H4` (integer): Bir önceki senenin trafik indeksi, `TI_H1` (integer): 1 hafta öncesinin trafik indeksi, `TI_H2` (integer): 2 hafta öncesinin trafik indeksi, `TI_H3` (integer): 3 hafta öncesinin trafik indeksi, `Yesterday` (integer): Bir önceki günün trafik indeksi
- Help örnek response gövdesi:
```json
[
  {
    "Time": "sample string 1",
    "Day": "sample string 2",
    "TI_A_H1": 3,
    "TI_A_H2": 4,
    "TI_A_H3": 5,
    "TI_A_H4": 6,
    "TI_H1": 7,
    "TI_H2": 8,
    "TI_H3": 9,
    "Yesterday": 10
  },
  {
    "Time": "sample string 1",
    "Day": "sample string 2",
    "TI_A_H1": 3,
    "TI_A_H2": 4,
    "TI_A_H3": 5,
    "TI_A_H4": 6,
    "TI_H1": 7,
    "TI_H2": 8,
    "TI_H3": 9,
    "Yesterday": 10
  }
]
```

## BTCongestion

### `GET /api/BTCongestion/v1/Alarms`

- Açıklama: TR : Bluetooth sensörlerin tespit ettiği trafik sıkışıklıklarını (yoğun trafik olan güzergahları) döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-BTCongestion-v1-Alarms>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/BTCongestion/v1/Alarms`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fBTCongestion%2fv1%2fAlarms`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/BTCongestion/v1/Alarms'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fBTCongestion%2fv1%2fAlarms">here</a>.</h2>
</body></html>
```
- Help response modeli: `Alarm[]`
- Help response alanları: `RowNo` (integer): Satır numarası, `IdVct` (integer): Vektör ID, `IdSensor` (integer): Sensör Id, `Time` (date): Üretilen veri zamanı
- Help örnek response gövdesi:
```json
[
  {
    "RowNo": 1,
    "IdVct": 2,
    "IdSensor": 3,
    "Time": "2026-03-11T17:15:50.6839842+03:00"
  },
  {
    "RowNo": 1,
    "IdVct": 2,
    "IdSensor": 3,
    "Time": "2026-03-11T17:15:50.6839842+03:00"
  }
]
```

## Sbgm

### `POST /api/Sbgm/v1/InsertAccidentInfo`

- Açıklama: Sbgm Mobil Kaza Tutanağı doldurulduğu anda TKM Duyurular tablosuna kayıt etmek için kullanılır.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Sbgm-v1-InsertAccidentInfo>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Sbgm/v1/InsertAccidentInfo`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Sbgm/v1/InsertAccidentInfo'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Sbgm/v1/InsertAccidentInfo' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "XCoordinate": "sample string 1",
  "YCoordinate": "sample string 2",
  "gCoordinate": "sample string 3",
  "ImageBase64": "sample string 4"
}'
```
- Help request modeli: `SbgmAccident`
- Help request alanları: `XCoordinate` (string, Required): Kazanın olduğu X Koordinat. Örn: 28.679104, `YCoordinate` (string, Required): Kazanın olduğu Y Koordinat. Örn:41.015760, `gCoordinate` (string), `ImageBase64` (string): Kazanın varsa 1 adet fotoğrafı
- Help örnek request gövdesi:
```json
{
  "XCoordinate": "sample string 1",
  "YCoordinate": "sample string 2",
  "gCoordinate": "sample string 3",
  "ImageBase64": "sample string 4"
}
```
- Help response modeli: `SbgmAccidentInsertResult`
- Help response alanları: `State` (boolean)
- Help örnek response gövdesi:
```json
{
  "State": true
}
```

## WeatherData

### `GET /api/WeatherData/v1/AllStationsData`

- Açıklama: AKOM meteoroloji uspGetAllStationsData storeprocedure kullanarak,data döndürüyor.
            5 Dakikalık Cache
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-WeatherData-v1-AllStationsData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/WeatherData/v1/AllStationsData`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fWeatherData%2fv1%2fAllStationsData`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/WeatherData/v1/AllStationsData'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fWeatherData%2fv1%2fAllStationsData">here</a>.</h2>
</body></html>
```
- Help response modeli: `WeatherDataModel[]`
- Help response alanları: `ISTASYON_ID` (integer), `ISTASYON_ADI` (string), `LAT` (string), `LONG` (string), `RUZGAR_HIZI` (integer), `HAVA_SICAKLIGI` (decimal number), `HISSEDILEN_SICAKLIK` (decimal number), `ASFALT_SICAKLIGI` (decimal number), `ASFALT_DURUMU` (integer), `ASFALT_DURUMUTR` (string), `ASFALT_DURUMUEN` (string), `DONMA_SICAKLIGI` (integer), `BAGIL_NEM` (integer), `GORUS_UZAKLIGI` (integer), `GUNLUK_TOPLAM_YAGIS` (integer), `HAVA_DURUMU_ID` (integer), `HAVA_DURUMU` (string), `RUZGAR_YONU` (decimal number), `ZAMAN` (date)
- Help örnek response gövdesi:
```json
[
  {
    "ISTASYON_ID": 1,
    "ISTASYON_ADI": "sample string 2",
    "LAT": "sample string 3",
    "LONG": "sample string 4",
    "RUZGAR_HIZI": 5,
    "HAVA_SICAKLIGI": 6.1,
    "HISSEDILEN_SICAKLIK": 7.1,
    "ASFALT_SICAKLIGI": 8.1,
    "ASFALT_DURUMU": 9,
    "ASFALT_DURUMUTR": "sample string 10",
    "ASFALT_DURUMUEN": "sample string 11",
    "DONMA_SICAKLIGI": 12,
    "BAGIL_NEM": 13,
    "GORUS_UZAKLIGI": 14,
    "GUNLUK_TOPLAM_YAGIS": 15,
    "HAVA_DURUMU_ID": 16,
    "HAVA_DURUMU": "sample string 17",
    "RUZGAR_YONU": 18.1,
    "ZAMAN": "2026-03-11T17:15:50.6839842+03:00"
  },
  {
    "ISTASYON_ID": 1,
    "ISTASYON_ADI": "sample string 2",
    "LAT": "sample string 3",
    "LONG": "sample string 4",
    "RUZGAR_HIZI": 5,
    "HAVA_SICAKLIGI": 6.1,
    "HISSEDILEN_SICAKLIK": 7.1,
    "ASFALT_SICAKLIGI": 8.1,
    "ASFALT_DURUMU": 9,
    "ASFALT_DURUMUTR": "sample string 10",
    "ASFALT_DURUMUEN": "sample string 11",
    "DONMA_SICAKLIGI": 12,
    "BAGIL_NEM": 13,
    "GORUS_UZAKLIGI": 14,
    "GUNLUK_TOPLAM_YAGIS": 15,
    "HAVA_DURUMU_ID": 16,
    "HAVA_DURUMU": "sample string 17",
    "RUZGAR_YONU": 18.1,
    "ZAMAN": "2026-03-11T17:15:50.6839842+03:00"
  }
]
```

## Junction

### `GET /api/Junction/v1/All`

- Açıklama: ENG:
            TR:İstanbul’daki sinyalize kavşakların listesini koordinatlı bir şekilde listeler.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-All>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/All`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv1%2fAll`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/All'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv1%2fAll">here</a>.</h2>
</body></html>
```
- Help response modeli: `JunctionModel[]`
- Help response alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `CountyId` (integer): JunctionNo : Sinyalize Ilce Numarası, `JunctionType` (integer): JunctionType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara)
- Help örnek response gövdesi:
```json
[
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "CountyId": 3,
    "JunctionType": 4,
    "XCoord": "sample string 5",
    "YCoord": "sample string 6",
    "JunctionNewNo": "sample string 7"
  },
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "CountyId": 3,
    "JunctionType": 4,
    "XCoord": "sample string 5",
    "YCoord": "sample string 6",
    "JunctionNewNo": "sample string 7"
  }
]
```

### `GET /api/Junction/v1/DashJunctionCount`

- Açıklama: ENG:
            TR:İstanbul’daki arızalı kavşakları arıza türlerine göre getirir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-DashJunctionCount>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/DashJunctionCount`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv1%2fDashJunctionCount`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/DashJunctionCount'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv1%2fDashJunctionCount">here</a>.</h2>
</body></html>
```
- Help response modeli: `Result_INT`
- Help response alanları: `Res` (integer)
- Help örnek response gövdesi:
```json
{
  "Res": 1
}
```

### `POST /api/Junction/v1/InsertFailure`

- Açıklama: Sinyal arızalarını kaydeder.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Junction-v1-InsertFailure>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/InsertFailure`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/InsertFailure'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/InsertFailure' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "JunctionNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "Message": "sample string 4"
}'
```
- Help request modeli: `JunctionFailureModel`
- Help request alanları: `JunctionNo` (integer, Required): Hatalı sinyalizasyon numarası, `NotifierType` (integer, Required): Platform için eğer cep trafik ise -1, Web ise -2 gelmelidir., `FailureType` (integer, Required): Vatandaştan gelen arıza bildirimini ifade etmektedir., `Message` (string, Required): Kullanıcıdan alınan mesajı ifade etmektedir.
- Help örnek request gövdesi:
```json
{
  "JunctionNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "Message": "sample string 4"
}
```
- Help response modeli: `JunctionFailureResponse`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

### `GET /api/Junction/v1/JunctionFailure`

- Açıklama: ENG:
            TR:İstanbul’daki arızalı kavşakları arıza türlerine göre getirir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-JunctionFailure>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionFailure`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv1%2fJunctionFailure`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionFailure'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv1%2fJunctionFailure">here</a>.</h2>
</body></html>
```
- Help response modeli: `JunctionFailureTypeModel[]`
- Help response alanları: `FailureType` (string): FailreType : Sinyalize kavşak arıza türü, `FailureCount` (integer): Count : Arıza sayısı
- Help örnek response gövdesi:
```json
[
  {
    "FailureType": "sample string 1",
    "FailureCount": 2
  },
  {
    "FailureType": "sample string 1",
    "FailureCount": 2
  }
]
```

### `GET /api/Junction/v1/JunctionFailureLevelCount`

- Açıklama: ENG:
            TR:İstanbul’daki arızalı kavşakları arıza seviyelerine göre sayıları ile getirir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-JunctionFailureLevelCount>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionFailureLevelCount`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv1%2fJunctionFailureLevelCount`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionFailureLevelCount'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv1%2fJunctionFailureLevelCount">here</a>.</h2>
</body></html>
```
- Help response modeli: `JunctionFailureLevelModel[]`
- Help response alanları: `date` (string): date : tarih, `warns` (integer): warns : Uyarı sayısı, `errors` (integer): errors : Hata sayısı, `criticalErrors` (integer): criticalErrors : Kritik hata  sayısı
- Help örnek response gövdesi:
```json
[
  {
    "date": "sample string 1",
    "warns": 2,
    "errors": 3,
    "criticalErrors": 4
  },
  {
    "date": "sample string 1",
    "warns": 2,
    "errors": 3,
    "criticalErrors": 4
  }
]
```

### `GET /api/Junction/v1/JunctionMod`

- Açıklama: ENG:
            TR:İstanbul’daki sinyalize kavşakların çalışma modlarına göre getirir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-JunctionMod>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionMod`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv1%2fJunctionMod`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionMod'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv1%2fJunctionMod">here</a>.</h2>
</body></html>
```
- Help response modeli: `JunctionMod[]`
- Help response alanları: `ModID` (integer), `Mod` (string): FailreType : Sinyalize kavşak çalışma türü, `ModCount` (integer): FailreType : Sinyalize kavşak çalışma türüne göre toplam sayısı
- Help örnek response gövdesi:
```json
[
  {
    "ModID": 1,
    "Mod": "sample string 2",
    "ModCount": 3
  },
  {
    "ModID": 1,
    "Mod": "sample string 2",
    "ModCount": 3
  }
]
```

### `GET /api/Junction/v2/All`

- Açıklama: ENG:
            TR:İstanbul’daki sinyalize kavşakların listesini koordinatlı bir şekilde listeler.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v2-All>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v2/All`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv2%2fAll`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v2/All'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fJunction%2fv2%2fAll">here</a>.</h2>
</body></html>
```
- Help response modeli: `JunctionModel_v2[]`
- Help response alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `JunctionButtonType` (string): JunctionButtonType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara), `JunctionType` (string), `JunctionWorkingModeID` (integer), `JunctionWorkingMode` (string)
- Help örnek response gövdesi:
```json
[
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "JunctionButtonType": "sample string 3",
    "XCoord": "sample string 4",
    "YCoord": "sample string 5",
    "JunctionNewNo": "sample string 6",
    "JunctionType": "sample string 7",
    "JunctionWorkingModeID": 8,
    "JunctionWorkingMode": "sample string 9"
  },
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "JunctionButtonType": "sample string 3",
    "XCoord": "sample string 4",
    "YCoord": "sample string 5",
    "JunctionNewNo": "sample string 6",
    "JunctionType": "sample string 7",
    "JunctionWorkingModeID": 8,
    "JunctionWorkingMode": "sample string 9"
  }
]
```

### `GET /api/Junction/v3/All`

- Açıklama: ENG:
            TR:İstanbul’daki sinyalize kavşakların listesini koordinatlı bir şekilde listeler. BigData için
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v3-All>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v3/All`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v3/All'
```
- Canlı örnek çıktı:
```json
[{"JunctionNo":2001,"JunctionName":"AVCILAR İETT","XCoord":"28.723816573619843","YCoord":"40.98635112963187"},{"JunctionNo":2002,"JunctionName":"İ. ÜNİVERSİTESİ AVCILAR KAMPÜSÜ","XCoord":"28.7221949","YCoord":"40.9888212"},{"JunctionNo":2003,"JunctionName":"ORTANCA SOKAK","XCoord":"28.719136118888855","YCoord":"40.99056238773209"},{"JunctionNo":2004,"JunctionName":"AVCILAR BORUSAN","XCoord":"28.71734851","YCoord":"40.99274889"},{"JunctionNo":2005,"JunctionName":"AVCILAR BAĞCI SOKAK","XCoord":"28.71579269","YCoord":"40.99470213"},{"JunctionNo":2006,"JunctionName":"AVCILAR URAN CAD.","XCoord":"28.71372738","YCoord":"40.99772958"},{"JunctionNo":2007,"JunctionName":"AVCILAR MAREŞAL CADDESİ","XCoord":"28.71160404","YCoord":"41.00116641"},{"JunctionNo":2008,"JunctionName":"ORHANGAZİ YAYA","XCoord":"28.7099238","YCoord":"41.00269445"},{"JunctionNo":2009,"JunctionName":"BEYOĞLU SOKAK","XCoord":"28.7069093","YCoord":"41.00511379"},{"JunctionNo":2010,"JunctionName":"AVCILAR YILDIRIM BEYAZIT CAD.","XCoord":"28.7047682","YCoord":"41.00699533"},{"JunctionNo":2011,"JunctionName":"KAZIM KARABEKİR CAD","XCoord":"28.70143818","YCoord":"41.00982181"},{"JunctionNo":2012,"JunctionName":"AVCILAR FİRİZKÖY SANAYİ SİTESİ","XCoord":"28.69683086872101","YCoord":"41.0124262354501"},{"JunctionNo":2013,"JunctionName":"AVCILAR İTFAİYE","XCoord":"28.71264565","YCoord":"40.99352332"},{"JunctionNo":2015,"JunctionName":"Y.BEYAZID CAD-İSTİKLAL CAD..","XCoord":"28.70115888","YCoord":"41.00341195"},{"JunctionNo":2016,"JunctionName":"KARADUT SOKAK","XCoord":"28.70225377","YCoord":"41.00452209"},{"JunctionNo":2017,"JunctionName":"AVCILAR HASAN ÖNAL CAD","XCoord":"28.70351646","YCoord":"41.0163869"},{"JunctionNo":2018,"JunctionName":"GÜMÜŞPALA İLKOKULU","XCoord":"28.73497433","YCoord":"40.98116983"},{"JunctionNo":2019,"JunctionName":"AVCILAR İBB SOSYAL TESİSL","XCoord":"28.74279788","YCoord":"40.97649505"},{"JunctionNo":2020,"JunctionName":"AVCILAR FATİH CADDESİ","XCoord":"28.72270596","YCoord":"40.97977144"},{"JunctionNo":2021,"JunctionName":"AVCILAR CAMİ SOKAK","XCoord":"28.72048425","YCoord":"40.9802198"},{"JunctionNo":2022,"JunctionName":"AMBARLI İLKÖĞRETİM İLKOKULU","XCoord":"28.71846432","YCoord":"40.97606772"},{"JunctionNo":2023,"JunctionName":"İNÖNÜ İLKOKULU","XCoord":"28.71010784","YCoord":"40.97689466"},{"JunctionNo":2024,"JunctionName":"MEHMET BAYDAR LİSESİ","XCoord":"28.71022403","YCoord":"40.98084909"},{"JunctionNo":2025,"JunctionName":"MEHMET BAYDAR ANADOLU LİSESİ","XCoord":"28.71086256","YCoord":"40.98151718"},{"JunctionNo":2026,"JunctionName":"AMBARLI DOLUM TESİSLERİ","XCoord":"28.69878278","YCoord":"40.98494028"},{"JunctionNo":2029,"JunctionName":"ALTINŞEHİR","XCoord":"28.741049766540527","YCoord":"41.062349237669665"},{"JunctionNo":2030,"JunctionName":"TAHTAKALE","XCoord":"28.73467346","YCoord":"41.06138865"},{"JunctionNo":2031,"JunctionName":"OKUL YOLU CADDESİ","XCoord":"28.72902274131775","YCoord":"41.05784323682867"},{"JunctionNo":2032,"JunctionName":"AVCILAR 0-3 G
```
- Help response modeli: `JunctionModel_v3[]`
- Help response alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı
- Help örnek response gövdesi:
```json
[
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4"
  },
  {
    "JunctionNo": 1,
    "JunctionName": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4"
  }
]
```

## General

### `POST /api/General/v1/CheckUser`

- Açıklama: Yoğunluk Haritası 15 dakikalık süreyi uzatmak için kullanılmaktadır.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-General-v1-CheckUser>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/General/v1/CheckUser`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/General/v1/CheckUser'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/General/v1/CheckUser' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Username": "sample string 1",
  "Password": "sample string 2"
}'
```
- Help request modeli: `RequestUserModel`
- Help request alanları: `Username` (string): Kullanıcı Adı, `Password` (string)
- Help örnek request gövdesi:
```json
{
  "Username": "sample string 1",
  "Password": "sample string 2"
}
```
- Help response modeli: `ResponseMessage`
- Help response alanları: `Result` (string)
- Help örnek response gövdesi:
```json
{
  "Result": "sample string 1"
}
```

### `GET /api/General/v1/Districts`

- Açıklama: İlçe listesi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-General-v1-Districts>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/General/v1/Districts`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fGeneral%2fv1%2fDistricts`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/General/v1/Districts'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fGeneral%2fv1%2fDistricts">here</a>.</h2>
</body></html>
```
- Help response modeli: `District[]`
- Help response alanları: `Id` (integer): District Id, `Name` (string): District Name
- Help örnek response gövdesi:
```json
[
  {
    "Id": 1,
    "Name": "sample string 2"
  },
  {
    "Id": 1,
    "Name": "sample string 2"
  }
]
```

### `GET /api/General/v1/ServerIP`

- Açıklama: İlçe listesi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-General-v1-ServerIP>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/General/v1/ServerIP`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fGeneral%2fv1%2fServerIP`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/General/v1/ServerIP'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fGeneral%2fv1%2fServerIP">here</a>.</h2>
</body></html>
```
- Help response modeli: Belirtilmemiş.
- Help örnek response gövdesi:
```json
[
  "sample string 1",
  "sample string 2"
]
```

## EurasiaTunnel

### `GET /api/EurasiaTunnel/v1/GetTravelTimes`

- Açıklama: Yalnızca Avrasya Tünel Rotaları için seyahat sürelerini verir.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-EurasiaTunnel-v1-GetTravelTimes>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/GetTravelTimes`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fEurasiaTunnel%2fv1%2fGetTravelTimes`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/GetTravelTimes'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fEurasiaTunnel%2fv1%2fGetTravelTimes">here</a>.</h2>
</body></html>
```
- Help response modeli: `FcdRouteTravelTimeResult[]`
- Help response alanları: `Date` (date), `TravelTime` (integer): Saniye cinsinden seyahat süresi, `SystemMessageId` (integer): SYSTEM_TYPE değeri 5 ise DisplayMessageId; 2 ise TRF_MSG_ID, `SystemId` (integer): SYSTEM_TYPE değeri 5 ise YDSNo; 2 ise SYSTEM_ID, `MessageId` (integer): SYSTEM_TYPE değeri 5 ise MESSAGE_ID; 2 ise RouteId, `SystemType` (byte): 5:YDS; 2:VMS;, `RouteName` (string), `RouteLength` (integer), `RouteFrom` (string), `RouteTo` (string), `ColorClassId` (integer), `ColorClassName` (string), `MsgIdentifier` (string): SystemType,, SystemMessageId, SystemId, MessageId birleşiminden oluşan benzersiz rota IDsi
            Format: R[3][4][4][4]
- Help örnek response gövdesi:
```json
[
  {
    "Date": "2026-03-11T17:15:50.7464778+03:00",
    "TravelTime": 2,
    "SystemMessageId": 3,
    "SystemId": 4,
    "MessageId": 5,
    "SystemType": 64,
    "RouteName": "sample string 7",
    "RouteLength": 8,
    "RouteFrom": "sample string 9",
    "RouteTo": "sample string 10",
    "ColorClassId": 11,
    "ColorClassName": "sample string 12",
    "MsgIdentifier": "sample string 13"
  },
  {
    "Date": "2026-03-11T17:15:50.7464778+03:00",
    "TravelTime": 2,
    "SystemMessageId": 3,
    "SystemId": 4,
    "MessageId": 5,
    "SystemType": 64,
    "RouteName": "sample string 7",
    "RouteLength": 8,
    "RouteFrom": "sample string 9",
    "RouteTo": "sample string 10",
    "ColorClassId": 11,
    "ColorClassName": "sample string 12",
    "MsgIdentifier": "sample string 13"
  }
]
```

### `POST /api/EurasiaTunnel/v1/SaveEvent`

- Açıklama: Event Bilgilerini Kaydeder, Event durumları değiştikçe çağrılmalıdır.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-EurasiaTunnel-v1-SaveEvent>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/SaveEvent`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/SaveEvent'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/SaveEvent' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Encrypted": true,
  "EncryptedText": "sample string 2",
  "Id": 3,
  "EventType": 4,
  "Date": "2026-03-11T17:15:50.7464778+03:00"
}'
```
- Help request modeli: `Event`
- Help request alanları: `Encrypted` (boolean): Şifreli Veri kullanılavağını ifade eder.
            true, false değerleri alır., `EncryptedText` (string): şifrelenmiş metin içerir., `Id` (integer): Dedektör Id, `EventType` (integer): event Türü, `Date` (date): Event'in oluşturulma Zamanı
- Help örnek request gövdesi:
```json
{
  "Encrypted": true,
  "EncryptedText": "sample string 2",
  "Id": 3,
  "EventType": 4,
  "Date": "2026-03-11T17:15:50.7464778+03:00"
}
```
- Help response modeli: `Result`
- Help response alanları: `Detail` (string): Oluşan hatanın ayrıntısı, `Status` (string): ok: işlem başarılı
            error: hata oluştur ayrıntı Error Alanında
- Help örnek response gövdesi:
```json
{
  "Detail": "sample string 1",
  "Status": "sample string 2"
}
```

### `POST /api/EurasiaTunnel/v1/SaveObservation`

- Açıklama: Sensör Gözlemlerini(Observation) kaydeder.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-EurasiaTunnel-v1-SaveObservation>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/SaveObservation`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/SaveObservation'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/SaveObservation' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Date": "sample string 1",
  "Encrypted": true,
  "EncryptedText": "sample string 3",
  "DecryptedText": "sample string 4",
  "Id": 5,
  "O1": 1,
  "O2": 1,
  "S1": 1,
  "S2": 1,
  "V1": 1,
  "V2": 1
}'
```
- Help request modeli: `Observation`
- Help request alanları: `Date` (string): Gözlem Zamanı, `Encrypted` (boolean): Gözlem Değerleri Şifreli ise bu değer true atanmalı., `EncryptedText` (string): şifrelenmiş Metin, `DecryptedText` (string): şifrelenmemiş Metin JSON tipinde., `Id` (integer): Dedektör Id, `O1` (integer): 1. Şerit işgaliyet Yüzdesi, `O2` (integer): 2. Şerit işgaliyet Yüzdesi, `S1` (integer): 1. Şerit Ortalama Hız, `S2` (integer): 2. Şerit ortalama Hız, `V1` (integer): 1. Şerit Araç Sayısı, `V2` (integer): 2. Şerit Araç Sayısı
- Help örnek request gövdesi:
```json
{
  "Date": "sample string 1",
  "Encrypted": true,
  "EncryptedText": "sample string 3",
  "DecryptedText": "sample string 4",
  "Id": 5,
  "O1": 1,
  "O2": 1,
  "S1": 1,
  "S2": 1,
  "V1": 1,
  "V2": 1
}
```
- Help response modeli: `Result`
- Help response alanları: `Detail` (string): Oluşan hatanın ayrıntısı, `Status` (string): ok: işlem başarılı
            error: hata oluştur ayrıntı Error Alanında
- Help örnek response gövdesi:
```json
{
  "Detail": "sample string 1",
  "Status": "sample string 2"
}
```

## CleanEnergy

### `POST /api/CleanEnergy/v1/CsvContent`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CleanEnergy-v1-CsvContent>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/CleanEnergy/v1/CsvContent`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/CleanEnergy/v1/CsvContent'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CleanEnergy/v1/CsvContent' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "DataIdentifier": "sample string 1",
  "FileContent": "sample string 2"
}'
```
- Help request modeli: `CsvContent`
- Help request alanları: `DataIdentifier` (string), `FileContent` (string)
- Help örnek request gövdesi:
```json
{
  "DataIdentifier": "sample string 1",
  "FileContent": "sample string 2"
}
```
- Help response modeli: `CleanEnergyResponse`
- Help response alanları: `Result` (string)
- Help örnek response gövdesi:
```json
{
  "Result": "sample string 1"
}
```

## CitixController

### `GET /api/Citix/v1/BridgesStatus`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-BridgesStatus>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/BridgesStatus`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/BridgesStatus'
```
- Canlı örnek çıktı:
```json
[
  {
    "RouteId": 10,
    "RouteName": "ÇAĞLAYAN",
    "Status": "AKICI",
    "OrderNo": 1,
    "GroupId": 1
  }
]
```
- Help response modeli: `BridgeRouteStatusModel[]`
- Help response alanları: `RouteId` (integer), `RouteName` (string), `Status` (string), `OrderNo` (integer), `GroupId` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "RouteId": 1,
    "RouteName": "sample string 2",
    "Status": "sample string 3",
    "OrderNo": 4,
    "GroupId": 5
  },
  {
    "RouteId": 1,
    "RouteName": "sample string 2",
    "Status": "sample string 3",
    "OrderNo": 4,
    "GroupId": 5
  }
]
```

### `GET /api/Citix/v1/Camera`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-Camera>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/Camera`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/Camera'
```
- Canlı örnek çıktı:
```json
[{"Group":[],"ID":2,"Name":"AKOM","XCoord":"28.96274764","YCoord":"41.08630782","VideoURL":"https://hls.ibb.gov.tr/tkm4/hls/2.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm4/hls/2.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=2","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=2","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=2"]},{"Group":[],"ID":3,"Name":"AKSARAY","XCoord":"28.95382145","YCoord":"41.00983033","VideoURL":"https://hls.ibb.gov.tr/tkm4/hls/3.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm4/hls/3.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=3","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=3","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=3"]},{"Group":[],"ID":4,"Name":"ALİBEYKÖY MEYDANI","XCoord":"28.94778426","YCoord":"41.07454609","VideoURL":"https://hls.ibb.gov.tr/tkm2/hls/4.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm2/hls/4.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=4","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=4","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=4"]},{"Group":[],"ID":6,"Name":"ALTUNİZADE TÜNEL 1","XCoord":"29.0536348","YCoord":"41.02385711","VideoURL":"https://hls.ibb.gov.tr/tkm2/hls/6.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm2/hls/6.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=6","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=6","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=6"]},{"Group":[],"ID":5,"Name":"ALTUNİZADE TÜNEL ","XCoord":"29.0536348","YCoord":"41.02385711","VideoURL":"https://hls.ibb.gov.tr/tkm2/hls/5.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm2/hls/5.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=5","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=5","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=5"]},{"Group":[],"ID":8,"Name":"S. YOLU ATAKÖY 1","XCoord":"28.86594073","YCoord":"40.97697373","VideoURL":"https://hls.ibb.gov.tr/tkm1/hls/8.stream/playlist.m3u8","VideoURL_SSL":"https://hls.ibb.gov.tr/tkm1/hls/8.stream/playlist.m3u8","GroupId":0,"Images":["https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=8","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=8","https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=8"]},{"Group":[],"ID":9,"Name":"S. YOLU ATAKÖY 2","XCoord":"28.85223472","YCoord":"40.97640653","VideoURL":"https://hls.ibb.gov.tr/tkm1/hls/9.s
```
- Help response modeli: `CameraGroupedList[]`
- Help response alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Help örnek response gövdesi:
```json
[
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  },
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  }
]
```

### `GET /api/Citix/v1/CurrentAnnouncement`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-CurrentAnnouncement>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/CurrentAnnouncement`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/CurrentAnnouncement'
```
- Canlı örnek çıktı:
```json
[{"Id":1412103,"Metin":"Kayaşehir-Habibler Yönü, sağ şerit araç arızası nedeni ile 1 şerit trafiğe kapalı. Bölgedeki trafik yoğunlaşmaktadır.","MetinIng":"Kayaşehir-Habibler direction right lane vehicle breakdown. Traffic is increasing.","Tipi":32,"BitisTarihi":"2026-03-11T17:51:00","Link":"","Baslik":"Kayaşehir-Habibler Yönü, sağ şerit araç arızası. Bölgedeki trafik yoğunlaşmaktadır.","BaslikIng":"Kayaşehir-Habibler direction, right lane araç arızası. Bölgedeki trafik yoğunlaşmaktadır.","Koordinat":"41.146513,28.792742","Oncelik":1,"KameraId":596,"GirisTarihi":"2026-03-11T17:21:55","xKoordinat":"28.792742","yKoordinat":"41.146513","TimeDiff":1},{"Id":1412102,"Metin":"D100 Büyükçekmece-Beylikdüzü Yönü, sol şerit trafik kazası (hasarlı) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","MetinIng":"D100 Büyükçekmece-Beylikdüzü Yönü right lane traffic accident (damaged). 3 lane closed to traffic. Responding to accident.","Tipi":16,"BitisTarihi":"2026-03-11T17:46:00","Link":"","Baslik":"D100 Büyükçekmece-Beylikdüzü Yönü, sol şerit trafik kazası (hasarlı).","BaslikIng":"D100 Büyükçekmece-Beylikdüzü direction, left lane traffic accident (damaged).","Koordinat":"41.021081,28.582611","Oncelik":1,"KameraId":602,"GirisTarihi":"2026-03-11T17:17:16","xKoordinat":"28.582611","yKoordinat":"41.021081","TimeDiff":5},{"Id":1412101,"Metin":"D100 Avcılar Gümüşpala-Hacışerif Yönü, sol şerit trafik kazası (zincirleme) nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","MetinIng":"D100 Avcılar Gümüşpala-Hacışerif Yönü right lane traffic accident (pile up). No lanes are affected. Field staff was directed.","Tipi":16,"BitisTarihi":"2026-03-11T17:59:00","Link":"","Baslik":"D100 Avcılar Gümüşpala-Hacışerif Yönü, sol şerit trafik kazası (zincirleme) nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","BaslikIng":"D100 Avcılar Gümüşpala-Hacışerif direction, left lane traffic accident (pile up) nedeni ile 1 şerit trafiğe kapalı. Ekip sevk edildi.","Koordinat":"40.979955,28.750492","Oncelik":1,"KameraId":415,"GirisTarihi":"2026-03-11T17:03:44","xKoordinat":"28.750492","yKoordinat":"40.979955","TimeDiff":19},{"Id":1412100,"Metin":"Sahil Yolu Yeşilyurt-Ataköy Yönü, sol şerit trafik kazası (zincirleme) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","MetinIng":"Sahil Yolu Yeşilyurt-Ataköy Yönü right lane traffic accident (pile up). 3 lane closed to traffic. Responding to accident.","Tipi":16,"BitisTarihi":"2026-03-11T17:59:00","Link":"","Baslik":"Sahil Yolu Yeşilyurt-Ataköy Yönü, sol şerit trafik kazası (zincirleme) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","BaslikIng":"Sahil Yolu Yeşilyurt-Ataköy direction, left lane traffic accident (pile up) nedeni ile 1 şerit trafiğe kapalı. Kazaya müdahale ediliyor.","Koordinat":"40.963021,28.824752","Oncelik":1,"KameraId":633,"GirisTarihi":"2026-03-11T16:56:16","xKoordinat":"28.824752","yKoordinat":"40.963021","TimeDiff":26},{"Id":1412099,"Metin":"Bağlantı Yolu Yıldırım-Bayrampaşa Otogar A
```
- Help response modeli: `AnnouncementModel[]`
- Help response alanları: `Id` (integer), `Metin` (string), `MetinIng` (string), `Tipi` (integer), `BitisTarihi` (date), `Link` (string), `Baslik` (string), `BaslikIng` (string), `Koordinat` (string), `Oncelik` (integer), `KameraId` (integer), `GirisTarihi` (date), `xKoordinat` (string), `yKoordinat` (string), `TimeDiff` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "Id": 1,
    "Metin": "sample string 2",
    "MetinIng": "sample string 3",
    "Tipi": 4,
    "BitisTarihi": "2026-03-11T17:15:50.7621035+03:00",
    "Link": "sample string 6",
    "Baslik": "sample string 7",
    "BaslikIng": "sample string 8",
    "Koordinat": "sample string 9",
    "Oncelik": 10,
    "KameraId": 11,
    "GirisTarihi": "2026-03-11T17:15:50.7621035+03:00",
    "xKoordinat": "sample string 13",
    "yKoordinat": "sample string 14",
    "TimeDiff": 15
  },
  {
    "Id": 1,
    "Metin": "sample string 2",
    "MetinIng": "sample string 3",
    "Tipi": 4,
    "BitisTarihi": "2026-03-11T17:15:50.7621035+03:00",
    "Link": "sample string 6",
    "Baslik": "sample string 7",
    "BaslikIng": "sample string 8",
    "Koordinat": "sample string 9",
    "Oncelik": 10,
    "KameraId": 11,
    "GirisTarihi": "2026-03-11T17:15:50.7621035+03:00",
    "xKoordinat": "sample string 13",
    "yKoordinat": "sample string 14",
    "TimeDiff": 15
  }
]
```

### `GET /api/Citix/v1/DMPTravelTimes`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-DMPTravelTimes>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/DMPTravelTimes`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/DMPTravelTimes'
```
- Canlı örnek çıktı:
```json
[{"Date":"2026-03-11T17:22:00","TravelTime":1239,"SystemMessageId":2,"SystemId":20,"MessageId":59,"SystemType":2,"RouteName":"Atışalanı Unkapanı","RouteLength":9919,"RouteFrom":"Birlik Mahallesi","RouteTo":"Cibali Mahallesi","ColorClassId":3,"ColorClassName":"Orange","MsgIdentifier":"R002000200200059"},{"Date":"2026-03-11T17:22:00","TravelTime":1239,"SystemMessageId":2,"SystemId":20,"MessageId":59,"SystemType":2,"RouteName":"Atışalanı Unkapanı","RouteLength":9919,"RouteFrom":"Birlik Mahallesi","RouteTo":"Cibali Mahallesi","ColorClassId":3,"ColorClassName":"Orange","MsgIdentifier":"R002000200200059"},{"Date":"2026-03-11T17:22:00","TravelTime":1239,"SystemMessageId":2,"SystemId":20,"MessageId":59,"SystemType":2,"RouteName":"Atışalanı Unkapanı","RouteLength":9919,"RouteFrom":"Birlik Mahallesi","RouteTo":"Cibali Mahallesi","ColorClassId":3,"ColorClassName":"Orange","MsgIdentifier":"R002000200200059"},{"Date":"2026-03-11T17:22:00","TravelTime":1239,"SystemMessageId":2,"SystemId":20,"MessageId":59,"SystemType":2,"RouteName":"Atışalanı Unkapanı","RouteLength":9919,"RouteFrom":"Birlik Mahallesi","RouteTo":"Cibali Mahallesi","ColorClassId":3,"ColorClassName":"Orange","MsgIdentifier":"R002000200200059"},{"Date":"2026-03-11T17:22:00","TravelTime":1239,"SystemMessageId":2,"SystemId":20,"MessageId":59,"SystemType":2,"RouteName":"Atışalanı Unkapanı","RouteLength":9919,"RouteFrom":"Birlik Mahallesi","RouteTo":"Cibali Mahallesi","ColorClassId":3,"ColorClassName":"Orange","MsgIdentifier":"R002000200200059"},{"Date":"2026-03-11T17:22:00","TravelTime":362,"SystemMessageId":2,"SystemId":20,"MessageId":57,"SystemType":2,"RouteName":"Atışalanı Vatan Cad.","RouteLength":5587,"RouteFrom":"Birlik Mahallesi","RouteTo":"Maltepe Mahallesi","ColorClassId":2,"ColorClassName":"Dark Green","MsgIdentifier":"R002000200200057"},{"Date":"2026-03-11T17:22:00","TravelTime":362,"SystemMessageId":2,"SystemId":20,"MessageId":57,"SystemType":2,"RouteName":"Atışalanı Vatan Cad.","RouteLength":5587,"RouteFrom":"Birlik Mahallesi","RouteTo":"Maltepe Mahallesi","ColorClassId":2,"ColorClassName":"Dark Green","MsgIdentifier":"R002000200200057"},{"Date":"2026-03-11T17:22:00","TravelTime":362,"SystemMessageId":2,"SystemId":20,"MessageId":57,"SystemType":2,"RouteName":"Atışalanı Vatan Cad.","RouteLength":5587,"RouteFrom":"Birlik Mahallesi","RouteTo":"Maltepe Mahallesi","ColorClassId":2,"ColorClassName":"Dark Green","MsgIdentifier":"R002000200200057"},{"Date":"2026-03-11T17:22:00","TravelTime":362,"SystemMessageId":2,"SystemId":20,"MessageId":57,"SystemType":2,"RouteName":"Atışalanı Vatan Cad.","RouteLength":5587,"RouteFrom":"Birlik Mahallesi","RouteTo":"Maltepe Mahallesi","ColorClassId":2,"ColorClassName":"Dark Green","MsgIdentifier":"R002000200200057"},{"Date":"2026-03-11T17:22:00","TravelTime":362,"SystemMessageId":2,"SystemId":20,"MessageId":57,"SystemType":2,"RouteName":"Atışalanı Vatan Cad.","RouteLength":5587,"RouteFrom":"Birlik Mahallesi","RouteTo":"Maltepe Mahallesi","ColorClassId":2,"Colo
```
- Help response modeli: `FcdRouteTravelTimeResult[]`
- Help response alanları: `Date` (date), `TravelTime` (integer): Saniye cinsinden seyahat süresi, `SystemMessageId` (integer): SYSTEM_TYPE değeri 5 ise DisplayMessageId; 2 ise TRF_MSG_ID, `SystemId` (integer): SYSTEM_TYPE değeri 5 ise YDSNo; 2 ise SYSTEM_ID, `MessageId` (integer): SYSTEM_TYPE değeri 5 ise MESSAGE_ID; 2 ise RouteId, `SystemType` (byte): 5:YDS; 2:VMS;, `RouteName` (string), `RouteLength` (integer), `RouteFrom` (string), `RouteTo` (string), `ColorClassId` (integer), `ColorClassName` (string), `MsgIdentifier` (string): SystemType,, SystemMessageId, SystemId, MessageId birleşiminden oluşan benzersiz rota IDsi
            Format: R[3][4][4][4]
- Help örnek response gövdesi:
```json
[
  {
    "Date": "2026-03-11T17:15:50.7777246+03:00",
    "TravelTime": 2,
    "SystemMessageId": 3,
    "SystemId": 4,
    "MessageId": 5,
    "SystemType": 64,
    "RouteName": "sample string 7",
    "RouteLength": 8,
    "RouteFrom": "sample string 9",
    "RouteTo": "sample string 10",
    "ColorClassId": 11,
    "ColorClassName": "sample string 12",
    "MsgIdentifier": "sample string 13"
  },
  {
    "Date": "2026-03-11T17:15:50.7777246+03:00",
    "TravelTime": 2,
    "SystemMessageId": 3,
    "SystemId": 4,
    "MessageId": 5,
    "SystemType": 64,
    "RouteName": "sample string 7",
    "RouteLength": 8,
    "RouteFrom": "sample string 9",
    "RouteTo": "sample string 10",
    "ColorClassId": 11,
    "ColorClassName": "sample string 12",
    "MsgIdentifier": "sample string 13"
  }
]
```

### `GET /api/Citix/v1/Parking`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-Parking>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/Parking`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/Parking'
```
- Canlı örnek çıktı:
```json
[{"PLotId":1,"PLotName":"VALİ KONAĞI CADDESİ 5 (İSPARK)","PLotCapasity":30,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":false,"PLotAvailableCount":13,"PLotAvailableRate":43,"PLotUpToDateStatus":-120,"PLotDate":"2025-06-14T18:08:17","PLotLatitude":"41.0479","PLotLongitude":"28.9875","PLotLocation":"0028 Şişli Vali Konağı Caddesi","PLotAddress":"Tesis Önü","PLotDistrict":"","PWorkingHours":"08:00-19:00"},{"PLotId":2,"PLotName":"VALİ KONAĞI CADDESİ 4 (İSPARK)","PLotCapasity":50,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":true,"PLotAvailableCount":1,"PLotAvailableRate":2,"PLotUpToDateStatus":0,"PLotDate":"2026-03-11T17:22:20","PLotLatitude":"41.0478","PLotLongitude":"28.9874","PLotLocation":"0028 Şişli Vali Konağı Caddesi","PLotAddress":"VALİ KONAĞI CADDESİ","PLotDistrict":"","PWorkingHours":"08:00-19:00"},{"PLotId":3,"PLotName":"VALİ KONAĞI CADDESİ 3 (İSPARK)","PLotCapasity":50,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":false,"PLotAvailableCount":50,"PLotAvailableRate":100,"PLotUpToDateStatus":-120,"PLotDate":"2025-11-28T23:39:58","PLotLatitude":"41.0553295330499","PLotLongitude":"28.9957386934589","PLotLocation":"0028 Şişli Vali Konağı Caddesi","PLotAddress":"VALİ KONAĞI CADDESİ","PLotDistrict":"ŞİŞLİ","PWorkingHours":"08:00-19:00"},{"PLotId":4,"PLotName":"VALİ KONAĞI CADDESİ 2 (İSPARK)","PLotCapasity":50,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":true,"PLotAvailableCount":10,"PLotAvailableRate":20,"PLotUpToDateStatus":-120,"PLotDate":"2016-11-19T15:50:31","PLotLatitude":"41.0548022013965","PLotLongitude":"28.9951683107361","PLotLocation":"0028 Şişli Vali Konağı Caddesi","PLotAddress":"ARAS KARGO ","PLotDistrict":"ŞİŞLİ","PWorkingHours":"08:00-19:00"},{"PLotId":5,"PLotName":"VALİ KONAĞI CADDESİ 1 (İSPARK)","PLotCapasity":50,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":true,"PLotAvailableCount":0,"PLotAvailableRate":100,"PLotUpToDateStatus":-120,"PLotDate":"2016-12-17T18:56:25","PLotLatitude":"41.0541925230339","PLotLongitude":"28.9944408349023","PLotLocation":"0028 Şişli Vali Konağı Caddesi","PLotAddress":"HÜRTUR ÖNÜ","PLotDistrict":"","PWorkingHours":"08:00-19:00"},{"PLotId":12,"PLotName":"BEYOĞLU İNÖNÜ CADDESİ 2 (İSPARK)","PLotCapasity":30,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":true,"PLotAvailableCount":30,"PLotAvailableRate":100,"PLotUpToDateStatus":-120,"PLotDate":"2025-03-10T08:00:17","PLotLatitude":"41.0370569334272","PLotLongitude":"28.9917734743058","PLotLocation":"0277 İnönü Caddesi","PLotAddress":"BEYOĞLU","PLotDistrict":"BEYOĞLU","PWorkingHours":"08:00-20:00"},{"PLotId":13,"PLotName":"BEYOĞLU İNÖNÜ CADDESİ 4 (İSPARK)","PLotCapasity":30,"PLotSortId":5,"PLotSort":"YOL ÜSTÜ","PLotIspark":true,"PLotComp":"İspark","PLotIsOpen":true,"PLotAvailableCount":10,"PLotAvailableRate":33,
```
- Help response modeli: `ParkingInfo[]`
- Help response alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotSortId` (integer), `PLotSort` (string), `PLotIspark` (boolean), `PLotComp` (string), `PLotIsOpen` (boolean), `PLotAvailableCount` (integer), `PLotAvailableRate` (integer), `PLotUpToDateStatus` (integer), `PLotDate` (date), `PLotLatitude` (string), `PLotLongitude` (string), `PLotLocation` (string), `PLotAddress` (string), `PLotDistrict` (string), `PWorkingHours` (string)
- Help örnek response gövdesi:
```json
[
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotSortId": 4,
    "PLotSort": "sample string 5",
    "PLotIspark": true,
    "PLotComp": "sample string 7",
    "PLotIsOpen": true,
    "PLotAvailableCount": 9,
    "PLotAvailableRate": 10,
    "PLotUpToDateStatus": 11,
    "PLotDate": "2026-03-11T17:15:50.7621035+03:00",
    "PLotLatitude": "sample string 13",
    "PLotLongitude": "sample string 14",
    "PLotLocation": "sample string 15",
    "PLotAddress": "sample string 16",
    "PLotDistrict": "sample string 17",
    "PWorkingHours": "sample string 18"
  },
  {
    "PLotId": 1,
    "PLotName": "sample string 2",
    "PLotCapasity": 3,
    "PLotSortId": 4,
    "PLotSort": "sample string 5",
    "PLotIspark": true,
    "PLotComp": "sample string 7",
    "PLotIsOpen": true,
    "PLotAvailableCount": 9,
    "PLotAvailableRate": 10,
    "PLotUpToDateStatus": 11,
    "PLotDate": "2026-03-11T17:15:50.7621035+03:00",
    "PLotLatitude": "sample string 13",
    "PLotLongitude": "sample string 14",
    "PLotLocation": "sample string 15",
    "PLotAddress": "sample string 16",
    "PLotDistrict": "sample string 17",
    "PWorkingHours": "sample string 18"
  }
]
```

### `GET /api/Citix/v1/TrafficIndex`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-TrafficIndex>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/TrafficIndex`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/TrafficIndex'
```
- Canlı örnek çıktı:
```json
{
  "TI": 78,
  "TI_An": 78,
  "TI_Av": 80
}
```
- Help response modeli: `ResponseTrafficIndex_Sc1_Cont`
- Help response alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Help örnek response gövdesi:
```json
{
  "TI": 64,
  "TI_An": 64,
  "TI_Av": 64
}
```

## Atak

### `GET /api/Atak/JunctionTTU/v1/tbOccupanciesData`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Atak-JunctionTTU-v1-tbOccupanciesData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Atak/JunctionTTU/v1/tbOccupanciesData`
- Canlı test metodu: `GET`
- Canlı sonuç: `415`
- Sonuç yorumu: Endpoint unsupported media type döndürdü; ek header/content beklentisi olabilir.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Atak/JunctionTTU/v1/tbOccupanciesData'
```
- Canlı örnek çıktı:
```json
{
  "Message": "The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource."
}
```
- Help request modeli: `tbOccupanciesArchiveRequest`
- Help request alanları: `JuncIX` (integer, Required), `startDate` (date, Required), `endDate` (date, Required)
- Help örnek request gövdesi:
```json
{
  "JuncIX": 1,
  "startDate": "2026-03-11T17:15:50.7933615+03:00",
  "endDate": "2026-03-11T17:15:50.7933615+03:00"
}
```
- Help response modeli: `tbOccupanciesArchive[]`
- Help response alanları: `JuncIX` (integer), `SubjuncIX` (integer), `StartDate` (date), `PhaseIX` (integer), `EndDate` (date), `PackageIX` (integer), `PhaseTime` (integer), `O1` (integer), `O2` (integer), `O3` (integer), `O4` (integer), `O5` (integer), `O6` (integer), `O7` (integer), `O8` (integer), `O9` (integer), `O10` (integer), `O11` (integer), `O12` (integer), `O13` (integer), `O14` (integer), `O15` (integer), `O16` (integer), `O17` (integer), `O18` (integer), `O19` (integer), `O20` (integer), `O21` (integer), `O22` (integer), `O23` (integer), `O24` (integer), `O25` (integer), `O26` (integer), `O27` (integer), `O28` (integer), `O29` (integer), `O30` (integer), `O31` (integer), `O32` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "JuncIX": 1,
    "SubjuncIX": 2,
    "StartDate": "2026-03-11T17:15:50.7933615+03:00",
    "PhaseIX": 4,
    "EndDate": "2026-03-11T17:15:50.7933615+03:00",
    "PackageIX": 6,
    "PhaseTime": 7,
    "O1": 8,
    "O2": 9,
    "O3": 10,
    "O4": 11,
    "O5": 12,
    "O6": 13,
    "O7": 14,
    "O8": 15,
    "O9": 16,
    "O10": 17,
    "O11": 18,
    "O12": 19,
    "O13": 20,
    "O14": 21,
    "O15": 22,
    "O16": 23,
    "O17": 24,
    "O18": 25,
    "O19": 26,
    "O20": 27,
    "O21": 28,
    "O22": 29,
    "O23": 30,
    "O24": 31,
    "O25": 32,
    "O26": 33,
    "O27": 34,
    "O28": 35,
    "O29": 36,
    "O30": 37,
    "O31": 38,
    "O32": 39
  },
  {
    "JuncIX": 1,
    "SubjuncIX": 2,
    "StartDate": "2026-03-11T17:15:50.7933615+03:00",
    "PhaseIX": 4,
    "EndDate": "2026-03-11T17:15:50.7933615+03:00",
    "PackageIX": 6,
    "PhaseTime": 7,
    "O1": 8,
    "O2": 9,
    "O3": 10,
    "O4": 11,
    "O5": 12,
    "O6": 13,
    "O7": 14,
    "O8": 15,
    "O9": 16,
    "O10": 17,
    "O11": 18,
    "O12": 19,
    "O13": 20,
    "O14": 21,
    "O15": 22,
    "O16": 23,
    "O17": 24,
    "O18": 25,
    "O19": 26,
    "O20": 27,
    "O21": 28,
    "O22": 29,
    "O23": 30,
    "O24": 31,
    "O25": 32,
    "O26": 33,
    "O27": 34,
    "O28": 35,
    "O29": 36,
    "O30": 37,
    "O31": 38,
    "O32": 39
  }
]
```

### `GET /api/Atak/JunctionTTU/v1/tbVolumesData`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Atak-JunctionTTU-v1-tbVolumesData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Atak/JunctionTTU/v1/tbVolumesData`
- Canlı test metodu: `GET`
- Canlı sonuç: `415`
- Sonuç yorumu: Endpoint unsupported media type döndürdü; ek header/content beklentisi olabilir.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Atak/JunctionTTU/v1/tbVolumesData'
```
- Canlı örnek çıktı:
```json
{
  "Message": "The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource."
}
```
- Help request modeli: `tbVolumesArchiveRequest`
- Help request alanları: `JuncIX` (integer, Required), `startDate` (date, Required), `endDate` (date, Required)
- Help örnek request gövdesi:
```json
{
  "JuncIX": 1,
  "startDate": "2026-03-11T17:15:50.7933615+03:00",
  "endDate": "2026-03-11T17:15:50.7933615+03:00"
}
```
- Help response modeli: `tbVolumesArchive[]`
- Help response alanları: `JuncIX` (integer), `SubjuncIX` (integer), `PhaseIX` (integer), `PackageIX` (integer), `StartDate` (date), `EndDate` (date), `PhaseTime` (integer), `V1` (integer), `V2` (integer), `V3` (integer), `V4` (integer), `V5` (integer), `V6` (integer), `V7` (integer), `V8` (integer), `V9` (integer), `V10` (integer), `V11` (integer), `V12` (integer), `V13` (integer), `V14` (integer), `V15` (integer), `V16` (integer), `V17` (integer), `V18` (integer), `V19` (integer), `V20` (integer), `V21` (integer), `V22` (integer), `V23` (integer), `V24` (integer), `V25` (integer), `V26` (integer), `V27` (integer), `V28` (integer), `V29` (integer), `V30` (integer), `V31` (integer), `V32` (integer), `LV1` (integer), `LV2` (integer), `LV3` (integer), `LV4` (integer), `LV5` (integer), `LV6` (integer), `LV7` (integer), `LV8` (integer), `LV9` (integer), `LV10` (integer), `LV11` (integer), `LV12` (integer), `LV13` (integer), `LV14` (integer), `LV15` (integer), `LV16` (integer), `LV17` (integer), `LV18` (integer), `LV19` (integer), `LV20` (integer), `LV21` (integer), `LV22` (integer), `LV23` (integer), `LV24` (integer), `LV25` (integer), `LV26` (integer), `LV27` (integer), `LV28` (integer), `LV29` (integer), `LV30` (integer), `LV31` (integer), `LV32` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "JuncIX": 1,
    "SubjuncIX": 2,
    "PhaseIX": 3,
    "PackageIX": 4,
    "StartDate": "2026-03-11T17:15:50.7933615+03:00",
    "EndDate": "2026-03-11T17:15:50.7933615+03:00",
    "PhaseTime": 7,
    "V1": 8,
    "V2": 9,
    "V3": 10,
    "V4": 11,
    "V5": 12,
    "V6": 13,
    "V7": 14,
    "V8": 15,
    "V9": 16,
    "V10": 17,
    "V11": 18,
    "V12": 19,
    "V13": 20,
    "V14": 21,
    "V15": 22,
    "V16": 23,
    "V17": 24,
    "V18": 25,
    "V19": 26,
    "V20": 27,
    "V21": 28,
    "V22": 29,
    "V23": 30,
    "V24": 31,
    "V25": 32,
    "V26": 33,
    "V27": 34,
    "V28": 35,
    "V29": 36,
    "V30": 37,
    "V31": 38,
    "V32": 39,
    "LV1": 40,
    "LV2": 41,
    "LV3": 42,
    "LV4": 43,
    "LV5": 44,
    "LV6": 45,
    "LV7": 46,
    "LV8": 47,
    "LV9": 48,
    "LV10": 49,
    "LV11": 50,
    "LV12": 51,
    "LV13": 52,
    "LV14": 53,
    "LV15": 54,
    "LV16": 55,
    "LV17": 56,
    "LV18": 57,
    "LV19": 58,
    "LV20": 59,
    "LV21": 60,
    "LV22": 61,
    "LV23": 62,
    "LV24": 63,
    "LV25": 64,
    "LV26": 65,
    "LV27": 66,
    "LV28": 67,
    "LV29": 68,
    "LV30": 69,
    "LV31": 70,
    "LV32": 71
  },
  {
    "JuncIX": 1,
    "SubjuncIX": 2,
    "PhaseIX": 3,
    "PackageIX": 4,
    "StartDate": "2026-03-11T17:15:50.7933615+03:00",
    "EndDate": "2026-03-11T17:15:50.7933615+03:00",
    "PhaseTime": 7,
    "V1": 8,
    "V2": 9,
    "V3": 10,
    "V4": 11,
    "V5": 12,
    "V6": 13,
    "V7": 14,
    "V8": 15,
    "V9": 16,
    "V10": 17,
    "V11": 18,
    "V12": 19,
    "V13": 20,
    "V14": 21,
    "V15": 22,
    "V16": 23,
    "V17": 24,
    "V18": 25,
    "V19": 26,
    "V20": 27,
    "V21": 28,
    "V22": 29,
    "V23": 30,
    "V24": 31,
    "V25": 32,
    "V26": 33,
    "V27": 34,
    "V28": 35,
    "V29": 36,
    "V30": 37,
    "V31": 38,
    "V32": 39,
    "LV1": 40,
    "LV2": 41,
    "LV3": 42,
    "LV4": 43,
    "LV5": 44,
    "LV6": 45,
    "LV7": 46,
    "LV8": 47,
    "LV9": 48,
    "LV10": 49,
    "LV11": 50,
    "LV12": 51,
    "LV13": 52,
    "LV14": 53,
    "LV15": 54,
    "LV16": 55,
    "LV17": 56,
    "LV18": 57,
    "LV19": 58,
    "LV20": 59,
    "LV21": 60,
    "LV22": 61,
    "LV23": 62,
    "LV24": 63,
    "LV25": 64,
    "LV26": 65,
    "LV27": 66,
    "LV28": 67,
    "LV29": 68,
    "LV30": 69,
    "LV31": 70,
    "LV32": 71
  }
]
```

### `GET /api/Atak/v1/tbOccupanciesData`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Atak-v1-tbOccupanciesData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Atak/v1/tbOccupanciesData`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAtak%2fv1%2ftbOccupanciesData`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Atak/v1/tbOccupanciesData'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAtak%2fv1%2ftbOccupanciesData">here</a>.</h2>
</body></html>
```
- Help request modeli: `tbOccupanciesArchiveRequest`
- Help request alanları: `JuncIX` (integer, Required), `startDate` (date, Required), `endDate` (date, Required)
- Help örnek request gövdesi:
```json
{
  "JuncIX": 1,
  "startDate": "2026-03-11T17:15:50.7777246+03:00",
  "endDate": "2026-03-11T17:15:50.7777246+03:00"
}
```
- Help response modeli: `tbOccupanciesArchive[]`
- Help response alanları: `JuncIX` (integer), `SubjuncIX` (integer), `StartDate` (date), `PhaseIX` (integer), `EndDate` (date), `PackageIX` (integer), `PhaseTime` (integer), `O1` (integer), `O2` (integer), `O3` (integer), `O4` (integer), `O5` (integer), `O6` (integer), `O7` (integer), `O8` (integer), `O9` (integer), `O10` (integer), `O11` (integer), `O12` (integer), `O13` (integer), `O14` (integer), `O15` (integer), `O16` (integer), `O17` (integer), `O18` (integer), `O19` (integer), `O20` (integer), `O21` (integer), `O22` (integer), `O23` (integer), `O24` (integer), `O25` (integer), `O26` (integer), `O27` (integer), `O28` (integer), `O29` (integer), `O30` (integer), `O31` (integer), `O32` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "JuncIX": 1,
    "SubjuncIX": 2,
    "StartDate": "2026-03-11T17:15:50.7933615+03:00",
    "PhaseIX": 4,
    "EndDate": "2026-03-11T17:15:50.7933615+03:00",
    "PackageIX": 6,
    "PhaseTime": 7,
    "O1": 8,
    "O2": 9,
    "O3": 10,
    "O4": 11,
    "O5": 12,
    "O6": 13,
    "O7": 14,
    "O8": 15,
    "O9": 16,
    "O10": 17,
    "O11": 18,
    "O12": 19,
    "O13": 20,
    "O14": 21,
    "O15": 22,
    "O16": 23,
    "O17": 24,
    "O18": 25,
    "O19": 26,
    "O20": 27,
    "O21": 28,
    "O22": 29,
    "O23": 30,
    "O24": 31,
    "O25": 32,
    "O26": 33,
    "O27": 34,
    "O28": 35,
    "O29": 36,
    "O30": 37,
    "O31": 38,
    "O32": 39
  },
  {
    "JuncIX": 1,
    "SubjuncIX": 2,
    "StartDate": "2026-03-11T17:15:50.7933615+03:00",
    "PhaseIX": 4,
    "EndDate": "2026-03-11T17:15:50.7933615+03:00",
    "PackageIX": 6,
    "PhaseTime": 7,
    "O1": 8,
    "O2": 9,
    "O3": 10,
    "O4": 11,
    "O5": 12,
    "O6": 13,
    "O7": 14,
    "O8": 15,
    "O9": 16,
    "O10": 17,
    "O11": 18,
    "O12": 19,
    "O13": 20,
    "O14": 21,
    "O15": 22,
    "O16": 23,
    "O17": 24,
    "O18": 25,
    "O19": 26,
    "O20": 27,
    "O21": 28,
    "O22": 29,
    "O23": 30,
    "O24": 31,
    "O25": 32,
    "O26": 33,
    "O27": 34,
    "O28": 35,
    "O29": 36,
    "O30": 37,
    "O31": 38,
    "O32": 39
  }
]
```

### `GET /api/Atak/v1/tbVolumesData`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Atak-v1-tbVolumesData>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Atak/v1/tbVolumesData`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAtak%2fv1%2ftbVolumesData`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Atak/v1/tbVolumesData'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAtak%2fv1%2ftbVolumesData">here</a>.</h2>
</body></html>
```
- Help request modeli: `tbVolumesArchiveRequest`
- Help request alanları: `JuncIX` (integer, Required), `startDate` (date, Required), `endDate` (date, Required)
- Help örnek request gövdesi:
```json
{
  "JuncIX": 1,
  "startDate": "2026-03-11T17:15:50.7933615+03:00",
  "endDate": "2026-03-11T17:15:50.7933615+03:00"
}
```
- Help response modeli: `tbVolumesArchive[]`
- Help response alanları: `JuncIX` (integer), `SubjuncIX` (integer), `PhaseIX` (integer), `PackageIX` (integer), `StartDate` (date), `EndDate` (date), `PhaseTime` (integer), `V1` (integer), `V2` (integer), `V3` (integer), `V4` (integer), `V5` (integer), `V6` (integer), `V7` (integer), `V8` (integer), `V9` (integer), `V10` (integer), `V11` (integer), `V12` (integer), `V13` (integer), `V14` (integer), `V15` (integer), `V16` (integer), `V17` (integer), `V18` (integer), `V19` (integer), `V20` (integer), `V21` (integer), `V22` (integer), `V23` (integer), `V24` (integer), `V25` (integer), `V26` (integer), `V27` (integer), `V28` (integer), `V29` (integer), `V30` (integer), `V31` (integer), `V32` (integer), `LV1` (integer), `LV2` (integer), `LV3` (integer), `LV4` (integer), `LV5` (integer), `LV6` (integer), `LV7` (integer), `LV8` (integer), `LV9` (integer), `LV10` (integer), `LV11` (integer), `LV12` (integer), `LV13` (integer), `LV14` (integer), `LV15` (integer), `LV16` (integer), `LV17` (integer), `LV18` (integer), `LV19` (integer), `LV20` (integer), `LV21` (integer), `LV22` (integer), `LV23` (integer), `LV24` (integer), `LV25` (integer), `LV26` (integer), `LV27` (integer), `LV28` (integer), `LV29` (integer), `LV30` (integer), `LV31` (integer), `LV32` (integer)
- Help örnek response gövdesi:
```json
[
  {
    "JuncIX": 1,
    "SubjuncIX": 2,
    "PhaseIX": 3,
    "PackageIX": 4,
    "StartDate": "2026-03-11T17:15:50.7933615+03:00",
    "EndDate": "2026-03-11T17:15:50.7933615+03:00",
    "PhaseTime": 7,
    "V1": 8,
    "V2": 9,
    "V3": 10,
    "V4": 11,
    "V5": 12,
    "V6": 13,
    "V7": 14,
    "V8": 15,
    "V9": 16,
    "V10": 17,
    "V11": 18,
    "V12": 19,
    "V13": 20,
    "V14": 21,
    "V15": 22,
    "V16": 23,
    "V17": 24,
    "V18": 25,
    "V19": 26,
    "V20": 27,
    "V21": 28,
    "V22": 29,
    "V23": 30,
    "V24": 31,
    "V25": 32,
    "V26": 33,
    "V27": 34,
    "V28": 35,
    "V29": 36,
    "V30": 37,
    "V31": 38,
    "V32": 39,
    "LV1": 40,
    "LV2": 41,
    "LV3": 42,
    "LV4": 43,
    "LV5": 44,
    "LV6": 45,
    "LV7": 46,
    "LV8": 47,
    "LV9": 48,
    "LV10": 49,
    "LV11": 50,
    "LV12": 51,
    "LV13": 52,
    "LV14": 53,
    "LV15": 54,
    "LV16": 55,
    "LV17": 56,
    "LV18": 57,
    "LV19": 58,
    "LV20": 59,
    "LV21": 60,
    "LV22": 61,
    "LV23": 62,
    "LV24": 63,
    "LV25": 64,
    "LV26": 65,
    "LV27": 66,
    "LV28": 67,
    "LV29": 68,
    "LV30": 69,
    "LV31": 70,
    "LV32": 71
  },
  {
    "JuncIX": 1,
    "SubjuncIX": 2,
    "PhaseIX": 3,
    "PackageIX": 4,
    "StartDate": "2026-03-11T17:15:50.7933615+03:00",
    "EndDate": "2026-03-11T17:15:50.7933615+03:00",
    "PhaseTime": 7,
    "V1": 8,
    "V2": 9,
    "V3": 10,
    "V4": 11,
    "V5": 12,
    "V6": 13,
    "V7": 14,
    "V8": 15,
    "V9": 16,
    "V10": 17,
    "V11": 18,
    "V12": 19,
    "V13": 20,
    "V14": 21,
    "V15": 22,
    "V16": 23,
    "V17": 24,
    "V18": 25,
    "V19": 26,
    "V20": 27,
    "V21": 28,
    "V22": 29,
    "V23": 30,
    "V24": 31,
    "V25": 32,
    "V26": 33,
    "V27": 34,
    "V28": 35,
    "V29": 36,
    "V30": 37,
    "V31": 38,
    "V32": 39,
    "LV1": 40,
    "LV2": 41,
    "LV3": 42,
    "LV4": 43,
    "LV5": 44,
    "LV6": 45,
    "LV7": 46,
    "LV8": 47,
    "LV9": 48,
    "LV10": 49,
    "LV11": 50,
    "LV12": 51,
    "LV13": 52,
    "LV14": 53,
    "LV15": 54,
    "LV16": 55,
    "LV17": 56,
    "LV18": 57,
    "LV19": 58,
    "LV20": 59,
    "LV21": 60,
    "LV22": 61,
    "LV23": 62,
    "LV24": 63,
    "LV25": 64,
    "LV26": 65,
    "LV27": 66,
    "LV28": 67,
    "LV29": 68,
    "LV30": 69,
    "LV31": 70,
    "LV32": 71
  }
]
```

## Survey

### `POST /api/Survey/v1/Save`

- Açıklama: UYM için hazırlanan anketlerde kullanılan oyları kaydetmek için kullanılır.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Survey-v1-Save>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Survey/v1/Save`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Survey/v1/Save'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Survey/v1/Save' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "SurveyID": 1,
  "ChoiceID": 2
}'
```
- Help request modeli: `SurveyInsertModel`
- Help request alanları: `SurveyID` (integer, Required), `ChoiceID` (integer, Required)
- Help örnek request gövdesi:
```json
{
  "SurveyID": 1,
  "ChoiceID": 2
}
```
- Help response modeli: `ResponseSurvey`
- Help response alanları: `Result` (integer)
- Help örnek response gövdesi:
```json
{
  "Result": 1
}
```

## Camera

### `GET /api/Camera/v1/All`

- Açıklama: ENG: Get all camera list from server.Returns null if there's a server error.
            TR: Tüm kamera listesini döndürür. Sunucu  hatası olması durumunda null döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-All>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/All`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fCamera%2fv1%2fAll`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/All'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fCamera%2fv1%2fAll">here</a>.</h2>
</body></html>
```
- Help response modeli: `CameraBase[]`
- Help response alanları: `ID` (integer): Camera ID, `Name` (string): Camera Name (Location), `XCoord` (string): X Coordinate of camera, `YCoord` (string): Y Coordinate of camera, `VideoURL` (string): Live camera Video URL, `SSLVideoURL` (string): GroupID, `GroupId` (string): GroupID
- Help örnek response gövdesi:
```json
[
  {
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "SSLVideoURL": "sample string 6",
    "GroupId": "sample string 7"
  },
  {
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "SSLVideoURL": "sample string 6",
    "GroupId": "sample string 7"
  }
]
```

### `GET /api/Camera/v1/All/{id}`

- Açıklama: ENG: Returns the details of the specified camera. Returns null if there's a server error or request with an invalid camera ID.
            TR: ID'si verilen kamera detaylarini dondurur. Sunucu  hatası olması durumunda null döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-All-id>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/All/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fCamera%2fv1%2fAll%2f1`
- Yol/query parametreleri: `id` (string, Required): ID of the Camera
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/All/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fCamera%2fv1%2fAll%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `CameraBase[]`
- Help response alanları: `ID` (integer): Camera ID, `Name` (string): Camera Name (Location), `XCoord` (string): X Coordinate of camera, `YCoord` (string): Y Coordinate of camera, `VideoURL` (string): Live camera Video URL, `SSLVideoURL` (string): GroupID, `GroupId` (string): GroupID
- Help örnek response gövdesi:
```json
[
  {
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "SSLVideoURL": "sample string 6",
    "GroupId": "sample string 7"
  },
  {
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "SSLVideoURL": "sample string 6",
    "GroupId": "sample string 7"
  }
]
```

### `GET /api/Camera/v1/Camera`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-Camera>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/Camera`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fCamera%2fv1%2fCamera`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/Camera'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fCamera%2fv1%2fCamera">here</a>.</h2>
</body></html>
```
- Help response modeli: `CameraGroupedList[]`
- Help response alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Help örnek response gövdesi:
```json
[
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  },
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  }
]
```

### `GET /api/Camera/v1/CameraGroup`

- Açıklama: Gruplanmış kamera listesi
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-CameraGroup>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/CameraGroup`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fCamera%2fv1%2fCameraGroup`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/CameraGroup'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fCamera%2fv1%2fCameraGroup">here</a>.</h2>
</body></html>
```
- Help response modeli: `CameraGroupedList[]`
- Help response alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Help örnek response gövdesi:
```json
[
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  },
  {
    "Group": [
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      },
      {
        "ID": 1,
        "Name": "sample string 2",
        "XCoord": "sample string 3",
        "YCoord": "sample string 4",
        "VideoURL": "sample string 5",
        "VideoURL_SSL": "sample string 6",
        "GroupId": 7,
        "Images": [
          "sample string 1",
          "sample string 2"
        ]
      }
    ],
    "ID": 1,
    "Name": "sample string 2",
    "XCoord": "sample string 3",
    "YCoord": "sample string 4",
    "VideoURL": "sample string 5",
    "VideoURL_SSL": "sample string 6",
    "GroupId": 7,
    "Images": [
      "sample string 1",
      "sample string 2"
    ]
  }
]
```

### `POST /api/Camera/v1/CropFactorSave`

- Açıklama: Açıklama belirtilmemiş.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Camera-v1-CropFactorSave>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/CropFactorSave`
- Canlı test metodu: `OPTIONS`
- Canlı sonuç: `405`
- Sonuç yorumu: Güvenli OPTIONS probe için method not allowed döndü; gerçek POST çağrısı yapılmadı.
- Content-Type: `application/json; charset=utf-8`
- Allow header: `POST`
- Yol/query parametreleri: Yok.
- Güvenli canlı probe:
```bash
curl -i -X OPTIONS 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/CropFactorSave'
```
- Probe çıktısı:
```json
{
  "Message": "The requested resource does not support http method 'OPTIONS'."
}
```
- Gerçek POST örneği:
```bash
curl -i -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/CropFactorSave' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "CameraNo": 1,
  "CropTopLeftX": 2,
  "CropTopLeftY": 3,
  "CropBottomRightX": 4,
  "CropBottomRightY": 5
}'
```
- Help request modeli: `CameraImgCrop`
- Help request alanları: `CameraNo` (integer): Kamera No, `CropTopLeftX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropTopLeftY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır
- Help örnek request gövdesi:
```json
{
  "CameraNo": 1,
  "CropTopLeftX": 2,
  "CropTopLeftY": 3,
  "CropBottomRightX": 4,
  "CropBottomRightY": 5
}
```
- Help response modeli: Belirtilmemiş.
- Help örnek response gövdesi:
```json
1
```

### `GET /api/Camera/v1/DashCameraCount`

- Açıklama: No documentation available.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-DashCameraCount>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/DashCameraCount`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/DashCameraCount'
```
- Canlı örnek çıktı:
```json
{
  "Res": 913
}
```
- Help response modeli: `Result_INT`
- Help response alanları: `Res` (integer)
- Help örnek response gövdesi:
```json
{
  "Res": 1
}
```

### `GET /api/Camera/v1/Details`

- Açıklama: Tüm kameraları donanımsal özellikleri ile birlikte listeler
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-Details>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/Details`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/Details'
```
- Canlı örnek çıktı:
```json
[{"CameraNo":1,"CameraName":"ACIBADEM SARAYARDI CAD.","CameraBrand":"PELCO","CameraModel":"Espirit","IsActive":true,"IPAddress":"10.22.11.3","RTSPURL":"rtsp://10.22.11.3/channel1/stream1m","State":"Aktif","Format":"H.264","Resolution":"720x576","WowzaStream":"","WowzaStreamSSL":"","TunnelCamera":false,"XCoord":"29.0358434","YCoord":"40.9965959","CameraCaptureDate":"2026-03-11T17:22:20","CameraCaptureImage":"https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?cno=1","CropTopLeftX":150,"CropTopLeftY":150,"CropBottomRightX":150,"CropBottomRightY":150},{"CameraNo":2,"CameraName":"AKOM","CameraBrand":"Hikvision","CameraModel":"DP-22DF7284-AW","IsActive":true,"IPAddress":"10.10.32.200","RTSPURL":"rtsp://admin:Tkm2953kam@10.10.32.200/Streaming/Channels/102","State":"Aktif","Format":"H.264","Resolution":"800x448","WowzaStream":"http://ibb-media4.ibb.gov.tr:1935/live/2.stream/playlist.m3u8","WowzaStreamSSL":"https://601a43eea2819.streamlock.net/hls/2.stream/playlist.m3u8","TunnelCamera":false,"XCoord":"28.96274764","YCoord":"41.08630782","CameraCaptureDate":"2026-03-11T17:22:20","CameraCaptureImage":"https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?cno=2","CropTopLeftX":10,"CropTopLeftY":15,"CropBottomRightX":300,"CropBottomRightY":250},{"CameraNo":3,"CameraName":"AKSARAY","CameraBrand":"Hikvision","CameraModel":"DP-22DF7284-AW","IsActive":true,"IPAddress":"10.10.26.222","RTSPURL":"rtsp://admin:Tkm2953kam@10.10.26.222/Streaming/Channels/101","State":"Aktif","Format":"H.264","Resolution":"640x352","WowzaStream":"http://ibb-media4.ibb.gov.tr:1935/live/3.stream/playlist.m3u8","WowzaStreamSSL":"https://601a43eea2819.streamlock.net/hls/3.stream/playlist.m3u8","TunnelCamera":false,"XCoord":"28.95382145","YCoord":"41.00983033","CameraCaptureDate":"2026-03-11T17:22:20","CameraCaptureImage":"https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?cno=3","CropTopLeftX":0,"CropTopLeftY":0,"CropBottomRightX":0,"CropBottomRightY":0},{"CameraNo":4,"CameraName":"ALİBEYKÖY MEYDANI","CameraBrand":"PELCO","CameraModel":"D6220","IsActive":true,"IPAddress":"10.10.32.13","RTSPURL":"rtsp://10.10.32.13/stream1m","State":"Aktif","Format":"H.264","Resolution":"640x352","WowzaStream":"http://ibb-media2.ibb.gov.tr:1935/live/4.stream/playlist.m3u8","WowzaStreamSSL":"https://601a5ce60b9a1.streamlock.net/hls/4.stream/playlist.m3u8","TunnelCamera":false,"XCoord":"28.94778426","YCoord":"41.07454609","CameraCaptureDate":"2026-03-11T17:22:20","CameraCaptureImage":"https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?cno=4","CropTopLeftX":0,"CropTopLeftY":0,"CropBottomRightX":0,"CropBottomRightY":0},{"CameraNo":5,"CameraName":"ALTUNİZADE TÜNEL ","CameraBrand":"PELCO","CameraModel":"ES5230","IsActive":true,"IPAddress":"10.11.70.37","RTSPURL":"rtsp://10.11.70.37/stream2m","State":"Aktif","Format":"H.264","Resolution":"","WowzaStream":"http://ibb-media2.ibb.gov.tr:1935/live/5.stream/playlist.m3u8","WowzaStreamSSL":"https://601a5ce60b9a1.streamlock.net/hls/5.s
```
- Help response modeli: `CameraIdentityCard[]`
- Help response alanları: `CameraNo` (integer): Kamera No, `CameraName` (string), `CameraBrand` (string): Kamera Adı, `CameraModel` (string): Kamera Modeli, `IsActive` (boolean), `IPAddress` (string), `RTSPURL` (string), `State` (string), `Format` (string), `Resolution` (string), `WowzaStream` (string), `WowzaStreamSSL` (string), `TunnelCamera` (boolean): Tünel Kamerası mı?, `XCoord` (string): Kameranın kurulu olduğu noktanın X Koordinatı, `YCoord` (string): Kameranın kurulu olduğu noktanın Y Koordinatı, `CameraCaptureDate` (string): Kameradan görüntü alınma tarihi, `CameraCaptureImage` (string): Kamera ekran görüntüsü, `CropTopLeftX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropTopLeftY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır
- Help örnek response gövdesi:
```json
[
  {
    "CameraNo": 1,
    "CameraName": "sample string 2",
    "CameraBrand": "sample string 3",
    "CameraModel": "sample string 4",
    "IsActive": true,
    "IPAddress": "sample string 6",
    "RTSPURL": "sample string 7",
    "State": "sample string 8",
    "Format": "sample string 9",
    "Resolution": "sample string 10",
    "WowzaStream": "sample string 11",
    "WowzaStreamSSL": "sample string 12",
    "TunnelCamera": true,
    "XCoord": "sample string 14",
    "YCoord": "sample string 15",
    "CameraCaptureDate": "sample string 16",
    "CameraCaptureImage": "sample string 17",
    "CropTopLeftX": 18,
    "CropTopLeftY": 19,
    "CropBottomRightX": 20,
    "CropBottomRightY": 21
  },
  {
    "CameraNo": 1,
    "CameraName": "sample string 2",
    "CameraBrand": "sample string 3",
    "CameraModel": "sample string 4",
    "IsActive": true,
    "IPAddress": "sample string 6",
    "RTSPURL": "sample string 7",
    "State": "sample string 8",
    "Format": "sample string 9",
    "Resolution": "sample string 10",
    "WowzaStream": "sample string 11",
    "WowzaStreamSSL": "sample string 12",
    "TunnelCamera": true,
    "XCoord": "sample string 14",
    "YCoord": "sample string 15",
    "CameraCaptureDate": "sample string 16",
    "CameraCaptureImage": "sample string 17",
    "CropTopLeftX": 18,
    "CropTopLeftY": 19,
    "CropBottomRightX": 20,
    "CropBottomRightY": 21
  }
]
```

### `GET /api/Camera/v1/GetCamera/{camId}`

- Açıklama: ENG: Returns the details of the specified camera. Returns null if there's a server error or request with an invalid camera ID. (Image Path :https://cdn-uym.ibb.gov.tr/endura/{kameraId}/{resimAdi})
            TR: ID'si verilen kameranın son 3 görüntüsünü dondurur (Resim Path :https://cdn-uym.ibb.gov.tr/endura/{kameraId}/{resimAdi}). Sunucu  hatası olması durumunda null döndürür.
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-GetCamera-camId>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/GetCamera/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `302`
- Sonuç yorumu: Endpoint login sayfasına yönlendirdi; auth gerekiyor olabilir.
- Content-Type: `text/html; charset=utf-8`
- Redirect/Login hedefi: `/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fCamera%2fv1%2fGetCamera%2f1`
- Yol/query parametreleri: `camId` (integer, Required): Resim alınacak Kamera ID
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/GetCamera/1'
```
- Canlı örnek çıktı:
```html
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="/Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fCamera%2fv1%2fGetCamera%2f1">here</a>.</h2>
</body></html>
```
- Help response modeli: `CameraModel`
- Help response alanları: `Tarih` (date): Resmin üretildiği tarih, `Images` (Collection of string): Resim Listesi
- Help örnek response gövdesi:
```json
{
  "Tarih": "2026-03-11T17:15:50.7933615+03:00",
  "Images": [
    "sample string 1",
    "sample string 2"
  ]
}
```

### `GET /api/Camera/v1/GetDetail/{cameraNo}`

- Açıklama: Belli bir kamerayı donanımsal özellikleri ile birlikte listeler
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-GetDetail-cameraNo>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/GetDetail/1`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: `cameraNo` (integer, Required)
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/GetDetail/1'
```
- Canlı örnek çıktı:
```json
{
  "CameraNo": 1,
  "CameraName": "ACIBADEM SARAYARDI CAD.",
  "CameraBrand": "PELCO",
  "CameraModel": "Espirit",
  "IsActive": true,
  "IPAddress": "10.22.11.3",
  "RTSPURL": "rtsp://10.22.11.3/channel1/stream1m",
  "State": "Aktif",
  "Format": "H.264",
  "Resolution": "720x576",
  "WowzaStream": "",
  "WowzaStreamSSL": "",
  "TunnelCamera": false,
  "XCoord": "29.0358434",
  "YCoord": "40.9965959",
  "CameraCaptureDate": "",
  "CameraCaptureImage": "",
  "CropTopLeftX": 150,
  "CropTopLeftY": 150,
  "CropBottomRightX": 150,
  "CropBottomRightY": 150
}
```
- Help response modeli: `CameraIdentityCard`
- Help response alanları: `CameraNo` (integer): Kamera No, `CameraName` (string), `CameraBrand` (string): Kamera Adı, `CameraModel` (string): Kamera Modeli, `IsActive` (boolean), `IPAddress` (string), `RTSPURL` (string), `State` (string), `Format` (string), `Resolution` (string), `WowzaStream` (string), `WowzaStreamSSL` (string), `TunnelCamera` (boolean): Tünel Kamerası mı?, `XCoord` (string): Kameranın kurulu olduğu noktanın X Koordinatı, `YCoord` (string): Kameranın kurulu olduğu noktanın Y Koordinatı, `CameraCaptureDate` (string): Kameradan görüntü alınma tarihi, `CameraCaptureImage` (string): Kamera ekran görüntüsü, `CropTopLeftX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropTopLeftY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır
- Help örnek response gövdesi:
```json
{
  "CameraNo": 1,
  "CameraName": "sample string 2",
  "CameraBrand": "sample string 3",
  "CameraModel": "sample string 4",
  "IsActive": true,
  "IPAddress": "sample string 6",
  "RTSPURL": "sample string 7",
  "State": "sample string 8",
  "Format": "sample string 9",
  "Resolution": "sample string 10",
  "WowzaStream": "sample string 11",
  "WowzaStreamSSL": "sample string 12",
  "TunnelCamera": true,
  "XCoord": "sample string 14",
  "YCoord": "sample string 15",
  "CameraCaptureDate": "sample string 16",
  "CameraCaptureImage": "sample string 17",
  "CropTopLeftX": 18,
  "CropTopLeftY": 19,
  "CropBottomRightX": 20,
  "CropBottomRightY": 21
}
```

### `GET /api/Camera/v2/Details`

- Açıklama: Tüm State'leri listeler
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v2-Details>
- Test edilen URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v2/Details`
- Canlı test metodu: `GET`
- Canlı sonuç: `200`
- Sonuç yorumu: Canlı GET/OPTIONS isteği başarıyla yanıtlandı.
- Content-Type: `application/json; charset=utf-8`
- Yol/query parametreleri: Yok.
- Canlı örnek istek:
```bash
curl -i 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v2/Details'
```
- Canlı örnek çıktı:
```json
[{"CameraNo":1,"CameraName":"ACIBADEM SARAYARDI CAD.","CameraBrand":"PELCO","CameraModel":"Espirit","IsActive":true,"IPAddress":"10.22.11.3","RTSPURL":"rtsp://10.22.11.3/channel1/stream1m","State":"Aktif","Format":"H.264","Resolution":"720x576","WowzaStream":"","WowzaStreamSSL":"","TunnelCamera":false,"XCoord":"29.0358434","YCoord":"40.9965959","CameraCaptureDate":"2026-03-11T17:22:20","CameraCaptureImage":"https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?cno=1","CropTopLeftX":150,"CropTopLeftY":150,"CropBottomRightX":150,"CropBottomRightY":150},{"CameraNo":2,"CameraName":"AKOM","CameraBrand":"Hikvision","CameraModel":"DP-22DF7284-AW","IsActive":true,"IPAddress":"10.10.32.200","RTSPURL":"rtsp://admin:Tkm2953kam@10.10.32.200/Streaming/Channels/102","State":"Aktif","Format":"H.264","Resolution":"800x448","WowzaStream":"http://ibb-media4.ibb.gov.tr:1935/live/2.stream/playlist.m3u8","WowzaStreamSSL":"https://601a43eea2819.streamlock.net/hls/2.stream/playlist.m3u8","TunnelCamera":false,"XCoord":"28.96274764","YCoord":"41.08630782","CameraCaptureDate":"2026-03-11T17:22:20","CameraCaptureImage":"https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?cno=2","CropTopLeftX":10,"CropTopLeftY":15,"CropBottomRightX":300,"CropBottomRightY":250},{"CameraNo":3,"CameraName":"AKSARAY","CameraBrand":"Hikvision","CameraModel":"DP-22DF7284-AW","IsActive":true,"IPAddress":"10.10.26.222","RTSPURL":"rtsp://admin:Tkm2953kam@10.10.26.222/Streaming/Channels/101","State":"Aktif","Format":"H.264","Resolution":"640x352","WowzaStream":"http://ibb-media4.ibb.gov.tr:1935/live/3.stream/playlist.m3u8","WowzaStreamSSL":"https://601a43eea2819.streamlock.net/hls/3.stream/playlist.m3u8","TunnelCamera":false,"XCoord":"28.95382145","YCoord":"41.00983033","CameraCaptureDate":"2026-03-11T17:22:20","CameraCaptureImage":"https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?cno=3","CropTopLeftX":0,"CropTopLeftY":0,"CropBottomRightX":0,"CropBottomRightY":0},{"CameraNo":4,"CameraName":"ALİBEYKÖY MEYDANI","CameraBrand":"PELCO","CameraModel":"D6220","IsActive":true,"IPAddress":"10.10.32.13","RTSPURL":"rtsp://10.10.32.13/stream1m","State":"Aktif","Format":"H.264","Resolution":"640x352","WowzaStream":"http://ibb-media2.ibb.gov.tr:1935/live/4.stream/playlist.m3u8","WowzaStreamSSL":"https://601a5ce60b9a1.streamlock.net/hls/4.stream/playlist.m3u8","TunnelCamera":false,"XCoord":"28.94778426","YCoord":"41.07454609","CameraCaptureDate":"2026-03-11T17:22:20","CameraCaptureImage":"https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?cno=4","CropTopLeftX":0,"CropTopLeftY":0,"CropBottomRightX":0,"CropBottomRightY":0},{"CameraNo":5,"CameraName":"ALTUNİZADE TÜNEL ","CameraBrand":"PELCO","CameraModel":"ES5230","IsActive":true,"IPAddress":"10.11.70.37","RTSPURL":"rtsp://10.11.70.37/stream2m","State":"Aktif","Format":"H.264","Resolution":"","WowzaStream":"http://ibb-media2.ibb.gov.tr:1935/live/5.stream/playlist.m3u8","WowzaStreamSSL":"https://601a5ce60b9a1.streamlock.net/hls/5.s
```
- Help response modeli: `CameraIdentityCard[]`
- Help response alanları: `CameraNo` (integer): Kamera No, `CameraName` (string), `CameraBrand` (string): Kamera Adı, `CameraModel` (string): Kamera Modeli, `IsActive` (boolean), `IPAddress` (string), `RTSPURL` (string), `State` (string), `Format` (string), `Resolution` (string), `WowzaStream` (string), `WowzaStreamSSL` (string), `TunnelCamera` (boolean): Tünel Kamerası mı?, `XCoord` (string): Kameranın kurulu olduğu noktanın X Koordinatı, `YCoord` (string): Kameranın kurulu olduğu noktanın Y Koordinatı, `CameraCaptureDate` (string): Kameradan görüntü alınma tarihi, `CameraCaptureImage` (string): Kamera ekran görüntüsü, `CropTopLeftX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropTopLeftY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır
- Help örnek response gövdesi:
```json
[
  {
    "CameraNo": 1,
    "CameraName": "sample string 2",
    "CameraBrand": "sample string 3",
    "CameraModel": "sample string 4",
    "IsActive": true,
    "IPAddress": "sample string 6",
    "RTSPURL": "sample string 7",
    "State": "sample string 8",
    "Format": "sample string 9",
    "Resolution": "sample string 10",
    "WowzaStream": "sample string 11",
    "WowzaStreamSSL": "sample string 12",
    "TunnelCamera": true,
    "XCoord": "sample string 14",
    "YCoord": "sample string 15",
    "CameraCaptureDate": "sample string 16",
    "CameraCaptureImage": "sample string 17",
    "CropTopLeftX": 18,
    "CropTopLeftY": 19,
    "CropBottomRightX": 20,
    "CropBottomRightY": 21
  },
  {
    "CameraNo": 1,
    "CameraName": "sample string 2",
    "CameraBrand": "sample string 3",
    "CameraModel": "sample string 4",
    "IsActive": true,
    "IPAddress": "sample string 6",
    "RTSPURL": "sample string 7",
    "State": "sample string 8",
    "Format": "sample string 9",
    "Resolution": "sample string 10",
    "WowzaStream": "sample string 11",
    "WowzaStreamSSL": "sample string 12",
    "TunnelCamera": true,
    "XCoord": "sample string 14",
    "YCoord": "sample string 15",
    "CameraCaptureDate": "sample string 16",
    "CameraCaptureImage": "sample string 17",
    "CropTopLeftX": 18,
    "CropTopLeftY": 19,
    "CropBottomRightX": 20,
    "CropBottomRightY": 21
  }
]
```
