import Counter from "./components/Counter"
//import {Counter, x} from './components/Counter';
import Message from "./components/Message"




function App() {
  

  return (
    <div>
      <h3>React Vite Application</h3>
      <Message text="Hello React" />
      {/* <Message text="Hello JSX" color="red"/> */}
      <Counter initCount={5}/>
      <Counter initCount={10}/>
      
    </div>
  )
}

export default App
