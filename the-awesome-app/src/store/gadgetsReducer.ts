import type { CartItem } from "../models/CartItem";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export type GadgetState = {
    cart: CartItem[]
}

const initialState: GadgetState = {
    cart: []
}

// type GadgetsAction = {
//     type: string;
//     payload?: CartItem;
//     id?: number
// }

// addToCart: {type: addtocart, payload: {product, quantity}}
// removeCartItem: {type: removecartitem, id: product.id}
// clearCart: {type: clearcart}
// export const gadgetsReducer = (state = initialState, action: GadgetsAction) => {

//     if(action.type === "addtocart" && action.payload){

//         //state.cart.push(action.payload);
//         const cart = [...state.cart];
//         cart.push(action.payload);
//         return {
//             ...state,
//             cart: cart
//         }
//     }

//     return state;
// }

const slice = createSlice({
    name: "gadgetSlice",
    initialState, 
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {

            state.cart.push(action.payload);
        },
        removeCartItem: (state, action: PayloadAction<number>) => {

            const index = state.cart.findIndex(item => item.product.id === action.payload);
            if(index !== -1){
                state.cart.splice(index, 1);
            }
        }
    }
})
//action creators
export const {addToCart, removeCartItem} = slice.actions;
export const gadgetsReducer = slice.reducer;

