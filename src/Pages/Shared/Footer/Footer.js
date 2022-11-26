import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Logo/logo.png'
import { FaFacebookF,FaYoutube,FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-gradient-to-r from-amber-100 to-blue-300 text-base-content rounded-xl">
                <div>
                    <span className="footer-title">Services</span>
                    <Link className="link link-hover">Branding</Link>
                    <Link className="link link-hover">Design</Link>
                    <Link className="link link-hover">Marketing</Link>
                    <Link className="link link-hover">Advertisement</Link>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <Link className="link link-hover">About us</Link>
                    <Link className="link link-hover">Contact</Link>
                    <Link className="link link-hover">Jobs</Link>
                    <Link className="link link-hover">Press kit</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <Link className="link link-hover">Terms of use</Link>
                    <Link className="link link-hover">Privacy policy</Link>
                    <Link className="link link-hover">Cookie policy</Link>
                </div>
            </footer>
            <footer className="footer px-10 py-4 border-t bg-gradient-to-r from-blue-200 to-amber-200 text-base-content border-base-300 rounded-xl">
                <div className="items-center grid-flow-col col-span-1">
                    <img className='w-1/4 rounded-lg' src={logo} alt="" />
                    <p>UpScale ReSale Industries Ltd. <br />Providing reliable tech since 1992</p>
                </div>
                <div className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <Link className='text-2xl'><FaTwitter></FaTwitter></Link>
                        <Link className='text-2xl'><FaYoutube></FaYoutube></Link>
                        <Link className='text-2xl'><FaFacebookF></FaFacebookF></Link>
                        
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;