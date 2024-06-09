// tailwind.config.ts
import { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/** @type {import("tailwindcss").Config} */
const config: Config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography],
};

export default config;
