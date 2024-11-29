import assert from "assert";

async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n");

  const grid = lines.map((line) => line.split(""));

  const obj: {
    [key: string]: number[];
  } = {};

  const directions = [
    // top and bottom
    [0, -1],
    [0, 1],
    //left and right
    [-1, 0],
    [1, 0],
    //diagonal
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];

  for (let y = 0; y < grid.length; y++) {
    let isNumber = false;
    let number = "";
    let gearKey = null;

    for (let x = 0; x < grid[y].length; x++) {
      const numberMatch = grid[y][x].match(/[0-9]/);

      // new number
      if (numberMatch && !isNumber) {
        isNumber = true;
        number = "";
        gearKey = null;
      }

      const isEndOfLine = x === grid[y].length - 1;

      if (isEndOfLine && isNumber) {
        number += grid[y][x];
      }

      if ((!numberMatch || isEndOfLine) && isNumber) {
        const value = parseInt(number);

        if (gearKey) {
          obj[gearKey].push(value);
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

        for (let i = 0; i < directions.length; i++) {
          const [yDir, xDir] = directions[i];

          if (grid[y + yDir] && grid[y + yDir][x + xDir]) {
            const char = grid[y + yDir][x + xDir];

            if (char === "*") {
              gearKey = `${x + xDir},${y + yDir}`;

              if (obj[gearKey] == null) {
                obj[gearKey] = [];
              }
            }
          }
        }
      }
    }
  }

  const ratio = Object.values(obj).reduce((acc, [a, b]) => acc + (b ? a * b : 0), 0);
  assert(ratio === 81296995);
}

/* for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== "*") {
        continue;
      }

      let adjacentNumbers = [];

      // find diagonal numbers
      const top = y - 1;
      if (grid[top]) {
        let leftNumber = goLeft(grid[top], x);
        let rightNumber = goRight(grid[top], x);

        if (leftNumber && rightNumber) {
          // determine which direction is the real number
          if (rightNumber.length > leftNumber.length && rightNumber.startsWith(leftNumber)) {
            leftNumber = "";
          } else if (leftNumber.length > rightNumber.length && leftNumber.startsWith(rightNumber)) {
            rightNumber = "";
          }
        }

        if (leftNumber.length > 0) {
          adjacentNumbers.push(+leftNumber);
        }

        if (rightNumber.length > 0) {
          adjacentNumbers.push(+rightNumber);
        }
      }

      const bottom = y + 1;
      if (grid[bottom]) {
        let leftNumber = goLeft(grid[bottom], x);
        let rightNumber = goRight(grid[bottom], x);

        if (leftNumber && rightNumber) {
          if (rightNumber.length > leftNumber.length) {
            leftNumber = "";
          } else if (leftNumber.length > rightNumber.length) {
            //rightNumber.split("").reverse().join("")
            // rightNumber = "";
            //leftNumber.startsWith(rightNumber)
          }
        }

        if (leftNumber.length > 0) {
          adjacentNumbers.push(+leftNumber);
        }

        if (rightNumber.length > 0) {
          adjacentNumbers.push(+rightNumber);
        }
      }

      // left
      const left = x - 1;
      if (grid[y][left]) {
        let leftNumber = "";

        for (let i = x; i >= 0; i--) {
          const isNumber = grid[y][i].match(/[0-9]/);

          if (isNumber) {
            leftNumber = grid[y][i] + leftNumber;
          }

          if (i > x && !isNumber) {
            break;
          }
        }

        if (leftNumber.length > 0) {
          adjacentNumbers.push(+leftNumber);
        }
      }

      // right
      const right = x + 1;
      if (grid[y][right]) {
        let rightNumber = "";

        for (let i = x; i <= grid[y].length; i++) {
          const isNumber = grid[y][i].match(/[0-9]/);

          if (isNumber) {
            rightNumber = grid[y][i] + rightNumber;
          }

          if (i > x && !isNumber) {
            break;
          }
        }

        if (rightNumber.length > 0) {
          adjacentNumbers.push(+rightNumber);
        }
      }
    }
  }
} 

function goLeft(row: string[], startIndex: number) {
  let leftNumber = "";

  for (let i = startIndex; i >= 0; i--) {
    const isNumber = row[i].match(/[0-9]/);

    if (isNumber) {
      leftNumber = row[i] + leftNumber;
    }

    if (i < startIndex && !isNumber) {
      break;
    }
  }

  return leftNumber;
}

function goRight(row: string[], startIndex: number) {
  let rightNumber = "";

  for (let i = startIndex; i < row.length; i++) {
    const isNumber = row[i].match(/[0-9]/);

    if (isNumber) {
      rightNumber = rightNumber + row[i];
    }

    if (i > startIndex && !isNumber) {
      break;
    }
  }

  return rightNumber;
}
*/

run();
