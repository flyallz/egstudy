import type { QuizQuestion } from "./content";

// 原站 A2 第 4 课中等档 30 题：保留题型、英文题干和选项，越南语解析译为中文。
const hint = "根据移动路径及起点和终点选介词，不能只看静止位置。";
const choice = (q: string, options: string[], answer: string, explain: string): QuizQuestion => ({
  q, options, answer: options.indexOf(answer), explain: `${explain}${hint}`, difficulty: "中等", keepChoice: true,
});
const fill = (q: string, answer: string, explain: string): QuizQuestion => ({
  q, options: [], answer: 0, answerText: answer, sentence: q.replace("___", answer).replace(/（提示：[^）]+）$/, ""), explain: `${explain}${hint}`, difficulty: "中等", kind: "blank",
});

export const A2_MOVEMENT_MEDIUM: QuizQuestion[] = [
  fill("The children ran ___ the classroom when the bell rang.（提示：进入里面）", "into", "铃响时孩子们跑进教室。into 表示从外部进入；out of 方向相反，to 只表示目的地，不明确进入内部。"),
  choice("We walked ___ the bridge to reach the station on the other side.", ["in", "into", "onto", "across"], "across", "我们穿过桥，到达对岸车站；across 表示从一边到另一边。"),
  fill("The bus drove ___ the mountain tunnel.（提示：从通道内部一端到另一端）", "through", "公交车穿过山间隧道；through 表示从空间内部穿行，有入口和出口。"),
  fill("They climbed ___ the hill to see the sunrise.（提示：从低处到高处）", "up", "他们爬上山看日出；up 表示由低到高。"),
  choice("The ball rolled ___ the stairs to the ground floor.", ["onto", "in", "down", "into"], "down", "球沿楼梯滚到一楼；down 表示向下。"),
  fill("We cycled ___ the river for five kilometres.（提示：沿道路或河流的长度方向）", "along", "我们沿河骑了五公里；along 表示顺着一条延伸的路线移动。"),
  fill("Go ___ the bakery and turn right at the next street.（提示：经过后继续向前）", "past", "走过面包店，在下一条街右转；past 表示经过某地而不停留。"),
  choice("The child jumped ___ the low platform from the floor.", ["off", "in", "onto", "into"], "onto", "孩子从地板跳到矮台上；onto 表示移动到表面上，off 是离开表面，into/in 指内部空间。"),
  fill("The birds flew ___ of the open window.（提示：从里面向外面）", "out", "鸟从打开的窗户飞出去；完整介词是 out of，空格只需 out。"),
  fill("The passengers got ___ the train at the final station.（提示：离开乘坐的交通工具）", "off", "乘客在终点站下火车；火车、公交车和飞机下车用 get off。"),
  fill("We got ___ the coach at the main bus station and found two seats near the driver.", "on", "我们在总站上了长途客车，并在司机附近找到了座位；找到座位说明已经上车，用 get on。get off 是下车。"),
  choice("The train travels ___ Hanoi to Da Nang every day.", ["into", "onto", "from", "in"], "from", "火车每天从河内开往岘港；from 指起点，与后面的 to 配对。"),
  fill("The guide walked ___ the two groups of tourists.（提示：在两组之间）", "between", "导游走在两组游客之间；between 指两个明确群体之间的位置或运动。"),
  fill("The runners moved ___ the lake before returning to the park.（提示：沿着边缘绕行）", "around", "跑步者绕湖一圈再回公园；around 表示绕着某区域移动。"),
  choice("When we saw the lighthouse in the distance, we walked ___ it.", ["into", "onto", "towards", "in"], "towards", "看到远处的灯塔后，我们朝它走去；in the distance 说明还没到，towards 只表示朝向。into 表示进入内部。"),
  fill("The horse jumped ___ the fence without touching it.", "over", "马没有碰到围栏就跃过去；over 表示从障碍物上方越过。"),
  choice("We cycled ___ a narrow tunnel and came out beside the lake.", ["over", "through", "across", "onto"], "through", "我们骑车穿过狭窄隧道，在湖边出来；through 表示进入空间内部并从另一端出来。"),
  choice("The hikers climbed ___ the hill and stopped at the summit.", ["past", "up", "into", "across"], "up", "徒步者爬上山，在山顶停下；up 表示由低到高。"),
  choice("Stay on this road, go ___ the pharmacy, then turn right at the next junction.", ["out of", "into", "past", "under"], "past", "一直走这条路，经过药房后在下个路口右转；仍在路上，没有进入药房，所以用 past。"),
  choice("The child jumped ___ the pool from the edge and started swimming.", ["into", "along", "through", "over"], "into", "孩子从池边跳进泳池开始游泳；into 表示从外面进入水中。"),
  choice("After the meeting, the guests walked ___ of the conference room.", ["up", "across", "out", "onto"], "out", "会议结束后客人走出会议室；out of 表示从室内到室外，空格填 out。"),
  choice("Nitrates leach ___ the groundwater within weeks.", ["into", "onto", "in", "on"], "into", "硝酸盐在数周内渗入地下水；into 表示进入内部。"),
  choice("The species has spread ___ the entire continent.", ["into", "in", "onto", "across"], "across", "该物种扩散到整个大陆；across 表示横跨广阔区域。"),
  choice("Sediment is carried ___ the riverbed to the delta.", ["into", "along", "onto", "in"], "along", "沉积物沿河床被带向三角洲；along 表示顺着延伸的河床移动。"),
  choice("选择正确的句子。", ["Water flows of the reservoir in the irrigation canals.", "Water flows from the reservoir in the irrigation canals to.", "Water flows out the reservoir into the irrigation canals.", "Water flows from the reservoir into the irrigation canals."], "Water flows from the reservoir into the irrigation canals.", "水从水库流进灌溉渠道；from 指来源，into 指进入渠道内部。"),
  choice("选择正确的句子。", ["Migrating birds pass through over the delta twice a year.", "Migrating birds pass above of the delta twice a year.", "Migrating birds pass over the delta twice a year.", "Migrating birds pass on the delta twice a year."], "Migrating birds pass over the delta twice a year.", "候鸟每年两次飞越三角洲；over 表示从上方经过而不接触。"),
  choice("选择正确的句子。", ["Heat moves from warmer to cooler regions of the ocean.", "Heat moves from warmer until cooler regions of the ocean.", "Heat moves between warmer to cooler regions of the ocean.", "Heat moves of warmer to cooler regions of the ocean."], "Heat moves from warmer to cooler regions of the ocean.", "热量从海洋较暖区域移向较冷区域；from…to 表示起点到终点。"),
  choice("选择正确的句子。", ["Meltwater runs of the glacier and in the valley.", "Meltwater runs off the glacier and into the valley.", "Meltwater runs off from the glacier and into to the valley.", "Meltwater runs out the glacier and into the valley."], "Meltwater runs off the glacier and into the valley.", "冰川融水从冰川表面流下并进入山谷；off 表示离开表面，into 表示进入内部。"),
  choice("选择正确的句子。", ["The pipeline runs under the river and past three villages.", "The pipeline runs under of the river and passed three villages.", "The pipeline runs under the river and by past three villages.", "The pipeline runs below of the river and pass three villages."], "The pipeline runs under the river and past three villages.", "管道从河底穿过，随后经过三个村庄；under 指下方，past 指从旁经过。"),
  choice("Warm air rises ___ through the atmosphere and cools.（提示：离开地面向上）", ["into", "up", "in", "onto"], "up", "暖空气上升，穿过大气后冷却；up 表示向高处移动。"),
];
