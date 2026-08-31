import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// ======================================================
// APPLY JOB
// ======================================================

export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        console.log("================================");
        console.log("APPLY JOB");
        console.log("Job ID:", jobId);
        console.log("User ID:", userId);
        console.log("================================");

        if (!userId) {
            return res.status(401).json({
                message: "Please login before applying for a job.",
                success: false,
            });
        }

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false,
            });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (alreadyApplied) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false,
            });
        }

        const application = await Application.create({
            job: jobId,
            applicant: userId,
            status: "pending",
        });

        if (!job.applications) {
            job.applications = [];
        }

        job.applications.push(application._id);

        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            application,
            success: true,
        });

    } catch (error) {
        console.error("Apply Job Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};


// ======================================================
// GET USER APPLIED JOBS
// ======================================================

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized.",
                success: false,
            });
        }

        const applications = await Application.find({
            applicant: userId,
        })
            .populate({
                path: "job",
                populate: {
                    path: "company",
                },
            })
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            applications,
            success: true,
        });

    } catch (error) {
        console.error("Get Applied Jobs Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};


// ======================================================
// GET APPLICANTS FOR ADMIN JOB
// ======================================================

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        console.log("================================");
        console.log("GET APPLICANTS");
        console.log("Job ID:", jobId);
        console.log("================================");

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false,
            });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        const applications = await Application.find({
            job: jobId,
        })
            .populate("applicant", "-password")
            .populate("job")
            .sort({
                createdAt: -1,
            });

        console.log("Applications found:", applications.length);

        return res.status(200).json({
            applications,
            success: true,
        });

    } catch (error) {
        console.error("Get Applicants Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};


// ======================================================
// UPDATE APPLICATION STATUS
// ======================================================

export const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;

        if (!applicationId) {
            return res.status(400).json({
                message: "Application ID is required.",
                success: false,
            });
        }

        if (!["pending", "accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid application status.",
                success: false,
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false,
            });
        }

        application.status = status;

        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully.",
            application,
            success: true,
        });

    } catch (error) {
        console.error("Update Application Status Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};