// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

import compress from 'astro-compress';

const isDev = process.env.NODE_ENV === 'development';

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

  // Use ARM-compatible image service for dev server
  image: isDev ? {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  } : undefined,

  integrations: [compress()],

  adapter: node({
    mode: 'standalone'
  })
});