"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AgentForm from "@/components/AgentForm";

const perks = [
  [
    "More foot traffic",
    "People come in with a slip and often buy something while they are there.",
  ],
  [
    "Earn on every payment",
    "You earn a commission each time you process a cash payment.",
  ],
  [
    "Simple to run",
    "Scan or enter the slip code, take the cash, and confirm. No special hardware.",
  ],
  [
    "Paid out reliably",
    "Your balance is settled to your bank account on a fixed schedule.",
  ],
];

function ContactUsContent() {
  const searchParams = useSearchParams();
  const isBecomeAnAgent = searchParams.has("become-an-agent");

  return (
    <div className="mx-auto grid max-w-6xl gap-14 px-5 pt-14 md:grid-cols-[1.1fr_.9fr] md:pt-20">
      <div>
        {isBecomeAnAgent ? (
          <>
            <h1 className="text-5xl font-bold leading-[1.05] md:text-6xl">
              Turn your counter into a payment point.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink/80">
              Customers pay bills and top up wallets with cash. You collect it,
              confirm it, and earn on each payment.
            </p>

            <dl className="mt-12 divide-y divide-line border-y border-line">
              {perks.map(([title, description]) => (
                <div
                  key={title}
                  className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6"
                >
                  <dt className="font-display text-lg font-semibold">
                    {title}
                  </dt>
                  <dd className="text-ink/80">{description}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-12 text-2xl font-bold">What you need</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/80">
              <li>A shop with regular opening hours</li>
              <li>A smartphone with internet access</li>
              <li>A valid ID and a business bank account</li>
            </ul>

            <h2 className="mt-12 text-2xl font-bold">Talk to us first</h2>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold leading-[1.05] md:text-6xl">
              Contact OhentPayCash.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink/80">
              Have a question or need help with a payment? Our team is here to
              help.
            </p>
          </>
        )}
      </div>
      <div className="md:sticky md:top-6 md:self-start">
        <AgentForm
          key={isBecomeAnAgent ? "agent" : "contact"}
          variant={isBecomeAnAgent ? "agent" : "contact"}
          headingText={
            isBecomeAnAgent
              ? "Apply to become an agent"
              : "Get in touch with us"
          }
        />
      </div>
    </div>
  );
}

export default function ContactUsPage() {
  return (
    <Suspense
      fallback={<div className="mx-auto max-w-6xl px-5 py-14">Loading…</div>}
    >
      <ContactUsContent />
    </Suspense>
  );
}
