import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada producto es un archivo YAML en src/content/productos/.
// El panel de administración (/admin) crea y edita estos archivos.
//
// El nombre del archivo define la URL de la página del producto
// (fairy-top.yml -> /productos/fairy-top), así que conviene que sea
// descriptivo. El panel lo genera a partir del nombre al crear el producto.
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
    // Los borradores no se muestran en el sitio ni generan página propia.
    draft: z.boolean().default(false),

    // --- Solo se usa en la página del producto ---
    // Todo opcional. La página muestra únicamente los campos cargados, así que
    // un producto sin estos datos sigue funcionando igual que antes.

    // Fotos adicionales que se suman a la galería de la página, después de las
    // de `images`. Sirven para detalle de tela, probador o contexto, sin
    // recargar el carrusel de la card del catálogo.
    galeria: z.array(z.string()).default([]),

    detalle: z.string().optional(),
    material: z.string().optional(),
    colores: z.array(z.string()).optional(),
    talles: z.array(z.string()).optional(),
    medidas: z.string().optional(),
    cuidados: z.string().optional(),
  }),
});

export const collections = { productos };
