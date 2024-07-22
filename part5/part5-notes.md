## Part 5: React Frontend Login, Props.children/proptypes, Testing React Apps, End to end testing.

We return to focus on frontend, and look out how we can test our React code. At the same time, we will implement token based authentication and enable users to login in to the application.

### React Frontend Login

The frontend needs to be updated, since new notes cannot be added because of the changes made to the backend in part 4. Backend now expects token verifying identity.

In the case of the blog, our front end would also need to have a login component.

**Handling Login**

We will add a new login form on top of the page.
* Login is done by sending a HTTP POST request to the server. We will separate the code responsible for this request to its own module.
* Notify user on successful login by showing some user details. (E.g. name)
* Token returned with successful login saved the application state.
* Add token of user to authorization header of the HTTP request.

However, when the application is refreshed, the user login details disapears.
* We will save the login details to local storage, a key-value database in the browser.
* `window.localStorage.setItem('name', 'juha tauriainen')`, and use getItem to find value of key.
* Values saved in DOMstrings, cannot save JS object as is. Need to use `JSON.stringify` and `JSON.parse`.
* Use effect hook to check for a token.


### Props.children and proptypes

We will display the login form only when appropriate. 
* Where it appears when the user presses the login button.
* We could use a `loginVisible` component state variable to define if it is shown.
* We can extract this logic into a new `Togglable` component.

```jsx
import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
```

`props.children` is used to reference child components of the component.
* Child components are React elements defined between open close tags of component. 
* `children` prop auto added by React, always exists.

Following the React convention,

> Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it’s one of the most common things you will do writing React code.

We should move the state of things to corresponding components if the parents do not need it.
* E.g. creating new note.

**References to components with ref**

In the instance of hiding new note form after new note created, we could lift the toggleable component state outside of the component. However, we may not want to do that as we want the component to be responsible for its own state.
* Mechanism to change state of component externally
* Use `ref` mechanism of React. 
* (`useRef`) hook used to create a `noteFormRef`, assigned to the Togglable component. Acts as reference to the component. This hook ensures same ref kept throughout re-renders.
* Function that creates component wrapped inside `forwardRef` function call, so component can access ref assigned to it.







### Rough time breakdown

(with extensive breaks in between, due to intern workload)

A. roughly 2 hrs
B. roughly 
C. roughly 
D. roughly 
