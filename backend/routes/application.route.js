import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
    applyJob,
    getApplicants,
    getAppliedJobs,
    updateApplicationStatus,
} from "../controllers/application.controller.js";

const router =
    express.Router();

// ======================================================
// APPLY JOB
// POST /api/v1/application/apply/:id
// ======================================================

router.route("/apply/:id").post(
    isAuthenticated,
    applyJob
);

// ======================================================
// GET USER APPLIED JOBS
// GET /api/v1/application/get
// ======================================================

router.route("/get").get(
    isAuthenticated,
    getAppliedJobs
);

// ======================================================
// GET JOB APPLICANTS
// GET /api/v1/application/job/:id
// ======================================================

router.route("/job/:id").get(
    isAuthenticated,
    getApplicants
);

// ======================================================
// UPDATE APPLICATION STATUS
// PUT /api/v1/application/status/:id
// ======================================================

router.route("/status/:id").put(
    isAuthenticated,
    updateApplicationStatus
);

export default router;