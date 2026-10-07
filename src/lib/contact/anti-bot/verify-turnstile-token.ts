const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const TURNSTILE_ACTION = "contact";
const TURNSTILE_MAX_TOKEN_LENGTH = 2048;
const TURNSTILE_TIMEOUT_MS = 5_000;

type TurnstileSiteverifyResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export const verifyTurnstileToken = async (
  token: string,
  ipAddress: string,
) => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Turnstile secret key is missing.");
  }

  const normalizedToken = token.trim();

  if (!normalizedToken || normalizedToken.length > TURNSTILE_MAX_TOKEN_LENGTH) {
    return false;
  }

  const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      secret: secretKey,
      response: normalizedToken,
      remoteip: ipAddress,
    }),

    signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error("Unable to verify Turnstile token.");
  }

  const result = (await response.json()) as TurnstileSiteverifyResponse;

  return result.success && result.action === TURNSTILE_ACTION;
};
