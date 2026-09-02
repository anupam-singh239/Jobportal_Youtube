import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

// ======================================================
// ADMIN LOGIN
// ======================================================

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const enteredEmail = email.trim().toLowerCase();

        const adminEmail =
            process.env.ADMIN_EMAIL?.trim().toLowerCase();

        const adminPassword =
            process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            return res.status(500).json({
                success: false,
                message:
                    "Admin credentials are not configured on the server.",
            });
        }

        if (
            enteredEmail !== adminEmail ||
            password !== adminPassword
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials.",
            });
        }

        const secret =
            process.env.ADMIN_JWT_SECRET ||
            process.env.SECRET_KEY;

        if (!secret) {
            return res.status(500).json({
                success: false,
                message:
                    "Admin JWT secret is not configured.",
            });
        }

        const token = jwt.sign(
            {
                isAdmin: true,
                email: adminEmail,
            },
            secret,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure:
                process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Admin login successful.",
        });

    } catch (error) {
        console.error("Admin Login Error:", error);

        return res.status(500).json({
            success: false,
            message:
                "Server error during admin login.",
        });
    }
};

// ======================================================
// ADMIN DASHBOARD STATS
// ======================================================

export const getAdminStats = async (req, res) => {
    try {
        const companies =
            await Company.countDocuments();

        const jobs =
            await Job.countDocuments();

        const users =
            await User.countDocuments();

        const applications =
            await Application.countDocuments();

        const recentCompanies =
            await Company.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select("name logo createdAt");

        const recentJobs =
            await Job.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate("company", "name logo")
                .select(
                    "title location jobType createdAt company"
                );

        const recentUsers =
            await User.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select(
                    "fullname email phoneNumber role profile createdAt"
                );

        return res.status(200).json({
            success: true,

            stats: {
                companies,
                jobs,
                users,
                applications,
            },

            recentCompanies,
            recentJobs,
            recentUsers,
        });

    } catch (error) {
        console.error(
            "Admin Dashboard Stats Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch admin dashboard data.",
        });
    }
};

// ======================================================
// GET ALL COMPANIES - ADMIN
// ======================================================

export const getAllCompaniesAdmin = async (req, res) => {
    try {
        const companies = await Company.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            companies,
        });

    } catch (error) {
        console.error(
            "Admin Get Companies Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch companies.",
        });
    }
};

// ======================================================
// DELETE COMPANY - ADMIN
// ======================================================

export const deleteCompanyAdmin = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company =
            await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found.",
            });
        }

        await Company.findByIdAndDelete(companyId);

        return res.status(200).json({
            success: true,
            message: "Company deleted successfully.",
        });

    } catch (error) {
        console.error(
            "Admin Delete Company Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete company.",
        });
    }
};

// ======================================================
// GET ALL JOBS - ADMIN
// ======================================================

export const getAllJobsAdmin = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("company", "name logo")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            jobs,
        });

    } catch (error) {
        console.error(
            "Admin Get Jobs Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch jobs.",
        });
    }
};

// ======================================================
// DELETE JOB - ADMIN
// ======================================================

export const deleteJobAdmin = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job =
            await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found.",
            });
        }

        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully.",
        });

    } catch (error) {
        console.error(
            "Admin Delete Job Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete job.",
        });
    }
};

// ======================================================
// GET ALL USERS - ADMIN
// ======================================================

export const getAllUsersAdmin = async (req, res) => {
    try {
        const users = await User.find()
            .select(
                "-password"
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            users,
        });

    } catch (error) {
        console.error(
            "Admin Get Users Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users.",
        });
    }
};

// ======================================================
// GET ALL APPLICATIONS - ADMIN
// ======================================================

export const getAllApplicationsAdmin = async (req, res) => {
    try {
        const applications =
            await Application.find()
                .populate(
                    "applicant",
                    "-password"
                )
                .populate(
                    {
                        path: "job",
                        populate: {
                            path: "company",
                            select: "name logo",
                        },
                    }
                )
                .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            applications,
        });

    } catch (error) {
        console.error(
            "Admin Get Applications Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch applications.",
        });
    }
};

// ======================================================
// UPDATE APPLICATION STATUS - ADMIN
// ======================================================

export const updateApplicationStatusAdmin = async (
    req,
    res
) => {
    try {
        const applicationId =
            req.params.id;

        const { status } =
            req.body;

        if (
            !["pending", "accepted", "rejected"]
                .includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid application status.",
            });
        }

        const application =
            await Application.findById(
                applicationId
            );

        if (!application) {
            return res.status(404).json({
                success: false,
                message:
                    "Application not found.",
            });
        }

        application.status = status;

        await application.save();

        return res.status(200).json({
            success: true,
            message:
                "Application status updated successfully.",
            application,
        });

    } catch (error) {
        console.error(
            "Admin Update Application Status Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to update application status.",
        });
    }
};

// ======================================================
// ADMIN LOGOUT
// ======================================================

export const adminLogout = async (req, res) => {
    try {
        res.clearCookie(
            "adminToken",
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite:
                    process.env.NODE_ENV ===
                    "production"
                        ? "none"
                        : "lax",
            }
        );

        return res.status(200).json({
            success: true,
            message:
                "Admin logout successful.",
        });

    } catch (error) {
        console.error(
            "Admin Logout Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to logout.",
        });
    }
};