import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

    return (
        <>
            <Helmet>
                <title>Payment | DigitalHub</title>
            </Helmet>
            <div className="my-10 px-9 py-5 bg-base-200">
                <h3 className="text-3xl mt-7 mb-24 text-center">Card Payment</h3>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </>
    );
};

export default Payment;