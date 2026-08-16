import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada producto es un archivo YAML en src/content/productos/.
// El panel de administración (/admin) crea y edita estos archivos.
const productos = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/productos' }),
  schema: z.object({
    name: z.string(),
    // Pueden quedar vacíos mientras el producto se está armando: la card
    // muestra un placeholder en vez de romperse.
    description: z.string().default(''),
    images: z.array(z.string()).default([]),
    tags: z.array(z.string()).optional(),
    price: z.string().optional(),
    // Menor número = aparece antes en la grilla del catálogo.
    order: z.number().default(0),
    // Los borradores no se muestran en el sitio. Hoy no se usa (el catálogo
    // está en beta y no hay problema en publicar productos a medio armar),
    // pero queda listo para cuando el sitio tenga visitas reales.
    draft: z.boolean().default(false),
  }),
});

export const collections = { productos };
