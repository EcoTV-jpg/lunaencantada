import { AnalyticsListener } from "@/components/layout/AnalyticsListener";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyCta } from "@/components/layout/StickyCta";
import { Amenities } from "@/components/sections/Amenities";
import { Availability } from "@/components/sections/Availability";
import { BeachPool } from "@/components/sections/BeachPool";
import { Bedrooms } from "@/components/sections/Bedrooms";
import { CondoOverview } from "@/components/sections/CondoOverview";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Gallery } from "@/components/sections/Gallery";
import { GettingHere } from "@/components/sections/GettingHere";
import { Hero } from "@/components/sections/Hero";
import { HouseRules } from "@/components/sections/HouseRules";
import { Location } from "@/components/sections/Location";
import { Nearby } from "@/components/sections/Nearby";
import { PropertyFacts } from "@/components/sections/PropertyFacts";
import { Reviews } from "@/components/sections/Reviews";
import { property } from "@/data/property";
import { formatUsd, fromNightlyRate } from "@/lib/pricing";
import { buildStructuredData } from "@/lib/structured-data";

/** Regenerate daily so the seasonal "From" price and rate table stay current. */
export const revalidate = 86400;

export default function HomePage() {
  const jsonLd = buildStructuredData();
  const fromRate = fromNightlyRate();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />

        {/* Listing body: details on the left, booking card on the right (sticky on desktop). */}
        <div className="container-page mt-8 grid gap-x-16 md:mt-10 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <div className="min-w-0">
            <PropertyFacts />
            <CondoOverview />
            <Bedrooms />
            <Amenities />
            <BeachPool />
          </div>
          <div className="relative pb-12 lg:row-span-1 lg:pb-12">
            <Availability />
          </div>
        </div>

        <Gallery />
        <Location />
        <Nearby />
        <GettingHere />
        <Reviews />
        <Faq />
        <HouseRules />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta priceLabel={fromRate === null ? null : formatUsd(fromRate)} currency={property.pricing.currency} />
      <AnalyticsListener />
      <script
        type="application/ld+json"
        // JSON.stringify output with "<" escaped so it can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
