const fs = require('fs');
const path = require('path');

const unit = require('../reference/forumflash-a2-original.json').units[0];
const mediumText = fs.readFileSync(path.join(__dirname, '../client/src/data/currentSiteA2ReflexiveMedium.ts'), 'utf8');
const medium = JSON.parse(mediumText.slice(mediumText.indexOf('=') + 1).trim().replace(/;$/, ''));
const fresh = {
  1: '系统每十二小时自行重新校准。the system 是单数且无生命，用 itself 表示系统自身。',
  3: '我们只分析 2010 年以后收集的数据。主语 we 的反身代词是 ourselves；confine ourselves to 表示自我限定范围。',
  4: '作者承认结论写得仓促，并在末段自相矛盾。he 和被矛盾的对象是同一人，用 himself。',
  5: '这位经济学家说她修改了预测，并称自己持谨慎乐观态度。she 对应 herself。',
  9: '两位作者多次互相引用。双方相互进行动作，用 each other，不能用 themselves。',
  11: '我提交前亲自核对了计算结果。I 对应 myself，这里强调由本人完成。',
  12: '你可以下载数据集，自己检查。这里的 you 指一个人，用 yourself。',
  15: '样本量限制了研究能对自身作出的结论。itself 指回单数的 the study。',
  18: '两位经济学家在辩论中互相质疑。双方相互作用，用 each other。',
  19: '设备在三十分钟后自动关闭。switch itself off 表示设备自行停止运行。',
  20: 'Tran 女士这位校长亲自欢迎奖学金获得者。herself 紧跟 principal，强调是她本人。',
  21: '看完反馈后，学生们自己改正了错误。themselves 强调由学生而非老师完成修改。',
};
const rows = unit.levels.hard.map((poolIndex, index) => {
  const source = unit.pool[poolIndex];
  const mediumMatch = medium.find(row => row.q === (source.sentence || '选择正确的句子。') &&
    (source.type === 'fill' ? row.answerText === source.answer :
      JSON.stringify(row.options) === JSON.stringify(source.options) && row.options[row.answer] === source.answer));
  const explain = fresh[index + 1] || mediumMatch?.explain;
  if (!explain) throw new Error(`Missing explanation for ${index + 1}`);
  const q = source.sentence || '选择正确的句子。';
  const common = { q, explain, difficulty: '困难' };
  if (source.type === 'fill') return { ...common, options: [], answer: 0, answerText: source.answer, sentence: source.sentence.replace('___', source.answer), kind: 'blank' };
  return { ...common, options: source.options, answer: source.options.indexOf(source.answer), keepChoice: true };
});
const output = `import type { QuizQuestion } from "./content";\n\n// 英文题干、选项与答案按原站 A2 第 1 课困难档顺序保留；解析译为中文。\nexport const A2_REFLEXIVE_HARD: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, '../client/src/data/currentSiteA2ReflexiveHard.ts'), output);
