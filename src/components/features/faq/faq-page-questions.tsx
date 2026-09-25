import Image from "next/image";

import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqPageQuestion = {
  itemId: string | null;
  question: string;
  answer: string;
};

type FaqPageQuestionsProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqPageQuestion[];
};

export const FaqPageQuestions = ({
  eyebrow,
  title,
  description,
  items,
}: FaqPageQuestionsProps) => (
  <SiteSection
    gutters
    className="relative overflow-hidden bg-background pb-20 pt-16 lg:pb-24 lg:pt-20"
  >
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 h-80 w-150 -translate-x-1/2 bg-[radial-gradient(circle,rgba(194,136,66,0.045),transparent_68%)]"
    />

    <SiteContainer className="relative">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-eyebrow text-primary/85">{eyebrow}</p>

        <div className="mx-auto mt-4 h-px w-8 bg-primary/80" />

        <h2 className="mt-6 font-heading text-4xl leading-[1.05] tracking-[-0.035em] md:text-5xl">
          {title}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
          {description}
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-5xl lg:mt-16">
        <Accordion
          defaultValue={items.length > 0 ? ["faq-0"] : []}
          className="border-t border-border/60"
        >
          {items.map((item, index) => {
            const value = `faq-${index}`;
            const number = String(index + 1).padStart(2, "0");

            return (
              <AccordionItem
                key={item.itemId ?? value}
                value={value}
                className="group/item relative border-b border-border/60"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-px origin-center scale-y-0 bg-primary transition-transform duration-300 group-has-aria-expanded/item:scale-y-100"
                />

                <AccordionTrigger className="group/trigger relative py-7 pl-5 pr-2 text-left hover:no-underline md:py-8 md:pl-7">
                  <span className="flex min-w-0 flex-1 items-start gap-5 md:gap-7">
                    <span className="mt-1 shrink-0 font-heading text-xs tracking-[0.12em] text-primary/45 transition-colors duration-300 group-hover/trigger:text-primary group-aria-expanded/trigger:text-primary">
                      {number}
                    </span>

                    <span className="font-heading text-xl leading-snug tracking-tight text-foreground transition-[color,transform] duration-300 group-hover/trigger:translate-x-1 group-hover/trigger:text-primary md:text-2xl">
                      {item.question}
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pb-7 pl-10 pr-4 md:pb-8 md:pl-19 md:pr-16">
                  <div className="max-w-2xl border-l border-primary/20 pl-4 text-sm leading-7 text-muted-foreground md:pl-6 md:text-base">
                    <p className="whitespace-pre-line">{item.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div
        aria-hidden
        className="mx-auto mt-16 flex max-w-5xl items-center justify-center gap-5"
      >
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-border" />

        <Image
          src="/logo-icon.svg"
          alt=""
          width={64}
          height={40}
          className="h-auto w-16 opacity-60"
        />

        <span className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
      </div>
    </SiteContainer>
  </SiteSection>
);
