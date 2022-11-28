import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import errorimg  from './error.jpg'

const DisplayError = () => {
    const error = useRouteError();
    const {logOut} = useState(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {

        logOut()
        
            .then(() => {
                localStorage.removeItem('accessToken')
                toast.success('Log Out Successfully')

                navigate('/')
              
            })
            .catch(err => {
                
                console.log(err)
            });
    }

    return (
        <div className='text-center mt-10'>
            <p className='text-red-500 text-4xl'>Some thing went Wrong</p>
            <p className='text-red-400 text-3xl'>{error.statusText || error.message}</p>
            <h1 className='text-4xl my-3'> Please <Link to='/login'> <button className='btn btn-primary btn-sm' onClick={handleLogOut}>Sign Out</button></Link> and log In Back</h1>
            <img className='w-2/4 mx-auto' src={errorimg} alt="" />
        </div>
    );
};

export default DisplayError;