import express from "express";

import {
    login,
    logout,
    register,
    updateProfile,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
    singleUpload,
    resumeUpload,
} from "../middlewares/mutler.js";

const router = express.Router();

// =====================================================
// REGISTER
// =====================================================

router.route("/register").post(
    singleUpload,
    register
);

// =====================================================
// LOGIN
// =====================================================

router.route("/login").post(
    login
);

// =====================================================
// LOGOUT
// =====================================================

router.route("/logout").get(
    logout
);

// =====================================================
// UPDATE PROFILE
// PUT request
// Resume upload
// =====================================================

router.route("/profile/update").put(
    isAuthenticated,
    resumeUpload,
    updateProfile
);

export default router;