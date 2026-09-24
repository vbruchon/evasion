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
import { cn } from "@/lib/utils";

export type AdminTextFieldProps<TValues extends FieldValues> = {
  name: FieldPath<TValues>;
  label: string;
  placeholder?: string;
  description?: string;
  multiline?: boolean;
  variant?: "default" | "editor";
  className?: string;
  transform?: (value: string) => string;
  onValueChange?: (value: string) => void;
};

export const AdminTextField = <TValues extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  multiline = false,
  variant = "default",
  className,
  transform,
  onValueChange,
}: AdminTextFieldProps<TValues>) => {
  const form = useFormContext<TValues>();
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

        const value = field.value == null ? "" : String(field.value);

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
                value={value}
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
                value={value}
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
