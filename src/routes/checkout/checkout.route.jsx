import "./checkout.styles.scss";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

export const Checkout = function () {
    const {cartItems, addProductToCart, removeProductFromCart} = useContext(CartContext);
    return (
        <div>
            <h1>I am the checkout page</h1>
            <div>
                {cartItems.map((product) => {
                    const {id, name, quantity} = product;
                    return (
                        <div key={id}>
                            <h2>{name}</h2>
                            <span>{quantity}</span>
                            <span onClick={() => removeProductFromCart(product)}>decrement</span>
                            <span onClick={() => addProductToCart(product)}>increment</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}