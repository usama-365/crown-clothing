import './cart-dropdown.styles.scss';
import {Button} from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartItem} from "../cart-item/cart-item.component";

export const CartDropdown = function () {
    const {cartItems} = useContext(CartContext);
    return (
        <div className="cart-dropdown">
            <div className="cart-dropdown__items">
                {cartItems.map(item => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button>Checkout</Button>
        </div>
    );
};