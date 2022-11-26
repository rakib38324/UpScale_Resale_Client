import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle } from "react-icons/fa";
import noCard from './nocart.png'

const Products = () => {

    const products = useLoaderData();
    // console.log(products)

    const { data: brands = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/brand');
            const data = await res.json();
            return data;
        }
    })





    return (
        <div className='grid grid-cols-1  lg:grid-cols-12 mt-1 mb-3 bg-gradient-to-r from-purple-300 to-blue-400 rounded-3xl'>

            <div className='lg:col-span-2 border'>
                <h1 className='text-2xl text-center font-semibold py-6'>Brand Name</h1>
                <div>
                {
                    brands?.length && brands.map(brand => <>
                        <Link to={`/products/${brand._id}`}><p className='text-center p-5 btn-primary bg-gradient-to-r from-primary to-secondary rounded-md m-3 font-semibold text-white '>{brand.name}</p></Link>
                    </>)
                }
                </div>
            </div>

            <div className='col-span-10'>
                <h2 className='text-center font-semibold sm:text-2xl lg:text-4xl  py-5'>Choose Your Products Here</h2>
                <div  className='grid  lg:grid-cols-3 gap-3 p-4'>
                    {
                        products?.length === 0 ? 
                        <>
                        <p className='lg:col-span-3 bg-gradient-to-r from-green-100 to-blue-300 rounded-2xl'>
                            <img className='mx-auto' src={noCard} alt="" />
                        </p>
                        </>
                        :
                        <>
                        {
                        products?.length && products.map(product => <>

                          
                                <div className="card bg-base-100 shadow-xl">
                                    <figure><img className='w-full h-64' src={product.image} alt="" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl">{product.ProductName}</h2>
                                        <p className=' text-xl flex'>Seller Name: {product.SellerName}
                                          {
                                            product.seller_status === 'verified'  ?
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
                                        
                                        <p className=' text-xl'>Year of uses: {product.Years_of_use}</p>

                                        

                                        <p className=' text-xl'>Posting time: {product.Addingtime}   {product.AddingDate} </p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary">Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            

                        </>)
                    }
                        </>
                    }
                    
                </div>

            </div>


        </div>
    );
};

export default Products;