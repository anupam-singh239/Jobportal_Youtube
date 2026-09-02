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

import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

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
    // ADMIN LOGIN
    // =====================================================

    {
        path: "/admin-login",
        element: <AdminLogin />,
    },

    // =====================================================
    // ADMIN DASHBOARD
    // =====================================================

    {
        path: "/admin-dashboard",
        element: (
            <AdminProtectedRoute>
                <AdminDashboard />
            </AdminProtectedRoute>
        ),
    },

    // =====================================================
    // ADMIN - COMPANIES
    // =====================================================

    {
        path: "/admin/companies",
        element: (
            <AdminProtectedRoute>
                <Companies />
            </AdminProtectedRoute>
        ),
    },

    {
        path: "/admin/companies/create",
        element: (
            <AdminProtectedRoute>
                <CompanyCreate />
            </AdminProtectedRoute>
        ),
    },

    {
        path: "/admin/companies/:id",
        element: (
            <AdminProtectedRoute>
                <CompanySetup />
            </AdminProtectedRoute>
        ),
    },

    // =====================================================
    // ADMIN - JOBS
    // =====================================================

    {
        path: "/admin/jobs",
        element: (
            <AdminProtectedRoute>
                <AdminJobs />
            </AdminProtectedRoute>
        ),
    },

    {
        path: "/admin/jobs/create",
        element: (
            <AdminProtectedRoute>
                <PostJob />
            </AdminProtectedRoute>
        ),
    },

    {
        path: "/admin/jobs/:id",
        element: (
            <AdminProtectedRoute>
                <EditJob />
            </AdminProtectedRoute>
        ),
    },

    {
        path: "/admin/jobs/:id/applicants",
        element: (
            <AdminProtectedRoute>
                <Applicants />
            </AdminProtectedRoute>
        ),
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