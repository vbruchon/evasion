"use client";

import { House, MessageCircleMore, type LucideIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";
import { cn } from "@/lib/utils";

type ContactSubjectSelectorProps = {
  hasAccommodations: boolean;
  accommodationTitle: string;
  accommodationDescription: string;
  otherTitle: string;
  otherDescription: string;
  preview?: boolean;
};

type SubjectCardProps = {
  active: boolean;
  preview: boolean;
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
};

const SubjectCard = ({
  active,
  preview,
  icon: Icon,
  title,
  description,
  onClick,
}: SubjectCardProps) => (
  <button
    type="button"
    aria-pressed={preview ? undefined : active}
    onClick={preview ? undefined : onClick}
    tabIndex={preview ? -1 : undefined}
    className={cn(
      "group flex min-h-24 items-center gap-4 border px-5 py-4 text-left transition-all duration-300",
      preview ? "cursor-default" : "cursor-pointer",
      active &&
        !preview &&
        "border-primary bg-primary/8 shadow-[inset_0_0_30px_rgba(194,136,66,0.04)]",
      active && preview && "border-muted-foreground/60 bg-white/1.5",
      !active && "border-border/65 bg-white/1.5",
      !preview && !active && "hover:border-primary/40 hover:bg-white/2.5",
    )}
  >
    <Icon
      className={cn(
        "size-6 transition-colors",
        active && !preview && "text-primary",
        preview && "text-muted-foreground",
        !preview && !active && "text-muted-foreground group-hover:text-primary",
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
  accommodationTitle,
  accommodationDescription,
  otherTitle,
  otherDescription,
  preview = false,
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
          preview={preview}
          icon={House}
          title={accommodationTitle}
          description={accommodationDescription}
          onClick={() => selectSubject("ACCOMMODATION")}
        />
      ) : null}

      <SubjectCard
        active={subject === "OTHER"}
        preview={preview}
        icon={MessageCircleMore}
        title={otherTitle}
        description={otherDescription}
        onClick={() => selectSubject("OTHER")}
      />
    </div>
  );
};
