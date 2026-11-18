import type { GrammarLesson, QuizQuestion } from "./content";

// 原站 A2 第 6 课：理论和简单档 20 题按公开 A2 课程数据逐项翻译与核对。
const perfectHint = "现在完成时用 have/has + 过去分词，强调截至现在的经历、结果或延续；已结束的明确过去时间用一般过去时。";
const choice = (q: string, options: string[], answer: string, explain: string): QuizQuestion => ({
  q, options, answer: options.indexOf(answer), explain: `${explain}${perfectHint}`, difficulty: "简单", keepChoice: true,
});

export const A2_PERFECT_QUESTIONS: QuizQuestion[] = [
  choice("选择正确的句子。", ["I have visited Hanoi last year.", "I have visit Hanoi last year.", "I has visited Hanoi last year.", "I visited Hanoi last year."], "I visited Hanoi last year.", "句意是“去年我去了河内”。last year 是已结束的过去时间，要用一般过去时。"),
  choice("选择表示结果仍影响现在的句子。", ["I have losing my keys, so I can’t get in.", "I have lose my keys, so I can’t get in.", "I have lost my keys, so I can’t get in.", "I am lose my keys, so I can’t get in."], "I have lost my keys, so I can’t get in.", "丢钥匙的结果是现在无法进去；用现在完成时强调现存的后果。"),
  choice("他已完成工作，现在正在休息。选择正确的句子。", ["He have finished his work.", "He has finish his work.", "He has finished his work.", "He has finished his works."], "He has finished his work.", "he 是第三人称单数，用 has；finished 是过去分词。"),
  choice("选择 write 的过去分词。", ["wrote", "written", "writed", "writing"], "written", "write → wrote → written；have/has 后用第三形式 written。"),
  choice("选择正确的句子。", ["She has went to the market.", "She have gone to the market.", "She to the market has gone.", "She has gone to the market."], "She has gone to the market.", "句意是“她去了市场，还没回来”。go 的过去分词是 gone。"),
  choice("My parents ___ lived here for twenty years.", ["are", "has", "have", "is"], "have", "句意是“我父母在这里住了二十年”。my parents 是复数，搭配 have。"),
  choice("Mai 不在这里。正确使用 been 和 gone：Mai is not here. She ___ to the library.", ["has been", "has gone", "have gone", "is gone"], "has gone", "has gone 表示去了图书馆、现在仍在那里；has been 表示去过并已回来。"),
  choice("选择正确的句子。", ["He have failed the test twice so far.", "He failed the test twice so far.", "He has failed the test twice so far.", "He has fail the test twice so far."], "He has failed the test twice so far.", "句意是“到目前为止，他考试已不及格两次”。so far 表示尚未结束的时间段，用现在完成时。"),
  choice("I ___ to Hue twice, and I ___ there last April.", ["have been / have gone", "went / have been", "was / have went", "have been / went"], "have been / went", "前半句谈截至现在的经历，不说具体时间；后半句有 last April，要用一般过去时。"),
  choice("把“我去过河内三次”译成英语。", ["I have visits Hanoi three times.", "I has visited Hanoi three times.", "I have visited Hanoi three times.", "I have visited Hanoi three time."], "I have visited Hanoi three times.", "没有给出已结束的时间点；强调截至现在的次数，且次数还可能增加。"),
  choice("把“她从未吃过榴莲”译成英语。", ["She has never eaten durian.", "She never eaten durian.", "I has never eaten durian.", "She have never eaten durian."], "She has never eaten durian.", "never 放在 has 与过去分词 eaten 之间，本身已表否定。"),
  choice("把“他刚做完作业”译成英语。", ["He have just finished his homework.", "He has just finished his homeworks.", "He has just finish his homework.", "He has just finished his homework."], "He has just finished his homework.", "just 表示刚完成，结果仍与现在有关。"),
  choice("把“你去过日本吗？”译成英语。", ["Has you ever been to Japan?", "Have you ever been to Japan?", "You Have ever been to Japan?", "You ever been to Japan?"], "Have you ever been to Japan?", "ever 用于询问经历；been 是 be 的过去分词。"),
  choice("I have ___ that film twice.", ["saw", "see", "seeing", "seen"], "seen", "句意是“我看过那部电影两次”。have 后用 see 的过去分词 seen。"),
  choice("把“这个月我们读了两本书”译成英语。", ["We has read two books this month.", "We have reads two books this month.", "We have read two books this month.", "We have read two book this month."], "We have read two books this month.", "this month 尚未结束，用现在完成时表示截至目前的数量。"),
  choice("把“我弄丢了钥匙，所以进不去”译成英语。", ["I has lost my keys, so I can’t get in.", "I have lose my keys, so I can’t get in.", "I have lost my keys, so I can’t get in.", "I have lost my keys, so I can’t gotten in."], "I have lost my keys, so I can’t get in.", "丢钥匙发生在过去，但现在仍无法进去，强调现存结果。"),
  choice("I have never ___ a horse.", ["ridden", "ride", "rode", "riding"], "ridden", "句意是“我从没骑过马”。ride 的过去分词是 ridden，放在 have 后。"),
  choice("___ you ever eaten Korean food?", ["Are", "Did", "Have", "Has"], "Have", "询问截至现在的经历，用 Have you ever 加过去分词 eaten。"),
  choice("My sister has ___ her room already.", ["cleans", "clean", "cleaned", "cleaning"], "cleaned", "句意是“我姐姐已经打扫好房间了”。has 后接过去分词 cleaned。"),
  choice("We have ___ this game three times.", ["play", "plays", "playing", "played"], "played", "句意是“我们玩过这个游戏三次”。have played 表示截至说话时的经历次数。"),
];

export const A2_PERFECT: Partial<GrammarLesson> = {
  titleCn: "现在完成时：经历与结果",
  titleEn: "Present perfect: experience",
  intro: "谈截至现在的经历或结果，不说已结束的具体过去时间。",
  rules: [],
  openingExample: { en: "I have visited Hanoi three times.", cn: "我去过河内三次。" },
  theory: [
    { heading: "1 · 重点", body: "现在完成时把过去发生的事与现在联系起来，强调截至此刻的经历或仍存在的结果。它不能与 yesterday、last year 等已结束的具体过去时间连用。结构是 have/has + 过去分词，即动词的第三形式。" },
    { heading: "2 · 公式", body: "主语 + have / has + 过去分词（V3）" },
    { heading: "3 · 主要内容", body: "人生经历 / 刚完成而有结果 / 截至现在的次数 / 尚未结束的时间段" },
    { heading: "4 · 功能与例句", body: "关注是否有具体时间，以及过去的事如何与现在相连。", examples: [
      { en: "I have been to Japan.", cn: "我去过日本。", note: "谈是否有过经历，不说发生在何时。" },
      { en: "She has just finished her report.", cn: "她刚完成报告。", note: "just、already、yet 常用于刚发生且结果仍相关的事。" },
      { en: "He has failed the test twice.", cn: "他到目前为止考砸过两次。", note: "截至现在的次数还可能增加。" },
      { en: "I have read two books this month.", cn: "这个月我读了两本书。", note: "this month 尚未结束。" },
    ] },
    { heading: "5 · 牢记", body: "he、she、it 和单数名词用 has；其余主语用 have。后面必须是过去分词，不规则动词的过去式与过去分词可能不同。" },
    { heading: "6 · 句式", body: "肯定、否定、疑问和不规则过去分词。", table: [
      { left: "肯定：I/you/we/they + have + V3；he/she/it + has + V3", right: "She has finished." },
      { left: "否定：haven't / hasn't + V3", right: "They haven't arrived." },
      { left: "疑问：Have/Has + 主语 + V3？", right: "Have you eaten?" },
      { left: "规则与不规则过去分词", right: "work → worked；go → gone；see → seen；write → written；make → made" },
      { left: "常见不规则形式", right: "break → broken；go → gone；write → written；take → taken" },
    ] },
    { heading: "7 · 分析步骤", body: "先选 have/has，再选过去分词，最后检查时间状语。", table: [
      { left: "01 让 have/has 与主语一致", right: "he、she、it 和单数名词用 has，其余用 have：My sister has…。" },
      { left: "02 使用过去分词", right: "不规则动词的过去式与过去分词可能不同：I have seen it，不能说 I have saw it。" },
      { left: "03 检查具体过去时间", right: "yesterday、last year、in 2020 要用一般过去时：I saw it yesterday。" },
    ] },
    { heading: "8 · 例句与讲解", body: "经历、结果和未结束的时间段都可与现在完成时相连。", examples: [
      { en: "I have visited Hanoi three times.", cn: "我去过河内三次。", note: "不说具体时间，强调截至现在的次数，次数还可能增加。" },
      { en: "She has never eaten durian.", cn: "她从未吃过榴莲。", note: "never 放在 has 与过去分词之间，已含否定意义。" },
      { en: "He has just finished his homework.", cn: "他刚做完作业。", note: "just 强调刚完成，结果仍与现在有关。" },
      { en: "Have you ever been to Japan?", cn: "你去过日本吗？", note: "ever 用于问经历；been 是 be 的过去分词。" },
      { en: "We have read two books this month.", cn: "这个月我们读了两本书。", note: "this month 尚未结束。" },
      { en: "I have lost my keys, so I can't get in.", cn: "我弄丢了钥匙，所以现在进不去。", note: "丢钥匙发生在过去，后果仍存在。" },
    ] },
    { heading: "9 · 对照与纠错", body: "看是否有已结束的过去时间，并区分 been 与 gone。", table: [
      { left: "have/has + V3：不说具体过去时间，关注结果", right: "I have seen that film." },
      { left: "过去式：有已结束的时间点", right: "I saw that film last night." },
      { left: "been：去过并回来了；gone：去了仍在那里", right: "She has been to Hue. ↔ She has gone to Hue." },
    ], errors: [
      { wrong: "I have visited Hanoi last year.", right: "I visited Hanoi last year.", note: "last year 是已结束的时间，要用一般过去时。" },
      { wrong: "She has went to the market.", right: "She has gone to the market.", note: "has 后要用过去分词 gone，不能用过去式 went。" },
      { wrong: "He have finished his work.", right: "He has finished his work.", note: "第三人称单数用 has。" },
    ] },
  ],
  keyPoints: ["句中是否有已结束的具体过去时间？", "have/has 是否与主语一致？", "主要动词是否用了过去分词？", "just、never、ever 是否放在助动词与主要动词之间？"],
  questions: A2_PERFECT_QUESTIONS,
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: ["中等", "困难"],
};
