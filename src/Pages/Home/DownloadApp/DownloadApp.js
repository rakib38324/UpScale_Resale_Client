import React from 'react';
import img from './download.jpg'
const DownloadApp = () => {
    return (
        <div className="hero bg-gradient-to-r from-pink-400 to-rose-300 rounded-3xl mb-2">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={img} alt='' className="w-full rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Download the app</h1>
                    <p className="py-6">Buying & Selling is easier from our app too! To buy or sell on the go, download our app.</p>
                    <button className="btn bg-gradient-to-r from-pink-400 to-rose-300">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default DownloadApp;