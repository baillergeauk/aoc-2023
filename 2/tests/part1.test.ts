import {
  extractGameResults,
  isGamePossible,
  loadGameRecords,
  sumOfPossibleGameIds,
} from "../part1";
import { Configuration, GameRecord } from "../types";

describe("extractResults", () => {
  const rawResults = "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
  const expectedResults: GameRecord = [
    { blue: 3, red: 4 },
    { red: 1, green: 2, blue: 6 },
    { green: 2 },
  ];

  test("correctly objectify the game results", () => {
    expect(extractGameResults(rawResults)).toEqual(expectedResults);
  });
});

describe("loadGameRecords", () => {
  const fileName = "2/tests/test_input.txt";
  const gameRecords = loadGameRecords(fileName);

  test("has correct number of games", () => {
    expect(Object.keys(gameRecords).length).toBe(5);
  });
});

describe("isGamePossible", () => {
  const possibleGame: GameRecord = [
    { blue: 3, red: 4 },
    { red: 1, green: 2, blue: 6 },
    { green: 2 },
  ];
  const impossibleGame: GameRecord = [
    { green: 8, blue: 6, red: 20 },
    { blue: 5, red: 4, green: 13 },
    { green: 5, red: 1 },
  ];
  const configuration: Configuration = { red: 12, green: 13, blue: 14 };

  test("when game is possible", () => {
    expect(isGamePossible(possibleGame, configuration)).toBe(true);
  });
  test("when game is impossible", () => {
    expect(isGamePossible(impossibleGame, configuration)).toBe(false);
  });
});

describe("sumOfPossibleGameIds", () => {
  const fileName = "2/tests/test_input.txt";
  const gameRecords = loadGameRecords(fileName);
  const configuration = { red: 12, green: 13, blue: 14 };

  test("is correct", () => {
    expect(sumOfPossibleGameIds(gameRecords, configuration)).toBe(8);
  });
});
