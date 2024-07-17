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
















### Rough time breakdown

(with breaks in between)

A. roughly 1 + 2 hrs
B. roughly 
C. roughly 
D. roughly 
