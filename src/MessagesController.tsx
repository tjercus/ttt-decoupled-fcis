import { FunctionComponent, useEffect, useState } from "react";
import { EventBus } from "ts-bus";
import { moveInvalidEvt, moveValidEvt } from "./events";

const TILE_WAS_TAKEN_MSG = "You cannot use a previously used tile";

interface Props {
  eventBus: EventBus;
}

const MessagesController: FunctionComponent<Props> = ({ eventBus }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    eventBus.subscribe(moveValidEvt, (event) => setMessages([]));

    eventBus.subscribe(moveInvalidEvt, (event) =>
      // @ts-ignore
      setMessages([TILE_WAS_TAKEN_MSG])
    );
  }, []);

  return messages?.length > 0 ? (
    <ul id={"messages"}>
      {messages.map((msg, index) => (
        <li key={msg + index}>{msg}</li>
      ))}
    </ul>
  ) : null;
};

export default MessagesController;
