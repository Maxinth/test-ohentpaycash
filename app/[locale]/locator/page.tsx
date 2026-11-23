import type { Metadata } from "next";
import LocatorMap from "@/components/LocatorMap";

export const metadata: Metadata = {
  title: "Find a payment point | OhentPayCash",
};

export default function Locator() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12">
      <h1 className="text-4xl font-bold md:text-5xl">Find a payment point</h1>
      <p className="mt-3 max-w-lg text-ink/80">
        Search by area, or use your location to see the closest agents.
      </p>
      <LocatorMap />
    </div>
  );
}
