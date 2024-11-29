import assert from "assert";

async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n");

  const symbols = ["&", "%", "-", "@", "+", "=", "$", "/", "#", "*"];

  const grid = lines.map((line) => line.split(""));
  let sum = 0;
  let nums = [];

  for (let y = 0; y < grid.length; y++) {
    let isNumber = false;
    let number = "";
    let isAdjacent = false;

    for (let x = 0; x < grid[y].length; x++) {
      const numberMatch = grid[y][x].match(/[0-9]/);

      // new number
      if (numberMatch && !isNumber) {
        isNumber = true;
        isAdjacent = false;
        number = "";
      }

      const isEndOfLine = x === grid[y].length -1;

      if (isEndOfLine && isNumber) {
        number += grid[y][x];
      }

      if ((!numberMatch || isEndOfLine) && isNumber) {
        if (isAdjacent) {
          const value = parseInt(number);
          sum += value;
          nums.push(value);
        }

        isNumber = false;
      }

      if (!numberMatch) {
        isNumber = false;
        isAdjacent = false;
      }

      // check symbols around number
      if (isNumber) {
        number += grid[y][x];

        // top
        if (grid[y - 1]) {
          if (symbols.includes(grid[y - 1][x])) {
            isAdjacent = true;
          }

          //top left
          if (symbols.includes(grid[y - 1][x - 1])) {
            isAdjacent = true;
          }
          //top right
          if (symbols.includes(grid[y - 1][x + 1])) {
            isAdjacent = true;
          }
        }

        //bottom
        if (grid[y + 1]) {
          if (symbols.includes(grid[y + 1][x])) {
            isAdjacent = true;
          }

          //bottom left
          if (symbols.includes(grid[y + 1][x -1])) {
            isAdjacent = true;
          }
          //bottom right
          if (symbols.includes(grid[y + 1][x +1])) {
            isAdjacent = true;
          }
        }

        // left
        if (grid[y][x - 1]) {
          if (symbols.includes(grid[y][x - 1])) {
            isAdjacent = true;
          }
        }

        // right
        if (grid[y][x + 1]) {
          if (symbols.includes(grid[y][x + 1])) {
            isAdjacent = true;
          }
        }
      }
    }
  }

  assert(sum === 517021)

  /* for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const top = lines[i - 1];
    const bottom = lines[i + 1];

    const numberRegex = /\d+/g;
    const numbers = line.match(numberRegex);

    numbers?.forEach((number) => {
      const value = parseInt(number);

      let start = line.indexOf(number);
      let end = start + number.length;

      const left = line[start - 1];
      const right = line[end];

      if ((left && symbols.includes(left)) || (right && symbols.includes(right))) {
        numbersWithAdj.push(value);
        return;
      }

      let numberAdded = false;

      if (top) {
        if (number === "3") {
          // console.log(top);
          console.log(line);
          console.log(`number: ${number}`);
        }

        const start = findNumberIndex(line, number);

        let end = start + number.length;

        for (let j = start - 1; j < end + 1; j++) {
          // if (top[j] && top[j] !== "." && !top[j].match(/[0-9.]/)?.length) {
          // if (top[j] && top[j] !== "." && !top[j].match(numberRegex)?.length) {
          if (top[j] && symbols.includes(top[j])) {
            numbersWithAdj.push(value);
            numberAdded = true;
          }
        }
      }

      if (numberAdded) {
        return;
      }

      if (bottom) {
        //let start = line.indexOf(number);
        const start = findNumberIndex(line, number);
        let end = start + number.length;

        if (number === "3") {
          console.log(line);
          console.log(start, end);
          console.log(line.substring(start, end));
        }

        for (let j = start - 1; j < end + 1; j++) {
          // if (bottom[j] && bottom[j] !== "." && !bottom[j].match(numberRegex)?.length) {
          // if (bottom[j] && bottom[j] !== "." && !bottom[j].match(/[0-9.]/)?.length) {
          if (bottom[j] && symbols.includes(bottom[j])) {
            // numbersWithAdj.push(value);
          }
        }
      }
    });
  } */

  /* const sum = numbersWithAdj.map(Number).reduce((acc, number) => acc + number, 0);
  console.log(numbersWithAdj);
  let res = 0;
  numbersWithAdj.forEach((n) => {
    res += n;
  });
  console.log(sum);
  console.log(res); */
  // assert(sum === 517021)

  // 516054

  /* function findNumberIndex(line: string, number: string) {
    let numberIndex = line.indexOf(number);
    while (numberIndex !== -1) {
      const str = line.substring(numberIndex);
      let indexNumber = "";
      for (let j = 0; j < str.length; j++) {
        if (isNaN(parseInt(str[j]))) {
          break;
        }

        indexNumber += str[j];
      }

      if (number === indexNumber) {
        break;
      }

      numberIndex = line.indexOf(number, numberIndex + 1);
    }

    return numberIndex;
  } */
}

run();
