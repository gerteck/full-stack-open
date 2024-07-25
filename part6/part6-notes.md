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


### Many Reducers

#### CombineReducer Complex State
**Store with Complex State**
Taking the notes app as the example, we will implement filtering by storing both the notes and value of filter in the redux store.
* Define separate reducer for state of filter (`filterReducer = (state, action) => {}`)
* Action for the reducer: `{type: 'SET_FILTER', payload: 'IMPORTANT'}`
* Action Creator function:
```js
const filterReducer = (state = 'ALL', action) => {
  // ...
};

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  };
};

export default filterReducer;
```

We can then create the overall actual reducer to feed into `createStore(reducer)`, by combining the two reducers with the `combineReducers` function.   
```js
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})
```
* State of store defined by reducer is object with two properties, each property value defined by the respective reducer.

#### Redux Toolkit

Redux's configuration and state management implementation requirest a bit of effort, and code has somewhat rept boilerplate code. Redux Toolkit is a library that solves common Redux-related problems, simplify configuration of the Redux store and offers large variety of tools to east state management.
* `npm install @reduxjs/tookit`

Some changes include:
* Using Redux Toolkit's `configureStore` function instead of Redux's `createStore`
* Easily create reducer and related action creators using `createSlice` function.
* We can use the `current` function from the immer library to log the current state.

Redux DevTools (chrome addon) also offers useful dev tools for Redux.
* Allows inspecting Redux store's state and dispatch actions through the browser console.

### Server communication with Redux Application

Let's use `json-server` to simulate a server. 
* `npm i json-server --save-dev`
* `db.json` placed in root of project.

Use `axios` (HTTP client for node.js) to fetch data from the backend.
* `npm i axios`

It would be good if we do not couple the communication with server inside the functions of communications, but rather abstracted away from components so that they simply call the appropriate action creator.

Async actions can be implemented using the `Redux Thunk` library. 
* Use does not need any add config or install if Redux store created using Redux Toolkit `configureStore`
* Refactor code to reduce duplication.

### React Query, useReducer and the context

Let's look at more different ways to manage the state of an application.
* Focus on communication with the server.

#### React Query Library

React Query: versatile library, simplies application.
* Can partially replace state of app in some cases
* React Query: Server-state library, responsible for managing async operations between server and client.
* Redux: Client-state library, can store asyn data, albeit inefficiently compared to tool like React Query.

React Query is a library that maintains server state in the frontend (acts as cache for what is stored on the server). React Query simplifies the processing of data on the server, and can sometimes eliminate need for data on server to be saved in the frontend state.

Most React applications need not only a way to temp store served data, but also some solution for how rest of frontend state (e.g. forms, notifications) is handled.

**React Query**
Let's use the React Query library to store and manage data retrieved from the server. Latest ver is called TanStack Query.
* `npm install @tanstack/react-query`
* We add additions to `main.jsx` to pass library functions to entire application.
* Retrieving data from server done in a familiar way with Axios `get` method. The method call wrapped in a query formed with `useQuery` function.
* Application renders on screen without using React hooks `useState`, `useEffect`, data under administration of React Query library.

**Synchronizing data to server using React Query**
Data is already successfully retrieved from server. Let's make sure that added/mod data stored.

* To create a new object, a `mutation` defined using `useMutation`
* It takes parameter `mutationFn`, which in this case is `createNote` that is the function using Axios to send a new note to the server.
* After that, we perform the mutation using mutation object `mutate`.
* To render new note, tell React Query old result of query whose key is in string `notes` shld be invalidated.
  * `onSuccess: () => {queryClient.invalidateQueries({ queryKey: ['notes']})}`
  * Causes React Query to auto update query with key `notes`, i.e. fetch notes.

It is also possible to optimize performance by manually updating query state maintained by React Query, since if not a HTTP GET request would have to retrieve again every time rerender.
* Default functionality of React Query's queries (status is stale) updated when window focus changes. Can turn off this functionality.

**Local State Management: useReducer**

We may still need state management to complement React Query / etc, to manage the rest of the frontend state.  
* E.g. state of forms input
* State created with `useState` is a sufficient solution.
Using Redux is possible, but there are other alternatives.

We can use React's built-in `useReducer` hook.  

```jsx
const [counter, counterDispatch] = useReducer(counterReducer, 0)

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
        return state + 1
    case "DEC":
        return state - 1
    case "ZERO":
        return 0
    default:
        return state
  }
}

const Display = ({ counter }) => {
  return <div>{counter}</div>
}

const Button = ({ dispatch, type, label }) => {
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <div>

      <Display counter={counter}/>
      <div>

        <Button dispatch={counterDispatch} type='INC' label='+' />
        <Button dispatch={counterDispatch} type='DEC' label='-' />
        <Button dispatch={counterDispatch} type='ZERO' label='0' />
      </div>
    </div>
  )
}
```

* Hook `useReducer` provides mechanism to create state for an application. The parameter for creating a state is the reducer function handling state changes and initial value of state.
* Function `useReducer` returns an array containing an element to access the current value of the state (array[0]), and a dispatch function to change the state (array[1]).
* Dispatch function given the appropriate state-changing action as parameter.

**Passing State to Components**
We need a way to pass the state to components.
* To split the application into several components, the value of the counter and dispatch function to manage it must be passed to the components.
  * Can pass as props (e.g. `<Component dispatch={dispatchFunction} ... />`), but not optimal if component structure gets complicated.
  * E.g. if need to pass to sub-sub-sub component. Phenonmenon is called *prop drilling*.

We can also use context to pass the state to components. 
* Can use React's built in *Context API*, where the context is a kind of global state of the application, so it is possible to give direct access to any component app. 
* React hook `createContext`, we can create in a new file.
* Providing context done by wrapping child components inside `Context.Provider` component and setting suitable value for the context.
* Components can not access the context using the `useContext` hook, while importing the original context.

We can refactor it such that the entire state of the application and code for managing it is isolated in the Context file (e.g. `CounterContext`), providing components with well-named and easy to use aux functions for managing the state.

### So, which State Management Solution to choose?

In parts 1-5, we used React's hook `useState` for state management, with async calls to backend using `useEffect` hook.
* Subtle problem is that if multiple components needed the state, must pass via props to all of them, prop drilling.

Alternative solutions for state management of React apps have been developed
* Not solution has been final, all with props and cons. 
* New solutions developed over time.


**Which solution should be used??**

Impossible to give a single correct answer. 

* For a simple app, `useState` is a good starting point.
* Recently, more common to move communication and assoc. state management at least partially under control of React Query.
* Most comprehensive and robust state management solution is Redux, to implement so called Flux architecture. 
  * Though rigidity of Redux has been motiviation for new state management solutions.
  * Redux does not have to be used in entirety, can use with React Query etc.
* Others include `Recoil`, `MobX`

It is possible that selected state management solution suboptimal as app grows to extent that solution has to be changed even if the application has been put into production use.



### Rough time breakdown

(with extensive breaks in between, due to intern workload)

A. roughly 4 hrs
B. roughly 3/4 hrs
C. roughly 1 hr
D. roughly 3 hrs




