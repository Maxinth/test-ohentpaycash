const industries = [
  {
    title: "Fintech & Banking",
    description:
      "Help customers fund digital wallets, make deposits, and access financial services using cash at convenient retail locations.",
    icon: "bank",
  },
  {
    title: "Bill Payments",
    description:
      "Make it easier for customers to pay utility bills, subscriptions, and other everyday expenses without needing a bank card.",
    icon: "receipt",
  },
  {
    title: "Tolling & Transit",
    description:
      "Give commuters a convenient cash payment option for transportation services, transit accounts, and mobility solutions.",
    icon: "transit",
  },
  {
    title: "iGaming & Sportsbook",
    description:
      "Allow customers to fund eligible online gaming and entertainment accounts with cash through participating payment agents.",
    icon: "gamepad",
  },
  {
    title: "E-Commerce",
    description:
      "Reach cash-preferring shoppers by allowing them to complete online purchases with cash at nearby payment locations.",
    icon: "shopping",
  },
  {
    title: "Healthcare & Insurance",
    description:
      "Make healthcare premiums, insurance contributions, and other essential payments more accessible to customers paying with cash.",
    icon: "health",
  },
] as const;

type IndustryIconName = (typeof industries)[number]["icon"];

function IndustryIcon({ name }: { name: IndustryIconName }) {
  const commonProps = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  const icons = {
    bank: (
      <>
        <path d="M3 9h18L12 3 3 9Z" />
        <path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18M4 18h16" />
      </>
    ),
    receipt: (
      <>
        <path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
    transit: (
      <>
        <rect x="5" y="3" width="14" height="15" rx="3" />
        <path d="M8 7h8M8 12h.01M16 12h.01M8 18l-2 3M16 18l2 3M9 21h6" />
      </>
    ),
    gamepad: (
      <>
        <path d="M6 9h12a4 4 0 0 1 3.8 5l-1 3.2a2.5 2.5 0 0 1-4.1 1L14 16h-4l-2.7 2.2a2.5 2.5 0 0 1-4.1-1L2.2 14A4 4 0 0 1 6 9Z" />
        <path d="M7 12v4M5 14h4M16 13h.01M18 15h.01" />
      </>
    ),
    shopping: (
      <>
        <path d="M4 8h16l-1.5 12h-13L4 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
        <path d="M9 13h.01M15 13h.01" />
      </>
    ),
    health: (
      <>
        <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" />
        <path d="M12 9v6M9 12h6" />
      </>
    ),
  };

  return <svg {...commonProps}>{icons[name]}</svg>;
}

export default function IndustriesWeServe() {
  return (
    <section className="bg-blue-50 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-sky px-4 py-2 text-sm font-semibold text-royal">
            Industries we serve
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            Making cash payments work across industries
          </h2>

          <p className="mt-5 text-base leading-7 text-ink/70 md:text-lg">
            From financial services to everyday shopping, OhentPayCash helps
            businesses serve customers who prefer to pay with cash.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <article
              key={industry.title}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-royal/40 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky text-royal transition-all duration-300 group-hover:bg-ink group-hover:text-white">
                <IndustryIcon name={industry.icon} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-ink">
                {industry.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-ink/70">
                {industry.description}
              </p>

              <span className="absolute -bottom-8 -right-5 text-8xl font-bold text-sky/40 transition-transform duration-300 group-hover:-translate-y-2">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
