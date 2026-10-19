import { fullAddress, property } from "@/data/property";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapEmbed } from "./MapEmbed";

export function Location() {
  const { address, location, coordinates } = property;
  const mapsUrl = coordinates
    ? `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  const facts = [
    { label: "Beach", value: location.beach },
    { label: "Fifth Avenue", value: location.fifthAvenue },
    { label: "Nearest supermarket", value: location.supermarket },
    { label: "Nearest bus terminal", value: location.busTerminal },
    { label: location.airport.name, value: location.airport.distance },
  ];

  return (
    <section id="location" aria-labelledby="location-title" className="bg-shell py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="location-title" eyebrow="Location" title={`Stay in ${address.area}, ${address.city}`}>
            <p>
              On the beach in Centro, about a minute’s walk from Fifth Avenue, Playa del Carmen’s pedestrian
              street.
            </p>
          </SectionHeading>

          <address className="mt-10 border-l-2 border-teal pl-5 not-italic leading-relaxed text-charcoal">
            <span className="block font-serif text-[1.375rem] text-ink">{property.name}</span>
            {address.street}
            <br />
            {address.area}
            <br />
            {address.postalCode} {address.city}
            <br />
            {address.state}
            <br />
            {address.country}
          </address>
        </div>

        <div className="lg:col-span-7">
          <MapEmbed coordinates={coordinates} mapsUrl={mapsUrl} label={fullAddress} />

          <dl className="mt-10 divide-y divide-line border-y border-line">
            {facts.map((fact) => (
              <div key={fact.label} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="text-sm text-stone">{fact.label}</dt>
                <dd className="text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
