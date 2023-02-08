import "./cart-dropdown.styles.scss";
import {Button} from "../button/button.component";
import {CartItem} from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selectors";

export const CartDropdown = function () {
    const cartItems = useSelector(selectCartItems);
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