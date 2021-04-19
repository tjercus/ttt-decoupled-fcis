import { FunctionComponent, useEffect, useState } from "react";
import { EventBus } from "ts-bus";
//
import UiView from "./UiView";
import { initialBoard } from "../core";
import { boardStoredEvt, humanTurnDoneEvt } from "../events";
import { Players } from "../model/Player";

interface Props {
  eventBus: EventBus;
}

/**
 * Is the root controller for the entire UI, re-renders when a new board was created
 */
const UiController: FunctionComponent<Props> = ({ eventBus }) => {
  const [board, setBoard] = useState(initialBoard);

  useEffect(() => {
    // listen to new board when move was made
    return eventBus.subscribe(boardStoredEvt, (event) => {
      setBoard(event.payload.board);
      if (event.payload.player === Players.Human) {
        eventBus.publish(humanTurnDoneEvt(event.payload.board));
      }
    });
  }, [eventBus]);
  return <UiView board={board} eventBus={eventBus} />;
};

export default UiController;
