export const HOME_PAGE_CONTENT_ID = "home-page";

export const HOME_HERO_FALLBACK_IMAGES = [
  {
    src: "/images/pages/shared/evasion-page-hero.png",
    alt: "Hébergement Évasion",
  },
] as const;

export const HOME_PAGE_DEFAULT_ESCAPE_IMAGE =
  "/images/accommodations/cabane/presentation.webp";

export const HOME_PAGE_DEFAULT_CTA_IMAGE =
  "/images/pages/shared/evasion-page-cta.png";

export const homePageContentDefaults = {
  heroEyebrow: "Bienvenue chez Évasion",
  heroTitle: "Des lieux à part, pour s’évader à deux.",
  heroDescription:
    "Des hébergements singuliers entre Drôme et Vercors, pensés pour ralentir, se retrouver et profiter.",
  heroButtonLabel: "Découvrir nos logements",

  accommodationsEyebrow: "Nos logements",
  accommodationsTitle: "Choisissez votre parenthèse.",
  accommodationsDescription:
    "Des lieux singuliers, chacun avec son atmosphère, pour vivre votre Évasion à votre façon.",

  escapeEyebrow: "L’esprit Évasion",
  escapeTitle: "Le quotidien peut attendre.",
  escapeDescription:
    "Un lieu à part, du temps pour vous et rien d’autre à prévoir. Ici, chaque séjour est une invitation à ralentir et à profiter simplement.",
  escapeHandwritten: "Juste vous deux.",

  reviewsEyebrow: "Ils ont vécu Évasion",

  ctaEyebrow: "Votre prochaine parenthèse",
  ctaTitle: "Il ne reste plus qu’à choisir votre Évasion.",
  ctaDescription:
    "Découvrez nos différents hébergements et trouvez celui dans lequel vous aimeriez vous évader.",
  ctaButtonLabel: "Découvrir les logements",
} as const;
