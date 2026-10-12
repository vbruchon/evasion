import * as motion from "motion/react-client";

import { AboutPageSectionHeading } from "@/components/features/about/about-page-section-heading";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";

type AboutPageStatsProps = {
  eyebrow: string;
  title: string;
  totalAccommodations: number;
  totalReviews: number;
  averageRating: number;
  animated?: boolean;
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
  animated = false,
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
        className="relative grid gap-10 xl:grid-cols-12 xl:items-center xl:gap-x-20"
      >
        <motion.header
          initial={animated ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="xl:col-span-4"
        >
          <AboutPageSectionHeading index="03" eyebrow={eyebrow} />

          <div className="xl:ml-8">
            <h2 className="mt-7 max-w-[15ch] font-heading text-4xl leading-[1.08] tracking-[-0.03em] text-foreground lg:text-5xl">
              {title}
            </h2>
          </div>
        </motion.header>

        <dl className="relative grid grid-cols-3 border-y border-border/50 bg-card/20 xl:col-span-7 xl:col-start-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 h-30 w-150 -translate-y-1/2 rounded-full bg-primary/5 blur-[130px]"
          />

          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={[
                "flex min-h-32 min-w-0 flex-col justify-center px-2 py-6 text-center sm:min-h-40 sm:px-5 xl:min-h-44 xl:px-6 xl:text-left",
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
