"use client";

import { ExternalLink, FileClock, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type AccommodationEditorDraftBannerProps = {
  slug: string;
  disabled: boolean;
  isDiscarding: boolean;
  onDiscard: () => void;
};

export const AccommodationEditorDraftBanner = ({
  slug,
  disabled,
  isDiscarding,
  onDiscard,
}: AccommodationEditorDraftBannerProps) => {
  const [isConfirmingDiscard, setIsConfirmingDiscard] = useState(false);

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

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button
            nativeButton={false}
            type="button"
            variant="outline"
            render={<Link href={`/logements/${slug}`} target="_blank" />}
          >
            <ExternalLink />
            Voir la version publiée
          </Button>

          {!isConfirmingDiscard ? (
            <Button
              type="button"
              variant="outline"
              className="text-destructive hover:text-destructive"
              disabled={disabled}
              onClick={() => setIsConfirmingDiscard(true)}
            >
              <Trash2 />
              Abandonner le brouillon
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="ghost"
                disabled={disabled}
                onClick={() => setIsConfirmingDiscard(false)}
              >
                Conserver le brouillon
              </Button>

              <Button
                type="button"
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-destructive/5 hover:text-destructive"
                disabled={disabled}
                onClick={onDiscard}
              >
                <Trash2 />
                {isDiscarding ? "Suppression..." : "Confirmer l’abandon"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
