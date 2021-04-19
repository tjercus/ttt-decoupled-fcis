import {
  getFreeTiles,
  initialBoard,
  isThereAWinner,
  makeBoardBasedOnMove,
  mr,
  mt,
  validateMove,
} from "./core";
import { Players } from "./model/Player";

describe("core", () => {
  describe("getFreeTiles", () => {
    it("should find 9 free tiles in the initial board", () =>
      expect(getFreeTiles(initialBoard).length).toBe(9));
    it("should find 1 free tile when one was clicked earlier", () => {
      const board = [
        mr(0),
        mr(1),
        [mt(2, 0, "_"), mt(2, 1, "x"), mt(2, 2, "_")],
      ];
      expect(getFreeTiles(board).length).toBe(8);
    });
    it("should find 1 free tile when one one each row was clicked earlier", () => {
      const board = [
        [mt(0, 0, "_"), mt(0, 1, "x"), mt(0, 2, "_")],
        [mt(1, 0, "x"), mt(1, 1, "x"), mt(1, 2, "_")],
        [mt(2, 0, "_"), mt(2, 1, "_"), mt(2, 2, "_")],
      ];
      expect(getFreeTiles(board).length).toBe(6);
    });
    it("should find 0 free tiles in the finished board", () => {
      const board = [
        [mt(0, 0, "x"), mt(0, 1, "x"), mt(0, 2, "x")],
        [mt(1, 0, "x"), mt(1, 1, "x"), mt(1, 2, "x")],
        [mt(2, 0, "x"), mt(2, 1, "x"), mt(2, 2, "x")],
      ];
      //console.log(getFreeTiles(board));
      expect(board.length).toBe(3);
      expect(getFreeTiles(board).length).toBe(0);
    });
  });
  describe("validateMove", () => {
    it("should validate true on unused tile", () => {
      const board = initialBoard;
      const move = {
        player: Players.Human,
        tile: {
          colIndex: 1,
          rowIndex: 1,
          value: "_",
        },
      };
      expect(validateMove(board, move)).toBe(true);
    });
    it("should validate false when moving on a used tile", () => {
      const move = {
        player: Players.Human,
        tile: {
          colIndex: 1,
          rowIndex: 1,
          value: "_",
        },
      };
      const board = makeBoardBasedOnMove(initialBoard, move);
      expect(validateMove(board, move)).toBe(false);
    });
  });
  describe("makeBoardBasedOnMove", () => {
    it("should make a board based on a move", () => {
      const move = {
        player: Players.Human,
        tile: {
          colIndex: 1,
          rowIndex: 1,
          value: "_",
        },
      };
      const board = makeBoardBasedOnMove(initialBoard, move);
      expect(board[1][1]).toEqual({
        colIndex: 1,
        rowIndex: 1,
        value: Players.Human,
      });
    });
  });
  // describe("undoMove", () => {
  //   it("should undo the last move", () => {
  //     const boards = [initialBoard, initialBoard];
  //     expect(undoMove(boards)).toEqual(initialBoard);
  //   });
  // });
  describe("isWinner", () => {
    it("should detect NO winner on empty board", () => {
      expect(isThereAWinner(initialBoard)).toEqual(false);
    });
    it("should detect a winner on three horizontal", () => {
      const board = [
        mr(0),
        mr(1),
        [mt(2, 0, "x"), mt(2, 1, "x"), mt(2, 2, "x")],
      ];
      expect(isThereAWinner(board)).toEqual(true);
    });
    it("should detect NO winner on two horizontal", () => {
      const board = [
        mr(0),
        mr(1),
        [mt(2, 0, "_"), mt(2, 1, "x"), mt(2, 2, "x")],
      ];
      expect(isThereAWinner(board)).toEqual(false);
    });
    it("should detect a winner on three vertical", () => {
      const board = [
        [mt(0, 0, "_"), mt(0, 1, "x"), mt(0, 2, "_")],
        [mt(1, 0, "_"), mt(1, 1, "x"), mt(1, 2, "_")],
        [mt(2, 0, "_"), mt(2, 1, "x"), mt(2, 2, "_")],
      ];
      expect(isThereAWinner(board)).toEqual(true);
    });
    it("should detect a winner on three diagonal", () => {
      const board = [
        [mt(0, 0, "x"), mt(0, 1, "_"), mt(0, 2, "_")],
        [mt(1, 0, "_"), mt(1, 1, "x"), mt(1, 2, "_")],
        [mt(2, 0, "_"), mt(2, 1, "_"), mt(2, 2, "x")],
      ];
      expect(isThereAWinner(board)).toEqual(true);
    });
  });
});
