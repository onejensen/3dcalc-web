# 3Dcalc+ — Sitio corporativo

Sitio estático multipágina para promocionar la app móvil **3Dcalc+** de Sozolabs (calculadora de costes de impresión 3D que genera presupuestos PDF). Pago único 4.99€ en App Store y Google Play.

- Dominio: `https://www.3dcalc.app`
- Hosting: GitHub Pages (`onejensen/3dcalc-web`), rama `main`, sirve la raíz del repo
- App Store: `https://apps.apple.com/es/app/3dcalc/id6752701677`
- Google Play: `https://play.google.com/store/apps/details?id=com.sozolabs.calc3D`
- Soporte: support@sozolabs.com / info@sozo3d.es

## Stack

HTML/CSS/JS plano — sin framework, sin bundler, sin build step. Lo que ves en el repo es lo que se sirve.

| Archivo | Rol |
|---|---|
| `index.html` | Landing principal en **español** (hero, stats, features, how-it-works, mockup, testimonials, pricing, download, FAQ, footer) |
| `en/`, `de/`, `fr/`, … (11) | **Homepages estáticas por idioma — GENERADAS, no editar a mano.** Salen de `index.html` + `translations.js` vía `build-i18n.mjs`. |
| `guia-costes-impresion-3d.html`, `cuanto-cuesta-imprimir-en-3d.html`, `consumo-electrico-impresora-3d.html` | Guías SEO (solo español) |
| `privacy.html`, `terms.html`, `support.html` | Páginas legales y FAQ |
| `styles.css` | Estilos globales — design tokens en `:root` arriba del archivo |
| `translations.js` | Diccionario i18n `window.t = { es, en, … }` (12 idiomas, incl. bloque `meta` con title/description SEO) |
| `main.js` | Lang switcher (en la home navega a `/xx/`; en otras páginas traduce in situ), FAQ accordion, scroll-reveal, stats counter, nav móvil |
| `build-i18n.mjs` | Generador de las homepages por idioma (`node build-i18n.mjs`) |
| `sitemap.xml`, `robots.txt`, `llms.txt`, `CNAME`, `.nojekyll` | SEO/GEO + GitHub Pages config |
| `assets/` | `logo-320.png`, `logo-512.png`, `favicon.png` |

## ⚠️ Paso de compilación (multilingüe)

El sitio es casi todo "lo que ves es lo que se sirve", PERO las homepages por idioma (`/en/`, `/de/`, …) son **generadas**. **Tras editar `index.html` o `translations.js`, ejecuta antes de commitear:**

```bash
node build-i18n.mjs   # regenera en/index.html, de/index.html, … desde index.html + translations.js
```

Si no lo haces, las versiones por idioma quedan desactualizadas. El español (`/`) NO se genera — `index.html` es la fuente. Cada `/xx/` lleva su contenido traducido en el HTML (para crawlers), su `<title>`/meta, canonical propio y `hreflang` recíproco.

## Sistema de diseño — "Maker Bold Fusión"

Definido en `styles.css:4-18` como CSS custom properties:

- **Fondo**: `#0d0d0d` (oscuro)
- **Acento**: `#f97316` (naranja maker)
- **Tipografía**: Inter (400→900), titulares en 900
- **Radio**: 10px
- **Container**: 1100px max
- **Mobile-first**, responsive con media queries en `styles.css`

Animaciones reveal en cascada vía clases `.reveal` + `.delay-1`…`.delay-6` (definidas en `styles.css:778-789`).

## i18n — patrón obligatorio

Cualquier texto visible se localiza con `data-i18n="seccion.clave"` en el HTML y la entrada correspondiente en `translations.js` para **ambos** idiomas (`es` y `en`).

```html
<h3 data-i18n="features.f6_title">Control de Stock</h3>
```

```js
// translations.js
es: { features: { f6_title: 'Control de Stock', … } }
en: { features: { f6_title: 'Stock Control', … } }
```

`main.js:12-26` recorre todos los `[data-i18n]` al cambiar de idioma y reemplaza vía `innerHTML` (placeholder en inputs). Idioma persistido en `localStorage`.

**Nunca** hardcodear strings que vayan a verse — siempre `data-i18n` + ambas traducciones.

## Convenciones a respetar

- Cambios de copy → tocar `translations.js` (no solo el fallback HTML).
- Sin frameworks, sin npm, sin transpilación. Si lo añades, justifícalo.
- Mantener mobile-first; revisar breakpoints existentes antes de añadir nuevos.
- Iconos sociales/store en SVG inline dentro del HTML (no `<img>`).
- Stats animados con `data-target="N"` y `data-suffix="+"`. Counter en `main.js`.
- Las páginas legales (privacy/terms/support) tienen meta SEO completo (canonical, OG, Twitter, JSON-LD) — replicar si añades páginas.
- `.nojekyll` en raíz es crítico para que GitHub Pages no procese con Jekyll. No borrar.

## Workflow

```bash
# Editar archivos directamente, no hay build
git add <files>
git commit -m "tipo: descripción"
git push       # GitHub Pages despliega automáticamente
```

Prefijos de commit usados en este repo: `feat:`, `fix:`, `chore:`, `seo:`.

## Estado funcional actual

Funcionalidades anunciadas en el bento-grid (`index.html:205-247`):

1. Precisión Absoluta (FDM/SLA, multicolor, energía, mano de obra)
2. Presupuestos PDF con logo
3. Sync en la Nube (iPhone / iPad / Mac / Android)
4. Multicolor AMS/MMU (Bambu Lab, Prusa)
5. Inventario de impresoras y materiales
6. **Control de Stock** ← novedad, con badge "Nuevo"
7. **Importar G-Code** ← novedad, con badge "Nuevo"

Stat de tracción: **3.000+ makers activos**.
