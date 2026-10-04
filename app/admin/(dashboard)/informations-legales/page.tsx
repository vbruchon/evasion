import { FileText } from "lucide-react";
import { Suspense } from "react";

import { LegalSettingsForm } from "@/components/features/legal/admin/legal-settings-form";
import { LegalSettingsFormSkeleton } from "@/components/features/legal/admin/legal-settings-form-skeleton";
import { AdminPageHeader } from "@/components/layout/admin/admin-page-header";
import { getLegalSiteSettings } from "@/lib/legal/queries/get-legal-site-settings";

const LegalSettingsContent = async () => {
  const settings = await getLegalSiteSettings();

  return <LegalSettingsForm settings={settings} />;
};

export default function LegalSettingsPage() {
  return (
    <main className="px-6 py-10 md:px-8 lg:px-10">
      <AdminPageHeader
        icon={FileText}
        title="Informations légales"
        description="Renseignez les informations de votre société utilisées automatiquement dans les pages légales du site."
      />

      <Suspense fallback={<LegalSettingsFormSkeleton />}>
        <LegalSettingsContent />
      </Suspense>
    </main>
  );
}
