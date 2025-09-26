// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import favicons from "astro-favicons";
import icon from "astro-icon";
import playformCompress from "@playform/compress";

import config from "./src/data/consts.json";

import opengraphImages, { presets } from "astro-opengraph-images";
import * as fs from "fs"; // The fs module is required to load fonts
import { CustomOGTemplate } from "./src/components/core/custom-og-template.tsx";

export default defineConfig({
  site: config.site.domain,
  base: "",
  trailingSlash: config.site.trailingSlash,
  output: "static",
  compressHTML: true,
  scopedStyleStrategy: "class",

  build: {
    format: "directory",
    assets: "_astro",
    inlineStylesheets: "auto",
    assetsPrefix: "",
  },

  redirects: {},

  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        page !== `${config.site.domain}/stylebook/` &&
        page !== `${config.site.domain}/polityka-prywatnosci/`,
    }),
    icon({
      iconDir: "src/assets/icons",
      include: {
        tabler: ["*"],
      },
    }),
    playformCompress(),
    favicons(),
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Roboto",
            weight: 400,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff"
            ),
          },
          {
            name: "Roboto",
            weight: 700,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/roboto/files/roboto-latin-700-normal.woff"
            ),
          },
        ],
      },
      render: CustomOGTemplate,
    }),
  ],

  server: {
    port: 4321,
    host: false,
    headers: {
      "Strict-Transport-Security":
        "max-age=63072000; includeSubDomains; preload",
      "X-Content-Type-Options": "nosniff",
      "X-XSS-Protection": "0",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Content-Security-Policy": "upgrade-insecure-requests",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: false,
  },
});
