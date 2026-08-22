"use server";

import type { AccommodationStatus } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

type AccommodationPosition = {
  id: string;
  position: number;
};

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

export const reorderAccommodations = async (
  accommodations: AccommodationPosition[],
) => {
  await prisma.$transaction(
    accommodations.map((accommodation) =>
      prisma.accommodation.update({
        where: {
          id: accommodation.id,
        },
        data: {
          position: accommodation.position,
        },
      }),
    ),
  );

  revalidatePath("/admin/logements");
  revalidatePath("/logements");
};

export const deleteAccommodation = async (id: string) => {
  await prisma.accommodation.delete({
    where: { id },
  });

  revalidatePath("/admin/logements");
  revalidatePath("/logements");
};
