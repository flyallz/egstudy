// A2 第 1–13 课：词条、词性、英文例句按原站 CSV 核对；第 1–8 课音标按原站词库逐张核对，第 9–13 课音标待核。
// 释义与用法译自原站越南语字段。原站学卡顺序每次进入会重排，故这里按词库顺序存储。
export type OriginalA2Word = [string, string, string, string, string, string, string];

export const A2_FIRST_LESSON: OriginalA2Word[] = [
  ["ability", "/əˈbɪləti/", "名词", "能力；本领", "可数名词；the ability to do something = 做某事的能力", "She has the ability to learn languages fast.", "Reading ability improves with practice."],
  ["able", "/ˈeɪbl/", "形容词", "能够的；有能力的", "be able to do something = 能做某事；可用于 can 不适用的时态", "I was able to finish the work on time.", "He is able to swim across the lake."],
  ["abroad", "/əˈbrɔːd/", "副词", "在国外；到国外", "副词，前面不用介词：说 go abroad，不说 go to abroad", "My sister is studying abroad.", "They go abroad every summer."],
  ["accept", "/əkˈsept/", "动词", "接受；答应", "动词；与 refuse（拒绝）相反", "She accepted the job offer.", "Please accept my apology."],
  ["accident", "/ˈæksɪdənt/", "名词", "事故；意外事件", "可数名词；by accident = 偶然地", "There was an accident on the main road.", "I found the key by accident."],
  ["according to", "/əˈkɔːdɪŋ tuː/", "介词", "根据；按照", "复合介词，用于引用他人或其他来源的信息", "According to the map, the hotel is near here.", "According to my teacher, the test is on Friday."],
  ["achieve", "/əˈtʃiːv/", "动词", "实现；取得", "动词；常与 goal、result、success 搭配", "She achieved a high score in the exam.", "We achieved our sales target this month."],
  ["act", "/ækt/", "动词", "行动；表演", "动词；act as = 担任，起……的作用", "We must act quickly to save water.", "He acts in a popular TV series."],
  ["active", "/ˈæktɪv/", "形容词", "活跃的；积极的", "形容词；与 inactive（不活跃的）相反", "My grandmother is still very active.", "She is an active member of the club."],
  ["actually", "/ˈæktʃuəli/", "副词", "实际上；其实", "副词，用于说明事实与听者先前所想的不同", "It looks hard, but it is actually easy.", "I thought he was Korean; actually he is Japanese."],
  ["advantage", "/ədˈvɑːntɪdʒ/", "名词", "优势；有利条件", "可数名词；与 disadvantage（劣势）相反", "Living near school is a big advantage.", "Knowing English is an advantage at work."],
  ["adventure", "/ədˈventʃə/", "名词", "冒险；奇遇", "可数名词；常用 go on an adventure = 去冒险", "Our trip to the mountains was a real adventure.", "He wrote a book about his adventures at sea."],
];

export const A2_SECOND_LESSON: OriginalA2Word[] = [
  ["advertise", "/ˈædvətaɪz/", "动词", "做广告；刊登广告", "动词；advertise a product = 为产品做广告；advertise for staff = 登广告招人", "The company advertises on television.", "They advertised for a new cook."],
  ["advertisement", "/ədˈvɜːtɪsmənt/", "名词", "广告；广告内容", "可数名词，常缩写为 ad", "I saw an advertisement for cheap flights.", "The advertisement was in yesterday's newspaper."],
  ["advertising", "/ˈædvətaɪzɪŋ/", "名词", "广告活动；广告业", "不可数名词", "The shop spends a lot on advertising.", "She works in advertising."],
  ["affect", "/əˈfekt/", "动词", "影响", "及物动词，后面直接接宾语；不用 affect to", "Bad weather affects the harvest.", "The noise affects my sleep."],
  ["against", "/əˈɡenst/", "介词", "反对；与……相反；靠着", "介词；play against someone = 与某人比赛", "Our team plays against theirs on Sunday.", "He leaned his bike against the wall."],
  ["ah", "/ɑː/", "感叹词", "啊；哦", "表示恍然明白或惊讶的感叹词", "Ah, now I understand.", "Ah, that smells wonderful!"],
  ["airline", "/ˈeəlaɪn/", "名词", "航空公司", "可数名词", "The airline lost my suitcase.", "Which airline are you flying with?"],
  ["alive", "/əˈlaɪv/", "形容词", "活着的；仍在世的", "通常作表语，放在系动词后；不直接放在名词前", "The fish is still alive.", "His grandparents are both alive."],
  ["all right", "/ɔːl raɪt/", "形容词", "没事的；可以的；好的", "可作形容词或感叹词；口语中也写作 alright", "Are you all right after the fall?", "All right, I will do it."],
  ["allow", "/əˈlaʊ/", "动词", "允许", "allow somebody to do something = 允许某人做某事", "My parents allow me to stay up late on Friday.", "Smoking is not allowed here."],
  ["almost", "/ˈɔːlməʊst/", "副词", "几乎；差点", "副词，通常放在所修饰的词前面", "It is almost ten o'clock.", "I almost missed the bus."],
  ["alone", "/əˈləʊn/", "形容词", "独自的；独自地", "可作形容词或副词，通常放在动词后面", "She lives alone in a small flat.", "I do not like eating alone."],
  ["along", "/əˈlɒŋ/", "介词", "沿着", "介词，表示沿着某物的长度方向移动", "We walked along the river.", "There are shops along this street."],
];

export const A2_THIRD_LESSON: OriginalA2Word[] = [
  ["already", "/ɔːlˈredi/", "副词", "已经", "副词，常放在句中，多用于完成时", "I have already eaten lunch.", "The film had already started when we arrived."],
  ["alternative", "/ɔːlˈtɜːnətɪv/", "名词", "替代选择；其他办法", "可数名词；an alternative to something = 某物的替代品", "Tea is a good alternative to coffee.", "We had no alternative but to wait."],
  ["although", "/ɔːlˈðəʊ/", "连词", "虽然；尽管", "连词，连接意思相对的两个分句；语气较正式", "Although it was raining, we went out.", "She passed the exam although she was ill."],
  ["among", "/əˈmʌŋ/", "介词", "在……之中", "介词，通常用于三个或更多的人或物；两者之间常用 between", "He was sitting among his friends.", "The house stands among tall trees."],
  ["amount", "/əˈmaʊnt/", "名词", "数量；数额", "可数名词，常与不可数名词连用：an amount of water", "A large amount of money was spent.", "Add a small amount of salt."],
  ["ancient", "/ˈeɪnʃənt/", "形容词", "古代的；古老的", "形容久远年代的文明或建筑", "We visited an ancient temple.", "Ancient Egypt had great builders."],
  ["ankle", "/ˈæŋkl/", "名词", "脚踝；踝关节", "可数名词，人体部位", "I hurt my ankle while running.", "She wears a silver chain around her ankle."],
  ["any more", "/ˈeni mɔː/", "副词", "再；不再（用于否定句）", "常放在否定句末；也写作 anymore", "I do not live there any more.", "He does not play football any more."],
  ["anybody", "/ˈenibɒdi/", "代词", "任何人；有人", "常用于疑问句和否定句，口语常见", "Did anybody call me?", "There was not anybody in the room."],
  ["anyway", "/ˈeniweɪ/", "副词", "反正；无论如何", "转折或转换话题时常放在句首或句末", "It was raining, but we went anyway.", "Anyway, let's talk about something else."],
  ["anywhere", "/ˈeniweə/", "副词", "任何地方；某处", "常用于疑问句和否定句", "I cannot find my glasses anywhere.", "Did you go anywhere last weekend?"],
  ["app", "/æp/", "名词", "手机应用；应用程序", "可数名词，application 的简称", "I downloaded a new weather app.", "This app helps me learn new words."],
  ["appear", "/əˈpɪə/", "动词", "出现；似乎", "与 disappear（消失）相反", "A man appeared at the door.", "She appears to be tired."],
];

export const A2_FOURTH_LESSON: OriginalA2Word[] = [
  ["appearance", "/əˈpɪərəns/", "名词", "外貌；出现", "名词，常用于谈论外表", "He cares a lot about his appearance.", "Her appearance on stage surprised everyone."],
  ["apply", "/əˈplaɪ/", "动词", "申请；适用", "apply for a job = 申请工作；apply to a school = 申请学校", "She applied for a job at the bank.", "This rule applies to everyone."],
  ["architect", "/ˈɑːkɪtekt/", "名词", "建筑师", "指设计建筑物的人", "The architect designed a glass building.", "My cousin trained as an architect."],
  ["architecture", "/ˈɑːkɪtektʃə/", "名词", "建筑学；建筑风格", "不可数名词，指建筑学科或建筑风格", "I love the architecture of this old town.", "She studies architecture at university."],
  ["argue", "/ˈɑːɡjuː/", "动词", "争论；论证", "argue with somebody about something = 与某人争论某事", "They often argue about money.", "He argued that the plan was too expensive."],
  ["argument", "/ˈɑːɡjumənt/", "名词", "争论；论点", "可数名词；have an argument with somebody = 与某人争吵", "We had an argument about the bill.", "His argument did not convince me."],
  ["army", "/ˈɑːmi/", "名词", "军队；陆军", "可数名词；join the army = 参军", "Her brother is in the army.", "The army helped after the flood."],
  ["arrange", "/əˈreɪndʒ/", "动词", "安排；整理", "arrange a meeting = 安排会议；arrange flowers = 插花", "I arranged a meeting with my teacher.", "She arranged the books by colour."],
  ["arrangement", "/əˈreɪndʒmənt/", "名词", "安排；布置；约定", "可数名词；make arrangements for something = 为某事作安排", "We made arrangements for the trip.", "The seating arrangement was changed."],
  ["asleep", "/əˈsliːp/", "形容词", "睡着的", "通常放在动词后；fall asleep = 入睡", "The baby is asleep upstairs.", "I fell asleep during the film."],
  ["assistant", "/əˈsɪstənt/", "名词", "助理；助手", "指协助工作的人；shop assistant = 店员", "The shop assistant helped me choose a shirt.", "She works as an assistant in a law office."],
  ["athlete", "/ˈæθliːt/", "名词", "运动员", "参加体育比赛的人", "The athlete won two gold medals.", "Athletes train every day."],
  ["attack", "/əˈtæk/", "名词", "袭击；（疾病）发作", "可数名词；a heart attack = 心脏病发作", "The attack happened at night.", "He had a heart attack last year."],
];

export const A2_FIFTH_LESSON: OriginalA2Word[] = [
  ["attend", "/əˈtend/", "动词", "出席；参加（课程）", "比 go to 正式；attend a meeting = 出席会议", "All students must attend the lecture.", "She attends church every Sunday."],
  ["attention", "/əˈtenʃn/", "名词", "注意；关注", "不可数名词；pay attention to something = 注意某事", "Pay attention to the road signs.", "The news got a lot of attention."],
  ["attractive", "/əˈtræktɪv/", "形容词", "有吸引力的；好看的", "可描述人、物或提议", "She has an attractive smile.", "The offer sounds attractive."],
  ["audience", "/ˈɔːdiəns/", "名词", "观众；听众", "可数的集合名词", "The audience clapped for a long time.", "He spoke to an audience of students."],
  ["audio", "/ˈɔːdiəʊ/", "名词", "音频；录音", "不可数名词；也可作形容词，如 audio file = 音频文件", "The audio is not clear in this video.", "Listen to the audio and answer the questions."],
  ["author", "/ˈɔːθə/", "名词", "作者", "指写书的人", "Who is the author of this book?", "The author signed my copy."],
  ["available", "/əˈveɪləbl/", "形容词", "可获得的；有空的", "可用于商品、座位或人的时间", "Tickets are still available.", "Is the doctor available this morning?"],
  ["average", "/ˈævərɪdʒ/", "形容词", "平均的；普通的", "on average = 平均而言", "The average price is ten dollars.", "He is of average height."],
  ["avoid", "/əˈvɔɪd/", "动词", "避免", "后接名词或动词 -ing 形式，不接 to do", "I avoid driving in the rush hour.", "She avoided the question."],
  ["award", "/əˈwɔːd/", "名词", "奖；奖项", "可数名词；win an award = 获奖", "The film won three awards.", "She received an award for her research."],
  ["awful", "/ˈɔːfl/", "形容词", "糟糕的；可怕的", "表示非常差", "The weather was awful all week.", "That soup tastes awful."],
  ["background", "/ˈbækɡraʊnd/", "名词", "背景；经历", "可数名词；in the background = 在后面／背景中", "There are mountains in the background of the photo.", "She comes from a musical background."],
  ["badly", "/ˈbædli/", "副词", "糟糕地；严重地", "bad 的副词；badly hurt = 伤得很重", "He sings badly but enjoys it.", "She was badly hurt in the accident."],
  ["baseball", "/ˈbeɪsbɔːl/", "名词", "棒球", "指这项运动时通常不可数", "They play baseball every Saturday.", "Baseball is popular in Japan."],
];

export const A2_SIXTH_LESSON: OriginalA2Word[] = [
  ["based", "/beɪst/", "形容词", "设在……的；基于……的", "be based in a place = 设在某地；be based on something = 基于某事", "The company is based in Hanoi.", "The film is based on a true story."],
  ["basketball", "/ˈbɑːskɪtbɔːl/", "名词", "篮球", "指这项运动时通常不可数", "My brother plays basketball at school.", "We watched a basketball game last night."],
  ["bean", "/biːn/", "名词", "豆；豆子", "可数名词；coffee beans = 咖啡豆", "She cooked rice and beans.", "Coffee beans are roasted before grinding."],
  ["bear", "/beə/", "名词", "熊", "可数名词，指一种动物", "We saw a brown bear in the forest.", "Bears sleep through the winter."],
  ["beef", "/biːf/", "名词", "牛肉", "不可数名词", "I ordered beef with rice.", "This soup is made with beef."],
  ["behave", "/bɪˈheɪv/", "动词", "表现；举止", "behave well/badly = 表现好／不好", "The children behaved well at the party.", "He behaved as if nothing had happened."],
  ["behaviour", "/bɪˈheɪvjə/", "名词", "行为；举止", "不可数名词；美式拼写为 behavior", "His behaviour in class has improved.", "Scientists study animal behaviour."],
  ["belong", "/bɪˈlɒŋ/", "动词", "属于", "belong to somebody = 属于某人", "This bag belongs to me.", "She belongs to a reading club."],
  ["belt", "/belt/", "名词", "腰带；安全带", "可数名词；seat belt = 安全带", "He wears a leather belt.", "Fasten your seat belt, please."],
  ["benefit", "/ˈbenɪfɪt/", "名词", "好处；益处", "可数名词；the benefits of something = 某事的好处", "Exercise has many health benefits.", "The main benefit is lower cost."],
  ["billion", "/ˈbɪljən/", "数词", "十亿", "数字 1,000,000,000", "The country has a billion people.", "The company lost two billion dollars."],
  ["bin", "/bɪn/", "名词", "垃圾桶", "可数名词，英式用法；美式常说 trash can", "Put the paper in the bin.", "The bin is full again."],
  ["biology", "/baɪˈɒlədʒi/", "名词", "生物学", "学科名称，不可数", "Biology is my favourite subject.", "She teaches biology at a high school."],
  ["birth", "/bɜːθ/", "名词", "出生；分娩", "give birth to = 生下", "The date of birth is on the form.", "She gave birth to a healthy boy."],
];

export const A2_SEVENTH_LESSON: OriginalA2Word[] = [
  ["biscuit", "/ˈbɪskɪt/", "名词", "饼干", "可数名词；英式英语用 biscuit，美式英语常用 cookie", "Would you like a biscuit with your tea?", "He ate three biscuits."],
  ["bit", "/bɪt/", "名词", "一点；一小块", "名词；a bit 表示一点儿", "I am a bit tired today.", "There is still a bit of bread left."],
  ["blood", "/blʌd/", "名词", "血；血液", "不可数名词", "He lost a lot of blood.", "The doctor took a blood sample."],
  ["blow", "/bləʊ/", "动词", "吹；吹动", "不规则动词：blow—blew—blown", "The wind blew all night.", "She blew out the candles."],
  ["board", "/bɔːd/", "名词", "板；委员会；董事会", "可数名词；on board 表示在船、飞机等交通工具上", "The teacher wrote on the board.", "The board met to discuss the budget."],
  ["boil", "/bɔɪl/", "动词", "煮沸；水煮", "动词；常说 boil water、boil eggs", "Boil the water for five minutes.", "She boiled two eggs for breakfast."],
  ["bone", "/bəʊn/", "名词", "骨头；骨骼", "可数名词", "He broke a bone in his arm.", "The dog is chewing a bone."],
  ["borrow", "/ˈbɒrəʊ/", "动词", "借入；借用", "borrow something from somebody = 向某人借某物；与 lend 相对", "Can I borrow your pen?", "She borrowed two books from the library."],
  ["boss", "/bɒs/", "名词", "老板；上司", "指管理他人的人", "My boss is very friendly.", "I asked my boss for a day off."],
  ["bottom", "/ˈbɒtəm/", "名词", "底部；最下端", "at the bottom of = 在……底部；与 top 相对", "Sign your name at the bottom of the page.", "The keys were at the bottom of my bag."],
  ["bowl", "/bəʊl/", "名词", "碗；钵", "可数名词", "She ate a bowl of soup.", "Put the fruit in the bowl."],
  ["brain", "/breɪn/", "名词", "大脑；头脑", "可数名词", "The brain needs rest to work well.", "He has a sharp brain for numbers."],
  ["bridge", "/brɪdʒ/", "名词", "桥", "可数名词；cross a bridge = 过桥", "We walked across the old bridge.", "The new bridge opened last month."],
  ["bright", "/braɪt/", "形容词", "明亮的；聪明的", "形容词；可说 bright colours、a bright student", "The room is bright in the morning.", "She is a bright student."],
  ["brilliant", "/ˈbrɪliənt/", "形容词", "绝妙的；杰出的", "英式英语中常用于强烈称赞", "That was a brilliant idea.", "He is a brilliant pianist."],
];

export const A2_EIGHTH_LESSON: OriginalA2Word[] = [
  ["broken", "/ˈbrəʊkən/", "形容词", "坏掉的；断裂的", "break 的过去分词，也可作形容词", "The window is broken.", "She has a broken leg."],
  ["brush", "/brʌʃ/", "动词", "刷；梳理", "brush your teeth = 刷牙；brush your hair = 梳头", "Brush your teeth before bed.", "She brushed her hair quickly."],
  ["burn", "/bɜːn/", "动词", "燃烧；烧伤；烫伤", "过去式和过去分词可用 burned 或 burnt", "The fire burned all night.", "I burned my hand on the pan."],
  ["businessman", "/ˈbɪznəsmæn/", "名词", "商人；男企业家", "指男性商人；复数为 businessmen", "The businessman travels every week.", "He became a successful businessman."],
  ["button", "/ˈbʌtn/", "名词", "按钮；纽扣", "可数名词；press a button = 按按钮", "Press this button to start.", "A button came off my shirt."],
  ["camp", "/kæmp/", "名词", "营地；露营地", "可数名词；summer camp = 夏令营", "We set up camp near the river.", "She goes to summer camp every year."],
  ["camping", "/ˈkæmpɪŋ/", "名词", "露营；野营", "不可数名词；go camping = 去露营", "We go camping every summer.", "Camping in the rain is no fun."],
  ["care", "/keə/", "动词", "关心；在意", "care about something = 关心某事", "She cares about the environment.", "I do not care what they say."],
  ["careful", "/ˈkeəfl/", "形容词", "小心的；仔细的", "be careful with something = 小心对待某物", "Be careful with that hot pan.", "He is a careful driver."],
  ["carefully", "/ˈkeəfəli/", "副词", "小心地；仔细地", "careful 的副词形式", "Read the question carefully.", "She carried the glass carefully."],
  ["carpet", "/ˈkɑːpɪt/", "名词", "地毯", "可数名词", "There is a red carpet in the hall.", "We cleaned the carpet yesterday."],
  ["cartoon", "/kɑːˈtuːn/", "名词", "动画片；漫画", "可数名词", "Children love watching cartoons.", "The newspaper printed a funny cartoon."],
  ["case", "/keɪs/", "名词", "情况；案件", "可数名词；in that case = 如果是那样", "In that case, we should leave early.", "The police are working on the case."],
  ["cash", "/kæʃ/", "名词", "现金", "不可数名词；pay in cash = 用现金支付", "I paid in cash.", "Do you have any cash with you?"],
  ["castle", "/ˈkɑːsl/", "名词", "城堡", "可数名词；字母 t 不发音", "We visited an old castle in Scotland.", "The castle stands on a hill."],
];

// 第 9 课英文内容对照原站 CSV；音标采用通用英式读法，尚待原站词卡逐张核对。
export const A2_NINTH_LESSON: OriginalA2Word[] = [
  ["catch", "/kætʃ/", "动词", "接住；抓住；赶上（车等）", "不规则动词：catch–caught–caught；catch a train = 赶上火车", "He caught the ball with one hand.", "I need to catch the seven o'clock train."],
  ["cause", "/kɔːz/", "动词", "导致；引起", "及物动词；cause a problem / an accident = 引起问题／事故", "Heavy rain caused the flood.", "Smoking causes serious illness."],
  ["celebrate", "/ˈselɪbreɪt/", "动词", "庆祝；纪念", "celebrate a birthday / a victory = 庆祝生日／胜利", "We celebrated her birthday at home.", "The city celebrates its founding every year."],
  ["celebrity", "/səˈlebrəti/", "名词", "名人；知名人士", "可数名词；复数为 celebrities", "A celebrity opened the new shop.", "She became a celebrity after the film."],
  ["certain", "/ˈsɜːtn/", "形容词", "确信的；某个特定的", "be certain that = 确信……；a certain person = 某个人", "I am certain that he will come.", "A certain student asked about it."],
  ["certainly", "/ˈsɜːtnli/", "副词", "当然；肯定", "副词，也可用于礼貌地表示同意", "She is certainly the best player.", "Certainly, I will help you."],
  ["chance", "/tʃɑːns/", "名词", "机会；可能性", "可数名词；have a chance to do something = 有机会做某事", "This is your last chance.", "There is a good chance of rain."],
  ["character", "/ˈkærəktə/", "名词", "人物；角色；性格", "可数名词；可指故事人物或人的性格", "My favourite character dies in the book.", "She has a strong character."],
  ["charity", "/ˈtʃærəti/", "名词", "慈善机构；慈善事业", "名词；指慈善机构时复数为 charities", "The money went to a children's charity.", "They collect clothes for charity."],
  ["chat", "/tʃæt/", "动词", "聊天；闲谈", "chat with somebody about something = 与某人聊某事", "We chatted for an hour.", "She chats online with her cousins."],
  ["chef", "/ʃef/", "名词", "厨师；主厨", "指专业厨师；发音为 /ʃef/", "The chef cooked a special dish for us.", "He trained as a chef in Paris."],
  ["chemistry", "/ˈkemɪstri/", "名词", "化学", "学科名，不可数", "Chemistry is harder than biology for me.", "We did an experiment in chemistry class."],
  ["chip", "/tʃɪp/", "名词", "薯条；芯片", "可数名词；fish and chips = 英式炸鱼薯条", "We had fish and chips for dinner.", "The phone has a very small chip inside."],
  ["choice", "/tʃɔɪs/", "名词", "选择；选择权", "make a choice = 做选择；have no choice = 别无选择", "You have to make a choice now.", "We had no choice but to wait."],
  ["church", "/tʃɜːtʃ/", "名词", "教堂", "可数名词；go to church = 去教堂做礼拜", "The old church is near the square.", "They go to church on Sunday."],
];

// 第 10 课英文内容对照原站 CSV；音标采用通用英式读法，尚待原站词卡逐张核对。
export const A2_TENTH_LESSON: OriginalA2Word[] = [
  ["cigarette", "/ˌsɪɡəˈret/", "名词", "一支香烟；卷烟", "可数名词；复数为 cigarettes", "He smokes ten cigarettes a day.", "She put out her cigarette."],
  ["circle", "/ˈsɜːkl/", "名词", "圆；圆圈", "可数名词；sit in a circle = 围坐成一圈", "Draw a circle on the paper.", "The children sat in a circle."],
  ["classical", "/ˈklæsɪkl/", "形容词", "古典的；经典的", "classical music = 古典音乐", "She listens to classical music.", "He studies classical literature."],
  ["clear", "/klɪə/", "形容词", "清楚的；清澈的", "make something clear = 把某事讲清楚", "The instructions are clear.", "The water in the lake is clear."],
  ["clearly", "/ˈklɪəli/", "副词", "清楚地；显然", "clear 的副词形式", "Please speak more clearly.", "He clearly did not understand."],
  ["clever", "/ˈklevə/", "形容词", "聪明的；机灵的", "英式英语较常用，近义词为 smart", "She is clever at solving puzzles.", "That was a clever answer."],
  ["climate", "/ˈklaɪmət/", "名词", "气候", "气候指一地长期天气状况，区别于每天的 weather", "The climate here is hot and wet.", "Climate change affects farming."],
  ["closed", "/kləʊzd/", "形容词", "关闭的；歇业的", "与 open 相反", "The shop is closed on Mondays.", "Keep the door closed."],
  ["clothing", "/ˈkləʊðɪŋ/", "名词", "衣物；服装（统称）", "不可数名词；比 clothes 更正式", "Bring warm clothing for the trip.", "The shop sells children's clothing."],
  ["cloud", "/klaʊd/", "名词", "云；云朵", "可数名词；复数为 clouds", "There is not a cloud in the sky.", "Dark clouds mean rain is coming."],
  ["coach", "/kəʊtʃ/", "名词", "教练；长途客车", "可数名词；依上下文表示人或交通工具", "The coach trains the team every day.", "We took a coach to the airport."],
  ["coast", "/kəʊst/", "名词", "海岸；沿海地区", "可数名词；on the coast = 在海岸边", "They live on the east coast.", "We drove along the coast."],
  ["code", "/kəʊd/", "名词", "代码；密码；编码", "可数名词；postal code = 邮政编码", "Enter your code to open the door.", "Write the postal code on the letter."],
  ["colleague", "/ˈkɒliːɡ/", "名词", "同事", "指在同一单位工作的人", "My colleague helped me finish the report.", "She invited her colleagues to dinner."],
  ["collect", "/kəˈlekt/", "动词", "收集；收藏；接（人）", "collect stamps = 集邮；collect a child from school = 去学校接孩子", "He collects old coins.", "I collect my son from school at four."],
  ["column", "/ˈkɒləm/", "名词", "栏；列；柱子；专栏", "可数名词；可指表格的一列或报刊专栏", "Write the numbers in the first column.", "She writes a weekly column for the paper."],
];

// 第 11 课英文内容对照原站 CSV；音标采用通用英式读法，尚待原站词卡逐张核对。
export const A2_ELEVENTH_LESSON: OriginalA2Word[] = [
  ["comedy", "/ˈkɒmədi/", "名词", "喜剧；喜剧作品", "名词；作喜剧作品时可数，复数为 comedies", "We watched a comedy last night.", "He prefers comedy to horror."],
  ["comfortable", "/ˈkʌmftəbl/", "形容词", "舒适的；自在的", "可形容椅子、床、衣物，也可描述人的感觉", "This chair is very comfortable.", "I feel comfortable in this class."],
  ["comment", "/ˈkɒment/", "名词", "评论；意见", "可数名词；make a comment on something = 对某事发表评论", "She made a helpful comment.", "There were many comments under the post."],
  ["communicate", "/kəˈmjuːnɪkeɪt/", "动词", "交流；传达", "communicate with somebody = 与某人交流", "We communicate by email.", "Babies communicate by crying."],
  ["community", "/kəˈmjuːnəti/", "名词", "社区；群体", "名词；复数为 communities", "The whole community helped after the storm.", "She works with a farming community."],
  ["compete", "/kəmˈpiːt/", "动词", "竞争；参加比赛", "compete with somebody for something = 与某人竞争某物", "Small shops compete with supermarkets.", "She competes in swimming races."],
  ["competition", "/ˌkɒmpəˈtɪʃn/", "名词", "比赛；竞争", "作“比赛”时可数；enter a competition = 参加比赛", "He won a singing competition.", "There is strong competition between the two shops."],
  ["complain", "/kəmˈpleɪn/", "动词", "抱怨；投诉", "complain about something to somebody = 向某人抱怨某事", "She complained about the noise.", "He complained to the manager."],
  ["completely", "/kəmˈpliːtli/", "副词", "完全地；彻底地", "程度副词，表示完整或彻底", "I completely forgot the meeting.", "The room is completely empty."],
  ["condition", "/kənˈdɪʃn/", "名词", "状态；条件", "in good condition = 状况良好；on one condition = 有一个条件", "The car is in good condition.", "You can go on one condition."],
  ["conference", "/ˈkɒnfərəns/", "名词", "会议；研讨会", "可数名词；attend a conference = 参加会议", "She spoke at a medical conference.", "The conference lasts three days."],
  ["connect", "/kəˈnekt/", "动词", "连接；联系", "connect A to B = 把 A 连接到 B", "Connect the printer to the computer.", "This road connects the two towns."],
  ["connected", "/kəˈnektɪd/", "形容词", "连接的；有关联的", "be connected to something = 与某物相连／有关", "My phone is not connected to the wifi.", "The two cases are connected."],
  ["consider", "/kənˈsɪdə/", "动词", "考虑；斟酌", "后接名词或动名词 V-ing", "We are considering moving house.", "Please consider my offer."],
  ["contain", "/kənˈteɪn/", "动词", "含有；装有", "通常不用于进行时", "This drink contains a lot of sugar.", "The box contains old photos."],
  ["context", "/ˈkɒntekst/", "名词", "语境；背景", "in context = 放在上下文中", "Guess the meaning from the context.", "The quote makes sense in context."],
];

// 第 12 课英文内容对照原站 CSV；音标采用通用英式读法，尚待原站词卡逐张核对。
export const A2_TWELFTH_LESSON: OriginalA2Word[] = [
  ["continent", "/ˈkɒntɪnənt/", "名词", "洲；大陆", "可数名词；世界有七大洲", "Africa is a large continent.", "She has visited four continents."],
  ["continue", "/kənˈtɪnjuː/", "动词", "继续；持续", "后可接 to do 或 V-ing", "The rain continued all day.", "He continued working after dinner."],
  ["control", "/kənˈtrəʊl/", "动词", "控制；操纵", "control a car = 驾驭汽车；control your temper = 控制脾气", "She controls the whole department.", "He could not control his anger."],
  ["cooker", "/ˈkʊkə/", "名词", "炉灶；炊具", "英式英语，可数；做饭的人是 cook", "We bought a new gas cooker.", "The cooker is not working."],
  ["copy", "/ˈkɒpi/", "名词", "副本；一份；册", "可数名词；复数为 copies", "Please make a copy of this page.", "The book sold a million copies."],
  ["corner", "/ˈkɔːnə/", "名词", "角；街角", "可数名词；on the corner = 在街角；in the corner = 在室内角落", "The shop is on the corner of the street.", "A plant stands in the corner of the room."],
  ["correctly", "/kəˈrektli/", "副词", "正确地；准确地", "correct 的副词形式", "She answered every question correctly.", "Spell your name correctly on the form."],
  ["count", "/kaʊnt/", "动词", "数数；计数；算数", "count to ten = 数到十；count 也可表示“有意义”", "The child can count to twenty.", "Every point counts in this game."],
  ["couple", "/ˈkʌpl/", "名词", "一对；一双；两三个", "可数名词；a couple of = 两个或几个", "The couple got married last year.", "I need a couple of days to finish."],
  ["crazy", "/ˈkreɪzi/", "形容词", "疯狂的；荒唐的；着迷的", "口语常见；be crazy about = 对……非常着迷", "That is a crazy idea.", "She is crazy about football."],
  ["creative", "/kriˈeɪtɪv/", "形容词", "有创造力的；富有创意的", "a creative person = 有创造力的人；creative work = 创意工作", "He is very creative with words.", "The job needs creative thinking."],
  ["credit", "/ˈkredɪt/", "名词", "信用；赞誉；功劳", "credit card = 信用卡；get credit for = 因……获得认可", "I paid by credit card.", "She got credit for the idea."],
  ["crime", "/kraɪm/", "名词", "犯罪；罪行", "commit a crime = 犯罪；可指犯罪现象或具体罪行", "Crime has fallen in this area.", "Stealing is a crime."],
  ["criminal", "/ˈkrɪmɪnl/", "名词", "罪犯；犯罪者", "指犯罪的人，可数名词", "The criminal was caught at the border.", "Criminals often work at night."],
  ["cross", "/krɒs/", "动词", "穿过；横越", "cross the road / river = 过马路／河", "Look both ways before you cross the road.", "We crossed the river by boat."],
  ["crowd", "/kraʊd/", "名词", "人群；一群人", "可数名词；a crowd = 一群人", "A crowd gathered outside the stadium.", "He disappeared into the crowd."],
  ["crowded", "/ˈkraʊdɪd/", "形容词", "拥挤的；人多的", "描述场所或交通工具里人很多", "The bus was crowded this morning.", "I avoid crowded places."],
];

// 第 13 课英文内容对照原站 CSV；音标采用通用英式读法，尚待原站词卡逐张核对。
export const A2_THIRTEENTH_LESSON: OriginalA2Word[] = [
  ["cry", "/kraɪ/", "动词", "哭；大声喊叫", "cry about something = 因某事哭泣", "The baby cried all night.", "She cried when she heard the news."],
  ["cupboard", "/ˈkʌbəd/", "名词", "橱柜；储物柜", "可数名词；字母 p 不发音", "The plates are in the cupboard.", "She opened the kitchen cupboard."],
  ["curly", "/ˈkɜːli/", "形容词", "卷曲的；鬈曲的", "常形容头发；反义词 straight", "She has long curly hair.", "My hair goes curly in the rain."],
  ["cycle", "/ˈsaɪkl/", "动词", "骑自行车", "英式英语常用；美式英语也说 ride a bike", "I cycle to work every day.", "They cycled around the lake."],
  ["daily", "/ˈdeɪli/", "形容词", "每日的；每天的", "a daily newspaper = 日报", "She takes a daily walk.", "This is a daily newspaper."],
  ["danger", "/ˈdeɪndʒə/", "名词", "危险；危险因素", "in danger = 处于危险中；a danger of fire = 火灾隐患", "The driver was in danger.", "There is a danger of fire here."],
  ["data", "/ˈdeɪtə/", "名词", "数据；资料", "现代英语中常作不可数名词；原站例句用 The data shows", "The data shows a clear trend.", "We collect data from every school."],
  ["dead", "/ded/", "形容词", "死的；没电的", "反义词 alive；也可形容电池耗尽", "The plant is dead.", "My phone battery is dead."],
  ["deal", "/diːl/", "动词", "处理；应对", "deal with something = 处理某事", "I will deal with this problem today.", "She deals with customers every day."],
  ["death", "/deθ/", "名词", "死亡；去世", "反义词 birth；指具体死亡事件时可数", "His death shocked the whole village.", "The number of deaths fell last year."],
  ["decision", "/dɪˈsɪʒn/", "名词", "决定；抉择", "可数名词；make a decision = 作决定", "It was a hard decision.", "We must make a decision today."],
  ["deep", "/diːp/", "形容词", "深的；深沉的", "反义词 shallow；take a deep breath = 深吸一口气", "The river is very deep here.", "She took a deep breath."],
  ["definitely", "/ˈdefɪnətli/", "副词", "肯定；确实；一定", "表示很强的肯定语气", "I will definitely come to your party.", "That is definitely the right answer."],
  ["degree", "/dɪˈɡriː/", "名词", "学位；度", "可数名词；a degree in something = 某学科的学位", "She has a degree in history.", "Water boils at a hundred degrees."],
  ["dentist", "/ˈdentɪst/", "名词", "牙医", "指人；go to the dentist = 去看牙医", "I go to the dentist twice a year.", "The dentist checked my teeth."],
  ["department", "/dɪˈpɑːtmənt/", "名词", "部门；院系", "可数名词；department store = 百货商店", "She works in the sales department.", "The history department is on the first floor."],
  ["depend", "/dɪˈpend/", "动词", "取决于；依靠", "depend on something/somebody = 取决于某事／依靠某人", "The price depends on the size.", "You can depend on her."],
];
