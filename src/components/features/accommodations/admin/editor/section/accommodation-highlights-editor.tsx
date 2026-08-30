"use client";

import { Plus, Sparkles } from "lucide-react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import { Button } from "@/components/ui/button";
import {
  DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON,
  MAX_ACCOMMODATION_HIGHLIGHTS,
} from "@/lib/accommodations/accommodation-highlights";

import { AccommodationHighlightFieldCard } from "../../form/accommodation-highlight-field-card";
import { AccommodationHighlightPresetPicker } from "../../form/accommodation-highlight-preset-picker";

type AccommodationHighlightsEditorProps = {
  disabled?: boolean;
};

export const AccommodationHighlightsEditor = ({
  disabled = false,
}: AccommodationHighlightsEditorProps) => {
  const form = useFormContext<AccommodationUpdateFormValues>();

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const highlights = useWatch({
    control: form.control,
    name: "highlights",
  });

  const canAdd = !disabled && fields.length < MAX_ACCOMMODATION_HIGHLIGHTS;

  return (
    <div className="border-t border-border/60 px-5 py-6 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Points forts</p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Atouts affichés dans le bandeau inférieur du hero.
          </p>
        </div>

        <span className="shrink-0 text-xs text-muted-foreground">
          {fields.length} / {MAX_ACCOMMODATION_HIGHLIGHTS}
        </span>
      </div>

      {fields.length === 0 ? (
        <div className="mt-4">
          <AccommodationHighlightPresetPicker
            empty
            compact
            disabled={!canAdd}
            onSelect={append}
          />
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {fields.map((field, index) => (
            <AccommodationHighlightFieldCard
              key={field.id}
              index={index}
              total={fields.length}
              compact
              disabled={disabled}
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
            <AccommodationHighlightPresetPicker compact onSelect={append} />
          ) : null}
        </div>
      )}
    </div>
  );
};
