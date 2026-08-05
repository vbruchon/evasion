import { SiteHeader } from "@/components/layout/site-header";

type WebsiteLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
