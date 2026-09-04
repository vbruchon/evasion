import { revalidatePath } from "next/cache";

type RevalidateAccommodationOptions = {
  slug?: string;
  id?: string;
};

export const revalidateAccommodation = ({
  slug,
  id,
}: RevalidateAccommodationOptions = {}) => {
  revalidatePath("/admin/logements");
  revalidatePath("/logements");

  if (slug) {
    revalidatePath(`/logements/${slug}`);
  }

  if (id) {
    revalidatePath(`/admin/logements/${id}/modifier`);
  }
};
