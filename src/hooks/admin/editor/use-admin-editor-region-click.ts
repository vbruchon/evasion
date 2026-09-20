"use client";

import { useCallback, type MouseEvent } from "react";

type AdminEditorRegionGuard<TRegion extends string> = (
  regionId: string,
) => regionId is TRegion;

type UseAdminEditorRegionClickOptions<
  TSection extends string,
  TRegion extends string,
> = {
  section: TSection;
  isRegion: AdminEditorRegionGuard<TRegion>;
  onSectionChange: (section: TSection) => void;
  onRegionChange: (region: TRegion) => void;
};

export const useAdminEditorRegionClick = <
  TSection extends string,
  TRegion extends string,
>({
  section,
  isRegion,
  onSectionChange,
  onRegionChange,
}: UseAdminEditorRegionClickOptions<TSection, TRegion>) =>
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
