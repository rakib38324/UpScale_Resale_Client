import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import SmallLoading from '../Shared/Loading/SmallLoading';

const Modal = ({ title, message, successButtonName, closeModal, modalData, successAction }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [modalError, setModalError] = useState('');
    // const location = useLocation();
    const navigate = useNavigate();


    const { user, loading, setLoading } = useContext(AuthContext)
    console.log(user)


    const handleBookProduct = (data) => {

        setModalError('')
        setLoading(true)
        const productInfo = {
            ProductName: data.productname,
            ProductPrice: data.productprice,
            buyername: data.buyername,
            buyeremail: data.buyeremail,
            buyerphone: data.phone,
            meetinglocation: data.meetinglocation,
            seller_email: modalData.SellerEmail,
            seller_id: modalData.Seller_id,
            image:modalData.image,
            SellerName:modalData.SellerName,
            use_of_years:modalData.Years_of_use,
            Seller_Location:modalData.Location,
            phone_condition: modalData.Condition,
            productMian_ID:modalData._id,             

        }
        console.log(productInfo)


        // Save user information to the database
        fetch('https://up-scale-re-sale-server.vercel.app/booking/product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(productInfo)
        })
            .then(res => res.json())
            .then(result => {

                toast.success(`Booked Successfully.`);
                setLoading(false)
                navigate('/myorder');



                // fetch(`https://up-scale-re-sale-server.vercel.app/product/booking/${modalData._id}`, {
                //     method: 'PUT',
                //     headers: {
                //         authorization: `bearer ${localStorage.getItem('accessToken')}`
                //     }
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         if (data.modifiedCount > 0) {
                            

                //         }
                //     })

            })


    }

    return (

        <div>


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center pb-2">{title}</h3>
                    <img className='w-full h-48 rounded-lg' src={modalData.image} alt="" />



                    <p>Uploading Date:{modalData.AddingDate}</p>
                    <p>Details:{modalData.Details}</p>

                    <form onSubmit={handleSubmit(handleBookProduct)} >

                        <div className='grid lg:grid-cols-2 gap-1'>
                            <div className="form-control w-full">
                                <label className="label "> <span className="label-text text-black font-bold ">Product Name</span></label>
                                <input type="text" {...register("productname", {
                                    required: "Buyer Name is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" defaultValue={modalData.ProductName} readOnly />
                                {errors.productname && <p className='text-red-500'>{errors.productname.message}</p>}

                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Product Price</span></label>
                                <input type="text" {...register("productprice", {
                                    required: "Buyer Name is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" defaultValue={modalData.Resale_price} readOnly />
                                {errors.productprice && <p className='text-red-500'>{errors.productprice.message}</p>}

                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Your Name</span></label>
                                <input type="text" {...register("buyername", {
                                    required: "Buyer Name is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" defaultValue={user.displayName} readOnly />
                                {errors.buyername && <p className='text-red-500'>{errors.buyername.message}</p>}

                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Your Email</span></label>
                                <input type="text" {...register("buyeremail", {
                                    required: "Email is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" defaultValue={user.email} readOnly />
                                {errors.buyeremail && <p className='text-red-500'>{errors.buyeremail.message}</p>}

                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Phone Number</span></label>
                                <input type="text" {...register("phone", {
                                    required: "Phone Number is Required",
                                    minLength: { value: 11, message: "Phone Number must be 11 characters or long" }
                                })} className="input input-secondary input-bordered w-full max-w-xs" placeholder="Phone number" required />
                                {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text text-black font-bold ">Meeting Location</span></label>
                                <input type="text" {...register("meetinglocation", {
                                    required: "Meeting Location is Required"
                                })} className="input input-secondary input-bordered w-full max-w-xs" placeholder='Location' required />
                                {errors.meetinglocation && <p className='text-red-500'>{errors.meetinglocation.message}</p>}

                            </div>

                        </div>
                        <div>


                            <div className='my-3'>
                                <button className='btn btn-primary w-full text-white'>{loading ? <SmallLoading></SmallLoading> : 'Booking Now'}</button>
                            </div>


                            <div className='modal-action'>
                                <label htmlFor="my-modal" className="btn bg-base-400">Close</label>
                            </div>
                        </div>

                    </form>



                </div>
            </div>
        </div>
    );
};

export default Modal;