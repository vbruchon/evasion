import { revalidatePath } from "next/cache";

type RevalidateAccommodationOptions = {
  slug?: string;
};

export const revalidateAccommodation = ({
  slug,
}: RevalidateAccommodationOptions = {}) => {
  revalidatePath("/");
  revalidatePath("/a-propos");
  revalidatePath("/avis");
  revalidatePath("/contact");
  revalidatePath("/logements");

  revalidatePath("/admin/logements");

  if (slug) {
    revalidatePath(`/logements/${slug}`);
  }
};
