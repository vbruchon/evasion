import { sendContactRequestEmail } from "@/lib/contact/emails/send-contact-request-email";
import { prisma } from "@/lib/prisma";

import {
  contactRequestSchema,
  type ContactRequestValues,
} from "../contact-request.schema";

export const submitContactRequest = async (values: ContactRequestValues) => {
  const validation = contactRequestSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false as const,
      message: "Les informations de votre demande sont invalides.",
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
