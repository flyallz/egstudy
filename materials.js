// 原创学习资料；每篇提供规则、例句和可自行核对的练习。
const learningMaterials = [
  {level:"A1",category:"语法",title:"主语与 Be 动词",summary:"从主语判断 am、is、are，并写出否定句和疑问句。",sections:[
    ["先找主语","I 用 am；he、she、it 和单数名词用 is；you、we、they 和复数名词用 are。不要只看离空格最近的名词。","My two sisters are at home.｜我的两个姐妹在家。"],
    ["改写句子","否定句把 not 放在 be 后：She is not busy. 疑问句把 be 移到主语前：Is she busy? 简短回答是 Yes, she is. 或 No, she isn't.","They are ready. → Are they ready?"],
    ["容易混淆的地方","You 不论指一个人还是多人，都与 are 搭配。There is/are 的选择则看后面的名词。","You are my partner.｜你是我的搭档。"]],
    practice:[["把句子补完整：The windows ___ open.","are；windows 是复数。"],["把 She is early. 改为一般疑问句。","Is she early?"]]},
  {level:"A1",category:"词汇",title:"课堂与学习场景",summary:"把常见课堂词汇放进自然的短句里。",sections:[
    ["听懂课堂指令","listen 是“听”，repeat 是“跟读”，underline 是“画下划线”，compare 是“比较”。听到指令后先找动词，再找对象。","Please underline the new words.｜请给新词画下划线。"],
    ["谈学习安排","lesson 是一节课，schedule 是时间表，homework 是家庭作业，deadline 是截止时间。一个句子只需明确谁、做什么和何时完成。","I will finish my homework before Friday.｜我会在周五前完成作业。"],
    ["主动求助","可以用 Could you explain ...? 礼貌地请对方解释，用 I don't understand ... 说明不懂的部分。","Could you explain this sentence?｜你能解释这个句子吗？"]],
    practice:[["用 deadline 写一句话。","示例：The deadline is Monday.｜截止时间是周一。"],["‘请跟读这个词’怎么说？","Please repeat this word."]]},
  {level:"A1",category:"阅读",title:"读懂一则活动通知",summary:"练习定位时间、地点和所需物品。",sections:[
    ["先看四个问题","读通知时先找活动名称、时间、地点和参加者需要做的事。遇到生词先看上下文，不必逐词翻译。","Reading club: Friday, 4 p.m., Room 203. Bring one short story.｜读书会：周五下午四点，203 室。带一篇短篇故事。"],
    ["识别时间信息","Friday 是星期五，4 p.m. 是下午四点。Room 203 是房间编号，不是时间。","The club meets after school.｜俱乐部放学后集合。"],
    ["复述要点","用一句话概括：The reading club meets on Friday at 4 p.m. in Room 203. 这样比抄整段通知更能检查理解。",""]],
    practice:[["活动在哪里举行？","Room 203。"],["参加者需要带什么？","One short story，一篇短篇故事。"]]},
  {level:"A2",category:"语法",title:"过去发生的事",summary:"用过去式叙述已结束的活动。",sections:[
    ["时间与动词一起看","yesterday、last week、two days ago 通常指向过去。规则动词常加 -ed；go→went、buy→bought 等要单独记。","We visited the museum yesterday.｜我们昨天参观了博物馆。"],
    ["否定和提问","一般过去时的实义动词否定与疑问用 did，后面的动词回原形。be 动词的过去式是 was/were。","Did you visit the museum?｜你参观博物馆了吗？"],
    ["组织三句话","按时间顺序写起因、经过、结果。先保证动词时态一致，再增加细节。","I missed the bus. I walked to school. I arrived ten minutes late.｜我错过了公交，步行去学校，迟到了十分钟。"]],
    practice:[["改错：Did she went home?","Did she go home?；did 后用原形。"],["把 I play tennis. 改成 yesterday 的叙述。","I played tennis yesterday."]]},
  {level:"B1",category:"写作",title:"观点段落的四句话",summary:"用观点、理由、例子、回扣搭起一个完整段落。",sections:[
    ["先把观点说清","主题句应直接回答问题，避免只写一个宽泛话题。例：Public libraries help students study affordably. 读者一开始就知道你要论证什么。", "Public libraries help students study affordably.｜公共图书馆帮助学生以较低成本学习。"],
    ["用理由和例子支撑","第二句解释原因，第三句给可理解的具体情境。例子可以是假设场景，但要与观点对应。","For example, a student can borrow a textbook instead of buying it.｜例如，学生可以借课本，不必购买。"],
    ["回扣观点","最后一句说清例子如何支持主题句，不要突然引入一个新话题。","This makes learning resources easier to access.｜这让学习资源更容易获得。"]],
    practice:[["给观点‘Walking to school is healthy’补一个理由。","示例：It gives students regular physical activity."],["给上述观点补一个具体例子。","示例：A student who walks for 20 minutes each morning gets daily exercise."]]},
  {level:"B1",category:"写作",title:"衔接词要表达真实关系",summary:"区分补充、转折、因果与举例，避免机械堆砌。",sections:[
    ["补充与举例","also 表示增加同方向信息；for example 引出支持前句的具体事例。例子应比观点具体。","Online lessons save travel time. For example, students can study from home.｜网课节省路程时间，例如学生可以在家学习。"],
    ["转折与因果","however 表示对比；therefore 表示前因后果。先判断两句的逻辑，再选词。","The course is useful. However, it is expensive.｜这门课有用，但价格高。"],
    ["控制使用频率","一段中每个衔接词都应承担明确作用。相邻句子也能靠重复关键词或代词自然连接。","The course is useful. It gives beginners clear feedback.｜这门课很有用，它给初学者清晰反馈。"]],
    practice:[["填词：It rained heavily. ___, the match was cancelled.","Therefore；后句是结果。"],["填词：The room is small. ___, it is bright.","However；后句与前句形成转折。"]]}
];

