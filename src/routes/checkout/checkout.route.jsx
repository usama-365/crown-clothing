import "./checkout.styles.scss";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CheckoutItem} from "../../components/checkout-item/checkout-item.component";

export const Checkout = function () {
    const {cartItems} = useContext(CartContext);
    return (
        <div className="checkout">
            <div className="checkout__headers">
                <p className="checkout__header">Product</p>
                <p className="checkout__header">Description</p>
                <p className="checkout__header">Quantity</p>
                <p className="checkout__header">Price</p>
                <p className="checkout__header">Remove</p>
            </div>
            <div className="checkout__items">
                {cartItems.map((product) => <CheckoutItem key={product.id} product={product}/>)}
            </div>
            <p className="checkout__total">Total: 0</p>
        </div>
    );
}