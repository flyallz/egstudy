const path = require('path');
const esbuild = require('../local-run/node_modules/esbuild');
const units = require('../reference/forumflash-a2-original.json').units;

const lessons = [
  ['currentSiteA2.ts', 'A2_REFLEXIVE'],
  ['currentSiteA2.ts', 'A2_PAST_SIMPLE'],
  ['currentSiteA2.ts', 'A2_WAS_WERE'],
  ['currentSiteA2.ts', 'A2_MOVEMENT_PREPOSITIONS'],
  ['currentSiteA2Future.ts', 'A2_FUTURE'],
  ['currentSiteA2Perfect.ts', 'A2_PERFECT'],
  ['currentSiteA2Obligation.ts', 'A2_OBLIGATION'],
  ['currentSiteA2Adjectives.ts', 'A2_ED_ING'],
  ['currentSiteA2Order.ts', 'A2_ORDER'],
  ['currentSiteA2Comparatives.ts', 'A2_COMPARATIVES'],
  ['currentSiteA2Superlatives.ts', 'A2_SUPERLATIVES'],
  ['currentSiteA2TooEnough.ts', 'A2_TOO_ENOUGH'],
  ['currentSiteA2SoSuch.ts', 'A2_SO_SUCH'],
  ['currentSiteA2Linkers.ts', 'A2_LINKERS'],
  ['currentSiteA2Indefinite.ts', 'A2_INDEFINITE'],
  ['currentSiteA2Quantifiers.ts', 'A2_QUANTIFIERS'],
];

async function load(file) {
  const result = await esbuild.build({
    entryPoints: [path.join(__dirname, '../client/src/data', file)],
    bundle: true, platform: 'node', format: 'cjs', write: false, logLevel: 'silent',
  });
  const module = { exports: {} };
  new Function('module', 'exports', result.outputFiles[0].text)(module, module.exports);
  return module.exports;
}

async function main() {
  const cache = new Map();
  let mismatches = 0;
  for (let i = 0; i < lessons.length; i++) {
    const [file, key] = lessons[i];
    if (!cache.has(file)) cache.set(file, await load(file));
    const source = units[i];
    const local = cache.get(file)[key].questions;
    const indices = [...source.levels.easy, ...source.levels.medium, ...source.levels.hard];
    const errors = [];
    if (local.length !== indices.length) errors.push(`count ${local.length}/${indices.length}`);
    for (let n = 0; n < Math.min(local.length, indices.length); n++) {
      const original = source.pool[indices[n]];
      const question = local[n];
      const level = n < 20 ? 'easy' : n < 50 ? 'medium' : 'hard';
      if (question.difficulty !== ({ easy: '简单', medium: '中等', hard: '困难' })[level]) errors.push(`${level} ${n + 1} difficulty`);
      if (original.type === 'choice') {
        if (JSON.stringify(question.options) !== JSON.stringify(original.options)) errors.push(`${level} ${n + 1} options`);
        if (question.options?.[question.answer] !== original.answer) errors.push(`${level} ${n + 1} answer`);
        if (original.sentence && /^[\x00-\x7f]*$/.test(original.sentence) && !question.q?.includes(original.sentence)) errors.push(`${level} ${n + 1} sentence`);
      } else {
        if (question.answerText !== original.answer) errors.push(`${level} ${n + 1} answer`);
        if (!question.q?.includes(original.sentence)) errors.push(`${level} ${n + 1} sentence`);
      }
    }
    mismatches += errors.length;
    console.log(`${i + 1}. ${source.id}: ${local.length} questions, ${errors.length} mismatches${errors.length ? ` (${errors.slice(0, 8).join(', ')})` : ''}`);
  }
  if (mismatches) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; });
