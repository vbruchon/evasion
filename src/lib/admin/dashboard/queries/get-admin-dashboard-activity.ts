import type { AccommodationStatus } from "@/generated/prisma/client";
import { getAccommodationCoverImage } from "@/lib/accommodations/accommodation-images";
import { ABOUT_PAGE_CONTENT_ID } from "@/lib/about/about-page-defaults";
import { CONTACT_PAGE_CONTENT_ID } from "@/lib/contact/contact-page-defaults";
import { FAQ_PAGE_CONTENT_ID } from "@/lib/faq/faq-page-defaults";
import { HOME_PAGE_CONTENT_ID } from "@/lib/home/home-page-defaults";
import { LEGAL_SITE_SETTINGS_ID } from "@/lib/legal/legal-site-defaults";
import { prisma } from "@/lib/prisma";
import { REVIEWS_PAGE_CONTENT_ID } from "@/lib/reviews/reviews-page-defaults";

export type AdminDashboardRecentAccommodation = {
  id: string;
  name: string;
  status: AccommodationStatus;
  updatedAt: Date;
  coverImage: {
    url: string;
    alt: string | null;
  } | null;
};

export type AdminDashboardRecentPage = {
  id: string;
  label: string;
  href: string;
  updatedAt: Date;
};

const getRecentPages = async (): Promise<AdminDashboardRecentPage[]> => {
  const [homePage, reviewsPage, faqPage, aboutPage, contactPage, legalPage] =
    await Promise.all([
      prisma.homePageContent.findUnique({
        where: {
          id: HOME_PAGE_CONTENT_ID,
        },

        select: {
          updatedAt: true,
        },
      }),

      prisma.reviewsPageContent.findUnique({
        where: {
          id: REVIEWS_PAGE_CONTENT_ID,
        },

        select: {
          updatedAt: true,
        },
      }),

      prisma.faqPageContent.findUnique({
        where: {
          id: FAQ_PAGE_CONTENT_ID,
        },

        select: {
          updatedAt: true,
        },
      }),

      prisma.aboutPageContent.findUnique({
        where: {
          id: ABOUT_PAGE_CONTENT_ID,
        },

        select: {
          updatedAt: true,
        },
      }),

      prisma.contactPageContent.findUnique({
        where: {
          id: CONTACT_PAGE_CONTENT_ID,
        },

        select: {
          updatedAt: true,
        },
      }),

      prisma.legalSiteSettings.findUnique({
        where: {
          id: LEGAL_SITE_SETTINGS_ID,
        },

        select: {
          updatedAt: true,
        },
      }),
    ]);

  const pages: Array<AdminDashboardRecentPage | null> = [
    homePage
      ? {
          id: "home",
          label: "Accueil",
          href: "/admin/accueil",
          updatedAt: homePage.updatedAt,
        }
      : null,

    reviewsPage
      ? {
          id: "reviews",
          label: "Avis",
          href: "/admin/avis",
          updatedAt: reviewsPage.updatedAt,
        }
      : null,

    faqPage
      ? {
          id: "faq",
          label: "FAQ",
          href: "/admin/faq",
          updatedAt: faqPage.updatedAt,
        }
      : null,

    aboutPage
      ? {
          id: "about",
          label: "À propos",
          href: "/admin/a-propos",
          updatedAt: aboutPage.updatedAt,
        }
      : null,

    contactPage
      ? {
          id: "contact",
          label: "Contact",
          href: "/admin/contact",
          updatedAt: contactPage.updatedAt,
        }
      : null,

    legalPage
      ? {
          id: "legal",
          label: "Informations légales",
          href: "/admin/informations-legales",
          updatedAt: legalPage.updatedAt,
        }
      : null,
  ];

  return pages
    .filter((page): page is AdminDashboardRecentPage => page !== null)
    .sort(
      (firstPage, secondPage) =>
        secondPage.updatedAt.getTime() - firstPage.updatedAt.getTime(),
    )
    .slice(0, 3);
};

const getRecentAccommodations = async (): Promise<
  AdminDashboardRecentAccommodation[]
> => {
  const accommodations = await prisma.accommodation.findMany({
    orderBy: {
      updatedAt: "desc",
    },

    take: 3,

    select: {
      id: true,
      name: true,
      status: true,
      updatedAt: true,

      images: {
        orderBy: {
          position: "asc",
        },

        select: {
          url: true,
          alt: true,
          isCover: true,
        },
      },
    },
  });

  return accommodations.map((accommodation) => {
    const coverImage = getAccommodationCoverImage(accommodation.images);

    return {
      id: accommodation.id,
      name: accommodation.name,
      status: accommodation.status,
      updatedAt: accommodation.updatedAt,

      coverImage: coverImage
        ? {
            url: coverImage.url,
            alt: coverImage.alt,
          }
        : null,
    };
  });
};

export const getAdminDashboardActivity = async () => {
  const [recentPages, recentAccommodations] = await Promise.all([
    getRecentPages(),
    getRecentAccommodations(),
  ]);

  return {
    recentPages,
    recentAccommodations,
  };
};

export type AdminDashboardActivity = Awaited<
  ReturnType<typeof getAdminDashboardActivity>
>;
