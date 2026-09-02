import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Admin is not authenticated.",
            });
        }

        const secret =
            process.env.ADMIN_JWT_SECRET ||
            process.env.SECRET_KEY;

        const decoded = jwt.verify(
            token,
            secret
        );

        if (
            !decoded ||
            decoded.isAdmin !== true
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied.",
            });
        }

        req.admin = decoded;

        next();

    } catch (error) {
        console.error(
            "Admin Authentication Error:",
            error
        );

        return res.status(401).json({
            success: false,
            message:
                "Admin authentication failed.",
        });
    }
};

export default adminAuth;