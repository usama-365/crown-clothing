import {createContext, useEffect, useState} from "react";

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
    cartCount: 0
});

export const CartContextProvider = function ({children}) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCount);
    }, [cartItems]);

    const addProductToCart = (product) => {
        setCartItems(createUpdateCartByIncrementingProduct(cartItems, product));
    }

    const removeProductFromCart = (product) => {
        setCartItems(createUpdatedCartByDecrementingProduct(cartItems, product));
    }

    const clearProductFromCart = (product) => {
        setCartItems(createUpdatedCartByRemovingProduct(cartItems, product));
    }

    const value = {
        isCartOpen, setIsCartOpen, addProductToCart, removeProductFromCart, clearProductFromCart, cartItems, cartCount
    };
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};