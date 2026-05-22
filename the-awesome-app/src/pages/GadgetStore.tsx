import { useTitle } from "../hooks/useTitle";

function GadgetStore(){

    useTitle("Gadgets");

    return (
        <div>
            <h3>GadgetStore</h3>
        </div>
    )
}

export default GadgetStore;