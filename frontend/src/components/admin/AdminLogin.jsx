import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// ======================================================
// BACKEND API URL
// ======================================================

const API_BASE_URL =
    "https://jobportal-youtube-8f7p.onrender.com";

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

        // Check fields
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

            // ==================================================
            // ADMIN LOGIN API
            // ==================================================

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

            // ==================================================
            // SUCCESS
            // ==================================================

            if (res.data?.success) {

                toast.success(
                    "Admin login successful!"
                );

                // Go to admin dashboard
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

            // ==================================================
            // SERVER RESPONSE ERROR
            // ==================================================

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

            }

            // ==================================================
            // NETWORK ERROR
            // ==================================================

            else {

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

        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                {/* ==========================================
                    HEADER
                ========================================== */}

                <div className="text-center mb-8">

                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">

                        <Lock
                            className="text-blue-600"
                            size={30}
                        />

                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">

                        Admin Login

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Login to access admin dashboard

                    </p>

                </div>

                {/* ==========================================
                    LOGIN FORM
                ========================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* ======================================
                        EMAIL
                    ====================================== */}

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
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter admin email"
                                autoComplete="username"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />

                        </div>

                    </div>

                    {/* ======================================
                        PASSWORD
                    ====================================== */}

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
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter admin password"
                                autoComplete="current-password"
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />

                            {/* Show / Hide Password */}

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

                                    <EyeOff size={20} />

                                ) : (

                                    <Eye size={20} />

                                )}

                            </button>

                        </div>

                    </div>

                    {/* ======================================
                        LOGIN BUTTON
                    ====================================== */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition"
                    >

                        {loading
                            ? "Logging in..."
                            : "Admin Login"}

                    </button>

                </form>

            </div>

        </div>

    );

};

export default AdminLogin;