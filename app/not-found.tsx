import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteNotFound } from "@/components/layout/site-not-found";

export default function GlobalNotFound() {
  return (
    <>
      <SiteHeader />

      <SiteNotFound />

      <SiteFooter />
    </>
  );
}
