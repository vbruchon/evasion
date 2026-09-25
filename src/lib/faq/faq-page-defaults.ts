export const FAQ_PAGE_CONTENT_ID = "faq-page";

export const FAQ_PAGE_DEFAULT_HERO_IMAGE =
  "/images/pages/shared/evasion-page-hero.png";

export const FAQ_PAGE_DEFAULT_CTA_IMAGE =
  "/images/pages/shared/evasion-page-cta.png";

export const faqPageContentDefaults = {
  heroEyebrow: "Questions fréquentes",
  heroTitle: "Tout ce qu’il faut savoir avant votre Évasion.",
  heroDescription:
    "Retrouvez les réponses aux questions les plus fréquentes pour préparer votre séjour simplement et profiter pleinement de votre parenthèse.",
  heroHandwrittenFirstLine: "Toutes les réponses,",
  heroHandwrittenSecondLine: "simplement.",

  questionsEyebrow: "FAQ",
  questionsTitle: "Vos questions, nos réponses.",
  questionsDescription:
    "Réservation, disponibilités, localisation ou organisation du séjour : retrouvez ici les informations essentielles.",

  ctaEyebrow: "Besoin d’aide ?",
  ctaTitle: "Une question reste sans réponse ?",
  ctaDescription:
    "Contactez-nous et nous prendrons le temps de vous apporter les informations dont vous avez besoin.",
  ctaButtonLabel: "Nous contacter",
} as const;

export const faqPageItemsDefaults = [
  {
    question: "Comment réserver un logement ?",
    answer:
      "Depuis la page du logement, consultez les disponibilités puis utilisez le bouton de réservation pour poursuivre sur la plateforme indiquée.",
  },
  {
    question: "Comment consulter les disponibilités ?",
    answer:
      "Lorsqu’un calendrier est disponible, les dates déjà réservées sont indiquées directement sur la page du logement afin de vous aider à choisir votre séjour.",
  },
  {
    question: "L’adresse exacte du logement est-elle affichée sur le site ?",
    answer:
      "Non. Afin de préserver la tranquillité des lieux, seule une localisation approximative est présentée sur le site. Vous recevrez l'adresse exacte après votre réservation.",
  },
  {
    question: "Puis-je modifier ou annuler une réservation ?",
    answer:
      "Les conditions de modification et d’annulation dépendent de la plateforme utilisée pour effectuer la réservation. Consultez les conditions associées à votre réservation pour connaître les modalités applicables.",
  },
  {
    question: "Où puis-je trouver les équipements disponibles ?",
    answer:
      "Les principaux équipements et services proposés sont indiqués sur la page de chaque logement afin que vous puissiez préparer votre séjour avant de réserver.",
  },
  {
    question: "Je ne trouve pas la réponse à ma question, que faire ?",
    answer:
      "Vous pouvez nous contacter directement. Nous vous répondrons avec plaisir pour vous aider à préparer votre séjour.",
  },
] as const;
