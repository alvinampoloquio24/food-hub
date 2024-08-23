import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-mid": "var(--color-base-mid)",
        "base-light": "var(--color-base-light)",
        "base-dark": "var(--color-base-dark)",
        "text-color": "var(--color-text-color)",
        "base-white": "var(--color-base-white)",
        "base-normal": "var(--color-base-normal)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "90p": "91%",
      },
      fontFamily: {
        diphylleia: ["var(--font-diphylleia)"],
        "montserrat-alternates": ["var(--font-montserrat-alternates)"],
      },
      fontSize: {
        xxs: "0.50rem",
        x2s: "0.55rem",
      },
    },
  },

  plugins: [],
};

export default config;
