import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada producto es un archivo YAML en src/content/productos/.
// El panel de administración (/admin) crea y edita estos archivos.
const productos = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/productos' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    images: z.array(z.string()).min(1, 'Cada producto necesita al menos una foto.'),
    tags: z.array(z.string()).optional(),
    price: z.string().optional(),
    // Menor número = aparece antes en la grilla del catálogo.
    order: z.number().default(0),
  }),
});

export const collections = { productos };
