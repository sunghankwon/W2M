import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        sdb: {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        sdb: "sdb 2s infinite",
      },
      spacing: {
        "20": "80px",
      },
    },
  },
  plugins: [
    typography,
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".delay-0.15s": {
          "animation-delay": "0.15s",
        },
        ".delay-0.3s": {
          "animation-delay": "0.3s",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};

export default config;
