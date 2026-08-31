import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        // =====================================================
        // COMPANY NAME
        // =====================================================

        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        // =====================================================
        // DESCRIPTION
        // =====================================================

        description: {
            type: String,
            default: "",
        },

        // =====================================================
        // WEBSITE
        // =====================================================

        website: {
            type: String,
            default: "",
        },

        // =====================================================
        // LOCATION
        // =====================================================

        location: {
            type: String,
            default: "",
        },

        // =====================================================
        // COMPANY LOGO
        // Cloudinary URL yahan save hoga
        // =====================================================

        logo: {
            type: String,
            default: "",
        },

        // =====================================================
        // COMPANY OWNER
        // =====================================================

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Company = mongoose.model(
    "Company",
    companySchema
);