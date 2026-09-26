"use client";

import { FormProvider } from "react-hook-form";

import { ContactPageFormContent } from "@/components/features/contact/form/contact-page-form-content";
import { useContactRequestForm } from "@/hooks/contact/use-contact-request-form";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

type ContactPageFormProps = {
  accommodations: ContactPageAccommodation[];
  formTitle: string;
  submitLabel: string;
  onSuccess: () => void;
};

export const ContactPageForm = ({
  accommodations,
  formTitle,
  submitLabel,
  onSuccess,
}: ContactPageFormProps) => {
  const hasAccommodations = accommodations.length > 0;

  const { form, handleSubmit } = useContactRequestForm({
    hasAccommodations,
    onSuccess,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} noValidate>
        <ContactPageFormContent
          accommodations={accommodations}
          formTitle={formTitle}
          submitLabel={submitLabel}
        />
      </form>
    </FormProvider>
  );
};
