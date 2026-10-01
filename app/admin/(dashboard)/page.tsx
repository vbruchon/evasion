import { headers } from "next/headers";

import { AdminDashboardHeader } from "@/components/features/admin/dashboard/admin-dashboard-header";
import { AdminDashboardOverview } from "@/components/features/admin/dashboard/admin-dashboard-overview";
import { getAdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";
import { auth } from "@/lib/auth";

export default async function AdminPage() {
  const [data, session] = await Promise.all([
    getAdminDashboardData(),

    auth.api.getSession({
      headers: await headers(),
    }),
  ]);

  const firstName = session?.user.name?.trim().split(/\s+/)[0];

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 lg:py-10">
      <AdminDashboardHeader firstName={firstName} />

      <AdminDashboardOverview
        accommodations={data.accommodations}
        reviews={data.reviews}
      />
    </main>
  );
}
