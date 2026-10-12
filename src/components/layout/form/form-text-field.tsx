"use client";

import {
  Controller,
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type FormTextFieldProps<TValues extends FieldValues> = {
  name: FieldPath<TValues>;
  label: string;
  placeholder?: string;
  description?: string;
  optional?: boolean;
  multiline?: boolean;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  className?: string;
  inputClassName?: string;
};

export const FormTextField = <TValues extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  optional = false,
  multiline = false,
  type = "text",
  autoComplete,
  className,
  inputClassName,
}: FormTextFieldProps<TValues>) => {
  const form = useFormContext<TValues>();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const value = field.value == null ? "" : String(field.value);

        const descriptionId = `${field.name}-description`;
        const errorId = `${field.name}-error`;

        const describedBy = [
          description ? descriptionId : null,
          fieldState.error ? errorId : null,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <Field data-invalid={fieldState.invalid} className={className}>
            <FieldLabel htmlFor={field.name}>
              {label}

              {optional ? (
                <span className="text-xs font-normal italic normal-case tracking-normal text-muted-foreground">
                  (facultatif)
                </span>
              ) : (
                <span className="text-primary">*</span>
              )}
            </FieldLabel>

            {multiline ? (
              <Textarea
                id={field.name}
                name={field.name}
                ref={field.ref}
                value={value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                aria-required={!optional}
                aria-describedby={describedBy || undefined}
                className={inputClassName}
              />
            ) : (
              <Input
                id={field.name}
                name={field.name}
                ref={field.ref}
                type={type}
                value={value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={fieldState.invalid}
                aria-required={!optional}
                aria-describedby={describedBy || undefined}
                className={inputClassName}
              />
            )}

            {description ? (
              <FieldDescription id={descriptionId}>
                {description}
              </FieldDescription>
            ) : null}

            <FieldError id={errorId} errors={[fieldState.error]} />
          </Field>
        );
      }}
    />
  );
};
