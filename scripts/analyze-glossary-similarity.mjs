import fs from 'node:fs';
import path from 'node:path';

const GLOSSARY_PATH = path.join(process.cwd(), 'src', 'data', 'glossario', 'glossario.json');

const STOPWORDS = new Set([
  'a',
  'as',
  'ao',
  'aos',
  'de',
  'da',
  'das',
  'do',
  'dos',
  'e',
  'em',
  'na',
  'nas',
  'no',
  'nos',
  'o',
  'os',
  'para',
  'por',
  'um',
  'uma',
  'uns',
  'umas',
]);

const GENERIC_TOKENS = new Set([
  'celula',
  'tecido',
  'sistema',
  'epitelio',
  'glandula',
  'membrana',
  'camada',
  'nucleo',
  'nervo',
  'nervoso',
  'vaso',
  'vascular',
  'estrutura',
  'processo',
]);

const FAMILY_VARIANT_TOKENS = new Set([
  'tipo',
  'classe',
  'grupo',
  'zona',
  'nao',
  'não',
  'modelado',
  'queratinizado',
  'cromafim',
  'pseudoestratificado',
  'estratificado',
  'simples',
  'cilindrico',
  'cubico',
  'i',
  'ii',
  'iii',
  'iv',
  'v',
  'vi',
  'vii',
  'viii',
  'ix',
  'x',
]);

const toBasic = (value) => {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[^\p{L}\p{N}\s\-()/]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const toCollapsed = (value) => {
  return toBasic(value)
    .replace(/[()/]/g, ' ')
    .replace(/[\-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const singularize = (token) => {
  if (token.length > 5 && token.endsWith('oes')) {
    return `${token.slice(0, -3)}ao`;
  }
  if (token.length > 4 && token.endsWith('es')) {
    return token.slice(0, -2);
  }
  if (token.length > 4 && token.endsWith('s')) {
    return token.slice(0, -1);
  }
  return token;
};

const toTokens = (value) => {
  return toCollapsed(value)
    .split(' ')
    .map((token) => singularize(token))
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
};

const toContentTokens = (tokens) => {
  return tokens.filter((token) => !GENERIC_TOKENS.has(token));
};

const toFamilyBase = (value) => {
  const tokens = toTokens(value).filter((token) => !FAMILY_VARIANT_TOKENS.has(token));
  return [...new Set(tokens)].sort().join(' ');
};

const buildTrigrams = (value) => {
  const padded = `  ${value} `;
  const trigrams = new Set();
  for (let i = 0; i < padded.length - 2; i += 1) {
    trigrams.add(padded.slice(i, i + 3));
  }
  return trigrams;
};

const jaccardFromSets = (a, b) => {
  if (a.size === 0 && b.size === 0) return 1;
  let intersection = 0;
  for (const item of a) {
    if (b.has(item)) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
};

const levenshtein = (a, b) => {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) dp[i][0] = i;
  for (let j = 0; j < cols; j += 1) dp[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }

  return dp[a.length][b.length];
};

const ratioLevenshtein = (a, b) => {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const distance = levenshtein(a, b);
  return 1 - distance / maxLen;
};

const glossary = JSON.parse(fs.readFileSync(GLOSSARY_PATH, 'utf8'));
if (!Array.isArray(glossary)) {
  throw new Error('glossario.json precisa ser um array');
}

const rows = glossary.map((item, index) => {
  const term = typeof item?.termo === 'string' ? item.termo : '';
  const basic = toBasic(term);
  const collapsed = toCollapsed(term);
  const tokens = toTokens(term);
  const tokenSet = new Set(tokens);
  const contentSet = new Set(toContentTokens(tokens));
  const trigrams = buildTrigrams(collapsed);

  return {
    index,
    term,
    category: item?.categoria ?? '',
    basic,
    collapsed,
    tokenSet,
    contentSet,
    trigrams,
  };
});

const trigramIndex = new Map();
for (const row of rows) {
  for (const trigram of row.trigrams) {
    if (!trigramIndex.has(trigram)) trigramIndex.set(trigram, new Set());
    trigramIndex.get(trigram).add(row.index);
  }
}

const nearDuplicatesStrong = [];
const nearDuplicatesMedium = [];

for (const row of rows) {
  const candidateIds = new Set();
  for (const trigram of row.trigrams) {
    for (const id of trigramIndex.get(trigram) ?? []) {
      if (id > row.index) candidateIds.add(id);
    }
  }

  for (const candidateId of candidateIds) {
    const other = rows[candidateId];

    if (Math.abs(row.collapsed.length - other.collapsed.length) > 18) {
      continue;
    }

    const trigramScore = jaccardFromSets(row.trigrams, other.trigrams);
    if (trigramScore < 0.45) continue;

    const tokenScore = jaccardFromSets(row.tokenSet, other.tokenSet);
    const contentScore = jaccardFromSets(row.contentSet, other.contentSet);
    const levScore = ratioLevenshtein(row.collapsed, other.collapsed);

    const oneContainsAnother =
      row.collapsed.includes(other.collapsed) || other.collapsed.includes(row.collapsed);

    const isStrong =
      (trigramScore >= 0.72 && levScore >= 0.78 && (tokenScore >= 0.5 || contentScore >= 0.5)) ||
      (oneContainsAnother && levScore >= 0.65 && (contentScore >= 0.5 || tokenScore >= 0.7));

    const isMedium =
      !isStrong &&
      trigramScore >= 0.62 &&
      levScore >= 0.7 &&
      (tokenScore >= 0.34 || contentScore >= 0.34);

    const pair = {
      a: { index: row.index, term: row.term, category: row.category },
      b: { index: other.index, term: other.term, category: other.category },
      scores: {
        trigram: Number(trigramScore.toFixed(3)),
        levenshtein: Number(levScore.toFixed(3)),
        token: Number(tokenScore.toFixed(3)),
        content: Number(contentScore.toFixed(3)),
      },
    };

    if (isStrong) {
      nearDuplicatesStrong.push(pair);
    } else if (isMedium) {
      nearDuplicatesMedium.push(pair);
    }
  }
}

nearDuplicatesStrong.sort(
  (x, y) =>
    y.scores.trigram + y.scores.levenshtein - (x.scores.trigram + x.scores.levenshtein),
);

nearDuplicatesMedium.sort(
  (x, y) =>
    y.scores.trigram + y.scores.levenshtein - (x.scores.trigram + x.scores.levenshtein),
);

const baseKeyMap = new Map();
for (const row of rows) {
  const baseKey = row.basic
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\b(tipo|classe|grupo)\b\s*[ivx0-9]+\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!baseKey) continue;
  if (!baseKeyMap.has(baseKey)) baseKeyMap.set(baseKey, []);
  baseKeyMap.get(baseKey).push({ index: row.index, term: row.term, category: row.category });
}

const baseFamilies = [...baseKeyMap.entries()]
  .filter(([, items]) => items.length > 1)
  .filter(([, items]) => new Set(items.map((item) => item.term)).size > 1)
  .sort((a, b) => b[1].length - a[1].length);

console.log('=== Analise de Similaridade do Glossario ===');
console.log(`Total de termos: ${rows.length}`);
console.log(`Quase duplicados (forte): ${nearDuplicatesStrong.length}`);
console.log(`Quase duplicados (medio): ${nearDuplicatesMedium.length}`);
console.log(`Familias por base textual: ${baseFamilies.length}`);
console.log('');

if (nearDuplicatesStrong.length > 0) {
  console.log('--- Top quase duplicados fortes (ate 40) ---');
  for (const pair of nearDuplicatesStrong.slice(0, 40)) {
    console.log(
      `[${pair.a.index}] "${pair.a.term}"  <->  [${pair.b.index}] "${pair.b.term}"` +
        ` | trigram=${pair.scores.trigram} lev=${pair.scores.levenshtein}` +
        ` token=${pair.scores.token} content=${pair.scores.content}`,
    );
  }
  console.log('');
}

if (nearDuplicatesMedium.length > 0) {
  console.log('--- Top quase duplicados medios (ate 30) ---');
  for (const pair of nearDuplicatesMedium.slice(0, 30)) {
    console.log(
      `[${pair.a.index}] "${pair.a.term}"  <->  [${pair.b.index}] "${pair.b.term}"` +
        ` | trigram=${pair.scores.trigram} lev=${pair.scores.levenshtein}` +
        ` token=${pair.scores.token} content=${pair.scores.content}`,
    );
  }
  console.log('');
}

if (baseFamilies.length > 0) {
  console.log('--- Familias de termos-base parecidos (ate 30) ---');
  for (const [baseKey, items] of baseFamilies.slice(0, 30)) {
    console.log(`base="${baseKey}" (${items.length})`);
    for (const item of items) {
      console.log(`  - [${item.index}] ${item.term} (${item.category})`);
    }
  }
}

const allNearPairs = [...nearDuplicatesStrong, ...nearDuplicatesMedium];
const exactDuplicatePairs = [];
const familyVariantPairs = [];
const hierarchicalAliasPairs = [];
const suspiciousPairs = [];

for (const pair of allNearPairs) {
  const aCollapsed = toCollapsed(pair.a.term);
  const bCollapsed = toCollapsed(pair.b.term);
  const aFamily = toFamilyBase(pair.a.term);
  const bFamily = toFamilyBase(pair.b.term);

  const sameCollapsed = aCollapsed === bCollapsed;
  const sameFamily = aFamily.length > 0 && aFamily === bFamily;
  const oneContainsAnother = aCollapsed.includes(bCollapsed) || bCollapsed.includes(aCollapsed);

  if (sameCollapsed) {
    exactDuplicatePairs.push(pair);
    continue;
  }

  if (sameFamily) {
    familyVariantPairs.push(pair);
    continue;
  }

  if (oneContainsAnother && pair.scores.token >= 0.4) {
    hierarchicalAliasPairs.push(pair);
    continue;
  }

  suspiciousPairs.push(pair);
}

console.log('');
console.log('=== Classificacao para otimizacao da busca ===');
console.log(`Duplicata real (mesma grafia normalizada): ${exactDuplicatePairs.length}`);
console.log(`Variantes legitimas de familia: ${familyVariantPairs.length}`);
console.log(`Relacao hierarquica/alias potencial: ${hierarchicalAliasPairs.length}`);
console.log(`Pares suspeitos para revisao manual: ${suspiciousPairs.length}`);

if (suspiciousPairs.length > 0) {
  console.log('\n--- Pares suspeitos (revisar) ---');
  for (const pair of suspiciousPairs) {
    console.log(
      `[${pair.a.index}] "${pair.a.term}"  <->  [${pair.b.index}] "${pair.b.term}"` +
        ` | trigram=${pair.scores.trigram} lev=${pair.scores.levenshtein}` +
        ` token=${pair.scores.token} content=${pair.scores.content}`,
    );
  }
}
