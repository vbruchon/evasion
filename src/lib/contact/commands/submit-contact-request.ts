import { verifyTurnstileToken } from "@/lib/contact/anti-bot/verify-turnstile-token";
import { sendContactRequestEmail } from "@/lib/contact/emails/send-contact-request-email";
import { checkContactRequestRateLimit } from "@/lib/contact/rate-limit/contact-request-rate-limit";
import { prisma } from "@/lib/prisma";

import {
  contactRequestSchema,
  type ContactRequestValues,
} from "../contact-request.schema";

type SubmitContactRequestOptions = {
  ipAddress: string;
  turnstileToken: string;
};

export const submitContactRequest = async (
  values: ContactRequestValues,
  { ipAddress, turnstileToken }: SubmitContactRequestOptions,
) => {
  const validation = contactRequestSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false as const,
      message: "Les informations de votre demande sont invalides.",
    };
  }

  const rateLimit = await checkContactRequestRateLimit(ipAddress);

  if (!rateLimit.success) {
    return {
      success: false as const,
      message:
        "Trop de demandes ont été envoyées récemment. Veuillez réessayer dans quelques minutes.",
    };
  }

  let turnstileValid = false;

  try {
    turnstileValid = await verifyTurnstileToken(turnstileToken, ipAddress);
  } catch (error) {
    console.error("Unable to verify Turnstile token", error);

    return {
      success: false as const,
      message: "La vérification de sécurité a échoué. Veuillez réessayer.",
    };
  }

  if (!turnstileValid) {
    return {
      success: false as const,
      message: "La vérification de sécurité a échoué. Veuillez réessayer.",
    };
  }

  const data = validation.data;

  let accommodation: {
    id: string;
    name: string;
  } | null = null;

  if (data.subject === "ACCOMMODATION") {
    accommodation = await prisma.accommodation.findFirst({
      where: {
        id: data.accommodationId!,
        status: "PUBLISHED",
      },

      select: {
        id: true,
        name: true,
      },
    });

    if (!accommodation) {
      return {
        success: false as const,
        message: "Le logement sélectionné n’est pas disponible.",
      };
    }
  }

  try {
    await sendContactRequestEmail({
      firstName: data.firstName || null,
      email: data.email,
      subject: data.subject,
      accommodationName: accommodation?.name ?? null,
      message: data.message,
    });
  } catch (error) {
    console.error("Unable to send contact request email", error);

    return {
      success: false as const,
      message:
        "Votre message n’a pas pu être envoyé. Veuillez réessayer dans quelques instants.",
    };
  }

  return {
    success: true as const,
  };
};
