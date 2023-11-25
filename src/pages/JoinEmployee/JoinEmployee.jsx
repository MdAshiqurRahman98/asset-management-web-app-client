import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from './../../hooks/useAxiosPublic';

const JoinEmployee = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, signInWithGoogle, updateUserProfile } = useAuth();

    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    console.log('Location in the join as employee page', location);

    const onSubmit = async (data) => {
        // Reset error and success
        setRegisterError('');
        setSuccess('');

        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email };

                        axiosPublic.put(`/api/v1/users/${data.email}`, saveUser)
                            .then(res => {
                                if (res.data.modifiedCount > 0) {
                                    reset();
                                    setSuccess('Joined as Employee Successfully');
                                    navigate(location?.state ? location.state : '/', { replace: true });
                                }
                                else if (res.data.modifiedCount === 0) {
                                    reset();
                                    setSuccess('Already Joined as Employee');
                                    navigate(location?.state ? location.state : '/', { replace: true });
                                }
                            })
                    })
                    .catch(error => {
                        console.error(error);
                        setRegisterError(error.message);
                    })
            })
    }

    const handleGoogleSignUp = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);

                const saveUser = { name: result.user.displayName, email: result.user.email };

                axiosPublic.put(`/api/v1/users/${result.user.email}`, saveUser)
                    .then(res => {
                        if (res.data.message) {
                            setSuccess('Already Registered');
                            navigate(location?.state ? location.state : '/', { replace: true });
                        }
                        else {
                            setSuccess('Registered Successfully');
                            navigate(location?.state ? location.state : '/', { replace: true });
                        }
                    })
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })
    }

    return (
        <div>
            <Helmet>
                <title>Register | BlogHub</title>
            </Helmet>
            <h2 className="text-3xl my-10 text-center">Join as Employee</h2>
            <form onSubmit={handleSubmit(onSubmit)} className=" md:w-3/4 lg:w-1/2 mx-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Full Name</span>
                    </label>
                    <input type="text" {...register("fullName", { required: true })} placeholder="Type full name" className="input input-bordered" />
                    {errors.fullName && <span className="text-red-500 text-right">Full Name is required</span>}
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
                <div className="form-control mt-6">
                    <button className="btn text-white bg-orange-500 hover:bg-orange-500 text-base normal-case">Sign up</button>
                </div>
            </form>
            {
                registerError && <p className="text-red-500 text-right">{registerError}</p>
            }
            {
                success && <p className="text-green-500 text-right">{success}</p>
            }
            <p className="text-center mt-4">Already joined as employee? <Link className="text-orange-500 font-bold" to="/login">Login</Link></p>
            <p className="text-center mt-5 mb-7">--------- OR ---------</p>
            <p className="text-center mb-11"><button onClick={handleGoogleSignUp} className="btn btn-wide btn-outline rounded-3xl normal-case text-base hover:bg-white hover:text-black"><FcGoogle className="w-5 h-5 mt-1"></FcGoogle>Join with Google</button></p>
        </div>
    );
};

export default JoinEmployee;