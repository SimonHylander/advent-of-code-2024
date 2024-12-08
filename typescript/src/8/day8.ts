import assert from "assert";

export default {
  partA,
  partB,
};

const example = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

export async function partA() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  let lines = example.split("\n");
  // let lines = input.split("\n");
  // console.log(lines);

  const antiNodes = [];
  // antennes = lowercase letter, uppercase letter, or digit
  const frequencies = lines.flatMap((line, y) =>
    line
      .split("")
      .map((char, x) => (/[a-zA-Z0-9]/.test(char) ? [x, y] : null))
      .filter(Boolean)
  );
  console.log(frequencies);

  const operators = ["+", "*"];
  let sum = 0;
  for (const line of lines) {
    const [test, steps] = line.split(": ");
    const testNum = +test;
  }

  console.log("sum:", sum);
}

async function partB() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  let lines = example.split("\n");

  // console.log("sum:", sum);
  // assert(sum === 4778);
}
