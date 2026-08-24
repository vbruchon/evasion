"use client";

import { Controller, useFormContext } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { CreateAccommodationFormValues } from "~/app/admin/logements/nouveau/schema";

type AccommodationTextFieldName = Exclude<
  keyof CreateAccommodationFormValues,
  "status"
>;

type AccommodationTextFieldProps = {
  name: AccommodationTextFieldName;
  label: string;
  placeholder?: string;
  description?: string;
  multiline?: boolean;
  className?: string;
  transform?: (value: string) => string;
  onValueChange?: (value: string) => void;
};

export const AccommodationTextField = ({
  name,
  label,
  placeholder,
  description,
  multiline = false,
  className,
  transform,
  onValueChange,
}: AccommodationTextFieldProps) => {
  const form = useFormContext<CreateAccommodationFormValues>();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const handleChange = (value: string) => {
          const nextValue = transform ? transform(value) : value;

          field.onChange(nextValue);
          onValueChange?.(nextValue);
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

            {multiline ? (
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                className={className}
                placeholder={placeholder}
                onChange={(event) => handleChange(event.target.value)}
              />
            ) : (
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                className={className}
                placeholder={placeholder}
                onChange={(event) => handleChange(event.target.value)}
              />
            )}

            {description ? (
              <FieldDescription>{description}</FieldDescription>
            ) : null}

            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </Field>
        );
      }}
    />
  );
};
