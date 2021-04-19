import React from "react";
import ReactDOM from "react-dom";
import { EventBus } from "ts-bus";
import { BusProvider } from "ts-bus/react";
//
import "./index.css";
//
import ValidationController from "./controller/ValidationController";
import MoveController from "./controller/MoveController";
import HistoryController from "./controller/HistoryController";
import UiController from "./ui/UiController";
import EventLoggingController from "./controller/EventLoggingController";
import AiController from "./controller/AiController";
import WinnerController from "./controller/WinnerController";

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
