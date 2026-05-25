import { useDispatch, useSelector } from "react-redux"
import type { AppState } from "../store/store"
import type { CartItem } from "../models/CartItem";
import {removeCartItem as createRemoveCartItemAction} from '../store/gadgetsReducer';
function ViewCart(){

    const cart =  useSelector((state: AppState) => state.gadgets.cart);
    const dispatch = useDispatch();

    function remove(item : CartItem){

        if(item.product.id)
            dispatch(createRemoveCartItemAction(item.product.id));
    }

    return (
        <div>
            <h3>View Cart</h3>
            {cart.length === 0 ? <div className="alert alert-info">No items in the cart</div> : null}    

            <div className="row row-cols-1 row-cols-md-2 g-4">
                {cart.map((item, index) => {
                   

                    return (
                        <div className="col" key={index}>
                            <div className="card bg-light mb-3 border-success">
                                <p className="card-header">{item.product.name}</p>
                                <div className="card-body">
                                    <p className="card-text">{item.product.description}</p>
                                    <p className="card-text">Quantity: {item.quantity}</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-success" onClick={() => { remove(item) }}>Remove</button>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ViewCart