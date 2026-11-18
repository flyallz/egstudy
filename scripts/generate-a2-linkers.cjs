const fs = require('fs');
const unit = require('../reference/forumflash-a2-original.json').units[13];
const chineseSentences = {
  8: '下雨了，所以我们待在家里。',
  9: '我们因为下雨而待在家里。',
  10: '酒店便宜，却很舒适。',
  11: '我们可以步行去车站，或者坐出租车。',
  12: '虽然样本很小，效果却十分明显。',
  16: '她做完作业，然后和朋友出去了。',
};
function explanation(source) {
  const answer = source.answer.toLowerCase();
  if (answer === 'and' || /\band\b/.test(answer)) return 'and 连接并列的动作或事实，表示补充；这里两个信息同时成立。';
  if (answer === 'but' || /\bbut\b/.test(answer)) return 'but 连接前后形成对比的两部分，表达转折。';
  if (answer === 'or' || /\bor\b/.test(answer)) return 'or 连接可替换的选项，表示“或者”；也可表示“否则”。';
  if (answer === 'because of' || /\bbecause of\b/.test(answer)) return 'because of 后接名词短语，说明原因；后面不能直接跟主语加动词的从句。';
  if (answer === 'because' || /\bbecause\b/.test(answer)) return 'because 后接说明原因的完整从句；一个因果关系不再同时加 so。';
  if (answer === 'so that' || /\bso that\b/.test(answer)) return 'so that 引出目的，表示“为了”；与引出结果的 so 不同。';
  if (answer === 'although' || /\balthough\b/.test(answer)) return 'although 引出让步从句，表示“虽然”；后面的主句不再加 but。';
  if (answer === 'so' || /\bso\b/.test(answer)) return 'so 引出前一事件造成的结果；前后两个从句都应完整。';
  return '根据句意和前后部分的逻辑关系选择连接词，并检查句子结构。';
}
for (const [level, difficulty, label] of [['easy', '简单', 'Easy'], ['medium', '中等', 'Medium'], ['hard', '困难', 'Hard']]) {
  const questions = unit.levels[level].map((id, i) => {
    const source = unit.pool[id];
    const q = { q: source.sentence || '选择正确的句子。', explain: explanation(source), difficulty };
    if (level === 'easy' && chineseSentences[i + 1]) q.q = chineseSentences[i + 1];
    if (source.type === 'fill') {
      q.options = [];
      q.answer = 0;
      q.answerText = source.answer;
      q.sentence = source.sentence.replace('___', source.answer);
      q.kind = 'blank';
      if (source.cue) q.baseWord = source.cue === 'nên' ? '所以' : source.cue;
    } else {
      q.options = source.options;
      q.answer = source.options.indexOf(source.answer);
      q.keepChoice = true;
    }
    return q;
  });
  if (questions.length !== (level === 'easy' ? 20 : 30) || questions.some(q => q.answer < 0)) throw new Error(`${level} 数量或答案异常`);
  fs.writeFileSync(`client/src/data/currentSiteA2Linkers${label}.ts`, `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 14 课${difficulty}档；英文题目、选项、答案和顺序保留。\nexport const A2_LINKERS_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(questions, null, 2)};\n`);
}
