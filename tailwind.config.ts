import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem"
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        cardForeground: "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        primaryForeground: "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        secondaryForeground: "hsl(var(--secondary-foreground))",
        accent: "hsl(var(--accent))",
        accentForeground: "hsl(var(--accent-foreground))",
        ring: "hsl(var(--ring))"
      },
      fontFamily: {
        sans: ["'Manrope'", "'Space Grotesk'", ...fontFamily.sans]
      },
      boxShadow: {
        soft: "0 20px 70px -35px rgba(0,0,0,0.45)",
        glow: "0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px -40px rgba(0,0,0,0.6)"
      },
      backgroundImage: {
        "grid-light": "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)",
        "grid-dark": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
        "aurora": "linear-gradient(120deg, rgba(114,159,255,0.18), rgba(111,242,198,0.12), rgba(255,255,255,0.04))"
      }
    }
  },
  plugins: []
};

export default config;
