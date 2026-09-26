"use client";

import { ArrowRight } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import { ContactAccommodationPicker } from "@/components/features/contact/form/contact-accommodation-picker";
import { ContactFormTextField } from "@/components/features/contact/form/contact-form-text-field";
import { ContactSubjectSelector } from "@/components/features/contact/form/contact-subject-selector";
import { Button } from "@/components/ui/button";
import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

type ContactPageFormContentProps = {
  accommodations: ContactPageAccommodation[];
  formTitle: string;
  submitLabel: string;
};

export const ContactPageFormContent = ({
  accommodations,
  formTitle,
  submitLabel,
}: ContactPageFormContentProps) => {
  const form = useFormContext<ContactRequestValues>();

  const hasAccommodations = accommodations.length > 0;

  const subject = useWatch({
    control: form.control,
    name: "subject",
  });

  return (
    <>
      <h2 className="max-w-xl font-heading text-2xl leading-tight tracking-[-0.03em] lg:text-[1.75rem]">
        {formTitle}
      </h2>

      <ContactSubjectSelector hasAccommodations={hasAccommodations} />

      {subject === "ACCOMMODATION" ? (
        <ContactAccommodationPicker accommodations={accommodations} />
      ) : null}

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <ContactFormTextField
          name="firstName"
          label="Prénom"
          optional
          autoComplete="given-name"
          placeholder="Ex. : Jean"
          inputClassName="h-12"
        />

        <ContactFormTextField
          name="email"
          label="E-mail"
          type="email"
          autoComplete="email"
          placeholder="Ex. : exemple@email.fr"
          inputClassName="h-12"
        />
      </div>

      <ContactFormTextField
        name="message"
        label="Comment pouvons-nous vous aider ?"
        multiline
        placeholder="Posez votre question, nous vous répondrons rapidement..."
        className="mt-7"
        inputClassName="min-h-32"
      />

      {form.formState.errors.root ? (
        <div className="mt-6 border border-destructive/40 bg-destructive/5 px-4 py-3">
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting}
        className="mt-7 h-13 w-full"
      >
        {form.formState.isSubmitting ? "Envoi en cours..." : submitLabel}

        {!form.formState.isSubmitting ? (
          <ArrowRight data-icon="inline-end" />
        ) : null}
      </Button>
    </>
  );
};
