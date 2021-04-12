import { initialBoard, makeBoardBasedOnMove, validateMove } from "./core";
import { Players } from "./Player";

describe("core", () => {
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
});
