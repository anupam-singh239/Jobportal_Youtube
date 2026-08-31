import React, { useState } from "react";
import { Button } from "@base-ui/react";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);

    // =====================================================
    // CALCULATE DAYS AGO
    // =====================================================

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return 0;

        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();

        const timeDifference =
            currentTime - createdAt;

        return Math.floor(
            timeDifference /
                (1000 * 60 * 60 * 24)
        );
    };

    const daysAgo = daysAgoFunction(
        job?.createdAt
    );

    // =====================================================
    // DETAILS HANDLER
    // =====================================================

    const detailsHandler = () => {
        console.log("FULL JOB:", job);
        console.log("JOB ID:", job?._id);

        if (!job?._id) {
            console.error("Job ID is missing!");
            return;
        }

        navigate(`/description/${job._id}`);
    };

    // =====================================================
    // SAVE HANDLER
    // =====================================================

    const saveHandler = () => {
        setSaved(!saved);
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.4,
                ease: "easeOut",
            }}
            whileHover={{
                y: -5,
            }}
            className="p-5 rounded-md shadow-xl bg-white border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
        >

            {/* =================================================
                TOP SECTION
            ================================================= */}

            <div className="flex items-center justify-between">

                <p className="text-sm text-gray-500">
                    {daysAgo === 0
                        ? "Today"
                        : `${daysAgo} days ago`}
                </p>

                {/* Bookmark */}

                <motion.div
                    whileHover={{
                        scale: 1.08,
                    }}
                    whileTap={{
                        scale: 0.92,
                    }}
                >
                    <Button
                        variant="outline"
                        className={`rounded-full ${
                            saved
                                ? "bg-purple-100 text-purple-700"
                                : "bg-white"
                        }`}
                        size="icon"
                        onClick={saveHandler}
                    >
                        <Bookmark
                            className={
                                saved
                                    ? "fill-current"
                                    : ""
                            }
                        />
                    </Button>
                </motion.div>

            </div>

            {/* =================================================
                COMPANY SECTION
            ================================================= */}

            <div className="flex items-center gap-2 my-2">

                <motion.div
                    whileHover={{
                        scale: 1.05,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                >
                    <Button
                        className="p-2"
                        variant="outline"
                        size="icon"
                    >
                        <img
                            src={
                                job?.company?.logo ||
                                "/default-company-logo.png"
                            }
                            alt={
                                job?.company?.name
                                    ? `${job.company.name} Logo`
                                    : "Company Logo"
                            }
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                                e.currentTarget.onerror = null;

                                e.currentTarget.src =
                                    "/default-company-logo.png";
                            }}
                        />
                    </Button>
                </motion.div>

                <div>

                    <h1 className="font-medium text-lg">
                        {job?.company?.name ||
                            "Company Name"}
                    </h1>

                    <p className="text-sm text-gray-500">
                        {job?.location || "India"}
                    </p>

                </div>

            </div>

            {/* =================================================
                JOB DETAILS
            ================================================= */}

            <div>

                <h1 className="font-bold text-lg my-2">
                    {job?.title || "Job Title"}
                </h1>

                <p className="text-sm text-gray-600 line-clamp-3">
                    {job?.description ||
                        "No description available"}
                </p>

            </div>

            {/* =================================================
                BADGES
            ================================================= */}

            <div className="flex items-center gap-2 mt-4 flex-wrap">

                {/* Positions */}

                <motion.div
                    whileHover={{
                        scale: 1.05,
                    }}
                >
                    <Badge
                        className="bg-blue-100 text-blue-700 border border-blue-200 font-bold px-3 py-1 rounded-md"
                        variant="outline"
                    >
                        {job?.position || 0} Positions
                    </Badge>
                </motion.div>

                {/* Job Type */}

                <motion.div
                    whileHover={{
                        scale: 1.05,
                    }}
                >
                    <Badge
                        className="bg-red-100 text-red-600 border border-red-200 font-bold px-3 py-1 rounded-md"
                        variant="outline"
                    >
                        {job?.jobType || "Full Time"}
                    </Badge>
                </motion.div>

                {/* Salary */}

                <motion.div
                    whileHover={{
                        scale: 1.05,
                    }}
                >
                    <Badge
                        className="bg-purple-100 text-purple-700 border border-purple-200 font-bold px-3 py-1 rounded-md"
                        variant="outline"
                    >
                        {job?.salary || 0} LPA
                    </Badge>
                </motion.div>

            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="flex items-center gap-4 mt-4">

                {/* DETAILS */}

                <motion.div
                    whileHover={{
                        scale: 1.03,
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                >
                    <Button
                        onClick={detailsHandler}
                        variant="outline"
                        className="px-5 py-2 rounded-lg font-semibold bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Details
                    </Button>
                </motion.div>

                {/* SAVE */}

                <motion.div
                    whileHover={{
                        scale: 1.03,
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                >
                    <Button
                        onClick={saveHandler}
                        className={`
                            px-5 py-2 rounded-lg font-semibold
                            transition-all duration-300
                            shadow-md hover:shadow-lg
                            ${
                                saved
                                    ? "bg-black text-white hover:bg-gray-900"
                                    : "bg-[#7209B7] text-white hover:bg-[#5f0798]"
                            }
                        `}
                    >
                        {saved
                            ? "Saved ✓"
                            : "Save For Later"}
                    </Button>
                </motion.div>

            </div>

        </motion.div>
    );
};

export default Job;