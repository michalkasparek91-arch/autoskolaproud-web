// site-data.jsx — copy + content for autoškola proud

const COURSES = [
  {
    id: "b",
    code: "B",
    name: "Skupina B",
    sub: "osobní auto · plně elektrické",
    blurb: "Standardní řidičák na osobní auto. U nás od první jízdy v elektromobilu — automat, regenerativní brzda, plánování dojezdu.",
    hours: { drive: 28, theory: 8, sim: 2 },
    price: 19900,
    priceOld: 22500,
    duration: "10–14 týdnů",
    cohorts: 4,
    spotsLeft: 1,
    features: [
      "28 h jízdy v Hyundai Ioniq",
      "8 h teorie naživo, ne přes Zoom",
      "2 h simulátor — krizové situace, mlha, náledí",
      "Závěrečná zkouška na Magistrátu Ostrava",
      "Učebnice a online testy v ceně",
    ],
    accent: "var(--volt)",
  },
  {
    id: "b-intenziv",
    code: "B+",
    name: "Skupina B · Intenziv",
    sub: "rychlý kurz · 4 týdny",
    blurb: "Pro netrpělivé. Tři jízdy týdně, soustředěná teorie po blocích. Vhodné pro studenty o prázdninách a lidi, co potřebují řidičák na včera.",
    hours: { drive: 28, theory: 8, sim: 2 },
    price: 23900,
    duration: "4 týdny",
    cohorts: 2,
    spotsLeft: 3,
    features: [
      "Garantovaná zkouška do 5 týdnů od přihlášky",
      "Jízdy ráno, odpoledne i večer",
      "Stejný instruktor po celou dobu",
      "Vše ostatní jako u základního kurzu B",
    ],
    accent: "var(--ion)",
  },
  {
    id: "kondicni",
    code: "K",
    name: "Kondiční jízdy",
    sub: "už řídíš, ale chceš si sednout do elektriky",
    blurb: "Máš řidičák, ale poprvé sedáš za volant EV. Naučíme tě rekuperovat, plánovat nabíjení a parkovat couvací kamerou. 90 minut, žádné testy.",
    hours: { drive: 1.5, theory: 0, sim: 0 },
    price: 1490,
    duration: "90 min",
    cohorts: null,
    spotsLeft: null,
    features: [
      "Plánování nabíjení v reálné trase",
      "Rekuperace, one-pedal driving",
      "Couvací kamera, asistenční systémy",
      "Možnost balíčku 5× za 6 900 Kč",
    ],
    accent: "var(--paper)",
  },
];

const INSTRUCTORS = [
  {
    nm: "Martin Samec",
    role: "Instruktor · zakladatel · majitel",
    bio: "15 let za volantem, posledních 6 let výhradně na elektrice. Bývalý servisák Tesly. Učí klidně, jezdí předvídavě, na nikoho nekřičí — i když uděláš stejnou chybu potřetí. Mluví česky, anglicky a trochu polsky.",
    longBio: "Proud je celý on. Sám tě vyzvedne, sám tě naučí, sám s tebou pojede ke zkoušce. Žádná štafeta mezi pěti instruktory, žádné „toho neznám\u201c ráno před zkouškou. Jeden člověk, jedno auto, jeden plán.",
    spec: ["Skupina B · automat", "Teorie", "Kondiční jízdy", "CZ / EN / PL"],
    region: "Celá Ostrava + okolí",
    stats: [
      { n: "847", l: "absolventů" },
      { n: "15 let", l: "za volantem" },
      { n: "4,9 ★", l: "google reviews" },
    ],
  },
];

const FAQS = [
  {
    q: "Proč elektrické auto? Já chci jezdit s normálním.",
    a: "Normální auto v roce 2026 je automat. A většinou hybrid nebo elektrika. V EV se navíc naučíš plynulou jízdu rychleji — není co řadit, nic se neškube, nemusíš myslet na otáčky. Po složení zkoušky sedneš do čehokoliv s automatem (90 % nových aut) a budeš v pohodě.",
  },
  {
    q: "A co manuál? Nebudu pak umět řadit.",
    a: "Nebudeš. A nepotřebuješ. Drtivá většina nových aut se prodává s automatem, všechny elektriky jsou automaty, hybridy taky. V autopůjčovně si vybereš automat. Jediný důvod, proč by ses učil řadit, je nostalgie — a tu se naučíš za víkend, až to budeš potřebovat. Tvůj řidičák platí pro auta s automatickou převodovkou (kód 78), což je dnes 9 z 10 aut.",
  },
  {
    q: "Kde se odehrávají jízdy?",
    a: "Jízdy startují z parkoviště před učebnou na Havlíčkově nábřeží, hned u řeky Ostravice a zastávky Most Pionýrů. Trénujeme v centru, na obchvatu, na rýchlostních úsecích i v zóně 30. Teorie probíhá v učebně ve stejné budově.",
  },
  {
    q: "Jak dlouho trvá vyřízení žádosti?",
    a: "Online přihlášku vyřídíme do 24 hodin. Lékařský posudek si přineseš sám (žádost ti pošleme jako PDF). První jízda typicky do 7 dnů od přihlášky.",
  },
  {
    q: "Co když u zkoušky neuspěju?",
    a: "Opravná zkouška je 700 Kč na úřadě + 1 doplňková jízda u nás zdarma. Statisticky uspěje napoprvé 84 % našich studentů.",
  },
  {
    q: "Dá se platit na splátky?",
    a: "Ano, 0 % na 6 nebo 12 měsíců přes Home Credit. První splátka až po měsíci.",
  },
];

const STATS = [
  { n: "847", l: "absolventů" },
  { n: "84 %", l: "úspěšnost u 1. zkoušky" },
  { n: "0 g/km", l: "emise CO₂" },
  { n: "4,9", l: "★ google reviews" },
];

const ROUTES = [
  { nm: "Poruba", note: "obytné zóny, kruhové objezdy" },
  { nm: "Centrum", note: "tramvajové pruhy, jednosměrky" },
  { nm: "Rudná", note: "dálniční jízda, předjíždění" },
  { nm: "Hrabová", note: "průmyslová zóna, parkování" },
  { nm: "Beskydy", note: "horské serpentiny, rekuperace" },
];

Object.assign(window, { COURSES, INSTRUCTORS, FAQS, STATS, ROUTES });
