"use client";

import { Controller, useFormContext } from "react-hook-form";

import type { AccommodationCreateFormValues } from "~/app/admin/logements/schema";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  accommodationStatuses,
  getAccommodationStatus,
} from "@/lib/admin/accommodation/accommodation-statuses";

export const AccommodationStatusField = () => {
  const form = useFormContext<AccommodationCreateFormValues>();

  const availableStatuses = accommodationStatuses.filter(
    (status) => status.value !== "ARCHIVED",
  );

  return (
    <Controller
      name="status"
      control={form.control}
      render={({ field, fieldState }) => {
        const currentStatus = getAccommodationStatus(field.value);

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Statut</FieldLabel>

            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
                <SelectValue>{currentStatus?.label}</SelectValue>
              </SelectTrigger>

              <SelectContent>
                {availableStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {currentStatus ? (
              <FieldDescription>{currentStatus.description}</FieldDescription>
            ) : null}

            <FieldError errors={[fieldState.error]} />
          </Field>
        );
      }}
    />
  );
};
