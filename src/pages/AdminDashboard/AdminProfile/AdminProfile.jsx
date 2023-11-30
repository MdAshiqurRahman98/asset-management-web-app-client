import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/users/user-profile/${user.email}`);
            return res.data;
        }
    })

    return (
        <>
            <Helmet>
                <title>Admin Profile | DigitalHub</title>
            </Helmet>
            <div className="mb-11 md:ml-11 text-center">
                <h3 className="text-3xl font-bold mb-16">Your Profile</h3>
                <div className="overflow-x-auto">
                    {
                        users?.map((user) => <div key={user._id}>
                            <figure className="flex justify-center mb-7">
                                <img className="rounded-full w-32 h-32" src={user.photoURL} alt="Image" />
                            </figure>
                            <p className="text-xl font-semibold mb-1">{user.name}</p>
                            <p className="mb-1">{user.email}</p>
                            <p className="mb-7">{user.dob && `Date of Birth: ${user.dob}`}</p>
                            <Link to={`/dashboard/update-user-profile/${user._id}`}>
                                <button className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Update Profile</button>
                            </Link>
                        </div>)
                    }
                </div>
            </div>
        </>
    );
};

export default AdminProfile;