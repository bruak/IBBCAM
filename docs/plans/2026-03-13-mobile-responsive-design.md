# Mobil Responsive Tasarim

## Hedef

Kamera uygulamasini mobilde harita odakli kullanilabilir hale getirmek; masaustu duzenini bozmadan filtreler, arama ve kamera listesine alttan acilan bir panel ile erisim saglamak.

## Secilen Yontem

Mobilde yan panel, sabit alt sheet olarak davranir. Harita tum ekran genisligini korur. Kullanici alt sheet'i acip kamera arar, filtreler ve listeyi gezer; kamera sectiginde panel kapanir, harita odaklanir ve mevcut modal acilir.

## Uygulama Kapsami

- `CAM/index.html`: mobil panel ust cubugu ve backdrop eklenir.
- `CAM/style.css`: alt sheet, backdrop, mobil breakpoint ve modal iyilestirmeleri eklenir.
- `CAM/app.js`: mobil panel ac/kapa durumu, harita yeniden boyutlandirma ve mobil ozet metni eklenir.

## Davranis Notlari

- Masaustunde mevcut sol panel yapisi korunur.
- Mobilde alt sheet kapali baslar; kullanici `Liste` dugmesi ile acar.
- Sheet acildiginda map boyutu `invalidateSize()` ile guncellenir.
- Kamera secimi ve modal acilisi sirasinda mobil sheet kapanir.
- Modal mobilde alta yaslanan, daha buyuk bir yapiya doner.

## Dogrulama

- 768px ve alti genislikte harita tam ekran kalmali.
- Liste kapali ve acik durumlarinda map kontrolleri bozulmamali.
- Arama, filtre, ilce secimi ve favoriler mobilde calismaya devam etmeli.
