import assert from "assert";

export default {
  partA,
  partB,
};

const example = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const directions = {
  "^": ">",
  ">": "v",
  v: "<",
  "<": "^",
};

export async function partA() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  let lines = input.split("\n");
  const obstructions = "#";
  let guardPosition = findGuard(lines, "^");

  while (!guardPosition.endOfLine) {
    if (guardPosition.guard === "^") {
      guardPosition = walkTop(guardPosition);
      lines = guardPosition.lines;
    }

    if (guardPosition.guard === ">") {
      guardPosition = walkRight(guardPosition);
      lines = guardPosition.lines;
    }

    if (guardPosition.guard === "v") {
      guardPosition = walkDown(guardPosition);
      lines = guardPosition.lines;
    }

    if (guardPosition.guard === "<") {
      guardPosition = walkLeft(guardPosition);
      lines = guardPosition.lines;
    }
  }

  let sum = 0;
  for (const line of lines) {
    const getAllIndexes = [...line].map((c, i) => (c === "X" ? i : -1)).filter((i) => i !== -1);
    sum += getAllIndexes.length;
  }

  console.log("sum:", sum);
  assert(sum === 4778);

  function walkTop(guardPosition: GuardPosition) {
    const { y, x, guard, lines } = guardPosition;

    for (let y2 = y; y2 >= 0; y2--) {
      const guardY = y2 + 1;
      if (lines[y2][x] === obstructions) {
        const newDirection = directions[guard];
        const newLine = lines[guardY].substring(0, x) + newDirection + lines[guardY].substring(x + 1);
        lines[guardY] = newLine;
        guardPosition.y = guardY;
        guardPosition.guard = newDirection;
        guardPosition.lines = lines;
        break;
      } else {
        // move the guard up
        lines[y2] = lines[y2].substring(0, x) + "X" + lines[y2].substring(x + 1);
        guardPosition.lines = lines;
      }

      if (y2 === 0) {
        guardPosition.endOfLine = true;
      }
    }

    return guardPosition;
  }

  function walkRight(guardPosition: GuardPosition) {
    const { y, x, guard, lines } = guardPosition;

    for (let x2 = x; x2 < lines[y].length; x2++) {
      if (lines[y][x2] === obstructions) {
        const newDirection = directions[guard];
        // lines[y] = lines[y].substring(0, x) + "X" + lines[y].substring(x + 1);
        const newLine = lines[y].substring(0, x2 - 1) + newDirection + lines[y].substring(x2);
        lines[y] = newLine;
        guardPosition.x = x2 - 1;
        guardPosition.guard = newDirection;
        guardPosition.lines = lines;
        break;
      } else {
        // move the guard right
        lines[y] = lines[y].substring(0, x2) + "X" + lines[y].substring(x2 + 1);
        guardPosition.lines = lines;
      }

      if (x2 === lines[y].length - 1) {
        guardPosition.endOfLine = true;
      }
    }

    return guardPosition;
  }

  function walkDown(guardPosition: GuardPosition) {
    const { y, x, guard, lines } = guardPosition;

    for (let y2 = y; y2 < lines.length; y2++) {
      if (lines[y2][x] === obstructions) {
        const newDirection = directions[guard];
        const newY = y2 - 1;
        const newLine = lines[newY].substring(0, x) + newDirection + lines[newY].substring(x + 1);
        lines[newY] = newLine;
        guardPosition.y = newY;
        guardPosition.guard = newDirection;
        guardPosition.lines = lines;
        break;
      } else {
        // move the guard down
        lines[y2] = lines[y2].substring(0, x) + "X" + lines[y2].substring(x + 1);
        guardPosition.lines = lines;
      }

      if (y2 === lines.length - 1) {
        guardPosition.endOfLine = true;
      }
    }

    return guardPosition;
  }

  function walkLeft(guardPosition: GuardPosition) {
    const { y, x, guard, lines } = guardPosition;

    for (let x2 = x; x2 >= 0; x2--) {
      if (lines[y][x2] === obstructions) {
        const newDirection = directions[guard];
        const newX = x2 + 1;
        const newLine = lines[y].substring(0, x2 + 1) + "X" + lines[y].substring(x2 + 2);
        lines[y] = newLine;
        guardPosition.x = newX;
        guardPosition.guard = newDirection;
        guardPosition.lines = lines;
        break;
      } else {
        const start = x2;
        const end = x2 + 1;
        lines[y] = lines[y].substring(0, start) + "X" + lines[y].substring(end);
      }

      if (x2 === lines.length) {
        guardPosition.endOfLine = true;
      }
    }

    return guardPosition;
  }
}

async function partB() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  let lines = example.split("\n");
  const obstructions = ["#", "O"];

  const grid = lines.map((line) => line.split(""));
  const obstructionPoints = new Set<string>();

  let guardPosition = findGuard([...lines], "^");
  const allVariants = [];

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (grid[y][x] === "#") {
        obstructionPoints.add(`${x},${y}`);
      }
    }
  }

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const check = { ...guardPosition };
      check.y = y;
      check.x = x;

      if (isInfinite(check)) {
        console.log(`${x},${y}`);
      }
    }
  }

  console.log(obstructionPoints);
  console.log(allVariants);

  let sum = 0;
  for (const line of lines) {
    // console.log(line);
    // const getAllIndexes = [...line].map((c, i) => (c === "X" ? i : -1)).filter((i) => i !== -1);
    // sum += getAllIndexes.length;
  }

  console.log("sum:", sum);
  // assert(sum === 4778);

  function isInfinite(guardPosition: GuardPosition) {
    const { y, x } = guardPosition;

    if (obstructionPoints.has(`${x},${y}`)) {
      return false;
    }

    const next = walk(guardPosition);
    console.log(next);

    return false;
  }

  function walk(guardPosition: GuardPosition) {
    if (guardPosition.guard === "^") {
      guardPosition = walkTop(guardPosition);
      lines = guardPosition.lines;
    }

    if (guardPosition.guard === ">") {
      guardPosition = walkRight(guardPosition);
      lines = guardPosition.lines;
    }

    if (guardPosition.guard === "v") {
      guardPosition = walkDown(guardPosition);
      lines = guardPosition.lines;
    }

    if (guardPosition.guard === "<") {
      guardPosition = walkLeft(guardPosition);
      lines = guardPosition.lines;
    }

    return guardPosition;
  }

  function walkTop(guardPosition: GuardPosition) {
    const { y, x, guard, lines } = guardPosition;

    for (let y2 = y; y2 >= 0; y2--) {
      const guardY = y2 + 1;
      if (obstructions.includes(lines[y2][x])) {
        const newDirection = directions[guard];
        const newLine = lines[guardY].substring(0, x) + newDirection + lines[guardY].substring(x + 1);
        lines[guardY] = newLine;
        guardPosition.y = guardY;
        guardPosition.guard = newDirection;
        guardPosition.lines = lines;
        break;
      } else {
        // move the guard up
        lines[y2] = lines[y2].substring(0, x) + "|" + lines[y2].substring(x + 1);
        guardPosition.lines = lines;
      }

      if (y2 === 0) {
        guardPosition.endOfLine = true;
      }
    }

    return guardPosition;
  }

  function walkRight(guardPosition: GuardPosition) {
    const { y, x, guard, lines } = guardPosition;

    for (let x2 = x; x2 < lines[y].length; x2++) {
      if (obstructions.includes(lines[y][x2])) {
        const newDirection = directions[guard];
        const newLine = lines[y].substring(0, x2 - 1) + newDirection + lines[y].substring(x2);
        lines[y] = newLine;
        guardPosition.x = x2 - 1;
        guardPosition.guard = newDirection;
        guardPosition.lines = lines;
        break;
      } else {
        // move the guard right
        lines[y] = lines[y].substring(0, x2) + "+" + lines[y].substring(x2 + 1);
        guardPosition.lines = lines;
      }

      if (x2 === lines[y].length - 1) {
        guardPosition.endOfLine = true;
      }
    }

    return guardPosition;
  }

  function walkDown(guardPosition: GuardPosition) {
    const { y, x, guard, lines } = guardPosition;

    for (let y2 = y; y2 < lines.length; y2++) {
      if (obstructions.includes(lines[y2][x])) {
        const newDirection = directions[guard];
        const newY = y2 - 1;
        const newLine = lines[newY].substring(0, x) + newDirection + lines[newY].substring(x + 1);
        lines[newY] = newLine;
        guardPosition.y = newY;
        guardPosition.guard = newDirection;
        guardPosition.lines = lines;
        break;
      } else {
        // move the guard down
        lines[y2] = lines[y2].substring(0, x) + "|" + lines[y2].substring(x + 1);
        guardPosition.lines = lines;
      }

      if (y2 === lines.length - 1) {
        guardPosition.endOfLine = true;
      }
    }

    return guardPosition;
  }

  function walkLeft(guardPosition: GuardPosition) {
    const { y, x, guard, lines } = guardPosition;

    for (let x2 = x; x2 >= 0; x2--) {
      if (obstructions.includes(lines[y][x2])) {
        const newDirection = directions[guard];
        const newX = x2 + 1;
        const newLine = lines[y].substring(0, x2 + 1) + "+" + lines[y].substring(x2 + 2);
        lines[y] = newLine;
        guardPosition.x = newX;
        guardPosition.guard = newDirection;
        guardPosition.lines = lines;
        break;
      } else {
        const start = x2;
        const end = x2 + 1;
        lines[y] = lines[y].substring(0, start) + "+" + lines[y].substring(end);
      }

      if (x2 === lines.length) {
        guardPosition.endOfLine = true;
      }
    }

    return guardPosition;
  }
}

type GuardPosition = {
  y: number;
  x: number;
  guard: string;
  lines: string[];
  visited: Map<number, number>; // y, x
  obstructionTested: Map<number, number>; // y, x
  endOfLine: boolean;
};

function findGuard(lines: string[], guard: string): GuardPosition {
  for (let y = 0; y < lines.length; y++) {
    if (lines[y].includes(guard)) {
      return { y, x: lines[y].indexOf(guard), guard, lines, endOfLine: false };
    }
  }

  return { y: -1, x: -1, guard: "", lines, endOfLine: false };
}

function testInfinity() {}
