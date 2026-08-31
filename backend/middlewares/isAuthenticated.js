import jwt from "jsonwebtoken";

const isAuthenticated = async (
    req,
    res,
    next
) => {
    try {
        const token =
            req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message:
                    "User is not authenticated.",
                success: false,
            });
        }

        const decoded =
            jwt.verify(
                token,
                process.env.SECRET_KEY
            );

        if (!decoded) {
            return res.status(401).json({
                message:
                    "Invalid token.",
                success: false,
            });
        }

        // VERY IMPORTANT
        req.id = decoded.userId;

        next();

    } catch (error) {
        console.error(
            "Authentication Error:",
            error
        );

        return res.status(401).json({
            message:
                "Authentication failed.",
            success: false,
        });
    }
};

export default isAuthenticated;