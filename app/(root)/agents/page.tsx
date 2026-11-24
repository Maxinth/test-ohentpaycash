import type { Metadata } from "next";
import AgentForm from "@/components/AgentForm";

export const metadata: Metadata = { title: "Become an agent | OhentPayCash" };

const perks = [
  ["More foot traffic", "People come in with a slip and often buy something while they are there."],
  ["Earn on every payment", "You earn a commission each time you process a cash payment."],
  ["Simple to run", "Scan or enter the slip code, take the cash, and confirm. No special hardware."],
  ["Paid out reliably", "Your balance is settled to your bank account on a fixed schedule."],
];

export default function Agents() {
  return (
    <div className="mx-auto grid max-w-6xl gap-14 px-5 pt-14 md:grid-cols-[1.1fr_.9fr] md:pt-20">
      <div>
        <h1 className="text-5xl font-bold leading-[1.05] md:text-6xl">Turn your counter into a payment point.</h1>
        <p className="mt-6 max-w-lg text-lg text-ink/80">
          Customers pay bills and top up wallets with cash. You collect it, confirm it, and earn on each payment.
        </p>

        <dl className="mt-12 divide-y divide-line border-y border-line">
          {perks.map(([t, d]) => (
            <div key={t} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="font-display text-lg font-semibold">{t}</dt>
              <dd className="text-ink/80">{d}</dd>
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
        <p className="mt-2 text-ink/80">
          Call <a className="underline underline-offset-4" href="tel:+10000000000">+1 000 000 0000</a> or email{" "}
          <a className="underline underline-offset-4" href="mailto:agents@ohentpaycash.com">agents@ohentpaycash.com</a>.
        </p>
      </div>
      <div className="md:sticky md:top-6 md:self-start"><AgentForm /></div>
    </div>
  );
}
