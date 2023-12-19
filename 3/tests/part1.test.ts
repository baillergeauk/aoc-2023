import { readFileSync } from "fs";
import {
  PartCoordinates,
  isAdjacentToSymbol,
  sumOfPartNumbers,
} from "../part1";

describe("isAdjacentToSymbol", () => {
  const splitInput = readFileSync("3/tests/test_input.txt", {
    encoding: "utf-8",
    flag: "r",
  }).split("\n");
  const adjacentCoordinates: PartCoordinates = { xStart: 0, xEnd: 2, y: 0 };
  const nonAdjacentCoordinates: PartCoordinates = { xStart: 7, xEnd: 8, y: 5 };

  test("when is adjacent to symbol", () => {
    expect(isAdjacentToSymbol(adjacentCoordinates, splitInput)).toBe(true);
  });
  test("when is not adjacent to symbol", () => {
    expect(isAdjacentToSymbol(nonAdjacentCoordinates, splitInput)).toBe(false);
  });
});

describe("sumOfPartNumbers", () => {
  const input = readFileSync("3/tests/test_input.txt", {
    encoding: "utf-8",
    flag: "r",
  });
  const expectedResult = 4361;

  test("return correct number", () => {
    expect(sumOfPartNumbers(input)).toBe(expectedResult);
  });
});
