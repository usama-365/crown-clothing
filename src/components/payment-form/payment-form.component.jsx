import React, { useState } from "react";
import {
	CardElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../button/button.component";
import "./payment-form.styles.scss";

export const PaymentForm = function ({ items }) {
	const stripe = useStripe();
	const elements = useElements();
	const [ message, setMessage ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);
		// Get the client secret
		const { clientSecret } = await fetch("/.netlify/functions/create-payment-intent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				items,
			}),
		}).then(res => res.json());
		// Confirm card payment
		const {
			paymentIntent,
			error,
		} = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
			},
		});
		// Incase of errors
		if (error) {
			if (error.type === "card_error" || error.type === "validation_error") {
				setMessage(error.message);
			} else {
				setMessage("An unexpected error occurred.");
			}
		} else {
			switch (paymentIntent.status) {
			case "succeeded":
				setMessage("Payment succeeded!");
				break;
			case "processing":
				setMessage("Your payment is processing.");
				break;
			case "requires_payment_method":
				setMessage("Your payment was not successful, please try again.");
				break;
			default:
				setMessage("Something went wrong.");
				break;
			}
		}
		setIsLoading(false);
	};

	return (
		<form className="payment-form" onSubmit={handleSubmit}>
			<h2 className={"payment-form__heading"}>Pay Here!</h2>
			<CardElement/>
			<div className={"payment-form__button-container"}>
				<Button buttonType={"inverted"} buttonAttributes={{
					disabled: isLoading || !stripe || !elements,
					id: "submit",
					className: "payment-form__button",
				}}>
		        <span id="button-text">
		          {isLoading ? "Processing..." : "Pay now"}
		        </span>
				</Button>
			</div>
			{message && <div id="payment-message">{message}</div>}
		</form>
	);
};