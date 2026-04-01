/* ============================================================
   main.js — 3Dcalc+ Web
   Lang switcher | FAQ accordion | Scroll reveal | Stats counter | Mobile nav
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

// ── MOBILE NAV ────────────────────────────────────────────────

function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded',
      nav.classList.contains('nav-open') ? 'true' : 'false'
    );
  });

  // Close nav when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
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

  initMobileNav();
  initFaq();
  initReveal();
  initStats();
});
