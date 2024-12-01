import argv
import day1
import gleam/io

pub fn main() {
  case argv.load().arguments {
    [first, second, ..] -> {
      case first, second {
        "01", "a" -> {
          io.println("Running Day 1, Part A")
          day1.day_1_part_a()
          io.println("Done")
        }
        "01", "b" -> {
          io.println("Running Day 1, Part B")
          day1.day_1_part_a()
          io.println("Done")
        }
        _, _ -> io.println("Unknown day/part combination")
      }
    }
    _ -> io.println("Usage: advent_of_code_2024 <day> <part>")
  }
}
