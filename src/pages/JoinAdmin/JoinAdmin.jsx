import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from './../../hooks/useAxiosPublic';
import { updateProfile } from "firebase/auth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinAdmin = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser } = useAuth();

    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    console.log('Location in the join as HR/admin page', location);

    const onSubmit = async (data) => {
        // Reset error and success
        setRegisterError('');
        setSuccess('');

        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        if (res.data.success) {
            createUser(data.email, data.password)
                .then(result => {
                    console.log(result.user);

                    updateProfile(result.user, {
                        displayName: data.name,
                        photoURL: data.photo
                    })
                        .then(() => {
                            console.log('Profile updated');

                            const saveUser = {
                                name: data.name,
                                photoURL: data.photoURL,
                                companyName: data.companyName, companyLogo: res.data.data.display_url,
                                email: data.email,
                                dob: data.dob,
                                packageName: data.packageName,
                                packagePrice: data.packagePrice,
                                role: 'admin'
                            };

                            axiosPublic.put(`/api/v1/users/${data.email}`, saveUser)
                                .then(res => {
                                    console.log(res.data);
                                    reset();
                                    setSuccess('Signed up Successfully');
                                })

                            navigate('/payment', { replace: true });
                        })
                        .catch(error => {
                            console.error(error);
                            setRegisterError(error.message);
                        })
                })
        }
        // console.log('Data with image URL', res.data);
    }

    return (
        <>
            <Helmet>
                <title>Join as HR/Admin | DigitalHub</title>
            </Helmet>
            <div className="my-10 px-9 py-5 bg-base-200">
                <h2 className="text-3xl mt-7 mb-10 text-center">Join as HR/Admin</h2>
                <form onSubmit={handleSubmit(onSubmit)} className=" md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Full Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Type full name" className="input input-bordered" />
                        {errors.name && <span className="text-red-500 text-right">Full Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Photo URL</span>
                        </label>
                        <input type="text" {...register("photoURL", { required: true })} placeholder="Enter photo URL" className="input input-bordered" />
                        {errors.photoURL && <span className="text-red-500 text-right">Photo URL is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Company Name</span>
                        </label>
                        <input type="text" {...register("companyName", { required: true })} placeholder="Type company name" className="input input-bordered" />
                        {errors.companyName && <span className="text-red-500 text-right">Company Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Company Logo</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input input-bordered" />
                        {errors.image && <span className="text-red-500 text-right">Company Logo is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        })} placeholder="Type email" className="input input-bordered" />
                        {errors.email?.type === 'required' && <span className="text-red-500 text-right">Email is required</span>}
                        {errors.email?.type === 'pattern' && <span className="text-red-500">Please write a valid email</span>}
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <input type={showPassword ? "text" : "password"} {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 19,
                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!()\-_{}[\]:;"'<>,.?/\\|]).*$/
                        })} placeholder="Enter password" className="input input-bordered" />
                        <span className="absolute top-12 right-5 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? 'Hide' : 'Show'
                            }

                        </span>
                        {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500">Password should be at least 6 characters or longer</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-500">Password should be less than 19 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-500">Password should have at least one upper case, one lower case, one number and one special character</p>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Date of Birth</span>
                        </label>
                        <input type="date" {...register("dob", { required: true })} placeholder="Select date of birth" className="input input-bordered" />
                        {errors.dob && <span className="text-red-500 text-right">Date of Birth is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Package</span>
                        </label>
                        <select {...register("packageName", { required: true })} className="select select-bordered">
                            <option disabled selected>Select a package</option>
                            <option>5 Members for $5</option>
                            <option>10 Members for $8</option>
                            <option>20 Members for $15</option>
                        </select>
                        {errors.packageName && <span className="text-red-500 text-right">Package is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Selected Package Price</span>
                        </label>
                        <input type="number" {...register("packagePrice", { required: true })} placeholder="Enter selected package price" className="input input-bordered" />
                        {errors.packagePrice && <span className="text-red-500 text-right">Selected Package Price is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn text-white bg-[#FF444A] hover:bg-[#FF444A] text-base normal-case">Sign up</button>
                    </div>
                </form>
                {
                    registerError && <p className="text-red-500 text-right">{registerError}</p>
                }
                {
                    success && <p className="text-green-500 text-right">{success}</p>
                }
                <p className="text-center mt-4 mb-11">Already joined as HR/admin? <Link className="text-[#FF444A] font-bold" to="/login">Login</Link></p>
            </div>
        </>
    );
};

export default JoinAdmin;