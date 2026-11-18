const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[1];
const explanations = [
  '我们昨天去了博物馆。yesterday 指过去；go 的不规则过去式是 went。',
  '姐姐昨晚为考试学习。study 以辅音字母加 y 结尾，变过去式时改 y 为 i，再加 ed。',
  '你昨天看到门上的通知了吗？一般过去时的疑问句用 did 开头，后接动词原形 see。',
  '爸爸上周六在市场买了新鲜蔬菜。buy 的不规则过去式是 bought。',
  '我昨天见到那位客人时没认出她。过去时否定句用 didn\'t 加动词原形 recognise。',
  '火车昨天晚到十分钟。arrive 是规则动词，过去式为 arrived。',
  'Linh 上周末给祖母写信。write 的不规则过去式是 wrote。',
  '司机今天早上在红灯前停下。stop 是短元音加辅音结尾，双写 p 后加 ed。',
  '我们上个月在书展遇见了以前的老师。meet 的过去式是 met。',
  '讲座很有趣，但教室太冷。lecture 为单数，be 动词的过去式用 was。',
  '孩子们昨天对学校旅行很兴奋。children 是复数，be 动词的过去式用 were。',
  '他们昨晚八点离开办公室。leave 的不规则过去式是 left。',
  'Hoa 昨天因电脑故障没有发送邮件。过去时否定句用 didn\'t send。',
  '弟弟昨天赶上了去学校的早班公交车。catch 的不规则过去式是 caught。',
  '她昨晚把伞忘在公交车上。forget 的过去式是 forgot。',
  '公交车昨天晚到十分钟，因此我们错过了开场讲话。yesterday 确定过去时间，arrive 变为 arrived。',
  '停电时，大家使用了自己的手机。两个事件均已发生，use 用过去式 used。',
  'Mai 把钱包忘在家里，于是返回去取。forget 的过去式是 forgot。',
  '游客没有拍照，因为那里不允许拍摄。过去时否定句用 didn\'t take；take 保持原形。',
  '你姐姐在哪里买了那条手工围巾？普通动词 buy 的过去时问句用 did。',
  '第二次实验没有证实最初的发现。did not 后接动词原形。',
  '研究人员没预料到该效应会持续。did not 后必须用原形 expect。',
  '干旱持续了三年，给该地区造成数十亿损失。last 用过去式 lasted；cost 的过去式拼写不变。',
  '海平面上升速度超过模型预测。rise 的过去式是 rose；predict 的过去式是 predicted。',
  '论文受到广泛引用，但结果从未被复现。被动语态用 was cited 和 was replicated 的过去分词形式。',
  '研究人员在第二个数据集中发现了意外规律。find 的不规则过去式是 found。',
  '调查团队没有从农村地区招募到足够的参与者。didn\'t 后的 recruit 保持原形。',
  '委员会四月开过两次会，五月公布了决定。meet 的过去式 met 与后面的 announced 叙述已完成的事件。',
  '政府于 2019 年推出该项征税，两年后取消。两个事件都已结束，用 introduced 和 abolished。',
  '委员会在发布报告前开过两次会。meet 的过去式是 met，publish 的过去式是 published。',
];
if (unit.levels.medium.length !== explanations.length) throw new Error('Question count changed');
const rows = unit.levels.medium.map((poolIndex, index) => {
  const source = unit.pool[poolIndex];
  const q = source.sentence ? `${source.sentence}${source.cue ? `（${source.cue}）` : ''}` : '选择正确的句子。';
  const common = { q, explain: explanations[index], difficulty: '中等' };
  if (source.type === 'fill') return { ...common, options: [], answer: 0, answerText: source.answer, sentence: source.sentence.replace('___', source.answer), kind: 'blank', ...(source.cue ? { baseWord: source.cue } : {}) };
  return { ...common, options: source.options, answer: source.options.indexOf(source.answer), keepChoice: true };
});
const output = `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 2 课中等档 30 题；英文句子、选项、答案和顺序保留。\nexport const A2_PAST_MEDIUM: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, '../client/src/data/currentSiteA2PastMedium.ts'), output);
