## **Rendering Collection, Modules, Forms, Getting data from server, Altering server data, Adding styles to React Apps**

### Rendering a collection, modules

**Pro-tips**:
* Use `console.log` frequently to debug.
* Use Visual Studio Code snippets (shortcuts to regenerate commonly re-used portions of code). (e.g. `clog` for `console.log`)

**JavaScript Arrays**:
* Use functional programming operators of JS array, such as `find`, `filter`, `map`, all the time.

**Rendering Collections**:
This can be considered "frontend", or browser side application logic.
* We can generate React elements from array objects using the `map` function.
```JSX
{notes.map(note => <li>{note.content}</li>)}
```
* Must be wrapped in curly braces in JSX template like all other JS code.
* Key-attribute must be unique key value.
* `map` array method (hehe CS1101S).

* ***Anti-pattern***: Using Array Indexes as keys. This is not good.
    * Each item should have permanent and unique property, if not unique, can cause problems.
```jsx
<ul>
  {notes.map((note, i) => 
    <li key={i}>
      {note.content}
    </li>
  )}
</ul>
```
**Refactoring Modules**:
While a whole React application can be written in a single file, not very practical. Common practice to declare each component in its own file as an ES6-module.
* In smaller applications, components are usually placed in a directory called components, which is in turn placed within the src directory. The convention is to name the file after the component.


### Forms

Saving items in the component state:
* E.g. to get page to update when new notes added, we can store notes in the App component's state. 
* Use the `useState` function to define a piece of state.

Here, we can use an HTML form to add new notes.
```JSX
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  ...
  <form onSubmit={addNote}>
    <input />
    <button type="submit">save</button>
  </form>   
```
* Use another piece of state `newNote` to store user submitted input
* Use event handler to sync changes made to input using `setNewNote(event.target.value)` 
* Use `notes.concat(noteObject)` to `setNotes()`
* Use `filter` to filter nodes, conditional operators etc.


### Getting data from server

Above relates to "frontend" clientside browser functionality. We will also focus on backend, server-side functionality. 
* First familiarize with how code in browser communicates with the backend.

We can make use of JSON Server to act as our server. 
  * Handy tool to enable use of server-side functionality without need to program it.
```
json-server --port 3001 --watch db.json
```
* http://localhost:3001/notes to access the json file > notes.
* We want to save the notes to the server. 
  * React code fetches the notes from the server and renders them to the screen. 
  * When new note added, React code sends it to server to make the new note persist.


**Fetching Data from Servers**
* XMLHttpRequest (XHR) objects can be used to fetch data using Js.
* Not recommended (event driven model)
* Use fetch method based on promises instead. 
  * JavaScript uses async model, esp in context of IO operations. Hence, write non-blocking code to facilitate this.
* We will use the **axios** library for communicating between browser and server
  * Functions like `fetch` but nicer to use.
  * Axios is a popular JavaScript library used for making HTTP requests from a web browser or Node.js.

**Promise**
* A Promise is an object representing the eventual completion or failure of an asynchronous operation.
* pending / fulfilled / rejected.
```jsx
const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})
```

**Effect Hooks**
Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.
* `useEffect`. Effect hooks are a good tool to use when fetching data from a server.
* `useEffect` takes two parameters. The first is a function, the effect itself.
*  The second parameter of `useEffect` is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.


### Altering data in server

The `json-server` package claims to be RESTful API in its documentation.
* However, it does not exactly match the description provided by the textbook definition, of REST API, neither do most.
* Impt to familiarize with conventions used by REST APIs in general.
* Look at conventional use of routes, (URLs HTTP request types) in REST.

**REST**
In REST terms, 
* individual data objects: resources
* Each resource has unique address associated with it (URL)
* Resources are fetched with HTTP GET requests.
* Resources are created with HTTP POST requests according to REST convention.
  * Data for new resource sent in the body of the request.

* To modify individual resources, we can either 
  * replace the entire thing with a HTTP PUT request, 
  * change some propeties with HTTP PATCH request.





### Rough time breakdown

A. roughly 2 hrs
B. roughly 1 hr
C. roughly 1/2 hr.
D. roughly 1 hr
E.