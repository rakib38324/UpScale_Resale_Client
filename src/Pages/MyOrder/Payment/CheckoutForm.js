import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {

    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const [clientSecret, setClientSecret] = useState("");


    const stripe = useStripe();
    const elements = useElements();

    const { ProductPrice, buyername, buyeremail, _id, productMian_ID } = booking;


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://up-scale-re-sale-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ ProductPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [ProductPrice]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error.message)
        }
        else {
            setCardError('')
            // console.log('[PaymentMethod]', paymentMethod);
        }

        setSuccess('');
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyername,
                        email: buyeremail,

                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {


            const payment = {
                ProductPrice,
                transactionId: paymentIntent.id,
                buyeremail,
                bookingId: _id,
                productMain_ID: productMian_ID,


            }

            fetch('https://up-scale-re-sale-server.vercel.app/payment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess("Congratulation! Your Payment Completed");
                        setTransactionId(paymentIntent.id);


                        fetch(`https://up-scale-re-sale-server.vercel.app/payment/completed/${productMian_ID}`, {
                            method: 'PUT',
                            headers: {
                                authorization: `bearer ${localStorage.getItem('accessToken')}`
                            }
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.modifiedCount > 0) {
                                    // toast.success(`Make Verify Successfully.`);
                                    // refetch();
                                }
                            })



                    }

                })

        }
        setProcessing(false)

        // console.log(paymentIntent);

    }

    return (
        <>
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
                <button className='btn btn-primary mt-6 btn-sm'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>

            <p className='text-red-600'>{cardError}</p>

            {
                success && <div>
                    <p className=' text-2xl text-green-600'>{success} </p>
                    <p className=' text-2xl text-green-600'>Your Transaction Id: <span className='font-bold'>{transactionId}</span> </p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;