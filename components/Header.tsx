"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CountrySwitcher from "./CountrySwitcher";
import { locales } from "@/lib/i18n";

const links = [
  { path: "/#how", label: "How it works" },
  { path: "/locator", label: "Payment points" },
  { path: "/#faq", label: "FAQ" },
  { path: "/agents", label: "Become an agent" },
];

const underline =
  "relative after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100";

export default function Header() {
  const { locale } = useParams<{ locale: string }>();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const to = (p: string) => (p.startsWith("/#") ? `/${locale}${p.slice(1)}` : `/${locale}${p}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className={`overflow-hidden bg-ink text-xs text-sky transition-all duration-300 ${scrolled ? "max-h-0" : "max-h-10"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2">
          <Link href={to("/agents")} className="hover:underline">Run a shop? Become an agent</Link>
          <span>Available in the US and Canada</span>
        </div>
      </div>

      <div className={`border-b border-line transition-all duration-300 ${scrolled ? "bg-white/90 shadow-[0_6px_20px_-12px_rgba(10,37,64,.5)] backdrop-blur" : "bg-paper"}`}>
        <div className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${scrolled ? "py-2.5" : "py-4"}`}>
          <Link href={`/${locale}`} className="font-display text-xl font-bold tracking-tight">
            Ohent<span className="text-royal">PayCash</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 text-sm font-medium md:flex">
            {links.map((l) => (
              <Link key={l.path} href={to(l.path)} className={underline}>{l.label}</Link>
            ))}
            <CountrySwitcher />
          </nav>

          <button className="rounded-full p-2 hover:bg-sky md:hidden" aria-expanded={open} aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        <nav id="mobile-nav" aria-label="Mobile"
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="min-h-0 px-5">
            <ul className="divide-y divide-line">
              {links.map((l) => (
                <li key={l.path}><Link href={to(l.path)} onClick={() => setOpen(false)} className="block py-3.5 font-medium">{l.label}</Link></li>
              ))}
            </ul>
            <p className="mt-3 border-t border-line pt-3 text-xs text-ink/60">Country and language</p>
            <ul className="pb-3">
              {locales.map((l) => (
                <li key={l.code}>
                  <a href={`/${l.code}`} onClick={() => { document.cookie = `NEXT_LOCALE=${l.code}; path=/; max-age=31536000`; }}
                    className={`block py-2 text-sm ${l.code === locale ? "font-semibold" : ""}`}>
                    {l.name} · {l.language}{l.code === locale ? " ✓" : ""}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
