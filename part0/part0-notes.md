### **Part 0: Fundamental of Web Apps**

- **Traditional web application**: Fetch HTML document with structure and content. Reload for any changes.

- **Event Handler functions** called  as *callback* functions

- **Document Object Model**, DOM, HTML pages as implicit tree structures. API that enables programmatic modification of element trees of web pages.

- **AJAX**: Early style of web development. (Async JavaScript and XML). 2005. Enables fetch of content to web pages using JS including within HTML without need to rerender page.

- **SPA**: Single Page Application style of web applications. SPA-style websites do not fetch all pages separately from server, but only comprise one HTML page fetched, and content manipulated with JS that executes in the browser.

- **jQuery**: JavaScript library that is fast, small and feature-rich. Simplify HTML document traversal, manipulation, event handling, animation, AJAX, simplier.

- **React**, one of the most popular tools for implementing browser-side logic of web applications. (Facebook). React and Redux (JS library of global state management) library. VueJS has also been becoming popular.

- **Full stack web development**: No agreed upon definition. Architecture of web app as a stack of layers (Browser/front-end/top later, and server/backend/database as bottom layer.)

- Use **Node.js** runtime environment. JS fatigue possible due to constant change and development.


### Diagrams

Markdown diagrams can be created using these different (not exhaustive) syntaxes: mermaid, geoJSON and topoJSON, and ASCII STL. Diagram rendering available in GitHub Issues, Discussions, PRs, etc. 

- **Mermaid Diagrams**: Markdown-inspired tool that renders text into diagrams. Mermaid can render flow charts, sequence diagrams, pie charts etc. [Mermaid Documentation](https://mermaid.js.org/#/). Open Source Software.

Simple Flow Chart:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

Mermaid Version in Use:
```mermaid
    info
```