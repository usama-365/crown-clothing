import "./cart-item.styles.scss";

export const CartItem = function ({cartItem}) {
    const {name, quantity} = cartItem;
    return (
        <div>
            <h2>{name}</h2>
            <span>{quantity}</span>
        </div>
    );
};