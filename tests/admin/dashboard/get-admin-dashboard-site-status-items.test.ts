import { describe, expect, it } from "vitest";

import { REVIEWS_IMPORT_STALE_AFTER_DAYS } from "@/lib/admin/dashboard/admin-dashboard-site-status.constants";
import { getAdminDashboardSiteStatusItems } from "@/lib/admin/dashboard/get-admin-dashboard-site-status-items";
import type { AdminDashboardSiteStatus } from "@/lib/admin/dashboard/queries/get-admin-dashboard-site-status";

const createEmptySiteStatus = (
  overrides: Partial<AdminDashboardSiteStatus> = {},
): AdminDashboardSiteStatus => ({
  unpublishedAccommodations: [],
  accommodationsWithUnpublishedDraft: [],
  missingLegalInformation: [],
  missingCalendarAccommodations: [],
  failingCalendarAccommodations: [],
  missingBookingLinkAccommodations: [],
  invalidBookingLinkAccommodations: [],
  accommodationsWithoutReviews: [],
  publishedAccommodationsWithoutImages: [],
  staleReviewsImportAccommodations: [],
  ...overrides,
});

describe("getAdminDashboardSiteStatusItems", () => {
  it("returns no item when the site has no issue", () => {
    expect(getAdminDashboardSiteStatusItems(createEmptySiteStatus())).toEqual(
      [],
    );
  });

  it("creates all dashboard attention items", () => {
    const siteStatus = createEmptySiteStatus({
      unpublishedAccommodations: [
        {
          id: "unpublished",
          name: "Non publié",
        },
      ],

      accommodationsWithUnpublishedDraft: [
        {
          id: "draft",
          name: "Avec brouillon",
        },
      ],

      missingLegalInformation: [
        {
          id: "siret",
          label: "SIRET",
        },
      ],

      missingCalendarAccommodations: [
        {
          id: "calendar",
          name: "Sans calendrier",
        },
      ],

      missingBookingLinkAccommodations: [
        {
          id: "booking",
          name: "Sans réservation",
        },
      ],

      accommodationsWithoutReviews: [
        {
          id: "reviews",
          name: "Sans avis",
        },
      ],

      publishedAccommodationsWithoutImages: [
        {
          id: "images",
          name: "Sans image",
        },
      ],

      staleReviewsImportAccommodations: [
        {
          id: "stale",
          name: "Avis anciens",
        },
      ],

      invalidBookingLinkAccommodations: [
        {
          id: "invalid-booking",
          name: "Lien invalide",
        },
      ],

      failingCalendarAccommodations: [
        {
          id: "failing-calendar",
          name: "Calendrier défaillant",
        },
      ],
    });

    const items = getAdminDashboardSiteStatusItems(siteStatus);

    expect(items.map((item) => item.title)).toEqual([
      "Logements non publiés",
      "Modifications non publiées",
      "Informations légales",
      "Calendriers",
      "Liens de réservation",
      "Avis voyageurs",
      "Images manquantes",
      "Avis à actualiser",
      "Liens de réservation invalides",
      "Calendriers défaillants",
    ]);
  });

  it("builds accommodation edit links", () => {
    const [item] = getAdminDashboardSiteStatusItems(
      createEmptySiteStatus({
        unpublishedAccommodations: [
          {
            id: "accommodation-1",
            name: "Suite romantique",
          },
        ],
      }),
    );

    expect(item).toMatchObject({
      title: "Logements non publiés",
      value: 1,
      description: "1 logement non publié",

      details: [
        {
          id: "accommodation-1",
          label: "Suite romantique",
          href: "/admin/logements/accommodation-1/modifier",
        },
      ],

      action: {
        label: "Voir tous les logements",
        href: "/admin/logements",
      },
    });
  });

  it("builds legal information items without accommodation links", () => {
    const [item] = getAdminDashboardSiteStatusItems(
      createEmptySiteStatus({
        missingLegalInformation: [
          {
            id: "siret",
            label: "SIRET",
          },
        ],
      }),
    );

    expect(item).toMatchObject({
      title: "Informations légales",

      details: [
        {
          id: "siret",
          label: "SIRET",
        },
      ],

      action: {
        label: "Compléter les informations légales",
        href: "/admin/informations-legales",
      },
    });
  });

  it("uses the shared review stale threshold in the description", () => {
    const [item] = getAdminDashboardSiteStatusItems(
      createEmptySiteStatus({
        staleReviewsImportAccommodations: [
          {
            id: "stale",
            name: "Suite",
          },
        ],
      }),
    );

    expect(item.description).toContain(
      `${REVIEWS_IMPORT_STALE_AFTER_DAYS} jours`,
    );
  });
});
