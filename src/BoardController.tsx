import BoardView from "./BoardView";
import { FunctionComponent } from "react";
import Board from "./Board";
import { EventBus } from "ts-bus";

interface Props {
  board: Board;
  eventBus: EventBus;
}

const BoardController: FunctionComponent<Props> = ({ board, eventBus }) => {
  return <BoardView board={board} eventBus={eventBus} />;
};

export default BoardController;
