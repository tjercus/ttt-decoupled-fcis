import React from "react";
import ReactDOM from "react-dom";
import { EventBus } from "ts-bus";
import { BusProvider } from "ts-bus/react";
//
import "./index.css";
//
import ValidationController from "./ValidationController";
import MoveController from "./MoveController";
import HistoryController from "./HistoryController";
import UiController from "./ui/UiController";
import EventLoggingController from "./EventLoggingController";
import AiController from "./AiController";
import WinnerController from "./WinnerController";

// global bus
const eventBus = new EventBus();

ReactDOM.render(
  <React.StrictMode>
    <BusProvider value={eventBus}>
      {/*services*/}
      <AiController eventBus={eventBus} />
      <EventLoggingController eventBus={eventBus} />
      <ValidationController eventBus={eventBus} />
      <MoveController eventBus={eventBus} />
      <HistoryController eventBus={eventBus} />
      <WinnerController eventBus={eventBus} />
      {/*UI*/}
      <UiController eventBus={eventBus} />
    </BusProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
