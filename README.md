# meiri doll — sitio web oficial

Sitio web catálogo de **Meiri Doll**, marca de indumentaria femenina argentina con estética shoujo y coquette, inspirada en la moda asiática.

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

El sitio genera HTML estático en build, lo que lo hace extremadamente rápido y deployable gratis en plataformas como Vercel o Netlify sin necesidad de servidor.

---

## Estructura del proyecto

```
website/
├── public/
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

## Agregar productos

Los productos se definen en el array `productos` dentro de `src/pages/index.astro`. Cada producto necesita:

```js
{
  name: 'Nombre del producto',
  description: 'Descripción breve.',
  images: [
    '/assets/productos/foto-1.jpg',
    '/assets/productos/foto-2.jpg',
  ],
  tags: ['etiqueta', 'otra etiqueta'],
}
```

Las fotos van en `public/assets/productos/`.

---

## Contacto

Instagram: [@meiri.doll](https://www.instagram.com/meiri.doll/)
