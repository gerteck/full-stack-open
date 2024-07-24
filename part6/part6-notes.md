## Part 6: Flux-architecture and Redux, Many reducers, Communicating with Server in Redux App, React Query, useReducer and the Context

In smaller applications, we place the state and state logic directly inside React components. As they grow larger, state management should be moved outside React components.

We will look at the Redux library, which is currently most popular for managing the state of React applications.
* Lightweight version of Redux directly supported by React: React context and useReducer hook
* React Query library that simplifies server state management.

### Flux-Architecture, Redux

In smaller applications, we follow state management conventions recommended by React.
* State and funtions for handling it at higher level of component structure of application.
* Most of app state and state altering functions reside directly in root component.
* State and handler methods passed to other components with props.

When apps grow larger, state management becomes challenging.

#### Flux Architecture

Facebook developed the [Flux](https://facebookarchive.github.io/flux/docs/in-depth-overview/)-architecture to make state management of React app easier. 
* Complements React's composable view components, utilize unidireactional data flow.
* Three major parts: Dispatcher, Stores, and Views (React components) (Do not confuse with Model-View-Controller :X:)
* State is separated from React components and into its own stores.

State in store not changed directly but with different actions.
* When an action changes the state of the store the views are rerendered.
* If action causes need to change state, change made with action, causes re-render of view.
* Flux gives standard way for how and where app state is kept, and how it is modified.

![](/images/6-flux.png)


#### Redux (Based on Flux Architecture)

We will use `Redux` library. Works on same principle as Facebook's implementation for Flux, but simplier. 
* We will test out Redux on simple counter application
* For new Vite application, `npm install redux`
* As in Flux, in Redux state is stored in a store.

Whole state of application stored in one JS object in the store!
* Save value of counter straight to store.
* If state more complicated, diff things in state saved as separate fields of object
* State of store **changed with actions**. 
  * Actions are objects, which have at least a field determining type of the action. (e.g. `type: 'INCREMENT'`)
  * If data involved in action, other fields declared as needed.
  * Impact of action to state defined using `reducer`.
* `Reducer` is function that is given current state and action as parameters. Returns new state.

Reducer:
* First param is state in store, reducer returns new state based on action type. 
* Define default value of 0 for state if store state has not been primed.
```js
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default: // if none of the above matches, code comes here
      return state;
  }
};

import { createStore } from 'redux';
const store = createStore(counterReducer);

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
console.log(store.getState())
store.dispatch({ type: 'ZERO' })
store.dispatch({ type: 'DECREMENT' })
console.log(store.getState())
```

Reducer is never to be called directly from application code. 
* It is only given as parameter to the `createStore` function which creates the store.
* Store then uses reducer to handle `actions`, which are dispatched/sent to store using `dispatch` method.
* `store.dispatch({type: 'INCREMENT'})`
* Find out state of store using method `getState`
* `subscribe` method of the store used to create callback functions, that the store calls whenever action is dispatched to the store. (Add the callback function to those called)

**In the example given, (counter)**
* `App` renders value of counter by asking it from store with method `store.getState()`
* Action handlers of the buttons dispatch right actions to the store
* When state changes, React not able to auto rerender. 
* Hence, register function `renderApp`, which renders the whole app and listens fo changes in the store  by `store.subscribe(renderApp)`. We also have to call the `renderApp` method to initiate first rendering of the app.

**Redux Notes**
Note: `configureStore` method of @reduxjs/toolkit package is preferred over `createStore`, improved version.
* How to modify out note/blog application to use Redux for state management?
* Type of field name of an action is not random, convention: type_payload
* Reducers must be pure functions (no side effects, always return same response when called with same params)
  * E.g. use `state.concat` rather than `state.push`
  * Reducer state must be compose of immutable objects.
  * We can use the library `deep-freeze`, which can be used to ensure that the reducer has been correctly defined as an immutable function. `--save-dev deep-freeze`

Uncontrolled Forms, Action Creators
* Uncontrolled forms is where we do not bound the state of the form fields to the state of the App component.
* Separate Redux actions into separate functions to refactor. We call these functions action creators.

**Forwarding Redux Store to various Components**
Aside from reducer, app is in one file. We should separate App into own module
* For App to access store, or for components to access store, there are multiple ways to share the Redux store with components.
* We will look at newest/easiest way which is using the hooks API of the react-redux library.
* Install react-redux `npm install react-redux`

Add a `<Provider store={store}> ... </Provider>` into App.jsx
* App is now child of `Provider` component provided by React Redux library.
* If app has many components which need the store, it must pass store as props to all of those components
* Instead of using dispatch method of Redux store, now does it with `dispatch` function fomr `useDispatch` hook.
* Component can access notes in store with the `useSelector` hook of react-redux library: 
  * `const notes = useSelector(state => state)`
  * We can use the function to do filtering to get selected parts of Redux store.

> Hooks allow function components to have access to state and other React features.


**App components:**
* Use `useDispatch` hook to handle reducers (which handle actions impact on state).  
* Presentational components: Simple, no application logic
* Container Component: Contains app logic, defines XXX, coordinates some cofiguration.








