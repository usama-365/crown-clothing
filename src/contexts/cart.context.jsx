import {createContext, useState} from "react";

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
    }
});

export const CartContextProvider = function ({children}) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addProductToCart = (product) => {
        setCartItems(createUpdatedCart(cartItems, product));
    }

    const value = {isCartOpen, setIsCartOpen, addProductToCart, cartItems}
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};