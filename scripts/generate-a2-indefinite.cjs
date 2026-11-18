const fs = require('fs');
const unit = require('../reference/forumflash-a2-original.json').units[14];
const chinese = {
  8: '今天班里所有人都到了。', 12: '有人留了言，但没人知道是谁。', 13: '我没在办公室里见到任何人。',
  14: '昨晚你听见什么了吗？', 15: '今天早上我读到一件关于顺化的趣事。',
  16: '我找遍了各处，却还是找不到钥匙。',
};
function explanation(source) {
  const a = source.answer.toLowerCase();
  if (/\b(everyone|everybody|everything|everywhere)\b/.test(a)) return 'every 系列表示“所有人／事物／地方”；作主语时动词仍用单数。';
  if (/\b(nobody|no one|nothing|nowhere)\b/.test(a)) return 'no 系列本身含否定意义，不再给动词加 not；作主语时用单数动词。';
  if (/\b(anyone|anybody|anything|anywhere)\b/.test(a)) return 'any 系列常用于疑问句、否定句或 if 条件句；修饰它的形容词放在后面。';
  if (/\b(someone|somebody|something|somewhere)\b/.test(a)) return 'some 系列常用于肯定句，表示不特定的人、物或地方；表示邀请或请求的问句也可使用。';
  return '根据所指的人、物或地点及句子的肯定、否定或疑问形式选择不定代词。';
}
for (const [level, difficulty, label] of [['easy', '简单', 'Easy'], ['medium', '中等', 'Medium'], ['hard', '困难', 'Hard']]) {
  const questions = unit.levels[level].map((id, i) => {
    const source = unit.pool[id];
    const q = { q: source.sentence || '选择正确的句子。', explain: explanation(source), difficulty };
    if (level === 'easy' && chinese[i + 1]) q.q = chinese[i + 1];
    if (level === 'easy' && i === 0) q.q = 'I didn\'t meet anybody. → 选出意思相同的否定句。';
    if (source.type === 'fill') {
      q.options = [];
      q.answer = 0;
      q.answerText = source.answer;
      q.sentence = source.sentence.replace('___', source.answer);
      q.kind = 'blank';
      if (source.cue) q.baseWord = source.cue.includes('điều') || source.cue.includes('thứ') ? '任何事物' : source.cue;
    } else {
      q.options = source.options;
      q.answer = source.options.indexOf(source.answer);
      q.keepChoice = true;
    }
    return q;
  });
  if (questions.length !== (level === 'easy' ? 20 : 30) || questions.some(q => q.answer < 0)) throw new Error(`${level} 数量或答案异常`);
  fs.writeFileSync(`client/src/data/currentSiteA2Indefinite${label}.ts`, `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 15 课${difficulty}档；英文题目、选项、答案和顺序保留。\nexport const A2_INDEFINITE_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(questions, null, 2)};\n`);
}
