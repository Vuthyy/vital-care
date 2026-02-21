import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        "background-light": "#f3f4f6",
        "background-dark": "#0f172a",
        "card-light": "#ffffff",
        "card-dark": "#1e293b",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1.5rem",
      },
    },
  },
  plugins: [forms],
};

export default config;
