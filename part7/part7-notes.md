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






















### Rough time breakdown

(with extensive breaks in between, due to intern workload)

A. roughly  hrs
B. roughly  hrs
C. roughly  hrs
D. roughly  hrs
E. roughly  hrs
F. roughly  hrs
