import { ContactModal } from "@/components/features/contact/contact-modal";
import { getContactPageAccommodations } from "@/lib/contact/queries/get-contact-page-accommodations";
import { getContactPageContent } from "@/lib/contact/queries/get-contact-page-content";

export const dynamic = "force-dynamic";

export default async function ContactModalPage() {
  const [content, accommodations] = await Promise.all([
    getContactPageContent(),
    getContactPageAccommodations(),
  ]);

  return <ContactModal content={content} accommodations={accommodations} />;
}
