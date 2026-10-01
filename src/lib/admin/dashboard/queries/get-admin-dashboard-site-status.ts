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
  const [
    unpublishedAccommodations,
    accommodationsWithUnpublishedDraft,
    missingCalendarAccommodations,
    missingBookingLinkAccommodations,
    accommodationsWithoutReviews,
    missingLegalInformation,
  ] = await Promise.all([
    prisma.accommodation.findMany({
      where: {
        status: "DRAFT",
      },

      orderBy: {
        position: "asc",
      },

      select: {
        id: true,
        name: true,
      },
    }),

    prisma.accommodation.findMany({
      where: {
        status: "PUBLISHED",

        draft: {
          isNot: null,
        },
      },

      orderBy: {
        position: "asc",
      },

      select: {
        id: true,
        name: true,
      },
    }),

    prisma.accommodation.findMany({
      where: {
        status: "PUBLISHED",

        OR: [
          {
            availabilityCalendarUrl: null,
          },
          {
            availabilityCalendarUrl: "",
          },
        ],
      },

      orderBy: {
        position: "asc",
      },

      select: {
        id: true,
        name: true,
      },
    }),

    prisma.accommodation.findMany({
      where: {
        status: "PUBLISHED",

        OR: [
          {
            bookingUrl: null,
          },
          {
            bookingUrl: "",
          },
        ],
      },

      orderBy: {
        position: "asc",
      },

      select: {
        id: true,
        name: true,
      },
    }),

    prisma.accommodation.findMany({
      where: {
        status: "PUBLISHED",

        reviews: {
          none: {},
        },
      },

      orderBy: {
        position: "asc",
      },

      select: {
        id: true,
        name: true,
      },
    }),

    getMissingLegalInformation(),
  ]);

  return {
    unpublishedAccommodations,
    accommodationsWithUnpublishedDraft,
    missingLegalInformation,
    missingCalendarAccommodations,
    missingBookingLinkAccommodations,
    accommodationsWithoutReviews,
  };
};

export type AdminDashboardSiteStatus = Awaited<
  ReturnType<typeof getAdminDashboardSiteStatus>
>;
