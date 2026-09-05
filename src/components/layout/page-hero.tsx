import Image from "next/image";

import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
  className?: string;
};

export const PageHero = ({ title, description, className }: PageHeroProps) => {
  return (
    <section
      className={cn(
        "relative flex min-h-75 items-center justify-center overflow-hidden border-b border-border/60 px-6 pb-10 pt-28 text-center md:min-h-85",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(194,136,66,0.10),transparent_55%)]" />

      <div className="relative mx-auto max-w-3xl">
        <h1 className="font-heading text-5xl leading-none tracking-[-0.03em] text-primary md:text-6xl">
          {title}
        </h1>

        <div
          aria-hidden="true"
          className="mx-auto mt-5 flex items-center justify-center gap-4"
        >
          <span className="h-px w-16 bg-primary/40" />

          <Image
            src="/logo-icon.svg"
            alt=""
            width={42}
            height={40}
            className="h-auto w-18 object-contain"
          />

          <span className="h-px w-16 bg-primary/40" />
        </div>

        {description ? (
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
};
