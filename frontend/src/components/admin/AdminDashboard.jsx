import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Building2,
    BriefcaseBusiness,
    Users,
    FileText,
    User,
    LogOut,
    Menu,
    X,
    MoreVertical,
    CalendarDays,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

import toast from "react-hot-toast";

// =====================================================
// API BASE URL
// =====================================================

const API_BASE_URL =
    "https://jobportal-youtube-8f7p.onrender.com";

// =====================================================
// ADMIN DASHBOARD
// =====================================================

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        companies: 0,
        jobs: 0,
        users: 0,
        applications: 0,
    });

    const [recentCompanies, setRecentCompanies] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);

    // =====================================================
    // FETCH DASHBOARD DATA
    // =====================================================

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${API_BASE_URL}/api/v1/admin/stats`,
                {
                    withCredentials: true,
                }
            );

            console.log(
                "Dashboard API Response:",
                res.data
            );

            if (res.data?.success) {
                setStats(
                    res.data.stats || {
                        companies: 0,
                        jobs: 0,
                        users: 0,
                        applications: 0,
                    }
                );

                setRecentCompanies(
                    res.data.recentCompanies || []
                );

                setRecentJobs(
                    res.data.recentJobs || []
                );

                setRecentUsers(
                    res.data.recentUsers || []
                );
            } else {
                toast.error(
                    res.data?.message ||
                        "Failed to load dashboard."
                );
            }
        } catch (error) {
            console.error(
                "Dashboard Error:",
                error
            );

            console.error(
                "Dashboard Status:",
                error.response?.status
            );

            console.error(
                "Dashboard Response:",
                error.response?.data
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                toast.error(
                    "Admin session expired. Please login again."
                );

                navigate("/admin-login", {
                    replace: true,
                });
            } else {
                toast.error(
                    error.response?.data?.message ||
                        "Failed to load dashboard."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // USE EFFECT
    // =====================================================

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = async () => {
        try {
            await axios.post(
                `${API_BASE_URL}/api/v1/admin/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            toast.success(
                "Admin logout successful."
            );

            navigate("/admin-login", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Logout Error:",
                error
            );

            navigate("/admin-login", {
                replace: true,
            });
        }
    };

    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =====================================================
    // NAVIGATION HELPER
    // =====================================================

    const goTo = (path) => {
        setSidebarOpen(false);
        navigate(path);
    };

    // =====================================================
    // SIDEBAR
    // =====================================================

    const Sidebar = () => (
        <aside
            className={`
                fixed
                left-0
                top-0
                z-50
                h-screen
                w-64
                bg-[#0f1b2d]
                text-white
                transform
                transition-transform
                duration-300
                lg:translate-x-0
                ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }
            `}
        >
            {/* LOGO */}

            <div className="h-20 flex items-center px-6 border-b border-white/10">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <ShieldCheck size={25} />
                </div>

                <span className="text-2xl font-bold ml-3">
                    JobPortal
                </span>

                <button
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    className="ml-auto lg:hidden"
                >
                    <X size={24} />
                </button>
            </div>

            {/* MENU */}

            <div className="px-4 py-6 space-y-2">

                {/* DASHBOARD */}

                <button
                    onClick={() => goTo("/admin-dashboard")}
                    className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        bg-blue-600
                        text-white
                    "
                >
                    <LayoutDashboard size={21} />
                    <span>Dashboard</span>
                </button>

                {/* COMPANIES */}

                <button
                    onClick={() => goTo("/admin/companies")}
                    className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        hover:bg-white/10
                        transition
                    "
                >
                    <Building2 size={21} />
                    <span>Companies</span>
                </button>

                {/* JOBS */}

                <button
                    onClick={() => goTo("/admin/jobs")}
                    className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        hover:bg-white/10
                        transition
                    "
                >
                    <BriefcaseBusiness size={21} />
                    <span>Jobs</span>
                </button>

                {/* USERS */}

                <button
                    onClick={() =>
                        toast("Users page is not created yet.")
                    }
                    className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        hover:bg-white/10
                        transition
                    "
                >
                    <Users size={21} />
                    <span>Users</span>
                </button>

                {/* APPLICATIONS */}

                <button
                    onClick={() =>
                        toast(
                            "Applications page is not created yet."
                        )
                    }
                    className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        hover:bg-white/10
                        transition
                    "
                >
                    <FileText size={21} />
                    <span>Applications</span>
                </button>

                {/* PROFILE */}

                <button
                    onClick={() => goTo("/profile")}
                    className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        hover:bg-white/10
                        transition
                    "
                >
                    <User size={21} />
                    <span>Profile</span>
                </button>

                {/* LOGOUT */}

                <button
                    onClick={handleLogout}
                    className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        hover:bg-red-500/20
                        text-red-300
                        transition
                        mt-8
                    "
                >
                    <LogOut size={21} />
                    <span>Logout</span>
                </button>
            </div>

            {/* ADMIN PROFILE */}

            <div
                className="
                    absolute
                    bottom-5
                    left-4
                    right-4
                    bg-white/10
                    rounded-xl
                    p-3
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            w-11
                            h-11
                            rounded-full
                            bg-gray-200
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <User
                            className="text-gray-600"
                            size={24}
                        />
                    </div>

                    <div className="overflow-hidden">
                        <p className="font-semibold text-sm">
                            Super Admin
                        </p>

                        <p className="text-xs text-gray-300 truncate">
                            Admin Account
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="
                            w-10
                            h-10
                            border-4
                            border-blue-600
                            border-t-transparent
                            rounded-full
                            animate-spin
                            mx-auto
                        "
                    />

                    <p className="mt-4 text-gray-500">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    // =====================================================
    // MAIN DASHBOARD
    // =====================================================

    return (
        <div className="min-h-screen bg-[#f5f7fb]">

            <Sidebar />

            {/* MOBILE OVERLAY */}

            {sidebarOpen && (
                <div
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        z-40
                        lg:hidden
                    "
                />
            )}

            {/* MAIN AREA */}

            <div className="lg:ml-64">

                {/* HEADER */}

                <header
                    className="
                        h-20
                        bg-white
                        border-b
                        flex
                        items-center
                        justify-between
                        px-4
                        sm:px-6
                        lg:px-8
                    "
                >
                    <div className="flex items-center gap-4">

                        <button
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                            className="lg:hidden"
                        >
                            <Menu size={26} />
                        </button>

                        <h1
                            className="
                                text-xl
                                sm:text-2xl
                                font-bold
                                text-gray-800
                            "
                        >
                            Admin Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                w-10
                                h-10
                                rounded-full
                                bg-gray-100
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <User
                                size={21}
                                className="text-gray-600"
                            />
                        </div>

                        <div className="hidden sm:block">
                            <p className="font-semibold text-sm">
                                Super Admin
                            </p>
                        </div>
                    </div>
                </header>

                {/* CONTENT */}

                <main className="p-4 sm:p-6 lg:p-8">

                    {/* WELCOME */}

                    <div
                        className="
                            bg-white
                            border
                            rounded-2xl
                            p-5
                            sm:p-7
                            mb-6
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            md:justify-between
                            gap-4
                        "
                    >
                        <div>

                            <h2
                                className="
                                    text-xl
                                    sm:text-2xl
                                    font-bold
                                    text-gray-800
                                "
                            >
                                Welcome back, Super Admin! 👋
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Here's what's happening with
                                your job portal.
                            </p>

                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-gray-500
                                text-sm
                            "
                        >
                            <CalendarDays size={19} />

                            {new Date().toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}
                        </div>
                    </div>

                    {/* STAT CARDS */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            xl:grid-cols-4
                            gap-5
                            mb-6
                        "
                    >

                        {/* COMPANIES */}

                        <button
                            onClick={() =>
                                goTo("/admin/companies")
                            }
                            className="text-left bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Companies
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        {stats.companies}
                                    </h3>

                                    <p className="text-sm text-green-600 mt-2">
                                        Companies added
                                    </p>
                                </div>

                                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <Building2
                                        size={28}
                                        className="text-blue-600"
                                    />
                                </div>

                            </div>
                        </button>

                        {/* JOBS */}

                        <button
                            onClick={() =>
                                goTo("/admin/jobs")
                            }
                            className="text-left bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Jobs Posted
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        {stats.jobs}
                                    </h3>

                                    <p className="text-sm text-green-600 mt-2">
                                        Jobs available
                                    </p>
                                </div>

                                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                                    <BriefcaseBusiness
                                        size={28}
                                        className="text-green-600"
                                    />
                                </div>

                            </div>
                        </button>

                        {/* USERS */}

                        <div className="bg-white rounded-2xl border p-5 shadow-sm">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Users
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        {stats.users}
                                    </h3>

                                    <p className="text-sm text-green-600 mt-2">
                                        Registered users
                                    </p>
                                </div>

                                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <Users
                                        size={28}
                                        className="text-purple-600"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* APPLICATIONS */}

                        <div className="bg-white rounded-2xl border p-5 shadow-sm">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Applications
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        {stats.applications}
                                    </h3>

                                    <p className="text-sm text-green-600 mt-2">
                                        Applications received
                                    </p>
                                </div>

                                <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center">
                                    <TrendingUp
                                        size={28}
                                        className="text-orange-500"
                                    />
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* LOWER SECTION */}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                        {/* RECENT COMPANIES */}

                        <div className="bg-white rounded-2xl border shadow-sm">

                            <div className="p-5 border-b flex items-center justify-between">

                                <h3 className="text-lg font-bold text-gray-800">
                                    Recent Companies
                                </h3>

                                <button
                                    onClick={() =>
                                        goTo(
                                            "/admin/companies"
                                        )
                                    }
                                    className="text-sm text-blue-600 font-medium hover:underline"
                                >
                                    View All
                                </button>

                            </div>

                            <div className="p-5">

                                {recentCompanies.length ===
                                0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        No companies found.
                                    </p>
                                ) : (
                                    recentCompanies.map(
                                        (company) => (
                                            <div
                                                key={
                                                    company._id
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-4
                                                    py-3
                                                    border-b
                                                    last:border-b-0
                                                "
                                            >

                                                <div
                                                    className="
                                                        w-11
                                                        h-11
                                                        rounded-xl
                                                        border
                                                        bg-gray-50
                                                        flex
                                                        items-center
                                                        justify-center
                                                        overflow-hidden
                                                    "
                                                >
                                                    {company.logo ? (
                                                        <img
                                                            src={
                                                                company.logo
                                                            }
                                                            alt={
                                                                company.name ||
                                                                "Company"
                                                            }
                                                            className="w-full h-full object-contain"
                                                        />
                                                    ) : (
                                                        <Building2
                                                            size={
                                                                22
                                                            }
                                                            className="text-gray-400"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">

                                                    <p className="font-semibold text-gray-800 truncate">
                                                        {
                                                            company.name
                                                        }
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        Joined on{" "}
                                                        {formatDate(
                                                            company.createdAt
                                                        )}
                                                    </p>

                                                </div>

                                                <MoreVertical
                                                    size={20}
                                                    className="text-gray-400"
                                                />

                                            </div>
                                        )
                                    )
                                )}

                            </div>
                        </div>

                        {/* RECENT USERS */}

                        <div className="bg-white rounded-2xl border shadow-sm">

                            <div className="p-5 border-b flex items-center justify-between">

                                <h3 className="text-lg font-bold text-gray-800">
                                    Recent Users
                                </h3>

                                <button
                                    onClick={() =>
                                        toast(
                                            "Users page is not created yet."
                                        )
                                    }
                                    className="text-sm text-blue-600 font-medium hover:underline"
                                >
                                    View All
                                </button>

                            </div>

                            <div className="p-5">

                                {recentUsers.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        No users found.
                                    </p>
                                ) : (
                                    recentUsers.map(
                                        (user) => (
                                            <div
                                                key={user._id}
                                                className="
                                                    flex
                                                    items-center
                                                    gap-4
                                                    py-3
                                                    border-b
                                                    last:border-b-0
                                                "
                                            >

                                                <div
                                                    className="
                                                        w-11
                                                        h-11
                                                        rounded-full
                                                        bg-gray-100
                                                        flex
                                                        items-center
                                                        justify-center
                                                        overflow-hidden
                                                    "
                                                >
                                                    {user.profile
                                                        ?.profilePhoto ? (
                                                        <img
                                                            src={
                                                                user
                                                                    .profile
                                                                    .profilePhoto
                                                            }
                                                            alt={
                                                                user.fullname ||
                                                                "User"
                                                            }
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <User
                                                            size={
                                                                22
                                                            }
                                                            className="text-gray-500"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">

                                                    <p className="font-semibold text-gray-800 truncate">
                                                        {user.fullname ||
                                                            "User"}
                                                    </p>

                                                    <p className="text-sm text-gray-500 truncate">
                                                        {user.email ||
                                                            ""}
                                                    </p>

                                                </div>

                                                <span
                                                    className="
                                                        hidden
                                                        sm:block
                                                        text-xs
                                                        bg-gray-100
                                                        px-2
                                                        py-1
                                                        rounded-full
                                                        text-gray-600
                                                    "
                                                >
                                                    {user.role ||
                                                        "User"}
                                                </span>

                                            </div>
                                        )
                                    )
                                )}

                            </div>
                        </div>

                        {/* RECENT JOBS */}

                        <div
                            className="
                                bg-white
                                rounded-2xl
                                border
                                shadow-sm
                                xl:col-span-2
                            "
                        >

                            <div className="p-5 border-b flex items-center justify-between">

                                <h3 className="text-lg font-bold text-gray-800">
                                    Recent Jobs
                                </h3>

                                <button
                                    onClick={() =>
                                        goTo("/admin/jobs")
                                    }
                                    className="text-sm text-blue-600 font-medium hover:underline"
                                >
                                    View All
                                </button>

                            </div>

                            <div className="p-5">

                                {recentJobs.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        No jobs found.
                                    </p>
                                ) : (
                                    recentJobs.map(
                                        (job) => (
                                            <div
                                                key={job._id}
                                                className="
                                                    flex
                                                    items-center
                                                    gap-4
                                                    py-4
                                                    border-b
                                                    last:border-b-0
                                                "
                                            >

                                                <div
                                                    className="
                                                        w-11
                                                        h-11
                                                        rounded-xl
                                                        border
                                                        bg-gray-50
                                                        flex
                                                        items-center
                                                        justify-center
                                                        overflow-hidden
                                                        shrink-0
                                                    "
                                                >
                                                    {job.company
                                                        ?.logo ? (
                                                        <img
                                                            src={
                                                                job
                                                                    .company
                                                                    .logo
                                                            }
                                                            alt={
                                                                job
                                                                    .company
                                                                    .name ||
                                                                "Company"
                                                            }
                                                            className="w-full h-full object-contain"
                                                        />
                                                    ) : (
                                                        <BriefcaseBusiness
                                                            size={
                                                                22
                                                            }
                                                            className="text-gray-400"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">

                                                    <p className="font-semibold text-gray-800 truncate">
                                                        {job.title ||
                                                            "Untitled Job"}
                                                    </p>

                                                    <p className="text-sm text-gray-500 truncate">
                                                        {job
                                                            .company
                                                            ?.name ||
                                                            "Company"}
                                                        {" • "}
                                                        {job.jobType ||
                                                            "Job"}
                                                    </p>

                                                </div>

                                                <p
                                                    className="
                                                        hidden
                                                        sm:block
                                                        text-sm
                                                        text-gray-500
                                                        whitespace-nowrap
                                                    "
                                                >
                                                    {formatDate(
                                                        job.createdAt
                                                    )}
                                                </p>

                                                <MoreVertical
                                                    size={20}
                                                    className="text-gray-400"
                                                />

                                            </div>
                                        )
                                    )
                                )}

                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;