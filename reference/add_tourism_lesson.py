"""Integrate reviewed Tourism & Travel translations with the saved source CSV."""

import csv
import json
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
counts = [10, 12, 14, 16, 18, 20, 22, 24, 28, 36]
ordinals = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH"]
pos = {"Danh từ": "名词", "Cụm danh từ": "名词短语", "Động từ": "动词", "Tính từ": "形容词", "Cụm động từ": "动词短语", "Thành ngữ": "习语"}
dump = lambda value: json.dumps(value, ensure_ascii=False)

lesson = int(sys.argv[1])
assert 4 <= lesson <= 10
start = sum(counts[:lesson - 1])
with (root / "reference/original-topic-csv/tourism-travel.csv").open(encoding="utf-8-sig", newline="") as handle:
    originals = list(csv.DictReader(handle))[start:start + counts[lesson - 1]]
localized = json.loads((root / f"reference/tourism-travel-lesson-{lesson}-localized.json").read_text(encoding="utf-8"))
assert len(originals) == len(localized) == counts[lesson - 1]

rows, translations = [], []
for original, (ipa, cn_pos, meaning, usage, example_cn, example2_cn) in zip(originals, localized):
    assert pos[original["Part of speech"]] == cn_pos
    examples = original["Examples"].split(" | ")
    assert len(examples) == 2 and all((ipa, meaning, usage, example_cn, example2_cn))
    rows.append("  " + dump([original["Term"], ipa, cn_pos, meaning, usage, *examples]) + ",")
    translations.append(f"  {dump(original['Term'])}: {dump([example_cn, example2_cn])},")

current = ordinals[lesson - 1]
previous = ordinals[lesson - 2]
topics = root / "client/src/data/originalTopics.ts"
text = topics.read_text(encoding="utf-8")
assert f"TOURISM_{current}_LESSON" not in text
text += (
    f"\nexport const TOURISM_{current}_LESSON: OriginalTopicWord[] = [\n"
    + "\n".join(rows)
    + f"\n];\n\nexport const TOURISM_{current}_EXAMPLE_TRANSLATIONS: Record<string, [string, string]> = {{\n"
    + "\n".join(translations)
    + "\n};\n"
)
topics.write_text(text, encoding="utf-8")

catalog = root / "client/src/data/catalog.ts"
text = catalog.read_text(encoding="utf-8")
needle = f"TOURISM_{previous}_LESSON, TOURISM_{previous}_EXAMPLE_TRANSLATIONS"
assert text.count(needle) == 1
text = text.replace(needle, needle + f", TOURISM_{current}_LESSON, TOURISM_{current}_EXAMPLE_TRANSLATIONS")
needle = f"?? TOURISM_{previous}_EXAMPLE_TRANSLATIONS[word];"
assert text.count(needle) == 1
text = text.replace(needle, f"?? TOURISM_{previous}_EXAMPLE_TRANSLATIONS[word] ?? TOURISM_{current}_EXAMPLE_TRANSLATIONS[word];")
needle = f'TOPIC_LESSONS.push({{ id: "t-tourism-{lesson - 1}", kind: "vocab-topic", titleCn: "旅游与旅行 · 第 {lesson - 1} 课", titleEn: "Tourism & Travel Lesson {lesson - 1}", blurb: "旅游与旅行主题第 {lesson - 1} 课，共 {counts[lesson - 2]} 张原站导出词卡。", words: TOURISM_{previous}_LESSON.map(originalTopicToWord) }});'
assert text.count(needle) == 1
text = text.replace(needle, needle + f'\nTOPIC_LESSONS.push({{ id: "t-tourism-{lesson}", kind: "vocab-topic", titleCn: "旅游与旅行 · 第 {lesson} 课", titleEn: "Tourism & Travel Lesson {lesson}", blurb: "旅游与旅行主题第 {lesson} 课，共 {counts[lesson - 1]} 张原站导出词卡。", words: TOURISM_{current}_LESSON.map(originalTopicToWord) }});')
catalog.write_text(text, encoding="utf-8")

audit = root / "reference/audit_localized_cards.py"
text = audit.read_text(encoding="utf-8")
needle = f'check("Tourism", "client/src/data/originalTopics.ts", "reference/original-topic-csv/tourism-travel.csv", "TOURISM", {lesson - 1})'
assert text.count(needle) == 1
audit.write_text(text.replace(needle, needle.replace(f", {lesson - 1})", f", {lesson})")), encoding="utf-8")

report = root / "现有内容核对报告.md"
with report.open("a", encoding="utf-8") as handle:
    handle.write(f"\n旅游与旅行主题第 {lesson} 课新增 {counts[lesson - 1]} 张词卡，累计 {start + counts[lesson - 1]}/200 张；英文词条、词性和例句对照保存的原站 CSV。中文释义、用法和例句已翻译；音标和课次归属仍待原网页核实。\n")
