import { useState } from 'react';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateCustomRequest = () => {
    const [assetTypeValue, setAssetTypeValue] = useState("");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const asset = useLoaderData();
    const { _id, email, assetName, assetPrice, assetType, assetImage, whyNeeded, additionalInfo } = asset || {};

    const handleAssetType = event => {
        console.log(event.target.value);
        setAssetTypeValue(event.target.value);
    };

    const handleUpdateCustomRequest = event => {
        event.preventDefault();

        const form = event.target;

        const email = form.email.value;
        const assetName = form.assetName.value;
        const assetPrice = form.assetPrice.value;
        const assetType = form.assetType.value;
        const assetImage = form.assetImage.value;
        const whyNeeded = form.whyNeeded.value;
        const additionalInfo = form.additionalInfo.value;

        const updatedAsset = { email, assetName, assetPrice, assetType, assetImage, whyNeeded, additionalInfo };

        console.log(updatedAsset);

        // Send data to the server
        axiosSecure.patch(`/api/v1/update-asset/${_id}?email=${user?.email}`, updatedAsset)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Request Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            })
    }

    return (
        <>
            <Helmet>
                <title>Update Custom Request | DigitalHub</title>
            </Helmet>
            <div className="mb-11 md:ml-11">
                <h3 className="text-3xl font-bold mb-11">Update Custom Request</h3>
                <form onSubmit={handleUpdateCustomRequest}>
                    {/* form email and asset name row */}
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
                                <span className="label-text">Asset Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="assetName" placeholder="Type asset name" defaultValue={assetName} className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    {/* form price and asset type row */}
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <label className="input-group">
                                <input type="number" name="assetPrice" placeholder="Enter asset price" defaultValue={assetPrice} className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Asset Type</span>
                            </label>
                            <label className='input-group'>
                                <select value={assetTypeValue} onChange={handleAssetType} name="assetType" id="" defaultValue={assetType} className="input input-bordered w-full">
                                    <option value="Returnable">Returnable</option>
                                    <option value="Non-returnable">Non-returnable</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    {/* form asset image and why you need this row */}
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text">Asset Image</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="assetImage" placeholder="Enter asset image URL" defaultValue={assetImage} className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Why you need this</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="whyNeeded" placeholder="Type why you need this asset" defaultValue={whyNeeded} className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    {/* form additional information row */}
                    <div className="mb-8">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Additional Information</span>
                            </label>
                            <textarea name="additionalInfo" placeholder="Type additional information" defaultValue={additionalInfo} className="textarea textarea-bordered h-32 w-full"></textarea>
                        </div>
                    </div>
                    <input type="submit" value="Update Request" className="btn btn-block text-white bg-[#FF444A] hover:bg-[#FF444A] normal-case" />
                </form>
            </div>
        </>
    );
};

export default UpdateCustomRequest;