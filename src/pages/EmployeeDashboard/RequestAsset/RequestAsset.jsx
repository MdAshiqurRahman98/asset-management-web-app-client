import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const RequestAsset = () => {
    const axiosSecure = useAxiosSecure();

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/all-products`);
            return res.data;
        }
    })

    return (
        <>
            <Helmet>
                <title>Request Asset | DigitalHub</title>
            </Helmet>
            <div className="mb-11 md:ml-11">
                <h3 className="text-3xl font-bold mb-11">Request Asset</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Asset Type</th>
                                <th>Availability</th>
                                <th>Make Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product) => <tr key={product._id}>
                                    <th>{product.productName}</th>
                                    <td>{product.productType}</td>
                                    <td>{product.productQuantity ? 'Available' : 'Out of stock'}</td>
                                    <td>
                                        <Link to={`/dashboard/make-custom-request`}>
                                            <button disabled={!product.productQuantity || product.productQuantity == '0'} className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Request</button>
                                        </Link>
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

export default RequestAsset;