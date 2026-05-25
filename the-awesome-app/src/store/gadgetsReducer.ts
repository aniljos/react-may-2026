import type { CartItem } from "../models/CartItem";

export type GadgetState = {
    cart: CartItem[]
}

const initialState: GadgetState = {
    cart: []
}

type GadgetsAction = {
    type: string;
    payload?: CartItem;
    id?: number
}

// addToCart: {type: addtocart, payload: {product, quantity}}
// removeCartItem: {type: removecartitem, id: product.id}
// clearCart: {type: clearcart}
export const gadgetsReducer = (state = initialState, action: GadgetsAction) => {

    if(action.type === "addtocart" && action.payload){

        //state.cart.push(action.payload);
        const cart = [...state.cart];
        cart.push(action.payload);
        return {
            ...state,
            cart: cart
        }
    }

    return state;
}