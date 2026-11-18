const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[6];
const medium = [
  '实验室规定很严格，访客必须戴护目镜。must 表示明确的强制要求。',
  '你看起来很疲惫，应该休息一下。should 用于给出建议。',
  '标牌写着禁止入内。mustn\'t 表示禁止，不是“不必”。',
  '去年由于工作原因，我每周六都必须上班。过去的义务用 had to。',
  'Mai 必须在周五前提交申请。Mai 是单数第三人称，用 has to。',
  '博物馆今天免费，你不必买票。don\'t have to 表示没有必要。',
  '你咳得厉害，不应该抽烟。shouldn\'t 表示劝告。',
  '我必须带护照去面试吗？Must 放在主语前询问是否有强制义务。',
  '根据课程规定，我们必须周一前完成作业。we 用 have to 表示外部规定。',
  '所有文件都在线，你不必打印。needn\'t 表示不需要。',
  '说明不清楚，你应该向老师求助。should 表示建议。',
  '乘客起飞时必须系好安全带。must 表示强制性的安全规定。',
  '昨天因为暴风雨，我们不得不取消野餐。yesterday 指过去，义务用 had to。',
  '考试期间学生不得互相交谈。mustn\'t 表示禁止。',
  '开始前你应该仔细阅读说明。should 表示合理建议。',
  '活动没有门票费，她不必付款。she 用 doesn\'t have to 表示没有义务。',
  '门票已包含在预订中，我们无需再次付款。don\'t have to 表示不需要；mustn\'t 表示禁止。',
  '昨天道路封闭，我们只得改道。过去由外部情况造成的必要性用 had to。',
  '你不应该和陌生人分享密码，因为不安全。shouldn\'t 是劝告。',
  '所有员工必须在入口出示身份证件。employees 是复数，用 have to。',
  '研讨会是自选的，你不必参加，但可以自愿参加。don\'t have to 表示非强制。',
  '机构已有订阅，作者不需要另付费用。do not have to 表示无须付款。',
  '审稿人不得泄露稿件内容。must not 表示明确的保密禁令，后接原形 disclose。',
  '作者应该列出所有经费来源。should 后接动词原形 acknowledge。',
  '实验室必须在 24 小时内报告违规行为。laboratory 为单数，用 has to。',
  '研究人员以后是否必须重做整个试验？将来的义务用 will have to。',
  '每项论断都应该有引用支持。should be supported 是建议性的被动表达。',
  '样本必须始终保存在四度以下。must be stored 为强制要求的被动式。',
  '报告含有个人信息，未经允许不得发布。mustn\'t 表示禁止。',
  '分析尚未完成，作者应向读者说明局限。should 表示建议。',
];
const fresh = {
  1: '按期刊强制规定，每份投稿都必须附数据声明。must 表示强制要求。',
  2: '机构伦理规则要求研究者收集数据前取得伦理批准。researchers 为复数，用 have to obtain。',
  3: '编辑建议在摘要中明确写出局限，但这不是强制要求。should 表示建议。',
  4: '保密政策禁止在发表的图表中识别参与者。must not 表示禁止。',
  7: '样本受污染后不得不更换。过去发生的必要行为用 had to be replaced。',
  9: '调查允许参与者跳过题目，因此不必回答每一道。do not have to 表示不强制。',
  11: '写作指南建议结论不要超出数据支持的范围。should not 表示建议避免。',
  12: '洪水过后团队被迫放弃该地点。过去的必要行为用 had to。',
  16: '附录已经在线，打印可选，因此不需要打印。needn\'t 表示不必。',
  17: '根据实验室规定，技术员必须记录程序的每次变更。must 表示硬性要求。',
  19: '上周设备故障，团队不得不推迟野外调查。last week 指过去，用 had to。',
  21: '期刊免费开放，学生无需购买订阅。don\'t have to 表示无须。',
};
function key(s) { return JSON.stringify([s.type, s.sentence || '', s.options || [], s.answer]); }
const byKey = new Map(unit.levels.medium.map((idx, i) => [key(unit.pool[idx]), medium[i]]));
function generate(level, translations) {
  const rows = unit.levels[level].map((poolIndex, i) => {
    const source = unit.pool[poolIndex];
    const explain = level === 'medium' ? translations[i] : translations[i + 1] || byKey.get(key(source));
    if (!explain) throw new Error(`${level} #${i + 1}: missing translation`);
    const q = source.sentence || '选择正确的句子。';
    const common = { q, explain, difficulty: level === 'medium' ? '中等' : '困难' };
    if (source.type === 'fill') return { ...common, options: [], answer: 0, answerText: source.answer, sentence: q.replace('___', source.answer), kind: 'blank' };
    return { ...common, options: source.options, answer: source.options.indexOf(source.answer), keepChoice: true };
  });
  const label = level === 'medium' ? 'Medium' : 'Hard';
  fs.writeFileSync(path.join(__dirname, `../client/src/data/currentSiteA2Obligation${label}.ts`), `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 7 课${level === 'medium' ? '中等' : '困难'}档 30 题；英文题目、选项、答案和顺序保留。\nexport const A2_OBLIGATION_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`);
}
if (medium.length !== 30) throw new Error('Wrong medium count');
generate('medium', medium);
generate('hard', fresh);
