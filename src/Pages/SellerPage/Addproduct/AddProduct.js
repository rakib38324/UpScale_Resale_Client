import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import ChooseBrand from '../../Home/Banner/ChooseBrand';


const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signUpError, setSignUPError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();



    const seller = useLoaderData();
    // console.log(seller,seller.name,seller._id,seller.email)



    const { data: Brand_Name } = useQuery({
        queryKey: ['Brand_Name'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/brand');
            const data = await res.json();
            return data;
        }
    })

    // console.log(user)

    const handleAddProduct = (data) => {
        setSignUPError('');

        //Upload image and save database imgibb
        const image = data.image[0];

        const formData = new FormData();
        formData.append('image', image);

        const imgKey = process.env.REACT_APP_IMG_KEY;
        // console.log(image, imgKey)
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imgKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {


                // console.log(imgData.data.url);
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                const productInfo = {
                    ProductName: data.name,
                    SellerName: data.sellername,
                    SellerEmail: data.selleremail,
                    Seller_id: seller._id,
                    Original_price: data.originalprice,
                    Resale_price: data.resaleprice,
                    Buyer_mobile_number: data.phone,
                    image: imgData.data.url,
                    Condition: data.condition,
                    Location: data.location,
                    Details: data.details,
                    AddingDate: date,
                    Addingtime: time,
                    Years_of_use: data.years_of_use,
                    status: 'Available',
                    brand_id: data.brand_id,

                }

                // console.log(productInfo)


                // Save user information to the database
                fetch('http://localhost:5000/product', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(productInfo)
                })
                    .then(res => res.json())
                    .then(result => {

                        toast.success("Product Add Successfully")
                        navigate('/');
                    })

            })

    }




    return (
        <div className='bg-gradient-to-r from-purple-300 to-blue-400 rounded-lg'>
           

            <div>
                <h2 className='text-4xl  font-semibold text-center mb-5 text-black py-6'>Add Products</h2>
                <div className='w-full p-7'>

                    <form onSubmit={handleSubmit(handleAddProduct)}>

                        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Your Name</span></label>
                                <input type="text" {...register("sellername", {
                                    required: "Name is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" defaultValue={seller.name} readOnly />
                                {errors.sellername && <p className='text-red-500'>{errors.password.message}</p>}

                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Your Email</span></label>
                                <input type="text" {...register("selleremail", {
                                    required: "Name is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" defaultValue={seller.email} readOnly />
                                {errors.selleremail && <p className='text-red-500'>{errors.password.message}</p>}
                            </div>



                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold">Please Select Brand</span></label>
                                <select
                                    {...register('brand_id')}
                                    className="select input-secondary w-full max-w-xs">
                                    {
                                        Brand_Name?.length && Brand_Name.map(brand => <option
                                            key={brand._id}
                                            value={brand._id}
                                        >{brand.name}</option>)
                                    }


                                </select>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Product Name</span></label>
                                <input type="text" {...register("name", {
                                    required: "Name is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" placeholder="Product Name" required />
                                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Original Price</span></label>
                                <input type="text" {...register("originalprice", {
                                    required: "Price is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" placeholder="Original Price" required />
                                {errors.originalprice && <p className='text-red-500'>{errors.originalprice.message}</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Resale Price</span></label>
                                <input type="text" {...register("resaleprice", {
                                    required: "Price is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" placeholder="Resell Price" required />
                                {errors.resaleprice && <p className='text-red-500'>{errors.resaleprice.message}</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Phone Number</span></label>
                                <input type="text" {...register("phone", {
                                    required: "Number is Required",
                                    minLength: { value: 11, message: "Phone Number must be 11 characters or long" }
                                })} className="input input-secondary input-bordered w-full max-w-xs" placeholder="Phone number" required />
                                {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                            </div>

                            <div className="form-control  w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold">Please Select Condition</span></label>
                                <select
                                    {...register('condition')}
                                    className="select input-bordered input-secondary w-full max-w-xs">
                                    <option className='text-primary' select>Excellent</option>
                                    <option className='text-primary'>Good</option>
                                    <option className='text-primary'>Fair</option>
                                </select>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Used with in Month/Years</span></label>
                                <input type="text" {...register("years_of_use", {
                                    required: "Name is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" placeholder="Six months" required />
                                {errors.years_of_use && <p className='text-red-500'>{errors.years_of_use.message}</p>}
                            </div>


                            <div className="form-control  w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold">Please Select Location</span></label>
                                <select
                                    {...register('location')}
                                    className="select input-bordered input-secondary w-full max-w-xs">
                                    <option className='text-primary'>Dhaka</option>
                                    <option className='text-primary'>Mymensingh</option>
                                    <option className='text-primary'>Chittagong</option>
                                    <option className='text-primary'>Barisal</option>
                                    <option className='text-primary'>Khulna</option>
                                    <option className='text-primary'>Rajshahi</option>
                                    <option className='text-primary'>Rangpur</option>
                                    <option className='text-primary'>Sylhet</option>
                                </select>
                            </div>





                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold">Image</span></label>
                                <input type="file" {...register("image", {
                                    required: "Photo is Required"
                                })} className="input  input-secondary w-full max-w-xs pt-2" required />
                                {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Details</span></label>

                                <textarea {...register("details", {
                                    required: "Details is Required"
                                })} className="textarea textarea-secondary border-secondary" placeholder="Details" required></textarea>
                            </div>

                            {errors.details && <p className='text-red-500'>{errors.details.message}</p>}
                        </div>



                        <div className='text-center my-10'><input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-1/4 mt-2' value="Add Product" type="submit" />

                        </div>
                        <div>
                            {signUpError && <p className='text-red-600'>{signUpError}</p>}
                        </div>
                    </form>


                </div>
            </div>


        </div>
    );
};

export default AddProduct;