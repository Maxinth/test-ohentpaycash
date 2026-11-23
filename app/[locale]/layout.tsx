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
