import { parse } from "csv-parse/sync";

import type { AccommodationReviewImportData } from "@/lib/accommodations/reviews/accommodation-review.types";
import { createAccommodationReviewImportKey } from "@/lib/accommodations/reviews/accommodation-review-import-key";

const REQUIRED_COLUMNS = ["Nom", "Date", "Note", "Commentaire"] as const;

type AccommodationReviewCsvRow = Record<string, string>;

const parseReviewRating = (value: string) => {
  const rating = Number(value);

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error(`Note d'avis invalide : "${value}".`);
  }

  return rating;
};

const parseReviewDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Date d'avis invalide : "${value}".`);
  }

  return date;
};

export const parseAccommodationReviewsCsv = (
  content: string,
): AccommodationReviewImportData[] => {
  let rows: AccommodationReviewCsvRow[];

  try {
    rows = parse(content, {
      bom: true,
      columns: true,
      delimiter: ";",
      skip_empty_lines: true,
      trim: true,
    });
  } catch {
    throw new Error("Le fichier CSV des avis est invalide.");
  }

  if (rows.length === 0) {
    return [];
  }

  const columns = Object.keys(rows[0]);

  for (const column of REQUIRED_COLUMNS) {
    if (!columns.includes(column)) {
      throw new Error(`La colonne "${column}" est absente du fichier CSV.`);
    }
  }

  return rows.map((row, index) => {
    const authorName = row.Nom?.trim();
    const comment = row.Commentaire?.trim();

    if (!authorName) {
      throw new Error(`Le nom est absent à la ligne ${index + 2}.`);
    }

    if (!comment) {
      throw new Error(`Le commentaire est absent à la ligne ${index + 2}.`);
    }

    const reviewedAt = parseReviewDate(row.Date);
    const rating = parseReviewRating(row.Note);

    return {
      importKey: createAccommodationReviewImportKey(authorName, reviewedAt),
      authorName,
      rating,
      comment,
      reviewedAt,
    };
  });
};
