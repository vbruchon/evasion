"use client";

import { ArrowDown, ArrowUp, Pencil, Trash2, X } from "lucide-react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { FaqPageTextField } from "../../form/faq-page-text-field";

type FaqPageQuestionEditorItemProps = {
  fieldId: string;
  index: number;
  totalItems: number;
  question: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

export const FaqPageQuestionEditorItem = ({
  fieldId,
  index,
  totalItems,
  question,
  onMoveUp,
  onMoveDown,
  onRemove,
}: FaqPageQuestionEditorItemProps) => (
  <AccordionItem
    value={fieldId}
    className="overflow-hidden border border-border/60 bg-card/20"
  >
    <div className="grid min-h-24 grid-cols-[minmax(0,1fr)_auto] items-center">
      <AccordionTrigger className="min-w-0 px-4 py-4 hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
        <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
          <div className="min-w-0 text-left">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-primary/70">
              Question {String(index + 1).padStart(2, "0")}
            </p>

            <p className="mt-1.5 line-clamp-2 text-sm font-medium leading-5 text-foreground">
              {question || "Nouvelle question"}
            </p>
          </div>

          <span className="flex size-8 shrink-0 items-center justify-center text-muted-foreground transition-colors group-hover/accordion-trigger:text-primary">
            <span className="flex size-8 items-center justify-center rounded-full border border-border/70 transition-colors group-hover/accordion-trigger:border-primary/50 group-aria-expanded/accordion-trigger:hidden">
              <Pencil className="size-3.5" />
            </span>

            <X className="hidden size-4 text-primary/80 group-aria-expanded/accordion-trigger:block" />
          </span>
        </div>
      </AccordionTrigger>

      <div className="flex h-full shrink-0 items-center gap-0.5 border-l border-border/50 px-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={index === 0}
          aria-label="Déplacer vers le haut"
          onClick={onMoveUp}
        >
          <ArrowUp />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={index === totalItems - 1}
          aria-label="Déplacer vers le bas"
          onClick={onMoveDown}
        >
          <ArrowDown />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={totalItems === 1}
          aria-label="Supprimer la question"
          className="hover:text-destructive"
          onClick={onRemove}
        >
          <Trash2 />
        </Button>
      </div>
    </div>

    <AccordionContent className="border-t border-border/50 px-4 pb-5 pt-5">
      <div className="space-y-5">
        <FaqPageTextField
          name={`items.${index}.question`}
          label="Question"
          placeholder="Saisissez la question"
        />

        <FaqPageTextField
          name={`items.${index}.answer`}
          label="Réponse"
          placeholder="Saisissez la réponse"
          multiline
        />
      </div>
    </AccordionContent>
  </AccordionItem>
);
