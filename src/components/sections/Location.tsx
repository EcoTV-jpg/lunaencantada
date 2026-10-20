import { fullAddress, property } from "@/data/property";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveImage } from "@/lib/images";
import { MapEmbed } from "./MapEmbed";

export function Location() {
  const { address, location, coordinates } = property;
  const building = resolveImage("building");
  const mapsUrl = coordinates
    ? `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  const facts: { icon: IconName; label: string; value: string }[] = [
    { icon: "beach", label: "Beach", value: location.beach },
    { icon: "walk", label: "Fifth Avenue", value: location.fifthAvenue },
    { icon: "cart", label: "Nearest supermarket", value: location.supermarket },
    { icon: "bus", label: "Nearest bus terminal", value: location.busTerminal },
    { icon: "plane", label: location.airport.name, value: location.airport.distance },
  ];

  return (
    <section id="location" aria-labelledby="location-title" className="border-t border-line py-12 md:py-16">
      <div className="container-page">
        <SectionHeading id="location-title" title={`Stay in ${address.area}, ${address.city}`}>
          <p>On the beach in Centro, about a minute’s walk from Fifth Avenue, Playa del Carmen’s pedestrian street.</p>
        </SectionHeading>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <figure>
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
              <Photo image={building} sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
            <figcaption className="mt-2 text-sm text-muted">{building.caption}</figcaption>
          </figure>

          <div>
            <address className="not-italic">
              <span className="block text-base font-semibold">{property.name}</span>
              <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted">
                {address.street}, {address.area}
                <br />
                {address.postalCode} {address.city}, {address.state}
                <br />
                {address.country}
              </span>
            </address>
            <div className="mt-3">
              <MapEmbed coordinates={coordinates} mapsUrl={mapsUrl} label={fullAddress} />
            </div>

            <dl className="mt-6 space-y-5 border-t border-line pt-6">
              {facts.map((fact) => (
                <div key={fact.label} className="flex gap-4">
                  <Icon name={fact.icon} />
                  <div>
                    <dt className="text-[0.9375rem] font-semibold">{fact.label}</dt>
                    <dd className="text-[0.9375rem] text-muted">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
