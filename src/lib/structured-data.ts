import "server-only";

import { property } from "@/data/property";
import { siteConfig } from "@/data/site";
import { propertyImages } from "@/data/images";
import { resolveImage } from "@/lib/images";

/**
 * JSON-LD built only from the truth registry and only from facts that are
 * visible on the page. No ratings, reviews or offers.
 *
 * The listing is described as an `Apartment` until the requirements for
 * Google's `VacationRental` markup are met (verified coordinates and at
 * least 8 real photos). Then it switches automatically.
 */
export function buildStructuredData() {
  const url = `${siteConfig.url}/`;
  const placeId = `${url}#accommodation`;
  const { capacity, address, coordinates, stay } = property;

  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: address.street,
    addressLocality: address.city,
    addressRegion: address.state,
    postalCode: address.postalCode,
    addressCountry: address.countryCode,
  };

  const amenityFeature = property.amenityGroups
    .flatMap((g) => g.items)
    .map((item) => ({ "@type": "LocationFeatureSpecification", name: item.label, value: true }));

  const realImages = propertyImages.map((img) => resolveImage(img.id)).filter((img) => img.available);
  const imageUrls = realImages.map((img) => `${siteConfig.url}${img.src}`);
  const vacationRentalReady = coordinates !== null && realImages.length >= 8;

  const accommodation = {
    "@type": "Apartment",
    "@id": placeId,
    name: property.name,
    description: siteConfig.description,
    url,
    address: postalAddress,
    numberOfRooms: capacity.bedrooms,
    numberOfBedrooms: capacity.bedrooms,
    numberOfBathroomsTotal: capacity.bathrooms,
    occupancy: { "@type": "QuantitativeValue", maxValue: capacity.maxGuests },
    bed: [
      { "@type": "BedDetails", typeOfBed: "King", numberOfBeds: 1 },
      { "@type": "BedDetails", typeOfBed: "Queen", numberOfBeds: 2 },
    ],
    petsAllowed: stay.petsAllowed,
    amenityFeature,
    ...(imageUrls.length > 0 ? { image: imageUrls } : {}),
  };


  const entity = vacationRentalReady
    ? {
        "@type": "VacationRental",
        "@id": `${url}#rental`,
        name: property.name,
        identifier: property.id,
        url,
        address: postalAddress,
        latitude: coordinates!.lat,
        longitude: coordinates!.lng,
        checkinTime: stay.checkInTime,
        checkoutTime: stay.checkOutTime,
        image: imageUrls,
        containsPlace: accommodation,
      }
    : accommodation;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: property.name,
        inLanguage: siteConfig.language,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": `${url}#website` },
        about: { "@id": vacationRentalReady ? `${url}#rental` : placeId },
      },
      entity,
    ],
  };
}

