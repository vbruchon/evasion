export const LEGAL_SITE_SETTINGS_ID = "legal-site";

export const LEGAL_PLACEHOLDER = "XXXX";

export const legalSiteSettingsDefaults = {
  businessName: "",
  legalForm: "SARL",
  capital: "",

  registeredOfficeAddress: "",
  email: "",
  phone: "",

  siren: "",
  siret: "",
  rcs: "",
  rne: "",
  vatNumber: "",

  publicationDirector: "",

  hostName: "",
  hostCompany: "",
  hostAddress: "",
  hostPhone: "",

  privacyEmail: "",
  contactDataRetentionPeriod: "",
} as const;

export const displayLegalValue = (value?: string | null) =>
  value?.trim() || LEGAL_PLACEHOLDER;
