"use client";

import { Plus } from "lucide-react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { FaqPageQuestionsEditorSection } from "@/lib/admin/faq/editor/editor-sections";
import type { FaqPageContentValues } from "@/lib/faq/faq-page.schema";

import { FaqPageTextField } from "../../form/faq-page-text-field";
import { FaqPageQuestionEditorItem } from "./faq-page-question-editor-item";

type FaqPageQuestionsEditorProps = {
  section: FaqPageQuestionsEditorSection;
};

export const FaqPageQuestionsEditor = ({
  section,
}: FaqPageQuestionsEditorProps) => {
  const { control } = useFormContext<FaqPageContentValues>();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "items",
  });

  const items = useWatch({
    control,
    name: "items",
  });

  if (section === "content") {
    return (
      <AdminEditorSectionContent>
        <FaqPageTextField
          name="questionsEyebrow"
          label="Sur-titre"
          placeholder="Ex. FAQ"
        />

        <FaqPageTextField
          name="questionsTitle"
          label="Titre"
          placeholder="Ex. Vos questions, nos réponses."
        />

        <FaqPageTextField
          name="questionsDescription"
          label="Description"
          placeholder="Présentez les informations disponibles dans cette section"
          multiline
        />
      </AdminEditorSectionContent>
    );
  }

  return (
    <AdminEditorSectionContent>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Questions</p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Ajoutez, supprimez ou réorganisez les questions de la FAQ.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0"
          onClick={() =>
            append({
              itemId: null,
              question: "",
              answer: "",
            })
          }
        >
          <Plus />
          Ajouter
        </Button>
      </div>

      <Accordion
        defaultValue={fields[0] ? [fields[0].id] : []}
        className="space-y-3"
      >
        {fields.map((field, index) => (
          <FaqPageQuestionEditorItem
            key={field.id}
            fieldId={field.id}
            index={index}
            totalItems={fields.length}
            question={items?.[index]?.question?.trim() ?? ""}
            onMoveUp={() => move(index, index - 1)}
            onMoveDown={() => move(index, index + 1)}
            onRemove={() => remove(index)}
          />
        ))}
      </Accordion>
    </AdminEditorSectionContent>
  );
};
