/* ============================================================
   main.js — 3Dcalc+ Web
   Lang switcher | FAQ accordion | Scroll reveal | Stats counter | Mobile nav
   ============================================================ */

// ── LANG SWITCHER ─────────────────────────────────────────────

// The 12 supported languages (parity with the apps), native names + number locale.
const LANGUAGES = [
  { code: 'es', name: 'Español',    locale: 'es-ES' },
  { code: 'en', name: 'English',    locale: 'en-US' },
  { code: 'ca', name: 'Català',     locale: 'ca-ES' },
  { code: 'fr', name: 'Français',   locale: 'fr-FR' },
  { code: 'de', name: 'Deutsch',    locale: 'de-DE' },
  { code: 'it', name: 'Italiano',   locale: 'it-IT' },
  { code: 'pt', name: 'Português',  locale: 'pt-PT' },
  { code: 'nl', name: 'Nederlands', locale: 'nl-NL' },
  { code: 'pl', name: 'Polski',     locale: 'pl-PL' },
  { code: 'cs', name: 'Čeština',    locale: 'cs-CZ' },
  { code: 'fi', name: 'Suomi',      locale: 'fi-FI' },
  { code: 'ru', name: 'Русский',    locale: 'ru-RU' },
];

function localeFor(lang) {
  return (LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]).locale;
}

function getLang() {
  const saved = localStorage.getItem('lang');
  return LANGUAGES.some(l => l.code === saved) ? saved : 'es';
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

  // Localized aria-labels
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const value = key.split('.').reduce((obj, k) => obj?.[k], t);
    if (value !== undefined) el.setAttribute('aria-label', value);
  });

  // Reflect the active language in the dropdown
  const sel = document.querySelector('.lang-select');
  if (sel) sel.value = lang;

  // Update <html lang> attribute
  document.documentElement.lang = lang;

  // Re-format counters already animated (3.000+ vs 3,000+)
  const locale = localeFor(lang);
  document.querySelectorAll('[data-target]').forEach(el => {
    if (!el.dataset.counted) return;
    const num = parseInt(el.getAttribute('data-target'), 10);
    if (!isNaN(num)) {
      el.textContent = num.toLocaleString(locale) + (el.getAttribute('data-suffix') || '');
    }
  });
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
}

/** Fill the language dropdown with the 12 options. */
function initLangSelect() {
  const sel = document.querySelector('.lang-select');
  if (!sel) return;
  sel.innerHTML = LANGUAGES
    .map(l => `<option value="${l.code}">${l.name}</option>`)
    .join('');
  sel.value = getLang();
  sel.addEventListener('change', () => setLang(sel.value));
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
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
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
    const locale = localeFor(getLang());
    el.textContent = Math.floor(current).toLocaleString(locale) + suffix;
    if (frame < steps) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = num.toLocaleString(locale) + suffix;
      el.dataset.counted = '1';
    }
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
  // Build the language dropdown, then apply saved/default language
  initLangSelect();
  applyTranslations(getLang());

  initMobileNav();
  initFaq();
  initReveal();
  initStats();
});
