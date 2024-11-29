import assert from "assert";

async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n");

  const cards = lines.map((line, i) =>
    line
      .split(":")[1]
      .split("|")
      .map((n) => n.trim().split(" "))
  );

  const sum = cards.reduce((total, [winning, myNumbers]) => {
    let points = myNumbers.reduce((acc, n) => {
      if (n.length > 0 && winning.includes(n)) {
        if (acc === 0) {
          acc = 1;
        } else {
          acc *= 2;
        }
      }

      return acc;
    }, 0);

    return total + points;
  }, 0)

  console.log(sum);
  assert(sum === 18519)
}

run();
