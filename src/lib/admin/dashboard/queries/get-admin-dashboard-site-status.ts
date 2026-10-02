import { getAccommodationAvailability } from "@/lib/accommodations/availability/get-accommodation-availability";
import { REVIEWS_IMPORT_STALE_AFTER_DAYS } from "@/lib/admin/dashboard/admin-dashboard-site-status.constants";
import { getLegalSiteSettings } from "@/lib/legal/queries/get-legal-site-settings";
import { prisma } from "@/lib/prisma";

export type AdminDashboardIssueAccommodation = {
  id: string;
  name: string;
};

export type AdminDashboardMissingLegalInformation = {
  id: string;
  label: string;
};

const getReviewsImportStaleBefore = () =>
  new Date(Date.now() - REVIEWS_IMPORT_STALE_AFTER_DAYS * 24 * 60 * 60 * 1000);

const isValidBookingUrl = (bookingUrl: string) => {
  try {
    const url = new URL(bookingUrl);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getFailingCalendarAccommodations = async (
  accommodations: {
    id: string;
    name: string;
    availabilityCalendarUrl: string;
  }[],
): Promise<AdminDashboardIssueAccommodation[]> => {
  const results = await Promise.all(
    accommodations.map(async (accommodation) => {
      try {
        await getAccommodationAvailability(
          accommodation.availabilityCalendarUrl,
        );

        return null;
      } catch {
        return {
          id: accommodation.id,
          name: accommodation.name,
        };
      }
    }),
  );

  return results.filter(
    (accommodation): accommodation is AdminDashboardIssueAccommodation =>
      accommodation !== null,
  );
};

const getMissingLegalInformation = async (): Promise<
  AdminDashboardMissingLegalInformation[]
> => {
  const settings = await getLegalSiteSettings();

  const fields = [
    {
      id: "businessName",
      label: "Dénomination sociale",
      value: settings.businessName,
    },
    {
      id: "legalForm",
      label: "Forme juridique",
      value: settings.legalForm,
    },
    {
      id: "capital",
      label: "Capital social",
      value: settings.capital,
    },
    {
      id: "registeredOfficeAddress",
      label: "Adresse du siège social",
      value: settings.registeredOfficeAddress,
    },
    {
      id: "email",
      label: "Adresse e-mail",
      value: settings.email,
    },
    {
      id: "phone",
      label: "Téléphone",
      value: settings.phone,
    },
    {
      id: "siren",
      label: "SIREN",
      value: settings.siren,
    },
    {
      id: "siret",
      label: "SIRET",
      value: settings.siret,
    },
    {
      id: "rcs",
      label: "RCS",
      value: settings.rcs,
    },
    {
      id: "rne",
      label: "RNE",
      value: settings.rne,
    },
    {
      id: "vatNumber",
      label: "TVA intracommunautaire",
      value: settings.vatNumber,
    },
    {
      id: "publicationDirector",
      label: "Directeur de la publication",
      value: settings.publicationDirector,
    },
    {
      id: "hostName",
      label: "Nom de l’hébergeur",
      value: settings.hostName,
    },
    {
      id: "hostCompany",
      label: "Raison sociale de l’hébergeur",
      value: settings.hostCompany,
    },
    {
      id: "hostAddress",
      label: "Adresse de l’hébergeur",
      value: settings.hostAddress,
    },
    {
      id: "hostPhone",
      label: "Téléphone de l’hébergeur",
      value: settings.hostPhone,
    },
    {
      id: "contactDataRetentionPeriod",
      label: "Durée de conservation des demandes",
      value: settings.contactDataRetentionPeriod,
    },
  ];

  return fields
    .filter(({ value }) => !value?.trim())
    .map(({ id, label }) => ({
      id,
      label,
    }));
};

export const getAdminDashboardSiteStatus = async () => {
  const reviewsImportStaleBefore = getReviewsImportStaleBefore();

  const [accommodations, missingLegalInformation] = await Promise.all([
    prisma.accommodation.findMany({
      where: {
        status: {
          in: ["DRAFT", "PUBLISHED"],
        },
      },

      orderBy: {
        position: "asc",
      },

      select: {
        id: true,
        name: true,
        status: true,
        availabilityCalendarUrl: true,
        bookingUrl: true,
        lastReviewsImportAt: true,

        draft: {
          select: {
            id: true,
          },
        },

        _count: {
          select: {
            images: true,
            reviews: true,
          },
        },
      },
    }),

    getMissingLegalInformation(),
  ]);

  const unpublishedAccommodations: AdminDashboardIssueAccommodation[] = [];
  const accommodationsWithUnpublishedDraft: AdminDashboardIssueAccommodation[] =
    [];
  const missingCalendarAccommodations: AdminDashboardIssueAccommodation[] = [];
  const missingBookingLinkAccommodations: AdminDashboardIssueAccommodation[] =
    [];
  const invalidBookingLinkAccommodations: AdminDashboardIssueAccommodation[] =
    [];
  const accommodationsWithoutReviews: AdminDashboardIssueAccommodation[] = [];
  const publishedAccommodationsWithoutImages: AdminDashboardIssueAccommodation[] =
    [];
  const staleReviewsImportAccommodations: AdminDashboardIssueAccommodation[] =
    [];

  const accommodationsWithCalendar: {
    id: string;
    name: string;
    availabilityCalendarUrl: string;
  }[] = [];

  for (const accommodation of accommodations) {
    const issueAccommodation = {
      id: accommodation.id,
      name: accommodation.name,
    };

    if (accommodation.status === "DRAFT") {
      unpublishedAccommodations.push(issueAccommodation);

      continue;
    }

    if (accommodation.draft) {
      accommodationsWithUnpublishedDraft.push(issueAccommodation);
    }

    const calendarUrl = accommodation.availabilityCalendarUrl?.trim();

    if (!calendarUrl) {
      missingCalendarAccommodations.push(issueAccommodation);
    } else {
      accommodationsWithCalendar.push({
        ...issueAccommodation,
        availabilityCalendarUrl: calendarUrl,
      });
    }

    const bookingUrl = accommodation.bookingUrl?.trim();

    if (!bookingUrl) {
      missingBookingLinkAccommodations.push(issueAccommodation);
    } else if (!isValidBookingUrl(bookingUrl)) {
      invalidBookingLinkAccommodations.push(issueAccommodation);
    }

    if (accommodation._count.reviews === 0) {
      accommodationsWithoutReviews.push(issueAccommodation);
    }

    if (accommodation._count.images === 0) {
      publishedAccommodationsWithoutImages.push(issueAccommodation);
    }

    if (
      accommodation.lastReviewsImportAt &&
      accommodation.lastReviewsImportAt < reviewsImportStaleBefore
    ) {
      staleReviewsImportAccommodations.push(issueAccommodation);
    }
  }

  const failingCalendarAccommodations = await getFailingCalendarAccommodations(
    accommodationsWithCalendar,
  );

  return {
    unpublishedAccommodations,
    accommodationsWithUnpublishedDraft,
    missingLegalInformation,
    missingCalendarAccommodations,
    failingCalendarAccommodations,
    missingBookingLinkAccommodations,
    invalidBookingLinkAccommodations,
    accommodationsWithoutReviews,
    publishedAccommodationsWithoutImages,
    staleReviewsImportAccommodations,
  };
};

export type AdminDashboardSiteStatus = Awaited<
  ReturnType<typeof getAdminDashboardSiteStatus>
>;
