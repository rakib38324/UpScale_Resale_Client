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
import ChooseBrand from "../../Pages/Home/Banner/ChooseBrand";
import Products from "../../Pages/Product/Products/Products";

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
                path: '/addproducts/:email',
                element: <AddProduct></AddProduct>,
                loader: ({params}) => fetch(`http://localhost:5000/brand/${params.email}`)
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
                path: '/mybuyers',
                element: <MyBuyers></MyBuyers>
            },
            {
                path: '/reportitems',
                element: <ReportItems></ReportItems>
            },
            {
                path: '/choosebrand',
                element: <ChooseBrand></ChooseBrand>
            },
            {
                path: '/myproduct/:email',
                element: <MyProduct></MyProduct>,
                loader: ({params}) => fetch(`http://localhost:5000/brand/${params.email}`)
            },
            {
                path: '/category/:id',
                element: <Products></Products>,
                loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
            },
            
            

        ]
    }
]);

export default router;

