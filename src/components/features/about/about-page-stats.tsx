import { SiteContainer } from "@/components/layout/site-container";
import { AboutPageSectionHeading } from "@/components/features/about/about-page-section-heading";
import { SiteSection } from "@/components/layout/site-section";

type AboutPageStatsProps = {
  eyebrow: string;
  title: string;
  totalAccommodations: number;
  totalReviews: number;
  averageRating: number;
};

const numberFormatter = new Intl.NumberFormat("fr-FR");

const ratingFormatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const AboutPageStats = ({
  eyebrow,
  title,
  totalAccommodations,
  totalReviews,
  averageRating,
}: AboutPageStatsProps) => {
  const stats = [
    {
      id: "accommodations",
      value: numberFormatter.format(totalAccommodations),
      label: "Logements",
    },
    {
      id: "reviews",
      value: numberFormatter.format(totalReviews),
      label: "Avis partagés",
    },
    {
      id: "rating",
      value:
        totalReviews > 0 ? `${ratingFormatter.format(averageRating)}/5` : "—",
      label: "Note moyenne",
    },
  ];

  return (
    <SiteSection
      bordered={false}
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
    >
      <SiteContainer
        variant="inset"
        className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-20"
      >
        <header className="lg:col-span-4">
          <AboutPageSectionHeading index="03" eyebrow={eyebrow} />

          <div className="lg:ml-8">
            <h2 className="mt-7 max-w-[15ch] font-heading text-4xl leading-[1.08] tracking-[-0.03em] text-foreground lg:text-5xl">
              {title}
            </h2>
          </div>
        </header>

        <dl className="grid grid-cols-3 border-y border-border/50 bg-card/20 lg:col-span-7 lg:col-start-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 h-30 w-150 -translate-y-1/2 rounded-full bg-primary/5 blur-[130px]"
          />
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={[
                "flex min-h-32 min-w-0 flex-col justify-center px-2 py-6 text-center sm:min-h-40 sm:px-5 lg:min-h-44 lg:px-6 lg:text-left",
                index > 0 ? "border-l border-border/50" : "",
              ].join(" ")}
            >
              <dt className="order-2 mt-3 text-[0.5rem] leading-4 uppercase tracking-[0.14em] text-muted-foreground sm:mt-4 sm:text-[0.6rem] sm:tracking-[0.22em]">
                {stat.label}
              </dt>

              <dd className="order-1 whitespace-nowrap font-heading text-[2rem] leading-none tracking-[-0.045em] text-primary sm:text-5xl lg:text-6xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </SiteContainer>
    </SiteSection>
  );
};
