import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

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

    const { loading, user } = useSelector(
        (store) => store.auth
    );

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

        if (!input.fullname.trim()) {
            toast.error("Please enter your full name.");
            return;
        }

        if (!input.email.trim()) {
            toast.error("Please enter your email.");
            return;
        }

        if (!input.phoneNumber.trim()) {
            toast.error(
                "Please enter your phone number."
            );
            return;
        }

        if (!input.password) {
            toast.error("Please enter your password.");
            return;
        }

        if (!input.role) {
            toast.error("Please select your role.");
            return;
        }

        const formData = new FormData();

        formData.append(
            "fullname",
            input.fullname
        );

        formData.append(
            "email",
            input.email
        );

        formData.append(
            "phoneNumber",
            input.phoneNumber
        );

        formData.append(
            "password",
            input.password
        );

        formData.append(
            "role",
            input.role
        );

        if (input.file) {
            formData.append(
                "file",
                input.file
            );
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
                toast.success(
                    res.data.message ||
                        "Signup successful!"
                );

                navigate("/login", {
                    replace: true,
                });
            } else {
                toast.error(
                    res.data?.message ||
                        "Signup failed."
                );
            }
        } catch (error) {
            console.log(
                "Signup Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                    "Signup failed."
            );
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/", {
                replace: true,
            });
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* ================= SIGNUP CONTAINER ================= */}

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
                        Sign Up
                    </h1>

                    {/* ================= FULL NAME ================= */}

                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={
                                changeEventHandler
                            }
                            placeholder="Anupam Singh"
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

                    {/* ================= EMAIL ================= */}

                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={
                                changeEventHandler
                            }
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

                    {/* ================= PHONE ================= */}

                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={
                                changeEventHandler
                            }
                            placeholder="7223806163"
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
                            onChange={
                                changeEventHandler
                            }
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
                                    required
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

                    {/* ================= PROFILE IMAGE ================= */}

                    <div className="my-4">
                        <label className="block mb-2 font-medium">
                            Profile
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={
                                changeFileHandler
                            }
                            className="
                                block
                                w-full
                                max-w-full
                                cursor-pointer
                                text-sm
                                border
                                border-gray-300
                                rounded-md
                                p-2
                                overflow-hidden
                            "
                        />
                    </div>

                    {/* ================= SIGNUP BUTTON ================= */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            my-4
                            flex
                            items-center
                            justify-center
                            bg-[#6A38C2]
                            hover:bg-[#5b2fa8]
                            disabled:bg-gray-400
                            text-white
                            py-2.5
                            rounded-md
                            transition
                            cursor-pointer
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    className="mr-2 h-4 w-4 animate-spin"
                                />

                                Please wait...
                            </>
                        ) : (
                            "Signup"
                        )}
                    </button>

                    {/* ================= LOGIN ================= */}

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