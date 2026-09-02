import express from "express";

import {
    adminLogin,
    adminLogout,
    getAdminStats,
} from "../controllers/admin.controller.js";

import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

// Admin Login
router.post(
    "/login",
    adminLogin
);

// Admin Dashboard Stats
router.get(
    "/stats",
    adminAuth,
    getAdminStats
);

// Admin Logout
router.post(
    "/logout",
    adminAuth,
    adminLogout
);

export default router;