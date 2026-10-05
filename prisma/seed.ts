import "dotenv/config";

import {
  ABOUT_PAGE_CONTENT_ID,
  aboutPageContentDefaults,
} from "../src/lib/about/about-page-defaults";
import {
  ACCOMMODATIONS_PAGE_CONTENT_ID,
  accommodationsPageContentDefaults,
} from "../src/lib/accommodations-page/accommodations-page-defaults";
import {
  CONTACT_PAGE_CONTENT_ID,
  contactPageContentDefaults,
} from "../src/lib/contact/contact-page-defaults";
import {
  FAQ_PAGE_CONTENT_ID,
  faqPageContentDefaults,
  faqPageItemsDefaults,
} from "../src/lib/faq/faq-page-defaults";
import {
  HOME_PAGE_CONTENT_ID,
  homePageContentDefaults,
} from "../src/lib/home/home-page-defaults";
import {
  LEGAL_SITE_SETTINGS_ID,
  legalSiteSettingsDefaults,
} from "../src/lib/legal/legal-site-defaults";
import { prisma } from "../src/lib/prisma";
import {
  REVIEWS_PAGE_CONTENT_ID,
  reviewsPageContentDefaults,
} from "../src/lib/reviews/reviews-page-defaults";

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

const seedHomePageContent = async () => {
  await prisma.homePageContent.upsert({
    where: {
      id: HOME_PAGE_CONTENT_ID,
    },

    update: {},

    create: {
      id: HOME_PAGE_CONTENT_ID,
      ...homePageContentDefaults,
    },
  });
};

const seedAccommodationsPageContent = async () => {
  await prisma.accommodationsPageContent.upsert({
    where: {
      id: ACCOMMODATIONS_PAGE_CONTENT_ID,
    },

    update: {},

    create: {
      id: ACCOMMODATIONS_PAGE_CONTENT_ID,
      ...accommodationsPageContentDefaults,
    },
  });
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

const seedAboutPageContent = async () => {
  await prisma.aboutPageContent.upsert({
    where: {
      id: ABOUT_PAGE_CONTENT_ID,
    },

    update: {},

    create: {
      id: ABOUT_PAGE_CONTENT_ID,
      ...aboutPageContentDefaults,
    },
  });
};

const seedFaqPageContent = async () => {
  await prisma.faqPageContent.upsert({
    where: {
      id: FAQ_PAGE_CONTENT_ID,
    },

    update: {},

    create: {
      id: FAQ_PAGE_CONTENT_ID,
      ...faqPageContentDefaults,

      items: {
        create: faqPageItemsDefaults.map((item, position) => ({
          ...item,
          position,
        })),
      },
    },
  });
};

const seedContactPageContent = async () => {
  await prisma.contactPageContent.upsert({
    where: {
      id: CONTACT_PAGE_CONTENT_ID,
    },

    update: {},

    create: {
      id: CONTACT_PAGE_CONTENT_ID,
      ...contactPageContentDefaults,
    },
  });
};

const seedLegalSiteSettings = async () => {
  await prisma.legalSiteSettings.upsert({
    where: {
      id: LEGAL_SITE_SETTINGS_ID,
    },

    update: {},

    create: {
      id: LEGAL_SITE_SETTINGS_ID,
      ...legalSiteSettingsDefaults,
    },
  });
};

const main = async () => {
  await seedAccommodations();

  await seedHomePageContent();
  await seedAccommodationsPageContent();
  await seedReviewsPageContent();
  await seedAboutPageContent();
  await seedFaqPageContent();
  await seedContactPageContent();
  await seedLegalSiteSettings();

  console.log(
    `Seed terminé : ${accommodations.length} logements de démonstration et les contenus des pages publiques ont été créés.`,
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
