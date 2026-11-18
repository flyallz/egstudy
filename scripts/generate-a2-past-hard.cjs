const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[1];
const text = fs.readFileSync(path.join(__dirname, '../client/src/data/currentSiteA2PastMedium.ts'), 'utf8');
const medium = JSON.parse(text.slice(text.indexOf('=') + 1).trim().replace(/;$/, ''));
const fresh = {
  1: '封锁期间排放量急剧下降。fall 的不规则过去式是 fell。',
  2: '发现错误后，期刊撤回了论文。withdraw 的过去式是 withdrew。',
  3: '差异来自两种不同的测量方法。arise 的过去式是 arose。',
  4: '过度放牧在十年内导致荒漠化。lead 的过去式是 led。',
  5: '该机构在 2018 年开展了全国调查。undertake 的过去式是 undertook。',
  12: '该机构征询了三位独立专家的意见。seek 的过去式是 sought。',
  13: '监测工作早在工厂开业之前就开始了。begin 的过去式是 began。',
  14: '该部何时首次承认这个问题？过去时疑问句用 did 加动词原形 acknowledge。',
  15: '疫情席卷了三个邻近地区。sweep 的过去式是 swept。',
  17: '该机构在大规模翻新后，于 2016 年重新开放档案馆。in 2016 指已结束的过去时间，用 reopened。',
  19: '去年，在收到多次投诉后，地方政府撤销了许可。withdraw 的过去式是 withdrew。',
};
const rows = unit.levels.hard.map((poolIndex, index) => {
  const source = unit.pool[poolIndex];
  const q = source.sentence ? `${source.sentence}${source.cue ? `（${source.cue}）` : ''}` : '选择正确的句子。';
  const matched = medium.find(row => row.q === q && (source.type === 'fill' ? row.answerText === source.answer : JSON.stringify(row.options) === JSON.stringify(source.options) && row.options[row.answer] === source.answer));
  const explain = fresh[index + 1] || matched?.explain;
  if (!explain) throw new Error(`Missing explanation for ${index + 1}`);
  const common = { q, explain, difficulty: '困难' };
  if (source.type === 'fill') return { ...common, options: [], answer: 0, answerText: source.answer, sentence: source.sentence.replace('___', source.answer), kind: 'blank', ...(source.cue ? { baseWord: source.cue } : {}) };
  return { ...common, options: source.options, answer: source.options.indexOf(source.answer), keepChoice: true };
});
const output = `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 2 课困难档 30 题；英文句子、选项、答案和顺序保留。\nexport const A2_PAST_HARD: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, '../client/src/data/currentSiteA2PastHard.ts'), output);
