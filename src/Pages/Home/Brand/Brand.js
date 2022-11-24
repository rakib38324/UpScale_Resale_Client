import React from 'react';
import { useQuery } from '@tanstack/react-query';
import BrandCard from './BrandCard';

const Brand = () => {
    const { data: brands = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/brand');
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <h1 className='text-4xl text-center mt-20 font-bold text-blue-600'>Mobile Phone Brand</h1>

            <div className='grid sm:grid-cols-1 lg:grid-cols-3 gap-3 my-10'>
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