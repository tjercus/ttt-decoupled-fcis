import { createEventDefinition } from "ts-bus";
import Move from "./model/Move";
import Board from "./model/Board";

export const tileClickedEvt = createEventDefinition<{
  board: Board;
  move: Move;
}>()("TILE_CLICKED_EVT");
export const moveValidEvt = createEventDefinition<{
  board: Board;
  move: Move;
}>()("MOVE_VALID_EVT");
export const moveInvalidEvt = createEventDefinition<Move>()("MOVE_INVALID_EVT");
export const boardCreatedEvt = createEventDefinition<{
  board: Board;
  player: string;
}>()("BOARD_CREATED_EVT");

export const humanTurnDoneEvt = createEventDefinition<Board>()(
  "HUMAN_TURN_DONE_EVT"
);

export const boardStoredEvt = createEventDefinition<{
  board: Board;
  player: string;
}>()("BOARD_STORED_EVT");

export const resetClickedEvt = createEventDefinition()("RESET_CLICKED_EVT");
export const undoClickedEvt = createEventDefinition()("UNDO_CLICKED_EVT");

export const thereIsAWinnerEvt = createEventDefinition()(
  "THERE_IS_A_WINNER_EVT"
);

// Union type to discriminate on
// export type EventTypes = "TILE_CLICKED_EVT";
