import fs from 'node:fs';
import path from 'node:path';

const GLOSSARY_PATH = path.join(process.cwd(), 'src', 'data', 'glossario', 'glossario.json');

const tokenize = (value) => {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2);
};

const entryScore = (entry) => {
  const definition = typeof entry?.definicao === 'string' ? entry.definicao.trim() : '';
  const tokens = tokenize(definition);
  const uniqueTokens = new Set(tokens);

  return {
    length: definition.length,
    uniqueTokenCount: uniqueTokens.size,
    tokenCount: tokens.length,
  };
};

const compareEntries = (a, b) => {
  const scoreA = entryScore(a);
  const scoreB = entryScore(b);

  if (scoreA.length !== scoreB.length) {
    return scoreB.length - scoreA.length;
  }

  if (scoreA.uniqueTokenCount !== scoreB.uniqueTokenCount) {
    return scoreB.uniqueTokenCount - scoreA.uniqueTokenCount;
  }

  if (scoreA.tokenCount !== scoreB.tokenCount) {
    return scoreB.tokenCount - scoreA.tokenCount;
  }

  return 0;
};

const glossary = JSON.parse(fs.readFileSync(GLOSSARY_PATH, 'utf8'));
if (!Array.isArray(glossary)) {
  throw new Error('glossario.json precisa ser um array');
}

const groupedByTerm = new Map();
for (const item of glossary) {
  const term = typeof item?.termo === 'string' ? item.termo.trim() : '';
  if (!term) continue;

  if (!groupedByTerm.has(term)) {
    groupedByTerm.set(term, []);
  }
  groupedByTerm.get(term).push(item);
}

const deduped = [];
const duplicateReport = [];

for (const item of glossary) {
  const term = typeof item?.termo === 'string' ? item.termo.trim() : '';
  if (!term) {
    deduped.push(item);
    continue;
  }

  const group = groupedByTerm.get(term);
  if (!group || group.length === 0) {
    continue;
  }

  const best = [...group].sort(compareEntries)[0];
  deduped.push(best);

  if (group.length > 1) {
    duplicateReport.push({
      term,
      count: group.length,
      keptDefinition: best.definicao,
      removedDefinitions: group
        .filter((candidate) => candidate !== best)
        .map((candidate) => candidate.definicao),
    });
  }

  groupedByTerm.delete(term);
}

fs.writeFileSync(GLOSSARY_PATH, `${JSON.stringify(deduped, null, 2)}\n`, 'utf8');

console.log(`[dedupe-glossary] total antes: ${glossary.length}`);
console.log(`[dedupe-glossary] total depois: ${deduped.length}`);
console.log(`[dedupe-glossary] duplicatas removidas: ${glossary.length - deduped.length}`);

if (duplicateReport.length > 0) {
  console.log('\n[dedupe-glossary] termos consolidados:');
  for (const line of duplicateReport) {
    console.log(`- ${line.term} (${line.count} ocorrencias)`);
  }
}

