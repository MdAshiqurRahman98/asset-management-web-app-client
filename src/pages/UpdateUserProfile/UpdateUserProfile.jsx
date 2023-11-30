import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateUserProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const singleUser = useLoaderData();
    const { _id, email, name, dob, photoURL } = singleUser || {};

    const handleUpdateUserProfile = event => {
        event.preventDefault();

        const form = event.target;

        const email = form.email.value;
        const name = form.name.value;
        const dob = form.dob.value;
        const photoURL = form.photoURL.value;

        const updatedUserProfile = { email, name, dob, photoURL };

        console.log(updatedUserProfile);

        // Send data to the server
        axiosSecure.patch(`/api/v1/update-user-profile/${_id}?email=${user?.email}`, updatedUserProfile)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Profile Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            })
    }

    return (
        <>
            <Helmet>
                <title>Update User Profile | DigitalHub</title>
            </Helmet>
            <div className="mb-11 md:ml-11">
                <h3 className="text-3xl font-bold mb-11">Update Your Profile</h3>
                <form onSubmit={handleUpdateUserProfile}>
                    {/* form email and name row */}
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <label className="input-group">
                                <input type="email" name="email" placeholder="Enter email address" defaultValue={email} required className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="productName" placeholder="Type name" defaultValue={name} required className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    {/* form date of birth and photoURL row */}
                    <div className="md:flex mb-8">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text">Date of Birth</span>
                            </label>
                            <label className='input-group'>
                                <input type="date" name='dob' placeholder="Select date of birth" defaultValue={dob} className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="photoURL" placeholder="Enter photo URL" defaultValue={photoURL} className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Update" className="btn btn-block text-white bg-[#FF444A] hover:bg-[#FF444A] normal-case" />
                </form>
            </div>
        </>
    );
};

export default UpdateUserProfile;