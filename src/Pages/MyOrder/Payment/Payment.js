import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

// console.log(process.env.REACT_APP_STRIPE_PK)

const Payment = () => {
    console.log('Promise: ',stripePromise)

    const booking = useLoaderData();

    const navigation = useNavigation();

    // console.log(booking)

    if(navigation.state === 'loading'){
        return <Loading></Loading>
    }
    return (
        <div className='my-10 bg-gradient-to-r from-green-300 to-blue-400 rounded-3xl py-10'>
            <h1 className='text-3xl text-center py-3'>Payment for <span className='' >{booking.ProductName}</span></h1>
            <h1 className='text-3xl text-center'>Price:  {booking.ProductPrice}</h1>
           

            <div className='w-1/3 mx-auto bg-base-200 my-5 p-6 rounded-lg'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                     booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;