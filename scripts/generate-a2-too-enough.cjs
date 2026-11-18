const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[11];
const medium = [
  '水太烫，无法安全饮用。too 放在形容词 hot 前，表示超过可饮用的温度。',
  '我们有足够的椅子给二十位客人。enough 放在名词 chairs 前。',
  '孩子足够高，能碰到把手。enough 放在形容词 tall 后。',
  '这个小房间里的人太多。people 可数且为复数，用 too many。',
  '我们在汤里放了过多的盐。salt 不可数，用 too much。',
  '行李箱太重，我抬不起来。too heavy for me to lift 指明动作执行者与结果。',
  '文本足够清楚，初学者也能读懂。enough 放在 clear 后。',
  '我们没有足够的时间完成考试。enough 放在不可数名词 time 前。',
  '公交车太挤，我们上不去。too crowded 表示拥挤程度妨碍上车。',
  '房间足够安静，学生可以专心。enough 放在 quiet 后。',
  '一项简短任务的说明步骤太多。steps 为复数，用 too many。',
  '实验耗电过多。electricity 不可数，用 too much。',
  '这些说明对新用户来说足够简单吗？enough 在疑问句中也放在 simple 后。',
  '证据太薄弱，无法支持那个结论。too weak to support 表示不足以完成后面的动作。',
  '我们有足够的材料完成项目吗？enough 放在复数名词 materials 前。',
  '会议结束得太晚，我们赶不上末班车。too 修饰副词 late。',
  '箱子只有两公斤，Mai 可以轻松搬起。light enough 表示轻到能搬动。',
  '班里有三十张椅子、四十名学生，椅子不够。aren\'t enough seats 表示数量不足。',
  '电影九点才开始，现在才七点，还有充裕时间。plenty of time 表示时间富余。',
  '箱子太重，孩子无法独自搬运。too heavy for the child to carry。',
  '音乐声不够大，后排听不清。enough 放在 loud 后。',
  '施用过多肥料会污染地下水。fertiliser 不可数，用 too much。',
  '实验室没有足够经费重做试验。enough 放在名词 funding 前。',
  '混杂变量过多，无法单独确定一个原因。variables 为复数，用 too many。',
  '仪器过于敏感，不适合在野外使用。too + 形容词 + to do 表示过度导致不能做。',
  '数据不够详细，无法解决问题。enough 放在形容词 detailed 后。',
  '没有足够证据作出因果主张。evidence 不可数，enough 放在其前。',
  '水库太浅，水泵无法运行。too shallow for the pumps to operate。',
  '很少有地区降雨量足以不灌溉而种稻。enough 放在 rainfall 前。',
  '方法足够简单，大学生能应用。simple enough for undergraduates to apply。',
];
const fresh = {
  1: '样本太小，无法得出可靠结论。too small to support 表示程度不足导致结果无法实现。',
  2: '信号不够强，无法在那种深度被探测到。enough 放在 strong 后。',
  11: '只有两项研究得到复现，数量太少，无法得出一般结论。studies 可数，用 too few。',
  12: '报告批评缺少长期监测，说明对长期影响的关注太少。attention 不可数，用 too little。',
  14: '传感器反应太慢，没抓住瞬时峰值。too 可以修饰副词 slowly。',
  15: '异常值太多，导致模型无法收敛。outliers 可数，用 too many。',
  16: '水泵运行时间不够长，无法排空流域。enough 放在副词 long 后。',
  17: '样本太小，无法提供可靠估计。too small 指规模不足以支持结果。',
  18: '报告足够清晰，非专业人士也能读懂。enough 放在 clear 后。',
  19: '部门经费不足，无法升级全部设备。funding 不可数，enough 放在其前。',
  20: '不一致之处过多，审稿人无法接受这些数字。too many 修饰复数名词 inconsistencies。',
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
  fs.writeFileSync(path.join(__dirname, `../client/src/data/currentSiteA2TooEnough${label}.ts`), `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 12 课${level === 'medium' ? '中等' : '困难'}档 30 题；英文题目、选项、答案和顺序保留。\nexport const A2_TOO_ENOUGH_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`);
}
if (medium.length !== 30) throw new Error('Wrong medium count');
generate('medium', medium);
generate('hard', fresh);
