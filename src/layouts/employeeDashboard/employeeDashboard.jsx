import { NavLink, Outlet } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';
import { useTheme } from "../../hooks/useTheme";

const EmployeeDashboard = () => {
    const { changeTheme, mode } = useTheme();

    const navLinks = <>
        <li className="mt-2 text-lg"><NavLink to="/employee-dashboard/employee-home" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>Home</NavLink></li>

        <li className="mt-2 lg:ml-5 text-lg"><NavLink to="/employee-dashboard/my-team" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>My Team</NavLink></li>

        <li className="mt-2 lg:ml-5 text-lg"><NavLink to="/employee-dashboard/my-assets" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>My Assets</NavLink></li>

        <li className="mt-2 lg:ml-5 text-lg"><NavLink to="/employee-dashboard/request-asset" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>Request for an Asset</NavLink></li>

        <li className="mt-2 lg:ml-5 text-lg"><NavLink to="/employee-dashboard/make-custom-request" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>Make a Custom Request</NavLink></li>

        <li className="my-2 lg:ml-5 text-lg"><NavLink to="/employee-dashboard/profile" className={({ isActive, isPending }) =>
            isPending
                ? "pending"
                : isActive
                    ? "text-[#FF444A] text-lg font-bold"
                    : ""
        }>Profile</NavLink></li>
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
                    <div className="md:w-[261px] md:min-h-screen md:bg-base-200">
                        <ul className="hidden md:menu md:mr-5">
                            <li className="text-lg mt-1">
                                <NavLink
                                    to="/employee-dashboard/employee-home"
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
                                    to="/employee-dashboard/my-team"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    My Team
                                </NavLink>
                            </li>

                            <li className="text-lg mt-1">
                                <NavLink
                                    to="/employee-dashboard/my-assets"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    My Assets
                                </NavLink>
                            </li>

                            <li className="text-lg mt-1">
                                <NavLink
                                    to="/employee-dashboard/request-asset"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    Request for an Asset
                                </NavLink>
                            </li>

                            <li className="text-lg mt-1">
                                <NavLink
                                    to="/employee-dashboard/make-custom-request"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    Make a Custom Request
                                </NavLink>
                            </li>

                            <li className="text-lg my-1">
                                <NavLink
                                    to="/employee-dashboard/profile"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                                ? "text-[#FF444A] text-lg font-bold"
                                                : ""
                                    }
                                >
                                    Profile
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

export default EmployeeDashboard;