import { useProducts } from "../hooks/useProducts";
import { useTitle } from "../hooks/useTitle";

const url = "http://localhost:9000/products";

function GadgetStore(){

    useTitle("Gadgets");
    const {products} = useProducts(url);
    
    

    return (
        <div>
            <h3>GadgetStore</h3>
        </div>
    )
}

export default GadgetStore;