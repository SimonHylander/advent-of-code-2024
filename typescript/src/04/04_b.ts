async function run() {
  const input = await Bun.file(
    new URL(`${import.meta.url}/../input.txt`)
  ).text();

  const example = ``;

  const lines = input.split("\n");

  /* const cards = lines.map((line, i) =>
    line
      .split(":")[1]
      .split("|")
      .map((n) => n.trim().split(" "))
  );

  let sum = 0;
  const map = new Map<number, number[]>();
  const instances = Array.from({ length: cards.length }, () => 1);

  cards.forEach(([winning, myNumbers], index) => {
    const matches = myNumbers.filter(
      (n) => n.length > 0 && winning.includes(n)
    );

    let count = matches.length;

    for (let i = 0; i < matches.length; i++) {
      instances[index + count--] += instances[index];
    }
  });

  for (const instance of instances) {
    sum += instance;
  } */
}

run();
