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
```JSX
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







A. roughly 2 hrs
B. 