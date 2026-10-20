import { reviews } from "@/data/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Renders only verified reviews from `src/data/reviews.ts`. With no
 * reviews the section is omitted from production entirely; in development
 * a labelled placeholder shows where it will sit.
 */
export function Reviews() {
  if (reviews.length === 0) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <section aria-label="Reviews placeholder (development only)" className="border-t border-dashed border-teal/50 py-12">
        <div className="container-page text-sm text-muted">
          <p className="font-semibold text-teal">Development only</p>
          <p className="mt-3 max-w-[40rem]">
            Guest reviews appear here once verified reviews are added to <code>src/data/reviews.ts</code>. This block
            is not rendered in production.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="reviews-title" className="border-t border-line py-12 md:py-16">
      <div className="container-page">
        <SectionHeading id="reviews-title" title="From Our Guests" />
        <div className="mt-6 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {reviews.map((review) => (
            <figure key={review.id}>
              <blockquote className="text-base leading-relaxed text-ink">
                <p>“{review.quote}”</p>
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted">
                {review.author} · Stayed{" "}
                {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(
                  new Date(`${review.stayed}-01T00:00:00Z`),
                )}{" "}
                ·{" "}
                {review.sourceUrl ? (
                  <a href={review.sourceUrl} className="link-underline" rel="noopener noreferrer" target="_blank">
                    via {review.source}
                  </a>
                ) : (
                  <>via {review.source}</>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
