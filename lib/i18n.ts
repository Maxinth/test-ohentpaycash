export const locales = [
  {
    code: "en-us",
    country: "us",
    name: "United States",
    language: "English",
    flag: "🇺🇸 ",
  },
  {
    code: "en-ca",
    country: "ca",
    name: "Canada",
    language: "English",
    flag: "🇨🇦 ",
  },
  // Add { code: "fr-ca", country: "ca", name: "Canada", language: "Français" } once French copy exists.
] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale = "en-us";

export const countryOf = (code: string): "us" | "ca" =>
  locales.find((l) => l.code === code)?.country ?? "us";
