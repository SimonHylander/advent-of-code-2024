import assert from "assert";

export default {
  partA,
  partB,
};

const example = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

export async function partA() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  let lines = example.split("\n");
  // let lines = input.split("\n");
  // console.log(lines);

  const operators = ["+", "*"];
  let sum = 0;
  for (const line of lines) {
    const [test, steps] = line.split(": ");
    const testNum = +test;
    const nums = steps.split(" ").map(Number);

    const operatorSlots = nums.length - 1;
    const result = [];

    // Generate all combinations of operators (2^n combinations)
    const totalCombinations = Math.pow(2, operatorSlots);
    console.log("totalCombinations", totalCombinations, operatorSlots);
    for (let i = 0; i < totalCombinations; i++) {
      let combination = nums[0].toString(); // Start with the first number
      let binary = i.toString(2).padStart(operatorSlots, "0");
      // console.log(combination, binary);

      // Insert operators between numbers based on the binary string
      const combo = [nums[0]];
      for (let j = 0; j < operatorSlots; j++) {
        // console.log(j, binary[j]);
        // const operator = operators[parseInt(binary[j], 10)];

        for (let o = 0; o < operators.length; o++) {
          const operator = operators[o];
        }
        // const operator = operators[j];

        combination += ` ${operator} ${nums[j + 1]}`;
        combo.push(operator, nums[j + 1]);
      }
      console.log(combination);
      result.push(combo);
    }
    console.log(nums, result);
    /* const combinationNums: (number | string)[] = Array.from({ length: nums.length + operators.length }, (_, i) => i);
    console.log(combinationNums);
    nums.forEach((num, i) => {
      combinationNums.push(num);

      if (i < nums.length - 1) {
        // combinationNums.push(operator);
      }
    }); */
    // combinations.push(combinationNums);
    // console.log(combinations);

    /* const addition = nums.reduce((acc, num) => acc + num, 0);

    if (addition === testNum) {
      sum++;
      // continue;
    }
    const multiplication = nums.reduce((acc, num) => acc * num, 1);

    if (multiplication === testNum) {
      sum++;
    }

    console.log(nums, addition, multiplication); */
  }

  console.log("sum:", sum);
}

async function partB() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  let lines = example.split("\n");

  // console.log("sum:", sum);
  // assert(sum === 4778);
}
