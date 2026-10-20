/**
 * Guest reviews.
 *
 * Only add reviews that are real, attributable and approved for
 * publication (for example, exported from a booking platform with the
 * guest's consent). The Reviews section stays hidden while this list is
 * empty. Never add ratings or stars without a verified source.
 */
export interface GuestReview {
  id: string;
  /** As the guest chose to be named, e.g. "Laura, Toronto". */
  author: string;
  /** Month and year of the stay, ISO `YYYY-MM`. */
  stayed: string;
  quote: string;
  /** Where the review was originally published, e.g. "Airbnb". */
  source: string;
  sourceUrl?: string;
}

export const reviews: GuestReview[] = [];
