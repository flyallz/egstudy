import type { GrammarLesson, QuizQuestion } from "./content";
import { A2_OBLIGATION_MEDIUM } from "./currentSiteA2ObligationMedium";
import { A2_OBLIGATION_HARD } from "./currentSiteA2ObligationHard";

// 原站 A2 第 7 课：理论和简单档 20 题按公开 A2 课程数据逐项翻译与核对。
const obligationHint = "建议、义务、禁止和不必做的事情意思不同，选择的结构必须符合语境。";
const choice = (q: string, options: string[], answer: string, explain: string): QuizQuestion => ({
  q, options, answer: options.indexOf(answer), explain: `${explain}${obligationHint}`, difficulty: "简单", keepChoice: true,
});

export const A2_OBLIGATION_QUESTIONS: QuizQuestion[] = [
  choice("选择正确的句子。", ["You don't have to pay, it's free.", "You needn't to pay, it's free.", "You don't has to pay, it's free.", "You mustn't pay, it's free."], "You don't have to pay, it's free.", "句意是“你不用付钱，因为这是免费的”。不必做用 don't have to，不用表示禁止的 mustn't。"),
  choice("选择正确的句子。", ["Should you rest more.", "You should to rest more.", "You should rest more.", "You should resting more."], "You should rest more.", "句意是“你应该多休息”。should 后接不带 to 的动词原形。"),
  choice("You should ___ a doctor.", ["see", "seeing", "sees", "to see"], "see", "句意是“你应该去看医生”。should 后接不带 to 的原形 see。"),
  choice("航空安全规定飞行期间必须系安全带。The safety regulations require seatbelts during the flight. Passengers ___ wear a seatbelt.", ["must", "could", "might", "should"], "must", "规则要求必须系安全带，用 must 表达强制义务。"),
  choice("I ___ leave early yesterday.", ["must", "had to", "have to", "must to"], "had to", "句意是“昨天我不得不提前离开”。must 没有过去式，用 had to。"),
  choice("选择表示禁止的结构：You ___ use your phone during the exam.", ["don't have to", "shouldn't have", "needn't", "mustn't"], "mustn't", "考试中禁止用手机；mustn't 表示明确禁止。"),
  choice("You look tired. You ___ go to bed early tonight.", ["have to", "must", "should", "mustn't"], "should", "句意是“你看起来很累，今晚应该早点睡”。这是建议，用 should。"),
  choice("雇主说明下周加班是强制性的。The employer says overtime will be compulsory next week.", ["You must will work late.", "You will must work late.", "You will have to work late.", "You will has to work late."], "You will have to work late.", "句意是“你下周将不得不加班”。must 没有将来时形式，用 will have to。"),
  choice("选择正确的句子。", ["You must to stop here, but you don't have to wait.", "You must stop here, but you mustn't to wait.", "You have to stop here, but you must not need wait.", "You must stop here, but you don't have to wait."], "You must stop here, but you don't have to wait.", "句意是“你必须在这里停下，但不必等”。must 后不加 to；don't have to 是不必。"),
  choice("把“你应该为咳嗽去看医生”译成英语。", ["You should see a doctor about that cough.", "You should see an doctor about that cough.", "You about that cough should see a doctor.", "You should to see a doctor about that cough."], "You should see a doctor about that cough.", "should 表建议，后接不带 to 的动词原形。"),
  choice("选择正确的句子。", ["She must finish the report.", "Must she finish the report.", "She must finishing the report.", "She must to finish the report."], "She must finish the report.", "句意是“她必须完成报告”。must 不加 to，也不随主语变形。"),
  choice("把“乘客必须始终系好安全带”译成英语。", ["Passengers must to wear a seatbelt at all times.", "Passengers must wear an seatbelt at all times.", "Passengers must wearing a seatbelt at all times.", "Passengers must wear a seatbelt at all times."], "Passengers must wear a seatbelt at all times.", "规则性义务用 must；wear 在所有主语后均保持原形。"),
  choice("把“考试期间不得使用手机”译成英语。", ["You are mustn’t use your phone during the exam.", "You mustn’t to use your phone during the exam.", "You mustn’t using your phone during the exam.", "You mustn’t use your phone during the exam."], "You mustn’t use your phone during the exam.", "mustn't 表示禁止，不能理解为“不必”。"),
  choice("牙医建议你少吃糖。You ___ eat so much sugar.", ["must to not", "should to not", "can’t to", "shouldn’t"], "shouldn’t", "句意是“你不应该吃那么多糖”。shouldn't 是较温和的劝告，比 mustn't 轻。"),
  choice("把“她因为新工作必须在星期六上班”译成英语。", ["She have to work on Saturdays because of her new job.", "She has to work on Saturdays because of she new job.", "She has to work on Saturdays because of her job new.", "She has to work on Saturdays because of her new job."], "She has to work on Saturdays because of her new job.", "have to 随主语变化；she 搭配 has to。"),
  choice("把“你不必早到，演出八点才开始”译成英语。", ["You are don't have to come early; the show starts at eight.", "You don't has to come early; the show starts at eight.", "You don't have to come early; the show starts at eight.", "You doesn't have to come early; the show starts at eight."], "You don't have to come early; the show starts at eight.", "don't have to 是不必，意思不同于表示禁止的 mustn't。"),
  choice("You ___ wear a helmet on this construction site. It is a safety rule.", ["must", "may", "might", "could"], "must", "工地安全规定必须戴安全帽，用 must 表达强制义务。"),
  choice("You have a high fever. You ___ stay home and rest.", ["can't", "mustn't", "should", "may not"], "should", "句意是“你发高烧，应该在家休息”。这是合理建议，用 should。"),
  choice("You ___ bring your own notebook. The school gives everyone one.", ["can't", "mustn't", "don't have to", "shouldn't"], "don't have to", "学校给每个人发本子，所以不必自带；don't have to 表示没有义务，不是禁止。"),
  choice("Visitors ___ touch the paintings. The museum prohibits it.", ["don't have to", "should", "may", "mustn't"], "mustn't", "博物馆明确禁止触摸画作，用 mustn't。"),
];

export const A2_OBLIGATION: Partial<GrammarLesson> = {
  titleCn: "must、have to 与 should",
  titleEn: "Must, have to & should",
  intro: "must 表强制义务，have to 常指外部规定，should 给出建议；mustn't 是禁止，don't have to 是不必。",
  rules: [],
  openingExample: { en: "You should see a doctor.", cn: "你应该去看医生。" },
  theory: [
    { heading: "1 · 重点", body: "三种结构都谈应该或必须做的事，但强度和来源不同。must 是强烈的义务，常指说话人认为有必要；have to 常指情况或规定造成的义务；should 是较轻的建议。最容易混淆的是否定：mustn't 表示禁止，don't have to 表示不必。" },
    { heading: "2 · 公式", body: "must / should + 动词原形；have / has to + 动词原形" },
    { heading: "3 · 主要内容", body: "强制义务 / 外部要求 / 建议 / 禁止与不必的区别" },
    { heading: "4 · 功能与例句", body: "先判断义务的来源和强度。", examples: [
      { en: "You must wear a helmet.", cn: "你必须戴头盔。", note: "用于规章、标识或说话人认为不可少的事。" },
      { en: "She has to work on Saturdays.", cn: "她星期六必须上班。", note: "外部要求；have to 随主语变化，也可表示其他时态。" },
      { en: "You should rest more.", cn: "你应该多休息。", note: "建议较轻，听者可以决定是否采纳。" },
      { en: "You mustn't smoke here. ↔ You don't have to come.", cn: "这里禁止吸烟。↔ 你不必来。", note: "前句是禁止，后句是没有必要。" },
    ] },
    { heading: "5 · 牢记", body: "must、should 后接不带 to 的动词原形；have to 的 to 是结构本身的一部分。mustn't 与 don't have to 绝不能混用。" },
    { heading: "6 · 句式", body: "不同结构的形式与否定含义。", table: [
      { left: "must：主语 + must + 动词原形，不随主语变化", right: "He must leave now." },
      { left: "have to：I/you/we/they 用 have to；he/she/it 用 has to", right: "She has to study." },
      { left: "should：主语 + should (not) + 动词原形", right: "You shouldn't worry." },
      { left: "否定：mustn't = 禁止；don't/doesn't have to = 不必", right: "You mustn't be late. ↔ You don't have to pay." },
    ] },
    { heading: "7 · 分析步骤", body: "看义务来源，检查动词形式，再选择否定含义。", table: [
      { left: "01 判断义务来源", right: "说话人自己认为必要用 must；外部规定或环境要求用 have to：I must finish this. ↔ I have to wear a uniform." },
      { left: "02 检查原形与 to", right: "must/should 后不加 to；have to 中的 to 保留：should go ↔ have to go。" },
      { left: "03 区分否定", right: "禁止用 mustn't；不必用 don't have to：You mustn't touch it. ↔ You don't have to buy it." },
    ] },
    { heading: "8 · 例句与讲解", body: "同一件事可以因建议、规定或禁止而选择不同结构。", examples: [
      { en: "You should see a doctor about that cough.", cn: "你应该为咳嗽去看医生。", note: "should 表建议，后接不带 to 的原形。" },
      { en: "Passengers must wear a seatbelt at all times.", cn: "乘客必须始终系好安全带。", note: "must 可表达规章，wear 不随主语变化。" },
      { en: "She has to work on Saturdays because of her new job.", cn: "她因新工作必须在星期六上班。", note: "she 搭配 has to。" },
      { en: "You mustn't use your phone during the exam.", cn: "考试期间不得使用手机。", note: "mustn't 表示明确禁止。" },
      { en: "You don't have to come early; the show starts at eight.", cn: "你不必早来，演出八点开始。", note: "don't have to 是不必，不是禁止。" },
      { en: "You shouldn't eat so much sugar.", cn: "你不应该吃那么多糖。", note: "shouldn't 是温和劝告，弱于 mustn't。" },
    ] },
    { heading: "9 · 对照与纠错", body: "注意 ought to 与 should 意思相近，但保留 to。", table: [
      { left: "must：强制义务，不随主语变化", right: "You must stop here." },
      { left: "have to：外部义务，随主语和时态变化", right: "He had to leave early." },
      { left: "mustn't：禁止", right: "You mustn't open that door." },
      { left: "don't have to：不必", right: "You don't have to wait." },
      { left: "ought to：较正式的“应该”，后接带 to 的动词原形", right: "Every claim ought to be supported by a citation." },
    ], errors: [
      { wrong: "You should to see a doctor.", right: "You should see a doctor.", note: "should 后直接接动词原形。" },
      { wrong: "She must to work on Saturdays.", right: "She has to work on Saturdays.", note: "must 后不加 to；若工作规定导致星期六上班，has to 更自然。" },
      { wrong: "You mustn't pay, it's free.", right: "You don't have to pay, it's free.", note: "免费表示不必付钱，不是禁止付钱。" },
    ] },
  ],
  keyPoints: ["义务来自个人判断还是外部规定？", "must、should 后是否接不带 to 的动词原形？", "have to 是否与主语和时态一致？", "否定要表达禁止还是不必？", "ought to 后保留 to。"],
  questions: [...A2_OBLIGATION_QUESTIONS, ...A2_OBLIGATION_MEDIUM, ...A2_OBLIGATION_HARD],
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: [],
};
