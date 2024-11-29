async function run() {
  type Node = {
    element: string;
    next: string[];
  };

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
    } as Node;
  });

  // let currentNode = network.find((n) => n.element === "AAA") ?? network[0];

  const startingNodes = network.filter((n) => n.element.endsWith("A"));

  const start: { [key: string]: Node } = {};
  // console.log(startingNodes)

  let arr = [];
  for (const startingNode of startingNodes) {
    let steps = 0;
    let directionIndex = 0;
    let currentNode = startingNode;
    // console.log(currentNode)

    while (!currentNode.element.endsWith("Z")) {
      // console.log(currentNode)
      if (directionIndex === directions.length) {
        directionIndex = 0;
        // break
      }

      const direction = directions[directionIndex];
      const nextNode = next(currentNode, network, direction);

      if (nextNode) {
        if (nextNode.element.endsWith("Z")) {
          console.log(nextNode)
        }

        currentNode = nextNode;
        directionIndex++;
        steps++;
      }
    }

    arr.push(steps);
    break
  }

  console.log(arr);

  const sum = arr.reduce((acc, step) => acc * step, 1);
  // 55231391107
  console.log(sum);
  // console.log(sum * directions.length)
  // 15299095336639

  /* 
  for (const startingNode of startingNodes) {
    start[startingNode.element] = startingNode
  }
    let directionIndex = 0;
    let steps = 0;
    let allEndsWithZ = false

    while (!allEndsWithZ) {
      console.log("---------")
      console.log(`Steps: ${steps} `, start)

      if (directionIndex === directions.length) {
        directionIndex = 0;
      }

      const direction = directions[directionIndex];

      Object.keys(start).forEach(key => {
        const nextNode = next(start[key], network, direction);

        if (nextNode) {
          start[key] = nextNode
        }
      })

      allEndsWithZ = Object.keys(start).every(key => start[key].element.endsWith("Z"))

      directionIndex++;
      steps++;

      if (allEndsWithZ) {
        break
      }
    } */
  // console.log(steps);

  function next(currentNode: Node, nodes: Node[], direction: string) {
    if (direction === "L") {
      console.log("LEFT");
      const [left, _] = currentNode.next;
      console.log(currentNode.element, left);
      const next = network.find((n) => n.element === left);
      if (next) {
        if (currentNode.element === "ZZZ") {
          return currentNode;
          // break;
          // return currentNode;
        }

        // currentNode = next;
        // steps++;
        // directionIndex++;
      }

      return next;
    }

    if (direction === "R") {
      console.log("RIGHT");
      const [_, right] = currentNode.next;
      console.log(currentNode.element, right);
      const next = network.find((n) => n.element === right);
      if (next) {
        // currentNode = next;
        // steps++;
        // directionIndex++;

        if (currentNode.element === "ZZZ") {
          return currentNode;
          // break;
        }
      }

      return next;
    }
  }
}

run();
