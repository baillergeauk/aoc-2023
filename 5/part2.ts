import { readFileSync } from "fs";

function findOverlap(
  start1: number,
  end1: number,
  start2: number,
  end2: number
) {
  const maxStart = Math.max(start1, start2);
  const minEnd = Math.min(end1, end2);

  if (minEnd >= maxStart) {
    return [maxStart, minEnd];
  }

  return null;
}

function findLowestLocation(input: string) {
  const [rawSeedRanges, ...rest] = input
    .split("\n\n")
    .map((x) => x.split(":")[1]);

  const seedRanges = rawSeedRanges
    .trim()
    .split(" ")
    .reduce<number[][]>((acc, value, i) => {
      if (i % 2 === 0) {
        acc.push([parseInt(value)]);
      } else {
        const seedIndex = (i - 1) / 2;
        acc[seedIndex].push(acc[seedIndex][0] + parseInt(value) - 1);
      }
      return acc;
    }, []);

  const maps = rest.map((map) =>
    map
      .split("\n")
      .filter((x) => !!x)
      .map((row) => row.split(" ").map((value) => parseInt(value)))
      .sort((row1, row2) => row1[1] - row2[1])
  );

  const seedRangeQueue = [...seedRanges];

  for (const map of maps) {
    const matched: number[][] = [];

    while (seedRangeQueue.length > 0) {
      console.log("");
      console.log({ seedRangeQueue, matched });
      const [seedStart, seedEnd] = seedRangeQueue.shift() as number[];
      let matchFound = false;
      console.log(`Looking for seed [${seedStart}, ${seedEnd}]`);

      for (const row of map) {
        const [destination, start, length] = row;

        if (seedStart > start + length - 1) continue;

        console.log(`within row [${start}, ${start + length - 1}]`);
        const overlap = findOverlap(
          seedStart,
          seedEnd,
          start,
          start + length - 1
        );

        console.log("overlap is ", overlap);

        if (overlap) {
          matchFound = true;
          const delta = destination - start;
          matched.push(overlap.map((x) => x + delta));
          console.log(
            `pushing ${overlap} to matched with delta ${delta}, it becomes ${overlap.map(
              (x) => x + delta
            )}`
          );

          if (seedStart < overlap[0]) {
            matched.push([seedStart, overlap[0] - 1]);
            console.log(
              `${seedStart}, ${
                overlap[0] - 1
              } is not overlapping and below min, pushed to matched`
            );
          }

          if (seedEnd > start + length - 1) {
            seedRangeQueue.push([start + length, seedEnd]);
            console.log(
              `[${start + length}, ${seedEnd}] is pushed to the queue`
            );
          }

          break;
        } else {
          if (seedEnd < start) {
            matchFound = true;
            matched.push([seedStart, seedEnd]);
            console.log(
              `[${seedStart}, ${seedEnd}] is not overlapping and below min, pushed to matched`
            );
          }
        }
      }

      if (!matchFound) {
        matched.push([seedStart, seedEnd]);
        console.log(
          `no overlap found for [${seedStart}, ${seedEnd}], pushing to matched as it is`
        );
        matchFound = false;
      }
    }
    seedRangeQueue.push(...matched);

    console.log({ matched });
  }

  console.log("Final result is:", seedRangeQueue);

  return Math.min(...seedRangeQueue.flat());
}

const input = readFileSync("5/input.txt", {
  encoding: "utf-8",
  flag: "r",
});

console.log("Lowest location is : ", findLowestLocation(input));
