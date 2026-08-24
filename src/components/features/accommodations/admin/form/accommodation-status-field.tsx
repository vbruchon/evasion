"use client";

import { Controller, useFormContext } from "react-hook-form";

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

import type { CreateAccommodationFormValues } from "~/app/admin/logements/nouveau/schema";

const statusConfig = {
  DRAFT: {
    label: "Brouillon",
    description:
      "Le logement sera enregistré sans être visible sur le site public.",
  },
  PUBLISHED: {
    label: "Publié",
    description: "Le logement sera visible sur le site public dès sa création.",
  },
} satisfies Record<
  CreateAccommodationFormValues["status"],
  {
    label: string;
    description: string;
  }
>;

export const AccommodationStatusField = () => {
  const form = useFormContext<CreateAccommodationFormValues>();

  return (
    <Controller
      name="status"
      control={form.control}
      render={({ field, fieldState }) => {
        const currentStatus = statusConfig[field.value];

        return (
          <Field className="max-w-md" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="status">Statut</FieldLabel>

            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="status"
                aria-invalid={fieldState.invalid}
                className="max-w-xs"
              >
                <SelectValue>{currentStatus.label}</SelectValue>
              </SelectTrigger>

              <SelectContent>
                {Object.entries(statusConfig).map(([value, config]) => (
                  <SelectItem key={value} value={value}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FieldDescription>{currentStatus.description}</FieldDescription>

            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </Field>
        );
      }}
    />
  );
};
