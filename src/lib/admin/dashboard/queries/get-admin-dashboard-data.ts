import { getAdminDashboardSiteStatus } from "@/lib/admin/dashboard/queries/get-admin-dashboard-site-status";
import { getAdminDashboardSummary } from "@/lib/admin/dashboard/queries/get-admin-dashboard-summary";

export const getAdminDashboardData = async () => {
  const [siteStatus, summary] = await Promise.all([
    getAdminDashboardSiteStatus(),
    getAdminDashboardSummary(),
  ]);

  const publishedAccommodations = summary.accommodations.published;

  const missingCalendars = siteStatus.missingCalendarAccommodations.length;
  const missingBookingLinks =
    siteStatus.missingBookingLinkAccommodations.length;
  const accommodationsWithoutReviews =
    siteStatus.accommodationsWithoutReviews.length;

  return {
    accommodations: {
      published: publishedAccommodations,
      draft: summary.accommodations.draft,
      archived: summary.accommodations.archived,

      calendars: {
        configured: Math.max(publishedAccommodations - missingCalendars, 0),
        missing: missingCalendars,
      },

      bookingLinks: {
        configured: Math.max(publishedAccommodations - missingBookingLinks, 0),
        missing: missingBookingLinks,
      },
    },

    reviews: {
      total: summary.reviews.total,
      averageRating: summary.reviews.averageRating,
      lastImportAt: summary.reviews.lastImportAt,

      accommodations: {
        withReviews: Math.max(
          publishedAccommodations - accommodationsWithoutReviews,
          0,
        ),
        withoutReviews: accommodationsWithoutReviews,
      },
    },
  };
};

export type AdminDashboardData = Awaited<
  ReturnType<typeof getAdminDashboardData>
>;
