import assert from "assert";

async function run() {
  const input = await Bun.file(
    new URL(`${import.meta.url}/../input.txt`)
  ).text();

  const lines = input.split("\n");
  const lineLevels = lines.map((line) => line.trim().split(" ").map(Number));

  let safeCount = lineLevels.filter((levels) => {
    if (isSafe(levels)) {
      return true;
    }

    for (let i = 0; i < levels.length; i++) {
      const withoutCurrent = levels.toSpliced(i, 1);

      if (isSafe(withoutCurrent)) {
        return true;
      }
    }

    return false;
  }).length;

  assert(safeCount === 626);

  function isSafe(levels: number[]) {
    const diffs = levels.map((l, i) => l - levels[i - 1]);
    diffs.shift();
    return (
      diffs.every((d) => d >= -3 && d < 0) ||
      diffs.every((d) => d <= 3 && d > 0)
    );
  }
}

run();
