import "dotenv/config";

import {
  REVIEWS_PAGE_CONTENT_ID,
  reviewsPageContentDefaults,
} from "../src/lib/reviews/reviews-page-defaults";
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

const seedReviewsPageContent = async () => {
  await prisma.reviewsPageContent.upsert({
    where: {
      id: REVIEWS_PAGE_CONTENT_ID,
    },

    update: {},

    create: {
      id: REVIEWS_PAGE_CONTENT_ID,
      ...reviewsPageContentDefaults,
    },
  });
};

const main = async () => {
  await seedAccommodations();
  await seedReviewsPageContent();

  console.log(
    `Seed terminé : ${accommodations.length} logements de démonstration et le contenu de la page Avis créés.`,
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
