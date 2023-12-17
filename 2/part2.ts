import { loadGameRecords } from "./part1";
import { Color, CubeSet, GameRecord } from "./types";

export function minimumCubeSet(gameRecord: GameRecord): CubeSet {
  const minimumCubeSet = { blue: 0, green: 0, red: 0 };

  gameRecord.forEach((set) => {
    for (const [color, value] of Object.entries(set)) {
      if (value > minimumCubeSet[color as Color]) {
        minimumCubeSet[color as Color] = value;
      }
    }
  });

  return minimumCubeSet;
}

export function powerOfCubeSet(cubeSet: CubeSet): number {
  return Object.values(cubeSet).reduce((sum, value) => sum * value, 1);
}

export function sumOfMinimumCubeSetsPower(
  gameRecords: Record<string, GameRecord>
): number {
  return Object.values(gameRecords).reduce(
    (sum, game) => sum + powerOfCubeSet(minimumCubeSet(game)),
    0
  );
}

if (require.main === module) {
  const INPUT_PATH = "2/input.txt";
  const gameRecords = loadGameRecords(INPUT_PATH);

  console.log(
    `the sum of the minimum cube sets power is ${sumOfMinimumCubeSetsPower(
      gameRecords
    )}`
  );
}
