import { AdminDashboardAccommodationsSummary } from "@/components/features/admin/dashboard/overview/admin-dashboard-accommodations-summary";
import { AdminDashboardAvailabilitySummary } from "@/components/features/admin/dashboard/overview/admin-dashboard-availability-summary";
import { AdminDashboardBookingSummary } from "@/components/features/admin/dashboard/overview/admin-dashboard-booking-summary";
import { AdminDashboardReviewsSummary } from "@/components/features/admin/dashboard/overview/admin-dashboard-reviews-summary";
import type { AdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";

type AdminDashboardOverviewProps = {
  accommodations: AdminDashboardData["accommodations"];
  reviews: AdminDashboardData["reviews"];
};

export const AdminDashboardOverview = ({
  accommodations,
  reviews,
}: AdminDashboardOverviewProps) => (
  <section className="mt-4 sm:mt-6">
    <div className="border-y border-border/50">
      <div className="grid lg:grid-cols-2">
        <AdminDashboardAccommodationsSummary accommodations={accommodations} />

        <AdminDashboardReviewsSummary
          accommodations={accommodations}
          reviews={reviews}
        />
      </div>

      <div className="border-t border-border/50">
        <div className="px-5 pt-5 sm:px-7">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-primary/70">
            Suivi opérationnel
          </p>
        </div>

        <div className="grid lg:grid-cols-2">
          <AdminDashboardAvailabilitySummary accommodations={accommodations} />

          <AdminDashboardBookingSummary accommodations={accommodations} />
        </div>
      </div>
    </div>
  </section>
);
