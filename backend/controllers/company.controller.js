import { Company } from "../models/company.model.js";
import cloudinary from "../utils/Cloudinary.js";

// =====================================================
// REGISTER COMPANY
// =====================================================

export const registercompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        console.log("=================================");
        console.log("REGISTER COMPANY");
        console.log("Body:", req.body);
        console.log("User ID:", req.id);
        console.log("=================================");

        // =================================================
        // CHECK COMPANY NAME
        // =================================================

        if (!companyName || !companyName.trim()) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        // =================================================
        // CHECK DUPLICATE COMPANY
        // =================================================

        const existingCompany = await Company.findOne({
            name: companyName.trim(),
        });

        if (existingCompany) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false,
            });
        }

        // =================================================
        // CREATE COMPANY
        // =================================================

        const company = await Company.create({
            name: companyName.trim(),
            userId: req.id,
        });

        console.log("COMPANY CREATED:", company);

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true,
        });
    } catch (error) {
        console.error("Register Company Error:", error);

        return res.status(500).json({
            message:
                error.message ||
                "Failed to register company",
            success: false,
        });
    }
};

// =====================================================
// GET ALL COMPANIES
// =====================================================

export const getCompany = async (req, res) => {
    try {
        console.log("GET COMPANIES");
        console.log("USER ID:", req.id);

        const companies = await Company.find({
            userId: req.id,
        }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            companies,
            success: true,
        });
    } catch (error) {
        console.error("Get Companies Error:", error);

        return res.status(500).json({
            message:
                error.message ||
                "Failed to get companies",
            success: false,
        });
    }
};

// =====================================================
// GET COMPANY BY ID
// =====================================================

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        console.log("GET COMPANY BY ID:", companyId);
        console.log("USER ID:", req.id);

        const company = await Company.findOne({
            _id: companyId,
            userId: req.id,
        });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            company,
            success: true,
        });
    } catch (error) {
        console.error(
            "Get Company By ID Error:",
            error
        );

        return res.status(500).json({
            message:
                error.message ||
                "Failed to get company",
            success: false,
        });
    }
};

// =====================================================
// UPDATE COMPANY
// =====================================================

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        console.log("=================================");
        console.log("UPDATE COMPANY");
        console.log("=================================");
        console.log("Company ID:", companyId);
        console.log("User ID:", req.id);
        console.log("Body:", req.body);
        console.log("File:", req.file);
        console.log("=================================");

        // =================================================
        // CHECK COMPANY
        // =================================================

        const company = await Company.findOne({
            _id: companyId,
            userId: req.id,
        });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        // =================================================
        // UPDATE COMPANY NAME
        // =================================================

        if (
            req.body.name !== undefined &&
            req.body.name.trim() !== ""
        ) {
            company.name = req.body.name.trim();
        }

        // =================================================
        // UPDATE DESCRIPTION
        // =================================================

        if (req.body.description !== undefined) {
            company.description =
                req.body.description;
        }

        // =================================================
        // UPDATE WEBSITE
        // =================================================

        if (req.body.website !== undefined) {
            company.website =
                req.body.website;
        }

        // =================================================
        // UPDATE LOCATION
        // =================================================

        if (req.body.location !== undefined) {
            company.location =
                req.body.location;
        }

        // =================================================
        // COMPANY LOGO
        // =================================================

        if (req.file) {
            console.log("=================================");
            console.log("LOGO FILE RECEIVED");
            console.log("=================================");

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

            console.log(
                "Buffer:",
                !!req.file.buffer
            );

            // =================================================
            // CHECK BUFFER
            // =================================================

            if (!req.file.buffer) {
                return res.status(400).json({
                    message:
                        "Logo file buffer is missing",
                    success: false,
                });
            }

            // =================================================
            // CHECK CLOUDINARY CONFIG
            // =================================================

            if (
                !process.env.CLOUD_NAME ||
                !process.env.API_KEY ||
                !process.env.API_SECRET
            ) {
                console.error(
                    "Cloudinary environment variables missing"
                );

                return res.status(500).json({
                    message:
                        "Cloudinary configuration is missing",
                    success: false,
                });
            }

            // =================================================
            // BUFFER -> BASE64
            // =================================================

            const base64File =
                `data:${req.file.mimetype};base64,` +
                req.file.buffer.toString("base64");

            console.log(
                "Uploading logo to Cloudinary..."
            );

            // =================================================
            // UPLOAD TO CLOUDINARY
            // =================================================

            const cloudResponse =
                await cloudinary.uploader.upload(
                    base64File,
                    {
                        folder:
                            "job-portal-companies",
                        resource_type: "image",
                    }
                );

            console.log(
                "Cloudinary Upload Successful"
            );

            console.log(
                "Logo URL:",
                cloudResponse.secure_url
            );

            // =================================================
            // SAVE CLOUDINARY URL
            // =================================================

            company.logo =
                cloudResponse.secure_url;
        }

        // =================================================
        // SAVE COMPANY
        // =================================================

        await company.save();

        console.log(
            "COMPANY UPDATED SUCCESSFULLY"
        );

        console.log(
            "FINAL LOGO:",
            company.logo
        );

        // =================================================
        // RESPONSE
        // =================================================

        return res.status(200).json({
            message:
                "Company information updated successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.error(
            "================================="
        );

        console.error(
            "UPDATE COMPANY ERROR"
        );

        console.error(
            error
        );

        console.error(
            "================================="
        );

        return res.status(500).json({
            message:
                error.message ||
                "Failed to update company",
            success: false,
        });
    }
};

// =====================================================
// DELETE COMPANY
// =====================================================

export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        console.log(
            "DELETE COMPANY:",
            companyId
        );

        const company = await Company.findOne({
            _id: companyId,
            userId: req.id,
        });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        await Company.findByIdAndDelete(
            companyId
        );

        return res.status(200).json({
            message:
                "Company deleted successfully",
            success: true,
        });
    } catch (error) {
        console.error(
            "Delete Company Error:",
            error
        );

        return res.status(500).json({
            message:
                error.message ||
                "Failed to delete company",
            success: false,
        });
    }
};