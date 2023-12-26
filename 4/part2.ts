import { readFileSync } from "fs";

const input = readFileSync("4/input.txt", {
  encoding: "utf-8",
  flag: "r",
})
  .split("\n")
  .filter((x) => !!x);

const cardsMapping = input.reduce<{ [key: number]: number }>(
  (acc, _card, i) => {
    acc[i] = 1;
    return acc;
  },
  {}
);

for (const [index, line] of input.entries()) {
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
    for (let i = 0; i < matchesCount; i++) {
      cardsMapping[index + 1 + i] += cardsMapping[index];
    }
  }
}

const numberOfCards = Object.values(cardsMapping).reduce(
  (sum, value) => sum + value,
  0
);

console.log(numberOfCards);
