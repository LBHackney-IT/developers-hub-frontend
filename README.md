# Developer Hub

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installing dependencies

Run `yarn` to install dependencies.

## To run:
In the project directory, you can run:

### Setting up environment variables

The API base URL is retrieved from environment variables. If you don't set this up, you may experience errors.

To add the API URL, duplicate the `env.sample` and rename to `env.local`. Then add the base URL to the `REACT_APP_API_URL` variable.

_Note: You may need to restart your application before this change is applied._

### `yarn start`

Runs the app in development mode
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds and runs the app. This is a production-ready build, available in the `build` folder.
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### Running tests

### `yarn cy:run`

Runs the cypress tests and prints the results in the CLI.

### `yarn cy:open`

Launches the Cypress UI. You can select test files to run and view the tests running in the browser.
