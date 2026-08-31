import React, { useEffect } from "react";
import Navbar from "./ui/shared/Navbar";
import Job from "./Job";

import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {

    // Fetch jobs according to search query
    useGetAllJobs();

    const { allJobs = [], searchedQuery = "" } = useSelector(
        (store) => store.job || {}
    );

    const dispatch = useDispatch();

    // Clear search when leaving Browse page
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div>

            {/* NAVBAR */}
            <Navbar />

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto my-10 px-4">

                {/* TITLE */}
                <h1 className="font-bold text-xl my-10">
                    {searchedQuery
                        ? `Search Results for "${searchedQuery}"`
                        : "All Jobs"
                    }

                    {" "}({allJobs.length})
                </h1>

                {/* NO JOB */}
                {allJobs.length === 0 ? (

                    <div className="text-center py-10">

                        <p className="text-gray-500">
                            {searchedQuery
                                ? `No jobs found for "${searchedQuery}".`
                                : "No jobs found."
                            }
                        </p>

                    </div>

                ) : (

                    /* JOB GRID */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {allJobs.map((job) => (

                            <Job
                                key={job?._id}
                                job={job}
                            />

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default Browse;