import type { Prisma } from "@/generated/prisma/client";

import type { AccommodationHighlightsInput } from "~/app/admin/logements/schema";

export const getAccommodationExistingHighlightIds = (
  highlights: AccommodationHighlightsInput,
) => highlights.flatMap((highlight) => (highlight.id ? [highlight.id] : []));

export const hasForeignAccommodationHighlight = (
  highlights: AccommodationHighlightsInput,
  existingHighlightIds: Iterable<string>,
) => {
  const existingIds = new Set(existingHighlightIds);

  return getAccommodationExistingHighlightIds(highlights).some(
    (highlightId) => !existingIds.has(highlightId),
  );
};

export const syncAccommodationHighlights = async (
  tx: Prisma.TransactionClient,
  accommodationId: string,
  highlights: AccommodationHighlightsInput,
) => {
  const existingHighlightIds = getAccommodationExistingHighlightIds(highlights);

  await tx.accommodationHighlight.deleteMany({
    where: {
      accommodationId,

      ...(existingHighlightIds.length > 0
        ? {
            id: {
              notIn: existingHighlightIds,
            },
          }
        : {}),
    },
  });

  for (const [position, highlight] of highlights.entries()) {
    if (highlight.id) {
      await tx.accommodationHighlight.update({
        where: {
          id: highlight.id,
        },

        data: {
          title: highlight.title,
          description: highlight.description || null,
          icon: highlight.icon,
          position,
        },
      });

      continue;
    }

    await tx.accommodationHighlight.create({
      data: {
        accommodationId,
        title: highlight.title,
        description: highlight.description || null,
        icon: highlight.icon,
        position,
      },
    });
  }
};
