# with `functional core, decoupled imperative shell` architecture

## Description

Uses the 'functional core, imperative shell pattern' combined with a 'publish subscribe' pattern.

- The game logic is contained in the functional core (pure functions and immutable data)
- The effects are in the imperative shell (the UI and others)
- The components of the system are decoupled by an EventBus

## What works?

Clean separation between UI, domain and event flows:

Allows you to focus on: 
- the events: how they flow, who sends and who handles them
- the domain: can be written independently of the rest of the system
- the UI: can be written independently of the rest of the system

## Caveat and downsides

This is not the simplest, or most appropriate way to implement a tic-tac-toe game.
It demonstrates some architectural patterns and a specific implementation using the chosen libraries.
This approach is probably more suited for larger and/or more complex systems.
The main downside is that the decoupling comes at a price, it can be hard to follow the flow of events and
you may introduce subtle bugs because of this. Some design up-front and some continuous (automated?)
diagram work may help with this.

## Events

- RowView -> tileClickedEvt

- ValidationController <- tileClickedEvt
- ValidationController -> moveValidEvt | moveInvalidEvt

- MoveController <- moveValidEvt | moveInvalidEvt
- MoveController -> boardCreatedEvt

- MessagesController <- MoveInvalidEvt
- MessagesController <- thereIsAWinnerEvt
- MessagesController <- resetClickedEvt

- HistoryController -> boardStoredEvt
- HistoryController <- boardCreatedEvt
- HistoryController <- resetClickedEvt
- HistoryController <- undoClickedEvt

- UiView -> resetClickedEvt

- AiController <- thereIsAWinnerEvt
- AiController <- humanTurnDoneEvt
- AiController <- resetClickedEvt
- AiController -> boardCreatedEvt

- WinnerController -> thereIsAWinnerEvt

- BoardController <- resetClickedEvt
- BoardController <- undoClickedEvt
- BoardController <- thereIsAWinnerEvt

- EventLoggingController <- * 

## Loose Ends ...

- Allow the Ai player to win
- fix the test for core.undoMove

## This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
