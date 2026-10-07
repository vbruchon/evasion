import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  getAdminDashboardActivityMock,
  getAdminDashboardSiteStatusMock,
  getAdminDashboardSummaryMock,
  requireAdminMock,
} = vi.hoisted(() => ({
  getAdminDashboardActivityMock: vi.fn(),
  getAdminDashboardSiteStatusMock: vi.fn(),
  getAdminDashboardSummaryMock: vi.fn(),
  requireAdminMock: vi.fn(),
}));

vi.mock("@/lib/admin/require-admin", () => ({
  requireAdmin: requireAdminMock,
}));

vi.mock("@/lib/admin/dashboard/queries/get-admin-dashboard-activity", () => ({
  getAdminDashboardActivity: getAdminDashboardActivityMock,
}));

vi.mock(
  "@/lib/admin/dashboard/queries/get-admin-dashboard-site-status",
  () => ({
    getAdminDashboardSiteStatus: getAdminDashboardSiteStatusMock,
  }),
);

vi.mock("@/lib/admin/dashboard/queries/get-admin-dashboard-summary", () => ({
  getAdminDashboardSummary: getAdminDashboardSummaryMock,
}));

import { getAdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";

const createSiteStatus = () => ({
  unpublishedAccommodations: [],
  accommodationsWithUnpublishedDraft: [],
  missingLegalInformation: [],
  missingCalendarAccommodations: [
    {
      id: "calendar-missing",
      name: "Calendrier manquant",
    },
  ],
  failingCalendarAccommodations: [],
  missingBookingLinkAccommodations: [
    {
      id: "booking-1",
      name: "Réservation 1",
    },
    {
      id: "booking-2",
      name: "Réservation 2",
    },
  ],
  invalidBookingLinkAccommodations: [],
  accommodationsWithoutReviews: [
    {
      id: "reviews-missing",
      name: "Sans avis",
    },
  ],
  publishedAccommodationsWithoutImages: [],
  staleReviewsImportAccommodations: [],
});

describe("getAdminDashboardData", () => {
  beforeEach(() => {
    getAdminDashboardActivityMock.mockReset();
    getAdminDashboardSiteStatusMock.mockReset();
    getAdminDashboardSummaryMock.mockReset();
    requireAdminMock.mockReset();
    requireAdminMock.mockResolvedValue({});
  });

  it("combines dashboard queries and derives operational statistics", async () => {
    const siteStatus = createSiteStatus();

    const recentPages = [
      {
        id: "home",
        label: "Accueil",
        href: "/admin/accueil",
        updatedAt: new Date("2026-10-01T10:00:00.000Z"),
      },
    ];

    const recentAccommodations = [
      {
        id: "accommodation-1",
        name: "Suite",
        status: "PUBLISHED",
        updatedAt: new Date("2026-10-01T11:00:00.000Z"),
        coverImage: null,
      },
    ];

    getAdminDashboardSiteStatusMock.mockResolvedValue(siteStatus);

    getAdminDashboardSummaryMock.mockResolvedValue({
      accommodations: {
        published: 3,
        draft: 2,
        archived: 1,
      },

      reviews: {
        total: 12,
        averageRating: 4.8,
        lastImportAt: new Date("2026-09-30T10:00:00.000Z"),
      },
    });

    getAdminDashboardActivityMock.mockResolvedValue({
      recentPages,
      recentAccommodations,
    });

    const data = await getAdminDashboardData();

    expect(data).toEqual({
      siteStatus,

      accommodations: {
        published: 3,
        draft: 2,
        archived: 1,

        calendars: {
          configured: 2,
          missing: 1,
        },

        bookingLinks: {
          configured: 1,
          missing: 2,
        },
      },

      reviews: {
        total: 12,
        averageRating: 4.8,
        lastImportAt: new Date("2026-09-30T10:00:00.000Z"),

        accommodations: {
          withReviews: 2,
          withoutReviews: 1,
        },
      },

      recentPages,
      recentAccommodations,
    });

    expect(requireAdminMock).toHaveBeenCalledTimes(1);
  });

  it("never returns negative configured counts", async () => {
    getAdminDashboardSiteStatusMock.mockResolvedValue({
      ...createSiteStatus(),

      missingCalendarAccommodations: [
        { id: "1", name: "1" },
        { id: "2", name: "2" },
      ],

      missingBookingLinkAccommodations: [
        { id: "1", name: "1" },
        { id: "2", name: "2" },
      ],

      accommodationsWithoutReviews: [
        { id: "1", name: "1" },
        { id: "2", name: "2" },
      ],
    });

    getAdminDashboardSummaryMock.mockResolvedValue({
      accommodations: {
        published: 1,
        draft: 0,
        archived: 0,
      },

      reviews: {
        total: 0,
        averageRating: 0,
        lastImportAt: null,
      },
    });

    getAdminDashboardActivityMock.mockResolvedValue({
      recentPages: [],
      recentAccommodations: [],
    });

    const data = await getAdminDashboardData();

    expect(data.accommodations.calendars.configured).toBe(0);
    expect(data.accommodations.bookingLinks.configured).toBe(0);
    expect(data.reviews.accommodations.withReviews).toBe(0);
  });
});
