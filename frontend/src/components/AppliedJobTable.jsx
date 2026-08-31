import React from "react";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
    // Redux se applied jobs
    const allAppliedJobs =
        useSelector((store) => store.job?.allAppliedJobs) || [];

    return (
        <div className="w-full">

            {/* Caption */}
            <p className="text-sm text-gray-500 mb-3">
                A list of your applied jobs
            </p>

            {/* Empty State */}
            {allAppliedJobs.length === 0 ? (

                <div className="border border-gray-200 rounded-lg p-8 text-center">
                    <p className="text-gray-500">
                        You haven't applied for any job yet.
                    </p>
                </div>

            ) : (

                /* Table */
                <div className="border border-gray-200 rounded-lg overflow-hidden">

                    <table className="w-full text-sm">

                        {/* ================= HEADER ================= */}

                        <thead className="bg-gray-50">

                            <tr className="border-b border-gray-200">

                                <th className="text-left px-4 py-3 font-semibold">
                                    Date
                                </th>

                                <th className="text-left px-4 py-3 font-semibold">
                                    Job Role
                                </th>

                                <th className="text-left px-4 py-3 font-semibold">
                                    Company
                                </th>

                                <th className="text-right px-4 py-3 font-semibold">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        {/* ================= BODY ================= */}

                        <tbody>

                            {allAppliedJobs.map((appliedJob) => {

                                const status =
                                    appliedJob?.status || "pending";

                                return (

                                    <tr
                                        key={appliedJob?._id}
                                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                                    >

                                        {/* DATE */}

                                        <td className="px-4 py-3">

                                            {appliedJob?.createdAt
                                                ? new Date(
                                                    appliedJob.createdAt
                                                ).toLocaleDateString("en-IN")
                                                : "N/A"}

                                        </td>


                                        {/* JOB ROLE */}

                                        <td className="px-4 py-3 font-medium">

                                            {appliedJob?.job?.title ||
                                                "Job not available"}

                                        </td>


                                        {/* COMPANY */}

                                        <td className="px-4 py-3">

                                            {appliedJob?.job?.company?.name ||
                                                "Company not available"}

                                        </td>


                                        {/* STATUS */}

                                        <td className="px-4 py-3 text-right">

                                            <span
                                                className={`
                                                    inline-flex
                                                    px-2.5
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-medium
                                                    ${
                                                        status === "accepted"
                                                            ? "bg-green-100 text-green-700"
                                                            : status === "rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }
                                                `}
                                            >

                                                {status === "accepted"
                                                    ? "Accepted"
                                                    : status === "rejected"
                                                    ? "Rejected"
                                                    : "Pending"}

                                            </span>

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};

export default AppliedJobTable;