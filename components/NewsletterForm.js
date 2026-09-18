"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Could not subscribe" });
        return;
      }

      setStatus({
        type: "success",
        message: data.alreadySubscribed
          ? "You're already on the list."
          : "You're subscribed — watch your inbox.",
      });
      setEmail("");
    } catch {
      setStatus({ type: "error", message: "Network error — try again" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="panel">
      <h2 className="panel-title">Get the newsletter</h2>
      <p className="app-subheading" style={{ margin: 0 }}>
        Weekly digest of what&apos;s starting to move, before it&apos;s obvious.
      </p>
      <form className="field-row" onSubmit={handleSubmit}>
        <input
          className="field-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="field-submit" type="submit" disabled={submitting}>
          {submitting ? "Joining…" : "Subscribe"}
        </button>
      </form>
      {status.type && (
        <p className={`form-note ${status.type === "error" ? "is-error" : "is-success"}`}>
          {status.message}
        </p>
      )}
    </section>
  );
}
