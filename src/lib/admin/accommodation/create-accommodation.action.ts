import {
  type AccommodationCreateFormValues,
  accommodationCreateSchema,
} from "~/app/admin/logements/schema";

import { createAccommodationSlug } from "@/lib/admin/accommodation/create-accommodation-slug";
import { prisma } from "@/lib/prisma";

import { revalidateAccommodation } from "./revalidate-accommodation";

type CreateAccommodationResult =
  | {
      success: true;
      id: string;
      slug: string;
    }
  | {
      success: false;
      field?: keyof AccommodationCreateFormValues;
      message: string;
    };

const createUniqueAccommodationSlug = async (name: string) => {
  const baseSlug = createAccommodationSlug(name) || "logement";

  let slug = baseSlug;
  let suffix = 2;

  while (
    await prisma.accommodation.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    })
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
};

export const createAccommodationAdmin = async (
  values: AccommodationCreateFormValues,
): Promise<CreateAccommodationResult> => {
  const result = accommodationCreateSchema.safeParse(values);

  if (!result.success) {
    const issue = result.error.issues[0];
    const field = issue?.path[0];

    return {
      success: false,
      field: field === "name" || field === "type" ? field : undefined,
      message: issue?.message ?? "Les informations renseignées sont invalides.",
    };
  }

  const data = result.data;

  try {
    const slug = await createUniqueAccommodationSlug(data.name);

    const accommodation = await prisma.$transaction(async (tx) => {
      const highestPosition = await tx.accommodation.aggregate({
        _max: {
          position: true,
        },
      });

      return tx.accommodation.create({
        data: {
          name: data.name,
          type: data.type,
          slug,

          status: "DRAFT",
          position: (highestPosition._max.position ?? 0) + 1,
          publishedAt: null,
        },
      });
    });

    revalidateAccommodation({
      slug: accommodation.slug,
      id: accommodation.id,
    });

    return {
      success: true,
      id: accommodation.id,
      slug: accommodation.slug,
    };
  } catch {
    return {
      success: false,
      message: "Impossible de créer le logement.",
    };
  }
};
