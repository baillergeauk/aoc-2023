import { loadGameRecords } from "../part1";
import {
  minimumCubeSet,
  powerOfCubeSet,
  sumOfMinimumCubeSetsPower,
} from "../part2";
import { GameRecord } from "../types";

describe("minimumCubeSet", () => {
  const gameRecord: GameRecord = [
    { blue: 3, red: 4 },
    { red: 1, green: 2, blue: 6 },
    { green: 2 },
  ];
  const expectedResult = { red: 4, green: 2, blue: 6 };

  test("returns the minimum cube set for a given game", () => {
    expect(minimumCubeSet(gameRecord)).toEqual(expectedResult);
  });
});

describe("powerOfCubeSets", () => {
  const cubeSet = { red: 4, green: 2, blue: 6 };
  const expectedPower = 48;

  test("returns the power of a cube set", () => {
    expect(powerOfCubeSet(cubeSet)).toBe(expectedPower);
  });
});

describe("sumOfMinimumCubeSetsPower", () => {
  const fileName = "2/tests/test_input.txt";
  const gameRecords = loadGameRecords(fileName);
  const expectedResult = 2286;

  test("returns the power of a cube set", () => {
    expect(sumOfMinimumCubeSetsPower(gameRecords)).toBe(expectedResult);
  });
});
