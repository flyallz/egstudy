const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[2];
const mediumExplanations = [
  '面试是在昨天下午进行的，而不是今天早上。interview 是单数，过去时用 was。',
  '昨晚我们到达时，两扇门都锁着。both doors 是复数，过去时用 were。',
  '博物馆昨天开门了吗？museum 是单数，疑问句把 Was 放到主语前。',
  '游客对导览满意吗？visitors 是复数，过去时问句以 Were 开头。',
  '昨天没有阳光，整天下雨。weather 是单数，描述过去的否定状态用 wasn\'t。',
  '实验室昨天关门，学生们没有在里面。students 是复数，否定用 weren\'t。',
  '你姐姐昨晚给你打电话了吗？call 是普通动词，过去时问句用 Did。',
  '你父亲昨晚在哪里？father 是单数，询问过去的位置用 was。',
  '昨天商店为什么关门？shops 是复数，过去时状态问句用 were。',
  '昨天会议几点开始？start 是普通动词，过去时问句用 did。',
  '昨晚房间里只有一把椅子。one chair 是单数，因此用 there was。',
  '昨天演讲后有几个问题。several questions 是复数，用 there were。',
  '我的答案是对的，但忘了写名字。answer 是单数，用 was。',
  '今天早上两份文件在我的桌上。two documents 是复数，过去时用 were。',
  '你昨天喜欢那场音乐会吗？enjoy 是普通动词，过去时问句用 Did，enjoy 保持原形。',
  '昨天入住时，酒店房间不干净。room 是单数，过去时否定用 wasn\'t。',
  '我们到达时门开着，于是走了进去。doors 是复数，过去状态用 were。',
  '昨天的演讲为什么那么短？presentation 是单数，过去状态问句用 was。',
  '昨晚咖啡馆没有空桌。tables 是复数，用 there were。',
  '学生们在口试前紧张吗？students 是复数，状态问句用 Were。',
  '为什么展览上周二不对游客开放？exhibition 是单数；closed 表示状态，问句用 was。',
  '样本当时是否保持在四度以下？samples 是复数，过去时被动问句用 Were。',
  '数据不完整，因此分析被推迟。data 在此作复数用 were；analysis 是单数用 was。',
  '两个样本都没有受污染。neither of 后即使接复数名词，谓语仍用单数 was。',
  '2019 年的数据集中有四个异常值。four outliers 是复数，用 there were。',
  '第二次试验为何被放弃？trial 是单数，过去时被动问句用 was。',
  '研究发现直到 2021 年才公布。findings 是复数，过去时被动否定用 were not。',
  '2018 年，对该机制的研究仍处早期阶段。research 在此不可数，用 was。',
  '2020 年项目期间，这些统计数据来自十二个省。statistics 指多个数值，过去时用 were。',
  '四个地点中的每一个都接受了两次调查。each of 是单数中心词，用 was。',
];
const hardFresh = {
  1: '2019 年审查中，第一轮后标准被修订。criteria 是复数，过去时用 were。',
  2: '2018 年听证会上的证据不足以支持政策调整。evidence 不可数，过去时用 was。',
  3: '2019 年评估中，两个假设都在百分之五的显著性水平上被否定。both hypotheses 是复数，用 were。',
  4: '2019 年试验开始时，参与人数少于计划。主语中心词 the number 是单数，用 was。',
  6: '在 2019 年盲法试验中，研究人员对分组保密，因此对照组未获知所接受的治疗。control group 作单数整体，过去时否定用 was not。',
  15: '该方法发表前经过同行评审了吗？methodology 是单数，过去时被动问句用 Was。',
  16: '虽然样本量小，影响却很深远。implications 是复数用 were，sample 是单数用 was。',
  17: '上周五，初步结果已公布在大学网站上。results 是复数，last Friday 指过去，用 were。',
  18: '原报告中的财务预测准确吗？projections 是复数，过去时问句用 Were。',
  19: '2020 年，两份估计之间存在明显差距。a considerable gap 是单数，用 there was。',
  20: '上个月的实地考察前，研究设备尚未准备好。equipment 不可数，过去时用 was。',
  21: '最后一次简报会有多少参与者出席？participants 是复数，询问过去状态用 were。',
};
function key(source) { return JSON.stringify([source.type, source.sentence || '', source.options || [], source.answer]); }
const mediumByKey = new Map(unit.levels.medium.map((poolIndex, index) => [key(unit.pool[poolIndex]), mediumExplanations[index]]));
function build(level, explanations) {
  const rows = unit.levels[level].map((poolIndex, index) => {
    const source = unit.pool[poolIndex];
    const explain = (level === 'medium' ? explanations[index] : explanations[index + 1]) || mediumByKey.get(key(source));
    if (!explain) throw new Error(`${level} #${index + 1}: missing translation`);
    const q = source.sentence || '选择正确的句子。';
    const common = { q, explain, difficulty: level === 'medium' ? '中等' : '困难' };
    if (source.type === 'fill') return { ...common, options: [], answer: 0, answerText: source.answer, sentence: q.replace('___', source.answer), kind: 'blank' };
    return { ...common, options: source.options, answer: source.options.indexOf(source.answer), keepChoice: true };
  });
  const name = level === 'medium' ? 'A2_WAS_WERE_MEDIUM' : 'A2_WAS_WERE_HARD';
  const file = level === 'medium' ? 'currentSiteA2WasWereMedium.ts' : 'currentSiteA2WasWereHard.ts';
  fs.writeFileSync(path.join(__dirname, '../client/src/data', file), `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 3 课${level === 'medium' ? '中等' : '困难'}档 30 题；英文题目、选项与答案按原顺序保留。\nexport const ${name}: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`);
}
if (mediumExplanations.length !== 30) throw new Error('Wrong medium count');
build('medium', mediumExplanations);
build('hard', hardFresh);
