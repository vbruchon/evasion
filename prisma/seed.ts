import "dotenv/config";

import { prisma } from "../src/lib/prisma";

const accommodations = [
  {
    name: "Le Container",
    slug: "le-container",
    type: "Logement insolite",
    subtitle: "Une parenthèse avec vue sur le Vercors",
    shortDescription:
      "Un container aménagé pour un séjour à deux, entre confort contemporain et panorama sur le Vercors.",
    description:
      "Pensé comme une véritable parenthèse, Le Container offre une atmosphère chaleureuse et intimiste. Son espace extérieur, sa vue dégagée et son jacuzzi permettent de profiter pleinement d’un séjour à deux.",
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
          alt: "Vue intérieure du Container",
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
          alt: "Jacuzzi extérieur du Container",
          position: 2,
        },
        {
          url: "/images/accommodations/container/gallery-03.avif",
          fileKey: "seed-container-gallery-03",
          alt: "Jacuzzi extérieur du Container",
          position: 3,
        },
        {
          url: "/images/accommodations/container/gallery-04.avif",
          fileKey: "seed-container-gallery-04",
          alt: "Jacuzzi extérieur du Container",
          position: 4,
        },
      ],
    },
  },
  {
    name: "La Suite",
    slug: "la-suite",
    type: "Suite romantique",
    subtitle: "Un cocon intimiste pensé pour deux",
    shortDescription:
      "Une suite chaleureuse avec terrasse, jacuzzi privatif et espace cinéma.",
    description:
      "La Suite a été imaginée pour offrir un moment privilégié à deux. Son ambiance feutrée, son jacuzzi couvert et son espace cinéma créent une expérience intime en toute saison.",
    city: "Valence",
    region: "Drôme",
    status: "PUBLISHED" as const,
    position: 2,
    publishedAt: new Date(),
    images: {
      create: [
        {
          url: "/images/accommodations/dome/hero.avif",
          fileKey: "seed-suite-hero",
          alt: "Vue principale de La Suite",
          position: 0,
          isCover: true,
        },
        {
          url: "/images/accommodations/dome/gallery-01.webp",
          fileKey: "seed-dome-gallery-01",
          alt: "Jacuzzi extérieur du dome",
          position: 1,
        },
        {
          url: "/images/accommodations/dome/gallery-02.avif",
          fileKey: "seed-dome-gallery-02",
          alt: "Jacuzzi extérieur du dome",
          position: 2,
        },
        {
          url: "/images/accommodations/dome/gallery-03.avif",
          fileKey: "seed-dome-gallery-03",
          alt: "Jacuzzi extérieur du dome",
          position: 3,
        },
        {
          url: "/images/accommodations/dome/gallery-04.webp",
          fileKey: "seed-dome-gallery-04",
          alt: "Jacuzzi extérieur du dome",
          position: 4,
        },
        {
          url: "/images/accommodations/dome/gallery-05.avif",
          fileKey: "seed-dome-gallery-05",
          alt: "Jacuzzi extérieur du dome",
          position: 5,
        },
        {
          url: "/images/accommodations/dome/gallery-06.avif",
          fileKey: "seed-dome-gallery-06",
          alt: "Jacuzzi extérieur du dome",
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
