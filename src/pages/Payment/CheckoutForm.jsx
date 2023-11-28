import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: singleUser } = useQuery({
        queryKey: ['singleUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/users/${user.email}`);
            return res.data?.packagePrice;
        }
    })

    const packagePriceInt = parseInt(singleUser);

    useEffect(() => {
        if (packagePriceInt > 0) {
            axiosSecure.post('/api/v1/make-payment-intent', { price: packagePriceInt })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, packagePriceInt])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payment error', error);
            setError(error.message);
        }
        else {
            console.log('Payment method', paymentMethod);
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('Confirm error');
        }
        else {
            console.log('Payment intent', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction ID', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // Payment saved in the database
                const payment = {
                    email: user.email,
                    price: packagePriceInt,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/api/v1/payments', payment);
                console.log('Payment saved', res.data);

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/dashboard/admin-home');
                }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="flex justify-center mt-32 mb-9">
                <Button variant="contained" size="small" color="error" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </Button>
            </div>
            <p className="text-red-500">{error}</p>
            {transactionId && <p className="text-green-500"> Your transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;