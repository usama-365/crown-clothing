import {CartItemType} from "./cart.types";
import {AnyAction} from "redux";
import {setCartItems, setIsCartOpen} from "./cart.actions";

export type CartStateType = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItemType[];
};

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

export const cartReducer = function (state = CART_INITIAL_STATE, action: AnyAction): CartStateType {
    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        };
    } else if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload
        };
    }
    return state;
}