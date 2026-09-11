import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { parseAccommodationReviewsCsv } from "@/lib/admin/accommodation/reviews/parse-accommodation-reviews-csv";

const fixturesDirectory = join(
  process.cwd(),
  "tests/helpers/fixtures/accommodations/reviews",
);

const readFixture = (filename: string) =>
  readFileSync(join(fixturesDirectory, filename), "utf8");

describe("parseAccommodationReviewsCsv", () => {
  it("parses valid accommodation reviews", () => {
    const reviews = parseAccommodationReviewsCsv(
      readFixture("valid-reviews.csv"),
    );

    expect(reviews).toHaveLength(2);

    expect(reviews[0]).toMatchObject({
      authorName: "Mathilde",
      rating: 5,
      comment: "Un excellent séjour dans un logement magnifique.",
      reviewedAt: new Date("2026-08-17T09:37:30Z"),
    });

    expect(reviews[0].importKey).toEqual(expect.any(String));
    expect(reviews[0].importKey).toHaveLength(64);

    expect(reviews[1]).toMatchObject({
      authorName: "Clément",
      rating: 4,
      comment: "Très belle expérience, nous reviendrons.",
      reviewedAt: new Date("2026-09-06T08:56:16Z"),
    });
  });

  it("supports a UTF-8 BOM", () => {
    const content =
      '\uFEFF"Nom";"Date";"Note";"Commentaire"\n' +
      '"Mathilde";"2026-08-17T09:37:30Z";"5";"Très beau séjour."';

    const reviews = parseAccommodationReviewsCsv(content);

    expect(reviews).toHaveLength(1);
    expect(reviews[0].authorName).toBe("Mathilde");
  });

  it("rejects an invalid rating", () => {
    expect(() =>
      parseAccommodationReviewsCsv(readFixture("invalid-rating.csv")),
    ).toThrow('Note d\'avis invalide : "6".');
  });

  it("rejects an invalid review date", () => {
    expect(() =>
      parseAccommodationReviewsCsv(readFixture("invalid-date.csv")),
    ).toThrow('Date d\'avis invalide : "date-invalide".');
  });

  it("rejects a CSV with a missing required column", () => {
    expect(() =>
      parseAccommodationReviewsCsv(readFixture("missing-column.csv")),
    ).toThrow('La colonne "Commentaire" est absente du fichier CSV.');
  });

  it("returns an empty array for an empty CSV", () => {
    expect(parseAccommodationReviewsCsv("")).toEqual([]);
  });

  it("rejects an empty author name", () => {
    const content =
      '"Nom";"Date";"Note";"Commentaire"\n' +
      '"";"2026-08-17T09:37:30Z";"5";"Très beau séjour."';

    expect(() => parseAccommodationReviewsCsv(content)).toThrow(
      "Le nom est absent à la ligne 2.",
    );
  });

  it("rejects an empty comment", () => {
    const content =
      '"Nom";"Date";"Note";"Commentaire"\n' +
      '"Mathilde";"2026-08-17T09:37:30Z";"5";""';

    expect(() => parseAccommodationReviewsCsv(content)).toThrow(
      "Le commentaire est absent à la ligne 2.",
    );
  });
});
