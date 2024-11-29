async function run() {
  const input = await Bun.file(
    new URL(`${import.meta.url}/../input.txt`)
  ).text();

  const lines = input.split("\n\n");

  const seeds = lines
    .shift()
    ?.split(": ")[1]
    .split(" ")
    .map(Number)
    .reduce(
      (acc, n, index, arr) => (
        index % 2 === 0 ? acc.push([n, arr[index + 1]]) : acc, acc
      ),
      [] as number[][]
    );

  type MapElement = {
    src: number;
    dst: number;
    range: number;
  };

  type Node = {
    src: string;
    dst: string;
    elements: MapElement[];
  };

  function range(line: string) {
    const [dst, src, range] = line.split(" ");

    return {
      src: +src,
      dst: +dst,
      range: +range,
    } as MapElement;
  }

  function parse(line: string) {
    const filtered = line.split("\n").filter((n) => n);
    const [src, _, dst] = filtered.shift()?.split(" ")[0].split("-") || [];

    return {
      src,
      dst,
      elements: filtered.map(range),
    } as Node;
  }

  type Map = {
    [key: string]: Node;
  };

  const map: Map = lines
    .map((line) => parse(line))
    .reduce((acc, item) => {
      acc[item.src] = item;
      return acc;
    }, {} as Map);

  function findNode(seedNumber: number, name: string, map: Map) {
    if (map[name] === undefined) {
      return seedNumber;
    }

    const item = map[name];

    // find the line that has seed number in range
    const rangeLine = item.elements.find(
      (n) => n.src <= seedNumber && seedNumber <= n.src + n.range
    );

    if (rangeLine) {
      const index = seedNumber - rangeLine.src;
      const next = rangeLine.dst + index;
      return findNode(next, item.dst, map);
    }

    return findNode(seedNumber, item.dst, map);
  }

  /* let lowest = seeds
    ?.map((seed) => findNode(seed, "seed", map))
    .sort((a, b) => a - b); */

  // console.log(seeds);
  let tot = 0;
  const arr: number[] = [];
  seeds?.forEach((seedPair) => {
    // console.log(seedPair);
    const [seed, range] = seedPair;
    // console.log(location);
    for (let i = 0; i < range; i++) {
      const location = findNode(seed + i, "seed", map);
      arr.push(location);
    }
    tot += range;
  });

  arr.sort((a, b) => a - b)
  console.log(arr);

  console.log(tot);
  // console.log(lowest);
}

run();
