"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { submitContactForm } from "~/app/(website)/contact/action";
import {
  contactRequestSchema,
  type ContactRequestValues,
} from "@/lib/contact/contact-request.schema";

type UseContactRequestFormOptions = {
  hasAccommodations: boolean;
  turnstileToken: string | null;
  onSuccess: () => void;
  onSecurityReset: () => void;
};

export const useContactRequestForm = ({
  hasAccommodations,
  turnstileToken,
  onSuccess,
  onSecurityReset,
}: UseContactRequestFormOptions) => {
  const form = useForm<ContactRequestValues>({
    resolver: zodResolver(contactRequestSchema),

    defaultValues: {
      firstName: "",
      email: "",
      subject: hasAccommodations ? "ACCOMMODATION" : "OTHER",
      accommodationId: null,
      message: "",
    },

    mode: "onSubmit",
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");

    if (!turnstileToken) {
      form.setError("root", {
        type: "server",
        message:
          "La vérification de sécurité n’est pas terminée. Veuillez réessayer.",
      });

      return;
    }

    try {
      const result = await submitContactForm(values, turnstileToken);

      if (!result.success) {
        form.setError("root", {
          type: "server",
          message: result.message,
        });

        onSecurityReset();

        return;
      }

      onSuccess();
    } catch {
      form.setError("root", {
        type: "server",
        message:
          "Une erreur est survenue. Veuillez réessayer dans quelques instants.",
      });

      onSecurityReset();
    }
  });

  return {
    form,
    handleSubmit,
  };
};
