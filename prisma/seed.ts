import "dotenv/config";

import { prisma } from "../src/lib/prisma";

import { accommodations } from "./seeds/accommodations";

const seedAccommodations = async () => {
  for (const accommodation of accommodations) {
    const { images, highlights, amenities, accesses, ...values } =
      accommodation;

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

        accesses: {
          deleteMany: {},
          create: accesses.create,
        },
      },

      create: accommodation,
    });
  }
};

const main = async () => {
  await seedAccommodations();

  console.log(
    `Seed terminé : ${accommodations.length} logements de démonstration créés.`,
  );
};

main()
  .catch((error) => {
    console.error("Erreur pendant le seed :", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
