import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { verifyTurnstileToken } from "@/lib/contact/anti-bot/verify-turnstile-token";

describe("verifyTurnstileToken", () => {
  beforeEach(() => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-turnstile-secret");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("accepts a successful contact verification", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          action: "contact",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    await expect(
      verifyTurnstileToken("valid-token", "127.0.0.1"),
    ).resolves.toBe(true);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({
        method: "POST",
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("rejects a token generated for another action", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          action: "login",
        }),
        {
          status: 200,
        },
      ),
    );

    await expect(
      verifyTurnstileToken("valid-token", "127.0.0.1"),
    ).resolves.toBe(false);
  });

  it("rejects an empty token without contacting Turnstile", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    await expect(verifyTurnstileToken("   ", "127.0.0.1")).resolves.toBe(false);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an oversized token without contacting Turnstile", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    await expect(
      verifyTurnstileToken("a".repeat(2049), "127.0.0.1"),
    ).resolves.toBe(false);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an unsuccessful verification", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          action: "contact",
        }),
        {
          status: 200,
        },
      ),
    );

    await expect(
      verifyTurnstileToken("invalid-token", "127.0.0.1"),
    ).resolves.toBe(false);
  });

  it("throws when Turnstile returns an HTTP error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 500,
      }),
    );

    await expect(
      verifyTurnstileToken("valid-token", "127.0.0.1"),
    ).rejects.toThrow("Unable to verify Turnstile token.");
  });
});
