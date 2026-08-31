import React, { useMemo, useState } from "react";
import Navbar from "./ui/shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const Jobs = () => {

    const { allJobs = [] } = useSelector(
        (store) => store.job
    );

    const [filters, setFilters] = useState({
        Location: "",
        Industry: "",
        Salary: "",
    });

    // ==========================================
    // FILTER JOBS
    // ==========================================

    const filteredJobs = useMemo(() => {

        return allJobs.filter((job) => {

            // ===============================
            // LOCATION FILTER
            // ===============================

            if (filters.Location) {

                const jobLocation =
                    job?.location?.toLowerCase() || "";

                const selectedLocation =
                    filters.Location.toLowerCase();

                if (
                    !jobLocation.includes(
                        selectedLocation
                    )
                ) {
                    return false;
                }
            }

            // ===============================
            // INDUSTRY FILTER
            // ===============================

            if (filters.Industry) {

                const normalizeText = (text = "") => {
                    return text
                        .toLowerCase()
                        .replace(/[-_]/g, " ")
                        .replace(/\s+/g, " ")
                        .trim();
                };

                const selectedIndustry =
                    normalizeText(filters.Industry);

                const title =
                    normalizeText(job?.title);

                const description =
                    normalizeText(job?.description);

                const jobType =
                    normalizeText(job?.jobType);

                const requirements =
                    Array.isArray(job?.requirements)
                        ? job.requirements
                            .map((item) =>
                                normalizeText(item)
                            )
                            .join(" ")
                        : normalizeText(
                            job?.requirements
                        );

                const searchableText = `
                    ${title}
                    ${description}
                    ${jobType}
                    ${requirements}
                `;

                if (
                    !searchableText.includes(
                        selectedIndustry
                    )
                ) {
                    return false;
                }
            }

            // ===============================
            // SALARY FILTER
            // ===============================

            if (filters.Salary) {

                const salary =
                    Number(job?.salary) || 0;

                switch (filters.Salary) {

                    case "0-2 LPA":

                        if (
                            salary < 0 ||
                            salary > 2
                        ) {
                            return false;
                        }

                        break;

                    case "2-5 LPA":

                        if (
                            salary <= 2 ||
                            salary > 5
                        ) {
                            return false;
                        }

                        break;

                    case "5-10 LPA":

                        if (
                            salary <= 5 ||
                            salary > 10
                        ) {
                            return false;
                        }

                        break;

                    case "10-20 LPA":

                        if (
                            salary <= 10 ||
                            salary > 20
                        ) {
                            return false;
                        }

                        break;

                    case "20+ LPA":

                        if (salary <= 20) {
                            return false;
                        }

                        break;

                    default:
                        break;
                }
            }

            return true;
        });

    }, [allJobs, filters]);


    return (
        <div className="min-h-screen bg-gray-50">

            {/* ================= NAVBAR ================= */}

            <Navbar />


            {/* ================= MAIN ================= */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 15,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                }}
                className="max-w-7xl mx-auto mt-5 px-4"
            >

                <div className="flex gap-5">

                    {/* ================= FILTER ================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -25,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.45,
                        }}
                        className="w-[250px] flex-shrink-0"
                    >

                        <FilterCard
                            onFilterChange={setFilters}
                        />

                    </motion.div>


                    {/* ================= JOBS ================= */}

                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">

                        {filteredJobs.length === 0 ? (

                            /* ================= NO JOB ================= */

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="flex items-center justify-center h-40"
                            >

                                <div className="text-center">

                                    <p className="font-semibold text-lg">
                                        Job not found
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Try changing your filters.
                                    </p>

                                </div>

                            </motion.div>

                        ) : (

                            /* ================= JOB GRID ================= */

                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >

                                <AnimatePresence mode="popLayout">

                                    {filteredJobs.map(
                                        (job, index) => (

                                            <motion.div
                                                key={job?._id}
                                                layout
                                                initial={{
                                                    opacity: 0,
                                                    y: 25,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -15,
                                                }}
                                                transition={{
                                                    duration: 0.35,
                                                    delay:
                                                        index * 0.04,
                                                }}
                                                whileHover={{
                                                    y: -4,
                                                }}
                                            >

                                                <Job
                                                    job={job}
                                                />

                                            </motion.div>

                                        )
                                    )}

                                </AnimatePresence>

                            </motion.div>

                        )}

                    </div>

                </div>

            </motion.div>

        </div>
    );
};

export default Jobs;