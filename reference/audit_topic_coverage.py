"""Compare the original IELTS topic catalog with the current local pools."""

import csv
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG = (ROOT / "client/src/data/catalog.ts").read_text(encoding="utf-8")
CONTENT = (ROOT / "client/src/data/content.ts").read_text(encoding="utf-8")
REFERENCE = ROOT / "reference/original-topic-csv"


def main() -> None:
    manifest = json.loads((REFERENCE / "manifest.json").read_text(encoding="utf-8"))
    original_terms = []
    for item in manifest:
        with (REFERENCE / item["file"]).open(encoding="utf-8-sig", newline="") as stream:
            rows = list(csv.DictReader(stream))
        assert len(rows) == item["cards"]
        original_terms.extend(row["Term"].strip().casefold() for row in rows)

    topic_content = CONTENT.split("export const TOPIC_SETS:", 1)[1].split("export const CEFR_SETS:", 1)[0]
    base_terms = re.findall(r'\bw\("([^"]+)"', topic_content)
    pool_content = CATALOG.split("const ED_EXTRA:", 1)[1].split("export const TOPIC_DEFS:", 1)[0]
    extra_terms = re.findall(r'\["([^"]+)",\s*"/', pool_content)
    local_terms = {word.strip().casefold() for word in base_terms + extra_terms}

    def_block = CATALOG.split("export const TOPIC_DEFS:", 1)[1].split("];", 1)[0]
    local_titles = re.findall(r'\{ id: "[^"]+", cn: "[^"]+", en: "([^"]+)"', def_block)
    original_titles = [item["title"] for item in manifest]
    result = {
        "original_topics": len(manifest),
        "original_card_entries": len(original_terms),
        "original_unique_terms": len(set(original_terms)),
        "local_topics": len(local_titles),
        "local_unique_terms": len(local_terms),
        "shared_terms": len(local_terms & set(original_terms)),
        "same_index_and_title": sum(a == b for a, b in zip(original_titles, local_titles)),
        "same_title_anywhere": len(set(original_titles) & set(local_titles)),
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
