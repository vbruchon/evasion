import Link from "next/link";

import { cn } from "@/lib/utils";

type ContactCtaProps = {
  text?: string;
  linkLabel?: string;
  href?: string;
  className?: string;
};

export const ContactCta = ({
  text = "Une question ou une demande particulière ?",
  linkLabel = "Contactez-nous",
  href = "/contact",
  className,
}: ContactCtaProps) => {
  return (
    <section
      className={cn(
        "border-t border-border/60 px-6 py-14 text-center md:px-12",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">{text}</p>

      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 text-primary underline-offset-4 transition-colors hover:underline"
      >
        {linkLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
};
