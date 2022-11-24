import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signUpError, setSignUPError] = useState('')
    return (
        <div className='h-[800px] flex justify-center items-center bg-green-100 rounded-lg'>
            <div className='w-96 p-7'>
                <h2 className='text-4xl text-green-800 font-semibold text-center'>Add Products</h2>
                <form >
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text text-green-800 font-bold">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-primary input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text text-green-800 font-bold">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered input-primary w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text text-green-800 font-bold">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-bordered input-primary w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>

                    <div className="form-control  w-full max-w-xs">
                        <label className="label"> <span className="label-text text-green-800 font-bold">Please Select As A</span></label>
                        <select
                            {...register('profileType')}
                            className="select input-bordered input-primary w-full max-w-xs">
                            <option className='text-primary'>User</option>
                            <option className='text-primary'>Seller</option>
                        </select>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text text-green-800 font-bold">Image</span></label>
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
                <button className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full '>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default AddProduct;