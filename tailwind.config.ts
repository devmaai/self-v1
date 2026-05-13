import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a1614",
        "ink-soft": "#2d2622",
        paper: "#f5f0e8",
        "paper-warm": "#ece4d3",
        rust: "#b5441f",
        "rust-deep": "#8a2f15",
        ochre: "#d4a24c",
        line: "#c7bca8",
        muted: "#6b6157",
        steel: "#3a4552",
        success: "#2d5a3d",
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
        "inter-tight": ["var(--font-inter-tight)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
