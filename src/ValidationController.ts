import { FunctionComponent, useEffect } from "react";
import { moveInvalidEvt, moveValidEvt, tileClickedEvt } from "./events";
import { EventBus } from "ts-bus";
import { validateMove } from "./core";

interface Props {
  eventBus: EventBus;
}

const ValidationController: FunctionComponent<Props> = ({ eventBus }) => {
  useEffect(() => {
    return eventBus.subscribe(tileClickedEvt, (event) => {
      const { board, move } = event.payload;
      validateMove(board, move)
        ? eventBus.publish(moveValidEvt({ board, move }))
        : eventBus.publish(moveInvalidEvt(move));
    });
  }, []);
  return null; // React prefers null for no-render
};

export default ValidationController;
