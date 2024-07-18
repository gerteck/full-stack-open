## Part 4: Backend structure, Testing, User Admin, Token Auth

Continue working on backend. We will write unit and integration tests for the backend. After that, we will implement user authentication and authorization.

### Structure of Backend, Testing

Good structure of projects to adhere to best practices is always good.
* While it does not matter as much in small projects, it has definite impacts on maintainability, extensibility and scalability.
* Also allows us to do testing! (Use of stubs)
* E.g. `/controllers`, `/models`, `/utils` folders.

We can encapsulate different functionalities:
* Separate all printing to console to own module, e.g. `utils/logger.js`
    * This can allow us to use external logging services in the future easily
* Handle env variables in separate `utils/config.js` files.
    * Access env variables by importing configuration file.
* Route handlers are commonly referred to as "controllers", so in that directory.
    * A `router` object is an isolated instance of middleware and routes.
    > You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

```js
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)

// notesRouter handles all the related routes for notes
```
**Exports**
See usage of exports:

```js
// exports object with two fields, both are functions
module.exports = {
  info, error
}

//use as such 
const logger = require('./utils/logger')
logger.info('message')
logger.error('error message')

// Or destruction functions into own variables
const { info, error } = require('./utils/logger')
info('message')
error('error message')

// If only one entity is exported, just use it directly.
```

* `Find all references` feature in VS Code enables one to see where the modules have been exported.


**Testing Node Applications**

One essential area of software development is automated testing. 

We can start with unit tests. As the logic of our current application (FSO-part4) is quite simple, not much to test. We will create some simple functions for test writing practice.

There are a large number of test libraries or "test runners" for JavaScript. The previous meta was [Mocha](https://mochajs.org/) (running on Nodejs), but replaced by [Jest](https://jestjs.io/) which supports TS, Node, React, Angular Vue etc. Recently, upcoming testing framework is [Vitest](https://vitest.dev/). Node also has an in built library node:test, which is well suited for this course.

npm script test: `"test": "node --test"`

* Create a separate directory for tests, and create a `xxx.test.js` file with tests.
* Individual test cases defined with a `test` function.
* We can verify results of a test with method `strictEqual` of the `assert` library.
* We also can define a `describe` block around tests to group tests into logical collections.
  * It may also be necessary to run some shared setup or teardown operations for a group of tests.



### Testing the Backend

Let's write tests for the backend. Since there is no complicated logic, no point writing unit tests (that test isolated component code).

It can be beneficial to implement tests by *mocking the database* instead of using real database.
    * We can use library `mongodb-memory-server` to do this
    * As the backend is simple, we can test the whole thing through REST API, so database is included.
    Can be considered integration testing.

**Test Environment**

Server running in Render is called in production mode.

The convention in Node is to define execution mode of application with the `NODE_ENV` env variable. 
    * It is common practice to define separate modes for development and testing.

We can define it in our scripts.

```
npm install --save-dev cross-env

{
  // ...
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "test": "cross-env NODE_ENV=test node --test",
    "build:ui": "rm -rf build && cd ../frontend/ && npm run build && cp -r build ../backend",
    "deploy": "fly deploy",
    "deploy:full": "npm run build:ui && npm run deploy",
    "logs:prod": "fly logs",
    "lint": "eslint .",
  },
  // ...
}
```

With this, we can modify the way our application runs in different modes. We can create a separate database in MongoDB Atlas, but it is not optimal. Test execution typically requires single database instance not used by tests running concurrently.

Better to run tests on local installed and running database on local machine. Optimally, use a separate database for each test execution. We can achieve this by
* Running Mongo in-memory
* Using Docker containers

However, we will not complicate things and just use the MongoDB Atlas database for now.

* Config the `MONGODB_URL` to set dynamically based on the node env, for dev and test databases.

**Supertest**

We will use the `supertest` package to help write tests for testing the API.
* `npm install --save-dev supertest`

Consider:
```js
const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})
```

* We import the Express application, wrap it with the supertest function, into a superagent object. This object then assigned to `api` variable and tests can use for making HTTP requests to backend.
* We also define the value in regex (Regular Expression), it is acceptable that the header contains the string in question.
* We also have `async` and `await` keyword. 
    * No need to use callback functions. Allows us to use async functions in a way to make the code look synchronous. Prevent 'callback hell'.
* Once all the tests finish running, we close the database connection used by Mongoose.
* Supertest also takes care that the app being tested is tarted at the port that it uses internally. 


**Initializing Database before Tests**

Tests are not optimal as they are dependent on the state of the database. We should reset the database and generate the needed test data in a controlled manner before running the tests.
* We can use the `beforeEach` function to initialize the database before every test.
* Ensure the database is in the same state before every test is run.

We can also optimize the function that sets up the test by using `Promise.all()`, `forEach()` etc.


**Testing one by one**
`npm test` executes all tests, but we may want to test one or two tests only. We can do this by making use of the `only` (`test.only()`) method.
* Then, run the tests with the `--test-only` argument.

Alternatively, we can specify the exact tests to be run as arguments.
* E.g. `npm test -- tests/note_api.test.js`, `npm run test -- --test-name-pattern="notes"`

**Refactoring the Backend**

We can change the backend to use async and await, on top of using it in testing.

When we refactor, there is always the risk of regression, where existing functionality may break. We should write tests for each route of the API first.

In doing so, we can also write test helper functions, for verification steps that will repeat.

After writing our tests, we can then start doing our refactoring.


**Error Handling and Async/Await**

We have not handled error situations. When we end up with an unhandled promise rejection, the request never receives a response.
* We can use the old familiar `try/catch` mechanism, and call the next() function to pass the request handling to middleware.
* `strictEqual` uses method `Object.is` to compare similarity. `deepStrictEqual` checks that value of fields are the same.
* Eliminating `try/catch`: When we use `async/await`, the price is using the `try/catch` structure. However, we can use the `express-async-errors` library to eliminate the catch from the methods.
    * `npm install express-async-errors`
    * The library handles everything under the hood, automatically passing to error handling middleware.


**Refactoring Tests**

Some requests are not tested, e.g. when request is sent with an invalid id. Grouping and organization of tests could also use some improvement, as all exist on the 'top level'. Use `describe` blocks to group related tests.


Ultimately, no best way of conducting API-level integration tests for server applications.








### Rough time breakdown

(with breaks in between)

A. roughly 1 + 2 hrs
B. roughly 
C. roughly 
D. roughly 
