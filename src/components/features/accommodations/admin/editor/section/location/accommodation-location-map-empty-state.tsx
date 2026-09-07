import { House } from "lucide-react";

type AccommodationLocationMapEmptyStateProps = {
  editorPreview: boolean;
};

export const AccommodationLocationMapEmptyState = ({
  editorPreview,
}: AccommodationLocationMapEmptyStateProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-full border border-border/60">
          <House className="size-5 text-primary/60" />
        </div>

        {editorPreview ? (
          <p className="mt-4 text-xs text-muted-foreground/50">
            Définissez une zone de localisation.
          </p>
        ) : null}
      </div>
    </div>
  );
};
