"use client";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import type { AccommodationCreateFormValues } from "~/app/admin/logements/schema";

import { MAX_ACCOMMODATION_HIGHLIGHTS } from "@/lib/accommodations/accommodation-highlights";

import { AccommodationHighlightFieldCard } from "./accommodation-highlight-field-card";
import { AccommodationHighlightPresetPicker } from "./accommodation-highlight-preset-picker";

export const AccommodationHighlightsField = () => {
  const form = useFormContext<AccommodationCreateFormValues>();

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const highlights = useWatch({
    control: form.control,
    name: "highlights",
  });

  const canAdd = fields.length < MAX_ACCOMMODATION_HIGHLIGHTS;

  return (
    <div className="max-w-3xl space-y-4">
      {fields.length === 0 ? (
        <AccommodationHighlightPresetPicker
          empty
          disabled={!canAdd}
          onSelect={append}
        />
      ) : (
        <div className="space-y-2.5">
          {fields.map((field, index) => (
            <AccommodationHighlightFieldCard
              key={field.id}
              index={index}
              total={fields.length}
              selectedIcon={highlights?.[index]?.icon}
              titleField={form.register(`highlights.${index}.title`)}
              descriptionField={form.register(
                `highlights.${index}.description`,
              )}
              titleError={
                form.formState.errors.highlights?.[index]?.title?.message
              }
              descriptionError={
                form.formState.errors.highlights?.[index]?.description?.message
              }
              onIconChange={(icon) => {
                form.setValue(`highlights.${index}.icon`, icon, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              onMoveUp={() => move(index, index - 1)}
              onMoveDown={() => move(index, index + 1)}
              onRemove={() => remove(index)}
            />
          ))}

          {canAdd ? (
            <AccommodationHighlightPresetPicker onSelect={append} />
          ) : null}
        </div>
      )}
    </div>
  );
};
