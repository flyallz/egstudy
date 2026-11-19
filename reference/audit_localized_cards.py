"""Check localized CEFR and Education card fields against the original CSV exports."""

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
    "Từ hạn định": "限定词",
    "Động từ khuyết thiếu": "情态动词",
}


def check(label: str, source_file: str, csv_file: str, prefix: str, blocks: int) -> None:
    source = (ROOT / source_file).read_text(encoding="utf-8")
    with (ROOT / csv_file).open(encoding="utf-8-sig", newline="") as handle:
        originals = list(csv.DictReader(handle))

    names = (
        [f"{prefix}_{name}_LESSON" for name in ("FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH", "ELEVENTH", "TWELFTH", "THIRTEENTH", "FOURTEENTH", "FIFTEENTH", "SIXTEENTH", "SEVENTEENTH", "EIGHTEENTH", "NINETEENTH", "TWENTIETH", "TWENTY_FIRST", "TWENTY_SECOND", "TWENTY_THIRD", "TWENTY_FOURTH", "TWENTY_FIFTH", "TWENTY_SIXTH", "TWENTY_SEVENTH", "TWENTY_EIGHTH", "TWENTY_NINTH", "THIRTIETH", "THIRTY_FIRST", "THIRTY_SECOND", "THIRTY_THIRD", "THIRTY_FOURTH", "THIRTY_FIFTH", "THIRTY_SIXTH", "THIRTY_SEVENTH", "THIRTY_EIGHTH", "THIRTY_NINTH", "FORTIETH", "FORTY_FIRST", "FORTY_SECOND", "FORTY_THIRD", "FORTY_FOURTH", "FORTY_FIFTH", "FORTY_SIXTH", "FORTY_SEVENTH", "FORTY_EIGHTH", "FORTY_NINTH", "FIFTIETH", "FIFTY_FIRST", "FIFTY_SECOND", "FIFTY_THIRD", "FIFTY_FOURTH", "FIFTY_FIFTH", "FIFTY_SIXTH", "FIFTY_SEVENTH", "FIFTY_EIGHTH", "FIFTY_NINTH", "SIXTIETH", "SIXTY_FIRST", "SIXTY_SECOND", "SIXTY_THIRD", "SIXTY_FOURTH", "SIXTY_FIFTH")[:blocks]]
    )
    cards = []
    expected_counts = json.loads((ROOT / "reference/original-cefr-lesson-counts.json").read_text(encoding="utf-8"))[label] if label in ("A2", "B1", "B2", "C1") else None
    errors = []
    for index, name in enumerate(names):
        match = re.search(rf"export const {name}:.*?= \[\n(.*?)\n\];", source, re.S)
        if not match:
            raise AssertionError(f"Missing {name}")
        lesson_cards = [json.loads(line.strip().rstrip(",")) for line in match.group(1).splitlines() if line.strip().startswith("[")]
        if expected_counts is not None and len(lesson_cards) != expected_counts[index]:
            errors.append((name, "lesson count", len(lesson_cards), expected_counts[index]))
        cards.extend(lesson_cards)

    if blocks == len(expected_counts or []) and len(cards) != len(originals):
        errors.append(("total count", len(cards), len(originals)))
    for number, (card, original) in enumerate(zip(cards, originals), 1):
        examples = original["Examples"].split(" | ")
        expected_pos = "形容词" if label == "C1" and original["Term"] == "diplomatic" else POS[original["Part of speech"]]
        if card[0] != original["Term"] or card[2] != expected_pos or card[5:] != examples:
            errors.append((number, card[0], original["Term"]))
        if not card[1].startswith("/") or not card[1].endswith("/") or not card[3] or not card[4]:
            errors.append((number, "missing IPA/translation"))
        if label == "Education" and not re.search(rf"^  {re.escape(json.dumps(card[0], ensure_ascii=False))}: \[", source, re.M):
            errors.append((number, "missing example translation"))

    print(f"{label}: {len(cards)} localized cards, {len(errors)} errors")
    if errors:
        print(errors[:20])
        raise SystemExit(1)


check("A2", "client/src/data/originalA2.ts", "reference/original-cefr-csv/cefr-a2.csv", "A2", 40)
check("B1", "client/src/data/originalB1.ts", "reference/original-cefr-csv/cefr-b1.csv", "B1", 34)
check("B2", "client/src/data/originalB2.ts", "reference/original-cefr-csv/cefr-b2.csv", "B2", 27)
check("C1", "client/src/data/originalC1.ts", "reference/original-cefr-csv/cefr-c1.csv", "C1", 52)
check("Education", "client/src/data/originalTopics.ts", "reference/original-topic-csv/education-learning.csv", "EDUCATION", 5)
