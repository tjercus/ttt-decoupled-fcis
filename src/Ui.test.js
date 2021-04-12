import { render, screen } from "@testing-library/react";
import UiController from "./UiController";
import { EventBus } from "ts-bus";

const eventBus = new EventBus();

test("renders learn react link", () => {
  render(<UiController eventBus={eventBus} />);
  const tableElement = screen.getByText(/Tic Tac Toe/i);
  expect(tableElement).toBeInTheDocument();
});
