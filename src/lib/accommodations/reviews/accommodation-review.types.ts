export type AccommodationReviewImportData = {
  importKey: string;
  authorName: string;
  rating: number;
  comment: string;
  reviewedAt: Date;
};

export type AccommodationReviewData = {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  reviewedAt: Date;
};
