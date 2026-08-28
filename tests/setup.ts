import { vi } from "vitest";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL est obligatoire pour exécuter les tests.");
}

const databaseName = new URL(databaseUrl).pathname.replace("/", "");

if (!databaseName.endsWith("_test")) {
  throw new Error(
    `Les tests refusent d'utiliser la base "${databaseName}". ` +
      'DATABASE_URL doit pointer vers une base se terminant par "_test".',
  );
}

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/admin/accommodation/revalidate-accommodation", () => ({
  revalidateAccommodation: vi.fn(),
}));

vi.mock("@/lib/admin/uploadthing/delete-files", () => ({
  deleteUploadThingFiles: vi.fn().mockResolvedValue(undefined),
}));
