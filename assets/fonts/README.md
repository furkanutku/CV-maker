# Yazı Tipleri

Bu klasör, CV Oluşturucu uygulamasında kullanılabilecek özel yazı tiplerini içermektedir.

## Yaygın Yazı Tipleri

Uygulama varsayılan olarak sistemde yüklü olan yaygın yazı tiplerini kullanmaktadır:
- Arial
- Helvetica Neue
- Times New Roman
- Georgia
- Trebuchet MS
- Verdana
- Courier New

## Özel Yazı Tipleri Ekleme

Özel yazı tipleri eklemek isterseniz:

1. Yazı tipi dosyalarını (.woff, .woff2, .ttf, vb.) bu klasöre ekleyin.
2. `src/css/main.css` dosyasına @font-face tanımları ekleyin:

```css
@font-face {
  font-family: 'OzelYaziTipi';
  src: url('../../assets/fonts/ozel-yazi-tipi.woff2') format('woff2'),
       url('../../assets/fonts/ozel-yazi-tipi.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
```

3. Font seçim listesine yeni yazı tipini ekleyin:
   - `index.html` dosyasında fontFamily select elementini bulun ve yeni bir option ekleyin.