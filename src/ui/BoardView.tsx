import { FunctionComponent } from "react";
import Board from "../model/Board";
import RowView from "./RowView";
import { EventBus } from "ts-bus";

interface Props {
  board: Board;
  eventBus: EventBus;
  readOnly: boolean;
}

const BoardView: FunctionComponent<Props> = ({ board, eventBus, readOnly }) => {
  return (
    <table className={"board"}>
      <tbody>
        {board.map((row, rowIndex) => (
          <RowView
            board={board}
            eventBus={eventBus}
            key={rowIndex}
            readOnly={readOnly}
            row={row}
            rowIndex={rowIndex}
          />
        ))}
      </tbody>
    </table>
  );
};

export default BoardView;
