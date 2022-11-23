import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');


    const {signIn,signUpWitGoogle} = useContext(AuthContext)



    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("LogIn Successfully")
                // setLoginUserEmail(data.email);
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }


    const handleLoginWithGoogle = () => {

        signUpWitGoogle()
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success("Login Successfully")
                const currentUser = { email: user.email }

            })
            .catch(error => console.log(error))

    }


    return (
        <div className='h-[800px] flex justify-center items-center bg-blue-100 rounded-lg'>
            <div className='w-96 p-7'>
                <h2 className='text-4xl text-secondary font-semibold text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text text-secondary font-bold">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered input-primary w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text text-secondary font-bold">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered input-primary w-full max-w-xs" />
                        <label className="label"> <span className="label-text text-secondary font-bold">Forget Password?</span></label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full ' value="Login" type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p className='pt-2'>New to UpScale ReSale? <Link className='text-secondary font-bold' to="/signup">Create new Account</Link></p>
                <div className="divider text-secondary font-bold">OR</div>
                <button onClick={handleLoginWithGoogle} className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;