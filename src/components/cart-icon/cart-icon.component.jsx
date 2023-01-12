import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

export const CartIcon = function () {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <div className="cart" onClick={toggleCart}>
            <ShoppingIcon className="cart__icon"/>
            <span className="cart__count">{cartCount}</span>
        </div>
    );
};