import React, { useState } from "react";

import Navbar from "./ui/shared/Navbar";

import {
    Contact,
    Pen,
    Mail,
} from "lucide-react";

import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

import { useSelector } from "react-redux";

import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";


const Profile = () => {

    // ==========================================
    // GET APPLIED JOBS
    // ==========================================

    useGetAppliedJobs();


    // ==========================================
    // STATE
    // ==========================================

    const [open, setOpen] = useState(false);


    // ==========================================
    // GET USER FROM REDUX
    // ==========================================

    const { user } = useSelector(
        (store) => store.auth
    );


    // ==========================================
    // USER SKILLS
    // ==========================================

    const skills =
        user?.profile?.skills || [];


    // ==========================================
    // USER RESUME
    // ==========================================

    const resume =
        user?.profile?.resume;


    return (

        <div>

            {/* ================= NAVBAR ================= */}

            <Navbar />


            {/* ================= PROFILE CARD ================= */}

            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl my-5 p-5">

                {/* ================= HEADER ================= */}

                <div className="flex justify-between items-start">

                    <div className="flex items-center gap-3">

                        {/* PROFILE IMAGE */}

                        <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">

                            {user?.profile?.profilePhoto ? (

                                <img
                                    src={user.profile.profilePhoto}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display =
                                            "none";
                                    }}
                                />

                            ) : (

                                <div className="h-full w-full flex items-center justify-center text-gray-400 font-semibold">
                                    {user?.fullname
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>

                            )}

                        </div>


                        {/* USER INFO */}

                        <div>

                            <h1 className="font-semibold text-lg">

                                {user?.fullname ||
                                    "Full Name"}

                            </h1>


                            <p className="text-sm text-gray-500 mt-1">

                                {user?.profile?.bio ||
                                    "No bio available"}

                            </p>

                        </div>

                    </div>


                    {/* ================= EDIT BUTTON ================= */}

                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="
                            border
                            border-gray-300
                            rounded-md
                            p-2
                            hover:bg-gray-100
                            cursor-pointer
                        "
                    >

                        <Pen size={16} />

                    </button>

                </div>


                {/* ================= CONTACT ================= */}

                <div className="my-4">

                    {/* EMAIL */}

                    <div className="flex items-center gap-2 mb-2">

                        <Mail size={16} />

                        <span className="text-sm">

                            {user?.email ||
                                "Email not available"}

                        </span>

                    </div>


                    {/* PHONE */}

                    <div className="flex items-center gap-2">

                        <Contact size={16} />

                        <span className="text-sm">

                            {user?.phoneNumber ||
                                "Phone not available"}

                        </span>

                    </div>

                </div>


                {/* ================= SKILLS ================= */}

                <div className="my-4">

                    <h1 className="font-semibold text-sm mb-2">
                        Skills
                    </h1>


                    <div className="flex items-center gap-2 flex-wrap">

                        {skills.length > 0 ? (

                            skills.map(
                                (item, index) => (

                                    <span
                                        key={index}
                                        className="
                                            px-2.5
                                            py-1
                                            bg-gray-100
                                            border
                                            border-gray-200
                                            rounded-full
                                            text-xs
                                        "
                                    >
                                        {item}
                                    </span>

                                )
                            )

                        ) : (

                            <span className="text-sm text-gray-500">
                                NA
                            </span>

                        )}

                    </div>

                </div>


                {/* ================= RESUME ================= */}

                <div className="my-4">

                    <label className="text-sm font-semibold block mb-1">
                        Resume
                    </label>


                    {resume ? (

                        <a
                            href={resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                text-blue-500
                                text-sm
                                hover:underline
                            "
                        >

                            {user?.profile?.resumeOriginalName ||
                                "View Resume"}

                        </a>

                    ) : (

                        <span className="text-sm text-gray-500">
                            NA
                        </span>

                    )}

                </div>


                {/* ================= APPLIED JOBS ================= */}

                <div className="max-w-4xl mx-auto bg-white rounded-xl mt-6">

                    <h1 className="font-semibold text-base mb-3">
                        Applied Jobs
                    </h1>


                    <AppliedJobTable />

                </div>

            </div>


            {/* ================= UPDATE PROFILE DIALOG ================= */}

            <UpdateProfileDialog
                open={open}
                setOpen={setOpen}
            />

        </div>

    );
};


export default Profile;