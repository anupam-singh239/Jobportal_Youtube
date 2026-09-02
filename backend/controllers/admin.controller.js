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

        // Check email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        // Remove extra spaces and convert email to lowercase
        const enteredEmail = email.trim().toLowerCase();

        const adminEmail =
            process.env.ADMIN_EMAIL?.trim().toLowerCase();

        const adminPassword =
            process.env.ADMIN_PASSWORD;

        // Check whether Render environment variables exist
        if (!adminEmail || !adminPassword) {
            console.error(
                "ADMIN_EMAIL or ADMIN_PASSWORD is missing in environment variables."
            );

            return res.status(500).json({
                success: false,
                message:
                    "Admin credentials are not configured on the server.",
            });
        }

        // Check admin credentials
        if (
            enteredEmail !== adminEmail ||
            password !== adminPassword
        ) {
            console.log("Admin login failed.");
            console.log(
                "Entered email:",
                enteredEmail
            );
            console.log(
                "Configured admin email:",
                adminEmail
            );

            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials.",
            });
        }

        // ==================================================
        // JWT SECRET
        // ==================================================

        const secret =
            process.env.ADMIN_JWT_SECRET ||
            process.env.SECRET_KEY;

        if (!secret) {
            console.error(
                "ADMIN_JWT_SECRET and SECRET_KEY are both missing."
            );

            return res.status(500).json({
                success: false,
                message:
                    "Admin JWT secret is not configured.",
            });
        }

        // ==================================================
        // CREATE JWT TOKEN
        // ==================================================

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

        // ==================================================
        // SAVE TOKEN IN COOKIE
        // ==================================================

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

        // ==================================================
        // SUCCESS RESPONSE
        // ==================================================

        return res.status(200).json({
            success: true,
            message: "Admin login successful.",
        });

    } catch (error) {
        console.error(
            "Admin Login Error:",
            error
        );

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

        // ==================================================
        // TOTAL COMPANIES
        // ==================================================

        const companies =
            await Company.countDocuments();

        // ==================================================
        // TOTAL JOBS
        // ==================================================

        const jobs =
            await Job.countDocuments();

        // ==================================================
        // TOTAL USERS
        // ==================================================

        const users =
            await User.countDocuments();

        // ==================================================
        // TOTAL APPLICATIONS
        // ==================================================

        const applications =
            await Application.countDocuments();

        // ==================================================
        // RECENT COMPANIES
        // ==================================================

        const recentCompanies =
            await Company.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select(
                    "name logo createdAt"
                );

        // ==================================================
        // RECENT JOBS
        // ==================================================

        const recentJobs =
            await Job.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate(
                    "company",
                    "name logo"
                )
                .select(
                    "title location jobType createdAt company"
                );

        // ==================================================
        // RECENT USERS
        // ==================================================

        const recentUsers =
            await User.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select(
                    "fullname email role createdAt"
                );

        // ==================================================
        // SEND RESPONSE
        // ==================================================

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

        // Clear admin cookie
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