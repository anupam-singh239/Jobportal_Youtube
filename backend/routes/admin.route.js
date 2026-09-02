import express from "express";

import {
    adminLogin,
    adminLogout,
    getAdminStats,

    getAllCompaniesAdmin,
    deleteCompanyAdmin,

    getAllJobsAdmin,
    deleteJobAdmin,

    getAllUsersAdmin,

    getAllApplicationsAdmin,
    updateApplicationStatusAdmin,
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
// ALL COMPANIES
// ======================================================

router.get(
    "/companies",
    adminAuth,
    getAllCompaniesAdmin
);

// ======================================================
// DELETE COMPANY
// ======================================================

router.delete(
    "/companies/:id",
    adminAuth,
    deleteCompanyAdmin
);

// ======================================================
// ALL JOBS
// ======================================================

router.get(
    "/jobs",
    adminAuth,
    getAllJobsAdmin
);

// ======================================================
// DELETE JOB
// ======================================================

router.delete(
    "/jobs/:id",
    adminAuth,
    deleteJobAdmin
);

// ======================================================
// ALL USERS
// ======================================================

router.get(
    "/users",
    adminAuth,
    getAllUsersAdmin
);

// ======================================================
// ALL APPLICATIONS
// ======================================================

router.get(
    "/applications",
    adminAuth,
    getAllApplicationsAdmin
);

// ======================================================
// UPDATE APPLICATION STATUS
// ======================================================

router.put(
    "/applications/:id/status",
    adminAuth,
    updateApplicationStatusAdmin
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