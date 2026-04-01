# Web Corporativa 3Dcalc+ — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la web corporativa completa de 3Dcalc+ en `/Users/onejensen/Documents/MIS WEBS/3Dcalc/` — landing page de conversión + páginas legales + soporte, en ES y EN.

**Architecture:** HTML + CSS + JS estático multi-página. `styles.css` centraliza todos los estilos como custom properties. `translations.js` contiene todos los textos ES/EN como objeto global `window.t`. `main.js` maneja el selector de idioma (via `data-i18n` attributes + localStorage), el accordion FAQ, animaciones scroll y contadores de stats. Cada página HTML incluye los tres archivos.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, backdrop-filter), JavaScript ES6 (IntersectionObserver, localStorage), Google Fonts (Inter).

---

## Mapa de archivos

| Archivo | Responsabilidad |
|---|---|
| `styles.css` | Design tokens, reset, todos los componentes CSS |
| `translations.js` | Objeto `window.t = { es:{...}, en:{...} }` con todos los textos |
| `main.js` | Lang switcher, FAQ accordion, scroll reveal, stats counter |
| `index.html` | Landing page: nav, hero, stats, features, steps, testimonials, pricing, CTA, footer |
| `privacy.html` | Política de Privacidad (misma nav/footer, contenido legal) |
| `terms.html` | Términos de Uso (misma nav/footer, contenido legal) |
| `support.html` | Soporte: FAQ ampliada + contacto mailto |
| `assets/logo.png` | Logo copiado desde landing existente |

---

## Task 1: Setup del proyecto — estructura y assets

**Files:**
- Create: `assets/` (directorio)
- Copy: `assets/logo.png` desde `MIS APPS/3Dcalc+/3DcalcPlus_LandingPage/assets/logo.png`

- [ ] **Step 1: Copiar el logo**

```bash
cp "/Users/onejensen/Documents/MIS APPS/3Dcalc+/3DcalcPlus_LandingPage/assets/logo.png" \
   "/Users/onejensen/Documents/MIS WEBS/3Dcalc/assets/logo.png"
```

Verificar: `ls -la "/Users/onejensen/Documents/MIS WEBS/3Dcalc/assets/"`  
Esperado: `logo.png` visible con tamaño > 0 bytes.

- [ ] **Step 2: Crear .gitignore**

Crear `/Users/onejensen/Documents/MIS WEBS/3Dcalc/.gitignore` con:

```
.superpowers/
.DS_Store
```

- [ ] **Step 3: Inicializar git**

```bash
cd "/Users/onejensen/Documents/MIS WEBS/3Dcalc" && git init && git add assets/logo.png .gitignore && git commit -m "chore: project setup, logo and gitignore"
```

---

## Task 2: styles.css — Todos los estilos

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Crear styles.css completo**

Crear `/Users/onejensen/Documents/MIS WEBS/3Dcalc/styles.css`:

```css
/* ============================================
   DESIGN TOKENS
   ============================================ */
:root {
  --bg:            #0d0d0d;
  --bg-card:       rgba(255, 255, 255, 0.04);
  --border:        rgba(255, 255, 255, 0.08);
  --accent:        #f97316;
  --accent-glow:   rgba(249, 115, 22, 0.12);
  --accent-border: rgba(249, 115, 22, 0.3);
  --text-primary:  #ffffff;
  --text-secondary:#6b7280;
  --text-muted:    #4b5563;
  --font:          'Inter', sans-serif;
  --radius:        10px;
  --container:     1100px;
}

/* ============================================
   RESET
   ============================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img { display: block; max-width: 100%; }
a { color: inherit; }

/* ============================================
   LAYOUT
   ============================================ */
.container { max-width: var(--container); margin: 0 auto; padding: 0 24px; }

/* Grid background técnico */
.grid-bg {
  background-image:
    linear-gradient(rgba(249, 115, 22, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249, 115, 22, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* ============================================
   HEADER / NAV
   ============================================ */
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 13, 13, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
header::before {
  content: '';
  display: block;
  height: 3px;
  background: linear-gradient(90deg, #f97316, #ef4444, #a855f7);
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  max-width: var(--container);
  margin: 0 auto;
  gap: 16px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-diamond {
  width: 10px;
  height: 10px;
  background: var(--accent);
  border-radius: 2px;
  transform: rotate(45deg);
}
.logo-text {
  font-size: 16px;
  font-weight: 900;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}
.logo-text span { color: var(--accent); }

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
}
.nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--text-primary); }

.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.lang-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 5px 14px;
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}
.lang-btn:hover {
  background: var(--accent-glow);
  border-color: var(--accent-border);
}
.btn-nav {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 800;
  font-family: var(--font);
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s;
  white-space: nowrap;
}
.btn-nav:hover { opacity: 0.85; }

/* ============================================
   HERO
   ============================================ */
.hero {
  position: relative;
  overflow: hidden;
  padding: 90px 0 70px;
}
.hero-glow {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.11) 0%, transparent 65%);
  pointer-events: none;
}
.hero-diagonal {
  position: absolute;
  top: 0; right: 0;
  width: 0; height: 0;
  border-style: solid;
  border-width: 0 220px 220px 0;
  border-color: transparent rgba(249, 115, 22, 0.12) transparent transparent;
}
.hero-diagonal-inner {
  position: absolute;
  top: 0; right: 0;
  width: 0; height: 0;
  border-style: solid;
  border-width: 0 110px 110px 0;
  border-color: transparent rgba(249, 115, 22, 0.22) transparent transparent;
}
.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 48px;
  align-items: center;
}
.hero-badge {
  display: inline-flex;
  background: var(--accent-glow);
  border: 1px solid var(--accent-border);
  border-radius: 20px;
  padding: 5px 16px;
  margin-bottom: 22px;
}
.hero-badge span {
  color: var(--accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
}
.hero-title {
  font-size: clamp(40px, 6.5vw, 76px);
  font-weight: 900;
  line-height: 1.03;
  letter-spacing: -2.5px;
  margin-bottom: 22px;
}
.hero-title em {
  color: var(--accent);
  font-style: normal;
}
.hero-subtitle {
  color: var(--text-secondary);
  font-size: 17px;
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 36px;
}
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.btn-store {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 20px;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s;
  min-width: 150px;
}
.btn-store-primary { background: var(--accent); }
.btn-store-secondary {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.btn-store-primary:hover { opacity: 0.85; }
.btn-store-secondary:hover { background: rgba(255, 255, 255, 0.1); }
.btn-store-icon { font-size: 20px; line-height: 1; }
.btn-store-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.65);
  display: block;
  line-height: 1;
  margin-bottom: 2px;
}
.btn-store-name {
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  display: block;
  line-height: 1;
}
.hero-proof {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 13px;
}
.hero-stars { color: var(--accent); letter-spacing: 1px; }

/* Mockup flotante */
.hero-mockup {
  background: var(--bg-card);
  border: 1px solid var(--accent-border);
  border-radius: 16px;
  padding: 22px;
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}
.mockup-label { color: var(--text-muted); font-size: 11px; margin-bottom: 3px; }
.mockup-total { color: var(--accent); font-size: 30px; font-weight: 900; letter-spacing: -1px; margin-bottom: 14px; }
.mockup-divider { height: 1px; background: var(--border); margin-bottom: 12px; }
.mockup-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.mockup-row-label { color: var(--text-secondary); font-size: 12px; }
.mockup-row-val { color: var(--text-primary); font-size: 12px; font-weight: 600; }
.mockup-pdf-btn {
  display: block;
  background: var(--accent);
  color: #fff;
  text-align: center;
  padding: 9px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
  margin-top: 16px;
  text-decoration: none;
}

/* ============================================
   STATS
   ============================================ */
.stats {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.stat-item {
  padding: 30px 20px;
  text-align: center;
  border-right: 1px solid var(--border);
}
.stat-item:last-child { border-right: none; }
.stat-value {
  font-size: 28px;
  font-weight: 900;
  color: var(--accent);
  letter-spacing: -1px;
  margin-bottom: 5px;
}
.stat-label { color: var(--text-muted); font-size: 13px; }

/* ============================================
   FEATURES BENTO
   ============================================ */
.features { padding: 90px 0; }
.section-label {
  text-align: center;
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.section-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  letter-spacing: -1.5px;
  text-align: center;
  margin-bottom: 12px;
}
.section-subtitle {
  color: var(--text-secondary);
  text-align: center;
  max-width: 500px;
  margin: 0 auto 52px;
  font-size: 16px;
  line-height: 1.65;
}
.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.bento-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 30px;
  transition: border-color 0.25s, background 0.25s;
}
.bento-item:hover {
  border-color: var(--accent-border);
  background: rgba(249, 115, 22, 0.04);
}
.bento-item.featured {
  grid-column: span 2;
  background: var(--accent-glow);
  border-color: var(--accent-border);
}
.bento-icon { font-size: 30px; margin-bottom: 14px; }
.bento-item h3 { font-size: 18px; font-weight: 800; margin-bottom: 8px; }
.bento-item p { color: var(--text-secondary); font-size: 14px; line-height: 1.65; }

/* ============================================
   HOW IT WORKS
   ============================================ */
.how-it-works {
  padding: 90px 0;
  background: rgba(255, 255, 255, 0.01);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px;
  margin-top: 52px;
  position: relative;
}
/* Línea conectora entre pasos */
.steps-grid::before {
  content: '';
  position: absolute;
  top: 22px;
  left: calc(16.66% + 16px);
  right: calc(16.66% + 16px);
  height: 1px;
  background: linear-gradient(90deg, var(--accent), transparent 50%, var(--accent));
  opacity: 0.3;
}
.step { text-align: center; }
.step-num {
  width: 44px;
  height: 44px;
  background: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 18px;
  margin: 0 auto 18px;
}
.step h4 { font-size: 17px; font-weight: 800; margin-bottom: 8px; }
.step p { color: var(--text-secondary); font-size: 14px; line-height: 1.65; }

/* ============================================
   TESTIMONIALS
   ============================================ */
.testimonials { padding: 90px 0; }
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 52px;
}
.testimonial-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px;
}
.testimonial-stars { color: var(--accent); margin-bottom: 14px; letter-spacing: 2px; }
.testimonial-text {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.75;
  margin-bottom: 22px;
  font-style: italic;
}
.testimonial-author { display: flex; align-items: center; gap: 12px; }
.author-avatar { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; }
.author-name { font-size: 14px; font-weight: 700; }
.author-role { font-size: 12px; color: var(--text-muted); }

/* ============================================
   PRICING
   ============================================ */
.pricing { padding: 90px 0; }
.pricing-card {
  max-width: 460px;
  margin: 52px auto 0;
  background: var(--accent-glow);
  border: 1px solid var(--accent-border);
  border-radius: 16px;
  padding: 44px 40px;
  text-align: center;
}
.pricing-badge {
  display: inline-block;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 20px;
  margin-bottom: 22px;
}
.pricing-price {
  font-size: 60px;
  font-weight: 900;
  letter-spacing: -3px;
  margin-bottom: 8px;
  line-height: 1;
}
.pricing-price sup {
  font-size: 26px;
  vertical-align: super;
  letter-spacing: 0;
  font-weight: 700;
}
.pricing-desc {
  color: var(--text-secondary);
  font-size: 15px;
  margin-bottom: 30px;
  line-height: 1.5;
}
.pricing-features {
  list-style: none;
  text-align: left;
  margin-bottom: 30px;
}
.pricing-features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  color: var(--text-secondary);
}
.pricing-features li:last-child { border-bottom: none; }
.check { color: var(--accent); font-weight: 900; flex-shrink: 0; margin-top: 1px; }

.btn-primary {
  display: block;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px 28px;
  font-size: 16px;
  font-weight: 800;
  font-family: var(--font);
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.2s;
  width: 100%;
}
.btn-primary:hover { opacity: 0.85; }

/* ============================================
   DOWNLOAD CTA
   ============================================ */
.download-cta {
  padding: 90px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.download-cta-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 600px; height: 350px;
  background: radial-gradient(ellipse, rgba(249, 115, 22, 0.09) 0%, transparent 70%);
  pointer-events: none;
}
.download-cta h2 {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  letter-spacing: -1.5px;
  margin-bottom: 14px;
}
.download-cta p {
  color: var(--text-secondary);
  margin-bottom: 36px;
  font-size: 16px;
}
.store-buttons {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ============================================
   FOOTER
   ============================================ */
footer {
  border-top: 1px solid var(--border);
  padding: 30px 0;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.footer-logo { font-size: 15px; font-weight: 900; color: var(--text-primary); }
.footer-logo span { color: var(--accent); }
.footer-copy { color: var(--text-muted); font-size: 13px; }
.footer-links { display: flex; gap: 22px; }
.footer-links a {
  color: var(--text-muted);
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-links a:hover { color: var(--accent); }

/* ============================================
   INNER PAGES (privacy, terms, support)
   ============================================ */
.page-hero {
  padding: 64px 0 48px;
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.page-hero-glow {
  position: absolute;
  top: -100px; left: -100px;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.page-hero h1 {
  font-size: clamp(30px, 4vw, 52px);
  font-weight: 900;
  letter-spacing: -1.5px;
  margin-bottom: 8px;
  position: relative;
}
.page-hero p { color: var(--text-secondary); font-size: 15px; position: relative; }
.page-body { padding: 60px 0 80px; }
.page-content { max-width: 740px; }
.page-content h2 {
  font-size: 20px;
  font-weight: 800;
  color: var(--accent);
  margin: 40px 0 12px;
}
.page-content p {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 16px;
}
.page-content ul {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.8;
  padding-left: 22px;
  margin-bottom: 16px;
}
.page-content a { color: var(--accent); text-decoration: underline; }
.page-content strong { color: var(--text-primary); }

/* FAQ Accordion */
.faq-list { margin-top: 0; }
.faq-item { border-bottom: 1px solid var(--border); }
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  gap: 16px;
  list-style: none;
  transition: color 0.2s;
}
.faq-question:hover { color: var(--accent); }
.faq-icon {
  color: var(--accent);
  font-size: 22px;
  font-weight: 300;
  flex-shrink: 0;
  transition: transform 0.25s;
  line-height: 1;
}
.faq-item.open .faq-icon { transform: rotate(45deg); }
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
}
.faq-answer p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
  padding-bottom: 22px;
  margin: 0;
}
.faq-item.open .faq-answer { max-height: 400px; }

/* Contact card */
.contact-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px;
  margin-top: 48px;
  text-align: center;
}
.contact-card h3 { font-size: 22px; font-weight: 800; margin-bottom: 10px; }
.contact-card p { color: var(--text-secondary); margin-bottom: 22px; font-size: 15px; }
.btn-contact {
  display: inline-block;
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  transition: opacity 0.2s;
}
.btn-contact:hover { opacity: 0.85; }

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }
.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.2s; }
.delay-3 { transition-delay: 0.3s; }
.delay-4 { transition-delay: 0.4s; }

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-mockup { display: none; }
  .hero-title { letter-spacing: -1.5px; }
}

@media (max-width: 768px) {
  nav { padding: 12px 16px; }
  .nav-links { display: none; }
  .bento-grid { grid-template-columns: 1fr; }
  .bento-item.featured { grid-column: span 1; }
  .steps-grid { grid-template-columns: 1fr; gap: 28px; }
  .steps-grid::before { display: none; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr; }
  .stat-item { border-right: none; border-bottom: 1px solid var(--border); }
  .stat-item:last-child { border-bottom: none; }
  .footer-inner { flex-direction: column; text-align: center; }
  .footer-links { flex-wrap: wrap; justify-content: center; }
  .pricing-card { padding: 32px 24px; }
}

@media (max-width: 480px) {
  .hero { padding: 60px 0 50px; }
  .hero-actions { flex-direction: column; }
  .btn-store { justify-content: center; }
  .store-buttons { flex-direction: column; align-items: center; }
}
```

- [ ] **Step 2: Verificar en navegador**

Abrir cualquier HTML que lo use (paso siguiente). Por ahora confirmar que el archivo no tiene errores de sintaxis:

```bash
wc -l "/Users/onejensen/Documents/MIS WEBS/3Dcalc/styles.css"
```

Esperado: línea count > 400.

- [ ] **Step 3: Commit**

```bash
cd "/Users/onejensen/Documents/MIS WEBS/3Dcalc" && git add styles.css && git commit -m "feat: add shared styles with Maker Bold Fusion design"
```

---

## Task 3: translations.js — Textos ES / EN

**Files:**
- Create: `translations.js`

- [ ] **Step 1: Crear translations.js**

Crear `/Users/onejensen/Documents/MIS WEBS/3Dcalc/translations.js`:

```javascript
window.t = {
  es: {
    nav: {
      features:     'Características',
      pricing:      'Precios',
      faq:          'FAQ',
      support:      'Soporte',
      download:     'Descargar',
    },
    hero: {
      badge:        'Versión 2.0 disponible',
      title:        'Impresión 3D,<br>con <em>números claros.</em>',
      subtitle:     'Calcula el coste real de tus impresiones en segundos. Gestiona materiales, estima el desgaste y genera presupuestos profesionales para tus clientes.',
      appstore:     'App Store',
      googleplay:   'Google Play',
      available:    'Disponible en',
      proof:        'Más de 10.000 makers ya la usan',
    },
    mockup: {
      total:        'Coste Total',
      filament:     'Filamento',
      energy:       'Energía',
      labor:        'Mano de obra',
      pdf:          'Exportar Presupuesto PDF',
    },
    stats: {
      users:        'Makers activos',
      platforms:    'iOS · Android · iPadOS',
      price:        'Pago único, para siempre',
    },
    features: {
      label:        '— Funcionalidades',
      title:        'Todo lo que necesitas en una sola app',
      subtitle:     'Diseñada para makers, impresores y profesionales del 3D.',
      f1_title:     'Precisión Absoluta',
      f1_desc:      'Calcula filamento monocolor o multicolor, resina, energía eléctrica por región y mano de obra. Sin estimaciones: costes reales.',
      f2_title:     'Presupuestos PDF',
      f2_desc:      'Genera presupuestos PDF profesionales con tu logo y datos listos para enviar a tus clientes en un solo clic.',
      f3_title:     'Sync en la Nube',
      f3_desc:      'Tus impresoras y materiales sincronizados entre iPhone, iPad y Android de forma instantánea.',
      f4_title:     'Multicolor AMS/MMU',
      f4_desc:      'Soporte para Bambu Lab AMS y Prusa MMU. Desglose exacto por color y purgado.',
      f5_title:     'Inventario',
      f5_desc:      'Gestiona todas tus impresoras y materiales personalizados en un solo lugar.',
    },
    steps: {
      label:        '— Así de sencillo',
      title:        '¿Cómo funciona?',
      s1_title:     'Configura',
      s1_desc:      'Añade tu impresora y el precio de tu filamento o resina.',
      s2_title:     'Calcula',
      s2_desc:      'Introduce el peso y el tiempo de impresión de tu slicer.',
      s3_title:     'Presupuesta',
      s3_desc:      'Añade tu margen de beneficio y exporta el presupuesto PDF.',
    },
    testimonials: {
      label:        '— Opiniones reales',
      title:        'Lo que dicen los makers',
      t1_text:      '"La mejor app para calcular costes. Antes perdía dinero en piezas grandes, ahora sé exactamente cuánto cobrar. El presupuesto en PDF es un game-changer para mis clientes."',
      t1_name:      'Carlos M.',
      t1_role:      'Granja de Impresión 3D',
      t2_text:      '"La función de cálculos multicolor es increíble. Desglosa cada color para la Bambu Lab AMS perfectamente. La sincronización en la nube funciona de maravilla entre iPad y iPhone."',
      t2_name:      'Laura G.',
      t2_role:      'Diseñadora 3D',
      t3_text:      '"Sencilla, directa y sin complicaciones. Tiene todo lo necesario para calcular resina y filamento. Mucho mejor que las hojas de Excel que usaba antes."',
      t3_name:      'David R.',
      t3_role:      'Maker Hobbyista',
    },
    pricing: {
      label:        '— Sin sorpresas',
      title:        'Una herramienta profesional,<br>por el precio de un café.',
      badge:        'PAGO ÚNICO',
      price:        '2.99',
      currency:     '€',
      desc:         'Sin suscripciones. Sin cargos ocultos. Actualizaciones incluidas.',
      f1:           'Cálculos ilimitados y múltiples impresoras',
      f2:           'Presupuestos PDF con tu logo exportables',
      f3:           'Soporte multicolor (AMS / MMU)',
      f4:           'Sincronización en la nube entre dispositivos',
      f5:           'Cálculo de energía, resina y costes extra',
      f6:           'Actualizaciones futuras incluidas',
      cta:          'Descargar ahora',
    },
    download: {
      title:        'Lleva tu taller al siguiente nivel',
      subtitle:     'Disponible para todos tus dispositivos. Sincroniza tus datos y nunca pierdas un presupuesto.',
    },
    footer: {
      privacy:      'Política de Privacidad',
      terms:        'Términos de Uso',
      support:      'Soporte',
      copy:         '© 2026 Sozolabs',
    },
    // Páginas internas
    privacy: {
      badge:        'Legal',
      title:        'Política de Privacidad',
      updated:      'Última actualización: 1 de abril de 2026',
      intro:        'En Sozolabs, tu privacidad es una prioridad. Esta política explica qué datos recogemos, cómo los usamos y cómo los protegemos cuando usas 3Dcalc+.',
      s1_title:     '1. Responsable del tratamiento',
      s1_body:      'El responsable del tratamiento de datos es <strong>Sozolabs</strong>, con correo electrónico de contacto: <a href="mailto:support@sozolabs.com">support@sozolabs.com</a>.',
      s2_title:     '2. Datos que recogemos',
      s2_body:      'Cuando creas una cuenta en 3Dcalc+, recogemos los siguientes datos:',
      s2_list:      '<li>Dirección de correo electrónico (para autenticación)</li><li>Configuraciones de impresoras que añades</li><li>Precios y materiales personalizados</li><li>Historial de cálculos (guardados en la nube si activas la sincronización)</li>',
      s3_title:     '3. Cómo usamos tus datos',
      s3_body:      'Usamos tus datos exclusivamente para:',
      s3_list:      '<li>Permitirte acceder a tu cuenta desde múltiples dispositivos</li><li>Sincronizar tus configuraciones y cálculos en la nube</li><li>Mejorar el funcionamiento de la app</li>',
      s4_title:     '4. Almacenamiento y seguridad',
      s4_body:      'Tus datos se almacenan de forma segura en <strong>Google Firebase / Firestore</strong>, con cifrado en tránsito (HTTPS/TLS) y en reposo. No vendemos ni compartimos tus datos con terceros con fines comerciales.',
      s5_title:     '5. Tus derechos',
      s5_body:      'Tienes derecho a acceder, rectificar o eliminar tus datos en cualquier momento. Para ejercerlos, contacta con nosotros en <a href="mailto:support@sozolabs.com">support@sozolabs.com</a>. Eliminar tu cuenta borrará todos tus datos de nuestros servidores en un plazo de 30 días.',
      s6_title:     '6. Menores de edad',
      s6_body:      '3Dcalc+ no está dirigida a menores de 13 años. No recopilamos intencionadamente datos de menores.',
      s7_title:     '7. Cambios en esta política',
      s7_body:      'Podemos actualizar esta política ocasionalmente. Si los cambios son significativos, te lo notificaremos dentro de la app. La fecha de la última actualización aparece al inicio de este documento.',
      s8_title:     '8. Contacto',
      s8_body:      'Si tienes alguna pregunta sobre esta política, escríbenos a <a href="mailto:support@sozolabs.com">support@sozolabs.com</a>.',
    },
    terms: {
      badge:        'Legal',
      title:        'Términos de Uso',
      updated:      'Última actualización: 1 de abril de 2026',
      intro:        'Al descargar o usar 3Dcalc+, aceptas estos Términos de Uso. Léelos con atención.',
      s1_title:     '1. Descripción del servicio',
      s1_body:      '3Dcalc+ es una aplicación móvil para calcular costes de impresión 3D y generar presupuestos profesionales. Está desarrollada por <strong>Sozolabs</strong>.',
      s2_title:     '2. Licencia de uso',
      s2_body:      'Al adquirir 3Dcalc+, obtienes una licencia personal, no exclusiva e intransferible para usar la app en los dispositivos asociados a tu cuenta de App Store o Google Play.',
      s3_title:     '3. Compra y pago',
      s3_body:      '3Dcalc+ se vende como <strong>pago único de 2.99€</strong> a través de App Store (Apple) o Google Play (Google). Los precios pueden variar por región. Las compras se gestionan y facturan directamente por las tiendas respectivas.',
      s4_title:     '4. Política de reembolso',
      s4_body:      'Los reembolsos están sujetos a la política de la plataforma de compra: <a href="https://support.apple.com/es-es/118223" target="_blank" rel="noopener">App Store</a> o <a href="https://support.google.com/googleplay/answer/2479637" target="_blank" rel="noopener">Google Play</a>.',
      s5_title:     '5. Actualizaciones',
      s5_body:      'Las actualizaciones de la app están incluidas en el pago único mientras el soporte de la plataforma lo permita. Sozolabs se reserva el derecho a publicar nuevas versiones con funcionalidades adicionales de pago.',
      s6_title:     '6. Limitación de responsabilidad',
      s6_body:      'Sozolabs no se hace responsable de decisiones comerciales basadas en los cálculos de la app. Los resultados son estimaciones basadas en los datos introducidos por el usuario.',
      s7_title:     '7. Legislación aplicable',
      s7_body:      'Estos términos se rigen por la legislación española. Para cualquier disputa, las partes se someten a los juzgados y tribunales de España.',
      s8_title:     '8. Contacto',
      s8_body:      'Para cualquier consulta legal, contacta con nosotros en <a href="mailto:support@sozolabs.com">support@sozolabs.com</a>.',
    },
    support: {
      badge:        'Ayuda',
      title:        'Centro de Soporte',
      subtitle:     'Encuentra respuesta a tus preguntas o contacta con nosotros.',
      faq_label:    '— Preguntas frecuentes',
      faq_title:    'FAQ',
      q1:           '¿Puedo usar 3Dcalc+ para impresión en resina?',
      a1:           'Sí. 3Dcalc+ soporta tanto impresión FDM (filamento) como SLA/DLP (resina). Puedes guardar botellas de resina con su precio por mililitro y calcular costes con la misma precisión que con filamento.',
      q2:           '¿Cómo funciona el cálculo multicolor?',
      a2:           'En la pantalla de cálculo, activa la opción multicolor e introduce los gramos exactos de cada color y el material de purgado. La app soporta Bambu Lab AMS, Prusa MMU y cualquier sistema multifilamento.',
      q3:           '¿Qué incluye el pago único de 2.99€?',
      a3:           'Todo: cálculos ilimitados, múltiples impresoras, presupuestos PDF con tu logo, soporte multicolor, sincronización en la nube entre dispositivos y todas las actualizaciones futuras.',
      q4:           '¿Cómo sincronizo mis datos entre dispositivos?',
      a4:           'Inicia sesión con la misma cuenta de email en todos tus dispositivos (iPhone, iPad, Android). Tus impresoras, materiales y cálculos se sincronizan automáticamente a través de la nube.',
      q5:           '¿Puedo añadir mi logo a los presupuestos PDF?',
      a5:           'Sí. En los ajustes de tu perfil puedes subir tu logo y añadir tus datos de contacto. Aparecerán automáticamente en todos los presupuestos que generes.',
      q6:           '¿Está disponible para Android?',
      a6:           'Sí. 3Dcalc+ está disponible tanto en App Store (iOS/iPadOS) como en Google Play (Android). Los datos se sincronizan entre plataformas si usas la misma cuenta.',
      q7:           '¿Cómo actualizo los precios de mis materiales?',
      a7:           'Ve a la sección "Materiales" o "Filamentos" dentro de la app, selecciona el material que quieras editar y actualiza el precio. El cambio se aplica a todos los cálculos nuevos.',
      q8:           '¿Dónde puedo reportar un problema o sugerencia?',
      a8:           'Puedes escribirnos directamente a support@sozolabs.com. Respondemos en un plazo de 24-48 horas en días laborables.',
      contact_title:   '¿No encuentras lo que buscas?',
      contact_subtitle:'Escríbenos y te ayudamos lo antes posible.',
      contact_btn:     'Contactar por email',
    },
  },

  en: {
    nav: {
      features:     'Features',
      pricing:      'Pricing',
      faq:          'FAQ',
      support:      'Support',
      download:     'Download',
    },
    hero: {
      badge:        'Version 2.0 available',
      title:        '3D Printing,<br>with <em>clear numbers.</em>',
      subtitle:     'Calculate the real cost of your prints in seconds. Manage materials, estimate wear, and generate professional quotes for your clients.',
      appstore:     'App Store',
      googleplay:   'Google Play',
      available:    'Available on',
      proof:        'Trusted by over 10,000 makers',
    },
    mockup: {
      total:        'Total Cost',
      filament:     'Filament',
      energy:       'Energy',
      labor:        'Labor',
      pdf:          'Export Quote PDF',
    },
    stats: {
      users:        'Active makers',
      platforms:    'iOS · Android · iPadOS',
      price:        'One-time payment, forever',
    },
    features: {
      label:        '— Features',
      title:        'Everything you need in one app',
      subtitle:     'Built for makers, print farms, and 3D professionals.',
      f1_title:     'Absolute Precision',
      f1_desc:      'Calculate single or multicolor filament, resin, electricity by region, and labor costs. No estimates — real costs.',
      f2_title:     'Professional PDF Quotes',
      f2_desc:      'Generate professional PDF quotes with your logo and contact details ready to send to clients in one click.',
      f3_title:     'Cloud Sync',
      f3_desc:      'Your printers and materials synced instantly between iPhone, iPad, and Android.',
      f4_title:     'Multicolor AMS/MMU',
      f4_desc:      'Supports Bambu Lab AMS and Prusa MMU. Exact breakdown per color and purge.',
      f5_title:     'Inventory',
      f5_desc:      'Manage all your custom printers and materials in one place.',
    },
    steps: {
      label:        '— Easy as 1-2-3',
      title:        'How does it work?',
      s1_title:     'Configure',
      s1_desc:      'Add your printer and the price of your filament or resin.',
      s2_title:     'Calculate',
      s2_desc:      'Enter the weight and print time from your slicer.',
      s3_title:     'Quote',
      s3_desc:      'Add your profit margin and export the PDF quote.',
    },
    testimonials: {
      label:        '— Real reviews',
      title:        'What makers are saying',
      t1_text:      '"The best app for calculating costs. I used to lose money on big prints, now I know exactly what to charge. The PDF quote is a game-changer for my clients."',
      t1_name:      'Carlos M.',
      t1_role:      '3D Print Farm',
      t2_text:      '"The multicolor calculation feature is incredible. It breaks down each color for the Bambu Lab AMS perfectly. Cloud sync works flawlessly between iPad and iPhone."',
      t2_name:      'Laura G.',
      t2_role:      '3D Designer',
      t3_text:      '"Simple, straightforward, no hassle. It has everything needed to calculate resin and filament. Way better than the spreadsheets I used before."',
      t3_name:      'David R.',
      t3_role:      'Hobbyist Maker',
    },
    pricing: {
      label:        '— No surprises',
      title:        'A professional tool,<br>for the price of a coffee.',
      badge:        'ONE-TIME PAYMENT',
      price:        '2.99',
      currency:     '€',
      desc:         'No subscriptions. No hidden fees. Updates included.',
      f1:           'Unlimited calculations and multiple printers',
      f2:           'PDF quotes with your logo',
      f3:           'Multicolor support (AMS / MMU)',
      f4:           'Cloud sync across devices',
      f5:           'Energy, resin, and extra cost calculation',
      f6:           'Future updates included',
      cta:          'Download now',
    },
    download: {
      title:        'Take your workshop to the next level',
      subtitle:     'Available on all your devices. Sync your data and never lose a quote.',
    },
    footer: {
      privacy:      'Privacy Policy',
      terms:        'Terms of Use',
      support:      'Support',
      copy:         '© 2026 Sozolabs',
    },
    privacy: {
      badge:        'Legal',
      title:        'Privacy Policy',
      updated:      'Last updated: April 1, 2026',
      intro:        'At Sozolabs, your privacy is a priority. This policy explains what data we collect, how we use it, and how we protect it when you use 3Dcalc+.',
      s1_title:     '1. Data Controller',
      s1_body:      'The data controller is <strong>Sozolabs</strong>. Contact email: <a href="mailto:support@sozolabs.com">support@sozolabs.com</a>.',
      s2_title:     '2. Data We Collect',
      s2_body:      'When you create an account in 3Dcalc+, we collect the following data:',
      s2_list:      '<li>Email address (for authentication)</li><li>Printer configurations you add</li><li>Custom material prices</li><li>Calculation history (stored in the cloud if you enable sync)</li>',
      s3_title:     '3. How We Use Your Data',
      s3_body:      'We use your data solely to:',
      s3_list:      '<li>Allow you to access your account from multiple devices</li><li>Sync your settings and calculations in the cloud</li><li>Improve app performance</li>',
      s4_title:     '4. Storage and Security',
      s4_body:      'Your data is stored securely on <strong>Google Firebase / Firestore</strong>, with encryption in transit (HTTPS/TLS) and at rest. We do not sell or share your data with third parties for commercial purposes.',
      s5_title:     '5. Your Rights',
      s5_body:      'You have the right to access, correct, or delete your data at any time. Contact us at <a href="mailto:support@sozolabs.com">support@sozolabs.com</a>. Deleting your account removes all your data from our servers within 30 days.',
      s6_title:     '6. Children',
      s6_body:      '3Dcalc+ is not directed at children under 13. We do not knowingly collect data from minors.',
      s7_title:     '7. Changes to This Policy',
      s7_body:      'We may update this policy occasionally. If changes are significant, we will notify you within the app.',
      s8_title:     '8. Contact',
      s8_body:      'For any questions about this policy, contact us at <a href="mailto:support@sozolabs.com">support@sozolabs.com</a>.',
    },
    terms: {
      badge:        'Legal',
      title:        'Terms of Use',
      updated:      'Last updated: April 1, 2026',
      intro:        'By downloading or using 3Dcalc+, you agree to these Terms of Use. Please read them carefully.',
      s1_title:     '1. Service Description',
      s1_body:      '3Dcalc+ is a mobile application for calculating 3D printing costs and generating professional quotes. Developed by <strong>Sozolabs</strong>.',
      s2_title:     '2. License',
      s2_body:      'When you purchase 3Dcalc+, you receive a personal, non-exclusive, non-transferable license to use the app on devices linked to your App Store or Google Play account.',
      s3_title:     '3. Purchase and Payment',
      s3_body:      '3Dcalc+ is sold as a <strong>one-time payment of €2.99</strong> through the App Store (Apple) or Google Play (Google). Prices may vary by region. Purchases are managed and billed by the respective stores.',
      s4_title:     '4. Refund Policy',
      s4_body:      'Refunds are subject to the policy of the purchase platform: <a href="https://support.apple.com/en-us/118223" target="_blank" rel="noopener">App Store</a> or <a href="https://support.google.com/googleplay/answer/2479637" target="_blank" rel="noopener">Google Play</a>.',
      s5_title:     '5. Updates',
      s5_body:      'App updates are included in the one-time payment while platform support allows. Sozolabs reserves the right to release new versions with additional paid features.',
      s6_title:     '6. Limitation of Liability',
      s6_body:      'Sozolabs is not liable for commercial decisions made based on the app\'s calculations. Results are estimates based on user-provided data.',
      s7_title:     '7. Governing Law',
      s7_body:      'These terms are governed by Spanish law. Disputes shall be submitted to the courts of Spain.',
      s8_title:     '8. Contact',
      s8_body:      'For legal inquiries, contact us at <a href="mailto:support@sozolabs.com">support@sozolabs.com</a>.',
    },
    support: {
      badge:        'Help',
      title:        'Support Center',
      subtitle:     'Find answers to your questions or get in touch with us.',
      faq_label:    '— Frequently asked questions',
      faq_title:    'FAQ',
      q1:           'Can I use 3Dcalc+ for resin printing?',
      a1:           'Yes. 3Dcalc+ supports both FDM (filament) and SLA/DLP (resin) printing. You can store resin bottles with their price per milliliter and calculate costs with the same precision as filament.',
      q2:           'How does multicolor calculation work?',
      a2:           'On the calculation screen, enable the multicolor option and enter the exact grams for each color and the purge material. The app supports Bambu Lab AMS, Prusa MMU, and any multi-filament system.',
      q3:           'What does the one-time €2.99 payment include?',
      a3:           'Everything: unlimited calculations, multiple printers, PDF quotes with your logo, multicolor support, cloud sync across devices, and all future updates.',
      q4:           'How do I sync my data between devices?',
      a4:           'Sign in with the same email account on all your devices (iPhone, iPad, Android). Your printers, materials, and calculations sync automatically through the cloud.',
      q5:           'Can I add my logo to PDF quotes?',
      a5:           'Yes. In your profile settings you can upload your logo and add contact details. They will appear automatically on all quotes you generate.',
      q6:           'Is it available for Android?',
      a6:           'Yes. 3Dcalc+ is available on both the App Store (iOS/iPadOS) and Google Play (Android). Data syncs across platforms using the same account.',
      q7:           'How do I update my material prices?',
      a7:           'Go to the "Materials" or "Filaments" section in the app, select the material you want to edit, and update the price. The change applies to all new calculations.',
      q8:           'Where can I report a problem or suggestion?',
      a8:           'Email us at support@sozolabs.com. We respond within 24-48 hours on business days.',
      contact_title:   'Can\'t find what you\'re looking for?',
      contact_subtitle:'Write to us and we\'ll help you as soon as possible.',
      contact_btn:     'Contact via email',
    },
  },
};
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/onejensen/Documents/MIS WEBS/3Dcalc" && git add translations.js && git commit -m "feat: add ES/EN translations for all pages"
```

---

## Task 4: main.js — Lang switcher, FAQ, animaciones

**Files:**
- Create: `main.js`

- [ ] **Step 1: Crear main.js**

Crear `/Users/onejensen/Documents/MIS WEBS/3Dcalc/main.js`:

```javascript
/* ============================================================
   main.js — 3Dcalc+ Web
   Lang switcher | FAQ accordion | Scroll reveal | Stats counter
   ============================================================ */

// ── LANG SWITCHER ─────────────────────────────────────────────

function getLang() {
  return localStorage.getItem('lang') || 'es';
}

function applyTranslations(lang) {
  const t = window.t[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = key.split('.').reduce((obj, k) => obj?.[k], t);
    if (value === undefined) return;

    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = value;
    } else {
      el.innerHTML = value;
    }
  });

  // Update lang button label
  const btn = document.querySelector('.lang-btn');
  if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';

  // Update <html lang> attribute
  document.documentElement.lang = lang;
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
}

function toggleLang() {
  setLang(getLang() === 'es' ? 'en' : 'es');
}

// ── FAQ ACCORDION ─────────────────────────────────────────────

function initFaq() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

      // Open clicked (if it was closed)
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── SCROLL REVEAL ─────────────────────────────────────────────

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── STATS COUNTER ─────────────────────────────────────────────

function animateCounter(el) {
  const raw    = el.getAttribute('data-target');
  const suffix = el.getAttribute('data-suffix') || '';
  const num    = parseInt(raw, 10);

  if (isNaN(num)) { el.textContent = raw + suffix; return; }

  const duration = 1400; // ms
  const fps      = 60;
  const steps    = Math.round(duration / (1000 / fps));
  const increment = num / steps;
  let current = 0;
  let frame   = 0;

  const tick = () => {
    frame++;
    current = Math.min(current + increment, num);
    el.textContent = Math.floor(current).toLocaleString('es-ES') + suffix;
    if (frame < steps) requestAnimationFrame(tick);
    else el.textContent = num.toLocaleString('es-ES') + suffix;
  };

  requestAnimationFrame(tick);
}

function initStats() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
}

// ── INIT ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved/default language
  applyTranslations(getLang());

  // Wire lang toggle button
  document.querySelector('.lang-btn')
    ?.addEventListener('click', toggleLang);

  initFaq();
  initReveal();
  initStats();
});
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/onejensen/Documents/MIS WEBS/3Dcalc" && git add main.js && git commit -m "feat: add main.js - lang switcher, FAQ accordion, scroll reveal, stats counter"
```

---

## Task 5: index.html — Landing page principal

**Files:**
- Create: `index.html`

- [ ] **Step 1: Crear index.html**

Crear `/Users/onejensen/Documents/MIS WEBS/3Dcalc/index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3Dcalc+ | Impresión 3D, con números claros</title>
  <meta name="description" content="Calcula el coste exacto de tus impresiones 3D y genera presupuestos PDF profesionales. Disponible para iOS y Android.">
  <meta property="og:title" content="3Dcalc+ | Impresión 3D, con números claros">
  <meta property="og:description" content="La calculadora definitiva para makers y profesionales de la impresión 3D.">
  <meta property="og:image" content="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body class="grid-bg">

  <!-- ═══ HEADER ═══════════════════════════════════════════ -->
  <header>
    <nav>
      <a href="index.html" class="logo">
        <div class="logo-diamond"></div>
        <span class="logo-text">3DCALC<span>+</span></span>
      </a>

      <ul class="nav-links">
        <li><a href="#features"     data-i18n="nav.features">Características</a></li>
        <li><a href="#pricing"      data-i18n="nav.pricing">Precios</a></li>
        <li><a href="#faq"          data-i18n="nav.faq">FAQ</a></li>
        <li><a href="support.html"  data-i18n="nav.support">Soporte</a></li>
      </ul>

      <div class="nav-right">
        <button class="lang-btn" aria-label="Cambiar idioma">EN</button>
        <a href="#download" class="btn-nav" data-i18n="nav.download">Descargar</a>
      </div>
    </nav>
  </header>

  <main>

    <!-- ═══ HERO ═════════════════════════════════════════════ -->
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="hero-diagonal"></div>
      <div class="hero-diagonal-inner"></div>

      <div class="container hero-inner">
        <div class="hero-content">
          <div class="hero-badge reveal">
            <span data-i18n="hero.badge">Versión 2.0 disponible</span>
          </div>

          <h1 class="hero-title reveal delay-1" data-i18n="hero.title">
            Impresión 3D,<br>con <em>números claros.</em>
          </h1>

          <p class="hero-subtitle reveal delay-2" data-i18n="hero.subtitle">
            Calcula el coste real de tus impresiones en segundos. Gestiona materiales, estima el desgaste y genera presupuestos profesionales para tus clientes.
          </p>

          <div class="hero-actions reveal delay-3">
            <a href="https://apps.apple.com/es/app/3dcalc/id6752701677"
               class="btn-store btn-store-primary"
               target="_blank" rel="noopener">
              <span class="btn-store-icon"></span>
              <div>
                <span class="btn-store-label" data-i18n="hero.available">Disponible en</span>
                <span class="btn-store-name" data-i18n="hero.appstore">App Store</span>
              </div>
            </a>

            <a href="https://play.google.com/store/apps/details?id=com.sozolabs.calc3D"
               class="btn-store btn-store-secondary"
               target="_blank" rel="noopener">
              <span class="btn-store-icon">▶</span>
              <div>
                <span class="btn-store-label" data-i18n="hero.available">Disponible en</span>
                <span class="btn-store-name" data-i18n="hero.googleplay">Google Play</span>
              </div>
            </a>
          </div>

          <div class="hero-proof reveal delay-4">
            <span class="hero-stars">★★★★★</span>
            <span data-i18n="hero.proof">Más de 10.000 makers ya la usan</span>
          </div>
        </div>

        <!-- Mockup flotante -->
        <div class="hero-mockup reveal delay-2">
          <p class="mockup-label" data-i18n="mockup.total">Coste Total</p>
          <p class="mockup-total">4.52€</p>
          <div class="mockup-divider"></div>
          <div class="mockup-row">
            <span class="mockup-row-label" data-i18n="mockup.filament">Filamento</span>
            <span class="mockup-row-val">1.20€</span>
          </div>
          <div class="mockup-row">
            <span class="mockup-row-label" data-i18n="mockup.energy">Energía</span>
            <span class="mockup-row-val">0.12€</span>
          </div>
          <div class="mockup-row">
            <span class="mockup-row-label" data-i18n="mockup.labor">Mano de obra</span>
            <span class="mockup-row-val">2.40€</span>
          </div>
          <a href="#download" class="mockup-pdf-btn" data-i18n="mockup.pdf">Exportar Presupuesto PDF</a>
        </div>
      </div>
    </section>

    <!-- ═══ STATS ══════════════════════════════════════════════ -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item reveal">
            <div class="stat-value" data-target="10000" data-suffix="+">10.000+</div>
            <div class="stat-label" data-i18n="stats.users">Makers activos</div>
          </div>
          <div class="stat-item reveal delay-1">
            <div class="stat-value" data-i18n="stats.platforms">iOS · Android · iPadOS</div>
            <div class="stat-label">Plataformas</div>
          </div>
          <div class="stat-item reveal delay-2">
            <div class="stat-value">2.99€</div>
            <div class="stat-label" data-i18n="stats.price">Pago único, para siempre</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FEATURES ═══════════════════════════════════════════ -->
    <section id="features" class="features">
      <div class="container">
        <p class="section-label reveal" data-i18n="features.label">— Funcionalidades</p>
        <h2 class="section-title reveal" data-i18n="features.title">Todo lo que necesitas en una sola app</h2>
        <p class="section-subtitle reveal" data-i18n="features.subtitle">Diseñada para makers, impresores y profesionales del 3D.</p>

        <div class="bento-grid">
          <div class="bento-item featured reveal">
            <div class="bento-icon">📊</div>
            <h3 data-i18n="features.f1_title">Precisión Absoluta</h3>
            <p data-i18n="features.f1_desc">Calcula filamento monocolor o multicolor, resina, energía eléctrica por región y mano de obra. Sin estimaciones: costes reales.</p>
          </div>

          <div class="bento-item reveal delay-1">
            <div class="bento-icon">📄</div>
            <h3 data-i18n="features.f2_title">Presupuestos PDF</h3>
            <p data-i18n="features.f2_desc">Genera presupuestos PDF profesionales con tu logo y datos listos para enviar a tus clientes en un solo clic.</p>
          </div>

          <div class="bento-item reveal delay-2">
            <div class="bento-icon">☁️</div>
            <h3 data-i18n="features.f3_title">Sync en la Nube</h3>
            <p data-i18n="features.f3_desc">Tus impresoras y materiales sincronizados entre iPhone, iPad y Android de forma instantánea.</p>
          </div>

          <div class="bento-item reveal delay-3">
            <div class="bento-icon">🌈</div>
            <h3 data-i18n="features.f4_title">Multicolor AMS/MMU</h3>
            <p data-i18n="features.f4_desc">Soporte para Bambu Lab AMS y Prusa MMU. Desglose exacto por color y purgado.</p>
          </div>

          <div class="bento-item reveal delay-4">
            <div class="bento-icon">🖨️</div>
            <h3 data-i18n="features.f5_title">Inventario</h3>
            <p data-i18n="features.f5_desc">Gestiona todas tus impresoras y materiales personalizados en un solo lugar.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ HOW IT WORKS ════════════════════════════════════════ -->
    <section id="how-it-works" class="how-it-works">
      <div class="container">
        <p class="section-label reveal" data-i18n="steps.label">— Así de sencillo</p>
        <h2 class="section-title reveal" data-i18n="steps.title">¿Cómo funciona?</h2>

        <div class="steps-grid">
          <div class="step reveal">
            <div class="step-num">1</div>
            <h4 data-i18n="steps.s1_title">Configura</h4>
            <p data-i18n="steps.s1_desc">Añade tu impresora y el precio de tu filamento o resina.</p>
          </div>
          <div class="step reveal delay-1">
            <div class="step-num">2</div>
            <h4 data-i18n="steps.s2_title">Calcula</h4>
            <p data-i18n="steps.s2_desc">Introduce el peso y el tiempo de impresión de tu slicer.</p>
          </div>
          <div class="step reveal delay-2">
            <div class="step-num">3</div>
            <h4 data-i18n="steps.s3_title">Presupuesta</h4>
            <p data-i18n="steps.s3_desc">Añade tu margen de beneficio y exporta el presupuesto PDF.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ TESTIMONIALS ════════════════════════════════════════ -->
    <section id="testimonials" class="testimonials">
      <div class="container">
        <p class="section-label reveal" data-i18n="testimonials.label">— Opiniones reales</p>
        <h2 class="section-title reveal" data-i18n="testimonials.title">Lo que dicen los makers</h2>

        <div class="testimonials-grid">
          <div class="testimonial-card reveal">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text" data-i18n="testimonials.t1_text">"La mejor app para calcular costes..."</p>
            <div class="testimonial-author">
              <img src="https://i.pravatar.cc/100?img=11" alt="Carlos M." class="author-avatar" loading="lazy">
              <div>
                <p class="author-name" data-i18n="testimonials.t1_name">Carlos M.</p>
                <p class="author-role" data-i18n="testimonials.t1_role">Granja de Impresión 3D</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card reveal delay-1">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text" data-i18n="testimonials.t2_text">"La función multicolor es increíble..."</p>
            <div class="testimonial-author">
              <img src="https://i.pravatar.cc/100?img=5" alt="Laura G." class="author-avatar" loading="lazy">
              <div>
                <p class="author-name" data-i18n="testimonials.t2_name">Laura G.</p>
                <p class="author-role" data-i18n="testimonials.t2_role">Diseñadora 3D</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card reveal delay-2">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text" data-i18n="testimonials.t3_text">"Sencilla, directa y sin complicaciones..."</p>
            <div class="testimonial-author">
              <img src="https://i.pravatar.cc/100?img=8" alt="David R." class="author-avatar" loading="lazy">
              <div>
                <p class="author-name" data-i18n="testimonials.t3_name">David R.</p>
                <p class="author-role" data-i18n="testimonials.t3_role">Maker Hobbyista</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ PRICING ═════════════════════════════════════════════ -->
    <section id="pricing" class="pricing">
      <div class="container">
        <p class="section-label reveal" data-i18n="pricing.label">— Sin sorpresas</p>
        <h2 class="section-title reveal" data-i18n="pricing.title">Una herramienta profesional,<br>por el precio de un café.</h2>

        <div class="pricing-card reveal">
          <div class="pricing-badge" data-i18n="pricing.badge">PAGO ÚNICO</div>
          <div class="pricing-price">
            <sup data-i18n="pricing.currency">€</sup><span data-i18n="pricing.price">2.99</span>
          </div>
          <p class="pricing-desc" data-i18n="pricing.desc">Sin suscripciones. Sin cargos ocultos. Actualizaciones incluidas.</p>

          <ul class="pricing-features">
            <li><span class="check">✓</span><span data-i18n="pricing.f1">Cálculos ilimitados y múltiples impresoras</span></li>
            <li><span class="check">✓</span><span data-i18n="pricing.f2">Presupuestos PDF con tu logo exportables</span></li>
            <li><span class="check">✓</span><span data-i18n="pricing.f3">Soporte multicolor (AMS / MMU)</span></li>
            <li><span class="check">✓</span><span data-i18n="pricing.f4">Sincronización en la nube entre dispositivos</span></li>
            <li><span class="check">✓</span><span data-i18n="pricing.f5">Cálculo de energía, resina y costes extra</span></li>
            <li><span class="check">✓</span><span data-i18n="pricing.f6">Actualizaciones futuras incluidas</span></li>
          </ul>

          <a href="#download" class="btn-primary" data-i18n="pricing.cta">Descargar ahora</a>
        </div>
      </div>
    </section>

    <!-- ═══ DOWNLOAD CTA ═════════════════════════════════════════ -->
    <section id="download" class="download-cta">
      <div class="download-cta-glow"></div>
      <div class="container" style="position:relative;">
        <h2 class="reveal" data-i18n="download.title">Lleva tu taller al siguiente nivel</h2>
        <p class="reveal delay-1" data-i18n="download.subtitle">Disponible para todos tus dispositivos. Sincroniza tus datos y nunca pierdas un presupuesto.</p>

        <div class="store-buttons reveal delay-2">
          <a href="https://apps.apple.com/es/app/3dcalc/id6752701677"
             class="btn-store btn-store-primary"
             target="_blank" rel="noopener">
            <span class="btn-store-icon"></span>
            <div>
              <span class="btn-store-label" data-i18n="hero.available">Disponible en</span>
              <span class="btn-store-name" data-i18n="hero.appstore">App Store</span>
            </div>
          </a>

          <a href="https://play.google.com/store/apps/details?id=com.sozolabs.calc3D"
             class="btn-store btn-store-secondary"
             target="_blank" rel="noopener">
            <span class="btn-store-icon">▶</span>
            <div>
              <span class="btn-store-label" data-i18n="hero.available">Disponible en</span>
              <span class="btn-store-name" data-i18n="hero.googleplay">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </section>

  </main>

  <!-- ═══ FOOTER ═════════════════════════════════════════════ -->
  <footer>
    <div class="container">
      <div class="footer-inner">
        <div class="footer-logo">3DCALC<span>+</span></div>
        <p class="footer-copy" data-i18n="footer.copy">© 2026 Sozolabs</p>
        <nav class="footer-links">
          <a href="privacy.html" data-i18n="footer.privacy">Política de Privacidad</a>
          <a href="terms.html"   data-i18n="footer.terms">Términos de Uso</a>
          <a href="support.html" data-i18n="footer.support">Soporte</a>
        </nav>
      </div>
    </div>
  </footer>

  <script src="translations.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar en navegador**

Abrir en el navegador:

```bash
open "/Users/onejensen/Documents/MIS WEBS/3Dcalc/index.html"
```

Verificar:
- La página carga con fondo oscuro y acento naranja
- El hero muestra el título "Impresión 3D, con números claros." con "números claros" en naranja
- Los botones App Store y Google Play son visibles
- El botón `EN` en el nav cambia todos los textos al inglés al hacer click
- Las secciones stats, features, steps, testimonials y pricing son visibles
- Las animaciones de scroll funcionan al desplazarse

- [ ] **Step 3: Commit**

```bash
cd "/Users/onejensen/Documents/MIS WEBS/3Dcalc" && git add index.html && git commit -m "feat: add landing page index.html"
```

---

## Task 6: privacy.html — Política de Privacidad

**Files:**
- Create: `privacy.html`

- [ ] **Step 1: Crear privacy.html**

Crear `/Users/onejensen/Documents/MIS WEBS/3Dcalc/privacy.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3Dcalc+ | Política de Privacidad</title>
  <meta name="robots" content="noindex">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body class="grid-bg">

  <header>
    <nav>
      <a href="index.html" class="logo">
        <div class="logo-diamond"></div>
        <span class="logo-text">3DCALC<span>+</span></span>
      </a>
      <ul class="nav-links">
        <li><a href="index.html#features" data-i18n="nav.features">Características</a></li>
        <li><a href="index.html#pricing"  data-i18n="nav.pricing">Precios</a></li>
        <li><a href="support.html"        data-i18n="nav.support">Soporte</a></li>
      </ul>
      <div class="nav-right">
        <button class="lang-btn" aria-label="Cambiar idioma">EN</button>
        <a href="index.html#download" class="btn-nav" data-i18n="nav.download">Descargar</a>
      </div>
    </nav>
  </header>

  <main>
    <div class="page-hero">
      <div class="page-hero-glow"></div>
      <div class="container">
        <p class="section-label" data-i18n="privacy.badge">Legal</p>
        <h1 data-i18n="privacy.title">Política de Privacidad</h1>
        <p data-i18n="privacy.updated">Última actualización: 1 de abril de 2026</p>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="page-content">
          <p data-i18n="privacy.intro"></p>

          <h2 data-i18n="privacy.s1_title"></h2>
          <p data-i18n="privacy.s1_body"></p>

          <h2 data-i18n="privacy.s2_title"></h2>
          <p data-i18n="privacy.s2_body"></p>
          <ul data-i18n="privacy.s2_list"></ul>

          <h2 data-i18n="privacy.s3_title"></h2>
          <p data-i18n="privacy.s3_body"></p>
          <ul data-i18n="privacy.s3_list"></ul>

          <h2 data-i18n="privacy.s4_title"></h2>
          <p data-i18n="privacy.s4_body"></p>

          <h2 data-i18n="privacy.s5_title"></h2>
          <p data-i18n="privacy.s5_body"></p>

          <h2 data-i18n="privacy.s6_title"></h2>
          <p data-i18n="privacy.s6_body"></p>

          <h2 data-i18n="privacy.s7_title"></h2>
          <p data-i18n="privacy.s7_body"></p>

          <h2 data-i18n="privacy.s8_title"></h2>
          <p data-i18n="privacy.s8_body"></p>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-inner">
        <div class="footer-logo">3DCALC<span>+</span></div>
        <p class="footer-copy" data-i18n="footer.copy">© 2026 Sozolabs</p>
        <nav class="footer-links">
          <a href="privacy.html" data-i18n="footer.privacy">Política de Privacidad</a>
          <a href="terms.html"   data-i18n="footer.terms">Términos de Uso</a>
          <a href="support.html" data-i18n="footer.support">Soporte</a>
        </nav>
      </div>
    </div>
  </footer>

  <script src="translations.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar en navegador**

```bash
open "/Users/onejensen/Documents/MIS WEBS/3Dcalc/privacy.html"
```

Verificar: el contenido legal se muestra en español; al hacer click en `EN` cambia al inglés.

- [ ] **Step 3: Commit**

```bash
cd "/Users/onejensen/Documents/MIS WEBS/3Dcalc" && git add privacy.html && git commit -m "feat: add privacy policy page"
```

---

## Task 7: terms.html — Términos de Uso

**Files:**
- Create: `terms.html`

- [ ] **Step 1: Crear terms.html**

Crear `/Users/onejensen/Documents/MIS WEBS/3Dcalc/terms.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3Dcalc+ | Términos de Uso</title>
  <meta name="robots" content="noindex">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body class="grid-bg">

  <header>
    <nav>
      <a href="index.html" class="logo">
        <div class="logo-diamond"></div>
        <span class="logo-text">3DCALC<span>+</span></span>
      </a>
      <ul class="nav-links">
        <li><a href="index.html#features" data-i18n="nav.features">Características</a></li>
        <li><a href="index.html#pricing"  data-i18n="nav.pricing">Precios</a></li>
        <li><a href="support.html"        data-i18n="nav.support">Soporte</a></li>
      </ul>
      <div class="nav-right">
        <button class="lang-btn" aria-label="Cambiar idioma">EN</button>
        <a href="index.html#download" class="btn-nav" data-i18n="nav.download">Descargar</a>
      </div>
    </nav>
  </header>

  <main>
    <div class="page-hero">
      <div class="page-hero-glow"></div>
      <div class="container">
        <p class="section-label" data-i18n="terms.badge">Legal</p>
        <h1 data-i18n="terms.title">Términos de Uso</h1>
        <p data-i18n="terms.updated">Última actualización: 1 de abril de 2026</p>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="page-content">
          <p data-i18n="terms.intro"></p>

          <h2 data-i18n="terms.s1_title"></h2>
          <p data-i18n="terms.s1_body"></p>

          <h2 data-i18n="terms.s2_title"></h2>
          <p data-i18n="terms.s2_body"></p>

          <h2 data-i18n="terms.s3_title"></h2>
          <p data-i18n="terms.s3_body"></p>

          <h2 data-i18n="terms.s4_title"></h2>
          <p data-i18n="terms.s4_body"></p>

          <h2 data-i18n="terms.s5_title"></h2>
          <p data-i18n="terms.s5_body"></p>

          <h2 data-i18n="terms.s6_title"></h2>
          <p data-i18n="terms.s6_body"></p>

          <h2 data-i18n="terms.s7_title"></h2>
          <p data-i18n="terms.s7_body"></p>

          <h2 data-i18n="terms.s8_title"></h2>
          <p data-i18n="terms.s8_body"></p>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-inner">
        <div class="footer-logo">3DCALC<span>+</span></div>
        <p class="footer-copy" data-i18n="footer.copy">© 2026 Sozolabs</p>
        <nav class="footer-links">
          <a href="privacy.html" data-i18n="footer.privacy">Política de Privacidad</a>
          <a href="terms.html"   data-i18n="footer.terms">Términos de Uso</a>
          <a href="support.html" data-i18n="footer.support">Soporte</a>
        </nav>
      </div>
    </div>
  </footer>

  <script src="translations.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar en navegador**

```bash
open "/Users/onejensen/Documents/MIS WEBS/3Dcalc/terms.html"
```

Verificar: los 8 artículos se muestran correctamente en ES y EN.

- [ ] **Step 3: Commit**

```bash
cd "/Users/onejensen/Documents/MIS WEBS/3Dcalc" && git add terms.html && git commit -m "feat: add terms of use page"
```

---

## Task 8: support.html — Soporte y FAQ

**Files:**
- Create: `support.html`

- [ ] **Step 1: Crear support.html**

Crear `/Users/onejensen/Documents/MIS WEBS/3Dcalc/support.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3Dcalc+ | Soporte</title>
  <meta name="description" content="Centro de soporte de 3Dcalc+. Encuentra respuestas a tus preguntas o contacta con el equipo.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body class="grid-bg">

  <header>
    <nav>
      <a href="index.html" class="logo">
        <div class="logo-diamond"></div>
        <span class="logo-text">3DCALC<span>+</span></span>
      </a>
      <ul class="nav-links">
        <li><a href="index.html#features" data-i18n="nav.features">Características</a></li>
        <li><a href="index.html#pricing"  data-i18n="nav.pricing">Precios</a></li>
        <li><a href="support.html"        data-i18n="nav.support">Soporte</a></li>
      </ul>
      <div class="nav-right">
        <button class="lang-btn" aria-label="Cambiar idioma">EN</button>
        <a href="index.html#download" class="btn-nav" data-i18n="nav.download">Descargar</a>
      </div>
    </nav>
  </header>

  <main>
    <div class="page-hero">
      <div class="page-hero-glow"></div>
      <div class="container">
        <p class="section-label" data-i18n="support.badge">Ayuda</p>
        <h1 data-i18n="support.title">Centro de Soporte</h1>
        <p data-i18n="support.subtitle">Encuentra respuesta a tus preguntas o contacta con nosotros.</p>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="page-content">

          <p class="section-label" style="text-align:left;margin-bottom:8px;" data-i18n="support.faq_label">— Preguntas frecuentes</p>
          <h2 style="color:var(--text-primary);margin-top:0;" data-i18n="support.faq_title">FAQ</h2>

          <div class="faq-list" style="margin-top:24px;">

            <div class="faq-item">
              <div class="faq-question">
                <span data-i18n="support.q1">¿Puedo usar 3Dcalc+ para impresión en resina?</span>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-answer">
                <p data-i18n="support.a1"></p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <span data-i18n="support.q2">¿Cómo funciona el cálculo multicolor?</span>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-answer">
                <p data-i18n="support.a2"></p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <span data-i18n="support.q3">¿Qué incluye el pago único de 2.99€?</span>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-answer">
                <p data-i18n="support.a3"></p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <span data-i18n="support.q4">¿Cómo sincronizo mis datos entre dispositivos?</span>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-answer">
                <p data-i18n="support.a4"></p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <span data-i18n="support.q5">¿Puedo añadir mi logo a los presupuestos PDF?</span>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-answer">
                <p data-i18n="support.a5"></p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <span data-i18n="support.q6">¿Está disponible para Android?</span>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-answer">
                <p data-i18n="support.a6"></p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <span data-i18n="support.q7">¿Cómo actualizo los precios de mis materiales?</span>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-answer">
                <p data-i18n="support.a7"></p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <span data-i18n="support.q8">¿Dónde puedo reportar un problema o sugerencia?</span>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-answer">
                <p data-i18n="support.a8"></p>
              </div>
            </div>

          </div><!-- /faq-list -->

          <!-- Contacto -->
          <div class="contact-card">
            <h3 data-i18n="support.contact_title">¿No encuentras lo que buscas?</h3>
            <p data-i18n="support.contact_subtitle">Escríbenos y te ayudamos lo antes posible.</p>
            <a href="mailto:support@sozolabs.com" class="btn-contact" data-i18n="support.contact_btn">Contactar por email</a>
          </div>

        </div>
      </div>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-inner">
        <div class="footer-logo">3DCALC<span>+</span></div>
        <p class="footer-copy" data-i18n="footer.copy">© 2026 Sozolabs</p>
        <nav class="footer-links">
          <a href="privacy.html" data-i18n="footer.privacy">Política de Privacidad</a>
          <a href="terms.html"   data-i18n="footer.terms">Términos de Uso</a>
          <a href="support.html" data-i18n="footer.support">Soporte</a>
        </nav>
      </div>
    </div>
  </footer>

  <script src="translations.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar en navegador**

```bash
open "/Users/onejensen/Documents/MIS WEBS/3Dcalc/support.html"
```

Verificar:
- Las 8 preguntas del FAQ se muestran
- Al hacer click en una pregunta se expande con animación suave
- Al hacer click en otra pregunta, la anterior se cierra
- El botón "Contactar por email" abre el cliente de correo con `mailto:support@sozolabs.com`
- El selector `EN` traduce todo el contenido

- [ ] **Step 3: Commit**

```bash
cd "/Users/onejensen/Documents/MIS WEBS/3Dcalc" && git add support.html && git commit -m "feat: add support/FAQ page with contact section"
```

---

## Task 9: Verificación final y memoria del proyecto

**Files:** ninguno nuevo

- [ ] **Step 1: Verificar estructura de archivos**

```bash
ls -la "/Users/onejensen/Documents/MIS WEBS/3Dcalc/"
```

Esperado — deben existir estos archivos:
```
assets/logo.png
docs/
index.html
main.js
privacy.html
styles.css
support.html
terms.html
translations.js
.gitignore
```

- [ ] **Step 2: Verificar git log**

```bash
cd "/Users/onejensen/Documents/MIS WEBS/3Dcalc" && git log --oneline
```

Esperado — mínimo 7 commits (uno por tarea).

- [ ] **Step 3: Abrir landing en navegador y verificar checklist completo**

```bash
open "/Users/onejensen/Documents/MIS WEBS/3Dcalc/index.html"
```

Checklist de verificación manual:
- [ ] Fondo oscuro `#0d0d0d` con grid técnico naranja sutil visible
- [ ] Acento diagonal naranja en esquina superior derecha del hero
- [ ] Header sticky con gradiente naranja-rojo-morado en top de 3px
- [ ] Logo `3DCALC+` con `+` en naranja y diamante
- [ ] Hero title enorme: "Impresión 3D, con *números claros.*"
- [ ] `em` en naranja (números claros)
- [ ] Botones App Store (naranja sólido) y Google Play (glassmorphism) con URLs correctas
- [ ] Mockup flotante con animación float
- [ ] Sección stats visible
- [ ] Bento grid de features: featured card ocupa ancho completo
- [ ] Pasos 1-2-3 con números en círculo naranja y línea conectora
- [ ] Testimonials en 3 columnas
- [ ] Pricing card con badge "PAGO ÚNICO" y precio 2.99€
- [ ] Selector EN cambia todos los textos al inglés
- [ ] Footer con links a privacy.html, terms.html, support.html
- [ ] Privacy y terms muestran el contenido legal completo
- [ ] FAQ en support.html funciona (accordion abre/cierra)
- [ ] Responsive: en < 768px el nav se simplifica y las grids pasan a columna única

- [ ] **Step 4: Commit final**

```bash
cd "/Users/onejensen/Documents/MIS WEBS/3Dcalc" && git add -A && git commit -m "chore: final verification - web corporativa 3Dcalc+ complete"
```

---

## Notas de implementación

- En la sección stats de index.html, el label "Plataformas" debajo de "iOS · Android · iPadOS" está hardcodeado en español. Si quieres traducirlo: añade `stats.platforms_label: 'Plataformas'` / `'Platforms'` en translations.js y añade `data-i18n="stats.platforms_label"` al elemento `<div class="stat-label">Plataformas</div>`.
- El email `support@sozolabs.com` aparece en privacy.html, terms.html y support.html (en translations.js). Si el email real es diferente, actualizar en `translations.js` en ambos idiomas (`es` y `en`) buscando `support@sozolabs.com`.
- El stat de "10.000+" usuarios usa el contador animado JS (`data-target="10000" data-suffix="+"`). El segundo stat (`iOS · Android · iPadOS`) no tiene `data-target` así que no anima — correcto, es texto.
- Los avatares de testimonials usan `https://i.pravatar.cc` que requiere conexión a internet. Son adecuados como placeholder permanente o para sustituir por fotos reales.
- Si en el futuro se añade una cuenta de redes sociales, los links van en el footer entre `.footer-copy` y `.footer-links`.
