import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/UserTooken';
import SmallLoading from '../Shared/Loading/SmallLoading';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');


    const { signIn, signUpWitGoogle, loading, setLoading } = useContext(AuthContext)



    if (token) {
       
        navigate(from, { replace: true })
    }

    // console.log(token)

    const handleLogin = data => {
        // console.log(data);
        setLoading(true)
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user.email);
                if (user?.email) {
                    setLoginUserEmail(user.email);
                    toast.success("Login Successfully")
                    setLoading(false)
                }

            })
            .catch(error => {
                console.log(error.message)
                setLoading(false)
                setLoginError(error.message);

            });
    }


    const handleLoginWithGoogle = () => {
        setLoading(true)

        signUpWitGoogle()

            .then(result => {
                const user = result.user;
                console.log(user)
                if (user.email) {
                    fetch(`https://up-scale-re-sale-server.vercel.app/finduser?email=${user.email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.accessToken) {
                              
                                return setLoginUserEmail(user.email);
                            }

                            else {

                                const profile = {
                                    name: user.displayName,
                                    email: user.email,
                                    profileType: "User",
                                    image: user.photoURL,
                                    verify: 'Unverified',
                                }

                                // console.log(profile)
                                // Save user information to the database
                                fetch('https://up-scale-re-sale-server.vercel.app/users', {
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'application/json',
                                    },
                                    body: JSON.stringify(profile)
                                })
                                    .then(res => res.json())
                                    .then(result => {
                                        setLoginUserEmail(user.email);
                                        setLoading(false)
                                        toast.success("Login Successfully")
                                       
                                    })



                            }
                        });
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })

    }



    return (
        <div className='h-[800px] flex justify-center items-center  bg-gradient-to-r from-green-300 to-cyan-400 rounded-lg my-1'>

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
                    <div className='text-center my-5'>

                        <button className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full mt-2 '> {loading ? <SmallLoading></SmallLoading> : 'LogIn'} </button>

                        <div>
                            {loginError && <p className='text-red-600'>{loginError}</p>}
                        </div>
                    </div>
                </form>
                <p className='pt-2'>New to UpScale ReSale? <Link className='text-secondary font-bold' to="/signup">Create new Account</Link></p>
                <div className="divider text-secondary font-bold">OR</div>
                <button onClick={handleLoginWithGoogle} className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full'>{loading ? <SmallLoading></SmallLoading> : 'LOG IN WITH GOOGLE'}</button>
            </div>
        </div>
    );
};

export default Login;