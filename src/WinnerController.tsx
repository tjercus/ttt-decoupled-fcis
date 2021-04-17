import { FunctionComponent, useEffect } from "react";
import { EventBus } from "ts-bus";
import { boardStoredEvt, thereIsAWinnerEvt } from "./events";
import { isThereAWinner } from "./core";

interface Props {
  eventBus: EventBus;
}

const WinnerController: FunctionComponent<Props> = ({ eventBus }) => {
  useEffect(
    () =>
      eventBus.subscribe(boardStoredEvt, (event) => {
        if (isThereAWinner(event.payload.board)) {
          eventBus.publish(thereIsAWinnerEvt());
        }
      }),
    []
  );
  return null; // React prefers null for no-render
};

export default WinnerController;
