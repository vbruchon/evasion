"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { ContactAccommodationCarousel } from "@/components/features/contact/form/contact-accommodation-carousel";
import { Field, FieldError } from "@/components/ui/field";
import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

type ContactAccommodationPickerProps = {
  accommodations: ContactPageAccommodation[];
};

export const ContactAccommodationPicker = ({
  accommodations,
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
        onSelect={(id) => {
          form.setValue("accommodationId", id, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
      />

      <FieldError errors={[error]} />
    </Field>
  );
};
