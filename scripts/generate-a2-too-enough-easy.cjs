const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[11];
const prompts = [
  '选出 enough 在名词前位置正确的句子。', '选择正确的句子。', '选择正确的句子。', null, null,
  '选择正确的句子。', null, null, null, '选择正确的句子。',
  null, null, null, null, '选择正确的句子。', null, null, null, null, null,
];
const explanations = [
  '我们没有足够的椅子。enough 放在名词 chairs 前。',
  '箱子太重，无法搬运。too heavy 后用 to carry 表示无法完成的动作。',
  '她年龄足够大，可以投票。enough 放在形容词 old 后。',
  '汤里盐太多。salt 不可数，用 too much。',
  '厨房里人太多。people 是复数，用 too many。',
  '我们有足够的钱旅行。enough 放在名词 money 前。',
  '没有足够的时间完成测试。not enough 表示不够。',
  '这里太暗，无法阅读。too dark to read 表示黑暗程度妨碍阅读。',
  '按题设的投票条件，她足够大，可以参加下一次选举。old enough to vote 中 enough 放在 old 后。',
  '咖啡太烫不能喝，但甜度足以令人享受。too 放在形容词前，enough 放在形容词后。',
  '房间太小，放不下床。达不到放床的条件，用 too small to。',
  '我们没有足够的椅子给所有人。enough 放在名词 chairs 前。',
  '汤太烫，孩子们不能吃。for the children 明确谁无法完成动作。',
  '汤里的盐太多，厨房里的人也太多。salt 不可数用 too much；people 为复数用 too many。',
  '他足够高，可以够到架子。能够完成动作，用 tall enough to。',
  '箱子重得搬不动，但我足够有力可以挪动它。too 在 heavy 前，enough 在 strong 后。',
  '汤现在太烫，不能吃。too hot to eat 表示温度超出可食用范围。',
  '有足够的铅笔分给每个人吗？enough 放在 pencils 前。',
  '水还不够干净，不能喝。enough 放在形容词 clean 后。',
  '我们买不起票，因为票太贵。too expensive 表示价格超过可负担程度。',
];
if (unit.levels.easy.length !== explanations.length) throw new Error('Question count changed');
const rows = unit.levels.easy.map((index, i) => {
  const source = unit.pool[index];
  const q = prompts[i] || source.sentence || '选择正确的句子。';
  return { q, options: source.options, answer: source.options.indexOf(source.answer), explain: explanations[i], difficulty: '简单', keepChoice: true };
});
fs.writeFileSync(path.join(__dirname, '../client/src/data/currentSiteA2TooEnoughEasy.ts'), `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 12 课简单档 20 题；英文选项、答案和顺序保留。\nexport const A2_TOO_ENOUGH_EASY: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`);
