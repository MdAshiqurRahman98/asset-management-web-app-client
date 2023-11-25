import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import JoinEmployee from "../pages/JoinEmployee/JoinEmployee";
import JoinAdmin from "../pages/JoinAdmin/JoinAdmin";
import Payment from "../pages/Payment/Payment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
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
                path: '/join-employee',
                element: <JoinEmployee></JoinEmployee>
            },
            {
                path: '/join-admin',
                element: <JoinAdmin></JoinAdmin>
            },
            {
                path: '/payment',
                element: <Payment></Payment>
            }
        ]
    },
]);

export default router;