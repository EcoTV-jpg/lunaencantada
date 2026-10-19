"use client";

import { useActionState, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { track } from "@/lib/analytics";
import {
  type FieldErrors,
  type InquiryField,
  addDays,
  nightsBetween,
  todayIso,
  validateInquiry,
  validateStay,
} from "@/lib/booking/validation";

const initialState: InquiryState = {
  status: "idle",
  values: { checkIn: "", checkOut: "", guests: "2", name: "", email: "", message: "" },
  errors: {},
};

const noopSubscribe = () => () => {};

const fieldClass =
  "block w-full min-h-12 rounded-xs border border-line bg-paper px-4 py-3 text-base text-ink transition-colors placeholder:text-stone/70 hover:border-stone focus:border-teal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-[#a3412f]";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

export function AvailabilityForm({ maxGuests }: { maxGuests: number }) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  // Initialised from `state` so a no-JS round trip renders the right step.
  const [step, setStep] = useState<"stay" | "details">(
    state.status === "details" || state.values.name || state.values.email ? "details" : "stay",
  );
  const [values, setValues] = useState(state.values);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [syncedState, setSyncedState] = useState(state);
  // "today" resolves on the client only, so a statically built page never ships a stale minimum date.
  const today = useSyncExternalStore(noopSubscribe, todayIso, () => undefined);
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Adopt each new server result (adjusting state during render, per React docs).
  // Field values stay local: they may have been edited while the request was in flight.
  if (state !== syncedState) {
    setSyncedState(state);
    setClientErrors({});
    if (state.status === "details") setStep("details");
  }

  useEffect(() => {
    if (state.status === "sent" || state.message) statusRef.current?.focus();
  }, [state]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("view_availability");
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const errors: FieldErrors = { ...state.errors, ...clientErrors };
  const nights =
    values.checkIn && values.checkOut && values.checkOut > values.checkIn
      ? nightsBetween(values.checkIn, values.checkOut)
      : null;

  const update = (field: InquiryField, value: string) => {
    setValues((v) => {
      const next = { ...v, [field]: value };
      // Keep check-out after check-in.
      if (field === "checkIn" && value && next.checkOut && next.checkOut <= value) next.checkOut = "";
      return next;
    });
    setClientErrors((e) => ({ ...e, [field]: undefined }));
    if (field === "checkIn") track("select_check_in");
    if (field === "checkOut") track("select_check_out");
    if (field === "guests") track("select_guests", { guests: Number(value) });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const found = step === "stay" ? validateStay(values) : validateInquiry(values);
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      setClientErrors(found);
      const first = Object.keys(found)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    if (step === "stay") {
      e.preventDefault();
      setStep("details");
      track("submit_availability", { stage: "dates", nights: nights ?? 0, guests: Number(values.guests) });
      requestAnimationFrame(() => nameRef.current?.focus());
      return;
    }
    track("submit_availability", { stage: "inquiry", nights: nights ?? 0, guests: Number(values.guests) });
  };

  if (state.status === "sent") {
    return (
      <div ref={rootRef}>
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="border-t-2 border-teal bg-paper p-8 focus:outline-none sm:p-12"
        >
          <p className="eyebrow text-teal">Inquiry sent</p>
          <p className="mt-4 font-serif text-[2rem] leading-tight text-ink">Thank you, {state.values.name.split(" ")[0]}.</p>
          <p className="mt-4 max-w-[32rem] text-stone">
            Your request for {formatDate(state.values.checkIn)} – {formatDate(state.values.checkOut)} ({state.values.guests}{" "}
            {state.values.guests === "1" ? "guest" : "guests"}) has been received. You’ll get a reply at{" "}
            <span className="text-ink">{state.values.email}</span> confirming availability and the rate for your dates.
          </p>
        </div>
      </div>
    );
  }

  const fieldError = (field: InquiryField) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className="mt-2 text-sm text-[#a3412f]">
        {errors[field]}
      </p>
    ) : null;

  const describedBy = (field: InquiryField, extra?: string) =>
    [errors[field] ? `${id}-${field}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <div ref={rootRef} className="border-t-2 border-ink bg-paper p-6 sm:p-10">
      <form action={formAction} onSubmit={onSubmit} noValidate aria-describedby={`${id}-note`}>
        <input type="hidden" name="step" value={step} />
        {/* Honeypot for bots — hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <fieldset>
          <legend className="eyebrow text-stone">Your stay</legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-checkIn`} className="mb-2 block text-sm font-medium text-ink">
                Check-in
              </label>
              <input
                id={`${id}-checkIn`}
                name="checkIn"
                type="date"
                required
                min={today}
                value={values.checkIn}
                onChange={(e) => update("checkIn", e.target.value)}
                aria-invalid={!!errors.checkIn}
                aria-describedby={describedBy("checkIn")}
                className={fieldClass}
              />
              {fieldError("checkIn")}
            </div>
            <div>
              <label htmlFor={`${id}-checkOut`} className="mb-2 block text-sm font-medium text-ink">
                Check-out
              </label>
              <input
                id={`${id}-checkOut`}
                name="checkOut"
                type="date"
                required
                min={values.checkIn ? addDays(values.checkIn, 1) : today}
                value={values.checkOut}
                onChange={(e) => update("checkOut", e.target.value)}
                aria-invalid={!!errors.checkOut}
                aria-describedby={describedBy("checkOut")}
                className={fieldClass}
              />
              {fieldError("checkOut")}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${id}-guests`} className="mb-2 block text-sm font-medium text-ink">
                Guests
              </label>
              <select
                id={`${id}-guests`}
                name="guests"
                value={values.guests}
                onChange={(e) => update("guests", e.target.value)}
                aria-invalid={!!errors.guests}
                aria-describedby={describedBy("guests", `${id}-guests-hint`)}
                className={`${fieldClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 fill=%22none%22><path d=%22M1 1.5l5 5 5-5%22 stroke=%22%2316343a%22/></svg>')] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
              <p id={`${id}-guests-hint`} className="mt-2 text-sm text-stone">
                Maximum {maxGuests} guests, including children.
              </p>
              {fieldError("guests")}
            </div>
          </div>
        </fieldset>

        <p className="mt-5 min-h-6 text-sm text-ink" aria-live="polite">
          {nights !== null && (
            <>
              {nights} {nights === 1 ? "night" : "nights"} · {formatDate(values.checkIn)} – {formatDate(values.checkOut)}
            </>
          )}
        </p>

        {step === "details" && (
          <fieldset className="mt-6 border-t border-line pt-8">
            <legend className="eyebrow float-left mb-5 w-full text-stone">Where should we reply?</legend>
            <div className="clear-both grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-medium text-ink">
                  Name
                </label>
                <input
                  ref={nameRef}
                  id={`${id}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                  className={fieldClass}
                />
                {fieldError("name")}
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                  className={fieldClass}
                />
                {fieldError("email")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-medium text-ink">
                  Message <span className="font-normal text-stone">(optional)</span>
                </label>
                <textarea
                  id={`${id}-message`}
                  name="message"
                  rows={4}
                  maxLength={2000}
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy("message")}
                  placeholder="Arrival time, questions about the condo…"
                  className={`${fieldClass} resize-y`}
                />
                {fieldError("message")}
              </div>
            </div>
          </fieldset>
        )}

        <div ref={statusRef} tabIndex={-1} className="focus:outline-none">
          {state.message && (
            <p role="alert" className="mt-6 border-l-2 border-[#a3412f] pl-4 text-sm text-[#a3412f]">
              {state.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-8 inline-flex min-h-13 w-full items-center justify-center rounded-xs bg-teal px-8 text-base font-medium text-paper transition-colors hover:bg-teal-deep disabled:opacity-70 sm:w-auto"
        >
          {pending ? "Sending…" : step === "stay" ? "Check Availability" : "Send Inquiry"}
        </button>

        <p id={`${id}-note`} className="mt-5 max-w-[34rem] text-sm text-stone">
          {step === "stay"
            ? "This sends a request, not a booking. Nothing is charged."
            : "This is a request, not a booking — nothing is charged."}
        </p>
      </form>
    </div>
  );
}
