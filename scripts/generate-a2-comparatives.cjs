const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[9];
const medium = [
  '这本笔记本比那本便宜。cheap 是单音节，比较级为 cheaper。',
  '蓝色袋子比红色袋子重。heavy 变比较级时 y 改 i，再加 er。',
  '这本教材比旧版贵。多音节形容词 expensive 用 more 构成比较级。',
  'Linh 本学期分数更高，成绩更好了。good 的不规则比较级是 better。',
  '今天交通很糟，但昨天更糟。bad 的不规则比较级是 worse。',
  '这条路比海岸公路长。than 连接比较的第二个对象。',
  '新软件比旧版更可靠。reliable 的比较级用 more reliable。',
  '这条路线比另一条短五公里。shorter 表示更短，five kilometres 指差距。',
  '两个箱子一样重。as heavy as 是同级比较。',
  '快车到达城市所需时间更少，因此速度更快。fast 的比较级是 faster。',
  '第二题难度较低，也就是更容易。easy 变为 easier。',
  '这台笔记本电脑比旧的轻得多。much 可以修饰比较级 lighter，强调较大差距。',
  '第二种解释比第一种更有说服力。convincing 的比较级用 more convincing。',
  '今天气温低于昨天。than 连接两个比较对象。',
  '姐姐二十岁，我十八岁，所以姐姐年龄更大。old 的比较级是 older。',
  '这次试验用水比上次少。water 不可数，数量减少用 less。',
  '第一条路线花一小时，第二条花四十分钟，所以第二条更快。用 faster。',
  '这个食谱不如祖母的食谱复杂。not as complicated as 表示不及。',
  '新图书馆座位更多，但距我家更远。物理距离的比较级可用 farther。',
  '红裙三十万越南盾，蓝裙五十万，因此红裙更便宜。用 cheaper。',
  '第二种解释比第一种更清楚。clear 的比较级是 clearer，不能叠加 more。',
  '偏远地区卫星估计比地面读数更可靠。reliable 用 more reliable。',
  '北部采样点的浓度高于南部。high 的比较级是 higher。',
  '第二项研究比第一项研究更进一步。抽象意义上的 far 常用 further。',
  '新模型比旧模型准确得多。accurate 用 more accurate，considerably 修饰比较级。',
  '城市家庭比农村家庭消耗多得多的能源。far more 表示远远更多；than 引出比较对象。',
  '对照题中应使用 twice as large 表示两倍大小，不能将比较级 larger 放进 as…as。',
  '老年患者比年轻患者恢复得慢。slow 的比较级 slower 与 than 搭配。',
  '最初估计比修订后估计不够精确。less precise than 表示程度较低。',
  '修订后的模型在低温下表现更好。good 的不规则比较级是 better。',
];
const fresh = {
  3: '冬天的空气质量比夏天差。bad 的不规则比较级是 worse。',
  5: '调查中，老年组有 10% 报告副作用，年轻组有 30%。老年组报告的可能性更低，用 less likely。',
  12: '数字记录比纸质记录更容易搜索。easy 的比较级是 easier。',
  13: '我们收集的数据越多，置信区间就越窄。the more… the narrower… 表示相关变化。',
  14: '如今排放量与 1990 年一样高。as high as 表示程度相同。',
  15: '农村诊所的装备远不如城市医院。far less well equipped than 表示远远不及。',
  16: '沿海水域升温比开阔海洋更快。quickly 是多音节副词，用 more quickly。',
  17: '修订后的估计比原始数据准确得多。accurate 用 more accurate；considerably 强调差距。',
  18: '第二次实验的变异量少于第一次。variation 在此指不可数的变异程度，用 less。',
  19: '线上调查比面对面访谈更易组织。easy 变比较级时改 y 为 i，加 er。',
  20: '新软件比旧版更快地处理记录。quickly 的比较级是 more quickly。',
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
  fs.writeFileSync(path.join(__dirname, `../client/src/data/currentSiteA2Comparatives${label}.ts`), `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 10 课${level === 'medium' ? '中等' : '困难'}档 30 题；英文题目、选项、答案和顺序保留。\nexport const A2_COMPARATIVES_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`);
}
if (medium.length !== 30) throw new Error('Wrong medium count');
generate('medium', medium);
generate('hard', fresh);
