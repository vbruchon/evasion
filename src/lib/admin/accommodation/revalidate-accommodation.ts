import { revalidatePath } from "next/cache";

export const revalidateAccommodation = () => {
  revalidatePath("/admin/logements");
  revalidatePath("/logements");
};
