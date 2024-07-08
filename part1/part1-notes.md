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