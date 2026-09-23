"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AboutPageContentValues } from "@/lib/about/about-page.schema";

type AboutPageTextFieldProps = {
  name: keyof AboutPageContentValues;
  label: string;
  placeholder?: string;
  multiline?: boolean;
};

export const AboutPageTextField = ({
  name,
  label,
  placeholder,
  multiline = false,
}: AboutPageTextFieldProps) => {
  const form = useFormContext<AboutPageContentValues>();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2.5">
          <FieldLabel
            htmlFor={field.name}
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
          >
            {label}
          </FieldLabel>

          {multiline ? (
            <Textarea
              id={field.name}
              name={field.name}
              ref={field.ref}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              className="min-h-28 resize-y border-border/70 bg-card/30 px-3.5 py-3 text-sm leading-6 transition-colors focus-visible:border-primary"
            />
          ) : (
            <Input
              id={field.name}
              name={field.name}
              ref={field.ref}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              className="h-11 border-border/70 bg-card/30 px-3.5 text-sm transition-colors focus-visible:border-primary"
            />
          )}

          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
};
