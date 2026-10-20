import { numberWord } from "@/lib/format";
import {
  formatLongDate,
  formatSeasonRange,
  formatUsd,
  ratesOnRequestFrom,
  taxLabel,
  upcomingSeasons,
} from "@/lib/pricing";
import { property } from "./property";

export interface FaqItem {
  question: string;
  answer: string;
}

const { capacity, stay, pricing, name } = property;
const kingBeds = property.bedrooms.filter((b) => b.bed === "King bed").length;
const queenBeds = property.bedrooms.filter((b) => b.bed === "Queen bed").length;

/**
 * Answers are derived from the truth registry so they can never drift.
 * A function (not a constant) so seasonal answers are recomputed whenever
 * the page regenerates.
 */
export function getFaq(): FaqItem[] {
  const seasons = upcomingSeasons();
  const onRequest = `From ${formatLongDate(ratesOnRequestFrom())}, rates are on request.`;

  return [
    {
      question: `How many guests can ${name} accommodate?`,
      answer: `Up to ${capacity.maxGuests} guests, ${capacity.occupancyNote}.`,
    },
    {
      question: "How many bedrooms are there?",
      answer: `${capacity.bedrooms} bedrooms, and ${capacity.bathrooms} bathrooms.`,
    },
    {
      question: "What beds are available?",
      answer: `${numberWord(kingBeds).replace(/^./, (c) => c.toUpperCase())} King bed and ${numberWord(queenBeds)} Queen beds — one bed in each bedroom.`,
    },
    {
      question: `Is ${name} beachfront?`,
      answer: "Yes. The condominium is beachfront and offers direct beach access.",
    },
    {
      question: "Does the property have a pool?",
      answer: "Yes. Guests have access to the condominium’s shared infinity pool.",
    },
    {
      question: "Is the pool private?",
      answer: "No. The infinity pool is shared by the condominium.",
    },
    {
      question: "How close is Fifth Avenue?",
      answer: "Approximately 1 minute on foot.",
    },
    {
      question: "Is parking available?",
      answer: "Yes. There is a free parking garage on the premises, and paid parking nearby.",
    },
    {
      question: "Is Wi-Fi available?",
      answer: "Yes. The condo has Wi-Fi and air conditioning.",
    },
    {
      question: "Is there an elevator?",
      answer: "Yes. The elevator may occasionally be unavailable during maintenance.",
    },
    {
      question: "What time is check-in?",
      answer: stay.checkIn + ".",
    },
    {
      question: "What time is check-out?",
      answer: stay.checkOut + ".",
    },
    {
      question: "Are pets allowed?",
      answer: stay.petsAllowed ? "Yes." : "No. Pets are not allowed.",
    },
    {
      question: "Are children allowed?",
      answer: capacity.childrenAllowed
        ? `Yes. Children are welcome. The maximum of ${capacity.maxGuests} guests includes children under 12 and babies.`
        : "No.",
    },
    {
      question: "Is smoking allowed?",
      answer:
        "No. Smoking, vaping and e-cigarettes are not allowed in the condo or the common areas, to avoid extra charges.",
    },
    {
      question: "Are parties or events allowed?",
      answer: stay.eventsAllowed ? "Yes." : "No. Parties and events are not allowed.",
    },
    {
      question: "Are there quiet hours?",
      answer: `Yes, from ${stay.quietHours.replace(" – ", " to ")}.`,
    },
    {
      question: "Is there a minimum stay?",
      answer: seasons.length
        ? `Yes, depending on the season: ${seasons
            .map((s) => `${s.minNights} nights (${formatSeasonRange(s)})`)
            .join(", ")}. Long-term stays are welcome.`
        : "Long-term stays are welcome. Minimum stays are confirmed on request.",
    },
    {
      question: "What is the nightly rate?",
      answer: seasons.length
        ? `Rates vary by season: ${seasons
            .map((s) => `${formatUsd(s.nightly)} per night (${formatSeasonRange(s)})`)
            .join(", ")}. ${onRequest} All rates are in ${pricing.currency}.`
        : `Rates are on request. All rates are in ${pricing.currency}.`,
    },
    {
      question: "Are rates subject to VAT?",
      answer: `Yes. All rates are in ${pricing.currency} and subject to ${taxLabel()}.`,
    },
    {
      question: "Is there a security deposit?",
      answer: pricing.securityDeposit.note,
    },
  ];
}
