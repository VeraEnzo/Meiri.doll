// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Necesario para armar URLs absolutas: los tags Open Graph (la tarjeta que
  // se ve al compartir un link por WhatsApp) y el canonical las exigen.
  site: 'https://meiridoll.vercel.app',

  vite: {
    plugins: [tailwindcss()]
  }
});
