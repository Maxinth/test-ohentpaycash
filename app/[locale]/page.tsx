import Link from "next/link";
import Slip from "@/components/Slip";
import MiniMap from "@/components/MiniMap";
import HowItWorks from "@/components/HowItWorks";
import IndustriesWeServe from "@/components/IndustriesWeServe";

const reasons = [
  {
    title: "Quick and easy",
    body: "Choose cash at checkout, get a slip, and pay at a nearby agent.",
    d: "M3 5h18v11H3zM8 20h8M12 16v4",
  },
  {
    title: "Safe and secure",
    body: "No card or bank login needed, so your financial details stay with you.",
    d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  },
  {
    title: "Open for long hours",
    body: "Many payment points stay open early and late, close to where you live.",
    d: "M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z",
  },
];

const faqs = [
  [
    "What is OhentPayCash?",
    "A way to pay for online things with cash. You get a slip, then pay an agent in person.",
  ],
  [
    "How do I get a slip?",
    "Choose OhentPayCash as your payment method. The slip appears on screen and can be sent by SMS or email, or printed.",
  ],
  [
    "What if the barcode won’t scan?",
    "Give the agent the 12-digit code printed under the barcode. They can enter it by hand.",
  ],
  [
    "How long is my slip valid?",
    "Each slip shows its expiry date. Pay before it runs out, or get a new slip.",
  ],
];

const Logos = ({ title, label }: { title: string; label: string }) => (
  <div className="mt-14">
    <h3 className="text-xl font-semibold">{title}</h3>
    <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
      {Array.from({ length: 6 }, (_, i) => (
        <li
          key={i}
          className="flex h-20 items-center justify-center border border-dashed border-ink/30 text-xs text-ink/50 transition-transform duration-200 hover:-translate-y-1 hover:border-ink"
        >
          {label}
        </li>
      ))}
    </ul>
  </div>
);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const href = (p: string) => `/${locale}${p}`;
  return (
    <>
      <section className="bg-sky/50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
          <div>
            <h1 className="text-5xl font-bold leading-[1.02] md:text-7xl">
              OhentPayCash brings cash online
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink/80">
              Pay bills, top up wallets and shop online with cash, even without
              a bank card.
            </p>
            <Link
              href="#how-it-works"
              className="mt-8 inline-block rounded-full bg-ink px-7 py-3 font-medium text-white transition-colors hover:bg-royal"
            >
              How it works
            </Link>
          </div>
          <div className="relative mx-auto w-72">
            <div className="rounded-[2.5rem] border-[10px] border-ink bg-paper px-3 pb-3 pt-8 shadow-[0_30px_60px_-25px_rgba(10,37,64,.6)]">
              <div className="origin-top scale-[.82] -mb-10">
                <Slip />
              </div>
              <MiniMap className="mt-2 h-32 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-20">
        <h2 className="text-3xl font-bold md:text-4xl">
          Online payments with cash
        </h2>
        <p className="mt-3 max-w-xl text-ink/80">
          Pay bills, top up an account, or buy online. All with cash at a
          retailer near you.
        </p>
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {reasons.map((r) => (
            <li key={r.title} className="group">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-sky transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={r.d} />
                </svg>
              </span>
              <h3 className="mt-5 text-xl font-semibold">{r.title}</h3>
              <p className="mt-1 text-ink/80">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="how-it-works"
        className="mt-20 scroll-mt-24 border-y border-line bg-sky/50"
      >
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">
            This is how it works
          </h2>
          <HowItWorks />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-20">
        <h2 className="text-3xl font-bold md:text-4xl text-center">
          Where you can use it
        </h2>
        {/* <Logos
          title="Accepted at these online shops and services"
          label="Partner logo"
        /> */}
        <Logos title="Pay at these payment points" label="Retailer logo" />
      </section>

      <section className="py-16">
        <IndustriesWeServe />
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl items-center gap-8 px-5 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">
            Find a payment point
          </h2>
          <p className="mt-3 max-w-md text-ink/80">
            Search by area to see the nearest agents and their opening hours.
          </p>
          <Link
            href={href("/locator")}
            className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-medium text-white transition-colors hover:bg-royal"
          >
            Open the map
          </Link>
        </div>
        <Link
          href={href("/locator")}
          aria-label="Open the payment point map"
          className="block overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02]"
        >
          <MiniMap className="h-64" />
        </Link>
      </section>

      <section id="faq" className="mx-auto mt-20 max-w-3xl scroll-mt-24 px-5">
        <h2 className="text-3xl font-bold md:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold">
                {q}
                <span className="text-2xl text-royal transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 max-w-xl text-ink/80">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
