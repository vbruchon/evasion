export const LEGAL_SITE_SETTINGS_ID = "legal-site";

export const LEGAL_PLACEHOLDER = "XXXX";

export const legalSiteSettingsDefaults = {
  businessName: "Évasion — site de démonstration",
  legalForm: "SAS fictive",
  capital: "10 000 € — donnée fictive",

  registeredOfficeAddress: "Adresse fictive — 26000 Valence, France",
  email: "contact@evasion.example",
  phone: "00 00 00 00 00",

  siren: "000 000 000 — fictif",
  siret: "000 000 000 00000 — fictif",
  rcs: "RCS de démonstration",
  rne: "RNE de démonstration",
  vatNumber: "FR00 000000000 — fictif",

  publicationDirector: "Équipe Évasion — démonstration",

  hostName: "Hébergement de démonstration",
  hostCompany: "Configuration à remplacer en production",
  hostAddress: "Informations fictives — site de démonstration",
  hostPhone: "Non applicable — démonstration",

  privacyEmail: "privacy@evasion.example",
  contactDataRetentionPeriod: "12 mois",
} as const;

export const displayLegalValue = (value?: string | null) =>
  value?.trim() || LEGAL_PLACEHOLDER;
