import { property } from "@/data/property";

/** Quintana Roo local time; used so "today" matches the property's calendar. */
export const PROPERTY_TIME_ZONE = "America/Cancun";

export type InquiryField = "checkIn" | "checkOut" | "guests" | "name" | "email" | "message";
export type FieldErrors = Partial<Record<InquiryField, string>>;

export interface InquiryValues {
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  email: string;
  message: string;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function todayIso(): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", { timeZone: PROPERTY_TIME_ZONE }).format(new Date());
}

function toUtc(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function addDays(iso: string, days: number): string {
  return new Date(toUtc(iso) + days * 86_400_000).toISOString().slice(0, 10);
}

export function nightsBetween(start: string, end: string): number {
  return Math.round((toUtc(end) - toUtc(start)) / 86_400_000);
}

export function isValidIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const date = new Date(toUtc(value));
  return date.toISOString().slice(0, 10) === value;
}

/** Dates and guests — the first step of the inquiry. */
export function validateStay(values: Pick<InquiryValues, "checkIn" | "checkOut" | "guests">): FieldErrors {
  const errors: FieldErrors = {};
  const today = todayIso();

  if (!values.checkIn) errors.checkIn = "Choose a check-in date.";
  else if (!isValidIsoDate(values.checkIn)) errors.checkIn = "Enter a valid date.";
  else if (values.checkIn < today) errors.checkIn = "Check-in can’t be in the past.";

  if (!values.checkOut) errors.checkOut = "Choose a check-out date.";
  else if (!isValidIsoDate(values.checkOut)) errors.checkOut = "Enter a valid date.";
  else if (values.checkIn && !errors.checkIn && values.checkOut <= values.checkIn)
    errors.checkOut = "Check-out must be after check-in.";

  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > property.capacity.maxGuests)
    errors.guests = `Choose between 1 and ${property.capacity.maxGuests} guests.`;

  return errors;
}

/** Full inquiry, including contact details. */
export function validateInquiry(values: InquiryValues): FieldErrors {
  const errors = validateStay(values);
  const name = values.name.trim();
  const email = values.email.trim();

  if (!name) errors.name = "Enter your name.";
  else if (name.length > 120) errors.name = "Please shorten your name.";

  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL.test(email) || email.length > 254) errors.email = "Enter a valid email address.";

  if (values.message.length > 2000) errors.message = "Please keep your message under 2,000 characters.";

  return errors;
}
