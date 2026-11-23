"use client";
import { useState } from "react";

const tabs = [
  { id: "wallet", label: "Wallet top-up", steps: [
    ["Open your app", "Choose “Cash” as the way to add money."],
    ["Enter an amount", "Get your slip by SMS, email, or print it."],
    ["Pay the agent", "Show the slip, hand over the cash, keep the receipt."]] },
  { id: "shop", label: "Online shopping", steps: [
    ["Pick OhentPayCash", "Select it as your payment method at checkout."],
    ["Get your slip", "A barcode and 12-digit code are created for the order."],
    ["Pay the agent", "Pay in cash at any payment point to complete the order."]] },
  { id: "bills", label: "Online bills", steps: [
    ["Open your provider’s app", "Choose OhentPayCash as the payment method."],
    ["Get your slip", "The amount due is on the slip. Save it to your phone."],
    ["Pay the agent", "Show the slip and pay. Your provider is notified."]] },
  { id: "paper", label: "Paper bills", steps: [
    ["Find a payment point", "Use the payment point map to find one near you."],
    ["Show your bill", "Hand the paper bill to the agent to scan."],
    ["Pay the amount due", "Pay in cash and keep your receipt."]] },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(next);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="How it works" className="flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button key={t.id} id={`tab-${t.id}`} role="tab" aria-selected={i === active} aria-controls="how-panel"
            tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)} onKeyDown={(e) => onKey(e, i)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
              i === active ? "border-ink bg-ink text-white" : "border-ink/30 hover:border-ink hover:bg-white"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <ol key={tab.id} id="how-panel" role="tabpanel" aria-labelledby={`tab-${tab.id}`} className="swap mt-10 grid gap-8 md:grid-cols-3">
        {tab.steps.map(([title, body], i) => (
          <li key={title} className="border-t-2 border-ink pt-4">
            <span className="font-display text-4xl font-bold text-royal">{i + 1}</span>
            <h3 className="mt-2 text-xl font-semibold">{title}</h3>
            <p className="mt-1 text-ink/80">{body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
