import { readFileSync } from "fs";

export type Coordinates = { x: number; y: number };

export function range(start: number, end: number): Array<number> {
  return [...Array(end - start + 1).keys()].map((i) => i + start);
}

export function findSurroundingNumbers(
  coords: Coordinates,
  splitInput: Array<string>
): Array<number> {
  const { x, y } = coords;
  const surroundingNumbers: Array<number> = [];

  const sideNumbers = splitInput[y].matchAll(/(\d+)/g);
  const topNumbers = y > 0 ? splitInput[y - 1].matchAll(/(\d+)/g) : [];
  const bottomNumbers =
    y < splitInput.length - 1 ? splitInput[y + 1].matchAll(/(\d+)/g) : [];

  for (const match of sideNumbers) {
    const num = match[1];
    const startIndex = match["index"] as number;
    const endIndex = startIndex + num.length - 1;

    if (startIndex === x + 1 || endIndex === x - 1)
      surroundingNumbers.push(parseInt(num));
  }

  for (const match of [...bottomNumbers, ...topNumbers]) {
    const num = match[1];
    const startIndex = match["index"] as number;
    const endIndex = startIndex + num.length - 1;

    if (range(startIndex - 1, endIndex + 1).includes(x)) {
      surroundingNumbers.push(parseInt(num));
    }
  }

  return surroundingNumbers;
}

export function sumGearRatios(input: string): number {
  const splitInput = input.split("\n");

  return splitInput.reduce((sum, line, index) => {
    const matchedStars = line.matchAll(/\*/g);

    for (const match of matchedStars) {
      const surroundingNumbers = findSurroundingNumbers(
        { x: match["index"] as number, y: index },
        splitInput
      );

      if (surroundingNumbers.length === 2) {
        sum += surroundingNumbers[0] * surroundingNumbers[1];
      }
    }

    return sum;
  }, 0);
}

if (require.main === module) {
  const input = readFileSync("3/input.txt", {
    encoding: "utf-8",
    flag: "r",
  });

  console.log(sumGearRatios(input));
}
