import React, { useContext } from 'react';
import Loading from '../Shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthProvider';
import { Link } from 'react-router-dom';
import noCard from './nocart.png'

const MyOrder = () => {

    const { user } = useContext(AuthContext)


    const { data: myorders = [], } = useQuery({
        queryKey: ['order'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myorder/${user.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })



    return (
        <div>
            {  myorders?.length === 0 ?
                <>
                <p className='lg:col-span-3 bg-gradient-to-r from-green-100 to-blue-300 rounded-2xl'>
                    <img className='mx-auto' src={noCard} alt="" />
                </p>
            </>
                :
                <>
                    <div className='bg-gradient-to-r from-green-300 to-blue-400 py-10 rounded-lg mb-5'>
                        <h1 className='text-4xl text-center font-bold'>Which Category Product do you want to Select?</h1>
                        <div className='grid lg:grid-cols-3 my-20 gap-3'>
                            {
                                myorders?.length && myorders?.map(myorder => <>

                                    <div className="card card-compact m-2 bg-green-100 shadow-xl">
                                        <figure><img className='w-full h-60' src={myorder.image} alt="" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">Name: {myorder.ProductName}</h2>
                                            <p className='text-xl'>Price: <span className='text-green-600 font-semibold'>{myorder.ProductPrice}</span></p>
                                            <p className='text-xl'>Seller Email: {myorder.seller_email}</p>
                                            <p className='text-xl'>Phone Condition: <span className='text-green-600 font-semibold'>{myorder.phone_condition}</span></p>
                                            <p className='text-xl'>Seller Location: {myorder.Seller_Location}</p>
                                            <p className='text-xl'>Uses Time: {myorder.use_of_years}</p>
                                            <div className="card-actions justify-center">
                                                <Link to={`/category/${myorder._id}`}><button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Make Payment</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                )
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default MyOrder;