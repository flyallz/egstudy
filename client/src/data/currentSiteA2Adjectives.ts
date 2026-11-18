import type { GrammarLesson, QuizQuestion } from "./content";

// 原站 A2 第 8 课：理论和简单档 20 题按公开 A2 课程数据逐项翻译与核对。
const adjectiveHint = "先辨认谁引起情绪、谁感受到情绪，再选择 -ing 或 -ed，不能只看主语是不是人。";
const choice = (q: string, options: string[], answer: string, explain: string): QuizQuestion => ({
  q, options, answer: options.indexOf(answer), explain: `${explain}${adjectiveHint}`, difficulty: "简单", keepChoice: true,
});

export const A2_ED_ING_QUESTIONS: QuizQuestion[] = [
  choice("The journey was very ___.", ["tired", "tiring", "tire", "tiredness"], "tiring", "句意是“这趟旅程很累人”。旅程引起疲劳，用 -ing。"),
  choice("She was surprised ___ the news.", ["of", "at", "for", "from"], "at", "句意是“她对那则消息感到惊讶”。surprised 搭配 at 或 by。"),
  choice("选择正确的句子。", ["The film was boring, so we were boring.", "The film was bored, so we were boring.", "The film was boring, so we were bored.", "The film was bored, so we were bored."], "The film was boring, so we were bored.", "电影令人厌烦，用 boring；我们感到厌烦，用 bored。"),
  choice("选择正确的句子。", ["I am very interested in music.", "I are very interested in music.", "I am very interested in musics.", "I am very interesting in music."], "I am very interested in music.", "句意是“我对音乐很感兴趣”。感兴趣的人用 interested。"),
  choice("The film was ___, so nobody watched it to the end.", ["bored", "boring", "bore", "boredom"], "boring", "电影让人觉得无聊，以致没人看完；电影是情绪的原因，用 boring。"),
  choice("At the lecture, many students were keen to learn more. There were many ___ students.", ["interesting", "interest", "interestingly", "interested"], "interested", "很多学生想继续学，说明他们感兴趣；感受者用 interested。"),
  choice("It was an ___ match from start to finish.", ["excited", "excite", "excitement", "exciting"], "exciting", "比赛从头到尾令人激动；比赛引起情绪，用 exciting。"),
  choice("The parents were worried ___ the results.", ["for", "at", "of", "about"], "about", "父母担心结果；worried 搭配 about。"),
  choice("选择正确的句子。", ["The lesson was confusing and the students were confused.", "The lesson was confusing and the students were confusing.", "The lesson was confused and the students were confused.", "The lesson was confused and the students were confusing."], "The lesson was confusing and the students were confused.", "课程令人困惑，用 confusing；学生感到困惑，用 confused。"),
  choice("把“旅程很累人”译成英语。", ["The journey were very tiring.", "The journey was very tiring.", "The journey it was very tiring.", "Journey was very tiring."], "The journey was very tiring.", "旅程引起疲劳，用 tiring。"),
  choice("把“电影很无聊，所以我们感到厌烦”译成英语。", ["The film were boring, so we were bored.", "The film was bored, so we were bored.", "The film was boring, so we were bored.", "The film was boring, so we were boring."], "The film was boring, so we were bored.", "电影是原因，用 boring；我们是感受者，用 bored。"),
  choice("把“旅行后我们都很累”译成英语。", ["After the journey we was all tired.", "After the journey we were all tired.", "After the journey we were all did tired.", "After the journey we they were all tired."], "After the journey we were all tired.", "我们是感到疲劳的人，用 tired。"),
  choice("把“她对越南历史很感兴趣”译成英语。", ["She in Vietnamese history is really interested.", "She is really interesting in Vietnamese history.", "She is really interested in Vietnamese history.", "She are really interested in Vietnamese history."], "She is really interested in Vietnamese history.", "interested 固定搭配 in。"),
  choice("选择正确的句子。", ["She was boring with the job, although the salary was surprised.", "She was bored with the job, although the salary was surprised.", "She was boring about the job, although the salary was surprising.", "She was bored with the job, although the salary was surprising."], "She was bored with the job, although the salary was surprising.", "她感到厌烦，用 bored with；工资令人意外，用 surprising。"),
  choice("把“那是一场有趣的讲座，许多学生都感兴趣”译成英语。", ["It was an interesting lecture, and there were many interesting students.", "It was an interesting lecture, and there were many interested students.", "It were an interesting lecture, and there were many interested students.", "It was an interesting lecture, and there was many interested students."], "It was an interesting lecture, and there were many interested students.", "讲座引起兴趣，用 interesting；学生感兴趣，用 interested。"),
  choice("把“测试结果令人担忧，家长们对此很担心”译成英语。", ["The test results was worrying, so the parents were worried about them.", "The test results were worrying, so the parents were worried about them.", "The test results were worrying, so the parents were worried about they.", "The test is results were worrying, so the parents were worried about them."], "The test results were worrying, so the parents were worried about them.", "结果引起担心，用 worrying；家长感到担心，用 worried about。"),
  choice("The magic show was ___. Everyone laughed and clapped.", ["entertain", "entertained", "entertaining", "entertainment"], "entertaining", "魔术表演令观众开心，用 entertaining 描述引起这种感受的表演。"),
  choice("I felt ___ after walking for five hours.", ["exhausting", "exhaustion", "exhaust", "exhausted"], "exhausted", "我走了五小时后感到精疲力竭；描述人的感受用 exhausted。"),
  choice("The instructions were ___. I did not know what to do.", ["confused", "confuse", "confusing", "confusion"], "confusing", "说明难懂，让我不知道怎么办；描述说明引起的困惑用 confusing。"),
  choice("The children were ___ about their school trip tomorrow.", ["excited", "exciting", "excite", "excitement"], "excited", "孩子们期待明天的学校旅行；描述他们的感受用 excited。"),
];

export const A2_ED_ING: Partial<GrammarLesson> = {
  titleCn: "-ed 与 -ing 形容词",
  titleEn: "-ed and -ing adjectives",
  intro: "-ing 描述引起某种感受的人、事或情境；-ed 描述产生这种感受的人。",
  rules: [],
  openingExample: { en: "The film was boring, so we were bored.", cn: "电影很无聊，所以我们感到厌烦。" },
  theory: [
    { heading: "1 · 重点", body: "许多英语形容词源于同一个动词，有 -ing 和 -ed 两种不能互换的形式。-ing 表示引起感受的原因，-ed 表示感受到情绪的结果。I am boring 的意思是“我是个令人厌烦的人”，不是“我觉得无聊”。" },
    { heading: "2 · 公式", body: "引起感受的人或事 + -ing；感受者 + -ed" },
    { heading: "3 · 主要内容", body: "情绪的原因与感受者 / 名词前的两种形容词 / -ed 形容词的介词搭配" },
    { heading: "4 · 功能与例句", body: "先看谁引起感受，谁有这种感受。", examples: [
      { en: "The news was shocking.", cn: "这消息令人震惊。", note: "新闻引起震惊，用 -ing。" },
      { en: "I felt shocked.", cn: "我感到震惊。", note: "感到震惊的人用 -ed。" },
      { en: "an interesting book ↔ an interested reader", cn: "一本有趣的书 ↔ 一位感兴趣的读者", note: "两种形式都能放在名词前，但意思不同。" },
      { en: "interested in · worried about · surprised at", cn: "对……感兴趣 · 担心…… · 对……惊讶", note: "-ed 形容词常有固定介词搭配。" },
    ] },
    { heading: "5 · 牢记", body: "事物和情境通常引起感受，所以常用 -ing；人通常是感受者，所以常用 -ed。但关键仍是原因与感受者的关系，不能只凭名词是否指人判断。" },
    { heading: "6 · 句式", body: "同根形容词的意义与常用介词。", table: [
      { left: "-ing：引起感受的原因", right: "boring · interesting · tiring · surprising · worrying" },
      { left: "-ed：产生感受的人", right: "bored · interested · tired · surprised · worried" },
      { left: "名词前两种形式意义不同", right: "a tiring journey ↔ a tired traveller" },
      { left: "固定介词", right: "interested in · bored with · worried about · excited about · surprised at" },
    ] },
    { heading: "7 · 分析步骤", body: "判定原因和感受者，并检查固定介词。", table: [
      { left: "01 区分原因与感受者", right: "原因用 -ing，感受者用 -ed：The job is tiring. ↔ I am tired." },
      { left: "02 检查主语", right: "事物与情境常用 -ing；有感受的人常用 -ed：The lesson was confusing. · The students were confused." },
      { left: "03 检查介词", right: "-ed 形容词的介词要一同记住：worried about the exam。" },
    ] },
    { heading: "8 · 例句与讲解", body: "比较同一情境下的原因和感受者。", examples: [
      { en: "The film was boring, so we were bored.", cn: "电影很无聊，所以我们感到厌烦。", note: "电影是原因，用 boring；我们是感受者，用 bored。" },
      { en: "The journey was very tiring.", cn: "旅程很累人。", note: "旅程引起疲劳，用 -ing。" },
      { en: "After the journey we were all tired.", cn: "旅程结束后我们都很累。", note: "我们感到疲劳，用 -ed。" },
      { en: "It was an interesting lecture, and there were many interested students.", cn: "那是一场有趣的讲座，许多学生都很感兴趣。", note: "讲座引起兴趣，学生是感受者。" },
      { en: "She is really interested in Vietnamese history.", cn: "她对越南历史很感兴趣。", note: "interested 后接 in。" },
      { en: "The test results were worrying, so the parents were worried about them.", cn: "测试结果令人担忧，因此家长们很担心。", note: "结果引起担忧，用 worrying；家长感到担忧，用 worried about。" },
    ] },
    { heading: "9 · 对照与纠错", body: "同一词根的两种形式强调不同角色。", table: [
      { left: "boring / bored：令人无聊 / 感到厌烦", right: "a boring lesson — a bored student" },
      { left: "exciting / excited：令人激动 / 感到激动", right: "an exciting match — excited fans" },
      { left: "confusing / confused：令人困惑 / 感到困惑", right: "confusing instructions — a confused reader" },
      { left: "surprising / surprised：令人惊讶 / 感到惊讶", right: "surprising news — surprised listeners" },
    ], errors: [
      { wrong: "The film was bored, so we were boring.", right: "The film was boring, so we were bored.", note: "原句把原因与感受者颠倒了。" },
      { wrong: "I am very interesting in music.", right: "I am very interested in music.", note: "感兴趣的人用 -ed；interested 后接 in。" },
      { wrong: "She was surprised of the news.", right: "She was surprised at the news.", note: "surprised 搭配 at 或 by，不搭配 of。" },
    ] },
  ],
  keyPoints: ["句子说的是情绪的原因还是感受者？", "感受者通常用 -ed。", "引起感受的人、事或情境用 -ing。", "-ed 形容词后的介词是否正确？"],
  questions: A2_ED_ING_QUESTIONS,
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: ["中等", "困难"],
};
