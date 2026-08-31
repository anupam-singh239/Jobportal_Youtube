import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/Cloudinary.js";


// =====================================================
// REGISTER
// =====================================================

export const register = async (req, res) => {
    try {
        const {
            fullname,
            email,
            phoneNumber,
            password,
            role,
        } = req.body;

        // Check required fields
        if (
            !fullname ||
            !email ||
            !phoneNumber ||
            !password ||
            !role
        ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            email: email.trim(),
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        // Password hash
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Default profile
        const profileData = {
            profilePhoto: "",
        };

        // Profile photo upload
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);

                if (
                    fileUri &&
                    fileUri.content
                ) {
                    const cloudResponse =
                        await cloudinary.uploader.upload(
                            fileUri.content,
                            {
                                folder:
                                    "job-portal-profiles",
                                resource_type:
                                    "image",
                            }
                        );

                    profileData.profilePhoto =
                        cloudResponse.secure_url;
                }
            } catch (uploadError) {
                console.error(
                    "Profile Photo Upload Error:",
                    uploadError
                );

                return res.status(500).json({
                    message:
                        "Profile photo upload failed",
                    success: false,
                });
            }
        }

        // Create user
        const user = await User.create({
            fullname: fullname.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim(),
            password: hashedPassword,
            role,
            profile: profileData,
        });

        console.log(
            "USER CREATED:",
            user._id
        );

        return res.status(201).json({
            message:
                "Account created successfully",
            success: true,
        });

    } catch (error) {
        console.error(
            "Register Error:",
            error
        );

        return res.status(500).json({
            message:
                error.message ||
                "Server error",
            success: false,
        });
    }
};


// =====================================================
// LOGIN
// =====================================================

export const login = async (req, res) => {
    try {
        const {
            email,
            password,
            role,
        } = req.body;

        // Check required fields
        if (
            !email ||
            !password ||
            !role
        ) {
            return res.status(400).json({
                message:
                    "Something is missing",
                success: false,
            });
        }

        // Find user
        const user = await User.findOne({
            email: email.trim(),
        });

        if (!user) {
            return res.status(400).json({
                message:
                    "User does not exist",
                success: false,
            });
        }

        // Check password
        const isPasswordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordMatch) {
            return res.status(400).json({
                message:
                    "Invalid credentials",
                success: false,
            });
        }

        // Check role
        if (role !== user.role) {
            return res.status(400).json({
                message:
                    "Invalid credentials",
                success: false,
            });
        }

        // JWT data
        const tokenData = {
            userId: user._id,
        };

        const token = jwt.sign(
            tokenData,
            process.env.SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );

        // User response
        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber:
                user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie(
                "token",
                token,
                {
                    maxAge:
                        24 *
                        60 *
                        60 *
                        1000,

                    httpOnly: true,

                    sameSite: "strict",
                }
            )
            .json({
                message:
                    `Welcome back ${user.fullname}`,

                user: userData,

                success: true,
            });

    } catch (error) {
        console.error(
            "Login Error:",
            error
        );

        return res.status(500).json({
            message:
                error.message ||
                "Server error",
            success: false,
        });
    }
};


// =====================================================
// LOGOUT
// =====================================================

export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie(
                "token",
                "",
                {
                    maxAge: 0,
                    httpOnly: true,
                    sameSite: "strict",
                }
            )
            .json({
                message:
                    "Logout successfully",
                success: true,
            });

    } catch (error) {
        console.error(
            "Logout Error:",
            error
        );

        return res.status(500).json({
            message:
                "Server error",
            success: false,
        });
    }
};


// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (
    req,
    res
) => {
    try {
        console.log(
            "================================="
        );

        console.log(
            "UPDATE PROFILE REQUEST"
        );

        console.log(
            "================================="
        );

        console.log(
            "Request Body:",
            req.body
        );

        console.log(
            "Request File:",
            req.file
        );


        // =================================================
        // CHECK AUTHENTICATION
        // =================================================

        const userId = req.id;

        if (!userId) {
            return res.status(401).json({
                message:
                    "User not authenticated",
                success: false,
            });
        }


        // =================================================
        // FIND USER
        // =================================================

        const user =
            await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message:
                    "User not found",
                success: false,
            });
        }


        // =================================================
        // GET FORM DATA
        // =================================================

        const {
            fullname,
            email,
            phoneNumber,
            bio,
            skills,
        } = req.body || {};


        // =================================================
        // BASIC DETAILS
        // =================================================

        if (
            fullname !== undefined &&
            typeof fullname === "string" &&
            fullname.trim() !== ""
        ) {
            user.fullname =
                fullname.trim();
        }


        if (
            email !== undefined &&
            typeof email === "string" &&
            email.trim() !== ""
        ) {
            user.email =
                email.trim();
        }


        if (
            phoneNumber !== undefined &&
            typeof phoneNumber === "string" &&
            phoneNumber.trim() !== ""
        ) {
            user.phoneNumber =
                phoneNumber.trim();
        }


        // =================================================
        // PROFILE OBJECT
        // =================================================

        if (!user.profile) {
            user.profile = {};
        }


        // =================================================
        // BIO
        // =================================================

        if (bio !== undefined) {
            user.profile.bio = bio;
        }


        // =================================================
        // SKILLS
        // =================================================

        if (skills !== undefined) {

            let skillsArray = [];

            if (
                typeof skills ===
                "string"
            ) {
                skillsArray =
                    skills
                        .split(",")
                        .map(
                            (skill) =>
                                skill.trim()
                        )
                        .filter(
                            (skill) =>
                                skill.length >
                                0
                        );
            }

            if (
                Array.isArray(skills)
            ) {
                skillsArray =
                    skills
                        .map(
                            (skill) =>
                                String(
                                    skill
                                ).trim()
                        )
                        .filter(
                            (skill) =>
                                skill.length >
                                0
                        );
            }

            user.profile.skills =
                skillsArray;
        }


        // =================================================
        // RESUME / FILE UPLOAD
        // =================================================

        if (req.file) {

            console.log(
                "Resume file received"
            );

            console.log(
                "Original Name:",
                req.file.originalname
            );

            console.log(
                "Mimetype:",
                req.file.mimetype
            );

            console.log(
                "Size:",
                req.file.size
            );


            if (!req.file.buffer) {
                return res.status(400).json({
                    message:
                        "Resume file buffer is missing",
                    success: false,
                });
            }


            // Convert file to Data URI
            const fileUri =
                getDataUri(
                    req.file
                );


            if (
                !fileUri ||
                !fileUri.content
            ) {
                return res.status(400).json({
                    message:
                        "Unable to process resume file",
                    success: false,
                });
            }


            // Upload to Cloudinary
            const cloudResponse =
                await cloudinary.uploader.upload(
                    fileUri.content,
                    {
                        resource_type:
                            "auto",

                        folder:
                            "job-portal-resumes",
                    }
                );


            console.log(
                "Cloudinary Upload Successful:",
                cloudResponse.secure_url
            );


            // Save resume URL
            user.profile.resume =
                cloudResponse.secure_url;


            // Save original name
            user.profile.resumeOriginalName =
                req.file.originalname;
        }


        // =================================================
        // SAVE USER
        // =================================================

        await user.save();


        // =================================================
        // RESPONSE
        // =================================================

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber:
                user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };


        return res.status(200).json({
            message:
                "Profile updated successfully",

            user: userData,

            success: true,
        });

    } catch (error) {

        console.error(
            "================================="
        );

        console.error(
            "UPDATE PROFILE ERROR"
        );

        console.error(
            "================================="
        );

        console.error(error);


        return res.status(500).json({
            message:
                error.message ||
                "Server error",

            success: false,

            error:
                error.message,
        });
    }
};