import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import type { AccommodationLocationData } from "@/lib/accommodations/accommodation-location.types";
import type { AccommodationLocationEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";

type AccommodationLocationContentProps = {
  accommodation: AccommodationLocationData;
  editorPreview: boolean;
  activeEditorRegion?: AccommodationLocationEditorSection;
};

export const AccommodationLocationContent = ({
  accommodation,
  editorPreview,
  activeEditorRegion,
}: AccommodationLocationContentProps) => {
  return (
    <AdminEditorRegion
      region="content"
      activeRegion={activeEditorRegion}
      className="flex flex-col justify-center xl:py-5"
    >
      <p className="section-eyebrow text-primary/85">Localisation & accès</p>

      {accommodation.locationTitle ? (
        <h2 className="mt-4 max-w-lg font-heading text-4xl leading-[1.03] tracking-[-0.035em] md:text-5xl xl:text-[3.4rem]">
          {accommodation.locationTitle}
        </h2>
      ) : editorPreview ? (
        <h2 className="mt-4 max-w-lg font-heading text-4xl leading-[1.03] tracking-[-0.035em] text-muted-foreground/35 md:text-5xl xl:text-[3.4rem]">
          Présentez la situation du logement
        </h2>
      ) : null}

      <div className="mt-7 h-px w-11 bg-primary" />

      {accommodation.locationDescription ? (
        <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground md:text-base">
          {accommodation.locationDescription}
        </p>
      ) : editorPreview ? (
        <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground/40 md:text-base">
          Ajoutez une courte description de l’environnement et de la situation
          du logement.
        </p>
      ) : null}
    </AdminEditorRegion>
  );
};
