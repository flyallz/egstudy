// 课程目录：原创中文讲解的英语课程数据。
// 语法按 CEFR A1–C2 分级，词汇分「主题」与「CEFR 分级」两条线。
// 页面上显示的课数与词数全部由本文件实际条目计算。

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export const CEFR_LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export type Difficulty = "简单" | "中等" | "困难";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // options 下标
  explain: string;
  difficulty: Difficulty;
  kind?: "choice" | "dictation" | "blank" | "match"; // 听写题：options 为空，用 answerText 判定；填空题：sentence 是含正确形式的完整句，baseWord 是括号里的原形；连线题：pairs 是正确配对，matchRight 是右列展示顺序，不计时
  answerText?: string;
  baseWord?: string;
  sentence?: string;
  keepChoice?: boolean; // 原站原题：保持选择题原样，不被派生成填空题
  pairs?: { left: string; right: string }[];
  matchRight?: string[];
  noExplain?: boolean; // 原站不给文字解析的题（如听写）：答后不展示解析区
}

export interface RulePoint {
  heading: string;
  body: string;
  examples: { en: string; cn: string }[];
}

export interface TheorySection {
  heading: string;
  body: string;
  examples?: { en: string; cn: string; note?: string }[];
  table?: { left: string; right: string }[];
  errors?: { wrong: string; right: string; note: string }[];
}

export interface GrammarLesson {
  id: string;
  level: CefrLevel;
  titleCn: string;
  titleEn: string;
  intro: string;
  rules: RulePoint[];
  questions: QuizQuestion[];
  // 理论长页（可选，缺省时由 rules 推导）
  openingExample?: { en: string; cn: string };
  theory?: TheorySection[];
  keyPoints?: string[];
  // 原站题库整课替换时使用：只用本课自己的题库（不跨课滚动抽题、不派生填空）
  ownBankOnly?: boolean;
  // 只替换了某几个难度的课：这些难度只用本课自己的题库（按原顺序），
  // 其余难度保持原有滚动抽题方式不变
  ownBankDifficulties?: Difficulty[];
  // 本课各难度的实际题量（缺省用全站 QUIZ_COUNTS）
  quizCounts?: Partial<Record<Difficulty, number>>;
  // 原站题目尚未提取的难度：入口置灰并标「原站题目待补」，不进题库
  pendingDifficulties?: Difficulty[];
  // 原站题目只提取了一部分的难度：入口开放、只练已收录的题，
  // 入口与介绍页如实标注「已收 N/共 M 题，其余待补」，不让人误以为已提全
  partialDifficulties?: Difficulty[];
}

export interface Word {
  word: string;
  phonetic: string;
  pos: string;
  meaning: string;
  example: string;
  exampleCn: string;
  collocation?: string; // 常见搭配，如 "make progress"
  example2?: string;
  example2Cn?: string;
  example3?: string;
  example3Cn?: string;
  usage?: string; // 用法说明（原站提取课的词卡背面展示）
}

// 原站提取的词汇课（词卡 / 练习 / 听写全部按原站内容与规则）：
// 练习只收已提取的简单档，中等、困难档与发音待补；XP 按环节分别记账。
export interface ExtractedVocab {
  practiceEasy: QuizQuestion[]; // 简单档练习（原站顺序，含重复题，不去重）
  dictationWords: string[]; // 听写词（原站顺序，每题 30 秒、最多听 3 遍、无文字解析）
  cardsXp: number;
  practiceXp: number;
  dictationXp: number;
  totalStars: number; // 本课星数总格（如 10），当前可获：词卡 1 + 练习简单 1 + 听写 1
}

export interface VocabSet {
  id: string;
  kind: "vocab-topic" | "vocab-cefr";
  titleCn: string;
  titleEn: string;
  blurb: string;
  level?: CefrLevel;
  words: Word[];
  extracted?: ExtractedVocab;
}

export const GRAMMAR_XP = 30;
export const VOCAB_XP = 20;
// 每题限时按难度分档（按原站第 5、6、7 课三轮实测，三轮读数一致）：
// 简单档：选择题 45 秒，填空题与听写题（要打字输入）60 秒；
// 中等档：选择题 30 秒，填空题 45 秒；
// 困难档：选择题 20 秒，填空题 30 秒。
// 此前简单/中等同为 45/60、困难约 25/30 的读数来自第 1 课，已被新实测取代。
export const CHOICE_SECONDS = 45;
export const BLANK_SECONDS = 60;
export const MEDIUM_CHOICE_SECONDS = 30;
export const MEDIUM_BLANK_SECONDS = 45;
export const HARD_CHOICE_SECONDS = 20;
export const HARD_BLANK_SECONDS = 30;

export function questionSeconds(q: Pick<QuizQuestion, "kind">, tier?: Difficulty): number {
  const typed = q.kind === "blank" || q.kind === "dictation";
  if (tier === "困难") return typed ? HARD_BLANK_SECONDS : HARD_CHOICE_SECONDS;
  if (tier === "中等") return typed ? MEDIUM_BLANK_SECONDS : MEDIUM_CHOICE_SECONDS;
  return typed ? BLANK_SECONDS : CHOICE_SECONDS;
}

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  // ---------------- A1 ----------------
  {
    id: "g-a1-1",
    level: "A1",
    titleCn: "be 动词与主格代词",
    titleEn: "To be & subject pronouns",
    intro: "be 动词连接主语与名词、形容词或地点状语，表达身份、特点或位置。",
    rules: [],
    // 理论页按原站（ForumFlashStudy）第 1 课理论页原文逐字翻译替换，旧自编理论
    // 已全部删除；测验题库已整课换成原站原题（简单 20 题 + 中等 30 题，见
    // catalog.ts 的 A1_L1_QUESTIONS；困难 28 题未提取、待补），本课原有自编题
    // 已全部删除，故此处 questions 留空，由 catalog.ts 注入原站题库。
    // 理论结构照原站：重点 / 公式 / 开头示例 / 主要内容 / 功能与示例 / 牢记 /
    // 句式 / 分析步骤 / 示例讲解 / 对照与自改 / 自查，与第 10、11 课同款模板。
    // 注意：主要内容顶部只列 3 项，功能与示例有 4 项（第 4 项不在顶部列表里），
    // 照原样保留；公式在顶部公式节与句式一节重复出现，也照原样保留两处。
    openingExample: { en: "She is a student.", cn: "她是一名学生。" },
    theory: [
      {
        heading: "1 · 重点",
        body: "to be 是系动词。它把主语和名词、形容词或地点状语连起来，用来介绍、描述或说明位置。to be 的形式随主语变化，所以第一步总是确定主语是第几人称、单数还是复数。",
      },
      {
        heading: "2 · 公式",
        body: "S + am / is / are + 补语",
      },
      {
        heading: "3 · 主要内容",
        body: "介绍身份和职业 / 描述特征和状态 / 说明位置和家乡",
      },
      {
        heading: "4 · 功能与示例",
        body: "每个功能都配一个例句，放在语境里马上对照。",
        examples: [
          { en: "I am a student. / She is my form teacher.", cn: "我是一名学生。/ 她是我的班主任。", note: "介绍身份和职业——to be 后面是名词短语，说明主语是谁、做什么。" },
          { en: "The soup is hot. / We are tired.", cn: "汤很烫。/ 我们累了。", note: "描述特征和状态——to be 后面是形容词；英语里形容词前面不加别的动词。" },
          { en: "The keys are on the table. / Nam is from Hue.", cn: "钥匙在桌子上。/ 南来自顺化。", note: "说明位置和家乡——to be 后面是地点状语，或 be from + 地名。" },
          { en: "She is twelve. / It is six o'clock.", cn: "她十二岁。/ 现在是六点钟。", note: "说年龄、时间和天气——英语里用 to be 说年龄，用形式主语 it 说时间、日期和天气。" },
        ],
      },
      {
        heading: "5 · 牢记",
        body: "根据作主语的人称代词或名词，选择 am、is 或 are。",
      },
      {
        heading: "6 · 句式",
        body: "主要结构：S + am / is / are + 补语",
        table: [
          { left: "肯定句：I am – you / we / they are – he / she / it is", right: "He is at home.（他在家。）" },
          { left: "否定句：S + am / is / are + not", right: "They are not ready.（他们还没准备好。）" },
          { left: "疑问句：Am / Is / Are + S + …?", right: "Is she your sister?（她是你妹妹吗？）" },
          { left: "缩写形式：I'm – you're – he's – isn't – aren't", right: "I'm not late.（我没迟到。）" },
        ],
      },
      {
        heading: "7 · 分析步骤",
        body: "",
        examples: [
          { en: "My brother (= he) → is", cn: "01 确定主语的人称和单复数——I 配 am；he、she、it 和所有单数名词配 is；you 和所有复数主语配 are。（我的兄弟 = 他 → is）" },
          { en: "The room is clean.", cn: "02 把 to be 紧跟在主语后面——肯定句里 to be 在补语前面，不需要再加别的助动词。（房间很干净。）" },
          { en: "Are you busy? — No, I am not.", cn: "03 造否定句和疑问句——to be 自己就起助动词的作用，所以永远不要和 do 或 does 连用。（你忙吗？——不，我不忙。）" },
        ],
      },
      {
        heading: "8 · 示例讲解",
        body: "每个例子按意思、结构、语境三层来读。",
        examples: [
          { en: "She is a student at Quang Trung School.", cn: "她是光中学校的学生。", note: "介绍——She 是第三人称单数，所以用 is；is 后面是名词短语作补语。" },
          { en: "The children are very excited today.", cn: "孩子们今天非常兴奋。", note: "描述——Children 是 child 的不规则复数形式，所以即使这个词没有 -s 结尾，也用 are。" },
          { en: "My parents are from Da Nang.", cn: "我的父母来自岘港。", note: "家乡——复数主语配 are；be from + 地名用来说明家乡。" },
          { en: "I am not hungry yet.", cn: "我还不饿。", note: "否定——否定只需要在 am 后面加 not。标准的缩写形式是 I'm not——英语里没有 amn't 这种形式。" },
          { en: "Are your friends at the library?", cn: "你的朋友在图书馆吗？", note: "疑问——Are 提到主语 your friends 前面，句子其余部分顺序不变。" },
          { en: "It is cold and it is almost seven o'clock.", cn: "天气很冷，快七点了。", note: "时间和天气——这里的 it 是形式主语，不指任何具体事物，用于表示天气、时间和日期。" },
        ],
      },
      {
        heading: "9 · 对照与自改",
        body: "对照——to be 随主语人称代词的变化（见下表）。自改——常见错误：",
        table: [
          { left: "I — 第一人称单数", right: "I am here.（我在这里。）" },
          { left: "You — 第二人称，单复数通用", right: "You are early.（你来早了。）" },
          { left: "He / She / It — 第三人称单数", right: "It is new.（它是新的。）" },
          { left: "We / They — 第一人称和第三人称复数", right: "They are outside.（他们在外面。）" },
        ],
        errors: [
          { wrong: "She are a student.", right: "She is a student.", note: "She 是第三人称单数；are 只用于 you 和复数主语。" },
          { wrong: "I have twelve years old.", right: "I am twelve years old.", note: "中文说“我 12 岁”不加 be；英语表达年龄时必须用 to be。" },
          { wrong: "Do you are ready?", right: "Are you ready?", note: "to be 本身就是助动词，所以疑问句是把 to be 提前，而不是加 do。" },
        ],
      },
    ],
    keyPoints: [
      "主语是哪个代词，还是单数名词或复数名词",
      "am、is、are 和这个主语搭配对了",
      "否定句里 not 紧跟在 to be 后面",
      "疑问句里 to be 提到主语前面，并且没有 do 或 does",
    ],
    questions: [],
  },
  {
    id: "g-a1-2",
    level: "A1",
    titleCn: "一般现在时",
    titleEn: "Present simple",
    intro: "表达习惯、事实和规律的时态。难点只有一个：第三人称单数时动词要加 -s。",
    rules: [
      {
        heading: "什么时候用",
        body: "经常发生的动作（习惯）、客观事实、时刻表安排。常和 always、usually、every day 等词连用。",
        examples: [
          { en: "I get up at six every day.", cn: "我每天六点起床。" },
          { en: "The sun rises in the east.", cn: "太阳从东方升起。" },
        ],
      },
      {
        heading: "第三人称单数加 -s",
        body: "主语是 he / she / it 或单个人时，动词加 -s 或 -es：watch → watches，study → studies（辅音+y 变 i 加 es），go → goes。否定和提问借助 does，动词恢复原形：He doesn't like tea.",
        examples: [
          { en: "She studies English every evening.", cn: "她每天晚上学英语。" },
          { en: "Does he work here?", cn: "他在这里工作吗？" },
        ],
      },
    ],
    questions: [
      { q: "My father ___ to work by bus.", options: ["go", "goes", "going", "gone"], answer: 1, explain: "主语 my father 是第三人称单数，go 变 goes。", difficulty: "简单" },
      { q: "We ___ football on Sundays.", options: ["plays", "play", "playing", "played"], answer: 1, explain: "主语 we 不是第三人称单数，动词用原形 play。", difficulty: "简单" },
      { q: "Anna ___ watch TV in the morning.", options: ["don't", "isn't", "doesn't", "not"], answer: 2, explain: "第三人称单数否定用 doesn't，后面动词用原形 watch。", difficulty: "中等" },
      { q: "___ your brother ___ coffee?", options: ["Does / drinks", "Do / drink", "Does / drink", "Is / drink"], answer: 2, explain: "brother 是单数用 Does 提问，助动词后动词恢复原形 drink。", difficulty: "中等" },
      { q: "Which sentence is correct?", options: ["She don't like music.", "He plays piano every day.", "He play piano every day.", "She likes not music."], answer: 1, explain: "he 是第三人称单数，play 加 -s；don't 不能配 she（应用 doesn't），like 的否定要借 don't/doesn't。", difficulty: "困难" },
    ],
  },
  {
    id: "g-a1-3",
    level: "A1",
    titleCn: "现在进行时",
    titleEn: "Present continuous",
    intro: "正在发生的动作：be + 动词-ing。中文「正在……」就是它。",
    rules: [
      {
        heading: "结构：be + V-ing",
        body: "先按主语选 am / is / are，再加动词的 -ing 形式。拼写注意：make → making（去 e），run → running（双写末尾辅音），die → dying。",
        examples: [
          { en: "Look! The baby is crying.", cn: "看！宝宝正在哭。" },
          { en: "We are having lunch now.", cn: "我们正在吃午饭。" },
        ],
      },
      {
        heading: "和一般现在时的区别",
        body: "一般现在时讲习惯（every day），现在进行时讲此刻（now、look、listen）。有些动词如 know、like、want 表示状态，一般不用进行时。",
        examples: [
          { en: "He usually walks to school, but today he is riding a bike.", cn: "他平时走路去学校，但今天在骑车。" },
        ],
      },
    ],
    questions: [
      { q: "Listen! Someone ___ at the door.", options: ["knock", "knocks", "is knocking", "knocked"], answer: 2, explain: "Listen 提示此刻动作，someone 是单数：is knocking。", difficulty: "简单" },
      { q: "I ___ my homework now.", options: ["am doing", "does", "do yesterday", "did"], answer: 0, explain: "now 表示正在进行：I am doing。", difficulty: "简单" },
      { q: "The children ___ in the garden. Don't call them in.", options: ["is playing", "are playing", "plays", "play yesterday"], answer: 1, explain: "children 是复数，进行时用 are playing。", difficulty: "中等" },
      { q: "She is ___ a letter to her friend.", options: ["write", "writes", "writing", "wrote"], answer: 2, explain: "write 去 e 加 ing → writing。", difficulty: "中等" },
      { q: "Which sentence is correct?", options: ["I am knowing the answer.", "I know the answer now.", "I am know the answer.", "I knowing the answer."], answer: 1, explain: "know 是状态动词，一般不用进行时，用一般现在时即可。", difficulty: "困难" },
    ],
  },
  // ---------------- A2 ----------------
  {
    id: "g-a2-1",
    level: "A2",
    titleCn: "一般过去时",
    titleEn: "Past simple",
    intro: "讲昨天、上周、去年发生的事。规则动词加 -ed，不规则动词要单独记。",
    rules: [
      {
        heading: "规则变化与时间标志",
        body: "规则动词词尾加 -ed：work → worked，live → lived，stop → stopped。常与 yesterday、last night、two days ago 等过去时间连用。",
        examples: [
          { en: "We visited the museum yesterday.", cn: "我们昨天参观了博物馆。" },
          { en: "She called me two hours ago.", cn: "她两小时前给我打电话。" },
        ],
      },
      {
        heading: "不规则动词与 did",
        body: "常用不规则：go → went，see → saw，buy → bought，have → had，take → took。提问和否定用 did，动词恢复原形：Did you go? I didn't see it.",
        examples: [
          { en: "They went to Beijing last week.", cn: "他们上周去了北京。" },
          { en: "Did he buy the ticket?", cn: "他买票了吗？" },
        ],
      },
    ],
    questions: [
      { q: "I ___ a great film last night.", options: ["see", "sees", "saw", "seen"], answer: 2, explain: "last night 是过去时间，see 的过去式是 saw。", difficulty: "简单" },
      { q: "We ___ in Shanghai in 2020.", options: ["live", "lives", "lived", "living"], answer: 2, explain: "in 2020 是过去时间，live 的过去式是 lived。", difficulty: "简单" },
      { q: "___ you ___ your keys yesterday?", options: ["Did / lose", "Do / lost", "Did / lost", "Does / lose"], answer: 0, explain: "过去时提问用 Did，动词用原形 lose。", difficulty: "中等" },
      { q: "He ___ not come to the party last Friday.", options: ["does", "did", "is", "was do"], answer: 1, explain: "过去时否定：did not + 动词原形。", difficulty: "中等" },
      { q: "Which sentence is correct?", options: ["She didn't went home early.", "She didn't go home early.", "She doesn't went home early.", "She not went home early."], answer: 1, explain: "didn't 后面必须用动词原形 go，不能再用 went。", difficulty: "困难" },
    ],
  },
  {
    id: "g-a2-2",
    level: "A2",
    titleCn: "比较级与最高级",
    titleEn: "Comparatives & superlatives",
    intro: "比大小、选最好：shorter、more useful、the best。中文「比……更……」的英语版本。",
    rules: [
      {
        heading: "比较级：-er / more",
        body: "短形容词加 -er（big → bigger，双写 g）；长形容词用 more（more interesting）。比较对象用 than 连接。不规则：good → better，bad → worse，far → farther。",
        examples: [
          { en: "This book is cheaper than that one.", cn: "这本书比那本便宜。" },
          { en: "She is more careful than me.", cn: "她比我细心。" },
        ],
      },
      {
        heading: "最高级：the -est / the most",
        body: "三者或以上比较用最高级，前面加 the：the tallest、the most popular。常用 in / of 引出比较范围。",
        examples: [{ en: "He is the tallest student in our class.", cn: "他是我们班最高的学生。" }],
      },
    ],
    questions: [
      { q: "A bike is ___ than a car.", options: ["cheap", "cheaper", "cheapest", "more cheap"], answer: 1, explain: "两者比较用比较级 cheaper + than。", difficulty: "简单" },
      { q: "This exercise is ___ than the last one.", options: ["difficult", "more difficult", "difficulter", "most difficult"], answer: 1, explain: "difficult 是长形容词，比较级用 more difficult。", difficulty: "简单" },
      { q: "Mount Qomolangma is the ___ mountain in the world.", options: ["high", "higher", "highest", "more high"], answer: 2, explain: "全世界范围比较用最高级 the highest。", difficulty: "中等" },
      { q: "Your English is getting ___ and better.", options: ["good", "well", "better", "best"], answer: 2, explain: "固定说法 better and better（越来越好）。", difficulty: "中等" },
      { q: "Which sentence is correct?", options: ["She is more taller than her sister.", "She is taller than her sister.", "She is tallest than her sister.", "She is more tall than her sister."], answer: 1, explain: "tall 是短形容词，直接加 -er，不能再叠加 more。", difficulty: "困难" },
    ],
  },
  {
    id: "g-a2-3",
    level: "A2",
    titleCn: "一般将来时",
    titleEn: "Future: will & be going to",
    intro: "谈未来有两种常用说法：will 偏临时决定和承诺，be going to 偏已有计划和征兆。",
    rules: [
      {
        heading: "will：决定、承诺、预测",
        body: "will + 动词原形，人称不变。常用于说话当下才做的决定、承诺（I will help you）和对未来的预测。否定 won't。",
        examples: [
          { en: "Watch out! You will drop your phone.", cn: "小心！你手机要掉了。" },
          { en: "I will call you tonight.", cn: "我今晚给你打电话。" },
        ],
      },
      {
        heading: "be going to：计划与征兆",
        body: "事先计划好的事，或根据眼前迹象判断要发生的事：Look at the clouds! It's going to rain.",
        examples: [{ en: "We are going to travel in July.", cn: "我们打算七月去旅行。" }],
      },
    ],
    questions: [
      { q: "I think it ___ rain tomorrow.", options: ["will", "is rain", "rained", "rains yesterday"], answer: 0, explain: "对未来的预测用 will + 原形。", difficulty: "简单" },
      { q: "A: The doorbell is ringing. B: I ___ get it!", options: ["will", "am get", "got", "getting yesterday"], answer: 0, explain: "说话当下的临时决定用 will。", difficulty: "简单" },
      { q: "Look at those black clouds! It ___ rain.", options: ["is going to", "goes to", "went to", "go to yesterday"], answer: 0, explain: "有眼前征兆的将来用 be going to。", difficulty: "中等" },
      { q: "We ___ visit our grandparents this weekend. We bought the tickets yesterday.", options: ["are going to", "will helps", "goes to", "visited to"], answer: 0, explain: "票已买好，是既定计划，用 be going to。", difficulty: "中等" },
      { q: "Which sentence is correct?", options: ["She will to be a teacher.", "She will be a teacher.", "She will being a teacher.", "She will is a teacher."], answer: 1, explain: "will 后面直接加动词原形 be，不能加 to 或其他形式。", difficulty: "困难" },
    ],
  },
  // ---------------- B1 ----------------
  {
    id: "g-b1-1",
    level: "B1",
    titleCn: "现在完成时",
    titleEn: "Present perfect",
    intro: "过去发生、和现在有关的时态：丢了的钥匙（现在没有）、去过的地方（现在的经验）。",
    rules: [
      {
        heading: "结构与核心感觉",
        body: "have / has + 过去分词。核心不是「过去」，而是「对现在的影响」：I have lost my key = 钥匙丢了（现在还没找到）。常配 already、just、yet、ever、never、since、for。",
        examples: [
          { en: "I have just finished my homework.", cn: "我刚写完作业。" },
          { en: "Have you ever been to London?", cn: "你去过伦敦吗？" },
        ],
      },
      {
        heading: "since 与 for",
        body: "since + 时间点（since 2020），for + 一段时间（for three years）。问时长用 How long。",
        examples: [{ en: "We have lived here since 2019.", cn: "我们从 2019 年起住在这里。" }],
      },
      {
        heading: "不能与明确过去时间连用",
        body: "有 yesterday、last week 这类明确过去时间时，必须用一般过去时，不能用现在完成时。",
        examples: [{ en: "I saw him yesterday.（不能说 have seen him yesterday）", cn: "我昨天见过他。" }],
      },
    ],
    questions: [
      { q: "I ___ my wallet. I can't find it anywhere.", options: ["lose", "have lost", "loses", "am lose"], answer: 1, explain: "丢钱包的结果延续到现在（还没找到），用现在完成时 have lost。", difficulty: "简单" },
      { q: "She has worked here ___ 2018.", options: ["for", "since", "from", "at"], answer: 1, explain: "2018 是时间点，用 since。", difficulty: "简单" },
      { q: "___ you ever ___ sushi?", options: ["Have / eaten", "Did / ate", "Has / eat", "Do / eaten"], answer: 0, explain: "问经历用 Have you ever + 过去分词 eaten。", difficulty: "中等" },
      { q: "They have known each other ___ ten years.", options: ["since", "for", "from", "in"], answer: 1, explain: "ten years 是一段时间，用 for。", difficulty: "中等" },
      { q: "Which sentence is correct?", options: ["I have seen him yesterday.", "I have seen him last week.", "I saw him two days ago.", "I have saw him two days ago."], answer: 2, explain: "two days ago 是明确过去时间，只能用一般过去时 saw。", difficulty: "困难" },
    ],
  },
  {
    id: "g-b1-2",
    level: "B1",
    titleCn: "被动语态",
    titleEn: "The passive voice",
    intro: "不知道谁做的、或不想说谁做的：The bridge was built in 1990. 结构是 be + 过去分词。",
    rules: [
      {
        heading: "结构随时态变 be",
        body: "被动 = be + 过去分词。时态体现在 be 上：is made（一般现在）、was made（一般过去）、will be made（将来）、has been made（完成）。",
        examples: [
          { en: "English is spoken in many countries.", cn: "许多国家说英语。" },
          { en: "The window was broken last night.", cn: "窗户昨晚被打破了。" },
        ],
      },
      {
        heading: "by 引出执行者",
        body: "需要说明执行者时用 by + 人。执行者不重要或显而易见时省略：He was taken to hospital.（救护车送的，不必说）",
        examples: [{ en: "The novel was written by Lu Xun.", cn: "这部小说是鲁迅写的。" }],
      },
    ],
    questions: [
      { q: "This kind of tea ___ in Fujian.", options: ["grows", "is grown", "grow", "grew yesterday by"], answer: 1, explain: "茶是「被种植」，一般现在时被动：is grown。", difficulty: "简单" },
      { q: "The bridge ___ in 2010.", options: ["built", "was built", "is build", "builds"], answer: 1, explain: "桥是被建的，且时间在过去：was built。", difficulty: "简单" },
      { q: "The thief ___ by the police last night.", options: ["caught", "was caught", "is catch", "catches"], answer: 1, explain: "小偷被抓，过去时被动 was caught。", difficulty: "中等" },
      { q: "A new hospital ___ in our town next year.", options: ["will build", "will be built", "is building by", "builds"], answer: 1, explain: "将来时被动：will be built。", difficulty: "中等" },
      { q: "Which sentence is correct?", options: ["The room cleans every day.", "The room is cleaned every day.", "The room is clean every day by.", "The room cleaned every day."], answer: 1, explain: "房间是被打扫的对象，规律性地发生：is cleaned。", difficulty: "困难" },
    ],
  },
  {
    id: "g-b1-3",
    level: "B1",
    titleCn: "定语从句（who / which / that）",
    titleEn: "Relative clauses",
    intro: "用一句话给名词「贴标签」：the man who lives next door。指人用 who，指物用 which，两者都能用 that。",
    rules: [
      {
        heading: "关系词的选择",
        body: "先行词是人 → who / that；是物 → which / that；表示所属 → whose；指地点、时间时可用 where / when，但本质仍是修饰名词。",
        examples: [
          { en: "The woman who teaches us English is from Canada.", cn: "教我们英语的那位女士来自加拿大。" },
          { en: "This is the book which I bought yesterday.", cn: "这就是我昨天买的书。" },
        ],
      },
      {
        heading: "关系词作宾语可省略",
        body: "关系词在从句中作宾语时可以省略：The book (that) I read was great. 作主语时不能省：The man who called you is here.",
        examples: [{ en: "The song (that) she sang won a prize.", cn: "她唱的那首歌获奖了。" }],
      },
    ],
    questions: [
      { q: "The man ___ is talking to our teacher is my uncle.", options: ["which", "who", "what", "whose book"], answer: 1, explain: "先行词是人且在从句中作主语，用 who。", difficulty: "简单" },
      { q: "This is the house ___ we lived in ten years ago.", options: ["who", "which", "whose", "whom is"], answer: 1, explain: "先行词 house 是物，用 which（此处作介词宾语，也可用 that 或省略）。", difficulty: "简单" },
      { q: "I like the writer ___ books are popular with teenagers.", options: ["who", "which", "whose", "that he"], answer: 2, explain: "表示「他的书」，表所属用 whose。", difficulty: "中等" },
      { q: "The film ___ we saw last night was moving.", options: ["who", "whose", "that", "what"], answer: 2, explain: "先行词是物且从句缺宾语，用 that（也可省略）。what 不能引导定语从句。", difficulty: "中等" },
      { q: "Which sentence is correct?", options: ["The girl who she won the race is my friend.", "The girl who won the race is my friend.", "The girl which won the race is my friend.", "The girl what won the race is my friend."], answer: 1, explain: "who 在从句中作主语，后面不能再加 she；指人不用 which/what。", difficulty: "困难" },
    ],
  },
  // ---------------- B2 ----------------
  {
    id: "g-b2-1",
    level: "B2",
    titleCn: "第一与第二条件句",
    titleEn: "Conditionals: type 1 & 2",
    intro: "if 引导的「假如」：真实可能的用一般现在时+will；与事实相反的假设，把时态往过去推一格。",
    rules: [
      {
        heading: "第一条件句：真实可能",
        body: "If + 一般现在时，主句 will + 动词原形。谈论将来真实可能发生的情况：If it rains tomorrow, we will stay at home.",
        examples: [{ en: "If you study hard, you will pass the exam.", cn: "如果你努力学习，就能通过考试。" }],
      },
      {
        heading: "第二条件句：虚拟假设",
        body: "If + 一般过去时（be 一律用 were），主句 would + 动词原形。表示与现在事实相反：If I were you, I would apologize.（我并不是你）",
        examples: [
          { en: "If I had a million dollars, I would travel the world.", cn: "要是我有一百万美元，我就环游世界。（事实上没有）" },
          { en: "If he were here, he would help us.", cn: "他要是在这儿，就会帮我们。（事实上不在）" },
        ],
      },
    ],
    questions: [
      { q: "If it ___ tomorrow, we will have a picnic.", options: ["is fine", "will be fine", "was fine", "would be fine"], answer: 0, explain: "第一条件句：if 从句用一般现在时 is fine，主句用 will。", difficulty: "简单" },
      { q: "If I ___ you, I would take the job.", options: ["am", "was", "were", "will be"], answer: 2, explain: "虚拟假设中 be 动词统一用 were：If I were you 是经典句型。", difficulty: "简单" },
      { q: "What would you do if you ___ a wallet on the street?", options: ["find", "found", "will find", "finds"], answer: 1, explain: "主句 would 提示第二条件句，if 从句用过去时 found。", difficulty: "中等" },
      { q: "If she hurries, she ___ catch the bus.", options: ["would", "will", "would have", "catches yesterday"], answer: 1, explain: "这是真实可能的情况（第一条件句），主句用 will。", difficulty: "中等" },
      { q: "Which sentence expresses an unreal situation?", options: ["If you heat ice, it melts.", "If it rains, I will stay home.", "If I knew her number, I would call her.", "If he comes, tell me."], answer: 2, explain: "knew / would call 是第二条件句，暗示「我并不知道她的号码」。其余都是真实条件。", difficulty: "困难" },
    ],
  },
  {
    id: "g-b2-2",
    level: "B2",
    titleCn: "情态动词推测",
    titleEn: "Modal verbs of deduction",
    intro: "must be / can't be / might be：用语气表达你有几分把握。中文「肯定是 / 不可能是 / 可能是」。",
    rules: [
      {
        heading: "对现在的推测",
        body: "must + 动词原形 = 肯定是（把握大）；can't = 不可能是；may / might / could = 可能是（把握小）。推测正在发生的事用 be + V-ing：He must be sleeping.",
        examples: [
          { en: "She must be tired after such a long trip.", cn: "这么长的旅途之后，她肯定累了。" },
          { en: "It can't be true. I saw him this morning.", cn: "这不可能是真的，我早上还看见他了。" },
        ],
      },
      {
        heading: "对过去的推测",
        body: "modal + have + 过去分词：must have done（过去肯定做过）、can't have done（过去不可能）、might have done（过去可能）。",
        examples: [{ en: "He must have forgotten the meeting.", cn: "他肯定是把会议忘了。" }],
      },
    ],
    questions: [
      { q: "The lights are on. Someone ___ be at home.", options: ["must", "can't", "mustn't", "needn't yesterday"], answer: 0, explain: "灯亮着，推断「肯定有人在家」，用 must be。", difficulty: "简单" },
      { q: "He ___ be ill. He was running in the park an hour ago.", options: ["must", "can't", "might to", "should to"], answer: 1, explain: "一小时前还在跑步，不可能生病：can't be。", difficulty: "简单" },
      { q: "I can't find my phone. I ___ it in the office.", options: ["might leave", "might have left", "must leave yesterday", "can't have left it is sure"], answer: 1, explain: "对过去可能发生的事推测：might have + 过去分词 left。", difficulty: "中等" },
      { q: "She ___ the exam — she looks so happy.", options: ["must have passed", "can't have passed", "mustn't pass", "might not passed"], answer: 0, explain: "她很开心，推断过去肯定通过了：must have passed。", difficulty: "中等" },
      { q: "Which sentence means 'I am sure he did NOT do it'?", options: ["He must not have done it.", "He can't have done it.", "He might not have done it.", "He needn't have done it."], answer: 1, explain: "can't have done = 肯定没做过（把握大的否定推测）。must not 是「禁止」，might not 只是「可能没做」。", difficulty: "困难" },
    ],
  },
  {
    id: "g-b2-3",
    level: "B2",
    titleCn: "间接引语",
    titleEn: "Reported speech",
    intro: "转述别人的话：时态后移一格，人称和时间词跟着说话场景变。",
    rules: [
      {
        heading: "时态后移",
        body: "主句是 said 时，从句时态后移：一般现在 → 一般过去，现在完成 → 过去完成，will → would，can → could。陈述句用 that 引导（可省略）。",
        examples: [
          { en: "\"I am busy.\" → He said (that) he was busy.", cn: "他说他很忙。" },
          { en: "\"I will come.\" → She said she would come.", cn: "她说她会来。" },
        ],
      },
      {
        heading: "时间与地点词调整",
        body: "now → then，today → that day，tomorrow → the next day，yesterday → the day before，here → there，this → that。",
        examples: [{ en: "\"I'll finish it tomorrow.\" → He said he would finish it the next day.", cn: "他说他第二天会完成。" }],
      },
      {
        heading: "转述疑问与祈使",
        body: "一般疑问句用 if / whether + 陈述语序；特殊疑问句保留疑问词 + 陈述语序，都不再倒装。祈使用 tell / ask + 人 + (not) to do。",
        examples: [{ en: "\"Are you OK?\" → He asked if I was OK.", cn: "他问我是否还好。" }],
      },
    ],
    questions: [
      { q: "\"I like this song,\" she said. → She said that she ___ that song.", options: ["likes", "liked", "like", "will like"], answer: 1, explain: "时态后移：like → liked；this → that。", difficulty: "简单" },
      { q: "\"We will win,\" they said. → They said they ___ win.", options: ["will", "would", "shall", "wins"], answer: 1, explain: "will 后移为 would。", difficulty: "简单" },
      { q: "\"Have you finished?\" he asked me. → He asked me ___ I had finished.", options: ["that", "if", "what", "do"], answer: 1, explain: "一般疑问句转述用 if 引导，并用陈述语序。", difficulty: "中等" },
      { q: "\"Don't be late,\" the teacher said to us. → The teacher told us ___ late.", options: ["to not be", "not to be", "don't be", "not be to"], answer: 1, explain: "否定祈使转述：tell sb not to do sth。", difficulty: "中等" },
      { q: "Which reported sentence is correct?", options: ["He asked me where was I going.", "He asked me where I was going.", "He asked me where am I going.", "He asked me that where I was going."], answer: 1, explain: "转述疑问句用陈述语序（I was going），疑问词直接引导，不加 that。", difficulty: "困难" },
    ],
  },
  // ---------------- C1 ----------------
  {
    id: "g-c1-1",
    level: "C1",
    titleCn: "第三条件句与混合条件句",
    titleEn: "Third & mixed conditionals",
    intro: "对过去的假设：If I had known… 说的是已经无法改变的过去；混合条件句连接过去的因和现在的结果。",
    rules: [
      {
        heading: "第三条件句：与过去相反",
        body: "If + had + 过去分词，主句 would have + 过去分词。常用于后悔、庆幸或解释结果：If we had left earlier, we would have caught the train.",
        examples: [
          { en: "If you had told me, I could have helped.", cn: "你当时要是告诉我，我就能帮忙了。" },
          { en: "She wouldn't have failed if she had revised.", cn: "她要是复习了，就不会不及格。" },
        ],
      },
      {
        heading: "混合条件句",
        body: "if 从句谈过去（had done），主句谈现在（would do）：If I had saved money (then), I would be rich (now). 反过来亦可。",
        examples: [{ en: "If he had taken that job, he would be living in Paris now.", cn: "他当时要是接受了那份工作，现在就住在巴黎了。" }],
      },
    ],
    questions: [
      { q: "If I ___ about the traffic, I would have left earlier.", options: ["know", "knew", "had known", "have known"], answer: 2, explain: "主句 would have left 是第三条件句，从句用过去完成时 had known。", difficulty: "简单" },
      { q: "She would have won if she ___ faster.", options: ["runs", "ran", "had run", "run"], answer: 2, explain: "与过去事实相反的假设：had + 过去分词 run（run-ran-run）。", difficulty: "简单" },
      { q: "If we ___ the map, we wouldn't be lost now.", options: ["had brought", "bring", "brought yesterday only", "would bring"], answer: 0, explain: "混合条件句：过去没带地图（had brought），导致现在迷路（wouldn't be）。", difficulty: "中等" },
      { q: "He crashed because he was speeding. → If he ___ speeding, he wouldn't have crashed.", options: ["hadn't been", "weren't", "isn't", "wouldn't be"], answer: 0, explain: "当时正在超速是过去进行中的事实，虚拟用过去完成进行时 hadn't been speeding。", difficulty: "中等" },
      { q: "Which sentence is a correct mixed conditional?", options: ["If I had studied medicine, I would be a doctor now.", "If I had studied medicine, I would have be a doctor now.", "If I studied medicine yesterday, I would be a doctor now tomorrow.", "If I have studied medicine, I would be a doctor yesterday."], answer: 0, explain: "过去条件（had studied）+ 现在结果（would be … now）是标准混合条件句。", difficulty: "困难" },
    ],
  },
  {
    id: "g-c1-2",
    level: "C1",
    titleCn: "倒装句",
    titleEn: "Inversion",
    intro: "把助动词提到主语前，语气立刻正式而强调：Never have I seen…、Not only did he… 高级写作与演讲的利器。",
    rules: [
      {
        heading: "否定副词开头的倒装",
        body: "never、rarely、seldom、hardly、not only、no sooner 等否定或限制性短语放句首时，主句用部分倒装（助动词 + 主语 + 动词原形/分词）：Never have I read such a book.",
        examples: [
          { en: "Rarely does he make mistakes.", cn: "他很少犯错。" },
          { en: "Hardly had we arrived when it began to rain.", cn: "我们刚到，天就下起了雨。" },
        ],
      },
      {
        heading: "only 与 so/such 倒装",
        body: "Only + 状语放句首要倒装：Only then did I understand. 表示「如此……以至于」强调时 So + 形容词提前：So tired was he that he fell asleep at once.",
        examples: [{ en: "Only after the meeting did she realise the truth.", cn: "直到会议结束后，她才意识到真相。" }],
      },
    ],
    questions: [
      { q: "Never ___ such a beautiful sunset before.", options: ["I have seen", "have I seen", "I saw yesterday", "seen I have"], answer: 1, explain: "Never 句首需部分倒装：have I seen。", difficulty: "简单" },
      { q: "Not only ___ the exam, but he also won a scholarship.", options: ["he passed", "did he pass", "he did pass yesterday", "passed he does"], answer: 1, explain: "Not only 句首倒装：did he pass。", difficulty: "简单" },
      { q: "Only then ___ how serious the problem was.", options: ["I realised", "did I realise", "realised I does", "I did realised"], answer: 1, explain: "Only + 时间状语句首倒装：did I realise。", difficulty: "中等" },
      { q: "Hardly ___ the office when the phone rang.", options: ["I had left", "had I left", "I leave", "left I have"], answer: 1, explain: "Hardly … when … 句型：Hardly had I left when …。", difficulty: "中等" },
      { q: "Which sentence uses inversion correctly?", options: ["So fast he ran that no one could catch him.", "So fast did he run that no one could catch him.", "So fast he did ran that no one could catch him.", "So fast run he that no one could catch him."], answer: 1, explain: "So + 副词提前强调时用部分倒装：did he run。", difficulty: "困难" },
    ],
  },
  {
    id: "g-c1-3",
    level: "C1",
    titleCn: "虚拟语气进阶",
    titleEn: "Advanced subjunctive",
    intro: "wish、would rather、it's time 之后的「非真实」时态：用过去时谈现在，用过去完成时谈过去。",
    rules: [
      {
        heading: "wish 句型",
        body: "wish + 过去时 = 希望现在不是这样（I wish I were taller）；wish + had done = 后悔过去（I wish I had studied harder）；wish + would do = 希望将来改变，常带抱怨语气（I wish it would stop raining）。",
        examples: [
          { en: "I wish I knew the answer.", cn: "我要是知道答案就好了。（其实不知道）" },
          { en: "He wishes he hadn't said that.", cn: "他真希望自己没说过那句话。" },
        ],
      },
      {
        heading: "其他虚拟结构",
        body: "would rather sb did（宁愿别人做）；It's (high) time sb did（早该做了）；as if / as though + 过去时：He talks as if he knew everything.",
        examples: [{ en: "It's time we went home.", cn: "我们该回家了。" }],
      },
    ],
    questions: [
      { q: "I wish I ___ in a bigger city now.", options: ["live", "lived", "had lived", "will live"], answer: 1, explain: "wish 谈现在的愿望，用过去时 lived。", difficulty: "简单" },
      { q: "She wishes she ___ harder last term.", options: ["studies", "had studied", "study", "will study"], answer: 1, explain: "对过去的后悔：wish + had done。", difficulty: "简单" },
      { q: "It's high time the government ___ action.", options: ["takes", "took", "take now will", "taken yesterday"], answer: 1, explain: "It's high time + 过去时 took，表示「早该采取行动了」。", difficulty: "中等" },
      { q: "He spends money as if he ___ a millionaire.", options: ["is", "was", "were", "be yesterday"], answer: 2, explain: "as if 引导虚拟，be 动词用 were。", difficulty: "中等" },
      { q: "Which sentence expresses regret about the past?", options: ["I wish it would rain.", "I wish I were you.", "I wish I had brought an umbrella.", "I wish you success."], answer: 2, explain: "had brought 是对过去没带伞的后悔；其余分别谈将来、现在和祝福（wish sb sth 不是虚拟）。", difficulty: "困难" },
    ],
  },
  // ---------------- C2 ----------------
  {
    id: "g-c2-1",
    level: "C2",
    titleCn: "名词化与学术写作",
    titleEn: "Nominalisation in academic writing",
    intro: "把动词、形容词变成名词，句子立刻有了学术腔：The rapid growth of the city… 而不是 The city grew rapidly。",
    rules: [
      {
        heading: "为什么学术写作爱名词化",
        body: "名词化能把「动作」打包成「概念」，方便做主语、被讨论和被量化：The analysis of the data revealed… 常见后缀：-tion、-ment、-ness、-ity、-al（arrive → arrival）。",
        examples: [
          { en: "The expansion of the railway network reduced travel time.", cn: "铁路网的扩张缩短了出行时间。" },
          { en: "There was a significant improvement in air quality.", cn: "空气质量有了显著改善。" },
        ],
      },
      {
        heading: "别过度使用",
        body: "名词化过头会让句子臃肿、掩盖执行者。正式写作中与主动句式搭配使用，并确保每个名词化都有明确的逻辑主语归属。",
        examples: [{ en: "The committee's rejection of the proposal surprised everyone.", cn: "委员会对提议的否决让所有人意外。" }],
      },
    ],
    questions: [
      { q: "Which is the nominalised version of 'The economy grew rapidly'?", options: ["The rapid growth of the economy", "The economy rapid grew", "Growing rapidly the economy", "The economy's grow rapid"], answer: 0, explain: "grow → growth（名词），rapidly → rapid（形容词修饰名词）。", difficulty: "简单" },
      { q: "'The government decided to act.' → 'The government's ___ to act.'", options: ["decide", "decision", "decisive", "decidingly"], answer: 1, explain: "decide 的名词形式是 decision。", difficulty: "简单" },
      { q: "Which sentence sounds most academic?", options: ["People polluted the river a lot, so fish died.", "The heavy pollution of the river led to a decline in fish stocks.", "Fish died because people were polluting the river heavily.", "Polluting the river, people killed many fish."], answer: 1, explain: "pollution、decline 都是名词化，且因果由 led to 紧凑表达，是典型学术句式。", difficulty: "中等" },
      { q: "'fail' 的名词形式是 failure；'The ___ of the experiment surprised the team.'", options: ["fail", "failure", "failed", "failing to"], answer: 1, explain: "空格作主语，需要名词 failure。", difficulty: "中等" },
      { q: "Which nominalisation is WRONG?", options: ["approve → approval", "refuse → refusal", "analyse → analysation", "develop → development"], answer: 2, explain: "analyse 的名词是 analysis，不是 analysation。", difficulty: "困难" },
    ],
  },
  {
    id: "g-c2-2",
    level: "C2",
    titleCn: "分裂句与强调结构",
    titleEn: "Cleft sentences",
    intro: "It was John who…、What I need is…：把想强调的部分推到舞台中央，口语和写作都常用。",
    rules: [
      {
        heading: "It 分裂句",
        body: "It is / was + 被强调部分 + that / who + 其余。能强调主语、宾语、状语：It was in 2008 that they met. 强调人时多用 who。",
        examples: [
          { en: "It was Maria who found the solution.", cn: "找到解决办法的正是玛丽亚。" },
          { en: "It was yesterday that I heard the news.", cn: "我是昨天才听到这个消息的。" },
        ],
      },
      {
        heading: "What 分裂句",
        body: "What + 从句 + be + 被强调部分：What matters most is honesty. 相当于把宾语/表语提前打包强调。",
        examples: [{ en: "What surprised me was his calmness.", cn: "让我吃惊的是他的冷静。" }],
      },
    ],
    questions: [
      { q: "It was Tom ___ broke the vase, not me.", options: ["which", "who", "what", "whom did"], answer: 1, explain: "It 分裂句强调人作主语时用 who（也可用 that）。", difficulty: "简单" },
      { q: "___ I want is a quiet place to study.", options: ["That", "What", "It", "Which thing"], answer: 1, explain: "What 分裂句：What I want is …。", difficulty: "简单" },
      { q: "It was in Paris ___ they first met.", options: ["where", "that", "which place", "when time"], answer: 1, explain: "It 分裂句强调地点状语时，连接词仍用 that。", difficulty: "中等" },
      { q: "Which sentence emphasises the OBJECT 'the report'?", options: ["It was the manager who wrote the report.", "It was the report that the manager wrote.", "The manager wrote the report quickly.", "What the manager wrote quickly."], answer: 1, explain: "被强调成分是 the report（原句宾语），放在 It was 之后正是分裂句强调宾语的用法。", difficulty: "中等" },
      { q: "Which cleft sentence is correct?", options: ["What did he say was shocking.", "What he said was shocking.", "What he said it was shocking.", "What was shocking he said it."], answer: 1, explain: "What he said 作主语，was shocking 作谓语表语，结构完整；A 是疑问句式，C 多了 it，D 语序混乱。", difficulty: "困难" },
    ],
  },
  {
    id: "g-c2-3",
    level: "C2",
    titleCn: "语域与正式文体",
    titleEn: "Register & formal style",
    intro: "同一件事，朋友聊天说 \"ask for\"，正式信函说 \"request\"。C2 的标志就是知道什么场合用什么词。",
    rules: [
      {
        heading: "短语动词 → 正式单动词",
        body: "正式文体倾向拉丁词源的单个动词：put off → postpone，find out → discover，get in touch → contact，look into → investigate，come up with → propose。",
        examples: [
          { en: "We regret to inform you that the meeting has been postponed.", cn: "我们遗憾地通知您，会议已延期。" },
          { en: "The committee will investigate the matter.", cn: "委员会将调查此事。" },
        ],
      },
      {
        heading: "正式文体的其他标记",
        body: "多用被动与名词化、避免缩略式（do not 而非 don't）、用 hedging 留余地（arguably、to some extent），结尾客套：I look forward to hearing from you.",
        examples: [{ en: "It could arguably be claimed that remote work is here to stay.", cn: "可以说，远程办公将会长期存在。" }],
      },
    ],
    questions: [
      { q: "In a formal letter, 'ask for' is better written as ___.", options: ["request", "wanna", "get asking", "ask please"], answer: 0, explain: "request 是正式文体中「索取、请求」的对应词。", difficulty: "简单" },
      { q: "The formal equivalent of 'put off the meeting' is ___ the meeting.", options: ["postpone", "put away", "delay it off", "call to"], answer: 0, explain: "postpone = 延期，是 put off 的正式说法。", difficulty: "简单" },
      { q: "Which sentence suits an academic essay?", options: ["Lots of kids these days don't read books anymore.", "A growing number of children no longer read books regularly.", "Kids nowadays just won't pick up a book, you know.", "Books? Children don't bother with them."], answer: 1, explain: "B 无缩略、无口语词，a growing number of 是正式表达。", difficulty: "中等" },
      { q: "'look into a problem' in formal style = ___ a problem.", options: ["investigate", "watch", "peek", "stare"], answer: 0, explain: "investigate 是「调查」的正式动词。", difficulty: "中等" },
      { q: "Which closing is appropriate for a formal email?", options: ["Cheers, see ya!", "I look forward to hearing from you.", "Write back ASAP!!", "That's all, bye."], answer: 1, explain: "I look forward to hearing from you 是正式邮件的标准客套结尾。", difficulty: "困难" },
    ],
  },
];

function w(word: string, phonetic: string, pos: string, meaning: string, example: string, exampleCn: string): Word {
  return { word, phonetic, pos, meaning, example, exampleCn };
}

export const TOPIC_SETS: VocabSet[] = [
  {
    id: "t-education",
    kind: "vocab-topic",
    titleCn: "教育",
    titleEn: "Education",
    blurb: "校园、考试与学习方式——雅思口语和写作的高频主题。",
    words: [
      w("curriculum", "/kəˈrɪkjələm/", "n.", "课程；课程体系", "The school updated its curriculum this year.", "学校今年更新了课程体系。"),
      w("scholarship", "/ˈskɒləʃɪp/", "n.", "奖学金", "She won a scholarship to study abroad.", "她获得了出国留学的奖学金。"),
      w("assignment", "/əˈsaɪnmənt/", "n.", "作业；任务", "The assignment is due on Friday.", "作业周五截止。"),
      w("qualification", "/ˌkwɒlɪfɪˈkeɪʃn/", "n.", "资格；学历", "A degree is a useful qualification.", "学位是一种有用的学历资格。"),
      w("tuition", "/tjuˈɪʃn/", "n.", "学费；教学", "University tuition has risen sharply.", "大学学费大幅上涨。"),
      w("lecture", "/ˈlektʃə(r)/", "n.", "讲座；授课", "We have a maths lecture at nine.", "我们九点有数学课。"),
      w("discipline", "/ˈdɪsəplɪn/", "n.", "纪律；学科", "Good discipline helps students focus.", "良好的纪律有助于学生专注。"),
      w("compulsory", "/kəmˈpʌlsəri/", "adj.", "必修的；强制的", "English is a compulsory subject.", "英语是必修科目。"),
      w("literacy", "/ˈlɪtərəsi/", "n.", "读写能力", "The campaign aims to improve literacy.", "这项运动旨在提高读写能力。"),
      w("graduate", "/ˈɡrædʒuət/", "n./v.", "毕业生；毕业", "He will graduate next summer.", "他将于明年夏天毕业。"),
    ],
  },
  {
    id: "t-health",
    kind: "vocab-topic",
    titleCn: "健康",
    titleEn: "Health",
    blurb: "身体、饮食与医疗——从日常表达到雅思写作都用得上。",
    words: [
      w("nutrition", "/njuˈtrɪʃn/", "n.", "营养", "Good nutrition is essential for children.", "良好的营养对儿童至关重要。"),
      w("symptom", "/ˈsɪmptəm/", "n.", "症状", "Fever is a symptom of flu.", "发烧是流感的一种症状。"),
      w("treatment", "/ˈtriːtmənt/", "n.", "治疗", "The treatment worked well.", "治疗效果很好。"),
      w("exercise", "/ˈeksəsaɪz/", "n./v.", "锻炼", "Regular exercise keeps you fit.", "定期锻炼能保持健康。"),
      w("disease", "/dɪˈziːz/", "n.", "疾病", "Clean water prevents many diseases.", "干净的水能预防许多疾病。"),
      w("recovery", "/rɪˈkʌvəri/", "n.", "康复", "Her recovery was faster than expected.", "她的康复比预期的快。"),
      w("mental", "/ˈmentl/", "adj.", "心理的；精神的", "Mental health matters as much as physical health.", "心理健康和身体健康同样重要。"),
      w("balanced", "/ˈbælənst/", "adj.", "均衡的", "Eat a balanced diet.", "要均衡饮食。"),
      w("vaccine", "/ˈvæksiːn/", "n.", "疫苗", "The vaccine protects against the virus.", "这种疫苗能抵御该病毒。"),
      w("stress", "/stres/", "n.", "压力", "Too much stress is bad for your heart.", "压力过大对心脏有害。"),
    ],
  },
  {
    id: "t-environment",
    kind: "vocab-topic",
    titleCn: "环境",
    titleEn: "Environment",
    blurb: "气候、污染与可持续——雅思大作文的常客主题。",
    words: [
      w("pollution", "/pəˈluːʃn/", "n.", "污染", "Air pollution is a serious problem in big cities.", "空气污染是大城市的严重问题。"),
      w("recycle", "/ˌriːˈsaɪkl/", "v.", "回收利用", "We should recycle plastic bottles.", "我们应该回收塑料瓶。"),
      w("climate", "/ˈklaɪmət/", "n.", "气候", "The climate here is mild.", "这里气候温和。"),
      w("renewable", "/rɪˈnjuːəbl/", "adj.", "可再生的", "Solar power is a renewable energy source.", "太阳能是一种可再生能源。"),
      w("emission", "/ɪˈmɪʃn/", "n.", "排放（物）", "The factory reduced its carbon emissions.", "这家工厂减少了碳排放。"),
      w("habitat", "/ˈhæbɪtæt/", "n.", "栖息地", "Forests are the habitat of many species.", "森林是许多物种的栖息地。"),
      w("conservation", "/ˌkɒnsəˈveɪʃn/", "n.", "保护；保存", "Wildlife conservation is urgent.", "野生动物保护刻不容缓。"),
      w("sustainable", "/səˈsteɪnəbl/", "adj.", "可持续的", "We need sustainable development.", "我们需要可持续发展。"),
      w("extinct", "/ɪkˈstɪŋkt/", "adj.", "灭绝的", "Dinosaurs became extinct long ago.", "恐龙很久以前就灭绝了。"),
      w("drought", "/draʊt/", "n.", "干旱", "The drought destroyed the crops.", "干旱毁了庄稼。"),
    ],
  },
  {
    id: "t-technology",
    kind: "vocab-topic",
    titleCn: "科技",
    titleEn: "Technology",
    blurb: "互联网、人工智能与数字生活——最热门的话题词汇。",
    words: [
      w("artificial intelligence", "/ˌɑːtɪˈfɪʃl ɪnˈtelɪdʒəns/", "n.", "人工智能", "Artificial intelligence is changing education.", "人工智能正在改变教育。"),
      w("device", "/dɪˈvaɪs/", "n.", "设备；装置", "This device can translate in real time.", "这个设备可以实时翻译。"),
      w("software", "/ˈsɒftweə(r)/", "n.", "软件", "Please update the software.", "请更新软件。"),
      w("data", "/ˈdeɪtə/", "n.", "数据", "The app collects user data.", "这个应用会收集用户数据。"),
      w("access", "/ˈækses/", "n./v.", "访问；通道", "Students can access the library online.", "学生可以在线访问图书馆。"),
      w("innovation", "/ˌɪnəˈveɪʃn/", "n.", "创新", "Innovation drives economic growth.", "创新推动经济增长。"),
      w("automatic", "/ˌɔːtəˈmætɪk/", "adj.", "自动的", "The doors are automatic.", "这些门是自动的。"),
      w("digital", "/ˈdɪdʒɪtl/", "adj.", "数字的", "We live in a digital age.", "我们生活在数字时代。"),
      w("privacy", "/ˈprɪvəsi/", "n.", "隐私", "Protecting privacy online is important.", "在网上保护隐私很重要。"),
      w("efficiency", "/ɪˈfɪʃnsi/", "n.", "效率", "The new system improved efficiency.", "新系统提高了效率。"),
    ],
  },
  {
    id: "t-work",
    kind: "vocab-topic",
    titleCn: "工作与职场",
    titleEn: "Work & Career",
    blurb: "职业、面试与职场沟通——为将来就业打底。",
    words: [
      w("career", "/kəˈrɪə(r)/", "n.", "职业；职业生涯", "She wants a career in medicine.", "她想从事医疗行业。"),
      w("colleague", "/ˈkɒliːɡ/", "n.", "同事", "My colleagues are very helpful.", "我的同事们非常乐于助人。"),
      w("interview", "/ˈɪntəvjuː/", "n./v.", "面试", "I have a job interview tomorrow.", "我明天有一场求职面试。"),
      w("salary", "/ˈsæləri/", "n.", "薪水", "He earns a good salary.", "他的薪水不错。"),
      w("promote", "/prəˈməʊt/", "v.", "晋升；推广", "She was promoted last month.", "她上个月升职了。"),
      w("deadline", "/ˈdedlaɪn/", "n.", "截止日期", "We must meet the deadline.", "我们必须赶上截止日期。"),
      w("responsibility", "/rɪˌspɒnsəˈbɪləti/", "n.", "责任", "Teamwork requires responsibility.", "团队合作需要责任感。"),
      w("experience", "/ɪkˈspɪəriəns/", "n.", "经验；经历", "Work experience is valuable.", "工作经验很宝贵。"),
      w("apply", "/əˈplaɪ/", "v.", "申请", "He applied for the position online.", "他在网上申请了这个职位。"),
      w("flexible", "/ˈfleksəbl/", "adj.", "灵活的", "Flexible hours suit parents well.", "弹性工作时间很适合父母。"),
    ],
  },
  {
    id: "t-travel",
    kind: "vocab-topic",
    titleCn: "旅行与交通",
    titleEn: "Travel & Transport",
    blurb: "出行必备：订票、住宿、交通与观光。",
    words: [
      w("journey", "/ˈdʒɜːni/", "n.", "旅程", "The journey took six hours.", "旅程花了六个小时。"),
      w("destination", "/ˌdestɪˈneɪʃn/", "n.", "目的地", "Paris is a popular destination.", "巴黎是热门旅游目的地。"),
      w("accommodation", "/əˌkɒməˈdeɪʃn/", "n.", "住宿", "We booked accommodation near the beach.", "我们预订了海滩附近的住宿。"),
      w("passenger", "/ˈpæsɪndʒə(r)/", "n.", "乘客", "Passengers must wear seat belts.", "乘客必须系好安全带。"),
      w("luggage", "/ˈlʌɡɪdʒ/", "n.", "行李", "Don't leave your luggage unattended.", "不要把行李放在无人看管的地方。"),
      w("delay", "/dɪˈleɪ/", "n./v.", "延误；延迟", "The flight was delayed by fog.", "航班因大雾延误了。"),
      w("route", "/ruːt/", "n.", "路线", "This is the fastest route to the airport.", "这是去机场最快的路线。"),
      w("souvenir", "/ˌsuːvəˈnɪə(r)/", "n.", "纪念品", "I bought a souvenir for my sister.", "我给妹妹买了纪念品。"),
      w("abroad", "/əˈbrɔːd/", "adv.", "到国外", "She studies abroad.", "她在国外留学。"),
      w("traffic", "/ˈtræfɪk/", "n.", "交通", "Traffic is heavy during rush hour.", "高峰时段交通拥堵。"),
    ],
  },
  {
    id: "t-society",
    kind: "vocab-topic",
    titleCn: "社会与城市",
    titleEn: "Society & Cities",
    blurb: "城市生活、人口与公共议题——写作论证常用。",
    words: [
      w("population", "/ˌpɒpjuˈleɪʃn/", "n.", "人口", "The city's population is growing.", "这座城市的人口在增长。"),
      w("government", "/ˈɡʌvənmənt/", "n.", "政府", "The government built more schools.", "政府修建了更多学校。"),
      w("community", "/kəˈmjuːnəti/", "n.", "社区；群体", "Our community has a small library.", "我们社区有个小图书馆。"),
      w("urban", "/ˈɜːbən/", "adj.", "城市的", "Urban life can be stressful.", "城市生活可能压力很大。"),
      w("rural", "/ˈrʊərəl/", "adj.", "乡村的", "Rural areas are quieter.", "乡村地区更安静。"),
      w("crime", "/kraɪm/", "n.", "犯罪", "Crime rates have fallen.", "犯罪率下降了。"),
      w("poverty", "/ˈpɒvəti/", "n.", "贫困", "Education can reduce poverty.", "教育可以减少贫困。"),
      w("facility", "/fəˈsɪləti/", "n.", "设施", "The sports facilities are excellent.", "体育设施非常棒。"),
      w("public", "/ˈpʌblɪk/", "adj./n.", "公共的；公众", "Public transport is convenient here.", "这里的公共交通很方便。"),
      w("generation", "/ˌdʒenəˈreɪʃn/", "n.", "一代人", "The younger generation loves technology.", "年轻一代热爱科技。"),
    ],
  },
  {
    id: "t-culture",
    kind: "vocab-topic",
    titleCn: "文化与媒体",
    titleEn: "Culture & Media",
    blurb: "艺术、影视、广告与社交媒体用词。",
    words: [
      w("tradition", "/trəˈdɪʃn/", "n.", "传统", "We keep the tradition of eating dumplings.", "我们保持着吃饺子的传统。"),
      w("audience", "/ˈɔːdiəns/", "n.", "观众", "The audience loved the performance.", "观众很喜欢这场演出。"),
      w("advertisement", "/ədˈvɜːtɪsmənt/", "n.", "广告", "The advertisement attracted many customers.", "这则广告吸引了很多顾客。"),
      w("influence", "/ˈɪnfluəns/", "n./v.", "影响", "Social media has a big influence on teenagers.", "社交媒体对青少年影响很大。"),
      w("celebrity", "/səˈlebrəti/", "n.", "名人", "The celebrity visited our school.", "那位名人来我们学校参观了。"),
      w("publish", "/ˈpʌblɪʃ/", "v.", "出版；发布", "She published her first novel at 25.", "她 25 岁出版了第一部小说。"),
      w("entertainment", "/ˌentəˈteɪnmənt/", "n.", "娱乐", "Games are a form of entertainment.", "游戏是一种娱乐形式。"),
      w("custom", "/ˈkʌstəm/", "n.", "习俗", "Shaking hands is a common custom.", "握手是常见的习俗。"),
      w("global", "/ˈɡləʊbl/", "adj.", "全球的", "English is a global language.", "英语是一门全球性语言。"),
      w("trend", "/trend/", "n.", "趋势；潮流", "Short videos are a growing trend.", "短视频是一个增长中的潮流。"),
    ],
  },
];

export const CEFR_SETS: VocabSet[] = [
  {
    id: "c-a1",
    kind: "vocab-cefr",
    level: "A1",
    titleCn: "A1 基础词汇",
    titleEn: "A1 Foundations",
    blurb: "最核心的生活词：家庭、颜色、日常动作。",
    words: [
      w("family", "/ˈfæməli/", "n.", "家庭", "My family is small.", "我的家庭很小。"),
      w("friend", "/frend/", "n.", "朋友", "She is my best friend.", "她是我最好的朋友。"),
      w("happy", "/ˈhæpi/", "adj.", "开心的", "The children are happy.", "孩子们很开心。"),
      w("big", "/bɪɡ/", "adj.", "大的", "This is a big house.", "这是一座大房子。"),
      w("eat", "/iːt/", "v.", "吃", "We eat rice every day.", "我们每天吃米饭。"),
      w("drink", "/drɪŋk/", "v.", "喝", "Please drink some water.", "请喝点水。"),
      w("school", "/skuːl/", "n.", "学校", "My school is near my home.", "我的学校离家很近。"),
      w("morning", "/ˈmɔːnɪŋ/", "n.", "早晨", "Good morning, teacher!", "老师，早上好！"),
      w("red", "/red/", "adj./n.", "红色的；红色", "She wears a red dress.", "她穿着红裙子。"),
      w("cat", "/kæt/", "n.", "猫", "The cat is sleeping.", "猫在睡觉。"),
    ],
  },
  {
    id: "c-a2",
    kind: "vocab-cefr",
    level: "A2",
    titleCn: "A2 常用词汇",
    titleEn: "A2 Everyday Words",
    blurb: "购物、天气、计划与感受的常用词。",
    words: [
      w("cheap", "/tʃiːp/", "adj.", "便宜的", "These shoes are cheap.", "这双鞋很便宜。"),
      w("weather", "/ˈweðə(r)/", "n.", "天气", "The weather is sunny today.", "今天天气晴朗。"),
      w("decide", "/dɪˈsaɪd/", "v.", "决定", "We decided to stay at home.", "我们决定待在家里。"),
      w("invite", "/ɪnˈvaɪt/", "v.", "邀请", "He invited me to his party.", "他邀请我去他的派对。"),
      w("worried", "/ˈwʌrid/", "adj.", "担心的", "Don't be worried about the test.", "别担心考试。"),
      w("borrow", "/ˈbɒrəʊ/", "v.", "借入", "Can I borrow your pen?", "我能借你的笔吗？"),
      w("arrive", "/əˈraɪv/", "v.", "到达", "We arrived at the station early.", "我们提前到达了车站。"),
      w("hungry", "/ˈhʌŋɡri/", "adj.", "饥饿的", "I am hungry. Let's eat.", "我饿了，吃饭吧。"),
      w("museum", "/mjuˈziːəm/", "n.", "博物馆", "The museum opens at nine.", "博物馆九点开门。"),
      w("forget", "/fəˈɡet/", "v.", "忘记", "Don't forget your umbrella.", "别忘了你的伞。"),
    ],
  },
  {
    id: "c-b1",
    kind: "vocab-cefr",
    level: "B1",
    titleCn: "B1 进阶词汇",
    titleEn: "B1 Step Up",
    blurb: "观点、建议与日常抽象概念的表达词。",
    words: [
      w("advice", "/ədˈvaɪs/", "n.", "建议", "Thank you for your advice.", "谢谢你的建议。"),
      w("improve", "/ɪmˈpruːv/", "v.", "提高；改善", "Reading can improve your vocabulary.", "阅读可以扩大你的词汇量。"),
      w("opinion", "/əˈpɪnjən/", "n.", "观点", "In my opinion, practice is key.", "在我看来，练习是关键。"),
      w("avoid", "/əˈvɔɪd/", "v.", "避免", "Avoid eating too much sugar.", "避免吃太多糖。"),
      w("achieve", "/əˈtʃiːv/", "v.", "实现；达到", "You can achieve your goals.", "你可以实现你的目标。"),
      w("confident", "/ˈkɒnfɪdənt/", "adj.", "自信的", "Be confident when you speak.", "说话时要自信。"),
      w("recently", "/ˈriːsntli/", "adv.", "最近", "I recently started learning French.", "我最近开始学法语。"),
      w("describe", "/dɪˈskraɪb/", "v.", "描述", "Can you describe the picture?", "你能描述这幅画吗？"),
      w("prepare", "/prɪˈpeə(r)/", "v.", "准备", "Prepare well for the exam.", "为考试做好准备。"),
      w("surroundings", "/səˈraʊndɪŋz/", "n.", "周围环境", "Quiet surroundings help you study.", "安静的周边环境有助于学习。"),
    ],
  },
  {
    id: "c-b2",
    kind: "vocab-cefr",
    level: "B2",
    titleCn: "B2 流利词汇",
    titleEn: "B2 Fluency",
    blurb: "论证、转折与精确表达的词，写作提分必备。",
    words: [
      w("significant", "/sɪɡˈnɪfɪkənt/", "adj.", "重要的；显著的", "There was a significant change.", "发生了显著变化。"),
      w("consequence", "/ˈkɒnsɪkwəns/", "n.", "后果", "Every action has consequences.", "每个行为都有后果。"),
      w("approximately", "/əˈprɒksɪmətli/", "adv.", "大约", "The trip takes approximately two hours.", "旅程大约需要两个小时。"),
      w("essential", "/ɪˈsenʃl/", "adj.", "必不可少的", "Sleep is essential for health.", "睡眠对健康必不可少。"),
      w("argue", "/ˈɑːɡjuː/", "v.", "认为；争论", "Some experts argue that homework is unnecessary.", "一些专家认为作业没有必要。"),
      w("demand", "/dɪˈmɑːnd/", "n./v.", "需求；要求", "The demand for online courses is rising.", "对在线课程的需求正在上升。"),
      w("reluctant", "/rɪˈlʌktənt/", "adj.", "不情愿的", "He was reluctant to admit his mistake.", "他不愿意承认错误。"),
      w("contribute", "/kənˈtrɪbjuːt/", "v.", "贡献；促成", "Everyone contributed to the project.", "每个人都为这个项目出了力。"),
      w("gradually", "/ˈɡrædʒuəli/", "adv.", "逐渐地", "Your English will gradually improve.", "你的英语会逐渐提高。"),
      w("persuade", "/pəˈsweɪd/", "v.", "说服", "She persuaded me to join the club.", "她说服我加入了俱乐部。"),
    ],
  },
  {
    id: "c-c1",
    kind: "vocab-cefr",
    level: "C1",
    titleCn: "C1 高级词汇",
    titleEn: "C1 Advanced",
    blurb: "细腻差别与正式语境中的高级词。",
    words: [
      w("inevitable", "/ɪnˈevɪtəbl/", "adj.", "不可避免的", "Change is inevitable.", "变化是不可避免的。"),
      w("subtle", "/ˈsʌtl/", "adj.", "微妙的", "There is a subtle difference between the words.", "这两个词之间有微妙的差别。"),
      w("comprehensive", "/ˌkɒmprɪˈhensɪv/", "adj.", "全面的", "The report is comprehensive.", "这份报告很全面。"),
      w("controversial", "/ˌkɒntrəˈvɜːʃl/", "adj.", "有争议的", "It is a controversial decision.", "这是一个有争议的决定。"),
      w("reluctance", "/rɪˈlʌktəns/", "n.", "不情愿", "His reluctance to speak was obvious.", "他不愿开口的态度很明显。"),
      w("undermine", "/ˌʌndəˈmaɪn/", "v.", "削弱；破坏", "Stress can undermine your health.", "压力会损害你的健康。"),
      w("notion", "/ˈnəʊʃn/", "n.", "观念；概念", "The notion of success varies.", "成功的观念因人而异。"),
      w("predominantly", "/prɪˈdɒmɪnəntli/", "adv.", "主要地", "The audience was predominantly young.", "观众主要是年轻人。"),
      w("fluctuate", "/ˈflʌktʃueɪt/", "v.", "波动", "Prices fluctuate daily.", "价格每天都在波动。"),
      w("coherent", "/kəʊˈhɪərənt/", "adj.", "连贯的；条理清晰的", "Write a coherent essay.", "写一篇连贯的文章。"),
    ],
  },
  {
    id: "c-c2",
    kind: "vocab-cefr",
    level: "C2",
    titleCn: "C2 精通词汇",
    titleEn: "C2 Mastery",
    blurb: "接近母语者细腻度的词：抽象、修辞与精准。",
    words: [
      w("ubiquitous", "/juːˈbɪkwɪtəs/", "adj.", "无处不在的", "Smartphones are ubiquitous today.", "如今智能手机无处不在。"),
      w("ambiguous", "/æmˈbɪɡjuəs/", "adj.", "模棱两可的", "His answer was ambiguous.", "他的回答模棱两可。"),
      w("meticulous", "/məˈtɪkjələs/", "adj.", "一丝不苟的", "She is meticulous about details.", "她对细节一丝不苟。"),
      w("resilient", "/rɪˈzɪliənt/", "adj.", "有韧性的", "Children are remarkably resilient.", "孩子们的适应力惊人地强。"),
      w("articulate", "/ɑːˈtɪkjələt/", "adj.", "善于表达的", "He is an articulate speaker.", "他是一位善于表达的演讲者。"),
      w("profound", "/prəˈfaʊnd/", "adj.", "深刻的", "The book had a profound effect on me.", "这本书对我影响深远。"),
      w("scrutinise", "/ˈskruːtɪnaɪz/", "v.", "仔细审查", "The data was scrutinised by experts.", "数据经过了专家的仔细审查。"),
      w("ephemeral", "/ɪˈfemərəl/", "adj.", "短暂的", "Fame can be ephemeral.", "名声可能转瞬即逝。"),
      w("paradigm", "/ˈpærədaɪm/", "n.", "范式；典范", "The discovery changed the scientific paradigm.", "这一发现改变了科学范式。"),
      w("eloquent", "/ˈeləkwənt/", "adj.", "雄辩的", "Her eloquent speech moved the audience.", "她雄辩的演讲打动了观众。"),
    ],
  },
];

// ---------------- 目录扩充（第二批） ----------------

GRAMMAR_LESSONS.push(
  {
    id: "g-a1-4",
    level: "A1",
    titleCn: "名词复数与冠词",
    titleEn: "Plurals & articles: a / an / the",
    intro: "英语名词分单复数，前面还常带 a、an 或 the。中文没有这一层，是初学最容易漏的地方。",
    rules: [
      {
        heading: "复数怎么变",
        body: "一般加 -s；以 s、x、ch、sh 结尾加 -es（bus → buses，watch → watches）；辅音字母 + y 变 i 加 es（city → cities）。不规则：man → men，child → children，foot → feet。",
        examples: [
          { en: "I have two watches.", cn: "我有两块手表。" },
          { en: "The children are playing.", cn: "孩子们在玩耍。" },
        ],
      },
      {
        heading: "a / an / the 的分工",
        body: "第一次提到、泛指一个：a（辅音音素前）/ an（元音音素前）；双方都知道、特指的那个：the；泛指一类或独一无二的事物也用 the（the sun）。",
        examples: [
          { en: "I saw a cat. The cat was black.", cn: "我看见一只猫。那只猫是黑色的。" },
          { en: "She is an honest girl.", cn: "她是个诚实的女孩。（honest 的 h 不发音）" },
        ],
      },
    ],
    questions: [
      { q: "There are three ___ on the table.", options: ["box", "boxs", "boxes", "boxing"], answer: 2, explain: "box 以 x 结尾，复数加 -es → boxes。", difficulty: "简单" },
      { q: "She wants to be ___ engineer.", options: ["a", "an", "the", "one of"], answer: 1, explain: "engineer 以元音音素开头，用 an。", difficulty: "简单" },
      { q: "I bought a pen yesterday. ___ pen is blue.", options: ["A", "An", "The", "This is a"], answer: 2, explain: "第二次提到同一个事物，用 the 特指。", difficulty: "中等" },
      { q: "Two ___ are waiting outside.", options: ["mans", "man", "men", "mens"], answer: 2, explain: "man 的复数是不规则变化 men。", difficulty: "中等" },
      { q: "Which sentence is correct?", options: ["He is a honest man.", "He is an honest man.", "He is the honest man one.", "He is honest man."], answer: 1, explain: "honest 的 h 不发音，以元音音素开头，要用 an，且单数可数名词前不能没有冠词。", difficulty: "困难" },
    ],
  },
  {
    id: "g-a2-4",
    level: "A2",
    titleCn: "过去进行时",
    titleEn: "Past continuous",
    intro: "过去某一点正在进行的动作，常和一般过去时搭配讲故事：长动作被短动作打断。",
    rules: [
      {
        heading: "结构：was / were + V-ing",
        body: "单数主语用 was，复数和 you 用 were，后面加动词 -ing。常用时间点：at 8 last night、this time yesterday。",
        examples: [
          { en: "I was sleeping at midnight.", cn: "午夜时我正在睡觉。" },
          { en: "They were playing football at five.", cn: "五点时他们正在踢足球。" },
        ],
      },
      {
        heading: "长短动作搭配",
        body: "故事里：进行时铺背景（长动作），过去时报事件（短动作）。While I was cooking, he arrived. when 后面多接短动作，while 后面多接长动作。",
        examples: [{ en: "While she was reading, the phone rang.", cn: "她正在看书时，电话响了。" }],
      },
    ],
    questions: [
      { q: "At 9 last night, we ___ TV.", options: ["watch", "were watching", "watches", "are watch"], answer: 1, explain: "过去某点正在进行，we 用 were watching。", difficulty: "简单" },
      { q: "She ___ a shower when I called.", options: ["was having", "have", "has yesterday", "is have"], answer: 0, explain: "电话打来时她正在洗澡（长动作）：was having。", difficulty: "简单" },
      { q: "While I ___ home, it started to snow.", options: ["walk", "was walking", "walks", "am walk"], answer: 1, explain: "while 引导长动作，用过去进行时 was walking。", difficulty: "中等" },
      { q: "The teacher came in while we ___.", options: ["are talking", "were talking", "talks", "talk yesterday ago"], answer: 1, explain: "老师进来是过去的点，我们当时正在说话：were talking。", difficulty: "中等" },
      { q: "Which sentence is correct?", options: ["When I was young, I was play outside every day.", "I was reading when the lights went out.", "I reading when the lights went out.", "I was read when the lights went out."], answer: 1, explain: "过去进行时结构是 was + V-ing；A 的错误是把习惯动作（应用一般过去时 played）套上了进行时结构。", difficulty: "困难" },
    ],
  },
  {
    id: "g-b1-4",
    level: "B1",
    titleCn: "情态动词：义务与建议",
    titleEn: "Modals: must, have to, should",
    intro: "必须做、不得不做、最好做——语气强弱全在情态动词里：must > have to > should。",
    rules: [
      {
        heading: "must 与 have to",
        body: "都表示「必须」。must 多出于说话人自己的要求或规则感，have to 多出于外部规定。否定差别大：mustn't 是「禁止」，don't have to 是「没必要」。",
        examples: [
          { en: "You must wear a seat belt.", cn: "你必须系安全带。" },
          { en: "You don't have to come early.", cn: "你不必早来。" },
        ],
      },
      {
        heading: "should 给建议",
        body: "should + 动词原形表示建议、劝告：You should rest. 否定 shouldn't。语气比 must 软得多。",
        examples: [{ en: "You should see a doctor.", cn: "你应该去看医生。" }],
      },
    ],
    questions: [
      { q: "Students ___ wear uniforms at this school. It's a rule.", options: ["have to", "shouldn't to", "mustn't be", "don't have"], answer: 0, explain: "校规是外部规定，用 have to。", difficulty: "简单" },
      { q: "You ___ smoke here. It's forbidden.", options: ["don't have to", "mustn't", "needn't to", "should try"], answer: 1, explain: "禁止用 mustn't；don't have to 是「没必要」，意思完全不同。", difficulty: "简单" },
      { q: "If you feel sick, you ___ rest at home.", options: ["should", "musts", "have", "are must"], answer: 0, explain: "给建议用 should + 动词原形。", difficulty: "中等" },
      { q: "The exam is optional. You ___ take it.", options: ["mustn't", "don't have to", "must", "shouldn't to be"], answer: 1, explain: "考试可选 = 没必要参加：don't have to。", difficulty: "中等" },
      { q: "Which pair is correct?", options: ["mustn't = 没必要", "don't have to = 禁止", "mustn't = 禁止，don't have to = 没必要", "两者意思相同"], answer: 2, explain: "mustn't 是禁止，don't have to 是没必要——这是中国学生最常见的混淆点。", difficulty: "困难" },
    ],
  },
  {
    id: "g-b2-4",
    level: "B2",
    titleCn: "现在完成进行时",
    titleEn: "Present perfect continuous",
    intro: "从过去开始、一直持续到现在（甚至还在继续）的动作，强调「持续」本身：have been doing。",
    rules: [
      {
        heading: "结构与感觉",
        body: "have / has been + V-ing。强调过程的持续和未完成感，常配 since / for / all day：I have been waiting for an hour. 状态动词（know、like）不能用这个时态。",
        examples: [
          { en: "It has been raining all morning.", cn: "雨下了一整个上午（还在下）。" },
          { en: "She has been learning English since 2020.", cn: "她从 2020 年起一直在学英语。" },
        ],
      },
      {
        heading: "与现在完成时的侧重差别",
        body: "完成时侧重结果（I have written three emails. — 写完了三封），完成进行时侧重过程（I have been writing emails all day. — 写了一整天）。",
        examples: [{ en: "Your eyes are red. Have you been crying?", cn: "你眼睛红了，你刚才一直在哭吗？" }],
      },
    ],
    questions: [
      { q: "I ___ for you since 3 o'clock!", options: ["am wait", "have been waiting", "wait yesterday", "waits"], answer: 1, explain: "从三点等到现在且还在等：have been waiting。", difficulty: "简单" },
      { q: "He ___ in this company for five years.", options: ["has been working", "is work", "works yesterday", "worked be"], answer: 0, explain: "持续五年的动作用现在完成进行时 has been working。", difficulty: "简单" },
      { q: "She is out of breath. She ___.", options: ["has been running", "runs yesterday", "is run", "run"], answer: 0, explain: "上气不接下气是「一直在跑」留下的现在证据：has been running。", difficulty: "中等" },
      { q: "Which verb CANNOT be used in this tense?", options: ["rain", "know", "work", "study"], answer: 1, explain: "know 是状态动词，只能说 have known，不能说 have been knowing。", difficulty: "中等" },
      { q: "Which sentence emphasises a COMPLETED result?", options: ["I have been reading the book all week.", "I have read the whole book.", "I have been reading the book since Monday.", "I have been reading books all day."], answer: 1, explain: "have read the whole book 用现在完成时强调结果（整本读完了）；其余是进行时强调过程。", difficulty: "困难" },
    ],
  },
  {
    id: "g-c1-4",
    level: "C1",
    titleCn: "分词从句",
    titleEn: "Participle clauses",
    intro: "把从句压缩成分词短语，句子立刻变紧凑：Walking home, I met Tom. 高级写作的压缩术。",
    rules: [
      {
        heading: "现在分词：主动、同时",
        body: "分词短语的逻辑主语必须和主句主语一致。表主动或同时发生：Hearing the news, she cried. 表原因：Being tired, he went to bed early.",
        examples: [
          { en: "Not knowing what to say, he stayed silent.", cn: "不知道说什么，他保持了沉默。" },
          { en: "The man standing at the door is my uncle.", cn: "站在门口的那个男人是我叔叔。" },
        ],
      },
      {
        heading: "过去分词：被动",
        body: "表被动：Built in 1990, the bridge still stands. 完成式分词强调先后：Having finished the work, they left.（先做完，才离开）",
        examples: [{ en: "Having been warned twice, he finally listened.", cn: "被警告两次之后，他终于听进去了。" }],
      },
    ],
    questions: [
      { q: "___ the letter, she put it in the drawer.", options: ["Reads", "Reading", "Read yesterday ago", "To reads"], answer: 1, explain: "分词短语作状语，主动动作：Reading the letter。", difficulty: "简单" },
      { q: "___ in 2008, the stadium is still in use.", options: ["Built", "Building", "Builds", "To building"], answer: 0, explain: "体育馆是被建的，用过去分词 Built 表被动。", difficulty: "简单" },
      { q: "___ his homework, he went out to play.", options: ["Having finished", "Finish", "Finishes yesterday", "To finishing"], answer: 0, explain: "先完成作业再出去玩，完成式分词 Having finished 表先后。", difficulty: "中等" },
      { q: "Which sentence is WRONG?", options: ["Looking out of the window, I saw a cat.", "Walking to school, the rain started.", "Feeling ill, she stayed at home.", "Written in French, the book is hard for me."], answer: 1, explain: "分词逻辑主语应与主句主语一致：Walking 的主语不能是 the rain，这叫垂悬分词。", difficulty: "困难" },
      { q: "'The results announced yesterday surprised us.' — announced 是？", options: ["主动的现在分词", "被动的过去分词作后置定语", "动词原形", "将来时"], answer: 1, explain: "结果是被公布的：announced 是过去分词短语后置修饰 results，等于 which were announced。", difficulty: "中等" },
    ],
  },
  {
    id: "g-c2-4",
    level: "C2",
    titleCn: "缓和语气（Hedging）",
    titleEn: "Hedging in academic English",
    intro: "学术写作不把话说满：tend to、arguably、it appears that… 留有余地的表达反而更专业。",
    rules: [
      {
        heading: "为什么要缓和",
        body: "学术结论基于证据而非绝对真理。缓和语气能避免以偏概全、给反例留空间，是 C2 写作和雅思大作文高分的关键习惯。",
        examples: [
          { en: "Children tend to learn languages faster than adults.", cn: "儿童学语言往往比成人快。（tend to 留余地）" },
          { en: "It appears that prices are stabilising.", cn: "价格似乎正在趋稳。" },
        ],
      },
      {
        heading: "常用缓和手段",
        body: "情态动词 may / might / could；副词 arguably、relatively、to some extent；动词 seem、appear、suggest；限定范围 in many cases、for most learners。",
        examples: [{ en: "The data suggest a link, but do not prove causation.", cn: "数据提示存在关联，但不证明因果。" }],
      },
    ],
    questions: [
      { q: "Which sentence is properly hedged?", options: ["Technology always destroys jobs.", "Technology may create as many jobs as it destroys.", "Technology destroys jobs, period.", "All technology is bad for jobs."], answer: 1, explain: "may 表明这是可能性而非断言，是标准缓和写法；其余都把话说满了。", difficulty: "简单" },
      { q: "'___ speaking, the plan worked.'（总的来说）", options: ["Broadly", "Broad", "Broadcast", "Broaden"], answer: 0, explain: "Broadly speaking 是固定缓和表达「大体上说」。", difficulty: "简单" },
      { q: "Which verb best hedges a research claim?", options: ["prove absolutely", "suggest", "guarantee", "shout"], answer: 1, explain: "suggest 表示证据提示某种结论，语气恰当；prove/guarantee 在多数学术语境中过强。", difficulty: "中等" },
      { q: "'To some extent' means ___.", options: ["在某种程度上", "在所有方面", "完全不", "马上"], answer: 0, explain: "to some extent = 在某种程度上，经典缓和短语。", difficulty: "中等" },
      { q: "Which sentence OVERSTATES its claim?", options: ["Smoking can cause cancer.", "Smoking is linked to cancer in numerous studies.", "Smoking will definitely give every smoker cancer.", "Smokers face a higher risk of cancer."], answer: 2, explain: "definitely + every 把概率性结论说成了必然全称断言；其余都用了 can、be linked to、higher risk 等缓和手段。", difficulty: "困难" },
    ],
  },
);

TOPIC_SETS.push(
  {
    id: "t-food",
    kind: "vocab-topic",
    titleCn: "食物与烹饪",
    titleEn: "Food & Cooking",
    blurb: "食材、口味与做饭动作——最接地气的主题。",
    words: [
      w("ingredient", "/ɪnˈɡriːdiənt/", "n.", "食材；成分", "Flour is the main ingredient in bread.", "面粉是面包的主要食材。"),
      w("recipe", "/ˈresəpi/", "n.", "食谱", "Follow the recipe step by step.", "按照食谱一步步来。"),
      w("flavour", "/ˈfleɪvə(r)/", "n.", "味道；风味", "This soup has a rich flavour.", "这汤味道浓郁。"),
      w("spicy", "/ˈspaɪsi/", "adj.", "辣的", "Sichuan food is famous for being spicy.", "川菜以辣闻名。"),
      w("fresh", "/freʃ/", "adj.", "新鲜的", "Fresh vegetables are healthier.", "新鲜蔬菜更健康。"),
      w("boil", "/bɔɪl/", "v.", "煮沸", "Boil the water before adding noodles.", "下面条前先把水烧开。"),
      w("snack", "/snæk/", "n.", "零食；小吃", "Fruit is a healthy snack.", "水果是健康的零食。"),
      w("delicious", "/dɪˈlɪʃəs/", "adj.", "美味的", "The dumplings are delicious.", "饺子很好吃。"),
      w("appetite", "/ˈæpɪtaɪt/", "n.", "胃口；食欲", "The walk gave me an appetite.", "散步让我有了胃口。"),
      w("vegetarian", "/ˌvedʒəˈteəriən/", "n./adj.", "素食者；素食的", "She is a vegetarian.", "她是素食者。"),
    ],
  },
  {
    id: "t-shopping",
    kind: "vocab-topic",
    titleCn: "购物与金钱",
    titleEn: "Shopping & Money",
    blurb: "价格、折扣与消费习惯的常用词。",
    words: [
      w("discount", "/ˈdɪskaʊnt/", "n.", "折扣", "The shoes are on a 30% discount.", "这双鞋打七折。"),
      w("afford", "/əˈfɔːd/", "v.", "买得起；负担得起", "I can't afford a new car.", "我买不起新车。"),
      w("cost", "/kɒst/", "v./n.", "花费；成本", "The ticket costs 200 yuan.", "票价 200 元。"),
      w("customer", "/ˈkʌstəmə(r)/", "n.", "顾客", "The shop serves many customers daily.", "这家店每天接待很多顾客。"),
      w("brand", "/brænd/", "n.", "品牌", "This brand is popular with teenagers.", "这个品牌很受青少年欢迎。"),
      w("receipt", "/rɪˈsiːt/", "n.", "收据；小票", "Keep the receipt in case you return it.", "留好小票，以防退货。"),
      w("bargain", "/ˈbɑːɡɪn/", "n.", "划算的交易", "This jacket is a real bargain.", "这件夹克真的很划算。"),
      w("waste", "/weɪst/", "v./n.", "浪费", "Don't waste money on useless things.", "别把钱浪费在没用的东西上。"),
      w("cash", "/kæʃ/", "n.", "现金", "Can I pay in cash?", "我能用现金支付吗？"),
      w("quality", "/ˈkwɒləti/", "n.", "质量", "Quality matters more than price.", "质量比价格更重要。"),
    ],
  },
);

{
  const extras: Record<string, Word[]> = {
    "c-a1": [
      w("dog", "/dɒɡ/", "n.", "狗", "The dog is running.", "狗在跑。"),
      w("book", "/bʊk/", "n.", "书", "This book is interesting.", "这本书很有趣。"),
      w("water", "/ˈwɔːtə(r)/", "n.", "水", "Drink more water.", "多喝水。"),
      w("go", "/ɡəʊ/", "v.", "去", "We go to school by bus.", "我们坐公交去学校。"),
      w("small", "/smɔːl/", "adj.", "小的", "It is a small village.", "这是个小村庄。"),
    ],
    "c-a2": [
      w("ticket", "/ˈtɪkɪt/", "n.", "票", "I bought two tickets.", "我买了两张票。"),
      w("send", "/send/", "v.", "发送", "Please send me the photo.", "请把照片发给我。"),
      w("quiet", "/ˈkwaɪət/", "adj.", "安静的", "The library is quiet.", "图书馆很安静。"),
      w("present", "/ˈpreznt/", "n.", "礼物", "She gave me a birthday present.", "她给了我生日礼物。"),
    ],
    "c-b1": [
      w("goal", "/ɡəʊl/", "n.", "目标", "Set a clear goal.", "设定一个明确的目标。"),
      w("result", "/rɪˈzʌlt/", "n.", "结果", "The result surprised everyone.", "结果让所有人吃惊。"),
      w("support", "/səˈpɔːt/", "v./n.", "支持", "My parents support my decision.", "父母支持我的决定。"),
      w("manage", "/ˈmænɪdʒ/", "v.", "管理；设法做到", "She manages her time well.", "她很会管理时间。"),
      w("compare", "/kəmˈpeə(r)/", "v.", "比较", "Compare the two phones before buying.", "买之前比较一下两款手机。"),
    ],
    "c-b2": [
      w("tendency", "/ˈtendənsi/", "n.", "趋势；倾向", "There is a tendency to work from home.", "有居家办公的趋势。"),
      w("feature", "/ˈfiːtʃə(r)/", "n.", "特点；功能", "The phone's best feature is its camera.", "这款手机最大的亮点是相机。"),
      w("operate", "/ˈɒpəreɪt/", "v.", "运转；操作", "The machine operates automatically.", "这台机器自动运转。"),
      w("estimate", "/ˈestɪmət/", "n./v.", "估计", "Experts estimate the cost at one million.", "专家估计成本为一百万。"),
      w("visible", "/ˈvɪzəbl/", "adj.", "可见的", "The mountains are visible from here.", "从这里能看见山。"),
    ],
    "c-c1": [
      w("infrastructure", "/ˈɪnfrəstrʌktʃə(r)/", "n.", "基础设施", "The city invested in infrastructure.", "这座城市投资了基础设施。"),
      w("allocate", "/ˈæləkeɪt/", "v.", "分配", "The school allocates funds to libraries.", "学校把资金分配给图书馆。"),
      w("incentive", "/ɪnˈsentɪv/", "n.", "激励；刺激", "Bonuses are an incentive to work harder.", "奖金是努力工作的激励。"),
      w("paradox", "/ˈpærədɒks/", "n.", "悖论", "It is a paradox: more choice, less happiness.", "这是个悖论：选择越多越不快乐。"),
      w("discourse", "/ˈdɪskɔːs/", "n.", "话语；论述", "Public discourse shapes policy.", "公共话语影响政策。"),
    ],
    "c-c2": [
      w("nuance", "/ˈnjuːɑːns/", "n.", "细微差别", "A good translator catches every nuance.", "好的译者能抓住每个细微差别。"),
      w("candid", "/ˈkændɪd/", "adj.", "坦率的", "She gave a candid answer.", "她给了一个坦率的回答。"),
      w("tentative", "/ˈtentətɪv/", "adj.", "试探性的；暂定的", "We reached a tentative agreement.", "我们达成了一个暂定协议。"),
      w("vivid", "/ˈvɪvɪd/", "adj.", "生动的", "The author gives a vivid description.", "作者的描写很生动。"),
      w("plausible", "/ˈplɔːzəbl/", "adj.", "貌似合理的", "That is a plausible explanation.", "这个解释貌似合理。"),
    ],
  };
  for (const set of CEFR_SETS) {
    const extra = (extras[set.id] ?? []).filter((wd) => wd.word && !wd.word.includes("placeholder"));
    set.words.push(...extra);
  }
}

// ---------------- 汇总与辅助 ----------------

export const ALL_VOCAB_SETS: VocabSet[] = [...TOPIC_SETS, ...CEFR_SETS];

export const TOTAL_GRAMMAR_LESSONS = GRAMMAR_LESSONS.length;
export const TOTAL_VOCAB_SETS = ALL_VOCAB_SETS.length;
export const TOTAL_WORDS = ALL_VOCAB_SETS.reduce((n, s) => n + s.words.length, 0);
export const TOTAL_XP =
  TOTAL_GRAMMAR_LESSONS * GRAMMAR_XP + TOTAL_VOCAB_SETS * VOCAB_XP;

export interface TreeStage {
  name: string;
  emoji: string;
  threshold: number; // 达到该阶段所需 XP 占总 XP 的比例
}

export const TREE_STAGES: TreeStage[] = [
  { name: "种子", emoji: "🌰", threshold: 0 },
  { name: "发芽", emoji: "🌱", threshold: 0.03 },
  { name: "展叶", emoji: "🌿", threshold: 0.12 },
  { name: "开花", emoji: "🌸", threshold: 0.3 },
  { name: "结果", emoji: "🍎", threshold: 0.55 },
  { name: "成熟", emoji: "🌳", threshold: 0.8 },
];

export function stageForXp(xp: number, total: number = TOTAL_XP): { index: number; stage: TreeStage; next: TreeStage | null; xpToNext: number } {
  let index = 0;
  for (let i = 0; i < TREE_STAGES.length; i++) {
    const t = TREE_STAGES[i];
    if (t && xp >= Math.floor(total * t.threshold)) index = i;
  }
  const stage = TREE_STAGES[index] ?? TREE_STAGES[0]!;
  const next = TREE_STAGES[index + 1] ?? null;
  const xpToNext = next ? Math.max(0, Math.floor(total * next.threshold) - xp) : 0;
  return { index, stage, next, xpToNext };
}

export const ALL_WORDS: (Word & { setId: string; setTitle: string })[] = ALL_VOCAB_SETS.flatMap((s) =>
  s.words.map((wd) => ({ ...wd, setId: s.id, setTitle: s.titleCn })),
);

export function grammarByLevel(level: CefrLevel): GrammarLesson[] {
  return GRAMMAR_LESSONS.filter((l) => l.level === level);
}

export function findGrammar(id: string): GrammarLesson | undefined {
  return GRAMMAR_LESSONS.find((l) => l.id === id);
}

export function findVocabSet(id: string): VocabSet | undefined {
  return ALL_VOCAB_SETS.find((s) => s.id === id);
}
