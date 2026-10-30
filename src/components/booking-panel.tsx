"use client";
import { useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";

/**
 * Calendly's scheduler, loaded only when the visitor asks for it, so no
 * third-party cookies are set by simply opening the contact page.
 */
export function BookingPanel({ url }: { url: string }) {
  const [open, setOpen] = useState(false);
  const embed = `${url}?hide_gdpr_banner=1&primary_color=4c63f2`;
  return (
    <div className="contact-form booking-panel">
      <div className="form-heading">
        <h2>Book a 30-minute call</h2>
        <span className="mono">VIA CALENDLY</span>
      </div>
      {open ? (
        <iframe
          className="booking-frame"
          src={embed}
          title="Choose a time for a call on Calendly"
        />
      ) : (
        <div className="booking-start">
          <span className="icon-box" aria-hidden="true">
            <CalendarDays size={26} strokeWidth={1.6} />
          </span>
          <p>
            Pick a time that suits you. The scheduler is provided by Calendly
            and loads here when you open it.
          </p>
          <button
            type="button"
            className="button button-primary"
            onClick={() => setOpen(true)}
          >
            Show available times
          </button>
          <a
            className="inline-link"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            Open Calendly in a new tab
            <ArrowUpRight size={17} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
    </div>
  );
}
