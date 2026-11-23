import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A2540",
        royal: "#1D5FC7",
        sky: "#E3EEFB",
        paper: "#F6F9FD",
        line: "#D0DDEE",
        saffron: "#F0B03A",
        brand: "#2D89EF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        print: {
          from: { clipPath: "inset(0 0 100% 0)" },
          to: { clipPath: "inset(0 0 0 0)" },
        },
      },
      animation: { print: "print 1.4s cubic-bezier(.2,.7,.2,1) .2s both" },
    },
  },
  plugins: [],
};
export default config;
