import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
    postJob,
    getAllJobs,
    getJobbyId,
    getAdminJobs,
    updateJob,
    deleteJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// ======================================================
// CREATE JOB
// Login Required
// ======================================================

router.route("/post").post(
    isAuthenticated,
    postJob
);

// ======================================================
// GET ALL JOBS
// Login NOT Required
// ======================================================

router.route("/get").get(
    getAllJobs
);

// ======================================================
// GET ADMIN JOBS
// Login Required
// ======================================================

router.route("/getadminjobs").get(
    isAuthenticated,
    getAdminJobs
);

// ======================================================
// GET JOB BY ID
// Login NOT Required
// ======================================================

router.route("/get/:id").get(
    getJobbyId
);

// ======================================================
// UPDATE JOB
// Login Required
// ======================================================

router.route("/update/:id").put(
    isAuthenticated,
    updateJob
);

// ======================================================
// DELETE JOB
// Login Required
// ======================================================

router.route("/delete/:id").delete(
    isAuthenticated,
    deleteJob
);

export default router;