/*
 * USTAWIENIA STRONY — to jedyny plik, który zwykle musisz edytować.
 * Zdjęcia dodajesz w panelu Cloudinary (patrz README.md), a strona pobiera je sama.
 */
window.SITE = {
  name: "Piotr Hamryszczak",
  tagline: "Mountain Photographer",

  // Uzupełnij swoje dane kontaktowe (puste = element się nie wyświetli)
  email: "",                                   // np. "kontakt@twojadomena.pl"
  instagram: "https://instagram.com/pjotografia",
  facebook: "",
  px500: "",

  // Małe zdjęcie profilowe w nagłówku (puste = bez zdjęcia)
  avatar: "",

  // Zdjęcie w tle strony głównej (podmień na własne, np. z Cloudinary)
  hero: "https://res.cloudinary.com/sivhxknj/image/upload/v1793259284/Babia%20g%C3%B3ra.jpg",

  // Nazwa Twojego konta w Cloudinary (Dashboard → "Cloud name").
  // Dopóki jest puste, strona pokazuje zdjęcia zastępcze z data/photos.json.
  cloudName: "sivhxknj",

  // Zdjęcia z tym tagiem w Cloudinary pojawią się na stronie głównej w "Najnowszych pracach"
  featuredTag: "wyrozniane",

  // Galerie. "tag" = tag, którym oznaczasz zdjęcia w Cloudinary.
  galleries: [
    {
      id: "tatry",
      title: "Tatry i Karkonosze",
      tag: "tatry",
      description: "Wędrówki po górskich szlakach w poszukiwaniu idealnego światła."
    },
    {
      id: "norwegia",
      title: "Norwegia i Islandia",
      tag: "norwegia",
      description: "Niezwykłe formy geologiczne i arktyczne światło."
    },
    {
      id: "zlota-godzina",
      title: "Złota Godzina",
      tag: "zlota-godzina",
      description: "Palety barw o wschodzie i zachodzie słońca."
    }
  ]
};
