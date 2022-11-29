import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import PrivateRoutes from '../../../Routes/PrivateRoutes/PrivateRouts';
import Modal from '../../Modal/Modal';

const Advertisement = () => {

    const [products, setProducts] = useState('');
    const [booking, setBooking] = useState(null);

    console.log(booking)
    console.log(products)

    useEffect(() => {
        fetch('http://localhost:5000/advertise?limit=1')
            .then(res => res.json())
            .then(data => {

                setProducts(data)
            })
    },[])

    const handledata = data => {

    }

    const closeModal = () => {
        setBooking(null);
    }

    return (
        <div>
            {
            products?.length === 0 ?
            <>
            </>
            :
            <>
                <div>
                    {
                        products?.length && products?.map(product => <div>
                            <div className="card h-[600px] grid lg:grid-cols-2 bg-gradient-to-r from-blue-100 to-green-300 shadow-xl mt-2 mb-4 border-spacing-20">
                                <figure  ><img className='w-full rounded-3xl' src={product.image} alt="" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl">{product.ProductName}</h2>
                                    <p className=' text-xl flex font-semibold'>Seller Name: {product.SellerName}
                                        {
                                            product.seller_status === 'verified' ?
                                                <>

                                                    <p className='pl-2 pt-1 text-blue-600'><FaCheckCircle></FaCheckCircle></p></>
                                                :
                                                <>

                                                </>
                                        }
                                    </p>
                                    <p className=' text-xl'>Location: {product.Location}</p>
                                    <p className=' text-xl'>Original Price: <span className='text-red-600 font-semibold'>{product.Original_price}</span></p>
                                    <p className=' text-xl'>Resale Price: <span className='text-green-600 font-semibold'>{product.Resale_price}</span></p>
                                    <p className=' text-xl'>Phone Condition: <span className='text-blue-600 font-semibold'>{product.Condition}</span></p>

                                    <p className=' text-xl'>Year of uses: {product.Years_of_use}</p>



                                    <p className=' text-xl'>Posting time: {product.Addingtime}   {product.AddingDate} </p>
                                    <div className="card-actions justify-end">


                                        {
                                            product.status === 'Sold' ?
                                                <>
                                                    <label className="btn bg-red-200 text-black hover:bg-red-400">Sold</label>
                                                </>
                                                :
                                                <>
                                                    <label onClick={() => setBooking(product)} htmlFor="my-modal" className="btn btn-primary text-white">ADD TO CARD</label>
                                                </>



                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    }

                    {
                        booking &&
                        
                           <PrivateRoutes>
                             <Modal
                                title='Are you want to Booking?'
                                message={`Are you want to Booked ${booking?.name}?`}
                                key={booking?._id}
                                closeModal={closeModal}
                                modalData={booking}
                                successButtonName="Booked"


                            ></Modal>
                           </PrivateRoutes>
                        
                        


                    }



                </div>
            </>
        }
        </div>
    );
};

export default Advertisement;