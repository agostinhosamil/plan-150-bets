import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  base: "/plan-150-bets/",

  define: {
    "process.env": {},
    // "process.env.API_URL": "http://plan-150-bets.atwebpages.com",
  },
});
