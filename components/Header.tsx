"use client";

import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import CountrySwitcher from "./CountrySwitcher";
import { defaultLocale, locales } from "@/lib/i18n";
import Image from "next/image";
import Logo from "./Logo";

const links = [
  { path: "/#how-it-works", label: "How it works" },
  { path: "/locator", label: "Payment points" },
  { path: "/#faq", label: "FAQ" },
  { path: "/contact-us?become-a-partner", label: "Become a partner" },
  { path: "/contact-us", label: "Contact" },
];

const underline =
  "relative after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 hover:text-blue-800 hover:font-bold duration-300 ease-in-out";

function HeaderContent() {
  const { locale: routeLocale } = useParams<{ locale?: string }>();
  const locale = routeLocale ?? defaultLocale;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isBecomeAnAgent =
    searchParams.has("become-a-partner") && pathname === "/contact-us";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const to = (path: string) => {
    if (path.startsWith("/contact-us")) return path;
    return path.startsWith("/#")
      ? `/${locale}${path.slice(1)}`
      : `/${locale}${path}`;
  };

  // Track the section currently crossing the activation point.

  useEffect(() => {
    if (pathname !== `/${locale}`) {
      return;
    }

    const sectionIds = ["how-it-works", "faq"];

    const updateActiveSection = () => {
      const activationPoint = 140;

      const currentSection = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null)
        .map((section) => ({
          id: section.id,
          rect: section.getBoundingClientRect(),
        }))
        .filter(
          ({ rect }) =>
            rect.top <= activationPoint && rect.bottom > activationPoint,
        )
        .sort((a, b) => b.rect.top - a.rect.top)[0];

      const nextSection = currentSection?.id ?? null;

      setActiveSection((previous) =>
        previous === nextSection ? previous : nextSection,
      );
    };

    const frame = window.requestAnimationFrame(updateActiveSection);

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname, locale]);

  const isActive = (path: string) => {
    // Homepage section links
    if (path === "/#how-it-works") {
      return pathname === `/${locale}` && activeSection === "how-it-works";
    }

    if (path === "/#faq") {
      return pathname === `/${locale}` && activeSection === "faq";
    }

    // Normal page links
    if (path === "/contact-us?become-a-partner") {
      return pathname === "/contact-us" && isBecomeAnAgent;
    }

    if (path === "/contact-us") {
      return pathname === "/contact-us" && !isBecomeAnAgent;
    }

    return pathname === `/${locale}${path}`;
  };

  // Track header scroll state.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`overflow-hidden bg-ink text-xs text-sky transition-all duration-300 ${
          scrolled ? "max-h-0" : "max-h-10"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center hidden justify-between px-5 py-2">
          <Link
            href="/contact-us?become-a-partner"
            className="hover:font-medium underline duration-200 ease-in-out"
          >
            Run a shop? <span className="mx-1">Become a partner</span>
          </Link>

          <span>Available in the US and Canada</span>
        </div>
      </div>

      <div
        className={`border-b border-line transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-[0_6px_20px_-12px_rgba(10,37,64,.5)] backdrop-blur"
            : "bg-white"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
          <Link href={`/${locale}`}>
            <Logo type="header" />
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-8 text-sm font-medium md:flex"
          >
            {links.map((link) => {
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  href={to(link.path)}
                  aria-current={active ? "page" : undefined}
                  className={`${underline} ${
                    active ? "font-bold text-blue-800 after:scale-x-100" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <CountrySwitcher />
          </nav>

          <button
            className="rounded-full p-2 hover:bg-sky md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 md:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 px-5">
            <ul className="divide-y divide-line">
              {links.map((link) => {
                const active = isActive(link.path);

                return (
                  <li key={link.path}>
                    <Link
                      href={to(link.path)}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block py-3.5 font-medium duration-300 ease-in-out ${
                        active
                          ? "font-bold text-blue-800"
                          : "hover:text-blue-800 hover:font-bold"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="mt-3 border-t border-line pt-3 text-xs text-ink/60"></p>

            <ul className="pb-3">
              {locales.map((item) => (
                <li key={item.code}>
                  <a
                    href={
                      routeLocale
                        ? pathname.replace(`/${routeLocale}`, `/${item.code}`)
                        : `/${item.code}`
                    }
                    onClick={() => {
                      document.cookie = `NEXT_LOCALE=${item.code}; path=/; max-age=31536000`;
                    }}
                    className={`block py-2 text-sm ${
                      item.code === locale ? "font-semibold" : ""
                    }`}
                  >
                    <span className="mr-1 scale-200">{item.flag}</span>

                    {item.name}

                    {item.code === locale ? " ✓" : ""}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      <Suspense fallback={null}>
        <HeaderContent />
      </Suspense>
    </header>
  );
}
