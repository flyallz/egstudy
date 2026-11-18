const fs = require('fs');
const path = require('path');

const unit = require('../reference/forumflash-a2-original.json').units[0];
const explanations = [
  'Nam 先生独自修好了打印机，没有人帮忙。he 指 Nam 先生；by himself 强调他自己完成。',
  '我们在没有外援的情况下筹备了展览。we 的反身代词是 ourselves，强调所有事情都由我们自己完成。',
  'Lan 可以自己核对答案。这里是对 Lan 一个人说话，用 yourself。',
  '这是对多名学生说的话，请他们向新同学自我介绍，因而用 yourselves。',
  '清洁机器人每次工作后会自行清洁。单数物体 robot 的反身代词是 itself。',
  'Hoa 面试前照镜子。看的人和被看的人都是 Hoa，需用 herself。',
  '志愿者亲自组织了慈善活动。volunteers 是复数，用 themselves 强调他们自己完成。',
  '我独自准备午餐时割伤了自己。受伤的人就是主语 I，用 myself。',
  '两个邻居相视而笑。each other 表示两人之间的相互动作。',
  'Jack 转身时发现一名骑车人在他身后。behind 表示相对于 Jack 的位置，后接宾格 him。',
  '男孩为自己做晚饭而自豪。himself 强调他独立完成，而非别人代劳。',
  'Anna，请再自己取些水果。help yourself to 是邀请单个人自取食物的固定说法。',
  '照着旧课表走后，我们发现自己进错了教室。find ourselves 表示发现自己处于某种情况。',
  'Linh 博士在展示结果前介绍了自己。介绍者与被介绍者是同一个人，she 对应 herself。',
  '猫跑进花园，Mai 跟着它出去。Mai 跟随的是猫，不是 Mai 自己；这里用宾格 it。',
  '父母不在时，双胞胎自己洗了盘子。by themselves 表示他们没有他人帮助。',
  '父母睡觉时，双胞胎自己准备早餐。by themselves 强调两人独立完成。',
  '我昨天被热锅烫伤。受伤者就是主语 I，用 myself。',
  'Linh 和我向新老师作了自我介绍。Linh and I 相当于 we，用 ourselves。',
  '决赛后两支队伍互相祝贺。each other 表示双方相互祝贺。',
  '这是对多名孩子说的邀请。help yourselves to 中要用复数 yourselves。',
  '研究人员与那份新闻稿划清了界限。researchers 是复数，反身代词用 themselves。',
  '委员会无法客观评价自己。主语和宾语指同一组织，作为单数整体用 itself。',
  '参与者亲自完成了问卷。themselves 强调是他们自己完成。',
  '病毒离开宿主无法自行复制。单数无生命名词 virus 对应 itself；by itself 表示独自。',
  '退缩的是冰川本身，而不只是边缘。itself 紧跟 glacier 强调其本身。',
  '植被消失后，土壤侵蚀形成自我加剧的循环。feed on itself 表示不断作用于自身。',
  '两个模型几乎处处互相矛盾。each other 表示两者之间相互作用。',
  '数据无法自行说明其含义，仍需解读。学术英语中的 data 为复数，对应 themselves。',
  '研究小组自己设计了问卷，没有外部顾问参与。research group 作为一个整体，用 itself。',
];
if (unit.levels.medium.length !== explanations.length) throw new Error('Question count changed');
const rows = unit.levels.medium.map((poolIndex, index) => {
  const source = unit.pool[poolIndex];
  const q = source.q || '选择正确的句子。';
  const common = { q, explain: explanations[index], difficulty: '中等' };
  if (source.type === 'fill') return { ...common, options: [], answer: 0, answerText: source.answer, sentence: q.replace('___', source.answer), kind: 'blank' };
  return { ...common, options: source.options, answer: source.options.indexOf(source.answer), keepChoice: true };
});
const output = `import type { QuizQuestion } from "./content";\n\n// 英文题干、选项与答案按原站 A2 第 1 课中等档顺序保留；解析译为中文。\nexport const A2_REFLEXIVE_MEDIUM: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, '../client/src/data/currentSiteA2ReflexiveMedium.ts'), output);
