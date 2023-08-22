import "./checkout-item.styles.scss";
import {addProductToCart, clearProductFromCart, removeProductFromCart} from "../../store/cart/cart.actions";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selectors";
import {CartItemType} from "../../store/cart/cart.types";

export type CheckoutItemPropsType = {
    product: CartItemType
}

export const CheckoutItem = function ({product}: CheckoutItemPropsType) {
    const {name, quantity, imageUrl, price} = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    return (
        <div className="checkout-item">
            <div className="checkout-item__image-container">
                <img className="checkout-item__image" src={`${imageUrl}`} alt={`${name}`}/>
            </div>
            <p className="checkout-item__name">{name}</p>
            <div className="checkout-item__count">
                <p className="checkout-item__arrow checkout-item__arrow--decrement"
                   onClick={() => dispatch(removeProductFromCart(cartItems, product))}>&lt;</p>
                <p className="checkout-item__quantity">{quantity}</p>
                <p className="checkout-item__arrow checkout-item__arrow--increment"
                   onClick={() => dispatch(addProductToCart(cartItems, product))}>&gt;</p>
            </div>
            <p className="checkout-item__price">{price}</p>
            <p className="checkout-item__remove"
               onClick={() => dispatch(clearProductFromCart(cartItems, product))}>&#10005;</p>
        </div>
    );
}