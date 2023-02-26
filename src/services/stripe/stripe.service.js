import {loadStripe} from "@stripe/stripe-js";

const publishableAPIKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
export const stripePromise = loadStripe(publishableAPIKey);