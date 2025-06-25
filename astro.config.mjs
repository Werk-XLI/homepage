// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true, // Use polling for file watching
      },
    },
  },

  output: "server",

  integrations: [compress()],

  adapter: node({
    mode: 'standalone'
  })
});