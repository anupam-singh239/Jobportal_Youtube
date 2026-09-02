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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const corsOptions = {
    origin: [
        "https://jobportal.buzz",
        "https://www.jobportal.buzz",
        "https://jobportal-youtube-3.onrender.com"
    ],
    credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// APIs
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", CompanyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/admin", adminRoute);

// Serve frontend
app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get("/*splat", (_, res) => {
    res.sendFile(
        path.resolve(_dirname, "frontend", "dist", "index.html")
    );
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});