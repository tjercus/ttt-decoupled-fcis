import { FunctionComponent } from "react";
import Board from "../model/Board";
import RowView from "./RowView";
import { EventBus } from "ts-bus";

interface Props {
  board: Board;
  eventBus: EventBus;
}

const BoardView: FunctionComponent<Props> = ({ board, eventBus }) => {
  return (
    <table className={"board"}>
      <tbody>
        {board.map((row, rowIndex) => (
          <RowView
            board={board}
            eventBus={eventBus}
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
          />
        ))}
      </tbody>
    </table>
  );
};

export default BoardView;
