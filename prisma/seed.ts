import "dotenv/config";

import { prisma } from "../src/lib/prisma";

const accommodations = [
  {
    name: "Le Container",
    slug: "le-container",
    type: "Container avec spa",
    subtitle:
      "Un cocon insolite pour deux, avec jacuzzi privatif et vue panoramique sur le Vercors",
    shortDescription:
      "Un cocon insolite avec jacuzzi privatif et vue panoramique sur le Vercors.",
    description:
      "Offrez-vous une parenthèse dépaysante dans ce container maritime entièrement transformé en studio confortable et tout équipé pour deux personnes.\n\nPensé comme un véritable cocon, ce logement insolite réunit calme, intimité et vue panoramique sur le Vercors, dans une atmosphère chaleureuse et romantique.\n\nÀ la tombée de la nuit, détendez-vous dans le jacuzzi privatif et profitez du ciel étoilé pour vivre un moment hors du temps, en couple ou entre amis.",

    guestCapacity: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    surface: null,

    city: "Valence",
    region: "Drôme",
    status: "PUBLISHED" as const,
    position: 1,
    publishedAt: new Date(),

    images: {
      create: [
        {
          url: "/images/accommodations/container/hero.avif",
          fileKey: "seed-container-hero",
          alt: "Vue principale du Container",
          position: 0,
          isCover: true,
        },
        {
          url: "/images/accommodations/container/gallery-01.avif",
          fileKey: "seed-container-gallery-01",
          alt: "Jacuzzi extérieur du Container",
          position: 1,
        },
        {
          url: "/images/accommodations/container/gallery-02.avif",
          fileKey: "seed-container-gallery-02",
          alt: "Espace intérieur du Container",
          position: 2,
        },
        {
          url: "/images/accommodations/container/gallery-03.avif",
          fileKey: "seed-container-gallery-03",
          alt: "Vue panoramique depuis le Container",
          position: 3,
        },
        {
          url: "/images/accommodations/container/gallery-04.avif",
          fileKey: "seed-container-gallery-04",
          alt: "Espace extérieur du Container",
          position: 4,
        },
      ],
    },
  },

  {
    name: "Le Dôme",
    slug: "le-dome",
    type: "Dôme panoramique",
    subtitle:
      "Spa privatif, cinéma sous les étoiles et vue imprenable sur le Vercors",
    shortDescription:
      "Une parenthèse romantique entre spa privatif, cinéma et vue sur le Vercors.",
    description:
      "Offrez-vous une parenthèse hors du temps dans ce dôme haut de gamme, pensé pour accueillir deux personnes dans une atmosphère intime et dépaysante.\n\nEntièrement climatisé et chauffé, il vous garantit un confort optimal en toute saison. Depuis votre lit, profitez d’une soirée cinéma sur écran géant, détendez-vous dans le spa privatif couvert ou laissez-vous simplement séduire par la vue imprenable sur le Vercors.\n\nUn lieu idéal pour célébrer une occasion particulière, partager un séjour romantique ou simplement prendre le temps de se retrouver à deux.",

    guestCapacity: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    surface: null,

    city: "Valence",
    region: "Drôme",
    status: "PUBLISHED" as const,
    position: 2,
    publishedAt: new Date(),

    images: {
      create: [
        {
          url: "/images/accommodations/dome/hero.avif",
          fileKey: "seed-dome-hero",
          alt: "Vue principale du Dôme",
          position: 0,
          isCover: true,
        },
        {
          url: "/images/accommodations/dome/gallery-01.webp",
          fileKey: "seed-dome-gallery-01",
          alt: "Spa privatif du Dôme",
          position: 1,
        },
        {
          url: "/images/accommodations/dome/gallery-02.avif",
          fileKey: "seed-dome-gallery-02",
          alt: "Vue intérieure du Dôme",
          position: 2,
        },
        {
          url: "/images/accommodations/dome/gallery-03.avif",
          fileKey: "seed-dome-gallery-03",
          alt: "Espace cinéma du Dôme",
          position: 3,
        },
        {
          url: "/images/accommodations/dome/gallery-04.webp",
          fileKey: "seed-dome-gallery-04",
          alt: "Espace extérieur du Dôme",
          position: 4,
        },
        {
          url: "/images/accommodations/dome/gallery-05.avif",
          fileKey: "seed-dome-gallery-05",
          alt: "Ambiance intérieure du Dôme",
          position: 5,
        },
        {
          url: "/images/accommodations/dome/gallery-06.avif",
          fileKey: "seed-dome-gallery-06",
          alt: "Vue sur le Vercors depuis le Dôme",
          position: 6,
        },
      ],
    },
  },
];

const main = async () => {
  for (const accommodation of accommodations) {
    await prisma.accommodation.upsert({
      where: {
        slug: accommodation.slug,
      },

      update: {
        name: accommodation.name,
        type: accommodation.type,
        subtitle: accommodation.subtitle,
        shortDescription: accommodation.shortDescription,
        description: accommodation.description,

        guestCapacity: accommodation.guestCapacity,
        bedrooms: accommodation.bedrooms,
        beds: accommodation.beds,
        bathrooms: accommodation.bathrooms,
        surface: accommodation.surface,

        city: accommodation.city,
        region: accommodation.region,
        status: accommodation.status,
        position: accommodation.position,
        publishedAt: accommodation.publishedAt,
      },

      create: accommodation,
    });
  }

  console.log("Seed terminé : logements créés.");
};

main()
  .catch((error) => {
    console.error("Erreur pendant le seed :", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
