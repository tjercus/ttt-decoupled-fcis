import { FunctionComponent, useEffect } from "react";
import {
  boardCreatedEvt,
  boardStoredEvt,
  resetClickedEvt,
  undoClickedEvt,
} from "./events";
import { EventBus } from "ts-bus";
import { initialBoard, isThereAWinner, last, undoMove } from "./core";
import { Players } from "./model/Player";

interface Props {
  eventBus: EventBus;
}

const HistoryController: FunctionComponent<Props> = ({ eventBus }) => {
  // note I'm not using React state since this component never re-renders
  let state = {
    boards: [initialBoard],
  };

  useEffect(() => {
    return eventBus.subscribe(boardCreatedEvt, (event) => {
      // TODO remove temp code
      // if (isThereAWinner(event.payload.board)) {
      //   alert("we have a winner");
      // }

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
      );
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

export default HistoryController;
