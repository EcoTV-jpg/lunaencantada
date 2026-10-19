import { formatMoney, numberWord } from "@/lib/format";
import { property } from "./property";

export interface FaqItem {
  question: string;
  answer: string;
}

const { capacity, stay, pricing, name } = property;
const kingBeds = property.bedrooms.filter((b) => b.bed === "King bed").length;
const queenBeds = property.bedrooms.filter((b) => b.bed === "Queen bed").length;

/** Answers are derived from the truth registry so they can never drift. */
export const faq: FaqItem[] = [
  {
    question: `How many guests can ${name} accommodate?`,
    answer: `Up to ${capacity.maxGuests} guests.`,
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
    answer: "Yes. Secure parking is available inside the property.",
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
      ? `Yes. Children are welcome, within the maximum of ${capacity.maxGuests} guests.`
      : "No.",
  },
  {
    question: "Is there a minimum stay?",
    answer: "No minimum stay is currently specified.",
  },
  {
    question: "What is the nightly rate?",
    answer: `Rates currently start from ${formatMoney(pricing.baseNightlyRate)} per night. The rate for your dates is confirmed when you send an availability inquiry.`,
  },
];
