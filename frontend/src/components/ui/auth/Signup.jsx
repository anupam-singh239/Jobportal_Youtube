import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: null,
    });

    const navigate = useNavigate();
    const {loading , user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files?.[0] || null,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `${USER_API_END_POINT}/register`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                navigate("/login");
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
            console.log(
                error.response?.data?.message || "Signup failed"
            );
            console.log("STATUS:", error.response?.status);
        } finally{
            dispatch(setLoading(false));
        }
    };
    useEffect(() =>{
            if(user){
                navigate("/");
            }
        })

    return (
        <div>
            <Navbar />

            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form
                    onSubmit={submitHandler}
                    className="w-1/2 border border-gray-200 rounded-md p-6 my-10"
                >
                    <h1 className="font-bold text-xl mb-5">
                        Sign Up
                    </h1>

                    {/* Full Name */}
                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Anupam Singh"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="anupam@gmail.com"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="7223806163"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Role
                        </label>

                        <div className="flex items-center gap-6">

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    required
                                />
                                Student
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                />
                                Recruiter
                            </label>

                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Profile
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className="w-full cursor-pointer"
                        />
                    </div>

                    {/* Signup Button */}
                    {
                        loading ? <button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait </button> : <button
                            type="submit"
                            className="w-full bg-[#6A38C2] hover:bg-[#5b2fa8] text-white py-2 rounded-md"
                        >
                            Signup
                        </button>
                    }

                    {/* Login Link */}
                    <p className="mt-4 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;