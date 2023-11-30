import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyTeam = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/all-users`);
            return res.data;
        }
    })

    return (
        <>
            <Helmet>
                <title>My Team | DigitalHub</title>
            </Helmet>
            <div className="mb-11 md:ml-11">
                <h3 className="text-3xl font-bold mb-11">Team Member List</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image of the Member</th>
                                <th>Name of the Member</th>
                                <th>Member Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => <tr key={user._id}>
                                    <th>
                                        <img className="rounded-full w-9 h-9 ml-11" src={user.photoURL} alt="Image" />
                                    </th>
                                    <td>{user.name}</td>
                                    <td>{user.role || 'employee'}</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyTeam;