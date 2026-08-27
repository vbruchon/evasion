import { notFound } from "next/navigation";

import { AccommodationEditor } from "@/components/features/accommodations/admin/editor/accommodation-editor";
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

  return <AccommodationEditor accommodation={accommodation} />;
}
