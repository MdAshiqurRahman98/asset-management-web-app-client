import { useState } from 'react';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';

const UpdateAsset = () => {
    const [productTypeValue, setProductTypeValue] = useState("");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const product = useLoaderData();
    const { _id, email, productName, productType, productQuantity } = product || {};

    const handleProductType = event => {
        console.log(event.target.value);
        setProductTypeValue(event.target.value);
    };

    const handleUpdateAsset = event => {
        event.preventDefault();

        const form = event.target;

        const email = form.email.value;
        const productName = form.productName.value;
        const productType = form.productType.value;
        const productQuantity = form.productQuantity.value;

        const updatedProduct = { email, productName, productType, productQuantity };

        console.log(updatedProduct);

        // Send data to the server
        axiosSecure.patch(`/api/v1/update-product/${_id}?email=${user?.email}`, updatedProduct)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Asset Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    form.reset();
                }
            })
    }

    return (
        <>
            <Helmet>
                <title>Add an Asset | DigitalHub</title>
            </Helmet>
            <div className="mb-11 ml-11">
                <h3 className="text-3xl font-bold mb-11">Add an Asset</h3>
                <form onSubmit={handleUpdateAsset}>
                    {/* form email and product name row */}
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <label className="input-group">
                                <input type="email" name="email" placeholder="Enter email address" defaultValue={email} className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="productName" placeholder="Type product name" defaultValue={productName} className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    {/* form product type and product quantity row */}
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text">Asset Type</span>
                            </label>
                            <label className='input-group'>
                                <select value={productTypeValue} onChange={handleProductType} name="productType" id="" defaultValue={productType} className="input input-bordered w-full">
                                    <option value="Returnable">Returnable</option>
                                    <option value="Non-returnable">Non-returnable</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Product Quantity</span>
                            </label>
                            <label className="input-group">
                                <input type="number" name="productQuantity" placeholder="Enter product quantity" defaultValue={productQuantity} className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Update Asset" className="btn btn-block text-white bg-[#FF444A] hover:bg-[#FF444A] normal-case" />
                </form>
            </div>
        </>
    );
};

export default UpdateAsset;