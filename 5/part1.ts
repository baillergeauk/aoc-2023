import { readFileSync } from "fs";

function lowestLocationNumber(input: string) {
  const [seedLine, ...rest] = input.split("\n\n");

  const seeds = seedLine
    .split(":")[1]
    .trim()
    .split(" ")
    .map((x) => parseInt(x));

  const maps = rest.map((map) => {
    const [, ...values] = map.split("\n").filter((x) => !!x);
    return values
      .map((line) => line.split(" ").map((x) => parseInt(x)))
      .sort((line1, line2) => line1[1] - line2[1]);
  });

  const seedToLocation = seeds.reduce<{ [key: number]: number }>(
    (acc, seed) => {
      let number = seed;
      for (const map of maps) {
        for (const line of map) {
          const [destination, source, length] = line;

          if (number >= source && number < source + length) {
            number += destination - source;
            break;
          }
        }
      }

      acc[seed] = number;
      return acc;
    },
    {}
  );

  return Math.min(...Object.values(seedToLocation));
}

const input = readFileSync("5/input.txt", {
  encoding: "utf-8",
  flag: "r",
});

console.log("lowest location is :", lowestLocationNumber(input));
