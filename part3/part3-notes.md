## Part 3: Nodejs, Express, Deploy online, MongoDB, Validation and ESLint

We look at the backend, implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and store the application data in a MOngoDB database. At the end, we will deploy the application on the internet.


### Node.js and Express (and nodemon, Postman, )

Here, we will use Node v20 or later. Do `nvm use 20`.

As browsers do not yet support the newest features of JavaSCript, code running in browser must be transpiled with e.g. babel.
* Backend is different, as newest version of Node supports large majority of latest JS features, we can use without having to transpile.
* Goal is to implement backend that will work with our notes app from part 2.
* Create new template for application with `npm init`

**Server Application**:
* `npm init`
* Update `package.json` file
* Script: `"start": "node index.js"`

Template for simple web server:
```js
const http = require('http')

const app = http.createServer((request, response) => {
    // Event handler called every time HTTP request made
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World')
})

const PORT = 3001
// Bind http server to port 3001 to listen to HTTP requests
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

* `http` is Node's built in web server module.
* NodeJS uses CommonJS modules. 
  * Node ecosystem needed modules long before JS supported them. 
  * Currently Node also supports ES6 modules.

**REST**:
REST stands for Representation State Transfer.
* Architectural style to build scalable web applications.
* Expand our application so it provides same RESTful HTTP API as json-server.

One convention for creating unique addresses is to combine the name of the resource type with the resource's unique identifier.
* `${rootURL}${api/collection}${uniqueIdentifier}` e.g. `www.example.com/api/notes/10`
* We can also execute different operations on resources, defined by HTTP verb.
  * GET, POST, DELETE, PUT, PATCH
* Roughly define REST as a uniform interface, consistent way of defining interfaces to allow systems to cooperate.
  * Definition from Roy T. Fielding [here](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)
  * CRUD (Create Read Update Delete) API may also be referred to as resouce-orientated architecture instead of REST.


**Express**:

While we can directly implement with built in http web server, it is cumbersome as app grows with size.
* We can use **Express** library to provide better abstraction for general use case to build backend server.
```bash
npm install express
```
* Dependencies and transitive dependencies added to `node_modules`.
* Caret ^ in front of version number means installed version at least of that version.
  * Major version of library must be the same.
  * Semantic versioning [see here](https://docs.npmjs.com/about-semantic-versioning)

Sample Code:
```js
const express = require('express')
const app = express()

let notes = [
  ...
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```
* Express's send method automatically sets values such as `Content-Type` header etc.
  * E.g. `application/json`, `text/html`

**nodemon**:
* When we make changes to code, need to restart application to see changes (node.js project, no hot reload).
* One solution is nodemon, which automatically restarts node application on file change.
* Define as dev dependency: `npm install --save-dev nodemon`
* Start application with nodemon: `node_modules/.bin/nodemon index.js`
* Script for this: `"dev": "nodemon index.js"`, `npm run dev`


Back to express:
* We can create a route for fetching a single resource, and parameters for routes by using colon syntax
* `app.get('/api/notes/:id', (request, response) => {...})` handles all HTTP GET of form `/api/notes/<smth>`
* We also need to respond with 404 status code when a variable is note found.
* Deleting resources: use a HTTP DELETE request. Respond with a status code 204 no content.
* Receiving data: use a HTTP POST request, and send info in JSON format in request body.
  * We need to activate the json-parser and intial handler. Without the parser, body property would be undefined.
  * We also should check if content is missing, we respond with status 400 bad request.

**Postman**:
* We can use Postman to test our backend. 
* Use `localhost:port` as our base url
* We can use the VS Code REST Client extension, or use WebStorm HTTP client to test as well.

**HTTP Request Types, Safety, Idempotency**:
Request types, safety and idempotency.
> In particular, the convention has been established that the GET and HEAD methods SHOULD NOT have the significance of taking an action other than retrieval. These methods ought to be considered "safe".
* Safety means must not cause any side effects on the server. 
* State of database must not change, response must only return data that exists on server.

* All HTTP requests except POST should be idempotent:
> Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property.
* POST is only HTTP request type neither safe nor idempotent.

**Middleware**:
Middleware are functions that can be used for handling request and response objects.
* e.g. `json-parser` takes raw data from requests, parses and stores and assigns.
* Can use several middlewares.

Define your own middleware: function taking three parameters.
```js
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
};

app.use(requestLogger);
```
[Link](https://github.com/gerteck/full-stack-open-part3) to part 3 Repo.








### Rough time breakdown

(with breaks in between)

A. roughly 2 + 2 = 4 hrs
B. roughly 
C. roughly 
D. roughly
