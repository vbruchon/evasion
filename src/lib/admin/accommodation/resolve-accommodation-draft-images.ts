import type { AccommodationDraftContent } from "~/app/admin/logements/schema";

type AccommodationImage = {
  id: string;
  url: string;
  fileKey: string;
  alt: string | null;
  isCover: boolean;
};

export const resolveAccommodationDraftImages = (
  accommodationImages: AccommodationImage[],
  draftImages: AccommodationDraftContent["images"],
) =>
  draftImages.map((draftImage) => {
    if ("id" in draftImage) {
      const accommodationImage = accommodationImages.find(
        (image) => image.id === draftImage.id,
      );

      if (!accommodationImage) {
        throw new Error("Le brouillon contient une image qui n'existe plus.");
      }

      return {
        id: accommodationImage.id,
        url: accommodationImage.url,
        fileKey: accommodationImage.fileKey,
        alt: accommodationImage.alt,
        isCover: draftImage.isCover,
        isExisting: true,
      };
    }

    return {
      id: `draft:${draftImage.fileKey}`,
      url: draftImage.url,
      fileKey: draftImage.fileKey,
      alt: null,
      isCover: draftImage.isCover,
      isExisting: false,
    };
  });
