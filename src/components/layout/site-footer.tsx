import Link from "next/link";

import { siteConfig } from "@/config/site";

import { PageLinkButton } from "./page-link-button";
import { SiteContainer } from "./site-container";
import { SiteLogo } from "./site-logo";

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card/30">
      <SiteContainer
        variant="inset"
        className="pt-10 pb-5 sm:pt-12 sm:pb-6 lg:pt-14 lg:pb-7 xl:pb-4"
      >
        <div className="grid gap-10 md:grid-cols-[1fr_0.85fr_1.1fr] md:items-start md:gap-8 lg:grid-cols-[1.05fr_0.8fr_1fr] lg:gap-12">
          <div>
            <SiteLogo isScrolled />

            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              Des lieux singuliers entre Drôme et Vercors, pensés pour ralentir
              et se retrouver à deux.
            </p>
          </div>

          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-primary">
              Navigation
            </p>

            <nav
              aria-label="Navigation du pied de page"
              className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1 lg:grid-cols-2 lg:gap-x-8"
            >
              {siteConfig.footerNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-primary">
              Une question ?
            </p>

            <h2 className="mt-4 max-w-sm font-heading text-2xl leading-tight tracking-[-0.03em]">
              Préparons votre prochaine parenthèse.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Une question sur un logement ou votre séjour ? Nous sommes là pour
              vous répondre.
            </p>

            <PageLinkButton
              href="/contact"
              variant="button"
              className="mt-5 max-sm:w-full"
            >
              Nous contacter
            </PageLinkButton>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-border/60 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:mt-8 lg:mt-10">
          <p>
            © {currentYear} {siteConfig.name}. Tous droits réservés.
          </p>

          <p>Drôme & Vercors · Séjours à deux</p>
        </div>
      </SiteContainer>
    </footer>
  );
};
