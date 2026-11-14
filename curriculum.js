// 原创示例与练习。每课的讲解和题目独立，不使用参考站的课程正文或题库。
const curriculum = [
  {
    title:"Be 动词与主格代词", focus:"用 am、is、are 介绍身份、描述状态和说明位置。",
    formula:"I am · he/she/it is · you/we/they are",
    explanation:"先找真正的主语，再决定 be 动词形式。名词单数通常对应 he、she 或 it；名词复数通常对应 they。否定句把 not 放在 be 后，疑问句把 be 移到主语前。",
    examples:[["I am ready for the lesson.","我已经准备好上课了。"],["Our classroom is quiet.","我们的教室很安静。"],["Are the students here?","学生们到了吗？"]],
    mistake:["My classmates is helpful.","My classmates are helpful.","classmates 是复数，应用 are。"],
    questions:[
      ["I ___ from Shanghai.",["am","is","are"],"am","I 后面用 am。"],
      ["She ___ interested in music.",["am","is","are"],"is","She 是第三人称单数。"],
      ["We ___ ready to begin.",["am","is","are"],"are","We 是复数主语。"],
      ["The library ___ open today.",["am","is","are"],"is","library 是单数名词。"],
      ["My friends ___ at the station.",["am","is","are"],"are","friends 是复数名词。"],
      ["___ you tired?",["Am","Is","Are"],"Are","疑问句中把 are 放在 you 前。"],
      ["This room ___ not very large.",["am","is","are"],"is","This room 为单数。"],
      ["The books ___ on the shelf.",["am","is","are"],"are","books 是复数。"],
      ["It ___ sunny this morning.",["am","is","are"],"is","天气句的 It 后接 is。"],
      ["You ___ a careful learner.",["am","is","are"],"are","You 无论表示单数还是复数都接 are。"],
      ["___ your brother at home?",["Am","Is","Are"],"Is","brother 是单数。"],
      ["Those pencils ___ mine.",["am","is","are"],"are","Those pencils 是复数。"],
      ["I ___ not late.",["am","is","are"],"am","I am not 是正确的否定形式。"],
      ["The weather ___ cold.",["am","is","are"],"is","weather 在这里是单数主语。"],
      ["Our teachers ___ kind.",["am","is","are"],"are","teachers 是复数。"],
      ["He ___ twelve years old.",["am","is","are"],"is","英语用 be 表示年龄。"],
      ["___ it your first visit?",["Am","Is","Are"],"Is","It 后接 is，疑问句把 is 前置。"],
      ["The children ___ outside.",["am","is","are"],"are","children 是复数形式。"],
      ["My name ___ Lin.",["am","is","are"],"is","name 是单数名词。"],
      ["They ___ not hungry.",["am","is","are"],"are","They 后接 are，否定再加 not。"]
    ]
  },
  {
    title:"宾格代词",focus:"识别动作的承受者，区分 I/me、he/him、she/her 等。",
    formula:"动词或介词 + me / you / him / her / it / us / them",
    explanation:"主格通常担任主语；宾格通常出现在动词或介词后。先问“谁做动作”，再问“动作影响谁”。",
    examples:[["Please call me later.","请稍后给我打电话。"],["We work with them.","我们和他们合作。"]],
    mistake:["Please help I.","Please help me.","help 后面需要宾格 me。"],
    questions:[["Please listen to ___.",["I","me","my"],"me","介词 to 后用宾格。"],["I know ___.",["he","him","his"],"him","know 的宾语用 him。"],["She invited ___ to lunch.",["we","us","our"],"us","invited 后用宾格 us。"],["The teacher thanked ___.",["they","them","their"],"them","动作承受者用 them。"]]
  },
  {
    title:"名词与复数",focus:"把可数名词从一个变成多个，并注意常见不规则形式。",
    formula:"one book → two books · one child → two children",
    explanation:"大多数可数名词加 -s；以 s、sh、ch、x 结尾的常加 -es。部分词有不规则复数，需要单独记忆。",
    examples:[["There are three buses.","那里有三辆公交车。"],["Two children are playing.","两个孩子在玩耍。"]],
    mistake:["I have two box.","I have two boxes.","box 的复数为 boxes。"],
    questions:[["Two ___ are on the desk.",["book","books","bookes"],"books","book 的复数直接加 s。"],["Three ___ arrived.",["bus","buses","buss"],"buses","bus 的复数加 es。"],["The ___ are smiling.",["child","children","childs"],"children","child 的复数为 children。"],["I need two ___.",["boxes","boxs","box"],"boxes","box 的复数加 es。"]]
  },
  {
    title:"可数与不可数名词",focus:"分清可以数的物品和通常按数量表达的物质。",
    formula:"a cup / two cups · some water / a glass of water",
    explanation:"可数名词可与 a、an 和数字连用；不可数名词通常不直接加复数词尾，数量可用 a glass of、a piece of 等单位表达。",
    examples:[["We need some rice.","我们需要一些米饭。"],["She bought two apples.","她买了两个苹果。"]],
    mistake:["I need two breads.","I need two pieces of bread.","bread 通常作不可数名词。"],
    questions:[["I would like some ___.",["water","waters","a water"],"water","water 通常不可数。"],["There are three ___.",["chair","chairs","chairies"],"chairs","chair 可数，三把要用复数。"],["A ___ of milk is enough.",["glass","glasses","many"],"glass","a glass of 表示一杯。"],["She gave me useful ___.",["advice","advices","an advice"],"advice","advice 通常不可数。"]]
  },
  {
    title:"所有格",focus:"表达“谁的”，区分形容词性物主代词和名词性物主代词。",
    formula:"my book · the book is mine · Anna's book",
    explanation:"my、your、his 等后面要接名词；mine、yours 等能单独使用。名词所有格一般加 's。",
    examples:[["This is her notebook.","这是她的笔记本。"],["The red bag is mine.","红色的包是我的。"]],
    mistake:["This pen is my.","This pen is mine.","句末不接名词，应用 mine。"],
    questions:[["This is ___ desk.",["my","mine","me"],"my","desk 前用 my。"],["The blue coat is ___.",["her","hers","she"],"hers","不接名词时用 hers。"],["That is ___ bike.",["Tom's","Tom","Toms"],"Tom's","名词所有格加 's。"],["Are these keys ___?",["your","yours","you"],"yours","句末独立使用 yours。"]]
  },
  {
    title:"指示代词",focus:"按远近和单复数选择 this、that、these、those。",
    formula:"this / that + 单数 · these / those + 复数",
    explanation:"this、these 指较近的人或物；that、those 指较远的人或物。先看距离，再看数量。",
    examples:[["This cup is clean.","这个杯子很干净。"],["Those houses are old.","那些房子很旧。"]],
    mistake:["These book is new.","This book is new.","book 是单数，应用 this。"],
    questions:[["___ apples here are fresh.",["These","This","That"],"These","apples 复数且在近处。"],["___ car over there is new.",["That","These","Those"],"That","远处的单数 car 用 that。"],["___ is my phone.",["This","These","Those"],"This","单数且近处用 this。"],["___ birds in the distance are small.",["Those","That","This"],"Those","远处复数 birds 用 those。"]]
  },
  {
    title:"冠词",focus:"在单数可数名词前选择 a、an、the。",
    formula:"a + 辅音音素 · an + 元音音素 · the + 特指",
    explanation:"a 与 an 的选择取决于发音而非仅看字母；首次提到常用 a/an，双方都知道的特定对象常用 the。",
    examples:[["She has an umbrella.","她有一把雨伞。"],["The umbrella is yellow.","那把雨伞是黄色的。"]],
    mistake:["He is a honest man.","He is an honest man.","honest 的 h 不发音，开头为元音音素。"],
    questions:[["I saw ___ elephant.",["an","a","the"],"an","elephant 以元音音素开头。"],["She has ___ bicycle.",["a","an","the"],"a","bicycle 以辅音音素开头。"],["Please close ___ door.",["the","a","an"],"the","双方知道是哪扇门时用 the。"],["He waited for ___ hour.",["an","a","the"],"an","hour 的 h 不发音。"]]
  },
  {
    title:"数量词",focus:"区分 some、any、much、many 与名词类型。",
    formula:"many + 可数复数 · much + 不可数名词",
    explanation:"many 常修饰可数复数；much 常修饰不可数名词。some 多见于肯定句，any 多见于疑问句和否定句。",
    examples:[["We have many questions.","我们有很多问题。"],["Is there any tea?","有茶吗？"]],
    mistake:["There are much students.","There are many students.","students 可数且为复数。"],
    questions:[["How ___ books do you have?",["many","much","any"],"many","books 是可数复数。"],["How ___ time is left?",["much","many","some"],"much","time 在此不可数。"],["Do you have ___ questions?",["any","much","many"],"any","一般疑问句常用 any。"],["We bought ___ fruit.",["some","many","any"],"some","肯定句可用 some。"]]
  },
  {
    title:"形容词与副词",focus:"区分修饰名词的形容词和修饰动作的副词。",
    formula:"a careful driver · drive carefully",
    explanation:"形容词描述人或物；副词常说明动作如何发生。很多副词由形容词加 -ly 构成，但也有例外。",
    examples:[["It is a quiet room.","这是一个安静的房间。"],["Please speak quietly.","请轻声说话。"]],
    mistake:["She sings beautiful.","She sings beautifully.","修饰 sings 应使用副词。"],
    questions:[["He is a ___ reader.",["careful","carefully","care"],"careful","修饰名词 reader 用形容词。"],["She writes ___.",["neatly","neat","neater"],"neatly","修饰 writes 用副词。"],["The soup tastes ___.",["good","well","goodly"],"good","感官系动词后用形容词。"],["They worked ___.",["hard","hardly","harderly"],"hard","work hard 表示努力工作。"]]
  },
  {
    title:"频率副词",focus:"用 always、usually、sometimes、never 描述习惯。",
    formula:"主语 + usually + 实义动词 · 主语 + be + usually",
    explanation:"频率副词通常放在实义动词前、be 动词后。never 本身已有否定含义，不再另加 not。",
    examples:[["I often walk to school.","我经常步行去学校。"],["She is usually early.","她通常到得早。"]],
    mistake:["He usually is late.","He is usually late.","频率副词通常放在 be 后。"],
    questions:[["She ___ reads before bed.",["often","is often","does often"],"often","实义动词 reads 前可用 often。"],["They are ___ busy on Mondays.",["usually","usual","use"],"usually","be 后放频率副词。"],["I ___ eat breakfast at home.",["always","am always","always am"],"always","实义动词 eat 前放 always。"],["He ___ drinks coffee.",["never","not never","is never"],"never","never 自带否定含义。"]]
  },
  {
    title:"时间与地点介词",focus:"掌握 at、on、in 的基础用法。",
    formula:"at 7:00 · on Monday · in July · at school · in a room",
    explanation:"具体时刻常用 at，星期和日期常用 on，月份、年份与较长时间常用 in。地点的介词要结合具体表达记忆。",
    examples:[["Class begins at nine.","九点上课。"],["We meet on Friday.","我们周五见。"]],
    mistake:["I was born on 2008.","I was born in 2008.","年份前用 in。"],
    questions:[["The meeting starts ___ ten.",["at","on","in"],"at","具体时刻用 at。"],["My birthday is ___ May.",["in","on","at"],"in","月份前用 in。"],["We play football ___ Sunday.",["on","in","at"],"on","星期前用 on。"],["The keys are ___ the bag.",["in","on","at"],"in","包里面用 in。"]]
  },
  {
    title:"一般现在时",focus:"描述习惯和事实，注意第三人称单数。",
    formula:"I/you/we/they work · he/she/it works",
    explanation:"一般现在时可表达经常发生的事。第三人称单数的肯定句，动词通常加 -s 或 -es；否定和疑问用 does 时，主要动词回原形。",
    examples:[["I walk to work.","我步行上班。"],["She walks to work.","她步行上班。"]],
    mistake:["He go to school.","He goes to school.","he 为第三人称单数。"],
    questions:[["She ___ English every day.",["studies","study","studys"],"studies","study 在第三人称单数变为 studies。"],["They ___ near the park.",["live","lives","living"],"live","they 后用动词原形。"],["He ___ breakfast at seven.",["eats","eat","eating"],"eats","he 后的肯定式动词加 s。"],["The sun ___ in the east.",["rises","rise","rising"],"rises","事实陈述用一般现在时。"]]
  },
  {
    title:"喜欢与动名词",focus:"用 like、love、hate 加 -ing 表达爱好。",
    formula:"like / love / hate + 动词 -ing",
    explanation:"描述喜欢或不喜欢做某事时，可以在 like、love、hate 后使用动名词。注意动名词的拼写变化。",
    examples:[["I like reading after dinner.","我喜欢晚饭后阅读。"],["They love swimming.","他们喜欢游泳。"]],
    mistake:["She likes cook.","She likes cooking.","表达爱好时，likes 后接 cooking。"],
    questions:[["I enjoy ___ music.",["listening to","listen","listened"],"listening to","enjoy 后常接动名词。"],["She likes ___ photos.",["taking","take","takes"],"taking","likes 后接动名词。"],["They love ___ outdoors.",["walking","walk","walks"],"walking","love 后接动名词。"],["He hates ___ early.",["getting up","get up","gets up"],"getting up","hate 后接动名词。"]]
  },
  {
    title:"现在进行时",focus:"表达此刻正在发生的动作。",
    formula:"am / is / are + 动词 -ing",
    explanation:"现在进行时由 be 动词和现在分词组成。常与 now、at the moment 等表达一起出现。be 仍要与主语一致。",
    examples:[["I am writing a note now.","我正在写便条。"],["They are waiting outside.","他们正在外面等候。"]],
    mistake:["She is play the piano.","She is playing the piano.","is 后要用 playing。"],
    questions:[["He is ___ a letter.",["writing","write","writes"],"writing","is 后用现在分词。"],["We ___ watching a film.",["are","is","am"],"are","We 后用 are。"],["I am ___ for my bag.",["looking","look","looks"],"looking","am 后用 looking。"],["The baby ___ sleeping.",["is","are","am"],"is","baby 是单数。"]]
  },
  {
    title:"基本语序",focus:"把主语、动词、宾语和地点时间放在自然位置。",
    formula:"主语 + 动词 + 宾语 + 地点 + 时间",
    explanation:"英语陈述句通常先说谁，再说做什么，随后补上对象以及地点、时间。不要直接照搬汉语的词序。",
    examples:[["We study English at home.","我们在家学英语。"],["Mina reads a book every night.","米娜每天晚上读书。"]],
    mistake:["At home we English study.","We study English at home.","动词应紧跟主语。"],
    questions:[["选择自然的语序。",["She reads books at home.","She books reads at home.","Reads she books at home."],"She reads books at home.","陈述句通常主语在动词前。"],["选择自然的语序。",["They play tennis on Friday.","They tennis play on Friday.","Play they tennis on Friday."],"They play tennis on Friday.","主语、动词、宾语依次排列。"],["选择自然的语序。",["I drink water after lunch.","I water drink after lunch.","Drink I water after lunch."],"I drink water after lunch.","drink 是动词，放在主语后。"],["选择自然的语序。",["He visits his aunt in July.","He his aunt visits in July.","Visits he his aunt in July."],"He visits his aunt in July.","陈述句用主语加动词。"]]
  },
  {
    title:"否定句与一般疑问句",focus:"使用 do、does 和 be 构成否定与提问。",
    formula:"do/does + not + 动词原形 · Do/Does + 主语 + 动词原形?",
    explanation:"实义动词的一般现在时需要 do 或 does 帮助构成否定和疑问；be 动词则直接加 not 或移到主语前。",
    examples:[["I do not eat meat.","我不吃肉。"],["Does she work here?","她在这里工作吗？"]],
    mistake:["Does he likes tea?","Does he like tea?","does 后的实义动词用原形。"],
    questions:[["___ you know the answer?",["Do","Does","Are"],"Do","you 的实义动词疑问句用 Do。"],["She ___ not live here.",["does","do","is"],"does","she 的实义动词否定句用 does。"],["___ they at home?",["Are","Do","Does"],"Are","be 动词疑问句直接前置。"],["He does not ___ coffee.",["drink","drinks","drinking"],"drink","does 后用动词原形。"]]
  },
  {
    title:"特殊疑问句",focus:"用 what、where、when、who、why、how 获取具体信息。",
    formula:"疑问词 + 助动词 / be + 主语 + 其他?",
    explanation:"先确定要问的是人、地点、时间、原因还是方式，再选择疑问词。疑问词后仍保持英语疑问句语序。",
    examples:[["Where do you live?","你住在哪里？"],["Why is the door open?","门为什么开着？"]],
    mistake:["Where you live?","Where do you live?","实义动词疑问句需要 do。"],
    questions:[["___ is your name?",["What","Where","When"],"What","询问名称用 What。"],["___ do you live?",["Where","Who","Why"],"Where","询问地点用 Where。"],["___ is your birthday?",["When","What","How"],"When","询问时间用 When。"],["___ are you late?",["Why","Where","Who"],"Why","询问原因用 Why。"]]
  },
  {
    title:"There is / There are",focus:"说明某处存在一个或多个事物。",
    formula:"There is + 单数或不可数 · There are + 复数",
    explanation:"这个结构用来引出新信息，be 的形式通常和后面的名词一致。否定句在 be 后加 not；疑问句将 be 前置。",
    examples:[["There is a map on the wall.","墙上有一张地图。"],["There are two chairs by the window.","窗边有两把椅子。"]],
    mistake:["There is three cups.","There are three cups.","three cups 是复数。"],
    questions:[["There ___ a dog in the garden.",["is","are","am"],"is","a dog 为单数。"],["There ___ many trees here.",["are","is","am"],"are","many trees 为复数。"],["___ there a bank nearby?",["Is","Are","Do"],"Is","a bank 为单数。"],["There ___ not any chairs.",["are","is","am"],"are","chairs 为复数。"]]
  },
  {
    title:"Can、Could 与祈使句",focus:"表达能力、礼貌请求和简短指令。",
    formula:"can / could + 动词原形 · 动词原形开头构成祈使句",
    explanation:"can 表达能力或许可；could 可用于更礼貌的请求。情态动词后用动词原形。祈使句通常省略主语 you。",
    examples:[["I can swim.","我会游泳。"],["Could you open the window?","你能打开窗户吗？"],["Please sit down.","请坐。"]],
    mistake:["She can swims.","She can swim.","can 后用动词原形。"],
    questions:[["He can ___ fast.",["run","runs","running"],"run","can 后用动词原形。"],["___ you help me, please?",["Could","Does","Are"],"Could","Could you... 是礼貌请求。"],["___ the door, please.",["Close","Closes","Closing"],"Close","祈使句用动词原形开头。"],["They ___ speak Chinese.",["can","cans","are can"],"can","情态动词 can 不随主语变化。"]]
  }
];

// 补足前两课进阶练习；每题的情境与反馈独立编写。
curriculum[1].questions.push(
  ["Can you see ___?",["us","we","our"],"us","see 后需要宾格 us。"],
  ["I sent ___ a message.",["her","she","hers"],"her","sent 的间接宾语用 her。"],
  ["Please wait for ___.",["them","they","their"],"them","介词 for 后用宾格 them。"],
  ["My sister helped ___ with the bag.",["me","I","my"],"me","helped 后用宾格 me。"],
  ["We met ___ at the library.",["him","he","his"],"him","met 后面的动作承受者用 him。"],
  ["The guide showed ___ the way.",["us","we","ours"],"us","showed 后用宾格 us。"],
  ["I am talking to ___.",["you","your","yours"],"you","to 后需要代词宾格；you 的主宾格同形。"],
  ["Do not touch ___; the paint is wet.",["it","its","it's"],"it","touch 后用宾格 it。"],
  ["They invited ___ to the party.",["me","I","mine"],"me","invited 后用宾格 me。"],
  ["Our teacher asked ___ a question.",["him","he","his"],"him","asked 后用宾格 him。"],
  ["I will sit next to ___.",["her","she","hers"],"her","介词 to 后用宾格 her。"],
  ["Could you join ___ for lunch?",["us","we","our"],"us","join 后面要用宾格 us。"],
  ["The bus left without ___.",["them","they","their"],"them","without 是介词，后接宾格。"],
  ["Please give ___ the notebook.",["me","I","mine"],"me","give 的间接宾语用 me。"],
  ["I cannot hear ___ clearly.",["you","your","yours"],"you","hear 后面用宾格 you。"],
  ["The coach praised ___ after the game.",["her","she","hers"],"her","praised 后面的宾语用 her。"]
);
curriculum[2].questions.push(
  ["I have three ___.",["pens","pen","penes"],"pens","pen 的复数直接加 s。"],
  ["There are two ___ outside.",["buses","bus","buss"],"buses","bus 的复数加 es。"],
  ["Five ___ are in the box.",["watches","watchs","watch"],"watches","watch 的复数加 es。"],
  ["The ___ are playing chess.",["men","mans","man"],"men","man 的不规则复数是 men。"],
  ["We saw two ___ in the park.",["women","womans","woman"],"women","woman 的不规则复数是 women。"],
  ["Put the two ___ on the table.",["dishes","dishs","dish"],"dishes","dish 的复数加 es。"],
  ["The shop sells red ___.",["boxes","boxs","box"],"boxes","box 的复数加 es。"],
  ["Three ___ came to the meeting.",["people","persons","peoples"],"people","people 通常用作 person 的复数。"],
  ["The two ___ are asleep.",["babies","babys","baby"],"babies","辅音字母加 y 结尾，变 y 为 ies。"],
  ["There are four ___ by the road.",["trees","treees","tree"],"trees","tree 的复数加 s。"],
  ["My ___ are cold.",["feet","foots","foot"],"feet","foot 的不规则复数是 feet。"],
  ["The ___ are on the shelf.",["knives","knifes","knife"],"knives","knife 的复数通常把 fe 变为 ves。"],
  ["I washed two ___.",["glasses","glasss","glass"],"glasses","glass 的复数加 es。"],
  ["The ___ are eating lunch.",["children","childs","child"],"children","child 的不规则复数是 children。"],
  ["She bought three ___.",["dresses","dresss","dress"],"dresses","dress 的复数加 es。"],
  ["Two ___ ran across the field.",["mice","mouses","mouse"],"mice","mouse 的不规则复数是 mice。"]
);

