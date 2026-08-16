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
│       └── simbolo/                  # Ícono botón de flor
├── src/
│   ├── assets/
│   │   └── productos/                # Fotos de productos (optimizadas en build)
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
│   ├── lib/
│   │   └── imagenes.ts               # Resuelve las rutas de fotos del YAML
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
| Dónde se guarda    | `src/content/productos/` y `src/assets/productos/`   |
| Costo              | $0 — el sitio sigue siendo 100% estático             |

> **Sobre la seguridad:** la página `/admin` es pública (es solo una pantalla de login), pero no sirve de nada sin una cuenta de GitHub con acceso de escritura al repositorio. No hay contraseñas guardadas en el sitio ni base de datos que atacar — el control de acceso lo maneja GitHub. Para dar de baja a alguien, se lo quita como colaborador del repo.

### Cómo entrar

Hay dos formas de iniciar sesión:

1. **Con token personal** — botón *Sign In with Token*. Se genera un [personal access token](https://github.com/settings/personal-access-tokens/new) de GitHub con permiso `Contents: read and write` sobre este repo y se pega. No requiere ninguna configuración extra, pero es incómodo para alguien no técnico y el token vence.
2. **Con la cuenta de GitHub** — botón *Sign In with GitHub*. Cada persona entra con su propia cuenta y los commits quedan a su nombre. Es la opción recomendada para uso cotidiano.

El token se guarda en el `localStorage` del navegador, así que la sesión es **por dispositivo**: entrar desde el celular requiere iniciar sesión de nuevo.

### Configurar el login con cuenta de GitHub

GitHub todavía no permite completar un flujo OAuth enteramente desde el navegador, así que hace falta una pieza mínima de servidor que haga el intercambio del código por el token. Se resuelve con un Worker gratuito de Cloudflare — el sitio sigue siendo estático, el Worker vive aparte.

**1. Desplegar el Worker**

Desplegar [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) en Cloudflare Workers, con el botón de deploy del repo o clonando y corriendo `wrangler deploy`. Anotar la URL que queda, con la forma `https://sveltia-cms-auth.<subdominio>.workers.dev`.

**2. Registrar la OAuth App en GitHub**

En [github.com/settings/applications/new](https://github.com/settings/applications/new):

| Campo | Valor |
| ----- | ----- |
| Application name | `Meiri Doll CMS` |
| Homepage URL | `https://meiridoll.vercel.app` |
| Authorization callback URL | `<URL_DEL_WORKER>/callback` |

Guardar el **Client ID** y generar un **Client Secret**.

**3. Cargar las variables en el Worker**

En el panel de Cloudflare, en *Settings → Variables* del Worker:

| Variable | Valor |
| -------- | ----- |
| `GITHUB_CLIENT_ID` | el Client ID del paso 2 |
| `GITHUB_CLIENT_SECRET` | el Client Secret — **marcarlo como encriptado** |
| `ALLOWED_DOMAINS` | `meiridoll.vercel.app` |

`ALLOWED_DOMAINS` es lo que evita que otro sitio use este Worker para autenticarse. Redesplegar después de cargarlas.

**4. Apuntar el CMS al Worker**

En `public/admin/config.yml`, bajo `backend`, descomentar y completar:

```yaml
base_url: https://sveltia-cms-auth.<subdominio>.workers.dev
```

**5. Dar acceso a quien va a editar**

Invitarla como colaboradora del repositorio con permiso de escritura, desde *Settings → Collaborators*. Sin eso, aunque el login funcione, no va a poder guardar cambios.

> El Worker solo intercambia el código de OAuth por un token: no guarda contenido, no ve las fotos y no tiene estado. Si se cae, el panel deja de dejar entrar por GitHub pero el sitio publicado sigue intacto.

### Qué se puede editar

Nombre, descripción, fotos (subir, borrar y reordenar arrastrando), etiquetas, precio y orden en la grilla. También crear y eliminar productos enteros. Las fotos subidas van automáticamente a `src/assets/productos/`, con el nombre normalizado a minúsculas y guiones y un tope de 8 MB por archivo.

> Sacar una foto de un producto **no borra el archivo del repositorio**: sigue ocupando lugar aunque ya no se muestre. Para eliminarlo del todo hay que borrarlo desde la biblioteca de medios del panel.

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
  - /src/assets/productos/foto-1.jpg
  - /src/assets/productos/foto-2.jpg
tags:
  - etiqueta
  - otra etiqueta
price: $50.000
order: 1
```

Los campos están validados por un schema de Zod en `src/content.config.ts`: si falta uno obligatorio o tiene el tipo equivocado, **el build falla con un error claro** en vez de publicar algo roto.

### Campos del producto

| Campo         | Tipo       | ¿Obligatorio? | Detalle                                                        |
| ------------- | ---------- | ------------- | -------------------------------------------------------------- |
| `name`        | `string`   | Sí            | Nombre de la prenda, se muestra en la card                      |
| `description` | `string`   | No            | Texto descriptivo — los saltos de línea se respetan; si está vacío, la card no muestra párrafo |
| `images`      | `string[]` | No            | Rutas a las fotos en `/src/assets/productos/`; con más de una se activa el carrusel. Sin fotos, la card muestra un placeholder |
| `tags`        | `string[]` | No            | Etiquetas decorativas; si se omite, no se muestra ninguna       |
| `price`       | `string`   | No            | Precio tal cual se ve; si se omite, la card no muestra precio   |
| `order`       | `number`   | No (default 0)| Posición en la grilla — menor número aparece antes              |
| `draft`       | `boolean`  | No (default false) | Si es `true`, el producto existe en el panel pero no sale publicado |

**Sobre `price`:** es un **string libre, no un número**. Se escribe exactamente como se quiere ver (`$50.000`), sin formateo automático de moneda ni separadores de miles. Es opcional: si el producto no lo incluye, la card simplemente no renderiza el precio. En YAML no hace falta comillarlo — el `$` no tiene significado especial y se parsea como texto.

**Sobre `description`:** los saltos de línea se respetan en la card (usa `whitespace-pre-line`), así que se pueden separar párrafos o listar detalles como material y colores disponibles. En YAML se escribe con el bloque `|-`, como en el ejemplo de arriba.

**Sobre `order`:** cuando dos productos comparten el mismo número, se ordenan alfabéticamente por nombre.

**Sobre `draft` y los productos a medio armar:** solo `name` es obligatorio, así que un producto puede existir con la descripción y las fotos vacías — la card muestra un placeholder con el ícono de la marca y la leyenda *"foto próximamente"* en vez de romperse. Eso permite reservar un lugar en la grilla antes de tener el material.

Mientras el sitio está en beta esos productos incompletos salen publicados, que es lo buscado. Cuando el catálogo tenga visitas reales conviene invertir la lógica: poner `draft: true` en los productos a medio armar, y cambiar el `default` del campo `draft` en `public/admin/config.yml` a `true` para que los nuevos arranquen ocultos.

---

## Cómo se optimizan las fotos

Las fotos van en **`src/assets/productos/`**, no en `public/`. Esa distinción es la que habilita la optimización: Astro copia `public/` tal cual, pero todo lo que está en `src/` pasa por el pipeline de [`astro:assets`](https://docs.astro.build/en/guides/images/).

En cada build, Astro convierte los JPG originales a **webp** en tres anchos (320, 640 y 960 px) y arma el `srcset` para que cada dispositivo baje solo el que necesita. Los archivos originales nunca llegan al sitio publicado.

| Ancho servido | Peso del carrusel completo (4 fotos) |
| ------------- | ------------------------------------- |
| 320 px        | ~65 KB                                |
| 640 px        | ~243 KB                               |
| 960 px        | ~608 KB                               |
| _originales_  | _8.15 MB_                             |

Además la primera foto carga con `eager` y el resto con `lazy`, así que la carga inicial de la página es todavía menor.

### El puente entre el YAML y las imágenes

Como los archivos de `src/` no tienen URL pública, no se pueden referenciar con una ruta cualquiera: hay que importarlos. De eso se encarga `src/lib/imagenes.ts`, que indexa todas las fotos con `import.meta.glob` y traduce la ruta guardada en el YAML a la imagen importada que espera el componente `<Image>`.

Consecuencia práctica: **las rutas del YAML tienen que coincidir exactamente con la ubicación real del archivo**, empezando por `/src/assets/productos/`. Si una ruta no existe, el build falla con un mensaje que lista las fotos disponibles, en vez de publicar una card con la imagen rota. El panel de administración escribe estas rutas solo, así que el problema aparece únicamente al editar los YAML a mano.

> **Sobre el tamaño del repositorio:** los originales sin optimizar quedan versionados en git. Con un catálogo chico es irrelevante, pero conviene subir fotos ya recortadas y no de 10 MB — para eso está el tope de 8 MB del panel.

---

## Contacto

Instagram: [@meiri.doll](https://www.instagram.com/meiri.doll/)
