import assert from "assert";

async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n");

  const groups = lines.map((line) => {
    const content = line.split(":", 2)[1];
    return content.split(";").map((s) => s.trim().split(", "));
  });

  const sum = groups.reduce((acc, group, i) => {
    const gameIsPossible = group.every((set) =>
      set.every((cube) => {
        const parsed = parseCubes(cube);
        return (
          (parsed.color === "red" && parsed.amount <= 12) ||
          (parsed.color === "green" && parsed.amount <= 13) ||
          (parsed.color === "blue" && parsed.amount <= 14)
        );
      })
    );

    if (gameIsPossible) {
      return acc + (i + 1);
    }

    return acc;
  }, 0);

  assert(sum == 2683);

  function parseCubes(cube: string) {
    const [amount, color] = cube.trim().split(" ");

    return {
      color,
      amount: +amount,
    };
  }
}

run();
