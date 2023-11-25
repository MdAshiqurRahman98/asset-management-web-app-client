import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import JoinEmployee from "../pages/JoinEmployee/JoinEmployee";
import JoinAdmin from "../pages/JoinAdmin/JoinAdmin";
import Payment from "../pages/Payment/Payment";
import EmployeeDashboard from "../layouts/employeeDashboard/employeeDashboard";
import AdminDashboard from '../layouts/adminDashboard/adminDashboard';
import EmployeeHome from "../pages/EmployeeDashboard/EmployeeHome/EmployeeHome";
import AdminHome from "../pages/AdminDashboard/AdminHome/AdminHome";

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
    {
        path: 'employeeDashboard',
        element: <EmployeeDashboard></EmployeeDashboard>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'employeeHome',
                element: <EmployeeHome></EmployeeHome>
            }
        ]
    },
    {
        path: 'adminDashboard',
        element: <AdminDashboard></AdminDashboard>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            }
        ]
    }
]);

export default router;