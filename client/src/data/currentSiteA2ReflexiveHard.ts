import type { QuizQuestion } from "./content";

// 英文题干、选项与答案按原站 A2 第 1 课困难档顺序保留；解析译为中文。
export const A2_REFLEXIVE_HARD: QuizQuestion[] = [
  {
    "q": "The system recalibrates ___ every twelve hours.",
    "explain": "系统每十二小时自行重新校准。the system 是单数且无生命，用 itself 表示系统自身。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "itself",
    "sentence": "The system recalibrates itself every twelve hours.",
    "kind": "blank"
  },
  {
    "q": "The researchers distanced ___ from the press release.",
    "explain": "研究人员与那份新闻稿划清了界限。researchers 是复数，反身代词用 themselves。",
    "difficulty": "困难",
    "options": [
      "herself",
      "itself",
      "himself",
      "themselves"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "We confined ___ to data collected after 2010.",
    "explain": "我们只分析 2010 年以后收集的数据。主语 we 的反身代词是 ourselves；confine ourselves to 表示自我限定范围。",
    "difficulty": "困难",
    "options": [
      "itself",
      "herself",
      "himself",
      "ourselves"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "The author admitted he had rushed the conclusion and contradicted ___ in the final paragraph.",
    "explain": "作者承认结论写得仓促，并在末段自相矛盾。he 和被矛盾的对象是同一人，用 himself。",
    "difficulty": "困难",
    "options": [
      "itself",
      "themselves",
      "herself",
      "himself"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "The economist said she had revised the forecast and described ___ as cautiously optimistic.",
    "explain": "这位经济学家说她修改了预测，并称自己持谨慎乐观态度。she 对应 herself。",
    "difficulty": "困难",
    "options": [
      "himself",
      "themselves",
      "herself",
      "itself"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "委员会无法客观评价自己。主语和宾语指同一组织，作为单数整体用 itself。",
    "difficulty": "困难",
    "options": [
      "The committee cannot evaluate itself objectively.",
      "The committee cannot evaluate themselves objectively.",
      "The committee cannot evaluate its objectively.",
      "The committee cannot evaluate it objectively."
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "参与者亲自完成了问卷。themselves 强调是他们自己完成。",
    "difficulty": "困难",
    "options": [
      "The participants completed the questionnaire theirselves.",
      "The participants completed the questionnaire themselves.",
      "The participants completed the questionnaire himself.",
      "The participants completed the questionnaire by theirself."
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "病毒离开宿主无法自行复制。单数无生命名词 virus 对应 itself；by itself 表示独自。",
    "difficulty": "困难",
    "options": [
      "The virus does not replicate by itself outside a host.",
      "The virus does not replicate by himself outside a host.",
      "The virus does not replicate by themselves outside a host.",
      "The virus does not replicate by it outside a host."
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "Hai tác giả liên tục trích dẫn công trình của nhau.",
    "explain": "两位作者多次互相引用。双方相互进行动作，用 each other，不能用 themselves。",
    "difficulty": "困难",
    "options": [
      "The two authors cited theirselves repeatedly.",
      "The two authors cited each other repeatedly.",
      "The two authors cited himself repeatedly.",
      "The two author cited each other repeatedly."
    ],
    "answer": 1,
    "keepChoice": true
  },
  {
    "q": "选择正确的句子。",
    "explain": "退缩的是冰川本身，而不只是边缘。itself 紧跟 glacier 强调其本身。",
    "difficulty": "困难",
    "options": [
      "The glacier themselves has retreated, not just its margins.",
      "The glacier it has retreated, not just its margins.",
      "The glacier itself has retreated, not just its margins.",
      "The glacier himself has retreated, not just its margins."
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "I verified the calculation ___ before submission.",
    "explain": "我提交前亲自核对了计算结果。I 对应 myself，这里强调由本人完成。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "myself",
    "sentence": "I verified the calculation myself before submission.",
    "kind": "blank"
  },
  {
    "q": "You can download the dataset and check it ___.",
    "explain": "你可以下载数据集，自己检查。这里的 you 指一个人，用 yourself。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "yourself",
    "sentence": "You can download the dataset and check it yourself.",
    "kind": "blank"
  },
  {
    "q": "选择正确的句子。",
    "explain": "植被消失后，土壤侵蚀形成自我加剧的循环。feed on itself 表示不断作用于自身。",
    "difficulty": "困难",
    "options": [
      "Soil erosion feeds on it once vegetation is lost.",
      "Soil erosion feeds on themselves once vegetation is lost.",
      "Soil erosion feeds itself on once vegetation is lost.",
      "Soil erosion feeds on itself once vegetation is lost."
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "The two models contradict ___ on almost every point.",
    "explain": "两个模型几乎处处互相矛盾。each other 表示两者之间相互作用。",
    "difficulty": "困难",
    "options": [
      "each other",
      "itself",
      "herself",
      "himself"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "Cỡ mẫu hạn chế những gì nghiên cứu có thể kết luận về chính nghiên cứu đó.",
    "explain": "样本量限制了研究能对自身作出的结论。itself 指回单数的 the study。",
    "difficulty": "困难",
    "options": [
      "The sample size limits what the study can say about its.",
      "The sample size limits what the study can say about themself.",
      "The sample size limits what the study can say about itself.",
      "The sample size limits what the study can say about himself."
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The data do not explain ___; interpretation is still needed.",
    "explain": "数据无法自行说明其含义，仍需解读。学术英语中的 data 为复数，对应 themselves。",
    "difficulty": "困难",
    "options": [
      "itself",
      "herself",
      "himself",
      "themselves"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "The research group designed the questionnaire ___. No external consultant was involved.",
    "explain": "研究小组自己设计了问卷，没有外部顾问参与。research group 作为一个整体，用 itself。",
    "difficulty": "困难",
    "options": [
      "itself",
      "its",
      "them",
      "theirselves"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "The two economists challenged ___ during the debate.",
    "explain": "两位经济学家在辩论中互相质疑。双方相互作用，用 each other。",
    "difficulty": "困难",
    "options": [
      "each other",
      "itself",
      "themselves",
      "himself"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "The device switches ___ off after thirty minutes.",
    "explain": "设备在三十分钟后自动关闭。switch itself off 表示设备自行停止运行。",
    "difficulty": "困难",
    "options": [
      "itself",
      "it",
      "himself",
      "its"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "The principal, Ms Tran, ___ welcomed the scholarship recipients.",
    "explain": "Tran 女士这位校长亲自欢迎奖学金获得者。herself 紧跟 principal，强调是她本人。",
    "difficulty": "困难",
    "options": [
      "her",
      "hers",
      "herself",
      "she"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "After reading the feedback, the students corrected the errors ___.",
    "explain": "看完反馈后，学生们自己改正了错误。themselves 强调由学生而非老师完成修改。",
    "difficulty": "困难",
    "options": [
      "their",
      "each other",
      "them",
      "themselves"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "The two neighbours looked at ___ and smiled.",
    "explain": "两个邻居相视而笑。each other 表示两人之间的相互动作。",
    "difficulty": "困难",
    "options": [
      "each other",
      "itself",
      "himself",
      "herself"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "I burned ___ on the hot pan yesterday.",
    "explain": "我昨天被热锅烫伤。受伤者就是主语 I，用 myself。",
    "difficulty": "困难",
    "options": [
      "me",
      "my",
      "mine",
      "myself"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "Linh and I introduced ___ to the new teacher.",
    "explain": "Linh 和我向新老师作了自我介绍。Linh and I 相当于 we，用 ourselves。",
    "difficulty": "困难",
    "options": [
      "each other",
      "us",
      "themselves",
      "ourselves"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "Please help ___ to the fruit, children.",
    "explain": "这是对多名孩子说的邀请。help yourselves to 中要用复数 yourselves。",
    "difficulty": "困难",
    "options": [
      "themselves",
      "yourself",
      "yourselves",
      "you"
    ],
    "answer": 2,
    "keepChoice": true
  },
  {
    "q": "The twins prepared breakfast by ___ while their parents slept.",
    "explain": "父母睡觉时，双胞胎自己准备早餐。by themselves 强调两人独立完成。",
    "difficulty": "困难",
    "options": [
      "each other",
      "their",
      "them",
      "themselves"
    ],
    "answer": 3,
    "keepChoice": true
  },
  {
    "q": "The two teams congratulated ___ after the final match.",
    "explain": "决赛后两支队伍互相祝贺。each other 表示双方相互祝贺。",
    "difficulty": "困难",
    "options": [
      "each other",
      "itself",
      "ourselves",
      "themselves"
    ],
    "answer": 0,
    "keepChoice": true
  },
  {
    "q": "We prepared the exhibition without outside support. We did everything ___.",
    "explain": "我们在没有外援的情况下筹备了展览。we 的反身代词是 ourselves，强调所有事情都由我们自己完成。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "ourselves",
    "sentence": "We prepared the exhibition without outside support. We did everything ourselves.",
    "kind": "blank"
  },
  {
    "q": "Lan, you can check the answer ___.",
    "explain": "Lan 可以自己核对答案。这里是对 Lan 一个人说话，用 yourself。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "yourself",
    "sentence": "Lan, you can check the answer yourself.",
    "kind": "blank"
  },
  {
    "q": "Students, please introduce ___ to your new classmates.",
    "explain": "这是对多名学生说的话，请他们向新同学自我介绍，因而用 yourselves。",
    "difficulty": "困难",
    "options": [],
    "answer": 0,
    "answerText": "yourselves",
    "sentence": "Students, please introduce yourselves to your new classmates.",
    "kind": "blank"
  }
];
