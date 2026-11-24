// Two Lines to Your Past Self — make.fun entry.
// Two lines: a warning to your past self about one specific moment,
// and one sentence on why it mattered.
// The program writes the two lines to /output/entry.txt for the house judge.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry, as two named lines so the two-line structure is explicit in
// code, not just in a string: line one warns about the moment, line two
// traces what that moment cost.
const LINE_ONE =
  "Say no when your boss offers you the promotion on Tuesday, the one with the corner office and the 70-hour weeks.";
const LINE_TWO =
  "That yes bought you a title and sold the five years your daughter learned to stop asking you to play.";
const OUTPUT = LINE_ONE + "\n" + LINE_TWO;

// Gate: mirror the sealed scorer — UTF-8 text of 1 to 280 characters,
// exactly two lines, each a single sentence, no surrounding whitespace.
// Refuse to write an invalid entry.
function validate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 280) {
    throw new Error(`entry must be 1-280 characters, got ${chars.length}`);
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (line !== line.trim() || line.length === 0) {
      throw new Error("each line must be non-empty with no surrounding whitespace");
    }
    if ((line.match(/\./g) ?? []).length !== 1) {
      throw new Error("each line must be a single sentence");
    }
  }
}

validate(OUTPUT);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", OUTPUT, "utf8");
