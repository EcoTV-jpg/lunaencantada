"use server";

import { property } from "@/data/property";
import { getBookingProvider } from "@/lib/booking/provider";
import {
  type FieldErrors,
  type InquiryValues,
  validateInquiry,
  validateStay,
} from "@/lib/booking/validation";

export interface InquiryState {
  status: "idle" | "details" | "error" | "sent";
  values: InquiryValues;
  errors: FieldErrors;
  message?: string;
}

function read(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/**
 * Receives the availability inquiry. Also works without client-side
 * JavaScript: a dates-only submission returns `details` so the form
 * reveals the contact fields.
 */
export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const values: InquiryValues = {
    checkIn: read(formData, "checkIn"),
    checkOut: read(formData, "checkOut"),
    guests: read(formData, "guests"),
    name: read(formData, "name"),
    email: read(formData, "email"),
    message: read(formData, "message"),
  };

  // Honeypot: real visitors never fill this hidden field.
  if (read(formData, "company")) {
    return { status: "sent", values, errors: {} };
  }

  const stayErrors = validateStay(values);
  if (Object.keys(stayErrors).length > 0) {
    return { status: "error", values, errors: stayErrors };
  }

  if (read(formData, "step") !== "details") {
    return { status: "details", values, errors: {} };
  }

  const errors = validateInquiry(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", values, errors };
  }

  const provider = getBookingProvider();
  const result = await provider.submitInquiry({
    propertyId: property.id,
    range: { start: values.checkIn, end: values.checkOut },
    guests: { total: Number(values.guests) },
    contact: { name: values.name.trim(), email: values.email.trim() },
    message: values.message.trim() || undefined,
    createdAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return {
      status: "error",
      values,
      errors: {},
      message: "Your inquiry couldn’t be sent just now. Please try again in a few minutes.",
    };
  }

  return { status: "sent", values, errors: {} };
}
