import { NavLink, Outlet } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';
import { useTheme } from "../../hooks/useTheme";

const AdminDashboard = () => {
    const { changeTheme, mode } = useTheme();

    const navLinks = <>
        <li className="mt-2 text-lg"><NavLink to="/admin-dashboard/admin-home" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>Home</NavLink></li>

        <li className="mt-2 lg:ml-5 text-lg"><NavLink to="/admin-dashboard/my-employee-list" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>My Employee List</NavLink></li>

        <li className="mt-2 lg:ml-5 text-lg"><NavLink to="/admin-dashboard/add-employee" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>Add an Employee</NavLink></li>

        <li className="mt-2 lg:ml-5 text-lg"><NavLink to="/admin-dashboard/asset-list" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>Asset List</NavLink></li>

        <li className="mt-2 lg:ml-5 text-lg"><NavLink to="/admin-dashboard/add-asset" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>Add an Asset</NavLink></li>

        <li className="mt-2 lg:ml-5 text-lg"><NavLink to="/admin-dashboard/all-requests" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>All Requests</NavLink></li>

        <li className="my-2 lg:ml-5 text-lg"><NavLink to="/admin-dashboard/custom-requests-list" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>Custom Requests List</NavLink></li>
    </>

    return (
        <>
            <div className="max-w-screen-xl mx-auto min-h-screen px-7 md:px-16 lg:px-16 pt-3 mt-3 md:mt-7 lg:mt-7">
                <nav className="flex justify-start pb-1 mb-3 items-center">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg">
                            {navLinks}
                        </ul>
                    </div>

                    <figure className="hidden md:contents"><img className="w-[30px] h-[30px] mt-1 rounded-lg" src="https://i.ibb.co/VBzzqzb/Digital-Hub-logo.jpg" alt="Logo" /><span className="text-3xl font-bold text-[#FF444A] md:ml-3">DigitalHub</span></figure>

                    <span onClick={changeTheme} className="text-xl ml-1 md:ml-7 mt-1">
                        {
                            mode === 'dark' ? <BiSolidSun className="text-[#FF444A]"></BiSolidSun> : <BiSolidMoon className="text-[#FF444A]"></BiSolidMoon>
                        }
                    </span>
                </nav>

                <div className="flex mt-11">
                    <div className="md:w-60 md:min-h-screen md:bg-base-200">
                        <ul className="hidden md:menu md:mr-5">
                            <li className="text-lg mt-1">
                                <NavLink
                                    to="/admin-dashboard/admin-home"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li className="text-lg mt-1">
                                <NavLink
                                    to="/admin-dashboard/my-employee-list"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    My Employee List
                                </NavLink>
                            </li>

                            <li className="text-lg mt-1">
                                <NavLink
                                    to="/admin-dashboard/add-employee"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    Add an Employee
                                </NavLink>
                            </li>

                            <li className="text-lg mt-1">
                                <NavLink
                                    to="/admin-dashboard/asset-list"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    Asset List
                                </NavLink>
                            </li>

                            <li className="text-lg mt-1">
                                <NavLink
                                    to="/admin-dashboard/add-asset"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    Add an Asset
                                </NavLink>
                            </li>

                            <li className="text-lg mt-1">
                                <NavLink
                                    to="/admin-dashboard/all-requests"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    All Requests
                                </NavLink>
                            </li>

                            <li className="text-lg my-1">
                                <NavLink
                                    to="/admin-dashboard/custom-requests-list"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    Custom Requests List
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;