import { describe, expect, it } from "vitest";
import Product from "../models/Product";
import { addToCart, gadgetsReducer, removeCartItem } from "../store/gadgetsReducer";

describe("gadgetsReducer", () => {
    it("should return the initial state", () => {
        const state = gadgetsReducer(undefined, { type: "unknown" });

        expect(state).toEqual({ cart: [] });
    });

    it("should add an item to the cart", () => {
        const product = new Product(1, "Phone", 1000, "Smart phone");
        const action = addToCart({ product, quantity: 2 });

        const state = gadgetsReducer({ cart: [] }, action);

        expect(state.cart).toHaveLength(1);
        expect(state.cart[0]).toEqual({ product, quantity: 2 });
    });

    it("should remove an existing cart item by product id", () => {
        const phone = new Product(1, "Phone", 1000, "Smart phone");
        const laptop = new Product(2, "Laptop", 2000, "Work laptop");
        const initialState = {
            cart: [
                { product: phone, quantity: 1 },
                { product: laptop, quantity: 1 },
            ],
        };

        const state = gadgetsReducer(initialState, removeCartItem(1));

        expect(state.cart).toHaveLength(1);
        expect(state.cart[0].product.id).toBe(2);
    });

    it("should leave state unchanged when removing a missing item", () => {
        const phone = new Product(1, "Phone", 1000, "Smart phone");
        const initialState = {
            cart: [{ product: phone, quantity: 1 }],
        };

        const state = gadgetsReducer(initialState, removeCartItem(99));

        expect(state).toEqual(initialState);
    });
});
