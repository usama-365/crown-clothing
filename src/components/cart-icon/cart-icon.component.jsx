import { ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import './cart-icon.styles.scss';

export const CartIcon = function () {
    return (
        <div className="cart">
            <ShoppingIcon className="cart__icon" />
            <span className="cart__count">0</span>
        </div>
    );
};