import Board from "./model/Board";
import Move from "./model/Move";
import TileValues, { TilePattern, WinnerPattern } from "./model/TileValues";
import Row from "./model/Row";
import Tile from "./model/Tile";
import { Players } from "./model/Player";

// makeTile
export const mt = (ri: number, ci: number, va: TileValues): Tile => ({
  colIndex: ci,
  rowIndex: ri,
  value: va,
});

// makeRow
export const mr = (rowIndex: number): Row => [
  mt(rowIndex, 0, "_"),
  mt(rowIndex, 1, "_"),
  mt(rowIndex, 2, "_"),
];

const tilesEqual = (t1: Tile, t2: Tile): boolean =>
  t1.colIndex === t2.colIndex && t1.rowIndex === t2.rowIndex;

/**
 * return last item in an Array or string (Array of chars)
 */
export const last = (xs: string | Array<any>) => xs[xs.length - 1];

export const initialBoard: Board = [mr(0), mr(1), mr(2)];

export const validateMove = (board: Board, move: Move): boolean =>
  isFreeTile(board[move.tile.rowIndex][move.tile.colIndex]);

/**
 * currentBoard + Move = newBoard
 */
export const makeBoardBasedOnMove = (board: Board, move: Move): Board =>
  board.map((row) =>
    row.map((tile) =>
      tilesEqual(move.tile, tile)
        ? { ...tile, value: move.player }
        : { ...tile }
    )
  );

/**
 * Undo by removing the latest board from the history
 */
export const undoMove = (boards: Array<Board>): Array<Board> =>
  boards.length === 1 ? boards : boards.slice(0, -1);

/**
 * Is a Tile not occupied by a Player?
 */
const isFreeTile = (tile: Tile) =>
  tile.value !== Players.Human && tile.value !== Players.Ai;

/**
 * Get a list of free tiles
 */
const getFreeTiles = (board: Board): Array<Tile> =>
  board.reduce((acc, curr) => acc.concat(curr.filter(isFreeTile)));

/**
 * answer can include zero but not max itself [0 .. (max - 1)]
 */
const makeRandomInt = (max: number) => Math.floor(Math.random() * max);

const getRandomTile = (tiles: Array<Tile>): Tile =>
  tiles[makeRandomInt(tiles.length)];

export const getRandomFreeTile = (board: Board): Tile =>
  getRandomTile(getFreeTiles(board));

const isWinnerPattern = (tilePattern: string): boolean =>
  tilePattern === "xxx" || tilePattern === "yyy";

const tilesToPattern = (tiles: Array<Tile>) =>
  tiles.reduce((acc: string, curr) => acc + curr.value, "");

const getColumn = (colNr: number, board: Board): Array<Tile> => [
  board[0][colNr],
  board[1][colNr],
  board[2][colNr],
];

const getDiagonal = (startColNr: number, board: Board): Array<Tile> =>
  startColNr === 0
    ? [board[0][0], board[1][1], board[2][2]]
    : [board[0][2], board[1][1], board[2][0]];

/**
 * Is any of the booleans in the array true?
 */
const anyTrue = (arr: Array<boolean>): boolean => arr.find((b) => b) || false;

export const isThereAWinner = (board: Board) => {
  const horizontalWinner = anyTrue(
    board.map((row) => isWinnerPattern(tilesToPattern(row)))
  );

  const verticalWinner = anyTrue(
    [0, 1, 2].map((colNr) =>
      isWinnerPattern(tilesToPattern(getColumn(colNr, board)))
    )
  );

  const diagonalWinner = anyTrue(
    [getDiagonal(0, board), getDiagonal(2, board)].map((row) =>
      isWinnerPattern(tilesToPattern(row))
    )
  );

  console.log(diagonalWinner);

  return horizontalWinner || verticalWinner || diagonalWinner;
};
