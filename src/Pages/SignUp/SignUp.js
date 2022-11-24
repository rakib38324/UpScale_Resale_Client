import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/UserTooken';



const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signUpError, setSignUPError] = useState('')

    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)
    const location = useLocation();
    const navigate = useNavigate();

    const { createUser, updateUser, signUpWitGoogle } = useContext(AuthContext)

    if (token) {
        navigate('/')
        
    }

    const handleSignUp = (data) => {
        // console.log(data);

        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast.success('User Created Successfully.')

                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        // saveUser(data.name,data.email);

                        //Upload image and save database imgibb
                        const image = data.image[0];

                        const formData = new FormData();
                        formData.append('image', image);
                        const imgKey = process.env.REACT_APP_IMG_KEY;
                        console.log(image, imgKey)
                        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imgKey}`;

                        fetch(url, {
                            method: 'POST',
                            body: formData
                        })
                            .then(res => res.json())
                            .then(imgData => {
                                if (imgData.success) {



                                    // console.log(imgData.data.url);
                                    const user = {
                                        name: data.name,
                                        email: data.email,
                                        profileType: data.profileType,
                                        image: imgData.data.url
                                    }


                                    console.log(user)

                                    // Save user information to the database
                                    fetch('http://localhost:5000/users', {
                                        method: 'POST',
                                        headers: {
                                            'content-type': 'application/json',
                                            // authorization: `bearer ${localStorage.getItem('accessToken')}`
                                        },
                                        body: JSON.stringify(user)
                                    })
                                        .then(res => res.json())
                                        .then(result => {
                                            setCreatedUserEmail(data.email);
                                            toast.success("Login Successfully")
                                        })
                                }
                            })

                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }



    const handleSignUpnWithGoogle = () => {

        signUpWitGoogle()
            .then(result => {
                const user = result.user;
                // console.log(user.email)


                //check the user is alive in our database,
                //if user email found we can call for token,
                //else at first create user then send database and then cal for token

                if (user.email) {
                    fetch(`http://localhost:5000/finduser?email=${user.email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.accessToken) {
                                toast.success("Login Successfully")
                                return setCreatedUserEmail(user.email);
                            }

                            else {

                                const profile = {
                                    name: user.displayName,
                                    email: user.email,
                                    profileType: "User",
                                    image: user.photoURL,
                                }

                                // Save user information to the database
                                fetch('http://localhost:5000/users', {
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'application/json',                                  
                                    },
                                    body: JSON.stringify(profile)
                                })
                                    .then(res => res.json())
                                    .then(result => {
                                        setCreatedUserEmail(user.email);
                                        toast.success("Login Successfully")
                                    })



                            }
                        });
                }


























            })
            .catch(error => console.log(error))

    }



    return (


        <div className='h-[800px] flex justify-center items-center bg-blue-100 rounded-lg'>
            <div className='w-96 p-7'>
                <h2 className='text-4xl text-secondary font-semibold text-center'>SignUp</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text text-secondary font-bold">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-primary input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
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
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-bordered input-primary w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>

                    <div className="form-control  w-full max-w-xs">
                        <label className="label"> <span className="label-text text-secondary font-bold">Please Select As A</span></label>
                        <select
                            {...register('profileType')}
                            className="select input-bordered input-primary w-full max-w-xs">
                            <option className='text-primary'>User</option>
                            <option className='text-primary'>Seller</option>
                        </select>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text text-secondary font-bold">Image</span></label>
                        <input type="file" {...register("image", {
                            required: "Photo is Required"
                        })} className="input input-bordered input-primary w-full max-w-xs pt-2" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>



                    <input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full mt-2' value="SignUp" type="submit" />
                    <div>
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    </div>
                </form>
                <p className='pt-2'>Have an Account? <Link className='text-secondary font-bold' to="/login">Please Login</Link></p>
                <div className="divider text-secondary font-bold">OR</div>
                <button onClick={handleSignUpnWithGoogle} className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full '>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;