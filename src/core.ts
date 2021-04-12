import Board from "./Board";
import Move from "./Move";
import TileValues from "./TileValues";
import Row from "./Row";
import Tile from "./Tile";

// makeTile
const mt = (ri: number, ci: number, va: TileValues): Tile => ({
  colIndex: ci,
  rowIndex: ri,
  value: va,
});

// makeRow
const mr = (rowIndex: number): Row => [
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

export const validateMove = (board: Board, move: Move): boolean => {
  const tile = board[move.tile.rowIndex][move.tile.colIndex];
  // TODO make a type 'occupiedTileValue' or '?'
  return tile.value !== "x" && tile.value !== "o";
};

/**
 * currentBoard + move = newBoard
 */
export const makeBoardBasedOnMove = (board: Board, move: Move): Board =>
  board.map((row) =>
    row.map((tile) =>
      tilesEqual(move.tile, tile)
        ? { ...tile, value: move.player }
        : { ...tile }
    )
  );

export const undoMove = (boards: Array<Board>): Array<Board> =>
  boards.length === 1 ? boards : boards.slice(0, -1);
