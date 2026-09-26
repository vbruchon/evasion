import { Clock3, Heart, UserRound } from "lucide-react";
import Image from "next/image";

import { CONTACT_PAGE_DEFAULT_IMAGE } from "@/lib/contact/contact-page-defaults";
import { cn } from "@/lib/utils";

type ContactPageVisualProps = {
  eyebrow: string;
  handwritten: string;
  title: string;
  description: string;
  reassuranceFirstLabel: string;
  reassuranceSecondLabel: string;
  reassuranceThirdLabel: string;
  variant?: "page" | "modal" | "preview";
};

export const ContactPageVisual = ({
  eyebrow,
  handwritten,
  title,
  description,
  reassuranceFirstLabel,
  reassuranceSecondLabel,
  reassuranceThirdLabel,
  variant = "page",
}: ContactPageVisualProps) => {
  const reassuranceItems = [
    {
      icon: Clock3,
      label: reassuranceFirstLabel,
    },
    {
      icon: UserRound,
      label: reassuranceSecondLabel,
    },
    {
      icon: Heart,
      label: reassuranceThirdLabel,
    },
  ] as const;

  return (
    <div
      className={cn(
        "relative overflow-hidden border-border/60",
        variant === "page" &&
          "min-h-115 border-b lg:min-h-svh lg:border-b-0 lg:border-r",
        variant === "modal" && "hidden min-h-0 border-r lg:block",
        variant === "preview" && "h-full min-h-0 border-r",
      )}
    >
      <Image
        src={CONTACT_PAGE_DEFAULT_IMAGE}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 46vw, 100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/25" />

      <div className="absolute inset-0 bg-linear-to-r from-black/25 via-transparent to-background/20" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-5 w-[78%] bg-linear-to-r from-black/85 via-black/55 to-transparent backdrop-blur-[2px]"
      />

      <div
        className={cn(
          "relative z-10 flex h-full min-h-inherit flex-col",
          variant === "page" &&
            "px-6 pb-8 pt-28 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12 lg:pt-32 xl:px-16",
          variant === "modal" && "px-10 py-12 xl:px-14",
          variant === "preview" && "px-10 py-12 xl:px-14",
        )}
      >
        <div className="flex items-center gap-4">
          <span className="text-[0.65rem] uppercase tracking-[0.28em] text-primary">
            {eyebrow}
          </span>
        </div>

        <div className="my-auto max-w-xl py-16 lg:py-12">
          <p className="-rotate-4 origin-left font-handwritten text-3xl leading-none text-primary/90 lg:text-3xl">
            {handwritten}
          </p>

          <h1 className="mt-7 font-heading text-5xl leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            {title}
          </h1>

          <div className="mt-8 h-px w-full max-w-sm bg-linear-to-r from-primary/80 to-white/10" />

          <p className="mt-7 max-w-md text-sm leading-7 text-white/72 md:text-base">
            {description}
          </p>
        </div>

        <div className="grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {reassuranceItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-white/75">
              <Icon className="size-5 shrink-0 text-primary" />

              <span className="text-xs leading-5">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
