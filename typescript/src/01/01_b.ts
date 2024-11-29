async function run() {
  // const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const input = await Bun.file(new URL(`${import.meta.url}/../input_test.txt`)).text();
  const lines = input.split("\n");

  const cards = lines.map((line, i) =>
    line
      .split(":")[1]
      .split("|")
      .map((n) => n.trim().split(" "))
  );

  let sum = 0;
  for (const [winning, myNumbers] of cards) {
    console.log(myNumbers);
    
    const match = myNumbers.filter((n) => n.length > 0 && winning.includes(n));
    // console.log(match)

    /* let points = 0;
    for (const n of myNumbers) {
      if (n === "") continue;
      if (winning.includes(n)) {
        if (points === 0) {
          points = 1;
        } else {
          points *= 2;
        }
      }
    } */

    // sum += points;
  }
}

run();
