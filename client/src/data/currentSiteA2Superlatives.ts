import type { GrammarLesson, QuizQuestion } from "./content";
import { A2_SUPERLATIVES_MEDIUM } from "./currentSiteA2SuperlativesMedium";
import { A2_SUPERLATIVES_HARD } from "./currentSiteA2SuperlativesHard";

// 原站 A2 第 11 课理论与简单档题目按公开课程数据核对；原英文选项和答案保留。
const original = [
  ["选出 beautiful 的最高级。", "the most beautiful", "beautiful 有三个音节，最高级用 the most beautiful。"],
  ["选出正确句子。", "He is the older of the two brothers.", "只有两兄弟，用比较级 older，而非最高级。"],
  ["选出正确句子。", "This is the tallest building.", "tallest 已是最高级，前面不能再加 most。"],
  ["选出 tall 的最高级。", "the tallest", "tall 是单音节，最高级加 -est，前面用 the。"],
  ["选出 bad 的最高级。", "the worst", "bad 的不规则最高级是 the worst。"],
  ["选出表示最低程度的短语。", "the least expensive", "多音节形容词表示最低程度可用 the least。"],
  ["He is the oldest ___ the three brothers.", "of", "三兄弟中年龄最大的一个。比较对象是明确的集合，用 of。"],
  ["将“这是城里最高的建筑”译成英语。", "This is the tallest building in the city.", "tall 加 -est，地点范围用 in the city。"],
  ["按给定的假设排名，选出正确句子。", "Hue is smaller than Hanoi, and Hanoi is the biggest city in the north.", "前半句比较两座城市，用 smaller than；后半句在一个地区内排名，用 the biggest。"],
  ["将“她是我们班最好的学生”译成英语。", "She is the best student in our class.", "good 的最高级是 the best；班级范围用 in。"],
  ["将“星期一是一周中最忙的一天”译成英语。", "Monday is the busiest day of the week.", "busy 改 y 为 i 再加 -est；一周中的一天用 of the week。"],
  ["将“那是我吃过最糟的一餐”译成英语。", "That was the worst meal I have ever eaten.", "bad 的最高级是 worst；ever 与现在完成时表示截至现在的经历。"],
  ["按给定的假设排名，选出正确句子。", "Da Nang is the third largest city in Vietnam.", "序数词 third 放在 the 与最高级 largest 之间。"],
  ["选出正确句子。", "The Nile is the longest river in Africa.", "河流名称 The Nile 与最高级 the longest 都需要 the。"],
  ["That was ___ film I have ever seen.", "the best", "good 的不规则最高级是 the best。"],
  ["将“下龙湾是越南最美的地方之一”译成英语。", "Ha Long Bay is one of the most beautiful places in Vietnam.", "one of the most 后接复数名词 places。"],
  ["This is ___ room in the house.（small）", "the smallest", "small 是短形容词，最高级为 the smallest。"],
  ["June was ___ month of the year for me.（busy）", "the busiest", "busy 改 y 为 i，再加 -est。"],
  ["Of these four bags, the blue one is ___.（light）", "the lightest", "四件物品中选出最轻的一件，用 the lightest。"],
  ["This was ___ meal of my holiday.（good）", "the best", "good 的不规则最高级是 the best。"],
] as const;

// 选项顺序保留原站；题目答案与上方中文解释逐项对应。
const originalSource: string[][] = [
  ["the beautifulest", "the most beautiful", "most beautiful", "the more beautiful"],
  ["He is older the two brothers.", "He is the most old of the two brothers.", "He is the oldest of the two brothers.", "He is the older of the two brothers."],
  ["This is the tallest building.", "This are the tallest building.", "This it is the tallest building.", "This is the most tallest building."],
  ["the tallest", "the most tall", "the tallest most", "taller"],
  ["the worse", "the baddest", "the worst", "the most bad"],
  ["the less expensive", "the least expensive", "the most cheap", "the leastest expensive"],
  ["in", "of", "at", "from"],
  ["This are the tallest building in the city.", "This it is the tallest building in the city.", "This the tallest building in the city.", "This is the tallest building in the city."],
  ["Hue is smaller than Hanoi, and Hanoi is the biggest city in the north.", "Hue is more small than Hanoi, and Hanoi is the most big city in the north.", "Hue is smaller that Hanoi, and Hanoi is the bigger city in the north.", "Hue is smallest than Hanoi, and Hanoi is biggest city in the north."],
  ["She are the best student in our class.", "She in our class is the best student.", "She the best student in our class.", "She is the best student in our class."],
  ["Monday is the busiest day of the week.", "Monday it is the busiest day of the week.", "Monday the busiest day of the week.", "Monday are the busiest day of the week."],
  ["That were the worst meal I have ever eaten.", "That was the worst meal I have ever eaten.", "That was the worst meal I has ever eaten.", "That it was the worst meal I have ever eaten."],
  ["Da Nang are the third largest city in Vietnam.", "Da Nang is the third largest city in Vietnam.", "Da Nang it is the third largest city in Vietnam.", "Da Nang the third largest city in Vietnam."],
  ["Nile is longest river in Africa.", "The Nile is the longest river in Africa.", "The Nile are the longest river in Africa.", "The Nile it is the longest river in Africa."],
  ["the goodest", "the better", "the most good", "the best"],
  ["Ha Long Bay is one of the most beautiful places in Vietnam.", "Ha Long Bay it is one of the most beautiful places in Vietnam.", "Ha Long Bay one of the most beautiful places in Vietnam.", "Ha Long Bay are one of the most beautiful places in Vietnam."],
  ["the smallest", "the smaller", "smaller", "most small"],
  ["busiest more", "the most busy", "the busiest", "the busier"],
  ["lightest than", "the lightest", "more light", "the lighter"],
  ["the better", "the most good", "the goodest", "the best"],
];

export const A2_SUPERLATIVES_QUESTIONS: QuizQuestion[] = original.map(([q, correct, explain], i) => {
  const source = originalSource[i];
  return { q, options: source, answer: source.indexOf(correct), explain, difficulty: "简单", keepChoice: true };
});

export const A2_SUPERLATIVES: Partial<GrammarLesson> = {
  titleCn: "最高级",
  titleEn: "Superlatives",
  intro: "在三个及以上的人或物中指出最高或最低程度；短形容词加 -est，长形容词用 the most。",
  rules: [],
  openingExample: { en: "She is the best student in our class.", cn: "她是我们班最好的学生。" },
  theory: [
    { heading: "1 · 重点", body: "最高级把一个对象放在至少三个成员的群体中，指出其程度最高或最低。常见形式是 the + 形容词 -est 或 the most + 形容词；最低程度可用 the least。范围通常由 in、of 或后面的从句指出。" },
    { heading: "2 · 公式", body: "the + 形容词 -est；the most + 形容词" },
    { heading: "3 · 主要内容", body: "在群体中排名 / 强调迄今最佳或最差的经历 / 表示最低程度 / 用序数词指出第二、第三名" },
    { heading: "4 · 功能与例句", body: "先确认比较范围，再确定是最高、最低，还是具体名次。", examples: [
      { en: "the tallest building in Hanoi", cn: "河内最高的建筑", note: "地点或组织范围通常用 in。" },
      { en: "It's the best film I have ever seen.", cn: "这是我看过最好的电影。", note: "最高级常与 ever 及现在完成时连用。" },
      { en: "the least expensive option", cn: "最便宜的选项", note: "the least + 形容词表示最低程度。" },
      { en: "the second largest city", cn: "第二大城市", note: "序数词放在 the 与最高级之间。" },
    ] },
    { heading: "5 · 牢记", body: "只有两者比较时用比较级：the taller of the two。最高级通常需要 the，但已有物主限定词时可说 my biggest mistake。不要同时使用 most 和 -est。" },
    { heading: "6 · 句式", body: "按音节数、拼写和不规则变化确定形式。", table: [
      { left: "单音节：the + 形容词 -est", right: "tall → the tallest" },
      { left: "特殊拼写：双写辅音；辅音 + y → -iest", right: "big → the biggest；busy → the busiest" },
      { left: "多音节：the most + 形容词", right: "the most beautiful" },
      { left: "不规则变化", right: "good → the best；bad → the worst；far → the farthest" },
    ] },
    { heading: "7 · 分析步骤", body: "检查比较人数、冠词和范围。", table: [
      { left: "01 判断群体", right: "至少三个对象才能用最高级；只有两者时用比较级：the taller of the two。" },
      { left: "02 写出最高级", right: "通常在 -est 或 most 前加 the；已有物主限定词时可不用 the。" },
      { left: "03 标出范围", right: "地点或组织用 in，明确的人或物集合用 of：the best in the class；the oldest of the three。" },
    ] },
    { heading: "8 · 例句与讲解", body: "观察不规则形式、短词拼写、长词和名次。", examples: [
      { en: "She is the best student in our class.", cn: "她是我们班最好的学生。", note: "good → best；需要 the，班级范围用 in。" },
      { en: "This is the tallest building in the city.", cn: "这是城里最高的建筑。", note: "tall 加 -est。" },
      { en: "Monday is the busiest day of the week.", cn: "星期一是一周中最忙的一天。", note: "busy 改 y 为 i 加 -est；一周的范围用 of。" },
      { en: "Ha Long Bay is one of the most beautiful places in Vietnam.", cn: "下龙湾是越南最美的地方之一。", note: "beautiful 用 most；one of 后接复数 places。" },
      { en: "That was the worst meal I have ever eaten.", cn: "那是我吃过最糟的一餐。", note: "bad → worst；ever 表示截至现在的经历。" },
      { en: "Da Nang is the third largest city in Vietnam.", cn: "在该例的排名中，岘港是越南第三大城市。", note: "third 放在 the 与 largest 之间。" },
    ] },
    { heading: "9 · 对照与纠错", body: "两者用比较级，三者及以上用最高级。", table: [
      { left: "比较级：两个对象，以 than 连接", right: "A is bigger than B." },
      { left: "最高级：三者以上，有 the 和范围", right: "A is the biggest in the group." },
      { left: "one of the + 最高级：名词用复数", right: "one of the oldest temples" },
    ], errors: [
      { wrong: "She is best student in our class.", right: "She is the best student in our class.", note: "名词前的最高级通常需要 the。" },
      { wrong: "This is the most tallest building.", right: "This is the tallest building.", note: "most 与 -est 不同时使用。" },
      { wrong: "He is the oldest of the two brothers.", right: "He is the older of the two brothers.", note: "两人比较用比较级。" },
    ] },
  ],
  keyPoints: ["比较群体是否至少有三个对象？", "最高级前是否需要 the？", "-est 和 most 是否只选其一？", "范围是否正确使用 in 或 of？"],
  questions: [...A2_SUPERLATIVES_QUESTIONS, ...A2_SUPERLATIVES_MEDIUM, ...A2_SUPERLATIVES_HARD],
  ownBankOnly: true,
  quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
  pendingDifficulties: [],
};
