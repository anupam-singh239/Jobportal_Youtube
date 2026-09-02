import React, { useState } from "react";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// ======================================================
// BACKEND API URL
// ======================================================

const API_BASE_URL =
    "https://jobportal-youtube-8f7p.onrender.com";

// ======================================================
// JOB PORTAL LOGO
// Same logo as main Navbar.jsx
// ======================================================

const JobPortalLogo = () => {
    return (
        <svg
            width="48"
            height="42"
            viewBox="0 0 48 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Black Briefcase Handle */}
            <path
                d="M15 14V9C15 6.8 16.8 5 19 5H29C31.2 5 33 6.8 33 9V14"
                stroke="#111111"
                strokeWidth="4.5"
                strokeLinecap="round"
            />

            {/* Black Briefcase */}
            <path
                d="M7 14C7 11.8 8.8 10 11 10H37C39.2 10 41 11.8 41 14V30C41 32.2 39.2 34 37 34H11C8.8 34 7 32.2 7 30V14Z"
                fill="#111111"
            />

            {/* White Horizontal Strap */}
            <path
                d="M7 20H41"
                stroke="white"
                strokeWidth="3"
            />

            {/* White Center Lock */}
            <rect
                x="20"
                y="17"
                width="8"
                height="7"
                rx="1.5"
                fill="white"
            />

            {/* Red Career Growth Arrow */}
            <path
                d="M10 32C17 31 23 28 28 24C34 19 38 14 43 9"
                stroke="#F83002"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Red Arrow Head */}
            <path
                d="M37 9H43V15"
                stroke="#F83002"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

// ======================================================
// BRAND
// ======================================================

const JobPortalBrand = () => {
    return (
        <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center shrink-0">
                <JobPortalLogo />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Job{" "}
                <span className="text-[#F83002]">
                    Portal
                </span>
            </h1>
        </div>
    );
};

// ======================================================
// ADMIN LOGIN COMPONENT
// ======================================================

const AdminLogin = () => {
    const navigate = useNavigate();

    // ==================================================
    // FORM DATA
    // ==================================================

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // ==================================================
    // PASSWORD VISIBILITY
    // ==================================================

    const [showPassword, setShowPassword] =
        useState(false);

    // ==================================================
    // LOADING
    // ==================================================

    const [loading, setLoading] =
        useState(false);

    // ==================================================
    // HANDLE INPUT CHANGE
    // ==================================================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ==================================================
    // HANDLE LOGIN
    // ==================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.email.trim() ||
            !formData.password
        ) {
            toast.error(
                "Please enter email and password."
            );

            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${API_BASE_URL}/api/v1/admin/login`,
                {
                    email: formData.email.trim(),
                    password: formData.password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            if (res.data?.success) {
                toast.success(
                    "Admin login successful!"
                );

                navigate(
                    "/admin-dashboard",
                    {
                        replace: true,
                    }
                );
            } else {
                toast.error(
                    res.data?.message ||
                        "Admin login failed."
                );
            }
        } catch (error) {
            console.error(
                "Admin Login Error:",
                error
            );

            if (error.response) {
                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Response:",
                    error.response.data
                );

                toast.error(
                    error.response.data?.message ||
                        "Admin login failed."
                );
            } else {
                toast.error(
                    "Unable to connect to server."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // ======================================================
    // UI
    // ======================================================

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ==================================================
                TOP NAVBAR
            ================================================== */}

            <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">

                <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">

                    {/* LOGO */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/")
                        }
                        className="cursor-pointer flex items-center gap-2"
                    >
                        <JobPortalLogo />

                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                            Job{" "}
                            <span className="text-[#F83002]">
                                Portal
                            </span>
                        </h1>
                    </button>

                    {/* BACK TO HOME */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/")
                        }
                        className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-600 hover:text-[#F83002] transition"
                    >
                        <ArrowLeft size={18} />

                        <span className="hidden sm:block">
                            Back to Home
                        </span>
                    </button>

                </div>

            </div>

            {/* ==================================================
                LOGIN AREA
            ================================================== */}

            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10">

                <div className="w-full max-w-md">

                    {/* BRANDING */}

                    <div className="text-center mb-6">
                        <JobPortalBrand />
                    </div>

                    {/* LOGIN CARD */}

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">

                        {/* HEADER */}

                        <div className="text-center mb-8">

                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">

                                <Lock
                                    className="text-[#F83002]"
                                    size={30}
                                />

                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                Admin Login
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Login to access admin dashboard
                            </p>

                        </div>

                        {/* LOGIN FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* EMAIL */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Admin Email
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={20}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter admin email"
                                        autoComplete="username"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#F83002]/20 focus:border-[#F83002] transition"
                                        required
                                    />

                                </div>

                            </div>

                            {/* PASSWORD */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Admin Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={20}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={
                                            formData.password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter admin password"
                                        autoComplete="current-password"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#F83002]/20 focus:border-[#F83002] transition"
                                        required
                                    />

                                    {/* SHOW / HIDE */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff
                                                size={20}
                                            />
                                        ) : (
                                            <Eye
                                                size={20}
                                            />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* LOGIN BUTTON */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#F83002] hover:bg-[#d92800] disabled:bg-red-300 text-white font-semibold py-3 rounded-lg transition shadow-sm"
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Admin Login"}
                            </button>

                        </form>

                    </div>

                    {/* FOOTER */}

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Job Portal Admin Panel
                    </p>

                </div>

            </div>

        </div>
    );
};

export default AdminLogin;