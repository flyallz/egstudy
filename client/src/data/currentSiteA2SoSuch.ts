import type { GrammarLesson } from "./content";
import { A2_SO_SUCH_EASY } from "./currentSiteA2SoSuchEasy";

export const A2_SO_SUCH: Partial<GrammarLesson> = {
  titleCn: "so 与 such 的用法",
  titleEn: "So & such",
  intro: "so 修饰形容词或副词，such 修饰名词短语；两者都能用 that 从句说明结果。",
  rules: [],
  openingExample: { en: "It was such a cold night that we stayed indoors.", cn: "那一夜冷得我们待在室内。" },
  theory: [
    { heading: "1 · 重点", body: "so 放在单独的形容词或副词前；such 放在名词短语前。可用 that + 完整从句说明程度造成的结果。单数可数名词前要保留 a/an。" },
    { heading: "2 · 公式", body: "so + 形容词／副词 (+ that + 从句)；such + (a/an) + (形容词) + 名词 (+ that + 从句)" },
    { heading: "3 · 主要内容", body: "so + 形容词或副词；such + 名词短语；that 结果从句；so many/much/few/little + 名词。" },
    { heading: "4 · 功能与例句", body: "看 so 或 such 后面修饰的核心词；many、much、few、little 构成数量结构时仍用 so。", examples: [
      { en: "The film was so long.", cn: "这部电影太长了。", note: "long 是单独的形容词，用 so。" },
      { en: "It was such a long film.", cn: "这真是一部很长的电影。", note: "a long film 是单数名词短语，用 such a。" },
      { en: "He spoke so quietly that nobody heard him.", cn: "他说话太轻了，没人听见。", note: "quietly 是副词，that 后说明结果。" },
      { en: "There were so many people that we left.", cn: "人太多了，我们便离开了。", note: "many people 表示数量，用 so many。" },
    ] },
    { heading: "5 · 牢记", body: "遇到名词短语通常用 such，遇到单独的形容词或副词用 so；但 many、much、few、little 前用 so。单数可数名词前加 a/an，复数与不可数名词不加。that 从句可以省略，单纯表示强调。" },
    { heading: "6 · 句式", body: "根据后面的词和是否说明结果选择结构。", table: [
      { left: "so + 形容词／副词 (+ that + 从句)", right: "so tired that she fell asleep" },
      { left: "such + (a/an) + (形容词) + 名词 (+ that + 从句)", right: "such a kind woman" },
      { left: "so many/much/few/little + 名词", right: "so much noise" },
      { left: "省略 that 从句，仅表示强调", right: "Thank you — you're so kind!" },
    ] },
    { heading: "7 · 分析步骤", body: "先看修饰对象，再检查冠词和结果从句。", table: [
      { left: "01 看后面的词", right: "名词短语通常选 such；没有名词、只修饰形容词或副词选 so；数量词 many/much/few/little 选 so。" },
      { left: "02 检查冠词", right: "such 后的单数可数名词保留 a/an；复数和不可数名词不加。" },
      { left: "03 补充结果", right: "需要说明结果时，接 that + 完整从句。" },
    ] },
    { heading: "8 · 例句与讲解", body: "同一意思可以通过不同句式表达。", examples: [
      { en: "It was such a cold night that we stayed indoors.", cn: "那一夜冷得我们待在室内。", note: "a cold night 是名词短语，用 such a。" },
      { en: "The night was so cold that we stayed indoors.", cn: "那一夜太冷，我们待在室内。", note: "cold 单独作形容词，用 so。" },
      { en: "He spoke so quietly that nobody could hear him.", cn: "他说话太轻了，没人能听见。", note: "so 修饰副词 quietly。" },
      { en: "There were so many people at the market that we decided to leave.", cn: "市场里人太多，我们决定离开。", note: "many 构成数量结构，用 so many。" },
      { en: "That was such good news!", cn: "那真是太好的消息了！", note: "news 不可数，前面不加冠词。" },
      { en: "Thank you for helping — you are so kind.", cn: "谢谢你的帮助，你真好。", note: "单纯强调时不需要 that 从句。" },
    ] },
    { heading: "9 · 对照与纠错", body: "看形容词后是否带名词，并留意数量结构。", table: [
      { left: "so + 形容词：没有后续名词", right: "so cold" },
      { left: "such + a/an + 形容词 + 单数名词", right: "such a cold night" },
      { left: "such + 形容词 + 复数／不可数名词", right: "such good news" },
      { left: "so + many/much + 名词", right: "so many people" },
    ], errors: [
      { wrong: "It was so a cold night that we stayed indoors.", right: "It was such a cold night that we stayed indoors.", note: "a cold night 是名词短语，应使用 such。" },
      { wrong: "She is such tired that she went to bed.", right: "She is so tired that she went to bed.", note: "tired 单独作形容词，应使用 so。" },
      { wrong: "There were such many people that we left.", right: "There were so many people that we left.", note: "many 前使用 so。" },
    ] },
  ],
  keyPoints: ["后面是形容词／副词，还是名词短语？", "单数可数名词前保留 a/an 了吗？", "many、much、few、little 前是否用了 so？", "that 后是否是完整从句？"],
  questions: A2_SO_SUCH_EASY,
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: ["中等", "困难"],
};
