import { SiteHeader } from "@/components/layout/site-header";

type WebsiteLayoutProps = Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>;

export default function WebsiteLayout({ children, modal }: WebsiteLayoutProps) {
  return (
    <>
      <SiteHeader />

      {children}

      {modal}
    </>
  );
}
