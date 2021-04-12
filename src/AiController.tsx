import { FunctionComponent, useEffect } from "react";
import { EventBus } from "ts-bus";
import { boardCreatedEvt, humanTurnDoneEvt } from "./events";
import { getRandomFreeTile, makeBoardBasedOnMove } from "./core";

interface Props {
  eventBus: EventBus;
}

const AiController: FunctionComponent<Props> = ({ eventBus }) => {
  useEffect(() => {
    return eventBus.subscribe(humanTurnDoneEvt, (event) => {
      console.log("Computer says: my turn!");
      const board = makeBoardBasedOnMove(event.payload, {
        player: "o",
        tile: getRandomFreeTile(event.payload),
      });
      eventBus.publish(boardCreatedEvt({ board, player: "o" })); // TODO create constant
    });
  }, []);

  return null; // React prefers a null for no-render
};

export default AiController;
