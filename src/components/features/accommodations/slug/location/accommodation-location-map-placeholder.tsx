import { House } from "lucide-react";

import { cn } from "@/lib/utils";

type AccommodationLocationMapPlaceholderProps = {
  editorPreview: boolean;
  active?: boolean;
};

export const AccommodationLocationMapPlaceholder = ({
  editorPreview,
  active = false,
}: AccommodationLocationMapPlaceholderProps) => {
  return (
    <div
      data-editor-region={editorPreview ? "map" : undefined}
      className={cn(
        "relative min-h-90 overflow-hidden bg-muted/15 xl:min-h-115",

        editorPreview &&
          "cursor-pointer transition-shadow hover:ring-1 hover:ring-inset hover:ring-primary/60",

        editorPreview && active && "ring-1 ring-inset ring-primary",
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/45" />

        <div className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-2xl" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background shadow-lg">
        <House className="size-5 text-primary" />
      </div>

      {editorPreview ? (
        <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-muted-foreground/40">
          Aperçu de la carte
        </p>
      ) : null}
    </div>
  );
};
