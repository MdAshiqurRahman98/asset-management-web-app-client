import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const CustomRequestsList = () => {
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
                <title>Custom Requests List | DigitalHub</title>
            </Helmet>
            <div className="mb-11 ml-[9px]">
                <h3 className="text-3xl font-bold mb-11">Custom Requests List</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Price</th>
                                <th>Asset Type</th>
                                <th>Asset Image</th>
                                <th>Why Needed</th>
                                <th>Additional Information</th>
                                <th>Request Approve</th>
                                <th>Request Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assets.map((asset) => <tr key={asset._id}>
                                    <th>{asset.assetName}</th>
                                    <td>{asset.assetPrice}</td>
                                    <td>{asset.assetType}</td>
                                    <td>
                                        <img className="rounded-full w-9 h-9" src={asset.assetImage} alt="Image" />
                                    </td>
                                    <td>{asset.whyNeeded}</td>
                                    <td>{asset.additionalInfo}</td>
                                    <td>
                                        {
                                            asset.status === 'approved' ? 'Approved' : <button onClick={() => handleRequestApprove(asset._id)} className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Approve</button>
                                        }
                                    </td>
                                    <td>
                                        {
                                            asset.status === 'rejected' ? 'Rejected' : <button onClick={() => handleRequestReject(asset._id)} className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Reject</button>
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

export default CustomRequestsList;