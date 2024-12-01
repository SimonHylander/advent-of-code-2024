import gleam/int
import gleam/io
import gleam/list
import gleam/string
import simplifile as file

pub fn day_1_part_a() {
  let filepath = "src/input/day1.txt"
  let assert Ok(input) = file.read(filepath)
  let lines = string.split(string.trim(input), "\n")

  let #(left_list, right_list) =
    list.fold(lines, #([], []), fn(acc, line) {
      let #(left_list, right_list) = acc
      let assert [left, right] = string.split(line, "   ")
      let assert Ok(left) = int.parse(left)
      let assert Ok(right) = int.parse(right)
      #([left, ..left_list], [right, ..right_list])
    })

  let left_list = list.sort(left_list, int.compare)
  let right_list = list.sort(right_list, int.compare)

  let oga = list.zip(left_list, right_list)

  let sum =
    list.fold(oga, 0, fn(acc, t) {
      let #(left, right) = t
      acc + int.absolute_value(left - right)
    })

  io.debug(sum)
}

pub fn day_1_part_b() {
  let filepath = "src/input/day1.txt"
  let assert Ok(input) = file.read(filepath)
  let lines = string.split(string.trim(input), "\n")

  let #(left_list, right_list) =
    list.fold(lines, #([], []), fn(acc, line) {
      let #(left_list, right_list) = acc
      let assert [left, right] = string.split(line, "   ")
      let assert Ok(left) = int.parse(left)
      let assert Ok(right) = int.parse(right)
      #([left, ..left_list], [right, ..right_list])
    })

  let left_list = list.sort(left_list, int.compare)
  let right_list = list.sort(right_list, int.compare)

  let sum =
    list.fold(left_list, 0, fn(acc, l) {
      let r = list.filter(right_list, fn(a) { a == l })
      acc + l * list.length(r)
    })

  io.debug(sum)
}
