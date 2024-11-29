import assert from "assert";

async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n");

  const [time, recordDistance] = lines.map((line) =>
    line.startsWith("Time:") ? [line.split("Time:")[1].trim()] : [line.split("Distance:")[1].trim()]
  );

  time.forEach((time, i) => {
    const races = time
      .split(" ")
      .map(Number)
      .filter((n) => n > 0);

    const record = recordDistance[i]
      .split(" ")
      .map(Number)
      .filter((n) => n > 0);

    const margin = races.map((race, j) => {
      const scenarios = [];

      for (let k = 0; k < race; k++) {
        const distance = hold(race, k);
        if (distance > record[j]) {
          scenarios.push(k);
        }
      }

      return scenarios.length;
    });

    const sum = margin.reduce((acc, curr) => acc * curr, 1);
    console.log(sum);
    assert(sum === 2449062);
  });

  function hold(duration: number, toHold: number) {
    const mmPerMs = toHold * 1;
    const speed = duration - mmPerMs;
    const distance = toHold * speed;

    return distance;
  }
}

run();
