"use client";

import { useState } from "react";

import type { AccommodationWithImagesAndHighlights } from "@/lib/accommodations/accommodation-types";

import { HomePageAccommodationFeatured } from "./home-page-accommodation-featured";
import { HomePageAccommodationIntro } from "./home-page-accommodation-intro";
import { HomePageAccommodationThumbnails } from "./home-page-accommodation-thumbnails";

type HomePageAccommodationSelectorProps = {
  eyebrow: string;
  title: string;
  description: string;
  accommodations: AccommodationWithImagesAndHighlights[];
  activeEditorRegion?: "content";
};

export const HomePageAccommodationSelector = ({
  eyebrow,
  title,
  description,
  accommodations,
  activeEditorRegion,
}: HomePageAccommodationSelectorProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeAccommodation = accommodations[activeIndex];

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="grid items-stretch gap-x-10 lg:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.8fr)] xl:grid-cols-[minmax(420px,0.95fr)_minmax(0,1.75fr)] xl:gap-x-14">
        <HomePageAccommodationIntro
          eyebrow={eyebrow}
          title={title}
          description={description}
          activeEditorRegion={activeEditorRegion}
        />

        <HomePageAccommodationFeatured
          accommodation={activeAccommodation}
          index={activeIndex}
        />
      </div>

      <HomePageAccommodationThumbnails
        accommodations={accommodations}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
    </div>
  );
};
