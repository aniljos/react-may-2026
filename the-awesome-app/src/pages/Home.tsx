import Counter from "../components/Counter";
import Message from "../components/Message";

function Home(){

    return (
        <div>
            <h3>React Vite Application</h3>
            <p>This is a training on React + Redux using the Vite framework</p>

            <Message text="Hello React" color="blue"/>

            <Counter initCount={5}/>
        </div>
    )
}

export default Home;