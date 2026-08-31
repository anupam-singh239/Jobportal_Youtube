import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "0",
        companyId: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { companies = [] } = useSelector(
        (store) => store.company
    );

    // Input change
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    // Company select
    const selectChangeHandler = (e) => {
        const companyId = e.target.value;

        setInput({
            ...input,
            companyId,
        });
    };

    // Submit
    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.companyId) {
            toast.error("Please select a company");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${JOB_API_END_POINT}/post`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data?.success) {
                toast.success(
                    res.data.message || "Job posted successfully"
                );

                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error("Post Job Error:", error);

            toast.error(
                error?.response?.data?.message ||
                    "Failed to post job"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="flex justify-center w-full my-8 px-4">
                <form
                    onSubmit={submitHandler}
                    className="p-8 w-full max-w-4xl border border-gray-200 shadow-lg rounded-md bg-white"
                >
                    <h1 className="text-2xl font-bold mb-6">
                        Post New Job
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Title */}
                        <div>
                            <label className="font-semibold">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                placeholder="Enter job title"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="font-semibold">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Enter job description"
                                rows="3"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Requirements */}
                        <div>
                            <label className="font-semibold">
                                Requirements
                            </label>

                            <input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder="e.g. React, JavaScript, MongoDB"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="font-semibold">
                                Salary
                            </label>

                            <input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                placeholder="e.g. 5-8 LPA"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="font-semibold">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="e.g. Indore"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Job Type */}
                        <div>
                            <label className="font-semibold">
                                Job Type
                            </label>

                            <input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                placeholder="e.g. Full Time"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="font-semibold">
                                Experience Level
                            </label>

                            <input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                placeholder="e.g. 0-2 Years"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Position */}
                        <div>
                            <label className="font-semibold">
                                No. of Positions
                            </label>

                            <input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                min="1"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label className="font-semibold">
                                Select Company
                            </label>

                            {companies.length > 0 ? (
                                <select
                                    name="companyId"
                                    value={input.companyId}
                                    onChange={selectChangeHandler}
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-purple-500"
                                    required
                                >
                                    <option value="">
                                        Select a Company
                                    </option>

                                    {companies.map((company) => (
                                        <option
                                            key={company._id}
                                            value={company._id}
                                        >
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-sm text-red-600 mt-2">
                                    Please register a company first.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={
                            loading || companies.length === 0
                        }
                        className="w-full mt-6 bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Posting Job...
                            </span>
                        ) : (
                            "Post New Job"
                        )}
                    </button>

                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-bold text-center mt-3">
                            *Please register a company first before
                            posting a job.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;