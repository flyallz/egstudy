import type { GrammarLesson } from "./content";
import { A2_QUANTIFIERS_EASY } from "./currentSiteA2QuantifiersEasy";
import { A2_QUANTIFIERS_MEDIUM } from "./currentSiteA2QuantifiersMedium";
import { A2_QUANTIFIERS_HARD } from "./currentSiteA2QuantifiersHard";

export const A2_QUANTIFIERS: Partial<GrammarLesson> = {
  titleCn: "a little、a few 与 a lot of",
  titleEn: "A little, a few & a lot of",
  intro: "a few 修饰可数名词复数，a little 修饰不可数名词；a lot of 两者都能修饰。",
  rules: [],
  openingExample: { en: "We have a little time before the train leaves.", cn: "火车开走前，我们还有一点时间。" },
  theory: [
    { heading: "1 · 重点", body: "a few 和 a little 表示“有一点”，语气较积极；去掉 a 的 few 和 little 表示“很少、几乎不够”，语气较消极。a lot of、lots of 适用于可数和不可数名词，plenty of 更强调充裕。" },
    { heading: "2 · 公式", body: "a few + 可数名词复数；a little + 不可数名词；a lot of + 可数名词复数／不可数名词。" },
    { heading: "3 · 主要内容", body: "少量但够用、太少不够用、大量、疑问和否定中的数量表达，以及名词与动词的数一致。" },
    { heading: "4 · 功能与例句", body: "先确定名词是否可数，再确定数量和语气。", examples: [
      { en: "a few friends · a little salt", cn: "几个朋友；一点盐", note: "a few 修饰可数名词复数；a little 修饰不可数名词。" },
      { en: "He has few friends. · There is little hope.", cn: "他几乎没有朋友。希望渺茫。", note: "去掉 a 之后强调数量过少。" },
      { en: "a lot of books · a lot of water", cn: "许多书；很多水", note: "a lot of、lots of 适用于两种名词；plenty of 强调充裕。" },
      { en: "Are there many left? · There isn't much time.", cn: "剩下的还多吗？时间不多了。", note: "many、much 常见于疑问和否定句；many 对应可数名词，much 对应不可数名词。" },
    ] },
    { heading: "5 · 牢记", body: "可数名词复数搭配 a few/few/many/several；不可数名词搭配 a little/little/much。a lot of、lots of、plenty of、some、any、enough 可搭配两类名词。动词与后面的中心名词保持数一致。" },
    { heading: "6 · 句式", body: "注意名词类型与语气。", table: [
      { left: "可数名词复数", right: "a few / few / many / several + questions；例：a few questions（几个问题）。" },
      { left: "不可数名词", right: "a little / little / much + milk；例：a little milk（一点牛奶）。" },
      { left: "两者通用", right: "a lot of / lots of / plenty of / some / any / enough + 名词；例：a lot of time · a lot of friends（很多时间；许多朋友）。" },
      { left: "a few / a little ↔ few / little", right: "有一点、尚够用 ↔ 太少、几乎没有。I have a little money. ↔ I have little money.（我还有点钱。↔ 我的钱所剩无几。）" },
    ] },
    { heading: "7 · 分析步骤", body: "识别名词、选择语气，再检查动词。", table: [
      { left: "01 判断名词", right: "chairs 可数，用 a few；furniture 不可数，用 a little。对比：a few chairs · a little furniture。" },
      { left: "02 判断语气", right: "a little time ↔ little time：前者表示还有一些时间，后者表示时间几乎不够。" },
      { left: "03 检查数一致", right: "a lot of people · a lot of rice：前者搭配复数动词，后者搭配单数动词。" },
    ] },
    { heading: "8 · 例句与讲解", body: "数量词选法由名词的可数性和句子想表达的语气决定。", examples: [
      { en: "We have a little time before the train leaves.", cn: "火车开走前，我们还有一点时间。", note: "time 不可数；a little 表示还有一些。" },
      { en: "I invited a few friends to dinner.", cn: "我请了几个朋友来吃晚饭。", note: "friends 是可数名词复数。" },
      { en: "He has few friends in this city, so he feels lonely.", cn: "他在这座城市几乎没什么朋友，所以感到孤独。", note: "few 不带 a，暗示朋友太少。" },
      { en: "A lot of students joined the club this year.", cn: "今年有许多学生加入了社团。", note: "students 是复数，动词也用复数形式。" },
      { en: "There is a lot of information on the website.", cn: "网站上有很多信息。", note: "information 不可数，用单数 is。" },
      { en: "There isn't much sugar left, but there are still a few biscuits.", cn: "糖没剩多少了，但还有几块饼干。", note: "sugar 不可数，配 much；biscuits 是复数，配 a few。" },
    ] },
    { heading: "9 · 对照与纠错", body: "a 是否出现会改变“少量”的语气。", table: [
      { left: "a few：有几个，可数，较积极", right: "a few days" },
      { left: "few：寥寥无几，可数，较消极", right: "few days" },
      { left: "a little：有一点，不可数，较积极", right: "a little money" },
      { left: "little：几乎没有，不可数，较消极", right: "little money" },
    ], errors: [
      { wrong: "We have a few time.", right: "We have a little time.", note: "time 不可数。" },
      { wrong: "She has a little friends here.", right: "She has a few friends here.", note: "friends 是可数名词复数。" },
      { wrong: "There are a lot of informations.", right: "There is a lot of information.", note: "information 不可数，不加 -s，并搭配单数动词。" },
    ] },
  ],
  keyPoints: ["名词是可数复数还是不可数？", "要表达有一点，还是几乎没有？", "动词是否与中心名词的数一致？", "a lot of 后的名词形式是否正确？"],
  questions: [...A2_QUANTIFIERS_EASY, ...A2_QUANTIFIERS_MEDIUM, ...A2_QUANTIFIERS_HARD],
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: [],
};
