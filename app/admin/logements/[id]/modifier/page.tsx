import { Pencil } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AccommodationUpdateForm } from "@/components/features/accommodations/admin/update/accommodation-update-form";
import { AdminPageHeader } from "@/components/layout/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { getAccommodationForUpdate } from "@/lib/admin/accommodation/get-accommodation-for-update";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AccommodationUpdatePage({ params }: PageProps) {
  const { id } = await params;

  const accommodation = await getAccommodationForUpdate(id);

  if (!accommodation) {
    notFound();
  }

  return (
    <div className="px-6 py-10 md:px-8 lg:px-10">
      <AdminPageHeader
        icon={Pencil}
        title={`Modifier ${accommodation.name}`}
        description="Modifiez les informations et la publication du logement."
        actions={
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/admin/logements" />}
          >
            Annuler
          </Button>
        }
      />

      <AccommodationUpdateForm accommodation={accommodation} />
    </div>
  );
}
