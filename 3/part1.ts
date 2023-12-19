import { readFileSync } from "fs";

export type PartCoordinates = { xStart: number; xEnd: number; y: number };

export function isAdjacentToSymbol(
  partCoordinates: PartCoordinates,
  splitInput: Array<string>
): boolean {
  const minX =
    partCoordinates["xStart"] === 0 ? 0 : partCoordinates["xStart"] - 1;
  const maxX =
    partCoordinates["xEnd"] === splitInput[0].length - 1
      ? splitInput.length - 1
      : partCoordinates["xEnd"] + 1;
  const minY = partCoordinates["y"] === 0 ? 0 : partCoordinates["y"] - 1;
  const maxY =
    partCoordinates["y"] === splitInput.length - 1
      ? splitInput.length - 1
      : partCoordinates["y"] + 1;

  const top =
    partCoordinates["y"] > minY ? splitInput[minY].slice(minX, maxX + 1) : "";
  const bottom =
    partCoordinates["y"] < maxY ? splitInput[maxY].slice(minX, maxX + 1) : "";
  const sides = splitInput[partCoordinates["y"]].slice(minX, maxX + 1);

  const match = (sides + bottom + top).match(/[$@#&%^*+\-=/]/);
  return !!match;
}

export function sumOfPartNumbers(input: string): number {
  const splitInput = input.split("\n");

  return splitInput.reduce((sum, line, index) => {
    const matchedNumbers = line.matchAll(/(\d+)/g);

    for (const match of matchedNumbers) {
      if (match) {
        const num = match[0];
        const xStart = match["index"] as number;
        const xEnd = xStart + num.length - 1;

        if (isAdjacentToSymbol({ xStart, xEnd, y: index }, splitInput)) {
          sum += parseInt(num);
        }
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

  console.log(sumOfPartNumbers(input));
}
