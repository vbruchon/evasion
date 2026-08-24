"use client";

import { Controller, useFormContext } from "react-hook-form";

import type { AccommodationFormValues } from "~/app/admin/logements/schema";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type AccommodationTextFieldName = Exclude<
  keyof AccommodationFormValues,
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
  const form = useFormContext<AccommodationFormValues>();

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
                value={field.value ?? ""}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                className={className}
                onChange={(event) => handleChange(event.target.value)}
              />
            ) : (
              <Input
                {...field}
                id={field.name}
                value={field.value ?? ""}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                className={className}
                onChange={(event) => handleChange(event.target.value)}
              />
            )}

            {description ? (
              <FieldDescription>{description}</FieldDescription>
            ) : null}

            <FieldError errors={[fieldState.error]} />
          </Field>
        );
      }}
    />
  );
};
