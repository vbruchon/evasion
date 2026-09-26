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
import { checkContactRequestRateLimit } from "@/lib/contact/rate-limit/contact-request-rate-limit";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";

vi.mock("@/lib/contact/emails/send-contact-request-email", () => ({
  sendContactRequestEmail: vi.fn(),
}));

vi.mock("@/lib/contact/rate-limit/contact-request-rate-limit", () => ({
  checkContactRequestRateLimit: vi.fn(),
}));

const mockedSendContactRequestEmail = vi.mocked(sendContactRequestEmail);
const mockedCheckContactRequestRateLimit = vi.mocked(
  checkContactRequestRateLimit,
);

const requestOptions = {
  ipAddress: "127.0.0.1",
};

describe("submitContactRequest", () => {
  beforeEach(async () => {
    mockedSendContactRequestEmail.mockResolvedValue(undefined);

    mockedCheckContactRequestRateLimit.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 600_000,
      pending: Promise.resolve(),
    });

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

    const result = await submitContactRequest(
      {
        firstName: "Vivian",
        email: "vivian@example.com",
        subject: "ACCOMMODATION",
        accommodationId: accommodation.id,
        message: "Bonjour.",
      },
      requestOptions,
    );

    expect(result).toEqual({
      success: true,
    });

    expect(mockedCheckContactRequestRateLimit).toHaveBeenCalledWith(
      "127.0.0.1",
    );

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
    const result = await submitContactRequest(
      {
        firstName: "",
        email: "vivian@example.com",
        subject: "OTHER",
        accommodationId: null,
        message: "Bonjour.",
      },
      requestOptions,
    );

    expect(result).toEqual({
      success: true,
    });

    expect(mockedCheckContactRequestRateLimit).toHaveBeenCalledWith(
      "127.0.0.1",
    );

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

    const result = await submitContactRequest(
      {
        firstName: "",
        email: "vivian@example.com",
        subject: "ACCOMMODATION",
        accommodationId: accommodation.id,
        message: "Bonjour.",
      },
      requestOptions,
    );

    expect(result).toEqual({
      success: false,
      message: "Le logement sélectionné n’est pas disponible.",
    });

    expect(mockedCheckContactRequestRateLimit).toHaveBeenCalledWith(
      "127.0.0.1",
    );

    expect(mockedSendContactRequestEmail).not.toHaveBeenCalled();
  });

  it("rejects an unknown accommodation", async () => {
    const result = await submitContactRequest(
      {
        firstName: "",
        email: "vivian@example.com",
        subject: "ACCOMMODATION",
        accommodationId: "unknown-accommodation",
        message: "Bonjour.",
      },
      requestOptions,
    );

    expect(result).toEqual({
      success: false,
      message: "Le logement sélectionné n’est pas disponible.",
    });

    expect(mockedCheckContactRequestRateLimit).toHaveBeenCalledWith(
      "127.0.0.1",
    );

    expect(mockedSendContactRequestEmail).not.toHaveBeenCalled();
  });

  it("rejects an invalid request before checking the rate limit", async () => {
    const result = await submitContactRequest(
      {
        firstName: "",
        email: "invalid-email",
        subject: "OTHER",
        accommodationId: null,
        message: "",
      },
      requestOptions,
    );

    expect(result).toEqual({
      success: false,
      message: "Les informations de votre demande sont invalides.",
    });

    expect(mockedCheckContactRequestRateLimit).not.toHaveBeenCalled();
    expect(mockedSendContactRequestEmail).not.toHaveBeenCalled();
  });

  it("rejects a request when the rate limit is exceeded", async () => {
    mockedCheckContactRequestRateLimit.mockResolvedValueOnce({
      success: false,
      limit: 5,
      remaining: 0,
      reset: Date.now() + 600_000,
      pending: Promise.resolve(),
    });

    const result = await submitContactRequest(
      {
        firstName: "Vivian",
        email: "vivian@example.com",
        subject: "OTHER",
        accommodationId: null,
        message: "Bonjour.",
      },
      requestOptions,
    );

    expect(result).toEqual({
      success: false,
      message:
        "Trop de demandes ont été envoyées récemment. Veuillez réessayer dans quelques minutes.",
    });

    expect(mockedCheckContactRequestRateLimit).toHaveBeenCalledWith(
      "127.0.0.1",
    );

    expect(mockedSendContactRequestEmail).not.toHaveBeenCalled();
  });

  it("returns an error when the email cannot be sent", async () => {
    mockedSendContactRequestEmail.mockRejectedValueOnce(
      new Error("Resend unavailable"),
    );

    const result = await submitContactRequest(
      {
        firstName: "Vivian",
        email: "vivian@example.com",
        subject: "OTHER",
        accommodationId: null,
        message: "Bonjour.",
      },
      requestOptions,
    );

    expect(result).toEqual({
      success: false,
      message:
        "Votre message n’a pas pu être envoyé. Veuillez réessayer dans quelques instants.",
    });

    expect(mockedCheckContactRequestRateLimit).toHaveBeenCalledWith(
      "127.0.0.1",
    );

    expect(mockedSendContactRequestEmail).toHaveBeenCalledOnce();
  });
});
