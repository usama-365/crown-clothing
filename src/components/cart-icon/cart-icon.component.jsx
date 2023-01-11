import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

export const CartIcon = function () {
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);
    return (
        <div className="cart" onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingIcon className="cart__icon"/>
            <span className="cart__count">0</span>
        </div>
    );
};