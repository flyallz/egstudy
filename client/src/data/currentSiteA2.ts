import type { GrammarLesson, QuizQuestion } from "./content";

// 原站 A2 第 1 课：2026-11-17 逐段核对理论，并完成简单档 20 道题。
// 题干与选项按原站保留英文；越南语讲解译成中文。中等、困难档尚待提取。
const common = "反身代词要与所指的人或物在人称和单复数上对应；主语自己实施或承受动作时，它说明动作回到主语身上。";

const easy = (q: string, options: string[], answer: number, explain: string): QuizQuestion => ({
  q, options, answer, explain, difficulty: "简单", keepChoice: true,
});

export const A2_REFLEXIVE_QUESTIONS: QuizQuestion[] = [
  easy("选择表示‘独自生活’的正确短语。", ["I live by me.", "I live by myself.", "I live by mine.", "I live by my own."], 1, `正确句意是“我独自生活”。说 by myself，也可以说 on my own。${common}`),
  easy("选择正确的句子。", ["The childs enjoyed themselves.", "The children did enjoyed themselves.", "The children enjoyed themselves.", "The children enjoyed themself."], 2, `正确句意是“孩子们玩得很开心”。主语是复数，要用 themselves。${common}`),
  easy("把‘你自己取些蛋糕吧’译成英语。", ["Help yourself to many cake.", "Help yourself soming cake.", "Help yourself to much cake.", "Help yourself to some cake."], 3, `Help oneself 是请人自取食物的固定说法。邀请时用 some；这里的 cake 不可数，不能用 many；肯定句中也不用 much cake。${common}`),
  easy("Help ___ to some cake.", ["your", "you", "yours", "yourself"], 3, `句意是“请自己取些蛋糕吧”。Help oneself 是请人自取食物的固定说法。${common}`),
  easy("把‘孩子们在聚会上玩得很开心’译成英语。", ["The childs enjoyed themselves at the party.", "The children enjoyed themselves at the party.", "The children enjoyed themself at the party.", "The children did enjoyed themselves at the party."], 1, `Enjoy oneself 表示玩得开心；主语是复数 children，要用 themselves。${common}`),
  easy("The little boy can dress ___.", ["his", "him", "himself", "he"], 2, "句意是‘小男孩能自己穿衣服’。himself 指回小男孩本人。"),
  easy("I taught ___ to play the guitar.", ["my", "mine", "myself", "me"], 2, `句意是“我自学了弹吉他”。I 的反身代词是 myself。${common}`),
  easy("She was cooking alone and hurt ___.", ["her", "hers", "herself", "she"], 2, `句意是“她独自做饭时弄伤了自己”。受伤的人就是主语，要用 herself。${common}`),
  easy("把‘他自己修好了自行车’译成英语。", ["He by herself repaired the bicycle.", "He did repaired the bicycle by himself.", "He repaired the bicycle by himself.", "He is repaired the bicycle by himself."], 2, `by himself 强调没有别人帮忙。${common}`),
  easy("选择正确的句子。", ["He put the bag beside him.", "He is put the bag beside him.", "He put the bag beside his.", "He put the bag beside he."], 0, `句意是“他把包放在自己旁边”。表示位置的介词后用普通宾格代词。${common}`),
  easy("The dog saw ___ in the mirror.", ["themselves", "itself", "it", "its"], 1, "句意是‘狗在镜子里看见了自己’。看到的是它自己的影像，因此用 itself。"),
  easy("把‘她做晚饭时弄伤了自己’译成英语。", ["She hurt her while cooking dinner.", "She hurting herself while cooking dinner.", "She is hurt herself while cooking dinner.", "She hurt herself while cooking dinner."], 3, `受伤的是她本人，必须用 herself。hurt 的过去式仍是 hurt，不是 hurts。${common}`),
  easy("Nam and Lan helped ___ with the homework.", ["himself", "ourselves", "each other", "themselves"], 2, "句意是‘Nam 和 Lan 互相帮助做作业’。each other 表示双方相互作用，不是各自作用于自己。"),
  easy("选择正确的句子。", ["She cut herself, so I gave herself a bandage.", "She cut her, so I gave herself a bandage.", "She cut herself, so I gave her a bandage.", "She cut her, so I gave her a bandage."], 2, `前半句她弄伤了自己，用 herself；后半句主语是 I，得到绷带的是她，用 her。${common}`),
  easy("Please make ___ at home, everyone.", ["themselves", "ourselves", "yourself", "yourselves"], 3, `句意是“大家请随意，就像在自己家一样”。对多人说话用 yourselves。${common}`),
  easy("I made this card by ___.", ["mine", "my", "myself", "me"], 2, "句意是‘这张卡片是我自己做的’。by myself 表示没有别人帮忙。"),
  easy("把‘正是女主任亲自签署了那封信’译成英语。", ["The director herself did signed the letter.", "The director herself signed the letter.", "The director her signed the letter.", "The director is herself signed the letter."], 1, `这里的 herself 用于强调是她本人，并非宾语。${common}`),
  easy("Please look after ___ on the trip, Anna.", ["you", "yourself", "your", "yourselves"], 1, "句意是‘Anna，旅行时请照顾好自己’。Anna 是一人，所以用 yourself。"),
  easy("Mai 在车站见到了朋友 Hoa，并向她挥手。选择正确的句子。", ["Mai saw her at the station and waved.", "Mai saw himself at the station and waved.", "Mai saw hers at the station and waved.", "Mai saw she at the station and waved."], 0, `这里被看到的是另一位女性，因此用普通宾格 her。${common}`),
  easy("把‘她做晚饭时弄伤了另一位女性’译成英语。", ["She is hurt her while cooking dinner.", "She her hurt while cooking dinner.", "She hurt her while cooking dinner.", "She hurting her while cooking dinner."], 2, `her 指另一位女性，与 herself 所表示的“她本人”意思不同。${common}`),
];

export const A2_REFLEXIVE: Partial<GrammarLesson> = {
  titleCn: "反身代词",
  titleEn: "Reflexive pronouns",
  intro: "主语与受动作影响的人相同时使用反身代词；也用于强调和表示独自完成。",
  rules: [],
  openingExample: { en: "She hurt herself while cooking.", cn: "她做饭时弄伤了自己。" },
  theory: [
    { heading: "1 · 重点", body: "当动作的执行者和承受者是同一个人时，使用反身代词。若改用普通宾格，句子会变成另一个人受影响。反身代词也可用于强调，以及在 by oneself 中表示独自做某事。" },
    { heading: "2 · 公式", body: "S + V + myself / yourself / himself / herself / itself / ourselves / yourselves / themselves" },
    { heading: "3 · 主要内容", body: "主语和宾语是同一个人 / 强调就是本人 / 表示独自完成" },
    { heading: "4 · 功能与例句", body: "结合语境辨认反身、强调和独自完成三种用法。", examples: [
      { en: "I cut myself.", cn: "我割伤了自己。", note: "动作回到执行动作的人身上。" },
      { en: "The director herself signed the letter.", cn: "主任本人签署了这封信。", note: "反身代词放在主语后或句末，用于强调。" },
      { en: "He fixed the bike by himself.", cn: "他独自修好了自行车。", note: "by + 反身代词表示没有别人帮忙。" },
      { en: "Help yourself to some cake.", cn: "请自己取些蛋糕吧。", note: "enjoy、hurt、introduce、help、behave、teach 等动词常与反身代词搭配。" },
    ] },
    { heading: "5 · 牢记", body: "主语和宾语指同一个人时，使用 myself、yourself、himself 等反身代词。" },
    { heading: "6 · 句式", body: "核心结构仍为 S + V + 反身代词。注意单复数和强调位置。", table: [
      { left: "单数：myself / yourself / himself / herself / itself", right: "He blamed himself.（他责怪自己。）" },
      { left: "复数：ourselves / yourselves / themselves", right: "They enjoyed themselves.（他们玩得很开心。）" },
      { left: "强调：放在主语后或句末", right: "I spoke to the manager myself.（我亲自与经理谈过。）" },
      { left: "独自：by + 反身代词", right: "She lives by herself.（她独自生活。）" },
    ] },
    { heading: "7 · 分析步骤", body: "先判断动作是否回到主语，再选单复数形式；地点介词后的代词另行判断。", table: [
      { left: "01 对照主语与宾语", right: "相同用反身代词，不同用普通宾格：She hurt herself ↔ She hurt her（另一位女性）。" },
      { left: "02 核对单复数", right: "单数以 -self 结尾，复数以 -selves 结尾：yourself ↔ yourselves。" },
      { left: "03 地点介词的例外", right: "表示位置的介词后仍用普通宾格：He put the bag beside him." },
    ] },
    { heading: "8 · 例句与讲解", body: "逐句对照意思、结构和语境。", examples: [
      { en: "She hurt herself while cooking dinner.", cn: "她做晚饭时弄伤了自己。", note: "受伤的是主语，所以用 herself。hurt 的过去式仍是 hurt。" },
      { en: "She hurt her while cooking dinner.", cn: "她做晚饭时弄伤了另一位女性。", note: "her 指另一人，句意与 herself 完全不同。" },
      { en: "The children enjoyed themselves at the party.", cn: "孩子们在聚会上玩得很开心。", note: "enjoy oneself 是固定搭配；children 是复数，选 themselves。" },
      { en: "The director herself signed the letter.", cn: "主任本人签署了这封信。", note: "herself 用于强调，并非充当宾语。" },
      { en: "He repaired the bicycle by himself.", cn: "他独自修好了自行车。", note: "by himself 强调没有人帮助。" },
      { en: "Help yourself to some cake.", cn: "请自己取些蛋糕吧。", note: "help oneself 是邀请别人自取食物的固定说法。" },
    ] },
    { heading: "9 · 对照与纠错", body: "区分反身、普通宾格和相互作用；做题前再自查人称、单复数与地点介词的例外。", table: [
      { left: "herself：自己受到动作影响", right: "She saw herself in the mirror." },
      { left: "her：另一位女性受到动作影响", right: "She saw her at the station." },
      { left: "each other：双方互相作用", right: "They helped each other." },
    ], errors: [
      { wrong: "She hurt her while cooking.", right: "She hurt herself while cooking.", note: "如果主语与宾语是同一人，就用反身代词。" },
      { wrong: "The children enjoyed themself.", right: "The children enjoyed themselves.", note: "复数主语用 -selves。" },
      { wrong: "I live by my own.", right: "I live by myself.", note: "也可说 on my own，但不能说 by my own。" },
    ] },
  ],
  keyPoints: ["宾语是否与主语相同？", "单数用 -self，复数用 -selves。", "地点介词后通常用普通宾格。", "each other 表示双方互相作用。"],
  questions: A2_REFLEXIVE_QUESTIONS,
  ownBankOnly: true,
  quizCounts: { "简单": 20 },
  pendingDifficulties: ["中等", "困难"],
};

const pastCommon = "明确的过去时间或已结束的事件顺序决定动词的过去式；若使用 did 或 didn't，后面的主要动词要用原形。";

// 原站 A2 第 2 课简单档：逐题核对 20/20，选项保持原站顺序，越南语解析译成中文。
export const A2_PAST_SIMPLE_QUESTIONS: QuizQuestion[] = [
  easy("把‘你昨天看了那部电影吗？’译成英语。", ["Did you seen the film yesterday?", "You Did see the film yesterday?", "Did you see the film yesterday?", "You see the film yesterday?"], 2, `Did 放在句首，主要动词 see 回到原形。${pastCommon}`),
  easy("选择 buy 的过去式。", ["buyed", "brought", "bought", "buys"], 2, `buy → bought；brought 是 bring 的过去式。${pastCommon}`),
  easy("My uncle ___ a new bicycle two days ago.", ["buy", "bought", "buying", "buyed"], 1, "句意是‘叔叔两天前买了一辆新自行车’。two days ago 指已过去的时间；buy 的过去式是 bought。"),
  easy("把‘她开门、开灯，然后坐下’译成英语。", ["She did opened the door, turned on the light and sat down.", "She opened the door, turned on the and light sat down.", "She is opened the door, turned on the light and sat down.", "She opened the door, turned on the light and sat down."], 3, `三个过去式动词依次叙述事件。${pastCommon}`),
  easy("选择正确的句子。", ["She didn't bought anything.", "She didn't buy anything.", "She didn'ting buy anything.", "She is didn't buy anything."], 1, `didn't 后始终用动词原形 buy。${pastCommon}`),
  easy("选择正确的句子。", ["I saw him yesterday.", "I saw he yesterday.", "I did saw him yesterday.", "I saw him every day now."], 0, `yesterday 是过去时间标记，用 saw；宾语用 him。${pastCommon}`),
  easy("把‘去年夏天我们去了会安’译成英语。", ["We did visited Hoi An last summer.", "We visit Hoi An last summer.", "We visited Hoi An last summer.", "We visited Hoi An summer last."], 2, `last summer 是过去时间，visit 用 visited。${pastCommon}`),
  easy("He ___ finish his homework last night.", ["wasn't", "doesn't", "didn't", "hadn't"], 2, `过去时中，普通动词 finish 的否定句用 didn't。${pastCommon}`),
  easy("Last Monday, Nina ___ a letter to her grandmother.", ["sending", "send", "sends", "sent"], 3, "last Monday 指过去；send 的不规则过去式是 sent。"),
  easy("把‘他昨晚没有完成家庭作业’译成英语。", ["He didn't finished his homework last night.", "He is didn't finish his homework last night.", "He didn't finish his homeworks last night.", "He didn't finish his homework last night."], 3, `didn't 已表示过去，finish 保持原形；homework 不可数，不能加 -s。${pastCommon}`),
  easy("把‘公交车在学校门前停了下来’译成英语。", ["The bus stopped in front of the school.", "The bus are stopped in front of the school.", "The bus did stopped in front of the school.", "The bus stoppeding in front of the school."], 0, `stop 是单音节、元音加辅音结尾，双写 p 后加 -ed。${pastCommon}`),
  easy("I ___ that book last month.", ["red", "reads", "read", "readed"], 2, `read 的过去式拼写仍是 read，只改变读音。${pastCommon}`),
  easy("把‘她去了市场，买了些鱼’译成英语。", ["She is went to the market and bought some fish.", "She went to the market and bought some fishes.", "She did went to the market and bought some fish.", "She went to the market and bought some fish."], 3, `go → went、buy → bought 都是不规则过去式；这里的 fish 不加 -es。${pastCommon}`),
  easy("选择 go 的过去式。", ["went", "going", "goed", "gone"], 0, `go 是不规则动词，过去式为 went。${pastCommon}`),
  easy("选择正确的句子。", ["You Did go to the party?", "Did you go to the party?", "Did you gone to the party?", "Did you went to the party?"], 1, `did 后的主要动词用原形 go。${pastCommon}`),
  easy("We ___ at the museum yesterday afternoon.", ["arriving", "arrive", "arrived", "arrives"], 2, "yesterday afternoon 是过去时间，arrive 变为 arrived。"),
  easy("选择正确的句子。", ["Did she buy a car?", "She did bought a car?", "Did she bought a car?", "Does she bought a car?"], 0, `Did 位于主语 she 前，主要动词 buy 用原形。${pastCommon}`),
  easy("They didn't ___ the door before leaving.", ["lock", "locked", "locks", "locking"], 0, "didn't 已标记过去时，后面的动词必须是原形 lock。"),
  easy("选择正确的过去式动作序列。", ["She did open the door, did turn on the light and did sat down.", "She open the door, turn on the light and sit down.", "She opened the door, turned on the light and sat down.", "She opened the door, turn on the light and sat down."], 2, `一连串过去事件中，每个主要动词都要用过去式。${pastCommon}`),
  easy("选择正确的句子。", ["I went to the shop but I didn't buy milk.", "I go to the shop but I didn't buy milk.", "I went to the shop but I didn't bought milk.", "I went to the shop but I don't buy milk."], 0, `肯定分句用过去式 went；否定分句用 didn't + 原形 buy。${pastCommon}`),
];

// 原站 A2 第 2 课理论与简单档 20 题已核对；中等、困难档仍待提取。
export const A2_PAST_SIMPLE: Partial<GrammarLesson> = {
  titleCn: "一般过去时",
  titleEn: "Past simple",
  intro: "讲述已经发生并结束的动作、过去的事件顺序和不再持续的习惯。",
  rules: [],
  openingExample: { en: "We visited Hoi An last summer.", cn: "去年夏天我们去了会安。" },
  theory: [
    { heading: "1 · 重点", body: "一般过去时表示已经发生并结束的事，常与 yesterday、last week、in 2020 等明确的过去时间连用。有规则动词加 -ed，不规则动词使用过去式，需要单独记忆。否定句和疑问句中的过去标记转移到助动词 did 上。" },
    { heading: "2 · 公式", body: "S + V2 / V-ed" },
    { heading: "3 · 主要内容", body: "过去已经结束的动作 / 按先后顺序叙述事件 / 已结束的过去习惯" },
    { heading: "4 · 功能与例句", body: "结合时间标记及语境判断过去的动作、习惯和状态。", examples: [
      { en: "I met him yesterday.", cn: "我昨天见到了他。", note: "已经结束的动作，常带明确的过去时间。" },
      { en: "She opened the door, turned on the light and sat down.", cn: "她开了门、打开灯，然后坐下。", note: "一系列过去式动词依次叙述事件。" },
      { en: "We played football every afternoon.", cn: "我们以前每天下午都踢足球。", note: "描述过去重复、如今不再持续的习惯。" },
      { en: "He lived in Hue for ten years.", cn: "他曾在顺化生活了十年。", note: "was、were 和状态动词也可描述过去状态。" },
    ] },
    { heading: "5 · 牢记", body: "说到某个已确定的过去时间里已经结束的动作，使用一般过去时。" },
    { heading: "6 · 句式", body: "肯定句中动词用过去式；否定句和疑问句使用 did，主要动词回到原形。", table: [
      { left: "规则变化：V + -ed；-e 后只加 -d；辅音 + y → -ied；必要时双写词尾辅音", right: "work → worked；live → lived；study → studied；stop → stopped" },
      { left: "不规则变化：词形另记", right: "go → went；see → saw；buy → bought；take → took；find → found" },
      { left: "否定：S + did not (didn't) + 动词原形", right: "She didn't come." },
      { left: "疑问：Did + S + 动词原形?", right: "Did you see it?" },
      { left: "常见不规则动词", right: "fall → fell；begin → began；go → went；see → saw。例：Emissions fell sharply. / Monitoring began long before the plant opened." },
    ] },
    { heading: "7 · 分析步骤", body: "先判断动词类型，再核对拼写；若有 did，主要动词必须用原形。", table: [
      { left: "01 判断规则或不规则", right: "规则动词加 -ed；不规则动词用专门的过去式：watch → watched，go → went，send → sent，hear → heard，read → read（拼写相同，读音不同）。" },
      { left: "02 核对 -ed 的拼写", right: "-e 结尾只加 -d；辅音 + y 改 -ied；单音节元音 + 辅音结尾通常双写辅音。plan → planned。" },
      { left: "03 否定和疑问使用 did", right: "did 已表示过去，主要动词恢复原形：Did you go?，不能说 Did you went?" },
    ] },
    { heading: "8 · 例句与讲解", body: "结合意思、结构和时间语境逐句分析。", examples: [
      { en: "We visited Hoi An last summer.", cn: "去年夏天我们去了会安。", note: "last summer 是已过去的时间，visit 要用过去式 visited。" },
      { en: "She went to the market and bought some fish.", cn: "她去了市场，买了一些鱼。", note: "go → went 与 buy → bought 都是不规则过去式，不能加 -ed。" },
      { en: "The bus stopped in front of the school.", cn: "公交车在学校门前停了下来。", note: "stop 是单音节元音 + 辅音结尾，双写 p 后加 -ed。" },
      { en: "He didn't finish his homework last night.", cn: "他昨晚没有做完作业。", note: "didn't 已表示过去，finish 用原形；homework 不可数，不加 -s。" },
      { en: "Did you see the film yesterday?", cn: "你昨天看了那部电影吗？", note: "Did 放在句首，主要动词 see 用原形。" },
      { en: "She opened the door, turned on the light and sat down.", cn: "她开了门，打开灯，然后坐下。", note: "三个过去式动词按时间顺序连成叙事。" },
    ] },
    { heading: "9 · 对照与纠错", body: "不规则动词的变化方式不止一种；做题前检查时间、动词类型、-ed 拼写和 did 后的动词形式。", table: [
      { left: "完全变化：go → went；see → saw；do → did", right: "I saw her yesterday." },
      { left: "-ought / -aught：buy → bought；teach → taught；think → thought", right: "He taught us last year." },
      { left: "拼写不变：cut → cut；put → put；read → read", right: "She put it there." },
    ], errors: [
      { wrong: "We visit Hoi An last summer.", right: "We visited Hoi An last summer.", note: "有过去时间标记，动词要用过去式。" },
      { wrong: "Did you went to the party?", right: "Did you go to the party?", note: "did 已表示过去，主要动词用原形。" },
      { wrong: "She didn't bought anything.", right: "She didn't buy anything.", note: "didn't 后的动词保持原形。" },
    ] },
  ],
  keyPoints: ["句中是否有过去时间标记？", "动词是规则变化还是不规则变化？", "-ed 的拼写是否正确？", "否定句和疑问句是否使用 did + 动词原形？"],
  questions: A2_PAST_SIMPLE_QUESTIONS,
  ownBankOnly: true,
  quizCounts: { "简单": 20 },
  pendingDifficulties: ["中等", "困难"],
};

const wasWereCommon = "过去时中，was 与单数主语搭配，were 与复数主语及 you 搭配；be 动词构成问句时直接提到主语前。";

// 原站 A2 第 3 课简单档：20 道题逐题核对，英文选项与次序保持本次原站测验所见。
export const A2_WAS_WERE_QUESTIONS: QuizQuestion[] = [
  easy("选择正确的句子。", ["There people was at the market.", "There many people at the market yesterday.", "There were many people at the market.", "There was many people at the market."], 2, `many people 是复数，there 后用 were。${wasWereCommon}`),
  easy("选择正确的句子。", ["Did they were arrive on time?", "Did they arrived on time?", "Were they arrive on time?", "Did they arrive on time?"], 3, `普通动词 arrive 的过去时问句用 did + 原形。${wasWereCommon}`),
  easy("把‘昨晚那部电影很有趣’译成英语。", ["The film it was really interesting.", "The film was really interesting.", "Film was really interesting.", "The film were really interesting."], 1, `the film 是单数，用 was。${wasWereCommon}`),
  easy("My cousins ___ at the beach last Saturday.", ["were", "did", "was", "are"], 0, "my cousins 是复数，last Saturday 指过去，因此用 were。"),
  easy("I ___ not afraid of dogs when I was little.", ["was", "were", "did", "am"], 0, "I 在过去时用 was；not 放在 was 后构成否定。"),
  easy("选择正确的句子。", ["Were you at home?", "You Were at home?", "Was you at home?", "Did you be at home?"], 0, `be 动词直接提前构成问句，不用 did。${wasWereCommon}`),
  easy("把‘你昨晚在家吗？’译成英语。", ["Were you at home last night?", "You Were at home last night?", "Was you at home last night?", "You at home last night?"], 0, `you 用 were；将 were 提到主语前，不用 did。${wasWereCommon}`),
  easy("把‘上周日商店都没有营业’译成英语。", ["The shops wasn’t open last Sunday.", "The shops they weren’t open last Sunday.", "The shops weren’t open last Sunday.", "The shops are weren’t open last Sunday."], 2, `shops 是复数，用 weren’t，且无需 didn't。${wasWereCommon}`),
  easy("选择正确的句子。", ["Were you watch the match?", "Did you watch the match?", "You Did watch the match?", "Did you watched the match?"], 1, `watch 是普通动词，过去时问句用 did + 原形。${wasWereCommon}`),
  easy("选择正确的句子。", ["I wasn't tired.", "I didn't be tired.", "I don't was tired.", "I weren't tired."], 0, `I 的过去时 be 动词是 was，否定形式为 wasn't。${wasWereCommon}`),
  easy("The film ___ really interesting when we watched it last night.", ["did", "had", "was", "were"], 2, `the film 是单数，过去时用 was。${wasWereCommon}`),
  easy("___ she call you yesterday?", ["Were", "Did", "Was", "Does"], 1, `call 是普通动词，过去时问句用 did。${wasWereCommon}`),
  easy("The children ___ in the garden yesterday afternoon.", ["was", "did", "were", "are"], 2, `children 是复数，过去时用 were。${wasWereCommon}`),
  easy("Were you late? — ___", ["Yes, I was.", "Yes, I did.", "Yes, I am.", "Yes, I were."], 0, `简短回答中的 be 动词要与回答主语 I 搭配，因此用 was。${wasWereCommon}`),
  easy("把‘你昨天看了比赛吗？’译成英语。", ["Did you watch the yesterday match?", "Did you watch the match yesterday?", "You watch the match yesterday?", "You Did watch the match yesterday?"], 1, `watch 是普通动词，过去时问句用 did + 原形。${wasWereCommon}`),
  easy("The library ___ closed yesterday morning.", ["are", "were", "was", "is"], 2, "the library 是单数，过去时用 was。"),
  easy("把‘昨晚有暴风雨，今早没有公交车’译成英语。", ["There was a storm last night and there were no buss this morning.", "There was a storm last night and there was no buses this morning.", "There was a storm last night and there were no buses this morning.", "There were a storm last night and there were no buses this morning."], 2, `a storm 是单数，用 was；no buses 是复数，用 were。${wasWereCommon}`),
  easy("___ your father at work yesterday?", ["Did", "Were", "Is", "Was"], 3, "your father 是单数；过去时 be 动词问句以 Was 开头。"),
  easy("把‘今天上午你在哪里？——我在诊所’译成英语。", ["Where were you this morning? — I were at the clinic.", "Where you were this morning? — I was at the clinic.", "Where were you this morning? — I was at the clinic.", "Where was you this morning? — I was at the clinic."], 2, `疑问词 where 放在 were 前；回答中 I 用 was。${wasWereCommon}`),
  easy("选择正确的句子。", ["Did you tired? Were you sleep well?", "Were you tired? Did you sleep well?", "Were you tired? Were you sleep well?", "Did you be tired? Did you slept well?"], 1, `第一问含 be 动词，提前 were；第二问含普通动词，用 did + 原形。${wasWereCommon}`),
];

// 原站 A2 第 3 课理论与简单档 20 题已核对；中等、困难档尚待提取。
export const A2_WAS_WERE: Partial<GrammarLesson> = {
  titleCn: "was、were 与过去时疑问句",
  titleEn: "Was, were & past questions",
  intro: "区分过去时的 be 动词问句与普通动词的 did 问句。",
  rules: [],
  openingExample: { en: "Were you at home last night?", cn: "你昨晚在家吗？" },
  theory: [
    { heading: "1 · 重点", body: "过去时的 be 动词分成 was 和 were：I、he、she、it 用 was；you、we、they 用 were。be 动词自己通过提前或加 not 构成疑问和否定；普通动词则要借助 did。混淆这两套结构是 A2 阶段的常见错误。" },
    { heading: "2 · 公式", body: "Was / Were + S …? · Did + S + 动词原形 …?" },
    { heading: "3 · 主要内容", body: "描述过去的状态 / 说明过去的位置 / 询问已发生的事情" },
    { heading: "4 · 功能与例句", body: "先识别主要动词，再选择 be 动词结构或 did 结构。", examples: [
      { en: "The film was excellent.", cn: "那部电影非常精彩。", note: "was / were 在过去某时连接主语与形容词或名词。" },
      { en: "They were at the stadium.", cn: "他们当时在体育场。", note: "was / were 后可接地点。" },
      { en: "Was it cold? Did it rain?", cn: "当时冷吗？下雨了吗？", note: "be 动词提前构成问句；普通动词使用 did。" },
      { en: "There were many people at the market.", cn: "市场里当时有很多人。", note: "there was / there were 描述过去的存在。" },
    ] },
    { heading: "5 · 牢记", body: "单数主语一般用 was，复数主语用 were；普通动词构成过去时问句时用 did。" },
    { heading: "6 · 句式", body: "be 动词直接变化；普通动词的过去时问句借助 did。", table: [
      { left: "肯定：I / he / she / it + was；you / we / they + were", right: "She was tired." },
      { left: "否定：wasn't / weren't", right: "They weren't ready." },
      { left: "be 动词疑问：Was / Were + S …?", right: "Were you at home?" },
      { left: "普通动词疑问：Did + S + 动词原形 …?", right: "Did you watch the match?" },
    ] },
    { heading: "7 · 分析步骤", body: "判断主要动词、主语的单复数，再处理疑问词的位置。", table: [
      { left: "01 找主要动词", right: "be 动词自己提前；普通动词需要 did：Were you busy? ↔ Did you work?" },
      { left: "02 根据主语选 was / were", right: "I、he、she、it 和单数名词用 was；you 和复数主语用 were：The children were …" },
      { left: "03 有疑问词时放句首", right: "疑问词 + was / were 或 did + 主语：Where were you? / Where did you go?" },
    ] },
    { heading: "8 · 例句与讲解", body: "结合意思、结构和语境逐句比较。", examples: [
      { en: "Were you at home last night?", cn: "你昨晚在家吗？", note: "主要动词是 be，将 were 提到主语前，不用 did。" },
      { en: "The film was really interesting.", cn: "那部电影很有趣。", note: "the film 是单数，用 was。" },
      { en: "The shops weren't open on Sunday.", cn: "星期天商店没有营业。", note: "shops 是复数，用 weren't；无需 didn't。" },
      { en: "Did you watch the match yesterday?", cn: "你昨天看比赛了吗？", note: "watch 是普通动词，用 did 提问，watch 保持原形。" },
      { en: "Where were you this morning? — I was at the clinic.", cn: "你今天上午在哪里？——我在诊所。", note: "where 放在 were 前面，随后才是主语。" },
      { en: "There was a storm last night and there were no buses this morning.", cn: "昨晚有暴风雨，今天上午没有公交车。", note: "be 动词与后面的名词一致：a storm 单数用 was，no buses 复数用 were。" },
    ] },
    { heading: "9 · 对照与纠错", body: "过去时的 be 动词、普通动词和情态动词形成问句的方法不同；做题前核对主要动词和主语。", table: [
      { left: "be 动词：was / were 提前，不用 did", right: "Was she late?" },
      { left: "普通动词：did + 动词原形", right: "Did she arrive late?" },
      { left: "情态动词：把情态动词自身提前", right: "Could she come?" },
    ], errors: [
      { wrong: "Did you be at home last night?", right: "Were you at home last night?", note: "be 动词直接提前，不能用 did 构成问句。" },
      { wrong: "The children was in the garden.", right: "The children were in the garden.", note: "children 是复数，用 were。" },
      { wrong: "I didn't be tired.", right: "I wasn't tired.", note: "be 动词直接加 not 构成否定，不用 didn't。" },
    ] },
  ],
  keyPoints: ["主要动词是 be 还是普通动词？", "was / were 是否与主语一致？", "be 动词不与 did 连用。", "疑问词是否放在 was / were / did 前面？"],
  questions: A2_WAS_WERE_QUESTIONS,
  ownBankOnly: true,
  quizCounts: { "简单": 20 },
  pendingDifficulties: ["中等", "困难"],
};

// 原站 A2 第 4 课完整理论已核对。简单档显示 20 题；下列 18 题有原站测验记录，余下 2 题待核对。
// 前 17 题来自同一次测验并取得原站正确答案；最后一题来自重做测验，答案按题意判断，原站反馈待确认。
const movementHint = "要根据移动路径及起点、终点选介词，不能只看静止位置。";
export const A2_MOVEMENT_QUESTIONS: QuizQuestion[] = [
  easy("The train went ___ a long tunnel.", ["along", "through", "across", "over"], 1, `句意是“火车穿过一条长隧道”。隧道是封闭空间，要用 through。${movementHint}`),
  easy("把“我们在顺化上公交车，在岘港下车”译成英语。", ["We in Da Nang got on the bus in Hue and got off.", "We got on the bus in Hue and got off in Da Nang.", "We are got on the bus in Hue and got off in Da Nang.", "We did got on the bus in Hue and got off in Da Nang."], 1, `公交车、火车、飞机用 get on 和 get off；小汽车用 get into 和 get out of。${movementHint}`),
  easy("把“她跑上楼梯，然后又下来了”译成英语。", ["She running up the stairs and then came down again.", "She ran up the stairs and then came down again.", "She is ran up the stairs and then came down again.", "She did ran up the stairs and then came down again."], 1, `up 和 down 表示上下移动。${movementHint}`),
  easy("选择正确的句子。", ["He climbed into the car and left his phone on the seat.", "He climbed into the car and left his phone onto the seat.", "He climbed in the car and left his phone onto the seat.", "He climbed onto the car and left his phone in the seat."], 0, `句意是“他上车并把手机留在座位上”。into 表示进入，on 表示手机的静止位置。${movementHint}`),
  easy("The children ran ___ the playground to reach the other side.", ["across", "under", "along", "into"], 0, "句意是“孩子们跑过操场到另一边”。across 表示从一侧穿过一片区域到另一侧。"),
  easy("We walked ___ the river until we reached the bridge.", ["over", "through", "into", "along"], 3, "句意是“我们沿着河走，直到走到桥边”。along 表示顺着河流的长度方向移动。"),
  easy("把“她走进房间，把包放在桌上”译成英语。", ["She on the table walked into the room and put her bag.", "She walked into the room and put her bag on the table.", "She did walked into the room and put her bag on the table.", "She is walked into the room and put her bag on the table."], 1, `into 表示进入房间的方向，on 表示包放下后的静止位置。${movementHint}`),
  easy("She walked ___ the room and sat down.", ["into", "in", "at", "on"], 0, `句意是“她走进房间坐下”。表达从外面进入要用 into。${movementHint}`),
  easy("把“沿着这条街走，经过邮局”译成英语。", ["Walk along those street and go past the post office.", "Walk along this street and go past the post office.", "Walk along these street and go past the post office.", "Walk along this street and gone past the post office."], 1, `along 表示沿着街道走，past 表示从邮局旁经过而不停下。${movementHint}`),
  easy("We ___ the bus in Hue.", ["got in", "got on", "got at", "got into"], 1, `句意是“我们在顺化上了公交车”。公交车、火车和飞机用 get on。${movementHint}`),
  easy("选择正确的句子。", ["She walked in the room and sat down.", "She is walked into the room and sat down.", "She walked into the room and sat down.", "She did walked into the room and sat down."], 2, `句意是“她走进房间并坐下”。in 表示已经在室内，into 表示进入室内。${movementHint}`),
  easy("From the bus stop, walk ___ the post office without going in, then turn left.", ["onto", "past", "out of", "into"], 1, "句意是“从公交站出发，经过邮局而不进去，然后左转”。past 表示经过；into 是进入，out of 是从里面出来，都不符合语境。"),
  easy("She ran ___ the stairs to the third floor.", ["on", "across", "into", "up"], 3, `句意是“她跑上楼梯到三楼”。up 表示向上移动。${movementHint}`),
  easy("把“火车穿过一条长隧道”译成英语。", ["The train went through a long tunnel.", "The train did went through a long tunnel.", "The train is went through a long tunnel.", "The train went through an long tunnel."], 0, `through 表示进入空间内部，再从另一端穿出。${movementHint}`),
  easy("The cat jumped ___ the wall and landed in the next garden.", ["across", "along", "through", "over"], 3, "句意是“猫越过墙，落在旁边的花园里”。over 表示从墙上方越过；along 是沿着墙走，through 是穿墙而过，across 常用于一片表面或区域。"),
  easy("The rabbit ran ___ its hole when it saw a fox.", ["over", "along", "into", "on"], 2, "句意是“兔子看见狐狸时跑进洞里”。into 表示从外面进入内部。"),
  easy("把“我们走过桥，到达对岸”译成英语。", ["We walked across the bridge to the other bank.", "We to the other bank walked across the bridge.", "We did walked across the bridge to the other bank.", "We are walked across the bridge to the other bank."], 0, `across 表示从桥的一侧走到另一侧。${movementHint}`),
  easy("The bird flew ___ the tall, solid fence without touching it.", ["through", "under", "over", "into"], 2, "句意是“鸟从高而结实的围栏上方飞过，没有碰到它”。over 表示越过障碍物的上方。"),
];

export const A2_MOVEMENT_PREPOSITIONS: Partial<GrammarLesson> = {
  titleCn: "表示移动的介词",
  titleEn: "Prepositions of movement",
  intro: "区分静态位置与移动方向，再按空间路径选择介词。",
  rules: [],
  openingExample: { en: "She walked into the room and put her bag on the table.", cn: "她走进房间，把包放在桌上。" },
  theory: [
    { heading: "1 · 重点", body: "英语区分静止位置和移动方向：in 表示已经在里面，into 表示从外面走进去。如果混用，句子会失去方向含义；中文的‘在里面／到里面’有时同用‘里’，因此尤其要看动作是否带方向。" },
    { heading: "2 · 公式", body: "移动动词 + into / out of / across / through / along / up / down" },
    { heading: "3 · 主要内容", body: "进入与离开 / 穿过一片空间 / 沿着路线移动" },
    { heading: "4 · 功能与例句", body: "按运动路径选择表示进入、穿越、沿线或上下移动的介词。", examples: [
      { en: "He came into the office. He went out of the building.", cn: "他走进办公室。他走出大楼。", note: "into 表示向里，out of 表示向外。" },
      { en: "We walked across the bridge. We drove through the tunnel.", cn: "我们走过桥。我们开车穿过隧道。", note: "across 跨过表面，through 从空间内部穿过。" },
      { en: "Walk along this street and go past the bank.", cn: "沿着这条街走，经过银行。", note: "along 是沿着，past 是从旁经过而不停。" },
      { en: "She ran up the stairs. I flew from Hue to Hanoi.", cn: "她跑上楼梯。我从顺化飞往河内。", note: "up / down 表示上下；from 指起点，to 指目的地。" },
    ] },
    { heading: "5 · 牢记", body: "into、out of、across、through、along、onto 表示移动方向；in、on 表示静止位置。" },
    { heading: "6 · 句式", body: "除了位置与方向，还要区分路径、上下方向及起点终点。", table: [
      { left: "进入与离开：into / out of / onto / off", right: "jump into the pool；get off the bus" },
      { left: "穿越：across / through / over / past", right: "swim across the river；climb over the wall" },
      { left: "沿途与上下：along / up / down / around", right: "cycle along the river；walk down the hill" },
      { left: "目的地与起点：to / from / towards / as far as", right: "walk towards the station" },
    ] },
    { heading: "7 · 分析步骤", body: "先判断是否移动，再想象运动经过的空间，最后检查交通工具固定搭配。", table: [
      { left: "01 区分静止与移动", right: "静态位置用 in / on / at；有方向的动作用 into / onto / to：She is in the room. ↔ She walked into the room." },
      { left: "02 根据空间形状选介词", right: "across 经过表面，through 穿过内部，over 越过上方：across the field / through the forest / over the fence。" },
      { left: "03 记交通工具搭配", right: "公交车、火车、飞机用 get on / get off；小汽车、出租车用 get into / get out of。" },
    ] },
    { heading: "8 · 例句与讲解", body: "看同一句中何处表示方向、何处表示最终位置。", examples: [
      { en: "She walked into the room and put her bag on the table.", cn: "她走进房间，把包放在桌上。", note: "into 是走进去的方向；on 是包放下后的静态位置。" },
      { en: "We walked across the bridge to the other bank.", cn: "我们走过桥，到达对岸。", note: "across 表示从表面的一边走到另一边。" },
      { en: "The train went through a long tunnel.", cn: "火车穿过了一条长隧道。", note: "through 表示进入空间内部，再从另一端出来。" },
      { en: "Walk along this street and go past the post office.", cn: "沿着这条街走，经过邮局。", note: "along 是沿线移动，past 是从旁经过不停下。" },
      { en: "She ran up the stairs and then came down again.", cn: "她跑上楼梯，又下来了。", note: "up 和 down 指上下方向。" },
      { en: "We got on the bus in Hue and got off in Da Nang.", cn: "我们在顺化上车，在岘港下车。", note: "公交车、火车、飞机用 get on / get off；小汽车用 get into / get out of。" },
    ] },
    { heading: "9 · 对照与纠错", body: "静止介词与方向介词成对比较；做题前核对空间路径和交通工具搭配。", table: [
      { left: "in ↔ into：在里面 ↔ 进入里面", right: "He is in the car. ↔ He got into the car." },
      { left: "on ↔ onto：在上面 ↔ 移动到上面", right: "The cat is on the roof. ↔ The cat jumped onto the roof." },
      { left: "at ↔ to：在某地 ↔ 前往某地", right: "She is at school. ↔ She goes to school." },
    ], errors: [
      { wrong: "She walked in the room and sat down.", right: "She walked into the room and sat down.", note: "若表达从外面走进去，用 into；in 表示已经位于室内。" },
      { wrong: "We drove across the tunnel.", right: "We drove through the tunnel.", note: "隧道是内部可穿越的空间，用 through。" },
      { wrong: "I got on the taxi at the airport.", right: "I got into the taxi at the airport.", note: "出租车用 get into；公交车和火车用 get on。" },
    ] },
  ],
  keyPoints: ["句子描述静止位置还是有方向的移动？", "介词是否对应实际空间路径？", "交通工具固定搭配是否正确？", "移动动词不能误用静态位置介词。"],
  questions: A2_MOVEMENT_QUESTIONS,
  ownBankOnly: true,
  quizCounts: { "简单": 20 },
  pendingDifficulties: ["简单", "中等", "困难"],
};
