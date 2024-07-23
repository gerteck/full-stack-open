## Part 5: React Frontend Login, Props.children/proptypes, Testing React Apps, End to end testing.

We return to focus on frontend, and look out how we can test our React code. At the same time, we will implement token based authentication and enable users to login in to the application.

### React Frontend Login

The frontend needs to be updated, since new notes cannot be added because of the changes made to the backend in part 4. Backend now expects token verifying identity.

In the case of the blog, our front end would also need to have a login component.

**Handling Login**

We will add a new login form on top of the page.
* Login is done by sending a HTTP POST request to the server. We will separate the code responsible for this request to its own module.
* Notify user on successful login by showing some user details. (E.g. name)
* Token returned with successful login saved the application state.
* Add token of user to authorization header of the HTTP request.

However, when the application is refreshed, the user login details disapears.
* We will save the login details to local storage, a key-value database in the browser.
* `window.localStorage.setItem('name', 'juha tauriainen')`, and use getItem to find value of key.
* Values saved in DOMstrings, cannot save JS object as is. Need to use `JSON.stringify` and `JSON.parse`.
* Use effect hook to check for a token.


### Props.children and proptypes

We will display the login form only when appropriate. 
* Where it appears when the user presses the login button.
* We could use a `loginVisible` component state variable to define if it is shown.
* We can extract this logic into a new `Togglable` component.

```jsx
import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
```

`props.children` is used to reference child components of the component.
* Child components are React elements defined between open close tags of component. 
* `children` prop auto added by React, always exists.

Following the React convention,

> Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it’s one of the most common things you will do writing React code.

We should move the state of things to corresponding components if the parents do not need it.
* E.g. creating new note.

**References to components with ref**

In the instance of hiding new note form after new note created, we could lift the toggleable component state outside of the component. However, we may not want to do that as we want the component to be responsible for its own state.
* Mechanism to change state of component externally
* Use `ref` mechanism of React. 
* (`useRef`) hook used to create a `noteFormRef`, assigned to the Togglable component. Acts as reference to the component. This hook ensures same ref kept throughout re-renders.
* Function that creates component wrapped inside `forwardRef` function call, so component can access ref assigned to it.

**PropTypes**

E.g. Togglable component assumes text for button via `buttonLabel` prop. If we forget to define it, the app works but browser renders button with no label text.

We would like to enforce such that button label text prop must be given a value.

Install `prop-types` package.
* Define `buttonLabel` prop as mandatory, or required string-type prop.
* Can also define types of other props.

**ESLint**

We can configure eslint for frontend as well.

### Testing React Apps

Let's try using Vitest from Vite developers. 
* `npm install --save-dev vitest jsdom`
* `npm install --save-dev @testing-library/react`
* `npm install --save-deve @testing-libary/jest-dom`
* `npm install --save-dev eslint-plugin-vitest-globals` (For ESlint compat with tests, add to .eslint.cjs file)

Testing libraries will help us render components for testing purposes.

After that, we will
* Add script to `package.json` to run the tests (`vitest run`)
* Create `testSetup.js` in project root.
* Expand `vite.config.js` file.
* Write tests for components.

**Searching for content in components, debugging**

`react-testing-library` package offers many ways to investigate content of component being tested.
* `getByText` etc
* Can use CSS-selectors, data attributes defined for testing purposes etc.

Object screen has method `debug` that can be used to print the HTML of a component to the terminal.

**Clicking buttons in tests**

To trigger events, we can use library to simulate user input.
* `npm install --save-dev @testing-library/user-event`
* We can also define mock functions to record the number of times it is called.
* Stub components (mock objects and functions), make it possible to return hardcoded responses and verify inputs. 

**Test Coverage**
`npm test -- --coverage`
* HTML report generated to the coverage directory.

**Frontend integration tests**

Integration tests for backend was written to test logic and connect database. (Not unit tests)
Tests for frontend have been unit tests, testing individual components
* Integration tests for frontend would also be good, considerable more difficult, as need to mock data from server.
* Can choose to concentrate on making end-to-end tests to test whole application.
  
**Snapshot Testing**

Vitest also has alternative called snapshot testing. 
* No need to define any tests, simple to adopt
* Compare HTML code existing.
* If some change, either new functionality or bug caused by accident, developer must define if it is desire or undesired. Helps dev become aware of potential issues easily. 

From personal experience (doing these exercises), writing testcases forces components to be decoupled and helps to better structure the project, such that it can be tested. (Given that the testcases are defined well ofc.)

### E2E End to end Testing

After doing testing on backend as a whole on API level using integration tests, and frontend component testing using unit tests, we will look into a way to test the system as a whole using E2E tests.
* Most useful tests, test system through same interface as users.
* More challenging to configure, slower etc.
* Bad for dev as slower to run, run less often.
* Can be flaky, may pass and fail even when code doesn't change

For web app, we can do so using browser and testing library.
* Selenium
* Headless browsers (browser with no GUI, e.g. Chrome headless mode)
* Cypress, Playwright.

Cypress vs Playwright
* Cypress runs entirely within the browser
* Playwright tests executed in the Node process, connect to browser via programming interfaces. (API)


#### Playwright

Newcome to End to end tests, 2023 onwards. On par with Cypress in ease of use. Libraries are slightly different in how they work. One advantage of Playwright is the browser support, supporting Chrome, Firefox, etc. 

**Initializing Tests**
Unlike integration, unit tests on React front-end, E2E tests do not need to be located in same npm project where the code is.
* Create separate project for E2E tests: `npm init playwright@latest`
* Npm script for running tests and test reports in `package.json`
* `npm test`, `npm run test:report` to run the example tests for the project.
* `npm run test -- --ui`


**Testing our own code**
Playwright tests assume system under test is running when tests are executed, do not start system under test.
* npm script for backend to enable it to be started in testing mode.
* Create the first test file for the application.
* Define browser engine to be used `npm test -- --project chromium`
* Add describe block to tests

Execution of tests fast when they pass, slower if they do not. Policy of Playwright is to wait for search elements, if not found, `TimeoutError` raised and tests fails.
* We can change waiting time to a few seconds in `playwright.config.js`
* Change so tests executed one at a time, as tests use database, might falke under parallel execution.

**Controlling database state**
For E2E test best to empty database and format before run. However E2E test have no access to database.
* One solution is to create API endpoints for the backend tests. Empty database using these endpoints. Use a new router for tests, `testing.js`
* Add it to the backend only if application is run in test-mode.

**To test, some things to note**
* Define unique test id attributes for fields for testing
* For all tests, execution of each test starts from browser's zero state, all changes to state reset.
* We can test app CSS styles with matcher `toHaveCSS`
* Can use `test.only` as well.
* We can have helper functions for repetitive code as well.
* Frontend backend addresses are hardcorded
* We can define baseUrl for app in config file.

**Test development and Debugging**
Need to learn to debug tests.
* E.g. Problem with one test was the browser does not render all notes created in the block, as when the test creates one note, it creates the next one even before the server has responded. This solved by 'slowing down' insert operations by using the `waitFor` command.
* We can use the `Trace Viewer` in Playwright as well, which can generate locators as well.
* Can also use the VS Code plugin.
* Look at documentation.

### Rough time breakdown

(with extensive breaks in between, due to intern workload)

A. roughly 2 hrs
B. roughly 2 hrs
C. roughly 3 hrs
D. roughly 4/5 hrs
