import { Pencil } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/layout/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { AccommodationUpdateForm } from "@/components/features/accommodations/admin/update/accommodation-update-form";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AccommodationUpdatePage({ params }: PageProps) {
  const { id } = await params;

  const accommodation = await prisma.accommodation.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      type: true,
      subtitle: true,
      shortDescription: true,
      description: true,
      status: true,

      images: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          url: true,
          fileKey: true,
          alt: true,
          isCover: true,
        },
      },
    },
  });

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
