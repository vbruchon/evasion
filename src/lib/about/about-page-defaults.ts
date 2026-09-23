import { AboutHeroImage } from "./about-page.types";

export const ABOUT_PAGE_CONTENT_ID = "about-page";

export const ABOUT_HERO_FALLBACK_IMAGES: AboutHeroImage[] = [
  {
    src: "/images/pages/reviews/evasion-page-avis-hero.png",
    alt: "Une parenthèse romantique dans un hébergement Évasion",
    objectPosition: "center",
  },
];

export const ABOUT_PAGE_DEFAULT_SPIRIT_IMAGE =
  "/images/accommodations/nature/gallery-01.png";

export const ABOUT_PAGE_DEFAULT_CTA_IMAGE =
  "/images/pages/reviews/evasion-page-avis-cta.png";

export const aboutPageContentDefaults = {
  heroEyebrow: "À propos",
  heroTitle: "Des lieux à part, pour des moments qui comptent.",
  heroDescription:
    "Évasion réunit des hébergements pensés pour ralentir, se retrouver et profiter d’une parenthèse loin du quotidien.",
  heroButtonLabel: "Découvrir nos logements",

  spiritEyebrow: "L’esprit Évasion",
  spiritTitle: "Changer de décor. Ralentir. Se retrouver.",
  spiritFirstParagraph:
    "Les hébergements réunis sous Évasion partagent une même intention : proposer bien plus qu’un endroit où dormir. Chacun possède une atmosphère, un cadre ou un détail qui rend le moment différent.",
  spiritSecondParagraph:
    "À travers des lieux singuliers et soigneusement préparés, Évasion vous invite à laisser le quotidien de côté et à vivre un moment à deux, au plus près de l’essentiel.",
  spiritHandwritten: "Prendre le temps, simplement.",

  philosophyEyebrow: "Notre philosophie",
  philosophyTitle: "Une expérience pensée dans les détails.",
  philosophyDescription:
    "Du choix des lieux aux informations données avant votre arrivée, chaque élément participe à une parenthèse simple, confortable et mémorable.",

  philosophyFirstTitle: "Des lieux avec une identité",
  philosophyFirstDescription:
    "Chaque hébergement possède une atmosphère et des caractéristiques qui le rendent véritablement différent.",

  philosophySecondTitle: "Une intimité préservée",
  philosophySecondDescription:
    "Des espaces confidentiels, pensés pour se retrouver à deux et profiter du moment à son propre rythme.",

  philosophyThirdTitle: "Le confort essentiel",
  philosophyThirdDescription:
    "Des équipements choisis avec attention et des espaces préparés pour que vous puissiez simplement profiter.",

  philosophyFourthTitle: "Une information claire",
  philosophyFourthDescription:
    "Des présentations précises pour choisir votre logement et préparer votre parenthèse en toute confiance.",

  statsEyebrow: "Évasion en quelques chiffres",
  statsTitle: "Des parenthèses vécues et partagées.",

  ctaEyebrow: "Votre prochaine parenthèse",
  ctaTitle: "Et si la prochaine Évasion était la vôtre ?",
  ctaDescription:
    "Découvrez nos logements et choisissez le décor de votre prochaine parenthèse à deux.",
  ctaButtonLabel: "Découvrir les logements",
} as const;
