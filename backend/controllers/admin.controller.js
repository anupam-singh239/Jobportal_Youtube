// ======================================================
// ADMIN LOGIN
// ======================================================

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        // Normalize email
        const enteredEmail = email.trim().toLowerCase();
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

        // Fixed Admin Credentials
        if (
            enteredEmail !== adminEmail ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials.",
            });
        }

        const secret =
            process.env.ADMIN_JWT_SECRET ||
            process.env.SECRET_KEY;

        if (!secret) {
            return res.status(500).json({
                success: false,
                message: "Admin JWT secret is not configured.",
            });
        }

        const token = jwt.sign(
            {
                isAdmin: true,
                email: adminEmail,
            },
            secret,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("adminToken", token, {
            httpOnly: true,

            secure:
                process.env.NODE_ENV === "production",

            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",

            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Admin login successful.",
        });

    } catch (error) {
        console.error("Admin Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error during admin login.",
        });
    }
};