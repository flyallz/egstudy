"""Restore source question and option order for A2 lessons 2–4 easy banks."""

import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
units = json.loads((root / "reference/forumflash-a2-original.json").read_text(encoding="utf-8"))["units"]
path = root / "client/src/data/currentSiteA2.ts"
text = path.read_text(encoding="utf-8")

for unit_index, export in [(1, "A2_PAST_SIMPLE_QUESTIONS"), (2, "A2_WAS_WERE_QUESTIONS"), (3, "A2_MOVEMENT_QUESTIONS")]:
    start = f"export const {export}: QuizQuestion[] = [\n"
    before, rest = text.split(start, 1)
    block, after = rest.split("\n];", 1)
    lines = [line for line in block.splitlines() if line.strip().startswith("easy(")]
    assert len(lines) == 20, (export, len(lines))
    parsed = []
    for line in lines:
        match = re.search(r"(\[.*?\]),\s*(\d+),", line)
        assert match, line
        options = json.loads(match.group(1))
        parsed.append((line, options, options[int(match.group(2))], match))

    used = set()
    output = []
    for source_index in units[unit_index]["levels"]["easy"]:
        source = units[unit_index]["pool"][source_index]
        candidates = [i for i, (line, options, answer, _) in enumerate(parsed)
                      if i not in used and sorted(options) == sorted(source["options"]) and answer == source["answer"]]
        assert candidates, (export, source)
        sentence = source.get("sentence", "")
        if sentence and sentence.isascii():
            matched = [i for i in candidates if sentence in parsed[i][0]]
            if matched:
                candidates = matched
        choice = candidates[0]
        used.add(choice)
        line, _, _, match = parsed[choice]
        replacement = json.dumps(source["options"], ensure_ascii=False) + ", " + str(source["options"].index(source["answer"])) + ","
        output.append(line[:match.start()] + replacement + line[match.end():])
    assert len(used) == 20
    text = before + start + "\n".join(output) + "\n];" + after

path.write_text(text, encoding="utf-8")
