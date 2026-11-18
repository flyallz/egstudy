const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[7];
const medium = [
  '连续两小时没有休息，观众感到无聊。audience 是感受者，用 bored。',
  '纪录片很乏味，几名学生睡着了。documentary 造成无聊感，用 boring。',
  '孩子们为第一次科学展兴奋。children 是感受者，用 excited。',
  '足球决赛激动人心。match 引发兴奋，用 exciting。',
  '我很有兴趣了解语言史。人感到兴趣用 interested，常接 in。',
  '博物馆的古地图藏品很有趣。collection 引发兴趣，用 interesting。',
  '说明不清，让几名参与者感到困惑。participants 是感受者，用 confused。',
  '图表使用了两套刻度，令人困惑。diagram 是困惑的来源，用 confusing。',
  '优秀成绩让老师感到惊讶。teacher 是感受者，用 surprised。',
  '突然取得进步令人惊讶。improvement 引起惊讶，用 surprising。',
  '家长对学校安全措施感到担心。parents 是感受者，用 worried。',
  '成本上涨让小企业担忧。rise in costs 是担忧的原因，用 worrying。',
  '长途旅行后志愿者很累。volunteers 是感受者，用 tired。',
  '整天搬运重设备使人疲惫。活动本身造成疲劳，用 tiring。',
  '研究人员对不完整的数据集感到失望。researchers 是感受者，用 disappointed。',
  '数月准备后，回复率仍令人失望。response rate 是失望的原因，用 disappointing。',
  '说明令人费解，我只好求助。instructions 是困惑的来源，用 confusing。',
  '老师再次解释后，学生不再困惑。students 是感受者，用 confused。',
  '深海动物纪录片很吸引人，我看了两遍。documentary 引发兴趣，用 fascinating。',
  '我告诉父亲自己通过了入学考试，他很高兴。father 是感受者，用 delighted。',
  '时间表突然改变，让我们惊讶。we 是感受者，用 surprised。',
  '参与者认为说明让人困惑。instructions 引发困惑，用 confusing。',
  '研究结果令人失望，团队也感到失望。findings 用 disappointing，team 用 disappointed。',
  '读者可能因令人困惑的数据缺口而不解。readers 用 puzzled，gap 用 puzzling。',
  '变化的速度令许多气候学家担忧。pace of change 引起忧虑，用 alarming。',
  '大多数受访者对解释感到满意。respondents 是感受者，用 satisfied with。',
  '损失规模令人震惊。scale of the loss 引发震惊，用 shocking。',
  '委员会认为初步证据令人鼓舞。evidence 带来鼓舞，用 encouraging。',
  '志愿者因缺少明确说明而沮丧。volunteers 是感受者，用 frustrated。',
  '反复出现的测量错误使全队担忧。errors 是担忧的来源，用 worrying。',
];
const fresh = {
  1: '考虑到样本规模，结果令人惊讶。result 是引发惊讶的事物，用 surprising。',
  2: '审稿人对效应强度感到惊讶。reviewers 是感受者，用 surprised。',
  3: '地下水位的趋势十分令人担忧。trend 是担忧的来源，用 worrying。',
  4: '水文学家担心开采速度。hydrologists 是感受者，用 concerned。',
  5: '两条轴使用不同刻度，令人困惑。这种情况引发困惑，用 confusing。',
  11: '试点项目的早期结果令人鼓舞。results 带来鼓舞，用 encouraging。',
  12: '设备反复故障，让团队感到沮丧。team 是感受者，用 frustrated。',
  13: '问题本身很有趣，但受访者似乎不感兴趣。question 用 interesting，respondents 用 uninterested。',
  14: '三个野外考察季后，队员筋疲力尽。crew 是感受者，用 exhausted。',
  16: '测量湿地甲烷在技术上很有挑战性。任务本身带来挑战，用 challenging。',
  20: '清晰的气候变化讲解给观众留下深刻印象。audience 是感受者，用 impressed。',
  21: '生物多样性急剧下降令当地科学家担忧。decline 引发担忧，用 alarming。',
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
  fs.writeFileSync(path.join(__dirname, `../client/src/data/currentSiteA2Adjectives${label}.ts`), `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 8 课${level === 'medium' ? '中等' : '困难'}档 30 题；英文题目、选项、答案和顺序保留。\nexport const A2_ADJECTIVES_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`);
}
if (medium.length !== 30) throw new Error('Wrong medium count');
generate('medium', medium);
generate('hard', fresh);
