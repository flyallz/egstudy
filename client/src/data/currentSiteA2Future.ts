import type { GrammarLesson, QuizQuestion } from "./content";

// 原站 A2 第 5 课：理论及简单档 20 题按公开 A2 课程数据核对，越南语译为中文。
const futureHint = "判断是在说预先计划、眼前证据、当场决定、主观预测，还是承诺与提议。";
const choice = (q: string, options: string[], answer: string, explain: string): QuizQuestion => ({
  q, options, answer: options.indexOf(answer), explain: `${explain}${futureHint}`, difficulty: "简单", keepChoice: true,
});

export const A2_FUTURE_QUESTIONS: QuizQuestion[] = [
  choice("选择正确的句子。", ["She wills come tomorrow.", "She will to come tomorrow.", "She will coming tomorrow.", "She will come tomorrow."], "She will come tomorrow.", "句意是“她明天会来”。will 不随主语变化，后接动词原形。"),
  choice("She will ___ you tomorrow.", ["calls", "to call", "call", "calling"], "call", "句意是“她明天会给你打电话”。will 后接不带 to 的动词原形。"),
  choice("房间很冷。你此刻才决定关窗。选择最自然的说法。", ["I am going to closing the window.", "I will to close the window.", "I’ll close window.", "I’ll close the window."], "I’ll close the window.", "当场作出的决定用 will，缩写为 ’ll。"),
  choice("He ___ come to the meeting.", ["willn't", "doesn't will", "not will", "won't"], "won't", "句意是“他不会来开会”。will not 的缩写是 won't。"),
  choice("选择正确的句子。", ["Will you helping me?", "Do you will help me?", "Are you will help me?", "Will you help me?"], "Will you help me?", "句意是“你能帮我吗？”。will 放在主语前，后接动词原形。"),
  choice("选择表达承诺的句子。", ["I am going to tell anyone, I promise.", "I won't tell anyone, I promise.", "I don't tell anyone, I promise.", "I am not telling anyone, I promise so."], "I won't tell anyone, I promise.", "句意是“我保证不会告诉任何人”。承诺用 will，否定缩写为 won't。"),
  choice("They ___ going to move house next month.", ["be", "am", "are", "is"], "are", "句意是“他们打算下个月搬家”。主语 they 搭配 are。"),
  choice("我们昨天已买好机票。选择表示已有计划的说法：We bought the plane tickets yesterday. We ___ fly to Hue on Friday.", ["will to", "go", "are will", "are going to"], "are going to", "已买机票说明计划事先确定，用 be going to。"),
  choice("选择正确的句子。", ["I will study tonight, so I am going to go bed early anyway.", "I study tonight, so I will going to bed early.", "I am going study tonight, so I will to go to bed early.", "I'm going to study tonight, so I'll go to bed early."], "I'm going to study tonight, so I'll go to bed early.", "句意是“我打算今晚学习，所以会早点睡”。已有的学习计划用 be going to，由此当场作出的决定用 will。"),
  choice("把“我想她会轻松通过考试”译成英语。", ["I think she wills pass the exam easily.", "I is think she will pass the exam easily.", "I think she it will pass the exam easily.", "I think she will pass the exam easily."], "I think she will pass the exam easily.", "I think 一类表达主观看法的短语后，通常用 will 作预测。"),
  choice("把“你打算申请那份工作吗？”译成英语。", ["You going to apply for that job?", "Is you going to apply for that job?", "Are you going to apply for that job?", "You Are going to apply for that job?"], "Are you going to apply for that job?", "be going to 的疑问句把 be 动词放在主语前，going to 保持不变。"),
  choice("选择正确的句子。", ["We will to visit them.", "We wills visit them.", "We will them visit.", "We will visit them."], "We will visit them.", "句意是“我们会去看他们”。will 后面不加 to。"),
  choice("把“这个周末我们打算去看望祖父母”译成英语。", ["We are going to visit our grandparents this weekend.", "We are going to visit our grandparent this weekend.", "We are go to visit our grandparents this weekend.", "We is going to visit our grandparents this weekend."], "We are going to visit our grandparents this weekend.", "事先已有的探望计划用 be going to。"),
  choice("把“这里很冷。我来关窗吧”译成英语。", ["Its cold in here. I'll close the window.", "Cold It's in here. I'll close the window.", "Window It's cold in here. I'll close the.", "It's cold in here. I'll close the window."], "It's cold in here. I'll close the window.", "说话时才决定关窗，用 will，通常缩写为 ’ll。"),
  choice("把“看那些云，天快下雨了”译成英语。", ["Look at those cloud — it's going to rain.", "Look at those clouds — it's going to rain.", "Look at those clouds — its going to rain.", "Looking at those clouds — it's going to rain."], "Look at those clouds — it's going to rain.", "眼前云层是预测的依据，用 be going to 比 will 更自然。"),
  choice("把“我不会把这件事告诉任何人”译成英语。", ["I won'ting tell anyone about this.", "I is won't tell anyone about this.", "I won't tell anyone about this.", "I about this won't tell anyone."], "I won't tell anyone about this.", "承诺用 will；否定缩写为 won't。"),
  choice("I'm thirsty. I think I ___ have a glass of water.", ["do", "am", "will", "was"], "will", "句意是“我渴了，我想喝杯水”。说话时刚产生的决定用 will，后接 have 原形。"),
  choice("Mum has a shopping list. She is ___ to buy vegetables.", ["go", "went", "going", "goes"], "going", "句意是“妈妈有购物清单，打算买蔬菜”。清单说明计划事先已有，用 is going to。"),
  choice("My brother ___ turn sixteen next year.", ["is", "has", "will", "does"], "will", "句意是“我哥哥明年会满十六岁”。将来的事件用 will 加动词原形 turn。"),
  choice("Look at that glass! It is ___ to fall.", ["goes", "go", "going", "gone"], "going", "句意是“看那个杯子！它快要掉下来了”。眼前有明显迹象，预测用 be going to。"),
];

export const A2_FUTURE: Partial<GrammarLesson> = {
  titleCn: "will 与 be going to 表示将来",
  titleEn: "Will & be going to",
  intro: "will 用于当场决定、承诺和主观预测；be going to 用于已有计划和有眼前证据的预测。",
  rules: [],
  openingExample: { en: "We are going to visit our grandparents this weekend.", cn: "这个周末我们打算去看望祖父母。" },
  theory: [
    { heading: "1 · 重点", body: "英语没有一种包办所有意思的将来形式。will 可表示说话时临时作出的决定、承诺、提议或主观预测；be going to 表示事先已有的打算，或根据眼前迹象作出的预测。选哪一种，取决于语气和依据。" },
    { heading: "2 · 公式", body: "will + 动词原形；am / is / are going to + 动词原形" },
    { heading: "3 · 主要内容", body: "当场决定与已有计划 / 主观预测与有依据的预测 / 承诺和提议" },
    { heading: "4 · 功能与例句", body: "从决定何时形成、预测是否有证据来选择表达方式。", examples: [
      { en: "It's cold. I'll close the window.", cn: "天气冷了。我来关窗吧。", note: "说话时刚作出的决定用 will。" },
      { en: "We are going to move house next month.", cn: "我们打算下个月搬家。", note: "事先已有的计划用 be going to。" },
      { en: "I think it will rain. · Look at those clouds — it's going to rain.", cn: "我觉得会下雨。· 看那些云，天快下雨了。", note: "主观看法用 will；眼前有证据用 be going to。" },
      { en: "I'll help you. · Shall I carry that?", cn: "我来帮你。· 要我帮你拿吗？", note: "承诺、提议和邀请用 will，不用 be going to。" },
    ] },
    { heading: "5 · 牢记", body: "will 后接不带 to 的动词原形，也不随主语变化；be going to 只改变前面的 be 动词。" },
    { heading: "6 · 句式", body: "肯定、否定和疑问句的核心结构。", table: [
      { left: "will 肯定：主语 + will ('ll) + 动词原形", right: "She'll call you later." },
      { left: "will 否定与疑问：won't + 原形；Will + 主语 + 原形？", right: "He won't come. · Will you help me?" },
      { left: "be going to：主语 + am/is/are (not) going to + 原形", right: "They are going to study abroad." },
      { left: "be going to 疑问：Am/Is/Are + 主语 + going to + 原形？", right: "Are you going to join us?" },
    ] },
    { heading: "7 · 分析步骤", body: "先辨别意图与证据，再检查动词结构。", table: [
      { left: "01 判断表达的意思", right: "已有计划或明显迹象用 be going to；当场决定、承诺和主观预测用 will：I'm going to buy it. ↔ I'll buy it." },
      { left: "02 检查 will 后的动词", right: "will 是情态动词，后接原形，不加 to，也不随主语变化：will go，不能说 will to go。" },
      { left: "03 检查 be going to 的 be", right: "going to 不变，只让 be 与主语一致：He is going to…；They are going to…。" },
    ] },
    { heading: "8 · 例句与讲解", body: "对照已有计划、临时决定、两种预测和承诺。", examples: [
      { en: "We are going to visit our grandparents this weekend.", cn: "这个周末我们打算去看望祖父母。", note: "说话前已有的计划，用 be going to。" },
      { en: "It's cold in here. I'll close the window.", cn: "这里很冷。我来关窗吧。", note: "临时决定用 will，常缩写为 ’ll。" },
      { en: "Look at those clouds — it's going to rain.", cn: "看那些云，天快下雨了。", note: "有眼前证据时，用 be going to 预测更自然。" },
      { en: "I think she will pass the exam easily.", cn: "我想她会轻松通过考试。", note: "I think、I hope 等主观判断后常用 will。" },
      { en: "I won't tell anyone about this.", cn: "我不会把这件事告诉任何人。", note: "承诺用 will；否定缩写是 won't。" },
      { en: "Are you going to apply for that job?", cn: "你打算申请那份工作吗？", note: "疑问句把 be 移到主语前，going to 保持不变。" },
    ] },
    { heading: "9 · 对照与纠错", body: "根据决定形成的时机和预测证据选择结构。", table: [
      { left: "说话时才决定 → will", right: "I'll have the chicken, please." },
      { left: "事先已有计划 → be going to", right: "I'm going to learn Japanese this year." },
      { left: "眼前有迹象的预测 → be going to", right: "He's going to fall!" },
      { left: "承诺或主动帮忙 → will", right: "I'll give you a hand." },
    ], errors: [
      { wrong: "We will to visit our grandparents.", right: "We will visit our grandparents.", note: "will 后接不带 to 的动词原形。" },
      { wrong: "She wills come tomorrow.", right: "She will come tomorrow.", note: "will 不随主语变化，不能加 -s。" },
      { wrong: "I am going to tell you a secret, I promise.", right: "I will tell you a secret, I promise.", note: "表达承诺时用 will。" },
    ] },
  ],
  keyPoints: ["表达的是已有计划、当场决定、承诺，还是预测？", "will 后是否接不带 to 的动词原形？", "be going to 前的 be 是否与主语一致？", "承诺和提议不用 be going to。"],
  questions: A2_FUTURE_QUESTIONS,
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: ["中等", "困难"],
};
