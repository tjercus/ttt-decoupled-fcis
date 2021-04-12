import { FunctionComponent, useEffect, useState } from "react";
import { EventBus } from "ts-bus";
//
import UiView from "./UiView";
import { initialBoard } from "./core";
import { boardStoredEvt } from "./events";

interface Props {
  eventBus: EventBus;
}

const UiController: FunctionComponent<Props> = ({ eventBus }) => {
  const [board, setBoard] = useState(initialBoard);

  useEffect(() => {
    // listen to new board when move was made
    eventBus.subscribe(boardStoredEvt, (event) => {
      // board !== event.payload
      //   ? setBoard(event.payload)
      //   : console.log("cache hit, old board", event.payload, board);
      setBoard(event.payload);
    });
  }, []);
  return <UiView board={board} eventBus={eventBus} />;
};

export default UiController;
