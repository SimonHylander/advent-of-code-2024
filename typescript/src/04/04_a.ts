import assert from "assert";

async function run() {
  const input = await Bun.file(
    new URL(`${import.meta.url}/../input.txt`)
  ).text();

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

  const lines = example.split("\n");
  const grid = lines.map((line) => line.split(""));
  // console.log(grid);
  const replaceList = ["X", "M", "A", "S"];

  let sum = 0;

  for (let i = 0; i < grid.length; i++) {
    const reversedLine = grid[i].slice().reverse();

    // horizontal
    for (let x = 0; x < grid[i].length; x++) {
      const items = grid[i].slice(x, x + 4);
      if (items.join("") === "XMAS") {
        // correct
        sum += 1;
      }

      if (grid[i - 3]) {
        const bottomLeftDiagonal = [
          grid[i][x],
          grid[i - 1][x + 1],
          grid[i - 2][x + 2],
          grid[i - 3][x + 3],
        ];

        if (bottomLeftDiagonal.join("") === "XMAS") {
          // console.log(bottomLeftDiagonal, i, x);
          // correct - 4
          sum += 1;
        }
      }
    }

    // backwards
    for (let x = 0; x < reversedLine.length; x++) {
      const items = reversedLine.slice(x, x + 4);
      if (items.join("") === "XMAS") {
        // correct
        sum += 1;
      }

      // diagonal bottom right -> top left
      if (grid[i - 3]) {
        //grid[i].slice().reverse()
        const bottomRightDiagonal = [
          reversedLine[x],
          grid[i - 1].slice().reverse()[x + 1],
          grid[i - 2].slice().reverse()[x + 2],
          grid[i - 3].slice().reverse()[x + 3],
        ];

        if (bottomRightDiagonal.join("") === "XMAS") {
          // console.log(bottomRightDiagonal, i, x);
          // correct - 4
          sum += 1;
        }
      }
    }

    // vertical
    for (let x = 0; x < grid[i].length; x++) {
      if (grid[i + 3]) {
        const verticalDown = [
          grid[i][x],
          grid[i + 1][x],
          grid[i + 2][x],
          grid[i + 3][x],
        ];

        if (verticalDown.join("") === "XMAS") {
          sum += 1;
        }
      }

      if (grid[i - 3]) {
        const verticalUp = [
          grid[i][x],
          grid[i - 1][x],
          grid[i - 2][x],
          grid[i - 3][x],
        ];

        if (verticalUp.join("") === "XMAS") {
          sum += 1;
        }
      }
    }
  }

  console.log(sum);

  /* const cards = lines.map((line, i) =>
    line
      .split(":")[1]
      .split("|")
      .map((n) => n.trim().split(" "))
  );

  const sum = cards.reduce((total, [winning, myNumbers]) => {
    let points = myNumbers.reduce((acc, n) => {
      if (n.length > 0 && winning.includes(n)) {
        if (acc === 0) {
          acc = 1;
        } else {
          acc *= 2;
        }
      }

      return acc;
    }, 0);

    return total + points;
  }, 0) */

  // console.log(sum);
  // assert(sum === 18519)
}

run();
