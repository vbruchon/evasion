-- AlterTable
ALTER TABLE "accommodations" ADD COLUMN     "availabilityDescription" TEXT NOT NULL DEFAULT 'Consultez les prochaines disponibilités du logement et choisissez les dates qui vous conviennent.',
ADD COLUMN     "availabilityTitle" TEXT NOT NULL DEFAULT 'Planifiez votre séjour',
ADD COLUMN     "bookingButtonLabel" TEXT NOT NULL DEFAULT 'Continuer sur Airbnb';
