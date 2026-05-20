// <Counter initCount={5} />

import { useRef, useState, type ChangeEvent, type MouseEvent } from "react";

type CounterProps = {
    initCount: number
}

function Counter(props: CounterProps){

    const [count, setCount] = useState(props.initCount);
    const inputRef = useRef<HTMLInputElement>(null);


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

    function handleUpdate(){
        const value = inputRef.current?.valueAsNumber;
        if(value){
            setCount(value);
        }
        
    }

    return (
        <div>
            <h4>Counter: {count}</h4>
            <div>
                <button onClick={inc}>Inc</button>&nbsp;
                <button onClick={() => setCount(count -1)}>Decr</button>
            </div>
            <div>
                {/* controlled */}
                <input type="number" placeholder="Count" value={count} onChange={handleChange} />
            </div>
            <div>
                <input ref={inputRef} type="number" placeholder="New Count" /> &nbsp;
                <button onClick={handleUpdate}>Update Count</button>
            </div>
        </div>
    )
}
export default Counter;
