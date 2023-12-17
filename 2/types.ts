export type Color = "red" | "green" | "blue";
export type CubeSet = { [key in Color]?: number };
export type GameRecord = CubeSet[];
export type Configuration = { [key in Color]: number };
