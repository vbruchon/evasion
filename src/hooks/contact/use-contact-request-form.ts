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
  onSuccess: () => void;
};

export const useContactRequestForm = ({
  hasAccommodations,
  onSuccess,
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

    try {
      const result = await submitContactForm(values);

      if (!result.success) {
        form.setError("root", {
          type: "server",
          message: result.message,
        });

        return;
      }

      onSuccess();
    } catch {
      form.setError("root", {
        type: "server",
        message:
          "Une erreur est survenue. Veuillez réessayer dans quelques instants.",
      });
    }
  });

  return {
    form,
    handleSubmit,
  };
};
