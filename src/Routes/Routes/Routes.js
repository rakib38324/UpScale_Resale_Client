import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/Addproduct/AddProduct";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import MyOrder from "../../Pages/MyOrder/MyOrder";
import SignUp from "../../Pages/SignUp/SignUp";
import Users from "../../Pages/Users/Users";

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
                path: '/users',
                element: <Users></Users>
            },
            {
                path: '/addproducts',
                element: <AddProduct></AddProduct>
            },

        ]
    }
]);

export default router;

