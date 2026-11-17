"""Compare existing local CEFR vocabulary pools with original CSV exports."""

import csv
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG = (ROOT / "client/src/data/catalog.ts").read_text(encoding="utf-8")
CONTENT = (ROOT / "client/src/data/content.ts").read_text(encoding="utf-8")
EXTRA = CATALOG.split("const CEFR_EXTRA:", 1)[1].split("export const CEFR_COUNTS:", 1)[0]
LESSON_COUNTS = {"a2": 40, "b1": 34, "b2": 27, "c1": 65, "c2": 36}


def local_pool(level: str) -> set[str]:
    extra_line = next(line for line in EXTRA.splitlines() if line.startswith(f"  {level.upper()}: "))
    extra_terms = re.findall(r'\["([^"]+)",\s*"/', extra_line)
    base = CONTENT.split(f'id: "c-{level}"', 1)[1].split("words: [", 1)[1].split("\n    ],", 1)[0]
    base_terms = re.findall(r'\bw\("([^"]+)"', base)
    return {term.strip().casefold() for term in base_terms + extra_terms}


def main() -> None:
    result = {}
    for level, lessons in LESSON_COUNTS.items():
        path = ROOT / f"reference/original-cefr-csv/cefr-{level}.csv"
        with path.open(encoding="utf-8-sig", newline="") as stream:
            original = list(csv.DictReader(stream))
        original_terms = {row["Term"].strip().casefold() for row in original}
        local_terms = local_pool(level)
        result[level.upper()] = {
            "original_cards": len(original),
            "local_lesson_count": lessons,
            "local_card_slots": lessons * 6,
            "unique_local_terms": len(local_terms),
            "shared_terms": len(local_terms & original_terms),
            "local_only_terms": sorted(local_terms - original_terms),
            "missing_original_terms": len(original_terms - local_terms),
        }
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
