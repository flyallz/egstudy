"""Integrate reviewed Housing & Communities translations with the saved CSV."""

import csv
import json
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
counts = [10, 12, 14, 16, 18, 20, 22, 24, 28, 36]
ordinals = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH"]
pos = {"Danh từ": "名词", "Cụm danh từ": "名词短语", "Động từ": "动词", "Tính từ": "形容词", "Cụm tính từ": "形容词短语", "Cụm động từ": "动词短语", "Thành ngữ": "习语"}
dump = lambda value: json.dumps(value, ensure_ascii=False)

lesson = int(sys.argv[1])
assert 1 <= lesson <= 10
start = sum(counts[:lesson - 1])
with (root / "reference/original-topic-csv/housing-communities.csv").open(encoding="utf-8-sig", newline="") as handle:
    originals = list(csv.DictReader(handle))[start:start + counts[lesson - 1]]
localized = json.loads((root / f"reference/housing-communities-lesson-{lesson}-localized.json").read_text(encoding="utf-8"))
assert len(originals) == len(localized) == counts[lesson - 1]

rows, translations = [], []
for original, (ipa, cn_pos, meaning, usage, example_cn, example2_cn) in zip(originals, localized):
    assert pos[original["Part of speech"]] == cn_pos
    examples = original["Examples"].split(" | ")
    assert len(examples) == 2 and all((ipa, meaning, usage, example_cn, example2_cn))
    rows.append("  " + dump([original["Term"], ipa, cn_pos, meaning, usage, *examples]) + ",")
    translations.append(f"  {dump(original['Term'])}: {dump([example_cn, example2_cn])},")

current = ordinals[lesson - 1]
topics = root / "client/src/data/originalTopics.ts"
text = topics.read_text(encoding="utf-8")
assert f"HOUSING_{current}_LESSON" not in text
text += (
    f"\nexport const HOUSING_{current}_LESSON: OriginalTopicWord[] = [\n"
    + "\n".join(rows)
    + f"\n];\n\nexport const HOUSING_{current}_EXAMPLE_TRANSLATIONS: Record<string, [string, string]> = {{\n"
    + "\n".join(translations)
    + "\n};\n"
)
topics.write_text(text, encoding="utf-8")

catalog = root / "client/src/data/catalog.ts"
text = catalog.read_text(encoding="utf-8")
previous = ordinals[lesson - 2] if lesson > 1 else "TENTH"
anchor_prefix = "HOUSING" if lesson > 1 else "TOURISM"
needle = f"{anchor_prefix}_{previous}_LESSON, {anchor_prefix}_{previous}_EXAMPLE_TRANSLATIONS"
assert text.count(needle) == 1
text = text.replace(needle, needle + f", HOUSING_{current}_LESSON, HOUSING_{current}_EXAMPLE_TRANSLATIONS")
needle = f"?? {anchor_prefix}_{previous}_EXAMPLE_TRANSLATIONS[word];"
assert text.count(needle) == 1
text = text.replace(needle, f"?? {anchor_prefix}_{previous}_EXAMPLE_TRANSLATIONS[word] ?? HOUSING_{current}_EXAMPLE_TRANSLATIONS[word];")
if lesson == 1:
    needle = '  { id: "t-tourism", cn: "旅游与旅行", en: "Tourism & Travel", emoji: "🧳" },'
    assert text.count(needle) == 1
    text = text.replace(needle, needle + '\n  { id: "t-housing", cn: "住房与社区", en: "Housing & Communities", emoji: "🏘️" },')
    needle = 'TOPIC_LESSONS.push({ id: "t-tourism-10", kind: "vocab-topic", titleCn: "旅游与旅行 · 第 10 课", titleEn: "Tourism & Travel Lesson 10", blurb: "旅游与旅行主题第 10 课，共 36 张原站导出词卡。", words: TOURISM_TENTH_LESSON.map(originalTopicToWord) });'
else:
    needle = f'TOPIC_LESSONS.push({{ id: "t-housing-{lesson - 1}", kind: "vocab-topic", titleCn: "住房与社区 · 第 {lesson - 1} 课", titleEn: "Housing & Communities Lesson {lesson - 1}", blurb: "住房与社区主题第 {lesson - 1} 课，共 {counts[lesson - 2]} 张原站导出词卡。", words: HOUSING_{previous}_LESSON.map(originalTopicToWord) }});'
assert text.count(needle) == 1
text = text.replace(needle, needle + f'\nTOPIC_LESSONS.push({{ id: "t-housing-{lesson}", kind: "vocab-topic", titleCn: "住房与社区 · 第 {lesson} 课", titleEn: "Housing & Communities Lesson {lesson}", blurb: "住房与社区主题第 {lesson} 课，共 {counts[lesson - 1]} 张原站导出词卡。", words: HOUSING_{current}_LESSON.map(originalTopicToWord) }});')
catalog.write_text(text, encoding="utf-8")

audit = root / "reference/audit_localized_cards.py"
text = audit.read_text(encoding="utf-8")
if lesson == 1:
    needle = 'check("Tourism", "client/src/data/originalTopics.ts", "reference/original-topic-csv/tourism-travel.csv", "TOURISM", 10)'
    assert text.count(needle) == 1
    text = text.replace(needle, needle + '\ncheck("Housing", "client/src/data/originalTopics.ts", "reference/original-topic-csv/housing-communities.csv", "HOUSING", 1)')
else:
    needle = f'check("Housing", "client/src/data/originalTopics.ts", "reference/original-topic-csv/housing-communities.csv", "HOUSING", {lesson - 1})'
    assert text.count(needle) == 1
    text = text.replace(needle, needle.replace(f", {lesson - 1})", f", {lesson})"))
audit.write_text(text, encoding="utf-8")

report = root / "现有内容核对报告.md"
with report.open("a", encoding="utf-8") as handle:
    handle.write(f"\n住房与社区主题第 {lesson} 课新增 {counts[lesson - 1]} 张词卡，累计 {start + counts[lesson - 1]}/200 张；英文词条、词性和例句对照保存的原站 CSV。中文释义、用法和例句已翻译；音标和课次归属仍待原网页核实。\n")
