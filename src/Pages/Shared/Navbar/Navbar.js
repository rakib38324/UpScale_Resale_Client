import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import useAdmin from '../../../Hooks/UseAdmin';
import UserHook from '../../../Hooks/UserHook';
import UseSeller from '../../../Hooks/UseSeller';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)


    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = UseSeller(user?.email)
    const [isUser] = UserHook(user?.email)
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Log Out Successfully')
                localStorage.removeItem('accessToken')
                navigate('/')
            })
            .catch(err => console.log(err));
    }

    // console.log(isAdmin,isSeller,isUser)

    const menuItems = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/allusers">All Users</Link></li>


        {
            isUser && <>
                <li><Link to="/myorder">My Order</Link></li>
            </>
        }
        {
            isAdmin && <>
              
                <li><Link to="/allseller">All Seller</Link></li>
                <li><Link to="/allbuyer">All Buyer</Link></li>
                <li><Link to="/reportitems">Reported Items</Link></li>
            </>
        }
        {
            isSeller && <>
                <li><Link to={`/addproducts/${user.email}`}>Add Products</Link></li>
                <li><Link to='/myproduct'>My Products</Link></li>
                <li><Link to="/mybuyers">My Buyer</Link></li>
            </>
        }
        {
            user?.uid ?
                <>
                    <li><button onClick={handleLogOut}>Sign out</button></li>
                </>
                : <li><Link to="/login">Login</Link></li>
        }
    </React.Fragment>

    return (
        <div className="navbar bg-base-100 flex justify-between">
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