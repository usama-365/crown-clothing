import "./checkout.styles.scss";
import {CheckoutItem} from "../../components/checkout-item/checkout-item.component";
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal,} from "../../store/cart/cart.selectors";
import {Elements} from "@stripe/react-stripe-js";
import {stripePromise} from "../../services/stripe/stripe.service";
import {PaymentForm} from "../../components/payment-form/payment-form.component";
import {StripeElementsOptions} from "@stripe/stripe-js";

export const Checkout = function () {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    const options: StripeElementsOptions = {
        appearance: {
            theme: "stripe",
        },
    };

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
                {cartItems.map((product) => <CheckoutItem key={product.id}
                                                          product={product}/>)}
            </div>
            <p className="checkout__total">Total: ${cartTotal}</p>
            <Elements options={options} stripe={stripePromise}>
                <PaymentForm items={cartItems}/>
            </Elements>
        </div>
    );
};