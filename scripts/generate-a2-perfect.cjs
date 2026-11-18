const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[5];
const medium = [
  '我以前从未坐过飞机。I 用 have，never 放在过去分词 travelled 前。',
  'Lan 到过这座博物馆三次。Lan 为单数第三人称，用 has visited。',
  '你曾在野外见过鲸鱼吗？have you ever 后接 see 的过去分词 seen。',
  '姐姐去过新加坡，而我没去过。has been to 表示到过并已回来。',
  '爸爸不在家，他去超市了。has gone to 表示去了且尚未回来。',
  '你喝过越南鸡蛋咖啡吗？ever 在 have 与过去分词 tried 之间询问经历。',
  '我从没吃过牡蛎，所以不知道味道。never 表示从未有此经历，不再加 not。',
  '她本月为校刊写了两篇文章。write 的过去分词是 written；this month 仍是当前时间段。',
  '学生们已经交了作业，可以休息。already 强调事情在说话前已经完成。',
  '老师已经批改我们的作文了吗？yet 在疑问句末尾表示“已经……了吗”。',
  '火车刚到，现在可以上车。just 放在 has 和 arrived 之间表示刚刚发生。',
  '我们从 2020 年起一直住在这里。since 表示起点；we 搭配 have lived。',
  '研究团队迄今完成三次调查。team 在此视作单数整体，用 has completed；so far 表示到目前为止。',
  '我已经做完今天的作业。do 的过去分词是 done，放在 have 后。',
  '我还没读完书，但已到最后一章。I haven\'t finished 与 yet 表示至今尚未完成。',
  '你哥哥去过大叻吗？your brother 是单数，问句以 Has 开头。',
  'Lan 已从巴黎回来，她以前去过那里。has been 表示曾去且已返回。',
  '我们还没收到结果，因此不能公布获胜者。haven\'t received 与 yet 搭配。',
  '我父母去过新加坡几次，而我一次也没去过。been to 表示到过某地的经历。',
  '她刚填完申请表，现在可以提交。has just completed 中用过去分词 completed。',
  '你的邻居住过国外吗？Have + 主语 + ever + 过去分词 lived 表示询问经历。',
  '研究人员已发表四篇有关该机制的论文。researchers 为复数，用 have published。',
  '这项发现从未在原实验室之外得到重复验证。has never been replicated 为现在完成时的被动式。',
  '截至此次审查，其他团队尚未报告同样效果。other teams 为复数，用 have not reported。',
  '作者们曾公布原始数据吗？authors 为复数，问句以 Have 开头；ever 放在过去分词前。',
  '该研究所今年已撤回两篇论文。institute 作单数整体，用 has already withdrawn。',
  '尚无人解释这项差异。nobody 为单数，用 has；yet 表示迄今仍未。',
  '该政策已生效六年。for 后接时间长度，has been 表示持续到现在。',
  '委员会至今没有采取行动。committee 作单数整体；take 的过去分词是 taken。',
  '过去二十年中，证明这种关联的证据不断增加。evidence 不可数，用 has grown。',
];
const fresh = {
  1: '自 1990 年以来，婴儿死亡率下降了一半。infant mortality 为单数，fall 的过去分词是 fallen。',
  5: '该机构自 1987 年以来一直收集数据。since 后接起始时间；单数主语用 has collected。',
  6: '自有记录以来，海冰每十年都在缩减。sea ice 作单数，shrink 的过去分词是 shrunk。',
  10: '自 2019 年审查以来，淡化海水的需求稳步上升。demand 是单数，rise 的过去分词是 risen。',
  11: '自一月以来，已有三份独立警报发出。warnings 是复数，完成时被动语态用 have been issued。',
  14: '排放量在 2020 年下降，但此后又上升。in 2020 是已结束的过去时间，用 fell；since 表示至今，用 have risen。',
  16: '一些国家已经达到 2030 年目标。countries 是复数，用 have already met。',
  17: '该研究所今年已主办两次国际会议。has already 后接过去分词 hosted。',
  18: '科学家在森林中发现了一个先前未知的物种。have 后接过去分词 discovered。',
  19: '编辑至今尚未收到修改后的稿件。has not 后用过去分词 received；yet 表示仍未收到。',
  20: '参与者以前参加过线上实验吗？take part in 表示参加，过去分词用 taken。',
  21: '大学已向公众开放数字档案。has 后接 make 的过去分词 made。',
};
function key(q) { return JSON.stringify([q.type, q.sentence || '', q.options || [], q.answer]); }
const byKey = new Map(unit.levels.medium.map((idx, i) => [key(unit.pool[idx]), medium[i]]));
function generate(level, translations) {
  const rows = unit.levels[level].map((poolIndex, i) => {
    const source = unit.pool[poolIndex];
    const explain = level === 'medium' ? translations[i] : translations[i + 1] || byKey.get(key(source));
    if (!explain) throw new Error(`${level} #${i + 1}: missing translation`);
    const q = source.sentence ? `${source.sentence}${source.cue ? `（提示：${source.cue === 'phủ định' ? '否定' : source.cue}）` : ''}` : '选择正确的句子。';
    const common = { q, explain, difficulty: level === 'medium' ? '中等' : '困难' };
    if (source.type === 'fill') return { ...common, options: [], answer: 0, answerText: source.answer, sentence: source.sentence.replace('___', source.answer), kind: 'blank', ...(source.cue ? { baseWord: source.cue } : {}) };
    return { ...common, options: source.options, answer: source.options.indexOf(source.answer), keepChoice: true };
  });
  const label = level === 'medium' ? 'Medium' : 'Hard';
  fs.writeFileSync(path.join(__dirname, `../client/src/data/currentSiteA2Perfect${label}.ts`), `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 6 课${level === 'medium' ? '中等' : '困难'}档 30 题；英文题目、选项、答案和顺序保留。\nexport const A2_PERFECT_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`);
}
if (medium.length !== 30) throw new Error('Wrong medium count');
generate('medium', medium);
generate('hard', fresh);
