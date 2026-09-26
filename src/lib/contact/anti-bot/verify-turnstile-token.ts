const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileSiteverifyResponse = {
  success: boolean;
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

  if (!token) {
    return false;
  }

  const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      secret: secretKey,
      response: token,
      remoteip: ipAddress,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to verify Turnstile token.");
  }

  const result = (await response.json()) as TurnstileSiteverifyResponse;

  return result.success;
};
