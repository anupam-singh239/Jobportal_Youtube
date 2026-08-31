import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Make sure .env is loaded before Cloudinary configuration
dotenv.config();

console.log("=================================");
console.log("CLOUDINARY CONFIG");
console.log("=================================");
console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log(
    "API Key:",
    process.env.API_KEY ? "LOADED" : "MISSING"
);
console.log(
    "API Secret:",
    process.env.API_SECRET ? "LOADED" : "MISSING"
);
console.log("=================================");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export default cloudinary;