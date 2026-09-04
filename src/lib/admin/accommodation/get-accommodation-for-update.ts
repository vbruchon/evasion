import { parseAccommodationDraftContent } from "@/lib/admin/accommodation/accommodation-draft";
import { resolveAccommodationDraftImages } from "@/lib/admin/accommodation/resolve-accommodation-draft-images";
import { prisma } from "@/lib/prisma";

export const getAccommodationForUpdate = async (id: string) => {
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
      guestCapacity: true,
      bedrooms: true,
      beds: true,
      bathrooms: true,
      surface: true,

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
          isPresentation: true,
        },
      },

      highlights: {
        orderBy: {
          position: "asc",
        },

        select: {
          id: true,
          title: true,
          description: true,
          icon: true,
        },
      },

      draft: {
        select: {
          content: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!accommodation) {
    return null;
  }

  const draft = accommodation.draft
    ? parseAccommodationDraftContent(accommodation.draft.content)
    : null;

  const values = draft?.values ?? {
    name: accommodation.name,
    type: accommodation.type ?? "",
    subtitle: accommodation.subtitle ?? "",
    shortDescription: accommodation.shortDescription ?? "",
    description: accommodation.description ?? "",
    guestCapacity: accommodation.guestCapacity,
    bedrooms: accommodation.bedrooms,
    beds: accommodation.beds,
    bathrooms: accommodation.bathrooms,
    surface: accommodation.surface,
  };

  const images = draft
    ? resolveAccommodationDraftImages(accommodation.images, draft.images)
    : accommodation.images.map((image) => ({
        ...image,
        isExisting: true,
      }));

  const highlights = draft ? draft.highlights : accommodation.highlights;

  return {
    id: accommodation.id,
    slug: accommodation.slug,
    status: accommodation.status,

    name: values.name,
    type: values.type,
    subtitle: values.subtitle,
    shortDescription: values.shortDescription,
    description: values.description,

    guestCapacity: values.guestCapacity,
    bedrooms: values.bedrooms,
    beds: values.beds,
    bathrooms: values.bathrooms,
    surface: values.surface,

    highlights,

    images,

    hasDraft: draft !== null,
    draftUpdatedAt: accommodation.draft?.updatedAt ?? null,
  };
};

export type AccommodationUpdateData = NonNullable<
  Awaited<ReturnType<typeof getAccommodationForUpdate>>
>;
