import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import CompanyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import adminRoute from "./routes/admin.route.js";
import path from "path";

dotenv.config({});

const app = express();

const _dirname = path.resolve();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// ======================================================
// CORS
// ======================================================

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://jobportal.buzz",
        "https://www.jobportal.buzz",
    ],
    credentials: true,
};

app.use(cors(corsOptions));

// ======================================================
// PORT
// ======================================================

const PORT = process.env.PORT || 8000;

// ======================================================
// API ROUTES
// ======================================================

app.use(
    "/api/v1/user",
    userRoute
);

app.use(
    "/api/v1/company",
    CompanyRoute
);

app.use(
    "/api/v1/job",
    jobRoute
);

app.use(
    "/api/v1/application",
    applicationRoute
);

// IMPORTANT: ADMIN ROUTE
app.use(
    "/api/v1/admin",
    adminRoute
);

// ======================================================
// FRONTEND
// ======================================================

app.use(
    express.static(
        path.join(
            _dirname,
            "frontend",
            "dist"
        )
    )
);

// ======================================================
// FRONTEND ROUTING
// ======================================================

app.get(
    "/*splat",
    (_, res) => {
        res.sendFile(
            path.resolve(
                _dirname,
                "frontend",
                "dist",
                "index.html"
            )
        );
    }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(
    PORT,
    () => {
        connectDB();

        console.log(
            `Server running at port ${PORT}`
        );
    }
);