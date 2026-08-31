import React, { useEffect, useState } from "react";
import {
    MoreHorizontal,
    Edit2,
    Trash2,
    Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { JOB_API_END_POINT } from "@/utils/constant";

const AdminJobsTable = ({ jobs = [], searchText = "" }) => {
    const navigate = useNavigate();

    const [openAction, setOpenAction] = useState(null);
    const [loading, setLoading] = useState(false);

    const [menuPosition, setMenuPosition] = useState({
        top: 0,
        left: 0,
    });

    const [menuDirection, setMenuDirection] = useState("down");

    // =====================================================
    // CLOSE DROPDOWN WHEN SCROLLING
    // =====================================================

    useEffect(() => {
        const handleScroll = () => {
            setOpenAction(null);
        };

        window.addEventListener("scroll", handleScroll, true);

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
                true
            );
        };
    }, []);

    // =====================================================
    // DELETE JOB
    // =====================================================

    const deleteJobHandler = async (jobId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setLoading(true);

            const res = await axios.delete(
                `${JOB_API_END_POINT}/delete/${jobId}`,
                {
                    withCredentials: true,
                }
            );

            if (res.data?.success) {
                toast.success(
                    res.data.message ||
                    "Job deleted successfully"
                );

                setOpenAction(null);

                window.location.reload();
            }
        } catch (error) {
            console.error("Delete Job Error:", error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to delete job"
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // EDIT JOB
    // =====================================================

    const editJobHandler = (jobId) => {
        setOpenAction(null);

        navigate(`/admin/jobs/${jobId}`);
    };

    // =====================================================
    // VIEW APPLICANTS
    // =====================================================

    const viewApplicantsHandler = (jobId) => {
        setOpenAction(null);

        navigate(`/admin/jobs/${jobId}/applicants`);
    };

    // =====================================================
    // OPEN ACTION MENU
    // =====================================================

    const handleActionClick = (event, jobId) => {
        event.stopPropagation();

        const buttonRect =
            event.currentTarget.getBoundingClientRect();

        const menuWidth = 150;
        const menuHeight = 130;
        const gap = 6;

        let top;
        let left;
        let direction = "down";

        // Check available space below
        const spaceBelow =
            window.innerHeight - buttonRect.bottom;

        // Check available space above
        const spaceAbove = buttonRect.top;

        // If not enough space below but enough above,
        // open menu upward
        if (
            spaceBelow < menuHeight &&
            spaceAbove > menuHeight
        ) {
            top =
                buttonRect.top -
                menuHeight -
                gap;

            direction = "up";
        } else {
            top = buttonRect.bottom + gap;
            direction = "down";
        }

        // Keep menu inside screen horizontally
        left = buttonRect.right - menuWidth;

        if (left < 8) {
            left = 8;
        }

        if (
            left + menuWidth >
            window.innerWidth - 8
        ) {
            left =
                window.innerWidth -
                menuWidth -
                8;
        }

        setMenuPosition({
            top,
            left,
        });

        setMenuDirection(direction);

        setOpenAction(
            openAction === jobId ? null : jobId
        );
    };

    // =====================================================
    // EMPTY STATE
    // =====================================================

    if (!jobs || jobs.length === 0) {
        return (
            <div className="w-full bg-white border border-gray-200 rounded-lg">
                <div className="p-8 text-center">
                    <p className="text-gray-500">
                        {searchText
                            ? `No jobs found for "${searchText}"`
                            : "You haven't posted any job yet."}
                    </p>
                </div>
            </div>
        );
    }

    // =====================================================
    // TABLE
    // =====================================================

    return (
        <div className="w-full">

            {/* TABLE CONTAINER */}

            <div className="w-full overflow-x-auto bg-white border border-gray-200 rounded-lg">

                <table className="w-full min-w-[850px]">

                    {/* =================================================
                        TABLE HEADER
                    ================================================= */}

                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Company Name
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Role
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Location
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Date
                            </th>

                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                                Action
                            </th>

                        </tr>
                    </thead>

                    {/* =================================================
                        TABLE BODY
                    ================================================= */}

                    <tbody>

                        {jobs.map((job) => (
                            <tr
                                key={job._id}
                                className="
                                    border-b
                                    border-gray-100
                                    last:border-b-0
                                    hover:bg-gray-50
                                    transition
                                "
                            >

                                {/* =================================================
                                    COMPANY
                                ================================================= */}

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        <img
                                            src={
                                                job?.company?.logo ||
                                                "https://via.placeholder.com/40"
                                            }
                                            alt="Company Logo"
                                            className="
                                                w-10
                                                h-10
                                                rounded-full
                                                object-cover
                                                border
                                                border-gray-200
                                                flex-shrink-0
                                            "
                                        />

                                        <div className="min-w-0">

                                            <p className="
                                                font-medium
                                                text-gray-900
                                                truncate
                                                max-w-[200px]
                                            ">
                                                {job?.company?.name ||
                                                    "Unknown Company"}
                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* =================================================
                                    ROLE
                                ================================================= */}

                                <td className="px-6 py-4">

                                    <p className="
                                        font-medium
                                        text-gray-900
                                        whitespace-nowrap
                                    ">
                                        {job?.title || "N/A"}
                                    </p>

                                </td>

                                {/* =================================================
                                    LOCATION
                                ================================================= */}

                                <td className="px-6 py-4">

                                    <p className="
                                        text-gray-600
                                        text-sm
                                        whitespace-nowrap
                                    ">
                                        {job?.location || "N/A"}
                                    </p>

                                </td>

                                {/* =================================================
                                    DATE
                                ================================================= */}

                                <td className="px-6 py-4">

                                    <p className="
                                        text-gray-600
                                        text-sm
                                        whitespace-nowrap
                                    ">
                                        {job?.createdAt
                                            ? new Date(
                                                job.createdAt
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )
                                            : "N/A"}
                                    </p>

                                </td>

                                {/* =================================================
                                    ACTION
                                ================================================= */}

                                <td className="px-6 py-4">

                                    <div className="flex justify-end">

                                        <button
                                            type="button"
                                            onClick={(event) =>
                                                handleActionClick(
                                                    event,
                                                    job._id
                                                )
                                            }
                                            className="
                                                p-2
                                                rounded-md
                                                hover:bg-gray-200
                                                text-gray-600
                                                hover:text-gray-900
                                                cursor-pointer
                                                transition
                                            "
                                            aria-label="Job actions"
                                        >

                                            <MoreHorizontal
                                                className="w-5 h-5"
                                            />

                                        </button>

                                    </div>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {/* =====================================================
                ACTION DROPDOWN
            ===================================================== */}

            {openAction && (

                <div
                    className="
                        fixed
                        w-[150px]
                        bg-white
                        border
                        border-gray-200
                        rounded-lg
                        shadow-xl
                        z-[99999]
                        overflow-hidden
                    "
                    style={{
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                    }}
                >

                    {/* =================================================
                        EDIT BUTTON
                    ================================================= */}

                    <button
                        type="button"
                        onClick={() => {
                            editJobHandler(openAction);
                        }}
                        className="
                            flex
                            items-center
                            gap-3
                            w-full
                            px-4
                            py-3
                            text-sm
                            text-gray-700
                            hover:bg-gray-100
                            cursor-pointer
                            transition
                        "
                    >

                        <Edit2 className="w-4 h-4" />

                        <span>
                            Edit
                        </span>

                    </button>

                    {/* =================================================
                        APPLICANTS BUTTON
                    ================================================= */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/admin/jobs/${openAction}/applicants`)
                        }
                        className="
        flex
        items-center
        gap-3
        w-full
        px-4
        py-3
        text-sm
        text-gray-700
        hover:bg-gray-100
        cursor-pointer
        transition
    "
                    >
                        <Eye className="w-4 h-4" />

                        <span>
                            Applicants
                        </span>
                    </button>

                    {/* =================================================
                        DELETE BUTTON
                    ================================================= */}

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => {
                            deleteJobHandler(openAction);
                        }}
                        className="
                            flex
                            items-center
                            gap-3
                            w-full
                            px-4
                            py-3
                            text-sm
                            text-red-600
                            hover:bg-red-50
                            cursor-pointer
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        <Trash2 className="w-4 h-4" />

                        <span>
                            {loading
                                ? "Deleting..."
                                : "Delete"}
                        </span>

                    </button>

                </div>

            )}

        </div>
    );
};

export default AdminJobsTable;