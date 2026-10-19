import { property } from "@/data/property";

const { capacity } = property;

const facts: { value: string; label: string; wide?: boolean }[] = [
  { value: "Beachfront", label: "Direct beach access", wide: true },
  { value: String(capacity.bedrooms), label: "Bedrooms" },
  { value: String(capacity.bathrooms), label: "Bathrooms" },
  { value: String(capacity.beds), label: "Beds" },
  { value: String(capacity.maxGuests), label: "Guests max." },
  { value: "Infinity", label: "Shared pool" },
  { value: "~1 min", label: "To Fifth Avenue" },
];

export function PropertyFacts() {
  return (
    <section aria-label="Property at a glance" className="border-y border-line bg-paper">
      <dl className="container-page grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className={`flex flex-col-reverse justify-end gap-1.5 border-line py-6 sm:py-8 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0 ${
              fact.wide ? "col-span-2 border-b sm:col-span-3 lg:col-span-1 lg:border-b-0" : ""
            }`}
          >
            <dt className="eyebrow text-stone">{fact.label}</dt>
            <dd className="font-serif text-[2.25rem] leading-none text-ink lg:text-[2.5rem]">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
