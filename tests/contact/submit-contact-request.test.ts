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
import { sendContactRequestEmail } from "@/lib/contact/emails/send-contact-request-email";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";

vi.mock("@/lib/contact/emails/send-contact-request-email", () => ({
  sendContactRequestEmail: vi.fn(),
}));

const mockedSendContactRequestEmail = vi.mocked(sendContactRequestEmail);

describe("submitContactRequest", () => {
  beforeEach(async () => {
    mockedSendContactRequestEmail.mockResolvedValue(undefined);

    vi.spyOn(console, "error").mockImplementation(() => {});

    await prisma.accommodation.deleteMany();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("sends a request for a published accommodation", async () => {
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

    expect(mockedSendContactRequestEmail).toHaveBeenCalledOnce();

    expect(mockedSendContactRequestEmail).toHaveBeenCalledWith({
      firstName: "Vivian",
      email: "vivian@example.com",
      subject: "ACCOMMODATION",
      accommodationName: accommodation.name,
      message: "Bonjour.",
    });
  });

  it("sends a request without an accommodation", async () => {
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

    expect(mockedSendContactRequestEmail).toHaveBeenCalledOnce();

    expect(mockedSendContactRequestEmail).toHaveBeenCalledWith({
      firstName: null,
      email: "vivian@example.com",
      subject: "OTHER",
      accommodationName: null,
      message: "Bonjour.",
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

    expect(mockedSendContactRequestEmail).not.toHaveBeenCalled();
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

    expect(mockedSendContactRequestEmail).not.toHaveBeenCalled();
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

    expect(mockedSendContactRequestEmail).not.toHaveBeenCalled();
  });

  it("returns an error when the email cannot be sent", async () => {
    mockedSendContactRequestEmail.mockRejectedValueOnce(
      new Error("Resend unavailable"),
    );

    const result = await submitContactRequest({
      firstName: "Vivian",
      email: "vivian@example.com",
      subject: "OTHER",
      accommodationId: null,
      message: "Bonjour.",
    });

    expect(result).toEqual({
      success: false,
      message:
        "Votre message n’a pas pu être envoyé. Veuillez réessayer dans quelques instants.",
    });

    expect(mockedSendContactRequestEmail).toHaveBeenCalledOnce();
  });
});
