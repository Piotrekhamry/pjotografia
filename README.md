# Pjotografia

Strona fotograficzna Piotra Hamryszczaka (statyczny HTML/CSS/JS, hostowana na Vercel).

## Co gdzie zmieniać

| Co chcesz zmienić | Gdzie |
|---|---|
| Imię, podpis pod nazwiskiem, e-mail, linki do social media, zdjęcie w tle strony głównej, nazwa konta Cloudinary | `js/config.js` |
| Nazwy i opisy galerii, dodanie nowej galerii | `js/config.js` (lista `galleries`) |
| Pozycje w menu | `js/site.js` (sekcja "Nagłówek i stopka") |
| Tekst na stronie głównej (hasło, "Cześć, jestem Piotr") | `index.html` |
| Biografia, sprzęt, osiągnięcia | `o-mnie.html` |
| Opis sesji plenerowych, cennik | `sesje-plenerowe.html` |
| Teksty Warsztatów, Sklepu, Ebooków, Wydruków, Współpracy, Bloga | pliki o tych nazwach (`warsztaty.html` itd.) |
| Kolory, czcionki, odstępy | `css/style.css` (kolory na samej górze, w `:root`) |

Edytować możesz od razu na GitHubie: otwórz plik → ikona ołówka → zmień → "Commit changes". Vercel odświeży stronę po minucie.
Pola typu `[Do uzupełnienia: ...]` (pomarańczowa kursywa) to miejsca na Twoje teksty. Zastąp cały akapit `<p class="todo">...</p>` zwykłym `<p>Twój tekst</p>`.

## Dodawanie zdjęć: Cloudinary

1. Załóż darmowe konto na cloudinary.com.
2. W panelu skopiuj **Cloud name** i wpisz go w `js/config.js` w polu `cloudName`.
3. W panelu: Settings → Security → odznacz **"Resource list"** w sekcji "Restricted media types"
   (to pozwala stronie pobrać listę zdjęć danego tagu).
4. Wrzucaj zdjęcia w Media Library i nadawaj im **tag**. Tag decyduje, gdzie zdjęcie się pojawi:
   - `tatry`, `norwegia`, `zlota-godzina` — odpowiednie galerie,
   - `sesje` — zakładka Sesje plenerowe,
   - `wyrozniane` — "Najnowsze prace" na stronie głównej (do 9 sztuk, najnowsze pierwsze). Jedno zdjęcie może mieć kilka tagów.
5. Podpis zdjęcia: w Cloudinary otwórz zdjęcie → Context (metadata) → dodaj `caption` = `Twój podpis`. Bez tego podpisem jest nazwa pliku.

Nie trzeba nic wdrażać ponownie — strona pobiera listę zdjęć przy każdym wejściu.
Przed wrzuceniem zmniejsz zdjęcia do ok. 3000 px dłuższego boku, to wystarczy.

## Nowa galeria

Dodaj blok w `galleries` w `js/config.js` (id, tytuł, tag, opis). Menu, karty i sekcje utworzą się same.
Potem w Cloudinary oznaczaj zdjęcia nowym tagiem.
