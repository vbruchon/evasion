"use client";

import { motion } from "motion/react";
import { useAccommodationAmenities } from "@/hooks/accommodations/detail/use-accommodation-amenities";
import { AccommodationAmenitiesCategories } from "./accommodation-amenities-categories";
import { AccommodationAmenitiesGrid } from "./accommodation-amenities-grid";
import { AccommodationAmenitiesToggle } from "./accommodation-amenities-toggle";
import type { AccommodationAmenityData } from "@/lib/accommodations/accommodation-amenities.types";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";

type AccommodationAmenitiesProps = {
  amenities: AccommodationAmenityData[];
  editorPreview?: boolean;
  animated?: boolean;
};

export const AccommodationAmenities = ({
  amenities,
  editorPreview = false,
  animated = false,
}: AccommodationAmenitiesProps) => {
  const {
    canExpand,
    categories,
    hasAmenities,
    showAll,
    total,
    visibleAmenities,
    handleToggleExpanded,
  } = useAccommodationAmenities({
    amenities,
    editorPreview,
  });

  const shouldAnimate = animated && !editorPreview;
  const mobileVisibleAmenities = showAll
    ? visibleAmenities
    : visibleAmenities.slice(0, 8);

  if (!hasAmenities && !editorPreview) {
    return null;
  }

  return (
    <SiteSection id="equipements" gutters spacing="compact">
      <SiteContainer>
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="section-eyebrow text-primary/85">Équipements</p>

          <h2 className="mt-2 font-heading text-3xl leading-tight tracking-[-0.02em] md:text-[2.5rem]">
            Ce que propose ce logement
          </h2>
        </motion.div>

        {hasAmenities ? (
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: 0.9,
              delay: shouldAnimate ? 0.08 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mt-8 md:hidden">
              <AccommodationAmenitiesGrid
                amenities={mobileVisibleAmenities}
                showDetails={showAll}
              />
            </div>

            <div className="mt-9 hidden md:block">
              <AccommodationAmenitiesCategories categories={categories} />
            </div>

            {!editorPreview && canExpand ? (
              <AccommodationAmenitiesToggle
                expanded={showAll}
                total={total}
                className="mt-6"
                onToggle={handleToggleExpanded}
              />
            ) : null}
          </motion.div>
        ) : (
          <div className="mt-8 flex min-h-32 items-center justify-center border border-dashed border-border/60 bg-card/20 px-6 text-center">
            <p className="max-w-sm text-sm leading-6 text-muted-foreground/60">
              Sélectionnez les équipements proposés dans ce logement.
            </p>
          </div>
        )}
      </SiteContainer>
    </SiteSection>
  );
};
