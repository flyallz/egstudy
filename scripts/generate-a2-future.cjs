const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[4];
const medium = [
  '电话响了，我现在决定去接。临时决定用 will。',
  '那根树枝已经断了，看起来快掉下来。it 是单数，用 is going to 表示有眼前迹象的预测。',
  '我们计划下周六参观科学博物馆。we 搭配 are going to。',
  '我保证不会告诉任何人你的密码。否定承诺用 won\'t，即 will not。',
  '你能帮我搬这个箱子吗？Will 位于句首，可以提出请求。',
  '他们昨天买了机票，周五要坐飞机。已购票说明计划在先；are 后接 going to。',
  '我觉得我们队明天会赢。I think 表示主观预测，常用 will。',
  'Mai 改了计划，现在不打算参加研讨会。she 的 be going to 否定式用 isn\'t going to。',
  '别担心，我到了会给你打电话。说话时作出的承诺用 will。',
  '我父母计划今年夏天翻修厨房。parents 是复数，用 are going to。',
  '天开始黑了，我这就开灯。说话当场作决定用 will。',
  '她打算申请奖学金吗？be going to 的问句把 Is 放在 she 前。',
  '我确信新图书馆会吸引更多学生。I\'m sure 表示预测，通常用 will。',
  '我们不打算在讲座结束前离开。we 的否定式是 aren\'t going to。',
  '打印机没纸了，我现在去拿一包。根据刚发现的情况临时决定，用 will。',
  '天空很暗，看来快下雨了。根据眼前迹象预测，用 is going to。',
  '得知家里没面包后，B 当场决定去面包店买。此处用 will。',
  '孩子们已收好行李，周末计划住在姨妈家。are 后接 going to。',
  '我保证周五前还书。承诺用 will。',
  '天空变暗，风越来越大，看来要起暴风雨。眼前证据支持预测，用 going to。',
  '我们已定好日期，计划周一开店。预先安排的计划用 are going to。',
  '按照目前趋势，赤字将进一步扩大。deficit 是单数，当前趋势是预测依据，用 is going to。',
  '海平面可能比先前估计上升得更快。probably 表示预测；will 后用原形 rise。',
  '看看这些读数，传感器恐怕快坏了。读数是眼前证据，使用 is going to fail。',
  '会议将于明年十月在河内举行。未来被动语态是 will be 加过去分词 held。',
  '到 2030 年，该市的可再生能源装机容量将翻一番。by 2030 搭配将来完成时 will have doubled。',
  '水库几乎空了，限量供水看来很快会开始。水库水位是眼前证据；rationing 是单数，用 is going to。',
  '根据校方公告，大学不会延长期限。will not 后接动词原形 extend。',
  '我认为新交通政策明年会缓解拥堵。I think 引出主观预测，用 will。',
  '研究人员昨天宣布了计划，下月将公布完整数据集。既有计划用 are going to。',
];
const hardNew = {
  2: '模型预测气温将升高两度。这里报告模型的预测，用 will rise。',
  4: '报告指出，仅更换车队不足以解决所有排放问题。因此说不会解决问题，用 will not。',
  5: '该部上周已宣布要审查政策。既定计划用 is going to review。',
  9: '只要资金继续到位，调查就会再进行十年。条件句的 if 从句用现在时 continues，主句用 will run。',
  12: '没人知道趋势是否会持续。whether 从句中用 will continue 表示未来。',
  13: '如果数据不清楚，我们就重新测量。主句用 will repeat 表示将采取的行动。',
  14: '该机构上周已公布出版计划，禁发期结束后将发布报告。主语 it 是单数，既定计划用 is going to publish。',
  15: '专家说仅靠植树不足以完全抵消排放，因此这里用 won\'t offset。',
  16: '按目前数据，需求预计将在本十年末超过供给。现有趋势支持预测，用 is going to exceed。',
  17: '实验室已批准时间表，计划十一月公布初步数字。is going to 表示既定安排。',
  18: '部长刚看完报告，当场说要立即复核。临时决定用 will。',
  19: '当前读数很高，传感器快触发警报。现有读数是证据，用 is going to。',
};
function key(s) { return JSON.stringify([s.type, s.sentence || '', s.options || [], s.answer]); }
const mediumByKey = new Map(unit.levels.medium.map((idx, i) => [key(unit.pool[idx]), medium[i]]));
function generate(level, translations) {
  const rows = unit.levels[level].map((poolIndex, i) => {
    const source = unit.pool[poolIndex];
    const explain = level === 'medium' ? translations[i] : translations[i + 1] || mediumByKey.get(key(source));
    if (!explain) throw new Error(`${level} #${i + 1}: missing translation`);
    const q = source.sentence || '选择正确的句子。';
    const common = { q, explain, difficulty: level === 'medium' ? '中等' : '困难' };
    if (source.type === 'fill') return { ...common, options: [], answer: 0, answerText: source.answer, sentence: q.replace('___', source.answer), kind: 'blank' };
    return { ...common, options: source.options, answer: source.options.indexOf(source.answer), keepChoice: true };
  });
  const label = level === 'medium' ? 'Medium' : 'Hard';
  fs.writeFileSync(path.join(__dirname, `../client/src/data/currentSiteA2Future${label}.ts`), `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 5 课${level === 'medium' ? '中等' : '困难'}档 30 题；英文句子、选项、答案和顺序保留。\nexport const A2_FUTURE_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`);
}
if (medium.length !== 30) throw new Error('Wrong medium count');
generate('medium', medium);
generate('hard', hardNew);
