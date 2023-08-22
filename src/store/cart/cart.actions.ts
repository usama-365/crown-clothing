import {ActionWithPayload, createAction, withMatcher} from "../utils";
import {CART_ACTION_TYPES, CartItemType} from "./cart.types";
import {CategoryItemType} from "../categories/categories.types";

const createUpdateCartByIncrementingProduct = function (cart: CartItemType[], productToIncrement: CategoryItemType) {
    const matchedItem = cart.find(cartItem => cartItem.id === productToIncrement.id);
    if (matchedItem)
        return cart.map(item => (item.id === productToIncrement.id) ? {...item, quantity: item.quantity + 1} : item
        );
    else
        return [...cart, {...productToIncrement, quantity: 1}];
};

const createUpdatedCartByDecrementingProduct = function (cart: CartItemType[], productToDecrement: CartItemType) {
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

const createUpdatedCartByRemovingProduct = function (cart: CartItemType[], productToRemove: CartItemType) {
    return cart.filter(cartItem => cartItem.id !== productToRemove.id);
}

// Types
export type SetIsCartOpenType = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItemsType = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItemType[]>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpenType => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));
export const setCartItems = withMatcher((cartItems: CartItemType[]): SetCartItemsType => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addProductToCart = (cartItems: CartItemType[], product: CategoryItemType) => {
    const newCartItems = createUpdateCartByIncrementingProduct(cartItems, product);
    return setCartItems(newCartItems);
}

export const removeProductFromCart = (cartItems: CartItemType[], product: CartItemType) => {
    const newCartItems = createUpdatedCartByDecrementingProduct(cartItems, product);
    return setCartItems(newCartItems);
}

export const clearProductFromCart = (cartItems: CartItemType[], product: CartItemType) => {
    const newCartItems = createUpdatedCartByRemovingProduct(cartItems, product);
    return setCartItems(newCartItems);
}