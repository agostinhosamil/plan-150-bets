import { colors, verdant } from "@verdantkit/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./node_modules/@verdantkit/react/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors("#bca4eb"),
      },
    },
  },
  plugins: [verdant()],
};
