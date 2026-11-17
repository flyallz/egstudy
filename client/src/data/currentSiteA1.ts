import type { TheorySection } from "./content";

// 与 2026-11-16 原站当前 A1 理论页核对的中文内容。
type CurrentTheory = {
  openingExample: { en: string; cn: string };
  theory: TheorySection[];
  keyPoints: string[];
};

export const CURRENT_SITE_A1_THEORY: Record<"g-a1-5" | "g-a1-8" | "g-a1-9" | "g-a1-10" | "g-a1-12" | "g-a1-13" | "g-a1-14" | "g-a1-15" | "g-a1-16" | "g-a1-17" | "g-a1-18" | "g-a1-19", CurrentTheory> = {
  "g-a1-5": {
    openingExample: { en: "This bag is mine.", cn: "这个包是我的。" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "英语有三种表达所属关系的方式：物主形容词（my、your、his 等）总放在名词前；物主代词（mine、yours、his 等）代替整个‘物主形容词＋名词’词组，单独使用；所有格 ’s 用于所有者是人名或指人的名词时。核心形式：my book、mine、Lan's book。",
      },
      {
        heading: "2 · 功能与例句",
        body: "用所属形式说明物品属于谁，避免重复名词，或表示人、组织和物的所属关系。",
        examples: [
          { en: "my book / her idea", cn: "我的书／她的想法", note: "说明物品属于谁：物主形容词紧靠名词，不能同时使用冠词。" },
          { en: "Whose pen is this? — It's mine.", cn: "这是谁的笔？——是我的。", note: "避免重复：物主代词代替整个名词词组，常出现在 to be 后面。" },
          { en: "Lan's bike / the students' project", cn: "Lan 的自行车／学生们的项目", note: "人和组织的所属关系：指人的名词加 ’s；以 -s 结尾的复数名词只加撇号。" },
          { en: "the roof of the house", cn: "房子的屋顶", note: "物的所属关系：无生命物通常用 of 结构，而不用 ’s。" },
        ],
      },
      {
        heading: "3 · 句式",
        body: "物主形容词放在名词前；物主代词单独使用；’s 的撇号位置取决于表示所有者的名词是单数还是以 -s 结尾的复数。",
        table: [
          { left: "物主形容词：my、your、his、her、its、our、their + 名词", right: "their classroom（他们的教室）" },
          { left: "物主代词：mine、yours、his、hers、ours、theirs，单独使用", right: "That seat is ours.（那个座位是我们的。）" },
          { left: "所有格：单数名词 + ’s；以 -s 结尾的复数名词 + ’", right: "the teacher's desk / the girls' room" },
        ],
      },
      {
        heading: "4 · 分析步骤",
        body: "",
        examples: [
          { en: "my bag ↔ This bag is mine.", cn: "我的包 ↔ 这个包是我的。", note: "01 看所属形式后面还有没有名词：有名词用物主形容词，没有名词用物主代词。" },
          { en: "my book, not the my book", cn: "用 my book，不用 the my book。", note: "02 物主形容词已经限定名词，不能再加冠词。" },
          { en: "my brother's room / my brothers' room", cn: "我哥哥的房间／我哥哥们的房间", note: "03 单数名词加 ’s；已有 -s 的复数名词只在末尾加撇号。" },
        ],
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句对照意思、结构和语境。",
        examples: [
          { en: "This bag is mine, and that one is hers.", cn: "这个包是我的，那个是她的。", note: "mine 和 hers 单独使用，代替 my bag 和 her bag。" },
          { en: "Our team finished its report yesterday.", cn: "我们团队昨天完成了报告。", note: "our 和 its 都放在名词前；its 是物主形容词，不同于 it's（= it is）。" },
          { en: "This is Nam's bicycle.", cn: "这是 Nam 的自行车。", note: "所有者是一个人，名字后直接加 ’s。" },
          { en: "The students' projects are on display.", cn: "学生们的项目正在展出。", note: "students 已有 -s，只加撇号，不写成 students's。" },
          { en: "The title of the book is very long.", cn: "这本书的标题很长。", note: "无生命物用 of 结构通常比 the book's title 更自然。" },
          { en: "Whose keys are these? — They're ours.", cn: "这些是谁的钥匙？——是我们的。", note: "whose 询问所有者，简短回答用物主代词。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "同一个人的 her 可以是物主形容词，也可以是宾格；hers 则是独立使用的物主代词。",
        table: [
          { left: "her + 名词：物主形容词", right: "her notebook" },
          { left: "hers：单独使用的物主代词", right: "The notebook is hers." },
          { left: "her：宾格，不表示所属", right: "I called her." },
        ],
        errors: [
          { wrong: "This is mine bag.", right: "This is my bag.", note: "名词前用物主形容词 my；mine 单独使用。" },
          { wrong: "The dog wagged it's tail.", right: "The dog wagged its tail.", note: "its 是物主形容词；it's 是 it is 的缩写。" },
          { wrong: "That pen is her.", right: "That pen is hers.", note: "to be 后面没有名词时，用物主代词 hers。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "所属形式后面是否还有名词；物主形容词前没有冠词；撇号的位置与所有者的单复数一致；its 和 it's 没有混淆。",
      },
    ],
    keyPoints: ["有名词用物主形容词，没名词用物主代词", "物主形容词前不用冠词", "按单复数放置所有格撇号", "区分 its 和 it's"],
  },
  "g-a1-8": {
    openingExample: { en: "Do you have any questions?", cn: "你有什么问题吗？" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "数量词表示相对数量。选词要同时看名词是否可数，以及句子是肯定、否定还是疑问。可数名词复数用 many；不可数名词用 much。",
      },
      {
        heading: "2 · 功能与例句",
        body: "some 常用于肯定句；any 常用于否定句和一般疑问句；many 与可数名词连用，much 与不可数名词连用。提出邀请或请求时，疑问句也可以用 some。no + 名词表示一个也没有，动词仍用肯定形式；every + 单数名词表示逐个包含所有对象。",
        examples: [
          { en: "There are some chairs. I need some help.", cn: "有几把椅子。我需要一点帮助。", note: "肯定句中的未定数量：some 可接可数名词复数，也可接不可数名词。" },
          { en: "I do not have any money. Are there any seats?", cn: "我没有钱。还有座位吗？", note: "否定句和疑问句通常用 any 代替 some。" },
          { en: "How many books? How much water?", cn: "多少本书？多少水？", note: "many 接可数名词复数，much 接不可数名词。" },
          { en: "Would you like some tea?", cn: "你想喝点茶吗？", note: "提议或邀请时，疑问句仍可使用 some。" },
          { en: "The trial found no significant difference. Every participant signed a consent form.", cn: "试验没有发现显著差异。每位参与者都签署了知情同意书。", note: "no + 名词可替代 not any；every 后接单数名词。" },
        ],
      },
      {
        heading: "3 · 常见句式",
        body: "肯定：some + 复数或不可数名词（We bought some fruit.）；否定：not … any、not much、not many（There isn't any sugar left.）；疑问：any、how much、how many（How many brothers do you have?）；邀请：Would you like some …?（Would you like some water?）；no / every / a·an：no + 名词且动词保持肯定，every + 单数名词，a/an + 可数单数名词（There is no evidence. Every answer counts. an explanation）。",
      },
      {
        heading: "4 · 分析步骤",
        body: "01 先判断名词类型：可数复数配 many、a few；不可数配 much、a little（many students / much time）。02 再判断句型：肯定句通常用 some，否定和疑问句通常用 any（some milk → any milk）。03 检查邀请和请求：这类疑问句仍可用 some（Can I have some water?）。",
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句对照意思、结构和语境。",
        examples: [
          { en: "Do you have any questions about the homework?", cn: "你对作业有什么问题吗？", note: "疑问句用 any；questions 用复数，因为 any 接可数名词复数。" },
          { en: "There are some new books in the library.", cn: "图书馆里有几本新书。", note: "肯定句中的 some 表示无须明确数量的若干。" },
          { en: "We do not have any time left.", cn: "我们没有剩余时间了。", note: "否定句用 any；time 不可数，保持单数形式。" },
          { en: "How many students are there in your class?", cn: "你们班有多少名学生？", note: "how many 接可数名词复数，谓语也用复数形式。" },
          { en: "How much sugar do you take in your coffee?", cn: "你的咖啡里加多少糖？", note: "sugar 不可数，因此用 how much。" },
          { en: "Would you like some tea before you leave?", cn: "离开前想喝点茶吗？", note: "虽是疑问句，却是在邀请，所以用 some 而非 any。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "按名词类型选择数量词，再检查句子类型。",
        table: [
          { left: "many / a few / few：可数名词复数", right: "many chairs" },
          { left: "much / a little / little：不可数名词", right: "much water" },
          { left: "a lot of / lots of / plenty of：两类名词都可用", right: "a lot of friends / a lot of rice" },
        ],
        errors: [
          { wrong: "Do you have some question?", right: "Do you have any questions?", note: "一般疑问句用 any；可数名词 question 要用复数。" },
          { wrong: "How much books do you read?", right: "How many books do you read?", note: "books 可数，所以用 how many。" },
          { wrong: "I don't have some money.", right: "I don't have any money.", note: "否定句用 any，不用 some。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "检查名词是可数还是不可数；句子是肯定、否定还是疑问；some/any 是否与句型相符；many/any 后的可数名词是否用复数；未确定的可数单数名词是否有 a/an，例如 offer an explanation。",
      },
    ],
    keyPoints: ["先判断名词是否可数", "再判断肯定、否定或疑问句型", "一般疑问和否定用 any，邀请可用 some", "many 后用可数名词复数", "未确定的可数单数名词仍需 a/an"],
  },
  "g-a1-9": {
    openingExample: { en: "She speaks English clearly.", cn: "她说英语很清楚。" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "形容词说明名词‘怎么样’，方式副词说明动作‘怎样进行’。大多数方式副词由形容词加 -ly 构成，但少数不规则形式需要单独记忆。核心结构：形容词 + 名词；动词 + 副词。",
      },
      {
        heading: "2 · 功能与例句",
        body: "形容词修饰名词，也放在 be、seem、look、feel 等连系动词后面；方式副词通常放在动词或宾语后面；very、quite、too 等程度副词放在形容词或其他副词前面。连系动词后用形容词，因为这里描述的是主语的状态。",
        examples: [
          { en: "a careful driver / The soup smells good.", cn: "一位谨慎的司机／汤闻起来很香。", note: "形容词描述名词或连系动词后的主语。" },
          { en: "He drives carefully.", cn: "他开车很小心。", note: "方式副词描述动作怎样进行。" },
          { en: "very slowly / too expensive", cn: "非常慢／太贵", note: "程度副词放在形容词或其他副词前。" },
          { en: "She looks happy.", cn: "她看起来很开心。", note: "look 是连系动词，此处用 happy，不能用 happily。" },
        ],
      },
      {
        heading: "3 · 常见形式",
        body: "通常加 -ly：quick → quickly，careful → carefully；辅音字母 + y 要变 -ily：easy → easily，happy → happily。不规则形式：good → well；fast、hard、late 作方式副词时形式不变（She sings well.）。形容词在名词前，方式副词在动词或宾语后（a slow train / He walks slowly.）。",
      },
      {
        heading: "4 · 分析步骤",
        body: "01 确定被修饰的词：修饰名词用形容词，修饰动词用副词（a careful driver ↔ drive carefully）。02 检查连系动词：be、seem、look、feel、taste、smell、sound 后用形容词（The music sounds beautiful.）。03 按拼写规则造副词：加 -ly，或把 -y 改成 -ily；记住 good → well 等不规则形式（easy → easily）。",
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句对照意思、结构和语境。",
        examples: [
          { en: "She speaks English clearly.", cn: "她说英语很清楚。", note: "clearly 描述说话的方式，修饰动词 speaks。" },
          { en: "He is a careful driver.", cn: "他是一位小心的司机。", note: "careful 放在名词 driver 前，所以用形容词。" },
          { en: "The children look happy today.", cn: "孩子们今天看起来很开心。", note: "look 是连系动词，说明主语状态，因此用形容词 happy。" },
          { en: "Minh plays the guitar well, and he learns fast.", cn: "Minh 吉他弹得好，也学得快。", note: "good 的副词是 well；fast 作形容词和副词形式相同。" },
          { en: "The test was quite difficult, so we worked very carefully.", cn: "考试相当难，所以我们做得非常仔细。", note: "quite 修饰形容词 difficult；very 修饰副词 carefully。" },
          { en: "Please read the instructions carefully.", cn: "请仔细阅读说明。", note: "动词有宾语时，方式副词放在宾语后。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "注意外形相近但意义不同的副词。",
        table: [
          { left: "good / well：形容词／副词", right: "a good singer — She sings well." },
          { left: "hard / hardly：努力地／几乎不", right: "He works hard. — He hardly works." },
          { left: "late / lately：晚／最近", right: "She arrived late. — I haven't seen him lately." },
          { left: "fast / fast：没有 -ly 形式", right: "a fast car — He runs fast." },
        ],
        errors: [
          { wrong: "She speaks English clear.", right: "She speaks English clearly.", note: "修饰动词 speaks 的词必须是副词。" },
          { wrong: "He plays football very good.", right: "He plays football very well.", note: "good 的副词是 well，不是 goodly。" },
          { wrong: "The soup tastes deliciously.", right: "The soup tastes delicious.", note: "taste 是连系动词，说明主语状态，用形容词。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "确认被修饰的是名词还是动词；动词是否为连系动词；-ly 的拼写是否正确；没有混淆 good/well 等不规则形式。",
      },
    ],
    keyPoints: ["名词用形容词，动作方式用副词", "连系动词后用形容词", "注意 -ly 拼写变化", "区分 good/well 等不规则形式"],
  },
  "g-a1-10": {
    openingExample: { en: "He is often late.", cn: "他经常迟到。" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "频率副词说明一件事发生得多频繁。它的位置取决于动词类型：普通动词前、be 动词后、助动词与主要动词之间。核心结构：主语 + 频率副词 + 普通动词；主语 + be + 频率副词。",
      },
      {
        heading: "2 · 功能与例句",
        body: "频率副词常与一般现在时连用，描述习惯；直接回答 how often；never、rarely、seldom 已含否定意义，不能再加 not；sometimes、usually、often 可以放句首或句尾以强调，但 never 不这样使用。",
        examples: [
          { en: "I always have breakfast at home.", cn: "我总是在家吃早餐。", note: "描述习惯和频率。" },
          { en: "How often do you swim? — I sometimes swim.", cn: "你多久游一次泳？——我有时会游。", note: "回答 how often。" },
          { en: "She never drinks coffee.", cn: "她从不喝咖啡。", note: "never 自带否定意义，动词仍用肯定形式。" },
          { en: "Sometimes we walk to school.", cn: "有时我们步行上学。", note: "sometimes 可以在句首强调。" },
        ],
      },
      {
        heading: "3 · 常见形式",
        body: "频率从高到低：always（100%）、usually、often、sometimes、rarely / seldom、never（0%），例如 I usually get up at six. 普通动词：主语 + 副词 + 动词（She often reads at night.）；be 动词：主语 + be + 副词（He is often late.）；有助动词：主语 + 助动词 + 副词 + 主要动词（I have never been to Hanoi.）。",
      },
      {
        heading: "4 · 分析步骤",
        body: "01 找主要动词：be 后放频率副词，普通动词前放（is always ↔ always goes）。02 如有 do、have、will、can 等助动词，把副词放在助动词与主要动词之间（She can never remember.）。03 检查否定意义：never、rarely 已有否定意义，动词保持肯定形式（He never eats meat.）。",
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句对照意思、结构和语境。",
        examples: [
          { en: "He is often late for the first class.", cn: "他上第一节课经常迟到。", note: "is 是主要动词，often 放在它后面；放在 is 前会颠倒词序。" },
          { en: "She usually walks to school.", cn: "她通常步行上学。", note: "walks 是普通动词，usually 放在前面。" },
          { en: "I have never been to Da Lat.", cn: "我从没去过大叻。", note: "have 是助动词，never 放在 have 和 been 之间。" },
          { en: "My grandmother never drinks coffee in the evening.", cn: "我祖母晚上从不喝咖啡。", note: "never 已有否定意义，drinks 仍用肯定形式。" },
          { en: "Sometimes we study together at the library.", cn: "我们有时一起在图书馆学习。", note: "sometimes 可放句首强调；普通陈述句里 never 不这样放。" },
          { en: "How often do you play badminton? — I rarely play these days.", cn: "你多久打一次羽毛球？——这些天我很少打。", note: "回答中的 rarely 放在主要动词 play 前。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "根据动词类型确定频率副词的位置。",
        table: [
          { left: "be 动词：副词放后面", right: "They are always busy." },
          { left: "普通动词：副词放前面", right: "They always work hard." },
          { left: "有助动词：副词放中间", right: "They will always remember." },
        ],
        errors: [
          { wrong: "He often is late.", right: "He is often late.", note: "be 动词后放频率副词。" },
          { wrong: "She doesn't never come late.", right: "She never comes late.", note: "never 已有否定意义，不再加 doesn't。" },
          { wrong: "I go always early.", right: "I always go early.", note: "普通动词前放频率副词。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "确认主要动词是 be 还是普通动词；如有助动词，副词是否放在中间；never、rarely 没有和 not 连用；所选副词表达的频率符合本意。",
      },
    ],
    keyPoints: ["普通动词前、be 动词后放频率副词", "有助动词时放在助动词和主要动词之间", "never、rarely 不与 not 连用", "选词与实际频率相符"],
  },
  "g-a1-12": {
    openingExample: { en: "My brother studies every evening.", cn: "我哥哥每天晚上学习。" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "一般现在时表示经常重复的事或始终成立的事实，包括习惯、日常活动、客观事实和固定日程。第三人称单数的动词要加 -s/-es。核心结构：主语 + 动词（第三人称单数加 -s/-es）。",
      },
      {
        heading: "2 · 功能与例句",
        body: "用于习惯、反复发生的事、客观事实、持续的状态和感觉，也用于列车时刻等固定安排。常与 every day、twice a week 等周期表达或频率副词连用。",
        examples: [
          { en: "I get up at six every morning.", cn: "我每天早上六点起床。", note: "习惯和反复发生的事。" },
          { en: "Water boils at 100 degrees.", cn: "水在一百度沸腾。", note: "不取决于说话时间的客观事实。" },
          { en: "She likes classical music.", cn: "她喜欢古典音乐。", note: "know、like、belong 等状态动词常用一般现在时。" },
          { en: "The train leaves at 6.15 tomorrow.", cn: "火车明天六点十五分出发。", note: "固定的未来时刻表也用一般现在时。" },
        ],
      },
      {
        heading: "3 · 常见句式",
        body: "肯定：I/you/we/they + 动词原形，he/she/it + 动词 -s/-es（She works here.）；否定：主语 + do/does not + 动词原形（He does not work here.）；疑问：Do/Does + 主语 + 动词原形？（Does she work here?）。拼写：一般加 -s，-s/-sh/-ch/-x/-o 后加 -es，辅音字母 + y 变 -ies（go → goes，watch → watches，study → studies）。",
      },
      {
        heading: "4 · 分析步骤",
        body: "01 判断主语的人称和单复数：he、she、it 及所有单数名词使动词加 -s/-es（My brother → studies）。02 按拼写规则变化：咝音后加 -es，辅音 + y 改成 -ies，have 的特殊形式是 has（study → studies，have → has）。03 否定与疑问使用 do/does；有 does 时主要动词恢复原形（Does he live here?）。",
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句对照意思、结构和语境。",
        examples: [
          { en: "My brother studies every evening.", cn: "我哥哥每天晚上学习。", note: "my brother 是第三人称单数，所以 study 变成 studies；every evening 表示重复。" },
          { en: "Tom drinks coffee every morning before work.", cn: "Tom 每天上班前的早晨都喝咖啡。", note: "drinks 的 -s 标明主语是第三人称单数。" },
          { en: "Water boils at one hundred degrees Celsius.", cn: "水在一百摄氏度沸腾。", note: "始终成立的事实用一般现在时，不用现在进行时。" },
          { en: "She does not eat meat, but she eats fish.", cn: "她不吃肉，但吃鱼。", note: "does not 后用动词原形 eat；肯定句中用 eats。" },
          { en: "Does your sister work in Hanoi?", cn: "你姐姐在河内工作吗？", note: "does 已标出第三人称单数，所以 work 不再加 -s。" },
          { en: "The last bus leaves at ten past nine.", cn: "末班车九点十分出发。", note: "固定时刻表即使指向未来，也用一般现在时。" },
          { en: "The students read scientific articles every week.", cn: "学生们每周阅读科学论文。", note: "复数主语用动词原形 read；reads 只配 he、she、it。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "一般现在时说明习惯或始终成立的事；现在进行时说明说话时正在发生或暂时发生的事。状态动词通常用一般现在时。",
        table: [
          { left: "一般现在时：习惯、恒常事实", right: "He works in a bank." },
          { left: "现在进行时：此刻发生或暂时情况", right: "He is working at home this week." },
          { left: "状态动词通常用一般现在时", right: "I know the answer.（不用 I am knowing）" },
        ],
        errors: [
          { wrong: "My brother study every evening.", right: "My brother studies every evening.", note: "第三人称单数主语使动词加 -s/-es。" },
          { wrong: "Does he lives here?", right: "Does he live here?", note: "does 已标出第三人称单数，主要动词恢复原形。" },
          { wrong: "She don't like tea.", right: "She doesn't like tea.", note: "第三人称单数使用助动词 does，而不是 do。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "确认主语是否为第三人称单数；-s/-es 拼写正确；否定和疑问句的 do/does 与主语一致；有 do/does 时主要动词用原形。",
      },
    ],
    keyPoints: ["第三人称单数动词加 -s/-es", "否定和疑问使用 do/does", "有 does 时主要动词用原形", "区分习惯与此刻正在发生的事"],
  },
  "g-a1-13": {
    openingExample: { en: "She likes reading comics.", cn: "她喜欢看漫画。" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "表达喜好时，英语使用情感动词 + V-ing。易错点是把第二个动词直接写成原形。like 表达长期爱好；would like 表达当下的邀请或愿望，后接带 to 的动词原形。核心结构：like/love/enjoy/hate + V-ing；would like + to-V。",
      },
      {
        heading: "2 · 功能与例句",
        body: "like、love、enjoy、hate 后接 V-ing，表达长期爱好或不喜欢。would like 后接 to-V，表达当下愿望或邀请。句尾可加 very much、a lot，或用 love 代替 like，表达更强的喜爱。",
        examples: [
          { en: "I enjoy swimming in the morning.", cn: "我喜欢早上游泳。", note: "长期爱好。" },
          { en: "He doesn't like waiting.", cn: "他不喜欢等待。", note: "否定句中，like 后仍接 V-ing。" },
          { en: "Would you like to join us?", cn: "你愿意加入我们吗？", note: "would like 接 to-V，不接 V-ing。" },
          { en: "I like cooking very much.", cn: "我非常喜欢做饭。", note: "very much 放在句尾加强程度。" },
        ],
      },
      {
        heading: "3 · 常见句式",
        body: "爱好：主语 + like/love/enjoy/hate + V-ing（They love travelling.）；否定：主语 + do/does not like + V-ing（She doesn't like getting up early.）；疑问：Do/Does + 主语 + like + V-ing?（Do you like dancing?）；当下愿望：主语 + would like + to-V（I would like to book a table.）。",
      },
      {
        heading: "4 · 分析步骤",
        body: "01 选择情感动词：love 比 like 强，hate 的否定情感最强（love ↔ like ↔ don't like ↔ hate）。02 第二个动词改为 V-ing，注意拼写（swim → swimming，write → writing）。03 区分 like 的一般爱好与 would like 的当下愿望（I like coffee. ↔ I would like a coffee.）。",
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句对照意思、结构和语境。",
        examples: [
          { en: "She likes reading comics in the evening.", cn: "她喜欢在晚上看漫画。", note: "likes 后用 V-ing 形式 reading，不用 read。" },
          { en: "My brother loves playing football with his friends.", cn: "我哥哥很喜欢和朋友踢足球。", note: "love 比 like 程度强，但后面的动词仍用 V-ing。" },
          { en: "He doesn't like waiting in long queues.", cn: "他不喜欢排长队等待。", note: "doesn't like 后仍接 V-ing；助动词改变的是情感动词 like。" },
          { en: "I hate getting up before six o'clock.", cn: "我很讨厌六点前起床。", note: "hate 表达强烈反感，也接 V-ing。" },
          { en: "Would you like to join us for lunch?", cn: "你愿意和我们一起吃午饭吗？", note: "would like 用于邀请，后接 to-V。" },
          { en: "I like tea, but right now I would like to drink water.", cn: "我喜欢茶，但现在想喝水。", note: "like 是一般爱好，would like 是此刻的愿望。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "比较长期爱好、当下愿望和礼貌邀请。",
        table: [
          { left: "like + V-ing：长期爱好", right: "I like swimming." },
          { left: "would like + to-V：此刻的愿望", right: "I would like to swim now." },
          { left: "Would you like …?：礼貌邀请", right: "Would you like some tea?" },
        ],
        errors: [
          { wrong: "She likes read comics.", right: "She likes reading comics.", note: "like 后的动词用 V-ing。" },
          { wrong: "Would you like joining us?", right: "Would you like to join us?", note: "would like 后接 to-V，不接 V-ing。" },
          { wrong: "I am liking this song.", right: "I like this song.", note: "like 是状态动词，通常不用于进行时。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "like/love/enjoy/hate 后的动词是否为 V-ing；would like 后是否为 to-V；-ing 拼写是否正确；like 没有误用为进行时。",
      },
    ],
    keyPoints: ["情感动词后接 V-ing", "would like 后接 to-V", "注意 -ing 拼写", "like 通常不用进行时"],
  },
  "g-a1-14": {
    openingExample: { en: "They are waiting for the bus.", cn: "他们正在等公交车。" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "现在进行时由两部分构成：按主语变化的 be 动词，以及主要动词的 V-ing 形式。它表示说话时正在发生的动作、当前阶段的暂时情况，或已经安排的近期计划。核心结构：主语 + am/is/are + V-ing。",
      },
      {
        heading: "2 · 功能与例句",
        body: "正在发生的动作常伴随 now、at the moment、right now；暂时情况与日常习惯不同；已约定具体时间和地点的近期计划也可用现在进行时；get、become、grow、improve 等动词还可表示逐渐发生的变化。",
        examples: [
          { en: "I am reading now.", cn: "我现在正在阅读。", note: "说话时正在发生。" },
          { en: "She is staying with her aunt this month.", cn: "她这个月暂住在阿姨家。", note: "当前阶段的暂时情况。" },
          { en: "We are meeting Hoa at six tonight.", cn: "我们今晚六点见 Hoa。", note: "已安排的近期计划。" },
          { en: "The weather is getting colder.", cn: "天气正在变冷。", note: "逐渐发生的变化。" },
        ],
      },
      {
        heading: "3 · 常见句式",
        body: "肯定：主语 + am/is/are + V-ing（They are waiting outside.）；否定：主语 + am/is/are + not + V-ing（He is not working today.）；疑问：Am/Is/Are + 主语 + V-ing?（Are you listening?）。拼写：去掉 -e，必要时双写末尾辅音，-ie 变 -ying（write → writing，sit → sitting，lie → lying）。",
      },
      {
        heading: "4 · 分析步骤",
        body: "01 按主语选 be：I am；he/she/it is；you/we/they are。漏掉 be 是常见错误（They are waiting.）。02 主要动词加 -ing：去末尾 -e；单音节元音 + 辅音结尾通常双写辅音（make → making，run → running）。03 检查状态动词：know、like、want、belong、understand 通常不用于进行时（I want it，不用 I am wanting it）。",
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句对照意思、结构和语境。",
        examples: [
          { en: "They are waiting for the bus right now.", cn: "他们现在正在等公交车。", note: "are 和 waiting 两部分都要有；漏掉 are 不合语法。" },
          { en: "I am staying with my grandparents this week.", cn: "这周我暂住在祖父母家。", note: "只发生在当前阶段，并非日常习惯。" },
          { en: "He is not studying at the moment; he is having lunch.", cn: "他现在没在学习，正在吃午饭。", note: "not 放在 be 与 V-ing 之间；have 表示‘吃’时可用进行时。" },
          { en: "Are you listening to me?", cn: "你在听我说话吗？", note: "疑问句把 be 移到主语前，主要动词保持 V-ing。" },
          { en: "We are meeting Hoa at six o'clock tonight.", cn: "我们今晚六点见 Hoa。", note: "已确定时间和参加人，进行时可指近期未来。" },
          { en: "The weather is getting colder every day.", cn: "天气一天比一天冷。", note: "get 表示渐变，常用进行时。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "用时间线索判断是持续、暂时，还是日常重复。",
        table: [
          { left: "now / at the moment / today：现在进行时", right: "She is cooking now." },
          { left: "every day / usually / always：一般现在时", right: "She cooks every day." },
          { left: "this week / these days：暂时情况，用进行时", right: "He is working from home this week." },
        ],
        errors: [
          { wrong: "They waiting for the bus.", right: "They are waiting for the bus.", note: "漏掉 be 就不是完整的现在进行时。" },
          { wrong: "I am read a book now.", right: "I am reading a book now.", note: "be 后用 V-ing，不用动词原形。" },
          { wrong: "I am knowing the answer.", right: "I know the answer.", note: "know 是状态动词，通常不用于进行时。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "be 已按主语变化；主要动词是拼写正确的 V-ing；该动词不是通常不用进行时的状态动词；时间线索与正在发生或暂时的意义相符。",
      },
    ],
    keyPoints: ["be 和 V-ing 两部分齐全", "be 与主语一致", "注意 V-ing 拼写", "状态动词通常不用进行时"],
  },
  "g-a1-15": {
    openingExample: { en: "I study English at home every evening.", cn: "我每晚在家学英语。" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "英语陈述句的默认词序是主语、动词、宾语，然后是地点和时间状语；地点通常在时间前。关键是不要把其他成分插进动词和它的宾语之间。核心结构：主语 + 动词 + 宾语 + 地点状语 + 时间状语。",
      },
      {
        heading: "2 · 功能与例句",
        body: "基本陈述句中主语、动词和宾语相连；地点与时间状语通常在句尾，地点在前；时间状语也可移到句首，后接逗号；双宾语句中无介词时，人通常在物之前。",
        examples: [
          { en: "My sister plays the piano.", cn: "我姐姐弹钢琴。", note: "主语、动词、宾语相连。" },
          { en: "We met Nam at the station yesterday.", cn: "我们昨天在车站遇见 Nam。", note: "地点在时间之前，两者都在句尾。" },
          { en: "Every evening, I study English.", cn: "每天晚上，我都学英语。", note: "时间状语在句首，后接逗号。" },
          { en: "She gave me a book.", cn: "她给了我一本书。", note: "无介词时，人的宾语在物的宾语前。" },
        ],
      },
      {
        heading: "3 · 常见句式",
        body: "默认词序：主语 + 动词 + 宾语 + 地点 + 时间（They watched a film at home last night.）；双宾语：主语 + 动词 + 人 + 物（He sent his mother a letter.）；有介词的双宾语：主语 + 动词 + 物 + to/for + 人（He sent a letter to his mother.）；时间状语句首：时间状语，主语 + 动词 + 宾语（Last night, we watched a film.）。",
      },
      {
        heading: "4 · 分析步骤",
        body: "01 让动词和宾语紧邻，不插入状语：I study English，不能写 I study every evening English。02 同时出现地点和时间时，地点在前：at home every evening。03 核对双宾语：无介词时人先于物（give me the key）；有介词时物先于人（give the key to me）。",
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句对照意思、结构和语境。",
        examples: [
          { en: "I study English at home every evening.", cn: "我每天晚上在家学英语。", note: "study 与 English 相邻，然后才是地点 at home 和时间 every evening。" },
          { en: "Every evening, I study English at home.", cn: "每天晚上，我在家学英语。", note: "时间状语可移到句首，后接逗号。" },
          { en: "We met Nam at the station yesterday.", cn: "我们昨天在车站遇见 Nam。", note: "把它改成 yesterday at the station，在标准英语中不自然。" },
          { en: "She gave me a new dictionary.", cn: "她给了我一本新词典。", note: "人的宾语 me 在物的宾语 a new dictionary 前。" },
          { en: "She gave a new dictionary to her younger brother.", cn: "她给了弟弟一本新词典。", note: "有 to 时物在前，接受者在后。" },
          { en: "He usually does his homework in the library after school.", cn: "他通常放学后在图书馆做作业。", note: "频率副词 usually 在动词前，地点与时间仍在句尾。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "不同状语的位置各有规律。",
        table: [
          { left: "频率状语：普通动词前、be 动词后", right: "She always arrives early." },
          { left: "地点状语：宾语之后", right: "He left his bag in the car." },
          { left: "时间状语：地点之后或句首", right: "…in the car this morning." },
        ],
        errors: [
          { wrong: "I study every evening English at home.", right: "I study English at home every evening.", note: "不能把时间插在动词与宾语之间。" },
          { wrong: "We met yesterday Nam at the station.", right: "We met Nam at the station yesterday.", note: "宾语 Nam 应紧跟动词 met。" },
          { wrong: "She gave to me a new dictionary.", right: "She gave me a new dictionary.", note: "人紧跟动词时不用 to。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "动词与宾语相邻；地点状语在时间状语之前；句首时间状语后有逗号；双宾语按有无介词排好顺序。",
      },
    ],
    keyPoints: ["动词与宾语紧邻", "地点通常在时间之前", "句首时间状语后加逗号", "双宾语按有无介词决定顺序"],
  },
  "g-a1-16": {
    openingExample: { en: "Does she work here?", cn: "她在这里工作吗？" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "普通动词不能自行构成否定句或疑问句，所以一般现在时借助 do/does。助动词承担主语的人称和单复数变化，主要动词就恢复原形。核心结构：Do/Does + 主语 + 动词原形？；主语 + do/does not + 动词原形。",
      },
      {
        heading: "2 · 功能与例句",
        body: "用 do not/does not + 动词原形否定习惯或事实；把 do/does 放在主语前形成是非问句；有疑问词时把疑问词放在助动词前；简短回答重复助动词，不重复主要动词。",
        examples: [
          { en: "I do not drink coffee.", cn: "我不喝咖啡。", note: "否定习惯或事实。" },
          { en: "Do you live near here?", cn: "你住在附近吗？", note: "do 放在主语前形成是非问句。" },
          { en: "Where does she work?", cn: "她在哪里工作？", note: "疑问词放在 does 前。" },
          { en: "Do you smoke? — No, I don't.", cn: "你吸烟吗？——不吸。", note: "简短回答重复助动词。" },
        ],
      },
      {
        heading: "3 · 常见句式",
        body: "否定：I/you/we/they + do not (don't) + 动词原形；he/she/it + does not (doesn't) + 动词原形（She doesn't like tea.）。疑问：Do/Does + 主语 + 动词原形？（Does he live here?）。有疑问词：Wh- + do/does + 主语 + 动词原形？（What do you do at weekends?）。简答：Yes, 主语 + do/does；No, 主语 + don't/doesn't（Yes, she does.）。be 动词自行倒装，不借 do/does（Is the dataset freely available?）。",
      },
      {
        heading: "4 · 分析步骤",
        body: "01 按主语选 do/does：he、she、it 及单数名词用 does，其余用 do（Does your brother…? / Do your friends…?）。02 有 does 时主要动词回原形，不保留 -s（Does she work?，不用 works）。03 疑问词放在助动词之前：疑问词 + 助动词 + 主语 + 主要动词（Where do you live?）。",
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句对照意思、结构和语境。",
        examples: [
          { en: "Does she work here?", cn: "她在这里工作吗？", note: "does 表示第三人称单数，所以 work 用原形。" },
          { en: "They do not play tennis on Sundays.", cn: "他们星期天不打网球。", note: "复数主语用 do not，缩写为 don't。" },
          { en: "My father doesn't drink tea in the evening.", cn: "我父亲晚上不喝茶。", note: "doesn't 已带第三人称单数标记，drink 用原形。" },
          { en: "Where does your sister study?", cn: "你姐姐在哪里学习？", note: "词序为疑问词 where、助动词 does、主语 your sister、原形动词 study。" },
          { en: "Do you live near the school? — Yes, I do.", cn: "你住在学校附近吗？——是的。", note: "简短回答重复 do，不重复 live。" },
          { en: "What does your mother do?", cn: "你母亲做什么工作？", note: "第一个 does 是助动词，第二个 do 是表示‘做’的主要动词。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "普通动词借助 do/does；be 动词和情态动词自行倒装。",
        table: [
          { left: "普通动词：需要 do/does", right: "Do you like it? I don't like it." },
          { left: "be 动词：自行倒装，不用 do", right: "Are you ready? I'm not ready." },
          { left: "情态动词：与 be 一样自行倒装", right: "Can you swim? I can't swim." },
        ],
        errors: [
          { wrong: "Does she works here?", right: "Does she work here?", note: "有 does 后主要动词不保留 -s。" },
          { wrong: "She not like tea.", right: "She does not like tea.", note: "普通动词需要 does 来构成否定，不能直接加 not。" },
          { wrong: "Where she does live?", right: "Where does she live?", note: "助动词紧跟疑问词，并在主语前。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "do/does 与主语一致；主要动词是没有 -s 的原形；疑问词在助动词之前；简短回答重复助动词；be 动词疑问句只倒装 be，不加 do/does。",
      },
    ],
    keyPoints: ["do/does 按主语选择", "主要动词恢复原形", "疑问词放在助动词前", "be 动词疑问句不用 do/does"],
  },
  "g-a1-17": {
    openingExample: { en: "Where do you live?", cn: "你住在哪里？" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "特殊疑问句用于询问具体信息，而不是确认‘是’或‘否’。通常顺序为：疑问词、助动词、主语、主要动词。例外是 who 或 what 自身作主语时，不使用助动词，语序与陈述句相同。核心结构：Wh- + 助动词 + 主语 + 动词？；Who + 动词？",
      },
      {
        heading: "2 · 功能与例句",
        body: "where、when、why 询问地点、时间和原因；who 问人，what 问事物；who/what 作主语时不用 do/does/did；how、how many、how much、which 可结合名词或形容词询问方式、数量或选择。",
        examples: [
          { en: "Why did she leave early?", cn: "她为什么提前离开？", note: "疑问词在句首，随后是助动词。" },
          { en: "What do you want?", cn: "你想要什么？", note: "what 询问事物或事情。" },
          { en: "Who called you? What happened?", cn: "谁给你打电话了？发生了什么？", note: "who/what 作主语时不加助动词。" },
          { en: "How many brothers do you have? Which bag is yours?", cn: "你有几个兄弟？哪个包是你的？", note: "询问数量或选择。" },
        ],
      },
      {
        heading: "3 · 常见句式",
        body: "普通疑问句：Wh- + do/does/did + 主语 + 动词原形？（Where do you live?）；be 动词句：Wh- + am/is/are/was/were + 主语？（Where is your sister?）；疑问词作主语：Who/What + 动词，不加助动词（Who wants some tea?）；疑问词后跟名词：How many/How much/What/Which + 名词 + 助动词 + 主语 + 动词？（What time does the shop open?）；whose + 名词询问所有者（Whose dataset was used for the final analysis?）。",
      },
      {
        heading: "4 · 分析步骤",
        body: "01 按所需信息选疑问词：where 地点、when 时间、why 原因、how 方式（How do you go to school?）。02 助动词紧跟疑问词；普通动词用 do/does/did，be 动词自行倒装（Where does he work? / Where is he?）。03 若 who/what 是执行动作的主语，省去助动词（Who broke the window?）。",
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句对照意思、结构和语境。",
        examples: [
          { en: "Where do you live?", cn: "你住在哪里？", note: "依次是 where、do、you、live 四个部分。" },
          { en: "Where is your sister this afternoon?", cn: "你姐姐今天下午在哪里？", note: "be 动词自行移到疑问词之后，不加 do。" },
          { en: "Why did she leave the party so early?", cn: "她为什么那么早离开聚会？", note: "did 表示过去，leave 用原形。" },
          { en: "Who broke the window?", cn: "谁打碎了窗户？", note: "who 作主语，不加 did，动词用过去式。" },
          { en: "What happened at the meeting?", cn: "会议上发生了什么事？", note: "what 作主语，语序与陈述句相同。" },
          { en: "What time does the library close?", cn: "图书馆几点关门？", note: "what time 整体放在句首，然后接 does。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "同是 who，作主语或宾语时的句式不同。",
        table: [
          { left: "Who called you?：who 作主语，不加助动词", right: "Nam called me." },
          { left: "Who did you call?：who 作宾语，使用 did", right: "I called Nam." },
          { left: "What happened?：what 作主语", right: "An accident happened." },
        ],
        errors: [
          { wrong: "Where you live?", right: "Where do you live?", note: "普通动词的疑问句需要 do/does。" },
          { wrong: "Who did break the window?", right: "Who broke the window?", note: "who 作主语时不加 did。" },
          { wrong: "Where does she lives?", right: "Where does she live?", note: "does 已表示第三人称单数，主要动词用原形。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "疑问词在句首；需要助动词时，它紧跟疑问词、位于主语前；有 do/does/did 时主要动词用原形；疑问词自身作主语时省去助动词。",
      },
    ],
    keyPoints: ["按信息类型选择疑问词", "助动词通常在疑问词和主语之间", "有 do/does/did 时动词用原形", "who/what 作主语时不用助动词"],
  },
  "g-a1-18": {
    openingExample: { en: "There are two windows in my room.", cn: "我的房间里有两扇窗户。" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "there is 和 there are 用来说明某处存在某人或某物。there 占据主语位置，动词形式由后面的名词决定。还要区分表示存在的 there、they are 的缩写 they're，以及表示所属的 their。核心结构：There is + 单数名词；There are + 复数名词。",
      },
      {
        heading: "2 · 功能与例句",
        body: "根据语境，使用这一结构引出新事物、描述一个地方、说明数量，或询问某物是否存在。",
        examples: [
          { en: "There is a bank near here.", cn: "这附近有一家银行。", note: "说明存在——引出听者尚不知道的事物，通常带地点状语。" },
          { en: "There are three bedrooms in the flat.", cn: "这套公寓里有三间卧室。", note: "描述一个地方——列举房间、房屋或城市里有什么。" },
          { en: "There are some letters for you.", cn: "有几封信是给你的。", note: "说明数量——常与数词或 some、any、a lot of 等数量词连用。" },
          { en: "Is there a lift in this building?", cn: "这栋楼有电梯吗？", note: "询问是否存在——把动词移到 there 前面。" },
        ],
      },
      {
        heading: "3 · 句式",
        body: "单数或不可数名词用 there is；复数名词用 there are。",
        table: [
          { left: "肯定：There is / There are + 名词（+ 地点状语）", right: "There is a problem.（有一个问题。）" },
          { left: "否定：There is not any… / There are not any…", right: "There aren't any seats left.（没有剩余座位了。）" },
          { left: "疑问：Is there…? / Are there…?", right: "Are there any questions?（还有问题吗？）" },
          { left: "列举：动词与列出的第一个名词一致", right: "There is a desk, two chairs and a lamp.（有一张桌子、两把椅子和一盏灯。）" },
          { left: "过去：There was + 单数／不可数；There were + 复数", right: "There was a storm last night. There were several discrepancies.（昨晚有暴风雨。存在几处差异。）" },
        ],
      },
      {
        heading: "4 · 分析步骤",
        body: "",
        examples: [
          { en: "There are two windows.", cn: "有两扇窗户。", note: "01 找到 there is/are 后面的名词。决定动词形式的是这个名词，而不是 there。" },
          { en: "There is some milk.", cn: "有一些牛奶。", note: "02 按名词选择 is 或 are。不可数名词即使数量很大，也用 is。" },
          { en: "Is there any sugar?", cn: "有糖吗？", note: "03 否定句和疑问句中用 any；肯定句中的 some 通常改为 any。" },
        ],
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句查看意思、结构和使用语境。",
        examples: [
          { en: "There are two windows in my room.", cn: "我的房间里有两扇窗户。", note: "two windows 是复数，因此用 there are，尽管形式主语仍是 there。" },
          { en: "There is a bank near the market.", cn: "市场附近有一家银行。", note: "a bank 是单数名词，因此用 there is。" },
          { en: "There is some milk in the fridge.", cn: "冰箱里有一些牛奶。", note: "milk 是不可数名词，因此仍用 there is。" },
          { en: "There aren't any seats left on this bus.", cn: "这辆公交车上没有空座位了。", note: "复数可数名词的否定句用 aren't any。" },
          { en: "Is there a lift in this building?", cn: "这栋楼有电梯吗？", note: "疑问句把 is 移到 there 前面。" },
          { en: "There is a desk, two chairs and a lamp in the office.", cn: "办公室里有一张桌子、两把椅子和一盏灯。", note: "列举时，动词形式与列出的第一个名词一致。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "区分 there、their 和 they're，并检查常见错误。",
        table: [
          { left: "there：表示‘在那里’，或作存在句的形式主语", right: "There is a shop over there." },
          { left: "their：they 的形容词性物主代词", right: "Their house is new." },
          { left: "they're：they are 的缩写", right: "They're waiting outside." },
        ],
        errors: [
          { wrong: "There is two windows in my room.", right: "There are two windows in my room.", note: "动词必须与复数名词 two windows 一致。" },
          { wrong: "There have a bank near here.", right: "There is a bank near here.", note: "存在句使用 there is/are，不能因为中文‘有’而使用 have。" },
          { wrong: "They're a lot of people here.", right: "There are a lot of people here.", note: "they're 表示 they are；存在句应使用 there are。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "确认 there 后的名词是单数、复数还是不可数；is/are 与该名词一致；否定句和疑问句用 any 而不是 some；没有混淆 there、their、they're；叙述过去时改用 was/were，选用规则仍由名词决定。",
      },
    ],
    keyPoints: ["动词与 there 后的名词一致", "单数／不可数用 is，复数用 are", "否定和疑问通常用 any", "区分 there、their、they're", "过去时用 was/were"],
  },
  "g-a1-19": {
    openingExample: { en: "She can swim very well.", cn: "她游泳游得很好。" },
    theory: [
      {
        heading: "1 · 重点与核心结构",
        body: "can 表示现在的能力、许可和提议；could 是 can 的过去式，也能让表达更礼貌。两者都是情态动词，不随主语变化，后面始终接不带 to 的动词原形。祈使句省略主语，以动词原形开头。核心结构：can/could + 动词原形；动词原形 + …！",
      },
      {
        heading: "2 · 功能与例句",
        body: "can/could 用于能力、请求许可、提议帮忙或请求帮助；祈使句用于命令、指示和邀请。",
        examples: [
          { en: "She can swim. I could read at five.", cn: "她会游泳。我五岁时就会读书。", note: "能力：can 表示现在的能力，could 表示过去的能力。" },
          { en: "Can I borrow your pen? Could I ask a question?", cn: "我能借你的笔吗？我能问一个问题吗？", note: "请求许可：Could I 比 Can I 更礼貌。" },
          { en: "Could you help me, please?", cn: "请你帮我一下，好吗？", note: "提议或请求帮助：Could you 是常见的礼貌请求。" },
          { en: "Turn left at the corner. Please sit down.", cn: "在拐角处左转。请坐。", note: "命令、指示、邀请：使用祈使句。" },
        ],
      },
      {
        heading: "3 · 句式",
        body: "can/could 后接不带 to 的动词原形；祈使句以动词原形开头。",
        table: [
          { left: "肯定：主语 + can/could + 动词原形", right: "He can drive.（他会开车。）" },
          { left: "否定：主语 + cannot (can't) / could not (couldn't) + 动词原形", right: "I can't swim.（我不会游泳。）" },
          { left: "疑问：Can/Could + 主语 + 动词原形？", right: "Can you help me?（你能帮我吗？）" },
          { left: "祈使：动词原形 + …！／Don't + 动词原形 + …！", right: "Close the door. Don't be late.（关上门。别迟到。）" },
        ],
      },
      {
        heading: "4 · 分析步骤",
        body: "",
        examples: [
          { en: "She can, not She cans", cn: "用 She can，不能用 She cans。", note: "01 can 和 could 保持原形。情态动词在第三人称单数后也不加 -s。" },
          { en: "can swim, not can to swim", cn: "用 can swim，不能用 can to swim。", note: "02 后面接不带 to 的动词原形。" },
          { en: "Don't touch that. Please wait here.", cn: "别碰那个。请在这里等。", note: "03 祈使句省略主语。否定句以 don't 开头；加 please 更礼貌。" },
        ],
      },
      {
        heading: "5 · 例句与讲解",
        body: "逐句查看意思、结构和使用语境。",
        examples: [
          { en: "She can swim very well.", cn: "她游泳游得很好。", note: "主语是 she 时 can 不变，swim 用不带 to 的原形。" },
          { en: "I could read before I started school.", cn: "我上学前就会读书了。", note: "could 是 can 的过去式，表示过去的能力。" },
          { en: "Can I borrow your pen for a minute?", cn: "我能借用一下你的笔吗？", note: "Can I 用于请求许可；Could I 更礼貌。" },
          { en: "Could you open the window, please?", cn: "请你帮我开一下窗户，好吗？", note: "Could you 是礼貌的请求，此处不表示过去。" },
          { en: "He can't come to the party tonight.", cn: "他今晚不能来参加聚会。", note: "否定形式连写为 cannot，缩写为 can't。" },
          { en: "Turn left at the traffic lights and don't cross the bridge.", cn: "在红绿灯处左转，不要过桥。", note: "祈使句没有主语；否定句在句首加 don't。" },
        ],
      },
      {
        heading: "6 · 对照与自我纠错",
        body: "对照不同语气的用法，再检查常见错误。",
        table: [
          { left: "can：现在的能力、较随意的请求许可", right: "I can help you now." },
          { left: "could：过去的能力或礼貌请求", right: "Could you repeat that?" },
          { left: "be able to：用于 can 没有相应形式的时态", right: "I will be able to come tomorrow." },
          { left: "May I…?：更正式的请求许可", right: "May I borrow your pen?" },
        ],
        errors: [
          { wrong: "She can to swim very well.", right: "She can swim very well.", note: "情态动词后接不带 to 的动词原形。" },
          { wrong: "He cans play the piano.", right: "He can play the piano.", note: "第三人称单数后，情态动词不加 -s。" },
          { wrong: "You close the door, please.", right: "Close the door, please.", note: "祈使句省略主语；保留 you 会成为陈述句。" },
        ],
      },
      {
        heading: "7 · 练习前自查",
        body: "can/could 在所有主语后都保持原形；后面的动词是不带 to 的原形；祈使句不带主语；礼貌程度符合语境。",
      },
    ],
    keyPoints: ["can/could 不随主语变化", "后接不带 to 的动词原形", "祈使句省略主语", "根据语境选择礼貌程度"],
  },
};
