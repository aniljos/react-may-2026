// <Counter initCount={5} />

import { useState, type ChangeEvent, type MouseEvent } from "react";

type CounterProps = {
    initCount: number
}

function Counter(props: CounterProps){

    const [count, setCount] = useState(props.initCount);


    function inc(evt: MouseEvent<HTMLButtonElement>){
        console.log("inc invoked...", evt);
        //props.initCount++; // props is read-only
        //setCount(count + 1);
        //setCount(count + 1);

        setCount(count => count + 1);
        //setCount(count => count + 1);
        console.log("count", count);
    }

    function handleChange(evt: ChangeEvent<HTMLInputElement>){
        const updateValue  = evt.target.valueAsNumber;
        setCount(updateValue);
    }

    return (
        <div>
            <h4>Counter: {count}</h4>
            <div>
                <button onClick={inc}>Inc</button>&nbsp;
                <button onClick={() => setCount(count -1)}>Decr</button>
            </div>
            <div>
                <input type="number" placeholder="Count" value={count} onChange={handleChange} />
            </div>
        </div>
    )
}
export default Counter;
