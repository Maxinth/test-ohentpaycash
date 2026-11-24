import "../globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Contact us | OhentPayCash",
  description: "Contact OhentPayCash or apply to become a payment agent.",
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

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer locale="en-us" />
      </body>
    </html>
  );
}
