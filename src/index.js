import React from "react";
import ReactDOM from "react-dom";
import { EventBus } from "ts-bus";
import { BusProvider } from "ts-bus/react";
//
import "./index.css";
//
import ValidationController from "./ValidationController";
import MoveController from "./MoveController";
import StateController from "./StateController";
import UiController from "./UiController";
import EventLoggingController from "./EventLoggingController";

// global bus
const eventBus = new EventBus();

ReactDOM.render(
  <React.StrictMode>
    <BusProvider value={eventBus}>
      {/*services*/}
      <EventLoggingController eventBus={eventBus} />
      <ValidationController eventBus={eventBus} />
      <MoveController eventBus={eventBus} />
      <StateController eventBus={eventBus} />
      {/*UI*/}
      <UiController eventBus={eventBus} />
    </BusProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
