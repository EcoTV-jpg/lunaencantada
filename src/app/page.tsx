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
import { formatAmount } from "@/lib/format";
import { buildStructuredData } from "@/lib/structured-data";

export default function HomePage() {
  const jsonLd = buildStructuredData();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <PropertyFacts />
        <Gallery />
        <CondoOverview />
        <Bedrooms />
        <Amenities />
        <BeachPool />
        <Location />
        <Nearby />
        <GettingHere />
        <Availability />
        <Reviews />
        <Faq />
        <HouseRules />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta priceLabel={formatAmount(property.pricing.baseNightlyRate)} />
      <AnalyticsListener />
      <script
        type="application/ld+json"
        // JSON.stringify output with "<" escaped so it can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
