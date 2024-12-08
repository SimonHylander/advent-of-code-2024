import assert from "assert";

async function run() {
  const input = await Bun.file(
    new URL(`${import.meta.url}/../input.txt`)
  ).text();

  const regex = /mul\((\d+),\s*(\d+)\)/g;
  const matches = input.match(regex);

  let sum = 0;
  matches?.forEach((match) => {
    const regex2 = /mul\((\d+),\s*(\d+)\)/;
    const [_, left, right] = match.match(regex2);
    const leftNum = parseInt(left);
    const rightNum = parseInt(right);
    sum += leftNum * rightNum;
  });

  assert(sum === 170068701);
}

run();
