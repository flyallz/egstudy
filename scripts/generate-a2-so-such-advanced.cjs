const fs = require('fs');
const unit = require('../reference/forumflash-a2-original.json').units[12];
function explanation(source) {
  const answer = source.answer;
  const context = source.sentence || answer;
  if (/\bso (many|much|few|little)\b/i.test(answer) || /\bso (many|much|few|little)\b/i.test(context.replace('___', answer))) {
    return 'many、much、few、little 表示数量时，前面用 so；that 从句说明这种数量造成的结果。';
  }
  if (/\bsuch\b/i.test(answer)) {
    if (/\bsuch (?:a|an)\b/i.test(context.replace('___', answer))) return 'such 修饰后面的单数可数名词短语，保留冠词 a/an；that 从句说明结果。';
    return 'such 修饰后面的名词短语；复数或不可数名词前不加 a/an。';
  }
  return 'so 修饰后面的形容词或副词；that 从句说明程度造成的结果。';
}
for (const [level, difficulty, label] of [['medium', '中等', 'Medium'], ['hard', '困难', 'Hard']]) {
  const questions = unit.levels[level].map(id => {
    const source = unit.pool[id];
    const q = { q: source.sentence || '选择正确的句子。', explain: explanation(source), difficulty };
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
  if (questions.length !== 30 || questions.some(q => q.answer < 0)) throw new Error(`${level} 数量或答案异常`);
  fs.writeFileSync(`client/src/data/currentSiteA2SoSuch${label}.ts`, `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 13 课${difficulty}档 30 题；英文题目、选项、答案和顺序保留。\nexport const A2_SO_SUCH_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(questions, null, 2)};\n`);
}
