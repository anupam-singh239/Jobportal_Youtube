import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// =====================================================
// USER COMPONENTS
// =====================================================

import Signup from "./components/ui/auth/Signup";
import Login from "./components/ui/auth/Login";
import Home from "./components/ui/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";

// =====================================================
// ADMIN COMPONENTS
// =====================================================

import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import EditJob from "./components/admin/EditJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";

// =====================================================
// ROUTER
// =====================================================

const appRouter = createBrowserRouter([

    // =====================================================
    // HOME
    // =====================================================

    {
        path: "/",
        element: <Home />,
    },

    // =====================================================
    // AUTH
    // =====================================================

    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/signup",
        element: <Signup />,
    },

    // =====================================================
    // USER JOB PAGES
    // =====================================================

    {
        path: "/jobs",
        element: <Jobs />,
    },

    {
        path: "/browse",
        element: <Browse />,
    },

    {
        path: "/description/:id",
        element: <JobDescription />,
    },

    {
        path: "/profile",
        element: <Profile />,
    },

    // =====================================================
    // ADMIN - COMPANIES
    // =====================================================

    {
        path: "/admin/companies",
        element: (
            <ProtectedRoute>
                <Companies />
            </ProtectedRoute>
        ),
    },

    {
        path: "/admin/companies/create",
        element: (
            <ProtectedRoute>
                <CompanyCreate />
            </ProtectedRoute>
        ),
    },

    {
        path: "/admin/companies/:id",
        element: (
            <ProtectedRoute>
                <CompanySetup />
            </ProtectedRoute>
        ),
    },

    // =====================================================
    // ADMIN - JOBS
    // =====================================================

    // ADMIN JOB LIST
    {
        path: "/admin/jobs",
        element: (
            <ProtectedRoute>
                <AdminJobs />
            </ProtectedRoute>
        ),
    },

    // CREATE JOB
    {
        path: "/admin/jobs/create",
        element: (
            <ProtectedRoute>
                <PostJob />
            </ProtectedRoute>
        ),
    },

    // EDIT JOB
    {
        path: "/admin/jobs/:id",
        element: (
            <ProtectedRoute>
                <EditJob />
            </ProtectedRoute>
        ),
    },

    // APPLICANTS
    {
        path: "/admin/jobs/:id/applicants",
        element: (
            <ProtectedRoute>
                <Applicants />
            </ProtectedRoute>
        ),
    },
    {
    path: "/admin-login",
    element: <AdminLogin />,
},

{
    path: "/admin-dashboard",
    element: <AdminDashboard />,
},
]);

// =====================================================
// APP
// =====================================================

function App() {
    return (
        <RouterProvider router={appRouter} />
    );
}

export default App;