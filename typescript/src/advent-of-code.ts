import day1 from "./1/day1.ts";
import day5 from "./6/day6.ts";
import day6 from "./6/day6.ts";
import day7 from "./7/day7.ts";
import day8 from "./8/day8.ts";
import day9 from "./9/day9.ts";
/* import day10 from "./10/day10.ts";
import day11 from "./11/day11.ts";
import day12 from "./12/day12.ts";
import day13 from "./13/day13.ts";
import day14 from "./14/day14.ts";
import day15 from "./15/day15.ts";
import day16 from "./16/day16.ts";
import day17 from "./17/day17.ts";
import day18 from "./18/day18.ts";
import day19 from "./19/day19.ts";
import day20 from "./20/day20.ts";
import day21 from "./21/day21.ts";
import day22 from "./22/day22.ts";
import day23 from "./23/day23.ts";
import day24 from "./24/day24.ts"; */

async function main() {
  const day = process.argv[2];
  const part = process.argv[3];

  switch (day) {
    case "1":
      switch (part) {
        case "a":
          await day1.partA();
        case "b":
          await day1.partB();
      }

    case "5":
      switch (part) {
        case "a":
          await day5.partA();
        case "b":
          await day5.partB();
      }
    case "7":
      switch (part) {
        case "a":
          await day7.partA();
        case "b":
          await day7.partB();
      }
    case "8":
      switch (part) {
        case "a":
          await day8.partA();
        case "b":
          await day8.partB();
      }
  }
}

main();
