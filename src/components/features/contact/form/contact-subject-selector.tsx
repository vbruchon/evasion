"use client";

import { House, MessageCircleMore, type LucideIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";
import { cn } from "@/lib/utils";

type ContactSubjectSelectorProps = {
  hasAccommodations: boolean;
};

type SubjectCardProps = {
  active: boolean;
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
};

const SubjectCard = ({
  active,
  icon: Icon,
  title,
  description,
  onClick,
}: SubjectCardProps) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={cn(
      "group flex min-h-24 cursor-pointer items-center gap-4 border px-5 py-4 text-left transition-all duration-300",
      active
        ? "border-primary bg-primary/8 shadow-[inset_0_0_30px_rgba(194,136,66,0.04)]"
        : "border-border/65 bg-white/1.5 hover:border-primary/40 hover:bg-white/2.5",
    )}
  >
    <Icon
      className={cn(
        "size-6 transition-colors",
        active
          ? "text-primary"
          : "text-muted-foreground group-hover:text-primary",
      )}
    />
    <div className="flex min-w-0 flex-col">
      <span className="font-heading text-lg leading-tight">{title}</span>

      <span className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </span>
    </div>
  </button>
);

export const ContactSubjectSelector = ({
  hasAccommodations,
}: ContactSubjectSelectorProps) => {
  const form = useFormContext<ContactRequestValues>();

  const subject = useWatch({
    control: form.control,
    name: "subject",
  });

  const selectSubject = (nextSubject: ContactRequestValues["subject"]) => {
    form.setValue("subject", nextSubject, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (nextSubject === "OTHER") {
      form.setValue("accommodationId", null, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <div
      className={cn("mt-8 grid gap-3", hasAccommodations && "sm:grid-cols-2")}
    >
      {hasAccommodations ? (
        <SubjectCard
          active={subject === "ACCOMMODATION"}
          icon={House}
          title="Un logement"
          description="Une question avant une réservation"
          onClick={() => selectSubject("ACCOMMODATION")}
        />
      ) : null}

      <SubjectCard
        active={subject === "OTHER"}
        icon={MessageCircleMore}
        title="Autre demande"
        description="Pour toute autre question"
        onClick={() => selectSubject("OTHER")}
      />
    </div>
  );
};
