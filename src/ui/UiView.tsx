import { FunctionComponent } from "react";
import "./UiView.css";
import Board from "../model/Board";
import BoardController from "../BoardController";
import { EventBus } from "ts-bus";
import { resetClickedEvt, undoClickedEvt } from "../events";
import MessagesController from "../MessagesController";

interface Props {
  eventBus: EventBus;
  board: Board;
}

const UiView: FunctionComponent<Props> = ({ board, eventBus }) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
        <p>
          using a `functional core with a decoupled imperative shell`
          architecture
        </p>
      </header>
      <article>
        <MessagesController eventBus={eventBus} />
        <BoardController board={board} eventBus={eventBus} />
        <div className={"buttons"}>
          <button onClick={() => eventBus.publish(resetClickedEvt())}>
            reset
          </button>
          <button onClick={() => eventBus.publish(undoClickedEvt())}>
            undo
          </button>
        </div>
      </article>
    </div>
  );
};

export default UiView;
