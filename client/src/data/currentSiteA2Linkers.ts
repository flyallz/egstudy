import type { GrammarLesson } from "./content";
import { A2_LINKERS_EASY } from "./currentSiteA2LinkersEasy";
import { A2_LINKERS_MEDIUM } from "./currentSiteA2LinkersMedium";
import { A2_LINKERS_HARD } from "./currentSiteA2LinkersHard";

export const A2_LINKERS: Partial<GrammarLesson> = {
  titleCn: "and、but、or、so 与 because",
  titleEn: "And, but, or, so & because",
  intro: "用连接词表示补充、对比、选择、结果或原因；根据两部分的逻辑关系选词。",
  rules: [],
  openingExample: { en: "It was raining, so we stayed at home.", cn: "下雨了，所以我们待在家里。" },
  theory: [
    { heading: "1 · 重点", body: "and 增加信息，but 表示转折，or 表示选择；so 引出结果，because 引出原因。so 与 because 都能描述因果关系，但接续的方向相反。" },
    { heading: "2 · 公式", body: "从句／短语 + 连接词 + 从句／短语；原因 + so + 结果；结果 + because + 原因。" },
    { heading: "3 · 主要内容", body: "补充、转折、选择、原因和结果；because 与 because of；although/though/even though；so 与 so that。" },
    { heading: "4 · 功能与例句", body: "先判断前后两部分的逻辑关系。", examples: [
      { en: "She sings and plays the piano.", cn: "她会唱歌，也会弹钢琴。", note: "and 连接同方向的信息、短语或从句。" },
      { en: "It was cheap but very good.", cn: "它便宜，却非常好。", note: "but 连接有对比的两部分。" },
      { en: "We can walk or take a bus.", cn: "我们可以步行，也可以坐公交车。", note: "or 提供可选方案。" },
      { en: "We stayed in because it rained. ↔ It rained, so we stayed in.", cn: "因为下雨，我们待在室内。↔ 下雨了，所以我们待在室内。", note: "because 后接原因；so 后接结果。" },
      { en: "We stayed at home because/as/since it was raining. · The survey was postponed because of the typhoon.", cn: "因为下雨，我们待在家里。调查因台风而延期。", note: "because/as/since 后接从句；because of 后接名词短语。as、since 稍正式。" },
      { en: "I called her, yet she didn't answer. · Although the sample was small, the effect was clear. · While A is cheap, B is precise.", cn: "我给她打了电话，她却没接。虽然样本很小，效果仍然明显。A 虽便宜，B 却精确。", note: "yet 表转折；although/though/even though 引出让步从句，可放句首；while 可对照两件事。" },
      { en: "The sample was contaminated, so the run was repeated. · Readings are taken at dawn so that the air is still.", cn: "样本被污染了，所以实验重做。人们在黎明测量，为的是空气仍然平静。", note: "so 表示结果；so that 表示目的。" },
    ] },
    { heading: "5 · 牢记", body: "because/as/since 后接含主语和动词的从句；because of 后接名词短语。although、though、even though 可放句首，不与 but 同时连接同一对从句。so 表结果，so that 表目的。" },
    { heading: "6 · 句式", body: "连接词的位置和后续成分决定句意。", table: [
      { left: "and：补充", right: "He washed the dishes and cleaned the floor." },
      { left: "but / yet：转折", right: "I called her, but she didn't answer." },
      { left: "or：选择", right: "Tea or coffee?" },
      { left: "原因 + so + 结果；结果 + because + 原因", right: "I was tired, so I went to bed because I had to get up early." },
      { left: "because / as / since + 原因从句", right: "He was absent because he had a fever. · Since it was late, we left." },
      { left: "because of + 名词短语", right: "The survey was postponed because of the typhoon." },
      { left: "although / though / even though + 让步从句", right: "Although the sample was small, the effect was unmistakable." },
      { left: "so + 结果；so that + 目的", right: "It rained, so we stayed in. · Note everything so that nothing is lost." },
    ] },
    { heading: "7 · 分析步骤", body: "判断关系，再检查结构。", table: [
      { left: "01 判断关系", right: "是补充、对比、选择、结果，还是原因？例如：下雨 → 待在家里，属于因果关系。" },
      { left: "02 判断因果方向", right: "后面是原因用 because；后面是结果用 so；后面是目的用 so that。例如：…, so we stayed at home.（……，所以我们待在家里。）" },
      { left: "03 检查成分", right: "连接从句时保留各自的主语和动词；but 与 so 前通常加逗号。" },
    ] },
    { heading: "8 · 例句与讲解", body: "同样的事实可以从原因或结果出发来表达。", examples: [
      { en: "It was raining, so we stayed at home.", cn: "下雨了，所以我们待在家里。", note: "后半句是结果。" },
      { en: "We stayed at home because it was raining.", cn: "我们因为下雨而待在家里。", note: "后半句是原因。" },
      { en: "The hotel was cheap but very comfortable.", cn: "这家酒店便宜，却很舒适。", note: "but 对照两个特点。" },
      { en: "She finished her homework and went out with her friends.", cn: "她做完作业，然后和朋友出去了。", note: "两个动作主语相同，第二个主语可省略。" },
      { en: "We can walk to the station or take a taxi.", cn: "我们可以步行去车站，或者坐出租车。", note: "or 连接两个选择。" },
      { en: "I wanted to call her, but I had no signal, so I sent a message instead.", cn: "我想给她打电话，但没有信号，所以改发短信。", note: "but 表转折，so 表后续结果。" },
      { en: "Although the sample was small, the effect was unmistakable.", cn: "虽然样本很小，但效果十分明显。", note: "although 引出句首的让步从句；英语不再补 but。" },
      { en: "Readings are taken at dawn so that the wind cannot affect them.", cn: "测量安排在黎明，以免风影响读数。", note: "so that 引出目的。" },
    ] },
    { heading: "9 · 对照与纠错", body: "分清因果方向、连接词后面的结构，以及结果和目的。", table: [
      { left: "A, so B：A 是原因，B 是结果", right: "I was hungry, so I ate." },
      { left: "B because A：A 是原因", right: "I ate because I was hungry." },
      { left: "Because A, B：原因从句在前", right: "Because I was hungry, I ate." },
      { left: "because + 从句；because of + 名词短语", right: "because it rained ≠ because of the rain" },
      { left: "but / yet 连接转折；although 引出让步从句", right: "small but clear · Although small, it was clear." },
      { left: "so 表结果；so that 表目的", right: "…, so we left. · … so that we could leave early." },
      { left: "as / since：较正式的原因连接词", right: "Since the data are public, anyone can check." },
    ], errors: [
      { wrong: "It was raining, because we stayed at home.", right: "It was raining, so we stayed at home.", note: "后面是结果，要用 so。" },
      { wrong: "Because it was raining, so we stayed at home.", right: "Because it was raining, we stayed at home.", note: "同一因果关系不同时使用 because 和 so。" },
      { wrong: "She is tired but she worked all night and.", right: "She is tired because she worked all night.", note: "连接词不能放句尾；后面是原因。" },
      { wrong: "Because of it was raining, we stayed at home.", right: "Because it was raining, we stayed at home.", note: "后面是完整从句，应使用 because。" },
      { wrong: "Although it rained, but we still went out.", right: "Although it rained, we still went out.", note: "although 已表示让步，不再加 but。" },
    ] },
  ],
  keyPoints: ["两部分是什么逻辑关系？", "后面是原因、结果，还是目的？", "because 后是从句、because of 后是名词短语吗？", "是否避免 because 与 so、although 与 but 在同一关系中重复？"],
  questions: [...A2_LINKERS_EASY, ...A2_LINKERS_MEDIUM, ...A2_LINKERS_HARD],
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: [],
};
