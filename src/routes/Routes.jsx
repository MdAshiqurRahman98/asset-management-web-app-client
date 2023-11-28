import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import JoinEmployee from "../pages/JoinEmployee/JoinEmployee";
import JoinAdmin from "../pages/JoinAdmin/JoinAdmin";
import Payment from "../pages/Payment/Payment";
import Dashboard from './../layouts/Dashboard/Dashboard';
import EmployeeHome from "../pages/EmployeeDashboard/EmployeeHome/EmployeeHome";
import AdminHome from "../pages/AdminDashboard/AdminHome/AdminHome";
import MyTeam from './../pages/EmployeeDashboard/MyTeam/MyTeam';
import MyAssets from './../pages/EmployeeDashboard/MyAssets/MyAssets';
import RequestAsset from './../pages/EmployeeDashboard/RequestAsset/RequestAsset';
import MakeCustomRequest from './../pages/EmployeeDashboard/MakeCustomRequest/MakeCustomRequest';
import MyEmployeeList from './../pages/AdminDashboard/MyEmployeeList/MyEmployeeList';
import AddEmployee from './../pages/AdminDashboard/AddEmployee/AddEmployee';
import AssetList from './../pages/AdminDashboard/AssetList/AssetList';
import AddAsset from './../pages/AdminDashboard/AddAsset/AddAsset';
import AllRequests from './../pages/AdminDashboard/AllRequests/AllRequests';
import CustomRequestsList from './../pages/AdminDashboard/CustomRequestsList/CustomRequestsList';
import EmployeeProfile from './../pages/EmployeeDashboard/EmployeeProfile/EmployeeProfile';
import AdminProfile from './../pages/AdminDashboard/AdminProfile/AdminProfile';
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UpdateAsset from "../pages/AdminDashboard/UpdateAsset/UpdateAsset";

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
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // Admin routes
            {
                path: 'admin-home',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'asset-list',
                element: <AdminRoute><AssetList></AssetList></AdminRoute>
            },
            {
                path: 'add-asset',
                element: <AdminRoute><AddAsset></AddAsset></AdminRoute>
            },
            {
                path: '/update-product/:id',
                element: <AdminRoute><UpdateAsset></UpdateAsset></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/api/v1/product/${params.id}`)
            },
            {
                path: 'all-requests',
                element: <AdminRoute><AllRequests></AllRequests></AdminRoute>
            },
            {
                path: 'custom-requests-list',
                element: <AdminRoute><CustomRequestsList></CustomRequestsList></AdminRoute>
            },
            {
                path: 'my-employee-list',
                element: <AdminRoute><MyEmployeeList></MyEmployeeList></AdminRoute>
            },
            {
                path: 'add-employee',
                element: <AdminRoute><AddEmployee></AddEmployee></AdminRoute>
            },
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },

            // Employee routes
            {
                path: 'employee-home',
                element: <EmployeeHome></EmployeeHome>
            },
            {
                path: 'my-assets',
                element: <MyAssets></MyAssets>
            },
            {
                path: 'my-team',
                element: <MyTeam></MyTeam>
            },
            {
                path: 'request-asset',
                element: <RequestAsset></RequestAsset>
            },
            {
                path: 'make-custom-request',
                element: <MakeCustomRequest></MakeCustomRequest>
            },
            {
                path: 'employee-profile',
                element: <EmployeeProfile></EmployeeProfile>
            }
        ]
    }
]);

export default router;