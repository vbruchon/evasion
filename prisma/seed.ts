import "dotenv/config";

import type { AccommodationAmenityKey } from "../src/lib/accommodations/accommodation-amenities";
import { prisma } from "../src/lib/prisma";

type SeedAmenity = {
  key: AccommodationAmenityKey;
  details?: string;
};

const createAmenities = (amenities: SeedAmenity[]) => ({
  create: amenities.map((amenity, position) => ({
    ...amenity,
    position,
  })),
});

const accommodations = [
  {
    name: "La Cabane",
    slug: "la-cabane",
    type: "Cabane avec spa",
    subtitle:
      "Une cabane chaleureuse avec spa privatif et vue panoramique sur le Vercors",
    shortDescription:
      "Une cabane chaleureuse avec spa privatif et vue dégagée sur le Vercors.",
    description:
      "Offrez-vous une parenthèse au calme dans cette cabane chaleureuse, pensée pour deux personnes et nichée dans un environnement naturel avec vue sur le Vercors.\n\nEntre bois, lumière douce et ambiance cocooning, le logement invite à ralentir et à profiter pleinement du moment. Installez-vous sur la terrasse, détendez-vous dans le spa privatif et laissez-vous séduire par le paysage qui s’étend devant vous.\n\nUne escapade idéale pour un séjour romantique, une occasion particulière ou simplement quelques jours à deux loin du quotidien.",

    guestCapacity: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    surface: 28,

    city: null,
    region: null,

    status: "PUBLISHED" as const,
    position: 3,
    publishedAt: new Date(),

    highlights: {
      create: [
        {
          title: "Spa privatif",
          description: "Jacuzzi rien que pour vous",
          icon: "Waves",
          position: 0,
        },
        {
          title: "Vue sur le Vercors",
          description: "Panorama sur les reliefs du Vercors",
          icon: "Mountain",
          position: 1,
        },
        {
          title: "Ambiance cocooning",
          description: "Bois, douceur et intimité",
          icon: "Heart",
          position: 2,
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
      { key: "wifi" },
      { key: "heating" },
      { key: "kitchen" },
      { key: "refrigerator" },
      { key: "coffee-maker" },
      { key: "outdoor-furniture" },
      { key: "outdoor-dining" },
      { key: "jacuzzi", details: "Privatif" },
      { key: "free-parking-on-premises" },
    ]),

    images: {
      create: [
        {
          url: "/images/accommodations/cabane/hero.png",
          fileKey: "seed-demo-cabane-hero",
          alt: "Vue extérieure de La Cabane",
          position: 0,
          isCover: true,
          isPresentation: false,
        },
        {
          url: "/images/accommodations/cabane/gallery-01.png",
          fileKey: "seed-demo-cabane-gallery-01",
          alt: "Intérieur chaleureux de La Cabane",
          position: 1,
          isCover: false,
          isPresentation: true,
        },
        {
          url: "/images/accommodations/cabane/gallery-02.png",
          fileKey: "seed-demo-cabane-gallery-02",
          alt: "Terrasse et spa privatif de La Cabane",
          position: 2,
          isCover: false,
          isPresentation: false,
        },
      ],
    },
  },

  {
    name: "Le Chalet",
    slug: "le-chalet",
    type: "Chalet de montagne",
    subtitle: "Bois, sommets enneigés et bain chaud face aux montagnes",
    shortDescription:
      "Un refuge alpin en bois, entre bain chaud extérieur et horizons enneigés.",
    description:
      "Perché au cœur d’un paysage de montagne, Le Chalet invite à retrouver le plaisir d’un séjour simple, confortable et profondément dépaysant.\n\nÀ l’intérieur, le bois omniprésent, les lumières douces et l’esprit montagnard créent une ambiance enveloppante, idéale après une journée passée au grand air. Depuis la chambre comme depuis la terrasse, les sommets accompagnent chaque moment du séjour.\n\nÀ l’extérieur, le bain chaud devient le point de rendez-vous incontournable : quelques degrés sous zéro, la vapeur qui s’élève et les montagnes face à vous. Une adresse faite pour profiter de l’hiver, ralentir et savourer pleinement le décor.",

    guestCapacity: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    surface: 65,

    city: null,
    region: null,

    status: "PUBLISHED" as const,
    position: 4,
    publishedAt: new Date(),

    highlights: {
      create: [
        {
          title: "Bain chaud extérieur",
          description: "Face aux sommets enneigés",
          icon: "Waves",
          position: 0,
        },
        {
          title: "Vue montagne",
          description: "Panorama depuis le chalet",
          icon: "Mountain",
          position: 1,
        },
        {
          title: "Esprit chalet",
          description: "Bois et ambiance chaleureuse",
          icon: "Flame",
          position: 2,
        },
        {
          title: "Pleine nature",
          description: "Calme et déconnexion",
          icon: "Trees",
          position: 3,
        },
      ],
    },

    amenities: createAmenities([
      { key: "mountain-view" },
      { key: "hair-dryer" },
      { key: "hot-water" },
      { key: "essentials" },
      { key: "bed-linen" },
      { key: "wifi" },
      { key: "heating" },
      { key: "kitchen" },
      { key: "refrigerator" },
      { key: "freezer" },
      { key: "coffee-maker" },
      { key: "dining-table" },
      { key: "outdoor-furniture" },
      { key: "jacuzzi", details: "Bain chaud extérieur" },
      { key: "free-parking-on-premises" },
    ]),

    images: {
      create: [
        {
          url: "/images/accommodations/chalet/hero.png",
          fileKey: "seed-demo-chalet-hero",
          alt: "Chalet en bois au cœur des montagnes enneigées",
          position: 0,
          isCover: true,
          isPresentation: false,
        },
        {
          url: "/images/accommodations/chalet/gallery-01.png",
          fileKey: "seed-demo-chalet-gallery-01",
          alt: "Chambre chaleureuse du Chalet avec vue sur les montagnes",
          position: 1,
          isCover: false,
          isPresentation: true,
        },
        {
          url: "/images/accommodations/chalet/gallery-02.png",
          fileKey: "seed-demo-chalet-gallery-02",
          alt: "Bain chaud extérieur du Chalet face aux sommets",
          position: 2,
          isCover: false,
          isPresentation: false,
        },
      ],
    },
  },

  {
    name: "Le Jet",
    slug: "le-jet",
    type: "Jet privé aménagé",
    subtitle:
      "Dormez à bord d’un véritable jet privé transformé en suite d’exception",
    shortDescription:
      "Une nuit hors du commun à bord d’un jet privé entièrement réinventé en hébergement.",
    description:
      "Passez la nuit dans un lieu que l’on associe habituellement au voyage plutôt qu’au séjour : un véritable jet privé réaménagé en hébergement d’exception.\n\nLa cabine conserve les codes emblématiques de l’aviation privée tout en accueillant désormais une chambre élégante, un espace salon et tout le confort nécessaire pour profiter des lieux sans jamais quitter le sol. Hublots, volumes atypiques et détails issus de l’appareil participent pleinement à l’expérience.\n\nPlus qu’une simple nuitée, Le Jet propose de vivre quelques heures dans un univers habituellement inaccessible. Une adresse singulière pour marquer une occasion, surprendre ou simplement découvrir une façon totalement différente de séjourner.",

    guestCapacity: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    surface: 40,

    city: null,
    region: null,

    status: "PUBLISHED" as const,
    position: 5,
    publishedAt: new Date(),

    highlights: {
      create: [
        {
          title: "Expérience unique",
          description: "Une nuit à bord d’un véritable jet privé",
          icon: "Sparkles",
          position: 0,
        },
        {
          title: "Cabine préservée",
          description: "Hublots et détails d’origine",
          icon: "Plane",
          position: 1,
        },
        {
          title: "Suite privative",
          description: "Une chambre directement à bord",
          icon: "BedDouble",
          position: 2,
        },
        {
          title: "Espace salon",
          description: "Un salon installé dans la cabine",
          icon: "Armchair",
          position: 3,
        },
        {
          title: "Séjour insolite",
          description: "Une expérience vraiment hors du commun",
          icon: "Star",
          position: 4,
        },
      ],
    },

    amenities: createAmenities([
      { key: "hair-dryer" },
      { key: "hot-water" },
      { key: "essentials" },
      { key: "bed-linen" },
      { key: "television" },
      { key: "audio-system" },
      { key: "air-conditioning" },
      { key: "heating" },
      { key: "wifi" },
      { key: "kitchen" },
      { key: "coffee-maker" },
      { key: "dining-table" },
      { key: "free-parking-on-premises" },
    ]),

    images: {
      create: [
        {
          url: "/images/accommodations/jet/hero.png",
          fileKey: "seed-demo-jet-hero",
          alt: "Jet privé aménagé au coucher du soleil",
          position: 0,
          isCover: true,
          isPresentation: false,
        },
        {
          url: "/images/accommodations/jet/gallery-01.png",
          fileKey: "seed-demo-jet-gallery-01",
          alt: "Chambre aménagée à l’intérieur du Jet",
          position: 1,
          isCover: false,
          isPresentation: true,
        },
        {
          url: "/images/accommodations/jet/gallery-02.png",
          fileKey: "seed-demo-jet-gallery-02",
          alt: "Salon et espace repas du Jet",
          position: 2,
          isCover: false,
          isPresentation: false,
        },
      ],
    },
  },

  {
    name: "L’Écrin Nature",
    slug: "lecrin-nature",
    type: "Habitat intégré à la nature",
    subtitle: "Un refuge végétalisé qui disparaît presque au cœur de la forêt",
    shortDescription:
      "Un habitat organique fondu dans la forêt pour vivre au plus près de la nature.",
    description:
      "À première vue, L’Écrin Nature semble presque disparaître dans le paysage. Sa toiture végétalisée, ses lignes organiques et son implantation au milieu des arbres ont été pensées pour prolonger la forêt plutôt que s’en détacher.\n\nÀ l’intérieur, les matières naturelles et les larges ouvertures maintiennent un lien permanent avec l’extérieur. La lumière traverse les feuillages, les arbres deviennent le décor principal et le silence prend peu à peu la place du rythme quotidien.\n\nLa terrasse et le point d’eau prolongent cette immersion jusque dehors. Ici, l’expérience repose moins sur l’accumulation d’équipements que sur une idée simple : disposer d’un lieu confortable où la nature reste présente à chaque instant.",

    guestCapacity: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    surface: 32,

    city: null,
    region: null,

    status: "PUBLISHED" as const,
    position: 6,
    publishedAt: new Date(),

    highlights: {
      create: [
        {
          title: "Immersion en forêt",
          description: "Au plus près de la nature",
          icon: "Trees",
          position: 0,
        },
        {
          title: "Architecture organique",
          description: "Fondue dans le paysage",
          icon: "Leaf",
          position: 1,
        },
        {
          title: "Toiture végétalisée",
          description: "Une extension de la forêt",
          icon: "Sprout",
          position: 2,
        },
        {
          title: "Grandes ouvertures",
          description: "La forêt comme décor",
          icon: "Sun",
          position: 3,
        },
        {
          title: "Terrasse privative",
          description: "Ouverte sur la nature",
          icon: "Coffee",
          position: 4,
        },
        {
          title: "Calme absolu",
          description: "Loin du rythme quotidien",
          icon: "Moon",
          position: 5,
        },
      ],
    },

    amenities: createAmenities([
      { key: "hair-dryer" },
      { key: "hot-water" },
      { key: "essentials" },
      { key: "bed-linen" },
      { key: "heating" },
      { key: "kitchen" },
      { key: "refrigerator" },
      { key: "coffee-maker" },
      { key: "outdoor-furniture" },
      { key: "outdoor-dining" },
      { key: "free-parking-on-premises" },
    ]),

    images: {
      create: [
        {
          url: "/images/accommodations/nature/hero.png",
          fileKey: "seed-demo-nature-hero",
          alt: "Refuge végétalisé intégré au cœur de la forêt",
          position: 0,
          isCover: true,
          isPresentation: false,
        },
        {
          url: "/images/accommodations/nature/gallery-01.png",
          fileKey: "seed-demo-nature-gallery-01",
          alt: "Intérieur naturel et chaleureux de L’Écrin Nature",
          position: 1,
          isCover: false,
          isPresentation: true,
        },
        {
          url: "/images/accommodations/nature/gallery-02.png",
          fileKey: "seed-demo-nature-gallery-02",
          alt: "Terrasse de L’Écrin Nature ouverte sur la forêt",
          position: 2,
          isCover: false,
          isPresentation: false,
        },
      ],
    },
  },
];

const main = async () => {
  for (const accommodation of accommodations) {
    const { images, highlights, amenities, ...values } = accommodation;

    await prisma.accommodation.upsert({
      where: {
        slug: accommodation.slug,
      },

      update: {
        ...values,

        images: {
          deleteMany: {},
          create: images.create,
        },

        highlights: {
          deleteMany: {},
          create: highlights.create,
        },

        amenities: {
          deleteMany: {},
          create: amenities.create,
        },
      },

      create: accommodation,
    });
  }

  console.log("Seed terminé : 4 logements de démonstration créés.");
};

main()
  .catch((error) => {
    console.error("Erreur pendant le seed :", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
