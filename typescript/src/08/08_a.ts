import assert from "assert";

async function run() {
  const input = await Bun.file(
    new URL(`${import.meta.url}/../input.txt`)
  ).text();

  let lines = [...input.split("\n")];
  let directions = lines.shift()?.split("") as string[];

  const network = lines.slice(1, lines.length).map((line, i) => {
    const [element, instructions] = line.split(" = ");

    const next = instructions
      .substring(instructions.indexOf("(") + 1, instructions.lastIndexOf(")"))
      .trim()
      .split(", ");

    return {
      element,
      next,
    };
  });

  let currentNode = network.find(n => n.element === "AAA") ?? network[0]
  let steps = 0;
  let directionIndex = 0;

  while (currentNode.element !== "ZZZ") {
    if (directionIndex === directions.length) {
      directionIndex = 0;
    }

    const direction = directions[directionIndex];

    if (direction === "L") {
      const [left, _] = currentNode.next;
      const next = network.find((n) => n.element === left);
      if (next) {
        currentNode = next;
        steps++;
        directionIndex++;

        if (currentNode.element === "ZZZ") {
          break;
        }
      }
    }

    if (direction === "R") {
      const [_, right] = currentNode.next;
      const next = network.find((n) => n.element === right);
      if (next) {
        currentNode = next;
        steps++;
        directionIndex++;

        if (currentNode.element === "ZZZ") {
          break;
        }
      }
    }
  }

  console.log(steps);
  assert(steps === 16343)
}

run();
