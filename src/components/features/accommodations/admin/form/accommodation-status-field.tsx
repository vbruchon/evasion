"use client";

import { Controller, useFormContext } from "react-hook-form";

import type { AccommodationFormValues } from "~/app/admin/logements/schema";

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

const statuses = [
  {
    value: "DRAFT",
    label: "Brouillon",
    description: "Le logement reste invisible sur le site public.",
  },
  {
    value: "PUBLISHED",
    label: "Publié",
    description: "Le logement est visible sur le site public.",
  },
  {
    value: "ARCHIVED",
    label: "Archivé",
    description:
      "Le logement est conservé dans l’administration mais n’est plus visible publiquement.",
  },
] as const;

type AccommodationStatusFieldProps = {
  includeArchived?: boolean;
};

export const AccommodationStatusField = ({
  includeArchived = false,
}: AccommodationStatusFieldProps) => {
  const form = useFormContext<AccommodationFormValues>();

  const availableStatuses = includeArchived
    ? statuses
    : statuses.filter((status) => status.value !== "ARCHIVED");

  return (
    <Controller
      name="status"
      control={form.control}
      render={({ field, fieldState }) => {
        const currentStatus = statuses.find(
          (status) => status.value === field.value,
        );

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
