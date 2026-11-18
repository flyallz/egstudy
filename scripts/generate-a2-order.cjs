const fs = require('fs');
const path = require('path');
const unit = require('../reference/forumflash-a2-original.json').units[8];
const medium = [
  '博物馆外有一辆大红色公交车。大小 big 通常在颜色 red 前。',
  '她把信放在一个小木盒里。大小 small 在材质 wooden 前。',
  '姨妈买了一幅漂亮的旧画。评价 beautiful 在年代 old 前。',
  '他上周买了一台新日本相机。新旧 new 在产地 Japanese 前。',
  '经理冬天穿一件黑色长外套。长度 long 在颜色 black 前。',
  '我们坐在窗边的一张大圆桌旁。大小 large 在形状 round 前。',
  '她有一只昂贵的皮包。评价 expensive 在材质 leather 前。',
  '床下有一只小蓝箱。大小 small 在颜色 blue 前。',
  '公司搬进一座现代化玻璃楼。风格 modern 在材质 glass 前。',
  '假期中我们参观了一座古老的意大利教堂。年代 old 在产地 Italian 前。',
  '村子有一座横跨溪流的窄石桥。宽度 narrow 在材质 stone 前。',
  '老师向全班介绍一位友善的年轻科学家。评价 friendly 在年龄 young 前。',
  '他们在河边放了三个小传感器。数量 three 在大小 small 前。',
  '他穿白色棉衬衫参加面试。颜色 white 在材质 cotton 前。',
  '样本存放在大金属柜里。大小 large 在材质 metal 前。',
  '我们观看了一部有趣的城市历史纪录片。评价 interesting 在类别 historical 前。',
  '客人住在湖边一家舒适的小旅馆。评价 comfortable 在大小 small 前。',
  '博物馆展出一幅十九世纪的漂亮古画。评价 beautiful 在年代 old 前。',
  'Mai 为婚礼选了一件优雅的白色连衣裙。评价 elegant 在颜色 white 前。',
  '我在祖父的橱柜里找到一只小银表。大小 small 在材质 silver 前。',
  '商店卖韩国产的现代电风扇。modern 表示新旧或风格，在用途 electric 前。',
  '一个大型圆形沉积盆地。large 是尺寸，circular 是形状，sedimentary 是地质类别，最靠近 basin。',
  '两个小白色塑料容器。顺序是数量 two、大小 small、颜色 white、材质 plastic。',
  '一台可靠的德国旧仪器。评价 reliable 在年代 old 和产地 German 前。',
  '一条又长又窄的海岸带。长度 long 在形状 narrow 和位置 coastal 前。',
  '调查覆盖四十个小型农村社区。大小 small 在类别 rural 前。',
  '一套昂贵的新监测系统。评价 expensive 在新旧 new 和用途 monitoring 前。',
  '一些古埃及灌溉渠。顺序为数量 several、年代 ancient、来源 Egyptian、用途 irrigation。',
  '暴风雨损坏了两座大型海滨城市。数量 two 在大小 large 和位置 coastal 前。',
  '一片茂密的热带雨林树冠。dense 表示总体特征，在气候类别 tropical 前。',
];
const fresh = {
  5: '团队使用一幅现代的高分辨率卫星图像。modern 在技术特征 high-resolution 和类别 satellite 前。',
  6: '他们采集了三个深层沉积物岩芯。数量 three 在深度 deep 和类别 sediment 前。',
  8: '每根岩芯里都有一层薄薄的黑色灰烬。厚度 thin 在颜色 black 前。',
  11: '该地区位于一个巨大的地下含水层之上。大小 huge 在位置 underground 前。',
  12: '一种简单的低成本滤水器。评价 simple 在价格特征 low-cost 和用途 water 前。',
  13: '博物馆保存了一份引人注目的十九世纪降雨记录。评价 remarkable 在年代 nineteenth-century 前。',
  16: '读数来自一台旧木制测量仪。年代 old 在材质 wooden 前。',
  17: '团队在海岸实验室安装一套先进的新监测系统。评价 sophisticated 在新旧 new、用途 monitoring 前。',
  18: '报告包含两张北部地区的详细历史地图。数量 two 在评价 detailed 和类别 historical 前。',
  19: '研究人员用显微镜观察几颗微小的透明颗粒。数量 several 在大小 tiny 和外观 transparent 前。',
  20: '工程师为偏远村庄设计可靠的便携式滤水器。评价 reliable 在特性 portable、用途 water 前。',
};
function key(s) { return JSON.stringify([s.type, s.sentence || '', s.options || [], s.answer]); }
const byKey = new Map(unit.levels.medium.map((idx, i) => [key(unit.pool[idx]), medium[i]]));
function generate(level, translations) {
  const rows = unit.levels[level].map((poolIndex, i) => {
    const source = unit.pool[poolIndex];
    const explain = level === 'medium' ? translations[i] : translations[i + 1] || byKey.get(key(source));
    if (!explain) throw new Error(`${level} #${i + 1}: missing translation`);
    const q = source.sentence ? `${source.sentence}${source.cue ? `（提示：${source.cue}）` : ''}` : '选择正确选项。';
    const common = { q, explain, difficulty: level === 'medium' ? '中等' : '困难' };
    if (source.type === 'fill') return { ...common, options: [], answer: 0, answerText: source.answer, sentence: source.sentence.replace('___', source.answer), kind: 'blank' };
    return { ...common, options: source.options, answer: source.options.indexOf(source.answer), keepChoice: true };
  });
  const label = level === 'medium' ? 'Medium' : 'Hard';
  fs.writeFileSync(path.join(__dirname, `../client/src/data/currentSiteA2Order${label}.ts`), `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 9 课${level === 'medium' ? '中等' : '困难'}档 30 题；英文题目、选项、答案和顺序保留。\nexport const A2_ORDER_${level.toUpperCase()}: QuizQuestion[] = ${JSON.stringify(rows, null, 2)};\n`);
}
if (medium.length !== 30) throw new Error('Wrong medium count');
generate('medium', medium);
generate('hard', fresh);
