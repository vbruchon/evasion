/*
  Warnings:

  - Added the required column `accommodationLabel` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accommodationSubjectDescription` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accommodationSubjectTitle` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailLabel` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailPlaceholder` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstNameLabel` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstNamePlaceholder` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageLabel` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messagePlaceholder` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherSubjectDescription` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherSubjectTitle` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reassuranceFirstLabel` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reassuranceSecondLabel` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reassuranceThirdLabel` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `successResetLabel` to the `contact_page_content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact_page_content"
ADD COLUMN "reassuranceFirstLabel" TEXT NOT NULL DEFAULT 'Réponse rapide',
ADD COLUMN "reassuranceSecondLabel" TEXT NOT NULL DEFAULT 'Un contact humain',
ADD COLUMN "reassuranceThirdLabel" TEXT NOT NULL DEFAULT 'Un séjour en toute sérénité',

ADD COLUMN "accommodationSubjectTitle" TEXT NOT NULL DEFAULT 'Un logement',
ADD COLUMN "accommodationSubjectDescription" TEXT NOT NULL DEFAULT 'Une question avant une réservation',

ADD COLUMN "otherSubjectTitle" TEXT NOT NULL DEFAULT 'Autre demande',
ADD COLUMN "otherSubjectDescription" TEXT NOT NULL DEFAULT 'Pour toute autre question',

ADD COLUMN "accommodationLabel" TEXT NOT NULL DEFAULT 'Quel logement ?',

ADD COLUMN "firstNameLabel" TEXT NOT NULL DEFAULT 'Prénom',
ADD COLUMN "firstNamePlaceholder" TEXT NOT NULL DEFAULT 'Ex. : Jean',

ADD COLUMN "emailLabel" TEXT NOT NULL DEFAULT 'E-mail',
ADD COLUMN "emailPlaceholder" TEXT NOT NULL DEFAULT 'Ex. : exemple@email.fr',

ADD COLUMN "messageLabel" TEXT NOT NULL DEFAULT 'Comment pouvons-nous vous aider ?',
ADD COLUMN "messagePlaceholder" TEXT NOT NULL DEFAULT 'Posez votre question, nous vous répondrons rapidement...',

ADD COLUMN "successResetLabel" TEXT NOT NULL DEFAULT 'Envoyer un autre message';

ALTER TABLE "contact_page_content"
ALTER COLUMN "reassuranceFirstLabel" DROP DEFAULT,
ALTER COLUMN "reassuranceSecondLabel" DROP DEFAULT,
ALTER COLUMN "reassuranceThirdLabel" DROP DEFAULT,
ALTER COLUMN "accommodationSubjectTitle" DROP DEFAULT,
ALTER COLUMN "accommodationSubjectDescription" DROP DEFAULT,
ALTER COLUMN "otherSubjectTitle" DROP DEFAULT,
ALTER COLUMN "otherSubjectDescription" DROP DEFAULT,
ALTER COLUMN "accommodationLabel" DROP DEFAULT,
ALTER COLUMN "firstNameLabel" DROP DEFAULT,
ALTER COLUMN "firstNamePlaceholder" DROP DEFAULT,
ALTER COLUMN "emailLabel" DROP DEFAULT,
ALTER COLUMN "emailPlaceholder" DROP DEFAULT,
ALTER COLUMN "messageLabel" DROP DEFAULT,
ALTER COLUMN "messagePlaceholder" DROP DEFAULT,
ALTER COLUMN "successResetLabel" DROP DEFAULT;