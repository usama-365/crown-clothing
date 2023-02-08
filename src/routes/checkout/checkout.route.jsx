import "./checkout.styles.scss";
import {CheckoutItem} from "../../components/checkout-item/checkout-item.component";
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selectors";

export const Checkout = function () {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    return (
        <div className="checkout">
            <div className="checkout__headers">
                <p className="checkout__header">Product</p>
                <p className="checkout__header">Description</p>
                <p className="checkout__header">Quantity</p>
                <p className="checkout__header">Price</p>
                <p className="checkout__header">Remove</p>
            </div>
            <div className="checkout__items">
                {cartItems.map((product) => <CheckoutItem key={product.id} product={product}/>)}
            </div>
            <p className="checkout__total">Total: ${cartTotal}</p>
        </div>
    );
}