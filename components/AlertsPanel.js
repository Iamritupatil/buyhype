"use client";

import { useState } from "react";

export default function AlertsPanel({ initialAlerts }) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;

    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Could not add alert" });
        return;
      }

      setAlerts((prev) => [
        {
          id: data.alert.id,
          keyword: data.alert.keyword,
          createdAt: data.alert.created_at,
        },
        ...prev,
      ]);
      setKeyword("");
    } catch {
      setStatus({ type: "error", message: "Network error — try again" });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRemove(id) {
    const prevAlerts = alerts;
    setAlerts((prev) => prev.filter((a) => a.id !== id));

    try {
      const res = await fetch(`/api/alerts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setAlerts(prevAlerts);
      }
    } catch {
      setAlerts(prevAlerts);
    }
  }

  return (
    <section className="panel">
      <h2 className="panel-title">Add a new alert</h2>
      <form className="field-row" onSubmit={handleSubmit}>
        <input
          className="field-input"
          type="text"
          placeholder="e.g. AI browser agents"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          maxLength={80}
          required
        />
        <button className="field-submit" type="submit" disabled={submitting}>
          {submitting ? "Adding…" : "Add alert"}
        </button>
      </form>
      {status.type === "error" && (
        <p className="form-note is-error">{status.message}</p>
      )}

      {alerts.length === 0 ? (
        <p className="alert-empty">
          No alerts yet — add a keyword above to start tracking it.
        </p>
      ) : (
        <ul className="alert-list">
          {alerts.map((alert) => (
            <li className="alert-item" key={alert.id}>
              <span>{alert.keyword}</span>
              <button
                className="alert-item-remove"
                type="button"
                onClick={() => handleRemove(alert.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
