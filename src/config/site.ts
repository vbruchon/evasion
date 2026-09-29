const primaryNavigation = [
  {
    label: "Nos logements",
    href: "/logements",
  },
  {
    label: "À propos",
    href: "/a-propos",
  },
  {
    label: "Avis",
    href: "/avis",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
] as const;

export const siteConfig = {
  name: "Évasion",
  description: "Des séjours d’exception, pensés pour deux.",

  navigation: primaryNavigation,

  footerNavigation: [
    {
      label: "Accueil",
      href: "/",
    },
    ...primaryNavigation,
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Mentions légales",
      href: "/mentions-legales",
    },
    {
      label: "Politique de confidentialité",
      href: "/politique-de-confidentialite",
    },
  ],
} as const;
