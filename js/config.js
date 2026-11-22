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
  avatar: "https://res.cloudinary.com/sivhxknj/image/upload/v1793479099/IMG_8307.jpg",
  
  // Zdjęcie w tle strony głównej
  hero: "https://res.cloudinary.com/sivhxknj/image/upload/v1793259284/Babia%20g%C3%B3ra.jpg",

  // Nazwa konta Cloudinary
  cloudName: "sivhxknj",

  featuredTag: "wyrozniane",

  // Link do dobrowolnej wpłaty (np. buycoffee.to/pjotografia). Puste = przycisk się nie pokazuje.
  donate: "",

  // Moje aplikacje — pokazują się na stronie głównej, w menu i na stronie /linki.
  // Puste "url" = aplikacja jest ukryta.
  apps: [
    {
      name: "Morze chmur",
      url: "/morze-chmur/",
      icon: "morze-chmur/icons/icon-192.png",
      text: "Prognoza morza chmur i wschodów słońca dla szczytów. Sprawdzisz, czy warto wstać o 4 rano."
    },
    {
      name: "W Formie",
      url: "",
      icon: "img/w-formie.png",
      text: "Aplikacja treningowa dla ludzi gór – siła i kondycja, żeby szlak był przyjemnością."
    }
  ],

  galleries: [
    {
      id: "Babia góra",
      title: "Babia góra",
      tag: "babia",
      description: ""
    },
    {
      id: "Tarty",
      title: "Tatry",
      tag: "tatry",
      description: ""
    },
    {
      id: "Za progiem",
      title: "Za progiem",
      tag: "przyroda lokalnie",
      description: "Zdjęcia z okolic domu i z drogi do pracy. Piękno nie zawsze wymaga wyprawy."
      },
    {
      id: "Bieszczady",
      title: "Bieszczady",
      tag: "bieszczady",
      description: ""
    },
    {
      id: "Pieniny",
      title: "Pieniny",
      tag: "pieniny",
      description: ""
      },
    {
      id: "Gorce",
      title: "Gorce",
      tag: "gorce",
      description: ""
        },
    {
      id: "Pogórze przemyskie",
      title: "Pogórze przemyskie",
      tag: "pogorze przemyskie",
      description: ""
    }
  ]
};
