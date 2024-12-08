import assert from "assert";

async function run() {
  const input = await Bun.file(
    new URL(`${import.meta.url}/../input.txt`)
  ).text();
  const lines = input.split("\n");

  const lineLevels = lines.map((line) => line.trim().split(" ").map(Number));
  const safeCount = lineLevels.filter((levels) => isSafe(levels)).length;

  function isSafe(levels: number[]) {
    const diffs = levels.map((l, i) => l - levels[i - 1]);
    diffs.shift();
    return (
      diffs.every((d) => d >= -3 && d < 0) ||
      diffs.every((d) => d <= 3 && d > 0)
    );
  }

  assert(safeCount == 585);
}

run();
