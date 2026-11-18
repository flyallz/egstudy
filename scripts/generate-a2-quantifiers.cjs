const fs = require('fs');
const unit = require('../reference/forumflash-a2-original.json').units[15];
const chinese = {
  10: '我请了几个朋友来吃晚饭。', 11: '今年有许多学生加入了社团。', 12: '网站上有很多信息。',
  14: '火车开走前，我们还有一点时间。', 15: '他在这座城市几乎没什么朋友，所以感到孤独。',
  16: '糖没剩多少了，但还有几块饼干。',
};
function explanation(source) {
  const a = source.answer.toLowerCase();
  if (a === 'a few' || /\ba few\b/.test(a)) return 'a few 修饰可数名词复数，表示“有几个”；带 a 时语气较积极。';
  if (a === 'a little' || /\ba little\b/.test(a)) return 'a little 修饰不可数名词，表示“有一点”；带 a 时语气较积极。';
  if (a === 'few' || /\bfew\b/.test(a)) return 'few 修饰可数名词复数，不带 a，强调数量太少。';
  if (a === 'little' || /\blittle\b/.test(a)) return 'little 修饰不可数名词，不带 a，强调数量太少。';
  if (/\bmuch\b/.test(a)) return 'much 修饰不可数名词，常用于疑问句或否定句。';
  if (/\bmany\b/.test(a)) return 'many 修饰可数名词复数，常用于疑问句或否定句。';
  if (a === 'have') return 'students 是复数名词，主语中的 a lot of 不改变数一致；此处用 have。';
  if (/\b(a lot of|lots of|a large number of|a great deal of)\b/.test(a) || a === 'lot' || a === 'lots') return 'a lot of、lots of 表示大量，可修饰可数名词复数或不可数名词；动词与中心名词保持数一致。';
  if (/\b(plenty of|plenty)\b/.test(a)) return 'plenty of 表示数量充裕，可修饰可数名词复数或不可数名词。';
  if (/\bseveral\b/.test(a)) return 'several 修饰可数名词复数，表示“几个”。';
  if (/\bmost\b/.test(a)) return 'most 表示“大多数”；特定群体前可用 most of。';
  if (/\benough\b/.test(a)) return 'enough 放在名词前，表示数量足够。';
  return '选择数量词时，先判断名词是否可数，再检查数量、语气和动词的数一致。';
}
for (const [level, difficulty, label] of [['easy', '简单', 'Easy'], ['medium', '中等', 'Medium'], ['hard', '困难', 'Hard']]) {
  const questions = unit.levels[level].map((id, i) => {
    const source = unit.pool[id];
    const q = { q: source.sentence || '选择正确的句子。', explain: explanation(source), difficulty };
    if (level === 'easy' && chinese[i + 1]) q.q = chinese[i + 1];
    if (level === 'hard' && i === 10) q.q = '根据调查表，大多数受访者住在工厂十公里以内。___ the respondents lived within ten kilometres of the plant.';
    if (source.type === 'fill') {
      q.options = [];
      q.answer = 0;
      q.answerText = source.answer;
      q.sentence = source.sentence.replace('___', source.answer);
      q.kind = 'blank';
      if (source.cue) q.baseWord = source.cue;
    } else {
      q.options = source.options;
      q.answer = source.options.indexOf(source.answer);
      q.keepChoice = true;
    }
    return q;
  });
  if (questions.length !== (level === 'easy' ? 20 : 30) || questions.some(q => q.answer < 0)) throw new Error(`${level} 数量或答案异常`);
  fs.writeFileSync(`client/src/data/currentSiteA2Quantifiers${label}.ts`, `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 16 课${difficulty}档；英文题目、选项、答案和顺序保留。\nexport const A2_QUANTIFIERS_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(questions, null, 2)};\n`);
}
