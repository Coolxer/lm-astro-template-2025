// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.example.com",
  base: ".",
  trailingSlash: "always",
  output: "static",
  redirects: {},

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    format: "file",
  },
});
