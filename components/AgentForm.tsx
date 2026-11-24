"use client";
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  headingText?: string;
}

export default function AgentForm({ headingText }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent")
    return (
      <div role="status" className="bg-sky p-8">
        <h3 className="text-2xl font-bold">Application received</h3>
        <p className="mt-2">
          We will call you within two working days to arrange a shop visit.
        </p>
      </div>
    );

  const field =
    "mt-1 w-full border border-line bg-white px-3 py-2.5 focus:border-ink";
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 md:p-8">
      <h2 className="text-2xl font-bold">{headingText}</h2>
      <label className="block text-sm font-medium">
        Full name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-medium">
        Business name
        <input name="business" required className={field} />
      </label>
      <label className="block text-sm font-medium">
        Phone number
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className={field}
        />
      </label>
      <label className="block text-sm font-medium">
        Shop address or area
        <input name="area" required className={field} />
      </label>
      <label className="block text-sm font-medium">
        Type of business
        <select name="type" className={field} defaultValue="Retail shop">
          <option>Retail shop</option>
          <option>Pharmacy</option>
          <option>POS / banking agent</option>
          <option>Supermarket</option>
          <option>Other</option>
        </select>
      </label>
      <label className="block text-sm font-medium">
        Anything else we should know? (optional)
        <textarea name="message" rows={3} className={field} />
      </label>
      <button
        disabled={status === "sending"}
        className="w-full rounded-full bg-ink px-6 py-3 font-medium text-white hover:bg-royal disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          Your application did not send. Check your connection and try again.
        </p>
      )}
    </form>
  );
}
