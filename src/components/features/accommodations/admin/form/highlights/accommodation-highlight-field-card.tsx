"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { AccommodationHighlightIconPicker } from "./accommodation-highlight-icon-picker";
import { AccommodationHighlightActionButton } from "./accommodation-highlight-action-button";

type AccommodationHighlightFieldCardProps = {
  index: number;
  total: number;
  selectedIcon?: string | null;
  titleField: UseFormRegisterReturn;
  descriptionField: UseFormRegisterReturn;
  titleError?: string;
  descriptionError?: string;
  disabled?: boolean;
  compact?: boolean;
  onIconChange: (icon: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

export const AccommodationHighlightFieldCard = ({
  index,
  total,
  selectedIcon,
  titleField,
  descriptionField,
  titleError,
  descriptionError,
  disabled = false,
  compact = false,
  onIconChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: AccommodationHighlightFieldCardProps) => {
  return (
    <div
      className={cn(
        "bg-card/10",
        compact ? "border border-border/40 p-3" : "border border-border/50 p-4",
      )}
    >
      <div
        className={cn(
          "grid gap-3",
          compact
            ? "grid-cols-[36px_minmax(0,1fr)]"
            : "grid-cols-[40px_minmax(0,1fr)]",
        )}
      >
        <AccommodationHighlightIconPicker
          index={index}
          selectedIcon={selectedIcon}
          compact={compact}
          disabled={disabled}
          onChange={onIconChange}
        />

        <div className="min-w-0">
          <div className={cn("flex items-center", compact ? "gap-1" : "gap-2")}>
            <Label htmlFor={`highlight-${index}-title`} className="sr-only">
              Titre
            </Label>

            <Input
              id={`highlight-${index}-title`}
              placeholder="Spa privatif"
              maxLength={40}
              disabled={disabled}
              className="h-9 min-w-0 flex-1 font-medium"
              {...titleField}
            />

            <div className="flex shrink-0 items-center">
              <AccommodationHighlightActionButton
                icon={ArrowUp}
                label="Déplacer vers le haut"
                compact={compact}
                disabled={disabled || index === 0}
                onClick={onMoveUp}
              />

              <AccommodationHighlightActionButton
                icon={ArrowDown}
                label="Déplacer vers le bas"
                compact={compact}
                disabled={disabled || index === total - 1}
                onClick={onMoveDown}
              />

              <AccommodationHighlightActionButton
                icon={Trash2}
                label="Supprimer le point fort"
                compact={compact}
                disabled={disabled}
                destructive
                onClick={onRemove}
              />
            </div>
          </div>

          {titleError ? (
            <p className="mt-1 text-xs text-destructive">{titleError}</p>
          ) : null}

          <Label htmlFor={`highlight-${index}-description`} className="sr-only">
            Description
          </Label>

          <Input
            id={`highlight-${index}-description`}
            placeholder="Jacuzzi rien que pour vous"
            maxLength={60}
            disabled={disabled}
            className="mt-2 h-8 text-xs text-muted-foreground"
            {...descriptionField}
          />

          {descriptionError ? (
            <p className="mt-1 text-xs text-destructive">{descriptionError}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
