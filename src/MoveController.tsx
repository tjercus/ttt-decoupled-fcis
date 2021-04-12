import { FunctionComponent, useEffect } from "react";
import { boardCreatedEvt, moveValidEvt } from "./events";
import { EventBus } from "ts-bus";
import { last, makeBoardBasedOnMove } from "./core";

interface Props {
  eventBus: EventBus;
}

const MoveController: FunctionComponent<Props> = ({ eventBus }) => {
  useEffect(() => {
    return eventBus.subscribe(moveValidEvt, (event) => {
      const newBoard = makeBoardBasedOnMove(
        event.payload.board,
        event.payload.move
      );
      eventBus.publish(
        boardCreatedEvt({ board: newBoard, player: event.payload.move.player })
      );
    });
  }, []);
  return null; // React prefers null for no-render
};

export default MoveController;
