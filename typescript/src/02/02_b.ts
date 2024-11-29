import assert from "assert";

async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n");

  const groups = lines.map((line) => {
    const content = line.split(":", 2)[1];
    return content.split(";").map((s) => s.trim().split(", "));
  });

  const sum = groups.reduce((acc, group) => {
    const flat = group.flatMap(set => set)
    const maxRed = Math.max(...flat.filter(cube => cube.includes("red")).map(c => parseInt(c)))
    const maxGreen = Math.max(...flat.filter(cube => cube.includes("green")).map(c => parseInt(c)))
    const maxBlue = Math.max(...flat.filter(cube => cube.includes("blue")).map(c => parseInt(c)))
    const power = maxRed * maxGreen * maxBlue

    return acc + power
  }, 0)

  assert(sum === 49710)
}

run();
