// build-i18n.mjs — generate static per-language homepages (/en/, /de/, …) from
// index.html + translations.js, with the translated content baked into the HTML
// (so search engines and AI crawlers index each language without running JS).
//
// Run from the repo root:  node build-i18n.mjs
// Re-run whenever index.html or translations.js change, BEFORE committing/pushing.
// The Spanish homepage stays at / (this script never touches index.html).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const ORIGIN = 'https://www.3dcalc.app';
const LANGS = ['en', 'ca', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'cs', 'fi', 'ru']; // es stays at /
const LOCALE = {
  es: 'es_ES', en: 'en_US', ca: 'ca_ES', fr: 'fr_FR', de: 'de_DE', it: 'it_IT',
  pt: 'pt_PT', nl: 'nl_NL', pl: 'pl_PL', cs: 'cs_CZ', fi: 'fi_FI', ru: 'ru_RU',
};

// hreflang cluster shared by every page (root = es + x-default, others = /xx/).
const HREFLANG = [
  '  <link rel="alternate" hreflang="es" href="' + ORIGIN + '/">',
  ...LANGS.map((l) => '  <link rel="alternate" hreflang="' + l + '" href="' + ORIGIN + '/' + l + '/">'),
  '  <link rel="alternate" hreflang="x-default" href="' + ORIGIN + '/">',
].join('\n');

const t = (new Function('window', readFileSync('translations.js', 'utf8') + '; return window.t;'))({});

const get = (dict, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);

// Find the index of the </tag> that closes the element opened at `start` (nesting-aware).
function findClose(html, tag, start) {
  const open = new RegExp('<' + tag + '\\b', 'g');
  const close = new RegExp('</' + tag + '\\s*>', 'g');
  let depth = 1, i = start;
  while (i < html.length) {
    open.lastIndex = i; close.lastIndex = i;
    const o = open.exec(html); const c = close.exec(html);
    if (!c) return -1;
    if (o && o.index < c.index) { depth++; i = o.index + 1; }
    else { depth--; if (depth === 0) return c.index; i = c.index + 1; }
  }
  return -1;
}

// Replace the innerHTML of every [data-i18n] element with its translation (like the
// browser's applyTranslations, but at build time). Missing keys keep the source text.
function applyI18n(html, dict) {
  const re = /<([a-zA-Z][\w-]*)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>/g;
  let out = '', last = 0, m, missing = 0;
  while ((m = re.exec(html)) !== null) {
    const tag = m[1], key = m[2];
    const openEnd = m.index + m[0].length;
    const val = get(dict, key);
    const close = findClose(html, tag, openEnd);
    if (val === undefined || close < 0) { if (val === undefined) missing++; continue; }
    out += html.slice(last, openEnd) + val;
    last = close;
    re.lastIndex = close; // skip the (replaced) inner content
  }
  out += html.slice(last);
  return { html: out, missing };
}

const src = readFileSync('index.html', 'utf8');
let total = 0;

for (const lang of LANGS) {
  const dict = t[lang];
  if (!dict) { console.log('SKIP', lang, '(no translations)'); continue; }
  const meta = dict.meta || {};
  const title = meta.title || '';
  const desc = (meta.description || '').replace(/"/g, '&quot;');

  let { html, missing } = applyI18n(src, dict);

  // <html lang> + the inline lang script
  html = html.replace(/<html lang="es">/, '<html lang="' + lang + '">');
  html = html.replace(
    /<script>\(function\(\)\{var q=new URLSearchParams\(location\.search\)\.get\('lang'\);[\s\S]*?<\/script>/,
    "<script>document.documentElement.lang='" + lang + "';</script>",
  );
  // Remove the root-only ?lang self-canonical script (this page self-canonicalises statically).
  html = html.replace(/\s*<script>\s*\/\/ Self-canonical per language:[\s\S]*?<\/script>/, '');

  // Head meta → translated + per-language URLs
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>' + title + '</title>');
  html = html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + desc + '">');
  html = html.replace(/<meta property="og:title"\s+content="[^"]*">/, '<meta property="og:title"       content="' + title + '">');
  html = html.replace(/<meta property="og:description"\s+content="[^"]*">/, '<meta property="og:description" content="' + desc + '">');
  html = html.replace(/<meta name="twitter:title"\s+content="[^"]*">/, '<meta name="twitter:title"       content="' + title + '">');
  html = html.replace(/<meta name="twitter:description"\s+content="[^"]*">/, '<meta name="twitter:description" content="' + desc + '">');
  html = html.replace(/<meta property="og:locale"\s+content="es_ES">/, '<meta property="og:locale"      content="' + LOCALE[lang] + '">');
  html = html.replace(/<link rel="canonical" href="https:\/\/www\.3dcalc\.app\/">/, '<link rel="canonical" href="' + ORIGIN + '/' + lang + '/">');
  html = html.replace(/<meta property="og:url"\s+content="https:\/\/www\.3dcalc\.app\/">/, '<meta property="og:url"         content="' + ORIGIN + '/' + lang + '/">');

  // hreflang block → /xx/ cluster
  html = html.replace(/\s*<!-- hreflang:[\s\S]*?<link rel="alternate" hreflang="x-default"[^>]*>/, '\n\n' + HREFLANG);

  // Relative paths → root-absolute (so they resolve from /<lang>/)
  html = html
    .replace(/(src|href)="assets\//g, '$1="/assets/')
    .replace(/href="styles\.css"/g, 'href="/styles.css"')
    .replace(/src="translations\.js"/g, 'src="/translations.js"')
    .replace(/src="main\.js"/g, 'src="/main.js"')
    .replace(/href="(privacy|terms|support|guia-costes-impresion-3d|cuanto-cuesta-imprimir-en-3d|consumo-electrico-impresora-3d)\.html/g, 'href="/$1.html')
    .replace(/href="index\.html#/g, 'href="/#')
    .replace(/href="index\.html"/g, 'href="/"');

  mkdirSync(lang, { recursive: true });
  writeFileSync(lang + '/index.html', html);
  total++;
  console.log('wrote ' + lang + '/index.html' + (missing ? '  (' + missing + ' keys fell back to ES)' : ''));
}
console.log('\nGenerated ' + total + ' language homepages.');
