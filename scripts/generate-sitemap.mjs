import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://histoguia.com';

const MODULE_SITEMAP_PATHS = {
  'questoes-teoricas': ['/questoes-teoricas'],
  'questoes-praticas': ['/questoes-praticas'],
  'flashcards-teoricos': ['/flashcards/teoricos'],
  'flashcards-praticos': ['/flashcards/praticos'],
  'simulado-pratico': ['/simulado/configuracao'],
  glossario: ['/glossario'],
};

const DEFAULT_ENABLED_MODULES = ['questoes-teoricas', 'flashcards-teoricos', 'glossario'];

const ROUTE_ORDER = [
  '/',
  '/questoes-teoricas',
  '/questoes-praticas',
  '/flashcards/teoricos',
  '/flashcards/praticos',
  '/simulado/configuracao',
  '/glossario',
  '/equipe',
  '/sitemap',
];

const ROUTE_META = {
  '/': { changefreq: 'weekly', priority: '1.0' },
  '/questoes-teoricas': { changefreq: 'weekly', priority: '0.9' },
  '/questoes-praticas': { changefreq: 'weekly', priority: '0.9' },
  '/flashcards/teoricos': { changefreq: 'weekly', priority: '0.8' },
  '/flashcards/praticos': { changefreq: 'weekly', priority: '0.8' },
  '/simulado/configuracao': { changefreq: 'monthly', priority: '0.7' },
  '/glossario': { changefreq: 'monthly', priority: '0.8' },
  '/equipe': { changefreq: 'monthly', priority: '0.6' },
  '/sitemap': { changefreq: 'monthly', priority: '0.5' },
};

const isKnownModuleId = (value) => {
  return Object.prototype.hasOwnProperty.call(MODULE_SITEMAP_PATHS, value);
};

const parseEnabledModules = (rawValue) => {
  if (!rawValue || rawValue.trim().length === 0) {
    return [...DEFAULT_ENABLED_MODULES];
  }

  const parsedIds = [];
  const seen = new Set();

  for (const token of rawValue.split(',')) {
    const normalizedToken = token.trim().toLowerCase();

    if (!isKnownModuleId(normalizedToken) || seen.has(normalizedToken)) {
      continue;
    }

    seen.add(normalizedToken);
    parsedIds.push(normalizedToken);
  }

  return parsedIds.length > 0 ? parsedIds : [...DEFAULT_ENABLED_MODULES];
};

const toAbsoluteUrl = (routePath) => {
  const sanitizedBaseUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;
  return `${sanitizedBaseUrl}${routePath}`;
};

const buildSitemapEntry = (routePath, lastmod) => {
  const metadata = ROUTE_META[routePath] ?? { changefreq: 'monthly', priority: '0.5' };

  return `  <url>
    <loc>${toAbsoluteUrl(routePath)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${metadata.changefreq}</changefreq>
    <priority>${metadata.priority}</priority>
  </url>`;
};

const enabledModules = parseEnabledModules(process.env.VITE_ENABLED_STUDY_MODULES);

const enabledRoutes = new Set(['/', '/equipe', '/sitemap']);
for (const moduleId of enabledModules) {
  for (const moduleRoute of MODULE_SITEMAP_PATHS[moduleId]) {
    enabledRoutes.add(moduleRoute);
  }
}

const orderedRoutes = ROUTE_ORDER.filter((routePath) => enabledRoutes.has(routePath));
const lastmod = new Date().toISOString().slice(0, 10);
const entries = orderedRoutes.map((routePath) => buildSitemapEntry(routePath, lastmod)).join('\n\n');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entries}

</urlset>
`;

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');

console.log(
  `[generate-sitemap] sitemap.xml atualizado com ${orderedRoutes.length} rotas (modulos: ${enabledModules.join(
    ', ',
  )}).`,
);

