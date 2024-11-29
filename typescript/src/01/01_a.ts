import assert from "assert";

async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n");

  const sum = lines
    .map((line) => {
      let firstFound = false;
      let first = "";
      let lastDigitInString: string | undefined;

      for (let i = 0; i < line.length; i++) {
        if (!firstFound && !isNaN(+line[i])) {
          first = line[i];
          firstFound = true;
          continue;
        }

        if (firstFound && isNaN(+line[i])) {
          continue;
        }

        if (!isNaN(+line[i])) {
          lastDigitInString = line[i];
        }
      }

      if (!lastDigitInString) {
        return +(first + first);
      }

      return +(first + lastDigitInString);
    })
    .reduce((a, b) => a + b, 0);

  assert(sum === 54304);
}

run();
