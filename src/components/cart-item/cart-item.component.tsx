import "./cart-item.styles.scss";
import {CartItemType} from "../../store/cart/cart.types";

export type CartItemPropsType = {
    cartItem: CartItemType
}

export const CartItem = function ({cartItem}: CartItemPropsType) {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <div className="cart-item">
            <img className="cart-item__image" src={imageUrl} alt={`${name}`}/>
            <div className="cart-item__details">
                <p className="cart-item__name">{name}</p>
                <p className="cart-item__price">{quantity} x ${price}</p>
            </div>
        </div>
    );
};