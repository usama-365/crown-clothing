require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const calculateAmount = items => items.reduce(
	(totalAmount, {
		quantity,
		price,
	}) => totalAmount + (quantity * price * 100),
	0,
);

exports.handler = async function (event) {
	const { items } = JSON.parse(event.body);
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateAmount(items),
		currency: "usd",
		payment_method_types: [ "card" ],
	});
	return {
		statusCode: 200,
		body: JSON.stringify({
			clientSecret: paymentIntent.client_secret,
		}),
		headers: {
			"Content-Type": "application/json"
		}
	};
};