import React, { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import { JOB_API_END_POINT } from "@/utils/constant";

const EditJob = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(true);

    const [updating, setUpdating] =
        useState(false);

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: "",
    });

    // ======================================================
    // FETCH JOB
    // ======================================================

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);

                const res =
                    await axios.get(
                        `${JOB_API_END_POINT}/get/${id}`,
                        {
                            withCredentials: true,
                        }
                    );

                if (
                    res.data?.success &&
                    res.data?.job
                ) {
                    const job =
                        res.data.job;

                    setInput({
                        title:
                            job.title || "",

                        description:
                            job.description ||
                            "",

                        requirements:
                            Array.isArray(
                                job.requirements
                            )
                                ? job.requirements.join(
                                      ", "
                                  )
                                : job.requirements ||
                                  "",

                        salary:
                            job.salary ?? "",

                        location:
                            job.location || "",

                        jobType:
                            job.jobType || "",

                        experience:
                            job.experienceLevel ??
                            "",

                        position:
                            job.position ?? "",

                        companyId:
                            job.company?._id ||
                            job.company ||
                            "",
                    });
                } else {
                    toast.error(
                        "Job not found"
                    );
                }
            } catch (error) {
                console.error(
                    "Get Job Error:",
                    error
                );

                console.error(
                    "Status:",
                    error?.response?.status
                );

                console.error(
                    "Response:",
                    error?.response?.data
                );

                toast.error(
                    error?.response?.data
                        ?.message ||
                        "Failed to load job"
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    // ======================================================
    // INPUT CHANGE
    // ======================================================

    const changeEventHandler = (e) => {
        const {
            name,
            value,
        } = e.target;

        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ======================================================
    // UPDATE JOB
    // ======================================================

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setUpdating(true);

            const res =
                await axios.put(
                    `${JOB_API_END_POINT}/update/${id}`,
                    input,
                    {
                        withCredentials: true,
                    }
                );

            if (res.data?.success) {
                toast.success(
                    res.data.message ||
                        "Job updated successfully"
                );

                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(
                "Update Job Error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                    "Failed to update job"
            );
        } finally {
            setUpdating(false);
        }
    };

    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600">
                        Loading job...
                    </p>
                </div>
            </div>
        );
    }

    // ======================================================
    // PAGE
    // ======================================================

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">

            <div className="max-w-4xl mx-auto">

                {/* HEADER */}

                <div className="mb-6">

                    <h1 className="text-2xl font-bold text-gray-900">
                        Edit Job
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Update only the information
                        you want to change.
                    </p>

                </div>

                {/* FORM */}

                <form
                    onSubmit={submitHandler}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
                >

                    {/* =====================================
                        JOB TITLE
                    ===================================== */}

                    <div className="mb-5">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={
                                changeEventHandler
                            }
                            placeholder="Job Title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                        />

                    </div>

                    {/* =====================================
                        DESCRIPTION
                    ===================================== */}

                    <div className="mb-5">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                input.description
                            }
                            onChange={
                                changeEventHandler
                            }
                            rows={6}
                            placeholder="Job Description"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                        />

                    </div>

                    {/* =====================================
                        REQUIREMENTS
                    ===================================== */}

                    <div className="mb-5">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Requirements
                        </label>

                        <input
                            type="text"
                            name="requirements"
                            value={
                                input.requirements
                            }
                            onChange={
                                changeEventHandler
                            }
                            placeholder="React, Node.js, MongoDB"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Use comma between
                            requirements.
                        </p>

                    </div>

                    {/* =====================================
                        GRID
                    ===================================== */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* SALARY */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Salary
                            </label>

                            <input
                                type="number"
                                name="salary"
                                value={
                                    input.salary
                                }
                                onChange={
                                    changeEventHandler
                                }
                                placeholder="Salary"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                            />

                        </div>

                        {/* LOCATION */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={
                                    input.location
                                }
                                onChange={
                                    changeEventHandler
                                }
                                placeholder="Location"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                            />

                        </div>

                        {/* JOB TYPE */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Type
                            </label>

                            <input
                                type="text"
                                name="jobType"
                                value={
                                    input.jobType
                                }
                                onChange={
                                    changeEventHandler
                                }
                                placeholder="Full Time"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                            />

                        </div>

                        {/* EXPERIENCE */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Experience
                            </label>

                            <input
                                type="number"
                                name="experience"
                                value={
                                    input.experience
                                }
                                onChange={
                                    changeEventHandler
                                }
                                placeholder="Experience"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                            />

                        </div>

                        {/* POSITION */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Positions
                            </label>

                            <input
                                type="number"
                                name="position"
                                value={
                                    input.position
                                }
                                onChange={
                                    changeEventHandler
                                }
                                placeholder="Number of Positions"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                            />

                        </div>

                    </div>

                    {/* =====================================
                        BUTTONS
                    ===================================== */}

                    <div className="flex justify-end gap-3 mt-8">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/jobs"
                                )
                            }
                            className="px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={updating}
                            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {updating
                                ? "Updating..."
                                : "Update Job"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default EditJob;