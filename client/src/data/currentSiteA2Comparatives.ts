import type { GrammarLesson, QuizQuestion } from "./content";

// 原站 A2 第 10 课：理论和简单档 20 题按公开 A2 课程数据逐项翻译与核对。
const comparativeHint = "比较级要明确比较的双方，并按形容词选择 -er、more、less 或不规则形式；连接词是 than。";
const choice = (q: string, options: string[], answer: string, explain: string): QuizQuestion => ({
  q, options, answer: options.indexOf(answer), explain: `${explain}${comparativeHint}`, difficulty: "简单", keepChoice: true,
});

export const A2_COMPARATIVE_QUESTIONS: QuizQuestion[] = [
  choice("选择正确的句子。", ["B is not as bigger as A.", "B is not so bigger than A.", "B are not as big as A.", "B is not as big as A."], "B is not as big as A.", "B 不如 A 大；not as…as 后面用形容词原级。"),
  choice("选择正确的句子。", ["Her English is more better than mine, but her French is more worse.", "Her English is more good than mine, but her French is more bad.", "Her English is better than mine, but her French is worse.", "Her English is better that mine, but her French is worst."], "Her English is better than mine, but her French is worse.", "她的英语比我的好，法语却较差；good → better，bad → worse，都是不规则形式。"),
  choice("选择正确的句子。", ["She is taller than me.", "She is taller that me.", "She are taller than me.", "She is more taller than me."], "She is taller than me.", "她比我高；不能同时使用 more 和 -er。"),
  choice("选择 cheap 的比较级。", ["more cheap", "cheapest", "more cheaper", "cheaper"], "cheaper", "cheap 是单音节形容词，加 -er 得 cheaper。"),
  choice("选择 good 的比较级。", ["gooder", "better", "more good", "best"], "better", "good 的不规则比较级是 better。"),
  choice("She is ___ tall ___ her brother.", ["as / as", "more / than", "as / than", "so / as"], "as / as", "她和哥哥一样高；同级比较用 as + 形容词原级 + as。"),
  choice("选择 big 的比较级。", ["biger", "more big", "biggest", "bigger"], "bigger", "big 在加 -er 前双写末尾辅音字母 g。"),
  choice("选择强调差距很大的词：This laptop is ___ faster than mine.", ["so", "very", "much", "too"], "much", "这台笔记本电脑比我的快很多；much 可放在比较级前加强程度，very 不这样用。"),
  choice("把“今天比昨天热”译成英语。", ["Today is hotter that yesterday.", "Today is hotter than yesterday.", "Today are hotter than yesterday.", "Today it is hotter than yesterday."], "Today is hotter than yesterday.", "hot 末尾是元音加辅音，双写 t 再加 -er。"),
  choice("把“她和哥哥一样高”译成英语。", ["She are as tall as her brother.", "She is as tall her as brother.", "She as tall as her brother.", "She is as tall as her brother."], "She is as tall as her brother.", "as…as 表示两者程度相同，中间用形容词原级。"),
  choice("把“这本书比那本有趣”译成英语。", ["This book is more interesting that that one.", "This book is more interesting than that one.", "This book are more interesting than that one.", "This book it is more interesting than that one."], "This book is more interesting than that one.", "interesting 是多音节形容词，前加 more，后面用 than 连接。"),
  choice("把“红色的包比蓝色的包便宜”译成英语。", ["The red bag is cheaper that the blue one.", "The red bag is cheaper than the blue one.", "The red bag are cheaper than the blue one.", "The bag red is cheaper than the blue one."], "The red bag is cheaper than the blue one.", "cheap 是单音节形容词，加 -er。"),
  choice("选择正确的句子。", ["This exercise are easier than that one.", "This exercise is more easy than that one.", "This exercise is easier than that one.", "This exercise is easier that that one."], "This exercise is easier than that one.", "easy 以辅音加 y 结尾，变 y 为 i 再加 -er。"),
  choice("This book is more interesting ___ that one.", ["than", "then", "as", "that"], "than", "比较级的两边用 than 连接，不能用 then 或 that。"),
  choice("把“这款手机比旧型号贵得多”译成英语。", ["This phone is much more expensive than the old model.", "This phone are much more expensive than the old model.", "This phone is much more expensive than the model old.", "This phone is much more expensive that the old model."], "This phone is much more expensive than the old model.", "much 放在比较级前，强调价格差距大。"),
  { q: "Today is ___ than yesterday.", options: [], answer: 0, answerText: "hotter", sentence: "Today is hotter than yesterday.", explain: `今天比昨天热；hot 双写末尾 t 后加 -er。${comparativeHint}`, difficulty: "简单", kind: "blank" },
  choice("My suitcase is ___ than yours.", ["heaviest", "heavyer", "more heavy", "heavier"], "heavier", "我的行李箱比你的重；heavy 以辅音加 y 结尾，变 y 为 i 再加 -er。"),
  choice("This road is ___ than the old one.", ["wider", "more wider", "widest", "wideer"], "wider", "这条路比旧路宽；wide 已经以 e 结尾，只加 r。"),
  choice("Today is ___ than Monday.", ["more colder", "coldest", "colder", "most cold"], "colder", "今天比星期一冷；cold 是短形容词，加 -er。"),
  choice("My bedroom is ___ than my brother's.", ["more tidy", "tidiest", "tidier", "tidyier"], "tidier", "我的卧室比哥哥的整洁；tidy 变 y 为 i 再加 -er。"),
];

export const A2_COMPARATIVES: Partial<GrammarLesson> = {
  titleCn: "比较级",
  titleEn: "Comparatives",
  intro: "短形容词通常加 -er，长形容词用 more，比较双方由 than 连接。",
  rules: [],
  openingExample: { en: "This book is more interesting than that one.", cn: "这本书比那本书有趣。" },
  theory: [
    { heading: "1 · 重点", body: "比较级把两个人、物或状态放在一起，说明其中一方在某方面的程度更高。一个音节的形容词一般加 -er，三个及以上音节一般加 more；双音节词依词尾变化。两个比较对象之间用 than。" },
    { heading: "2 · 公式", body: "形容词 + -er / more + 形容词 + than" },
    { heading: "3 · 主要内容", body: "比较两人或两物 / 比较两个时间与状态 / 强调差距 / 同级与较低程度的比较" },
    { heading: "4 · 功能与例句", body: "比较可以指出程度高低，也可以强调差距。", examples: [
      { en: "My bag is heavier than yours.", cn: "我的包比你的重。", note: "两边的对象明确，用 than 连接。" },
      { en: "Today is colder than yesterday.", cn: "今天比昨天冷。", note: "比较两个时间的状态。" },
      { en: "This is much cheaper than that.", cn: "这个比那个便宜得多。", note: "much、far、a bit、slightly 可修饰比较级。" },
      { en: "She is as tall as her brother.", cn: "她和哥哥一样高。", note: "as…as 表示相同程度；less…than 表示程度较低。" },
    ] },
    { heading: "5 · 牢记", body: "不要在同一个形容词上同时使用 more 和 -er。不规则形式要单独记：good → better，bad → worse，far → farther/further。" },
    { heading: "6 · 句式", body: "根据音节数与词尾决定比较级形式。", table: [
      { left: "单音节：形容词 + -er", right: "tall → taller；cheap → cheaper" },
      { left: "特殊拼写：双写辅音；辅音 + y 变 -ier", right: "big → bigger；happy → happier" },
      { left: "三个及以上音节：more + 形容词", right: "interesting → more interesting" },
      { left: "不规则", right: "good → better；bad → worse；far → farther/further" },
    ] },
    { heading: "7 · 分析步骤", body: "确认音节数，应用拼写规则，最后用 than 连接。", table: [
      { left: "01 数音节", right: "单音节通常用 -er；三个及以上音节用 more；双音节词要看词尾，-y、-er、-ow 常加 -er：narrow → narrower；modern → more modern。" },
      { left: "02 检查拼写", right: "元音加辅音结尾的单音节词通常双写辅音；辅音加 y 变 -ier：hot → hotter；easy → easier。" },
      { left: "03 连接比较双方", right: "用 than；that 和 then 都不对：cheaper than this one。" },
    ] },
    { heading: "8 · 例句与讲解", body: "观察长短形容词、拼写变化、不规则形式与程度修饰。", examples: [
      { en: "This book is more interesting than that one.", cn: "这本书比那本有趣。", note: "interesting 有四个音节，前加 more；用 than 连接。" },
      { en: "The red bag is cheaper than the blue one.", cn: "红色的包比蓝色的便宜。", note: "cheap 是单音节词，加 -er。" },
      { en: "Today is hotter than yesterday.", cn: "今天比昨天热。", note: "hot 双写 t 后加 -er。" },
      { en: "Her English is better than mine, but her French is worse.", cn: "她的英语比我的好，但法语较差。", note: "good → better、bad → worse 是不规则形式。" },
      { en: "This phone is much more expensive than the old model.", cn: "这款手机比旧型号贵得多。", note: "much 放在比较级前强调差距。" },
      { en: "She is as tall as her brother.", cn: "她和哥哥一样高。", note: "as…as 中间放形容词原级。" },
    ] },
    { heading: "9 · 对照与纠错", body: "区分更高、相同与较低程度。", table: [
      { left: "more / -er … than：更……", right: "A is bigger than B." },
      { left: "as … as：一样……", right: "A is as big as B." },
      { left: "not as … as / less … than：不如……", right: "B is not as big as A." },
    ], errors: [
      { wrong: "This book is more interesting that that one.", right: "This book is more interesting than that one.", note: "比较级的连接词是 than，不是 that。" },
      { wrong: "She is more taller than me.", right: "She is taller than me.", note: "more 和 -er 不能同时用于同一个形容词。" },
      { wrong: "This exercise is more easy than that one.", right: "This exercise is easier than that one.", note: "easy 以 -y 结尾，变为 easier。" },
    ] },
  ],
  keyPoints: ["形容词有几个音节？", "比较级用 -er 还是 more，是否只用其中一种？", "双写辅音或 y → i 的拼写是否正确？", "两边是否由 than 连接？"],
  questions: A2_COMPARATIVE_QUESTIONS,
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: ["中等", "困难"],
};
