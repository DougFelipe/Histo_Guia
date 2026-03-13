import type {
  HeaderNavConfig,
  StudyModuleDefinition,
  StudyModuleId,
} from '../types';

const DEFAULT_ENABLED_STUDY_MODULE_IDS: StudyModuleId[] = [
  'questoes-teoricas',
  'flashcards-teoricos',
  'glossario',
];

const STUDY_MODULES: StudyModuleDefinition[] = [
  {
    id: 'questoes-teoricas',
    title: 'Questões Teóricas',
    description:
      'Explore questões organizadas por tema com explicações detalhadas e feedback interativo.',
    primaryPath: '/questoes-teoricas',
    paths: ['/questoes-teoricas'],
    sitemapPaths: ['/questoes-teoricas'],
    showInHome: true,
    showInHeader: true,
    showInSitemap: true,
    headerGroup: 'main',
    iconKey: 'brain',
    homeGradientClass: 'bg-gradient-to-r from-purple-500 to-violet-600',
    homeMetrics: [
      { value: '15+', label: 'Temas' },
      { value: '200+', label: 'Questões' },
      { value: '100%', label: 'Explicado' },
    ],
    sitemapTopics: [
      'Tecido Epitelial',
      'Tecido Conjuntivo',
      'Tecido Muscular',
      'Tecido Nervoso',
      'Sistema Circulatório',
    ],
  },
  {
    id: 'questoes-praticas',
    title: 'Questões Práticas',
    description:
      'Analise lâminas histológicas em alta definição e teste seus conhecimentos práticos.',
    primaryPath: '/questoes-praticas',
    paths: ['/questoes-praticas'],
    sitemapPaths: ['/questoes-praticas'],
    showInHome: true,
    showInHeader: true,
    showInSitemap: true,
    headerGroup: 'main',
    iconKey: 'microscope',
    homeGradientClass: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    homeMetrics: [
      { value: '15+', label: 'Temas' },
      { value: '250+', label: 'Lâminas' },
      { value: 'HD', label: 'Imagens' },
    ],
    sitemapTopics: [
      'Tecido Conjuntivo',
      'Tecido Epitelial',
      'Tecido Muscular',
      'Tecido Nervoso',
      'Sistema Circulatório',
      'Cartilagem',
    ],
  },
  {
    id: 'flashcards-teoricos',
    title: 'Flashcards Teóricos',
    description:
      'Estude conceitos fundamentais com flashcards interativos e animações dinâmicas.',
    primaryPath: '/flashcards/teoricos',
    paths: ['/flashcards/teoricos'],
    sitemapPaths: ['/flashcards/teoricos'],
    showInHome: true,
    showInHeader: true,
    showInSitemap: true,
    headerGroup: 'flashcards',
    iconKey: 'layers',
    homeGradientClass: 'bg-gradient-to-r from-rose-500 to-pink-600',
    homeMetrics: [
      { value: '15+', label: 'Temas' },
      { value: '100+', label: 'Cards' },
      { value: 'Flip', label: 'Animação' },
    ],
    sitemapTopics: [
      'Conceitos Fundamentais',
      'Tipos de Tecidos',
      'Células e Estruturas',
      'Funções Histológicas',
    ],
  },
  {
    id: 'flashcards-praticos',
    title: 'Flashcards Práticos',
    description:
      'Identifique estruturas histológicas em lâminas reais com flashcards visuais interativos.',
    primaryPath: '/flashcards/praticos',
    paths: ['/flashcards/praticos'],
    sitemapPaths: ['/flashcards/praticos'],
    showInHome: true,
    showInHeader: true,
    showInSitemap: true,
    headerGroup: 'flashcards',
    iconKey: 'zap',
    homeGradientClass: 'bg-gradient-to-r from-amber-500 to-orange-600',
    homeMetrics: [
      { value: '6+', label: 'Temas' },
      { value: '50+', label: 'Lâminas' },
      { value: 'Visual', label: 'Interativo' },
    ],
    sitemapTopics: [
      'Identificação Visual',
      'Estruturas Microscópicas',
      'Lâminas Histológicas',
      'Análise Prática',
    ],
  },
  {
    id: 'simulado-pratico',
    title: 'Simulado Prático',
    description:
      'Simule uma avaliação prática real com cronômetro e análise detalhada de desempenho.',
    primaryPath: '/simulado/configuracao',
    paths: ['/simulado/configuracao', '/simulado/iniciar', '/simulado/resultado'],
    sitemapPaths: ['/simulado/configuracao'],
    showInHome: true,
    showInHeader: true,
    showInSitemap: true,
    headerGroup: 'main',
    iconKey: 'clock',
    homeGradientClass: 'bg-gradient-to-r from-indigo-500 to-blue-600',
    homeMetrics: [
      { value: 'Timer', label: 'Cronômetro' },
      { value: 'Auto', label: 'Avança' },
      { value: 'Score', label: 'Resultado' },
    ],
    sitemapTopics: [
      'Configuração Personalizada',
      'Timer por Questão',
      'Relatório de Desempenho',
      'Revisão Completa',
    ],
  },
  {
    id: 'glossario',
    title: 'Glossário',
    description:
      'Consulte definições e conceitos fundamentais da histologia organizados alfabeticamente.',
    primaryPath: '/glossario',
    paths: ['/glossario'],
    sitemapPaths: ['/glossario'],
    showInHome: true,
    showInHeader: true,
    showInSitemap: true,
    headerGroup: 'main',
    iconKey: 'book-open',
    homeGradientClass: 'bg-gradient-to-r from-cyan-500 to-teal-600',
    homeMetrics: [
      { value: 'A-Z', label: 'Alfabético' },
      { value: '400+', label: 'Termos' },
      { value: '60+', label: 'Categorias' },
    ],
    sitemapTopics: [
      'Termos por Categoria',
      'Busca Alfabética',
      'Definições Detalhadas',
      'Conceitos Essenciais',
    ],
  },
];

const STUDY_MODULE_ID_SET = new Set<StudyModuleId>(STUDY_MODULES.map((module) => module.id));

const STUDY_MODULE_BY_ID: Record<StudyModuleId, StudyModuleDefinition> = STUDY_MODULES.reduce(
  (accumulator, moduleDefinition) => {
    accumulator[moduleDefinition.id] = moduleDefinition;
    return accumulator;
  },
  {} as Record<StudyModuleId, StudyModuleDefinition>,
);

const normalizePathname = (pathname: string): string => {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
};

const parseEnabledStudyModuleIds = (rawModules: string | undefined): StudyModuleId[] => {
  if (!rawModules || rawModules.trim().length === 0) {
    return [...DEFAULT_ENABLED_STUDY_MODULE_IDS];
  }

  const uniqueIds = new Set<StudyModuleId>();
  const parsedIds: StudyModuleId[] = [];

  for (const rawToken of rawModules.split(',')) {
    const normalizedToken = rawToken.trim().toLowerCase() as StudyModuleId;

    if (!STUDY_MODULE_ID_SET.has(normalizedToken) || uniqueIds.has(normalizedToken)) {
      continue;
    }

    uniqueIds.add(normalizedToken);
    parsedIds.push(normalizedToken);
  }

  return parsedIds.length > 0 ? parsedIds : [...DEFAULT_ENABLED_STUDY_MODULE_IDS];
};

const ENABLED_STUDY_MODULE_IDS = parseEnabledStudyModuleIds(
  import.meta.env.VITE_ENABLED_STUDY_MODULES,
);

export const isStudyModuleId = (value: string | null | undefined): value is StudyModuleId => {
  if (!value) {
    return false;
  }
  return STUDY_MODULE_ID_SET.has(value.trim().toLowerCase() as StudyModuleId);
};

export const getStudyModules = (): StudyModuleDefinition[] => [...STUDY_MODULES];

export const getModuleById = (moduleId: StudyModuleId): StudyModuleDefinition => {
  return STUDY_MODULE_BY_ID[moduleId];
};

export const getEnabledStudyModules = (): StudyModuleDefinition[] => {
  return ENABLED_STUDY_MODULE_IDS.map((moduleId) => STUDY_MODULE_BY_ID[moduleId]);
};

export const isStudyModuleEnabled = (moduleId: StudyModuleId): boolean => {
  return ENABLED_STUDY_MODULE_IDS.includes(moduleId);
};

export const getHomeStudyModules = (): StudyModuleDefinition[] => {
  return getEnabledStudyModules().filter((module) => module.showInHome);
};

export const getHeaderNavConfig = (): HeaderNavConfig => {
  const visibleHeaderModules = getEnabledStudyModules().filter((module) => module.showInHeader);

  return {
    mainItems: visibleHeaderModules.filter((module) => module.headerGroup === 'main'),
    flashcardItems: visibleHeaderModules.filter((module) => module.headerGroup === 'flashcards'),
  };
};

export const getSitemapStudyModules = (): StudyModuleDefinition[] => {
  return getEnabledStudyModules().filter((module) => module.showInSitemap);
};

export const resolveModuleByPath = (pathname: string): StudyModuleDefinition | undefined => {
  const normalizedPath = normalizePathname(pathname);

  return STUDY_MODULES.find((module) =>
    module.paths.some((modulePath) => normalizePathname(modulePath) === normalizedPath),
  );
};

