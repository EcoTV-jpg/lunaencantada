"use client";

import { useActionState, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { Icon } from "@/components/ui/Icon";
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

/** Contact fields: rounded, hairline border, ink focus ring. */
const fieldClass =
  "block w-full min-h-12 rounded-sm border border-grey bg-white px-3.5 py-3 text-base text-ink transition-colors placeholder:text-muted hover:border-ink focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 aria-[invalid=true]:border-error";

/** Segments of the stay box: label above a borderless control. */
const segmentClass =
  "relative block px-3 pt-2.5 pb-2 focus-within:z-10 focus-within:rounded-sm focus-within:outline-2 focus-within:outline-ink";
const segmentLabel = "block text-[0.6875rem] font-bold tracking-wide uppercase text-ink";
const segmentInput =
  "block w-full min-h-7 bg-transparent p-0 text-[0.9375rem] text-ink focus:outline-none aria-[invalid=true]:text-error";

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
        <div ref={statusRef} tabIndex={-1} role="status" className="focus:outline-none">
          <p className="flex items-center gap-2 text-sm font-semibold text-teal">
            <Icon name="sparkle" className="size-4" /> Inquiry sent
          </p>
          <p className="mt-2 text-xl font-semibold tracking-tight">Thank you, {state.values.name.split(" ")[0]}.</p>
          <p className="mt-2 text-[0.9375rem] text-muted">
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
      <p id={`${id}-${field}-error`} className="mt-1.5 text-sm text-error">
        {errors[field]}
      </p>
    ) : null;

  const describedBy = (field: InquiryField, extra?: string) =>
    [errors[field] ? `${id}-${field}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  const stayErrors = (["checkIn", "checkOut", "guests"] as const).filter((f) => errors[f]);

  return (
    <div ref={rootRef}>
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
          <legend className="sr-only">Your stay</legend>
          <div
            className={`rounded-sm border ${stayErrors.length ? "border-error" : "border-grey"} divide-y ${
              stayErrors.length ? "divide-error" : "divide-grey"
            }`}
          >
            <div className={`grid grid-cols-2 divide-x ${stayErrors.length ? "divide-error" : "divide-grey"}`}>
              <label htmlFor={`${id}-checkIn`} className={segmentClass}>
                <span className={segmentLabel}>Check-in</span>
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
                  className={segmentInput}
                />
              </label>
              <label htmlFor={`${id}-checkOut`} className={segmentClass}>
                <span className={segmentLabel}>Check-out</span>
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
                  className={segmentInput}
                />
              </label>
            </div>
            <label htmlFor={`${id}-guests`} className={segmentClass}>
              <span className={segmentLabel}>Guests</span>
              <select
                id={`${id}-guests`}
                name="guests"
                value={values.guests}
                onChange={(e) => update("guests", e.target.value)}
                aria-invalid={!!errors.guests}
                aria-describedby={describedBy("guests", `${id}-guests-hint`)}
                className={`${segmentInput} appearance-none pr-8`}
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
            </label>
          </div>
          {stayErrors.map((f) => (
            <div key={f}>{fieldError(f)}</div>
          ))}
          <p id={`${id}-guests-hint`} className="mt-2 text-xs text-muted">
            Maximum {maxGuests} guests, including children.
          </p>
        </fieldset>

        <p className="mt-3 min-h-5 text-sm font-medium" aria-live="polite">
          {nights !== null && (
            <>
              {nights} {nights === 1 ? "night" : "nights"} · {formatDate(values.checkIn)} – {formatDate(values.checkOut)}
            </>
          )}
        </p>

        {step === "details" && (
          <fieldset className="mt-4 space-y-4 border-t border-line pt-5">
            <legend className="float-left mb-4 w-full text-base font-semibold">Where should we reply?</legend>
            <div className="clear-both">
              <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-medium">
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
              <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-medium">
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
            <div>
              <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm font-medium">
                Message <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                rows={3}
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
          </fieldset>
        )}

        <div ref={statusRef} tabIndex={-1} className="focus:outline-none">
          {state.message && (
            <p role="alert" className="mt-4 rounded-sm bg-faint p-3 text-sm text-error">
              {state.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-teal px-6 text-base font-semibold text-white transition-colors hover:bg-teal-deep disabled:opacity-70"
        >
          {pending ? "Sending…" : step === "stay" ? "Check availability" : "Send inquiry"}
        </button>

        <p id={`${id}-note`} className="mt-3 text-center text-sm text-muted">
          This is a request, not a booking. You won’t be charged.
        </p>
      </form>
    </div>
  );
}
