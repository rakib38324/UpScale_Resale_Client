import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import Loading from '../Shared/Loading/Loading';

const Users = () => {
    

    const {data: users = [], refetch,isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    })




    const HandleMakeVerify = id =>{
        fetch(`http://localhost:5000/users/verify/${id}`,{
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
        fetch(`http://localhost:5000/users/${id}`,{
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
        <div >
            <h1 className='text-3xl text-center mt-1 py-10'> All Users</h1>
            <div className="overflow-x-auto mb-20 ">
                <table className="table w-full bg-gradient-to-r from-green-300 to-blue-400 rounded-2xl">
                    <thead>
                        <tr className='bg-gradient-to-r from-green-300 to-blue-400 rounded-2xl'>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type Of User</th>
                            <th>Verify Seller</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='bg-gradient-to-r from-green-300 to-blue-400 rounded-2xl'>
                        {
                            users?.length && users?.map((user, i) => <tr key={user._id}>
                                
                                <th>{i + 1}</th>
                                <th className='relative'>
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    {
                                        user.verify ?
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
                                
                                <td>{user.profileType}</td>
                                <td>{
                                    user?.verify !== 'verified' && <button onClick={()=>HandleMakeVerify(user._id)} className='btn btn-xs bg-gradient-to-r from-primary to-secondary text-white'>Verify Seller</button>
                                    }

                                {
                                    user?.verify === 'verified' && <button  className='btn btn-xs bg-gradient-to-r from-green-600 to-green-800 text-white'>Verified</button>
                                }
                                </td>
                                <td><button onClick={()=>HandleDeleteUser(user._id)} className='btn btn-xs bg-gradient-to-r from-primary to-secondary text-white'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;