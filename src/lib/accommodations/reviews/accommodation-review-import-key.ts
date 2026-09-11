import { createHash } from "node:crypto";

const normalizeReviewAuthorName = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

export const createAccommodationReviewImportKey = (
  authorName: string,
  reviewedAt: Date,
) =>
  createHash("sha256")
    .update(
      `${normalizeReviewAuthorName(authorName)}:${reviewedAt.toISOString()}`,
    )
    .digest("hex");
