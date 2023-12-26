import { readFileSync } from "fs";

const input = readFileSync("4/input.txt", {
  encoding: "utf-8",
  flag: "r",
})
  .split("\n")
  .filter((x) => !!x);

let sum = 0;

for (const line of input) {
  const [winningNumbers, scratchedNumbers] = line
    .split(":")
    .slice(1)[0]
    .split("|")
    .map((numbers) => numbers.split(" ").filter((x) => !!x));

  const matchesCount =
    winningNumbers.length +
    scratchedNumbers.length -
    [...new Set(winningNumbers.concat(scratchedNumbers))].length;

  if (matchesCount > 0) {
    sum += 2 ** (matchesCount - 1);
  }
}

console.log(sum);
