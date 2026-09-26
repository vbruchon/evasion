"use client";

import { FormProvider } from "react-hook-form";

import { ContactPageFormContent } from "@/components/features/contact/form/contact-page-form-content";
import { useContactRequestForm } from "@/hooks/contact/use-contact-request-form";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

type ContactPageFormProps = {
  content: ContactPageContentValues;
  accommodations: ContactPageAccommodation[];
  onSuccess: () => void;
};

export const ContactPageForm = ({
  content,
  accommodations,
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
          content={content}
          accommodations={accommodations}
        />
      </form>
    </FormProvider>
  );
};
