import "./cart-dropdown.styles.scss";
import {Button} from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartItem} from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";

export const CartDropdown = function () {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => navigate("checkout");

    return (
        <div className="cart-dropdown">
            <div className="cart-dropdown__items">
                {cartItems?.length ? cartItems.map(item => (
                    <CartItem key={item.id} cartItem={item}/>
                )) : <span style={{margin: "auto"}}>Nothing in cart</span>}
            </div>
            <Button buttonAttributes={{onClick: goToCheckoutHandler}}>Checkout</Button>
        </div>
    );
};