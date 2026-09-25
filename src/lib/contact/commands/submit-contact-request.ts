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

  console.log("Contact request", {
    firstName: data.firstName || null,
    email: data.email,
    subject: data.subject,
    accommodation,
    message: data.message,
  });

  return {
    success: true as const,
  };
};
