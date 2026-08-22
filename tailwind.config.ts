import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // accentStyles in lib/blog.ts holds gradient/chip class strings
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunny: {
          DEFAULT: "#FCD116",
          bright: "#FFC72C",
          dark: "#E8B800",
        },
        forest: {
          DEFAULT: "#116530",
          deep: "#0B6623",
          light: "#1A7D3E",
          ink: "#08301A",
        },
        cream: "#F4F9F5",
        berry: "#B5179E",
        citrus: "#F77F00",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-baloo)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "display-xl": ["6rem", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(11, 102, 35, 0.15)",
        "glow-yellow": "0 0 40px rgba(252, 209, 22, 0.35)",
        "glow-green": "0 0 40px rgba(17, 101, 48, 0.25)",
        window:
          "0 50px 100px -20px rgba(8, 48, 26, 0.25), 0 30px 60px -30px rgba(8, 48, 26, 0.3)",
        lift: "0 20px 40px -16px rgba(8, 48, 26, 0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(3deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blob: {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%" },
          "50%": { borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(4%,-4%,0) scale(1.08)" },
          "66%": { transform: "translate3d(-3%,3%,0) scale(0.95)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "70%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        blob: "blob 8s ease-in-out infinite",
        shimmer: "shimmer 2s infinite linear",
        aurora: "aurora 18s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "pop-in": "pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
