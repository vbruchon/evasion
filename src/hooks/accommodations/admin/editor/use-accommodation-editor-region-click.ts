"use client";

import { useCallback, type MouseEvent } from "react";

import type { AccommodationEditorSection } from "@/lib/admin/accommodation/editor-sections";

type AccommodationEditorRegionGuard<TRegion extends string> = (
  regionId: string,
) => regionId is TRegion;

type UseAccommodationEditorRegionClickOptions<TRegion extends string> = {
  section: AccommodationEditorSection;
  isRegion: AccommodationEditorRegionGuard<TRegion>;
  onSectionChange: (section: AccommodationEditorSection) => void;
  onRegionChange: (region: TRegion) => void;
};

export const useAccommodationEditorRegionClick = <TRegion extends string>({
  section,
  isRegion,
  onSectionChange,
  onRegionChange,
}: UseAccommodationEditorRegionClickOptions<TRegion>) =>
  useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const region = target.closest<HTMLElement>("[data-editor-region]");
      const regionId = region?.dataset.editorRegion;

      if (!regionId || !isRegion(regionId)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      onRegionChange(regionId);
      onSectionChange(section);
    },
    [isRegion, onRegionChange, onSectionChange, section],
  );
