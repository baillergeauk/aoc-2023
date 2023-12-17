export type Color = "red" | "green" | "blue";
export type GameSet = { [key in Color]?: number };
export type GameRecord = GameSet[];
export type Configuration = { [key in Color]: number };
