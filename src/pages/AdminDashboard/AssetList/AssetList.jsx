import { Helmet } from "react-helmet-async";
import useProduct from "../../../hooks/useProduct";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const AssetList = () => {
    const [products, refetch] = useProduct();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const handleDelete = _id => {
        console.log(_id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/api/v1/delete-product/${_id}?email=${user?.email}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Product has been deleted',
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
                <title>Asset List | DigitalHub</title>
            </Helmet>
            <div className="mb-11 md:ml-11">
                <h3 className="text-3xl font-bold mb-11">Asset List</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Product Quantity</th>
                                <th>Date Added</th>
                                <th>Update Product</th>
                                <th>Delete Product</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product) => <tr key={product._id}>
                                    <th>{product.productName}</th>
                                    <td>{product.productType}</td>
                                    <td>{product.productQuantity}</td>
                                    <td>{product.timestamp}</td>
                                    <td>
                                        <Link to={`/dashboard/update-product/${product._id}`}>
                                            <button className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Update</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(product._id)} className="btn btn-sm normal-case text-white bg-[#FF444A] hover:bg-[#FF444A]">Delete</button>
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

export default AssetList;