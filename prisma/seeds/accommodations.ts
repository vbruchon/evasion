import type { AccommodationAccessKey } from "../../src/lib/accommodations/accommodation-accesses";
import type { AccommodationAmenityKey } from "../../src/lib/accommodations/accommodation-amenities";

type SeedAmenity = {
  key: AccommodationAmenityKey;
  details?: string;
};

type SeedAccess = {
  key: AccommodationAccessKey;
  details?: string;
};

const createAmenities = (amenities: SeedAmenity[]) => ({
  create: amenities.map((amenity, position) => ({
    ...amenity,
    position,
  })),
});

const createAccesses = (accesses: SeedAccess[]) => ({
  create: accesses,
});

const createImages = ({
  directory,
  alts,
}: {
  directory: string;
  alts: {
    hero: string;
    presentation: string;
    gallery: string[];
  };
}) => ({
  create: [
    {
      url: `/images/accommodations/${directory}/hero.webp`,
      fileKey: `seed-demo-${directory}-hero`,
      alt: alts.hero,
      position: 0,
      isCover: true,
      isPresentation: false,
    },
    {
      url: `/images/accommodations/${directory}/presentation.webp`,
      fileKey: `seed-demo-${directory}-presentation`,
      alt: alts.presentation,
      position: 1,
      isCover: false,
      isPresentation: true,
    },
    ...alts.gallery.map((alt, index) => ({
      url: `/images/accommodations/${directory}/gallery-${String(
        index + 1,
      ).padStart(2, "0")}.webp`,
      fileKey: `seed-demo-${directory}-gallery-${String(index + 1).padStart(
        2,
        "0",
      )}`,
      alt,
      position: index + 2,
      isCover: false,
      isPresentation: false,
    })),
  ],
});

export const accommodations = [
  {
    name: "La Cabane",
    slug: "la-cabane",
    type: "Cabane perchée",
    subtitle:
      "Un refuge en bois suspendu au milieu des arbres pour ralentir à deux",
    shortDescription:
      "Une cabane perchée et intimiste, enveloppée par la forêt du Vercors.",
    description:
      "Perchée entre les arbres, La Cabane offre une parenthèse simple et chaleureuse au cœur d’une forêt préservée du Vercors.\n\nSon architecture compacte privilégie le bois, la lumière naturelle et une relation permanente avec la végétation. Depuis le salon comme depuis la chambre, les grandes ouvertures donnent l’impression de vivre directement parmi les arbres.\n\nSur la terrasse, un bain chaud privatif prolonge l’expérience en extérieur. Ici, pas de panorama spectaculaire ni de grands volumes : tout a été pensé autour du calme, de l’intimité et du plaisir de se retrouver à deux.",

    guestCapacity: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    surface: 32,

    locationTitle: "Cachée dans les forêts du Vercors",
    locationDescription:
      "La Cabane se situe dans un secteur boisé à proximité de Léoncel, entre sous-bois, reliefs doux et chemins forestiers. Sa localisation volontairement approximative préserve l’intimité du lieu tout en permettant de découvrir facilement le Vercors drômois.",
    locationLatitude: 44.906,
    locationLongitude: 5.195,
    locationRadiusMeters: 5000,

    availabilityCalendarUrl: "/api/demo-calendars/cabane.ics",
    bookingUrl: null,

    status: "PUBLISHED" as const,
    position: 1,
    publishedAt: new Date(),

    highlights: {
      create: [
        {
          title: "Cabane perchée",
          description: "Un refuge suspendu entre les arbres",
          icon: "Trees",
          position: 0,
        },
        {
          title: "Bain chaud privatif",
          description: "Un moment de détente au cœur de la forêt",
          icon: "Waves",
          position: 1,
        },
        {
          title: "Ambiance cocooning",
          description: "Bois, lumière douce et intimité",
          icon: "Heart",
          position: 2,
        },
        {
          title: "Calme absolu",
          description: "Une parenthèse loin du quotidien",
          icon: "Moon",
          position: 3,
        },
      ],
    },

    amenities: createAmenities([
      { key: "hair-dryer" },
      { key: "shampoo" },
      { key: "body-soap" },
      { key: "hot-water" },
      { key: "essentials" },
      { key: "bed-linen" },
      { key: "extra-pillows-blankets" },
      { key: "heating" },
      { key: "wifi" },
      { key: "kitchen" },
      { key: "refrigerator" },
      { key: "coffee-maker" },
      { key: "coffee" },
      { key: "outdoor-furniture" },
      { key: "jacuzzi", details: "Bain chaud privatif sur la terrasse" },
      { key: "free-parking-on-premises", details: "À proximité du logement" },
    ]),

    accesses: createAccesses([
      {
        key: "car-access",
        details: "Accès par une petite route forestière",
      },
      {
        key: "parking",
        details: "Stationnement privé à proximité",
      },
      {
        key: "walk-to-accommodation",
        details: "Court chemin aménagé entre le parking et la cabane",
      },
      {
        key: "stairs",
        details: "Escalier extérieur pour rejoindre la cabane",
      },
    ]),

    images: createImages({
      directory: "cabane",
      alts: {
        hero: "La Cabane perchée au milieu de la forêt",
        presentation:
          "Salon chaleureux en bois de La Cabane ouvert sur les arbres",
        gallery: [
          "Chambre de La Cabane avec vue sur la forêt",
          "Terrasse en bois et bain chaud privatif de La Cabane",
          "Vue sur la forêt depuis le salon de La Cabane",
          "Salle de bain aux matières naturelles de La Cabane",
          "Détail du salon en bois de La Cabane",
        ],
      },
    }),
  },

  {
    name: "Le Chalet",
    slug: "le-chalet",
    type: "Chalet panoramique",
    subtitle:
      "Un chalet chaleureux ouvert sur les reliefs du Vercors et les lumières du soir",
    shortDescription:
      "Un chalet panoramique en bois avec bain chaud face aux reliefs du Vercors.",
    description:
      "Installé sur les hauteurs du Vercors, Le Chalet associe l’atmosphère chaleureuse d’un refuge de montagne à de larges ouvertures tournées vers le paysage.\n\nLe bois habille les volumes généreux tandis que la grande façade vitrée accompagne la lumière tout au long de la journée. Le salon et la chambre prolongent naturellement le regard vers les reliefs environnants.\n\nÀ l’extérieur, la terrasse devient une véritable pièce supplémentaire. Le bain chaud privatif permet de profiter du panorama jusqu’au coucher du soleil, dans une ambiance pensée pour ralentir et savourer chaque instant.",

    guestCapacity: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    surface: 68,

    locationTitle: "Sur les hauteurs du Vercors drômois",
    locationDescription:
      "Le Chalet se trouve dans les environs de Vassieux-en-Vercors, au cœur d’un paysage mêlant forêts, clairières et reliefs montagneux. Le secteur offre de nombreux départs de randonnée tout en conservant une vraie sensation d’isolement.",
    locationLatitude: 44.894,
    locationLongitude: 5.37,
    locationRadiusMeters: 6000,

    availabilityCalendarUrl: "/api/demo-calendars/chalet.ics",
    bookingUrl: "https://www.airbnb.fr/",

    status: "PUBLISHED" as const,
    position: 2,
    publishedAt: new Date(),

    highlights: {
      create: [
        {
          title: "Vue panoramique",
          description: "Les reliefs du Vercors face au chalet",
          icon: "Mountain",
          position: 0,
        },
        {
          title: "Bain chaud extérieur",
          description: "Profitez du paysage depuis la terrasse",
          icon: "Waves",
          position: 1,
        },
        {
          title: "Esprit chalet",
          description: "Bois naturel et volumes chaleureux",
          icon: "Flame",
          position: 2,
        },
        {
          title: "Terrasse privative",
          description: "Un espace ouvert sur la montagne",
          icon: "Sun",
          position: 3,
        },
      ],
    },

    amenities: createAmenities([
      { key: "mountain-view" },
      { key: "hair-dryer" },
      { key: "shampoo" },
      { key: "hot-water" },
      { key: "essentials" },
      { key: "bed-linen" },
      { key: "extra-pillows-blankets" },
      { key: "heating" },
      { key: "wifi" },
      { key: "kitchen" },
      { key: "refrigerator" },
      { key: "freezer" },
      { key: "cooking-basics" },
      { key: "dishes-cutlery" },
      { key: "coffee-maker" },
      { key: "dining-table" },
      { key: "outdoor-furniture" },
      { key: "outdoor-dining" },
      { key: "jacuzzi", details: "Bain chaud extérieur avec vue" },
      { key: "free-parking-on-premises", details: "Sur place" },
    ]),

    accesses: createAccesses([
      {
        key: "car-access",
        details: "Accessible en voiture par une route de montagne",
      },
      {
        key: "parking",
        details: "Deux places privées au pied du chalet",
      },
      {
        key: "stairs",
        details: "Quelques marches pour rejoindre l’entrée",
      },
      {
        key: "self-check-in",
        details: "Arrivée autonome grâce à une boîte à clé sécurisée",
      },
    ]),

    images: createImages({
      directory: "chalet",
      alts: {
        hero: "Le Chalet en bois dominant les reliefs du Vercors",
        presentation: "Salon panoramique du Chalet ouvert sur les montagnes",
        gallery: [
          "Chambre en bois du Chalet",
          "Bain chaud sur la terrasse panoramique du Chalet",
          "Terrasse et espace repas extérieur du Chalet",
          "Vue sur le Vercors depuis la terrasse du Chalet",
          "Détail du salon du Chalet face au panorama",
        ],
      },
    }),
  },

  {
    name: "L’Écrin",
    slug: "lecrin",
    type: "Refuge architectural",
    subtitle:
      "Une architecture minérale presque effacée dans les reliefs sauvages de la Drôme",
    shortDescription:
      "Un refuge contemporain semi-enterré entre pierre, lumière et falaises calcaires.",
    description:
      "L’Écrin a été imaginé comme une architecture discrète, presque absorbée par le paysage minéral qui l’entoure.\n\nPartiellement intégré dans la pente, le logement mêle pierre claire, enduits naturels, bois sombre et grandes surfaces vitrées. À l’intérieur, les lignes sont volontairement sobres afin de laisser la lumière et les reliefs devenir les véritables éléments de décoration.\n\nLa terrasse et son bassin prolongent cette sensation d’ouverture. À toute heure de la journée, les falaises calcaires semblent entrer dans le logement et donnent au lieu une atmosphère aussi spectaculaire qu’apaisante.",

    guestCapacity: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    surface: 55,

    locationTitle: "Entre falaises et reliefs de la vallée de la Gervanne",
    locationDescription:
      "L’Écrin se cache dans les reliefs proches d’Omblèze, au sein d’un paysage minéral caractéristique de la Drôme. Falaises calcaires, végétation sèche et vallées encaissées composent un environnement radicalement différent des forêts du Vercors.",
    locationLatitude: 44.862,
    locationLongitude: 5.221,
    locationRadiusMeters: 7000,

    availabilityCalendarUrl: null,
    bookingUrl: "https://www.airbnb.fr/",

    status: "PUBLISHED" as const,
    position: 3,
    publishedAt: new Date(),

    highlights: {
      create: [
        {
          title: "Architecture minérale",
          description: "Un refuge intégré directement au relief",
          icon: "Sparkles",
          position: 0,
        },
        {
          title: "Bassin privatif",
          description: "Un espace d’eau ouvert sur les falaises",
          icon: "Waves",
          position: 1,
        },
        {
          title: "Vue sur les falaises",
          description: "Le paysage comme décor principal",
          icon: "Mountain",
          position: 2,
        },
        {
          title: "Design épuré",
          description: "Pierre, bois et lignes contemporaines",
          icon: "Leaf",
          position: 3,
        },
      ],
    },

    amenities: createAmenities([
      { key: "mountain-view" },
      { key: "hair-dryer" },
      { key: "body-soap" },
      { key: "hot-water" },
      { key: "essentials" },
      { key: "bed-linen" },
      { key: "blackout-shades" },
      { key: "air-conditioning" },
      { key: "heating" },
      { key: "wifi" },
      { key: "kitchen" },
      { key: "refrigerator" },
      { key: "coffee-maker" },
      { key: "wine-glasses" },
      { key: "outdoor-furniture" },
      { key: "sun-loungers" },
      { key: "free-parking-on-premises", details: "Sur la propriété" },
    ]),

    accesses: createAccesses([
      {
        key: "car-access",
        details: "Accès par une petite route de montagne",
      },
      {
        key: "parking",
        details: "Stationnement privé en retrait du logement",
      },
      {
        key: "walk-to-accommodation",
        details: "Quelques dizaines de mètres sur un chemin aménagé",
      },
      {
        key: "single-level",
        details: "Logement principalement de plain-pied",
      },
    ]),

    images: createImages({
      directory: "ecrin",
      alts: {
        hero: "L’Écrin intégré dans un paysage de falaises calcaires",
        presentation:
          "Salon contemporain de L’Écrin ouvert sur le bassin et les falaises",
        gallery: [
          "Chambre minimaliste de L’Écrin face au paysage",
          "Terrasse minérale et bassin privatif de L’Écrin",
          "Vue sur les falaises depuis le salon de L’Écrin",
          "Salle de bain minérale de L’Écrin",
          "Détail des matières naturelles et du bois de L’Écrin",
        ],
      },
    }),
  },

  {
    name: "La Bergerie",
    slug: "la-bergerie",
    type: "Bergerie en pierre",
    subtitle:
      "Une ancienne bergerie restaurée entre pierre, campagne et douceur provençale",
    shortDescription:
      "Une bergerie en pierre restaurée avec bassin, cheminée et horizons ouverts sur la Drôme.",
    description:
      "La Bergerie conserve l’essentiel de son histoire : des murs épais en pierre, une toiture en tuiles anciennes, des poutres apparentes et une cheminée autour de laquelle le temps semble ralentir.\n\nLa rénovation privilégie les matières simples et naturelles. Les espaces intérieurs mêlent mobilier contemporain discret, bois ancien, terre cuite et teintes lumineuses sans effacer le caractère rural du bâtiment.\n\nÀ l’extérieur, une grande terrasse en pierre et un bassin bordé de végétation ouvrent sur la campagne drômoise. Une adresse paisible pour profiter du soleil, des paysages agricoles et des longues soirées dehors.",

    guestCapacity: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    surface: 82,

    locationTitle: "Au milieu des collines de la Drôme",
    locationDescription:
      "La Bergerie se situe dans la campagne autour de Saoû, entre champs, petites routes et collines boisées. Le paysage, plus ouvert et méridional, offre une autre facette de la Drôme, entre patrimoine rural et premiers accents provençaux.",
    locationLatitude: 44.648,
    locationLongitude: 5.064,
    locationRadiusMeters: 7000,

    availabilityCalendarUrl: "/api/demo-calendars/bergerie.ics",
    bookingUrl: "https://www.airbnb.fr/",

    status: "PUBLISHED" as const,
    position: 4,
    publishedAt: new Date(),

    highlights: {
      create: [
        {
          title: "Maison de caractère",
          description: "Pierre ancienne et charme préservé",
          icon: "Star",
          position: 0,
        },
        {
          title: "Bassin extérieur",
          description: "Quelques brasses face à la campagne",
          icon: "Waves",
          position: 1,
        },
        {
          title: "Cheminée en pierre",
          description: "Le cœur chaleureux de la maison",
          icon: "Flame",
          position: 2,
        },
        {
          title: "Terrasse au soleil",
          description: "Repas et soirées en plein air",
          icon: "Sun",
          position: 3,
        },
      ],
    },

    amenities: createAmenities([
      { key: "hair-dryer" },
      { key: "shampoo" },
      { key: "body-soap" },
      { key: "hot-water" },
      { key: "essentials" },
      { key: "bed-linen" },
      { key: "extra-pillows-blankets" },
      { key: "heating" },
      { key: "wifi" },
      { key: "kitchen" },
      { key: "refrigerator" },
      { key: "freezer" },
      { key: "cooking-basics" },
      { key: "dishes-cutlery" },
      { key: "coffee-maker" },
      { key: "wine-glasses" },
      { key: "dining-table" },
      { key: "outdoor-furniture" },
      { key: "outdoor-dining" },
      { key: "sun-loungers" },
      { key: "free-parking-on-premises", details: "Dans la propriété" },
    ]),

    accesses: createAccesses([
      {
        key: "car-access",
        details: "Accès par une petite route de campagne",
      },
      {
        key: "parking",
        details: "Stationnement privé devant la propriété",
      },
      {
        key: "walk-to-accommodation",
        details: "Accès direct depuis la cour",
      },
      {
        key: "stairs",
        details: "Quelques marches entre les différents niveaux",
      },
    ]),

    images: createImages({
      directory: "bergerie",
      alts: {
        hero: "La Bergerie en pierre au cœur de la campagne drômoise",
        presentation: "Salon en pierre de La Bergerie avec cheminée ancienne",
        gallery: [
          "Chambre de La Bergerie aux murs en pierre",
          "Terrasse en pierre de La Bergerie",
          "Bassin extérieur de La Bergerie face à la campagne",
          "Cuisine et salle à manger de La Bergerie",
          "Détail du salon et de la cheminée de La Bergerie",
        ],
      },
    }),
  },

  {
    name: "Le Belvédère",
    slug: "le-belvedere",
    type: "Lodge panoramique",
    subtitle:
      "Une ligne contemporaine suspendue au-dessus du paysage pour vivre face au Vercors",
    shortDescription:
      "Un lodge contemporain spectaculaire suspendu face aux reliefs du Vercors.",
    description:
      "Le Belvédère a été dessiné autour d’une idée simple : faire disparaître la frontière entre l’intérieur et le paysage.\n\nPosé sur un promontoire rocheux, le lodge déploie une longue façade vitrée face aux reliefs du Vercors. Bois sombre, verre, métal et lignes horizontales composent une architecture volontairement contemporaine qui contraste avec la roche environnante.\n\nDepuis le salon, la chambre ou même la salle de bain, le panorama accompagne chaque moment. La terrasse suspendue et son spa encastré prolongent encore cette sensation de hauteur et font du lieu une véritable plateforme d’observation privée.",

    guestCapacity: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    surface: 72,

    locationTitle: "Suspendu au-dessus des reliefs du Vercors",
    locationDescription:
      "Le Belvédère domine un secteur escarpé du Vercors drômois, dans les environs de Saint-Julien-en-Vercors. Son emplacement offre de larges perspectives sur les plateaux, les falaises et les vallées environnantes.",
    locationLatitude: 45.05,
    locationLongitude: 5.445,
    locationRadiusMeters: 8000,

    availabilityCalendarUrl: "/api/demo-calendars/belvedere.ics",
    bookingUrl: "https://www.airbnb.fr/",

    status: "PUBLISHED" as const,
    position: 5,
    publishedAt: new Date(),

    highlights: {
      create: [
        {
          title: "Panorama exceptionnel",
          description: "Une vue ouverte à perte de vue",
          icon: "Mountain",
          position: 0,
        },
        {
          title: "Spa suspendu",
          description: "Un bain chaud directement face au paysage",
          icon: "Waves",
          position: 1,
        },
        {
          title: "Architecture contemporaine",
          description: "Verre, bois sombre et lignes épurées",
          icon: "Sparkles",
          position: 2,
        },
        {
          title: "Suite panoramique",
          description: "La montagne jusque depuis le lit",
          icon: "BedDouble",
          position: 3,
        },
      ],
    },

    amenities: createAmenities([
      { key: "mountain-view" },
      { key: "hair-dryer" },
      { key: "body-soap" },
      { key: "hot-water" },
      { key: "essentials" },
      { key: "bed-linen" },
      { key: "blackout-shades" },
      { key: "air-conditioning" },
      { key: "heating" },
      { key: "wifi" },
      { key: "kitchen" },
      { key: "refrigerator" },
      { key: "coffee-maker" },
      { key: "wine-glasses" },
      { key: "dining-table" },
      { key: "outdoor-furniture" },
      { key: "jacuzzi", details: "Spa encastré dans la terrasse" },
      { key: "free-parking-on-premises", details: "Sur la propriété" },
    ]),

    accesses: createAccesses([
      {
        key: "car-access",
        details: "Accès par une route de montagne",
      },
      {
        key: "parking",
        details: "Stationnement privé en amont du logement",
      },
      {
        key: "walk-to-accommodation",
        details: "Court chemin sécurisé jusqu’au lodge",
      },
      {
        key: "single-level",
        details: "Espaces de vie entièrement de plain-pied",
      },
    ]),

    images: createImages({
      directory: "belvedere",
      alts: {
        hero: "Le Belvédère suspendu face aux reliefs du Vercors",
        presentation: "Salon contemporain du Belvédère ouvert sur le panorama",
        gallery: [
          "Chambre panoramique du Belvédère",
          "Spa encastré sur la terrasse suspendue du Belvédère",
          "Vue sur le Vercors depuis le salon du Belvédère",
          "Salle de bain panoramique du Belvédère",
          "Façade en bois sombre et terrasse du Belvédère",
        ],
      },
    }),
  },
];
