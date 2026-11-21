import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://lowyongting.github.io/personal-portfolio/
export default defineConfig({
  base: "/personal-portfolio/",
  plugins: [react()],
});
