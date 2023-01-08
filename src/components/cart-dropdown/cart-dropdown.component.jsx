import './cart-dropdown.styles.scss';
import {Button} from "../button/button.component";

export const CartDropdown = function () {
    return (
        <div className="cart-dropdown">
            <div className="cart-dropdown__items">

            </div>
            <Button>Checkout</Button>
        </div>
    );
};