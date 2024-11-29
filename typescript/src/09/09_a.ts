async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n");

  const mapped = lines.map((history) => history.split(" ").map(Number));

  for (let i = 0; i < mapped.length; i++) {
    console.log(mapped[i]);
    // const seq = mapped[i].map((n, j)=> mapped[i][j+1] - mapped[i][j])
    let seq = sequence(mapped[i]);

    /* let count = 0;
    while (true) {
      const ev = seq.every((n) => n === 0);

      if (ev) {
        break;
      }

      seq = sequence(mapped[i]);

      count++
    } */

    /* while(!seq.every(n => n === 0)) {
      seq = sequence(seq)
      console.log(seq)
    } */
    console.log(seq);
    break;
  }

  function sequence(input: number[]) {
    return input.map((_, j) => input[j + 1] - input[j]).filter((n) => !isNaN(n));

    /* if (seq.every((n) => n === 0)) {
      return seq;
    } */

    // return sequence(seq);
  }
}

run();
