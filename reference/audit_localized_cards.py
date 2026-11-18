"""Check localized A2 and Education card fields against the original CSV exports."""

import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POS = {
    "Danh từ": "名词",
    "Động từ": "动词",
    "Tính từ": "形容词",
    "Trạng từ": "副词",
    "Giới từ": "介词",
    "Cụm danh từ": "名词短语",
    "Cụm động từ": "动词短语",
    "Cụm giới từ": "介词短语",
    "Thán từ": "感叹词",
    "Số từ": "数词",
    "Liên từ": "连词",
    "Đại từ": "代词",
}


def check(label: str, source_file: str, csv_file: str, prefix: str, blocks: int) -> None:
    source = (ROOT / source_file).read_text(encoding="utf-8")
    with (ROOT / csv_file).open(encoding="utf-8-sig", newline="") as handle:
        originals = list(csv.DictReader(handle))

    names = (
        [f"{prefix}_{name}_LESSON" for name in ("FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH")[:blocks]]
    )
    cards = []
    for name in names:
        match = re.search(rf"export const {name}:.*?= \[\n(.*?)\n\];", source, re.S)
        if not match:
            raise AssertionError(f"Missing {name}")
        cards.extend(json.loads(line.strip().rstrip(",")) for line in match.group(1).splitlines() if line.strip().startswith("["))

    errors = []
    for number, (card, original) in enumerate(zip(cards, originals), 1):
        examples = original["Examples"].split(" | ")
        if card[0] != original["Term"] or card[2] != POS[original["Part of speech"]] or card[5:] != examples:
            errors.append((number, card[0], original["Term"]))
        if not card[1].startswith("/") or not card[1].endswith("/") or not card[3] or not card[4]:
            errors.append((number, "missing IPA/translation"))
        if label == "Education" and not re.search(rf"^  {re.escape(json.dumps(card[0], ensure_ascii=False))}: \[", source, re.M):
            errors.append((number, "missing example translation"))

    print(f"{label}: {len(cards)} localized cards, {len(errors)} errors")
    if errors:
        print(errors[:20])
        raise SystemExit(1)


check("A2", "client/src/data/originalA2.ts", "reference/original-cefr-csv/cefr-a2.csv", "A2", 9)
check("Education", "client/src/data/originalTopics.ts", "reference/original-topic-csv/education-learning.csv", "EDUCATION", 5)
