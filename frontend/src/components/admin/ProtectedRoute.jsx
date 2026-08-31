import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        // User login nahi hai
        if (!user) {
            navigate("/", { replace: true });
            return;
        }

        // User recruiter nahi hai
        if (user.role !== "recruiter") {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    // Jab tak user check ho raha hai
    if (!user || user.role !== "recruiter") {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;