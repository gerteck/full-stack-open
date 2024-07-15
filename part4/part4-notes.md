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













### Rough time breakdown

(with breaks in between)

A. roughly 
B. roughly 
C. roughly 
D. roughly 
