import {
  CalendarDays,
  CalendarX,
  FileText,
  House,
  ImageOff,
  Link2,
  PencilLine,
  RefreshCw,
  Star,
  Unlink,
} from "lucide-react";

import type { AdminDashboardAttentionItemProps } from "@/components/features/admin/dashboard/site-status/admin-dashboard-attention-item";
import { REVIEWS_IMPORT_STALE_AFTER_DAYS } from "@/lib/admin/dashboard/admin-dashboard-site-status.constants";
import type { AdminDashboardSiteStatus } from "@/lib/admin/dashboard/queries/get-admin-dashboard-site-status";

type AccommodationDetailSource = {
  id: string;
  name: string;
};

const accommodationsAction = {
  label: "Voir tous les logements",
  href: "/admin/logements",
};

const getAccommodationDetails = (accommodations: AccommodationDetailSource[]) =>
  accommodations.map((accommodation) => ({
    id: accommodation.id,
    label: accommodation.name,
    href: `/admin/logements/${accommodation.id}/modifier`,
  }));

export const getAdminDashboardSiteStatusItems = (
  siteStatus: AdminDashboardSiteStatus,
): AdminDashboardAttentionItemProps[] => {
  const attentionItems: AdminDashboardAttentionItemProps[] = [];

  if (siteStatus.unpublishedAccommodations.length > 0) {
    const count = siteStatus.unpublishedAccommodations.length;

    attentionItems.push({
      icon: House,
      title: "Logements non publiés",
      value: count,
      description: `${count} logement${count > 1 ? "s" : ""} non publié${
        count > 1 ? "s" : ""
      }`,
      details: getAccommodationDetails(siteStatus.unpublishedAccommodations),
      action: accommodationsAction,
    });
  }

  if (siteStatus.accommodationsWithUnpublishedDraft.length > 0) {
    const count = siteStatus.accommodationsWithUnpublishedDraft.length;

    attentionItems.push({
      icon: PencilLine,
      title: "Modifications non publiées",
      value: count,
      description:
        count > 1
          ? `${count} logements avec des brouillons non publiés`
          : "1 logement avec un brouillon non publié",
      details: getAccommodationDetails(
        siteStatus.accommodationsWithUnpublishedDraft,
      ),
      action: accommodationsAction,
    });
  }

  if (siteStatus.missingLegalInformation.length > 0) {
    const count = siteStatus.missingLegalInformation.length;

    attentionItems.push({
      icon: FileText,
      title: "Informations légales",
      value: count,
      description: `${count} information${count > 1 ? "s" : ""} à compléter`,
      details: siteStatus.missingLegalInformation.map((information) => ({
        id: information.id,
        label: information.label,
      })),
      action: {
        label: "Compléter les informations légales",
        href: "/admin/informations-legales",
      },
    });
  }

  if (siteStatus.missingCalendarAccommodations.length > 0) {
    const count = siteStatus.missingCalendarAccommodations.length;

    attentionItems.push({
      icon: CalendarDays,
      title: "Calendriers",
      value: count,
      description: `${count} calendrier${count > 1 ? "s" : ""} à configurer`,
      details: getAccommodationDetails(
        siteStatus.missingCalendarAccommodations,
      ),
      action: accommodationsAction,
    });
  }

  if (siteStatus.missingBookingLinkAccommodations.length > 0) {
    const count = siteStatus.missingBookingLinkAccommodations.length;

    attentionItems.push({
      icon: Link2,
      title: "Liens de réservation",
      value: count,
      description: `${count} lien${count > 1 ? "s" : ""} à renseigner`,
      details: getAccommodationDetails(
        siteStatus.missingBookingLinkAccommodations,
      ),
      action: accommodationsAction,
    });
  }

  if (siteStatus.accommodationsWithoutReviews.length > 0) {
    const count = siteStatus.accommodationsWithoutReviews.length;

    attentionItems.push({
      icon: Star,
      title: "Avis voyageurs",
      value: count,
      description: `${count} logement${
        count > 1 ? "s" : ""
      } publié${count > 1 ? "s" : ""} sans avis`,
      details: getAccommodationDetails(siteStatus.accommodationsWithoutReviews),
    });
  }

  if (siteStatus.publishedAccommodationsWithoutImages.length > 0) {
    const count = siteStatus.publishedAccommodationsWithoutImages.length;

    attentionItems.push({
      icon: ImageOff,
      title: "Images manquantes",
      value: count,
      description: `${count} logement${
        count > 1 ? "s" : ""
      } publié${count > 1 ? "s" : ""} sans image`,
      details: getAccommodationDetails(
        siteStatus.publishedAccommodationsWithoutImages,
      ),
      action: accommodationsAction,
    });
  }

  if (siteStatus.staleReviewsImportAccommodations.length > 0) {
    const count = siteStatus.staleReviewsImportAccommodations.length;

    attentionItems.push({
      icon: RefreshCw,
      title: "Avis à actualiser",
      value: count,
      description: `${count} logement${
        count > 1 ? "s" : ""
      } sans import récent depuis plus de ${REVIEWS_IMPORT_STALE_AFTER_DAYS} jours`,
      details: getAccommodationDetails(
        siteStatus.staleReviewsImportAccommodations,
      ),
      action: accommodationsAction,
    });
  }

  if (siteStatus.invalidBookingLinkAccommodations.length > 0) {
    const count = siteStatus.invalidBookingLinkAccommodations.length;

    attentionItems.push({
      icon: Unlink,
      title: "Liens de réservation invalides",
      value: count,
      description: `${count} lien${
        count > 1 ? "s" : ""
      } de réservation invalide${count > 1 ? "s" : ""}`,
      details: getAccommodationDetails(
        siteStatus.invalidBookingLinkAccommodations,
      ),
      action: accommodationsAction,
    });
  }

  if (siteStatus.failingCalendarAccommodations.length > 0) {
    const count = siteStatus.failingCalendarAccommodations.length;

    attentionItems.push({
      icon: CalendarX,
      title: "Calendriers défaillants",
      value: count,
      description: `${count} calendrier${
        count > 1 ? "s" : ""
      } impossible${count > 1 ? "s" : ""} à récupérer`,
      details: getAccommodationDetails(
        siteStatus.failingCalendarAccommodations,
      ),
      action: accommodationsAction,
    });
  }

  return attentionItems;
};
