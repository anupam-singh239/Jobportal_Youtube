import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Button } from "@base-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { JOB_API_END_POINT } from "@/utils/constant";
import { setAllAdminJobs } from "@/redux/jobSlice";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobs = () => {
  useGetAllAdminJobs();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ================= SEARCH =================
    const [input, setInput] = useState("");

    // ================= JOBS FROM REDUX =================
    const { allAdminJobs = [] } = useSelector(
        (store) => store.job
    );

    // =====================================================
    // FETCH ADMIN JOBS
    // =====================================================

    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/getadminjobs`,
                    {
                        withCredentials: true,
                    }
                );

                console.log(
                    "ADMIN JOBS RESPONSE:",
                    res.data
                );

                if (res.data?.success) {
                    dispatch(
                        setAllAdminJobs(
                            res.data.jobs || []
                        )
                    );
                }
            } catch (error) {
                console.log(
                    "Fetch Admin Jobs Error:",
                    error
                );

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to fetch jobs"
                );
            }
        };

        fetchAdminJobs();
    }, [dispatch]);

    // =====================================================
    // FILTER JOBS
    // =====================================================

    const filteredJobs = allAdminJobs.filter((job) => {
        const searchText = input
            .toLowerCase()
            .trim();

        if (!searchText) {
            return true;
        }

        return (
            job?.title
                ?.toLowerCase()
                .includes(searchText) ||

            job?.company?.name
                ?.toLowerCase()
                .includes(searchText) ||

            job?.location
                ?.toLowerCase()
                .includes(searchText)
        );
    });

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="min-h-screen bg-white">

            {/* ================= NAVBAR ================= */}

            <Navbar />

            {/* ================= MAIN ================= */}

            <div className="max-w-6xl mx-auto my-10 px-4">

                {/* ================= SEARCH + NEW JOB ================= */}

                <div className="flex items-center justify-between my-5 gap-4">

                    {/* SEARCH */}

                    <input
                        type="text"
                        value={input}
                        placeholder="Filter by title, company or location"
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        className="
                            w-80
                            border
                            border-gray-300
                            rounded-md
                            px-4
                            py-3
                            outline-none
                            focus:border-black
                        "
                    />

                    {/* NEW JOB */}

                    <Button
                        type="button"
                        onClick={() =>
                            navigate("/admin/jobs/create")
                        }
                        className="
                            bg-black
                            text-white
                            px-5
                            py-3
                            rounded-md
                            hover:bg-gray-800
                        "
                    >
                        New Job
                    </Button>

                </div>

                {/* ================= SEARCH RESULT MESSAGE ================= */}

                {input.trim() !== "" &&
                    filteredJobs.length === 0 && (

                        <div className="border rounded-lg p-8 text-center text-gray-500 mb-5">
                            No jobs found for "{input}"
                        </div>

                    )}

                {/* ================= JOB TABLE ================= */}

                <AdminJobsTable
                    jobs={filteredJobs}
                    searchText={input}
                />

            </div>

        </div>
    );
};

export default AdminJobs;