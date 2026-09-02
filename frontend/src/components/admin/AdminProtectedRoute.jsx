import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL =
    "https://jobportal-youtube-8f7p.onrender.com";

const AdminProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminAuth = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/api/v1/admin/stats`,
                    {
                        withCredentials: true,
                    }
                );

                console.log(
                    "Admin Auth Response:",
                    res.data
                );

                if (res.data?.success) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error(
                    "Admin authentication failed:",
                    error
                );

                console.error(
                    "Status:",
                    error.response?.status
                );

                console.error(
                    "Response:",
                    error.response?.data
                );

                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminAuth();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-gray-600">
                        Checking admin authentication...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <Navigate
                to="/admin-login"
                replace
            />
        );
    }

    return children;
};

export default AdminProtectedRoute;