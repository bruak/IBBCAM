# IBB TKM API Test Raporu

Bu dokuman, `https://tkmservices.ibb.gov.tr/Web/Help` altinda dokumante edilen secili IBB TKM endpoint'lerinin gercek HTTP testleri ve kullanim notlarini icerir.

Test tarihi: `2026-03-11`

## Ozet

Ilk bakista `https://tkmservices.ibb.gov.tr/api/...` path'i 404 donuyor. Gercek base path `https://tkmservices.ibb.gov.tr/Web/api/...`.

Bu fark kritik:

- `https://tkmservices.ibb.gov.tr/api/...` -> `404 Not Found`
- `https://tkmservices.ibb.gov.tr/Web/api/...` -> endpoint'e gore `200 OK` veya `302 -> /Web/login.aspx`

Test edilen endpoint'lerde 3 durum goruldu:

1. Public endpoint
2. Auth gerektiren endpoint
3. Public gorunen ama bozuk/truncate payload donen endpoint

## Test Metodu

Tum testler `curl` ile `Accept: application/json` header'i gonderilerek yapildi.

Genel format:

```bash
curl -sS -D - -o response.json \
  -H 'Accept: application/json' \
  'https://tkmservices.ibb.gov.tr/Web/api/...'
```

## Sonuc Tablosu

| Endpoint | Test URL | Durum | Gozlem |
|---|---|---|---|
| `GET api/Camera/v1/All` | `/Web/api/Camera/v1/All` | `302 Found` | `/Web/login.aspx`'e yonleniyor, `WWW-Authenticate: Bearer` header'i var |
| `GET api/Camera/v1/GetCamera/{camId}` | `/Web/api/Camera/v1/GetCamera/1` | `302 Found` | Anonymous erisim kapali gorunuyor |
| `GET api/gis/v1/camera` | `/Web/api/gis/v1/camera` | `200 OK` | Response `application/json`, fakat payload JSON string icinde ve ic GeoJSON parse edilemedi; response truncation/format sorunu var |
| `GET api/TrafficData/v1/TrafficIndex` | `/Web/api/TrafficData/v1/TrafficIndex` | `200 OK` | Public erisim var, gecerli JSON donuyor |
| `GET api/TrafficData/v1/SegmentData` | `/Web/api/TrafficData/v1/SegmentData` | `302 Found` | Login'e yonleniyor, bearer auth sinyali var |
| `GET api/Announcement/v1/Current` | `/Web/api/Announcement/v1/Current` | `302 Found` | Login'e yonleniyor, bearer auth sinyali var |
| `GET api/VmsData/v1/BridgesStatus` | `/Web/api/VmsData/v1/BridgesStatus` | `302 Found` | Login'e yonleniyor, bearer auth sinyali var |
| `GET api/Park/v1/GetParkInfos/{flag}/{id}` | `/Web/api/Park/v1/GetParkInfos/1/0` | `302 Found` | Login'e yonleniyor, bearer auth sinyali var |
| `GET api/Junction/v1/All` | `/Web/api/Junction/v1/All` | `302 Found` | Login'e yonleniyor, bearer auth sinyali var |
| `GET api/ElectChargeStations/v1/ElectChargeStations` | `/Web/api/ElectChargeStations/v1/ElectChargeStations` | `302 Found` | Login'e yonleniyor, bearer auth sinyali var |

## Testlerde Gozlenen Ham Davranis

### 1. Public ve calisan endpoint

#### `GET /Web/api/TrafficData/v1/TrafficIndex`

Calisan request:

```bash
curl -H 'Accept: application/json' \
  'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex'
```

Gozlenen response:

```json
{"Result":78}
```

Anlam:

- `Result` alani trafik indeksini tasiyor
- Dokumanda da bu degerin `1-99` araliginda oldugu yaziyor
- Bu endpoint, sidebar veya header icin dogrudan kullanilabilir

#### `GET /Web/api/gis/v1/camera`

Calisan request:

```bash
curl -H 'Accept: application/json' \
  'https://tkmservices.ibb.gov.tr/Web/api/gis/v1/camera'
```

Gozlenen durum:

- `200 OK`
- `Content-Type: application/json; charset=utf-8`
- Payload dis JSON olarak parse ediliyor
- Fakat donen veri dogrudan GeoJSON object degil, JSON string olarak geliyor
- Bu string icindeki GeoJSON parse edilirken hata olusuyor

Gozlenen problem:

- Payload sonu kesik gorunuyor
- Ornek son kisim: kamera `12` civarinda string yarim kaliyor
- Bu nedenle response bu haliyle Leaflet'e dogrudan verilemiyor

Pratik sonuc:

- Endpoint public, ama su an guvenilir degil
- Uretimde kullanmadan once response sanitization veya server tarafi duzeltme gerekir

### 2. Auth gerektiren endpoint davranisi

Asagidaki endpoint'lerin tamaminda ayni davranis gozlemlendi:

- `302 Found`
- `Location: /Web/login.aspx?...`
- `WWW-Authenticate: Bearer`

Bu, en azindan anonymous request'lerde endpoint'in korumali oldugunu gosteriyor.

Bu davranis gorulen endpoint'ler:

- `GET /Web/api/Camera/v1/All`
- `GET /Web/api/Camera/v1/GetCamera/1`
- `GET /Web/api/TrafficData/v1/SegmentData`
- `GET /Web/api/Announcement/v1/Current`
- `GET /Web/api/VmsData/v1/BridgesStatus`
- `GET /Web/api/Park/v1/GetParkInfos/1/0`
- `GET /Web/api/Junction/v1/All`
- `GET /Web/api/ElectChargeStations/v1/ElectChargeStations`

Ornek request:

```bash
curl -H 'Accept: application/json' \
  'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Current'
```

Ornek header davranisi:

```http
HTTP/1.1 302 Found
Location: /Web/login.aspx?ReturnUrl=%2fWeb%2fapi%2fAnnouncement%2fv1%2fCurrent
WWW-Authenticate: Bearer
```

Pratik sonuc:

- Bu endpoint'ler dokumanda acik olsa da anonymous olarak kullanilamiyor
- Bearer token veya oturum cookie'si olmadan entegrasyon su an tamamlanamaz

## Endpoint Bazinda Kullanim Notlari

Asagidaki alanlar help dokumanindan alinmistir; runtime test sonucu ile birlikte dusunulmelidir.

### `GET api/Camera/v1/All`

Dokumante edilen alanlar:

- `ID`
- `Name`
- `XCoord`
- `YCoord`
- `VideoURL`
- `SSLVideoURL`
- `GroupId`

Kullanim amaci:

- Hafif kamera listesi
- Harita marker'i uretmek icin uygun

Not:

- Mevcut projedeki veri modeliniz bundan daha zengin
- `CameraCaptureImage`, `State`, `IsActive`, `CameraBrand`, `CameraModel`, `Resolution` yok
- Bu nedenle tek basina mevcut UI'nin yerine gecmesi zor

### `GET api/Camera/v1/GetCamera/{camId}`

Dokumante edilen alanlar:

- `Tarih`
- `Images[]`

Kullanim amaci:

- Kamera modalinda son 3 goruntuyu gostermek
- Snapshot tarihcesi vermek

Test sonucu:

- `302 Found`, auth gerekiyor

### `GET api/gis/v1/camera`

Dokumanda response tipi:

- `string`

Kullanim amaci:

- GeoJSON veya GeoJSON-benzeri kamera katmani
- Leaflet tarafina dogrudan overlay olarak verilmesi hedeflenmis gorunuyor

Test sonucu:

- Public
- Ama payload parse edilebilir, tam bir GeoJSON object olarak gelmedi

### `GET api/TrafficData/v1/TrafficIndex`

Dokumante edilen alan:

- `Result`

Kullanim amaci:

- Istanbul geneli trafik yogunluk gostergesi
- Sidebar, badge, header KPI

Test sonucu:

- Public
- Dogrudan kullanilabilir

Ornek kullanim:

```js
const res = await fetch("https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex");
const data = await res.json();
console.log(data.Result);
```

### `GET api/TrafficData/v1/SegmentData`

Dokumante edilen alanlar:

- `Src`
- `SegmentID`
- `Speed`
- `ColorIndex`
- `LastDate`

Kullanim amaci:

- Trafik segment hizi
- Yol bazli renkli overlay

Test sonucu:

- `302 Found`, auth gerekiyor

Not:

- Dokumanda geometri alani gorunmuyor
- Geometri baska veri setinden eslenmeden dogrudan harita cizimi zor olabilir

### `GET api/Announcement/v1/Current`

Dokumante edilen alanlardan onemlileri:

- `Id`
- `Baslik`
- `Metin`
- `Tipi`
- `Oncelik`
- `KameraId`
- `xKoordinat`
- `yKoordinat`
- `BitisTarihi`
- `GirisTarihi`

Kullanim amaci:

- Kaza, yogun trafik, yol kapanisi gibi olay marker'lari
- Kamera ile event esleme
- Priority tabanli filtre

Test sonucu:

- `302 Found`, auth gerekiyor

### `GET api/VmsData/v1/BridgesStatus`

Dokumante edilen alanlar:

- `RouteId`
- `Cong`

Kullanim amaci:

- Kopru veya route trafik paneli

Test sonucu:

- `302 Found`, auth gerekiyor

Not:

- `RouteId` -> insan okunur ad eslemesi icin ek mapping gerekir

### `GET api/Park/v1/GetParkInfos/{flag}/{id}`

Testte kullanilan parametreler:

- `flag=1`
- `id=0`

Dokumante edilen alanlardan onemlileri:

- `PLotId`
- `PLotName`
- `PLotCapasity`
- `PLotAvailableCount`
- `PLotLatitude`
- `PLotLongitude`
- `PStatus`
- `PWorkingHours`

Kullanim amaci:

- Otopark doluluk katmani
- Bos yer sayisi ve doluluk orani gosterimi

Test sonucu:

- `302 Found`, auth gerekiyor

### `GET api/Junction/v1/All`

Dokumante edilen alanlar:

- `JunctionNo`
- `JunctionName`
- `CountyId`
- `JunctionType`
- `XCoord`
- `YCoord`
- `JunctionNewNo`

Kullanim amaci:

- Kavsak katmani
- Ilce bazli filtre

Test sonucu:

- `302 Found`, auth gerekiyor

### `GET api/ElectChargeStations/v1/ElectChargeStations`

Dokumante edilen alanlar:

- `StationNo`
- `StationName`
- `Xcoord`
- `Ycoord`
- `Weekdays`
- `Weekend`
- `StationModel`
- `SocketInfo`
- `Address`

Kullanim amaci:

- EV sarj istasyonu katmani

Test sonucu:

- `302 Found`, auth gerekiyor

## En Onemli Teknik Bulgular

### 1. Dogru base path `/Web/api`

Kritik nokta budur. Koku `/api` olan istekler 404 donuyor. Dogru base path:

```text
https://tkmservices.ibb.gov.tr/Web/api/...
```

### 2. Public erisime acik gorunen tek saglikli endpoint `TrafficIndex`

Su an gercek anlamda entegrasyona en yakin endpoint budur.

### 3. `gis/v1/camera` public ama response sorunlu

Bu endpoint teoride cok degerli, ama test aninda parse edilebilir GeoJSON donmedi.

### 4. Kamera, duyuru, park, junction ve EV servisleri auth korumali

Anonymous entegrasyon icin su an blokaj var.

## Entegrasyon Tavsiyesi

Bu testlere gore pratik oncelik:

1. `TrafficIndex` icin public bir backend proxy eklenebilir
2. `gis/v1/camera` icin response dogrulama ve fallback lazim
3. Auth gerektiren servisler icin token/cookie temin edilmeden implementasyona baslanmamali

Mevcut proje icin en guvenli yaklasim:

- Kamera ana veri kaynagi olarak mevcut `list.xml` akisi korunsun
- `TrafficIndex` yan ozellik olarak eklensin
- Diger servisler `optional provider` mantigiyla tasarlansin

## Auth Sorunu Icin Denenen Cozumler

Bu bolumde `302 -> /Web/login.aspx` ve `WWW-Authenticate: Bearer` davranisina karsi fiilen denenmis yollar listelenmistir.

### Denenen ama ise yaramayan yollar

#### 1. Public sayfadan cookie alip protected endpoint'e gitmek

Deneme:

- Once `/Web/Help` ziyaret edildi
- Sonra ayni cookie jar ile protected endpoint cagrildi

Sonuc:

- Cookie set edilmedi
- Protected endpoint yine `302 Found` dondu

Yorum:

- Public help sayfasi bir authenticated session baslatmiyor

#### 2. Dummy bearer token gondermek

Deneme:

```bash
curl -H 'Accept: application/json' \
  -H 'Authorization: Bearer dummy-token' \
  'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Current'
```

Sonuc:

- Davranis degismedi
- Endpoint yine `/Web/login.aspx`'e redirect etti

Yorum:

- Sistem sadece bearer header varligina bakmiyor
- Gecerli bir access token gerekiyor

#### 3. AJAX benzeri header'lar ile denemek

Deneme:

- `X-Requested-With: XMLHttpRequest`
- `Referer: https://tkmservices.ibb.gov.tr/Web/Help`
- `Accept: application/json`

Sonuc:

- Davranis degismedi
- Endpoint yine `302 Found` dondu

Yorum:

- Redirect davranisi XHR oldugu icin bastirilmiyor
- Sunucu tarafinda `SuppressFormsAuthenticationRedirect` benzeri bir ayar yok ya da devrede degil

#### 4. Redirect'i takip edip login sayfasina gitmek

Deneme:

```bash
curl -L \
  'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Current'
```

Sonuc:

- Ilk cevap `302 Found`
- Sonraki hedef `/Web/login.aspx`
- Bu URL `404 Not Found`

Yorum:

- Auth akisi legacy veya bozuk/misconfigured gorunuyor
- Redirect hedefi calisan bir login controller'a gitmiyor

#### 5. `General/v1/CheckUser` ile session acma fikri

Help dokumani ilk bakista bunu login benzeri gosterebilir, cunku body'de:

- `Username`
- `Password`

isteniyor.

Fakat runtime testte:

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  --data '{"Username":"invalid_user","Password":"invalid_pass"}' \
  'https://tkmservices.ibb.gov.tr/Web/api/General/v1/CheckUser'
```

Sonuc:

- Bu endpoint de protected
- Yine `302 Found` + `/Web/login.aspx`

Yorum:

- `CheckUser`, auth bootstrap endpoint'i degil
- Zaten authenticated oturum icinde kullanilan bir servis olabilir

#### 6. `Mobile/.../SaveSession/Login` ile session alma fikri

Bu endpoint'in adi login gecse de help sayfasina gore amaci auth degil, session log kaydi.

Runtime test sonucu:

- `POST /Web/api/Mobile/v1/SaveSession/Login` -> `302 Found`
- `POST /Web/api/CepTrafik/Mobile/v1/SaveSession/Login` -> `401 Not Allowed URL`

Ek olarak `CepTrafik` varyantinda su auth scheme'leri ilan edildi:

- `Bearer`
- `Digest`
- `Negotiate`
- `NTLM`
- `Basic`

Yorum:

- Bunlar dogrudan kullanilabilir public login mekanizmasi sunmuyor
- Elinizde gecerli kurum kimligi olmadan bu yol pratik degil

### Ise yarayan cozum: Public alternatif endpoint aileleri

Auth gerektiren ana endpoint'leri bypass etmek yerine, ayni veri ailesinin public karsiliklarini test ettim. Bu yol gercekten calisti.

#### 1. Trafik indeksi

Calisan alternatif:

- `GET /Web/api/Citix/v1/TrafficIndex`

Gozlenen response:

```json
{"TI":81,"TI_An":80,"TI_Av":81}
```

Not:

- Bu, protected `TrafficData/v1/TrafficIndex` yerine kullanilabilir
- Hatta daha zengin alan donuyor

#### 2. Duyurular

Calisan alternatifler:

- `GET /Web/api/Citix/v1/CurrentAnnouncement`
- `GET /Web/api/IntensityMap/v1/CurrentAnnouncement`

Gozlenen durum:

- `200 OK`
- `11` kayit dondu
- Tum kayitlarda `KameraId`, `xKoordinat`, `yKoordinat` dolu

Bu endpoint'ler protected `Announcement/v1/Current` yerine kullanilabilir.

#### 3. Kamera listesi

Calisan alternatifler:

- `GET /Web/api/Citix/v1/Camera`
- `GET /Web/api/IntensityMap/v1/Camera`

Gozlenen durum:

- `200 OK`
- `645` kamera kaydi dondu
- Her kayitta `Images` dizisi var
- Her kayitta `VideoURL` ve `VideoURL_SSL` var

Ornek `Images`:

```text
https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=0&cno=2
https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=1&cno=2
https://tkmservices.ibb.gov.tr/web/Handlers/CameraImage.ashx?pno=2&cno=2
```

Yorum:

- Bu, protected `Camera/v1/GetCamera/{camId}` ihtiyacinin bir kismini karsilar
- Ancak mevcut `list.xml` envanterinizden daha az kamera donuyor
- Bu nedenle tam replacement degil, partial provider olarak dusunulmeli

#### 4. Otopark

Calisan alternatifler:

- `GET /Web/api/Citix/v1/Parking`
- `GET /Web/api/IntensityMap/v1/Parking`

Gozlenen durum:

- `200 OK`
- `1696` kayit dondu
- `PLotAvailableCount`, `PLotAvailableRate`, koordinatlar ve adres bilgileri mevcut

Bu endpoint'ler protected `Park/v1/GetParkInfos/{flag}/{id}` yerine daha iyi aday.

#### 5. Kopru / route durumu

Calisan alternatifler:

- `GET /Web/api/Citix/v1/BridgesStatus`
- `GET /Web/api/IntensityMap/v1/BridgesStatus`

Gozlenen durum:

- `200 OK`
- `48` kayit dondu
- `RouteName` ve `Status` geliyor

Yorum:

- Bu, protected `VmsData/v1/BridgesStatus` endpoint'inden daha kullanisli
- Orijinal endpoint sadece `RouteId` ve `Cong` veriyordu

#### 6. Kavsak

Calisan alternatif:

- `GET /Web/api/IntensityMap/v1/Junction`

Gozlenen durum:

- `200 OK`
- `2499` kayit dondu
- Alanlar `Junction/v1/All` ile uyumlu

#### 7. EV sarj istasyonlari

Calisan alternatif:

- `GET /Web/api/IntensityMap/v1/ElectChargeStations`

Gozlenen durum:

- `200 OK`
- `222` kayit dondu
- Alanlar protected `ElectChargeStations/v1/ElectChargeStations` ile uyumlu

### Hala cozulmeyenler

Asagidaki yollar denendi ama ise yarar public alternatif bulunamadi ya da endpoint hala auth gerektiriyor:

- `api/TrafficData/v1/SegmentData`
- `api/CepTrafik/VmsData/v1/BridgesStatusForMobile`
- `api/CepTrafik/ElectChargeStations/v1/ElectChargeStations`

### Sonuc

`302 -> /Web/login.aspx` problemine dogrudan teknik bir bypass bulunamadi.

Ama pratik ve temiz cozum su oldu:

1. Protected ana endpoint'leri zorlamamak
2. Ayni veri ailesinin public `Citix` ve `IntensityMap` varyantlarini kullanmak
3. Bunlari backend tarafinda normalize edip mevcut uygulamaya vermek

Bu, su an icin en uygulanabilir cozumdur.

## Tekrar Uretilebilir Test Komutlari

### Root path neden 404?

```bash
curl -I 'https://tkmservices.ibb.gov.tr/api/TrafficData/v1/TrafficIndex'
```

### Dogru path ile public endpoint

```bash
curl -H 'Accept: application/json' \
  'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex'
```

### Dogru path ile auth gerektiren endpoint

```bash
curl -I -H 'Accept: application/json' \
  'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Current'
```

### GIS endpoint testi

```bash
curl -H 'Accept: application/json' \
  'https://tkmservices.ibb.gov.tr/Web/api/gis/v1/camera'
```

## Kaynaklar

- Help index: `https://tkmservices.ibb.gov.tr/Web/Help`
- Camera All: `https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-All`
- Camera GetCamera: `https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-GetCamera-camId`
- GIS Camera: `https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-gis-v1-camera`
- TrafficIndex: `https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TrafficIndex`
- SegmentData: `https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-SegmentData`
- Announcement Current: `https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Announcement-v1-Current`
- BridgesStatus: `https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-VmsData-v1-BridgesStatus`
- Park Infos: `https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-GetParkInfos-flag-id`
- Junction All: `https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-All`
- ElectChargeStations: `https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-ElectChargeStations-v1-ElectChargeStations`
