import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

// Locale URLs are redirected automatically. Public root routes remain locale-independent.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/agent" || pathname === "/agents") {
    const url = req.nextUrl.clone();
    url.pathname = "/contact-us";
    url.search = "become-an-agent";
    return NextResponse.redirect(url);
  }

  if (pathname === "/contact-us" || pathname.startsWith("/contact-us/")) {
    return NextResponse.next();
  }

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
