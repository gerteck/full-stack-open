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

### User Administration

Adding user authentication and authorization to the application.
* Users should be stored in the database
* Every note linked to user who created it
* Only creator can delete or edit a note.
* One to Many relationship btwn user and note.

For relational database, implementation straightforwad, two separate tables, id of user is foreign key. 

For document database, situation different, many ways to model situation.

As existing solution stores every note in notes collection, to not change existing collection:
* Save users in their own collection.
* Use object IDs in Mongo to reference documents in other collections.

Trad. document databases like Mongo do not support `join` queries as in relational, but it supports lookup aggregation queries. However, we will not use here.

We will implement in our code if need functionality similar to join queries by making multiple queries. Mongoose can also abstract out the details sometimes.

**References across collections**

We can do similar to relational database, have a reference key. 

Document databases flexible, we can store both primary keys in each other.
```js
[
  {
    content: 'HTML is easy',
    important: false,
    _id: 221212,
    user: 123456,
  },
  {
    content: 'The most important operations of HTTP protocol are GET and POST',
    important: true,
    _id: 221255,
    user: 123456,
  },
  {
    content: 'A proper dinosaur codes with Java',
    important: false,
    _id: 221244,
    user: 141414,
  },
],
[
  {
    username: 'mluukkai',
    _id: 123456,
    notes: [221212, 221255],
  },
  {
    username: 'hellas',
    _id: 141414,
    notes: [221244],
  },
]
```

Document databases also offer a diff way of organizing data, it may be beneficial to nest the entire notes array as part of the documents in user collection.
* In such schema, notes tightly nested under users, database would not generate ids for them.
* Chosen schema must support use case of application best.
* Schema-less databases require dev to make more radical design decisions abt data organization at the beginning of the project.

**Mongoose Schema for Users**

Attempt the approach of storing ids of notes created by user in the user document.
* Ids of notes stored in user document as array of Mongo IDs.
* We will also expand the schema of the note so that it contains the info about the user who created it.
* Compared to relational database, references now stored in both documents.

**Creating Users, New Notes**
As users have unique username and a password. We need a password hash.
* Use `bcrypt` package for generating password hash.
* Password sent in request not stored, rather hash is stored.

Creating new users: Use HTTP POST to users path.
* Define separate router for dealing with users.
* After defining business logic, we can do testing.
* We can use a uniqueness index to enforce unique.
* Other functionalities include permitted characters and strength of password if desired.


Note schema needs to be updated.
* Add user field in note
* Concatenate id of note in notes field of the user object

Test Driven Development: Tests for new functionality written before functionality is implemented.

**Populate (Join)**
Want our API to work such that the user objects would contain contents of user's note. In relational, we could use a join query, but document databases can't do this.

In Mongoose library, we can accomplish this join by doing multiple queries.
* Mongoose join is done with `populate` method.
* We can use the populate method to choose fields we want to include
* Note that the database does not know that the id stored in user field of notes reference the documents in the users collection.
  * It is based on the fact that we have defined "types" to references in Mongoose schema with the `ref` option.

```
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
```

### Token Authentication

Tokens are stateless, general gist:

1. User Requests Access with Username / Password.
2. Application validates credentials.
3. Application provides a signed token to the client.
4. Client stores that token and sends it along with every request.
5. Server verifies token and responds with data.

![](/images/4-token.png)

We will add the login form to frontend in part 5. 

We will use the `jsonwebtoken` library to generate JSON web tokens.
* `npm install jsonwebtoken`

After crafting the logic, we should also limit creating new notes to logged-in users.
* Creating new notes possible if post request has valid token attached.
* Use authorization header, which also tells auth scheme used. Use the bearer scheme here.

Some problems of token based auth is validity
* Limit validity period of token
* Save info about token, check for each API request if access right to token is still valid. 

Others: Because of the changes, most test have been broken. Fixing tests will be required.
* Usernames, passwords, token auth should always be used over HTTPS.


### Rough time breakdown

(with extensive breaks in between, due to intern workload)

A. roughly 1 + 2 hrs
B. roughly 2 hrs
C. roughly 2 hrs 
D. roughly 1 + 3 hrs
