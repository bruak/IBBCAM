# TKM Services Web API Dokümantasyonu

Bu doküman, `https://tkmservices.ibb.gov.tr/Web/Help` üzerindeki ASP.NET Web API Help Page içeriği taranarak üretildi. Amaç; help sayfasında görünen tüm endpointleri tek dosyada toplamak, kullanım biçimlerini açıklamak ve canlı erişimle ilgili önemli notları aynı yerde tutmaktır.

## Kaynak ve kapsam

- Kaynak help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help>
- Doküman üretim tarihi: 2026-03-11 17:17:13 +0300
- Taranan controller/aile sayısı: 33
- Taranan endpoint sayısı: 203
- Tam URL kalıbı: `https://tkmservices.ibb.gov.tr/Web/<path>`
- Örnek: help sayfasında `api/TrafficData/v1/TrafficIndex` görünüyorsa canlı çağrı adresi `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex` olur.

## Genel kullanım notları

- Help sayfası Swagger/OpenAPI değil, klasik ASP.NET Web API Help Page çıktısıdır; bu nedenle doğrulama kuralları ve auth bilgileri her zaman açık yazılmıyor olabilir.
- Yardım sayfalarında çoğu endpoint için hem `application/json` hem `application/xml` örneği veriliyor. Bu dokümanda JSON odaklı örnekler tercih edildi.
- `GET` endpointler için örnekler doğrudan URL ile verildi. Yol veya query parametresi gereken yerlerde `{param}` yer tutucuları `'<param>'` biçimine çevrildi.
- `POST` endpointlerde help sayfasındaki örnek JSON gövdesi kullanıldı. Bu örnekler şema göstermek içindir; birebir üretim verisi değildir.

## Canlı erişim gözlemleri

2026-03-11 tarihinde yapılan örnek kontroller, help sayfasında listelenen her endpointin anonim erişime açık olmadığını gösteriyor:

| Endpoint | Gözlem |
| --- | --- |
| `GET /api/TrafficData/v1/TrafficIndex` | `200 OK`, `application/json` döndü. |
| `GET /api/TrafficData/v1/TrafficIndex_Sc1_Cont` | `200 OK`, `application/json` döndü. |
| `GET /api/Camera/v1/All` | `302 Found` ile `/Web/login.aspx` yönlendirmesi ve `WWW-Authenticate: Bearer` döndü. |
| `GET /api/Park/v1/GetApsInfos` | `302 Found` ile login yönlendirmesi ve `WWW-Authenticate: Bearer` döndü. |
| `GET /api/YDSData/v1/YDSData/{displayID}` | `302 Found` ile login yönlendirmesi ve `WWW-Authenticate: Bearer` döndü. |
| `GET /api/Announcement/v1/Current` | `302 Found` ile login yönlendirmesi ve `WWW-Authenticate: Bearer` döndü. |

Pratik sonuç: help sayfasında route görünmesi, endpointin anonim/public olduğu anlamına gelmiyor. Üretim entegrasyonunda auth gereksinimi ayrıca doğrulanmalı.

## Help sayfasında hata veren detail sayfaları

- `api/Chart/v1/TrafficIndexBarChart`: detail sayfası taranırken `HTTP Error 500: Internal Server Error` alındı. Bu endpoint için yalnızca liste sayfasındaki özet açıklama ve route bilgisi yazıldı.
- `api/Mobile/v1/SaveSession/Login`: detail sayfası taranırken `HTTP Error 500: Internal Server Error` alındı. Bu endpoint için yalnızca liste sayfasındaki özet açıklama ve route bilgisi yazıldı.
- `api/UYMPortal/v2/Piers`: detail sayfası taranırken `<urlopen error [Errno -3] Temporary failure in name resolution>` alındı. Bu endpoint için yalnızca liste sayfasındaki özet açıklama ve route bilgisi yazıldı.

## Endpoint aileleri

| Aile | Endpoint sayısı |
| --- | ---: |
| `SystemFailures` | 2 |
| `GIS` | 1 |
| `Park` | 8 |
| `IntensityMap` | 26 |
| `EDS` | 1 |
| `YDSData` | 1 |
| `SensorStatistic` | 3 |
| `UDBDashboard` | 6 |
| `ElectChargeStations` | 1 |
| `Chart` | 2 |
| `Travel` | 4 |
| `TrafficData` | 21 |
| `VmsData` | 4 |
| `Mobile` | 8 |
| `MobileExtensions` | 14 |
| `UYMPortal` | 10 |
| `Piers` | 1 |
| `Site` | 5 |
| `CepTrafik` | 39 |
| `HavaistStations` | 1 |
| `Announcement` | 5 |
| `Scm` | 1 |
| `BTCongestion` | 1 |
| `Sbgm` | 1 |
| `WeatherData` | 1 |
| `Junction` | 8 |
| `General` | 3 |
| `EurasiaTunnel` | 3 |
| `CleanEnergy` | 1 |
| `CitixController` | 6 |
| `Atak` | 4 |
| `Survey` | 1 |
| `Camera` | 10 |

## Hızlı envanter

### SystemFailures

| Method | Path | Açıklama |
| --- | --- | --- |
| `POST` | `api/SystemFailures/v1/InsertSystemFailure` | SATA yazılımından gelen arızaların kayıt işlemini yapar. |
| `POST` | `api/SystemFailures/v1/InsertSystemFailureResponse` | SATA yazılımından gelen arıza çözümlerinin kayıt işlemini yapar. |

### GIS

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/gis/v1/camera` | Kamera listesi, GeoJson formatında |

### Park

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Park/v1/DashParkingLotCount` | APS'de kayıtlı toplam otopark sayısı |
| `GET` | `api/Park/v1/DashParkingLotSortCount` | No documentation available. |
| `GET` | `api/Park/v1/GetApsInfos` | Trafik Müdürlüğünün sahada kullandığı APS'lerdeki otopark doluluk bilgilerini verir. |
| `GET` | `api/Park/v1/GetBeyogluParkInfos` | Trafik Müdürlüğünün anlaşmalı olduğu Beyoğlu ilçesinde bulunan otoparkların doluluk oranlarının bilgilerini verir. |
| `GET` | `api/Park/v1/GetParkInfo/{flag}/{id}` | Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir. |
| `GET` | `api/Park/v1/GetParkInfos/{flag}/{id}` | Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir. |
| `POST` | `api/Park/v1/SetParkInfo/{Id}/{Availability}` | Açıklama belirtilmemiş. |
| `GET` | `api/Park/v2/GetParkInfo/{flag}/{id}` | Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir. |

### IntensityMap

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/IntensityMap/Anaylze/v1/VehicleDestination/{idsen}/{begin_EPOC}/{end_EPOC}` | No documentation available. |
| `GET` | `api/IntensityMap/Anaylze/v1/VehicleTracking/{idsen}/{begin_EPOC}/{end_EPOC}` | No documentation available. |
| `GET` | `api/IntensityMap/v1/Bicycle` | No documentation available. |
| `GET` | `api/IntensityMap/v1/BridgesStatus` | No documentation available. |
| `GET` | `api/IntensityMap/v1/Camera` | No documentation available. |
| `GET` | `api/IntensityMap/v1/Camera/URL` | No documentation available. |
| `GET` | `api/IntensityMap/v1/CurrentAnnouncement` | No documentation available. |
| `GET` | `api/IntensityMap/v1/ElectChargeStations` | No documentation available. |
| `GET` | `api/IntensityMap/v1/HavaIstStations` | No documentation available. |
| `GET` | `api/IntensityMap/v1/Junction` | No documentation available. |
| `POST` | `api/IntensityMap/v1/MultiRouting` | No documentation available. |
| `GET` | `api/IntensityMap/v1/Parking` | No documentation available. |
| `GET` | `api/IntensityMap/v1/POI` | No documentation available. |
| `GET` | `api/IntensityMap/v1/RouteTravelTime` | No documentation available. |
| `POST` | `api/IntensityMap/v1/Routing` | No documentation available. |
| `GET` | `api/IntensityMap/v1/StaticLayerVersion/{slCode}` | No documentation available. |
| `GET` | `api/IntensityMap/v1/StaticLayerVersion?slCode={slCode}` | No documentation available. |
| `POST` | `api/IntensityMap/v1/ToolBoxMetric` | No documentation available. |
| `GET` | `api/IntensityMap/v1/TravelTimePoint` | No documentation available. |
| `GET` | `api/IntensityMap/v1/VmsData/{vmsNo}` | No documentation available. |
| `GET` | `api/IntensityMap/v1/VmsData?vmsNo={vmsNo}` | No documentation available. |
| `GET` | `api/IntensityMap/v1/VmsPoint` | No documentation available. |
| `GET` | `api/IntensityMap/v1/Weather` | No documentation available. |
| `GET` | `api/IntensityMap/v2/Piers` | No documentation available. |
| `GET` | `api/IntensityMap/v2/VmsData/{dspno}` | No documentation available. |
| `GET` | `api/IntensityMap/v2/VmsPoint` | No documentation available. |

### EDS

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/EDS/v1/DashEdsCount` | No documentation available. |

### YDSData

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/YDSData/v1/YDSData/{displayID}` | Girilen YDS No'ya göre 5 parametre döndürür.             1.parametre: Alt alta toplam kaç mesajın görüntüleneceği gösteren sayı.… |

### SensorStatistic

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/SensorStatistic/v1/DashSensorCount` | No documentation available. |
| `GET` | `api/SensorStatistic/v1/RtmsData` | Bu servis Rtms numarası ve tarihe göre filtrelenmiş şekilde RTMS verilerini getirir. |
| `POST` | `api/SensorStatistic/v1/SensorData` | Bu sayfa yoğunluk haritasında SENSÖR İSTATİSTİKLERİNİN tutulduğu sayfaya VERİ GÖNDEREN sayfadır...             İstenilen sensörün istenilen… |

### UDBDashboard

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/UDBDashboard/Camera/v1/All` | No documentation available. |
| `GET` | `api/UDBDashboard/Cekici/v1/CekiciCalismalari` | No documentation available. |
| `GET` | `api/UDBDashboard/Duyuru/v1/KazaBilgileri` | No documentation available. |
| `GET` | `api/UDBDashboard/Envanter/v1/EnvanterSayilari` | No documentation available. |
| `GET` | `api/UDBDashboard/Junction/v1/All` | No documentation available. |
| `GET` | `api/UDBDashboard/Tunnel/v1/TunnelIsletme` | No documentation available. |

### ElectChargeStations

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/ElectChargeStations/v1/ElectChargeStations` | Elektrikli şarj istasyonlarını döndürür. |

### Chart

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Chart/v1/TrafficIndexBarChart` | Trafik indeksin o gününü önceki hafta aynı gün ile karşılaştırarak grafiğini PNG formatında verir |
| `GET` | `api/Chart/v1/TrafficIndexIndicator` | Trafik indeksin o gününü önceki hafta aynı gün ile karşılaştırarak grafiğini PNG formatında verir |

### Travel

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Travel/v1/GetAll/{minute}` | Belirlenmiş olan güzergahların (tabloda tutulmaktadır) seyahat sürelerini aldığı parametre kadar güncel olacak şekilde döndürür. |
| `GET` | `api/Travel/v1/GetFCDTravelTime/{msgid}` | No documentation available. |
| `GET` | `api/Travel/v1/GetFCDTravelTimes/{type}?sid={sid}` | Yalnızca Belirli Rotalar için seyahat sürelerini verir. |
| `POST` | `api/Travel/v1/GetTravelTime` | Açıklama belirtilmemiş. |

### TrafficData

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/TrafficData/v1/ComTrafficIndex` | 1 önceki günün son 4 hafta içerisindeki trafik index değeri geçen yılla birlikte verilir. Toplamda 8 index değeri basılmış olur. 1-99 arası… |
| `GET` | `api/TrafficData/v1/ComTrafficIndexWeekDayNo/{DayNo}` | Açıklama belirtilmemiş. |
| `GET` | `api/TrafficData/v1/FusedDataManuelSpeed` | Çağrı merkezi tarafından manuel olarak girilmiş Hız değerlerinirini döndürür. (Son sekiz saat döner) |
| `GET` | `api/TrafficData/v1/IntensityMap/ScreenShot` | Anlık Yoğunluk Haritasının Ekran Görüntüsünü PNG formatında verir. |
| `GET` | `api/TrafficData/v1/PredictionsData` | TDMS veritabanındaki uspLatestPredictionsSelect storeprocedure kullanarak,data döndürüyor. Segmentlerin 15-30-45-60 dakika sonraki tahmini… |
| `GET` | `api/TrafficData/v1/SegmentBlocking` | Çağrı merkezi tarafından manuel olarak girilmiş Hız değerlerinirini döndürür. (Son sekiz saat döner) |
| `GET` | `api/TrafficData/v1/SegmentData` | Trafik yoğunluk haritasında bulunan yollara ait olan anlık ortalama hız bilgilerini döndürür. |
| `GET` | `api/TrafficData/v1/Segments` | Açıklama belirtilmemiş. |
| `GET` | `api/TrafficData/v1/TrafficIndex` | İstanbul geneli için trafik indeks değerini döndürür. 1-99 arasında değişen bir değer olup, 1=>Açık Trafik, 99=>Çok Yoğun Trafik anlamına g… |
| `GET` | `api/TrafficData/v1/TrafficIndex_Sc1_Cont` | İstanbul Genel Trafik İndeks'ini 3 kırılımda döndürür: "":Genel, "An":Anadolu, "Av":Avrupa |
| `GET` | `api/TrafficData/v1/TrafficIndex_Sc1_Cont_Report` | Özel bir veri setinden veri çekerek YHarita6'ya sunar. Geçmiş görünümleri elde etmede kullanılıyor |
| `GET` | `api/TrafficData/v1/TrafficIndexHistory/{day}/{period}` | Trafik indeks değerinin geçmişini döndürür. 1-99 arasında değişen bir değer olup, 1=>Açık Trafik, 99=>Çok Yoğun Trafik anlamına geliyor. |
| `GET` | `api/TrafficData/v1/TunnelSegments` | Tünel segmentlerini verir |
| `GET` | `api/TrafficData/v1/VMSSegmentData/{VmsId}/{MsgId}` | Yeni Ekran Yönetim Yazılımında Okmeydanı VMS gibi grafiksel panolar için segment  listesini döndürür |
| `GET` | `api/TrafficData/v1/xml/speeds` | Açıklama belirtilmemiş. |
| `GET` | `api/TrafficData/v2/ComTrafficIndex` | Açıklama belirtilmemiş. |
| `GET` | `api/TrafficData/v2/Segments` | Açıklama belirtilmemiş. |
| `GET` | `api/TrafficData/v3/SegmentData` | Trafik yoğunluk haritasında bulunan yollara ait olan anlık ortalama hız bilgilerini döndürür. YHarita v6 için geliştirildi |
| `GET` | `api/TrafficData/v3/SegmentData_Report` | Özel bir veri setinden veri çekerek YHarita6'ya sunar. Geçmiş görünümleri elde etmede kullanılıyor |
| `GET` | `api/TrafficData/v3/Segments/{ZoomLevel}` | YHarita v6 için geliştirildi |
| `GET` | `api/TrafficData/v4/SegmentData` | No documentation available. |

### VmsData

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/VmsData/v1/BridgesStatus` | Tüm trafik VMS mesajlarının trafik durumu bilgisini döndürür. |
| `GET` | `api/VmsData/v1/BridgesStatusForMobile` | CepTrafik köprü güzergahlarının trafik durumu bilgisini döndürür.             GrupId:1--> 15 Temmuz Şehitler Köprüsü (Avrupa --> Anadolu)… |
| `GET` | `api/VmsData/v1/DashVmsCount` | No documentation available. |
| `GET` | `api/VmsData/v1/VmsData/{VmsId}` | Tüm trafik VMS mesajlarının VmsId ye göre trafik durumu bilgisini döndürür. |

### Mobile

| Method | Path | Açıklama |
| --- | --- | --- |
| `POST` | `api/Mobile/v1/AndroidConfiguration` | Android kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta. |
| `POST` | `api/Mobile/v1/AndroidLoc` | Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (Android için) |
| `POST` | `api/Mobile/v1/IphoneConfiguration` | Iphone kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta. |
| `POST` | `api/Mobile/v1/IphoneLoc` | Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (IPhone için). |
| `POST` | `api/Mobile/v1/SaveSession/Get/{loginId}` | Açıklama belirtilmemiş. |
| `POST` | `api/Mobile/v1/SaveSession/Get?loginId={loginId}` | Açıklama belirtilmemiş. |
| `POST` | `api/Mobile/v1/SaveSession/Login` | CepTrafik uygulamasında her client oturumu açıldığında kayıt atar. Yoğun kullanımlı günlerde yükü görmek için eklendi |
| `POST` | `api/Mobile/v1/SaveSession/Logout` | CepTrafik uygulamasında client oturumu kapatma |

### MobileExtensions

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/MobileExtensions/v1/ActiveIcon` | Aktif ikon bilgisini döndürür. |
| `POST` | `api/MobileExtensions/v1/DeleteUser` | Uygulamaya giriş yapmış kullanıcı bilgilerini siler |
| `POST` | `api/MobileExtensions/v1/DetailedUsersInformationDelete` | Kullanıci siler. |
| `POST` | `api/MobileExtensions/v1/DetailedUsersInformationInsert` | Kullanıcıların detaylı bilgilerini kaydeden procedure. |
| `POST` | `api/MobileExtensions/v1/FavoriteAddressDelete` | Kullanıcıların favori adresleri silinir. |
| `POST` | `api/MobileExtensions/v1/FavoriteAddressInsert` | Kullanıcıların favori adresleri eklenir. |
| `POST` | `api/MobileExtensions/v1/HearingImpairedInsert` | İşitme Engelli Kullanıcı bilgileri kaydedilir. |
| `POST` | `api/MobileExtensions/v1/HearingImpairedStatus` | İşitme engelli kullanıcıların durumunu kontrol etmek için kullanılmaktadır. |
| `POST` | `api/MobileExtensions/v1/InsertFeedback` | Mobil Kullanıcı bildirimlerini kaydeden api. |
| `POST` | `api/MobileExtensions/v1/SaveAndroidUserApp` | Uygulama kullanıcılarının telefonlarında yer alan diğer uygulamaları kaydeder. |
| `POST` | `api/MobileExtensions/v1/SaveAndroidUserAppList` | Uygulama kullanıcılarının telefonlarında yer alan diğer uygulamaları liste şeklinde kaydeder. |
| `POST` | `api/MobileExtensions/v1/SaveLocation` | Kullanıcıların konum ve hız bilgileri kaydedilir. |
| `POST` | `api/MobileExtensions/v1/SaveUser` | Uygulamaya giriş yapmış kullanıcıların cihaz bilgileri ve uygulama özellikleri kaydedilir. |
| `POST` | `api/MobileExtensions/v1/UserFavoriteAddressList` | Kullanıcıların favori adresleri listelenir. |

### UYMPortal

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/UYMPortal/v1/Bicycle` | No documentation available. |
| `GET` | `api/UYMPortal/v1/Camera` | No documentation available. |
| `GET` | `api/UYMPortal/v1/CurrentAnnouncement` | No documentation available. |
| `GET` | `api/UYMPortal/v1/ElectChargeStations` | No documentation available. |
| `GET` | `api/UYMPortal/v1/Junction` | No documentation available. |
| `GET` | `api/UYMPortal/v1/Parking` | No documentation available. |
| `GET` | `api/UYMPortal/v1/POI` | No documentation available. |
| `GET` | `api/UYMPortal/v1/TrafficIndex_Sc1_Cont` | No documentation available. |
| `GET` | `api/UYMPortal/v2/Piers` | No documentation available. |
| `GET` | `api/UYMPortal/v4/SegmentData` | No documentation available. |

### Piers

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Piers/v1/Piers` | İskeleleri döndürür. |

### Site

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Site/v1/Contacts` | UYM Web sitesi için telefon, eposta, webadres, beyazmasa_eposta gibi iletişim bilgilerini verir |
| `GET` | `api/Site/v1/Links` | UYM Web sitesi sayfa linkleri |
| `GET` | `api/Site/v1/PLinks/{pLinkId}` | UYM Web sitesi sayfa linkleri için Üst link Id'ye göre listeleme |
| `GET` | `api/Site/v1/SocialNetworkAccounts` | UYM sosyal medya hesapları listesi |
| `GET` | `api/Site/v1/WebSiteContent/{linkId}` | UYM Web sitesi sayfa linklerinin içeriklerini verir |

### CepTrafik

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/CepTrafik/Announcement/v1/Current` | ENG: Get current announcements from server. Returns null if there's a server error.             Type : 16 Accident - 17Maintenance and Repa… |
| `GET` | `api/CepTrafik/Camera/v1/All` | Tüm kamera listesi |
| `GET` | `api/CepTrafik/Camera/v1/CameraGroup` | Gruplanmış kamera listesi |
| `GET` | `api/CepTrafik/Camera/v1/GetCamera/{camId}` | ENG: Returns the details of the specified camera. Returns null if there's a server error or request with an invalid camera ID. (Image Path… |
| `GET` | `api/CepTrafik/ElectChargeStations/v1/ElectChargeStations` | Elektrikli şarj istasyonlarını döndürür. |
| `GET` | `api/CepTrafik/HavaIstStations/v1/HavaIstStations` | Havaist duraklarını döndürür. |
| `GET` | `api/CepTrafik/Junction/v1/All` | İstanbul’daki sinyalize kavşakların listesini koordinatlı bir şekilde listeler. |
| `POST` | `api/CepTrafik/Junction/v1/InsertFailure` | Sinyal arızalarını kaydeder. |
| `POST` | `api/CepTrafik/Mobile/v1/AndroidConfiguration` | Android kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta. |
| `POST` | `api/CepTrafik/Mobile/v1/AndroidLoc` | Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (Android için) |
| `POST` | `api/CepTrafik/Mobile/v1/IphoneConfiguration` | Iphone kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta. |
| `POST` | `api/CepTrafik/Mobile/v1/IphoneLoc` | Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (IPhone için) |
| `POST` | `api/CepTrafik/Mobile/v1/SaveSession/Get/{loginId}` | Açıklama belirtilmemiş. |
| `POST` | `api/CepTrafik/Mobile/v1/SaveSession/Get?loginId={loginId}` | Açıklama belirtilmemiş. |
| `POST` | `api/CepTrafik/Mobile/v1/SaveSession/Login` | CepTrafik uygulamasında her client oturumu açıldığında kayıt atar. Yoğun kullanımlı günlerde yükü görmek için eklendi |
| `POST` | `api/CepTrafik/Mobile/v1/SaveSession/Logout` | CepTrafik uygulamasında client oturumu kapatma |
| `GET` | `api/CepTrafik/MobileExtensions/v1/ActiveIcon` | Aktif ikon bilgisini döndürür. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/DetailedUsersInformationInsert` | Kullanıcıların detaylı bilgilerini kaydeden procedure. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/FavoriteAddressDelete` | Kullanıcıların favori adresleri silinir. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/FavoriteAddressInsert` | Kullanıcıların favori adresleri eklenir. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/HearingImpairedInsert` | İşitme Engelli Kullanıcı bilgileri kaydedilir. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/HearingImpairedStatus` | İşitme engelli kullanıcıların durumunu kontrol etmek için kullanılmaktadır. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/InsertFeedback` | Mobil Kullanıcı bildirimlerini kaydeden api. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/SaveAndroidUserApp` | Uygulama kullanıcılarının telefonlarında yer alan diğer uygulamaları kaydeder. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/SaveAndroidUserAppList` | Uygulama kullanıcılarının telefonlarında yer alan diğer uygulamaları liste şeklinde kaydeder. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/SaveLocation` | Kullanıcıların konum ve hız bilgileri kaydedilir. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/SaveUser` | Uygulamaya giriş yapmış kullanıcıların cihaz bilgileri ve uygulama özellikleri kaydedilir. |
| `POST` | `api/CepTrafik/MobileExtensions/v1/UserFavoriteAddressList` | Kullanıcıların favori adresleri listelenir. |
| `GET` | `api/CepTrafik/Park/v1/GetApsInfos` | Trafik Müdürlüğünün sahada kullandığı APS'lerdeki otopark doluluk bilgilerini verir. |
| `GET` | `api/CepTrafik/Park/v1/GetParkInfo/{flag}/{id}` | Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir. |
| `GET` | `api/CepTrafik/Park/v1/GetParkInfos/{flag}/{id}` | Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir. |
| `GET` | `api/CepTrafik/Park/v2/GetParkInfo/{flag}/{id}` | Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir. |
| `GET` | `api/CepTrafik/Piers/v1/Piers` | İskeleleri döndürür. |
| `GET` | `api/CepTrafik/TrafficData/v1/SegmentData` | Trafik yoğunluk haritasında bulunan yollara ait olan anlık ortalama hız bilgilerini döndürür. |
| `GET` | `api/CepTrafik/TrafficData/v1/Segments` | Açıklama belirtilmemiş. |
| `GET` | `api/CepTrafik/TrafficData/v1/TrafficIndex` | İstanbul geneli için trafik indeks değerini döndürür. 1-99 arasında değişen bir değer olup, 1=>Açık Trafik, 99=>Çok Yoğun Trafik anlamına g… |
| `GET` | `api/CepTrafik/TrafficData/v1/TrafficIndex_Sc1_Cont` | İstanbul Genel Trafik İndeks'ini 3 kırılımda verir: "":Genel, "An":Anadolu, "Av":Avrupa |
| `GET` | `api/CepTrafik/TrafficData/v2/TrafficIndex` | İstanbul Genel Trafik İndeks'ini 3 kırılımda verir: "":Genel, "An":Anadolu, "Av":Avrupa |
| `GET` | `api/CepTrafik/VmsData/v1/BridgesStatusForMobile` | CepTrafik köprü güzergahlarının trafik durumu bilgisini döndürür.             GrupId:1--> 15 Temmuz Şehitler Köprüsü (Avrupa --> Anadolu)… |

### HavaistStations

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/HavaIstStations/v1/HavaIstStations` | Havaist duraklarını döndürür. |

### Announcement

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Announcement/v1/Current` | ENG: Get current announcements from server. Returns null if there's a server error.             Type : 16 Accident - 17Maintenance and Repa… |
| `POST` | `api/Announcement/v1/SignalFailureWrite` | Açıklama belirtilmemiş. |
| `GET` | `api/Announcement/v1/Transportation/IETT/VehicleInfo` | No documentation available. |
| `GET` | `api/Announcement/v1/Transportation/IETT/{lang}` | No documentation available. |
| `GET` | `api/Announcement/v1/Transportation/METRO/{lang}` | No documentation available. |

### Scm

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Scm/TrafficData/v1/ComTrafficIndex` | 1 önceki günün son 4 hafta içerisindeki trafik index değeri geçen yılla birlikte verilir. Toplamda 8 index değeri basılmış olur. 1-99 arası… |

### BTCongestion

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/BTCongestion/v1/Alarms` | TR : Bluetooth sensörlerin tespit ettiği trafik sıkışıklıklarını (yoğun trafik olan güzergahları) döndürür. |

### Sbgm

| Method | Path | Açıklama |
| --- | --- | --- |
| `POST` | `api/Sbgm/v1/InsertAccidentInfo` | Sbgm Mobil Kaza Tutanağı doldurulduğu anda TKM Duyurular tablosuna kayıt etmek için kullanılır. |

### WeatherData

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/WeatherData/v1/AllStationsData` | AKOM meteoroloji uspGetAllStationsData storeprocedure kullanarak,data döndürüyor.             5 Dakikalık Cache |

### Junction

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Junction/v1/All` | ENG:             TR:İstanbul’daki sinyalize kavşakların listesini koordinatlı bir şekilde listeler. |
| `GET` | `api/Junction/v1/DashJunctionCount` | ENG:             TR:İstanbul’daki arızalı kavşakları arıza türlerine göre getirir. |
| `POST` | `api/Junction/v1/InsertFailure` | Sinyal arızalarını kaydeder. |
| `GET` | `api/Junction/v1/JunctionFailure` | ENG:             TR:İstanbul’daki arızalı kavşakları arıza türlerine göre getirir. |
| `GET` | `api/Junction/v1/JunctionFailureLevelCount` | ENG:             TR:İstanbul’daki arızalı kavşakları arıza seviyelerine göre sayıları ile getirir. |
| `GET` | `api/Junction/v1/JunctionMod` | ENG:             TR:İstanbul’daki sinyalize kavşakların çalışma modlarına göre getirir. |
| `GET` | `api/Junction/v2/All` | ENG:             TR:İstanbul’daki sinyalize kavşakların listesini koordinatlı bir şekilde listeler. |
| `GET` | `api/Junction/v3/All` | ENG:             TR:İstanbul’daki sinyalize kavşakların listesini koordinatlı bir şekilde listeler. BigData için |

### General

| Method | Path | Açıklama |
| --- | --- | --- |
| `POST` | `api/General/v1/CheckUser` | Yoğunluk Haritası 15 dakikalık süreyi uzatmak için kullanılmaktadır. |
| `GET` | `api/General/v1/Districts` | İlçe listesi |
| `GET` | `api/General/v1/ServerIP` | İlçe listesi |

### EurasiaTunnel

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/EurasiaTunnel/v1/GetTravelTimes` | Yalnızca Avrasya Tünel Rotaları için seyahat sürelerini verir. |
| `POST` | `api/EurasiaTunnel/v1/SaveEvent` | Event Bilgilerini Kaydeder, Event durumları değiştikçe çağrılmalıdır. |
| `POST` | `api/EurasiaTunnel/v1/SaveObservation` | Sensör Gözlemlerini(Observation) kaydeder. |

### CleanEnergy

| Method | Path | Açıklama |
| --- | --- | --- |
| `POST` | `api/CleanEnergy/v1/CsvContent` | No documentation available. |

### CitixController

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Citix/v1/BridgesStatus` | No documentation available. |
| `GET` | `api/Citix/v1/Camera` | No documentation available. |
| `GET` | `api/Citix/v1/CurrentAnnouncement` | No documentation available. |
| `GET` | `api/Citix/v1/DMPTravelTimes` | No documentation available. |
| `GET` | `api/Citix/v1/Parking` | No documentation available. |
| `GET` | `api/Citix/v1/TrafficIndex` | No documentation available. |

### Atak

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Atak/JunctionTTU/v1/tbOccupanciesData` | No documentation available. |
| `GET` | `api/Atak/JunctionTTU/v1/tbVolumesData` | No documentation available. |
| `GET` | `api/Atak/v1/tbOccupanciesData` | No documentation available. |
| `GET` | `api/Atak/v1/tbVolumesData` | No documentation available. |

### Survey

| Method | Path | Açıklama |
| --- | --- | --- |
| `POST` | `api/Survey/v1/Save` | UYM için hazırlanan anketlerde kullanılan oyları kaydetmek için kullanılır. |

### Camera

| Method | Path | Açıklama |
| --- | --- | --- |
| `GET` | `api/Camera/v1/All` | ENG: Get all camera list from server.Returns null if there's a server error.             TR: Tüm kamera listesini döndürür. Sunucu  hatası… |
| `GET` | `api/Camera/v1/All/{id}` | ENG: Returns the details of the specified camera. Returns null if there's a server error or request with an invalid camera ID.… |
| `GET` | `api/Camera/v1/Camera` | No documentation available. |
| `GET` | `api/Camera/v1/CameraGroup` | Gruplanmış kamera listesi |
| `POST` | `api/Camera/v1/CropFactorSave` | Açıklama belirtilmemiş. |
| `GET` | `api/Camera/v1/DashCameraCount` | No documentation available. |
| `GET` | `api/Camera/v1/Details` | Tüm kameraları donanımsal özellikleri ile birlikte listeler |
| `GET` | `api/Camera/v1/GetCamera/{camId}` | ENG: Returns the details of the specified camera. Returns null if there's a server error or request with an invalid camera ID. (Image Path… |
| `GET` | `api/Camera/v1/GetDetail/{cameraNo}` | Belli bir kamerayı donanımsal özellikleri ile birlikte listeler |
| `GET` | `api/Camera/v2/Details` | Tüm State'leri listeler |

## Detaylı kullanım

## SystemFailures

### `POST /api/SystemFailures/v1/InsertSystemFailure`

- Açıklama: SATA yazılımından gelen arızaların kayıt işlemini yapar.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/SystemFailures/v1/InsertSystemFailure`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-SystemFailures-v1-InsertSystemFailure>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FailureInsertResponse`
- Yanıt alanları: `Durum` (integer), `SATAArizaId` (integer), `ITSArizaId` (integer), `Mesaj` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/SystemFailures/v1/InsertSystemFailure' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/SystemFailures/v1/InsertSystemFailureResponse`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-SystemFailures-v1-InsertSystemFailureResponse>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FailureAnswerResponse`
- Yanıt alanları: `Durum` (integer), `ITSArizaId` (integer), `Mesaj` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/SystemFailures/v1/InsertSystemFailureResponse' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/gis/v1/camera`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-gis-v1-camera>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AdsızModel`
- Yanıt alanları: Yok.
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/gis/v1/camera'
```
- Örnek yanıt:
```json
"sample string 1"
```

## Park

### `GET /api/Park/v1/DashParkingLotCount`

- Açıklama: APS'de kayıtlı toplam otopark sayısı
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/DashParkingLotCount`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-DashParkingLotCount>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Result_INT`
- Yanıt alanları: `Res` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/DashParkingLotCount'
```
- Örnek yanıt:
```json
{
  "Res": 1
}
```

### `GET /api/Park/v1/DashParkingLotSortCount`

- Açıklama: No documentation available.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/DashParkingLotSortCount`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-DashParkingLotSortCount>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkSortCount[]`
- Yanıt alanları: `ParkSort` (string): Parking Sort Name, `Capacity` (integer): Capacity of the parking sort, `Available` (integer): Available of the parking sort
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/DashParkingLotSortCount'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetApsInfos`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-GetApsInfos>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkingAps[]`
- Yanıt alanları: `PApsId` (integer), `PApsName` (string), `PApsLatitude` (string), `PApsLongitude` (string), `PLotsIds` (string), `PApsImage` (string), `ApsPLots` (Collection of ParkInfo)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetApsInfos'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetBeyogluParkInfos`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-GetBeyogluParkInfos>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkInfo[]`
- Yanıt alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetBeyogluParkInfos'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetParkInfo/{flag}/{id}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-GetParkInfo-flag-id>
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkInfo[]`
- Yanıt alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetParkInfo/<flag>/<id>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetParkInfos/{flag}/{id}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v1-GetParkInfos-flag-id>
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkInfo[]`
- Yanıt alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/GetParkInfos/<flag>/<id>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v1/SetParkInfo/{Id}/{Availability}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Park-v1-SetParkInfo-Id-Availability>
- Yol/query parametreleri: `Id` (integer, Required), `Availability` (integer, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `AdsızModel`
- Yanıt alanları: Yok.
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Park/v1/SetParkInfo/<Id>/<Availability>'
```
- Örnek yanıt:
```json
"sample string 1"
```

### `GET /api/Park/v2/GetParkInfo/{flag}/{id}`

- Açıklama: Trafik Müdürlüğünün anlaşmalı olduğu otoparkların doluluk bilgilerini verir.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Park/v2/GetParkInfo/{flag}/{id}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Park-v2-GetParkInfo-flag-id>
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkInfo_v2[]`
- Yanıt alanları: `PLotSort` (string), `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Park/v2/GetParkInfo/<flag>/<id>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/Anaylze/v1/VehicleDestination/{idsen}/{begin_EPOC}/{end_EPOC}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-Anaylze-v1-VehicleDestination-idsen-begin_EPOC-end_EPOC>
- Yol/query parametreleri: `idsen` (integer, Required), `begin_EPOC` (integer, Required), `end_EPOC` (integer, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `Analyze_VehicleDestination[]`
- Yanıt alanları: `idsen` (integer): Aracın başlangıç sensöründen gittiği sensör, `sendesc` (string): Sensör Noktası Açıklaması, `all_vcount` (integer): hedef sensördeki tüm araç sayımı, `tracked_vcount` (integer): hedef sensörde, başlangıç sensöründe de varolan araçların sayımı, `rate` (decimal number): hedef sensörde, başlangıç sensöründe de varolan araçların oranı, `lat` (string), `lon` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/Anaylze/v1/VehicleDestination/<idsen>/<begin_EPOC>/<end_EPOC>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/Anaylze/v1/VehicleTracking/{idsen}/{begin_EPOC}/{end_EPOC}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-Anaylze-v1-VehicleTracking-idsen-begin_EPOC-end_EPOC>
- Yol/query parametreleri: `idsen` (integer, Required), `begin_EPOC` (integer, Required), `end_EPOC` (integer, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `Analyze_VehicleDestination[]`
- Yanıt alanları: `idsen` (integer): Aracın başlangıç sensöründen gittiği sensör, `sendesc` (string): Sensör Noktası Açıklaması, `all_vcount` (integer): hedef sensördeki tüm araç sayımı, `tracked_vcount` (integer): hedef sensörde, başlangıç sensöründe de varolan araçların sayımı, `rate` (decimal number): hedef sensörde, başlangıç sensöründe de varolan araçların oranı, `lat` (string), `lon` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/Anaylze/v1/VehicleTracking/<idsen>/<begin_EPOC>/<end_EPOC>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Bicycle`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Bicycle>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Bicycle`
- Yanıt alanları: `BR_Data` (Collection of BicycleRoad), `BS_Data` (Collection of BicycleStation)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Bicycle'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/BridgesStatus`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-BridgesStatus>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `BridgeRouteStatusModel[]`
- Yanıt alanları: `RouteId` (integer), `RouteName` (string), `Status` (string), `OrderNo` (integer), `GroupId` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/BridgesStatus'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Camera`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Camera>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraGroupedList[]`
- Yanıt alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Camera'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Camera/URL`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Camera-URL>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraURL[]`
- Yanıt alanları: `ID` (integer), `Name` (string), `XCoord` (string), `YCoord` (string), `VideoURL` (string), `VideoURL_rtsp` (string), `VideoURL_app_live` (string), `VideoURL_app_hls` (string), `VideoURL_streamlock` (string), `VideoURL_ibbstream` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Camera/URL'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/CurrentAnnouncement`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-CurrentAnnouncement>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AnnouncementModel[]`
- Yanıt alanları: `Id` (integer), `Metin` (string), `MetinIng` (string), `Tipi` (integer), `BitisTarihi` (date), `Link` (string), `Baslik` (string), `BaslikIng` (string), `Koordinat` (string), `Oncelik` (integer), `KameraId` (integer), `GirisTarihi` (date), `xKoordinat` (string), `yKoordinat` (string), `TimeDiff` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/CurrentAnnouncement'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/ElectChargeStations`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-ElectChargeStations>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ElectChargeStationsModel[]`
- Yanıt alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string), `Weekdays` (string), `Weekend` (string), `StationModel` (string), `SocketInfo` (string), `Address` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/ElectChargeStations'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/HavaIstStations`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-HavaIstStations>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `HavaIstStationsModel[]`
- Yanıt alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/HavaIstStations'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Junction`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Junction>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `JunctionModel[]`
- Yanıt alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `CountyId` (integer): JunctionNo : Sinyalize Ilce Numarası, `JunctionType` (integer): JunctionType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Junction'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/MultiRouting`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-IntensityMap-v1-MultiRouting>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `TravelTimeMultipleRequestModel`
- İstek gövdesi alanları: `CommaSeperatedSensorList` (string, Required), `Method` (byte, Required), `Quality` (byte, Required)
- Yanıt modeli: `TravelTimeModel`
- Yanıt alanları: `RouteList` (Collection of TravelTimeRoute), `GeoList` (Collection of TravelTimeSegment), `Color` (string), `Distance` (decimal number), `TravelTime` (decimal number)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/MultiRouting' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "CommaSeperatedSensorList": "sample string 1",
  "Method": 64,
  "Quality": 64
}'
```
- Örnek istek gövdesi:
```json
{
  "CommaSeperatedSensorList": "sample string 1",
  "Method": 64,
  "Quality": 64
}
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Parking`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Parking>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkingInfo[]`
- Yanıt alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotSortId` (integer), `PLotSort` (string), `PLotIspark` (boolean), `PLotComp` (string), `PLotIsOpen` (boolean), `PLotAvailableCount` (integer), `PLotAvailableRate` (integer), `PLotUpToDateStatus` (integer), `PLotDate` (date), `PLotLatitude` (string), `PLotLongitude` (string), `PLotLocation` (string), `PLotAddress` (string), `PLotDistrict` (string), `PWorkingHours` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Parking'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/POI`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-POI>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `POI[]`
- Yanıt alanları: `ID` (integer), `TI` (integer), `TN` (string), `PN` (string), `LT` (string), `LN` (string), `PU` (string), `SM` (boolean)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/POI'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/RouteTravelTime`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-RouteTravelTime>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `RouteTravelTime[]`
- Yanıt alanları: `DirectionId` (integer), `Direction` (string), `WayList` (Collection of WayItem)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/RouteTravelTime'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Routing`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-IntensityMap-v1-Routing>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `TravelTimeRequestModel`
- İstek gövdesi alanları: `Source` (integer, Required), `Destination` (integer, Required), `Method` (byte, Required), `Quality` (byte, Required)
- Yanıt modeli: `TravelTimeModel`
- Yanıt alanları: `RouteList` (Collection of TravelTimeRoute), `GeoList` (Collection of TravelTimeSegment), `Color` (string), `Distance` (decimal number), `TravelTime` (decimal number)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Routing' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Source": 1,
  "Destination": 2,
  "Method": 64,
  "Quality": 64
}'
```
- Örnek istek gövdesi:
```json
{
  "Source": 1,
  "Destination": 2,
  "Method": 64,
  "Quality": 64
}
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/StaticLayerVersion/{slCode}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-StaticLayerVersion-slCode>
- Yol/query parametreleri: `slCode` (string, Default value is)
- İstek gövdesi: Yok.
- Yanıt modeli: `StaticLayerVersion[]`
- Yanıt alanları: `VersionNo` (integer), `TypeCode` (string), `VersionDate` (date)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/StaticLayerVersion/<slCode>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/StaticLayerVersion?slCode={slCode}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-StaticLayerVersion_slCode>
- Yol/query parametreleri: `slCode` (string, Default value is)
- İstek gövdesi: Yok.
- Yanıt modeli: `StaticLayerVersion[]`
- Yanıt alanları: `VersionNo` (integer), `TypeCode` (string), `VersionDate` (date)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/StaticLayerVersion?slCode=<slCode>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/ToolBoxMetric`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-IntensityMap-v1-ToolBoxMetric>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AdsızModel`
- Yanıt alanları: Yok.
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/ToolBoxMetric' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "ToolClickID": 1,
  "ToolID": 2,
  "ClickerSource": "sample string 3",
  "LayoutMode": 64,
  "ClickDate": "2026-03-11T17:15:49.9652264+03:00"
}'
```
- Örnek istek gövdesi:
```json
{
  "ToolClickID": 1,
  "ToolID": 2,
  "ClickerSource": "sample string 3",
  "LayoutMode": 64,
  "ClickDate": "2026-03-11T17:15:49.9652264+03:00"
}
```
- Örnek yanıt:
```json
"sample string 1"
```

### `GET /api/IntensityMap/v1/TravelTimePoint`

- Açıklama: No documentation available.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/TravelTimePoint`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-TravelTimePoint>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `BTSensor[]`
- Yanıt alanları: `SN` (integer), `SA` (string), `IC` (string), `LT` (string), `LN` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/TravelTimePoint'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsData/{vmsNo}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-VmsData-vmsNo>
- Yol/query parametreleri: `vmsNo` (integer, Default value is 0)
- İstek gövdesi: Yok.
- Yanıt modeli: `VmsStatusModel[]`
- Yanıt alanları: `SYSTEM_ID` (integer), `COLUMN_NUMBER` (integer), `SYSTEM_NAME_VIEW` (string), `SYSTEM_NO` (integer), `ROUTE_NAME_VMS` (string), `TRF_MSG_ID` (integer), `CONG_CODE` (integer), `VIRTUAL_SEG_ID` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsData/<vmsNo>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsData?vmsNo={vmsNo}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-VmsData_vmsNo>
- Yol/query parametreleri: `vmsNo` (integer, Default value is 0)
- İstek gövdesi: Yok.
- Yanıt modeli: `VmsStatusModel[]`
- Yanıt alanları: `SYSTEM_ID` (integer), `COLUMN_NUMBER` (integer), `SYSTEM_NAME_VIEW` (string), `SYSTEM_NO` (integer), `ROUTE_NAME_VMS` (string), `TRF_MSG_ID` (integer), `CONG_CODE` (integer), `VIRTUAL_SEG_ID` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsData?vmsNo=<vmsNo>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsPoint`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-VmsPoint>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `VmsPoint[]`
- Yanıt alanları: `VmsNo` (string), `VmsName` (string), `Lat` (string), `Long` (string), `District` (string), `Road` (string), `Width` (integer), `Height` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/VmsPoint'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Weather`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v1-Weather>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `WeatherDataModel[]`
- Yanıt alanları: `ISTASYON_ID` (integer), `ISTASYON_ADI` (string), `LAT` (string), `LONG` (string), `RUZGAR_HIZI` (integer), `HAVA_SICAKLIGI` (decimal number), `HISSEDILEN_SICAKLIK` (decimal number), `ASFALT_SICAKLIGI` (decimal number), `ASFALT_DURUMU` (integer), `ASFALT_DURUMUTR` (string), `ASFALT_DURUMUEN` (string), `DONMA_SICAKLIGI` (integer), `BAGIL_NEM` (integer), `GORUS_UZAKLIGI` (integer), `GUNLUK_TOPLAM_YAGIS` (integer), `HAVA_DURUMU_ID` (integer), `HAVA_DURUMU` (string), `RUZGAR_YONU` (decimal number), `ZAMAN` (date)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v1/Weather'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/Piers`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v2-Piers>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `PiersModel_v2[]`
- Yanıt alanları: `ID` (integer), `PC` (integer), `OP` (string), `NM` (string), `AH` (string), `AD` (string), `LT` (string), `LN` (string), `CF` (boolean), `MR` (boolean), `MN` (boolean), `FR` (boolean), `PR` (boolean), `PL` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/Piers'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/VmsData/{dspno}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v2-VmsData-dspno>
- Yol/query parametreleri: `dspno` (integer, Default value is 0)
- İstek gövdesi: Yok.
- Yanıt modeli: `VMSDisplayMessageItem[]`
- Yanıt alanları: `Id` (integer), `Code` (string), `Name` (string), `TypeId` (integer), `TypeName` (string), `MsgOrder` (string), `ImageBase64` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/VmsData/<dspno>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/VmsPoint`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-IntensityMap-v2-VmsPoint>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `VMSDisplayItem[]`
- Yanıt alanları: `Id` (integer), `Code` (string), `Name` (string), `X` (string), `Y` (string), `TypeId` (integer), `TypeName` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/IntensityMap/v2/VmsPoint'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/EDS/v1/DashEdsCount`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-EDS-v1-DashEdsCount>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Result_INT`
- Yanıt alanları: `Res` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/EDS/v1/DashEdsCount'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/YDSData/v1/YDSData/{displayID}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-YDSData-v1-YDSData-displayID>
- Yol/query parametreleri: `displayID` (integer, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `YDSDisplayDataModel[]`
- Yanıt alanları: `Count` (integer), `DisplayId` (integer), `Message` (string), `TravelTime` (string), `VSegID` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/YDSData/v1/YDSData/<displayID>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/DashSensorCount`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-SensorStatistic-v1-DashSensorCount>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Result_INT`
- Yanıt alanları: `Res` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/DashSensorCount'
```
- Örnek yanıt:
```json
{
  "Res": 1
}
```

### `GET /api/SensorStatistic/v1/RtmsData`

- Açıklama: Bu servis Rtms numarası ve tarihe göre filtrelenmiş şekilde RTMS verilerini getirir.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/RtmsData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-SensorStatistic-v1-RtmsData>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `RTMSDataRequestModel`
- İstek gövdesi alanları: `RtmsNo` (integer, Required), `startDate` (date, Required), `endDate` (date, Required)
- Yanıt modeli: `RtmsDataModel[]`
- Yanıt alanları: `MsgTime` (date), `RtmsNo` (integer), `S1` (integer), `S2` (integer), `S3` (integer), `S4` (integer), `S5` (integer), `S6` (integer), `S7` (integer), `S8` (integer), `SGelisGraf` (integer), `SGidisGraf` (integer), `V1` (integer), `V2` (integer), `V3` (integer), `V4` (integer), `V5` (integer), `V6` (integer), `V7` (integer), `V8` (integer), `O1` (integer), `O2` (integer), `O3` (integer), `O4` (integer), `O5` (integer), `O6` (integer), `O7` (integer), `O8` (integer), `OGelisGraf` (integer), `OGidisGraf` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/RtmsData'
```
- Örnek istek gövdesi:
```json
{
  "RtmsNo": 1,
  "startDate": "2026-03-11T17:15:50.0277205+03:00",
  "endDate": "2026-03-11T17:15:50.0277205+03:00"
}
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/SensorData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-SensorStatistic-v1-SensorData>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AdsızModel`
- Yanıt alanları: Yok.
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/SensorStatistic/v1/SensorData' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Ui5d": "sample string 1",
  "Pi1he": "sample string 2",
  "SensorNo": "sample string 3",
  "StartDate": "sample string 4"
}'
```
- Örnek istek gövdesi:
```json
{
  "Ui5d": "sample string 1",
  "Pi1he": "sample string 2",
  "SensorNo": "sample string 3",
  "StartDate": "sample string 4"
}
```
- Örnek yanıt:
```json
"sample string 1"
```

## UDBDashboard

### `GET /api/UDBDashboard/Camera/v1/All`

- Açıklama: No documentation available.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Camera/v1/All`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Camera-v1-All>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraBase[]`
- Yanıt alanları: `ID` (integer): Camera ID, `Name` (string): Camera Name (Location), `XCoord` (string): X Coordinate of camera, `YCoord` (string): Y Coordinate of camera, `VideoURL` (string): Live camera Video URL, `SSLVideoURL` (string): GroupID, `GroupId` (string): GroupID
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Camera/v1/All'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Cekici/v1/CekiciCalismalari`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Cekici-v1-CekiciCalismalari>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CekiciCalismalariModel[]`
- Yanıt alanları: `DuyuruBaslik` (string), `XCoor` (string), `YCoor` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Cekici/v1/CekiciCalismalari'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Duyuru/v1/KazaBilgileri`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Duyuru-v1-KazaBilgileri>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `KazaBilgileriModel[]`
- Yanıt alanları: `DuyuruId` (integer), `DuyuruBaslik` (string), `GirisTarihi` (date), `XCoor` (string), `YCoor` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Duyuru/v1/KazaBilgileri'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Envanter/v1/EnvanterSayilari`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Envanter-v1-EnvanterSayilari>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `EnvanterSayilariModel[]`
- Yanıt alanları: `Sayi` (string), `Ekipman` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Envanter/v1/EnvanterSayilari'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Junction/v1/All`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Junction-v1-All>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `JunctionModel[]`
- Yanıt alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `CountyId` (integer): JunctionNo : Sinyalize Ilce Numarası, `JunctionType` (integer): JunctionType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Junction/v1/All'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Tunnel/v1/TunnelIsletme`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UDBDashboard-Tunnel-v1-TunnelIsletme>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `TunelIsletmeModel[]`
- Yanıt alanları: `ID` (integer), `Name` (string), `Type` (string), `Geom` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UDBDashboard/Tunnel/v1/TunnelIsletme'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/ElectChargeStations/v1/ElectChargeStations`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-ElectChargeStations-v1-ElectChargeStations>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ElectChargeStationsModel[]`
- Yanıt alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string), `Weekdays` (string), `Weekend` (string), `StationModel` (string), `SocketInfo` (string), `Address` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/ElectChargeStations/v1/ElectChargeStations'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Chart/v1/TrafficIndexBarChart`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Chart-v1-TrafficIndexBarChart>
- Help detail durumu: `HTTP Error 500: Internal Server Error`
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: Belirtilmemiş.
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Chart/v1/TrafficIndexBarChart'
```

### `GET /api/Chart/v1/TrafficIndexIndicator`

- Açıklama: Trafik indeksin o gününü önceki hafta aynı gün ile karşılaştırarak grafiğini PNG formatında verir
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Chart/v1/TrafficIndexIndicator`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Chart-v1-TrafficIndexIndicator>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `HttpResponseMessage`
- Yanıt alanları: `Version` (Version), `Content` (HttpContent), `StatusCode` (HttpStatusCode), `ReasonPhrase` (string), `Headers` (Collection of             Object), `RequestMessage` (HttpRequestMessage), `IsSuccessStatusCode` (boolean)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Chart/v1/TrafficIndexIndicator'
```

## Travel

### `GET /api/Travel/v1/GetAll/{minute}`

- Açıklama: Belirlenmiş olan güzergahların (tabloda tutulmaktadır) seyahat sürelerini aldığı parametre kadar güncel olacak şekilde döndürür.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetAll/{minute}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Travel-v1-GetAll-minute>
- Yol/query parametreleri: `minute` (integer, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `TravelModel[]`
- Yanıt alanları: `DirectionId` (integer), `WayId` (integer), `Id` (integer), `Distance` (decimal number), `TravelTime` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetAll/<minute>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetFCDTravelTime/{msgid}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Travel-v1-GetFCDTravelTime-msgid>
- Yol/query parametreleri: `msgid` (string, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `FcdRouteTravelTimeResult`
- Yanıt alanları: `Date` (date), `TravelTime` (integer): Saniye cinsinden seyahat süresi, `SystemMessageId` (integer): SYSTEM_TYPE değeri 5 ise DisplayMessageId; 2 ise TRF_MSG_ID, `SystemId` (integer): SYSTEM_TYPE değeri 5 ise YDSNo; 2 ise SYSTEM_ID, `MessageId` (integer): SYSTEM_TYPE değeri 5 ise MESSAGE_ID; 2 ise RouteId, `SystemType` (byte): 5:YDS; 2:VMS;, `RouteName` (string), `RouteLength` (integer), `RouteFrom` (string), `RouteTo` (string), `ColorClassId` (integer), `ColorClassName` (string), `MsgIdentifier` (string): SystemType,, SystemMessageId, SystemId, MessageId birleşiminden oluşan benzersiz rota IDsi
            Format: R[3][4][4][4]
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetFCDTravelTime/<msgid>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetFCDTravelTimes/{type}?sid={sid}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Travel-v1-GetFCDTravelTimes-type_sid>
- Yol/query parametreleri: `type` (byte, Required): 101: Avrasya Tünel
                    102: YSS Köprüsü, `sid` (integer)
- İstek gövdesi: Yok.
- Yanıt modeli: `FcdRouteTravelTimeResult[]`
- Yanıt alanları: `Date` (date), `TravelTime` (integer): Saniye cinsinden seyahat süresi, `SystemMessageId` (integer): SYSTEM_TYPE değeri 5 ise DisplayMessageId; 2 ise TRF_MSG_ID, `SystemId` (integer): SYSTEM_TYPE değeri 5 ise YDSNo; 2 ise SYSTEM_ID, `MessageId` (integer): SYSTEM_TYPE değeri 5 ise MESSAGE_ID; 2 ise RouteId, `SystemType` (byte): 5:YDS; 2:VMS;, `RouteName` (string), `RouteLength` (integer), `RouteFrom` (string), `RouteTo` (string), `ColorClassId` (integer), `ColorClassName` (string), `MsgIdentifier` (string): SystemType,, SystemMessageId, SystemId, MessageId birleşiminden oluşan benzersiz rota IDsi
            Format: R[3][4][4][4]
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetFCDTravelTimes/<type>?sid=<sid>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetTravelTime`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Travel-v1-GetTravelTime>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `TravelTimeRequestModel`
- İstek gövdesi alanları: `Source` (integer, Required), `Destination` (integer, Required), `Method` (byte, Required), `Quality` (byte, Required)
- Yanıt modeli: `TravelTimeModel`
- Yanıt alanları: `RouteList` (Collection of TravelTimeRoute), `GeoList` (Collection of TravelTimeSegment), `Color` (string), `Distance` (decimal number), `TravelTime` (decimal number)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Travel/v1/GetTravelTime' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Source": 1,
  "Destination": 2,
  "Method": 64,
  "Quality": 64
}'
```
- Örnek istek gövdesi:
```json
{
  "Source": 1,
  "Destination": 2,
  "Method": 64,
  "Quality": 64
}
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/ComTrafficIndex`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-ComTrafficIndex>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ComparativeTrafficIndex[]`
- Yanıt alanları: `Time` (string): Saat, `Day` (string): Gün, `TI_A_H1` (integer): Bir önceki sene 3 hafta öncesinin trafik indeksi, `TI_A_H2` (integer): Bir önceki sene 2 hafta öncesinin trafik indeksi, `TI_A_H3` (integer): Bir önceki sene 3 hafta öncesinin trafik indeksi, `TI_A_H4` (integer): Bir önceki senenin trafik indeksi, `TI_H1` (integer): 1 hafta öncesinin trafik indeksi, `TI_H2` (integer): 2 hafta öncesinin trafik indeksi, `TI_H3` (integer): 3 hafta öncesinin trafik indeksi, `Yesterday` (integer): Bir önceki günün trafik indeksi
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/ComTrafficIndex'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/ComTrafficIndexWeekDayNo/{DayNo}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-ComTrafficIndexWeekDayNo-DayNo>
- Yol/query parametreleri: `DayNo` (byte, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `TrafficIndexWeekDayNo[]`
- Yanıt alanları: `TrafficIndex` (byte), `TrafficIndexDate` (date), `TrafficIndexHour` (string), `DayNo` (byte): Haftanın günü. Pazartesi: 1
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/ComTrafficIndexWeekDayNo/<DayNo>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/FusedDataManuelSpeed`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-FusedDataManuelSpeed>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FusedDataManuelSpeed[]`
- Yanıt alanları: `VSegDirId` (integer), `Speed` (integer), `ExpirationDate` (date)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/FusedDataManuelSpeed'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/IntensityMap/ScreenShot`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-IntensityMap-ScreenShot>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `HttpResponseMessage`
- Yanıt alanları: `Version` (Version), `Content` (HttpContent), `StatusCode` (HttpStatusCode), `ReasonPhrase` (string), `Headers` (Collection of             Object), `RequestMessage` (HttpRequestMessage), `IsSuccessStatusCode` (boolean)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/IntensityMap/ScreenShot'
```

### `GET /api/TrafficData/v1/PredictionsData`

- Açıklama: TDMS veritabanındaki uspLatestPredictionsSelect storeprocedure kullanarak,data döndürüyor. Segmentlerin 15-30-45-60 dakika sonraki tahmini Segment No, Hız, Renk olarak geri döndürür.
            5 Dakikalık Cache
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/PredictionsData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-PredictionsData>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `PredictionDataModel[]`
- Yanıt alanları: `VSegID` (integer): Segmentin ID, `Prediction` (integer), `Q` (integer), `ColorIndex` (integer): Segmentin Hız rengi
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/PredictionsData'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/SegmentBlocking`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-SegmentBlocking>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FusedDataException[]`
- Yanıt alanları: `SegmentID` (integer), `vSegID` (integer), `vSegDir` (byte), `Speed` (byte), `Description` (string), `Deployment` (date), `Expiration` (date)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/SegmentBlocking'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/SegmentData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-SegmentData>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `TrafficDataModel[]`
- Yanıt alanları: `Src` (string), `SegmentID` (integer): Segment ID, `Speed` (integer): Segmentin Hız, `ColorIndex` (integer): Segmentin Hız rengi, `LastDate` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/SegmentData'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/Segments`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-Segments>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `VSegmentResponse[]`
- Yanıt alanları: `segID` (integer), `vSegID` (integer), `segGeometry` (string), `ZoomLevels` (Collection of integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/Segments'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TrafficIndex>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseTrafficIndex`
- Yanıt alanları: `Result` (byte)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex'
```
- Örnek yanıt:
```json
{
  "Result": 64
}
```

### `GET /api/TrafficData/v1/TrafficIndex_Sc1_Cont`

- Açıklama: İstanbul Genel Trafik İndeks'ini 3 kırılımda döndürür: "":Genel, "An":Anadolu, "Av":Avrupa
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex_Sc1_Cont`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TrafficIndex_Sc1_Cont>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseTrafficIndex_Sc1_Cont`
- Yanıt alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex_Sc1_Cont'
```
- Örnek yanıt:
```json
{
  "TI": 64,
  "TI_An": 64,
  "TI_Av": 64
}
```

### `GET /api/TrafficData/v1/TrafficIndex_Sc1_Cont_Report`

- Açıklama: Özel bir veri setinden veri çekerek YHarita6'ya sunar. Geçmiş görünümleri elde etmede kullanılıyor
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex_Sc1_Cont_Report`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TrafficIndex_Sc1_Cont_Report>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseTrafficIndex_Sc1_Cont`
- Yanıt alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndex_Sc1_Cont_Report'
```
- Örnek yanıt:
```json
{
  "TI": 64,
  "TI_An": 64,
  "TI_Av": 64
}
```

### `GET /api/TrafficData/v1/TrafficIndexHistory/{day}/{period}`

- Açıklama: Trafik indeks değerinin geçmişini döndürür. 1-99 arasında değişen bir değer olup, 1=>Açık Trafik, 99=>Çok Yoğun Trafik anlamına geliyor.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndexHistory/{day}/{period}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TrafficIndexHistory-day-period>
- Yol/query parametreleri: `day` (integer, Required): Son kaç günün verisi gösterilecek?, `period` (string, Required): Veri ortalamalarının periyodu. Y:Yıl; M:Ay; D:Gün; H:Saat; 5M:5Dakika
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseTrafficIndexHistory[]`
- Yanıt alanları: `TrafficIndex` (byte), `TrafficIndexDate` (date)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TrafficIndexHistory/<day>/<period>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TunnelSegments`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-TunnelSegments>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AdsızModel`
- Yanıt alanları: Yok.
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/TunnelSegments'
```
- Örnek yanıt:
```json
[
  1,
  2
]
```

### `GET /api/TrafficData/v1/VMSSegmentData/{VmsId}/{MsgId}`

- Açıklama: Yeni Ekran Yönetim Yazılımında Okmeydanı VMS gibi grafiksel panolar için segment  listesini döndürür
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/VMSSegmentData/{VmsId}/{MsgId}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-VMSSegmentData-VmsId-MsgId>
- Yol/query parametreleri: `VmsId` (integer, Required), `MsgId` (integer, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `TrafficDataModel[]`
- Yanıt alanları: `Src` (string), `SegmentID` (integer): Segment ID, `Speed` (integer): Segmentin Hız, `ColorIndex` (integer): Segmentin Hız rengi, `LastDate` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/VMSSegmentData/<VmsId>/<MsgId>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/xml/speeds`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v1-xml-speeds>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `HttpResponseMessage`
- Yanıt alanları: `Version` (Version), `Content` (HttpContent), `StatusCode` (HttpStatusCode), `ReasonPhrase` (string), `Headers` (Collection of             Object), `RequestMessage` (HttpRequestMessage), `IsSuccessStatusCode` (boolean)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v1/xml/speeds'
```

### `GET /api/TrafficData/v2/ComTrafficIndex`

- Açıklama: Açıklama belirtilmemiş.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v2/ComTrafficIndex`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v2-ComTrafficIndex>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ComparativeTrafficIndex_v2[]`
- Yanıt alanları: `HAFTA_GUN_ADI` (string), `SAAT` (string), `BUGUN` (integer), `GECEN_HAFTA_BUGUN` (integer), `GECEN_YIL_BUGUN` (integer), `GECEN_YIL_1_HAFTA_ONCE_BUGUN` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v2/ComTrafficIndex'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v2/Segments`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v2-Segments>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `VSegmentResponseV2[]`
- Yanıt alanları: `SegmentID` (integer), `vSegID` (integer), `SegGeometry` (string), `ZoomLevels` (Collection of integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v2/Segments'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/SegmentData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v3-SegmentData>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `TrafficDataModelV3`
- Yanıt alanları: `Date` (date), `Data` (Collection of TrafficDataModelItemV3), `InfoHead` (string), `InfoDetail` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/SegmentData'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/SegmentData_Report`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v3-SegmentData_Report>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `TrafficDataModelV3`
- Yanıt alanları: `Date` (date), `Data` (Collection of TrafficDataModelItemV3), `InfoHead` (string), `InfoDetail` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/SegmentData_Report'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/Segments/{ZoomLevel}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v3-Segments-ZoomLevel>
- Yol/query parametreleri: `ZoomLevel` (integer, Required): 1
- İstek gövdesi: Yok.
- Yanıt modeli: `VSegmentResponseV3[]`
- Yanıt alanları: `S` (integer): SegmentID, `G` (string): SegGeometry, `Z` (string): İlçe (Zone - District)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v3/Segments/<ZoomLevel>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v4/SegmentData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-TrafficData-v4-SegmentData>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `TrafficDataModelV4`
- Yanıt alanları: `Date` (date), `Data` (Collection of TrafficDataModelItemV4)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/TrafficData/v4/SegmentData'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/BridgesStatus`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-VmsData-v1-BridgesStatus>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `RouteStatusModel[]`
- Yanıt alanları: `RouteId` (integer), `Cong` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/BridgesStatus'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/BridgesStatusForMobile`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-VmsData-v1-BridgesStatusForMobile>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `BridgeRouteStatusModel[]`
- Yanıt alanları: `RouteId` (integer), `RouteName` (string), `Status` (string), `OrderNo` (integer), `GroupId` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/BridgesStatusForMobile'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/DashVmsCount`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-VmsData-v1-DashVmsCount>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Result_INT`
- Yanıt alanları: `Res` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/DashVmsCount'
```
- Örnek yanıt:
```json
{
  "Res": 1
}
```

### `GET /api/VmsData/v1/VmsData/{VmsId}`

- Açıklama: Tüm trafik VMS mesajlarının VmsId ye göre trafik durumu bilgisini döndürür.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/VmsData/{VmsId}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-VmsData-v1-VmsData-VmsId>
- Yol/query parametreleri: `VmsId` (integer, Default value is 0)
- İstek gövdesi: Yok.
- Yanıt modeli: `VmsStatusModel[]`
- Yanıt alanları: `SYSTEM_ID` (integer), `COLUMN_NUMBER` (integer), `SYSTEM_NAME_VIEW` (string), `SYSTEM_NO` (integer), `ROUTE_NAME_VMS` (string), `TRF_MSG_ID` (integer), `CONG_CODE` (integer), `VIRTUAL_SEG_ID` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/VmsData/v1/VmsData/<VmsId>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/AndroidConfiguration`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-AndroidConfiguration>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseUser`
- Yanıt alanları: `UserId` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/AndroidConfiguration' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "UserId": 1
}
```

### `POST /api/Mobile/v1/AndroidLoc`

- Açıklama: Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (Android için)
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/AndroidLoc`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-AndroidLoc>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseLocationResult`
- Yanıt alanları: `Result` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/AndroidLoc' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": "sample string 1"
}
```

### `POST /api/Mobile/v1/IphoneConfiguration`

- Açıklama: Iphone kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/IphoneConfiguration`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-IphoneConfiguration>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseUser`
- Yanıt alanları: `UserId` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/IphoneConfiguration' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "UserId": 1
}
```

### `POST /api/Mobile/v1/IphoneLoc`

- Açıklama: Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (IPhone için).
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/IphoneLoc`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-IphoneLoc>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseLocationResult`
- Yanıt alanları: `Result` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/IphoneLoc' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": "sample string 1"
}
```

### `POST /api/Mobile/v1/SaveSession/Get/{loginId}`

- Açıklama: Açıklama belirtilmemiş.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Get/{loginId}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-SaveSession-Get-loginId>
- Yol/query parametreleri: `loginId` (globally unique identifier)
- İstek gövdesi: Yok.
- Yanıt modeli: `UserSession[]`
- Yanıt alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Get/<loginId>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Get?loginId={loginId}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-SaveSession-Get_loginId>
- Yol/query parametreleri: `loginId` (globally unique identifier)
- İstek gövdesi: Yok.
- Yanıt modeli: `UserSession[]`
- Yanıt alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Get?loginId=<loginId>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Login`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-SaveSession-Login>
- Help detail durumu: `HTTP Error 500: Internal Server Error`
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: Belirtilmemiş.
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Login'
```

### `POST /api/Mobile/v1/SaveSession/Logout`

- Açıklama: CepTrafik uygulamasında client oturumu kapatma
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Logout`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Mobile-v1-SaveSession-Logout>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `UserSessionResult`
- Yanıt alanları: `Result` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Mobile/v1/SaveSession/Logout' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": "sample string 1"
}
```

## MobileExtensions

### `GET /api/MobileExtensions/v1/ActiveIcon`

- Açıklama: Aktif ikon bilgisini döndürür.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/ActiveIcon`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-MobileExtensions-v1-ActiveIcon>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ActiveIcon[]`
- Yanıt alanları: `Id` (integer), `Name` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/ActiveIcon'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DeleteUser`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-DeleteUser>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `UserSave`
- İstek gövdesi alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `AppBundleID` (string, Required): Application Bundle ID, `OS` (string, Required): Operating System, `OSVersion` (string, Required): Operating System Version, `DeviceModel` (string, Required): Device Model, `DeviceNetwork` (string, Required): Device Network, `DeviceCountry` (string, Required): Device Country, `DeviceLanguage` (string, Required): Device Language, `DeviceChargingStatus` (integer, Required): Device Charging Status, `AppName` (string, Required): Application Name, `AppVersion` (string, Required): Application Version, `LastLocation` (string, Required): Last Location, `Platform` (string, Required): Platform
- Yanıt modeli: `UserSaveResult`
- Yanıt alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DeleteUser' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DetailedUsersInformationDelete`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-DetailedUsersInformationDelete>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `DetailedUsersInformation`
- İstek gövdesi alanları: `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi, `Name` (string, Required): Adı, `Surname` (string, Required): Soyadı, `MobilePhone` (string, Required): Cep Tel, `Email` (string, Required): E-posta, `SocialMediaAccountType` (integer, Required): Sosyal Medya Hesabı, `SocialMediaAccount` (string, Required): Sosyal Medya Hesabı
- Yanıt modeli: `DetailedUsersInformationInsertResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DetailedUsersInformationDelete' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/DetailedUsersInformationInsert`

- Açıklama: Kullanıcıların detaylı bilgilerini kaydeden procedure.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DetailedUsersInformationInsert`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-DetailedUsersInformationInsert>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `DetailedUsersInformation`
- İstek gövdesi alanları: `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi, `Name` (string, Required): Adı, `Surname` (string, Required): Soyadı, `MobilePhone` (string, Required): Cep Tel, `Email` (string, Required): E-posta, `SocialMediaAccountType` (integer, Required): Sosyal Medya Hesabı, `SocialMediaAccount` (string, Required): Sosyal Medya Hesabı
- Yanıt modeli: `DetailedUsersInformationInsertResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/DetailedUsersInformationInsert' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/FavoriteAddressDelete`

- Açıklama: Kullanıcıların favori adresleri silinir.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/FavoriteAddressDelete`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-FavoriteAddressDelete>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FavoriteAddressDeleteResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/FavoriteAddressDelete' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "FavoriteAddressId": 1
}'
```
- Örnek istek gövdesi:
```json
{
  "FavoriteAddressId": 1
}
```
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/FavoriteAddressInsert`

- Açıklama: Kullanıcıların favori adresleri eklenir.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/FavoriteAddressInsert`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-FavoriteAddressInsert>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FavoriteAddressInsertResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/FavoriteAddressInsert' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/HearingImpairedInsert`

- Açıklama: İşitme Engelli Kullanıcı bilgileri kaydedilir.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/HearingImpairedInsert`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-HearingImpairedInsert>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `HearingImpairedInformation`
- İstek gövdesi alanları: `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi, `Name` (string, Required): Adı, `Surname` (string, Required): Soyadı, `IdentityNumber` (integer, Required): TC Kimlik No, `YearOfBirth` (integer, Required): Doğum Yılı., `Mobile` (string, Required): Cep Tel., `Email` (string, Required): E-posta.
- Yanıt modeli: `HearingImpairedInsertResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/HearingImpairedInsert' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/HearingImpairedStatus`

- Açıklama: İşitme engelli kullanıcıların durumunu kontrol etmek için kullanılmaktadır.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/HearingImpairedStatus`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-HearingImpairedStatus>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseHearingImpairedStatus`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/HearingImpairedStatus' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "UserType": 64
}'
```
- Örnek istek gövdesi:
```json
{
  "UserId": 1,
  "UserType": 64
}
```
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/InsertFeedback`

- Açıklama: Mobil Kullanıcı bildirimlerini kaydeden api.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/InsertFeedback`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-InsertFeedback>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `MobileUserFeedbackModel`
- İstek gövdesi alanları: `FeedbackType` (integer, Required): Geri Bildirim Tipi, `Description` (string, Required): Açıklama, `XCoord` (string, Required): X Koordinatı., `YCoord` (string, Required): Y Koordinatı., `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi
- Yanıt modeli: `MobileUserFeedbackInsertResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/InsertFeedback' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/MobileExtensions/v1/SaveAndroidUserApp`

- Açıklama: Uygulama kullanıcılarının telefonlarında yer alan diğer uygulamaları kaydeder.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveAndroidUserApp`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-SaveAndroidUserApp>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `AndroidUserAppSave`
- İstek gövdesi alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `AppBundleID` (string, Required): Application Bundle ID, `AppName` (string, Required): Application Name
- Yanıt modeli: `AndroidUserAppSaveResult`
- Yanıt alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveAndroidUserApp' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "AppName": "sample string 4"
}'
```
- Örnek istek gövdesi:
```json
{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "AppName": "sample string 4"
}
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveAndroidUserAppList`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-SaveAndroidUserAppList>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AndroidUserAppSaveResult`
- Yanıt alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveAndroidUserAppList' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveLocation`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-SaveLocation>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `LocationSave`
- İstek gövdesi alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `Latitude` (decimal number, Required): Latitude, `Longitude` (decimal number, Required): Longitude, `SpeedValue` (integer, Required): SpeedValue, `AppBundleID` (string, Required): Apple Bundle ID
- Yanıt modeli: `LocationSaveResult`
- Yanıt alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveLocation' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveUser`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-SaveUser>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `UserSave`
- İstek gövdesi alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `AppBundleID` (string, Required): Application Bundle ID, `OS` (string, Required): Operating System, `OSVersion` (string, Required): Operating System Version, `DeviceModel` (string, Required): Device Model, `DeviceNetwork` (string, Required): Device Network, `DeviceCountry` (string, Required): Device Country, `DeviceLanguage` (string, Required): Device Language, `DeviceChargingStatus` (integer, Required): Device Charging Status, `AppName` (string, Required): Application Name, `AppVersion` (string, Required): Application Version, `LastLocation` (string, Required): Last Location, `Platform` (string, Required): Platform
- Yanıt modeli: `UserSaveResult`
- Yanıt alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/SaveUser' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/UserFavoriteAddressList`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-MobileExtensions-v1-UserFavoriteAddressList>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FavoriteAddressResponse[]`
- Yanıt alanları: `Title` (string): Favori adres başlığı, `Address` (string): Kullanıcının adresi, `XCoord` (decimal number): Favori adresin X koordinatı, `YCoord` (decimal number): Favori adresin Y koordinatı
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/MobileExtensions/v1/UserFavoriteAddressList' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Bicycle`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-Bicycle>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Bicycle`
- Yanıt alanları: `BR_Data` (Collection of BicycleRoad), `BS_Data` (Collection of BicycleStation)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Bicycle'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Camera`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-Camera>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraGroupedList[]`
- Yanıt alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Camera'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/CurrentAnnouncement`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-CurrentAnnouncement>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AnnouncementModel[]`
- Yanıt alanları: `Id` (integer), `Metin` (string), `MetinIng` (string), `Tipi` (integer), `BitisTarihi` (date), `Link` (string), `Baslik` (string), `BaslikIng` (string), `Koordinat` (string), `Oncelik` (integer), `KameraId` (integer), `GirisTarihi` (date), `xKoordinat` (string), `yKoordinat` (string), `TimeDiff` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/CurrentAnnouncement'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/ElectChargeStations`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-ElectChargeStations>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ElectChargeStationsModel[]`
- Yanıt alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string), `Weekdays` (string), `Weekend` (string), `StationModel` (string), `SocketInfo` (string), `Address` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/ElectChargeStations'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Junction`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-Junction>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `JunctionModel[]`
- Yanıt alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `CountyId` (integer): JunctionNo : Sinyalize Ilce Numarası, `JunctionType` (integer): JunctionType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Junction'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Parking`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-Parking>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkingInfo[]`
- Yanıt alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotSortId` (integer), `PLotSort` (string), `PLotIspark` (boolean), `PLotComp` (string), `PLotIsOpen` (boolean), `PLotAvailableCount` (integer), `PLotAvailableRate` (integer), `PLotUpToDateStatus` (integer), `PLotDate` (date), `PLotLatitude` (string), `PLotLongitude` (string), `PLotLocation` (string), `PLotAddress` (string), `PLotDistrict` (string), `PWorkingHours` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/Parking'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/POI`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-POI>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `POI[]`
- Yanıt alanları: `ID` (integer), `TI` (integer), `TN` (string), `PN` (string), `LT` (string), `LN` (string), `PU` (string), `SM` (boolean)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/POI'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/TrafficIndex_Sc1_Cont`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v1-TrafficIndex_Sc1_Cont>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseTrafficIndex_Sc1_Cont`
- Yanıt alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v1/TrafficIndex_Sc1_Cont'
```
- Örnek yanıt:
```json
{
  "TI": 64,
  "TI_An": 64,
  "TI_Av": 64
}
```

### `GET /api/UYMPortal/v2/Piers`

- Açıklama: No documentation available.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v2/Piers`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v2-Piers>
- Help detail durumu: `<urlopen error [Errno -3] Temporary failure in name resolution>`
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: Belirtilmemiş.
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v2/Piers'
```

### `GET /api/UYMPortal/v4/SegmentData`

- Açıklama: No documentation available.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v4/SegmentData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-UYMPortal-v4-SegmentData>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `TrafficDataModelV4`
- Yanıt alanları: `Date` (date), `Data` (Collection of TrafficDataModelItemV4)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/UYMPortal/v4/SegmentData'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Piers/v1/Piers`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Piers-v1-Piers>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `PiersModel[]`
- Yanıt alanları: `PierNo` (integer), `PierName` (string), `Xcoord` (string), `Ycoord` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Piers/v1/Piers'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Site/v1/Contacts`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Site-v1-Contacts>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `WebSiteContact[]`
- Yanıt alanları: `Type` (string): İletişim bilgisi tipi:  telefon, eposta, webadres, beyazmasa_eposta, `Value` (string): İletişim bilgisi
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Site/v1/Contacts'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Site/v1/Links`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Site-v1-Links>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `WebSiteLink[]`
- Yanıt alanları: `LinkId` (integer), `LinkName` (string): Link başlığı, `Language` (string): Ait olduğu site dili: tr/en, `LinkQueue` (string): Listelenme sırası, `SEO` (string): SEO uyumlu sayfa ismi, `ParentLinkId` (integer): 0 ise ana linktir. >0 ise alt linki olduğu link, `LinkURL` (string): Domain'den sonraki URL parçası. Başına https://uym.ibb.gov.tr eklenir
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Site/v1/Links'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Site/v1/PLinks/{pLinkId}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Site-v1-PLinks-pLinkId>
- Yol/query parametreleri: `pLinkId` (integer, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `WebSiteLink[]`
- Yanıt alanları: `LinkId` (integer), `LinkName` (string): Link başlığı, `Language` (string): Ait olduğu site dili: tr/en, `LinkQueue` (string): Listelenme sırası, `SEO` (string): SEO uyumlu sayfa ismi, `ParentLinkId` (integer): 0 ise ana linktir. >0 ise alt linki olduğu link, `LinkURL` (string): Domain'den sonraki URL parçası. Başına https://uym.ibb.gov.tr eklenir
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Site/v1/PLinks/<pLinkId>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Site/v1/SocialNetworkAccounts`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Site-v1-SocialNetworkAccounts>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `SocialNetworkAccount[]`
- Yanıt alanları: `SNType` (string): Sosyal medya türü: Twitter, Instagram, Youtube, `Link` (string): Sosyal medya linki
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Site/v1/SocialNetworkAccounts'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Site/v1/WebSiteContent/{linkId}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Site-v1-WebSiteContent-linkId>
- Yol/query parametreleri: `linkId` (integer, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `WebSiteContent[]`
- Yanıt alanları: `PageTitle` (string), `Queue` (string), `LinkId` (string), `HTMLContent` (string), `Language` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Site/v1/WebSiteContent/<linkId>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Announcement/v1/Current`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Announcement-v1-Current>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AnnouncementModel[]`
- Yanıt alanları: `Id` (integer), `Metin` (string), `MetinIng` (string), `Tipi` (integer), `BitisTarihi` (date), `Link` (string), `Baslik` (string), `BaslikIng` (string), `Koordinat` (string), `Oncelik` (integer), `KameraId` (integer), `GirisTarihi` (date), `xKoordinat` (string), `yKoordinat` (string), `TimeDiff` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Announcement/v1/Current'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/All`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Camera-v1-All>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraBase[]`
- Yanıt alanları: `ID` (integer): Camera ID, `Name` (string): Camera Name (Location), `XCoord` (string): X Coordinate of camera, `YCoord` (string): Y Coordinate of camera, `VideoURL` (string): Live camera Video URL, `SSLVideoURL` (string): GroupID, `GroupId` (string): GroupID
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/All'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/CameraGroup`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Camera-v1-CameraGroup>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraGroupedList[]`
- Yanıt alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/CameraGroup'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/GetCamera/{camId}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Camera-v1-GetCamera-camId>
- Yol/query parametreleri: `camId` (integer, Required): Resim alınacak Kamera ID
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraModel`
- Yanıt alanları: `Tarih` (date): Resmin üretildiği tarih, `Images` (Collection of string): Resim Listesi
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Camera/v1/GetCamera/<camId>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/ElectChargeStations/v1/ElectChargeStations`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-ElectChargeStations-v1-ElectChargeStations>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ElectChargeStationsModel[]`
- Yanıt alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string), `Weekdays` (string), `Weekend` (string), `StationModel` (string), `SocketInfo` (string), `Address` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/ElectChargeStations/v1/ElectChargeStations'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/HavaIstStations/v1/HavaIstStations`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-HavaIstStations-v1-HavaIstStations>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `HavaIstStationsModel[]`
- Yanıt alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/HavaIstStations/v1/HavaIstStations'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Junction/v1/All`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Junction-v1-All>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `JunctionModel[]`
- Yanıt alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `CountyId` (integer): JunctionNo : Sinyalize Ilce Numarası, `JunctionType` (integer): JunctionType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Junction/v1/All'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Junction/v1/InsertFailure`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Junction-v1-InsertFailure>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `JunctionFailureModel`
- İstek gövdesi alanları: `JunctionNo` (integer, Required): Hatalı sinyalizasyon numarası, `NotifierType` (integer, Required): Platform için eğer cep trafik ise -1, Web ise -2 gelmelidir., `FailureType` (integer, Required): Vatandaştan gelen arıza bildirimini ifade etmektedir., `Message` (string, Required): Kullanıcıdan alınan mesajı ifade etmektedir.
- Yanıt modeli: `JunctionFailureResponse`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Junction/v1/InsertFailure' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "JunctionNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "Message": "sample string 4"
}'
```
- Örnek istek gövdesi:
```json
{
  "JunctionNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "Message": "sample string 4"
}
```
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/Mobile/v1/AndroidConfiguration`

- Açıklama: Android kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/AndroidConfiguration`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-AndroidConfiguration>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseUser`
- Yanıt alanları: `UserId` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/AndroidConfiguration' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "UserId": 1
}
```

### `POST /api/CepTrafik/Mobile/v1/AndroidLoc`

- Açıklama: Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (Android için)
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/AndroidLoc`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-AndroidLoc>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseLocationResult`
- Yanıt alanları: `Result` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/AndroidLoc' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": "sample string 1"
}
```

### `POST /api/CepTrafik/Mobile/v1/IphoneConfiguration`

- Açıklama: Iphone kullanıcısının uygulama ve kullanıcı bilgilerini kayıt ediyor. Uygulama her başlangıçta çağrılmakta.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/IphoneConfiguration`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-IphoneConfiguration>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseUser`
- Yanıt alanları: `UserId` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/IphoneConfiguration' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "UserId": 1
}
```

### `POST /api/CepTrafik/Mobile/v1/IphoneLoc`

- Açıklama: Mobil kullanıcılardan gelen koordinat bildilerini almakta ve veritabanına kaydetmekte (IPhone için)
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/IphoneLoc`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-IphoneLoc>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseLocationResult`
- Yanıt alanları: `Result` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/IphoneLoc' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": "sample string 1"
}
```

### `POST /api/CepTrafik/Mobile/v1/SaveSession/Get/{loginId}`

- Açıklama: Açıklama belirtilmemiş.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Get/{loginId}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-SaveSession-Get-loginId>
- Yol/query parametreleri: `loginId` (globally unique identifier)
- İstek gövdesi: Yok.
- Yanıt modeli: `UserSession[]`
- Yanıt alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Get/<loginId>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Get?loginId={loginId}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-SaveSession-Get_loginId>
- Yol/query parametreleri: `loginId` (globally unique identifier)
- İstek gövdesi: Yok.
- Yanıt modeli: `UserSession[]`
- Yanıt alanları: `LoginID` (globally unique identifier), `UserID` (integer), `MobileUserType` (byte), `LoginDate` (date), `LoginX` (string), `LoginY` (string), `LogoutDate` (date), `LogoutX` (string), `LogoutY` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Get?loginId=<loginId>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Login`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-SaveSession-Login>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `UserSessionResult`
- Yanıt alanları: `Result` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Login' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": "sample string 1"
}
```

### `POST /api/CepTrafik/Mobile/v1/SaveSession/Logout`

- Açıklama: CepTrafik uygulamasında client oturumu kapatma
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Logout`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-Mobile-v1-SaveSession-Logout>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `UserSessionResult`
- Yanıt alanları: `Result` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Mobile/v1/SaveSession/Logout' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": "sample string 1"
}
```

### `GET /api/CepTrafik/MobileExtensions/v1/ActiveIcon`

- Açıklama: Aktif ikon bilgisini döndürür.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/ActiveIcon`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-MobileExtensions-v1-ActiveIcon>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ActiveIcon[]`
- Yanıt alanları: `Id` (integer), `Name` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/ActiveIcon'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/DetailedUsersInformationInsert`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-DetailedUsersInformationInsert>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `DetailedUsersInformation`
- İstek gövdesi alanları: `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi, `Name` (string, Required): Adı, `Surname` (string, Required): Soyadı, `MobilePhone` (string, Required): Cep Tel, `Email` (string, Required): E-posta, `SocialMediaAccountType` (integer, Required): Sosyal Medya Hesabı, `SocialMediaAccount` (string, Required): Sosyal Medya Hesabı
- Yanıt modeli: `DetailedUsersInformationInsertResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/DetailedUsersInformationInsert' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/FavoriteAddressDelete`

- Açıklama: Kullanıcıların favori adresleri silinir.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/FavoriteAddressDelete`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-FavoriteAddressDelete>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FavoriteAddressDeleteResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/FavoriteAddressDelete' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "FavoriteAddressId": 1
}'
```
- Örnek istek gövdesi:
```json
{
  "FavoriteAddressId": 1
}
```
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/FavoriteAddressInsert`

- Açıklama: Kullanıcıların favori adresleri eklenir.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/FavoriteAddressInsert`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-FavoriteAddressInsert>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FavoriteAddressInsertResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/FavoriteAddressInsert' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/HearingImpairedInsert`

- Açıklama: İşitme Engelli Kullanıcı bilgileri kaydedilir.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/HearingImpairedInsert`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-HearingImpairedInsert>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `HearingImpairedInformation`
- İstek gövdesi alanları: `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi, `Name` (string, Required): Adı, `Surname` (string, Required): Soyadı, `IdentityNumber` (integer, Required): TC Kimlik No, `YearOfBirth` (integer, Required): Doğum Yılı., `Mobile` (string, Required): Cep Tel., `Email` (string, Required): E-posta.
- Yanıt modeli: `HearingImpairedInsertResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/HearingImpairedInsert' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/HearingImpairedStatus`

- Açıklama: İşitme engelli kullanıcıların durumunu kontrol etmek için kullanılmaktadır.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/HearingImpairedStatus`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-HearingImpairedStatus>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseHearingImpairedStatus`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/HearingImpairedStatus' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UserId": 1,
  "UserType": 64
}'
```
- Örnek istek gövdesi:
```json
{
  "UserId": 1,
  "UserType": 64
}
```
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/InsertFeedback`

- Açıklama: Mobil Kullanıcı bildirimlerini kaydeden api.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/InsertFeedback`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-InsertFeedback>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `MobileUserFeedbackModel`
- İstek gövdesi alanları: `FeedbackType` (integer, Required): Geri Bildirim Tipi, `Description` (string, Required): Açıklama, `XCoord` (string, Required): X Koordinatı., `YCoord` (string, Required): Y Koordinatı., `MobileUserId` (integer, Required): Mobil Kullanıcı ID, `MobileUserType` (integer, Required): Mobil Kullanıcı Tipi
- Yanıt modeli: `MobileUserFeedbackInsertResult`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/InsertFeedback' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `POST /api/CepTrafik/MobileExtensions/v1/SaveAndroidUserApp`

- Açıklama: Uygulama kullanıcılarının telefonlarında yer alan diğer uygulamaları kaydeder.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveAndroidUserApp`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-SaveAndroidUserApp>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `AndroidUserAppSave`
- İstek gövdesi alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `AppBundleID` (string, Required): Application Bundle ID, `AppName` (string, Required): Application Name
- Yanıt modeli: `AndroidUserAppSaveResult`
- Yanıt alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveAndroidUserApp' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "AppName": "sample string 4"
}'
```
- Örnek istek gövdesi:
```json
{
  "UDID": "sample string 1",
  "UserTokenOrID": "sample string 2",
  "AppBundleID": "sample string 3",
  "AppName": "sample string 4"
}
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveAndroidUserAppList`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-SaveAndroidUserAppList>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AndroidUserAppSaveResult`
- Yanıt alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveAndroidUserAppList' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveLocation`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-SaveLocation>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `LocationSave`
- İstek gövdesi alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `Latitude` (decimal number, Required): Latitude, `Longitude` (decimal number, Required): Longitude, `SpeedValue` (integer, Required): SpeedValue, `AppBundleID` (string, Required): Apple Bundle ID
- Yanıt modeli: `LocationSaveResult`
- Yanıt alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveLocation' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveUser`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-SaveUser>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `UserSave`
- İstek gövdesi alanları: `UDID` (string, Required): UDID, `UserTokenOrID` (string, Required): User Token or ID, `AppBundleID` (string, Required): Application Bundle ID, `OS` (string, Required): Operating System, `OSVersion` (string, Required): Operating System Version, `DeviceModel` (string, Required): Device Model, `DeviceNetwork` (string, Required): Device Network, `DeviceCountry` (string, Required): Device Country, `DeviceLanguage` (string, Required): Device Language, `DeviceChargingStatus` (integer, Required): Device Charging Status, `AppName` (string, Required): Application Name, `AppVersion` (string, Required): Application Version, `LastLocation` (string, Required): Last Location, `Platform` (string, Required): Platform
- Yanıt modeli: `UserSaveResult`
- Yanıt alanları: `ID` (integer), `State` (integer), `Message` (string), `UDID` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/SaveUser' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/UserFavoriteAddressList`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CepTrafik-MobileExtensions-v1-UserFavoriteAddressList>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FavoriteAddressResponse[]`
- Yanıt alanları: `Title` (string): Favori adres başlığı, `Address` (string): Kullanıcının adresi, `XCoord` (decimal number): Favori adresin X koordinatı, `YCoord` (decimal number): Favori adresin Y koordinatı
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/MobileExtensions/v1/UserFavoriteAddressList' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetApsInfos`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Park-v1-GetApsInfos>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkingAps[]`
- Yanıt alanları: `PApsId` (integer), `PApsName` (string), `PApsLatitude` (string), `PApsLongitude` (string), `PLotsIds` (string), `PApsImage` (string), `ApsPLots` (Collection of ParkInfo)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetApsInfos'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetParkInfo/{flag}/{id}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Park-v1-GetParkInfo-flag-id>
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkInfo[]`
- Yanıt alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetParkInfo/<flag>/<id>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetParkInfos/{flag}/{id}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Park-v1-GetParkInfos-flag-id>
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkInfo[]`
- Yanıt alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v1/GetParkInfos/<flag>/<id>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v2/GetParkInfo/{flag}/{id}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Park-v2-GetParkInfo-flag-id>
- Yol/query parametreleri: `flag` (integer, Default value is 1): 1 veya 0 alır: 1 ise @FLG_SHOW_ONMAP sütünu 1 olan tüm kayıtlar; 0 ise tüm datayı getirmektedir, `id` (integer, Default value is 0): Son parametre Otopark ID 0 ise tüm otoparkların verileri, Id değeri verilir ise ilgili otoparkın datasını döndürmektedir.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkInfo_v2[]`
- Yanıt alanları: `PLotSort` (string), `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotAvailableCount` (integer), `PLotLatitude` (string), `PLotLongitude` (string), `PStatus` (string), `PApsContact` (string), `PWorkingHours` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Park/v2/GetParkInfo/<flag>/<id>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Piers/v1/Piers`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-Piers-v1-Piers>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `PiersModel[]`
- Yanıt alanları: `PierNo` (integer), `PierName` (string), `Xcoord` (string), `Ycoord` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/Piers/v1/Piers'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/SegmentData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-TrafficData-v1-SegmentData>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `TrafficDataModel[]`
- Yanıt alanları: `Src` (string), `SegmentID` (integer): Segment ID, `Speed` (integer): Segmentin Hız, `ColorIndex` (integer): Segmentin Hız rengi, `LastDate` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/SegmentData'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/Segments`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-TrafficData-v1-Segments>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `VSegmentResponse[]`
- Yanıt alanları: `segID` (integer), `vSegID` (integer), `segGeometry` (string), `ZoomLevels` (Collection of integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/Segments'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/TrafficIndex`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-TrafficData-v1-TrafficIndex>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseTrafficIndex`
- Yanıt alanları: `Result` (byte)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/TrafficIndex'
```
- Örnek yanıt:
```json
{
  "Result": 64
}
```

### `GET /api/CepTrafik/TrafficData/v1/TrafficIndex_Sc1_Cont`

- Açıklama: İstanbul Genel Trafik İndeks'ini 3 kırılımda verir: "":Genel, "An":Anadolu, "Av":Avrupa
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/TrafficIndex_Sc1_Cont`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-TrafficData-v1-TrafficIndex_Sc1_Cont>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseTrafficIndex_Sc1_Cont`
- Yanıt alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v1/TrafficIndex_Sc1_Cont'
```
- Örnek yanıt:
```json
{
  "TI": 64,
  "TI_An": 64,
  "TI_Av": 64
}
```

### `GET /api/CepTrafik/TrafficData/v2/TrafficIndex`

- Açıklama: İstanbul Genel Trafik İndeks'ini 3 kırılımda verir: "":Genel, "An":Anadolu, "Av":Avrupa
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v2/TrafficIndex`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-TrafficData-v2-TrafficIndex>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseTrafficIndex_Sc1_Cont`
- Yanıt alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/TrafficData/v2/TrafficIndex'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/VmsData/v1/BridgesStatusForMobile`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-CepTrafik-VmsData-v1-BridgesStatusForMobile>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `BridgeRouteStatusModel[]`
- Yanıt alanları: `RouteId` (integer), `RouteName` (string), `Status` (string), `OrderNo` (integer), `GroupId` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/CepTrafik/VmsData/v1/BridgesStatusForMobile'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/HavaIstStations/v1/HavaIstStations`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-HavaIstStations-v1-HavaIstStations>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `HavaIstStationsModel[]`
- Yanıt alanları: `StationNo` (integer), `StationName` (string), `Xcoord` (string), `Ycoord` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/HavaIstStations/v1/HavaIstStations'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Current`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Announcement-v1-Current>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AnnouncementModel[]`
- Yanıt alanları: `Id` (integer), `Metin` (string), `MetinIng` (string), `Tipi` (integer), `BitisTarihi` (date), `Link` (string), `Baslik` (string), `BaslikIng` (string), `Koordinat` (string), `Oncelik` (integer), `KameraId` (integer), `GirisTarihi` (date), `xKoordinat` (string), `yKoordinat` (string), `TimeDiff` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Current'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/SignalFailureWrite`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Announcement-v1-SignalFailureWrite>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `SignalFailureWriteModel`
- İstek gövdesi alanları: `SignalNo` (integer, Required): Hatalı sinyalizasyon numarası, `NotifierType` (integer, Required): Platform için eğer cep trafik ise -1, Web ise -2 gelmelidir., `FailureType` (integer, Required): Vatandaştan gelen arıza bildirimini ifade etmektedir., `MESSAGE` (string, Required): Kullanıcıdan alınan mesajı ifade etmektedir.
- Yanıt modeli: `ResponseSignalFailure`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/SignalFailureWrite' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "SignalNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "MESSAGE": "sample string 4"
}'
```
- Örnek istek gövdesi:
```json
{
  "SignalNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "MESSAGE": "sample string 4"
}
```
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `GET /api/Announcement/v1/Transportation/IETT/VehicleInfo`

- Açıklama: No documentation available.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/IETT/VehicleInfo`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Announcement-v1-Transportation-IETT-VehicleInfo>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `IETTVehicleModel[]`
- Yanıt alanları: `VehicleDoorCode` (string), `VehicleId` (integer), `RouteCode` (string), `LineCodeOfRoute` (string), `UpdatedStartTime` (date), `UpdatedTime` (date), `OrerTime` (date), `TaskSituationCode` (string), `LineCodeOfRouteIfDepar` (string), `Latitude` (decimal number), `Longitude` (decimal number), `Speed` (decimal number), `CreatedDate` (date), `LocationRecordedTime` (date), `TaskTypeCode` (string), `SecondsSinceLastLocation` (integer), `UpdatedTimeDeviationInMinutes` (integer), `ActualTimeDeviationInMinutes` (integer), `Priority` (integer), `DataSource` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/IETT/VehicleInfo'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/IETT/{lang}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Announcement-v1-Transportation-IETT-lang>
- Yol/query parametreleri: `lang` (string, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `AnnouncementTransportationModel[]`
- Yanıt alanları: `UlasimDuyuruId` (integer), `UlasimMod` (byte), `KaynakID` (string), `Dil` (string), `Hat` (string), `Tip` (string), `Baslik` (string), `Icerik` (string), `DuyuruLink` (string), `Resim` (string), `Icerik_Video` (Collection of string), `Icerik_Resimler` (Collection of string), `BaslangicTarihi` (date), `BitisTarihi` (date), `KayitTarihi` (date), `TimeDiff` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/IETT/<lang>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/METRO/{lang}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Announcement-v1-Transportation-METRO-lang>
- Yol/query parametreleri: `lang` (string, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `AnnouncementTransportationModel[]`
- Yanıt alanları: `UlasimDuyuruId` (integer), `UlasimMod` (byte), `KaynakID` (string), `Dil` (string), `Hat` (string), `Tip` (string), `Baslik` (string), `Icerik` (string), `DuyuruLink` (string), `Resim` (string), `Icerik_Video` (Collection of string), `Icerik_Resimler` (Collection of string), `BaslangicTarihi` (date), `BitisTarihi` (date), `KayitTarihi` (date), `TimeDiff` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Announcement/v1/Transportation/METRO/<lang>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Scm/TrafficData/v1/ComTrafficIndex`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Scm-TrafficData-v1-ComTrafficIndex>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ComparativeTrafficIndex[]`
- Yanıt alanları: `Time` (string): Saat, `Day` (string): Gün, `TI_A_H1` (integer): Bir önceki sene 3 hafta öncesinin trafik indeksi, `TI_A_H2` (integer): Bir önceki sene 2 hafta öncesinin trafik indeksi, `TI_A_H3` (integer): Bir önceki sene 3 hafta öncesinin trafik indeksi, `TI_A_H4` (integer): Bir önceki senenin trafik indeksi, `TI_H1` (integer): 1 hafta öncesinin trafik indeksi, `TI_H2` (integer): 2 hafta öncesinin trafik indeksi, `TI_H3` (integer): 3 hafta öncesinin trafik indeksi, `Yesterday` (integer): Bir önceki günün trafik indeksi
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Scm/TrafficData/v1/ComTrafficIndex'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/BTCongestion/v1/Alarms`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-BTCongestion-v1-Alarms>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Alarm[]`
- Yanıt alanları: `RowNo` (integer): Satır numarası, `IdVct` (integer): Vektör ID, `IdSensor` (integer): Sensör Id, `Time` (date): Üretilen veri zamanı
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/BTCongestion/v1/Alarms'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Sbgm/v1/InsertAccidentInfo`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Sbgm-v1-InsertAccidentInfo>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `SbgmAccidentInsertResult`
- Yanıt alanları: `State` (boolean)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Sbgm/v1/InsertAccidentInfo' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "XCoordinate": "sample string 1",
  "YCoordinate": "sample string 2",
  "gCoordinate": "sample string 3",
  "ImageBase64": "sample string 4"
}'
```
- Örnek istek gövdesi:
```json
{
  "XCoordinate": "sample string 1",
  "YCoordinate": "sample string 2",
  "gCoordinate": "sample string 3",
  "ImageBase64": "sample string 4"
}
```
- Örnek yanıt:
```json
{
  "State": true
}
```

## WeatherData

### `GET /api/WeatherData/v1/AllStationsData`

- Açıklama: AKOM meteoroloji uspGetAllStationsData storeprocedure kullanarak,data döndürüyor.
            5 Dakikalık Cache
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/WeatherData/v1/AllStationsData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-WeatherData-v1-AllStationsData>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `WeatherDataModel[]`
- Yanıt alanları: `ISTASYON_ID` (integer), `ISTASYON_ADI` (string), `LAT` (string), `LONG` (string), `RUZGAR_HIZI` (integer), `HAVA_SICAKLIGI` (decimal number), `HISSEDILEN_SICAKLIK` (decimal number), `ASFALT_SICAKLIGI` (decimal number), `ASFALT_DURUMU` (integer), `ASFALT_DURUMUTR` (string), `ASFALT_DURUMUEN` (string), `DONMA_SICAKLIGI` (integer), `BAGIL_NEM` (integer), `GORUS_UZAKLIGI` (integer), `GUNLUK_TOPLAM_YAGIS` (integer), `HAVA_DURUMU_ID` (integer), `HAVA_DURUMU` (string), `RUZGAR_YONU` (decimal number), `ZAMAN` (date)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/WeatherData/v1/AllStationsData'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/All`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-All>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `JunctionModel[]`
- Yanıt alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `CountyId` (integer): JunctionNo : Sinyalize Ilce Numarası, `JunctionType` (integer): JunctionType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/All'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/DashJunctionCount`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-DashJunctionCount>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Result_INT`
- Yanıt alanları: `Res` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/DashJunctionCount'
```
- Örnek yanıt:
```json
{
  "Res": 1
}
```

### `POST /api/Junction/v1/InsertFailure`

- Açıklama: Sinyal arızalarını kaydeder.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/InsertFailure`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Junction-v1-InsertFailure>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `JunctionFailureModel`
- İstek gövdesi alanları: `JunctionNo` (integer, Required): Hatalı sinyalizasyon numarası, `NotifierType` (integer, Required): Platform için eğer cep trafik ise -1, Web ise -2 gelmelidir., `FailureType` (integer, Required): Vatandaştan gelen arıza bildirimini ifade etmektedir., `Message` (string, Required): Kullanıcıdan alınan mesajı ifade etmektedir.
- Yanıt modeli: `JunctionFailureResponse`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/InsertFailure' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "JunctionNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "Message": "sample string 4"
}'
```
- Örnek istek gövdesi:
```json
{
  "JunctionNo": 1,
  "NotifierType": 2,
  "FailureType": 3,
  "Message": "sample string 4"
}
```
- Örnek yanıt:
```json
{
  "Result": 1
}
```

### `GET /api/Junction/v1/JunctionFailure`

- Açıklama: ENG:
            TR:İstanbul’daki arızalı kavşakları arıza türlerine göre getirir.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionFailure`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-JunctionFailure>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `JunctionFailureTypeModel[]`
- Yanıt alanları: `FailureType` (string): FailreType : Sinyalize kavşak arıza türü, `FailureCount` (integer): Count : Arıza sayısı
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionFailure'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionFailureLevelCount`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-JunctionFailureLevelCount>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `JunctionFailureLevelModel[]`
- Yanıt alanları: `date` (string): date : tarih, `warns` (integer): warns : Uyarı sayısı, `errors` (integer): errors : Hata sayısı, `criticalErrors` (integer): criticalErrors : Kritik hata  sayısı
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionFailureLevelCount'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionMod`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v1-JunctionMod>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `JunctionMod[]`
- Yanıt alanları: `ModID` (integer), `Mod` (string): FailreType : Sinyalize kavşak çalışma türü, `ModCount` (integer): FailreType : Sinyalize kavşak çalışma türüne göre toplam sayısı
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v1/JunctionMod'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v2/All`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v2-All>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `JunctionModel_v2[]`
- Yanıt alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `JunctionButtonType` (string): JunctionButtonType: 1 veya 0; 1=>Yaya Butonu olan kavşak, 0=>Yaya Butonu Olmayan Kavşak, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı, `JunctionNewNo` (string): JunctionNewNo : Sinyalize Kavşakların Yeni Numarası(Trafik ışıklarında sinyalizasyon ünitesi üzerinde yazılı numara), `JunctionType` (string), `JunctionWorkingModeID` (integer), `JunctionWorkingMode` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v2/All'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Junction/v3/All`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Junction-v3-All>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `JunctionModel_v3[]`
- Yanıt alanları: `JunctionNo` (integer): JunctionName : Sinyalize Kavşak Adı (Bulunduğu Lokasyon), `JunctionName` (string): JunctionNo : Sinyalize Eski Kavşak Numarası, `XCoord` (string): XCoord : Sinyalize kavşağın bulunduğu konumun X koordinatı, `YCoord` (string): YCoord : Sinyalize kavşağın bulunduğu konumun Y koordinatı
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Junction/v3/All'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/General/v1/CheckUser`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-General-v1-CheckUser>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseMessage`
- Yanıt alanları: `Result` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/General/v1/CheckUser' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Username": "sample string 1",
  "Password": "sample string 2"
}'
```
- Örnek istek gövdesi:
```json
{
  "Username": "sample string 1",
  "Password": "sample string 2"
}
```
- Örnek yanıt:
```json
{
  "Result": "sample string 1"
}
```

### `GET /api/General/v1/Districts`

- Açıklama: İlçe listesi
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/General/v1/Districts`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-General-v1-Districts>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `District[]`
- Yanıt alanları: `Id` (integer): District Id, `Name` (string): District Name
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/General/v1/Districts'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/General/v1/ServerIP`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-General-v1-ServerIP>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AdsızModel`
- Yanıt alanları: Yok.
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/General/v1/ServerIP'
```
- Örnek yanıt:
```json
[
  "sample string 1",
  "sample string 2"
]
```

## EurasiaTunnel

### `GET /api/EurasiaTunnel/v1/GetTravelTimes`

- Açıklama: Yalnızca Avrasya Tünel Rotaları için seyahat sürelerini verir.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/GetTravelTimes`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-EurasiaTunnel-v1-GetTravelTimes>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FcdRouteTravelTimeResult[]`
- Yanıt alanları: `Date` (date), `TravelTime` (integer): Saniye cinsinden seyahat süresi, `SystemMessageId` (integer): SYSTEM_TYPE değeri 5 ise DisplayMessageId; 2 ise TRF_MSG_ID, `SystemId` (integer): SYSTEM_TYPE değeri 5 ise YDSNo; 2 ise SYSTEM_ID, `MessageId` (integer): SYSTEM_TYPE değeri 5 ise MESSAGE_ID; 2 ise RouteId, `SystemType` (byte): 5:YDS; 2:VMS;, `RouteName` (string), `RouteLength` (integer), `RouteFrom` (string), `RouteTo` (string), `ColorClassId` (integer), `ColorClassName` (string), `MsgIdentifier` (string): SystemType,, SystemMessageId, SystemId, MessageId birleşiminden oluşan benzersiz rota IDsi
            Format: R[3][4][4][4]
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/GetTravelTimes'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/SaveEvent`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-EurasiaTunnel-v1-SaveEvent>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Result`
- Yanıt alanları: `Detail` (string): Oluşan hatanın ayrıntısı, `Status` (string): ok: işlem başarılı
            error: hata oluştur ayrıntı Error Alanında
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/SaveEvent' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "Encrypted": true,
  "EncryptedText": "sample string 2",
  "Id": 3,
  "EventType": 4,
  "Date": "2026-03-11T17:15:50.7464778+03:00"
}'
```
- Örnek istek gövdesi:
```json
{
  "Encrypted": true,
  "EncryptedText": "sample string 2",
  "Id": 3,
  "EventType": 4,
  "Date": "2026-03-11T17:15:50.7464778+03:00"
}
```
- Örnek yanıt:
```json
{
  "Detail": "sample string 1",
  "Status": "sample string 2"
}
```

### `POST /api/EurasiaTunnel/v1/SaveObservation`

- Açıklama: Sensör Gözlemlerini(Observation) kaydeder.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/SaveObservation`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-EurasiaTunnel-v1-SaveObservation>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Result`
- Yanıt alanları: `Detail` (string): Oluşan hatanın ayrıntısı, `Status` (string): ok: işlem başarılı
            error: hata oluştur ayrıntı Error Alanında
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/EurasiaTunnel/v1/SaveObservation' \
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
- Örnek istek gövdesi:
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
- Örnek yanıt:
```json
{
  "Detail": "sample string 1",
  "Status": "sample string 2"
}
```

## CleanEnergy

### `POST /api/CleanEnergy/v1/CsvContent`

- Açıklama: No documentation available.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/CleanEnergy/v1/CsvContent`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-CleanEnergy-v1-CsvContent>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CleanEnergyResponse`
- Yanıt alanları: `Result` (string)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/CleanEnergy/v1/CsvContent' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "DataIdentifier": "sample string 1",
  "FileContent": "sample string 2"
}'
```
- Örnek istek gövdesi:
```json
{
  "DataIdentifier": "sample string 1",
  "FileContent": "sample string 2"
}
```
- Örnek yanıt:
```json
{
  "Result": "sample string 1"
}
```

## CitixController

### `GET /api/Citix/v1/BridgesStatus`

- Açıklama: No documentation available.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/BridgesStatus`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-BridgesStatus>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `BridgeRouteStatusModel[]`
- Yanıt alanları: `RouteId` (integer), `RouteName` (string), `Status` (string), `OrderNo` (integer), `GroupId` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/BridgesStatus'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/Camera`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-Camera>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraGroupedList[]`
- Yanıt alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/Camera'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/CurrentAnnouncement`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-CurrentAnnouncement>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AnnouncementModel[]`
- Yanıt alanları: `Id` (integer), `Metin` (string), `MetinIng` (string), `Tipi` (integer), `BitisTarihi` (date), `Link` (string), `Baslik` (string), `BaslikIng` (string), `Koordinat` (string), `Oncelik` (integer), `KameraId` (integer), `GirisTarihi` (date), `xKoordinat` (string), `yKoordinat` (string), `TimeDiff` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/CurrentAnnouncement'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/DMPTravelTimes`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-DMPTravelTimes>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `FcdRouteTravelTimeResult[]`
- Yanıt alanları: `Date` (date), `TravelTime` (integer): Saniye cinsinden seyahat süresi, `SystemMessageId` (integer): SYSTEM_TYPE değeri 5 ise DisplayMessageId; 2 ise TRF_MSG_ID, `SystemId` (integer): SYSTEM_TYPE değeri 5 ise YDSNo; 2 ise SYSTEM_ID, `MessageId` (integer): SYSTEM_TYPE değeri 5 ise MESSAGE_ID; 2 ise RouteId, `SystemType` (byte): 5:YDS; 2:VMS;, `RouteName` (string), `RouteLength` (integer), `RouteFrom` (string), `RouteTo` (string), `ColorClassId` (integer), `ColorClassName` (string), `MsgIdentifier` (string): SystemType,, SystemMessageId, SystemId, MessageId birleşiminden oluşan benzersiz rota IDsi
            Format: R[3][4][4][4]
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/DMPTravelTimes'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/Parking`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-Parking>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ParkingInfo[]`
- Yanıt alanları: `PLotId` (integer), `PLotName` (string), `PLotCapasity` (integer), `PLotSortId` (integer), `PLotSort` (string), `PLotIspark` (boolean), `PLotComp` (string), `PLotIsOpen` (boolean), `PLotAvailableCount` (integer), `PLotAvailableRate` (integer), `PLotUpToDateStatus` (integer), `PLotDate` (date), `PLotLatitude` (string), `PLotLongitude` (string), `PLotLocation` (string), `PLotAddress` (string), `PLotDistrict` (string), `PWorkingHours` (string)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/Parking'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/TrafficIndex`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Citix-v1-TrafficIndex>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `ResponseTrafficIndex_Sc1_Cont`
- Yanıt alanları: `TI` (byte), `TI_An` (byte), `TI_Av` (byte)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Citix/v1/TrafficIndex'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Atak/JunctionTTU/v1/tbOccupanciesData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Atak-JunctionTTU-v1-tbOccupanciesData>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `tbOccupanciesArchiveRequest`
- İstek gövdesi alanları: `JuncIX` (integer, Required), `startDate` (date, Required), `endDate` (date, Required)
- Yanıt modeli: `tbOccupanciesArchive[]`
- Yanıt alanları: `JuncIX` (integer), `SubjuncIX` (integer), `StartDate` (date), `PhaseIX` (integer), `EndDate` (date), `PackageIX` (integer), `PhaseTime` (integer), `O1` (integer), `O2` (integer), `O3` (integer), `O4` (integer), `O5` (integer), `O6` (integer), `O7` (integer), `O8` (integer), `O9` (integer), `O10` (integer), `O11` (integer), `O12` (integer), `O13` (integer), `O14` (integer), `O15` (integer), `O16` (integer), `O17` (integer), `O18` (integer), `O19` (integer), `O20` (integer), `O21` (integer), `O22` (integer), `O23` (integer), `O24` (integer), `O25` (integer), `O26` (integer), `O27` (integer), `O28` (integer), `O29` (integer), `O30` (integer), `O31` (integer), `O32` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Atak/JunctionTTU/v1/tbOccupanciesData'
```
- Örnek istek gövdesi:
```json
{
  "JuncIX": 1,
  "startDate": "2026-03-11T17:15:50.7933615+03:00",
  "endDate": "2026-03-11T17:15:50.7933615+03:00"
}
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Atak/JunctionTTU/v1/tbVolumesData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Atak-JunctionTTU-v1-tbVolumesData>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `tbVolumesArchiveRequest`
- İstek gövdesi alanları: `JuncIX` (integer, Required), `startDate` (date, Required), `endDate` (date, Required)
- Yanıt modeli: `tbVolumesArchive[]`
- Yanıt alanları: `JuncIX` (integer), `SubjuncIX` (integer), `PhaseIX` (integer), `PackageIX` (integer), `StartDate` (date), `EndDate` (date), `PhaseTime` (integer), `V1` (integer), `V2` (integer), `V3` (integer), `V4` (integer), `V5` (integer), `V6` (integer), `V7` (integer), `V8` (integer), `V9` (integer), `V10` (integer), `V11` (integer), `V12` (integer), `V13` (integer), `V14` (integer), `V15` (integer), `V16` (integer), `V17` (integer), `V18` (integer), `V19` (integer), `V20` (integer), `V21` (integer), `V22` (integer), `V23` (integer), `V24` (integer), `V25` (integer), `V26` (integer), `V27` (integer), `V28` (integer), `V29` (integer), `V30` (integer), `V31` (integer), `V32` (integer), `LV1` (integer), `LV2` (integer), `LV3` (integer), `LV4` (integer), `LV5` (integer), `LV6` (integer), `LV7` (integer), `LV8` (integer), `LV9` (integer), `LV10` (integer), `LV11` (integer), `LV12` (integer), `LV13` (integer), `LV14` (integer), `LV15` (integer), `LV16` (integer), `LV17` (integer), `LV18` (integer), `LV19` (integer), `LV20` (integer), `LV21` (integer), `LV22` (integer), `LV23` (integer), `LV24` (integer), `LV25` (integer), `LV26` (integer), `LV27` (integer), `LV28` (integer), `LV29` (integer), `LV30` (integer), `LV31` (integer), `LV32` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Atak/JunctionTTU/v1/tbVolumesData'
```
- Örnek istek gövdesi:
```json
{
  "JuncIX": 1,
  "startDate": "2026-03-11T17:15:50.7933615+03:00",
  "endDate": "2026-03-11T17:15:50.7933615+03:00"
}
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Atak/v1/tbOccupanciesData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Atak-v1-tbOccupanciesData>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `tbOccupanciesArchiveRequest`
- İstek gövdesi alanları: `JuncIX` (integer, Required), `startDate` (date, Required), `endDate` (date, Required)
- Yanıt modeli: `tbOccupanciesArchive[]`
- Yanıt alanları: `JuncIX` (integer), `SubjuncIX` (integer), `StartDate` (date), `PhaseIX` (integer), `EndDate` (date), `PackageIX` (integer), `PhaseTime` (integer), `O1` (integer), `O2` (integer), `O3` (integer), `O4` (integer), `O5` (integer), `O6` (integer), `O7` (integer), `O8` (integer), `O9` (integer), `O10` (integer), `O11` (integer), `O12` (integer), `O13` (integer), `O14` (integer), `O15` (integer), `O16` (integer), `O17` (integer), `O18` (integer), `O19` (integer), `O20` (integer), `O21` (integer), `O22` (integer), `O23` (integer), `O24` (integer), `O25` (integer), `O26` (integer), `O27` (integer), `O28` (integer), `O29` (integer), `O30` (integer), `O31` (integer), `O32` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Atak/v1/tbOccupanciesData'
```
- Örnek istek gövdesi:
```json
{
  "JuncIX": 1,
  "startDate": "2026-03-11T17:15:50.7777246+03:00",
  "endDate": "2026-03-11T17:15:50.7777246+03:00"
}
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Atak/v1/tbVolumesData`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Atak-v1-tbVolumesData>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `tbVolumesArchiveRequest`
- İstek gövdesi alanları: `JuncIX` (integer, Required), `startDate` (date, Required), `endDate` (date, Required)
- Yanıt modeli: `tbVolumesArchive[]`
- Yanıt alanları: `JuncIX` (integer), `SubjuncIX` (integer), `PhaseIX` (integer), `PackageIX` (integer), `StartDate` (date), `EndDate` (date), `PhaseTime` (integer), `V1` (integer), `V2` (integer), `V3` (integer), `V4` (integer), `V5` (integer), `V6` (integer), `V7` (integer), `V8` (integer), `V9` (integer), `V10` (integer), `V11` (integer), `V12` (integer), `V13` (integer), `V14` (integer), `V15` (integer), `V16` (integer), `V17` (integer), `V18` (integer), `V19` (integer), `V20` (integer), `V21` (integer), `V22` (integer), `V23` (integer), `V24` (integer), `V25` (integer), `V26` (integer), `V27` (integer), `V28` (integer), `V29` (integer), `V30` (integer), `V31` (integer), `V32` (integer), `LV1` (integer), `LV2` (integer), `LV3` (integer), `LV4` (integer), `LV5` (integer), `LV6` (integer), `LV7` (integer), `LV8` (integer), `LV9` (integer), `LV10` (integer), `LV11` (integer), `LV12` (integer), `LV13` (integer), `LV14` (integer), `LV15` (integer), `LV16` (integer), `LV17` (integer), `LV18` (integer), `LV19` (integer), `LV20` (integer), `LV21` (integer), `LV22` (integer), `LV23` (integer), `LV24` (integer), `LV25` (integer), `LV26` (integer), `LV27` (integer), `LV28` (integer), `LV29` (integer), `LV30` (integer), `LV31` (integer), `LV32` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Atak/v1/tbVolumesData'
```
- Örnek istek gövdesi:
```json
{
  "JuncIX": 1,
  "startDate": "2026-03-11T17:15:50.7933615+03:00",
  "endDate": "2026-03-11T17:15:50.7933615+03:00"
}
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Survey/v1/Save`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Survey-v1-Save>
- Yol/query parametreleri: Yok.
- İstek gövdesi modeli: `SurveyInsertModel`
- İstek gövdesi alanları: `SurveyID` (integer, Required), `ChoiceID` (integer, Required)
- Yanıt modeli: `ResponseSurvey`
- Yanıt alanları: `Result` (integer)
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Survey/v1/Save' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "SurveyID": 1,
  "ChoiceID": 2
}'
```
- Örnek istek gövdesi:
```json
{
  "SurveyID": 1,
  "ChoiceID": 2
}
```
- Örnek yanıt:
```json
{
  "Result": 1
}
```

## Camera

### `GET /api/Camera/v1/All`

- Açıklama: ENG: Get all camera list from server.Returns null if there's a server error.
            TR: Tüm kamera listesini döndürür. Sunucu  hatası olması durumunda null döndürür.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/All`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-All>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraBase[]`
- Yanıt alanları: `ID` (integer): Camera ID, `Name` (string): Camera Name (Location), `XCoord` (string): X Coordinate of camera, `YCoord` (string): Y Coordinate of camera, `VideoURL` (string): Live camera Video URL, `SSLVideoURL` (string): GroupID, `GroupId` (string): GroupID
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/All'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/All/{id}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-All-id>
- Yol/query parametreleri: `id` (string, Required): ID of the Camera
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraBase[]`
- Yanıt alanları: `ID` (integer): Camera ID, `Name` (string): Camera Name (Location), `XCoord` (string): X Coordinate of camera, `YCoord` (string): Y Coordinate of camera, `VideoURL` (string): Live camera Video URL, `SSLVideoURL` (string): GroupID, `GroupId` (string): GroupID
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/All/<id>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/Camera`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-Camera>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraGroupedList[]`
- Yanıt alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/Camera'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/CameraGroup`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-CameraGroup>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraGroupedList[]`
- Yanıt alanları: `Group` (Collection of CameraGroupedItem), `ID` (integer), `Name` (string): Kamera Adı, `XCoord` (string): Longitude değeri, `YCoord` (string): Latitude değeri, `VideoURL` (string): SSL'siz link yayınlanma alanı, `VideoURL_SSL` (string): Her zaman Videonun SSL'li linki buradan yayınlanır, `GroupId` (integer): Aynı direk üzerinde bulunan kameralar için ilk kamera ID'si diğerleri için Grup ID'si olarak tanımlanır, `Images` (Collection of string): Kameradan çekilen son 3 görüntü
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/CameraGroup'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/CropFactorSave`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/POST-api-Camera-v1-CropFactorSave>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `AdsızModel`
- Yanıt alanları: Yok.
- Örnek çağrı:
```bash
curl -sL -X POST 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/CropFactorSave' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "CameraNo": 1,
  "CropTopLeftX": 2,
  "CropTopLeftY": 3,
  "CropBottomRightX": 4,
  "CropBottomRightY": 5
}'
```
- Örnek istek gövdesi:
```json
{
  "CameraNo": 1,
  "CropTopLeftX": 2,
  "CropTopLeftY": 3,
  "CropBottomRightX": 4,
  "CropBottomRightY": 5
}
```
- Örnek yanıt:
```json
1
```

### `GET /api/Camera/v1/DashCameraCount`

- Açıklama: No documentation available.
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/DashCameraCount`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-DashCameraCount>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `Result_INT`
- Yanıt alanları: `Res` (integer)
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/DashCameraCount'
```
- Örnek yanıt:
```json
{
  "Res": 1
}
```

### `GET /api/Camera/v1/Details`

- Açıklama: Tüm kameraları donanımsal özellikleri ile birlikte listeler
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/Details`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-Details>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraIdentityCard[]`
- Yanıt alanları: `CameraNo` (integer): Kamera No, `CameraName` (string), `CameraBrand` (string): Kamera Adı, `CameraModel` (string): Kamera Modeli, `IsActive` (boolean), `IPAddress` (string), `RTSPURL` (string), `State` (string), `Format` (string), `Resolution` (string), `WowzaStream` (string), `WowzaStreamSSL` (string), `TunnelCamera` (boolean): Tünel Kamerası mı?, `XCoord` (string): Kameranın kurulu olduğu noktanın X Koordinatı, `YCoord` (string): Kameranın kurulu olduğu noktanın Y Koordinatı, `CameraCaptureDate` (string): Kameradan görüntü alınma tarihi, `CameraCaptureImage` (string): Kamera ekran görüntüsü, `CropTopLeftX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropTopLeftY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/Details'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/GetCamera/{camId}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-GetCamera-camId>
- Yol/query parametreleri: `camId` (integer, Required): Resim alınacak Kamera ID
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraModel`
- Yanıt alanları: `Tarih` (date): Resmin üretildiği tarih, `Images` (Collection of string): Resim Listesi
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/GetCamera/<camId>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/GetDetail/{cameraNo}`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v1-GetDetail-cameraNo>
- Yol/query parametreleri: `cameraNo` (integer, Required)
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraIdentityCard`
- Yanıt alanları: `CameraNo` (integer): Kamera No, `CameraName` (string), `CameraBrand` (string): Kamera Adı, `CameraModel` (string): Kamera Modeli, `IsActive` (boolean), `IPAddress` (string), `RTSPURL` (string), `State` (string), `Format` (string), `Resolution` (string), `WowzaStream` (string), `WowzaStreamSSL` (string), `TunnelCamera` (boolean): Tünel Kamerası mı?, `XCoord` (string): Kameranın kurulu olduğu noktanın X Koordinatı, `YCoord` (string): Kameranın kurulu olduğu noktanın Y Koordinatı, `CameraCaptureDate` (string): Kameradan görüntü alınma tarihi, `CameraCaptureImage` (string): Kamera ekran görüntüsü, `CropTopLeftX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropTopLeftY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v1/GetDetail/<cameraNo>'
```
- Örnek yanıt:
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
- Tam URL: `https://tkmservices.ibb.gov.tr/Web/api/Camera/v2/Details`
- Help sayfası: <https://tkmservices.ibb.gov.tr/Web/Help/Api/GET-api-Camera-v2-Details>
- Yol/query parametreleri: Yok.
- İstek gövdesi: Yok.
- Yanıt modeli: `CameraIdentityCard[]`
- Yanıt alanları: `CameraNo` (integer): Kamera No, `CameraName` (string), `CameraBrand` (string): Kamera Adı, `CameraModel` (string): Kamera Modeli, `IsActive` (boolean), `IPAddress` (string), `RTSPURL` (string), `State` (string), `Format` (string), `Resolution` (string), `WowzaStream` (string), `WowzaStreamSSL` (string), `TunnelCamera` (boolean): Tünel Kamerası mı?, `XCoord` (string): Kameranın kurulu olduğu noktanın X Koordinatı, `YCoord` (string): Kameranın kurulu olduğu noktanın Y Koordinatı, `CameraCaptureDate` (string): Kameradan görüntü alınma tarihi, `CameraCaptureImage` (string): Kamera ekran görüntüsü, `CropTopLeftX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropTopLeftY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightX` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır, `CropBottomRightY` (integer): Görüntüde kırpma yapılacaksa sol üst köşe (0,0) kabul edilerek verilen sağ alt köşe koordinatına kadar sınır kabul eden dikdörtgen kırpılır
- Örnek çağrı:
```bash
curl -sL 'https://tkmservices.ibb.gov.tr/Web/api/Camera/v2/Details'
```
- Örnek yanıt:
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
