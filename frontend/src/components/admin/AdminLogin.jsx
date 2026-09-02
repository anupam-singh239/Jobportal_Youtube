import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    Mail,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";


const API_BASE_URL = import.meta.env.DEV
    ? "http://localhost:8000"
    : "";


const AdminLogin = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const [showPassword, setShowPassword] =
        useState(false);


    const [loading, setLoading] =
        useState(false);


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    // ==========================================
    // LOGIN
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await axios.post(
                `${API_BASE_URL}/api/v1/admin/login`,
                formData,
                {
                    withCredentials: true,
                }
            );


            if (res.data.success) {

                toast.success(
                    "Admin login successful!"
                );

                navigate(
                    "/admin-dashboard"
                );
            }

        } catch (error) {

            console.error(
                "Admin Login Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Invalid admin credentials."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">


                {/* ================================= */}
                {/* LOGO */}
                {/* ================================= */}

                <div className="text-center mb-8">

                    <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">

                        <ShieldCheck
                            size={36}
                            className="text-white"
                        />

                    </div>


                    <h1 className="text-3xl font-bold text-gray-800 mt-5">
                        Super Admin
                    </h1>


                    <p className="text-gray-500 mt-2">
                        Login to your admin dashboard
                    </p>

                </div>


                {/* ================================= */}
                {/* LOGIN CARD */}
                {/* ================================= */}

                <div className="bg-white rounded-2xl shadow-xl p-7">


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
                                    required
                                    className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
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
                                    required
                                    className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition"
                        >

                            {loading
                                ? "Logging in..."
                                : "Admin Login"}

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};


export default AdminLogin;