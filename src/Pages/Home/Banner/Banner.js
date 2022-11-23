import React from 'react';
import pic1 from './BannerImage/1.jpg'
import pic2 from './BannerImage/2.jpg'
import pic3 from './BannerImage/3.jpg'
import pic4 from './BannerImage/4.jpg'


const Banner = () => {
    return (
        <div className="carousel max-w-[1300px] mx-auto my-5   rounded-2xl">
            <div id="slide1" className="carousel-item relative w-full">
                <img src={pic1} alt='' className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle text-white bg-blue-800">❮</a>
                    <a href="#slide2" className="btn btn-circle text-white bg-blue-800">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src={pic2} alt='' className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle text-white bg-blue-800">❮</a>
                    <a href="#slide3" className="btn btn-circle text-white bg-blue-800">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src={pic3} alt='' className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle text-white bg-blue-800">❮</a>
                    <a href="#slide4" className="btn btn-circle text-white bg-blue-800">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img src={pic4} alt='' className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle text-white bg-blue-800">❮</a>
                    <a href="#slide1" className="btn btn-circle text-white bg-blue-800">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;