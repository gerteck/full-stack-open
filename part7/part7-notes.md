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
















### Rough time breakdown

A. roughly 1 hr
B. roughly  hrs
C. roughly  hrs
D. roughly  hrs
E. roughly  hrs
F. roughly  hrs
