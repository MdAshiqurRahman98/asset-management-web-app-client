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
        element: <Dashboard></Dashboard>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // Admin routes
            {
                path: 'admin-home',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'asset-list',
                element: <AssetList></AssetList>
            },
            {
                path: 'add-asset',
                element: <AddAsset></AddAsset>
            },
            {
                path: 'all-requests',
                element: <AllRequests></AllRequests>
            },
            {
                path: 'custom-requests-list',
                element: <CustomRequestsList></CustomRequestsList>
            },
            {
                path: 'my-employee-list',
                element: <MyEmployeeList></MyEmployeeList>
            },
            {
                path: 'add-employee',
                element: <AddEmployee></AddEmployee>
            },
            {
                path: 'admin-profile',
                element: <AdminProfile></AdminProfile>
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