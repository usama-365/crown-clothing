import {createContext, useEffect, useState} from "react";

const createUpdatedCartByAdding = function (cart, productToAdd) {
    const matchedItem = cart.find(cartItem => cartItem.id === productToAdd.id);
    if (matchedItem)
        return cart.map(item => (item.id === productToAdd.id) ? {...item, quantity: item.quantity + 1} : item
        );
    else
        return [...cart, {...productToAdd, quantity: 1}];
};

const createUpdatedCartByRemoving = function (cart, productToRemove) {
    const matchedItem = cart.find(cartItem => cartItem.id === productToRemove.id);
    if (matchedItem) {
        if (matchedItem.quantity > 1)
            return cart.map(item => (item.id === productToRemove.id) ? {...item, quantity: item.quantity - 1} : item);
        else
            return cart.filter(item => item.id !== productToRemove.id);
    } else
        return cart;
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    cartItems: [],
    addProductToCart: () => {
    },
    removeProductFromCart: () => {
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
        setCartItems(createUpdatedCartByAdding(cartItems, product));
    }

    const removeProductFromCart = (product) => {
        setCartItems(createUpdatedCartByRemoving(cartItems, product));
    }

    const value = {isCartOpen, setIsCartOpen, addProductToCart, removeProductFromCart, cartItems, cartCount};
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};