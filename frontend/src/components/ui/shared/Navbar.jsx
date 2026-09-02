import React, { useState } from "react";
import {
    User2,
    LogOut,
    ChevronDown,
    Menu,
    X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

function Navbar() {
    const { user } = useSelector((store) => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openMenu, setOpenMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    // =====================================================
    // LOGOUT
    // =====================================================

    const logoutHandler = async () => {
        try {
            const res = await axios.get(
                `${USER_API_END_POINT}/logout`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(setUser(null));
                setOpenMenu(false);
                setMobileMenu(false);

                navigate("/");

                toast.success(
                    res.data.message || "Logout successfully"
                );
            }
        } catch (error) {
            console.log("Logout Error:", error);

            toast.error(
                error?.response?.data?.message ||
                    "Logout failed"
            );
        }
    };

    // =====================================================
    // PROFILE IMAGE
    // =====================================================

    const profilePhoto =
        user?.profile?.profilePhoto ||
        "https://github.com/shadcn.png";

    // =====================================================
    // CLOSE MOBILE MENU
    // =====================================================

    const closeMobileMenu = () => {
        setMobileMenu(false);
    };

    return (
        <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">

            {/* =====================================================
                MAIN NAVBAR
            ===================================================== */}

            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">

                {/* =================================================
                    LOGO
                ================================================= */}

                <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="cursor-pointer flex items-center gap-2"
                >

                    {/* LOGO ICON */}

                    <div className="flex items-center justify-center shrink-0">

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

                    </div>


                    {/* BRAND NAME */}

                    <h1 className="text-xl sm:text-2xl font-bold">
                        Job{" "}
                        <span className="text-[#F83002]">
                            Portal
                        </span>
                    </h1>

                </Link>


                {/* =====================================================
                    DESKTOP RIGHT SIDE
                ===================================================== */}

                <div className="hidden md:flex items-center gap-10">

                    {/* =================================================
                        DESKTOP MENU
                    ================================================= */}

                    <ul className="flex font-medium items-center gap-6">

                        {/* RECRUITER */}

                        {user?.role === "recruiter" ? (
                            <>
                                <li>
                                    <Link
                                        to="/admin/companies"
                                        className="hover:text-[#F83002] transition-colors"
                                    >
                                        Companies
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/admin/jobs"
                                        className="hover:text-[#F83002] transition-colors"
                                    >
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (

                            /* STUDENT */

                            <>
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-[#F83002] transition-colors"
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/jobs"
                                        className="hover:text-[#F83002] transition-colors"
                                    >
                                        Jobs
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/browse"
                                        className="hover:text-[#F83002] transition-colors"
                                    >
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>


                    {/* =================================================
                        DESKTOP USER SECTION
                    ================================================= */}

                    {!user ? (

                        <div className="flex items-center gap-2">

                            {/* USER LOGIN */}

                            <Link to="/login">

                                <button
                                    type="button"
                                    className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                                >
                                    Login
                                </button>

                            </Link>


                            {/* ADMIN LOGIN */}

                            <Link to="/admin-login">

                                <button
                                    type="button"
                                    className="border border-[#F83002] text-[#F83002] px-4 py-2 rounded-md hover:bg-red-50 transition cursor-pointer"
                                >
                                    Admin Login
                                </button>

                            </Link>


                            {/* SIGNUP */}

                            <Link to="/signup">

                                <button
                                    type="button"
                                    className="bg-[#6A38C2] text-white px-4 py-2 rounded-md hover:bg-[#5b2fa8] transition cursor-pointer"
                                >
                                    Signup
                                </button>

                            </Link>

                        </div>

                    ) : (

                        <div className="relative">

                            {/* PROFILE BUTTON */}

                            <button
                                type="button"
                                onClick={() =>
                                    setOpenMenu(!openMenu)
                                }
                                className="flex items-center gap-2 cursor-pointer outline-none"
                            >

                                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">

                                    <img
                                        src={profilePhoto}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.onerror =
                                                null;

                                            e.currentTarget.src =
                                                "https://github.com/shadcn.png";
                                        }}
                                    />

                                </div>


                                <ChevronDown
                                    size={18}
                                    className={`transition-transform duration-200 ${
                                        openMenu
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />

                            </button>


                            {/* DROPDOWN */}

                            {openMenu && (

                                <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-[100]">

                                    {/* USER INFO */}

                                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200">

                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">

                                            <img
                                                src={profilePhoto}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />

                                        </div>


                                        <div className="min-w-0">

                                            <h4 className="font-semibold truncate">
                                                {user?.fullname ||
                                                    "User"}
                                            </h4>

                                            <p className="text-sm text-gray-500 truncate">
                                                {user?.email || ""}
                                            </p>

                                        </div>

                                    </div>


                                    {/* MENU OPTIONS */}

                                    <div className="flex flex-col mt-3">

                                        {/* VIEW PROFILE */}

                                        {user?.role === "student" && (

                                            <Link
                                                to="/profile"
                                                onClick={() =>
                                                    setOpenMenu(false)
                                                }
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-purple-50 hover:text-[#6A38C2] transition cursor-pointer"
                                            >

                                                <User2 size={18} />

                                                <span>
                                                    View Profile
                                                </span>

                                            </Link>

                                        )}


                                        {/* LOGOUT */}

                                        <button
                                            type="button"
                                            onClick={logoutHandler}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-50 hover:text-red-500 transition cursor-pointer text-left w-full"
                                        >

                                            <LogOut size={18} />

                                            <span>
                                                Logout
                                            </span>

                                        </button>

                                    </div>

                                </div>

                            )}

                        </div>

                    )}

                </div>


                {/* =====================================================
                    MOBILE HAMBURGER BUTTON
                ===================================================== */}

                <button
                    type="button"
                    onClick={() =>
                        setMobileMenu(!mobileMenu)
                    }
                    className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
                    aria-label="Toggle menu"
                >

                    {mobileMenu ? (
                        <X size={26} />
                    ) : (
                        <Menu size={26} />
                    )}

                </button>

            </div>


            {/* =====================================================
                MOBILE MENU
            ===================================================== */}

            {mobileMenu && (

                <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">

                    <div className="px-4 py-4 space-y-2">

                        {/* =================================================
                            MOBILE NAVIGATION
                        ================================================= */}

                        {user?.role === "recruiter" ? (

                            <>
                                <Link
                                    to="/admin/companies"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg font-medium hover:bg-purple-50 hover:text-[#6A38C2] transition"
                                >
                                    Companies
                                </Link>

                                <Link
                                    to="/admin/jobs"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg font-medium hover:bg-purple-50 hover:text-[#6A38C2] transition"
                                >
                                    Jobs
                                </Link>
                            </>

                        ) : (

                            <>

                                <Link
                                    to="/"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg font-medium hover:bg-purple-50 hover:text-[#6A38C2] transition"
                                >
                                    Home
                                </Link>

                                <Link
                                    to="/jobs"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg font-medium hover:bg-purple-50 hover:text-[#6A38C2] transition"
                                >
                                    Jobs
                                </Link>

                                <Link
                                    to="/browse"
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-3 rounded-lg font-medium hover:bg-purple-50 hover:text-[#6A38C2] transition"
                                >
                                    Browse
                                </Link>

                            </>

                        )}


                        {/* =================================================
                            MOBILE USER SECTION
                        ================================================= */}

                        <div className="border-t border-gray-200 pt-3 mt-3">

                            {!user ? (

                                <div className="grid grid-cols-1 gap-3">

                                    {/* USER LOGIN */}

                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                    >

                                        <button
                                            type="button"
                                            className="w-full border border-gray-300 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                                        >
                                            Login
                                        </button>

                                    </Link>


                                    {/* ADMIN LOGIN */}

                                    <Link
                                        to="/admin-login"
                                        onClick={closeMobileMenu}
                                    >

                                        <button
                                            type="button"
                                            className="w-full border border-[#F83002] text-[#F83002] px-4 py-3 rounded-lg font-medium hover:bg-red-50 transition"
                                        >
                                            Admin Login
                                        </button>

                                    </Link>


                                    {/* SIGNUP */}

                                    <Link
                                        to="/signup"
                                        onClick={closeMobileMenu}
                                    >

                                        <button
                                            type="button"
                                            className="w-full bg-[#6A38C2] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#5b2fa8] transition"
                                        >
                                            Signup
                                        </button>

                                    </Link>

                                </div>

                            ) : (

                                <div>

                                    {/* MOBILE PROFILE INFO */}

                                    <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-gray-50 rounded-lg">

                                        <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">

                                            <img
                                                src={profilePhoto}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.onerror =
                                                        null;

                                                    e.currentTarget.src =
                                                        "https://github.com/shadcn.png";
                                                }}
                                            />

                                        </div>


                                        <div className="min-w-0">

                                            <h4 className="font-semibold truncate">
                                                {user?.fullname ||
                                                    "User"}
                                            </h4>

                                            <p className="text-sm text-gray-500 truncate">
                                                {user?.email || ""}
                                            </p>

                                        </div>

                                    </div>


                                    {/* VIEW PROFILE */}

                                    {user?.role === "student" && (

                                        <Link
                                            to="/profile"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 hover:text-[#6A38C2] transition font-medium"
                                        >

                                            <User2 size={19} />

                                            <span>
                                                View Profile
                                            </span>

                                        </Link>

                                    )}


                                    {/* LOGOUT */}

                                    <button
                                        type="button"
                                        onClick={logoutHandler}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-500 transition font-medium text-left"
                                    >

                                        <LogOut size={19} />

                                        <span>
                                            Logout
                                        </span>

                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Navbar;