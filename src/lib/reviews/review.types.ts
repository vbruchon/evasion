export type ReviewWithAccommodation = {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  reviewedAt: string;

  accommodation: {
    name: string;
    slug: string;
  };
};
