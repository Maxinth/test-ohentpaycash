import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

// Sends "/" and "/agents" etc. to a locale URL: saved choice, then IP country (on Vercel), then en-us.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    locales.some(
      (l) => pathname === `/${l.code}` || pathname.startsWith(`/${l.code}/`),
    )
  ) {
    return NextResponse.next();
  }
  const saved = req.cookies.get("NEXT_LOCALE")?.value;
  const ipCountry = req.headers.get("x-vercel-ip-country");
  const code =
    locales.find((l) => l.code === saved)?.code ??
    (ipCountry === "CA" ? "en-ca" : defaultLocale);
  const url = req.nextUrl.clone();
  url.pathname = `/${code}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
