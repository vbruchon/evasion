"use server";

import type { AccommodationStatus } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export const updateAccommodationStatus = async (
  id: string,
  status: AccommodationStatus,
) => {
  await prisma.accommodation.update({
    where: { id },
    data: {
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/logements");
  revalidatePath("/logements");
};
