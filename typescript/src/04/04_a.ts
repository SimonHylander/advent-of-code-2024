import assert from "assert";

async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();

  const example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

  const lines = input.split("\n");
  const grid = lines.map((line) => line.split(""));

  let sum = 0;

  for (let i = 0; i < grid.length; i++) {
    const reversedLine = grid[i].slice().reverse();

    // horizontal
    for (let x = 0; x < grid[i].length; x++) {
      const chars = grid[i].slice(x, x + 4).join("");
      if (chars === "XMAS") {
        sum += 1;
      }

      if (grid[i - 3]) {
        const bl = `${grid[i][x]}${grid[i - 1][x + 1]}${grid[i - 2][x + 2]}${grid[i - 3][x + 3]}`;
        const br = `${grid[i][x]}${grid[i - 1][x - 1]}${grid[i - 2][x - 2]}${grid[i - 3][x - 3]}`;

        if (bl === "XMAS") {
          sum += 1;
        }

        if (br === "XMAS") {
          sum += 1;
        }
      }

      if (grid[i + 3]) {
        const tl = `${grid[i][x]}${grid[i + 1][x + 1]}${grid[i + 2][x + 2]}${grid[i + 3][x + 3]}`;
        const tr = `${grid[i][x]}${grid[i + 1][x - 1]}${grid[i + 2][x - 2]}${grid[i + 3][x - 3]}`;
        if (tl === "XMAS") {
          sum += 1;
        }

        if (tr === "XMAS") {
          sum += 1;
        }
      }
    }

    // backwards
    for (let x = 0; x < reversedLine.length; x++) {
      const chars = reversedLine.slice(x, x + 4).join("");
      if (chars === "XMAS") {
        sum += 1;
      }
    }

    // vertical
    for (let x = 0; x < grid[i].length; x++) {
      if (grid[i + 3]) {
        const verticalDown = [grid[i][x], grid[i + 1][x], grid[i + 2][x], grid[i + 3][x]];

        if (verticalDown.join("") === "XMAS") {
          sum += 1;
        }
      }

      if (grid[i - 3]) {
        const verticalUp = [grid[i][x], grid[i - 1][x], grid[i - 2][x], grid[i - 3][x]];

        if (verticalUp.join("") === "XMAS") {
          sum += 1;
        }
      }
    }
  }

  console.log(sum);
  assert(sum === 2593);
}

run();
