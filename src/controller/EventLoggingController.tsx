import { FunctionComponent } from "react";
import { EventBus } from "ts-bus";

interface Props {
  eventBus: EventBus;
}

const EventLoggingController: FunctionComponent<Props> = ({ eventBus }) => {
  eventBus.subscribe("*", console.log);
  return null; // no-render
};

export default EventLoggingController;
