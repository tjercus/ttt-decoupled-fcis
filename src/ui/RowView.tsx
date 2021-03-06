import { FunctionComponent } from "react";
import Row from "../model/Row";
import { tileClickedEvt } from "../events";
import { EventBus } from "ts-bus";
import Board from "../model/Board";
import { Players } from "../model/Player";

interface Props {
  board: Board;
  eventBus: EventBus;
  readOnly: boolean;
  row: Row;
  rowIndex: number;
}

const RowView: FunctionComponent<Props> = ({
  board,
  eventBus,
  readOnly,
  row,
  rowIndex,
}) => (
  <tr>
    {row.map((tile, colIndex) => (
      <td
        className={"tile"}
        id={`${rowIndex}-${colIndex}`}
        key={`${rowIndex}-${colIndex}`}
        onClick={() =>
          !readOnly
            ? eventBus.publish(
                tileClickedEvt({ board, move: { tile, player: Players.Human } })
              )
            : ""
        }
      >
        {tile.value}
      </td>
    ))}
  </tr>
);

export default RowView;
