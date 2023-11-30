import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const MyEmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/all-users`);
            return res.data;
        }
    })

    const handleRemove = _id => {
        console.log(_id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/api/v1/remove-employee/${_id}?email=${user?.email}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Employee has been removed',
                                'success'
                            )
                            refetch();
                        }
                    })
            }
        })
    }

    return (
        <>
            <Helmet>
                <title>My Employee List | DigitalHub</title>
            </Helmet>
            <div className="mb-11 md:ml-11">
                <h3 className="text-3xl font-bold mb-11">My Employee List</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image of the Member</th>
                                <th>Name of the Member</th>
                                <th>Member Type</th>
                                <th>Remove from Team</th>
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
                                    <td>
                                        <button onClick={() => handleRemove(user._id)} className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyEmployeeList;