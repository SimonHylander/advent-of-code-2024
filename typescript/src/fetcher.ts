async function getInput(year: number, day: number) {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const response = await fetch(url, {
    headers: {
      Cookie: `session=${process.env.AOC_SESSION_ID}`,
    },
  });
  return response.text();
}

import fs from "fs";

async function getOrWriteInput(day: number) {
  const input = await getInput(2024, day);

  try {
    const exists = fs.existsSync(`../input/${day}`);

    if (!exists) {
      fs.mkdirSync(`../input/${day}`);
    }

    fs.writeFileSync(`../input/${day}/input.txt`, input);
  } catch (e) {
    console.error(e);
  }
}

function getDay() {
  return new Date().getDate() + 1;
}

function waitUntilTime(hour: number, minute: number, second: number): Promise<void> {
  return new Promise((resolve) => {
    const check = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(hour, minute, second, 0);

      if (now >= target) {
        resolve();
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

async function main() {
  await waitUntilTime(6, 0, 1);
  // await waitUntilTime(14, 0, 1);
  const day = getDay();
  console.log(`Fetching input for day ${day}`);
  await getOrWriteInput(day);
}

main();
