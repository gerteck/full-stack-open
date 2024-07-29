## Part 7: React Router, Custom Hooks, Styles, Webpack, Class Components and Others

In this part, we will look at 
* React Router to divide the application into different views shown, based on URL in the browser address bar. 
* Adding CSS styles to React applications. 
* We have also been using Vite to build our applications. We will look at configuring the whole toolchain, doing so using the Webpack tool. 
* Hook functions and how to define custom hook.

> In this part of the course, exercises will differ slightly, with exercises related to the theory of the chapter. Additionally, series of exercises where we revise content learnt in the whole course, expanding BlogList application worked on in parts 4 and 5. 


### React Router

Here, we look at the application using React without Redux.

Web applications often have a navigation bar enabling switching of views of the application. 
* E.g. main page, separate pages for showing information on notes and users.

**Web Views**
* In older web applications, changing the page shown would be accomplished by browser making HTTP GET request to server and rendering HTML representing the view returned.
* In SPA (Single Page Apps), we are always on the same page. JS code run by browser creates illusion of different pages. If HTTP request made when switching views, only for fetching JSON data, which new view may require.


Navigation bar and app containing multiple views easy to implement using React.
* One suboptimal way would be to implement each view as own component, store in a state and display conditionally.
* However, suboptimal because address stays the same though different views, (implications: can't bookmark etc, back button doesnt work, if app big overly complicated.)


**React Router**

React Router library provides solution for managing navigation in React app.
* `npm install react-router-dom`


```jsx
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Router>
  )
}
```

Routing (conditional rendering of components based on URL) is used by placing components as children of the Router (BrowserRouter) component, inside the tags.

> BrowserRouter is a Router uses HTML5 history API (pushState, replaceState, popState event) to keep UI in sync with URL
* Normally browser loads new page when URL changes, but with HTML5 history API, browserRouter enables use of URL for internal 'routing' in React app.
* Even if URL change, content on page manipulated using JS, not load new content. 

**Parameterized Route**
We can define parameterized URLs in routing of the App component.
* Component can also access URL param with the `useParams` function of React Router.
* E.g. Notes representing view of a single note, where name of each note is clickable.
* Use React Router's `useMatch` hook to figure out id of note to be displayed


**`useNavigate`**
Use `useNavigate` to handle navigation on events.
* Change browser URL programmatically
```js
const navigate = useNavigate();
...
navigate('/');
```

We can also define an element (e.g. footer, at bottom of screen) outside of Router, so it is shown regardless of component shown in routed part of app.


### Custom Hooks

> Hooks are functions that let you 'hook' into React state and lifecycle features from functoin components.

React offers 15 built in hooks, including `useState` and `useEffect` hooks. 
* `useImperativeHandle` hook to allow components to provide functions to other components. 
* `useReducer`, `useContext` to implement a Redux like state management.

Many React libraries have begun to offer hook-based APIs.
* `useSelector`, `useDispatch` hooks from react-redux library to share redux-store and dispatch function to components.
* React Router's API is also partially hook-based. Hooks can be used to access URL parameters and navigation object, allowing manipulation of browser URL.

**Hooks Rules & Limitations**
Hooks are not normal functions, and when using them, there are certain rules and limitations. From React documentation:
* Don't call hooks inside loops, conditions or nested functions. Always use Hooks at the top level of your React function.
* Can only call Hooks while React is rendering a function component
  * Call at top level in body of function component
  * Call at top level in body of a custom Hook.
* ESlint plugin can be used to verify application uses hooks correctly

**Custom Hooks**

React allows creation of custom hooks, which primary purpose is to faciliate reuse of logic used in components. ("Extract component logic into reusable functions").
* Custom hooks are regular JS functions that can use any other hooks, as long as they adhere to the rules of hooks. 
* Name of custom hooks must start with the word `use`.

**Sample Counter Hook**
A simple sample counter custom hook here:
```js
const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value, 
    increase,
    decrease,
    zero
  }
}

...
const counter = useCounter();
```
The custom hook uses `useState` hook internally to create its state, and the hook returns an object, properties of which include value and functions for manipulating its value.
* This extracts the state and manipulation entirely into the `useCounter()` hook.
* Managing state and logic now responsibility of the custom hook.
* Same hook can be reused in the application.
* Using the hook repeatedly will create completely separate counters.

**Sample Form Hook**:
```js
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

...
const name = useField('text');
<input type={name.type} value={name.value} onChange={name.onChange}/>
<input {...name}/>
```

Overall, custom hooks are not only a tool for reusing code, but provide a better way for dividiing it into smaller modular parts.


### More about Styling

Previously, we looked at using (single) CSS file and Inline styles to add styles to our application. We will take a look at more ways to do so.

#### Ready-Made UI Libraries

One approach to defining styles: use a ready-made "UI framework".

Many UI frameworks provide developers of web applications with ready-made themes and 'components' like buttons, menus, tables. Not React components.
* UI frameworks used by including the CSS stylesheets, and JS code of framework into the app. 
* One popular UI framework is the Bootstrap toolkit created by Twitter. There has also been an explosion in number of new UI frameworks that have entered the arena. 
* Many UI frameowkrs have React-friendly versions, where 'components' have been transformed in React components. 
  * `reactstrap`, `react-bootstrap`.

We will look at two UI frameworks: Bootstrap and MaterialUI.
* Use both to add similar styles to the application made in React Router section.


#### React Bootstrap

Bootstrap, with the help of `react-bootstrap` package.
* `npm install react-bootstrap`

Then, we can add a link for loading the CSS stylesheet for Bootstrap inside of `head` tag in the public/index.html file of app.

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
    crossorigin="anonymous"
  />
  // ...
</head>
```

**Using React Bootstrap**
* Add root `div` element the `container` class attribute.
  * `<div className="container">...</div>`
* Tables, React Bootstrap provides built in Table component, no need to define CSS classes separately.
  * `<Table striped> <tbody><tr><td>.../ //  </Table>`
  * Import React Bootstrap comoponents separately: `import { Table } from react-bootstrap;`.
* Forms: React Bootstrap has built-in components for creating forms. Can use for login.
* Alert: Alert React component can act as a notification.
* Navigation Bar: Navbar, Nav.Link

#### Material UI

MaterialUI React libary, which implements the Material Design visual language developed by Google.
* `npm install @mui/material @emotion/react @emotion/styled`

We can use MaterialUI to do the same modifications to the code as we did with Bootstrap.
* Container, Table, Form, Alert, AppBar
* We can also use component props to define how the root element of a MaterialUI component is rendered.

Generally, the difference between react-bootstrap and MaterialUI is not big.

#### Other UI Frameworks

Instead of using React Bootstrap library (React-Integration Libraries), we could have just as well used Bootstrap directly by defining CSS classes for the app's HTML elements.

* In addition to making frontend code more compact and readable, another benefit of using React UI libraies is they include the JS needed.
* Potential downsides include unstable APIs and poor documentation.

#### Styled Components

Styled components library offers interesting approach for defining styles through tagged template literals.
* `npm install styled-components`.

Styled components have seen consistent growth in popularity.


### Webpack Manual Bundling

At first, React was difficult to configure the tools required for application development. To make situation easier, 
* Create React App developed, eliminate config-related problems.
* Vite, recently replaces Create React App in new applications.

Both Vite and CRA use *bundlers* to do actual work. Let us familiarize with the bundler "Webpack" used by CRA. Webpack by far the most popular bundler for years, though several new generation bundlers such as esbuild used by Vite, faster and easier to use than Webpack. (though e.g. esbuild still lacks some useful features e.g. hot reload).

**Bundling**

Our application, code is divided into separate modules, imported to places that require them. Even though ES6 modules defined in ECMAScript standard, older browsers do not know how to handle code divided into modules.
* Code divided must be bundled for browsers.
* Source code must be transormed into single file containing all application code. 
* E.g. `npm run build` does bundling of the application.
  * Bundled into `index.html` that calls a singular JS file, and all CSS files into single CSS file. 

> Old way of dividing code into multiple files was based on fact that index.html loaded all separate JS files of app with help of script tags. Decreased performance. Now, preferred method is to bundle code into a single file.

**Webpack Configuration**

We can create a webpack configuration by hand, for a new React application.

```
|- build
|- package.json
|- src 
|- L index.js
L webpack.config.js
```

* install webpack `npm i --save-dev webpack webpack-cli`
* Define functionality of webpack in the config file.
* Define new npm script called build that will execute bundling with the webpack.

When we execute the command, application code will be bundled by the webpack. Operation produces new `main.js` file added under build directory.

Then we can transform the application into a minimal React applicaiton.
* install `npm install react react-dom`
* Add definitions in `index.js` file.
* Add build/index.html file to serve as main page of application, to load our bundle JS code with a script tag.


**Loader**
We will need an appropriate loader to bundle the App.js file correctly. As the webpack only deals with plain JS, we are using JSX to render views in React.
* configure the loader in the config file. (e.g. babel-loader)
  * `npm install @babel/core babel-loader @babel/preset-react --save-dev

Additionally, if bundle application source code uses `async/await`, browser will not render anything on some browsers. Need to install some dependencies
* core-js, regenerator-runtime.

**Transpiler**

Transpiling is the process of transforming code from one form to another, of the same or different language. By using previous configuration, using babel to transpile from JSX to regular JS. 

**CSS**

We can add CSS as well.
* Need css and style loaders.

**Webpack-dev-server**

Current configuration to develop application workflow is bad, (almost like dev workflow with Java, every time make a change, bundle it and refresh the browser to test it)
* `webpack-dev-server` will enable hot reload.
* Code is not bundle the usual way, result of bundling exists only in memory.

**Source Maps**

Location of errors indicate in message in console may not match actual location of error in source code. 
* We want to see actual source code in error message.
* Fixing error message is quite easy, ask webpack to generate so-called 'source map' for bundle, to map errors that occur during execution of the bundle to corresponding part in og source code.
* `devtool: 'source-map'`

**Minifying the Code**

When we deploy app to production, size of main.js file may be huge as it contains source code for entire React library. 
* Browser has to load the code when app first used.
* It can be greatly optimized in terms of file size by removing all comments. 
* Optimization process for JS files is called minification.
  * `UglifyJS`
* Unnecessary whitespace, newline, var names all optimized.

**Development and Production Configuration**

Add backend to application.

To not hardcode address of backend server, we can change address in controlled fashion to point to production backend server by using Webpack config function with two params, env and arg.
* Use `argv` to find out the mode in npm script
* Set Webpack to work differently based on mode.

**Polyfill**
Some features such as promises, array.find are IE-incompatible. 
* Need to add `polyfill`, code to add missing functionality to older browsers.


Overall, browser compatibility of different APIs can be check by visiting 
* caniuse.com
* Mozilla website

### Class Components, Misc

In all previous content, we only use React components defined as JS functions. This is not possible without hook functionality with v16.8 of React. Previously, when defining a component that uses state, one had to define it using JS class syntax.

Main Features of Class Components:
* Constructor
* Render Method
* State, in instance variable `this.state`, where multiple parts stored as properties of the state.
* Lifecycle methods of Class Components, corresponding to inside an `effect` hook, executed when component renders or less frequently.

Biggest difference between Functional components and Class components is mainly that state of a Class component is a single object, state updated using the method `setState`, while in Functional components state can consist multiple diff. variables with separate update function.
* Functional components no need to deal with self reference `this`

Class components offer little benefit over Fucntional components that have hooks. When writing fresh code, no rational reason to use Class Components, if project using React > v16.8. Also no need to rewrite all old React code as Functional components.

#### Organization of Code in React Applications

> The ideal structure is one that allows you to move around your code with the least amount of effort.

Frontend and Backend in same repository:
* A typical approach to create frontend and backend in separate repositories.
* There may be situation where entire app put into single repo too.

#### Virtual Dom

Concept of Virtual DOM.
Browsers provide a DOM API through which JS running in browser can modify elements.
* With help of ReactDOM library, virtual DOM defined by components rendered to real DOM that can be shown by browser using the DOM API.
* When state of app changes, new virtual DOM defined, Reacts computes optimal way to update DOM.

#### Misc

**Changes on the server:**
How do we get frontend to get changes to server?
* Polling on frontend (repeated requests using `setInterval`)
* WebSockets to allow two-way communication channel. (Socket.io library also ok)

**React**

React is primarily a library for managing the creation of views for an application. 
* For a MVC pattern, domain of React would be View.
* For small apps, data handled stored in state of React can be seen as the Model.
* Using React only as a UI library is not wrong.

#### Current Trends

Typed versions of JavaScript.
* Static type checking, TypeScript.

Server-side rendering, isomorphic applications, universal code.
* Rendering can be done on the server, which serves pre-rendered page made with React.
  * A motivation is Search Engine Optimization (SEO) , where search engine bad to recognizing JS rendered content.
* Isomorphic web app performs rendering on both frontend and backend.

Progressive Web Apps
* Web apps should work as well as possible on every platform and in offline / slow internet connection.

Microservice Architecture
* Way of composing backend of application from many separate independent services. 

And others.

### Rough time breakdown

A. roughly 1 hr
B. roughly 2/3 hrs
C. roughly 1 hrs (Exercises in Part F)
D. roughly 1 hrs
E. roughly 1 hrs
F. roughly 8 hrs
