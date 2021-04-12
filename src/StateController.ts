import { FunctionComponent, useEffect } from "react";
import {
  boardCreatedEvt,
  boardStoredEvt,
  resetClickedEvt,
  undoClickedEvt,
} from "./events";
import { EventBus } from "ts-bus";
import { initialBoard, last, undoMove } from "./core";

interface Props {
  eventBus: EventBus;
}

const StateController: FunctionComponent<Props> = ({ eventBus }) => {
  let state = {
    boards: [initialBoard],
    //currentPlayer: "x" as string, // x | 0 // TODO Player type?
    thereIsAWinner: false as boolean, // TODO proper name
  };

  useEffect(() => {
    return eventBus.subscribe(boardCreatedEvt, (event) => {
      // write board to list of boards (for undo/redo)
      state = { ...state, boards: [...state.boards, event.payload] };
      console.log("new state after adding new board");
      console.log(state);
      // propagate event that a new board was stored
      eventBus.publish(boardStoredEvt(event.payload));
    });
  }, []);

  useEffect(() => {
    return eventBus.subscribe(resetClickedEvt, (event) => {
      // write board to list of boards (for undo/redo)
      state = { ...state, boards: [...state.boards, initialBoard] };
      // propagate event that a new board was stored
      eventBus.publish(boardStoredEvt(last(state.boards)));
    });
  }, []);

  useEffect(() => {
    return eventBus.subscribe(undoClickedEvt, (event) => {
      // write board to list of boards (for undo/redo)
      state = {
        ...state,
        boards: undoMove(state.boards),
      };
      // propagate event that a new board was stored
      eventBus.publish(boardStoredEvt(last(state.boards)));
    });
  }, []);

  return null; // React prefers null for a no-render
};

export default StateController;
