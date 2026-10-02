// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AdminDashboardOverview } from "@/components/features/admin/dashboard/admin-dashboard-overview";
import { AdminDashboardRecentActivity } from "@/components/features/admin/dashboard/admin-dashboard-recent-activity";
import { AdminDashboardSiteStatus } from "@/components/features/admin/dashboard/admin-dashboard-site-status";
import type { AdminDashboardSiteStatus as AdminDashboardSiteStatusData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-site-status";

const createEmptySiteStatus = (
  overrides: Partial<AdminDashboardSiteStatusData> = {},
): AdminDashboardSiteStatusData => ({
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

describe("admin dashboard components", () => {
  afterEach(() => {
    cleanup();
  });

  describe("overview", () => {
    it("renders the accommodation and operational summaries", () => {
      render(
        <AdminDashboardOverview
          accommodations={{
            published: 2,
            draft: 1,
            archived: 1,

            calendars: {
              configured: 2,
              missing: 0,
            },

            bookingLinks: {
              configured: 1,
              missing: 1,
            },
          }}
          reviews={{
            total: 4,
            averageRating: 4.75,
            lastImportAt: new Date("2026-09-30T10:00:00.000Z"),

            accommodations: {
              withReviews: 1,
              withoutReviews: 1,
            },
          }}
        />,
      );

      expect(
        screen
          .getByRole("link", {
            name: /Gérer les logements/i,
          })
          .getAttribute("href"),
      ).toBe("/admin/logements");

      expect(
        screen
          .getByRole("link", {
            name: /Gérer les avis/i,
          })
          .getAttribute("href"),
      ).toBe("/admin/avis");

      expect(
        screen.getByText("Tous les calendriers sont configurés."),
      ).toBeTruthy();

      expect(screen.getByText("1 lien à renseigner.")).toBeTruthy();
    });

    it("handles an empty published catalogue", () => {
      render(
        <AdminDashboardOverview
          accommodations={{
            published: 0,
            draft: 0,
            archived: 0,

            calendars: {
              configured: 0,
              missing: 0,
            },

            bookingLinks: {
              configured: 0,
              missing: 0,
            },
          }}
          reviews={{
            total: 0,
            averageRating: 0,
            lastImportAt: null,

            accommodations: {
              withReviews: 0,
              withoutReviews: 0,
            },
          }}
        />,
      );

      expect(
        screen.getAllByText("Aucun logement publié pour le moment."),
      ).toHaveLength(2);

      expect(screen.getByText("Aucun import")).toBeTruthy();
    });
  });

  describe("recent activity", () => {
    it("renders recent page and accommodation links", () => {
      render(
        <AdminDashboardRecentActivity
          recentPages={[
            {
              id: "home",
              label: "Accueil",
              href: "/admin/accueil",
              updatedAt: new Date("2026-10-01T10:00:00.000Z"),
            },
          ]}
          recentAccommodations={[
            {
              id: "accommodation-1",
              name: "Cabane romantique",
              status: "PUBLISHED",
              updatedAt: new Date("2026-10-01T11:00:00.000Z"),
              coverImage: null,
            },
          ]}
        />,
      );

      expect(
        screen
          .getByRole("link", {
            name: /Accueil/i,
          })
          .getAttribute("href"),
      ).toBe("/admin/accueil");

      expect(
        screen
          .getByRole("link", {
            name: /Cabane romantique/i,
          })
          .getAttribute("href"),
      ).toBe("/admin/logements/accommodation-1/modifier");

      expect(screen.getByText("Publié")).toBeTruthy();
    });

    it("renders empty activity states", () => {
      render(
        <AdminDashboardRecentActivity
          recentPages={[]}
          recentAccommodations={[]}
        />,
      );

      expect(screen.getByText("Aucune modification récente.")).toBeTruthy();

      expect(
        screen.getByText("Aucun logement modifié récemment."),
      ).toBeTruthy();
    });
  });

  describe("site status", () => {
    it("renders the success state when no issue exists", () => {
      render(<AdminDashboardSiteStatus siteStatus={createEmptySiteStatus()} />);

      expect(screen.getByText("Tout est à jour")).toBeTruthy();
      expect(screen.getByText("Aucune action requise")).toBeTruthy();
    });

    it("renders alerts and keeps only one accordion item open", () => {
      render(
        <AdminDashboardSiteStatus
          siteStatus={createEmptySiteStatus({
            unpublishedAccommodations: [
              {
                id: "unpublished",
                name: "Logement non publié",
              },
            ],

            missingBookingLinkAccommodations: [
              {
                id: "booking",
                name: "Logement sans réservation",
              },
            ],
          })}
        />,
      );

      expect(screen.getByText("À surveiller")).toBeTruthy();

      const unpublishedTrigger = screen.getByRole("button", {
        name: /Logements non publiés/i,
      });

      const bookingTrigger = screen.getByRole("button", {
        name: /Liens de réservation/i,
      });

      expect(unpublishedTrigger.getAttribute("aria-expanded")).toBe("false");
      expect(bookingTrigger.getAttribute("aria-expanded")).toBe("false");

      fireEvent.click(unpublishedTrigger);

      expect(unpublishedTrigger.getAttribute("aria-expanded")).toBe("true");

      fireEvent.click(bookingTrigger);

      expect(unpublishedTrigger.getAttribute("aria-expanded")).toBe("false");
      expect(bookingTrigger.getAttribute("aria-expanded")).toBe("true");

      fireEvent.pointerDown(document.body);

      expect(bookingTrigger.getAttribute("aria-expanded")).toBe("false");
    });
  });
});
