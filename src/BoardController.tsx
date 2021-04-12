import BoardView from "./BoardView";
import { FunctionComponent } from "react";
import Board from "./Board";
import { EventBus } from "ts-bus";

interface Props {
  board: Board;
  eventBus: EventBus;
}
// TODO when not connected (no subscriptions to the eventBus), remove the Controller
const BoardController: FunctionComponent<Props> = ({ board, eventBus }) => (
  <BoardView board={board} eventBus={eventBus} />
);

export default BoardController;
