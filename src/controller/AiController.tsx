import { FunctionComponent, useEffect, useState } from "react";
import { EventBus } from "ts-bus";
import {
  boardCreatedEvt,
  humanTurnDoneEvt,
  resetClickedEvt,
  thereIsAWinnerEvt,
} from "../events";
import { getRandomFreeTile, makeBoardBasedOnMove } from "../core";
import { Players } from "../model/Player";

interface Props {
  eventBus: EventBus;
}

const AiController: FunctionComponent<Props> = ({ eventBus }) => {
  const [gameIsRunning, setGameIsRunning] = useState(true);

  useEffect(
    () =>
      eventBus.subscribe(resetClickedEvt, (event) => {
        setGameIsRunning(true);
        console.log("AiController caught reset");
      }),
    [eventBus]
  );

  useEffect(
    () =>
      eventBus.subscribe(thereIsAWinnerEvt, (event) => {
        setGameIsRunning(false);
        console.log("AiController setGameIsRunning false");
      }),
    [eventBus]
  );

  useEffect(
    () =>
      eventBus.subscribe(humanTurnDoneEvt, (event) => {
        setTimeout(() => {
          if (gameIsRunning) {
            console.log("Computer says: my turn!", event.payload);
            const board = makeBoardBasedOnMove(event.payload, {
              player: Players.Ai,
              tile: getRandomFreeTile(event.payload),
            });
            eventBus.publish(boardCreatedEvt({ board, player: Players.Ai }));
          } else {
            console.log("Computer says: game is not running, no move for me");
          }
        }, 1000);
      }),
    [eventBus, gameIsRunning]
  );

  return null; // React prefers a null for no-render
};

export default AiController;
