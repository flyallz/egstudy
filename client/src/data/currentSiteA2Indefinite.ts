import type { GrammarLesson } from "./content";
import { A2_INDEFINITE_EASY } from "./currentSiteA2IndefiniteEasy";
import { A2_INDEFINITE_MEDIUM } from "./currentSiteA2IndefiniteMedium";
import { A2_INDEFINITE_HARD } from "./currentSiteA2IndefiniteHard";

export const A2_INDEFINITE: Partial<GrammarLesson> = {
  titleCn: "不定代词",
  titleEn: "Indefinite pronouns",
  intro: "用 some、any、no、every 与 -one、-body、-thing、-where 组合，表示不特定的人、物或地点。",
  rules: [],
  openingExample: { en: "Someone left a message, but nobody knows who.", cn: "有人留了言，但没人知道是谁。" },
  theory: [
    { heading: "1 · 重点", body: "不定代词用于不清楚或不必说明具体是谁、是什么、在哪里的情况。some 常用于肯定句，any 常用于否定句和疑问句，no 本身含否定意义，every 表示全部。这些词作主语时都搭配单数动词。" },
    { heading: "2 · 公式", body: "some / any / no / every + -one / -body / -thing / -where" },
    { heading: "3 · 主要内容", body: "表示人、物和地点；肯定、否定和疑问中的选择；单数动词；no 系列不叠加 not；修饰不定代词的形容词放在后面。" },
    { heading: "4 · 功能与例句", body: "依据句子形式和想表达的人、物或地点选词。", examples: [
      { en: "Someone is waiting for you.", cn: "有人在等你。", note: "some 系列常用于肯定句。" },
      { en: "I didn't see anybody. · Did you hear anything?", cn: "我没看见任何人。你听见什么了吗？", note: "any 系列常用于否定句和疑问句。" },
      { en: "Nobody came to the meeting.", cn: "没有人来参加会议。", note: "nobody 本身表示否定，动词保持肯定形式。" },
      { en: "Everybody was happy.", cn: "大家都很高兴。", note: "everybody 意义上涉及多人，但搭配单数动词。" },
    ] },
    { heading: "5 · 牢记", body: "不定代词作主语用单数动词：Everybody is here。nobody、nothing 等已含否定意义，不再搭配 not。形容词后置：something interesting、nothing new。提出邀请等期待肯定答复的问句也可用 some。" },
    { heading: "6 · 句式", body: "词尾区分指人、物或地点。", table: [
      { left: "人：-one / -body", right: "someone/somebody · anyone/anybody · no one/nobody · everyone/everybody。Everybody knows the answer.（每个人都知道答案。）" },
      { left: "物：-thing", right: "something · anything · nothing · everything。Nothing happened.（什么事也没发生。）" },
      { left: "地点：-where", right: "somewhere · anywhere · nowhere · everywhere。I can't find it anywhere.（我到处都找不到它。）" },
      { left: "不定代词 + 形容词", right: "something interesting · nothing new" },
    ] },
    { heading: "7 · 分析步骤", body: "选择词首、检查动词，再检查否定和修饰语。", table: [
      { left: "01 选择词首", right: "肯定通常用 some；否定、疑问用 any；直接否定用 no；全部用 every。对比：something ↔ anything ↔ nothing。" },
      { left: "02 使用单数动词", right: "即使 everybody 指许多人，动词仍用单数形式：Everybody is here.（大家都到了。）" },
      { left: "03 避免双重否定", right: "nobody、nothing 等已经是否定词，不再加 doesn't / didn't：应说 Nobody knows，而非 Nobody doesn't know。" },
    ] },
    { heading: "8 · 例句与讲解", body: "留意否定方式与形容词的位置。", examples: [
      { en: "Someone left a message, but nobody knows who.", cn: "有人留了言，但没人知道是谁。", note: "someone 用于肯定；nobody 已含否定，knows 保持肯定形式。" },
      { en: "I didn't see anybody in the office.", cn: "我没在办公室里见到任何人。", note: "didn't 后用 anybody。" },
      { en: "Did you hear anything last night?", cn: "昨晚你听见什么了吗？", note: "普通疑问句使用 any 系列。" },
      { en: "Everybody in the class is present today.", cn: "今天班里所有人都到了。", note: "everybody 搭配单数 is。" },
      { en: "I read something interesting about Hue this morning.", cn: "今天早上我读到一件关于顺化的趣事。", note: "interesting 放在 something 后。" },
      { en: "I looked everywhere but I couldn't find my keys anywhere.", cn: "我找遍了各处，却还是找不到钥匙。", note: "everywhere 表示所有地方；否定句中用 anywhere。" },
    ] },
    { heading: "9 · 对照与纠错", body: "同一个否定意思可用 not + any 系列或 no 系列表示。", table: [
      { left: "not … anybody：动词否定", right: "I didn't meet anybody." },
      { left: "… nobody：代词本身否定", right: "I met nobody." },
      { left: "nobody 作主语：单数肯定动词", right: "Nobody came." },
    ], errors: [
      { wrong: "Nobody doesn't know who left the message.", right: "Nobody knows who left the message.", note: "nobody 已含否定意义。" },
      { wrong: "Everybody are ready.", right: "Everybody is ready.", note: "不定代词作主语搭配单数动词。" },
      { wrong: "I read interesting something this morning.", right: "I read something interesting this morning.", note: "形容词放在不定代词后面。" },
    ] },
  ],
  keyPoints: ["词首与肯定、否定、疑问是否匹配？", "作主语时动词是否为单数？", "no 系列是否避免再次加 not？", "修饰不定代词的形容词是否后置？"],
  questions: [...A2_INDEFINITE_EASY, ...A2_INDEFINITE_MEDIUM, ...A2_INDEFINITE_HARD],
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: [],
};
