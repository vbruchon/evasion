"use client";

import { Minus, Plus, type LucideIcon } from "lucide-react";
import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { AccommodationCreateFormValues } from "~/app/admin/logements/schema";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AccommodationNumberFieldName =
  | "guestCapacity"
  | "bedrooms"
  | "beds"
  | "bathrooms"
  | "surface";

type AccommodationNumberFieldProps = {
  name: AccommodationNumberFieldName;
  label: string;
  icon?: LucideIcon;
  placeholder?: string;
  description?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  controls?: boolean;
};

export const AccommodationNumberField = ({
  name,
  label,
  icon: Icon,
  placeholder,
  description,
  suffix,
  min = 0,
  max,
  step = 1,
  controls = false,
}: AccommodationNumberFieldProps) => {
  const form = useFormContext<AccommodationCreateFormValues>();
  const inputId = useId();

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const value = field.value;

        const updateValue = (nextValue: number) => {
          if (nextValue < min) {
            return;
          }

          if (max !== undefined && nextValue > max) {
            return;
          }

          field.onChange(nextValue);
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={inputId} className="flex items-center gap-2">
              {Icon ? (
                <Icon className="size-4 text-primary" strokeWidth={1.5} />
              ) : null}

              {label}
            </FieldLabel>

            {controls ? (
              <div
                className={cn(
                  "flex h-10 items-center border border-border bg-background",
                  "transition-colors focus-within:border-primary/60",
                  fieldState.invalid && "border-destructive",
                )}
              >
                <button
                  type="button"
                  aria-label={`Diminuer ${label.toLowerCase()}`}
                  disabled={value === null || value <= min}
                  className="flex h-full w-10 shrink-0 items-center justify-center border-r border-border text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                  onClick={() => {
                    updateValue((value ?? min) - step);
                  }}
                >
                  <Minus className="size-4" strokeWidth={1.5} />
                </button>

                <Input
                  id={inputId}
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  placeholder={placeholder}
                  value={value ?? ""}
                  aria-invalid={fieldState.invalid}
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    const nextValue = event.target.value;

                    field.onChange(nextValue === "" ? null : Number(nextValue));
                  }}
                  className="h-full flex-1 border-0 bg-transparent text-center shadow-none [appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                  type="button"
                  aria-label={`Augmenter ${label.toLowerCase()}`}
                  disabled={max !== undefined && value !== null && value >= max}
                  className="flex h-full w-10 shrink-0 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                  onClick={() => {
                    const nextValue =
                      value === null ? Math.max(min, step) : value + step;

                    updateValue(nextValue);
                  }}
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <Input
                  id={inputId}
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  placeholder={placeholder}
                  value={value ?? ""}
                  aria-invalid={fieldState.invalid}
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    const nextValue = event.target.value;

                    field.onChange(nextValue === "" ? null : Number(nextValue));
                  }}
                  className={cn(
                    suffix && "pr-12",
                    "[appearance:textfield]",
                    "[&::-webkit-inner-spin-button]:appearance-none",
                    "[&::-webkit-outer-spin-button]:appearance-none",
                  )}
                />

                {suffix ? (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                    {suffix}
                  </span>
                ) : null}
              </div>
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
