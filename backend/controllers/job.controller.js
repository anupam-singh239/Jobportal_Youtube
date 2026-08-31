import { Job } from "../models/job.model.js";

// ======================================================
// POST JOB
// ======================================================

export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId,
        } = req.body;

        const userId = req.id;

        // Required fields check
        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            experience === undefined ||
            position === undefined ||
            !companyId
        ) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false,
            });
        }

        // Convert requirements into array
        let requirementsArray = [];

        if (typeof requirements === "string") {
            requirementsArray = requirements
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item !== "");
        } else if (Array.isArray(requirements)) {
            requirementsArray = requirements
                .map((item) => String(item).trim())
                .filter((item) => item !== "");
        }

        const job = await Job.create({
            title: title.trim(),

            description: description.trim(),

            requirements: requirementsArray,

            salary: Number(salary),

            location: location.trim(),

            jobType: jobType.trim(),

            experienceLevel: Number(experience),

            position: Number(position),

            company: companyId,

            createdBy: userId,
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true,
        });

    } catch (error) {
        console.error("Post Job Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};


// ======================================================
// GET ALL JOBS
// ======================================================

export const getAllJobs = async (req, res) => {
    try {
        const keyword = (req.query.keyword || "").trim();

        let query = {};

        // Search only when keyword is entered
        if (keyword) {
            query = {
                $or: [
                    {
                        title: {
                            $regex: keyword,
                            $options: "i",
                        },
                    },
                    {
                        description: {
                            $regex: keyword,
                            $options: "i",
                        },
                    },
                    {
                        location: {
                            $regex: keyword,
                            $options: "i",
                        },
                    },
                    {
                        jobType: {
                            $regex: keyword,
                            $options: "i",
                        },
                    },
                    {
                        requirements: {
                            $regex: keyword,
                            $options: "i",
                        },
                    },
                ],
            };
        }

        const jobs = await Job.find(query)
            .populate("company")
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            jobs,
            success: true,
        });

    } catch (error) {
        console.error("Get All Jobs Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};


// ======================================================
// GET JOB BY ID
// ======================================================

export const getJobbyId = async (req, res) => {
    try {
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false,
            });
        }

        const job = await Job.findById(jobId)
            .populate({
                path: "applications",
                populate: {
                    path: "applicant",
                    select: "_id fullname email phoneNumber profile",
                },
            })
            .populate("company");

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });

    } catch (error) {
        console.error("Get Job By ID Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};


// ======================================================
// GET ADMIN JOBS
// ======================================================

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({
            createdBy: adminId,
        })
            .populate("company")
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            jobs,
            success: true,
        });

    } catch (error) {
        console.error("Get Admin Jobs Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};


// ======================================================
// UPDATE JOB
// ======================================================

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId,
        } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        // Check job owner
        if (
            job.createdBy &&
            job.createdBy.toString() !== userId.toString()
        ) {
            return res.status(403).json({
                message:
                    "You are not authorized to update this job.",
                success: false,
            });
        }

        // Title
        if (
            title !== undefined &&
            title.trim() !== ""
        ) {
            job.title = title.trim();
        }

        // Description
        if (
            description !== undefined &&
            description.trim() !== ""
        ) {
            job.description = description.trim();
        }

        // Requirements
        if (requirements !== undefined) {
            let requirementsArray = [];

            if (typeof requirements === "string") {
                requirementsArray = requirements
                    .split(",")
                    .map((item) => item.trim())
                    .filter((item) => item !== "");
            }

            if (Array.isArray(requirements)) {
                requirementsArray = requirements
                    .map((item) => String(item).trim())
                    .filter((item) => item !== "");
            }

            if (requirementsArray.length > 0) {
                job.requirements = requirementsArray;
            }
        }

        // Salary
        if (
            salary !== undefined &&
            salary !== ""
        ) {
            job.salary = Number(salary);
        }

        // Location
        if (
            location !== undefined &&
            location.trim() !== ""
        ) {
            job.location = location.trim();
        }

        // Job Type
        if (
            jobType !== undefined &&
            jobType.trim() !== ""
        ) {
            job.jobType = jobType.trim();
        }

        // Experience
        if (
            experience !== undefined &&
            experience !== ""
        ) {
            job.experienceLevel = Number(experience);
        }

        // Position
        if (
            position !== undefined &&
            position !== ""
        ) {
            job.position = Number(position);
        }

        // Company
        if (
            companyId !== undefined &&
            companyId !== ""
        ) {
            job.company = companyId;
        }

        await job.save();

        const updatedJob = await Job.findById(jobId)
            .populate("company");

        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true,
        });

    } catch (error) {
        console.error("Update Job Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};


// ======================================================
// DELETE JOB
// ======================================================

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        // Optional security check
        if (
            job.createdBy &&
            req.id &&
            job.createdBy.toString() !== req.id.toString()
        ) {
            return res.status(403).json({
                message:
                    "You are not authorized to delete this job.",
                success: false,
            });
        }

        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true,
        });

    } catch (error) {
        console.error("Delete Job Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};