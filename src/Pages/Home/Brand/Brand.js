import React from 'react';
import { useQuery } from '@tanstack/react-query';
import BrandCard from './BrandCard';

const Brand = () => {
    const { data: brands = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/brand');
            const data = await res.json();
            return data;
        }
    })
    return (
        <div className='bg-green-100 rounded-lg py-5 mb-5'>
            <h1 className='text-4xl text-center  font-bold text-blue-600'>Mobile Phone Brand</h1>

            <div className='grid sm: px-2 lg:grid-cols-3 gap-3 my-10'>
            {
                brands?.length && brands?.map(brand =><BrandCard
                key={brand._id}
                brand={brand}
                ></BrandCard>)
            }
            </div>
            
        </div>
    );
};

export default Brand;