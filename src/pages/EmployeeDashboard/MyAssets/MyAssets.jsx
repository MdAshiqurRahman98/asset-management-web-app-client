import { Helmet } from "react-helmet-async";
import useAsset from "../../../hooks/useAsset";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyAssets = () => {
    const [assets, refetch] = useAsset();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const handleCancel = _id => {
        console.log(_id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/api/v1/delete-asset/${_id}?email=${user?.email}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Cancelled!',
                                'Request has been cancelled',
                                'success'
                            )
                            refetch();
                        }
                    })
            }
        })
    }

    const handleRemove = _id => {
        console.log(_id);

        axiosSecure.delete(`/api/v1/remove-asset/${_id}?email=${user?.email}`)
            .then(res => {
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    Swal.fire(
                        'Removed!',
                        'Request has been removed',
                        'success'
                    )
                    refetch();
                }
            })
    }

    const handleReturn = _id => {
        axiosSecure.patch(`/api/v1/assets/return-asset/${_id}`)
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

    return (
        <>
            <Helmet>
                <title>My Assets | DigitalHub</title>
            </Helmet>
            <div className="mb-11 ml-11">
                <h3 className="text-3xl font-bold mb-11">My Assets</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Asset Type</th>
                                <th>Request Date</th>
                                <th>Approval Date</th>
                                <th>Request Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assets.map((asset) => <tr key={asset._id}>
                                    <th>{asset.assetName}</th>
                                    <td>{asset.assetType}</td>
                                    <td>{asset.timestamp}</td>
                                    <td>{asset.approvalDate}</td>
                                    <td>{asset.status}</td>
                                    <td>
                                        {
                                            asset.status === 'pending' ? <button onClick={() => handleCancel(asset._id)} className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Cancel</button> : asset.status === 'approved' && asset.assetType === 'Returnable' ? <button onClick={() => handleReturn(asset._id)} disabled={asset.status === 'returned'} className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Return</button> : asset.status === 'approved' ? <button className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Print</button> : <button onClick={() => handleRemove(asset._id)} className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Remove</button>
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

export default MyAssets;