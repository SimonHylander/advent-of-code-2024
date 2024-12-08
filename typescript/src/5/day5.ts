import assert from "assert";

export default {
  partA,
  partB,
};

const example = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

export async function partA() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n\n");
  const order = lines[0].split("\n").map((line) => line.split("|").map(Number));
  const updates = lines[1].split("\n").map((line) => line.split(",").map(Number));

  let sum = 0;
  for (let y = 0; y < updates.length; y++) {
    const line = updates[y];
    const lineInOrder = isInOrder(line, order);

    if (lineInOrder) {
      const middleIndex = Math.floor(line.length / 2);
      sum += line[middleIndex];
    }
  }

  console.log("sum:", sum);
  assert(sum === 6384);
}

async function partB() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();

  const example = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

  const lines = input.split("\n\n");
  // const lines = example.split("\n\n");
  const order = lines[0].split("\n").map((line) => line.split("|").map(Number));
  const updates = lines[1].split("\n").map((line) => line.split(",").map(Number));

  const invalidUpdates = updates.filter((line) => !isInOrder(line, order));

  const swapPosition = (arr: number[], from: number, to: number) => {
    const temp: number[] = arr.splice(from, 1, arr[from]);
    arr[from] = arr[to];
    arr[to] = temp[0];
  };

  const orderedUpdates = invalidUpdates.map((line) => {
    const befores: Record<number, Set<number>> = {};

    for (let i = 0; i < line.length; i++) {
      befores[line[i]] = new Set();
    }

    for (let i = 0; i < order.length; i++) {
      const [left, right] = order[i];
      if (line.includes(left) && line.includes(right)) {
        befores[right].add(left);
      }
    }

    const result: number[] = [];
    const set = new Set(line);

    while (set.size > 0) {
      const available = Array.from(set).filter((num) => Array.from(befores[num]).every((dep) => !set.has(dep)));

      if (available.length > 0) {
        const next = available[0];
        result.push(next);
        set.delete(next);
      } else {
        const next = Array.from(set)[0];
        result.push(next);
        set.delete(next);
      }
    }

    return result;
  });

  console.log(orderedUpdates);
  const sum = orderedUpdates.map((line) => line[Math.floor(line.length / 2)]).reduce((a, b) => a + b, 0);

  /* for (let j = 0; j < order.length; j++) {
        if (isInOrder(newLine, order)) {
          const middleIndex = Math.floor(newLine.length / 2);
          sum += newLine[middleIndex];
          console.log("break", newLine);
          break;
        }

        const [left, right] = order[j];

        // found ruleset for current number
        if (left === num) {
          if (newLine.includes(right)) {
            if (newLine.includes(right) && newLine.indexOf(num) > newLine.indexOf(right)) {
              // console.log(newLine.indexOf(right), newLine.indexOf(num));
              swapPosition(newLine, newLine.indexOf(right), i);
              // console.log(num, newLine, left, right);

              if (i === 2) {
                // console.log(newLine);
              }
            }
          }
        }
      }

      if (!isInOrder(newLine, order)) {
        console.log("not in order", newLine);
      } else {
        console.log("in order", newLine);
      }
    } */

  console.log("____________________________");
  // const middleIndex = Math.floor(sorted.length / 2);
  // console.log(sorted[middleIndex]);
  // sum += sorted[middleIndex];

  console.log("sum:", sum);
  // assert(sum === 6384);
}

function isInOrder(line: number[], order: number[][]) {
  return line.every((u, i) => {
    const updateRules = order.filter(([left, _]) => left === u);

    const isBefore = updateRules
      .filter(([_, right]) => line.indexOf(right) > -1)
      .every(([_, right]) => i < line.indexOf(right));

    return isBefore;
  });
}

function isBefore(line: number[], order: number[][]) {
  return order.filter(([_, right]) => line.indexOf(right) > -1).every(([_, right]) => line.indexOf(right) > -1);
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      // Increment index of smaller element
      i++;
      // Swap elements
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // Swap pivot to its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1; // Return the partition index
}

function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);

    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}
