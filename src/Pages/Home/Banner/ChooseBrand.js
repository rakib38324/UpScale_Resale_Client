import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

const ChooseBrand = () => {
   
    
    
    const { data: brands = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/brand');
            const data = await res.json();
            return data;
        }
    })
    console.log(brands.length)
    return (
        <div className='bg-gradient-to-r from-green-300 to-blue-400 py-10 rounded-lg mb-5 mt-1'>
            <h1 className='text-4xl text-center font-bold'>Which category product do you want to select?</h1>
            <div className='grid lg:grid-cols-3 my-20 gap-3'>
            {
                brands?.length && brands?.map(brand => <>
                    
                    <div className="card card-compact m-2 bg-green-100 shadow-xl">
                        <figure><img className='w-full h-[150px]' src={brand.img} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{brand.name}</h2>
                            <p>{brand.details}</p>
                            <div className="card-actions justify-center">
                                <Link to={`/category/${brand._id}`}><button  className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Choose</button></Link>
                            </div>
                        </div>
                    </div>
                </>                   
                )
            }   
        </div>
        </div>
    );
};

export default ChooseBrand;