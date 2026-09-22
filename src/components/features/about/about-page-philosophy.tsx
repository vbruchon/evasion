import { BadgeCheck, Fingerprint, Heart, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { AboutPageSectionHeading } from "@/components/features/about/about-page-section-heading";
import { AboutPageContainer } from "@/components/features/about/about-page-container";
import { cn } from "@/lib/utils";

type AboutPagePhilosophyProps = {
  eyebrow: string;
  title: string;
  description: string;
  firstTitle: string;
  firstDescription: string;
  secondTitle: string;
  secondDescription: string;
  thirdTitle: string;
  thirdDescription: string;
  fourthTitle: string;
  fourthDescription: string;
};

export const AboutPagePhilosophy = ({
  eyebrow,
  title,
  description,
  firstTitle,
  firstDescription,
  secondTitle,
  secondDescription,
  thirdTitle,
  thirdDescription,
  fourthTitle,
  fourthDescription,
}: AboutPagePhilosophyProps) => {
  const principles = [
    {
      id: "identity",
      icon: Fingerprint,
      title: firstTitle,
      description: firstDescription,
    },
    {
      id: "intimacy",
      icon: Heart,
      title: secondTitle,
      description: secondDescription,
    },
    {
      id: "comfort",
      icon: Sparkles,
      title: thirdTitle,
      description: thirdDescription,
    },
    {
      id: "information",
      icon: BadgeCheck,
      title: fourthTitle,
      description: fourthDescription,
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <AboutPageContainer className="relative">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-x-20">
          <header className="lg:col-span-4">
            <AboutPageSectionHeading index="02" eyebrow={eyebrow} />

            <div className="lg:ml-8">
              <h2 className="mt-8 max-w-[12ch] font-heading text-4xl leading-[1.05] tracking-[-0.035em] text-foreground sm:mt-10 sm:text-5xl lg:max-w-[11ch] lg:text-[3.25rem]">
                {title}
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground sm:mt-7 sm:text-base sm:leading-7">
                {description}
              </p>

              <div className="mt-10 hidden items-center gap-4 lg:flex">
                <span className="h-px w-8 bg-primary/70" />

                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/90">
                  Chaque détail compte
                </span>
              </div>
            </div>
          </header>

          <div className="relative isolate lg:col-span-7 lg:col-start-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl sm:bg-primary/15 sm:blur-2xl"
            />

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {principles.map((principle, index) => {
                const Icon = principle.icon;

                return (
                  <Card
                    key={principle.id}
                    className={cn(
                      "rounded-none border-border/55 bg-card/65 py-0 shadow-none sm:bg-card/70",
                      index % 2 === 1 && "lg:translate-y-6",
                    )}
                  >
                    <CardContent className="flex h-full flex-col p-5 sm:p-7 lg:p-8">
                      <div className="flex items-center gap-4 sm:gap-5">
                        <div className="flex size-10 shrink-0 items-center justify-center border border-primary/30 bg-background/35 text-primary sm:size-11">
                          <Icon
                            aria-hidden="true"
                            className="size-4.5 sm:size-5"
                            strokeWidth={1.4}
                          />
                        </div>

                        <h3 className="font-heading text-xl leading-tight tracking-tight text-foreground sm:text-2xl lg:text-[1.7rem]">
                          {principle.title}
                        </h3>
                      </div>

                      <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground sm:mt-6">
                        {principle.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </AboutPageContainer>
    </section>
  );
};
