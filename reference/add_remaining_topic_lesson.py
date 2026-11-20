"""Integrate reviewed Chinese topic cards in the saved original topic order."""

import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COUNTS = [10, 12, 14, 16, 18, 20, 22, 24, 28, 36]
ORDINALS = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH"]
TOPICS = {
    "housing-communities": ("HOUSING", "t-housing", "住房与社区", "🏘️", "Housing"),
    "energy-resources": ("ENERGY", "t-energy-resources", "能源与资源", "⚡", "Energy"),
    "equality-social-change": ("EQUALITY", "t-equality", "平等与社会变革", "⚖️", "Equality"),
    "language-communication": ("LANGUAGE", "t-language", "语言与沟通", "💬", "Language"),
    "population-migration": ("POPULATION", "t-population", "人口与迁移", "🌍", "Population"),
    "sport-active-lifestyles": ("SPORT", "t-sport-active", "体育与积极生活方式", "🏃", "Sport"),
    "oceans-water": ("OCEANS", "t-oceans", "海洋与水资源", "🌊", "Oceans"),
    "personal-finance-household-life": ("PERSONAL_FINANCE", "t-personal-finance", "个人理财与家庭生活", "💰", "PersonalFinance"),
}
POS = {
    "Danh từ": "名词", "Cụm danh từ": "名词短语", "Động từ": "动词",
    "Tính từ": "形容词", "Cụm tính từ": "形容词短语",
    "Cụm động từ": "动词短语", "Trạng từ": "副词", "Thành ngữ": "习语",
}
dump = lambda value: json.dumps(value, ensure_ascii=False)

slug, lesson_text = sys.argv[1:]
lesson = int(lesson_text)
assert slug in TOPICS and 1 <= lesson <= 10
manifest = json.loads((ROOT / "reference/original-topic-csv/manifest.json").read_text(encoding="utf-8"))
index = next(i for i, item in enumerate(manifest) if item["file"] == f"{slug}.csv")
assert index >= 18
title = manifest[index]["title"]
prefix, topic_id, title_cn, emoji, label = TOPICS[slug]
start = sum(COUNTS[:lesson - 1])
with (ROOT / f"reference/original-topic-csv/{slug}.csv").open(encoding="utf-8-sig", newline="") as stream:
    originals = list(csv.DictReader(stream))[start:start + COUNTS[lesson - 1]]
localized = json.loads((ROOT / f"reference/{slug}-lesson-{lesson}-localized.json").read_text(encoding="utf-8"))
assert len(originals) == len(localized) == COUNTS[lesson - 1]

rows, translations = [], []
for original, (ipa, cn_pos, meaning, usage, first_cn, second_cn) in zip(originals, localized):
    assert POS[original["Part of speech"]] == cn_pos
    examples = original["Examples"].split(" | ")
    assert len(examples) == 2 and all((ipa, meaning, usage, first_cn, second_cn))
    rows.append("  " + dump([original["Term"], ipa, cn_pos, meaning, usage, *examples]) + ",")
    translations.append(f"  {dump(original['Term'])}: {dump([first_cn, second_cn])},")

current = ORDINALS[lesson - 1]
if lesson == 1:
    prior_slug = manifest[index - 1]["file"].removesuffix(".csv")
    prior_prefix, prior_id, prior_cn, prior_emoji, _ = TOPICS[prior_slug]
    prior_title = manifest[index - 1]["title"]
    previous, anchor_prefix = "TENTH", prior_prefix
else:
    previous, anchor_prefix = ORDINALS[lesson - 2], prefix

topics = ROOT / "client/src/data/originalTopics.ts"
text = topics.read_text(encoding="utf-8")
assert f"{prefix}_{current}_LESSON" not in text
text += (
    f"\nexport const {prefix}_{current}_LESSON: OriginalTopicWord[] = [\n"
    + "\n".join(rows)
    + f"\n];\n\nexport const {prefix}_{current}_EXAMPLE_TRANSLATIONS: Record<string, [string, string]> = {{\n"
    + "\n".join(translations)
    + "\n};\n"
)
topics.write_text(text, encoding="utf-8")

catalog = ROOT / "client/src/data/catalog.ts"
text = catalog.read_text(encoding="utf-8")
needle = f"{anchor_prefix}_{previous}_LESSON, {anchor_prefix}_{previous}_EXAMPLE_TRANSLATIONS"
assert text.count(needle) == 1
text = text.replace(needle, needle + f", {prefix}_{current}_LESSON, {prefix}_{current}_EXAMPLE_TRANSLATIONS")
needle = f"?? {anchor_prefix}_{previous}_EXAMPLE_TRANSLATIONS[word];"
assert text.count(needle) == 1
text = text.replace(needle, f"?? {anchor_prefix}_{previous}_EXAMPLE_TRANSLATIONS[word] ?? {prefix}_{current}_EXAMPLE_TRANSLATIONS[word];")
if lesson == 1:
    needle = f'  {{ id: "{prior_id}", cn: "{prior_cn}", en: "{prior_title}", emoji: "{prior_emoji}" }},'
    assert text.count(needle) == 1
    text = text.replace(needle, needle + f'\n  {{ id: "{topic_id}", cn: "{title_cn}", en: "{title}", emoji: "{emoji}" }},')
    anchor_id = f"{prior_id}-10"
else:
    anchor_id = f"{topic_id}-{lesson - 1}"
match = re.search(rf'^TOPIC_LESSONS\.push\(\{{ id: "{re.escape(anchor_id)}".*$', text, re.M)
assert match
insert = f'TOPIC_LESSONS.push({{ id: "{topic_id}-{lesson}", kind: "vocab-topic", titleCn: "{title_cn} · 第 {lesson} 课", titleEn: "{title} Lesson {lesson}", blurb: "{title_cn}主题第 {lesson} 课，共 {COUNTS[lesson - 1]} 张原站导出词卡。", words: {prefix}_{current}_LESSON.map(originalTopicToWord) }});'
text = text[:match.end()] + "\n" + insert + text[match.end():]
catalog.write_text(text, encoding="utf-8")

audit = ROOT / "reference/audit_localized_cards.py"
text = audit.read_text(encoding="utf-8")
if lesson == 1:
    previous_label = TOPICS[prior_slug][4]
    needle = f'check("{previous_label}", "client/src/data/originalTopics.ts", "reference/original-topic-csv/{prior_slug}.csv", "{prior_prefix}", 10)'
    assert text.count(needle) == 1
    text = text.replace(needle, needle + f'\ncheck("{label}", "client/src/data/originalTopics.ts", "reference/original-topic-csv/{slug}.csv", "{prefix}", 1)')
else:
    needle = f'check("{label}", "client/src/data/originalTopics.ts", "reference/original-topic-csv/{slug}.csv", "{prefix}", {lesson - 1})'
    assert text.count(needle) == 1
    text = text.replace(needle, needle.replace(f", {lesson - 1})", f", {lesson})"))
audit.write_text(text, encoding="utf-8")

report = ROOT / "现有内容核对报告.md"
with report.open("a", encoding="utf-8") as stream:
    stream.write(f"\n{title_cn}主题第 {lesson} 课新增 {COUNTS[lesson - 1]} 张词卡，累计 {start + COUNTS[lesson - 1]}/200 张；英文词条、词性和例句对照保存的原站 CSV。中文释义、用法和例句已翻译；音标和课次归属仍待原网页核实。\n")
