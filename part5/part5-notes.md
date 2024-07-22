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