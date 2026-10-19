import { faq } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Native <details> accordion: keyboard and screen-reader friendly, no JavaScript. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Frequently Asked Questions" className="lg:col-span-4">
          <p>
            Something not covered here? Ask in your{" "}
            <a href="#availability" className="link-underline text-ink">
              availability inquiry
            </a>
            .
          </p>
        </SectionHeading>

        <div className="border-t border-line lg:col-span-8">
          {faq.map((item) => (
            <details key={item.question} className="faq-item group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-left">
                <h3 className="font-sans text-[1.0625rem] font-medium tracking-normal text-ink">{item.question}</h3>
                <span
                  aria-hidden="true"
                  className="relative size-3.5 shrink-0 text-teal before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:bg-current after:absolute after:top-0 after:left-1/2 after:h-full after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-[40rem] pb-6 text-stone">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
