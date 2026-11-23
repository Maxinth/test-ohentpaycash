"use client";
"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { locales } from "@/lib/i18n";
export default function CountrySwitcher() {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();
  const current = locales.find((l) => l.code === locale) ?? locales[0];

  useEffect(() => {
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (
        e instanceof KeyboardEvent
          ? e.key === "Escape"
          : !box.current?.contains(e.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  function choose(code: string) {
    Cookies.set("NEXT_LOCALE", code, {
      expires: 365,
      path: "/",
      sameSite: "lax",
    });

    setOpen(false);
    router.push(pathname.replace(`/${locale}`, `/${code}`));
  }

  return (
    <div ref={box} className="relative py-1">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center cursor-pointer gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-ink"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
        <span className="mr-1 scale-125">{current.flag} </span>
        {current.name}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 border border-line bg-white p-2 shadow-lg">
          <ul role="listbox" aria-label="Country and language">
            {locales.map((l) => (
              <li key={l.code} role="option" aria-selected={l.code === locale}>
                <button
                  onClick={() => choose(l.code)}
                  className={`flex w-full cursor-pointer items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-sky ${l.code === locale ? "font-semibold" : ""}`}
                >
                  <span>
                    <span className="mr-1 scale-200">{l.flag} </span>
                    <span className="text-ink/60"> {l.name}</span>
                  </span>
                  {l.code === locale && <span className="text-royal">✓</span>}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-1 border-t border-line px-3 pb-1 pt-2 text-xs text-ink/60">
            Currently available in the United States and Canada.
          </p>
        </div>
      )}
    </div>
  );
}
