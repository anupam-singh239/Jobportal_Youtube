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

        // Fixed Admin Credentials
        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
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
                message: "Admin JWT secret is not configured.",
            });
        }

        const token = jwt.sign(
            {
                isAdmin: true,
                email: email,
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
            message: "Server error during admin login.",
        });
    }
};

// ======================================================
// ADMIN DASHBOARD
// ======================================================

export const getAdminStats = async (req, res) => {
    try {

        // TOTAL COMPANIES
        const companies = await Company.countDocuments();

        // TOTAL JOBS
        const jobs = await Job.countDocuments();

        // TOTAL USERS
        const users = await User.countDocuments();

        // TOTAL APPLICATIONS
        const applications = await Application.countDocuments();

        // RECENT COMPANIES
        const recentCompanies = await Company.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("name logo createdAt");

        // RECENT JOBS
        const recentJobs = await Job.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("company", "name logo")
            .select("title location jobType createdAt company");

        // RECENT USERS
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("fullname email role createdAt");

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
// ADMIN LOGOUT
// ======================================================

export const adminLogout = async (req, res) => {
    try {

        res.clearCookie("adminToken", {
            httpOnly: true,

            secure:
                process.env.NODE_ENV === "production",

            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Admin logout successful.",
        });

    } catch (error) {
        console.error(
            "Admin Logout Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to logout.",
        });
    }
};