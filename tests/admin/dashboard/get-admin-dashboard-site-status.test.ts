import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const { getAccommodationAvailabilityMock } = vi.hoisted(() => ({
  getAccommodationAvailabilityMock: vi.fn(),
}));

vi.mock(
  "@/lib/accommodations/availability/get-accommodation-availability",
  () => ({
    getAccommodationAvailability: getAccommodationAvailabilityMock,
  }),
);

import { getAdminDashboardSiteStatus } from "@/lib/admin/dashboard/queries/get-admin-dashboard-site-status";
import { LEGAL_SITE_SETTINGS_ID } from "@/lib/legal/legal-site-defaults";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../../helpers/database";

const completeLegalSettings = {
  id: LEGAL_SITE_SETTINGS_ID,

  businessName: "Évasion SARL",
  legalForm: "SARL",
  capital: "10 000 €",

  registeredOfficeAddress: "1 rue de la Drôme, 26000 Valence",
  email: "contact@evasion.fr",
  phone: "04 00 00 00 00",

  siren: "123 456 789",
  siret: "123 456 789 00012",
  rcs: "RCS Romans-sur-Isère 123 456 789",
  rne: "123 456 789",
  vatNumber: "FR00123456789",

  publicationDirector: "Jean Dupont",

  hostName: "Vercel",
  hostCompany: "Vercel Inc.",
  hostAddress: "340 S Lemon Ave, Walnut, CA",
  hostPhone: "+1 559 288 7060",

  privacyEmail: "",
  contactDataRetentionPeriod: "12 mois",
};

const createLegalSettings = async (
  overrides: Partial<typeof completeLegalSettings> = {},
) =>
  prisma.legalSiteSettings.create({
    data: {
      ...completeLegalSettings,
      ...overrides,
    },
  });

type CreatePublishedAccommodationOptions = {
  name: string;
  position: number;
  availabilityCalendarUrl?: string | null;
  bookingUrl?: string | null;
  lastReviewsImportAt?: Date | null;
  withImage?: boolean;
  withReview?: boolean;
  withDraft?: boolean;
};

const createPublishedAccommodation = async ({
  name,
  position,
  availabilityCalendarUrl = `https://example.com/calendar-${position}.ics`,
  bookingUrl = `https://example.com/booking-${position}`,
  lastReviewsImportAt = new Date(),
  withImage = true,
  withReview = true,
  withDraft = false,
}: CreatePublishedAccommodationOptions) => {
  const accommodation = await createAccommodationFixture({
    name,
    status: "PUBLISHED",
    position,

    images: withImage
      ? [
          {
            url: `https://example.com/image-${position}.webp`,
            fileKey: `dashboard-image-${position}`,
            isCover: true,
          },
        ]
      : [],
  });

  await prisma.accommodation.update({
    where: {
      id: accommodation.id,
    },

    data: {
      availabilityCalendarUrl,
      bookingUrl,
      lastReviewsImportAt,
    },
  });

  if (withReview) {
    await prisma.accommodationReview.create({
      data: {
        accommodationId: accommodation.id,
        importKey: `dashboard-review-${accommodation.id}`,
        authorName: "Voyageur",
        rating: 5,
        comment: "Très beau séjour.",
        reviewedAt: new Date(),
      },
    });
  }

  if (withDraft) {
    await prisma.accommodationDraft.create({
      data: {
        accommodationId: accommodation.id,
        content: {
          name: `${name} modifié`,
        },
      },
    });
  }

  return accommodation;
};

describe("getAdminDashboardSiteStatus", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
    await prisma.legalSiteSettings.deleteMany();

    getAccommodationAvailabilityMock.mockReset();
    getAccommodationAvailabilityMock.mockResolvedValue([]);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns no issue for a fully configured site", async () => {
    await createLegalSettings();

    await createPublishedAccommodation({
      name: "Suite romantique",
      position: 1,
    });

    await createAccommodationFixture({
      name: "Ancienne archive",
      status: "ARCHIVED",
      position: 2,
    });

    const status = await getAdminDashboardSiteStatus();

    expect(status).toEqual({
      unpublishedAccommodations: [],
      accommodationsWithUnpublishedDraft: [],
      missingLegalInformation: [],
      missingCalendarAccommodations: [],
      failingCalendarAccommodations: [],
      missingBookingLinkAccommodations: [],
      invalidBookingLinkAccommodations: [],
      accommodationsWithoutReviews: [],
      publishedAccommodationsWithoutImages: [],
      staleReviewsImportAccommodations: [],
    });
  });

  it("detects every actionable accommodation issue", async () => {
    await createLegalSettings();

    const unpublished = await createAccommodationFixture({
      name: "Logement non publié",
      status: "DRAFT",
      position: 1,
    });

    const unpublishedDraft = await createPublishedAccommodation({
      name: "Modifications non publiées",
      position: 2,
      withDraft: true,
    });

    const missingCalendar = await createPublishedAccommodation({
      name: "Calendrier manquant",
      position: 3,
      availabilityCalendarUrl: null,
    });

    const failingCalendar = await createPublishedAccommodation({
      name: "Calendrier défaillant",
      position: 4,
      availabilityCalendarUrl: "https://example.com/failing-calendar.ics",
    });

    const missingBookingLink = await createPublishedAccommodation({
      name: "Lien manquant",
      position: 5,
      bookingUrl: null,
    });

    const invalidBookingLink = await createPublishedAccommodation({
      name: "Lien invalide",
      position: 6,
      bookingUrl: "ftp://example.com/reservation",
    });

    const withoutReviews = await createPublishedAccommodation({
      name: "Sans avis",
      position: 7,
      withReview: false,
      lastReviewsImportAt: null,
    });

    const withoutImages = await createPublishedAccommodation({
      name: "Sans image",
      position: 8,
      withImage: false,
    });

    const staleReviews = await createPublishedAccommodation({
      name: "Avis anciens",
      position: 9,
      lastReviewsImportAt: new Date("2020-01-01T00:00:00.000Z"),
    });

    getAccommodationAvailabilityMock.mockImplementation(
      async (calendarUrl: string) => {
        if (calendarUrl.includes("failing-calendar")) {
          throw new Error("Calendrier inaccessible");
        }

        return [];
      },
    );

    const status = await getAdminDashboardSiteStatus();

    expect(status.unpublishedAccommodations).toEqual([
      {
        id: unpublished.id,
        name: "Logement non publié",
      },
    ]);

    expect(status.accommodationsWithUnpublishedDraft).toEqual([
      {
        id: unpublishedDraft.id,
        name: "Modifications non publiées",
      },
    ]);

    expect(status.missingCalendarAccommodations).toEqual([
      {
        id: missingCalendar.id,
        name: "Calendrier manquant",
      },
    ]);

    expect(status.failingCalendarAccommodations).toEqual([
      {
        id: failingCalendar.id,
        name: "Calendrier défaillant",
      },
    ]);

    expect(status.missingBookingLinkAccommodations).toEqual([
      {
        id: missingBookingLink.id,
        name: "Lien manquant",
      },
    ]);

    expect(status.invalidBookingLinkAccommodations).toEqual([
      {
        id: invalidBookingLink.id,
        name: "Lien invalide",
      },
    ]);

    expect(status.accommodationsWithoutReviews).toEqual([
      {
        id: withoutReviews.id,
        name: "Sans avis",
      },
    ]);

    expect(status.publishedAccommodationsWithoutImages).toEqual([
      {
        id: withoutImages.id,
        name: "Sans image",
      },
    ]);

    expect(status.staleReviewsImportAccommodations).toEqual([
      {
        id: staleReviews.id,
        name: "Avis anciens",
      },
    ]);
  });

  it("treats whitespace-only calendar and booking URLs as missing", async () => {
    await createLegalSettings();

    const accommodation = await createPublishedAccommodation({
      name: "Logement incomplet",
      position: 1,
      availabilityCalendarUrl: "   ",
      bookingUrl: "   ",
    });

    const status = await getAdminDashboardSiteStatus();

    expect(status.missingCalendarAccommodations).toEqual([
      {
        id: accommodation.id,
        name: "Logement incomplet",
      },
    ]);

    expect(status.missingBookingLinkAccommodations).toEqual([
      {
        id: accommodation.id,
        name: "Logement incomplet",
      },
    ]);

    expect(status.invalidBookingLinkAccommodations).toEqual([]);
    expect(status.failingCalendarAccommodations).toEqual([]);

    expect(getAccommodationAvailabilityMock).not.toHaveBeenCalled();
  });

  it("detects missing legal information without requiring the privacy email", async () => {
    await createLegalSettings({
      siret: "   ",
      privacyEmail: "",
    });

    const status = await getAdminDashboardSiteStatus();

    expect(status.missingLegalInformation).toEqual([
      {
        id: "siret",
        label: "SIRET",
      },
    ]);
  });
});
