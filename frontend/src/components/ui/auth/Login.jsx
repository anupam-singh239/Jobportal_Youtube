import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                navigate("/");
                dispatch(setUser(res.data.user));
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
            console.log(
                error.response?.data?.message || "Login failed"
            );
        } finally {
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
                        Login
                    </h1>

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
                    {
                        loading ? <button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait </button> : <button
                            type="submit"
                            className="w-full bg-[#6A38C2] hover:bg-[#5b2fa8] text-white py-2 rounded-md"
                        >
                            Login
                        </button>
                    }

                    {/* Login Button */}


                    {/* Signup */}
                    <p className="mt-4 text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-600 hover:underline"
                        >
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;