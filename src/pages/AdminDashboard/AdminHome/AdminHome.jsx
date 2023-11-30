import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: assets = [] } = useQuery({
        queryKey: ['pendingAssets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/pending-assets`);
            return res.data;
        }
    })

    return (
        <>
            <Helmet>
                <title>Admin Home | DigitalHub</title>
            </Helmet>
            <div className="mb-11 md:ml-11">
                <h3 className="text-3xl font-bold mb-11">Pending Requests</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Asset Type</th>
                                <th>Asset Price</th>
                                <th>Status</th>
                                <th>Request Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assets.map((asset) => <tr key={asset._id}>
                                    <th>{asset.assetName}</th>
                                    <td>{asset.assetType}</td>
                                    <td>{asset.assetPrice}</td>
                                    <td>{asset.status}</td>
                                    <td>{asset.timestamp}</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminHome;