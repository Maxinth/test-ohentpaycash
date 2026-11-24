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
