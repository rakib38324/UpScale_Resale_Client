import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';


const AllBuyer = () => {
    

    const {data: users = [], refetch,isLoading} = useQuery({
        queryKey: ['allbuyer'],
        queryFn: async () =>{
            const res = await fetch('https://up-scale-re-sale-server.vercel.app/allbuyer',{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })


    const HandleMakeAdmin = id =>{
        fetch(`https://up-scale-re-sale-server.vercel.app/users/admin/${id}`,{
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success(`Make Admin Successfully.`);
                refetch();
            }
        })
    }

    const HandleMakeVerify = id =>{
        fetch(`https://up-scale-re-sale-server.vercel.app/users/verify/${id}`,{
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success(`Make Verify Successfully.`);
                refetch();
            }
        })
    }

    const HandleDeleteUser = id =>{
        fetch(`https://up-scale-re-sale-server.vercel.app/users/${id}`,{
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                toast.success(`Delete Successfully.`);
                refetch();
            }
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-3xl text-center my-10'> All Buyer</h1>
            <div className="overflow-x-auto mb-20">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Verify</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.length && users?.map((user, i) => <tr key={user._id}>
                                
                                <th>{i + 1}</th>
                                <th className='relative'>
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    {
                                        user.verify === 'verified' ?
                                        <>
                                        <p className='absolute right-0 bottom-0 text-blue-600'><FaCheckCircle></FaCheckCircle></p>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </div></th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{
                                    user?.role !== 'admin' && <button onClick={()=>HandleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>
                                }
                                {
                                    user?.role === 'admin' && <button  className='btn btn-xs bg-green-400 text-black'>Admin</button>
                                }
                                </td>
                                
                                <td>{
                                    user?.verify !== 'verified' && <button onClick={()=>HandleMakeVerify(user._id)} className='btn btn-xs btn-primary'>Verify Seller</button>
                                    }

                                {
                                    user?.verify === 'verified' && <button  className='btn btn-xs bg-green-400 text-black'>Verified</button>
                                }
                                </td>
                                <td><button onClick={()=>HandleDeleteUser(user._id)} className='btn btn-xs  bg-blue-500 text-black hover:bg-green-400'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyer;