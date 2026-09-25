"use client";

import { Check, House } from "lucide-react";
import Image from "next/image";

import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";
import { cn } from "@/lib/utils";

type ContactAccommodationCardProps = {
  accommodation: ContactPageAccommodation;
  selected: boolean;
  onSelect: (element: HTMLButtonElement) => void;
};

export const ContactAccommodationCard = ({
  accommodation,
  selected,
  onSelect,
}: ContactAccommodationCardProps) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={(event) => onSelect(event.currentTarget)}
    className="group w-44 shrink-0 snap-start cursor-pointer text-left sm:w-48"
  >
    <div
      className={cn(
        "relative aspect-[1.35/1] overflow-hidden border transition-all duration-300",
        selected
          ? "border-primary/80 shadow-[0_0_0_1px_rgba(194,136,66,0.12)]"
          : "border-border/55 group-hover:border-primary/45",
      )}
    >
      {accommodation.imageUrl ? (
        <Image
          src={accommodation.imageUrl}
          alt=""
          fill
          sizes="192px"
          className={cn(
            "object-cover brightness-[0.78] saturate-[0.9] transition-all duration-700 ease-out",
            selected
              ? "scale-[1.025] brightness-[0.9] saturate-100"
              : "group-hover:scale-[1.045] group-hover:brightness-[0.84]",
          )}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-muted">
          <House className="size-6 text-muted-foreground" />
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/15" />

      <div
        className={cn(
          "absolute inset-0 bg-primary/0 transition-colors duration-300",
          selected && "bg-primary/4",
        )}
      />

      {selected ? (
        <div className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full border border-primary/60 bg-background/75 backdrop-blur-sm">
          <Check className="size-3.5 text-primary" />
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 px-3.5 pb-3 pt-10">
        <p className="truncate font-heading text-base text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {accommodation.name}
        </p>
      </div>
    </div>
  </button>
);
