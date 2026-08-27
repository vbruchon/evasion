import { Eye, House, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AccommodationsAdminTable } from "@/components/features/accommodations/admin/accommodations-admin-table";
import { getAdminAccommodations } from "@/lib/accommodations";
import { AdminPageHeader } from "@/components/layout/admin/admin-page-header";

export default async function AdminAccommodationsPage() {
  const accommodations = await getAdminAccommodations();

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
        <AccommodationsAdminTable accommodations={accommodations} />
      </section>
    </main>
  );
}
