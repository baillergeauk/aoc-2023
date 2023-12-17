import { readFileSync } from "fs";
import { Color, Configuration, GameRecord, CubeSet } from "./types";

export function extractGameResults(results: string): GameRecord {
  return results.split(";").map((set) => {
    const colorValuePairs = set.trim().split(",");
    const setObject = colorValuePairs.reduce<CubeSet>((acc, pairs) => {
      const [value, color] = pairs.trim().split(" ");
      acc[color as Color] = parseInt(value);
      return acc;
    }, {});

    return setObject;
  });
}

export function loadGameRecords(filePath: string): Record<string, GameRecord> {
  const data = readFileSync(filePath, { encoding: "utf-8", flag: "r" });

  return data.split("\n").reduce<Record<string, GameRecord>>((acc, line) => {
    const gameData = line.match(/(\d+):(.*)$/);

    if (gameData) {
      const [, gameNumber, results] = gameData;
      acc[gameNumber] = extractGameResults(results);
    }

    return acc;
  }, {});
}

export function isGamePossible(
  gameRecord: GameRecord,
  configuration: Configuration
): boolean {
  return !gameRecord.some((set) => {
    for (const [color, value] of Object.entries(set)) {
      if (value > configuration[color as Color]) {
        return true;
      }
    }
  });
}

export function sumOfPossibleGameIds(
  gameRecords: Record<string, GameRecord>,
  configuration: Configuration
): number {
  return Object.entries(gameRecords).reduce((acc, [gameNumber, gameRecord]) => {
    return isGamePossible(gameRecord, configuration)
      ? acc + parseInt(gameNumber)
      : acc;
  }, 0);
}

if (require.main === module) {
  const CONFIGURATION: Configuration = { red: 12, green: 13, blue: 14 };
  const INPUT_PATH = "2/input.txt";

  const gameRecords = loadGameRecords(INPUT_PATH);
  console.log(
    `the sum of possible game ids with this configuration is ${sumOfPossibleGameIds(
      gameRecords,
      CONFIGURATION
    )}`
  );
}
