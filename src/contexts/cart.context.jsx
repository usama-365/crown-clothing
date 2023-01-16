import {createContext, useReducer} from "react";
import {createAction} from "../reducer/reducer";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    cartItems: [],
    addProductToCart: () => {
    },
    removeProductFromCart: () => {
    },
    clearProductFromCart: () => {
    },
    cartTotal: 0,
    cartCount: 0
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}

const cartReducer = function (state, action) {
    const {type, payload} = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unknown action type in cart reducer: ${type}`);
    }
}

export const CartContextProvider = function ({children}) {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {isCartOpen, cartItems, cartCount, cartTotal} = state;

    const updateCartItemsReducer = newCartItems => {
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}));
    }

    const setIsCartOpen = bool => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const addProductToCart = (product) => {
        const newCartItems = createUpdateCartByIncrementingProduct(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const removeProductFromCart = (product) => {
        const newCartItems = createUpdatedCartByDecrementingProduct(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const clearProductFromCart = (product) => {
        const newCartItems = createUpdatedCartByRemovingProduct(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addProductToCart,
        removeProductFromCart,
        clearProductFromCart,
        cartItems,
        cartCount,
        cartTotal
    };
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};