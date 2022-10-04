import { defineConfig } from 'astro/config'

import solidJs from '@astrojs/solid-js'
import tailwindIntegration from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwindIntegration()],
})
