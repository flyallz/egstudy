"""Rebuild A2 reflexive easy questions from the saved ForumFlash source pool."""

import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
unit = json.loads((root / "reference/forumflash-a2-original.json").read_text(encoding="utf-8"))["units"][0]
questions = [unit["pool"][i] for i in unit["levels"]["easy"]]
prompts = [
    "选择表示‘独自生活’的正确短语。", "选择正确的句子。", "Help ___ to some cake.",
    "Please make ___ at home, everyone.", "选择正确的句子。", "She was cooking alone and hurt ___.",
    "I taught ___ to play the guitar.", "Mai 在车站见到了朋友 Hoa，并向她挥手。选择正确的句子。",
    "Nam and Lan helped ___ with the homework.", "选择正确的句子。", "把‘她做晚饭时弄伤了自己’译成英语。",
    "把‘孩子们在聚会上玩得很开心’译成英语。", "把‘正是女主任亲自签署了那封信’译成英语。",
    "把‘他自己修好了自行车’译成英语。", "把‘你自己取些蛋糕吧’译成英语。",
    "把‘她做晚饭时弄伤了另一位女性’译成英语。", "I made this card by ___.",
    "The little boy can dress ___.", "Please look after ___ on the trip, Anna.", "The dog saw ___ in the mirror.",
]
explanations = [
    "by myself 表示独自生活；也可以说 on my own。", "children 是复数，反身代词用 themselves；enjoy oneself 表示玩得开心。",
    "help oneself to 是请人自取食物的固定说法；对一人说话用 yourself。", "对大家说话要用复数 yourselves；make yourselves at home 表示请随意。",
    "表示位置的介词 beside 后用普通宾格 him；put 的过去式仍是 put。", "做饭时她弄伤的是自己，因此用 herself。",
    "I 的反身代词是 myself；teach oneself 表示自学。", "Mai 看见的是另一位女性 Hoa，因此用普通宾格 her。",
    "Nam 与 Lan 是互相帮助，用 each other，不是反身代词。", "前半句她弄伤自己用 herself；I 给另一人绷带，用 her。",
    "受伤者就是主语，用 herself；hurt 的过去式仍是 hurt。", "enjoy oneself 表示玩得开心；children 是复数，用 themselves。",
    "herself 紧跟 director，强调由女主任本人签署；过去式用 signed。", "by himself 强调他没有别人帮忙，自己修好了自行车。",
    "help yourself to 是邀请别人自取食物的固定说法；这里 cake 不可数，用 some。",
    "her 指另一位女性；若是她本人受伤才用 herself。", "by myself 表示我独自做了这张卡片。",
    "小男孩自己穿衣服，主语与宾语相同，用 himself。", "Anna 是单个人，对她说话用 yourself。",
    "狗在镜中看到的是它自己，用 itself。",
]
assert len(questions) == len(prompts) == len(explanations) == 20
lines = []
for source, prompt, explain in zip(questions, prompts, explanations):
    assert source["type"] == "choice" and source["answer"] in source["options"]
    payload = [prompt, source["options"], source["options"].index(source["answer"]), explain]
    lines.append("  easy(" + ", ".join(json.dumps(v, ensure_ascii=False) for v in payload) + "),")

path = root / "client/src/data/currentSiteA2.ts"
text = path.read_text(encoding="utf-8")
start = "export const A2_REFLEXIVE_QUESTIONS: QuizQuestion[] = [\n"
before, rest = text.split(start, 1)
_, after = rest.split("\n];", 1)
path.write_text(before + start + "\n".join(lines) + "\n];" + after, encoding="utf-8")
