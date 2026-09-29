-- CreateTable
CREATE TABLE "legal_site_settings" (
    "id" TEXT NOT NULL,
    "businessName" TEXT,
    "legalForm" TEXT,
    "capital" TEXT,
    "registeredOfficeAddress" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "siren" TEXT,
    "siret" TEXT,
    "rcs" TEXT,
    "rne" TEXT,
    "vatNumber" TEXT,
    "publicationDirector" TEXT,
    "hostName" TEXT,
    "hostCompany" TEXT,
    "hostAddress" TEXT,
    "hostPhone" TEXT,
    "privacyEmail" TEXT,
    "contactDataRetentionPeriod" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "legal_site_settings_pkey" PRIMARY KEY ("id")
);
