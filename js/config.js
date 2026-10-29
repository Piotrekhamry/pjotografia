/*
 * USTAWIENIA STRONY — to jedyny plik, który zwykle musisz edytować.
 * Zdjęcia dodajesz w panelu Cloudinary (patrz README.md), a strona pobiera je sama.
 */
window.SITE = {
  name: "Piotr Hamryszczak",
  tagline: "Mountain Photographer",

  email: "",
  instagram: "https://instagram.com/pjotografia",
  facebook: "",
  px500: "",

  // Zdjęcie profilowe (nagłówek i sekcja "Cześć, jestem Piotr"). Wklej adres z Cloudinary.
  avatar: "",

  // Zdjęcie w tle strony głównej
  hero: "https://res.cloudinary.com/sivhxknj/image/upload/v1793259284/Babia%20g%C3%B3ra.jpg",

  // Nazwa konta Cloudinary
  cloudName: "sivhxknj",

  featuredTag: "wyrozniane",

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
