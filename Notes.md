# Notes

## Forms(Introduction and Quiz)
 - Intro: https://forms.gle/cxPb6q9Ud9W1WgyV6
 - Quiz #1: https://forms.gle/Pji6QDvPxDLtPiBx6
 

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



## Quick References


