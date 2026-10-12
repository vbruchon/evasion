import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";

type WebsiteLayoutProps = Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>;

export default function WebsiteLayout({ children, modal }: WebsiteLayoutProps) {
  return (
    <>
      <SkipLink />

      <SiteHeader />

      <div id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </div>

      <SiteFooter />

      {modal}
    </>
  );
}
