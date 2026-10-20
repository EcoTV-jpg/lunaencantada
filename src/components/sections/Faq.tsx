import { getFaq } from "@/data/faq";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Native <details> accordion: keyboard and screen-reader friendly, no JavaScript. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-12 md:py-16">
      <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
        <SectionHeading id="faq-title" title="Frequently Asked Questions">
          <p>
            Something not covered here? Ask in your{" "}
            <a href="#availability" className="link-underline text-ink">
              availability inquiry
            </a>
            .
          </p>
        </SectionHeading>

        <div className="divide-y divide-line border-y border-line">
          {getFaq().map((item) => (
            <details key={item.question} className="faq-item group">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-4 text-left">
                <h3 className="text-base font-medium tracking-normal">{item.question}</h3>
                <Icon
                  name="chevronDown"
                  className="size-4 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="max-w-[40rem] pb-5 text-[0.9375rem] text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
