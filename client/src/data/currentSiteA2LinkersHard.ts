import type { QuizQuestion } from "./content";

// 原站 A2 第 14 课困难档；英文题目、选项、答案和顺序保留。
export const A2_LINKERS_HARD: QuizQuestion[] = [
  {
    "q": "Was the trial halted ___ the side effects were severe, or because the drug did not work?",
    "explain": "because 后接说明原因的完整从句；一个因果关系不再同时加 so。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "because",
    "sentence": "Was the trial halted because the side effects were severe, or because the drug did not work?",
    "kind": "blank"
  },
  {
    "q": "The sample was contaminated, ___ the run was repeated.",
    "explain": "so 引出前一事件造成的结果；前后两个从句都应完整。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "so",
    "sentence": "The sample was contaminated, so the run was repeated.",
    "kind": "blank",
    "baseWord": "所以"
  },
  {
    "q": "Sorry to interrupt, ___ is this method precise enough for the trial?",
    "explain": "but 连接前后形成对比的两部分，表达转折。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "but",
    "sentence": "Sorry to interrupt, but is this method precise enough for the trial?",
    "kind": "blank"
  },
  {
    "q": "Samples must be frozen ___ analysed within six hours.",
    "explain": "or 连接可替换的选项，表示“或者”；也可表示“否则”。",
    "difficulty": "困难",
    "options": [
      "or",
      "so",
      "and",
      "but"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "The report lists two developments without specifying causation. Rainfall increased ___ runoff doubled within a decade.",
    "explain": "and 连接并列的动作或事实，表示补充；这里两个信息同时成立。",
    "difficulty": "困难",
    "options": [
      "or",
      "so",
      "and",
      "but"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "because 后接说明原因的完整从句；一个因果关系不再同时加 so。",
    "difficulty": "困难",
    "options": [
      "Because of the baseline was uncertain, the trend could not be confirmed.",
      "Because the baseline was uncertain, so the trend could not be confirmed.",
      "Because the baseline uncertain, the trend could not be confirmed.",
      "Because the baseline was uncertain, the trend could not be confirmed."
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "so 引出前一事件造成的结果；前后两个从句都应完整。",
    "difficulty": "困难",
    "options": [
      "The results were clear, because the paper was accepted quickly.",
      "The results were clear, so the paper was accepted quickly.",
      "The results were clear so that the paper was accepted quickly so.",
      "Because the results were clear, so the paper was accepted quickly."
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "but 连接前后形成对比的两部分，表达转折。",
    "difficulty": "困难",
    "options": [
      "Funding was cut, and the monitoring continued anyway but.",
      "Funding was cut, but the monitoring continued anyway.",
      "Although funding was cut, but the monitoring continued anyway.",
      "Funding was cut, so the monitoring continued anyway."
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "because 后接说明原因的完整从句；一个因果关系不再同时加 so。",
    "difficulty": "困难",
    "options": [
      "Deforestation continued because enforcement remained weak.",
      "Deforestation continued because enforcement weak remained.",
      "Deforestation continued, because of weak enforcement remained.",
      "Deforestation continued because of enforcement remained weak."
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "so 引出前一事件造成的结果；前后两个从句都应完整。",
    "difficulty": "困难",
    "options": [
      "Because the data are public, so anyone can verify the calculation.",
      "The data are public, because anyone can verify the calculation.",
      "The data are public, so anyone can verify the calculation.",
      "The data are public so that anyone can verifies the calculation."
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The survey was postponed ___ the typhoon.",
    "explain": "because of 后接名词短语，说明原因；后面不能直接跟主语加动词的从句。",
    "difficulty": "困难",
    "options": [
      "because of",
      "and",
      "but",
      "or"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "___ the sample was small, the effect was unmistakable.",
    "explain": "although 引出让步从句，表示“虽然”；后面的主句不再加 but。",
    "difficulty": "困难",
    "options": [
      "and",
      "although",
      "or",
      "but"
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "and 连接并列的动作或事实，表示补充；这里两个信息同时成立。",
    "difficulty": "困难",
    "options": [
      "Emissions fell but air quality improve within two years.",
      "Emissions fell, so and air quality improved within two years.",
      "Emissions fell and so air quality improved within two years and.",
      "Emissions fell and air quality improved within two years."
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "A: Why are the readings taken at dawn? B: They are taken then ___ the wind cannot affect them.",
    "explain": "so that 引出目的，表示“为了”；与引出结果的 so 不同。",
    "difficulty": "困难",
    "options": [
      "and",
      "or",
      "so that",
      "but"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "but 连接前后形成对比的两部分，表达转折。",
    "difficulty": "困难",
    "options": [
      "The dataset is incomplete, and it remains the best available but.",
      "The dataset is incomplete, but it remains the best available.",
      "The dataset is incomplete, so it remains the best available.",
      "Although the dataset is incomplete, but it remains the best available."
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "Complete the fixed expression “Either ... or ...”. Either the model is wrong ___ the measurements are.",
    "explain": "or 连接可替换的选项，表示“或者”；也可表示“否则”。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "or",
    "sentence": "Complete the fixed expression “Either ... or ...”. Either the model is wrong or the measurements are.",
    "kind": "blank"
  },
  {
    "q": "The initial survey was incomplete, ___ the researchers collected additional responses.",
    "explain": "so 引出前一事件造成的结果；前后两个从句都应完整。",
    "difficulty": "困难",
    "options": [
      "because",
      "or",
      "because of",
      "so"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "The device is inexpensive, ___ it requires frequent maintenance.",
    "explain": "but 连接前后形成对比的两部分，表达转折。",
    "difficulty": "困难",
    "options": [
      "or",
      "because",
      "but",
      "so"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The team postponed publication ___ several records were missing.",
    "explain": "because 后接说明原因的完整从句；一个因果关系不再同时加 so。",
    "difficulty": "困难",
    "options": [
      "because of",
      "because",
      "or",
      "so"
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "Researchers compared the two samples ___ checked the results twice. They completed both tasks.",
    "explain": "and 连接并列的动作或事实，表示补充；这里两个信息同时成立。",
    "difficulty": "困难",
    "options": [
      "or",
      "because",
      "and",
      "but"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The road was flooded, ___ the buses stopped running.",
    "explain": "so 引出前一事件造成的结果；前后两个从句都应完整。",
    "difficulty": "困难",
    "options": [
      "but",
      "and",
      "or",
      "so"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "Do you prefer tea ___ coffee with breakfast?",
    "explain": "or 连接可替换的选项，表示“或者”；也可表示“否则”。",
    "difficulty": "困难",
    "options": [
      "or",
      "so",
      "and",
      "but"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "The first attempt failed, ___ the second one succeeded.",
    "explain": "but 连接前后形成对比的两部分，表达转折。",
    "difficulty": "困难",
    "options": [
      "so",
      "or",
      "but",
      "and"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The instructions were unclear, ___ we asked for help.",
    "explain": "so 引出前一事件造成的结果；前后两个从句都应完整。",
    "difficulty": "困难",
    "options": [
      "or",
      "and",
      "but",
      "so"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "Hurry up, ___ you will miss the train.",
    "explain": "or 连接可替换的选项，表示“或者”；也可表示“否则”。",
    "difficulty": "困难",
    "options": [
      "or",
      "and",
      "so",
      "but"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "It was raining heavily, ___ the children still played football outside.",
    "explain": "but 连接前后形成对比的两部分，表达转折。",
    "difficulty": "困难",
    "options": [
      "so",
      "or",
      "but",
      "because"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "We left early ___ we could catch the first bus.",
    "explain": "so that 引出目的，表示“为了”；与引出结果的 so 不同。",
    "difficulty": "困难",
    "options": [
      "but",
      "or",
      "so that",
      "because of"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The restaurant had no vegetarian meals, ___ we chose another place.",
    "explain": "so 引出前一事件造成的结果；前后两个从句都应完整。",
    "difficulty": "困难",
    "options": [
      "because of",
      "because",
      "or",
      "so"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "I took a raincoat ___ the forecast said it might rain.",
    "explain": "because 后接说明原因的完整从句；一个因果关系不再同时加 so。",
    "difficulty": "困难",
    "options": [
      "or",
      "because",
      "so",
      "because of"
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "You must return the book today ___ renew it online before midnight.",
    "explain": "or 连接可替换的选项，表示“或者”；也可表示“否则”。",
    "difficulty": "困难",
    "options": [
      "or",
      "but",
      "so",
      "because"
    ],
    "answer": 0,
    "keepChoice": true
  }
];
