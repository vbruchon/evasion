import {
  ACCOMMODATION_HIGHLIGHT_ICON_MAP,
  DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON,
} from "@/lib/accommodations/accommodation-highlights";

export type AccommodationHighlightDisplay = {
  id?: string;
  title: string;
  description: string | null;
  icon: string | null;
};

type AccommodationHighlightsProps = {
  highlights: AccommodationHighlightDisplay[];
};

export const AccommodationHighlights = ({
  highlights,
}: AccommodationHighlightsProps) => {
  const DefaultIcon =
    ACCOMMODATION_HIGHLIGHT_ICON_MAP[DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-fr">
      {highlights.map((highlight, index) => {
        const Icon = highlight.icon
          ? (ACCOMMODATION_HIGHLIGHT_ICON_MAP[highlight.icon] ?? DefaultIcon)
          : DefaultIcon;

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
