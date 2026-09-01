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

    const { loading, user } = useSelector(
        (store) => store.auth
    );

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
                dispatch(setUser(res.data.user));
                navigate("/");
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);

            console.log(
                error.response?.data?.message ||
                    "Login failed"
            );
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* ================= LOGIN CONTAINER ================= */}

            <div className="flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6">
                <form
                    onSubmit={submitHandler}
                    className="
                        w-full
                        sm:w-[90%]
                        md:w-1/2
                        lg:w-1/2
                        max-w-xl
                        border
                        border-gray-200
                        rounded-md
                        p-5
                        sm:p-6
                        my-6
                        sm:my-10
                    "
                >
                    <h1 className="font-bold text-xl mb-5">
                        Login
                    </h1>

                    {/* ================= EMAIL ================= */}

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
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-md
                                p-2.5
                                outline-none
                                focus:border-[#6A38C2]
                            "
                            required
                        />
                    </div>

                    {/* ================= PASSWORD ================= */}

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
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-md
                                p-2.5
                                outline-none
                                focus:border-[#6A38C2]
                            "
                            required
                        />
                    </div>

                    {/* ================= ROLE ================= */}

                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Role
                        </label>

                        <div className="flex items-center gap-5 sm:gap-6 flex-wrap">

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={
                                        input.role ===
                                        "student"
                                    }
                                    onChange={
                                        changeEventHandler
                                    }
                                />

                                <span>Student</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={
                                        input.role ===
                                        "recruiter"
                                    }
                                    onChange={
                                        changeEventHandler
                                    }
                                />

                                <span>Recruiter</span>
                            </label>

                        </div>
                    </div>

                    {/* ================= LOGIN BUTTON ================= */}

                    {loading ? (
                        <button
                            type="button"
                            disabled
                            className="
                                w-full
                                my-4
                                flex
                                items-center
                                justify-center
                                bg-gray-400
                                text-white
                                py-2
                                rounded-md
                            "
                        >
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                            Please wait
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="
                                w-full
                                bg-[#6A38C2]
                                hover:bg-[#5b2fa8]
                                text-white
                                py-2.5
                                rounded-md
                                transition
                            "
                        >
                            Login
                        </button>
                    )}

                    {/* ================= SIGNUP ================= */}

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