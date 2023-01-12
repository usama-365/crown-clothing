import {createContext, useEffect, useState} from "react";

const createUpdatedCart = function (cart, productToAdd) {
    const matchedItem = cart.find(cartItem => cartItem.id === productToAdd.id);
    if (matchedItem)
        return cart.map(item => (item.id === productToAdd.id) ?
            {...item, quantity: item.quantity + 1} :
            item
        );
    else
        return [...cart, {...productToAdd, quantity: 1}];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    cartItems: [],
    addProductToCart: () => {
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
        setCartItems(createUpdatedCart(cartItems, product));
    }

    const value = {isCartOpen, setIsCartOpen, addProductToCart, cartItems, cartCount};
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};