import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectIsCartOpen} from "../../store/cart/cart.selectors";
import {setIsCartOpen} from "../../store/cart/cart.actions";

export const CartIcon = function () {
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();

    const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <div className="cart" onClick={toggleCart}>
            <ShoppingIcon className="cart__icon"/>
            <span className="cart__count">{cartCount}</span>
        </div>
    );
};