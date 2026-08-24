import { HousePlus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AccommodationCreateForm } from "@/components/features/accommodations/admin/create/accommodation-create-form";
import { AdminPageHeader } from "@/components/layout/admin/admin-page-header";

export default function CreateAccommodationPage() {
  return (
    <main className="px-6 py-10 md:px-8 lg:px-10">
      <AdminPageHeader
        icon={HousePlus}
        title="Créer un logement"
        description="Ajoutez un nouveau logement à votre collection."
        actions={
          <Button
            nativeButton={false}
            variant="outline"
            className="w-full sm:w-auto"
            render={<Link href="/admin/logements" />}
          >
            Annuler
          </Button>
        }
      />

      <AccommodationCreateForm />
    </main>
  );
}
