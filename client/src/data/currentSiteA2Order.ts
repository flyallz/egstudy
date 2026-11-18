import type { GrammarLesson, QuizQuestion } from "./content";

// 原站 A2 第 9 课：理论和简单档 20 题按公开 A2 课程数据逐项翻译与核对。
const orderHint = "名词前的形容词通常按意义类别排列：主观评价离名词较远，出处、材料和用途较靠近名词。";
const choice = (q: string, options: string[], answer: string, explain: string): QuizQuestion => ({
  q, options, answer: options.indexOf(answer), explain: `${explain}${orderHint}`, difficulty: "简单", keepChoice: true,
});

export const A2_ORDER_QUESTIONS: QuizQuestion[] = [
  choice("选择词序正确的短语。", ["a red big bus", "a big red bus", "a bus big red", "a big bus red"], "a big red bus", "大红色公交车：尺寸 big 在颜色 red 前。"),
  choice("选择词序正确的餐厅描述。", ["a lovely little Italian restaurant", "a little Italian lovely restaurant", "an Italian lovely little restaurant", "an Italian little lovely restaurant"], "a lovely little Italian restaurant", "可爱的小意大利餐厅：评价 lovely、尺寸 little、出处 Italian。"),
  choice("选择正确的短语。", ["a leather black expensive jacket", "an black expensive leather jacket", "a expensive black leather jacket", "an expensive black leather jacket"], "an expensive black leather jacket", "昂贵的黑色皮夹克：评价离名词最远，材料最靠近。"),
  choice("选择更自然的短语。", ["a plastic small blue bottle", "a small blue plastic bottle", "a blue small plastic bottle", "an small blue plastic bottle"], "a small blue plastic bottle", "小蓝色塑料瓶：尺寸、颜色、材料依次排列。"),
  choice("选择包含出处的正确词序。", ["a Japanese camera new", "a Japanese new camera", "a new Japanese camera", "a camera new Japanese"], "a new Japanese camera", "新的日本相机：新旧程度在出处前。"),
  choice("形容词太多时，选择更自然的表达。", ["an small wooden box that my grandfather made", "a wooden small box that my grandfather made", "a small wooden box that my grandfather made", "a small wooden box that my grandfather did made"], "a small wooden box that my grandfather made", "爷爷做的小木盒：多项特征可用从句表达，避免堆积过多形容词。"),
  choice("选择正确的形容词顺序。", ["an old wooden beautiful small box", "a wooden old small beautiful box", "a beautiful small old wooden box", "a small beautiful wooden old box"], "a beautiful small old wooden box", "漂亮的小旧木盒：评价、尺寸、年龄、材料依次排列。"),
  choice("两个同类形容词并列时，选择正确写法。", ["It was cold a wet morning.", "It was a cold, wet, morning.", "It was a cold, wet morning.", "It was a cold wet, morning."], "It was a cold, wet morning.", "冷而潮湿的早晨：两个同类天气形容词之间用逗号。"),
  choice("选择表示用途的形容词位置。", ["an new pair of running shoes", "a running new pair of shoes", "a pair of new running shoes", "a new running pair of shoes"], "a pair of new running shoes", "一双新跑鞋：用途 running 紧靠 shoes。"),
  choice("选择正确的句子。", ["She put a black big bag on a round small table.", "She put a big black bag on a small round table.", "She put a bag big black on a table small round.", "She put a big black bag on a round small table."], "She put a big black bag on a small round table.", "大黑包的词序是尺寸再颜色；小圆桌的词序是尺寸再形状。"),
  choice("把“她买了一个漂亮的小旧木盒”译成英语。", ["She bought a small beautiful old wooden box.", "She did bought a beautiful small old wooden box.", "She is bought a beautiful small old wooden box.", "She bought a beautiful small old wooden box."], "She bought a beautiful small old wooden box.", "beautiful、small、old、wooden 分别是评价、尺寸、年龄、材料；材料最靠近名词。"),
  choice("把“一辆大红色公交车停在学校前面”译成英语。", ["An big red bus stopped in front of the school.", "A red big bus stopped in front of the school.", "A big red bus stopped in front of the school.", "A big red bus did stopped in front of the school."], "A big red bus stopped in front of the school.", "尺寸 big 在颜色 red 前。"),
  choice("把“那是一个寒冷潮湿的一月早晨”译成英语。", ["It were a cold, wet morning in January.", "It was a cold, wet morning in January.", "It was an cold, wet morning in January.", "It in January was a cold, wet morning."], "It was a cold, wet morning in January.", "cold 与 wet 都描述天气，用逗号隔开。"),
  choice("把“他穿着一件昂贵的黑色皮夹克”译成英语。", ["He wore an black expensive leather jacket.", "He did wore an expensive black leather jacket.", "He is wore an expensive black leather jacket.", "He wore an expensive black leather jacket."], "He wore an expensive black leather jacket.", "评价 expensive、颜色 black、材料 leather 依次排列，材料紧靠名词。"),
  choice("把“我们在河边找到一家可爱的小意大利餐厅”译成英语。", ["We did found a lovely little Italian restaurant near the river.", "We are found a lovely little Italian restaurant near the river.", "We found an lovely little Italian restaurant near the river.", "We found a lovely little Italian restaurant near the river."], "We found a lovely little Italian restaurant near the river.", "lovely 表评价，little 表尺寸，Italian 表出处。"),
  choice("把“我们的新老师是一位友善的年轻英国男子”译成英语。", ["Our new teacher are a friendly young Englishman.", "Our new teacher is a friendly young Englishman.", "Our teacher new is a friendly young Englishman.", "Our new is teacher is a friendly young Englishman."], "Our new teacher is a friendly young Englishman.", "评价 friendly 在年龄 young 前。"),
  choice("She has ___ hair.", ["longly brown", "long brown", "brownly long", "brown long"], "long brown", "句意是“她有一头棕色长发”。长度 long 通常在颜色 brown 前。"),
  choice("We bought ___ for the kitchen.", ["a wooden table small", "small a wooden table", "a wooden small table", "a small wooden table"], "a small wooden table", "句意是“我们给厨房买了一张小木桌”。尺寸 small 在材料 wooden 前。"),
  choice("He wore ___ to the party.", ["new a black shirt", "a black new shirt", "a shirt new black", "a new black shirt"], "a new black shirt", "句意是“他穿着一件新的黑衬衫参加聚会”。新旧程度 new 在颜色 black 前。"),
  choice("There is ___ beside the window.", ["a mirror round large", "large a round mirror", "a large round mirror", "a round large mirror"], "a large round mirror", "句意是“窗边有一面大圆镜”。尺寸 large 在形状 round 前。"),
];

export const A2_ORDER: Partial<GrammarLesson> = {
  titleCn: "形容词顺序",
  titleEn: "Adjective order",
  intro: "多个形容词共同修饰一个名词时，按评价、尺寸、年龄、形状、颜色、出处、材料和用途排列。",
  rules: [],
  openingExample: { en: "She bought a beautiful small old wooden box.", cn: "她买了一个漂亮的小旧木盒。" },
  theory: [
    { heading: "1 · 重点", body: "英语中多个形容词放在同一名词前时，顺序相对固定。通常主观评价离名词最远，客观特征及与事物性质紧密相关的材料、用途离名词最近。顺序颠倒会显得不自然。" },
    { heading: "2 · 公式", body: "评价 + 尺寸 + 年龄 + 形状 + 颜色 + 出处 + 材料 + 用途 + 名词" },
    { heading: "3 · 主要内容", body: "两个形容词的顺序 / 描述物品与人物 / 同类形容词之间的逗号" },
    { heading: "4 · 功能与例句", body: "将评价放在前面，将材料与用途放在名词旁边。", examples: [
      { en: "a big red bus", cn: "一辆大红色公交车", note: "尺寸在颜色前。" },
      { en: "a lovely little Italian restaurant", cn: "一家可爱的小意大利餐厅", note: "评价、尺寸、出处依次排列。" },
      { en: "a friendly young English teacher", cn: "一位友善的年轻英国教师", note: "评价在年龄与出处前。" },
      { en: "a cold, wet morning", cn: "一个寒冷潮湿的早晨", note: "同类形容词可用逗号或 and 隔开。" },
    ] },
    { heading: "5 · 牢记", body: "真实表达通常不会连用太多形容词；超过三项时可以分成定语从句。几个同类形容词并列可用逗号或 and。" },
    { heading: "6 · 句式", body: "形容词类别及其常见位置。", table: [
      { left: "常规顺序：评价 · 尺寸 · 年龄 · 形状 · 颜色 · 出处 · 材料 · 用途", right: "a nice big new round black Italian leather sofa" },
      { left: "评价", right: "beautiful · lovely · terrible · interesting" },
      { left: "客观特征", right: "small · old · square · blue · Japanese · plastic" },
      { left: "同类并列：形容词, 形容词；或形容词 and 形容词", right: "a dark, narrow street" },
    ] },
    { heading: "7 · 分析步骤", body: "先找评价，再排客观特征，最后控制修饰语数量。", table: [
      { left: "01 把主观评价放在前面", right: "评价通常在其他类别前：a beautiful old house。" },
      { left: "02 按类别排列客观特征", right: "尺寸在年龄前，年龄在颜色前，颜色在出处前，出处在材料前：a small old brown leather bag。" },
      { left: "03 避免过长的形容词串", right: "实际用语很少超过三个连续形容词，可改为从句：a small wooden box that my grandfather made。" },
    ] },
    { heading: "8 · 例句与讲解", body: "观察评价、尺寸、年龄、颜色和材料在同一名词前的位置。", examples: [
      { en: "She bought a beautiful small old wooden box.", cn: "她买了一个漂亮的小旧木盒。", note: "评价 beautiful、尺寸 small、年龄 old、材料 wooden；材料最靠近名词。" },
      { en: "A big red bus stopped in front of the school.", cn: "一辆大红色公交车停在学校前。", note: "尺寸 big 在颜色 red 前。" },
      { en: "We found a lovely little Italian restaurant near the river.", cn: "我们在河边找到一家可爱的小意大利餐厅。", note: "评价 lovely、尺寸 little、出处 Italian。" },
      { en: "Our new teacher is a friendly young Englishman.", cn: "我们的新老师是一位友善的年轻英国人。", note: "评价 friendly 在年龄 young 前。" },
      { en: "It was a cold, wet morning in January.", cn: "那是一月一个寒冷潮湿的早晨。", note: "cold 与 wet 都描述天气，用逗号分隔。" },
      { en: "He wore an expensive black leather jacket.", cn: "他穿着一件昂贵的黑色皮夹克。", note: "评价、颜色、材料依次排列；材料紧靠名词。" },
    ] },
    { heading: "9 · 对照与纠错", body: "越客观、越接近事物本质的特征，通常越靠近名词。", table: [
      { left: "评价：离名词最远", right: "beautiful · awful · interesting" },
      { left: "尺寸和年龄：居中", right: "big · small · old · new" },
      { left: "颜色和出处：更靠近名词", right: "red · blue · Japanese · French" },
      { left: "材料和用途：最靠近名词", right: "wooden · leather · running shoes" },
    ], errors: [
      { wrong: "She bought a wooden old small beautiful box.", right: "She bought a beautiful small old wooden box.", note: "评价应靠前，材料应紧靠名词。" },
      { wrong: "a red big bus", right: "a big red bus", note: "尺寸在颜色前。" },
      { wrong: "a leather black expensive jacket", right: "an expensive black leather jacket", note: "评价最远，材料最近；还要使用 an。" },
    ] },
  ],
  keyPoints: ["评价是否排在其他形容词前？", "材料和用途是否最靠近名词？", "同类形容词是否用逗号或 and 隔开？", "连续形容词是否过多？"],
  questions: A2_ORDER_QUESTIONS,
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: ["中等", "困难"],
};
