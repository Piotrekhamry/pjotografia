# Pjotografia

Strona fotograficzna Piotra Hamryszczaka (statyczny HTML/CSS/JS, hostowana na Vercel).

## Struktura

- `js/config.js` — **tu zmieniasz ustawienia**: dane kontaktowe, zdjęcie w tle, nazwę konta Cloudinary, listę galerii
- `js/site.js` — wspólne menu, stopka, siatka zdjęć i lightbox (menu zmieniasz w tym pliku)
- `css/style.css` — wygląd całej strony
- `data/photos.json` — zdjęcia zastępcze (używane, dopóki nie podasz `cloudName`)
- `*.html` — podstrony

## Dysk na zdjęcia: Cloudinary

1. Załóż darmowe konto na cloudinary.com.
2. W panelu skopiuj **Cloud name** i wpisz go w `js/config.js` w polu `cloudName`.
3. W panelu: Settings → Security → odznacz **"Resource list"** w sekcji "Restricted media types"
   (to pozwala stronie pobrać listę zdjęć danego tagu).
4. Wrzucaj zdjęcia w Media Library i nadawaj im **tag**:
   - `tatry`, `norwegia`, `zlota-godzina` — zdjęcie pojawi się w danej galerii,
   - `wyrozniane` — zdjęcie pojawi się też w "Najnowszych pracach" na stronie głównej.
5. Opcjonalnie: w polu Context zdjęcia dodaj `caption=Twój podpis`, żeby zmienić podpis.

Nie trzeba nic wdrażać ponownie — strona pobiera listę zdjęć przy każdym wejściu.

## Nowa galeria

Dodaj blok w `galleries` w `js/config.js` (id, tytuł, tag, opis). Menu, karty i sekcje utworzą się same.
