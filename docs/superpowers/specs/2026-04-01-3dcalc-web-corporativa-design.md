# Web Corporativa 3Dcalc+ — Diseño

**Fecha:** 2026-04-01  
**Producto:** 3Dcalc+ — app móvil (iOS + Android) para calcular costes de impresión 3D y generar presupuestos PDF profesionales  
**Empresa:** Sozolabs  
**Eslogan:** "Impresión 3D, con números claros."

---

## 1. Objetivo

Crear una web corporativa completa para 3Dcalc+ en `/Users/onejensen/Documents/MIS WEBS/3Dcalc/` que sirva tanto de landing page de conversión (descargas de app) como de site corporativo con páginas legales y soporte. Reemplaza/mejora la landing existente en `MIS APPS/3Dcalc+/3DcalcPlus_LandingPage/`.

---

## 2. Stack técnico

- **HTML + CSS + JS estático** — sin build step, sin frameworks
- Multi-página: un `.html` por sección corporativa
- Traducciones via `translations.js` (objeto JS con textos ES/EN)
- Selector de idioma guarda preferencia en `localStorage`
- Despliegue directo (compatible con cualquier hosting estático)

---

## 3. Estructura de archivos

```
/3Dcalc/
├── index.html          — Landing page principal
├── privacy.html        — Política de Privacidad
├── terms.html          — Términos de Uso
├── support.html        — Soporte / FAQ ampliada
├── styles.css          — Estilos compartidos (design tokens, componentes)
├── translations.js     — Textos ES / EN para todas las páginas
├── main.js             — Lógica: lang switcher, FAQ accordion, scroll animations
└── assets/
    └── logo.png        — Logo de 3Dcalc+
```

---

## 4. Identidad visual — Maker Bold Fusión

### Paleta de colores
| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0d0d0d` | Fondo principal |
| `--bg-card` | `rgba(255,255,255,0.04)` | Cards / bento items |
| `--border` | `rgba(255,255,255,0.08)` | Bordes cards |
| `--accent` | `#f97316` | Color principal (naranja) |
| `--accent-glow` | `rgba(249,115,22,0.12)` | Glow / fondos accent |
| `--text-primary` | `#ffffff` | Textos principales |
| `--text-secondary` | `#6b7280` | Textos secundarios |
| `--text-muted` | `#4b5563` | Textos terciarios |

### Tipografía
- **Fuente:** Inter (Google Fonts) — pesos 400, 600, 800, 900
- **Headlines:** Inter 900, `letter-spacing: -0.5px` a `-1px`
- **Body:** Inter 400/600

### Elementos decorativos
- **Grid técnico sutil:** `background-image` con líneas naranja al 3% opacity, `24px x 24px`
- **Acento diagonal:** triángulo naranja en esquina superior derecha del hero (`border-trick` CSS)
- **Glow radial:** `radial-gradient` naranja en el hero, posicionado top-center
- **Borde top global:** línea de 3px `linear-gradient(90deg, #f97316, #ef4444, #a855f7)` en el `<header>`

### Componentes UI
- **Botón primario:** `background: #f97316`, border-radius 8px, font-weight 800
- **Botón secundario (glassmorphism):** `background: rgba(255,255,255,0.06)`, `backdrop-filter: blur(8px)`, border `rgba(255,255,255,0.1)`
- **Badge/pill:** `background: rgba(249,115,22,0.12)`, border `rgba(249,115,22,0.3)`, color naranja
- **Selector idioma:** pill glassmorphism con `ES | EN`

---

## 5. Páginas

### 5.1 index.html — Landing principal

#### Nav (fijo, sticky)
- Logo: `3DCALC+` con el `+` en naranja, con icono diamante rotado
- Links: Features · Precios · FAQ · Soporte
- Selector idioma: pill `ES | EN`
- CTA: botón "Descargar" naranja sólido → anchor `#download`

#### Hero
- Badge pill: "v2.0 disponible"
- Headline: `Impresión 3D, con **números claros**.` — Inter 900, muy grande (clamp responsive)
- Subheadline: "Calcula el coste real de tus impresiones en segundos. Gestiona materiales, estima el desgaste y genera presupuestos profesionales para tus clientes."
- Botones de descarga (lado a lado):
  - **App Store** → `https://apps.apple.com/es/app/3dcalc/id6752701677`
  - **Google Play** → `https://play.google.com/store/apps/details?id=com.sozolabs.calc3D`
- Social proof: "★★★★★ · Más de 10.000 makers ya la usan"
- Mini mockup flotante (CSS puro): card que muestra "Coste Total: 4.52€" con desglose

#### Stats
3 columnas separadas por líneas:
- **10K+** Makers activos
- **iOS · Android · iPadOS** Plataformas
- **2.99€** Pago único, para siempre

#### Features (bento grid, `#features`)
Grid asimétrico 2 columnas:
- **Precisión Absoluta** (item grande, full-width en mobile) — filamento mono/multicolor, resina, energía, mano de obra
- **PDF Profesional** — presupuestos con tu logo listos para enviar
- **Sync en la Nube** — iPhone, iPad, Android sincronizados
- **Multicolor AMS/MMU** — Bambu Lab AMS, Prusa MMU, desglose por color
- **Inventario** — gestión de impresoras y materiales personalizados

#### Cómo funciona (`#how-it-works`)
3 pasos con número en círculo naranja + línea conectora:
1. **Configura** — añade tu impresora y el precio de tus materiales
2. **Calcula** — introduce gramos y tiempo de impresión desde tu slicer
3. **Presupuesta** — añade margen y exporta el PDF a tu cliente

#### Testimonials (`#testimonials`)
3 tarjetas con avatar, estrellas, texto y nombre/rol:
- Carlos M. — Granja de Impresión 3D
- Laura G. — Diseñadora 3D
- David R. — Maker Hobbyista

#### Pricing (`#pricing`)
Card única centrada con borde naranja:
- Label: "PAGO ÚNICO"
- Precio: **2.99€** (tipografía grande)
- Descriptor: "Sin suscripciones. Sin cargos ocultos. Actualizaciones incluidas."
- Lista features con checkmark naranja (6 items)
- CTA: botón "Descargar ahora" → `#download`

#### CTA Final (`#download`)
Sección oscura con glow, headline "Lleva tu taller al siguiente nivel", botones App Store + Google Play lado a lado.

#### Footer
- Copyright: `© 2026 Sozolabs`
- Links: Política de Privacidad · Términos de Uso · Soporte
- Sin sección de redes sociales en el footer (se puede añadir fácilmente después)

---

### 5.2 privacy.html — Política de Privacidad

- Mismo nav y footer que index.html
- Contenido legal estándar para app móvil: datos recogidos, uso, almacenamiento (Firebase/Firestore según lo detectado), derechos del usuario, contacto
- Disponible en ES y EN via `translations.js`
- Estructura: secciones con `<h2>` y párrafos

### 5.3 terms.html — Términos de Uso

- Mismo nav y footer
- Condiciones de uso de la app, licencia, restricciones, compra in-app (pago único 2.99€), política de reembolso (según App Store / Play Store), ley aplicable
- ES y EN

### 5.4 support.html — Soporte / FAQ

- Mismo nav y footer
- **FAQ ampliada** (accordion): mínimo 8 preguntas frecuentes (ES y EN)
  - ¿Funciona con filamento y resina?
  - ¿Cómo funciona el cálculo multicolor?
  - ¿Qué incluye el pago único?
  - ¿Cómo sincronizo entre dispositivos?
  - ¿Puedo generar presupuestos con mi logo?
  - ¿Está disponible para Android?
  - ¿Cómo actualizo los precios de mis materiales?
  - ¿Dónde contacto si tengo un problema?
- **Sección de contacto** al final: enlace `mailto:` con el email de soporte de Sozolabs

---

## 6. Internacionalización (i18n)

- `translations.js` exporta un objeto `{ es: {...}, en: {...} }` con todos los textos de todas las páginas
- El `main.js` detecta el idioma preferido en `localStorage` (clave `lang`), por defecto `es`
- El selector `ES | EN` en el nav cambia el idioma al hacer click y re-renderiza los textos via `data-i18n` attributes en el HTML
- Las URLs de las tiendas permanecen iguales en ambos idiomas; el texto de los botones cambia

---

## 7. JS (main.js)

- **Lang switcher:** Lee/escribe `localStorage`, aplica traducciones a todos los elementos `[data-i18n]`
- **FAQ accordion:** Click en pregunta expande/colapsa respuesta con animación CSS `max-height`
- **Scroll animations:** `IntersectionObserver` añade clase `.visible` a elementos `.reveal` para fade-in al entrar en viewport
- **Contador stats animado:** Anima los números de stats (10K+, etc.) al hacer scroll hasta la sección

---

## 8. CSS (styles.css)

- **Design tokens** como custom properties CSS en `:root`
- **Reset** mínimo (box-sizing, margin 0)
- **Componentes:** `.btn`, `.btn-primary`, `.btn-secondary`, `.badge`, `.card`, `.bento-grid`, `.step`, `.testimonial-card`, `.pricing-card`, `.faq-item`, `.store-btn`
- **Layout:** `.container` (max-width 1100px, centrado), grid y flexbox nativos
- **Responsive:** mobile-first, breakpoints en 768px y 1024px
- **Animaciones:** `@keyframes` para fade-in, float del mockup, glow pulsante

---

## 9. Consideraciones

- Las imágenes de avatar en testimonials usan `https://i.pravatar.cc` como placeholder (igual que la landing existente)
- El logo (`assets/logo.png`) se copia desde la landing existente en `MIS APPS/3Dcalc+/3DcalcPlus_LandingPage/assets/logo.png`
- La web es 100% estática, sin backend; el formulario de soporte puede usar `mailto:` o un servicio como Formspree
- Añadir `.superpowers/` a `.gitignore` si se inicializa git
