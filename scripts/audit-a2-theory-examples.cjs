const path = require('path');
const esbuild = require('../local-run/node_modules/esbuild');
const units = require('../reference/forumflash-a2-original.json').units;
const lessons = [
  ['currentSiteA2.ts', 'A2_REFLEXIVE'], ['currentSiteA2.ts', 'A2_PAST_SIMPLE'],
  ['currentSiteA2.ts', 'A2_WAS_WERE'], ['currentSiteA2.ts', 'A2_MOVEMENT_PREPOSITIONS'],
  ['currentSiteA2Future.ts', 'A2_FUTURE'], ['currentSiteA2Perfect.ts', 'A2_PERFECT'],
  ['currentSiteA2Obligation.ts', 'A2_OBLIGATION'], ['currentSiteA2Adjectives.ts', 'A2_ED_ING'],
  ['currentSiteA2Order.ts', 'A2_ORDER'], ['currentSiteA2Comparatives.ts', 'A2_COMPARATIVES'],
  ['currentSiteA2Superlatives.ts', 'A2_SUPERLATIVES'], ['currentSiteA2TooEnough.ts', 'A2_TOO_ENOUGH'],
  ['currentSiteA2SoSuch.ts', 'A2_SO_SUCH'], ['currentSiteA2Linkers.ts', 'A2_LINKERS'],
  ['currentSiteA2Indefinite.ts', 'A2_INDEFINITE'], ['currentSiteA2Quantifiers.ts', 'A2_QUANTIFIERS'],
];

async function load(file) {
  const result = await esbuild.build({ entryPoints: [path.join(__dirname, '../client/src/data', file)], bundle: true,
    platform: 'node', format: 'cjs', write: false, logLevel: 'silent' });
  const module = { exports: {} };
  new Function('module', 'exports', result.outputFiles[0].text)(module, module.exports);
  return module.exports;
}

function sourceExamples(unit) {
  const lesson = unit.lesson;
  const examples = [unit.example];
  for (const item of lesson.useCases || []) examples.push(item.example);
  for (const item of lesson.examples || []) examples.push(item.sentence);
  for (const item of lesson.errors || []) examples.push(item.wrong, item.correct);
  for (const item of lesson.contrast?.items || []) examples.push(item.example);
  return [...new Set(examples.filter(example => example && /[.!?]/.test(example)).map(example => example.replaceAll(' · ', ' ')))];
}

async function main() {
  const cache = new Map();
  let total = 0;
  for (let i = 0; i < lessons.length; i++) {
    const [file, key] = lessons[i];
    if (!cache.has(file)) cache.set(file, await load(file));
    const local = cache.get(file)[key];
    const text = JSON.stringify({ openingExample: local.openingExample, theory: local.theory }).replaceAll(' · ', ' ');
    const missing = sourceExamples(units[i]).filter(example => !text.includes(example));
    total += missing.length;
    console.log(`${i + 1}. ${units[i].id}: ${missing.length} missing source examples${missing.length ? ` (${missing.slice(0, 4).join(' | ')})` : ''}`);
  }
  if (total) process.exitCode = 1;
}
main().catch(error => { console.error(error); process.exitCode = 1; });
