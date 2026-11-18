const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[10];
const medium = [
  '四座塔中这座最高。tall 加 -est，前面已有 the。',
  'Mai 获得班级最高分，是最优秀的学生。good 的不规则最高级是 best。',
  '这是我们图书馆最有用的词典。useful 的最高级用 the most useful。',
  '我吃过的所有饭菜中，这顿最差。bad 的不规则最高级是 worst。',
  '在模型中 A 市人口最多。large 以 e 结尾，最高级只加 -st，成 largest。',
  '五间房中这一间最小。small 的最高级是 smallest。',
  '这是课程中最具挑战性的任务。challenging 用 the most 构成最高级。',
  '对我们的商店来说，周一是一周最忙的日子。busy 改 y 为 i 加 -est。',
  '比较四个方案后，我们选择最便宜的。cheap 的最高级是 cheapest。',
  '这是明天上午最早的火车。early 改 y 为 i，加 -est。',
  '那是讲座最有趣的部分。interesting 用 the most 构成最高级。',
  '她是三姐妹中最小的。明确集合用 of the three sisters。',
  '这是社区里最安静的街道。地点范围用 in。',
  '这是地图上虚构地区的最高山。最高级前填 the。',
  '五份建议中我们选择最实用的。practical 用 the most。',
  '博物馆展示馆藏中最早的照片。old 的最高级是 oldest。',
  '全班学生中 Minh 的字最工整。比较整个班级，用 the neatest。',
  '三家旅馆中，车站附近的一家最舒适。comfortable 用 the most。',
  '五个问题中第四题最难。difficult 用 the most difficult。',
  '我们去过几个海滩，这个海滩的水最清澈。clear 的最高级是 the clearest。',
  '我最小的表亲是家中最有趣的人。funny 改 y 为 i，加 -est。',
  '这是目前最可靠的数据集。reliable 用 the most reliable。',
  '三角洲记录了有史以来最高的盐度。high 加 -est，前面用 the。',
  '截至当时，2019 年是珊瑚白化最严重的一年。bad 的最高级是 the worst。',
  '农业仍是单一最大的甲烷来源。large 的最高级是 the largest。',
  '四个地点中，北部地点下降最陡。steep 的最高级是 the steepest。',
  '教育是社会流动性最强的预测因素。strong 的最高级是 the strongest。',
  '第二次试验的结果最不令人信服。the least convincing 表示程度最低。',
  '在建筑改造中，保温措施仍最划算。good 的最高级是 the best。',
  '这些是洪水最早的书面记录。early 的最高级是 the earliest。',
];
const fresh = {
  4: '三种运输方式中，铁路货运最清洁，因为它的碳强度最低。low 的最高级是 the lowest。',
  6: '这是该领域被引用最频繁的论文之一。one of the most frequently cited 后接复数 papers。',
  12: '三种方法中，第三种明显最准确。by far 强调最高级 the most accurate。',
  13: '按题目中的虚构图表，该省在普及覆盖方面走得最远。抽象距离用 the furthest。',
  14: '该地区的森林砍伐率排名第二高。second 放在 the 和 highest 之间。',
  15: '按题目的虚构能源图表，煤炭提供的电量最多。the most 修饰 electricity，表示数量最多。',
  16: '这是本地区最早的连续记录。old 的最高级是 the oldest。',
  17: '四项建议中，这一项提供最实际的解决办法。practical 用 the most practical。',
  18: '六个地点中，南部站点降雨量最高。high 的最高级是 the highest。',
  19: '这是档案库中最早的报告之一。one of the oldest 后接复数 reports。',
  20: '整个项目中，第三次实验的结果最可靠。reliable 用 the most reliable。',
};
function key(s) { return JSON.stringify([s.type, s.sentence || '', s.options || [], s.answer]); }
const byKey = new Map(unit.levels.medium.map((idx, i) => [key(unit.pool[idx]), medium[i]]));
function generate(level, translations) {
  const rows = unit.levels[level].map((poolIndex, i) => {
    const source = unit.pool[poolIndex];
    const explain = level === 'medium' ? translations[i] : translations[i + 1] || byKey.get(key(source));
    if (!explain) throw new Error(`${level} #${i + 1}: missing translation`);
    const q = source.sentence ? `${source.sentence}${source.cue ? `（${source.cue}）` : ''}` : '选择正确的句子。';
    const common = { q, explain, difficulty: level === 'medium' ? '中等' : '困难' };
    if (source.type === 'fill') return { ...common, options: [], answer: 0, answerText: source.answer, sentence: source.sentence.replace('___', source.answer), kind: 'blank', ...(source.cue ? { baseWord: source.cue } : {}) };
    return { ...common, options: source.options, answer: source.options.indexOf(source.answer), keepChoice: true };
  });
  const label = level === 'medium' ? 'Medium' : 'Hard';
  fs.writeFileSync(path.join(__dirname, `../client/src/data/currentSiteA2Superlatives${label}.ts`), `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 11 课${level === 'medium' ? '中等' : '困难'}档 30 题；英文题目、选项、答案和顺序保留。\nexport const A2_SUPERLATIVES_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`);
}
if (medium.length !== 30) throw new Error('Wrong medium count');
generate('medium', medium);
generate('hard', fresh);
