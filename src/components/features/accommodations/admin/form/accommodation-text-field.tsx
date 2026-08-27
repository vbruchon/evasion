"use client";

import { Controller, useFormContext } from "react-hook-form";

import type { AccommodationTextFormValues } from "~/app/admin/logements/schema";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type AccommodationTextFieldProps = {
  name: keyof AccommodationTextFormValues;
  label: string;
  placeholder?: string;
  description?: string;
  multiline?: boolean;
  variant?: "default" | "editor";
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
  variant = "default",
  className,
  transform,
  onValueChange,
}: AccommodationTextFieldProps) => {
  const form = useFormContext<AccommodationTextFormValues>();

  const editor = variant === "editor";

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
          <Field
            data-invalid={fieldState.invalid}
            className={cn(editor && "gap-2.5")}
          >
            <FieldLabel
              htmlFor={field.name}
              className={cn(
                editor &&
                  "text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground",
              )}
            >
              {label}
            </FieldLabel>

            {multiline ? (
              <Textarea
                id={field.name}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                onBlur={field.onBlur}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                className={cn(
                  editor &&
                    "min-h-24 resize-y border-border/70 bg-card/30 px-3.5 py-3 text-sm leading-6 transition-colors focus-visible:border-primary",
                  className,
                )}
              />
            ) : (
              <Input
                id={field.name}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                onBlur={field.onBlur}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                className={cn(
                  editor &&
                    "h-11 border-border/70 bg-card/30 px-3.5 text-sm transition-colors focus-visible:border-primary",
                  className,
                )}
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
