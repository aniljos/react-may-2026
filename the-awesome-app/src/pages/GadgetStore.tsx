import { useDispatch } from "react-redux";
import { useProducts } from "../hooks/useProducts";
import { useTitle } from "../hooks/useTitle";
import type Product from "../models/Product";
import {addToCart as createAddToCartAction} from '../store/gadgetsReducer';
import Toast, { type ToastHandle } from "../components/Toast";
import { useRef } from "react";

const url = "/secure_products";

function GadgetStore(){

    useTitle("Gadgets");
    const {products} = useProducts(url);
    const dispatch = useDispatch();
    const toastRef = useRef<ToastHandle>(null);
   
    function addToCart(product: Product){

        const action = createAddToCartAction({product, quantity: 1});
        dispatch(action);
        console.log("toastRef", toastRef.current);
        toastRef.current?.show({title: "Success", text: `The product: ${product.name} added to the cart`})

    }

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
            <Toast ref={toastRef}/>
        </div>
    )
}

export default GadgetStore;