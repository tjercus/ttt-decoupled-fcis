import BoardView from "./BoardView";
import { FunctionComponent, useEffect, useState } from "react";
import Board from "../model/Board";
import { EventBus } from "ts-bus";
import { resetClickedEvt, thereIsAWinnerEvt, undoClickedEvt } from "../events";
import { BusEvent } from "ts-bus/types";

interface Props {
  board: Board;
  eventBus: EventBus;
}

// match one from multiple events
const toAnyEventCausingReadWrite = (event: BusEvent) =>
  undoClickedEvt.eventType === event.type ||
  resetClickedEvt.eventType === event.type;

const BoardController: FunctionComponent<Props> = ({ board, eventBus }) => {
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    return eventBus.subscribe(thereIsAWinnerEvt, (event) => setReadOnly(true));
  }, [eventBus, readOnly]);

  useEffect(() => {
    return eventBus.subscribe(toAnyEventCausingReadWrite, (event) =>
      setReadOnly(false)
    );
  }, [eventBus, readOnly]);

  return <BoardView board={board} eventBus={eventBus} readOnly={readOnly} />;
};

export default BoardController;
