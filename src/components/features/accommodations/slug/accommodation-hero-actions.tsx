import Link from "next/link";

import { cn } from "@/lib/utils";

type AccommodationHeroActionsProps = {
  hasGallery: boolean;
  disabled?: boolean;
};

export const AccommodationHeroActions = ({
  hasGallery,
  disabled = false,
}: AccommodationHeroActionsProps) => {
  return (
    <div
      className={cn(
        "mt-8 flex max-w-2xl flex-wrap gap-4 lg:mt-11",
        disabled && "pointer-events-none",
      )}
    >
      <Link
        href="/contact"
        className="inline-flex h-12 items-center justify-center gap-8 rounded-sm bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Nous contacter
        <span aria-hidden="true">→</span>
      </Link>

      {hasGallery ? (
        <Link
          href="#galerie"
          className="inline-flex h-12 items-center justify-center gap-8 rounded-sm border border-primary/60 bg-black/20 px-7 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-primary/10"
        >
          Voir la galerie
          <span aria-hidden="true">▧</span>
        </Link>
      ) : null}
    </div>
  );
};
