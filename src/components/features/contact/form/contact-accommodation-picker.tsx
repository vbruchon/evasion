"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { ContactAccommodationCarousel } from "@/components/features/contact/form/contact-accommodation-carousel";
import { Field, FieldError } from "@/components/ui/field";
import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

type ContactAccommodationPickerProps = {
  accommodations: ContactPageAccommodation[];
  label: string;
  preview?: boolean;
};

export const ContactAccommodationPicker = ({
  accommodations,
  label,
  preview = false,
}: ContactAccommodationPickerProps) => {
  const form = useFormContext<ContactRequestValues>();

  const accommodationId = useWatch({
    control: form.control,
    name: "accommodationId",
  });

  const error = form.formState.errors.accommodationId;

  return (
    <Field className="mt-9 min-w-0" data-invalid={Boolean(error)}>
      <ContactAccommodationCarousel
        accommodations={accommodations}
        selectedId={accommodationId}
        label={label}
        preview={preview}
        onSelect={(id) => {
          if (preview) {
            return;
          }

          form.setValue("accommodationId", id, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
      />

      {!preview ? <FieldError errors={[error]} /> : null}
    </Field>
  );
};
