import "./checkout-item.styles.scss";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

export const CheckoutItem = function ({product}) {
    const {name, quantity, imageUrl, price} = product;
    const {addProductToCart, removeProductFromCart, clearProductFromCart} = useContext(CartContext);

    return (
        <div className="checkout-item">
            <div className="checkout-item__image-container">
                <img className="checkout-item__image" src={`${imageUrl}`} alt={`${name}`}/>
            </div>
            <p className="checkout-item__name">{name}</p>
            <div className="checkout-item__count">
                <p className="checkout-item__arrow checkout-item__arrow--decrement" onClick={() => removeProductFromCart(product)}>&lt;</p>
                <p className="checkout-item__quantity">{quantity}</p>
                <p className="checkout-item__arrow checkout-item__arrow--increment" onClick={() => addProductToCart(product)}>&gt;</p>
            </div>
            <p className="checkout-item__price">{price}</p>
            <p className="checkout-item__remove" onClick={() => clearProductFromCart(product)}>&#10005;</p>
        </div>
    );
}