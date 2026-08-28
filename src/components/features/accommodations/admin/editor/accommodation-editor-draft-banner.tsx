import { ExternalLink, FileClock } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type AccommodationEditorDraftBannerProps = {
  slug: string;
};

export const AccommodationEditorDraftBanner = ({
  slug,
}: AccommodationEditorDraftBannerProps) => {
  return (
    <div className="shrink-0 border-b border-primary/20 bg-primary/5 px-4 py-4 lg:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-primary/30 bg-background text-primary">
            <FileClock className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Brouillon non publié
            </p>

            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Vous modifiez une version enregistrée en brouillon. La version
              actuellement visible sur le site n&apos;est pas encore modifiée.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <Button
            nativeButton={false}
            type="button"
            variant="outline"
            render={<Link href={`/logements/${slug}`} target="_blank" />}
          >
            <ExternalLink />
            Voir la version publiée
          </Button>
        </div>
      </div>
    </div>
  );
};
