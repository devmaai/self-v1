"use client";

import { FormEvent, useState } from "react";

const TOPICS = ["List my storage business", "Grow my storage business", "General question"];

export default function ContactForm({ defaultTopic = TOPICS[2] }: { defaultTopic?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) return setStatus("sent");
      if (json.errors) setErrors(json.errors);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-form contact-form-done" role="status">
        <h3>Thank you, your message is on its way.</h3>
        <p>You will hear back within one to two business days.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-row">
        <label>Your name<input name="name" autoComplete="name" required />{errors.name && <span className="contact-form-error">{errors.name}</span>}</label>
        <label>Email<input name="email" type="email" autoComplete="email" required />{errors.email && <span className="contact-form-error">{errors.email}</span>}</label>
      </div>
      <label>What can we help with?
        <select name="topic" defaultValue={defaultTopic}>{TOPICS.map((topic) => <option key={topic}>{topic}</option>)}</select>
        {errors.topic && <span className="contact-form-error">{errors.topic}</span>}
      </label>
      <div className="contact-form-row">
        <label>Business or facility name <small>(optional)</small><input name="business" autoComplete="organization" /></label>
        <label>Website <small>(optional)</small><input name="website" type="url" placeholder="https://" /></label>
      </div>
      <label>Message<textarea name="message" rows={5} required />{errors.message && <span className="contact-form-error">{errors.message}</span>}</label>
      <input className="contact-form-hp" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message →"}</button>
      {status === "error" && !Object.keys(errors).length && <p className="contact-form-error">Something went wrong. Please email business@maai.agency directly.</p>}
    </form>
  );
}
