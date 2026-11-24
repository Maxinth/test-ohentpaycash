import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locales } from "@/lib/i18n";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });

export const generateStaticParams = () =>
  locales.map((l) => ({ locale: l.code }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "OhentPayCash: pay online with cash",
    description:
      "Get a payment slip, pay cash at a nearby agent, and your payment is done.",
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l.code, `/${l.code}`])),
    },
    openGraph: {
      type: "website",
      siteName: "OhentPayCash",
      description: `OhentPayCash: pay online with cash`,
      images: [{ url: "https://ohentpaycash.com/ohentpaycash.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "OhentPayCash",
      description: "OhentPayCash: pay online with cash",
      site: "@ohentpaycash",
      creator: "@ohentpaycash",
      creatorId: "1467726470533754880",
    },
    itunes: {
      appId: "app-id=1457423786",
    },
    appleWebApp: {
      title: "OhentPayCash",
    },
    other: {
      "msapplication-TileColor": "#2d89ef",
      "theme-color": "#ffffff",
      "fb:app_id": "1687933088140109",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html
      lang={locale.split("-")[0]}
      className={`${display.variable} ${body.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
