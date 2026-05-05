import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        destructive: "hsl(var(--destructive))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        popover: "hsl(var(--popover))",
        card: "hsl(var(--card))",
        codex: {
          gold: "#D4AF77",
          glow: "#E8C77F",
          burgundy: "#5C2C2C",
          parchment: "#F5E8C7",
          dark: "#1C1814",
          ink: "#3C2F2F",
        },
      },
      fontFamily: {
        heading: ["var(--font-cinzel)"],
        body: ["var(--font-eb-garamond)"],
      },
      keyframes: {
        "ken-burns-in": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        "ken-burns-out": {
          "0%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        "quill-float": {
          "0%, 100%": { transform: "translateY(0) rotate(-10deg)" },
          "50%": { transform: "translateY(-10px) rotate(-3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "scroll-hint": {
          "0%, 100%": { opacity: "0.4", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(8px)" },
        },
      },
      animation: {
        "ken-burns-in": "ken-burns-in 28s ease-in-out infinite alternate",
        "ken-burns-out": "ken-burns-out 28s ease-in-out infinite alternate",
        "quill-float": "quill-float 2.4s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
      },
      backgroundImage: {
        parchment:
          "radial-gradient(circle at top, rgba(245,232,199,0.06), transparent 45%), linear-gradient(135deg, rgba(212,175,119,0.06), rgba(28,24,20,0.18))",
      },
      boxShadow: {
        gilded:
          "0 25px 80px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(212,175,119,0.2), inset 0 0 40px rgba(212,175,119,0.12)",
      },
    },
  },
  plugins: [animate],
};

export default config;
