import { useProducts } from "../hooks/useProducts";
import { useTitle } from "../hooks/useTitle";

const url = "http://localhost:9000/products";

function GadgetStore(){

    useTitle("Gadgets");
    const {products} = useProducts(url);

    function renderProducts() {

        const productsView =  products.map((item, index) => {
           

            return (
                <div className="col" key={index} >
                    <div className="card border-warning" >
                        <div className="card-body text-success">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text text-primary">INR {item.price}</p>
                            <button className="btn btn-primary" onClick={e => addToCart(item)}>Add To Cart</button>
                        </div>
                    </div>
    
                </div>
            );
        })
        return (
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {productsView}
            </div>
        )
    }
    

    return (
        <div>
            <h3>GadgetStore</h3>
            <div>
                {renderProducts()}
            </div>
        </div>
    )
}

export default GadgetStore;