import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { submitContactRequest } from "@/lib/contact/commands/submit-contact-request";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";

describe("submitContactRequest", () => {
  beforeEach(async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});

    await prisma.accommodation.deleteMany();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("accepts a request for a published accommodation", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
    });

    const result = await submitContactRequest({
      firstName: "Vivian",
      email: "vivian@example.com",
      subject: "ACCOMMODATION",
      accommodationId: accommodation.id,
      message: "Bonjour.",
    });

    expect(result).toEqual({
      success: true,
    });
  });

  it("accepts a request without an accommodation", async () => {
    const result = await submitContactRequest({
      firstName: "",
      email: "vivian@example.com",
      subject: "OTHER",
      accommodationId: null,
      message: "Bonjour.",
    });

    expect(result).toEqual({
      success: true,
    });
  });

  it("rejects a draft accommodation", async () => {
    const accommodation = await createAccommodationFixture({
      status: "DRAFT",
    });

    const result = await submitContactRequest({
      firstName: "",
      email: "vivian@example.com",
      subject: "ACCOMMODATION",
      accommodationId: accommodation.id,
      message: "Bonjour.",
    });

    expect(result).toEqual({
      success: false,
      message: "Le logement sélectionné n’est pas disponible.",
    });
  });

  it("rejects an unknown accommodation", async () => {
    const result = await submitContactRequest({
      firstName: "",
      email: "vivian@example.com",
      subject: "ACCOMMODATION",
      accommodationId: "unknown-accommodation",
      message: "Bonjour.",
    });

    expect(result).toEqual({
      success: false,
      message: "Le logement sélectionné n’est pas disponible.",
    });
  });

  it("rejects an invalid request", async () => {
    const result = await submitContactRequest({
      firstName: "",
      email: "invalid-email",
      subject: "OTHER",
      accommodationId: null,
      message: "",
    });

    expect(result).toEqual({
      success: false,
      message: "Les informations de votre demande sont invalides.",
    });
  });
});
