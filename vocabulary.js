// 原创词汇索引。每个主题的首课采用独立词卡，不复用其他主题的词。
const topicVocabulary = [
  "curriculum:课程体系|scholarship:奖学金|tuition:学费|literacy:读写能力|enrol:注册入学|graduate:毕业生|assignment:作业|seminar:研讨课|mentor:导师|qualification:资格",
  "climate:气候|habitat:栖息地|emission:排放|recycle:回收|drought:干旱|flood:洪水|species:物种|renewable:可再生的|conserve:保护|pollution:污染",
  "device:设备|privacy:隐私|software:软件|network:网络|algorithm:算法|platform:平台|download:下载|update:更新|security:安全|digital:数字化的",
  "nutrition:营养|exercise:锻炼|symptom:症状|clinic:诊所|recovery:康复|stress:压力|balance:平衡|sleep:睡眠|habit:习惯|therapy:治疗",
  "career:职业|salary:薪水|colleague:同事|interview:面试|contract:合同|skill:技能|employer:雇主|employee:雇员|promotion:晋升|schedule:日程",
  "budget:预算|consumer:消费者|savings:储蓄|price:价格|demand:需求|supply:供给|purchase:购买|refund:退款|market:市场|income:收入",
  "neighbourhood:街区|facility:设施|suburb:郊区|resident:居民|crowded:拥挤的|public:公共的|park:公园|street:街道|building:建筑物|community:社区",
  "commute:通勤|vehicle:车辆|traffic:交通|fare:票价|route:路线|pedestrian:行人|station:车站|departure:出发|arrival:到达|transfer:换乘",
  "evidence:证据|witness:证人|court:法庭|law:法律|victim:受害者|sentence:判决|police:警察|investigate:调查|justice:公正|rights:权利",
  "policy:政策|election:选举|citizen:公民|minister:部长|public:公众|debate:辩论|reform:改革|council:议会|vote:投票|regulation:规章",
  "headline:标题|audience:受众|advertisement:广告|broadcast:广播|article:文章|source:消息来源|campaign:宣传活动|channel:频道|publish:发布|review:评论",
  "heritage:遗产|tradition:传统|museum:博物馆|festival:节日|artwork:艺术品|custom:习俗|language:语言|identity:身份|craft:工艺|historic:有历史意义的",
  "export:出口|import:进口|border:边境|trade:贸易|global:全球的|tariff:关税|shipping:运输|partner:伙伴|exchange:交换|international:国际的",
  "hypothesis:假设|experiment:实验|sample:样本|result:结果|method:方法|observe:观察|measure:测量|data:数据|analysis:分析|researcher:研究人员",
  "parent:父母|child:孩子|sibling:兄弟姐妹|guardian:监护人|care:照顾|support:支持|family:家庭|relative:亲属|generation:一代人|relationship:关系",
  "harvest:收获|crop:农作物|soil:土壤|farm:农场|ingredient:食材|recipe:食谱|fresh:新鲜的|organic:有机的|produce:农产品|nutrition:营养",
  "destination:目的地|journey:旅程|luggage:行李|passport:护照|booking:预订|guide:导游|ticket:车票|tourist:游客|explore:探索|accommodation:住宿",
  "housing:住房|tenant:租户|rent:租金|owner:业主|neighbour:邻居|apartment:公寓|repair:修理|shared:共享的|community:社区|shelter:住所",
  "electricity:电力|fuel:燃料|solar:太阳能的|resource:资源|waste:浪费|power:能源|wind:风|battery:电池|efficient:高效的|sustainable:可持续的",
  "equality:平等|opportunity:机会|access:获得机会|inclusion:包容|barrier:障碍|change:变化|diversity:多样性|fairness:公平|support:支持|community:社区",
  "message:信息|conversation:交谈|meaning:含义|translate:翻译|speaker:说话者|listener:听者|language:语言|express:表达|clarify:澄清|communicate:交流",
  "population:人口|migration:迁移|immigrant:移民|settle:定居|urban:城市的|rural:乡村的|growth:增长|region:地区|resident:居民|movement:流动",
  "athlete:运动员|training:训练|fitness:体能|team:队伍|competition:比赛|coach:教练|active:活跃的|strength:力量|exercise:锻炼|goal:目标",
  "ocean:海洋|river:河流|coast:海岸|freshwater:淡水|marine:海洋的|wave:海浪|fishery:渔业|waterway:水道|conservation:保护|current:水流",
  "expense:支出|saving:储蓄|household:家庭|payment:付款|loan:贷款|interest:利息|budget:预算|bill:账单|account:账户|insurance:保险"
].map(s=>s.split("|").map(pair=>{const [en,zh]=pair.split(":");return [en,zh,"词汇","",""]}));
const cefrA1Vocabulary="apple:苹果|book:书|cat:猫|day:天|eat:吃|family:家庭|good:好的|home:家|I:我|job:工作|kind:友善的|like:喜欢|milk:牛奶|name:名字|open:打开|pen:笔|question:问题|read:阅读|school:学校|time:时间|use:使用|visit:参观|water:水|year:年|you:你|friend:朋友|house:房子|food:食物|happy:高兴的|small:小的|big:大的|walk:步行|write:写|speak:说|listen:听|play:玩|work:工作|teacher:老师|student:学生|table:桌子|chair:椅子|door:门|window:窗户|morning:早晨|night:夜晚|blue:蓝色的|red:红色的|green:绿色的|mother:母亲|father:父亲|sister:姐妹|brother:兄弟|city:城市|country:国家|learn:学习|help:帮助|start:开始|finish:结束|new:新的|old:旧的".split("|").map(pair=>{const [en,zh]=pair.split(":");return [en,zh,"基础词","",""]});
const educationExamples=[
  ["The school revised its curriculum this year.","这所学校今年调整了课程体系。"],
  ["She applied for a scholarship.","她申请了一项奖学金。"],
  ["The college announced its tuition fees.","学院公布了学费。"],
  ["The program helps adults improve literacy.","该项目帮助成年人提高读写能力。"],
  ["You can enrol online before Friday.","你可以在周五前在线注册入学。"],
  ["Each graduate received a certificate.","每位毕业生都拿到了一份证书。"],
  ["Please submit the assignment tomorrow.","请明天提交作业。"],
  ["The seminar starts at two o'clock.","研讨课两点开始。"],
  ["Her mentor gave useful advice.","她的导师给了有用的建议。"],
  ["This job requires a formal qualification.","这份工作要求具备正式资格。"]
];
educationExamples.forEach(([en,zh],i)=>{topicVocabulary[0][i][3]=en;topicVocabulary[0][i][4]=zh});
const a1Examples=[
  ["She eats an apple after lunch.","她午饭后吃一个苹果。"],
  ["This book is easy to read.","这本书很容易读。"],
  ["The cat sleeps on the chair.","猫睡在椅子上。"],
  ["It is a warm day.","今天是暖和的一天。"],
  ["We eat together at six.","我们六点一起吃饭。"],
  ["My family lives in Hangzhou.","我家住在杭州。"],
  ["That is a good idea.","那是一个好主意。"],
  ["I am at home now.","我现在在家。"],
  ["I like this song.","我喜欢这首歌。"],
  ["She has a new job.","她有一份新工作。"],
  ["He is kind to everyone.","他对每个人都很友善。"],
  ["They like playing outside.","他们喜欢在外面玩。"]
];
a1Examples.forEach(([en,zh],i)=>{cefrA1Vocabulary[i][3]=en;cefrA1Vocabulary[i][4]=zh});

