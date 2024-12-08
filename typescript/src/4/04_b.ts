import assert from "assert";

async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n");
  const grid = lines.map((line) => line.split(""));
  const patterns = ["MSMS", "SMSM", "MMSS", "SSMM"];

  const sum = grid.reduce(
    (sum, line, i) =>
      sum +
      line.reduce(
        (masCount, _, x) =>
          masCount +
          (grid[i][x] === "A" &&
          grid[i - 1] &&
          grid[i + 1] &&
          patterns.includes(`${grid[i - 1][x - 1]}${grid[i - 1][x + 1]}${grid[i + 1][x - 1]}${grid[i + 1][x + 1]}`)
            ? 1
            : 0),
        0
      ),
    0
  );

  console.log("sum:", sum);
  assert(sum === 1950);
}

run();
