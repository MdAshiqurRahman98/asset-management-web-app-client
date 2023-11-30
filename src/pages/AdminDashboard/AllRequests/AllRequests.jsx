import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllRequests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: assets = [], refetch } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/all-assets`);
            return res.data;
        }
    })

    const handleRequestApprove = _id => {
        axiosSecure.patch(`/api/v1/assets/request-approve/${_id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Request Approved Successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleRequestReject = _id => {
        axiosSecure.patch(`/api/v1/assets/request-reject/${_id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Request Rejected Successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <>
            <Helmet>
                <title>All Requests | DigitalHub</title>
            </Helmet>
            <div className="mb-11 md:ml-[9px]">
                <h3 className="text-3xl font-bold mb-11">All Requests</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Asset Type</th>
                                <th>Email of Requester</th>
                                <th>Request Date</th>
                                <th>Status</th>
                                <th>Request Approve</th>
                                <th>Request Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assets.map((asset) => <tr key={asset._id}>
                                    <th>{asset.assetName}</th>
                                    <td>{asset.assetType}</td>
                                    <td>{asset.email}</td>
                                    <td>{asset.timestamp}</td>
                                    <td>{asset.status}</td>
                                    <td>
                                        {
                                            asset.status === 'approved' ? 'Approved' : <button onClick={() => handleRequestApprove(asset._id)} disabled={asset.status === 'returned'} className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Approve</button>
                                        }
                                    </td>
                                    <td>
                                        {
                                            asset.status === 'rejected' ? 'Rejected' : <button onClick={() => handleRequestReject(asset._id)} disabled={asset.status === 'returned'} className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Reject</button>
                                        }
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

export default AllRequests;