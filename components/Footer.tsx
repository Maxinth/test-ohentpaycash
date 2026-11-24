import Link from "next/link";

export default function Footer({ locale }: { locale: string }) {
  const cols = [
    {
      title: "Company",
      links: [
        ["How it works", `/${locale}#how-it-works`],
        ["Become an agent", "/contact-us?become-an-agent"],
        ["Contact", "/contact-us"],
      ],
    },
    {
      title: "Support",
      links: [
        ["FAQ", `/${locale}#faq`],
        ["Payment points", `/${locale}/locator`],
      ],
    },
  ];
  return (
    <footer className="mt-24 bg-ink text-sky">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold text-white">
            OhentPayCash
          </p>
          <p className="mt-2 max-w-xs text-sm text-sky/80">
            Bring your cash online. Available in the United States and Canada.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="font-display text-base font-semibold text-white">
              {c.title}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-white/10 px-5 py-4 text-center text-xs text-sky/60">
        © 2026 OhentPayCash. All rights reserved.
      </p>
    </footer>
  );
}
