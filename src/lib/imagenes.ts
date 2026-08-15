import type { ImageMetadata } from 'astro';

// Las fotos viven en src/assets/productos/ para que Astro las optimice en el
// build (webp + srcset). Como están fuera de public/, no se pueden referenciar
// por URL: hay que importarlas. import.meta.glob las importa todas de una y
// las indexa por su ruta, que es exactamente lo que el panel guarda en el YAML.
const archivos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/productos/**/*.{jpeg,jpg,png,webp,avif}'
);

/**
 * Convierte la ruta guardada en el YAML (ej. "/src/assets/productos/foo.jpg")
 * en la imagen importada que necesita el componente <Image> de Astro.
 *
 * Si la ruta no existe, corta el build con un mensaje que explica qué hacer,
 * en vez de publicar una card con una foto rota.
 */
export async function resolverImagen(ruta: string, producto: string): Promise<ImageMetadata> {
  const cargar = archivos[ruta];

  if (!cargar) {
    const disponibles = Object.keys(archivos);
    throw new Error(
      `No se encontró la foto "${ruta}" del producto "${producto}".\n\n` +
        `Las rutas tienen que empezar con /src/assets/productos/ y el archivo ` +
        `tiene que estar commiteado en el repo.\n\n` +
        `Fotos disponibles hoy:\n${disponibles.map(r => `  - ${r}`).join('\n') || '  (ninguna)'}`
    );
  }

  return (await cargar()).default;
}
