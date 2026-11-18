import type { GrammarLesson } from "./content";
import { A2_TOO_ENOUGH_EASY } from "./currentSiteA2TooEnoughEasy";

export const A2_TOO_ENOUGH: Partial<GrammarLesson> = {
  titleCn: "too 与 enough 的用法",
  titleEn: "Too & enough",
  intro: "too 表示程度过高而无法完成某事；enough 表示程度或数量已达到要求。",
  rules: [],
  openingExample: { en: "The box was too heavy to carry, but I was strong enough to move it.", cn: "箱子太重，搬不起来；但我有足够的力气挪动它。" },
  theory: [
    { heading: "1 · 重点", body: "too 和 enough 都把程度与结果联系起来。too 表示程度超过限制，导致某事做不到；enough 表示达到所需程度或数量，因而能做某事。enough 放在形容词或副词后，却放在名词前。" },
    { heading: "2 · 公式", body: "too + 形容词 + to do；形容词 + enough + to do；enough + 名词" },
    { heading: "3 · 主要内容", body: "程度过高 / 程度刚好足够 / 数量充足或不足 / 明确执行动作的人" },
    { heading: "4 · 功能与例句", body: "先判断结果是能够完成还是无法完成，再选择 too 或 enough。", examples: [
      { en: "It's too dark to read.", cn: "太暗了，没法阅读。", note: "too + 形容词 + to do 表示程度过高，以致不能做某事。" },
      { en: "She is old enough to vote.", cn: "她已达到投票年龄。", note: "enough 在形容词 old 后。" },
      { en: "We have enough chairs. · There isn't enough time.", cn: "我们有足够的椅子。时间不够。", note: "enough 在名词前；not enough 表示不足。" },
      { en: "The soup is too hot for the children to eat.", cn: "汤太烫，孩子们吃不了。", note: "for the children 指明动作执行者。" },
    ] },
    { heading: "5 · 牢记", body: "enough 跟形容词或副词时放后面：strong enough；跟名词时放前面：enough strength。表示结果的动作一律用 to + 动词原形；不要在不定式后重复已经提到的宾语。" },
    { heading: "6 · 句式", body: "结合所修饰词和结果确定结构。", table: [
      { left: "too + 形容词 (+ for + 人) + to do", right: "too expensive for us to buy" },
      { left: "形容词 + enough (+ for + 人) + to do", right: "warm enough to swim" },
      { left: "enough + 名词 + to do", right: "enough money to travel" },
      { left: "too much + 不可数名词；too many + 复数名词", right: "too much salt；too many people" },
    ] },
    { heading: "7 · 分析步骤", body: "判断结果、确定 enough 的位置，再检查 to do。", table: [
      { left: "01 判断程度", right: "超过界限而做不到用 too；达到条件而做得到用 enough：too small ↔ big enough。" },
      { left: "02 放置 enough", right: "在形容词或副词后，在名词前：strong enough；enough strength。" },
      { left: "03 写出结果", right: "结果动作使用 to + 动词原形：too heavy to carry，不能写 for carry。" },
    ] },
    { heading: "8 · 例句与讲解", body: "注意 too、enough 与名词和形容词的不同搭配。", examples: [
      { en: "The box was too heavy to carry, but I was strong enough to move it.", cn: "箱子太重搬不动，但我有足够的力气挪动它。", note: "too 在形容词 heavy 前；enough 在 strong 后；两边都接 to do。" },
      { en: "It's too dark to read in here.", cn: "这里太暗，没法阅读。", note: "黑暗程度超过阅读所容许的范围。" },
      { en: "She is old enough to vote in the next election.", cn: "她已达到下一次选举的投票年龄。", note: "enough 放在 old 后。" },
      { en: "We don't have enough chairs for everyone.", cn: "我们没有足够的椅子给所有人。", note: "enough 放在名词 chairs 前。" },
      { en: "The soup is too hot for the children to eat.", cn: "汤太烫，孩子们吃不了。", note: "for the children 明确无法吃汤的人。" },
      { en: "There was too much salt in the soup and too many people in the kitchen.", cn: "汤里的盐太多，厨房里的人也太多。", note: "salt 不可数，搭配 much；people 是复数，搭配 many。" },
    ] },
    { heading: "9 · 对照与纠错", body: "too 暗示程度妨碍结果；very 只表示程度高，不说明结果。", table: [
      { left: "形容词 + enough：足够做得到", right: "tall enough to reach it" },
      { left: "enough + 名词：数量足够", right: "enough chairs for everyone" },
      { left: "too + 形容词：过度而做不到", right: "too short to reach it" },
      { left: "very + 形容词：仅说明程度", right: "very tall" },
    ], errors: [
      { wrong: "The box was too heavy for carry it.", right: "The box was too heavy to carry.", note: "结果用 to do，且不重复宾语 it。" },
      { wrong: "She is enough old to vote.", right: "She is old enough to vote.", note: "enough 放在形容词后。" },
      { wrong: "We don't have chairs enough.", right: "We don't have enough chairs.", note: "enough 放在名词前。" },
    ] },
  ],
  keyPoints: ["程度是太过还是刚好足够？", "enough 在形容词后、名词前吗？", "结果动作是否使用 to do？", "是否避免重复不定式的宾语？"],
  questions: A2_TOO_ENOUGH_EASY,
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: ["中等", "困难"],
};
