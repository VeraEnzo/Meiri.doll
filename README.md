# meiri doll — sitio web oficial

Sitio web catálogo de **Meiri Doll**, marca de indumentaria femenina argentina con estética shoujo y coquette, inspirada en la moda asiática.

🌐 **En vivo:** [meiridoll.vercel.app](https://meiridoll.vercel.app/)

> El universo visual es íntimo, nostálgico y dulce — como el cuarto de una chica que se viste para ella misma.

---

## Sobre la marca

Meiri Doll es una marca de indumentaria femenina de Rosario, Santa Fe, Argentina. Su identidad se construye sobre detalles románticos: botones con forma de flor y corazón, encaje, volados, moños y acabados cuidados. Referencias visuales: diarios íntimos, flores secas, luz de tarde, lunares.

**Paleta de colores**

| Nombre      | Hex       | Uso principal                  |
| ----------- | --------- | ------------------------------ |
| Vainilla    | `#fff1b5` | Fondo hero, logo principal     |
| Baby blue   | `#8dd2ef` | Acento, SVGs decorativos       |
| Dusty rose  | `#f3aebc` | Acento suave, tags             |
| Rosa medio  | `#f3aebd` | Fondo header                   |
| Bordó       | `#9b1734` | Color primario, texto, CTAs    |
| Cream       | `#fffaf0` | Fondo general de la página     |

**Tipografía:** `MeiriDoll-Regular` — manuscrita y orgánica, tipografía propia de la marca.

---

## Propósito del sitio

El sitio funciona como **catálogo vitrina** — los productos se muestran pero no se compran directamente. Cuando una clienta quiere adquirir algo, el botón "consultar" la dirige a Instagram para hablar con la tienda.

Esto permite mantener la atención personalizada que caracteriza a la marca, sin la complejidad de un e-commerce completo.

---

## Stack tecnológico

| Tecnología        | Versión  | Rol                                      |
| ----------------- | -------- | ---------------------------------------- |
| **Astro**         | v6       | Framework principal — genera HTML estático |
| **Tailwind CSS**  | v4       | Estilos utilitarios                      |
| **TypeScript**    | —        | Tipado en componentes                    |
| **Sveltia CMS**   | —        | Panel de edición del catálogo en `/admin` |

El sitio genera HTML estático en build, lo que lo hace extremadamente rápido y deployable gratis sin necesidad de servidor. Está desplegado en **Vercel** — ver [Despliegue](#despliegue).

> **No hay backend ni base de datos.** Todo el contenido (productos, textos, precios) vive en archivos del repositorio y se resuelve en tiempo de build. No hay API, ni servidor Node corriendo, ni Postgres. El [panel de administración](#panel-de-administración) tampoco es una excepción: en vez de escribir en una base de datos, commitea al repo. Las consultas de las clientas se manejan por Instagram, fuera del sitio.

---

## Estructura del proyecto

```
website/
├── public/
│   ├── admin/                        # Panel de administración (Sveltia CMS)
│   ├── fonts/
│   │   └── MeiriDoll-Regular.ttf     # Tipografía propia
│   └── assets/
│       ├── logos/                    # Variantes del logo (PNG/JPG, todos los colores)
│       ├── svg/                      # Ilustraciones decorativas (doll en 4 colores)
│       ├── simbolo/                  # Ícono botón de flor
│       └── productos/                # Fotos de productos
├── src/
│   ├── components/
│   │   ├── Header.astro              # Navegación sticky
│   │   ├── ProductCard.astro         # Card con carrusel de fotos
│   │   ├── ContactSection.astro      # CTA hacia Instagram
│   │   └── Footer.astro
│   ├── content/
│   │   └── productos/                # Un archivo YAML por producto
│   ├── content.config.ts             # Schema de la colección de productos
│   ├── layouts/
│   │   └── Layout.astro              # Layout base con meta tags
│   ├── pages/
│   │   └── index.astro               # Página principal (hero + catálogo + contacto)
│   └── styles/
│       └── global.css                # Fuente, paleta y estilos base
└── package.json
```

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo en localhost:4321
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## Despliegue

El sitio está desplegado en **Vercel**: [meiridoll.vercel.app](https://meiridoll.vercel.app/)

| Aspecto              | Configuración                                      |
| -------------------- | -------------------------------------------------- |
| Plataforma           | Vercel (plan gratuito)                             |
| Repositorio          | `VeraEnzo/Meiri.doll`                              |
| Rama de producción   | `main`                                             |
| Framework preset     | Astro (autodetectado)                              |
| Comando de build     | `npm run build`                                    |
| Directorio de salida | `dist/`                                            |
| Variables de entorno | ninguna                                            |

### Cómo se publican los cambios

El deploy es automático: **cada push a `main` dispara un build en Vercel** y publica el resultado. No hay que ejecutar ningún comando manual.

```bash
git add .
git commit -m "feat: nuevo producto"
git push origin main
# Vercel buildea y publica solo — tarda ~1 minuto
```

Los pull requests generan **preview deployments** con su propia URL temporal, útil para revisar cambios antes de mergear a `main`.

### Arquitectura de despliegue

El sitio es **100% estático**. Astro genera HTML, CSS y JS en el build y Vercel los sirve desde su CDN — no hay funciones serverless, ni adapter de Astro, ni proceso corriendo en el servidor.

Esto significa que **no hay backend ni base de datos**:

- ❌ Sin servidor de API (Render, Railway, Fly.io u otro)
- ❌ Sin base de datos (Neon, Supabase, Postgres u otra)
- ❌ Sin variables de entorno ni secretos
- ✅ Solo archivos estáticos en el CDN de Vercel

> **Nota:** el stack Vercel + Render + Neon pertenece a [DSW-Final-Transmisiones](https://github.com/VeraEnzo/DSW-Final-Transmisiones), otro proyecto del mismo autor. Meiri Doll nunca usó Render ni Neon.

Si en el futuro se agrega algo que requiera servidor (formulario de contacto, panel de administración, carrito), habrá que instalar el [adapter de Vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/) para habilitar rendering on-demand o API routes.

---

## Panel de administración

El catálogo se edita desde **[meiridoll.vercel.app/admin](https://meiridoll.vercel.app/admin)** — sin tocar código y sin instalar nada. Corre [Sveltia CMS](https://sveltiacms.app/), un CMS que en vez de usar base de datos **commitea directamente al repositorio**: al guardar un cambio, GitHub recibe el commit y Vercel republica el sitio en ~1 minuto.

| Aspecto            | Detalle                                              |
| ------------------ | ---------------------------------------------------- |
| URL                | `/admin`                                             |
| CMS                | Sveltia CMS (compatible con Decap CMS)               |
| Autenticación      | Cuenta de GitHub con permiso de escritura en el repo |
| Dónde se guarda    | `src/content/productos/` y `public/assets/productos/` |
| Costo              | $0 — el sitio sigue siendo 100% estático             |

> **Sobre la seguridad:** la página `/admin` es pública (es solo una pantalla de login), pero no sirve de nada sin una cuenta de GitHub con acceso de escritura al repositorio. No hay contraseñas guardadas en el sitio ni base de datos que atacar — el control de acceso lo maneja GitHub. Para dar de baja a alguien, se lo quita como colaborador del repo.

### Cómo entrar

Hay dos formas de iniciar sesión:

1. **Con token personal** — botón *Sign In with Token*. Se genera un [personal access token](https://github.com/settings/tokens) de GitHub con permiso sobre el repo y se pega. No requiere ninguna configuración extra, pero es incómodo para alguien no técnico.
2. **Con la cuenta de GitHub** — requiere una OAuth App de GitHub y un proxy de autenticación desplegado en Cloudflare Workers ([Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)). Una vez configurado, se descomenta `base_url` en `public/admin/config.yml`.

La segunda opción es la recomendada para uso cotidiano: cada persona entra con su propia cuenta y los commits quedan a su nombre.

### Qué se puede editar

Nombre, descripción, fotos (subir, borrar y reordenar arrastrando), etiquetas, precio y orden en la grilla. También crear y eliminar productos enteros. Las fotos subidas van automáticamente a `public/assets/productos/`.

---

## Agregar productos

Se pueden agregar **desde el [panel de administración](#panel-de-administración)** o editando archivos a mano.

Cada producto es un archivo YAML en `src/content/productos/`. El nombre del archivo define su identificador (`princess-hoodie.yml`):

```yaml
name: Nombre del producto
description: |-
  Descripción breve.

  Material: 100% Algodón
  Colores disponibles: Parfait Pink
images:
  - /assets/productos/foto-1.jpg
  - /assets/productos/foto-2.jpg
tags:
  - etiqueta
  - otra etiqueta
price: '$50.000'
order: 1
```

Los campos están validados por un schema de Zod en `src/content.config.ts`: si falta uno obligatorio o tiene el tipo equivocado, **el build falla con un error claro** en vez de publicar algo roto.

### Campos del producto

| Campo         | Tipo       | ¿Obligatorio? | Detalle                                                        |
| ------------- | ---------- | ------------- | -------------------------------------------------------------- |
| `name`        | `string`   | Sí            | Nombre de la prenda, se muestra en la card                      |
| `description` | `string`   | Sí            | Texto descriptivo — los saltos de línea se respetan             |
| `images`      | `string[]` | Sí            | Rutas a las fotos, mínimo una; con más de una se activa el carrusel |
| `tags`        | `string[]` | No            | Etiquetas decorativas; si se omite, no se muestra ninguna       |
| `price`       | `string`   | No            | Precio tal cual se ve; si se omite, la card no muestra precio   |
| `order`       | `number`   | No (default 0)| Posición en la grilla — menor número aparece antes              |

**Sobre `price`:** es un **string libre, no un número**. Se escribe exactamente como se quiere ver (`'$50.000'`), sin formateo automático de moneda ni separadores de miles. Conviene escribirlo entre comillas en el YAML para que el `$` no se malinterprete. Es opcional: si el producto no lo incluye, la card simplemente no renderiza el precio.

**Sobre `description`:** los saltos de línea se respetan en la card (usa `whitespace-pre-line`), así que se pueden separar párrafos o listar detalles como material y colores disponibles. En YAML se escribe con el bloque `|-`, como en el ejemplo de arriba.

**Sobre `order`:** cuando dos productos comparten el mismo número, se ordenan alfabéticamente por nombre.

Las fotos van en `public/assets/productos/` (el panel las sube ahí solo).

> **Nota sobre el peso de las fotos:** hoy se sirven crudas con `<img>`, sin pasar por `astro:assets`. Las imágenes de 1.5–3 MB se descargan enteras. Migrarlas a `src/assets/` habilitaría la conversión automática a webp/avif en el build.

---

## Contacto

Instagram: [@meiri.doll](https://www.instagram.com/meiri.doll/)
