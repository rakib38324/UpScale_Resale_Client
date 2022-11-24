import React from 'react';

const BrandCard = ({brand}) => {
    const {name,img,details}=brand;
    return (
        <div className="card w-96 bg-base-100 shadow-xl border-2 border-rounded border-blue-800 image-full">
                <figure><img src={img} alt="" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-white">{name}</h2>
                    <p className=''>{details}</p>
                    <div className="card-actions justify-end">
                        <button className="btn bg-blue-400 text-black hover:bg-blue-600 hover:text-white">Buy Now</button>
                    </div>
                </div>
            </div>
    );
};

export default BrandCard;