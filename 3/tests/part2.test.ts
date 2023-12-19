import { readFileSync } from "fs";
import {
  Coordinates,
  findSurroundingNumbers,
  range,
  sumGearRatios,
} from "../part2";

const INPUT = readFileSync("3/tests/test_input.txt", {
  encoding: "utf-8",
  flag: "r",
});

test("range", () => {
  expect(range(2, 5)).toEqual([2, 3, 4, 5]);
});

describe("findSurroundingNumbers", () => {
  const splitInput = INPUT.split("\n");

  test("with number on the same line", () => {
    const coordinates: Coordinates = { x: 3, y: 4 };
    expect(findSurroundingNumbers(coordinates, splitInput)).toEqual(
      expect.arrayContaining([617])
    );
  });
  test("with numbers on top and bottom", () => {
    const coordinates: Coordinates = { x: 3, y: 1 };
    expect(findSurroundingNumbers(coordinates, splitInput)).toEqual(
      expect.arrayContaining([467, 35])
    );
  });
});

describe("sumGearRatios", () => {
  const expectedResult = 467835;

  test("return correct number", () => {
    expect(sumGearRatios(INPUT)).toBe(expectedResult);
  });
});
