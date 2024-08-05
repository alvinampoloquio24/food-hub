import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "base-light": "#ffe4c1",
        "base-dark": "#DC5F00",
        "text-color": "#06283D",
        "base-mid": "#EEEEEE",
      },
      height: {
        "90p": "91%",
      },
      fontFamily: {
        diphylleia: ["var(--font-diphylleia)"],
        "montserrat-alternates": ["var(--font-montserrat-alternates)"],
      },
    },
  },

  plugins: [],
};
export default config;
