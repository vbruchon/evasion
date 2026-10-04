import { Eye, House, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { AccommodationsAdminTable } from "@/components/features/accommodations/admin/list/accommodations-admin-table";
import { AccommodationsAdminTableSkeleton } from "@/components/features/accommodations/admin/list/accommodations-admin-table-skeleton";
import { AdminPageHeader } from "@/components/layout/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { getAdminAccommodations } from "@/lib/admin/accommodation/queries/get-admin-accommodations";

const AdminAccommodationsTableContent = async () => {
  const accommodations = await getAdminAccommodations();

  return <AccommodationsAdminTable accommodations={accommodations} />;
};

export default function AdminAccommodationsPage() {
  return (
    <main className="px-6 py-10 md:px-8 lg:px-10">
      <AdminPageHeader
        icon={House}
        title="Logements"
        description="Gérez vos logements et leur contenu."
        actions={
          <>
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              nativeButton={false}
              render={
                <Link
                  href="/logements"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Eye />
              Aperçu de la page
            </Button>

            <Button
              className="w-full sm:w-auto"
              nativeButton={false}
              render={<Link href="/admin/logements/nouveau" />}
            >
              <Plus />
              Ajouter un logement
            </Button>
          </>
        }
      />

      <section className="py-6">
        <Suspense fallback={<AccommodationsAdminTableSkeleton />}>
          <AdminAccommodationsTableContent />
        </Suspense>
      </section>
    </main>
  );
}
