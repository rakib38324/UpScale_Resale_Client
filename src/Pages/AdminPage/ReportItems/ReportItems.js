import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import noCard from './nocart.png'
import { FaCheckCircle } from "react-icons/fa";


const ReportItems = () => {


    const { data: reportItems = [], refetch, isLoading } = useQuery
        ({
            queryKey: ['report'],
            queryFn: async () => {
                const res = await fetch('https://up-scale-re-sale-server.vercel.app/reportItems');
                const data = await res.json();
                return data;
            }
        })


    const HandleDeleteUser = id => {
        fetch(`https://up-scale-re-sale-server.vercel.app/product/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`Delete Successfully.`);
                    refetch();
                }
            })
    }



    return (
        <div>
            {
                reportItems.length === 0 ?
                    <>
                        <p className='lg:col-span-3 bg-gradient-to-r from-green-100 to-blue-300 rounded-2xl'>
                            <h1 className='tetx-3xl text-center font-medium py-5 mt-1'>No Report Items Found</h1>
                            <img className='mx-auto' src={noCard} alt="" />
                        </p>
                    </>
                    :
                    <>
                        <div >
                            <h1 className='text-3xl text-center mt-1 py-10'> All Users</h1>
                            <div className="overflow-x-auto mb-20 ">
                                <table className="table w-full bg-gradient-to-r from-green-300 to-blue-400 rounded-2xl">
                                    <thead>
                                        <tr className='bg-gradient-to-r from-green-300 to-blue-400 rounded-2xl'>
                                            <th></th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Seller Name</th>
                                            <th>Seller Email</th>
                                            <th>Seller Location</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-gradient-to-r from-green-300 to-blue-400 rounded-2xl'>
                                        {
                                            reportItems?.length && reportItems?.map((user, i) => <tr key={user._id}>

                                                <th>{i + 1}</th>
                                                <th className='relative'>
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                        {
                                                            user.verify === 'verify' ?
                                                                <>
                                                                    <p className='absolute right-0 bottom-0 text-blue-600'><FaCheckCircle></FaCheckCircle></p>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                    </div></th>
                                                <td>{user.ProductName}</td>
                                                <td>{user.SellerName}</td>

                                                <td>{user.SellerEmail}</td>
                                                <td>{user.Location}</td>

                                                <td><button onClick={() => HandleDeleteUser(user._id)} className='btn btn-xs bg-gradient-to-r from-primary to-secondary text-white'>Delete</button></td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default ReportItems;