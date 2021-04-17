// @see https://fettblog.eu/tidy-typescript-avoid-enums/

export const Players = { Ai: "o", Human: "x" } as const;

type Player = "x" | "o";

export default Player;
