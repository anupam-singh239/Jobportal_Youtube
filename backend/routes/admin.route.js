import express from "express";

import {
    adminLogin,
    adminLogout,
    getAdminStats,
} from "../controllers/admin.controller.js";

import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

// ======================================================
// ADMIN LOGIN
// ======================================================

router.post(
    "/login",
    adminLogin
);

// ======================================================
// ADMIN STATS
// ======================================================

router.get(
    "/stats",
    adminAuth,
    getAdminStats
);

// ======================================================
// ADMIN LOGOUT
// ======================================================

router.post(
    "/logout",
    adminAuth,
    adminLogout
);

export default router;