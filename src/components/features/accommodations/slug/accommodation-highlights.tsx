import type { AccommodationHighlightDisplay } from "@/lib/accommodations/accommodation-types";
import {
  ACCOMMODATION_HIGHLIGHT_ICON_MAP,
  DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON,
} from "@/lib/accommodations/accommodation-highlights";
import { ACCOMMODATION_PREVIEW_PLACEHOLDERS } from "@/lib/accommodations/accommodation-preview-placeholders";

type AccommodationHighlightsProps = {
  highlights: AccommodationHighlightDisplay[];
  editorPreview?: boolean;
};

export const AccommodationHighlights = ({
  highlights,
  editorPreview = false,
}: AccommodationHighlightsProps) => {
  const DefaultIcon =
    ACCOMMODATION_HIGHLIGHT_ICON_MAP[DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON];

  if (highlights.length === 0 && editorPreview) {
    return (
      <div className="px-6 py-5 text-sm text-white/50">
        {ACCOMMODATION_PREVIEW_PLACEHOLDERS.hero.highlights}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-fr">
      {highlights.map((highlight, index) => {
        const Icon =
          ACCOMMODATION_HIGHLIGHT_ICON_MAP[highlight.icon] ?? DefaultIcon;

        return (
          <article
            key={highlight.id ?? `highlight-${index}`}
            className="flex min-w-0 items-center gap-4 border-b border-white/10 px-6 py-4 sm:border-r lg:border-b-0 lg:px-6"
          >
            <Icon className="size-6 shrink-0 text-primary" strokeWidth={1.4} />

            <div className="min-w-0">
              <h2 className="text-sm font-medium text-white">
                {highlight.title}
              </h2>

              {highlight.description ? (
                <p className="mt-1 text-xs text-white/55">
                  {highlight.description}
                </p>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
};
