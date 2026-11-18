import type { QuizQuestion } from "./content";

// 原站 A2 第 12 课困难档 30 题；英文题目、选项、答案和顺序保留。
export const A2_TOO_ENOUGH_HARD: QuizQuestion[] = [
  {
    "q": "The sample was ___ small to support any firm conclusion.",
    "explain": "样本太小，无法得出可靠结论。too small to support 表示程度不足导致结果无法实现。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "too",
    "sentence": "The sample was too small to support any firm conclusion.",
    "kind": "blank"
  },
  {
    "q": "The signal was not strong ___ to be detected at that depth.",
    "explain": "信号不够强，无法在那种深度被探测到。enough 放在 strong 后。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "enough",
    "sentence": "The signal was not strong enough to be detected at that depth.",
    "kind": "blank"
  },
  {
    "q": "The laboratory did not have ___ funding to repeat the trial.",
    "explain": "实验室没有足够经费重做试验。enough 放在名词 funding 前。",
    "difficulty": "困难",
    "options": [
      "very",
      "too",
      "enough",
      "much"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "There were ___ confounding variables to isolate one cause.",
    "explain": "混杂变量过多，无法单独确定一个原因。variables 为复数，用 too many。",
    "difficulty": "困难",
    "options": [
      "enough",
      "too many",
      "too",
      "too much"
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "Adding ___ fertiliser pollutes the groundwater.",
    "explain": "施用过多肥料会污染地下水。fertiliser 不可数，用 too much。",
    "difficulty": "困难",
    "options": [
      "too",
      "too much",
      "enough",
      "too many"
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "仪器过于敏感，不适合在野外使用。too + 形容词 + to do 表示过度导致不能做。",
    "difficulty": "困难",
    "options": [
      "The instrument is too sensitive to use in the field.",
      "The instrument is too much sensitive to use in the field.",
      "The instrument is sensitive too to use in the field.",
      "The instrument is too sensitive for use in the field to."
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "数据不够详细，无法解决问题。enough 放在形容词 detailed 后。",
    "difficulty": "困难",
    "options": [
      "The data are not enough detailed to settle the question.",
      "The data are not detailed too to settle the question.",
      "The data are not enough detail to settle the question.",
      "The data are not detailed enough to settle the question."
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "没有足够证据作出因果主张。evidence 不可数，enough 放在其前。",
    "difficulty": "困难",
    "options": [
      "There is not evidence enough for a causal claim.",
      "There is not enough evidence for a causal claim.",
      "There is not enough evidences for a causal claim.",
      "There is too enough evidence for a causal claim."
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "水库太浅，水泵无法运行。too shallow for the pumps to operate。",
    "difficulty": "困难",
    "options": [
      "The reservoir is too shallow for the pumps to operate.",
      "The reservoir is shallow too for the pumps to operate.",
      "The reservoir is too much shallow for the pumps to operate.",
      "The reservoir is too shallow the pumps to operate."
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "很少有地区降雨量足以不灌溉而种稻。enough 放在 rainfall 前。",
    "difficulty": "困难",
    "options": [
      "Few regions have rainfall enough to grow rice without irrigation.",
      "Few regions have enough rainfall to grow rice without irrigation.",
      "Few regions have too enough rainfall to grow rice without irrigation.",
      "Few regions have enough rainfalls to grow rice without irrigation."
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "Only two studies have been replicated, and this is not enough for a general conclusion. ___ studies have been replicated to draw a general conclusion.",
    "explain": "只有两项研究得到复现，数量太少，无法得出一般结论。studies 可数，用 too few。",
    "difficulty": "困难",
    "options": [
      "too few",
      "too much",
      "too",
      "enough"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "The report criticises the lack of long-term monitoring. ___ attention has been paid to the long-term effects.",
    "explain": "报告批评缺少长期监测，说明对长期影响的关注太少。attention 不可数，用 too little。",
    "difficulty": "困难",
    "options": [
      "too little",
      "enough",
      "too",
      "too much"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "方法足够简单，大学生能应用。simple enough for undergraduates to apply。",
    "difficulty": "困难",
    "options": [
      "The method is too simple enough for undergraduates to apply.",
      "The method is enough simple for undergraduates to apply.",
      "The method is simple enough for undergraduates to apply.",
      "The method is simple enough undergraduates to apply."
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The sensors responded ___ slowly to capture the spike.",
    "explain": "传感器反应太慢，没抓住瞬时峰值。too 可以修饰副词 slowly。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "too",
    "sentence": "The sensors responded too slowly to capture the spike.",
    "kind": "blank"
  },
  {
    "q": "选择正确的句子。",
    "explain": "异常值太多，导致模型无法收敛。outliers 可数，用 too many。",
    "difficulty": "困难",
    "options": [
      "There were too many outliers for the model to converge.",
      "There were too many outlier for the model to converge.",
      "There were enough many outliers for the model to converge.",
      "There were too much outliers for the model to converge."
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "The pump did not run long ___ to drain the basin.",
    "explain": "水泵运行时间不够长，无法排空流域。enough 放在副词 long 后。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "enough",
    "sentence": "The pump did not run long enough to drain the basin.",
    "kind": "blank"
  },
  {
    "q": "The sample was ___ small to provide a reliable estimate.",
    "explain": "样本太小，无法提供可靠估计。too small 指规模不足以支持结果。",
    "difficulty": "困难",
    "options": [
      "much",
      "enough",
      "too",
      "many"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The report is clear ___ for non-specialists to understand.",
    "explain": "报告足够清晰，非专业人士也能读懂。enough 放在 clear 后。",
    "difficulty": "困难",
    "options": [
      "much",
      "many",
      "enough",
      "too"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The department does not have ___ funding to upgrade all its equipment.",
    "explain": "部门经费不足，无法升级全部设备。funding 不可数，enough 放在其前。",
    "difficulty": "困难",
    "options": [
      "too",
      "few",
      "enough",
      "many"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "There were ___ many inconsistencies for the reviewers to accept the figures.",
    "explain": "不一致之处过多，审稿人无法接受这些数字。too many 修饰复数名词 inconsistencies。",
    "difficulty": "困难",
    "options": [
      "such",
      "enough",
      "too",
      "very"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The experiment consumed too ___ electricity.",
    "explain": "实验耗电过多。electricity 不可数，用 too much。",
    "difficulty": "困难",
    "options": [
      "enough",
      "very",
      "too",
      "much"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "We have ___ chairs for all twenty guests.",
    "explain": "我们有足够的椅子给二十位客人。enough 放在名词 chairs 前。",
    "difficulty": "困难",
    "options": [
      "very",
      "too",
      "enough",
      "much"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "We added too ___ salt to the soup.",
    "explain": "我们在汤里放了过多的盐。salt 不可数，用 too much。",
    "difficulty": "困难",
    "options": [
      "very",
      "enough",
      "too",
      "much"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "We don't have ___ time to finish the exam.",
    "explain": "我们没有足够的时间完成考试。enough 放在不可数名词 time 前。",
    "difficulty": "困难",
    "options": [
      "too",
      "much",
      "enough",
      "very"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "Do we have ___ materials to finish the project?",
    "explain": "我们有足够的材料完成项目吗？enough 放在复数名词 materials 前。",
    "difficulty": "困难",
    "options": [
      "too",
      "very",
      "enough",
      "much"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The classroom has thirty seats but forty students. There aren't ___ seats.",
    "explain": "班里有三十张椅子、四十名学生，椅子不够。aren't enough seats 表示数量不足。",
    "difficulty": "困难",
    "options": [
      "too",
      "much",
      "enough",
      "many"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The suitcase was ___ heavy for the child to carry alone.",
    "explain": "箱子太重，孩子无法独自搬运。too heavy for the child to carry。",
    "difficulty": "困难",
    "options": [
      "enough",
      "very much",
      "too",
      "many"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The box weighs only two kilograms, so it is light ___ for Mai to lift.",
    "explain": "箱子只有两公斤，Mai 可以轻松搬起。light enough 表示轻到能搬动。",
    "difficulty": "困难",
    "options": [
      "very",
      "many",
      "enough",
      "too"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The film starts at nine, but it is only seven. We have ___ of time.",
    "explain": "电影九点才开始，现在才七点，还有充裕时间。plenty of time 表示时间富余。",
    "difficulty": "困难",
    "options": [
      "plenty",
      "few",
      "too",
      "many"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "The music was not loud ___ for us to hear from the back row.",
    "explain": "音乐声不够大，后排听不清。enough 放在 loud 后。",
    "difficulty": "困难",
    "options": [
      "too",
      "many",
      "enough",
      "very"
    ],
    "answer": 2,
    "keepChoice": true
  }
];
