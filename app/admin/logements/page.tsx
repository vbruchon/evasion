import { Eye, House, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AccommodationsAdminTable } from "@/components/features/accommodations/admin/accommodations-admin-table";
import { getAdminAccommodations } from "@/lib/accommodations";

export default async function AdminAccommodationsPage() {
  const accommodations = await getAdminAccommodations();

  return (
    <main className="px-6 py-10 md:px-8 lg:px-10">
      <header className="flex flex-col gap-6 border-b border-border/60 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-4">
            <House className="size-5 text-primary" />

            <h1 className="font-heading text-3xl">Logements</h1>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Gérez vos logements et leur contenu.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
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
        </div>
      </header>

      <section className="py-6">
        <AccommodationsAdminTable accommodations={accommodations} />
      </section>
    </main>
  );
}
