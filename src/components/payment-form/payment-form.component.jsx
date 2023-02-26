import {Button, BUTTON_TYPES_CLASS} from "../button/button.component";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import "./payment-form.styles.scss";

export const PaymentForm = function () {
    const stripe = useStripe();
    const elements = useElements();
    const onPaymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {

        }
    }
    return (
        <div className="payment-form">
            <form action="" className="payment-form__form">
                <h2>Credit Card Payment</h2>
                <CardElement/>
                <Button buttonType={BUTTON_TYPES_CLASS.inverted}>Pay Now</Button>
            </form>
        </div>
    );
};