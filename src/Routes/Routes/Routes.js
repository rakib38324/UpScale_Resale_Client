import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/SellerPage/Addproduct/AddProduct";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import MyOrder from "../../Pages/MyOrder/MyOrder";
import SignUp from "../../Pages/SignUp/SignUp";
import Users from "../../Pages/Users/Users";
import AllSeller from "../../Pages/AdminPage/AllSeler/AllSeller";
import AllBuyer from "../../Pages/AdminPage/AllBuyer/AllBuyer";
import MyBuyers from "../../Pages/SellerPage/MyBuyers/MyBuyers";
import ReportItems from "../../Pages/AdminPage/ReportItems/ReportItems";
import MyProduct from "../../Pages/SellerPage/MyProducts/MyProduct";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/myorder',
                element: <MyOrder></MyOrder>
            },
            {
                path: '/allusers',
                element: <Users></Users>
            },
            {
                path: '/addproducts',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/allseller',
                element: <AllSeller></AllSeller>
            },
            {
                path: '/allbuyer',
                element: <AllBuyer></AllBuyer>
            },
            {
                path: '/mybuysers',
                element: <MyBuyers></MyBuyers>
            },
            {
                path: '/reportitems',
                element: <ReportItems></ReportItems>
            },
            {
                path: '/myproducts',
                element: <MyProduct></MyProduct>
            }
            

        ]
    }
]);

export default router;

