"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

const easeOut = [0.2, 0.75, 0.18, 1] as const;
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

type FieldErrors = {
  email?: string;
  brand?: string;
  message?: string;
};

async function submitContact(payload: { email: string; brand: string; message: string }) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Contact API returned ${res.status}`);
  }
}

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!email.trim()) e.email = "Email required";
    else if (!EMAIL_RX.test(email.trim())) e.email = "Email looks invalid";
    if (!brand.trim()) e.brand = "Tell us the brand name";
    if (!message.trim()) e.message = "A few words helps us route this";
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();

    // Honeypot — bots fill hidden fields. Show success silently, send nothing.
    if (hp) {
      setStatus("success");
      return;
    }

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("sending");
    try {
      await submitContact({ email: email.trim(), brand: brand.trim(), message: message.trim() });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className="contact-form contact-form--success"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <p className="contact-form__success-title">Thanks.</p>
        <p className="contact-form__success-body">
          We&rsquo;ll respond within 24 hours.
        </p>
        <p className="contact-form__success-sign">— Ibrahim</p>
      </motion.div>
    );
  }

  function clearError(field: keyof FieldErrors) {
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__field">
        <label htmlFor="cf-email" className="contact-form__label">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className={`contact-form__input ${errors.email ? "is-error" : ""}`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError("email");
          }}
          placeholder="you@brand.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
        />
        {errors.email ? (
          <span id="cf-email-error" className="contact-form__error">
            {errors.email}
          </span>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="cf-brand" className="contact-form__label">
          Brand or company
        </label>
        <input
          id="cf-brand"
          type="text"
          autoComplete="organization"
          className={`contact-form__input ${errors.brand ? "is-error" : ""}`}
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            clearError("brand");
          }}
          placeholder="Your brand"
          aria-invalid={!!errors.brand}
          aria-describedby={errors.brand ? "cf-brand-error" : undefined}
        />
        {errors.brand ? (
          <span id="cf-brand-error" className="contact-form__error">
            {errors.brand}
          </span>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="cf-message" className="contact-form__label">
          What you want to test
        </label>
        <textarea
          id="cf-message"
          rows={4}
          className={`contact-form__input contact-form__input--textarea ${errors.message ? "is-error" : ""}`}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearError("message");
          }}
          placeholder="Audience, product, goal, timeline — anything relevant."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
        />
        {errors.message ? (
          <span id="cf-message-error" className="contact-form__error">
            {errors.message}
          </span>
        ) : null}
      </div>

      {/* Honeypot — visually + accessibility hidden, bots fill it, humans don't */}
      <div className="contact-form__hp" aria-hidden>
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className={`cta__button contact-form__submit ${status === "sending" ? "is-sending" : ""}`}
        disabled={status === "sending"}
        data-analytics-event="contact_form_submit"
        data-analytics-label="CTA contact form"
      >
        <span>{status === "sending" ? "Sending…" : "Apply for the first batch"}</span>
        <span className="cta__button-arrow" aria-hidden>
          →
        </span>
      </button>

      <p className="contact-form__trust">We respond within 24 hours</p>

      {status === "error" ? (
        <p className="contact-form__form-error" role="alert">
          Something went wrong.{" "}
          <a href="mailto:partnership@ajione.com?subject=Partnership%20inquiry">
            Email us directly →
          </a>
        </p>
      ) : null}

      <p className="contact-form__fallback">
        Or write directly:{" "}
        <a
          href="mailto:partnership@ajione.com?subject=Partnership%20inquiry"
          data-analytics-event="contact_form_fallback_email"
          data-analytics-label="CTA mailto fallback"
        >
          partnership@ajione.com →
        </a>
      </p>
    </form>
  );
}
