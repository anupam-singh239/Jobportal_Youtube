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
    ArrowLeft,
    Camera,
    Plus,
} from "lucide-react";

import toast from "react-hot-toast";

// =====================================================
// API
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

    // Current section
    const [activeSection, setActiveSection] =
        useState("dashboard");

    // Selected company/job
    const [selectedCompany, setSelectedCompany] =
        useState(null);

    const [selectedJob, setSelectedJob] =
        useState(null);

    // =====================================================
    // STATS
    // =====================================================

    const [stats, setStats] = useState({
        companies: 0,
        jobs: 0,
        users: 0,
        applications: 0,
    });

    // =====================================================
    // RECENT DATA
    // Dashboard ke liye sirf recent 5
    // =====================================================

    const [recentCompanies, setRecentCompanies] =
        useState([]);

    const [recentJobs, setRecentJobs] =
        useState([]);

    const [recentUsers, setRecentUsers] =
        useState([]);

    // =====================================================
    // ALL DATA
    // Sidebar sections ke liye saare records
    // =====================================================

    const [companies, setCompanies] =
        useState([]);

    const [jobs, setJobs] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [applications, setApplications] =
        useState([]);

    const [sectionLoading, setSectionLoading] =
        useState(false);

    // =====================================================
    // PROFILE PHOTO
    // localStorage se photo refresh ke baad bhi rahegi
    // =====================================================

    const [profilePhoto, setProfilePhoto] =
        useState(
            () =>
                localStorage.getItem(
                    "adminProfilePhoto"
                ) || null
        );

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
    // FETCH ALL ADMIN DATA
    // =====================================================

    const fetchAllAdminData = async () => {
        try {
            setSectionLoading(true);

            const [
                companiesRes,
                jobsRes,
                usersRes,
                applicationsRes,
            ] = await Promise.all([
                axios.get(
                    `${API_BASE_URL}/api/v1/admin/companies`,
                    {
                        withCredentials: true,
                    }
                ),

                axios.get(
                    `${API_BASE_URL}/api/v1/admin/jobs`,
                    {
                        withCredentials: true,
                    }
                ),

                axios.get(
                    `${API_BASE_URL}/api/v1/admin/users`,
                    {
                        withCredentials: true,
                    }
                ),

                axios.get(
                    `${API_BASE_URL}/api/v1/admin/applications`,
                    {
                        withCredentials: true,
                    }
                ),
            ]);

            console.log(
                "All Companies:",
                companiesRes.data
            );

            console.log(
                "All Jobs:",
                jobsRes.data
            );

            console.log(
                "All Users:",
                usersRes.data
            );

            console.log(
                "All Applications:",
                applicationsRes.data
            );

            if (
                companiesRes.data?.success
            ) {
                setCompanies(
                    companiesRes.data.companies ||
                        []
                );
            }

            if (
                jobsRes.data?.success
            ) {
                setJobs(
                    jobsRes.data.jobs || []
                );
            }

            if (
                usersRes.data?.success
            ) {
                setUsers(
                    usersRes.data.users || []
                );
            }

            if (
                applicationsRes.data?.success
            ) {
                setApplications(
                    applicationsRes.data
                        .applications || []
                );
            }
        } catch (error) {
            console.error(
                "Fetch All Admin Data Error:",
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
                        "Failed to load admin data."
                );
            }
        } finally {
            setSectionLoading(false);
        }
    };

    // =====================================================
    // LOAD DATA
    // =====================================================

    useEffect(() => {
        fetchDashboardData();
        fetchAllAdminData();
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
    // SECTION CHANGE
    // =====================================================

    const openSection = (section) => {
        setActiveSection(section);

        setSelectedCompany(null);

        setSelectedJob(null);

        setSidebarOpen(false);
    };

    // =====================================================
    // COMPANY DETAILS
    // =====================================================

    const openCompany = (company) => {
        setSelectedCompany(company);

        setActiveSection(
            "company-details"
        );

        setSidebarOpen(false);
    };

    // =====================================================
    // JOB DETAILS
    // =====================================================

    const openJob = (job) => {
        setSelectedJob(job);

        setActiveSection(
            "job-details"
        );

        setSidebarOpen(false);
    };

    // =====================================================
    // PROFILE PHOTO
    // =====================================================

    const handleProfilePhoto = (event) => {
        const file =
            event.target.files?.[0];

        if (!file) return;

        if (
            !file.type.startsWith("image/")
        ) {
            toast.error(
                "Please select an image."
            );

            return;
        }

        if (
            file.size >
            2 * 1024 * 1024
        ) {
            toast.error(
                "Please select an image smaller than 2MB."
            );

            return;
        }

        const reader =
            new FileReader();

        reader.onloadend = () => {
            const imageURL =
                reader.result;

            setProfilePhoto(
                imageURL
            );

            localStorage.setItem(
                "adminProfilePhoto",
                imageURL
            );

            toast.success(
                "Profile photo changed successfully."
            );
        };

        reader.readAsDataURL(file);

        // Same file dobara select kar sake
        event.target.value = "";
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
                    onClick={() =>
                        openSection(
                            "dashboard"
                        )
                    }
                    className={`
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        transition
                        ${
                            activeSection ===
                            "dashboard"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-white/10"
                        }
                    `}
                >
                    <LayoutDashboard
                        size={21}
                    />

                    <span>
                        Dashboard
                    </span>
                </button>

                {/* COMPANIES */}

                <button
                    onClick={() =>
                        openSection(
                            "companies"
                        )
                    }
                    className={`
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        transition
                        ${
                            activeSection ===
                                "companies" ||
                            activeSection ===
                                "company-details"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-white/10"
                        }
                    `}
                >
                    <Building2
                        size={21}
                    />

                    <span>
                        Companies
                    </span>
                </button>

                {/* JOBS */}

                <button
                    onClick={() =>
                        openSection(
                            "jobs"
                        )
                    }
                    className={`
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        transition
                        ${
                            activeSection ===
                                "jobs" ||
                            activeSection ===
                                "job-details"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-white/10"
                        }
                    `}
                >
                    <BriefcaseBusiness
                        size={21}
                    />

                    <span>
                        Jobs
                    </span>
                </button>

                {/* USERS */}

                <button
                    onClick={() =>
                        openSection(
                            "users"
                        )
                    }
                    className={`
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        transition
                        ${
                            activeSection ===
                            "users"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-white/10"
                        }
                    `}
                >
                    <Users size={21} />

                    <span>
                        Users
                    </span>
                </button>

                {/* APPLICATIONS */}

                <button
                    onClick={() =>
                        openSection(
                            "applications"
                        )
                    }
                    className={`
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        transition
                        ${
                            activeSection ===
                            "applications"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-white/10"
                        }
                    `}
                >
                    <FileText
                        size={21}
                    />

                    <span>
                        Applications
                    </span>
                </button>

                {/* PROFILE */}

                <button
                    onClick={() =>
                        openSection(
                            "profile"
                        )
                    }
                    className={`
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        transition
                        ${
                            activeSection ===
                            "profile"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-white/10"
                        }
                    `}
                >
                    <User size={21} />

                    <span>
                        Profile
                    </span>
                </button>

                {/* LOGOUT */}

                <button
                    onClick={
                        handleLogout
                    }
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

                    <span>
                        Logout
                    </span>
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
                            overflow-hidden
                        "
                    >
                        {profilePhoto ? (
                            <img
                                src={
                                    profilePhoto
                                }
                                alt="Admin"
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                "
                            />
                        ) : (
                            <User
                                className="text-gray-600"
                                size={24}
                            />
                        )}
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
    // HEADER
    // =====================================================

    const Header = () => (
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
                    {activeSection ===
                        "dashboard" &&
                        "Admin Dashboard"}

                    {activeSection ===
                        "companies" &&
                        "Companies"}

                    {activeSection ===
                        "company-details" &&
                        "Company Details"}

                    {activeSection ===
                        "jobs" &&
                        "Jobs"}

                    {activeSection ===
                        "job-details" &&
                        "Job Details"}

                    {activeSection ===
                        "users" &&
                        "Users"}

                    {activeSection ===
                        "applications" &&
                        "Applications"}

                    {activeSection ===
                        "profile" &&
                        "Profile"}
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
                        overflow-hidden
                    "
                >
                    {profilePhoto ? (
                        <img
                            src={
                                profilePhoto
                            }
                            alt="Admin"
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />
                    ) : (
                        <User
                            size={21}
                            className="text-gray-600"
                        />
                    )}
                </div>

                <div className="hidden sm:block">

                    <p className="font-semibold text-sm">
                        Super Admin
                    </p>

                </div>
            </div>
        </header>
    );

    // =====================================================
    // DASHBOARD SECTION
    // =====================================================

    const DashboardSection = () => (
        <>
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
                    <CalendarDays
                        size={19}
                    />

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
                        openSection(
                            "companies"
                        )
                    }
                    className="
                        text-left
                        bg-white
                        rounded-2xl
                        border
                        p-5
                        shadow-sm
                        hover:shadow-md
                        transition
                    "
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
                        openSection(
                            "jobs"
                        )
                    }
                    className="
                        text-left
                        bg-white
                        rounded-2xl
                        border
                        p-5
                        shadow-sm
                        hover:shadow-md
                        transition
                    "
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

                <button
                    onClick={() =>
                        openSection(
                            "users"
                        )
                    }
                    className="
                        text-left
                        bg-white
                        rounded-2xl
                        border
                        p-5
                        shadow-sm
                        hover:shadow-md
                        transition
                    "
                >
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
                </button>

                {/* APPLICATIONS */}

                <button
                    onClick={() =>
                        openSection(
                            "applications"
                        )
                    }
                    className="
                        text-left
                        bg-white
                        rounded-2xl
                        border
                        p-5
                        shadow-sm
                        hover:shadow-md
                        transition
                    "
                >
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
                </button>

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
                                openSection(
                                    "companies"
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
                                    <button
                                        key={
                                            company._id
                                        }
                                        onClick={() =>
                                            openCompany(
                                                company
                                            )
                                        }
                                        className="
                                            w-full
                                            text-left
                                            flex
                                            items-center
                                            gap-4
                                            py-3
                                            border-b
                                            last:border-b-0
                                            hover:bg-gray-50
                                            transition
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
                                                {company.name}
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

                                    </button>
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
                                openSection(
                                    "users"
                                )
                            }
                            className="text-sm text-blue-600 font-medium hover:underline"
                        >
                            View All
                        </button>

                    </div>

                    <div className="p-5">

                        {recentUsers.length ===
                        0 ? (
                            <p className="text-gray-500 text-center py-8">
                                No users found.
                            </p>
                        ) : (
                            recentUsers.map(
                                (user) => (
                                    <div
                                        key={
                                            user._id
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
                                                rounded-full
                                                bg-gray-100
                                                flex
                                                items-center
                                                justify-center
                                                overflow-hidden
                                                shrink-0
                                            "
                                        >
                                            {user.profile?.profilePhoto ? (
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
                                openSection(
                                    "jobs"
                                )
                            }
                            className="text-sm text-blue-600 font-medium hover:underline"
                        >
                            View All
                        </button>

                    </div>

                    <div className="p-5">

                        {recentJobs.length ===
                        0 ? (
                            <p className="text-gray-500 text-center py-8">
                                No jobs found.
                            </p>
                        ) : (
                            recentJobs.map(
                                (job) => (
                                    <button
                                        key={
                                            job._id
                                        }
                                        onClick={() =>
                                            openJob(
                                                job
                                            )
                                        }
                                        className="
                                            w-full
                                            text-left
                                            flex
                                            items-center
                                            gap-4
                                            py-4
                                            border-b
                                            last:border-b-0
                                            hover:bg-gray-50
                                            transition
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
                                            {job.company?.logo ? (
                                                <img
                                                    src={
                                                        job
                                                            .company
                                                            .logo
                                                    }
                                                    alt={
                                                        job
                                                            .company
                                                            ?.name ||
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
                                                {job.company
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

                                    </button>
                                )
                            )
                        )}

                    </div>
                </div>

            </div>
        </>
    );

    // =====================================================
    // COMPANIES SECTION - ALL COMPANIES
    // =====================================================

    const CompaniesSection = () => (
        <div className="bg-white rounded-2xl border shadow-sm">

            <div className="p-5 border-b flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-gray-800">
                        All Companies
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Total {companies.length} companies
                    </p>

                </div>

                <button
                    onClick={() =>
                        toast(
                            "Company create page can be added here."
                        )
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        bg-blue-600
                        text-white
                        px-4
                        py-2.5
                        rounded-xl
                        hover:bg-blue-700
                    "
                >
                    <Plus size={18} />

                    Add Company
                </button>

            </div>

            <div className="p-5">

                {sectionLoading ? (
                    <p className="text-center py-10 text-gray-500">
                        Loading companies...
                    </p>
                ) : companies.length ===
                  0 ? (
                    <p className="text-center py-10 text-gray-500">
                        No companies found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                        {companies.map(
                            (company) => (
                                <button
                                    key={
                                        company._id
                                    }
                                    onClick={() =>
                                        openCompany(
                                            company
                                        )
                                    }
                                    className="
                                        text-left
                                        border
                                        rounded-2xl
                                        p-5
                                        hover:shadow-md
                                        hover:border-blue-300
                                        transition
                                        bg-white
                                    "
                                >

                                    <div className="flex items-center gap-4">

                                        <div
                                            className="
                                                w-14
                                                h-14
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
                                                        26
                                                    }
                                                    className="text-gray-400"
                                                />
                                            )}
                                        </div>

                                        <div className="min-w-0">

                                            <h3 className="font-bold text-gray-800 truncate">
                                                {company.name ||
                                                    "Company"}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Added{" "}
                                                {formatDate(
                                                    company.createdAt
                                                )}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="mt-5 text-sm text-blue-600 font-medium">
                                        View Company →
                                    </div>

                                </button>
                            )
                        )}

                    </div>
                )}

            </div>
        </div>
    );

    // =====================================================
    // COMPANY DETAILS
    // =====================================================

    const CompanyDetailsSection = () => (
        <div>

            <button
                onClick={() =>
                    openSection(
                        "companies"
                    )
                }
                className="
                    flex
                    items-center
                    gap-2
                    text-blue-600
                    font-medium
                    mb-5
                "
            >
                <ArrowLeft
                    size={18}
                />

                Back to Companies
            </button>

            <div className="bg-white rounded-2xl border shadow-sm p-6">

                <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                    <div
                        className="
                            w-20
                            h-20
                            rounded-2xl
                            border
                            bg-gray-50
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                        "
                    >
                        {selectedCompany?.logo ? (
                            <img
                                src={
                                    selectedCompany.logo
                                }
                                alt={
                                    selectedCompany.name ||
                                    "Company"
                                }
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <Building2
                                size={35}
                                className="text-gray-400"
                            />
                        )}
                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            {selectedCompany?.name ||
                                "Company"}
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Company Details
                        </p>

                    </div>

                </div>

                <div className="mt-8 border-t pt-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>

                            <p className="text-sm text-gray-500">
                                Company Name
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                {selectedCompany?.name ||
                                    "N/A"}
                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">
                                Created
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                {formatDate(
                                    selectedCompany?.createdAt
                                )}
                            </p>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

    // =====================================================
    // JOBS SECTION - ALL JOBS
    // =====================================================

    const JobsSection = () => (
        <div className="bg-white rounded-2xl border shadow-sm">

            <div className="p-5 border-b">

                <h2 className="text-xl font-bold text-gray-800">
                    All Jobs
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Total {jobs.length} jobs
                </p>

            </div>

            <div className="p-5">

                {sectionLoading ? (
                    <p className="text-center py-10 text-gray-500">
                        Loading jobs...
                    </p>
                ) : jobs.length ===
                  0 ? (
                    <p className="text-center py-10 text-gray-500">
                        No jobs found.
                    </p>
                ) : (
                    <div className="space-y-3">

                        {jobs.map(
                            (job) => (
                                <button
                                    key={
                                        job._id
                                    }
                                    onClick={() =>
                                        openJob(
                                            job
                                        )
                                    }
                                    className="
                                        w-full
                                        text-left
                                        flex
                                        items-center
                                        gap-4
                                        border
                                        rounded-xl
                                        p-4
                                        hover:shadow-md
                                        hover:border-blue-300
                                        transition
                                    "
                                >

                                    <div
                                        className="
                                            w-12
                                            h-12
                                            rounded-xl
                                            bg-gray-50
                                            border
                                            flex
                                            items-center
                                            justify-center
                                            overflow-hidden
                                            shrink-0
                                        "
                                    >
                                        {job.company?.logo ? (
                                            <img
                                                src={
                                                    job
                                                        .company
                                                        .logo
                                                }
                                                alt="Company"
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <BriefcaseBusiness
                                                size={
                                                    24
                                                }
                                                className="text-gray-400"
                                            />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">

                                        <h3 className="font-bold text-gray-800 truncate">
                                            {job.title ||
                                                "Untitled Job"}
                                        </h3>

                                        <p className="text-sm text-gray-500 truncate mt-1">
                                            {job.company
                                                ?.name ||
                                                "Company"}
                                            {" • "}
                                            {job.jobType ||
                                                "Job"}
                                        </p>

                                    </div>

                                    <span className="hidden sm:block text-sm text-gray-500">
                                        {formatDate(
                                            job.createdAt
                                        )}
                                    </span>

                                    <MoreVertical
                                        size={20}
                                        className="text-gray-400"
                                    />

                                </button>
                            )
                        )}

                    </div>
                )}

            </div>
        </div>
    );

    // =====================================================
    // JOB DETAILS
    // =====================================================

    const JobDetailsSection = () => (
        <div>

            <button
                onClick={() =>
                    openSection(
                        "jobs"
                    )
                }
                className="
                    flex
                    items-center
                    gap-2
                    text-blue-600
                    font-medium
                    mb-5
                "
            >
                <ArrowLeft
                    size={18}
                />

                Back to Jobs
            </button>

            <div className="bg-white rounded-2xl border shadow-sm p-6">

                <div className="flex items-center gap-4">

                    <div
                        className="
                            w-16
                            h-16
                            rounded-xl
                            border
                            bg-gray-50
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                        "
                    >
                        {selectedJob?.company?.logo ? (
                            <img
                                src={
                                    selectedJob
                                        .company
                                        .logo
                                }
                                alt="Company"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <BriefcaseBusiness
                                size={30}
                                className="text-gray-400"
                            />
                        )}
                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            {selectedJob?.title ||
                                "Untitled Job"}
                        </h2>

                        <p className="text-gray-500 mt-1">
                            {selectedJob?.company
                                ?.name ||
                                "Company"}
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 border-t pt-6">

                    <div>

                        <p className="text-sm text-gray-500">
                            Job Type
                        </p>

                        <p className="font-semibold text-gray-800 mt-1">
                            {selectedJob?.jobType ||
                                "N/A"}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Location
                        </p>

                        <p className="font-semibold text-gray-800 mt-1">
                            {selectedJob?.location ||
                                "N/A"}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Posted
                        </p>

                        <p className="font-semibold text-gray-800 mt-1">
                            {formatDate(
                                selectedJob?.createdAt
                            )}
                        </p>

                    </div>

                </div>
            </div>
        </div>
    );

    // =====================================================
    // USERS SECTION - ALL USERS
    // =====================================================

    const UsersSection = () => (
        <div className="bg-white rounded-2xl border shadow-sm">

            <div className="p-5 border-b">

                <h2 className="text-xl font-bold text-gray-800">
                    All Users
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Total {users.length} registered users
                </p>

            </div>

            <div className="p-5">

                {sectionLoading ? (
                    <p className="text-center py-10 text-gray-500">
                        Loading users...
                    </p>
                ) : users.length ===
                  0 ? (
                    <p className="text-center py-10 text-gray-500">
                        No users found.
                    </p>
                ) : (
                    <div className="space-y-3">

                        {users.map(
                            (user) => (
                                <div
                                    key={
                                        user._id
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                        border
                                        rounded-xl
                                        p-4
                                    "
                                >

                                    <div
                                        className="
                                            w-12
                                            h-12
                                            rounded-full
                                            bg-gray-100
                                            flex
                                            items-center
                                            justify-center
                                            overflow-hidden
                                            shrink-0
                                        "
                                    >
                                        {user.profile?.profilePhoto ? (
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
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User
                                                size={
                                                    24
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
                                            px-3
                                            py-1.5
                                            rounded-full
                                            text-gray-600
                                        "
                                    >
                                        {user.role ||
                                            "User"}
                                    </span>

                                </div>
                            )
                        )}

                    </div>
                )}

            </div>
        </div>
    );

    // =====================================================
    // APPLICATIONS SECTION - ALL APPLICATIONS
    // =====================================================

    const ApplicationsSection = () => {

        const updateApplicationStatus =
            async (
                applicationId,
                status
            ) => {
                try {
                    const res =
                        await axios.put(
                            `${API_BASE_URL}/api/v1/admin/applications/${applicationId}/status`,
                            {
                                status,
                            },
                            {
                                withCredentials:
                                    true,
                            }
                        );

                    if (
                        res.data?.success
                    ) {
                        toast.success(
                            "Application status updated."
                        );

                        setApplications(
                            (prev) =>
                                prev.map(
                                    (
                                        application
                                    ) =>
                                        application._id ===
                                        applicationId
                                            ? {
                                                  ...application,
                                                  status,
                                              }
                                            : application
                                )
                        );
                    }
                } catch (error) {
                    console.error(
                        "Update Application Error:",
                        error
                    );

                    toast.error(
                        error.response
                            ?.data
                            ?.message ||
                            "Failed to update application."
                    );
                }
            };

        return (
            <div className="bg-white rounded-2xl border shadow-sm">

                <div className="p-5 border-b">

                    <h2 className="text-xl font-bold text-gray-800">
                        All Applications
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Total{" "}
                        {
                            applications.length
                        }{" "}
                        applications
                    </p>

                </div>

                <div className="p-5">

                    {sectionLoading ? (
                        <p className="text-center py-10 text-gray-500">
                            Loading applications...
                        </p>
                    ) : applications.length ===
                      0 ? (
                        <div className="text-center py-10">

                            <FileText
                                size={40}
                                className="mx-auto text-gray-300"
                            />

                            <p className="text-gray-500 mt-3">
                                No applications found.
                            </p>

                        </div>
                    ) : (
                        <div className="space-y-3">

                            {applications.map(
                                (
                                    application
                                ) => {

                                    const applicant =
                                        application.applicant;

                                    const job =
                                        application.job;

                                    const company =
                                        job?.company;

                                    return (
                                        <div
                                            key={
                                                application._id
                                            }
                                            className="
                                                border
                                                rounded-xl
                                                p-4
                                                flex
                                                flex-col
                                                lg:flex-row
                                                lg:items-center
                                                gap-4
                                            "
                                        >

                                            {/* APPLICANT IMAGE */}

                                            <div
                                                className="
                                                    w-12
                                                    h-12
                                                    rounded-full
                                                    bg-gray-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                    overflow-hidden
                                                    shrink-0
                                                "
                                            >
                                                {applicant
                                                    ?.profile
                                                    ?.profilePhoto ? (
                                                    <img
                                                        src={
                                                            applicant
                                                                .profile
                                                                .profilePhoto
                                                        }
                                                        alt="Applicant"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <User
                                                        size={
                                                            23
                                                        }
                                                        className="text-gray-500"
                                                    />
                                                )}
                                            </div>

                                            {/* APPLICANT DETAILS */}

                                            <div className="flex-1 min-w-0">

                                                <p className="font-bold text-gray-800">
                                                    {applicant?.fullname ||
                                                        "Applicant"}
                                                </p>

                                                <p className="text-sm text-gray-500 truncate">
                                                    {applicant?.email ||
                                                        "No email"}
                                                </p>

                                                <p className="text-sm text-blue-600 mt-1">
                                                    {job?.title ||
                                                        "Job"}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    {company?.name ||
                                                        "Company"}
                                                </p>

                                            </div>

                                            {/* DATE */}

                                            <div className="text-sm text-gray-500 whitespace-nowrap">
                                                {formatDate(
                                                    application.createdAt
                                                )}
                                            </div>

                                            {/* STATUS */}

                                            <div>

                                                <span
                                                    className={`
                                                        px-3
                                                        py-1.5
                                                        rounded-full
                                                        text-xs
                                                        font-semibold
                                                        ${
                                                            application.status ===
                                                            "accepted"
                                                                ? "bg-green-100 text-green-700"
                                                                : application.status ===
                                                                  "rejected"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                        }
                                                    `}
                                                >
                                                    {application.status ||
                                                        "pending"}
                                                </span>

                                            </div>

                                            {/* ACTION BUTTONS */}

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() =>
                                                        updateApplicationStatus(
                                                            application._id,
                                                            "accepted"
                                                        )
                                                    }
                                                    className="
                                                        px-3
                                                        py-2
                                                        rounded-lg
                                                        bg-green-600
                                                        text-white
                                                        text-sm
                                                        hover:bg-green-700
                                                    "
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateApplicationStatus(
                                                            application._id,
                                                            "rejected"
                                                        )
                                                    }
                                                    className="
                                                        px-3
                                                        py-2
                                                        rounded-lg
                                                        bg-red-600
                                                        text-white
                                                        text-sm
                                                        hover:bg-red-700
                                                    "
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>
                    )}

                </div>

            </div>
        );
    };

    // =====================================================
    // PROFILE SECTION
    // =====================================================

    const ProfileSection = () => (
        <div className="bg-white rounded-2xl border shadow-sm">

            <div className="p-5 border-b">

                <h2 className="text-xl font-bold text-gray-800">
                    Profile
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Admin profile photo
                </p>

            </div>

            <div className="p-8 flex flex-col items-center">

                <div
                    className="
                        relative
                        w-36
                        h-36
                        rounded-full
                        bg-gray-100
                        border-4
                        border-white
                        shadow
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                    "
                >

                    {profilePhoto ? (
                        <img
                            src={
                                profilePhoto
                            }
                            alt="Admin Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User
                            size={55}
                            className="text-gray-400"
                        />
                    )}

                    <label
                        className="
                            absolute
                            bottom-1
                            right-1
                            w-11
                            h-11
                            rounded-full
                            bg-blue-600
                            text-white
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            hover:bg-blue-700
                            border-4
                            border-white
                        "
                    >
                        <Camera
                            size={20}
                        />

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={
                                handleProfilePhoto
                            }
                        />
                    </label>

                </div>

                <label
                    className="
                        mt-6
                        flex
                        items-center
                        gap-2
                        bg-blue-600
                        text-white
                        px-5
                        py-2.5
                        rounded-xl
                        cursor-pointer
                        hover:bg-blue-700
                    "
                >
                    <Camera
                        size={18}
                    />

                    Change Photo

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={
                            handleProfilePhoto
                        }
                    />
                </label>

            </div>
        </div>
    );

    // =====================================================
    // CONTENT SWITCHER
    // =====================================================

    const renderContent = () => {

        switch (
            activeSection
        ) {

            case "companies":
                return (
                    <CompaniesSection />
                );

            case "company-details":
                return (
                    <CompanyDetailsSection />
                );

            case "jobs":
                return (
                    <JobsSection />
                );

            case "job-details":
                return (
                    <JobDetailsSection />
                );

            case "users":
                return (
                    <UsersSection />
                );

            case "applications":
                return (
                    <ApplicationsSection />
                );

            case "profile":
                return (
                    <ProfileSection />
                );

            case "dashboard":

            default:
                return (
                    <DashboardSection />
                );
        }
    };

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
    // MAIN
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

                <Header />

                {/* CONTENT */}

                <main className="p-4 sm:p-6 lg:p-8">

                    {renderContent()}

                </main>

            </div>

        </div>
    );
};

export default AdminDashboard;