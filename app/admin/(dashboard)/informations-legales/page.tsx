import { FileText } from "lucide-react";

import { LegalSettingsForm } from "@/components/features/legal/admin/legal-settings-form";
import { AdminPageHeader } from "@/components/layout/admin/admin-page-header";
import { getLegalSiteSettings } from "@/lib/legal/queries/get-legal-site-settings";

export default async function LegalSettingsPage() {
  const settings = await getLegalSiteSettings();

  return (
    <main className="px-6 py-10 md:px-8 lg:px-10">
      <AdminPageHeader
        icon={FileText}
        title="Informations légales"
        description="Renseignez les informations de votre société utilisées automatiquement dans les pages légales du site."
      />

      <LegalSettingsForm settings={settings} />
    </main>
  );
}
