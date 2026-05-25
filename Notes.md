# Notes

## Forms(Introduction and Quiz)
 - Intro: https://forms.gle/cxPb6q9Ud9W1WgyV6
 - Quiz #1: https://forms.gle/Pji6QDvPxDLtPiBx6
 - Quiz #2: https://forms.gle/CwGVHhhHF4JR887d7
 

## Git URLs

Add the Git repository URL for this application and related applications here.

### Current Application

- Repository URL:https://github.com/aniljos/react-may-2026

### Other Applications

- REST API Mock: https://github.com/aniljos/REST-API-Mock

### Documentation

* React: https://react.dev/
* React(Legacy): https://legacy.reactjs.org/
* Vite: https://vite.dev/
* Nextjs: https://nextjs.org/
* Legacy -> Create React App(CRA): https://create-react-app.dev/ 


### Links
* React CDN Links: https://legacy.reactjs.org/docs/cdn-links.html
* Babel cdn: https://cdnjs.com/libraries/babel-standalone/7.26.3

## Class Notes

 * ES(6/7/8)  ===> TransCompiler(babel/typescript) ==>    Browser(ES5)

 ### Project Structure(Vite)
    - package.json: npm configuration file with scripts and dependencies
    - tsconfif: typescript conf file
    - eslint: 
    - vite.config.js: Vite config, production specific rule, micro-frontends etc.
    - public folder: A resources available using the http protocol
    - src folder: source code, compiled, bundled and so on
    - index.html: the only html page of the SPA
    - src/main.tsx: Entry point script, renders the App component
    - src/app.tsx: The root component of the application

### Components
  - Writing a component: functional or class
  - Rendering the component: CSR(Client-side rendering) or RSC( React server component)

### Component Props
  - Parameterize a component
  - props are passed to component like html attibutes
  - props are received as an object
  - To pass data from a parent(master) to a child(details) component or vice-versa
  - props is read-only(in the child component)

### Component State
  - initernal to a component
  - hook: useState hook
  - state updates are asynchronous
  - state updates are batched
  - setState: 2 signatures
      - setState(updateValue)
      - setState(callbackFn),  callbackFn(currentValue): updatedValue
  - state must be treated as immutable
      - state of type and object or an array
      - To change state: create a copy, change the copy, set the copy to the state


### Component Re-render
  - When props change the component re-render
  - When state changes
  - When a parent component rerenders, all the child components will re-render
  - forceUpdate(class components)

### Form fields(input(text, password radio, checkbox), select, textarea)
  - controlled input
    - Reactive
    - props on the input: value, onChange
    - binding the input element to the state(useState) 
  - uncontrolled input
    - Non-reactive
    - prop: ref
    - handle to the input using the useRef hook.

### useEffect
  - onMount
    - useEffect(() => {}, []), the dependency array must be empty
    - called once in the lifetime, mounted
    - use cases
        - DOM Initializations
        - Http(API) calls on component loaded
        - Websockets connections
        - Register to any window or document event
  - onUpdate
    - useEffect(() => {}, [dep1]), the dependency array is non-empty
    - called when the dependency changes
  - onUnmount
    - the callback(invoked on unmount) is returned from the useEffect for mount
    - use cases
        - Cancel the API call
        - Websockets connection close
        - unregister to any window or document event




## Optimization & Design
  - Keep the components to be granular(small)
    - promote easy maintaince, optimize, testing
  - reuse functionalties in a functional component
    - challenge: most functionaties invokes the usage of hooks
    - custom hooks

## State Management( Sharing  Data)
  - LocalStorage & SessionStorage
  - Cookies(Http)
  - Memory (State Management Libraries)
    - Redux
    - React Context
    - MobX
    - Zustand

## Redux
  - state
    - must be treated as immutable
  - store:
      - keeps the data
      - one per application
  - reducer
      - is a function
      - receive an action, process the actions and updates the store
      - one reducer per store, however we can create multiple reducers and combine to a single reducer
  - action 
      - is an object with type property and any other properties
      - The type this defines what we intend to do
  - react-redux
      - Provider component: integrate the redux store with react application
      - hooks
          - useDispatch: return a dispatch function which can be used for dispatching an action
          - useSelector: select data from the store(inherintly subscribes to the store)
          - useStore: retuns the handle to the store


## Assignment #1
  - From ListProducts navigate to EditProduct of the click of the edit button
  - In the Edit Product, desgn the UI form form modifying the product(name, description, price)
  - Populate the form with the data
    - Endpoint is Http GET: http://localhost:9000/products/:id
  - Save button: on the click of the save button update change to the backend
    - Endpoint is Http PUT: http://localhost:9000/products/:id

## Assignment #2 
  - Search application(page)
    -Wiki search endpoint: https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=20&search=react
    Search Interface: 1. input field(search) 2.drop-down(limit:5,10,20,30) 4.Search results: text and link

## Assignment #3
  - Customers page : Master and detail
    - Display all customers in an HTML table, the customer name as a link
    - Details of the customer on a new route

## Assignment #4
  - Generic Custom Hook for fetching the data(products, orders, customers)
  - useData<T>(url, isSecure)

## Quick References


