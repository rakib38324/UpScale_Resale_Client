import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

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
        <div>
            <p className='text-red-500'>Some thing went Wrong</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h1 className='text-4xl'> Please <li className='font-bold'><button onClick={handleLogOut}>Sign Out</button></li> and log back In</h1>
        </div>
    );
};

export default DisplayError;