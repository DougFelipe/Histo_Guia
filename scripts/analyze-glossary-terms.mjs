import fs from 'node:fs';
import path from 'node:path';

const GLOSSARY_PATH = path.join(process.cwd(), 'src', 'data', 'glossario', 'glossario.json');

const normalizeTerm = (value) => {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[\s\-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const stringifyItem = (item) => {
  return `- [${item.index}] termo="${item.termo}" categoria="${item.categoria}"`;
};

const loadGlossary = () => {
  const fileContent = fs.readFileSync(GLOSSARY_PATH, 'utf8');
  const parsed = JSON.parse(fileContent);

  if (!Array.isArray(parsed)) {
    throw new Error('glossario.json deve conter um array de objetos');
  }

  return parsed;
};

const glossary = loadGlossary();
const exactMap = new Map();
const normalizedMap = new Map();

const anomalies = {
  emptyTerm: [],
  leadingOrTrailingSpaces: [],
  repeatedInternalSpaces: [],
};

for (let index = 0; index < glossary.length; index += 1) {
  const item = glossary[index];
  const term = typeof item?.termo === 'string' ? item.termo : '';
  const record = {
    index,
    termo: term,
    categoria: item?.categoria ?? '',
  };

  if (!term || term.trim().length === 0) {
    anomalies.emptyTerm.push(record);
    continue;
  }

  if (term !== term.trim()) {
    anomalies.leadingOrTrailingSpaces.push(record);
  }

  if (/\s{2,}/.test(term)) {
    anomalies.repeatedInternalSpaces.push(record);
  }

  if (!exactMap.has(term)) {
    exactMap.set(term, []);
  }
  exactMap.get(term).push(record);

  const normalized = normalizeTerm(term);
  if (!normalizedMap.has(normalized)) {
    normalizedMap.set(normalized, []);
  }
  normalizedMap.get(normalized).push(record);
}

const exactDuplicates = [...exactMap.entries()]
  .filter(([, items]) => items.length > 1)
  .sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'));

const normalizedDuplicates = [...normalizedMap.entries()]
  .filter(([, items]) => items.length > 1)
  .filter(([, items]) => new Set(items.map((entry) => entry.termo)).size > 1)
  .sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'));

console.log('=== Analise do campo "termo" em glossario.json ===');
console.log(`Total de registros: ${glossary.length}`);
console.log(`Termos unicos (exatos): ${exactMap.size}`);
console.log(`Duplicados exatos: ${exactDuplicates.length}`);
console.log(`Possiveis duplicados por normalizacao: ${normalizedDuplicates.length}`);
console.log('');

if (exactDuplicates.length > 0) {
  console.log('--- Duplicados exatos ---');
  for (const [term, items] of exactDuplicates) {
    console.log(`\n"${term}" (${items.length} ocorrencias)`);
    for (const item of items) {
      console.log(stringifyItem(item));
    }
  }
} else {
  console.log('Nenhum duplicado exato encontrado.');
}

if (normalizedDuplicates.length > 0) {
  console.log('\n--- Possiveis duplicados por normalizacao ---');
  for (const [key, items] of normalizedDuplicates) {
    console.log(`\nnormalizado="${key}"`);
    for (const item of items) {
      console.log(stringifyItem(item));
    }
  }
}

console.log('\n--- Inconsistencias de formato ---');
console.log(`Termos vazios: ${anomalies.emptyTerm.length}`);
console.log(`Com espaco no inicio/fim: ${anomalies.leadingOrTrailingSpaces.length}`);
console.log(`Com espacos internos repetidos: ${anomalies.repeatedInternalSpaces.length}`);

