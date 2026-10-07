import { AboutPageCta } from "@/components/features/about/about-page-cta";
import { AboutPageHero } from "@/components/features/about/about-page-hero";
import { AboutPagePhilosophy } from "@/components/features/about/about-page-philosophy";
import { AboutPageSpirit } from "@/components/features/about/about-page-spirit";
import { AboutPageStats } from "@/components/features/about/about-page-stats";
import { getAccommodationHeroImages } from "@/lib/accommodations/queries/get-accommodation-hero-images";
import {
  ABOUT_HERO_FALLBACK_IMAGES,
  ABOUT_PAGE_DEFAULT_SPIRIT_IMAGE,
} from "@/lib/about/about-page-defaults";
import { getAboutPageContent } from "@/lib/about/queries/get-about-page-content";
import { getAboutPageStats } from "@/lib/about/queries/get-about-page-stats";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "À propos",
  description:
    "Découvrez l’esprit Évasion et notre sélection d’hébergements singuliers, pensés pour ralentir, se retrouver et profiter d’un moment à deux.",
  path: "/a-propos",
});

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [content, stats, databaseHeroImages] = await Promise.all([
    getAboutPageContent(),
    getAboutPageStats(),
    getAccommodationHeroImages(),
  ]);

  const heroImages =
    databaseHeroImages.length > 0
      ? databaseHeroImages
      : ABOUT_HERO_FALLBACK_IMAGES;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AboutPageHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        description={content.heroDescription}
        buttonLabel={content.heroButtonLabel}
        images={heroImages}
        animated
      />

      <AboutPageSpirit
        eyebrow={content.spiritEyebrow}
        title={content.spiritTitle}
        firstParagraph={content.spiritFirstParagraph}
        secondParagraph={content.spiritSecondParagraph}
        handwritten={content.spiritHandwritten}
        imageUrl={content.spiritImageUrl ?? ABOUT_PAGE_DEFAULT_SPIRIT_IMAGE}
        animated
      />

      <AboutPagePhilosophy
        eyebrow={content.philosophyEyebrow}
        title={content.philosophyTitle}
        description={content.philosophyDescription}
        firstTitle={content.philosophyFirstTitle}
        firstDescription={content.philosophyFirstDescription}
        secondTitle={content.philosophySecondTitle}
        secondDescription={content.philosophySecondDescription}
        thirdTitle={content.philosophyThirdTitle}
        thirdDescription={content.philosophyThirdDescription}
        fourthTitle={content.philosophyFourthTitle}
        fourthDescription={content.philosophyFourthDescription}
        animated
      />

      <AboutPageStats
        eyebrow={content.statsEyebrow}
        title={content.statsTitle}
        totalAccommodations={stats.totalAccommodations}
        totalReviews={stats.totalReviews}
        averageRating={stats.averageRating}
        animated
      />

      <AboutPageCta
        eyebrow={content.ctaEyebrow}
        title={content.ctaTitle}
        description={content.ctaDescription}
        buttonLabel={content.ctaButtonLabel}
        imageUrl={content.ctaImageUrl}
        animated
      />
    </main>
  );
}
