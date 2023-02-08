import {createAction} from "../utils";
import {CART_ACTION_TYPES} from "./cart.types";

const createUpdateCartByIncrementingProduct = function (cart, productToIncrement) {
    const matchedItem = cart.find(cartItem => cartItem.id === productToIncrement.id);
    if (matchedItem)
        return cart.map(item => (item.id === productToIncrement.id) ? {...item, quantity: item.quantity + 1} : item
        );
    else
        return [...cart, {...productToIncrement, quantity: 1}];
};

const createUpdatedCartByDecrementingProduct = function (cart, productToDecrement) {
    const matchedItem = cart.find(cartItem => cartItem.id === productToDecrement.id);
    if (matchedItem) {
        if (matchedItem.quantity > 1)
            return cart.map(item => (item.id === productToDecrement.id) ? {
                ...item,
                quantity: item.quantity - 1
            } : item);
        else
            return cart.filter(item => item.id !== productToDecrement.id);
    } else
        return cart;
};

const createUpdatedCartByRemovingProduct = function (cart, productToRemove) {
    return cart.filter(cartItem => cartItem.id !== productToRemove.id);
}

export const setIsCartOpen = boolean => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addProductToCart = (cartItems, product) => {
    const newCartItems = createUpdateCartByIncrementingProduct(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeProductFromCart = (cartItems, product) => {
    const newCartItems = createUpdatedCartByDecrementingProduct(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearProductFromCart = (cartItems, product) => {
    const newCartItems = createUpdatedCartByRemovingProduct(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}