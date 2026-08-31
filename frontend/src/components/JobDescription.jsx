import React, {
    useEffect,
    useState,
} from "react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import { useParams } from "react-router-dom";

import axios from "axios";

import {
    APPLICATION_API_END_POINT,
    JOB_API_END_POINT,
} from "@/utils/constant";

import {
    setSingleJob,
} from "@/redux/jobSlice";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import toast from "react-hot-toast";

const JobDescription = () => {

    // =====================================================
    // PARAMS
    // =====================================================

    const params = useParams();

    const jobId = params.id;

    // =====================================================
    // REDUX
    // =====================================================

    const dispatch = useDispatch();

    const { singleJob } = useSelector(
        (store) => store.job
    );

    const { user } = useSelector(
        (store) => store.auth
    );

    // =====================================================
    // STATE
    // =====================================================

    const [isApplied, setIsApplied] =
        useState(false);

    const [isApplying, setIsApplying] =
        useState(false);

    // =====================================================
    // APPLY JOB
    // =====================================================

    const applyJobHandler = async () => {

        // Check login

        if (!user?._id) {
            toast.error(
                "Please login before applying."
            );
            return;
        }

        // Check Job ID

        if (!jobId) {
            toast.error(
                "Job ID is missing."
            );
            return;
        }

        try {

            setIsApplying(true);

            console.log(
                "Applying for Job:",
                jobId
            );

            // IMPORTANT:
            // Backend route is POST /apply/:id

            const res =
                await axios.post(
                    `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                    {},
                    {
                        withCredentials: true,
                    }
                );

            console.log(
                "APPLY JOB RESPONSE:",
                res.data
            );

            if (res.data?.success) {

                // Update button

                setIsApplied(true);

                // Update Redux job

                const updatedSingleJob = {
                    ...singleJob,

                    applications: [
                        ...(singleJob?.applications ||
                            []),

                        {
                            _id:
                                res.data
                                    ?.application
                                    ?._id,

                            applicant:
                                user?._id,

                            status:
                                "pending",
                        },
                    ],
                };

                dispatch(
                    setSingleJob(
                        updatedSingleJob
                    )
                );

                toast.success(
                    res.data.message ||
                    "Job applied successfully."
                );
            }

        } catch (error) {

            console.error(
                "Apply Job Error:",
                error
            );

            console.error(
                "Server Response:",
                error?.response?.data
            );

            toast.error(
                error?.response?.data
                    ?.message ||
                "Failed to apply for job."
            );

        } finally {

            setIsApplying(false);

        }
    };

    // =====================================================
    // FETCH SINGLE JOB
    // =====================================================

    useEffect(() => {

        const fetchSingleJob =
            async () => {

                try {

                    console.log(
                        "Fetching Job:",
                        jobId
                    );

                    const res =
                        await axios.get(
                            `${JOB_API_END_POINT}/get/${jobId}`,
                            {
                                withCredentials:
                                    true,
                            }
                        );

                    console.log(
                        "SINGLE JOB RESPONSE:",
                        res.data
                    );

                    if (
                        res.data?.success
                    ) {

                        const job =
                            res.data.job;

                        // Store job in Redux

                        dispatch(
                            setSingleJob(
                                job
                            )
                        );

                        // =================================================
                        // CHECK ALREADY APPLIED
                        // =================================================

                        const alreadyApplied =
                            job?.applications?.some(
                                (application) => {

                                    const applicantId =
                                        application
                                            ?.applicant
                                            ?._id ||
                                        application
                                            ?.applicant;

                                    return (
                                        applicantId
                                            ?.toString() ===
                                        user?._id
                                            ?.toString()
                                    );
                                }
                            ) || false;

                        setIsApplied(
                            alreadyApplied
                        );
                    }

                } catch (error) {

                    console.error(
                        "Fetch Single Job Error:",
                        error?.response
                            ?.data ||
                        error.message
                    );

                    toast.error(
                        error?.response
                            ?.data
                            ?.message ||
                        "Failed to load job."
                    );
                }
            };

        if (jobId) {
            fetchSingleJob();
        }

    }, [
        jobId,
        dispatch,
        user?._id,
    ]);

    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="max-w-7xl mx-auto my-10 px-4">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="font-bold text-xl">
                        {singleJob?.title ||
                            "Job Title"}
                    </h1>

                    <div className="flex items-center gap-2 mt-4 flex-wrap">

                        {/* Positions */}

                        <Badge
                            className="bg-blue-100 text-blue-700 border border-blue-200 font-bold px-3 py-1 rounded-md"
                            variant="outline"
                        >
                            {singleJob?.position ||
                                0}{" "}
                            Positions
                        </Badge>

                        {/* Job Type */}

                        <Badge
                            className="bg-red-100 text-red-600 border border-red-200 font-bold px-3 py-1 rounded-md"
                            variant="outline"
                        >
                            {singleJob?.jobType ||
                                "N/A"}
                        </Badge>

                        {/* Salary */}

                        <Badge
                            className="bg-purple-100 text-purple-700 border border-purple-200 font-bold px-3 py-1 rounded-md"
                            variant="outline"
                        >
                            {singleJob?.salary ||
                                0}{" "}
                            LPA
                        </Badge>

                    </div>

                </div>

                {/* =================================================
                    APPLY BUTTON
                ================================================= */}

                <Button
                    onClick={
                        isApplied
                            ? undefined
                            : applyJobHandler
                    }
                    disabled={
                        isApplied ||
                        isApplying
                    }
                    className={
                        isApplied
                            ? "bg-gray-500 text-white cursor-not-allowed px-6 py-2.5 rounded-lg"
                            : "bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg"
                    }
                >

                    {isApplying
                        ? "Applying..."
                        : isApplied
                        ? "Already Applied"
                        : "Apply Now"}

                </Button>

            </div>

            {/* =================================================
                COMPANY INFORMATION
            ================================================= */}

            <div className="flex items-center gap-3 mt-6">

                <img
                    src={
                        singleJob
                            ?.company
                            ?.logo ||
                        "/default-company-logo.png"
                    }
                    alt={
                        singleJob
                            ?.company
                            ?.name ||
                        "Company Logo"
                    }
                    className="w-14 h-14 rounded-full object-cover border"
                    onError={(e) => {

                        e.currentTarget.onerror =
                            null;

                        e.currentTarget.src =
                            "/default-company-logo.png";
                    }}
                />

                <div>

                    <h2 className="font-semibold text-lg">
                        {singleJob
                            ?.company
                            ?.name ||
                            "Company Name"}
                    </h2>

                    <p className="text-gray-500">
                        {singleJob
                            ?.location ||
                            "India"}
                    </p>

                </div>

            </div>

            {/* =================================================
                JOB DESCRIPTION
            ================================================= */}

            <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6">
                Job Description
            </h1>

            <div className="my-4">

                {/* Role */}

                <h1 className="font-bold my-2">

                    Role:

                    <span className="pl-4 font-normal text-gray-800">

                        {singleJob?.title ||
                            "N/A"}

                    </span>

                </h1>

                {/* Location */}

                <h1 className="font-bold my-2">

                    Location:

                    <span className="pl-4 font-normal text-gray-800">

                        {singleJob?.location ||
                            "N/A"}

                    </span>

                </h1>

                {/* Description */}

                <h1 className="font-bold my-2">

                    Description:

                    <span className="pl-4 font-normal text-gray-800">

                        {singleJob
                            ?.description ||
                            "N/A"}

                    </span>

                </h1>

                {/* Experience */}

                <h1 className="font-bold my-2">

                    Experience:

                    <span className="pl-4 font-normal text-gray-800">

                        {singleJob
                            ?.experienceLevel ??
                            0}{" "}
                        Year

                    </span>

                </h1>

                {/* Salary */}

                <h1 className="font-bold my-2">

                    Salary:

                    <span className="pl-4 font-normal text-gray-800">

                        {singleJob
                            ?.salary ??
                            0}{" "}
                        LPA

                    </span>

                </h1>

                {/* Total Applications */}

                <h1 className="font-bold my-2">

                    Total Application:

                    <span className="pl-4 font-normal text-gray-800">

                        {singleJob
                            ?.applications
                            ?.length ??
                            0}

                    </span>

                </h1>

                {/* Posted Date */}

                <h1 className="font-bold my-2">

                    Posted Date:

                    <span className="pl-4 font-normal text-gray-800">

                        {singleJob?.createdAt
                            ? singleJob.createdAt.split(
                                "T"
                            )[0]
                            : "N/A"}

                    </span>

                </h1>

            </div>

        </div>
    );
};

export default JobDescription;