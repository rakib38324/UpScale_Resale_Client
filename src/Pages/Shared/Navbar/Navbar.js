import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import useAdmin from '../../../Hooks/UseAdmin';
import UserHook from '../../../Hooks/UserHook';
import UseSeller from '../../../Hooks/UseSeller';
import Loading from '../Loading/Loading';

const Navbar = () => {
    

    const { user, logOut,loading,setLoading } = useContext(AuthContext)

    
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = UseSeller(user?.email)
    const [isUser] = UserHook(user?.email)
    const navigate = useNavigate();
    

    const handleLogOut = () => {
       
        logOut()
        setLoading(true)
            .then(() => {
                localStorage.removeItem('accessToken')
                toast.success('Log Out Successfully')
                
                navigate('/')
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)});
    }

    // console.log(isAdmin,isSeller,isUser)

    const menuItems = <React.Fragment>
        <li className='font-bold' ><Link to="/">Home</Link></li>
        
        <li className='font-bold' ><Link to="/allusers">All Users</Link></li>
        


        {
            isUser && <>
                <li className='font-bold' ><Link to="/myorder">My Order</Link></li>
            </>
        }
        {
            isAdmin && <>
              
                <li className='font-bold' ><Link to="/allseller">All Seller</Link></li>
                <li className='font-bold' ><Link to="/allbuyer">All Buyer</Link></li>
                <li className='font-bold' ><Link to="/reportitems">Reported Items</Link></li>
            </>
        }
        {
            isSeller && <>
                <li className='font-bold' ><Link to={`/addproducts/${user?.email}`}>Add Products</Link></li>
                <li className='font-bold' ><Link to={`/myproduct/${user?.email}`}>My Products</Link></li>
                <li className='font-bold' ><Link to="/mybuyers">My Buyer</Link></li>
            </>
        }
        <li className='font-bold' ><Link to="/blogs">Blogs</Link></li>
        {
            user?.uid ?
                <>
                    <li className='font-bold'><button onClick={handleLogOut}>Sign Out</button></li>
                </>
                : <li className='font-bold' ><Link to="/login">Login</Link></li>
        }
    </React.Fragment>

    if(loading){
        <Loading></Loading>
    }

    return (
        <div className="navbar bg-gradient-to-r from-blue-100 to-blue-400 flex justify-between rounded-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost font-bold normal-case text-2xl"> <span className='text-blue-600 font-extrabold animate-bounce'>Up</span>Scale <span className='text-blue-600 pl-2 font-extrabold'>Re</span> <span >Sale</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>

        </div>
    );
};

export default Navbar;