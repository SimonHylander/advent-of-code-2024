import assert from "assert";

export default {
  partA,
  partB,
};

export async function partA() {
  const input = await Bun.file(new URL(`${import.meta.url}/../../../../input/1/input.txt`)).text();

  const lines = input.split("\n");

  const [left, right] = lines.reduce<[number[], number[]]>(
    (acc, line) => {
      const [left, right] = line.split("   ").map(Number);
      acc[0].push(left);
      acc[1].push(right);
      return acc;
    },
    [[], []]
  );

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  const sum = left
    .map((l, i) => (l > right[i] ? l - right[i] : right[i] - l))
    .reduce((total, distance) => total + distance);

  console.log("sum:", sum);
  // assert(sum === 2580760);
}

async function partB() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();

  const lines = input.split("\n");

  const [left, right] = lines.reduce<[number[], number[]]>(
    (acc, line) => {
      const [left, right] = line.split("   ").map(Number);
      acc[0].push(left);
      acc[1].push(right);
      return acc;
    },
    [[], []]
  );

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  const sum = left.map((l, i) => l * right.filter((r) => r === l).length).reduce((total, distance) => total + distance);

  assert(sum === 25358365);
}
