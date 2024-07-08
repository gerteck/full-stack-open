## **React, JavaScript, Component State, Event Handlers, Complex state, Debugging React Apps**

### Introduction to React

Getting familiar with the React library. Make a simple React application and get to know the core concepts of React. We can get started by using a tool called Vite. Vite is a dev environment writtedn by Evan You, (Vue.js), used by default for Vue and for React project templates. Supports Typescript & JSX (syntax extension to JS for React, that allows us to write HTML in React)!!

* Arrow Function (Function expression)
* React: Rendering logic and markup live together in the same place: Components
* JSX: (XML-Like)
  * React components seem to return HTML markup, but that is not the case. JSX looks like HTML, but we are dealing with a way to write JavaScript. Under the hood, JSX returned by React components is compiled into JS. This compliation is handled by Babel compiler, and has been configured to compile automatically.

Other quirks:
* React component content usually contain only one root element. (Or else, use fragments `<> </>`)
* First letter of React component names must be capitalized.
* In React, variables rendered in braces must be primitive values.
  * Objects are not valid as React child, since objects can't be rendered.

### JavaScript

Official name of JavaScript standard is ECMAScript.

* As many browsers do not support all of JS's newest features, a lot of code run in browsers has been transpiled from a newer version to an older compatible version.
* Most popular way to do transpiling is using Babel. 
* Nodel.js is a JavaScript environment based on Google's Chrome V8 JS engine and works practically anywhere, from servers to mobile phones. Understands latest version of JS, no need to transpile.

```Javascript
// Variables
const x = 1;
let y = 5;

// Arrays
const t = [1, -1, 3];
t.push(5);
t.forEach(value => {
  console.log(value);  // numbers 1, -1, 3, 5 are printed, each on its own line
});

// Objects
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
};

// Functions
const sum = (p1, p2) => {
  console.log(p1);
  console.log(p2);
  return p1 + p2;
};
```
* `const` defines value that can no longe rbe changed. `let` defines normal variable. Data type of variable can also change during execution. Use of `var` is not advised.
  * Use `let` as much as possible to avoid scope monster.
  * `var` has variable hoisting, may cause undefined error that is harder to debug. `let` immediately throws reference error when out of scope which is easier to debug.
* `arrays`: In React, preferable to use method `concat`, which creates a new array with added item, rather than `push`.
  * Individual items of an array are also easy to assign to variables with the use of destructing assignment.
* `Objects`: Different ways to define objects in JS, e.g. Object literals.
  * Use 'dot' notation to reference properties, or use brackets.

**Object Methods and "this"**
* We can assign methods to an object by defining properties that are functions.
  * These can be assigned to objects even after creation of object.
  * When calling a method through a reference, the method loses knowledge of what the original `this` was.
  * Value of `this` is defined based on how the method is called. (Recall CS1101S).
  * Several mechanisms to preserve original `this`, e.g. using `bind` method.

**Classes**
There is no class mechanism in JavaScript (unlike Java, C++ etc). However, there are features to simulate object-orientated classes.

### Component State, Event Handlers

* Component helper functions: While in Java, defining a function insde another one is more complex, in JS, defining functions within functions is a commonly used technique.
* Destructuring: Small but useful feature.
  * We can destructure to make assignment of variables easier, use it to extract and gather values of an object's properties into separate variables.
  * We can even directly destructure the props object parameter passed to the component function.

```js
props = {
  name: 'Arto Hellas',
  age: 35,
};

// Do this
const Hello = (props) => {
  const { name, age } = props
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

// Or take it further
const Hello = ({ name, age }) => {
// ...
}

```

**Page re-rendering**

Creating a page where value of counter increase, and we want to rerender.
* We can get component to re-render by calling `render` method a second time.
* Repeated calls to `render` method is not reccomended.

**Stateful Component**

Adding state to our application using Reacts's state hook.
```js
import { useState } from 'react';
// ...
const [ counter, setCounter ] = useState(0);
```
* When the state modifiying function `setCounter` is called, React re-renders component. Function body of component function gets re-executed.

**Passing State - to child components**
Recommended to write React components that are small, reusable across app and projects. 
* Best practice in React is to *lift state up* in the component hierarchy.
> Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.
* We can also pass the event handler functions through the props as well.


**Event Handling**

Event handlers are registered to be called when specific events occur, e.g. button click.
* Button elements support so-called mouse events.
* `handleClick` function e.g. `<button onClick={() => console.log('clicked')}>`
* An event handler is a function, or a function reference.

**Refactoring**

At this point, some tips for refactoring include:
* Using destructuring to simplify the component.
  * Use to get only required fields from props.
* Use arrow functions to compact function definitions.
* Proper naming (e.g. event handler props named as `onAction`)
* Don't oversimplify components as well.

### More Complex State, Debugging React Apps


