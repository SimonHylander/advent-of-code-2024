import assert from "assert";

async function run() {
  const input = await Bun.file(
    new URL(`${import.meta.url}/../input.txt`)
  ).text();

  const regex = /(mul\((\d+),(\d+)\))|(do|don't)\(\)/g;

  let sum = 0;
  let isOk = true;
  for (const match of input.matchAll(regex)) {
    if (match[4] === "do") {
      isOk = true;
    } else if (match[4] === "don't") {
      isOk = false;
    } else if (isOk) {
      sum += +match[2] * +match[3];
    }
  }

  assert(sum === 78683433);
}

run();
