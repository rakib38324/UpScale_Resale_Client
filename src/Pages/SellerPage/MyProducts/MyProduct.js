import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';

const MyProduct = () => {

    const { user } = useContext(AuthContext)

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['Products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myproducts/${user.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const HandleMakeAvailable = id => {
        fetch(`http://localhost:5000/product/status/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`Make Verify Successfully.`);
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (

        <div>
            <h1 className='my-8 text-4xl font-bold text-center'>All Products</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-12'>

                {
                    products?.length && products?.map((product) =>

                        <div>

                            <div>
                                <div className="card bg-base-100 shadow-xl">
                                    <figure><img className='w-full' src={product.image} alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{product.ProductName}</h2>
                                        <p>Brand: {product.Brand}</p>
                                        <p>Upload Date: {product.AddingDate}</p>
                                        {
                                                product.status === 'Sold' && <p className='font-semibold text-red-600'>{product.status}</p>
                                        }
                                        {
                                                product.status === 'Available' && <p className='font-semibold text-green-600'>{product.status}</p>
                                        }
                                        
                                        
                                        <div className="card-actions flex">
                                            {
                                                product.status === 'Sold' && <>
                                                    <button onClick={() => HandleMakeAvailable(product._id)} className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white">Make Available</button>
                                                </>
                                            }
                                            {
                                                product.status === 'Available' &&
                                                <><button className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white">Make Advertised</button></>
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                     

                    )
                }

            </div>
        </div>


    );
};

export default MyProduct;