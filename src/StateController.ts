import { FunctionComponent, useEffect } from "react";
import {
  boardCreatedEvt,
  boardStoredEvt,
  resetClickedEvt,
  undoClickedEvt,
} from "./events";
import { EventBus } from "ts-bus";
import { initialBoard, last, undoMove } from "./core";
import { Players } from "./Player";

interface Props {
  eventBus: EventBus;
}

const StateController: FunctionComponent<Props> = ({ eventBus }) => {
  let state = {
    boards: [initialBoard],
    thereIsAWinner: false as boolean, // TODO proper name, do we need this?
  };

  useEffect(() => {
    return eventBus.subscribe(boardCreatedEvt, (event) => {
      // write board to list of boards (for undo/redo)
      state = { ...state, boards: [...state.boards, event.payload.board] };
      // propagate event that a new board was stored
      eventBus.publish(
        boardStoredEvt({
          board: event.payload.board,
          player: event.payload.player,
        })
      );
    });
  }, []);

  useEffect(() => {
    return eventBus.subscribe(resetClickedEvt, (event) => {
      state = { ...state, boards: [...state.boards, initialBoard] };
      eventBus.publish(
        boardStoredEvt({ board: last(state.boards), player: Players.Human })
      ); // TODO constant
    });
  }, []);

  useEffect(() => {
    return eventBus.subscribe(undoClickedEvt, (event) => {
      state = {
        ...state,
        boards: undoMove(state.boards),
      };
      eventBus.publish(
        boardStoredEvt({ board: last(state.boards), player: Players.Human })
      );
    });
  }, []);

  return null; // React prefers null for a no-render
};

export default StateController;
